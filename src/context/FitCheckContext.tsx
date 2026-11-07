'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ColorCatalogItem,
  FashionStyleItem,
  OutfitAnalysisResult,
  OutfitPlanItem,
  SavedOutfit,
  UserColorProfile,
  UserProfile,
  WardrobeItem,
} from '@/types/fitcheck';
import { INITIAL_STYLE_CATALOG } from '@/data/styleCatalog';
import { INITIAL_COLOR_CATALOG } from '@/data/colorCatalog';
import { getStarterWardrobe } from '@/data/starterWardrobe';
import { getScopedSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export type NavSection =
  | 'dashboard'
  | 'analyzer'
  | 'wardrobe'
  | 'personal-color'
  | 'style-library'
  | 'color-library'
  | 'outfit-generator'
  | 'outfit-planner'
  | 'history'
  | 'profile';

interface FitCheckContextType {
  anonUserId: string;
  isHydrated: boolean;
  supabaseConnected: boolean;
  activeNav: NavSection;
  setActiveNav: (nav: NavSection) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (v: boolean) => void;
  profile: UserProfile | null;
  saveProfile: (profileData: Omit<UserProfile, 'anon_user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  resetProfile: () => Promise<void>;
  wardrobe: WardrobeItem[];
  addWardrobeItem: (item: Omit<WardrobeItem, 'id' | 'anon_user_id' | 'date_added'>) => Promise<WardrobeItem>;
  updateWardrobeItem: (item: WardrobeItem) => Promise<void>;
  deleteWardrobeItem: (id: string) => Promise<void>;
  analyses: OutfitAnalysisResult[];
  addOutfitAnalysis: (analysis: OutfitAnalysisResult) => Promise<void>;
  deleteOutfitAnalysis: (id: string) => Promise<void>;
  savedOutfits: SavedOutfit[];
  addSavedOutfit: (outfit: Omit<SavedOutfit, 'id' | 'anon_user_id' | 'created_at'>) => Promise<SavedOutfit>;
  deleteSavedOutfit: (id: string) => Promise<void>;
  outfitPlans: OutfitPlanItem[];
  addOutfitPlan: (plan: Omit<OutfitPlanItem, 'id' | 'anon_user_id' | 'created_at'>) => Promise<void>;
  updateOutfitPlan: (plan: OutfitPlanItem) => Promise<void>;
  deleteOutfitPlan: (id: string) => Promise<void>;
  colorProfile: UserColorProfile | null;
  saveColorProfile: (cp: Omit<UserColorProfile, 'anon_user_id' | 'assessed_at'>) => Promise<void>;
  styleCatalog: FashionStyleItem[];
  addCustomStyle: (style: Omit<FashionStyleItem, 'id' | 'is_custom'>) => Promise<void>;
  toggleStyleInProfile: (styleName: string) => Promise<void>;
  colorCatalog: ColorCatalogItem[];
  addCustomColor: (color: Omit<ColorCatalogItem, 'id' | 'is_custom'>) => Promise<void>;
  toggleFavoriteColor: (colorName: string) => Promise<void>;
}

const STORAGE_KEYS = {
  ANON_ID: 'fitcheck_anon_user_id_v1',
  PROFILE: 'fitcheck_user_profile_v1',
  WARDROBE: 'fitcheck_wardrobe_v1',
  ANALYSES: 'fitcheck_analyses_v1',
  SAVED_OUTFITS: 'fitcheck_saved_outfits_v1',
  PLANS: 'fitcheck_outfit_plans_v1',
  COLOR_PROFILE: 'fitcheck_color_profile_v1',
  CUSTOM_STYLES: 'fitcheck_custom_styles_v1',
  CUSTOM_COLORS: 'fitcheck_custom_colors_v1',
};

const FitCheckContext = createContext<FitCheckContextType | undefined>(undefined);

export const FitCheckProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [anonUserId, setAnonUserId] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<NavSection>('dashboard');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [analyses, setAnalyses] = useState<OutfitAnalysisResult[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [outfitPlans, setOutfitPlans] = useState<OutfitPlanItem[]>([]);
  const [colorProfile, setColorProfile] = useState<UserColorProfile | null>(null);
  const [customStyles, setCustomStyles] = useState<FashionStyleItem[]>([]);
  const [customColors, setCustomColors] = useState<ColorCatalogItem[]>([]);

  // Hydrate from localStorage + optional Supabase sync on mount
  useEffect(() => {
    try {
      let storedAnonId = localStorage.getItem(STORAGE_KEYS.ANON_ID);
      if (!storedAnonId) {
        storedAnonId = `fc_anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem(STORAGE_KEYS.ANON_ID, storedAnonId);
      }
      setAnonUserId(storedAnonId);

      const rawProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (rawProfile) {
        const parsedProfile: UserProfile = JSON.parse(rawProfile);
        setProfile(parsedProfile);
      }

      const rawWardrobe = localStorage.getItem(STORAGE_KEYS.WARDROBE);
      if (rawWardrobe) {
        setWardrobe(JSON.parse(rawWardrobe));
      }

      const rawAnalyses = localStorage.getItem(STORAGE_KEYS.ANALYSES);
      if (rawAnalyses) {
        setAnalyses(JSON.parse(rawAnalyses));
      }

      const rawSavedOutfits = localStorage.getItem(STORAGE_KEYS.SAVED_OUTFITS);
      if (rawSavedOutfits) {
        setSavedOutfits(JSON.parse(rawSavedOutfits));
      }

      const rawPlans = localStorage.getItem(STORAGE_KEYS.PLANS);
      if (rawPlans) {
        setOutfitPlans(JSON.parse(rawPlans));
      }

      const rawColorProfile = localStorage.getItem(STORAGE_KEYS.COLOR_PROFILE);
      if (rawColorProfile) {
        setColorProfile(JSON.parse(rawColorProfile));
      }

      const rawCustomStyles = localStorage.getItem(STORAGE_KEYS.CUSTOM_STYLES);
      if (rawCustomStyles) {
        setCustomStyles(JSON.parse(rawCustomStyles));
      }

      const rawCustomColors = localStorage.getItem(STORAGE_KEYS.CUSTOM_COLORS);
      if (rawCustomColors) {
        setCustomColors(JSON.parse(rawCustomColors));
      }

      // If Supabase is configured, also pull remote profile/wardrobe asynchronously
      if (isSupabaseConfigured && storedAnonId) {
        const sb = getScopedSupabaseClient(storedAnonId);
        if (sb) {
          sb.from('wardrobe_items')
            .select('*')
            .eq('anon_user_id', storedAnonId)
            .order('date_added', { ascending: false })
            .then(({ data }) => {
              if (data && data.length > 0) {
                setWardrobe(data as WardrobeItem[]);
                localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(data));
              }
            });
        }
      }
    } catch (e) {
      console.error('Error hydrating FITCHECK state:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const saveProfile = async (
    profileData: Omit<UserProfile, 'anon_user_id' | 'created_at' | 'updated_at'>
  ) => {
    const now = new Date().toISOString();
    const newProfile: UserProfile = {
      ...profileData,
      anon_user_id: anonUserId,
      created_at: profile?.created_at || now,
      updated_at: now,
    };

    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));

    // Seed starter wardrobe if user has no items yet
    if (wardrobe.length === 0) {
      const starter = getStarterWardrobe(
        anonUserId,
        newProfile.gender_profile,
        newProfile.styling_preference
      );
      setWardrobe(starter);
      localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(starter));

      // Also seed an initial Outfit Plan for today so the Planner has a real example
      const todayStr = new Date().toISOString().split('T')[0];
      const initialPlan: OutfitPlanItem = {
        id: `plan-${Date.now()}`,
        anon_user_id: anonUserId,
        plan_date: todayStr,
        event_name: 'Editorial Style Launch & Campus/Office Day',
        occasion_type: 'Smart Casual',
        outfit_title: `${newProfile.selected_styles[0] || 'Signature'} Capsule Look`,
        item_ids: starter.slice(0, 3).map((i) => i.id),
        items_snapshot: starter.slice(0, 3),
        notes: 'Curated automatically from your FITCHECK Digital Wardrobe upon profile completion.',
        created_at: now,
      };
      setOutfitPlans([initialPlan]);
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify([initialPlan]));
    }

    // Sync to Supabase if configured
    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('profiles').upsert(
        {
          anon_user_id: anonUserId,
          display_name: newProfile.display_name,
          gender_profile: newProfile.gender_profile,
          age: newProfile.age,
          styling_preference: newProfile.styling_preference,
          favorite_colors: newProfile.favorite_colors,
          updated_at: now,
        },
        { onConflict: 'anon_user_id' }
      );
    }

    setIsEditingProfile(false);
  };

  const resetProfile = async () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    const freshAnonId = `fc_anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.ANON_ID, freshAnonId);
    setAnonUserId(freshAnonId);
    setProfile(null);
    setWardrobe([]);
    setAnalyses([]);
    setSavedOutfits([]);
    setOutfitPlans([]);
    setColorProfile(null);
    setCustomStyles([]);
    setCustomColors([]);
    setIsEditingProfile(false);
    setActiveNav('dashboard');
  };

  const addWardrobeItem = async (
    item: Omit<WardrobeItem, 'id' | 'anon_user_id' | 'date_added'>
  ): Promise<WardrobeItem> => {
    const newItem: WardrobeItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      anon_user_id: anonUserId,
      date_added: new Date().toISOString(),
    };
    const updated = [newItem, ...wardrobe];
    setWardrobe(updated);
    localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('wardrobe_items').insert({
        anon_user_id: anonUserId,
        item_name: newItem.item_name,
        image_url: newItem.image_url,
        category: newItem.category,
        color_name: newItem.color_name,
        hex_code: newItem.hex_code,
        brand: newItem.brand,
        style_tags: newItem.style_tags,
        description: newItem.description,
      });
    }
    return newItem;
  };

  const updateWardrobeItem = async (item: WardrobeItem) => {
    const updated = wardrobe.map((w) => (w.id === item.id ? item : w));
    setWardrobe(updated);
    localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb
        .from('wardrobe_items')
        .update({
          item_name: item.item_name,
          image_url: item.image_url,
          category: item.category,
          color_name: item.color_name,
          hex_code: item.hex_code,
          brand: item.brand,
          style_tags: item.style_tags,
          description: item.description,
        })
        .eq('id', item.id)
        .eq('anon_user_id', anonUserId);
    }
  };

  const deleteWardrobeItem = async (id: string) => {
    const updated = wardrobe.filter((w) => w.id !== id);
    setWardrobe(updated);
    localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('wardrobe_items').delete().eq('id', id).eq('anon_user_id', anonUserId);
    }
  };

  const addOutfitAnalysis = async (analysis: OutfitAnalysisResult) => {
    const updated = [analysis, ...analyses];
    setAnalyses(updated);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('outfit_analyses').insert({
        anon_user_id: anonUserId,
        image_url: analysis.image_url,
        analysis_mode: analysis.analysis_mode,
        gender_context: analysis.gender_context,
        outfit_score: analysis.outfit_score,
        score_breakdown: analysis.score_breakdown,
        detected_items: analysis.detected_items,
        detected_colors: analysis.detected_colors,
        detected_styles: analysis.detected_styles,
        color_harmony: analysis.color_harmony,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        improvement_tips: analysis.improvement_tips,
        accessory_recommendations: analysis.accessory_recommendations,
        alternative_combinations: analysis.alternative_combinations,
      });
    }
  };

  const deleteOutfitAnalysis = async (id: string) => {
    const updated = analyses.filter((a) => a.id !== id);
    setAnalyses(updated);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('outfit_analyses').delete().eq('id', id).eq('anon_user_id', anonUserId);
    }
  };

  const addSavedOutfit = async (
    outfit: Omit<SavedOutfit, 'id' | 'anon_user_id' | 'created_at'>
  ): Promise<SavedOutfit> => {
    const newOutfit: SavedOutfit = {
      ...outfit,
      id: `outfit-${Date.now()}`,
      anon_user_id: anonUserId,
      created_at: new Date().toISOString(),
    };
    const updated = [newOutfit, ...savedOutfits];
    setSavedOutfits(updated);
    localStorage.setItem(STORAGE_KEYS.SAVED_OUTFITS, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('saved_outfits').insert({
        anon_user_id: anonUserId,
        title: newOutfit.title,
        activity: newOutfit.activity,
        occasion: newOutfit.occasion,
        target_style: newOutfit.target_style,
        target_color: newOutfit.target_color,
        item_ids: newOutfit.item_ids,
        items_snapshot: newOutfit.items_snapshot,
        harmony_note: newOutfit.harmony_note,
        is_favorite: newOutfit.is_favorite,
      });
    }
    return newOutfit;
  };

  const deleteSavedOutfit = async (id: string) => {
    const updated = savedOutfits.filter((o) => o.id !== id);
    setSavedOutfits(updated);
    localStorage.setItem(STORAGE_KEYS.SAVED_OUTFITS, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('saved_outfits').delete().eq('id', id).eq('anon_user_id', anonUserId);
    }
  };

  const addOutfitPlan = async (
    plan: Omit<OutfitPlanItem, 'id' | 'anon_user_id' | 'created_at'>
  ) => {
    const newPlan: OutfitPlanItem = {
      ...plan,
      id: `plan-${Date.now()}`,
      anon_user_id: anonUserId,
      created_at: new Date().toISOString(),
    };
    const updated = [newPlan, ...outfitPlans].sort((a, b) =>
      a.plan_date.localeCompare(b.plan_date)
    );
    setOutfitPlans(updated);
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updated));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('outfit_plans').insert({
        anon_user_id: anonUserId,
        plan_date: newPlan.plan_date,
        event_name: newPlan.event_name,
        occasion_type: newPlan.occasion_type,
        outfit_title: newPlan.outfit_title,
        item_ids: newPlan.item_ids,
        items_snapshot: newPlan.items_snapshot,
        notes: newPlan.notes,
      });
    }
  };

  const updateOutfitPlan = async (plan: OutfitPlanItem) => {
    const updated = outfitPlans
      .map((p) => (p.id === plan.id ? plan : p))
      .sort((a, b) => a.plan_date.localeCompare(b.plan_date));
    setOutfitPlans(updated);
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updated));
  };

  const deleteOutfitPlan = async (id: string) => {
    const updated = outfitPlans.filter((p) => p.id !== id);
    setOutfitPlans(updated);
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updated));
  };

  const saveColorProfile = async (cp: Omit<UserColorProfile, 'anon_user_id' | 'assessed_at'>) => {
    const fullCp: UserColorProfile = {
      ...cp,
      anon_user_id: anonUserId,
      assessed_at: new Date().toISOString(),
    };
    setColorProfile(fullCp);
    localStorage.setItem(STORAGE_KEYS.COLOR_PROFILE, JSON.stringify(fullCp));

    const sb = getScopedSupabaseClient(anonUserId);
    if (sb) {
      await sb.from('user_color_profiles').upsert(
        {
          anon_user_id: anonUserId,
          assessment_method: fullCp.assessment_method,
          undertone: fullCp.undertone,
          seasonal_palette: fullCp.seasonal_palette,
          recommended_colors: fullCp.recommended_colors,
          clothing_suggestions: fullCp.clothing_suggestions,
          hijab_suggestions: fullCp.hijab_suggestions,
          assessed_at: fullCp.assessed_at,
        },
        { onConflict: 'anon_user_id' }
      );
    }
  };

  const addCustomStyle = async (style: Omit<FashionStyleItem, 'id' | 'is_custom'>) => {
    const newStyle: FashionStyleItem = {
      ...style,
      id: `custom-style-${Date.now()}`,
      is_custom: true,
    };
    const updated = [newStyle, ...customStyles];
    setCustomStyles(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_STYLES, JSON.stringify(updated));
  };

  const toggleStyleInProfile = async (styleName: string) => {
    if (!profile) return;
    const exists = profile.selected_styles.includes(styleName);
    const updatedStyles = exists
      ? profile.selected_styles.filter((s) => s !== styleName)
      : [...profile.selected_styles, styleName];

    if (updatedStyles.length === 0) return; // Keep at least 1 style

    const updatedProfile: UserProfile = {
      ...profile,
      selected_styles: updatedStyles,
      updated_at: new Date().toISOString(),
    };
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
  };

  const addCustomColor = async (color: Omit<ColorCatalogItem, 'id' | 'is_custom'>) => {
    const newColor: ColorCatalogItem = {
      ...color,
      id: `custom-color-${Date.now()}`,
      is_custom: true,
    };
    const updated = [newColor, ...customColors];
    setCustomColors(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COLORS, JSON.stringify(updated));
  };

  const toggleFavoriteColor = async (colorName: string) => {
    if (!profile) return;
    const exists = profile.favorite_colors.includes(colorName);
    const updatedColors = exists
      ? profile.favorite_colors.filter((c) => c !== colorName)
      : [...profile.favorite_colors, colorName];

    const updatedProfile: UserProfile = {
      ...profile,
      favorite_colors: updatedColors,
      updated_at: new Date().toISOString(),
    };
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
  };

  return (
    <FitCheckContext.Provider
      value={{
        anonUserId,
        isHydrated,
        supabaseConnected: isSupabaseConfigured,
        activeNav,
        setActiveNav,
        isEditingProfile,
        setIsEditingProfile,
        profile,
        saveProfile,
        resetProfile,
        wardrobe,
        addWardrobeItem,
        updateWardrobeItem,
        deleteWardrobeItem,
        analyses,
        addOutfitAnalysis,
        deleteOutfitAnalysis,
        savedOutfits,
        addSavedOutfit,
        deleteSavedOutfit,
        outfitPlans,
        addOutfitPlan,
        updateOutfitPlan,
        deleteOutfitPlan,
        colorProfile,
        saveColorProfile,
        styleCatalog: [...customStyles, ...INITIAL_STYLE_CATALOG],
        addCustomStyle,
        toggleStyleInProfile,
        colorCatalog: [...customColors, ...INITIAL_COLOR_CATALOG],
        addCustomColor,
        toggleFavoriteColor,
      }}
    >
      {children}
    </FitCheckContext.Provider>
  );
};

export const useFitCheck = () => {
  const ctx = useContext(FitCheckContext);
  if (!ctx) throw new Error('useFitCheck must be used within a FitCheckProvider');
  return ctx;
};


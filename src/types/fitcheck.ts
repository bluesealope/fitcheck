export type GenderProfile = 'Men' | 'Women';

export type StylingPreference = 'Hijab' | 'Non-Hijab' | 'Flexible / No Preference' | 'Standard';

export type UndertoneType = 'Warm Undertone' | 'Cool Undertone' | 'Neutral Undertone';

export type SeasonFamily = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type WardrobeCategory =
  | 'Tops'
  | 'Bottoms'
  | 'Outerwear'
  | 'Dresses'
  | 'Shoes'
  | 'Bags'
  | 'Accessories'
  | 'Hijab';

export interface UserProfile {
  anon_user_id: string;
  display_name: string;
  gender_profile: GenderProfile;
  age: number; // 13 - 50
  selected_styles: string[]; // IDs or Names of selected fashion styles
  styling_preference: StylingPreference;
  favorite_colors: string[]; // Color names or hex codes
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface FashionStyleItem {
  id: string;
  name: string;
  category_group:
    | 'Classic & Elegant'
    | 'Minimalist'
    | 'Casual'
    | 'Streetwear'
    | 'Feminine'
    | 'Masculine'
    | 'Vintage'
    | 'Alternative'
    | 'Artistic'
    | 'Modern'
    | 'Korean & Japanese'
    | 'Sporty'
    | 'Formal'
    | 'Modest Fashion'
    | 'Custom';
  description: string;
  key_elements: string[];
  color_palette: { name: string; hex: string }[];
  visual_url_men: string;
  visual_url_women: string;
  signature_pieces_men: string[];
  signature_pieces_women: string[];
  is_custom?: boolean;
}

export interface ColorCatalogItem {
  id: string;
  name: string;
  color_group:
    | 'Neutral'
    | 'Brown'
    | 'Red'
    | 'Pink'
    | 'Orange'
    | 'Yellow'
    | 'Green'
    | 'Blue'
    | 'Purple'
    | 'Grey'
    | 'Monochrome'
    | 'Custom';
  hex_code: string;
  undertone_match: UndertoneType[];
  seasonal_match: string[];
  pairing_suggestions: { name: string; hex: string }[];
  description: string;
  is_custom?: boolean;
}

export interface SeasonalPaletteItem {
  id: string;
  name: string; // e.g., Light Spring, Deep Winter
  season_family: SeasonFamily;
  undertone: UndertoneType;
  characteristics: string;
  recommended_colors: { name: string; hex: string; role: string }[];
  color_combinations: { title: string; colors: { name: string; hex: string }[]; vibe: string }[];
  clothing_suggestions: string[];
  hijab_suggestions: string[];
}

export interface UserColorProfile {
  anon_user_id: string;
  assessment_method: 'Personal Color Quiz' | 'Photo-Based Color Assessment';
  undertone: UndertoneType;
  seasonal_palette: string; // Name of one of the 12 seasonal palettes
  recommended_colors: { name: string; hex: string }[];
  clothing_suggestions: string[];
  hijab_suggestions: string[];
  extracted_skin_hex?: string;
  assessed_at: string;
}

export interface WardrobeItem {
  id: string;
  anon_user_id: string;
  item_name: string;
  image_url: string;
  category: WardrobeCategory;
  color_name: string;
  hex_code: string;
  brand: string;
  style_tags: string[];
  description: string;
  date_added: string;
}

export interface DetectedGarment {
  item_type: string; // e.g. Shirt, Trousers, Loafers, Blouse, Hijab, Dress
  category: WardrobeCategory;
  color_name: string;
  hex_code: string;
  confidence_note: string;
}

export interface OutfitScoreBreakdown {
  color_harmony: number; // 0-100 (weighted 30%)
  outfit_combination: number; // 0-100 (weighted 30%)
  style_consistency: number; // 0-100 (weighted 25%)
  accessories_match: number; // 0-100 (weighted 15%)
}

export interface OutfitAnalysisResult {
  id: string;
  anon_user_id: string;
  image_url: string;
  analysis_mode: 'AI Vision API (Server)' | 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)';
  gender_context: string;
  outfit_score: number; // 0-100 total weighted score
  score_breakdown: OutfitScoreBreakdown;
  detected_items: DetectedGarment[];
  detected_colors: { name: string; hex: string; percentage: number }[];
  detected_styles: string[];
  color_harmony: string;
  strengths: string[];
  weaknesses: string[];
  improvement_tips: string[];
  accessory_recommendations: string[];
  alternative_combinations: string[];
  created_at: string;
}

export interface SavedOutfit {
  id: string;
  anon_user_id: string;
  title: string;
  activity: string;
  occasion: string;
  target_style: string;
  target_color: string;
  item_ids: string[];
  items_snapshot: WardrobeItem[];
  harmony_note: string;
  is_favorite: boolean;
  created_at: string;
}

export interface OutfitPlanItem {
  id: string;
  anon_user_id: string;
  plan_date: string; // YYYY-MM-DD
  event_name: string;
  occasion_type: string;
  outfit_title: string;
  item_ids: string[];
  items_snapshot: WardrobeItem[];
  notes: string;
  created_at: string;
}

export interface StyleRecommendation {
  id: string;
  title: string;
  occasion: string;
  activity: string;
  style_focus: string;
  recommended_pieces: {
    slot: string;
    item_name: string;
    color: string;
    hex: string;
    from_wardrobe?: boolean;
  }[];
  color_story: { name: string; hex: string }[];
  rationale: string;
  styling_note: string;
}


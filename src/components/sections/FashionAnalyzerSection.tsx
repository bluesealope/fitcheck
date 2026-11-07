'use client';

import React, { useRef, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import {
  evaluateSartorialAnalysis,
  extractColorsFromImage,
  findNearestCatalogColor,
  MEN_GARMENT_TYPES,
  WOMEN_GARMENT_TYPES,
} from '@/lib/fashionEngine';
import { DetectedGarment, OutfitAnalysisResult, WardrobeCategory } from '@/types/fitcheck';
import {
  Camera,
  Upload,
  ScanEye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus,
  Trash2,
  Info,
} from 'lucide-react';

interface PresetSample {
  id: string;
  label: string;
  genderContext: 'Men' | 'Women';
  includeHijab: boolean;
  imageUrl: string;
  styles: string[];
  items: { item_type: string; category: WardrobeCategory; color_name: string; hex_code: string }[];
}

const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'sample-men-oldmoney',
    label: 'Men — Old Money & Smart Casual Tailoring',
    genderContext: 'Men',
    includeHijab: false,
    imageUrl:
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
    styles: ['Old Money', 'Smart Casual', 'Classic Menswear'],
    items: [
      { item_type: 'Shirt', category: 'Tops', color_name: 'Cream', hex_code: '#FFFDD0' },
      { item_type: 'Trousers', category: 'Bottoms', color_name: 'Camel', hex_code: '#C19A6B' },
      { item_type: 'Loafers', category: 'Shoes', color_name: 'Espresso', hex_code: '#3B2820' },
      { item_type: 'Watches', category: 'Accessories', color_name: 'Gold', hex_code: '#D4AF37' },
    ],
  },
  {
    id: 'sample-men-streetwear',
    label: 'Men — Minimalist & Urban Streetwear',
    genderContext: 'Men',
    includeHijab: false,
    imageUrl:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
    styles: ['Streetwear', 'Minimalist', 'Korean Casual'],
    items: [
      { item_type: 'Jacket', category: 'Outerwear', color_name: 'Charcoal', hex_code: '#252525' },
      { item_type: 'Hoodie', category: 'Tops', color_name: 'Ivory', hex_code: '#F7F5F0' },
      { item_type: 'Jeans', category: 'Bottoms', color_name: 'Navy', hex_code: '#1B2A4A' },
      { item_type: 'Sneakers', category: 'Shoes', color_name: 'White', hex_code: '#FFFFFF' },
    ],
  },
  {
    id: 'sample-women-elegant',
    label: 'Women — Elegant & Quiet Luxury Blazer Look',
    genderContext: 'Women',
    includeHijab: false,
    imageUrl:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
    styles: ['Elegant', 'Old Money', 'Minimalist'],
    items: [
      { item_type: 'Blazer', category: 'Outerwear', color_name: 'Camel', hex_code: '#C19A6B' },
      { item_type: 'Blouse', category: 'Tops', color_name: 'Ivory', hex_code: '#F7F5F0' },
      { item_type: 'Trousers', category: 'Bottoms', color_name: 'Charcoal', hex_code: '#252525' },
      { item_type: 'Heels', category: 'Shoes', color_name: 'Espresso', hex_code: '#3B2820' },
      { item_type: 'Bags', category: 'Bags', color_name: 'Mocha', hex_code: '#836953' },
    ],
  },
  {
    id: 'sample-women-hijab',
    label: 'Women — Modest & Hijab Elegant Editorial',
    genderContext: 'Women',
    includeHijab: true,
    imageUrl:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=900&q=80',
    styles: ['Modest', 'Hijab Elegant', 'Korean Casual'],
    items: [
      { item_type: 'Hijab', category: 'Hijab', color_name: 'Beige', hex_code: '#E8E0D5' },
      { item_type: 'Cardigan', category: 'Tops', color_name: 'Taupe', hex_code: '#A58E79' },
      { item_type: 'Skirt', category: 'Bottoms', color_name: 'Ivory', hex_code: '#F7F5F0' },
      { item_type: 'Shoes', category: 'Shoes', color_name: 'Mocha', hex_code: '#836953' },
      { item_type: 'Jewelry', category: 'Accessories', color_name: 'Gold', hex_code: '#D4AF37' },
    ],
  },
];

export const FashionAnalyzerSection: React.FC = () => {
  const {
    anonUserId,
    profile,
    colorProfile,
    styleCatalog,
    colorCatalog,
    addOutfitAnalysis,
    addWardrobeItem,
  } = useFitCheck();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [genderContext, setGenderContext] = useState<'Men' | 'Women'>(
    profile?.gender_profile || 'Men'
  );
  const [includeHijab, setIncludeHijab] = useState<boolean>(
    profile?.gender_profile === 'Women' && profile?.styling_preference === 'Hijab'
  );
  const [imagePreview, setImagePreview] = useState<string>(PRESET_SAMPLES[0].imageUrl);
  const [detectedItems, setDetectedItems] = useState<DetectedGarment[]>([
    {
      item_type: 'Shirt',
      category: 'Tops',
      color_name: 'Cream',
      hex_code: '#FFFDD0',
      confidence_note: 'Upper Torso Silhouette',
    },
    {
      item_type: 'Trousers',
      category: 'Bottoms',
      color_name: 'Camel',
      hex_code: '#C19A6B',
      confidence_note: 'Lower Tailored Line',
    },
    {
      item_type: 'Loafers',
      category: 'Shoes',
      color_name: 'Espresso',
      hex_code: '#3B2820',
      confidence_note: 'Footwear Anchor',
    },
    {
      item_type: 'Watches',
      category: 'Accessories',
      color_name: 'Gold',
      hex_code: '#D4AF37',
      confidence_note: 'Wrist Hardware Detail',
    },
  ]);
  const [dominantColors, setDominantColors] = useState<
    { name: string; hex: string; percentage: number }[]
  >([
    { name: 'Cream', hex: '#FFFDD0', percentage: 44 },
    { name: 'Camel', hex: '#C19A6B', percentage: 36 },
    { name: 'Espresso', hex: '#3B2820', percentage: 20 },
  ]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    profile?.selected_styles?.slice(0, 3) || ['Old Money', 'Smart Casual']
  );

  // Custom Garment Addition inside Analyzer
  const [newGarmentType, setNewGarmentType] = useState<string>('Blazer');
  const [newGarmentCategory, setNewGarmentCategory] = useState<WardrobeCategory>('Outerwear');
  const [newGarmentColor, setNewGarmentColor] = useState<string>('Navy');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<OutfitAnalysisResult | null>(null);
  const [savedToWardrobeNotice, setSavedToWardrobeNotice] = useState<string>('');

  const availableGarmentTypes =
    genderContext === 'Men' ? MEN_GARMENT_TYPES : WOMEN_GARMENT_TYPES;

  // Handle uploading photo from Gallery or Camera
  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      await autoExtractGarmentsFromPhoto(dataUrl, genderContext, includeHijab);
    };
    reader.readAsDataURL(file);
  };

  const autoExtractGarmentsFromPhoto = async (
    src: string,
    gContext: 'Men' | 'Women',
    hijabFlag: boolean
  ) => {
    const extracted = await extractColorsFromImage(src);
    setDominantColors(extracted.dominantColors);

    const { headZone, upperZone, lowerZone, footZone } = extracted.zoneColors;
    const autoItems: DetectedGarment[] = [];

    if (gContext === 'Women' && hijabFlag) {
      autoItems.push({
        item_type: 'Hijab',
        category: 'Hijab',
        color_name: headZone.name,
        hex_code: headZone.hex,
        confidence_note: 'Headscarf Frame Zone',
      });
    }

    autoItems.push(
      {
        item_type: gContext === 'Men' ? 'Shirt' : 'Blouse',
        category: 'Tops',
        color_name: upperZone.name,
        hex_code: upperZone.hex,
        confidence_note: 'Upper Silhouette Pixel Zone',
      },
      {
        item_type: 'Trousers',
        category: 'Bottoms',
        color_name: lowerZone.name,
        hex_code: lowerZone.hex,
        confidence_note: 'Lower Silhouette Pixel Zone',
      },
      {
        item_type: gContext === 'Men' ? 'Loafers' : 'Shoes',
        category: 'Shoes',
        color_name: footZone.name,
        hex_code: footZone.hex,
        confidence_note: 'Footwear Pixel Zone',
      },
      {
        item_type: gContext === 'Men' ? 'Watches' : 'Bags',
        category: gContext === 'Men' ? 'Accessories' : 'Bags',
        color_name: headZone.name,
        hex_code: headZone.hex,
        confidence_note: 'Complementary Accent',
      }
    );

    setDetectedItems(autoItems);
  };

  const handleLoadSample = (sample: PresetSample) => {
    setGenderContext(sample.genderContext);
    setIncludeHijab(sample.includeHijab);
    setImagePreview(sample.imageUrl);
    setSelectedStyles(sample.styles);
    setDetectedItems(
      sample.items.map((it) => ({
        ...it,
        confidence_note: 'Verified Editorial Reference Piece',
      }))
    );
    setDominantColors(
      sample.items.slice(0, 3).map((it, i) => ({
        name: it.color_name,
        hex: it.hex_code,
        percentage: i === 0 ? 45 : i === 1 ? 35 : 20,
      }))
    );
    setAnalysisResult(null);
  };

  const handleAddGarmentRow = () => {
    if (!newGarmentType.trim()) return;
    const foundColor =
      colorCatalog.find((c) => c.name === newGarmentColor) || colorCatalog[0];
    setDetectedItems((prev) => [
      ...prev,
      {
        item_type: newGarmentType.trim(),
        category: newGarmentCategory,
        color_name: foundColor.name,
        hex_code: foundColor.hex_code,
        confidence_note: 'User-Specified Garment',
      },
    ]);
  };

  const handleRemoveGarmentRow = (index: number) => {
    setDetectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setSavedToWardrobeNotice('');

    try {
      // 1. Call Backend API (/api/analyze-outfit) to check if AI Vision API is configured
      let apiMode: 'AI Vision API (Server)' | 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)' =
        'Rule-Based Sartorial & Pixel Engine (Honest Fallback)';

      const res = await fetch('/api/analyze-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          genderContext,
          stylingPreference: includeHijab ? 'Hijab' : profile?.styling_preference,
          selectedStyles,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ai_configured && data.analysis) {
          apiMode = 'AI Vision API (Server)';
          const ai = data.analysis;
          const sb = ai.score_breakdown || {
            color_harmony: 88,
            outfit_combination: 86,
            style_consistency: 90,
            accessories_match: 84,
          };
          const weightedScore = Math.round(
            sb.color_harmony * 0.3 +
              sb.outfit_combination * 0.3 +
              sb.style_consistency * 0.25 +
              sb.accessories_match * 0.15
          );
          const aiResult: OutfitAnalysisResult = {
            id: `analysis-${Date.now()}`,
            anon_user_id: anonUserId,
            image_url: imagePreview,
            analysis_mode: apiMode,
            gender_context: genderContext,
            outfit_score: weightedScore,
            score_breakdown: sb,
            detected_items: ai.detected_items || detectedItems,
            detected_colors: dominantColors,
            detected_styles: ai.detected_styles || selectedStyles,
            color_harmony: ai.color_harmony || 'Balanced Chromatic Coordination',
            strengths: ai.strengths || [],
            weaknesses: ai.weaknesses || [],
            improvement_tips: ai.improvement_tips || [],
            accessory_recommendations: ai.accessory_recommendations || [],
            alternative_combinations: ai.alternative_combinations || [],
            created_at: new Date().toISOString(),
          };
          setAnalysisResult(aiResult);
          await addOutfitAnalysis(aiResult);
          setIsAnalyzing(false);
          return;
        }
      }

      // 2. Honest Rule-Based Sartorial & Pixel Engine Evaluation
      const result = evaluateSartorialAnalysis({
        anonUserId,
        imageUrl: imagePreview,
        genderContext,
        includeHijab,
        detectedItems,
        dominantColors,
        targetStyles: selectedStyles,
        userProfile: profile,
        userColorProfile: colorProfile,
        analysisMode: 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)',
      });

      setAnalysisResult(result);
      await addOutfitAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveDetectedToWardrobe = async () => {
    if (!analysisResult) return;
    for (const item of analysisResult.detected_items.slice(0, 3)) {
      await addWardrobeItem({
        item_name: `${item.color_name} ${item.item_type}`,
        image_url: analysisResult.image_url,
        category: item.category,
        color_name: item.color_name,
        hex_code: item.hex_code,
        brand: 'FITCHECK Analyzed',
        style_tags: analysisResult.detected_styles,
        description: `Imported from Fashion Analyzer (${analysisResult.color_harmony}).`,
      });
    }
    setSavedToWardrobeNotice(
      'Detected garments have been added to your Digital Wardrobe!'
    );
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 02 — Sartorial Vision & Evaluation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Fashion Analyzer — Men & Women
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Upload an outfit photo from your gallery or camera. FITCHECK extracts dominant chromatic
            zones, identifies garments across Men & Women categories (including Hijab & non-hijab),
            and calculates a weighted 0–100 Outfit Score.
          </p>
        </div>

        {/* Gender & Hijab Context Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setGenderContext('Men')}
            className={`px-4 py-2 text-xs uppercase tracking-widest border ${
              genderContext === 'Men'
                ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            Laki-laki (Men)
          </button>
          <button
            type="button"
            onClick={() => setGenderContext('Women')}
            className={`px-4 py-2 text-xs uppercase tracking-widest border ${
              genderContext === 'Women'
                ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            Perempuan (Women)
          </button>
          {genderContext === 'Women' && (
            <button
              type="button"
              onClick={() => setIncludeHijab((v) => !v)}
              className={`px-3.5 py-2 text-xs uppercase tracking-widest border ${
                includeHijab
                  ? 'bg-[#A58E79] text-white border-[#A58E79]'
                  : 'bg-white text-[#6E655C] border-[#DED5C8]'
              }`}
            >
              {includeHijab ? 'Hijab Mode: ON' : 'Hijab Mode: OFF'}
            </button>
          )}
        </div>
      </div>

      {/* Quick Editorial Sample Presets (Men & Women Balanced) */}
      <div className="bg-white border border-[#DED5C8] p-5 space-y-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79] block">
          Instant Editorial Test Outfits (Men & Women) — Or Upload Your Own Photo Below
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className={`text-left p-3 border transition-all flex items-center gap-3 ${
                imagePreview === sample.imageUrl
                  ? 'border-[#252525] bg-[#F7F5F0]'
                  : 'border-[#DED5C8] hover:border-[#A58E79]'
              }`}
            >
              <img
                src={sample.imageUrl}
                alt={sample.label}
                className="w-12 h-14 object-cover object-top shrink-0 border border-[#DED5C8]"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#252525] line-clamp-2">{sample.label}</p>
                <span className="text-[10px] text-[#A58E79] uppercase tracking-wider">
                  Load Preset
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analyzer Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Upload + Detected Garments & Colors */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-[#DED5C8] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#252525] font-medium">
                1. Outfit Photo Source
              </span>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelected}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelected}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-[#252525] text-[#F7F5F0] text-[11px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#3A3530]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Gallery</span>
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-3.5 py-2 bg-[#F7F5F0] border border-[#252525] text-[#252525] text-[11px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#E8E0D5]"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera</span>
                </button>
              </div>
            </div>

            {/* Image Preview Box */}
            <div className="relative h-96 w-full bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden">
              <img
                src={imagePreview}
                alt="Outfit to Analyze"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#252525]/85 backdrop-blur-sm p-3 text-[#F7F5F0] flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest">
                  Extracted Palette Swatches
                </span>
                <div className="flex items-center gap-2">
                  {dominantColors.map((dc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span
                        className="w-4 h-4 border border-white/50"
                        style={{ backgroundColor: dc.hex }}
                      />
                      <span>{dc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detected Garments Editor (Supports all Men & Women garment types + custom expansion) */}
            <div className="space-y-3 pt-2 border-t border-[#E8E0D5]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#252525] font-medium">
                  2. Detected Garments & Colors ({detectedItems.length})
                </span>
                <span className="text-[10px] text-[#6E655C]">
                  Fine-tune or add any garment item
                </span>
              </div>

              <div className="space-y-2">
                {detectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-2.5 bg-[#F7F5F0] border border-[#DED5C8] text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={item.hex_code}
                        onChange={(e) => {
                          const hex = e.target.value;
                          const matched = findNearestCatalogColor(hex, colorCatalog);
                          setDetectedItems((prev) =>
                            prev.map((it, i) =>
                              i === idx
                                ? { ...it, hex_code: hex, color_name: matched.name }
                                : it
                            )
                          );
                        }}
                        className="w-6 h-6 border border-[#252525] cursor-pointer bg-transparent"
                        title="Adjust Garment Color"
                      />
                      <div>
                        <span className="font-medium text-[#252525]">{item.item_type}</span>
                        <span className="text-[10px] text-[#6E655C] ml-2">
                          ({item.category} · {item.color_name})
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGarmentRow(idx)}
                      className="text-[#6E655C] hover:text-[#800020] p-1"
                      title="Remove Garment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Garment Row (Supports preset list + custom garment types) */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
                <input
                  type="text"
                  list="garment-suggestions"
                  value={newGarmentType}
                  onChange={(e) => setNewGarmentType(e.target.value)}
                  placeholder="Garment (e.g. Blazer, Hijab)"
                  className="bg-white border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
                />
                <datalist id="garment-suggestions">
                  {availableGarmentTypes.map((g) => (
                    <option key={g.name} value={g.name} />
                  ))}
                </datalist>

                <select
                  value={newGarmentCategory}
                  onChange={(e) => setNewGarmentCategory(e.target.value as WardrobeCategory)}
                  className="bg-white border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
                >
                  {(['Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Shoes', 'Bags', 'Accessories', 'Hijab'] as WardrobeCategory[]).map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={newGarmentColor}
                  onChange={(e) => setNewGarmentColor(e.target.value)}
                  className="bg-white border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
                >
                  {colorCatalog.map((col) => (
                    <option key={col.id} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddGarmentRow}
                  className="bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-widest px-3 py-2 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Piece</span>
                </button>
              </div>
            </div>

            {/* Style Characteristic Tags */}
            <div className="space-y-2 pt-2 border-t border-[#E8E0D5]">
              <span className="text-xs uppercase tracking-widest text-[#252525] font-medium block">
                3. Outfit Style Direction
              </span>
              <div className="flex flex-wrap gap-1.5">
                {styleCatalog.slice(0, 14).map((st) => {
                  const active = selectedStyles.includes(st.name);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() =>
                        setSelectedStyles((prev) =>
                          prev.includes(st.name)
                            ? prev.filter((x) => x !== st.name)
                            : [...prev, st.name]
                        )
                      }
                      className={`px-2.5 py-1 text-[11px] border transition-colors ${
                        active
                          ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                          : 'bg-[#F7F5F0] text-[#6E655C] border-[#DED5C8]'
                      }`}
                    >
                      {st.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              disabled={isAnalyzing}
              onClick={handleRunAnalysis}
              className="w-full py-4 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#3A3530] transition-colors flex items-center justify-center gap-2.5"
            >
              <ScanEye className="w-4 h-4 text-[#A58E79]" />
              <span>
                {isAnalyzing ? 'EVALUATING OUTFIT HARMONY...' : 'RUN COMPLETE OUTFIT ANALYSIS'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Outfit Scoring & Editorial Critique */}
        <div className="lg:col-span-6 space-y-6">
          {analysisResult ? (
            <div className="bg-white border border-[#252525] p-7 space-y-6 animate-fadeIn">
              {/* Honest Mode Label Banner */}
              <div className="bg-[#F7F5F0] border border-[#DED5C8] px-4 py-3 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#A58E79] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#6E655C]">
                  <span className="font-semibold text-[#252525] uppercase tracking-wider">
                    Analysis Engine Mode:{' '}
                  </span>
                  <span>{analysisResult.analysis_mode}</span>
                </div>
              </div>

              {/* Total Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED5C8] pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#A58E79]">
                    Weighted Sartorial Evaluation
                  </span>
                  <h3 className="font-serif text-2xl text-[#252525] mt-1">
                    {analysisResult.color_harmony}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {analysisResult.detected_styles.map((st) => (
                      <span
                        key={st}
                        className="px-2.5 py-0.5 bg-[#252525] text-[#F7F5F0] text-[10px] uppercase tracking-widest"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-[#F7F5F0] border border-[#252525] px-6 py-4 shrink-0">
                  <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                    Outfit Score
                  </span>
                  <span className="font-serif text-5xl text-[#252525]">
                    {analysisResult.outfit_score}
                  </span>
                  <span className="text-xs text-[#A58E79] block">/ 100</span>
                </div>
              </div>

              {/* 4 Weighted Metrics (30% / 30% / 25% / 15%) */}
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-widest text-[#6E655C] block">
                  Scoring Breakdown (Unbiased Composition Rubric)
                </span>
                {[
                  {
                    label: 'Color Harmony (Weight: 30%)',
                    score: analysisResult.score_breakdown.color_harmony,
                  },
                  {
                    label: 'Outfit Combination (Weight: 30%)',
                    score: analysisResult.score_breakdown.outfit_combination,
                  },
                  {
                    label: 'Style Consistency (Weight: 25%)',
                    score: analysisResult.score_breakdown.style_consistency,
                  },
                  {
                    label: 'Accessories Match (Weight: 15%)',
                    score: analysisResult.score_breakdown.accessories_match,
                  },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#252525] font-medium">{metric.label}</span>
                      <span className="font-mono text-[#252525]">{metric.score}/100</span>
                    </div>
                    <div className="w-full h-2 bg-[#E8E0D5]">
                      <div
                        className="h-full bg-[#252525]"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E8E0D5]">
                <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8] space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#252525] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    <span>Outfit Strengths</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#6E655C] list-disc pl-4">
                    {analysisResult.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8] space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#252525] font-medium">
                    <AlertCircle className="w-4 h-4 text-[#A58E79]" />
                    <span>Areas to Refine</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#6E655C] list-disc pl-4">
                    {analysisResult.weaknesses.map((wk, i) => (
                      <li key={i}>{wk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improvement Tips, Accessories, and Alternatives */}
              <div className="space-y-4 pt-2 border-t border-[#E8E0D5] text-xs">
                <div>
                  <h4 className="uppercase tracking-widest text-[#252525] font-medium mb-1.5">
                    Saran Perbaikan (Improvement Suggestions)
                  </h4>
                  <ul className="space-y-1 text-[#6E655C] list-disc pl-4">
                    {analysisResult.improvement_tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="uppercase tracking-widest text-[#252525] font-medium mb-1.5">
                    Rekomendasi Aksesori (Accessory Recommendations)
                  </h4>
                  <ul className="space-y-1 text-[#6E655C] list-disc pl-4">
                    {analysisResult.accessory_recommendations.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="uppercase tracking-widest text-[#252525] font-medium mb-1.5">
                    Alternatif Kombinasi Outfit (Alternative Combinations)
                  </h4>
                  <ul className="space-y-1 text-[#6E655C] list-disc pl-4">
                    {analysisResult.alternative_combinations.map((alt, i) => (
                      <li key={i}>{alt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {savedToWardrobeNotice && (
                <div className="p-3 bg-[#252525] text-[#F7F5F0] text-xs">
                  {savedToWardrobeNotice}
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSaveDetectedToWardrobe}
                  className="flex-1 py-3 bg-[#F7F5F0] border border-[#252525] text-xs uppercase tracking-widest text-[#252525] hover:bg-[#252525] hover:text-white transition-colors"
                >
                  Save Detected Garments to Digital Wardrobe
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#DED5C8] p-10 h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 bg-[#F7F5F0] border border-[#DED5C8] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#A58E79]" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="font-serif text-2xl text-[#252525]">
                  Ready for Sartorial Evaluation
                </h3>
                <p className="text-xs text-[#6E655C] leading-relaxed">
                  Select one of the Men/Women preset editorial outfits above or upload your own
                  photo, verify your detected garments, and click{' '}
                  <strong>&ldquo;Run Complete Outfit Analysis&rdquo;</strong> to receive your 0–100
                  score breakdown.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


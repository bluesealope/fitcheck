'use client';

import React, { useRef, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { SEASONAL_PALETTES } from '@/data/colorCatalog';
import { SeasonalPaletteItem, UndertoneType } from '@/types/fitcheck';
import { hexToRgb, rgbToHex } from '@/lib/fashionEngine';
import {
  Palette,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    desc: string;
    undertoneVote: UndertoneType;
    seasonHint: string;
  }[];
}

const COLOR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-veins',
    question: '1. Under natural daylight, how do the veins on the inside of your wrist appear?',
    options: [
      {
        label: 'Greenish or Olive',
        desc: 'Yellow-warm light filtering through skin.',
        undertoneVote: 'Warm Undertone',
        seasonHint: 'Warm Autumn',
      },
      {
        label: 'Blue or Purple-Violet',
        desc: 'Cool pink/rosy or blue skin translucency.',
        undertoneVote: 'Cool Undertone',
        seasonHint: 'Cool Summer',
      },
      {
        label: 'A Mix of Blue-Green / Hard to Tell',
        desc: 'Balanced warm-cool undertone.',
        undertoneVote: 'Neutral Undertone',
        seasonHint: 'Soft Autumn',
      },
    ],
  },
  {
    id: 'q2-jewelry',
    question: '2. Which metallic hardware or jewelry finish makes your skin look freshest and brightest?',
    options: [
      {
        label: 'Yellow Gold, Brass & Rose Bronze',
        desc: 'Enhances golden glow without looking sallow.',
        undertoneVote: 'Warm Undertone',
        seasonHint: 'Warm Spring',
      },
      {
        label: 'Silver, Platinum & White Gold',
        desc: 'Crisp clarity that calms redness.',
        undertoneVote: 'Cool Undertone',
        seasonHint: 'Cool Winter',
      },
      {
        label: 'Both Brushed Gold & Silver Work Equally',
        desc: 'Depends only on outfit palette.',
        undertoneVote: 'Neutral Undertone',
        seasonHint: 'Soft Summer',
      },
    ],
  },
  {
    id: 'q3-white-test',
    question: '3. When draping a shirt or hijab directly against your face, which white flatters you more?',
    options: [
      {
        label: 'Warm Ivory, Cream or Oatmeal Beige',
        desc: 'Stark optical white feels too clinical.',
        undertoneVote: 'Warm Undertone',
        seasonHint: 'Light Spring',
      },
      {
        label: 'Crisp Optical Pure White',
        desc: 'Creamy yellow-whites look dull on me.',
        undertoneVote: 'Cool Undertone',
        seasonHint: 'Bright Winter',
      },
      {
        label: 'Soft Off-White / Ecru & Charcoal',
        desc: 'Muted soft contrast feels most natural.',
        undertoneVote: 'Neutral Undertone',
        seasonHint: 'Deep Winter',
      },
    ],
  },
  {
    id: 'q4-contrast',
    question: '4. How would you describe the natural contrast between your hair, eyes, and skin?',
    options: [
      {
        label: 'Light & Sunlit (Low-to-Medium Contrast)',
        desc: 'Soft features that shine in fresh, light shades.',
        undertoneVote: 'Warm Undertone',
        seasonHint: 'Light Spring',
      },
      {
        label: 'Muted, Smoky & Velvety (Medium Blended)',
        desc: 'Earth tones, sage, taupe, and mocha look effortless.',
        undertoneVote: 'Neutral Undertone',
        seasonHint: 'Soft Autumn',
      },
      {
        label: 'High-Depth or Rich Dark Features (High Contrast)',
        desc: 'Deep espresso, black, navy, burgundy, or cobalt command attention.',
        undertoneVote: 'Cool Undertone',
        seasonHint: 'Deep Winter',
      },
    ],
  },
];

export const PersonalColorSection: React.FC = () => {
  const { profile, colorProfile, saveColorProfile } = useFitCheck();
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<'quiz' | 'photo' | 'explorer'>('quiz');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({
    'q1-veins': 0,
    'q2-jewelry': 0,
    'q3-white-test': 0,
    'q4-contrast': 1,
  });

  // Photo Assessment State
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [extractedSkinHex, setExtractedSkinHex] = useState<string>('#D8B49C');
  const [isAssessingPhoto, setIsAssessingPhoto] = useState<boolean>(false);

  // Active Seasonal Palette to inspect (defaults to user's saved palette or Soft Autumn)
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(() => {
    if (colorProfile) {
      const found = SEASONAL_PALETTES.find((s) => s.name === colorProfile.seasonal_palette);
      if (found) return found.id;
    }
    return 'soft-autumn';
  });

  const activeSeason: SeasonalPaletteItem =
    SEASONAL_PALETTES.find((s) => s.id === selectedSeasonId) || SEASONAL_PALETTES[6];

  const handleCompleteQuiz = async () => {
    let warmCount = 0;
    let coolCount = 0;
    let neutralCount = 0;

    COLOR_QUIZ_QUESTIONS.forEach((q) => {
      const idx = quizAnswers[q.id] ?? 0;
      const choice = q.options[idx];
      if (choice.undertoneVote === 'Warm Undertone') warmCount++;
      else if (choice.undertoneVote === 'Cool Undertone') coolCount++;
      else neutralCount++;
    });

    const contrastChoice = quizAnswers['q4-contrast'] ?? 1;
    let matchedSeason: SeasonalPaletteItem = SEASONAL_PALETTES[6]; // Soft Autumn default

    if (warmCount > coolCount && warmCount >= neutralCount) {
      if (contrastChoice === 0) {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'light-spring')!;
      } else if (contrastChoice === 1) {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'warm-autumn')!;
      } else {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'deep-autumn')!;
      }
    } else if (coolCount > warmCount && coolCount >= neutralCount) {
      if (contrastChoice === 0) {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'light-summer')!;
      } else if (contrastChoice === 1) {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'cool-summer')!;
      } else {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'cool-winter')!;
      }
    } else {
      // Neutral Undertone
      if (contrastChoice === 0) {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'soft-summer')!;
      } else if (contrastChoice === 1) {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'soft-autumn')!;
      } else {
        matchedSeason = SEASONAL_PALETTES.find((s) => s.id === 'deep-winter')!;
      }
    }

    setSelectedSeasonId(matchedSeason.id);
    await saveColorProfile({
      assessment_method: 'Personal Color Quiz',
      undertone: matchedSeason.undertone,
      seasonal_palette: matchedSeason.name,
      recommended_colors: matchedSeason.recommended_colors.map((c) => ({
        name: c.name,
        hex: c.hex,
      })),
      clothing_suggestions: matchedSeason.clothing_suggestions,
      hijab_suggestions: matchedSeason.hijab_suggestions,
    });
  };

  const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAssessingPhoto(true);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhotoPreview(dataUrl);

      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 64, 64);
          // Sample central portrait zone
          const data = ctx.getImageData(20, 16, 24, 24).data;
          let r = 0,
            g = 0,
            b = 0,
            cnt = 0;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 128) continue;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            cnt++;
          }
          if (cnt > 0) {
            const avgHex = rgbToHex(r / cnt, g / cnt, b / cnt);
            setExtractedSkinHex(avgHex);
            await evaluateSkinHexToSeason(avgHex);
          }
        }
        setIsAssessingPhoto(false);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const evaluateSkinHexToSeason = async (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    // Warm vs Cool Index: higher red+green relative to blue indicates golden/warm bias
    const warmthDelta = (r - b) * 0.6 + (g - b) * 0.4;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    let chosenId = 'soft-autumn';
    if (warmthDelta > 38) {
      chosenId = luminance > 175 ? 'light-spring' : luminance > 125 ? 'warm-autumn' : 'deep-autumn';
    } else if (warmthDelta < 18) {
      chosenId = luminance > 175 ? 'light-summer' : luminance > 125 ? 'cool-summer' : 'cool-winter';
    } else {
      chosenId = luminance > 165 ? 'soft-summer' : luminance > 120 ? 'soft-autumn' : 'deep-winter';
    }

    const matchedSeason =
      SEASONAL_PALETTES.find((s) => s.id === chosenId) || SEASONAL_PALETTES[6];
    setSelectedSeasonId(matchedSeason.id);

    await saveColorProfile({
      assessment_method: 'Photo-Based Color Assessment',
      undertone: matchedSeason.undertone,
      seasonal_palette: matchedSeason.name,
      recommended_colors: matchedSeason.recommended_colors.map((c) => ({
        name: c.name,
        hex: c.hex,
      })),
      clothing_suggestions: matchedSeason.clothing_suggestions,
      hijab_suggestions: matchedSeason.hijab_suggestions,
      extracted_skin_hex: hex,
    });
  };

  const showHijabSuggestions =
    profile?.gender_profile === 'Women' &&
    (profile.styling_preference === 'Hijab' ||
      profile.styling_preference === 'Flexible / No Preference');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 04 — Chromatic Harmony & Undertone
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Personal Color Analysis
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Identify your undertone (Warm, Cool, or Neutral) and explore all 12 Seasonal Palettes
            across Spring, Summer, Autumn, and Winter. Our recommendations empower your choices
            without ever prohibiting you from wearing any color you love.
          </p>
        </div>

        {/* Method Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2.5 text-xs uppercase tracking-widest border ${
              activeTab === 'quiz'
                ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            1. Personal Color Quiz
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-4 py-2.5 text-xs uppercase tracking-widest border ${
              activeTab === 'photo'
                ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            2. Photo Assessment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2.5 text-xs uppercase tracking-widest border ${
              activeTab === 'explorer'
                ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            3. All 12 Seasons Matrix
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Quiz or Photo Assessment Input */}
        <div className="lg:col-span-6 space-y-6">
          {activeTab === 'quiz' && (
            <div className="bg-white border border-[#DED5C8] p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                    Interactive Diagnostic
                  </span>
                  <h3 className="font-serif text-2xl text-[#252525]">
                    Personal Color Undertone Quiz
                  </h3>
                </div>
                <HelpCircle className="w-5 h-5 text-[#A58E79]" />
              </div>

              <div className="space-y-6">
                {COLOR_QUIZ_QUESTIONS.map((q) => (
                  <div key={q.id} className="space-y-2.5">
                    <p className="text-xs font-medium text-[#252525]">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, idx) => {
                        const selected = quizAnswers[q.id] === idx;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: idx }))
                            }
                            className={`w-full text-left p-3.5 border transition-colors flex items-start justify-between gap-3 ${
                              selected
                                ? 'bg-[#F7F5F0] border-[#252525]'
                                : 'bg-white border-[#DED5C8] hover:border-[#A58E79]'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-medium text-[#252525]">{opt.label}</p>
                              <p className="text-[11px] text-[#6E655C] mt-0.5">{opt.desc}</p>
                            </div>
                            <span
                              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 shrink-0 ${
                                selected
                                  ? 'bg-[#252525] text-white'
                                  : 'bg-[#F7F5F0] text-[#6E655C]'
                              }`}
                            >
                              {opt.undertoneVote.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCompleteQuiz}
                className="w-full py-4 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.22em] hover:bg-[#3A3530] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#A58E79]" />
                <span>Calculate My Undertone & Seasonal Palette</span>
              </button>
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="bg-white border border-[#DED5C8] p-7 space-y-6">
              <div className="border-b border-[#E8E0D5] pb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  Camera / Portrait Pixel Sampling
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  Photo-Based Color Assessment
                </h3>
              </div>

              {/* Mandatory Transparency Disclaimer (Requirement 4) */}
              <div className="bg-[#F7F5F0] border-l-4 border-[#A58E79] p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#A58E79] shrink-0 mt-0.5" />
                <div className="text-xs text-[#6E655C] space-y-1 leading-relaxed">
                  <p className="font-semibold text-[#252525] uppercase tracking-wider">
                    Honest Accuracy Notice
                  </p>
                  <p>
                    Photo-based color assessment is an <strong>estimation only</strong>. Ambient
                    lighting, camera white-balance, shadows, and digital filters can shift pixel
                    warmth. You can also fine-tune the sampled skin swatch below or combine with the
                    Personal Color Quiz.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelected}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="w-full py-4 border border-dashed border-[#252525] bg-[#F7F5F0] hover:bg-[#E8E0D5]/60 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <Camera className="w-6 h-6 text-[#252525]" />
                  <span className="text-xs uppercase tracking-widest text-[#252525] font-medium">
                    {isAssessingPhoto ? 'Sampling Portrait Tone...' : 'Upload Portrait Photo'}
                  </span>
                  <span className="text-[11px] text-[#6E655C]">
                    Natural daylight without heavy filters works best
                  </span>
                </button>

                {photoPreview && (
                  <div className="h-56 w-full bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden">
                    <img
                      src={photoPreview}
                      alt="Uploaded Portrait"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Manual / Interactive Skin Tone Calibrator */}
                <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#252525]">
                      Sampled Complexion Swatch
                    </span>
                    <span className="font-mono text-xs text-[#6E655C]">{extractedSkinHex}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={extractedSkinHex}
                      onChange={(e) => {
                        setExtractedSkinHex(e.target.value.toUpperCase());
                        evaluateSkinHexToSeason(e.target.value.toUpperCase());
                      }}
                      className="w-12 h-10 border border-[#252525] cursor-pointer bg-white"
                    />
                    <p className="text-xs text-[#6E655C]">
                      Adjust this swatch if indoor lighting shifted your photo, and FITCHECK will
                      recalculate your seasonal palette live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'explorer' && (
            <div className="bg-white border border-[#DED5C8] p-7 space-y-5">
              <div className="border-b border-[#E8E0D5] pb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  12-Season Directory
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  Explore All 12 Seasonal Palettes
                </h3>
                <p className="text-xs text-[#6E655C] mt-1">
                  Click any of the 12 seasonal palettes below to inspect its undertone, recommended
                  colors, combinations, and styling guidance—or set it as your active palette.
                </p>
              </div>

              {(['Spring', 'Summer', 'Autumn', 'Winter'] as const).map((family) => (
                <div key={family} className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#A58E79] block">
                    {family} Family
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {SEASONAL_PALETTES.filter((s) => s.season_family === family).map((season) => {
                      const active = selectedSeasonId === season.id;
                      return (
                        <button
                          key={season.id}
                          type="button"
                          onClick={() => setSelectedSeasonId(season.id)}
                          className={`p-3 text-left border transition-colors ${
                            active
                              ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                              : 'bg-[#F7F5F0] text-[#252525] border-[#DED5C8] hover:border-[#252525]'
                          }`}
                        >
                          <p className="font-serif text-sm">{season.name}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">{season.undertone}</p>
                          <div className="flex gap-1 mt-2">
                            {season.recommended_colors.slice(0, 4).map((rc) => (
                              <span
                                key={rc.name}
                                className="w-3.5 h-3.5 border border-white/40"
                                style={{ backgroundColor: rc.hex }}
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Active Undertone & Seasonal Palette Result Dossier */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-[#252525] p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED5C8] pb-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#A58E79]">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{activeSeason.season_family} Season</span>
                  <span>·</span>
                  <span>{activeSeason.undertone}</span>
                </div>
                <h3 className="font-serif text-3xl text-[#252525] mt-1">{activeSeason.name}</h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  saveColorProfile({
                    assessment_method:
                      activeTab === 'photo'
                        ? 'Photo-Based Color Assessment'
                        : 'Personal Color Quiz',
                    undertone: activeSeason.undertone,
                    seasonal_palette: activeSeason.name,
                    recommended_colors: activeSeason.recommended_colors.map((c) => ({
                      name: c.name,
                      hex: c.hex,
                    })),
                    clothing_suggestions: activeSeason.clothing_suggestions,
                    hijab_suggestions: activeSeason.hijab_suggestions,
                  })
                }
                className="px-4 py-2.5 bg-[#252525] text-[#F7F5F0] text-[11px] uppercase tracking-widest flex items-center gap-2 shrink-0"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A58E79]" />
                <span>
                  {colorProfile?.seasonal_palette === activeSeason.name
                    ? 'Saved to Profile'
                    : 'Save as My Palette'}
                </span>
              </button>
            </div>

            <p className="text-xs text-[#6E655C] leading-relaxed">
              {activeSeason.characteristics}
            </p>

            {/* Recommended Colors Swatches */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#252525] font-medium block">
                Recommended Signature Colors
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeSeason.recommended_colors.map((col) => (
                  <div
                    key={col.name}
                    className="p-3 bg-[#F7F5F0] border border-[#DED5C8] flex items-center gap-3"
                  >
                    <span
                      className="w-8 h-8 border border-[#252525]/25 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#252525] truncate">{col.name}</p>
                      <p className="text-[10px] text-[#6E655C] truncate">{col.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Combinations */}
            <div className="space-y-3 pt-2 border-t border-[#E8E0D5]">
              <span className="text-xs uppercase tracking-widest text-[#252525] font-medium block">
                Recommended Color Combinations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSeason.color_combinations.map((combo) => (
                  <div
                    key={combo.title}
                    className="p-4 bg-[#F7F5F0] border border-[#DED5C8] space-y-2.5"
                  >
                    <p className="font-serif text-base text-[#252525]">{combo.title}</p>
                    <div className="flex items-center gap-2">
                      {combo.colors.map((c) => (
                        <div key={c.name} className="flex items-center gap-1 text-[11px]">
                          <span
                            className="w-4 h-4 border border-[#252525]/30"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#6E655C]">{combo.vibe}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clothing Color Suggestions */}
            <div className="space-y-2 pt-2 border-t border-[#E8E0D5] text-xs">
              <h4 className="uppercase tracking-widest text-[#252525] font-medium">
                Clothing Color Suggestions
              </h4>
              <ul className="space-y-1.5 text-[#6E655C] list-disc pl-4">
                {activeSeason.clothing_suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>

            {/* Hijab Color Suggestions (Always accessible, highlighted when relevant) */}
            <div className="space-y-2 pt-2 border-t border-[#E8E0D5] text-xs">
              <div className="flex items-center justify-between">
                <h4 className="uppercase tracking-widest text-[#252525] font-medium">
                  Hijab & Headscarf Color Suggestions
                </h4>
                {showHijabSuggestions && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#A58E79] text-white">
                    Tailored for Your Profile
                  </span>
                )}
              </div>
              <ul className="space-y-1.5 text-[#6E655C] list-disc pl-4">
                {activeSeason.hijab_suggestions.map((hs, i) => (
                  <li key={i}>{hs}</li>
                ))}
              </ul>
            </div>

            {/* Freedom of Expression Note */}
            <div className="p-3.5 bg-[#F7F5F0] border border-[#DED5C8] text-[11px] text-[#6E655C]">
              <strong>Creative Freedom Note:</strong> Personal color palettes are a tool to
              illuminate your natural undertone—not a rulebook that bans any shade. If you love a
              color outside your season, wear it freely as bottoms, bags, footwear, or layered over
              an undertone-friendly collar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


'use client';

import React, { useMemo, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { GenderProfile, StylingPreference } from '@/types/fitcheck';
import { STYLE_GROUPS } from '@/data/styleCatalog';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Sparkles,
  Search,
  UserCheck,
  Sliders,
} from 'lucide-react';

export const PersonalizationFlow: React.FC = () => {
  const { profile, saveProfile, styleCatalog, isEditingProfile, setIsEditingProfile, anonUserId } =
    useFitCheck();

  const [step, setStep] = useState<number>(1);
  const [displayName, setDisplayName] = useState<string>(profile?.display_name || '');
  const [gender, setGender] = useState<GenderProfile | null>(profile?.gender_profile || null);
  const [age, setAge] = useState<number>(profile?.age || 21);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    profile?.selected_styles || ['Old Money', 'Minimalist']
  );
  const [stylingPreference, setStylingPreference] = useState<StylingPreference>(
    profile?.styling_preference || 'Flexible / No Preference'
  );
  const [styleSearch, setStyleSearch] = useState<string>('');
  const [activeStyleGroup, setActiveStyleGroup] = useState<string>('All');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const filteredStyles = useMemo(() => {
    return styleCatalog.filter((s) => {
      const matchesGroup = activeStyleGroup === 'All' || s.category_group === activeStyleGroup;
      const matchesSearch =
        !styleSearch.trim() ||
        s.name.toLowerCase().includes(styleSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(styleSearch.toLowerCase()) ||
        s.category_group.toLowerCase().includes(styleSearch.toLowerCase());
      return matchesGroup && matchesSearch;
    });
  }, [styleCatalog, activeStyleGroup, styleSearch]);

  const toggleStyle = (name: string) => {
    setSelectedStyles((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleAgeChange = (val: number) => {
    const clamped = Math.max(13, Math.min(50, val));
    setAge(clamped);
  };

  const handleComplete = async () => {
    if (!gender || selectedStyles.length === 0) return;
    setIsSubmitting(true);
    await saveProfile({
      display_name: displayName.trim() || (gender === 'Men' ? 'Sartorial Muse' : 'Editorial Muse'),
      gender_profile: gender,
      age: Math.max(13, Math.min(50, age)),
      selected_styles: selectedStyles,
      styling_preference: gender === 'Women' ? stylingPreference : 'Flexible / No Preference',
      favorite_colors: profile?.favorite_colors?.length
        ? profile.favorite_colors
        : ['Ivory', 'Charcoal', 'Taupe', 'Camel'],
      onboarding_completed: true,
    });
    setIsSubmitting(false);
  };

  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252525] flex flex-col justify-between">
      {/* Top Editorial Masthead */}
      <header className="border-b border-[#DED5C8] bg-[#F7F5F0]/95 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#6E655C]">
              Personal Fashion Analyzer & Digital Wardrobe
            </p>
            <h1 className="font-serif text-2xl md:text-3xl tracking-[0.12em] font-normal text-[#252525]">
              FITCHECK
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-[#6E655C]">
              <span>Folio 0{step}</span>
              <span>/</span>
              <span>0{totalSteps}</span>
            </div>
            {isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-xs uppercase tracking-widest border border-[#252525] px-4 py-2 hover:bg-[#252525] hover:text-[#F7F5F0] transition-colors"
              >
                Return to Atelier
              </button>
            )}
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#E8E0D5]">
          <div
            className="h-full bg-[#252525] transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 md:py-14">
        {/* Intro Tagline Banner */}
        <div className="mb-10 border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-[#A58E79] mb-2">
              {isEditingProfile ? 'Edit Fashion Profile' : 'Personalization Atelier — No Account Login Required'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#252525]">
              &ldquo;Discover Your Style. Define Your Look.&rdquo;
            </h2>
          </div>
          <p className="text-xs text-[#6E655C] max-w-md leading-relaxed">
            Curate your sartorial identity across five quick steps. Every gender can explore the entire
            FITCHECK catalog without restriction.
          </p>
        </div>

        {/* STEP 1: A. GENDER SELECTION */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#A58E79]">Step 01 — Profile Identity</p>
              <h3 className="font-serif text-2xl md:text-3xl text-[#252525]">
                How do you identify your fashion profile?
              </h3>
              <p className="text-sm text-[#6E655C]">
                This helps calibrate initial wardrobe silhouettes and styling references. All fashion styles
                remain open to every user.
              </p>
            </div>

            <div className="max-w-md">
              <label className="block text-xs uppercase tracking-widest text-[#6E655C] mb-2">
                Your Editorial Name / Moniker (Optional)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g., Arya, Nadia, Alex..."
                className="w-full bg-white border border-[#DED5C8] px-4 py-3 text-sm text-[#252525] focus:outline-none focus:border-[#252525]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Men Card */}
              <button
                type="button"
                onClick={() => setGender('Men')}
                className={`group text-left border transition-all overflow-hidden bg-white flex flex-col ${
                  gender === 'Men'
                    ? 'border-[#252525] ring-1 ring-[#252525]'
                    : 'border-[#DED5C8] hover:border-[#A58E79]'
                }`}
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#E8E0D5]">
                  <img
                    src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80"
                    alt="Men Fashion Editorial"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8E0D5] block mb-1">
                        Sartorial & Contemporary
                      </span>
                      <p className="font-serif text-2xl">Laki-laki (Men)</p>
                    </div>
                    <div
                      className={`w-8 h-8 flex items-center justify-center border ${
                        gender === 'Men'
                          ? 'bg-white text-[#252525] border-white'
                          : 'border-white/60 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-sm text-[#252525] font-medium">
                    Tailoring, Streetwear, Old Money, Minimalist, Casual & Full Style Catalog
                  </p>
                  <p className="text-xs text-[#6E655C] leading-relaxed">
                    Recognizes shirts, polos, hoodies, blazers, suits, trousers, jeans, loafers, sneakers,
                    watches, bags, and unlimited cross-category styles.
                  </p>
                </div>
              </button>

              {/* Women Card */}
              <button
                type="button"
                onClick={() => setGender('Women')}
                className={`group text-left border transition-all overflow-hidden bg-white flex flex-col ${
                  gender === 'Women'
                    ? 'border-[#252525] ring-1 ring-[#252525]'
                    : 'border-[#DED5C8] hover:border-[#A58E79]'
                }`}
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#E8E0D5]">
                  <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
                    alt="Women Fashion Editorial"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8E0D5] block mb-1">
                        Editorial & Inclusive
                      </span>
                      <p className="font-serif text-2xl">Perempuan (Women)</p>
                    </div>
                    <div
                      className={`w-8 h-8 flex items-center justify-center border ${
                        gender === 'Women'
                          ? 'bg-white text-[#252525] border-white'
                          : 'border-white/60 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-sm text-[#252525] font-medium">
                    Elegant, Korean Style, Old Money, Streetwear, Modest / Hijab & Full Style Catalog
                  </p>
                  <p className="text-xs text-[#6E655C] leading-relaxed">
                    Recognizes blouses, cardigans, blazers, dresses, skirts, trousers, hijab, heels,
                    sneakers, bags, jewelry, and all aesthetic directions.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: B. AGE SELECTION (13 - 50) */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn max-w-3xl">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#A58E79]">Step 02 — Chronology</p>
              <h3 className="font-serif text-2xl md:text-3xl text-[#252525]">How old are you?</h3>
              <p className="text-sm text-[#6E655C]">
                Select your age between 13 and 50 years. FITCHECK uses this to fine-tune occasion context while
                keeping your aesthetic freedom 100% open.
              </p>
            </div>

            <div className="bg-white border border-[#DED5C8] p-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E0D5] pb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#6E655C] block">
                    Selected Age
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-serif text-6xl text-[#252525]">{age}</span>
                    <span className="text-sm uppercase tracking-widest text-[#A58E79]">Years Old</span>
                  </div>
                </div>

                {/* Dropdown selector 13-50 */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-2">
                    Quick Age Dropdown (13–50)
                  </label>
                  <select
                    value={age}
                    onChange={(e) => handleAgeChange(Number(e.target.value))}
                    className="bg-[#F7F5F0] border border-[#DED5C8] px-4 py-2.5 text-sm text-[#252525] focus:outline-none focus:border-[#252525]"
                  >
                    {Array.from({ length: 38 }, (_, idx) => idx + 13).map((yr) => (
                      <option key={yr} value={yr}>
                        {yr} Years Old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Precision Slider 13-50 */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs uppercase tracking-widest text-[#6E655C]">
                  <span>Min: 13 yrs</span>
                  <span>Drag Slider</span>
                  <span>Max: 50 yrs</span>
                </div>
                <input
                  type="range"
                  min={13}
                  max={50}
                  value={age}
                  onChange={(e) => handleAgeChange(Number(e.target.value))}
                  className="w-full accent-[#252525] cursor-pointer h-2 bg-[#E8E0D5]"
                />
              </div>

              {/* Number Grid 13-50 */}
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-[#6E655C]">
                  Or pick directly from the age matrix (13–50 only):
                </p>
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                  {Array.from({ length: 38 }, (_, idx) => idx + 13).map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => handleAgeChange(yr)}
                      className={`py-2 text-xs font-medium border transition-colors ${
                        age === yr
                          ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                          : 'bg-[#F7F5F0] text-[#252525] border-[#DED5C8] hover:border-[#252525]'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: C. FASHION STYLE SELECTION */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[#A58E79]">
                  Step 03 — Aesthetic Direction
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-[#252525]">
                  Which fashion styles do you love?
                </h3>
                <p className="text-sm text-[#6E655C]">
                  Select as many styles as you resonate with ({selectedStyles.length} selected). Male and female
                  users can freely select any aesthetic from all 14 groups.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#6E655C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={styleSearch}
                  onChange={(e) => setStyleSearch(e.target.value)}
                  placeholder="Search Old Money, Y2K, Korean..."
                  className="w-full bg-white border border-[#DED5C8] pl-10 pr-4 py-2.5 text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
                />
              </div>
            </div>

            {/* Category Group Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setActiveStyleGroup('All')}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-widest whitespace-nowrap border transition-colors ${
                  activeStyleGroup === 'All'
                    ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                    : 'bg-white text-[#252525] border-[#DED5C8] hover:border-[#252525]'
                }`}
              >
                All Groups ({styleCatalog.length})
              </button>
              {STYLE_GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveStyleGroup(group)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-widest whitespace-nowrap border transition-colors ${
                    activeStyleGroup === group
                      ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                      : 'bg-white text-[#252525] border-[#DED5C8] hover:border-[#252525]'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Selected Styles Bar */}
            {selectedStyles.length > 0 && (
              <div className="bg-[#E8E0D5]/60 border border-[#DED5C8] p-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest text-[#6E655C] mr-2">
                  Selected ({selectedStyles.length}):
                </span>
                {selectedStyles.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleStyle(st)}
                    className="bg-[#252525] text-[#F7F5F0] text-xs px-3 py-1 flex items-center gap-1.5"
                  >
                    <span>{st}</span>
                    <span className="text-[#A58E79]">×</span>
                  </button>
                ))}
              </div>
            )}

            {/* Style Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[560px] overflow-y-auto pr-1">
              {filteredStyles.map((style) => {
                const isSelected = selectedStyles.includes(style.name);
                const imgUrl = gender === 'Men' ? style.visual_url_men : style.visual_url_women;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => toggleStyle(style.name)}
                    className={`text-left bg-white border transition-all flex flex-col overflow-hidden ${
                      isSelected
                        ? 'border-[#252525] ring-1 ring-[#252525]'
                        : 'border-[#DED5C8] hover:border-[#A58E79]'
                    }`}
                  >
                    <div className="relative h-44 w-full bg-[#E8E0D5] overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={style.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 left-3 bg-[#252525]/85 text-[#F7F5F0] px-2.5 py-1 text-[10px] uppercase tracking-widest">
                        {style.category_group}
                      </div>
                      <div
                        className={`absolute top-3 right-3 w-7 h-7 flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#252525] text-white border-[#252525]'
                            : 'bg-white/80 text-transparent border-[#DED5C8]'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-serif text-lg text-[#252525]">{style.name}</h4>
                        <p className="text-xs text-[#6E655C] line-clamp-2 mt-1 leading-relaxed">
                          {style.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-2 border-t border-[#E8E0D5]">
                        {style.color_palette.map((cp) => (
                          <span
                            key={cp.name}
                            title={cp.name}
                            className="w-4 h-4 border border-[#DED5C8]"
                            style={{ backgroundColor: cp.hex }}
                          />
                        ))}
                        <span className="text-[10px] text-[#6E655C] ml-auto uppercase tracking-wider">
                          {style.key_elements[0]}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: D. ADDITIONAL STYLING PREFERENCES */}
        {step === 4 && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#A58E79]">
                Step 04 — Additional Styling Preferences
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-[#252525]">
                {gender === 'Women'
                  ? 'How would you like FITCHECK to tailor your styling & modest coverage?'
                  : 'Inclusive Styling & Silhouette Freedom'}
              </h3>
              <p className="text-sm text-[#6E655C]">
                {gender === 'Women'
                  ? 'Select Hijab, Non-Hijab, or Flexible / No Preference. This adjusts outfit layering and headscarf coordination without restricting your fashion style choices.'
                  : 'As a Men profile user, you are never restricted to masculine-only categories—you can explore Classic Menswear, Old Money, Korean Fashion, Streetwear, Artistic, Feminine, or any aesthetic in FITCHECK.'}
              </p>
            </div>

            {gender === 'Women' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(
                  [
                    {
                      value: 'Hijab' as StylingPreference,
                      title: 'Hijab',
                      subtitle: 'Modest & Headscarf Coordinated',
                      desc: 'Includes pashmina/chiffon hijab color harmony, longline layering, and opaque silhouettes across all styles.',
                    },
                    {
                      value: 'Non-Hijab' as StylingPreference,
                      title: 'Non-Hijab',
                      subtitle: 'Open Neckline & Contemporary',
                      desc: 'Focuses on neckline proportions, collar framing, jewelry pairings, and full-spectrum contemporary silhouettes.',
                    },
                    {
                      value: 'Flexible / No Preference' as StylingPreference,
                      title: 'Flexible / No Preference',
                      subtitle: 'Versatile Hybrid Recommendations',
                      desc: 'Displays both hijab-friendly and non-hijab styling variations so you can adapt per occasion.',
                    },
                  ] as const
                ).map((opt) => {
                  const active = stylingPreference === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStylingPreference(opt.value)}
                      className={`text-left p-6 bg-white border transition-all flex flex-col justify-between ${
                        active
                          ? 'border-[#252525] ring-1 ring-[#252525]'
                          : 'border-[#DED5C8] hover:border-[#A58E79]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
                            {opt.subtitle}
                          </span>
                          <div
                            className={`w-6 h-6 flex items-center justify-center border ${
                              active
                                ? 'bg-[#252525] text-white border-[#252525]'
                                : 'border-[#DED5C8] text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <h4 className="font-serif text-xl text-[#252525]">{opt.title}</h4>
                        <p className="text-xs text-[#6E655C] leading-relaxed">{opt.desc}</p>
                      </div>
                      <div className="mt-6 pt-3 border-t border-[#E8E0D5] text-[11px] uppercase tracking-widest text-[#252525]">
                        {active ? 'Active Preference' : 'Select Option'}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-[#DED5C8] p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F7F5F0] border border-[#DED5C8]">
                    <Sliders className="w-5 h-5 text-[#252525]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl text-[#252525]">
                      Unrestricted Sartorial Exploration Enabled
                    </h4>
                    <p className="text-sm text-[#6E655C] leading-relaxed">
                      Your profile is set to <strong>Laki-laki (Men)</strong> with full access to every
                      aesthetic in the FITCHECK Style Library—from Savile Row Classic Menswear, Old Money,
                      and Streetwear to Korean Fashion, Artistic, Vintage, and Avant-Garde silhouettes.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E0D5]">
                  <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
                    <p className="text-xs uppercase tracking-widest text-[#A58E79] mb-1">
                      Garment Recognition
                    </p>
                    <p className="text-xs text-[#252525]">
                      T-Shirts, Shirts, Polos, Hoodies, Sweaters, Jackets, Blazers, Suits, Jeans, Trousers,
                      Shorts, Sneakers, Loafers, Boots, Watches, Bags & Accessories.
                    </p>
                  </div>
                  <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
                    <p className="text-xs uppercase tracking-widest text-[#A58E79] mb-1">
                      Unbiased Scoring
                    </p>
                    <p className="text-xs text-[#252525]">
                      Outfits are evaluated on Color Harmony (30%), Outfit Combination (30%), Style
                      Consistency (25%), and Accessories Match (15%)—never rigid gender stereotypes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: E. CONFIRMATION & F. PROFILE PERSISTENCE NOTICE */}
        {step === 5 && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#A58E79]">
                Step 05 — Fashion Profile Dossier
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-[#252525]">
                Confirm Your FITCHECK Fashion Profile
              </h3>
              <p className="text-sm text-[#6E655C]">
                Review your personalized dossier below before entering the FITCHECK platform.
              </p>
            </div>

            <div className="bg-white border border-[#252525] p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DED5C8] pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#A58E79]">
                    FITCHECK Sartorial Identity
                  </span>
                  <h4 className="font-serif text-3xl text-[#252525] mt-1">
                    {displayName.trim() || (gender === 'Men' ? 'Sartorial Muse' : 'Editorial Muse')}
                  </h4>
                </div>
                <div className="text-xs text-[#6E655C] font-mono bg-[#F7F5F0] px-3 py-2 border border-[#DED5C8]">
                  Anonymous Device ID: {anonUserId}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
                  <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                    Fashion Profile
                  </span>
                  <p className="font-serif text-xl text-[#252525] mt-1">
                    {gender === 'Men' ? 'Laki-laki (Men)' : 'Perempuan (Women)'}
                  </p>
                </div>
                <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
                  <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                    Age Calibration
                  </span>
                  <p className="font-serif text-xl text-[#252525] mt-1">{age} Years Old</p>
                </div>
                <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
                  <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                    Styling Preference
                  </span>
                  <p className="font-serif text-xl text-[#252525] mt-1">
                    {gender === 'Women' ? stylingPreference : 'All-Category Inclusive'}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#6E655C] block mb-3">
                  Curated Fashion Styles ({selectedStyles.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedStyles.map((st) => (
                    <span
                      key={st}
                      className="px-3.5 py-1.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-wider"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Honest Profile Persistence Disclaimer (Requirement 1.F) */}
              <div className="bg-[#F7F5F0] border-l-4 border-[#A58E79] p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#A58E79] shrink-0 mt-0.5" />
                <div className="text-xs text-[#6E655C] space-y-1 leading-relaxed">
                  <p className="font-semibold text-[#252525] uppercase tracking-wider">
                    Transparency Note on Passwordless Profile Persistence
                  </p>
                  <p>
                    FITCHECK does not use email/password login or create fake accounts. Your profile,
                    Digital Wardrobe, and Fashion History are linked to your device via an{' '}
                    <strong>Anonymous User ID</strong> stored in local storage and synced with Supabase RLS
                    when configured. Because this is an unauthenticated profile, it is bound to this
                    browser/device and is not a password-protected personal account across separate devices.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleComplete}
                  className="w-full py-4 bg-[#252525] text-[#F7F5F0] text-sm uppercase tracking-[0.22em] font-medium hover:bg-[#3A3530] transition-colors flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-4 h-4 text-[#A58E79]" />
                  <span>{isSubmitting ? 'INITIALIZING ATELIER...' : "LET'S EXPLORE FITCHECK"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Step Controls */}
      <footer className="border-t border-[#DED5C8] bg-white py-5 px-6 sticky bottom-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest border flex items-center gap-2 transition-colors ${
              step === 1
                ? 'border-[#E8E0D5] text-[#B8B0A4] cursor-not-allowed'
                : 'border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`w-2.5 h-2.5 border border-[#252525] ${
                  step === num ? 'bg-[#252525]' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          {step < 5 ? (
            <button
              type="button"
              disabled={(step === 1 && !gender) || (step === 3 && selectedStyles.length === 0)}
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${
                (step === 1 && !gender) || (step === 3 && selectedStyles.length === 0)
                  ? 'bg-[#E8E0D5] text-[#9E9589] cursor-not-allowed'
                  : 'bg-[#252525] text-[#F7F5F0] hover:bg-[#3A3530]'
              }`}
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#A58E79] text-white hover:bg-[#8E7762] transition-colors flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Let&apos;s Explore FITCHECK</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};


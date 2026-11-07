'use client';

import React, { useMemo, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { generateDynamicRecommendations } from '@/lib/recommendationEngine';
import {
  ArrowUpRight,
  ScanEye,
  Shirt,
  Palette,
  Layers,
  Calendar,
  BookOpen,
  Pipette,
  Sparkles,
  Clock,
  Sliders,
} from 'lucide-react';

export const DashboardSection: React.FC = () => {
  const {
    profile,
    wardrobe,
    analyses,
    savedOutfits,
    outfitPlans,
    colorProfile,
    setActiveNav,
    setIsEditingProfile,
  } = useFitCheck();

  const [selectedOccasion, setSelectedOccasion] = useState<string>('All Occasions');
  const [selectedActivity, setSelectedActivity] = useState<string>('Daily Versatile');

  const recommendations = useMemo(() => {
    if (!profile) return [];
    return generateDynamicRecommendations({
      profile,
      colorProfile,
      wardrobe,
      selectedOccasion,
      selectedActivity,
    });
  }, [profile, colorProfile, wardrobe, selectedOccasion, selectedActivity]);

  if (!profile) return null;

  return (
    <div className="space-y-12">
      {/* 1. Editorial Hero & Welcome Message (Balanced Men & Women Visuals) */}
      <section className="bg-white border border-[#DED5C8] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#A58E79]">
                <span>Issue No. 01 — Personal Dossier</span>
                <span>·</span>
                <span>{profile.gender_profile} Profile</span>
                <span>·</span>
                <span>Age {profile.age}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#252525] leading-tight">
                Welcome to Your Atelier, {profile.display_name}.
              </h2>
              <p className="text-sm text-[#6E655C] max-w-xl leading-relaxed">
                &ldquo;Discover Your Style. Define Your Look.&rdquo; Your fashion profile is calibrated around{' '}
                <strong className="text-[#252525] font-medium">
                  {profile.selected_styles.slice(0, 4).join(', ')}
                </strong>
                {profile.gender_profile === 'Women'
                  ? ` with ${profile.styling_preference} styling coordination.`
                  : ' with full cross-category sartorial freedom.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveNav('analyzer')}
                className="px-6 py-3.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2"
              >
                <ScanEye className="w-4 h-4 text-[#A58E79]" />
                <span>Analyze Outfit Now</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveNav('outfit-generator')}
                className="px-5 py-3.5 bg-[#F7F5F0] border border-[#252525] text-[#252525] text-xs uppercase tracking-[0.2em] hover:bg-[#E8E0D5] transition-colors flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Mix & Match Wardrobe</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="px-4 py-3.5 border border-[#DED5C8] text-[#6E655C] hover:text-[#252525] hover:border-[#252525] text-xs uppercase tracking-widest transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Dual Editorial Lookbook Split (Men & Women Balanced Representation) */}
          <div className="lg:col-span-5 grid grid-cols-2 border-t lg:border-t-0 lg:border-l border-[#DED5C8] bg-[#E8E0D5]">
            <div className="relative h-64 lg:h-auto overflow-hidden border-r border-[#DED5C8]">
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80"
                alt="Menswear Lookbook"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-3 left-3 bg-[#252525]/85 text-[#F7F5F0] px-2.5 py-1 text-[9px] uppercase tracking-widest">
                Men Sartorial
              </div>
            </div>
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
                alt="Womenswear Lookbook"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-3 left-3 bg-[#252525]/85 text-[#F7F5F0] px-2.5 py-1 text-[9px] uppercase tracking-widest">
                Women Editorial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Strip (Real Stored Data) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setActiveNav('wardrobe')}
          className="text-left bg-white border border-[#DED5C8] p-6 hover:border-[#252525] transition-colors flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#A58E79]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Digital Wardrobe</span>
            <Shirt className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-4xl text-[#252525]">{wardrobe.length}</span>
            <p className="text-xs text-[#6E655C] mt-1">Cataloged Garments & Pieces</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveNav('history')}
          className="text-left bg-white border border-[#DED5C8] p-6 hover:border-[#252525] transition-colors flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#A58E79]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Outfit Analyses</span>
            <ScanEye className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-4xl text-[#252525]">{analyses.length}</span>
            <p className="text-xs text-[#6E655C] mt-1">
              {analyses[0] ? `Latest Score: ${analyses[0].outfit_score}/100` : 'Ready to Analyze'}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveNav('outfit-generator')}
          className="text-left bg-white border border-[#DED5C8] p-6 hover:border-[#252525] transition-colors flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#A58E79]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Favorite Outfits</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-4xl text-[#252525]">{savedOutfits.length}</span>
            <p className="text-xs text-[#6E655C] mt-1">Saved Mix & Match Looks</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveNav('personal-color')}
          className="text-left bg-white border border-[#DED5C8] p-6 hover:border-[#252525] transition-colors flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#A58E79]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Personal Color</span>
            <Palette className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-2xl text-[#252525] block truncate">
              {colorProfile ? colorProfile.seasonal_palette : 'Assess Palette'}
            </span>
            <p className="text-xs text-[#6E655C] mt-1">
              {colorProfile ? colorProfile.undertone : '12-Season Undertone Quiz & Photo'}
            </p>
          </div>
        </button>
      </section>

      {/* 3. Fashion Profile Dossier Summary */}
      <section className="bg-white border border-[#DED5C8] p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E0D5] pb-5 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#A58E79]">
              Active Personalization Matrix
            </span>
            <h3 className="font-serif text-2xl text-[#252525]">Your Fashion Profile</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveNav('style-library')}
              className="text-xs uppercase tracking-widest border border-[#DED5C8] px-4 py-2 hover:border-[#252525]"
            >
              Manage Styles ({profile.selected_styles.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('color-library')}
              className="text-xs uppercase tracking-widest border border-[#DED5C8] px-4 py-2 hover:border-[#252525]"
            >
              Favorite Colors ({profile.favorite_colors.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#6E655C] mb-2">
              Selected Style Aesthetics
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.selected_styles.map((st) => (
                <span
                  key={st}
                  className="px-3 py-1 bg-[#F7F5F0] border border-[#DED5C8] text-xs text-[#252525]"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#6E655C] mb-2">
              Curated Color Swatches
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.favorite_colors.map((col) => (
                <span
                  key={col}
                  className="px-3 py-1 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-wider"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#6E655C] mb-2">
              Identity & Styling Calibration
            </p>
            <p className="text-xs text-[#252525] leading-relaxed">
              Profile: <strong>{profile.gender_profile}</strong> · Age: <strong>{profile.age}</strong> ·
              Preference: <strong>{profile.styling_preference}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 4. STYLE RECOMMENDATION ENGINE (Requirement 8) */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#DED5C8] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#A58E79]">
              Personalized Intelligence — Requirement 08
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#252525]">
              Style Recommendation Engine
            </h3>
            <p className="text-xs text-[#6E655C] mt-1">
              Synthesized dynamically from your gender preference ({profile.gender_profile}), age (
              {profile.age}), styles, undertone ({colorProfile?.undertone || 'Neutral'}), and Digital
              Wardrobe.
            </p>
          </div>

          {/* Occasion & Daily Activity Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-[#DED5C8] px-3 py-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#A58E79]" />
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">Occasion:</span>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="text-xs text-[#252525] bg-transparent focus:outline-none"
              >
                <option value="All Occasions">All Occasions</option>
                <option value="Campus & Study">Campus & Study</option>
                <option value="Executive Office">Executive Office</option>
                <option value="Dinner & Fine Social">Dinner & Fine Social</option>
                <option value="Weekend Café & Gallery">Weekend Café & Gallery</option>
                <option value="Formal Ceremony">Formal Ceremony</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white border border-[#DED5C8] px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">Activity:</span>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="text-xs text-[#252525] bg-transparent focus:outline-none"
              >
                <option value="Daily Versatile">Daily Versatile</option>
                <option value="Indoor Presentation">Indoor Presentation</option>
                <option value="Outdoor City Walk">Outdoor City Walk</option>
                <option value="Creative Studio">Creative Studio</option>
                <option value="Evening Gathering">Evening Gathering</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white border border-[#DED5C8] p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
                    {rec.style_focus} · {rec.occasion}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#A58E79]" />
                </div>

                <h4 className="font-serif text-xl text-[#252525]">{rec.title}</h4>

                {/* Recommended Pieces List */}
                <div className="space-y-2">
                  {rec.recommended_pieces.map((piece, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-[#F7F5F0] border border-[#E8E0D5] text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 border border-[#252525]/30 shrink-0"
                          style={{ backgroundColor: piece.hex }}
                        />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#6E655C] block">
                            {piece.slot}
                          </span>
                          <span className="text-[#252525] font-medium">{piece.item_name}</span>
                        </div>
                      </div>
                      {piece.from_wardrobe && (
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#252525] text-[#F7F5F0]">
                          In Wardrobe
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#6E655C] leading-relaxed">{rec.rationale}</p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5] space-y-3">
                <p className="text-[11px] italic font-serif text-[#252525]">
                  Stylist Note: &ldquo;{rec.styling_note}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => setActiveNav('outfit-generator')}
                  className="w-full py-2.5 border border-[#252525] text-xs uppercase tracking-widest text-[#252525] hover:bg-[#252525] hover:text-white transition-colors"
                >
                  Build in Outfit Generator
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quick Access Features & Recent Activities */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Access Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-b border-[#DED5C8] pb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
              Platform Modules
            </span>
            <h3 className="font-serif text-2xl text-[#252525]">Quick Access Features</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                nav: 'analyzer' as const,
                title: 'Fashion Analyzer',
                desc: 'Upload an outfit photo for Men & Women garment detection & 0–100 scoring.',
                icon: ScanEye,
              },
              {
                nav: 'wardrobe' as const,
                title: 'Digital Wardrobe',
                desc: 'Add, edit, filter, and manage your tops, bottoms, dresses, shoes, bags & hijab.',
                icon: Shirt,
              },
              {
                nav: 'personal-color' as const,
                title: 'Personal Color Analysis',
                desc: 'Discover your Warm/Cool/Neutral undertone & 12-season color palette.',
                icon: Palette,
              },
              {
                nav: 'style-library' as const,
                title: 'Fashion Style Library',
                desc: 'Explore 49+ styles across 14 groups with Men & Women visual references.',
                icon: BookOpen,
              },
              {
                nav: 'color-library' as const,
                title: 'Complete Color Library',
                desc: 'Search 44+ editorial shades, HEX codes, color picker & undertone matching.',
                icon: Pipette,
              },
              {
                nav: 'outfit-planner' as const,
                title: 'Outfit Planner Calendar',
                desc: 'Schedule upcoming event outfits and notes using your real wardrobe.',
                icon: Calendar,
              },
            ].map((feat) => {
              const Icon = feat.icon;
              return (
                <button
                  key={feat.nav}
                  type="button"
                  onClick={() => setActiveNav(feat.nav)}
                  className="text-left bg-white border border-[#DED5C8] p-5 hover:border-[#252525] transition-colors group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-5 h-5 text-[#A58E79] group-hover:text-[#252525] transition-colors" />
                    <ArrowUpRight className="w-4 h-4 text-[#6E655C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#252525]">{feat.title}</h4>
                    <p className="text-xs text-[#6E655C] mt-1 leading-relaxed">{feat.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activities & Favorite Outfits */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-b border-[#DED5C8] pb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
              Live Log
            </span>
            <h3 className="font-serif text-2xl text-[#252525]">
              Recent Activities & Scheduled Looks
            </h3>
          </div>

          <div className="bg-white border border-[#DED5C8] p-6 space-y-5">
            {/* Latest Analysis */}
            {analyses.length > 0 ? (
              <div className="border-b border-[#E8E0D5] pb-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A58E79] mb-2">
                  <span>Latest Outfit Analysis</span>
                  <span>Score: {analyses[0].outfit_score}/100</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={analyses[0].image_url}
                    alt="Recent Analysis"
                    className="w-14 h-14 object-cover border border-[#DED5C8]"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#252525]">
                      {analyses[0].detected_styles.join(' · ')}
                    </p>
                    <p className="text-[11px] text-[#6E655C]">{analyses[0].color_harmony}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-b border-[#E8E0D5] pb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#252525]">No Outfit Analyses Yet</p>
                  <p className="text-[11px] text-[#6E655C]">
                    Upload your first outfit photo in Fashion Analyzer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('analyzer')}
                  className="px-3 py-1.5 bg-[#252525] text-white text-[10px] uppercase tracking-widest"
                >
                  Analyze
                </button>
              </div>
            )}

            {/* Upcoming Outfit Plans */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-[#6E655C] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A58E79]" />
                  <span>Scheduled Outfit Plans ({outfitPlans.length})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveNav('outfit-planner')}
                  className="text-[10px] uppercase tracking-widest text-[#252525] underline"
                >
                  Open Planner
                </button>
              </div>

              {outfitPlans.slice(0, 2).map((plan) => (
                <div key={plan.id} className="p-3 bg-[#F7F5F0] border border-[#DED5C8] text-xs">
                  <div className="flex justify-between font-medium text-[#252525]">
                    <span>{plan.event_name}</span>
                    <span className="font-mono text-[11px] text-[#A58E79]">{plan.plan_date}</span>
                  </div>
                  <p className="text-[11px] text-[#6E655C] mt-0.5">{plan.outfit_title}</p>
                </div>
              ))}
            </div>

            {/* Latest Wardrobe Additions */}
            <div className="pt-2 border-t border-[#E8E0D5] space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#6E655C] block">
                Recent Wardrobe Pieces
              </span>
              <div className="grid grid-cols-4 gap-2">
                {wardrobe.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav('wardrobe')}
                    className="group text-left"
                    title={item.item_name}
                  >
                    <div className="h-16 w-full bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.item_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-[10px] text-[#252525] truncate mt-1">{item.item_name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


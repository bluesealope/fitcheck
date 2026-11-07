'use client';

import React, { useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import {
  User,
  Edit3,
  RotateCcw,
  ShieldAlert,
  Database,
  CheckCircle2,
  Palette,
  BookOpen,
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const {
    anonUserId,
    supabaseConnected,
    profile,
    colorProfile,
    wardrobe,
    analyses,
    savedOutfits,
    outfitPlans,
    setIsEditingProfile,
    resetProfile,
    setActiveNav,
  } = useFitCheck();

  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  if (!profile) return null;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 10 — Personalization & Persistence
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            My Fashion Profile
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Manage your Fashion Profile setup, inspect your anonymous session persistence, or reset
            your personalization from the beginning.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsEditingProfile(true)}
            className="px-5 py-3 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-[#A58E79]" />
            <span>Edit Fashion Profile</span>
          </button>
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="px-5 py-3 bg-white border border-[#800020] text-[#800020] text-xs uppercase tracking-[0.2em] hover:bg-[#800020] hover:text-white transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Profile</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-[#252525] p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#252525] text-[#F7F5F0] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#252525]">{profile.display_name}</h3>
                <p className="text-xs text-[#6E655C]">
                  Created {new Date(profile.created_at).toLocaleDateString()} · Updated{' '}
                  {new Date(profile.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#F7F5F0] border border-[#DED5C8] text-[10px] uppercase tracking-widest text-[#252525]">
              Active Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                Gender Selection
              </span>
              <p className="font-serif text-xl text-[#252525] mt-1">
                {profile.gender_profile === 'Men' ? 'Laki-laki (Men)' : 'Perempuan (Women)'}
              </p>
            </div>
            <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                Age Calibration
              </span>
              <p className="font-serif text-xl text-[#252525] mt-1">{profile.age} Years Old</p>
            </div>
            <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8]">
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
                Styling Preference
              </span>
              <p className="font-serif text-xl text-[#252525] mt-1">
                {profile.styling_preference}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#252525] font-medium flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#A58E79]" />
                <span>Selected Fashion Styles ({profile.selected_styles.length})</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveNav('style-library')}
                className="text-[10px] uppercase tracking-widest text-[#A58E79] underline"
              >
                Modify in Style Library
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.selected_styles.map((st) => (
                <span
                  key={st}
                  className="px-3 py-1.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-wider"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#E8E0D5]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#252525] font-medium flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#A58E79]" />
                <span>Personal Color & Favorite Swatches</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveNav('personal-color')}
                className="text-[10px] uppercase tracking-widest text-[#A58E79] underline"
              >
                Open Personal Color
              </button>
            </div>
            {colorProfile ? (
              <div className="p-3.5 bg-[#F7F5F0] border border-[#DED5C8] text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-medium text-[#252525]">
                    {colorProfile.seasonal_palette}
                  </span>{' '}
                  · <span>{colorProfile.undertone}</span> ({colorProfile.assessment_method})
                </div>
                <div className="flex gap-1.5">
                  {colorProfile.recommended_colors.map((c) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className="w-4 h-4 border border-[#252525]/30"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#6E655C]">
                No seasonal color assessment saved yet. Take the quiz in Personal Color Analysis!
              </p>
            )}
          </div>
        </div>

        {/* Right: Persistence & Security Architecture Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#DED5C8] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#252525] font-medium border-b border-[#E8E0D5] pb-3">
              <Database className="w-4 h-4 text-[#A58E79]" />
              <span>Anonymous Profile Persistence Status</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#F7F5F0]">
                <span className="text-[#6E655C]">Anonymous User ID:</span>
                <span className="font-mono text-[#252525]">{anonUserId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F7F5F0]">
                <span className="text-[#6E655C]">Local Storage Sync:</span>
                <span className="text-[#2E8B57] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F7F5F0]">
                <span className="text-[#6E655C]">Supabase PostgreSQL RLS:</span>
                <span className="text-[#252525] font-medium">
                  {supabaseConnected
                    ? 'Connected (x-anonymous-user-id RLS)'
                    : 'Ready (.env.local Optional)'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6E655C]">Stored Records:</span>
                <span className="text-[#252525]">
                  {wardrobe.length} Wardrobe · {analyses.length} Analyses · {savedOutfits.length}{' '}
                  Outfits · {outfitPlans.length} Plans
                </span>
              </div>
            </div>

            <div className="bg-[#F7F5F0] border-l-4 border-[#A58E79] p-4 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#A58E79] shrink-0 mt-0.5" />
              <div className="text-xs text-[#6E655C] space-y-1 leading-relaxed">
                <p className="font-semibold text-[#252525] uppercase tracking-wider">
                  Important Notice: Unauthenticated Profile Scope
                </p>
                <p>
                  Because FITCHECK uses passwordless personalization instead of email/password
                  accounts, your profile is tied to this browser&apos;s Anonymous User ID. It is
                  not a password-protected personal account synced across separate devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Reset Modal */}
      {confirmReset && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-md w-full p-7 space-y-5">
            <span className="text-[10px] uppercase tracking-widest text-[#800020]">
              Confirm Reset
            </span>
            <h3 className="font-serif text-2xl text-[#252525]">
              Reset Fashion Profile & Start Over?
            </h3>
            <p className="text-xs text-[#6E655C] leading-relaxed">
              This will generate a new Anonymous User ID and return you to the Personalization
              Setup wizard (Gender, Age, Styles, and Styling Preferences).
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-[#DED5C8]">
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-4 py-2.5 border border-[#DED5C8] bg-white text-xs uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setConfirmReset(false);
                  await resetProfile();
                }}
                className="px-5 py-2.5 bg-[#800020] text-white text-xs uppercase tracking-widest"
              >
                Reset Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


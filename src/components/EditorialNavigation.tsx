'use client';

import React, { useState } from 'react';
import { NavSection, useFitCheck } from '@/context/FitCheckContext';
import {
  LayoutGrid,
  ScanEye,
  Shirt,
  Palette,
  BookOpen,
  Pipette,
  Layers,
  Calendar,
  History,
  User,
  Menu,
  X,
  Edit3,
  RotateCcw,
} from 'lucide-react';

interface NavItemConfig {
  id: NavSection;
  label: string;
  issueNumber: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', issueNumber: '01', icon: LayoutGrid },
  { id: 'analyzer', label: 'Fashion Analyzer', issueNumber: '02', icon: ScanEye },
  { id: 'wardrobe', label: 'Digital Wardrobe', issueNumber: '03', icon: Shirt },
  { id: 'personal-color', label: 'Personal Color Analysis', issueNumber: '04', icon: Palette },
  { id: 'style-library', label: 'Fashion Style Library', issueNumber: '05', icon: BookOpen },
  { id: 'color-library', label: 'Color Library', issueNumber: '06', icon: Pipette },
  { id: 'outfit-generator', label: 'Outfit Generator', issueNumber: '07', icon: Layers },
  { id: 'outfit-planner', label: 'Outfit Planner', issueNumber: '08', icon: Calendar },
  { id: 'history', label: 'Fashion History', issueNumber: '09', icon: History },
  { id: 'profile', label: 'My Profile', issueNumber: '10', icon: User },
];

export const EditorialNavigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeNav,
    setActiveNav,
    profile,
    setIsEditingProfile,
    resetProfile,
    wardrobe,
    analyses,
    colorProfile,
  } = useFitCheck();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleSelectNav = (id: NavSection) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252525] flex flex-col lg:flex-row">
      {/* Desktop Left Editorial Column */}
      <aside className="hidden lg:flex lg:w-72 xl:w-80 bg-[#F7F5F0] border-r border-[#DED5C8] flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Masthead */}
          <div className="p-7 border-b border-[#DED5C8]">
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#A58E79] mb-1">
              Sartorial Intelligence
            </p>
            <button
              type="button"
              onClick={() => handleSelectNav('dashboard')}
              className="text-left block"
            >
              <h1 className="font-serif text-3xl tracking-[0.14em] text-[#252525]">FITCHECK</h1>
            </button>
            <p className="text-[11px] italic font-serif text-[#6E655C] mt-1">
              &ldquo;Discover Your Style. Define Your Look.&rdquo;
            </p>
          </div>

          {/* Active User Summary Strip */}
          {profile && (
            <div className="px-7 py-4 bg-[#E8E0D5]/55 border-b border-[#DED5C8] flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#252525]">{profile.display_name}</p>
                <p className="text-[11px] text-[#6E655C]">
                  {profile.gender_profile} · {profile.age} yrs
                  {profile.gender_profile === 'Women' ? ` · ${profile.styling_preference}` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                title="Edit Fashion Profile"
                className="p-2 border border-[#DED5C8] bg-white hover:border-[#252525] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#252525]" />
              </button>
            </div>
          )}

          {/* 10 Navigation Items */}
          <nav className="py-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full px-7 py-3.5 flex items-center justify-between text-left border-l-2 transition-all ${
                    isActive
                      ? 'border-[#252525] bg-white text-[#252525] font-medium'
                      : 'border-transparent text-[#6E655C] hover:text-[#252525] hover:bg-[#E8E0D5]/35'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-4 h-4 ${isActive ? 'text-[#252525]' : 'text-[#A58E79]'}`}
                    />
                    <span className="text-xs uppercase tracking-[0.14em]">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A58E79]">{item.issueNumber}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Stats & Profile Actions */}
        <div className="p-7 border-t border-[#DED5C8] space-y-4 bg-[#F7F5F0]">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white border border-[#DED5C8] p-2.5">
              <span className="block font-serif text-lg text-[#252525]">{wardrobe.length}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">Wardrobe</span>
            </div>
            <div className="bg-white border border-[#DED5C8] p-2.5">
              <span className="block font-serif text-lg text-[#252525]">{analyses.length}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">Analyses</span>
            </div>
          </div>

          {colorProfile && (
            <div className="bg-white border border-[#DED5C8] px-3 py-2 text-[11px] flex items-center justify-between">
              <span className="text-[#6E655C] uppercase tracking-wider">Season:</span>
              <span className="font-medium text-[#252525]">{colorProfile.seasonal_palette}</span>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="flex-1 py-2 text-[10px] uppercase tracking-widest border border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className="py-2 px-3 text-[10px] uppercase tracking-widest border border-[#DED5C8] text-[#6E655C] hover:border-[#800020] hover:text-[#800020] transition-colors flex items-center justify-center gap-1"
              title="Reset Profile"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile & Tablet Top Masthead */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur border-b border-[#DED5C8] px-5 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleSelectNav('dashboard')}
          className="text-left"
        >
          <span className="block text-[9px] uppercase tracking-[0.22em] text-[#A58E79]">
            Editorial Fashion Platform
          </span>
          <span className="font-serif text-2xl tracking-[0.14em] text-[#252525]">FITCHECK</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditingProfile(true)}
            className="px-3 py-2 border border-[#DED5C8] bg-white text-[10px] uppercase tracking-widest"
          >
            Edit Profile
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 border border-[#252525] bg-[#252525] text-[#F7F5F0]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[69px] z-30 bg-[#F7F5F0] overflow-y-auto p-6 space-y-6">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full px-4 py-3.5 flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                      : 'bg-white text-[#252525] border-[#DED5C8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">{item.issueNumber}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#DED5C8] flex gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEditingProfile(true);
              }}
              className="flex-1 py-3 bg-white border border-[#252525] text-xs uppercase tracking-widest"
            >
              Edit Fashion Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setConfirmResetOpen(true);
              }}
              className="flex-1 py-3 bg-white border border-[#800020] text-[#800020] text-xs uppercase tracking-widest"
            >
              Reset Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <main className="p-6 md:p-10 xl:p-12 max-w-7xl w-full mx-auto">{children}</main>

        {/* Editorial Footer */}
        <footer className="border-t border-[#DED5C8] px-6 md:px-10 py-6 mt-16 bg-[#F7F5F0] text-xs text-[#6E655C]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-serif text-sm text-[#252525] tracking-widest mr-3">
                FITCHECK
              </span>
              <span>&ldquo;Discover Your Style. Define Your Look.&rdquo;</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => handleSelectNav('analyzer')}
                className="hover:text-[#252525]"
              >
                Analyzer
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleSelectNav('wardrobe')}
                className="hover:text-[#252525]"
              >
                Wardrobe
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleSelectNav('profile')}
                className="hover:text-[#252525]"
              >
                Profile & Privacy
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Reset Profile Confirmation Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-md w-full p-7 space-y-5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#800020]">
              Profile Reset Confirmation
            </span>
            <h3 className="font-serif text-2xl text-[#252525]">
              Reset Fashion Profile & Start Personalization From Scratch?
            </h3>
            <p className="text-xs text-[#6E655C] leading-relaxed">
              This will clear your current anonymous session profile, local Digital Wardrobe, and saved
              analyses on this device, returning you to Step 01 of the Personalization Setup.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DED5C8]">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2.5 text-xs uppercase tracking-widest border border-[#DED5C8] bg-white text-[#252525]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setConfirmResetOpen(false);
                  await resetProfile();
                }}
                className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[#800020] text-white"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


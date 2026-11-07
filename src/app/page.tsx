'use client';

import React from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { PersonalizationFlow } from '@/components/PersonalizationFlow';
import { EditorialNavigation } from '@/components/EditorialNavigation';
import { DashboardSection } from '@/components/sections/DashboardSection';
import { FashionAnalyzerSection } from '@/components/sections/FashionAnalyzerSection';
import { DigitalWardrobeSection } from '@/components/sections/DigitalWardrobeSection';
import { PersonalColorSection } from '@/components/sections/PersonalColorSection';
import { StyleLibrarySection } from '@/components/sections/StyleLibrarySection';
import { ColorLibrarySection } from '@/components/sections/ColorLibrarySection';
import { OutfitGeneratorSection } from '@/components/sections/OutfitGeneratorSection';
import { OutfitPlannerSection } from '@/components/sections/OutfitPlannerSection';
import { FashionHistorySection } from '@/components/sections/FashionHistorySection';
import { ProfileSection } from '@/components/sections/ProfileSection';

export default function FitCheckAppPage() {
  const { isHydrated, profile, isEditingProfile, activeNav } = useFitCheck();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] text-[#252525] flex flex-col items-center justify-center p-6">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#A58E79] mb-2">
          Personal Fashion Analyzer & Digital Wardrobe
        </p>
        <h1 className="font-serif text-4xl tracking-[0.16em] text-[#252525]">FITCHECK</h1>
        <p className="text-xs text-[#6E655C] mt-3 italic font-serif">
          &ldquo;Discover Your Style. Define Your Look.&rdquo;
        </p>
      </div>
    );
  }

  // Gate entry with Personalization Setup if user hasn't completed onboarding or is editing profile
  if (!profile || !profile.onboarding_completed || isEditingProfile) {
    return <PersonalizationFlow />;
  }

  return (
    <EditorialNavigation>
      {activeNav === 'dashboard' && <DashboardSection />}
      {activeNav === 'analyzer' && <FashionAnalyzerSection />}
      {activeNav === 'wardrobe' && <DigitalWardrobeSection />}
      {activeNav === 'personal-color' && <PersonalColorSection />}
      {activeNav === 'style-library' && <StyleLibrarySection />}
      {activeNav === 'color-library' && <ColorLibrarySection />}
      {activeNav === 'outfit-generator' && <OutfitGeneratorSection />}
      {activeNav === 'outfit-planner' && <OutfitPlannerSection />}
      {activeNav === 'history' && <FashionHistorySection />}
      {activeNav === 'profile' && <ProfileSection />}
    </EditorialNavigation>
  );
}


-- =================================================================================
-- FITCHECK: PERSONAL FASHION ANALYZER & DIGITAL WARDROBE
-- Complete PostgreSQL Schema, Seed Data & Row Level Security (Supabase)
-- =================================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------------
-- 1. HELPER FUNCTION FOR ANONYMOUS USER ID (RLS SECURITY)
-- Reads the custom header `x-anonymous-user-id` sent by the FITCHECK client
-- so that each anonymous device only accesses its own records without email/password.
-- ---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_anon_user_id()
RETURNS TEXT AS $$
  SELECT COALESCE(
    current_setting('request.headers', true)::json->>'x-anonymous-user-id',
    ''
  );
$$ LANGUAGE SQL STABLE;

-- ---------------------------------------------------------------------------------
-- 2. TABLE: profiles
-- Stores the user's personalization setup (Gender, Age 13-50, Styling Preference)
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT UNIQUE NOT NULL,
  display_name TEXT DEFAULT 'Style Muse',
  gender_profile TEXT NOT NULL CHECK (gender_profile IN ('Men', 'Women')),
  age INTEGER NOT NULL CHECK (age >= 13 AND age <= 50),
  styling_preference TEXT DEFAULT 'Flexible / No Preference' CHECK (
    styling_preference IN ('Hijab', 'Non-Hijab', 'Flexible / No Preference', 'Standard')
  ),
  favorite_colors TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 3. TABLE: style_catalog
-- Complete Fashion Style Library (14 groups, 49+ styles + user custom styles)
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.style_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_group TEXT NOT NULL,
  description TEXT NOT NULL,
  key_elements TEXT[] DEFAULT '{}',
  color_palette TEXT[] DEFAULT '{}',
  visual_url_men TEXT,
  visual_url_women TEXT,
  is_custom BOOLEAN DEFAULT FALSE,
  anon_user_id TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 4. TABLE: user_style_preferences
-- Links anonymous users to their selected fashion styles
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_style_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT NOT NULL,
  style_id TEXT NOT NULL,
  style_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(anon_user_id, style_id)
);

-- ---------------------------------------------------------------------------------
-- 5. TABLE: color_catalog
-- Complete Color Library (11 groups, 44+ colors + custom user colors)
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.color_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color_group TEXT NOT NULL,
  hex_code TEXT NOT NULL,
  undertone_match TEXT[] DEFAULT '{Warm,Cool,Neutral}',
  seasonal_match TEXT[] DEFAULT '{}',
  pairing_suggestions TEXT[] DEFAULT '{}',
  description TEXT,
  is_custom BOOLEAN DEFAULT FALSE,
  anon_user_id TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 6. TABLE: seasonal_palettes
-- 12 Seasonal Color Palettes (Spring, Summer, Autumn, Winter)
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seasonal_palettes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  season_family TEXT NOT NULL CHECK (season_family IN ('Spring', 'Summer', 'Autumn', 'Winter')),
  undertone TEXT NOT NULL CHECK (undertone IN ('Warm Undertone', 'Cool Undertone', 'Neutral Undertone')),
  characteristics TEXT NOT NULL,
  recommended_colors JSONB NOT NULL DEFAULT '[]',
  color_combinations JSONB NOT NULL DEFAULT '[]',
  clothing_suggestions TEXT[] DEFAULT '{}',
  hijab_suggestions TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 7. TABLE: user_color_profiles
-- Stores user's Personal Color Analysis result (Quiz or Photo Assessment)
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_color_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT UNIQUE NOT NULL,
  assessment_method TEXT NOT NULL CHECK (assessment_method IN ('Personal Color Quiz', 'Photo-Based Color Assessment')),
  undertone TEXT NOT NULL,
  seasonal_palette TEXT NOT NULL,
  recommended_colors JSONB DEFAULT '[]',
  clothing_suggestions TEXT[] DEFAULT '{}',
  hijab_suggestions TEXT[] DEFAULT '{}',
  notes TEXT,
  assessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 8. TABLE: wardrobe_items
-- Digital Wardrobe items owned by the user
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Shoes', 'Bags', 'Accessories', 'Hijab')
  ),
  color_name TEXT NOT NULL,
  hex_code TEXT NOT NULL,
  brand TEXT DEFAULT 'Unbranded',
  style_tags TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  date_added TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 9. TABLE: outfit_analyses
-- Stores Fashion Analyzer results and history
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.outfit_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  analysis_mode TEXT NOT NULL,
  gender_context TEXT,
  outfit_score INTEGER NOT NULL CHECK (outfit_score >= 0 AND outfit_score <= 100),
  score_breakdown JSONB NOT NULL,
  detected_items JSONB NOT NULL DEFAULT '[]',
  detected_colors JSONB NOT NULL DEFAULT '[]',
  detected_styles TEXT[] DEFAULT '{}',
  color_harmony TEXT NOT NULL,
  strengths TEXT[] DEFAULT '{}',
  weaknesses TEXT[] DEFAULT '{}',
  improvement_tips TEXT[] DEFAULT '{}',
  accessory_recommendations TEXT[] DEFAULT '{}',
  alternative_combinations TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 10. TABLE: saved_outfits
-- Outfits generated and saved in the Outfit Generator
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_outfits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  activity TEXT,
  occasion TEXT,
  target_style TEXT,
  target_color TEXT,
  item_ids TEXT[] NOT NULL DEFAULT '{}',
  items_snapshot JSONB NOT NULL DEFAULT '[]',
  harmony_note TEXT,
  is_favorite BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 11. TABLE: outfit_plans
-- Calendar entries for the Outfit Planner
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.outfit_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT NOT NULL,
  plan_date DATE NOT NULL,
  event_name TEXT NOT NULL,
  occasion_type TEXT DEFAULT 'Everyday',
  outfit_title TEXT NOT NULL,
  item_ids TEXT[] DEFAULT '{}',
  items_snapshot JSONB DEFAULT '[]',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------------
-- 12. TABLE: style_recommendations
-- Personalized outfit & piece recommendations generated by the Recommendation Engine
-- ---------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.style_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anon_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  occasion TEXT NOT NULL,
  style_focus TEXT NOT NULL,
  recommended_pieces JSONB NOT NULL DEFAULT '[]',
  color_story JSONB NOT NULL DEFAULT '[]',
  rationale TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_style_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.color_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_color_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_recommendations ENABLE ROW LEVEL SECURITY;

-- Public catalogs are readable by everyone; custom items scoped by anon_user_id
CREATE POLICY "Public read style_catalog" ON public.style_catalog
  FOR SELECT USING (is_custom = FALSE OR anon_user_id = public.current_anon_user_id());

CREATE POLICY "Insert custom style_catalog" ON public.style_catalog
  FOR INSERT WITH CHECK (is_custom = TRUE AND anon_user_id = public.current_anon_user_id());

CREATE POLICY "Public read color_catalog" ON public.color_catalog
  FOR SELECT USING (is_custom = FALSE OR anon_user_id = public.current_anon_user_id());

CREATE POLICY "Insert custom color_catalog" ON public.color_catalog
  FOR INSERT WITH CHECK (is_custom = TRUE AND anon_user_id = public.current_anon_user_id());

CREATE POLICY "Public read seasonal_palettes" ON public.seasonal_palettes
  FOR SELECT USING (TRUE);

-- User-specific tables isolated by anon_user_id
CREATE POLICY "Isolate profiles by anon_user_id" ON public.profiles
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate user_style_preferences by anon_user_id" ON public.user_style_preferences
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate user_color_profiles by anon_user_id" ON public.user_color_profiles
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate wardrobe_items by anon_user_id" ON public.wardrobe_items
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate outfit_analyses by anon_user_id" ON public.outfit_analyses
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate saved_outfits by anon_user_id" ON public.saved_outfits
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate outfit_plans by anon_user_id" ON public.outfit_plans
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

CREATE POLICY "Isolate style_recommendations by anon_user_id" ON public.style_recommendations
  FOR ALL USING (anon_user_id = public.current_anon_user_id())
  WITH CHECK (anon_user_id = public.current_anon_user_id());

-- =================================================================================
-- SUPABASE STORAGE BUCKET FOR OUTFIT & WARDROBE PHOTOS
-- =================================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('fitcheck-media', 'fitcheck-media', true)
ON CONFLICT (id) DO NOTHING;


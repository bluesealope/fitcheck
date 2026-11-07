import { INITIAL_COLOR_CATALOG, SEASONAL_PALETTES } from '@/data/colorCatalog';
import { INITIAL_STYLE_CATALOG } from '@/data/styleCatalog';
import {
  StyleRecommendation,
  UserColorProfile,
  UserProfile,
  WardrobeItem,
} from '@/types/fitcheck';

export function generateDynamicRecommendations(params: {
  profile: UserProfile;
  colorProfile: UserColorProfile | null;
  wardrobe: WardrobeItem[];
  selectedOccasion?: string;
  selectedActivity?: string;
}): StyleRecommendation[] {
  const {
    profile,
    colorProfile,
    wardrobe,
    selectedOccasion = 'All Occasions',
    selectedActivity = 'Daily Versatile',
  } = params;

  const isMen = profile.gender_profile === 'Men';
  const isHijab =
    profile.gender_profile === 'Women' &&
    (profile.styling_preference === 'Hijab' ||
      wardrobe.some((w) => w.category === 'Hijab'));

  // Gather user's favorite styles or default to inclusive editorial styles
  const userStyles =
    profile.selected_styles.length > 0
      ? profile.selected_styles
      : isMen
      ? ['Old Money', 'Minimalist', 'Smart Casual']
      : ['Elegant', 'Korean Casual', 'Minimalist'];

  // Gather palette colors from user's seasonal color profile + favorite colors
  const seasonalMatch = SEASONAL_PALETTES.find(
    (sp) => sp.name === colorProfile?.seasonal_palette
  );

  const preferredColors =
    seasonalMatch?.recommended_colors.map((c) => ({ name: c.name, hex: c.hex })) ||
    profile.favorite_colors.map((fc) => {
      const found = INITIAL_COLOR_CATALOG.find(
        (c) => c.name.toLowerCase() === fc.toLowerCase()
      );
      return { name: fc, hex: found?.hex_code || '#A58E79' };
    });

  const c1 = preferredColors[0] || { name: 'Cream', hex: '#FFFDD0' };
  const c2 = preferredColors[1] || { name: 'Mocha', hex: '#836953' };
  const c3 = preferredColors[2] || { name: 'Charcoal', hex: '#252525' };
  const c4 = preferredColors[3] || { name: 'Sage', hex: '#9CAF88' };

  // Find actual items from user's Digital Wardrobe to ground recommendations
  const wardrobeTop = wardrobe.find((w) => w.category === 'Tops');
  const wardrobeBottom = wardrobe.find((w) => w.category === 'Bottoms');
  const wardrobeOuter = wardrobe.find((w) => w.category === 'Outerwear');
  const wardrobeShoes = wardrobe.find((w) => w.category === 'Shoes');
  const wardrobeAcc = wardrobe.find(
    (w) => w.category === 'Accessories' || w.category === 'Bags'
  );
  const wardrobeHijab = wardrobe.find((w) => w.category === 'Hijab');

  const style1Name = userStyles[0] || (isMen ? 'Old Money' : 'Elegant');
  const style2Name = userStyles[1] || (isMen ? 'Minimalist' : 'Korean Casual');
  const style3Name = userStyles[2] || 'Smart Casual';

  const styleObj1 =
    INITIAL_STYLE_CATALOG.find(
      (s) => s.name.toLowerCase() === style1Name.toLowerCase() || s.id === style1Name.toLowerCase()
    ) || INITIAL_STYLE_CATALOG[1];

  const styleObj2 =
    INITIAL_STYLE_CATALOG.find(
      (s) => s.name.toLowerCase() === style2Name.toLowerCase() || s.id === style2Name.toLowerCase()
    ) || INITIAL_STYLE_CATALOG[4];

  // Age-aware nuance (13-50)
  const ageBracketNote =
    profile.age <= 21
      ? `tailored for energetic campus, creative hangout, and youthful proportion at age ${profile.age}`
      : profile.age <= 32
      ? `calibrated for career-to-social versatility and contemporary polish at age ${profile.age}`
      : `curated with refined textile drape and timeless authority for age ${profile.age}`;

  const recommendations: StyleRecommendation[] = [
    {
      id: 'rec-signature-1',
      title: `${styleObj1.name} Signature Capsule`,
      occasion: selectedOccasion === 'All Occasions' ? 'Smart Social & Dinner' : selectedOccasion,
      activity: selectedActivity,
      style_focus: styleObj1.name,
      recommended_pieces: [
        ...(isHijab
          ? [
              {
                slot: 'Hijab',
                item_name: wardrobeHijab?.item_name || `${c1.name} Silk-Modal Pashmina`,
                color: wardrobeHijab?.color_name || c1.name,
                hex: wardrobeHijab?.hex_code || c1.hex,
                from_wardrobe: Boolean(wardrobeHijab),
              },
            ]
          : []),
        {
          slot: 'Top',
          item_name:
            wardrobeTop?.item_name ||
            (isMen ? `${c1.name} Tailored Linen Shirt` : `${c1.name} Silk Draped Blouse`),
          color: wardrobeTop?.color_name || c1.name,
          hex: wardrobeTop?.hex_code || c1.hex,
          from_wardrobe: Boolean(wardrobeTop),
        },
        {
          slot: 'Bottom',
          item_name:
            wardrobeBottom?.item_name ||
            (isMen ? `${c2.name} Pleated Tailored Trousers` : `${c2.name} Tailored Midi Skirt / Trousers`),
          color: wardrobeBottom?.color_name || c2.name,
          hex: wardrobeBottom?.hex_code || c2.hex,
          from_wardrobe: Boolean(wardrobeBottom),
        },
        {
          slot: 'Footwear',
          item_name:
            wardrobeShoes?.item_name ||
            (isMen ? 'Espresso Leather Loafers' : 'Pointed Leather Slingbacks / Loafers'),
          color: wardrobeShoes?.color_name || 'Espresso',
          hex: wardrobeShoes?.hex_code || '#3B2820',
          from_wardrobe: Boolean(wardrobeShoes),
        },
        {
          slot: 'Accessory',
          item_name:
            wardrobeAcc?.item_name ||
            (isMen ? 'Classic Leather-Strap Watch' : 'Structured Top-Handle Leather Handbag'),
          color: wardrobeAcc?.color_name || 'Camel',
          hex: wardrobeAcc?.hex_code || '#C19A6B',
          from_wardrobe: Boolean(wardrobeAcc),
        },
      ],
      color_story: [c1, c2, { name: 'Espresso', hex: '#3B2820' }],
      rationale: `Designed for your ${profile.gender_profile} profile (${ageBracketNote}), merging your love for ${styleObj1.name} with ${
        colorProfile ? `your ${colorProfile.seasonal_palette} (${colorProfile.undertone})` : 'warm editorial neutrals'
      }.`,
      styling_note: isHijab
        ? 'Drape the pashmina softly over one shoulder to elongate the vertical line of the blouse and skirt.'
        : 'French-tuck or full-tuck the top to highlight the waist proportion and let leather accessories anchor the palette.',
    },
    {
      id: 'rec-signature-2',
      title: `${styleObj2.name} Layered Look`,
      occasion: selectedOccasion === 'All Occasions' ? 'Creative Workday / Café' : selectedOccasion,
      activity: selectedActivity,
      style_focus: styleObj2.name,
      recommended_pieces: [
        ...(isHijab
          ? [
              {
                slot: 'Hijab',
                item_name: `${c2.name} Textured Chiffon Scarf`,
                color: c2.name,
                hex: c2.hex,
              },
            ]
          : []),
        {
          slot: 'Outerwear',
          item_name:
            wardrobeOuter?.item_name ||
            (isMen ? `${c3.name} Unstructured Blazer / Overshirt` : `${c2.name} Neutral Knit Cardigan`),
          color: wardrobeOuter?.color_name || c2.name,
          hex: wardrobeOuter?.hex_code || c2.hex,
          from_wardrobe: Boolean(wardrobeOuter),
        },
        {
          slot: 'Base Top',
          item_name: isMen ? 'Ivory Heavyweight Crewneck Tee' : 'Ivory Poplin or Ribbed Knit Top',
          color: 'Ivory',
          hex: '#F7F5F0',
        },
        {
          slot: 'Bottom',
          item_name: isMen
            ? `${c3.name} Wide-Leg Tailored Slacks`
            : `${c3.name} High-Waist Wide Culottes`,
          color: c3.name,
          hex: c3.hex,
        },
        {
          slot: 'Footwear',
          item_name: isMen ? 'Minimalist White Leather Sneakers' : 'Platform Loafers / Clean Sneakers',
          color: 'White',
          hex: '#FFFFFF',
        },
      ],
      color_story: [{ name: 'Ivory', hex: '#F7F5F0' }, c2, c3],
      rationale: `Balances architectural ease and ${styleObj2.name} proportions while keeping ${
        colorProfile?.undertone || 'harmonious neutral'
      } shades closest to your portrait zone.`,
      styling_note:
        'Keep the outer layer unbuttoned to create a clean vertical column of Ivory in the center.',
    },
    {
      id: 'rec-signature-3',
      title: `Contemporary ${style3Name} Off-Duty`,
      occasion: selectedOccasion === 'All Occasions' ? 'Weekend Gallery & Travel' : selectedOccasion,
      activity: selectedActivity,
      style_focus: style3Name,
      recommended_pieces: [
        ...(isHijab
          ? [
              {
                slot: 'Hijab',
                item_name: `${c4.name} Breathable Cotton-Modal Shawl`,
                color: c4.name,
                hex: c4.hex,
              },
            ]
          : []),
        {
          slot: 'Top',
          item_name: isMen ? `${c4.name} Knitted Polo / Oxford Shirt` : `${c4.name} Relaxed Poplin Overshirt`,
          color: c4.name,
          hex: c4.hex,
        },
        {
          slot: 'Bottom',
          item_name: 'Beige Relaxed Chino / Straight Denim',
          color: 'Beige',
          hex: '#E8E0D5',
        },
        {
          slot: 'Footwear',
          item_name: 'Suede Loafers or Retro Court Trainers',
          color: 'Taupe',
          hex: '#A58E79',
        },
        {
          slot: 'Bag / Accent',
          item_name: 'Canvas & Leather Crossbody Tote',
          color: 'Camel',
          hex: '#C19A6B',
        },
      ],
      color_story: [c4, { name: 'Beige', hex: '#E8E0D5' }, { name: 'Taupe', hex: '#A58E79' }],
      rationale: `Injects botanical freshness (${c4.name}) into your rotation so your style never feels rigid or repetitive.`,
      styling_note:
        'Roll the cuffs slightly at the wrists for an effortless editorial finish.',
    },
  ];

  return recommendations;
}


import { ColorCatalogItem, SeasonalPaletteItem } from '@/types/fitcheck';

export const COLOR_GROUPS = [
  'Neutral',
  'Brown',
  'Red',
  'Pink',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Grey',
  'Monochrome',
] as const;

export const INITIAL_COLOR_CATALOG: ColorCatalogItem[] = [
  // ==========================================
  // 1. NEUTRAL (White, Ivory, Cream, Beige, Taupe)
  // ==========================================
  {
    id: 'white',
    name: 'White',
    color_group: 'Neutral',
    hex_code: '#FFFFFF',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Bright Winter', 'Cool Winter', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Charcoal', hex: '#252525' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    description: 'Crisp optical pure white that creates high-contrast clarity and architectural precision.',
  },
  {
    id: 'ivory',
    name: 'Ivory',
    color_group: 'Neutral',
    hex_code: '#F7F5F0',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Spring', 'Soft Autumn', 'Light Summer'],
    pairing_suggestions: [
      { name: 'Taupe', hex: '#A58E79' },
      { name: 'Espresso', hex: '#3B2820' },
      { name: 'Sage', hex: '#9CAF88' },
    ],
    description: 'Soft editorial off-white infused with subtle warmth—FITCHECK’s signature canvas shade.',
  },
  {
    id: 'cream',
    name: 'Cream',
    color_group: 'Neutral',
    hex_code: '#FFFDD0',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Warm Spring', 'Light Spring', 'Warm Autumn'],
    pairing_suggestions: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    description: 'Rich heritage cream cornerstone of Old Money linen shirting and cable-knit sweaters.',
  },
  {
    id: 'beige',
    name: 'Beige',
    color_group: 'Neutral',
    hex_code: '#E8E0D5',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Soft Autumn', 'Light Spring', 'Soft Summer'],
    pairing_suggestions: [
      { name: 'Charcoal', hex: '#252525' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Mocha', hex: '#836953' },
    ],
    description: 'Grounded sandy neutral ideal for trench coats, tailored trousers, and effortless tonal layering.',
  },
  {
    id: 'taupe',
    name: 'Taupe',
    color_group: 'Neutral',
    hex_code: '#A58E79',
    undertone_match: ['Neutral Undertone', 'Cool Undertone', 'Warm Undertone'],
    seasonal_match: ['Soft Summer', 'Soft Autumn', 'Deep Autumn'],
    pairing_suggestions: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Black', hex: '#141414' },
      { name: 'Dusty Pink', hex: '#DCAE96' },
    ],
    description: 'Sophisticated gray-brown hybrid that bridges warm and cool wardrobes seamlessly.',
  },

  // ==========================================
  // 2. BROWN (Mocha, Camel, Chocolate, Espresso)
  // ==========================================
  {
    id: 'mocha',
    name: 'Mocha',
    color_group: 'Brown',
    hex_code: '#836953',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Soft Autumn', 'Warm Autumn', 'Soft Summer'],
    pairing_suggestions: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Beige', hex: '#E8E0D5' },
    ],
    description: 'Velvety muted coffee tone that softens structured outerwear, knitwear, and pashminas.',
  },
  {
    id: 'camel',
    name: 'Camel',
    color_group: 'Brown',
    hex_code: '#C19A6B',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Warm Autumn', 'Warm Spring', 'Soft Autumn'],
    pairing_suggestions: [
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Black', hex: '#141414' },
    ],
    description: 'Luxury golden-tan iconic in wool overcoats, suede loafers, and equestrian tailoring.',
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    color_group: 'Brown',
    hex_code: '#5C3317',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Deep Autumn', 'Warm Autumn'],
    pairing_suggestions: [
      { name: 'Butter Yellow', hex: '#FFFAA0' },
      { name: 'Baby Blue', hex: '#89CFF0' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
    description: 'Rich cocoa brown offering a warmer, more textural alternative to stark black.',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    color_group: 'Brown',
    hex_code: '#3B2820',
    undertone_match: ['Warm Undertone', 'Neutral Undertone', 'Cool Undertone'],
    seasonal_match: ['Deep Autumn', 'Deep Winter'],
    pairing_suggestions: [
      { name: 'Taupe', hex: '#A58E79' },
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Sage', hex: '#9CAF88' },
    ],
    description: 'Ultra-dark roasted brown for grounding leather goods, boots, and quiet-luxury suiting.',
  },

  // ==========================================
  // 3. RED (Cherry, Burgundy, Maroon, Scarlet)
  // ==========================================
  {
    id: 'cherry',
    name: 'Cherry',
    color_group: 'Red',
    hex_code: '#D2042D',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Bright Winter', 'Cool Winter', 'Bright Spring'],
    pairing_suggestions: [
      { name: 'Baby Blue', hex: '#89CFF0' },
      { name: 'Charcoal', hex: '#252525' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    description: 'Vibrant jewel-toned red that acts as an editorial pop on bags, shoes, or knitwear.',
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    color_group: 'Red',
    hex_code: '#800020',
    undertone_match: ['Cool Undertone', 'Neutral Undertone', 'Warm Undertone'],
    seasonal_match: ['Deep Winter', 'Deep Autumn', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Ash Grey', hex: '#B2BEB5' },
      { name: 'Navy', hex: '#1B2A4A' },
    ],
    description: 'Noble wine red synonymous with oxblood loafers, silk ties, and evening drapery.',
  },
  {
    id: 'maroon',
    name: 'Maroon',
    color_group: 'Red',
    hex_code: '#65000B',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Deep Autumn', 'Warm Autumn'],
    pairing_suggestions: [
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Beige', hex: '#E8E0D5' },
      { name: 'Charcoal', hex: '#252525' },
    ],
    description: 'Deep brownish-crimson with grounded vintage and collegiate varsity character.',
  },
  {
    id: 'scarlet',
    name: 'Scarlet',
    color_group: 'Red',
    hex_code: '#FF2400',
    undertone_match: ['Warm Undertone'],
    seasonal_match: ['Bright Spring', 'Warm Spring'],
    pairing_suggestions: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    description: 'High-energy flame red with a warm orange undertone for confident statement pieces.',
  },

  // ==========================================
  // 4. PINK (Blush, Rose, Dusty Pink, Mauve)
  // ==========================================
  {
    id: 'blush',
    name: 'Blush',
    color_group: 'Pink',
    hex_code: '#F4C2C2',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Spring', 'Light Summer'],
    pairing_suggestions: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Taupe', hex: '#A58E79' },
      { name: 'Sage', hex: '#9CAF88' },
    ],
    description: 'Delicate whispered pink that flatters Oxford shirts, silk blouses, and chiffon hijabs.',
  },
  {
    id: 'rose',
    name: 'Rose',
    color_group: 'Pink',
    hex_code: '#E38AAE',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Cool Summer', 'Light Summer', 'Bright Winter'],
    pairing_suggestions: [
      { name: 'Charcoal', hex: '#252525' },
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    description: 'Fresh blooming rose balancing romantic charm with crisp tailoring.',
  },
  {
    id: 'dusty-pink',
    name: 'Dusty Pink',
    color_group: 'Pink',
    hex_code: '#DCAE96',
    undertone_match: ['Neutral Undertone', 'Warm Undertone', 'Cool Undertone'],
    seasonal_match: ['Soft Summer', 'Soft Autumn'],
    pairing_suggestions: [
      { name: 'Mocha', hex: '#836953' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
    description: 'Muted earthy rose with a sophisticated antique patina suitable for all genders.',
  },
  {
    id: 'mauve',
    name: 'Mauve',
    color_group: 'Pink',
    hex_code: '#B784A7',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Soft Summer', 'Cool Summer', 'Deep Winter'],
    pairing_suggestions: [
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Charcoal', hex: '#252525' },
      { name: 'Ivory', hex: '#F7F5F0' },
    ],
    description: 'Cool violet-infused pink that pairs effortlessly with grey flannel and dark denim.',
  },

  // ==========================================
  // 5. ORANGE (Peach, Coral, Terracotta)
  // ==========================================
  {
    id: 'peach',
    name: 'Peach',
    color_group: 'Orange',
    hex_code: '#FFE5B4',
    undertone_match: ['Warm Undertone'],
    seasonal_match: ['Light Spring', 'Warm Spring'],
    pairing_suggestions: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Sage', hex: '#9CAF88' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    description: 'Sunlit pastel nectar that brings immediate warmth to spring/summer linen and knits.',
  },
  {
    id: 'coral',
    name: 'Coral',
    color_group: 'Orange',
    hex_code: '#FF7F50',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Bright Spring', 'Warm Spring'],
    pairing_suggestions: [
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#E8E0D5' },
    ],
    description: 'Lively pink-orange reef hue that energizes resort wear and statement accessories.',
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    color_group: 'Orange',
    hex_code: '#E2725B',
    undertone_match: ['Warm Undertone'],
    seasonal_match: ['Warm Autumn', 'Soft Autumn', 'Deep Autumn'],
    pairing_suggestions: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Espresso', hex: '#3B2820' },
    ],
    description: 'Artisanal baked-clay earth tone prized in bohemian, vintage, and rugged workwear.',
  },

  // ==========================================
  // 6. YELLOW (Butter Yellow, Mustard, Gold)
  // ==========================================
  {
    id: 'butter-yellow',
    name: 'Butter Yellow',
    color_group: 'Yellow',
    hex_code: '#FFFAA0',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Spring', 'Light Summer'],
    pairing_suggestions: [
      { name: 'Chocolate', hex: '#5C3317' },
      { name: 'Baby Blue', hex: '#89CFF0' },
      { name: 'Ash Grey', hex: '#B2BEB5' },
    ],
    description: 'Creamy, low-saturation yellow that functions almost like a warm editorial neutral.',
  },
  {
    id: 'mustard',
    name: 'Mustard',
    color_group: 'Yellow',
    hex_code: '#E1AD01',
    undertone_match: ['Warm Undertone'],
    seasonal_match: ['Warm Autumn', 'Deep Autumn'],
    pairing_suggestions: [
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Espresso', hex: '#3B2820' },
    ],
    description: 'Spiced ochre yellow that adds heritage depth to corduroy, knitwear, and scarves.',
  },
  {
    id: 'gold',
    name: 'Gold',
    color_group: 'Yellow',
    hex_code: '#D4AF37',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Warm Spring', 'Warm Autumn', 'Deep Autumn'],
    pairing_suggestions: [
      { name: 'Black', hex: '#141414' },
      { name: 'Emerald', hex: '#2E8B57' },
      { name: 'Ivory', hex: '#F7F5F0' },
    ],
    description: 'Luminous metallic & satin gold for hardware, timepieces, jewelry, and evening accents.',
  },

  // ==========================================
  // 7. GREEN (Sage, Olive, Emerald, Mint)
  // ==========================================
  {
    id: 'sage',
    name: 'Sage',
    color_group: 'Green',
    hex_code: '#9CAF88',
    undertone_match: ['Neutral Undertone', 'Warm Undertone', 'Cool Undertone'],
    seasonal_match: ['Soft Autumn', 'Soft Summer', 'Light Spring'],
    pairing_suggestions: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Taupe', hex: '#A58E79' },
      { name: 'Blush', hex: '#F4C2C2' },
    ],
    description: 'Calming botanical grey-green universally flattering across casual, modest, and minimalist fits.',
  },
  {
    id: 'olive',
    name: 'Olive',
    color_group: 'Green',
    hex_code: '#556B2F',
    undertone_match: ['Warm Undertone', 'Neutral Undertone'],
    seasonal_match: ['Warm Autumn', 'Deep Autumn', 'Soft Autumn'],
    pairing_suggestions: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Charcoal', hex: '#252525' },
    ],
    description: 'Utilitarian military and heritage green essential for cargo pants, field jackets, and chinos.',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    color_group: 'Green',
    hex_code: '#2E8B57',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Bright Winter', 'Deep Winter', 'Bright Spring'],
    pairing_suggestions: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1B2A4A' },
    ],
    description: 'Regal jewel green that commands attention in silk dresses, tenniscore knits, and suiting.',
  },
  {
    id: 'mint',
    name: 'Mint',
    color_group: 'Green',
    hex_code: '#98FF98',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Summer', 'Light Spring', 'Bright Winter'],
    pairing_suggestions: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Charcoal', hex: '#252525' },
    ],
    description: 'Refreshing cool pastel green that brightens streetwear, sporty sets, and summer shirts.',
  },

  // ==========================================
  // 8. BLUE (Navy, Baby Blue, Cobalt, Sky Blue)
  // ==========================================
  {
    id: 'navy',
    name: 'Navy',
    color_group: 'Blue',
    hex_code: '#1B2A4A',
    undertone_match: ['Cool Undertone', 'Neutral Undertone', 'Warm Undertone'],
    seasonal_match: ['Cool Winter', 'Deep Winter', 'Cool Summer', 'Bright Spring'],
    pairing_suggestions: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    description: 'The ultimate sartorial anchor—commanding in blazers, trousers, and classic knitwear.',
  },
  {
    id: 'baby-blue',
    name: 'Baby Blue',
    color_group: 'Blue',
    hex_code: '#89CFF0',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Summer', 'Light Spring', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Chocolate', hex: '#5C3317' },
      { name: 'Butter Yellow', hex: '#FFFAA0' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    description: 'Soft powder blue loved in crisp poplin shirts, cardigans, and Y2K/Korean styling.',
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    color_group: 'Blue',
    hex_code: '#0047AB',
    undertone_match: ['Cool Undertone'],
    seasonal_match: ['Bright Winter', 'Cool Winter', 'Bright Spring'],
    pairing_suggestions: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#141414' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    description: 'Electric ultramarine blue for high-impact knitwear, streetwear outerwear, and accessories.',
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    color_group: 'Blue',
    hex_code: '#87CEEB',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Summer', 'Cool Summer', 'Light Spring'],
    pairing_suggestions: [
      { name: 'Beige', hex: '#E8E0D5' },
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Mocha', hex: '#836953' },
    ],
    description: 'Breezy daylight blue that elevates Oxford button-downs, denim washes, and casual layering.',
  },

  // ==========================================
  // 9. PURPLE (Lavender, Lilac, Plum, Violet)
  // ==========================================
  {
    id: 'lavender',
    name: 'Lavender',
    color_group: 'Purple',
    hex_code: '#E6E6FA',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Light Summer', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Sage', hex: '#9CAF88' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ash Grey', hex: '#B2BEB5' },
    ],
    description: 'Serene botanical pastel purple that brings airy freshness to knits and modest wear.',
  },
  {
    id: 'lilac',
    name: 'Lilac',
    color_group: 'Purple',
    hex_code: '#C8A2C8',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Cool Summer', 'Light Summer', 'Soft Summer'],
    pairing_suggestions: [
      { name: 'Charcoal', hex: '#252525' },
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Taupe', hex: '#A58E79' },
    ],
    description: 'Soft floral mid-tone purple featured heavily in K-Fashion and romantic wardrobes.',
  },
  {
    id: 'plum',
    name: 'Plum',
    color_group: 'Purple',
    hex_code: '#673147',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Deep Winter', 'Deep Autumn', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Taupe', hex: '#A58E79' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Ash Grey', hex: '#B2BEB5' },
    ],
    description: 'Velvety damson purple offering rich nocturnal depth for autumn/winter layering.',
  },
  {
    id: 'violet',
    name: 'Violet',
    color_group: 'Purple',
    hex_code: '#7F00FF',
    undertone_match: ['Cool Undertone'],
    seasonal_match: ['Bright Winter', 'Cool Winter'],
    pairing_suggestions: [
      { name: 'Black', hex: '#141414' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    description: 'Vivid spectrum violet for cyber, artistic, and statement evening styling.',
  },

  // ==========================================
  // 10. GREY (Silver, Ash, Charcoal)
  // ==========================================
  {
    id: 'silver',
    name: 'Silver',
    color_group: 'Grey',
    hex_code: '#C0C0C0',
    undertone_match: ['Cool Undertone'],
    seasonal_match: ['Cool Winter', 'Bright Winter', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Black', hex: '#141414' },
      { name: 'Cobalt', hex: '#0047AB' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    description: 'Sleek metallic and cool light grey for watches, jewelry, Y2K bags, and futuristic accents.',
  },
  {
    id: 'ash',
    name: 'Ash',
    color_group: 'Grey',
    hex_code: '#B2BEB5',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Soft Summer', 'Light Summer', 'Cool Summer'],
    pairing_suggestions: [
      { name: 'Burgundy', hex: '#800020' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Charcoal', hex: '#252525' },
    ],
    description: 'Balanced heather mid-grey essential for wool flannel trousers, hoodies, and knitwear.',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    color_group: 'Grey',
    hex_code: '#252525',
    undertone_match: ['Cool Undertone', 'Neutral Undertone', 'Warm Undertone'],
    seasonal_match: ['Deep Winter', 'Cool Winter', 'Soft Summer', 'Deep Autumn'],
    pairing_suggestions: [
      { name: 'Ivory', hex: '#F7F5F0' },
      { name: 'Taupe', hex: '#A58E79' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    description: 'FITCHECK’s signature editorial slate—softer than jet black yet deeply authoritative.',
  },

  // ==========================================
  // 11. MONOCHROME (Black, White, Grey)
  // ==========================================
  {
    id: 'black',
    name: 'Black',
    color_group: 'Monochrome',
    hex_code: '#121212',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Deep Winter', 'Bright Winter', 'Cool Winter'],
    pairing_suggestions: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    description: 'Timeless obsidian black for leather jackets, formal suiting, boots, and minimalist foundations.',
  },
  {
    id: 'mono-white',
    name: 'Pure Monochrome White',
    color_group: 'Monochrome',
    hex_code: '#FAFAFA',
    undertone_match: ['Cool Undertone', 'Neutral Undertone'],
    seasonal_match: ['Bright Winter', 'Cool Winter'],
    pairing_suggestions: [
      { name: 'Black', hex: '#121212' },
      { name: 'Mono Grey', hex: '#757575' },
      { name: 'Charcoal', hex: '#252525' },
    ],
    description: 'Gallery-grade monochrome white designed for high-contrast black-and-white layering.',
  },
  {
    id: 'mono-grey',
    name: 'Grey',
    color_group: 'Monochrome',
    hex_code: '#757575',
    undertone_match: ['Neutral Undertone', 'Cool Undertone'],
    seasonal_match: ['Cool Summer', 'Soft Summer', 'Cool Winter'],
    pairing_suggestions: [
      { name: 'Black', hex: '#121212' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1B2A4A' },
    ],
    description: 'True neutral mid-point grey that bridges white and black in monochromatic outfits.',
  },
];

// =========================================================================
// 12 SEASONAL COLOR PALETTES (Spring, Summer, Autumn, Winter)
// =========================================================================
export const SEASONAL_PALETTES: SeasonalPaletteItem[] = [
  // SPRING
  {
    id: 'light-spring',
    name: 'Light Spring',
    season_family: 'Spring',
    undertone: 'Warm Undertone',
    characteristics: 'Delicate, sunlit warmth with low-to-medium contrast. Best in fresh, translucent warm pastels rather than heavy dark tones.',
    recommended_colors: [
      { name: 'Peach', hex: '#FFE5B4', role: 'Statement Top' },
      { name: 'Butter Yellow', hex: '#FFFAA0', role: 'Knitwear / Shirt' },
      { name: 'Camel', hex: '#C19A6B', role: 'Core Neutral Bottom/Coat' },
      { name: 'Sage', hex: '#9CAF88', role: 'Harmonious Accent' },
      { name: 'Blush', hex: '#F4C2C2', role: 'Soft Layer' },
      { name: 'Ivory', hex: '#F7F5F0', role: 'Base Canvas' },
    ],
    color_combinations: [
      {
        title: 'Sunlit Riviera',
        colors: [
          { name: 'Ivory', hex: '#F7F5F0' },
          { name: 'Camel', hex: '#C19A6B' },
          { name: 'Butter Yellow', hex: '#FFFAA0' },
        ],
        vibe: 'Effortless Old Money & Smart Casual warmth',
      },
      {
        title: 'Botanical Morning',
        colors: [
          { name: 'Sage', hex: '#9CAF88' },
          { name: 'Peach', hex: '#FFE5B4' },
          { name: 'Beige', hex: '#E8E0D5' },
        ],
        vibe: 'Fresh Korean Casual & Romantic harmony',
      },
    ],
    clothing_suggestions: [
      'Choose Ivory or Cream shirts instead of stark optical white near the face.',
      'Opt for Camel, Warm Beige, or Light Khaki tailored trousers over heavy black pants.',
      'Incorporate Butter Yellow, Peach, and Sage in knitwear, polos, and blouses.',
    ],
    hijab_suggestions: [
      'Warm Ivory, Champagne Cream, Soft Peach, and Oat Beige pashminas illuminate your complexion.',
      'Avoid jet-black hijabs directly framing the face; choose Warm Taupe or Mocha instead.',
    ],
  },
  {
    id: 'warm-spring',
    name: 'Warm Spring',
    season_family: 'Spring',
    undertone: 'Warm Undertone',
    characteristics: 'Golden, radiant warmth with vibrant clarity. Thrives in sun-drenched golden browns, coral, warm greens, and cream.',
    recommended_colors: [
      { name: 'Coral', hex: '#FF7F50', role: 'Statement Piece' },
      { name: 'Camel', hex: '#C19A6B', role: 'Tailored Core' },
      { name: 'Cream', hex: '#FFFDD0', role: 'Primary Shirt/Top' },
      { name: 'Gold', hex: '#D4AF37', role: 'Hardware & Accessories' },
      { name: 'Terracotta', hex: '#E2725B', role: 'Warm Layer' },
      { name: 'Olive', hex: '#556B2F', role: 'Grounded Bottoms' },
    ],
    color_combinations: [
      {
        title: 'Golden Heritage',
        colors: [
          { name: 'Cream', hex: '#FFFDD0' },
          { name: 'Camel', hex: '#C19A6B' },
          { name: 'Olive', hex: '#556B2F' },
        ],
        vibe: 'Timeless Classic & Smart Casual sophistication',
      },
      {
        title: 'Mediterranean Sunset',
        colors: [
          { name: 'Coral', hex: '#FF7F50' },
          { name: 'Ivory', hex: '#F7F5F0' },
          { name: 'Mocha', hex: '#836953' },
        ],
        vibe: 'Vibrant Resort & Expressive Casual',
      },
    ],
    clothing_suggestions: [
      'Build your capsule around Camel blazers, Cream linen shirts, and Mocha trousers.',
      'Use Coral, Scarlet, or Mustard as energizing knitwear or tee accents.',
      'Select gold-tone watches, buckles, and jewelry for seamless skin harmony.',
    ],
    hijab_suggestions: [
      'Golden Beige, Warm Camel, Coral Blush, and Olive Sage scarves bring out a natural golden glow.',
      'Silk or modal fabrics in Cream and Warm Tan work effortlessly for both daily and formal looks.',
    ],
  },
  {
    id: 'bright-spring',
    name: 'Bright Spring',
    season_family: 'Spring',
    undertone: 'Warm Undertone',
    characteristics: 'High-clarity, crisp vibrancy with a warm base. Handles saturated jewel-like warm hues paired with clean neutrals.',
    recommended_colors: [
      { name: 'Scarlet', hex: '#FF2400', role: 'Power Accent' },
      { name: 'Emerald', hex: '#2E8B57', role: 'Statement Top/Jacket' },
      { name: 'Coral', hex: '#FF7F50', role: 'Vibrant Layer' },
      { name: 'Navy', hex: '#1B2A4A', role: 'Crisp Anchor' },
      { name: 'Ivory', hex: '#F7F5F0', role: 'Clean Contrast' },
      { name: 'Cobalt', hex: '#0047AB', role: 'Bold Pop' },
    ],
    color_combinations: [
      {
        title: 'Clubhouse Contrast',
        colors: [
          { name: 'Emerald', hex: '#2E8B57' },
          { name: 'Ivory', hex: '#F7F5F0' },
          { name: 'Navy', hex: '#1B2A4A' },
        ],
        vibe: 'Tenniscore & Preppy Streetwear energy',
      },
      {
        title: 'Editorial Pop',
        colors: [
          { name: 'Scarlet', hex: '#FF2400' },
          { name: 'Beige', hex: '#E8E0D5' },
          { name: 'Charcoal', hex: '#252525' },
        ],
        vibe: 'High-fashion runway statement',
      },
    ],
    clothing_suggestions: [
      'Pair clean Ivory or Warm White tops with saturated Emerald, Navy, or Scarlet pieces.',
      'Avoid overly dusty or muddy colors that dull your natural high contrast.',
    ],
    hijab_suggestions: [
      'Crisp Ivory, Warm Navy, Emerald Green, and Clear Coral hijabs create striking facial definition.',
    ],
  },

  // SUMMER
  {
    id: 'light-summer',
    name: 'Light Summer',
    season_family: 'Summer',
    undertone: 'Cool Undertone',
    characteristics: 'Airy, cool-toned luminosity with gentle contrast. Looks ethereal in powder blues, rose pinks, lavender, and cool greys.',
    recommended_colors: [
      { name: 'Baby Blue', hex: '#89CFF0', role: 'Signature Shirt/Top' },
      { name: 'Lavender', hex: '#E6E6FA', role: 'Soft Knitwear' },
      { name: 'Blush', hex: '#F4C2C2', role: 'Romantic Accent' },
      { name: 'Ash', hex: '#B2BEB5', role: 'Tailored Neutral' },
      { name: 'White', hex: '#FFFFFF', role: 'Crisp Base' },
      { name: 'Mint', hex: '#98FF98', role: 'Fresh Highlight' },
    ],
    color_combinations: [
      {
        title: 'Nordic Breeze',
        colors: [
          { name: 'Baby Blue', hex: '#89CFF0' },
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Ash', hex: '#B2BEB5' },
        ],
        vibe: 'Minimalist & Clean Girl/Boy serenity',
      },
      {
        title: 'Pastel Gallery',
        colors: [
          { name: 'Lavender', hex: '#E6E6FA' },
          { name: 'Taupe', hex: '#A58E79' },
          { name: 'Ivory', hex: '#F7F5F0' },
        ],
        vibe: 'Korean Casual & Soft Feminine/Masculine poise',
      },
    ],
    clothing_suggestions: [
      'Sky Blue and Baby Blue Oxford shirts or blouses are your strongest everyday staples.',
      'Replace heavy black outerwear with Ash Grey, Cool Taupe, or Soft Navy.',
      'Silver or white-gold watches and jewelry harmonize effortlessly.',
    ],
    hijab_suggestions: [
      'Powder Blue, Dove Grey, Soft Lavender, and Cool Rose hijabs brighten under-eye shadows.',
      'Avoid overly orange-toned camel or mustard scarves near the face.',
    ],
  },
  {
    id: 'cool-summer',
    name: 'Cool Summer',
    season_family: 'Summer',
    undertone: 'Cool Undertone',
    characteristics: 'Refined, rose-and-blue cooled elegance with medium contrast. Excels in coastal blues, berry rose, slate grey, and navy.',
    recommended_colors: [
      { name: 'Sky Blue', hex: '#87CEEB', role: 'Everyday Top' },
      { name: 'Rose', hex: '#E38AAE', role: 'Statement Layer' },
      { name: 'Navy', hex: '#1B2A4A', role: 'Core Suiting/Bottoms' },
      { name: 'Lilac', hex: '#C8A2C8', role: 'Accent Knit' },
      { name: 'Ash', hex: '#B2BEB5', role: 'Flannel/Trousers' },
      { name: 'Plum', hex: '#673147', role: 'Evening Depth' },
    ],
    color_combinations: [
      {
        title: 'Savile Cool',
        colors: [
          { name: 'Navy', hex: '#1B2A4A' },
          { name: 'Sky Blue', hex: '#87CEEB' },
          { name: 'Ash', hex: '#B2BEB5' },
        ],
        vibe: 'Classic Menswear & Executive Business',
      },
      {
        title: 'Twilight Rose',
        colors: [
          { name: 'Plum', hex: '#673147' },
          { name: 'Rose', hex: '#E38AAE' },
          { name: 'White', hex: '#FFFFFF' },
        ],
        vibe: 'Elegant & Romantic editorial look',
      },
    ],
    clothing_suggestions: [
      'Anchor outfits with Navy and Charcoal-Grey tailoring paired with Crisp White or Sky Blue tops.',
      'Introduce Burgundy, Plum, and Rose for sophisticated tonal depth.',
    ],
    hijab_suggestions: [
      'Cool Mauve, Dusty Rose, Slate Blue, and Navy chiffon or modal hijabs frame cool undertones with regal clarity.',
    ],
  },
  {
    id: 'soft-summer',
    name: 'Soft Summer',
    season_family: 'Summer',
    undertone: 'Neutral Undertone',
    characteristics: 'Velvety, muted cool-neutral balance. Looks effortlessly expensive in smoky taupe, sage, dusty pink, and heather grey.',
    recommended_colors: [
      { name: 'Taupe', hex: '#A58E79', role: 'Signature Neutral' },
      { name: 'Sage', hex: '#9CAF88', role: 'Botanical Core' },
      { name: 'Dusty Pink', hex: '#DCAE96', role: 'Muted Accent' },
      { name: 'Mauve', hex: '#B784A7', role: 'Refined Layer' },
      { name: 'Charcoal', hex: '#252525', role: 'Dark Anchor' },
      { name: 'Ivory', hex: '#F7F5F0', role: 'Soft Light Base' },
    ],
    color_combinations: [
      {
        title: 'Quiet Luxury Tonal',
        colors: [
          { name: 'Taupe', hex: '#A58E79' },
          { name: 'Ivory', hex: '#F7F5F0' },
          { name: 'Charcoal', hex: '#252525' },
        ],
        vibe: 'FITCHECK Signature Editorial & Quiet Luxury',
      },
      {
        title: 'Muted Botanical',
        colors: [
          { name: 'Sage', hex: '#9CAF88' },
          { name: 'Dusty Pink', hex: '#DCAE96' },
          { name: 'Ash', hex: '#B2BEB5' },
        ],
        vibe: 'Relaxed Casual & Modest sophistication',
      },
    ],
    clothing_suggestions: [
      'Monochromatic and tonal layering in Taupe, Sage, Ash Grey, and Charcoal is your superpower.',
      'Prefer brushed textures (suede, cashmere, linen, matte cotton) over harsh neon synthetics.',
    ],
    hijab_suggestions: [
      'Mushroom Taupe, Sage Green, Dusty Pink, and Mauve hijabs create seamless, editorial harmony.',
    ],
  },

  // AUTUMN
  {
    id: 'soft-autumn',
    name: 'Soft Autumn',
    season_family: 'Autumn',
    undertone: 'Neutral Undertone',
    characteristics: 'Warm-neutral muted richness. Radiates quiet confidence in oatmeal beige, sage, mocha, camel, and warm taupe.',
    recommended_colors: [
      { name: 'Beige', hex: '#E8E0D5', role: 'Primary Canvas' },
      { name: 'Mocha', hex: '#836953', role: 'Core Tailoring' },
      { name: 'Sage', hex: '#9CAF88', role: 'Fresh Earth Tone' },
      { name: 'Taupe', hex: '#A58E79', role: 'Bridge Neutral' },
      { name: 'Camel', hex: '#C19A6B', role: 'Outerwear Staple' },
      { name: 'Dusty Pink', hex: '#DCAE96', role: 'Warm Soft Accent' },
    ],
    color_combinations: [
      {
        title: 'Cashmere Atelier',
        colors: [
          { name: 'Beige', hex: '#E8E0D5' },
          { name: 'Mocha', hex: '#836953' },
          { name: 'Ivory', hex: '#F7F5F0' },
        ],
        vibe: 'Old Money & Quiet Luxury perfection',
      },
      {
        title: 'Olive Grove',
        colors: [
          { name: 'Sage', hex: '#9CAF88' },
          { name: 'Camel', hex: '#C19A6B' },
          { name: 'Espresso', hex: '#3B2820' },
        ],
        vibe: 'Smart Casual & Vintage warmth',
      },
    ],
    clothing_suggestions: [
      'Replace stark black and white with Espresso/Mocha and Ivory/Warm Beige.',
      'Layer textures like linen, suede, twill, and fine gauge knits in earth tones.',
    ],
    hijab_suggestions: [
      'Oatmeal Beige, Mocha, Warm Taupe, and Olive Sage pashminas look naturally luminous.',
    ],
  },
  {
    id: 'warm-autumn',
    name: 'Warm Autumn',
    season_family: 'Autumn',
    undertone: 'Warm Undertone',
    characteristics: 'Rich, spice-toned golden warmth. Commands attention in terracotta, olive, mustard, camel, and chocolate brown.',
    recommended_colors: [
      { name: 'Terracotta', hex: '#E2725B', role: 'Signature Statement' },
      { name: 'Olive', hex: '#556B2F', role: 'Utility & Tailoring' },
      { name: 'Mustard', hex: '#E1AD01', role: 'Spiced Accent' },
      { name: 'Camel', hex: '#C19A6B', role: 'Coat/Blazer Core' },
      { name: 'Chocolate', hex: '#5C3317', role: 'Deep Grounding' },
      { name: 'Cream', hex: '#FFFDD0', role: 'Warm Shirt Base' },
    ],
    color_combinations: [
      {
        title: 'Tuscan Heritage',
        colors: [
          { name: 'Terracotta', hex: '#E2725B' },
          { name: 'Cream', hex: '#FFFDD0' },
          { name: 'Olive', hex: '#556B2F' },
        ],
        vibe: 'Rugged, Vintage & Bohemian mastery',
      },
      {
        title: 'Autumn Sartorial',
        colors: [
          { name: 'Camel', hex: '#C19A6B' },
          { name: 'Chocolate', hex: '#5C3317' },
          { name: 'Mustard', hex: '#E1AD01' },
        ],
        vibe: 'Classic Menswear & Warm Elegant',
      },
    ],
    clothing_suggestions: [
      'Chocolate and Espresso leather jackets, boots, and trousers outshine black on your skin tone.',
      'Embrace Olive chinos, Camel coats, and Cream shirts as your daily uniform.',
    ],
    hijab_suggestions: [
      'Terracotta, Cinnamon Brown, Warm Olive, and Cream scarves enhance warmth and vitality.',
    ],
  },
  {
    id: 'deep-autumn',
    name: 'Deep Autumn',
    season_family: 'Autumn',
    undertone: 'Warm Undertone',
    characteristics: 'High-depth, luxurious dark warmth. Thrives in espresso, maroon, burgundy, forest olive, and burnished gold.',
    recommended_colors: [
      { name: 'Espresso', hex: '#3B2820', role: 'Primary Dark Anchor' },
      { name: 'Burgundy', hex: '#800020', role: 'Regal Statement' },
      { name: 'Olive', hex: '#556B2F', role: 'Structured Core' },
      { name: 'Camel', hex: '#C19A6B', role: 'Warm Contrast' },
      { name: 'Gold', hex: '#D4AF37', role: 'Luxe Accent' },
      { name: 'Ivory', hex: '#F7F5F0', role: 'Crisp Counterbalance' },
    ],
    color_combinations: [
      {
        title: 'Nocturnal Reserve',
        colors: [
          { name: 'Espresso', hex: '#3B2820' },
          { name: 'Camel', hex: '#C19A6B' },
          { name: 'Ivory', hex: '#F7F5F0' },
        ],
        vibe: 'Quiet Luxury & Executive Power',
      },
      {
        title: 'Velvet Bordeaux',
        colors: [
          { name: 'Burgundy', hex: '#800020' },
          { name: 'Beige', hex: '#E8E0D5' },
          { name: 'Charcoal', hex: '#252525' },
        ],
        vibe: 'Formal & Evening Editorial',
      },
    ],
    clothing_suggestions: [
      'Pair deep Espresso, Burgundy, or Dark Olive outerwear with Ivory or Warm Beige underlayers for rich contrast.',
      'Dark tortoise-shell eyewear and brown/oxblood leather accessories look exceptional.',
    ],
    hijab_suggestions: [
      'Deep Burgundy, Espresso Brown, Emerald Forest, and Warm Champagne hijabs frame your features with striking poise.',
    ],
  },

  // WINTER
  {
    id: 'bright-winter',
    name: 'Bright Winter',
    season_family: 'Winter',
    undertone: 'Cool Undertone',
    characteristics: 'High-contrast, crystalline brilliance. Commands pure black, optical white, cobalt blue, cherry red, and emerald.',
    recommended_colors: [
      { name: 'Cobalt', hex: '#0047AB', role: 'Signature Statement' },
      { name: 'Cherry', hex: '#D2042D', role: 'High-Impact Accent' },
      { name: 'Black', hex: '#121212', role: 'Sleek Core' },
      { name: 'White', hex: '#FFFFFF', role: 'Optical Contrast' },
      { name: 'Emerald', hex: '#2E8B57', role: 'Jewel Layer' },
      { name: 'Silver', hex: '#C0C0C0', role: 'Metallic Edge' },
    ],
    color_combinations: [
      {
        title: 'Gallery Monochrome + Pop',
        colors: [
          { name: 'Black', hex: '#121212' },
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Cobalt', hex: '#0047AB' },
        ],
        vibe: 'Modern Minimalist & Streetwear precision',
      },
      {
        title: 'Crimson Runway',
        colors: [
          { name: 'Cherry', hex: '#D2042D' },
          { name: 'Charcoal', hex: '#252525' },
          { name: 'Silver', hex: '#C0C0C0' },
        ],
        vibe: 'Edgy Urban & High-Fashion Editorial',
      },
    ],
    clothing_suggestions: [
      'You are one of the few profiles that can wear head-to-toe Black & Optical White with effortless vitality.',
      'Add a single jewel-tone piece (Cobalt, Cherry, Emerald) for runway-level impact.',
    ],
    hijab_suggestions: [
      'Jet Black, Crisp White, Royal Cobalt, and Ruby Cherry hijabs sharpen facial contours beautifully.',
    ],
  },
  {
    id: 'cool-winter',
    name: 'Cool Winter',
    season_family: 'Winter',
    undertone: 'Cool Undertone',
    characteristics: 'Icy, regal cool precision. Excels in navy, charcoal, optical white, plum, icy rose, and silver.',
    recommended_colors: [
      { name: 'Navy', hex: '#1B2A4A', role: 'Sartorial Core' },
      { name: 'Charcoal', hex: '#252525', role: 'Tailored Suiting' },
      { name: 'White', hex: '#FFFFFF', role: 'Crisp Shirting' },
      { name: 'Plum', hex: '#673147', role: 'Regal Accent' },
      { name: 'Silver', hex: '#C0C0C0', role: 'Hardware & Accessories' },
      { name: 'Baby Blue', hex: '#89CFF0', role: 'Icy Contrast' },
    ],
    color_combinations: [
      {
        title: 'Metropolitan Tailoring',
        colors: [
          { name: 'Charcoal', hex: '#252525' },
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Navy', hex: '#1B2A4A' },
        ],
        vibe: 'Formal, Business & Classic authority',
      },
      {
        title: 'Icy Nocturne',
        colors: [
          { name: 'Plum', hex: '#673147' },
          { name: 'Baby Blue', hex: '#89CFF0' },
          { name: 'Black', hex: '#121212' },
        ],
        vibe: 'Elegant & K-Fashion sophistication',
      },
    ],
    clothing_suggestions: [
      'Prioritize Navy, Charcoal, and Black tailoring paired with icy Baby Blue or pure White shirts.',
      'Choose silver/platinum watches and hardware over yellow gold.',
    ],
    hijab_suggestions: [
      'Midnight Navy, Charcoal Slate, Icy Lilac, and Deep Berry hijabs deliver timeless elegance.',
    ],
  },
  {
    id: 'deep-winter',
    name: 'Deep Winter',
    season_family: 'Winter',
    undertone: 'Neutral Undertone',
    characteristics: 'Dramatic, high-depth cool-neutral intensity. Looks commanding in obsidian black, charcoal, burgundy, navy, and ivory.',
    recommended_colors: [
      { name: 'Black', hex: '#121212', role: 'Signature Foundation' },
      { name: 'Charcoal', hex: '#252525', role: 'Architectural Layer' },
      { name: 'Burgundy', hex: '#800020', role: 'Deep Jewel Accent' },
      { name: 'Navy', hex: '#1B2A4A', role: 'Formal Anchor' },
      { name: 'Ivory', hex: '#F7F5F0', role: 'Editorial Contrast' },
      { name: 'Emerald', hex: '#2E8B57', role: 'Rich Statement' },
    ],
    color_combinations: [
      {
        title: 'Editorial Noir',
        colors: [
          { name: 'Black', hex: '#121212' },
          { name: 'Charcoal', hex: '#252525' },
          { name: 'Ivory', hex: '#F7F5F0' },
        ],
        vibe: 'Minimalist & Runway Editorial',
      },
      {
        title: 'Midnight Luxe',
        colors: [
          { name: 'Navy', hex: '#1B2A4A' },
          { name: 'Burgundy', hex: '#800020' },
          { name: 'Taupe', hex: '#A58E79' },
        ],
        vibe: 'Old Money & Classic Evening',
      },
    ],
    clothing_suggestions: [
      'Rich dark foundations (Black, Charcoal, Midnight Navy) paired with crisp Ivory or Burgundy accents create effortless presence.',
      'Structured fabrics like wool gabardine, leather, and heavy poplin suit your natural contrast.',
    ],
    hijab_suggestions: [
      'Black, Deep Wine Burgundy, Midnight Navy, and Cool Taupe hijabs offer commanding, polished contrast.',
    ],
  },
];


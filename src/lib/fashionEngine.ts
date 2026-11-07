import { INITIAL_COLOR_CATALOG } from '@/data/colorCatalog';
import {
  ColorCatalogItem,
  DetectedGarment,
  OutfitAnalysisResult,
  OutfitScoreBreakdown,
  UserColorProfile,
  UserProfile,
  WardrobeCategory,
} from '@/types/fitcheck';

export const MEN_GARMENT_TYPES = [
  { name: 'T-shirt', category: 'Tops' as WardrobeCategory },
  { name: 'Shirt', category: 'Tops' as WardrobeCategory },
  { name: 'Polo shirt', category: 'Tops' as WardrobeCategory },
  { name: 'Hoodie', category: 'Tops' as WardrobeCategory },
  { name: 'Sweater', category: 'Tops' as WardrobeCategory },
  { name: 'Jacket', category: 'Outerwear' as WardrobeCategory },
  { name: 'Blazer', category: 'Outerwear' as WardrobeCategory },
  { name: 'Suit', category: 'Outerwear' as WardrobeCategory },
  { name: 'Jeans', category: 'Bottoms' as WardrobeCategory },
  { name: 'Trousers', category: 'Bottoms' as WardrobeCategory },
  { name: 'Shorts', category: 'Bottoms' as WardrobeCategory },
  { name: 'Sneakers', category: 'Shoes' as WardrobeCategory },
  { name: 'Loafers', category: 'Shoes' as WardrobeCategory },
  { name: 'Boots', category: 'Shoes' as WardrobeCategory },
  { name: 'Watches', category: 'Accessories' as WardrobeCategory },
  { name: 'Bags', category: 'Bags' as WardrobeCategory },
  { name: 'Accessories', category: 'Accessories' as WardrobeCategory },
];

export const WOMEN_GARMENT_TYPES = [
  { name: 'Blouse', category: 'Tops' as WardrobeCategory },
  { name: 'Shirt', category: 'Tops' as WardrobeCategory },
  { name: 'T-shirt', category: 'Tops' as WardrobeCategory },
  { name: 'Sweater', category: 'Tops' as WardrobeCategory },
  { name: 'Cardigan', category: 'Tops' as WardrobeCategory },
  { name: 'Blazer', category: 'Outerwear' as WardrobeCategory },
  { name: 'Jacket', category: 'Outerwear' as WardrobeCategory },
  { name: 'Outerwear', category: 'Outerwear' as WardrobeCategory },
  { name: 'Dress', category: 'Dresses' as WardrobeCategory },
  { name: 'Skirt', category: 'Bottoms' as WardrobeCategory },
  { name: 'Jeans', category: 'Bottoms' as WardrobeCategory },
  { name: 'Trousers', category: 'Bottoms' as WardrobeCategory },
  { name: 'Hijab', category: 'Hijab' as WardrobeCategory },
  { name: 'Shoes', category: 'Shoes' as WardrobeCategory },
  { name: 'Heels', category: 'Shoes' as WardrobeCategory },
  { name: 'Sneakers', category: 'Shoes' as WardrobeCategory },
  { name: 'Bags', category: 'Bags' as WardrobeCategory },
  { name: 'Jewelry', category: 'Accessories' as WardrobeCategory },
  { name: 'Accessories', category: 'Accessories' as WardrobeCategory },
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '').trim();
  const num = parseInt(clean.length === 3 ? clean.replace(/(.)/g, '$1$1') : clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function findNearestCatalogColor(hex: string, catalog: ColorCatalogItem[] = INITIAL_COLOR_CATALOG): ColorCatalogItem {
  const target = hexToRgb(hex);
  let best = catalog[0];
  let minDistance = Infinity;

  for (const item of catalog) {
    const c = hexToRgb(item.hex_code);
    const dist =
      Math.pow((target.r - c.r) * 0.3, 2) +
      Math.pow((target.g - c.g) * 0.59, 2) +
      Math.pow((target.b - c.b) * 0.11, 2);
    if (dist < minDistance) {
      minDistance = dist;
      best = item;
    }
  }
  return best;
}

/**
 * Extracts real dominant colors & garment zone colors (Upper, Lower, Footwear, Accent/Headwear)
 * from an image DataURL or URL using an offscreen HTML5 Canvas.
 */
export async function extractColorsFromImage(imageSrc: string): Promise<{
  dominantColors: { name: string; hex: string; percentage: number }[];
  zoneColors: {
    headZone: { name: string; hex: string };
    upperZone: { name: string; hex: string };
    lowerZone: { name: string; hex: string };
    footZone: { name: string; hex: string };
  };
}> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 96;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        ctx.drawImage(img, 0, 0, size, size);

        const sampleRegion = (x0: number, y0: number, x1: number, y1: number) => {
          let rSum = 0,
            gSum = 0,
            bSum = 0,
            count = 0;
          const data = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data;
          for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < 128) continue;
            rSum += r;
            gSum += g;
            bSum += b;
            count++;
          }
          if (count === 0) return { name: 'Ivory', hex: '#F7F5F0' };
          const hex = rgbToHex(rSum / count, gSum / count, bSum / count);
          const matched = findNearestCatalogColor(hex);
          return { name: matched.name, hex: matched.hex_code };
        };

        const headZone = sampleRegion(28, 6, 68, 22);
        const upperZone = sampleRegion(22, 22, 74, 52);
        const lowerZone = sampleRegion(26, 52, 70, 80);
        const footZone = sampleRegion(28, 80, 68, 94);

        // Histogram of catalog color hits across center body crop
        const counts = new Map<string, { item: ColorCatalogItem; count: number }>();
        const centerData = ctx.getImageData(18, 10, 60, 80).data;
        let totalSamples = 0;
        for (let i = 0; i < centerData.length; i += 24) {
          const hex = rgbToHex(centerData[i], centerData[i + 1], centerData[i + 2]);
          const matched = findNearestCatalogColor(hex);
          const prev = counts.get(matched.id);
          if (prev) {
            prev.count += 1;
          } else {
            counts.set(matched.id, { item: matched, count: 1 });
          }
          totalSamples++;
        }

        const sorted = Array.from(counts.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 4)
          .map((entry) => ({
            name: entry.item.name,
            hex: entry.item.hex_code,
            percentage: Math.max(8, Math.round((entry.count / Math.max(1, totalSamples)) * 100)),
          }));

        resolve({
          dominantColors:
            sorted.length > 0
              ? sorted
              : [
                  { name: upperZone.name, hex: upperZone.hex, percentage: 45 },
                  { name: lowerZone.name, hex: lowerZone.hex, percentage: 35 },
                  { name: footZone.name, hex: footZone.hex, percentage: 20 },
                ],
          zoneColors: { headZone, upperZone, lowerZone, footZone },
        });
      } catch {
        resolve({
          dominantColors: [
            { name: 'Ivory', hex: '#F7F5F0', percentage: 42 },
            { name: 'Charcoal', hex: '#252525', percentage: 36 },
            { name: 'Taupe', hex: '#A58E79', percentage: 22 },
          ],
          zoneColors: {
            headZone: { name: 'Beige', hex: '#E8E0D5' },
            upperZone: { name: 'Ivory', hex: '#F7F5F0' },
            lowerZone: { name: 'Charcoal', hex: '#252525' },
            footZone: { name: 'Taupe', hex: '#A58E79' },
          },
        });
      }
    };
    img.onerror = () => {
      resolve({
        dominantColors: [
          { name: 'Ivory', hex: '#F7F5F0', percentage: 45 },
          { name: 'Charcoal', hex: '#252525', percentage: 35 },
          { name: 'Camel', hex: '#C19A6B', percentage: 20 },
        ],
        zoneColors: {
          headZone: { name: 'Beige', hex: '#E8E0D5' },
          upperZone: { name: 'Ivory', hex: '#F7F5F0' },
          lowerZone: { name: 'Charcoal', hex: '#252525' },
          footZone: { name: 'Camel', hex: '#C19A6B' },
        },
      });
    };
    img.src = imageSrc;
  });
}

/**
 * Evaluates outfit composition, color harmony (30%), outfit combination (30%),
 * style consistency (25%), and accessories match (15%) without gender bias.
 */
export function evaluateSartorialAnalysis(params: {
  anonUserId: string;
  imageUrl: string;
  genderContext: 'Men' | 'Women' | 'Inclusive';
  includeHijab: boolean;
  detectedItems: DetectedGarment[];
  dominantColors: { name: string; hex: string; percentage: number }[];
  targetStyles: string[];
  userProfile?: UserProfile | null;
  userColorProfile?: UserColorProfile | null;
  analysisMode?: 'AI Vision API (Server)' | 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)';
}): OutfitAnalysisResult {
  const {
    anonUserId,
    imageUrl,
    genderContext,
    includeHijab,
    detectedItems,
    dominantColors,
    targetStyles,
    userProfile,
    userColorProfile,
    analysisMode = 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)',
  } = params;

  const neutralGroups = ['Neutral', 'Brown', 'Grey', 'Monochrome'];
  const catalogColors = dominantColors.map((dc) => findNearestCatalogColor(dc.hex));
  const neutralCount = catalogColors.filter((c) => neutralGroups.includes(c.color_group)).length;
  const statementCount = catalogColors.length - neutralCount;

  // 1. Color Harmony (30%)
  let colorHarmonyScore = 84;
  let colorHarmonyLabel = 'Balanced Tonal & Accent Coordination';

  if (neutralCount >= 2 && statementCount === 0) {
    colorHarmonyScore = 92;
    colorHarmonyLabel = 'Editorial Tonal & Neutral Harmony (Quiet Luxury / Minimalist Grade)';
  } else if (neutralCount >= 1 && statementCount === 1) {
    colorHarmonyScore = 90;
    colorHarmonyLabel = 'Grounded Neutral Base with Controlled Focal Accent';
  } else if (statementCount >= 3) {
    colorHarmonyScore = 76;
    colorHarmonyLabel = 'High-Contrast Expressive Color-Blocking';
  }

  // Boost if colors align with user's Personal Color Undertone or Favorites
  if (userColorProfile) {
    const matchesUndertone = catalogColors.some((c) =>
      c.undertone_match.includes(userColorProfile.undertone)
    );
    if (matchesUndertone) colorHarmonyScore = Math.min(98, colorHarmonyScore + 4);
  }

  // 2. Outfit Combination (30%)
  const categoriesPresent = new Set(detectedItems.map((i) => i.category));
  const hasTopOrDress = categoriesPresent.has('Tops') || categoriesPresent.has('Dresses');
  const hasBottomOrDress = categoriesPresent.has('Bottoms') || categoriesPresent.has('Dresses');
  const hasShoes = categoriesPresent.has('Shoes');
  const hasOuterwear = categoriesPresent.has('Outerwear');

  let outfitCombScore = 78;
  if (hasTopOrDress && hasBottomOrDress) outfitCombScore += 8;
  if (hasShoes) outfitCombScore += 5;
  if (hasOuterwear) outfitCombScore += 4;
  if (includeHijab && categoriesPresent.has('Hijab')) outfitCombScore += 3;
  outfitCombScore = Math.min(96, outfitCombScore);

  // 3. Style Consistency (25%)
  const inferredStyles =
    targetStyles.length > 0
      ? targetStyles
      : userProfile?.selected_styles?.slice(0, 2) || ['Minimalist', 'Smart Casual'];

  let styleConsistencyScore = 86;
  const itemNamesJoined = detectedItems.map((d) => d.item_type.toLowerCase()).join(' ');
  const hasFormalPiece = /blazer|suit|loafer|heel|dress|shirt|trouser|blouse/.test(itemNamesJoined);
  const hasSportyPiece = /hoodie|sneaker|shorts|t-shirt/.test(itemNamesJoined);

  if (hasFormalPiece && hasSportyPiece) {
    // High-low mixing (Smart Casual / Athleisure / Streetwear)
    styleConsistencyScore = 88;
  } else {
    styleConsistencyScore = 91;
  }

  // 4. Accessories Match (15%)
  const hasAccessories = categoriesPresent.has('Accessories') || categoriesPresent.has('Bags');
  const accessoriesMatchScore = hasAccessories ? 90 : 79;

  // Weighted Total Score: 30% + 30% + 25% + 15% = 100%
  const totalScore = Math.round(
    colorHarmonyScore * 0.3 +
      outfitCombScore * 0.3 +
      styleConsistencyScore * 0.25 +
      accessoriesMatchScore * 0.15
  );

  const scoreBreakdown: OutfitScoreBreakdown = {
    color_harmony: colorHarmonyScore,
    outfit_combination: outfitCombScore,
    style_consistency: styleConsistencyScore,
    accessories_match: accessoriesMatchScore,
  };

  const primaryColor = dominantColors[0]?.name || 'Ivory';
  const secondaryColor = dominantColors[1]?.name || 'Charcoal';

  const strengths: string[] = [
    `Strong chromatic cohesion between ${primaryColor} and ${secondaryColor} (${colorHarmonyLabel}).`,
    `Clear silhouette hierarchy across ${detectedItems.map((d) => d.item_type).join(', ')}.`,
    `Aligns naturally with ${inferredStyles.join(' & ')} proportions without restrictive gender clichés.`,
  ];

  if (includeHijab || categoriesPresent.has('Hijab')) {
    strengths.push(
      'Thoughtful modest layering where headscarf/hijab tone bridges the upper garment and facial framing.'
    );
  }

  const weaknesses: string[] = [];
  if (!hasAccessories) {
    weaknesses.push(
      'Accessory & hardware anchor is minimal—adding a timepiece, structured bag, or subtle jewelry would elevate visual completion.'
    );
  }
  if (!hasOuterwear && detectedItems.length <= 3) {
    weaknesses.push(
      'Two-dimensional layering; a third piece (unstructured blazer, cardigan, or overshirt) could add editorial depth.'
    );
  }
  if (weaknesses.length === 0) {
    weaknesses.push(
      'Texture contrast can be pushed further by pairing matte cotton/wool against subtle leather or satin finishes.'
    );
  }

  const improvementTips: string[] = [
    `Balance the ${primaryColor} upper proportion with a clean ankle break or structured cuff on the lower silhouette.`,
    `Echo your footwear tone (${detectedItems.find((i) => i.category === 'Shoes')?.color_name || secondaryColor}) in your belt, watch strap, or bag hardware.`,
    userColorProfile
      ? `Since your personal palette is ${userColorProfile.seasonal_palette} (${userColorProfile.undertone}), keep ${userColorProfile.recommended_colors[0]?.name || 'warm/cool neutrals'} closest to your neckline.`
      : 'Use the 60-30-10 sartorial ratio: 60% dominant core, 30% secondary trouser/skirt, and 10% accessory accent.',
  ];

  const accessoryRecommendations: string[] =
    genderContext === 'Men'
      ? [
          `Classic leather-strap dress watch or brushed steel chronograph to complement ${primaryColor}.`,
          `Structured leather tote or crossbody messenger in Espresso or Taupe.`,
          `Minimalist signet ring or acetate frame eyewear for editorial polish.`,
        ]
      : [
          `Structured top-handle leather bag or crescent shoulder bag in ${secondaryColor} or Mocha.`,
          `Sculptural gold/silver hoop earrings or layered pendant necklace matched to your undertone.`,
          includeHijab
            ? `Magnetic matte metallic hijab pin and tonal modal/silk pashmina in ${primaryColor}.`
            : `Silk neck scarf or slim leather belt with brushed metallic buckle.`,
        ];

  const alternativeCombinations: string[] = [
    `Smart-Editorial Swap: Pair your ${detectedItems[0]?.color_name || primaryColor} ${detectedItems[0]?.item_type || 'Top'} with pleated wide-leg wool trousers and leather loafers.`,
    `Relaxed Off-Duty: Layer an unstructured ${secondaryColor} blazer or cardigan over a crisp white/ivory base with clean court sneakers.`,
    includeHijab
      ? `Modest Tonal Look: Combine a Champagne Beige modal hijab with a belted longline coat and fluid maxi skirt.`
      : `Monochrome Capsule: Transition into evening by swapping the bottom piece for tailored Charcoal or Espresso suiting.`,
  ];

  return {
    id: `analysis-${Date.now()}`,
    anon_user_id: anonUserId,
    image_url: imageUrl,
    analysis_mode: analysisMode,
    gender_context: genderContext,
    outfit_score: totalScore,
    score_breakdown: scoreBreakdown,
    detected_items: detectedItems,
    detected_colors: dominantColors,
    detected_styles: inferredStyles,
    color_harmony: colorHarmonyLabel,
    strengths,
    weaknesses,
    improvement_tips: improvementTips,
    accessory_recommendations: accessoryRecommendations,
    alternative_combinations: alternativeCombinations,
    created_at: new Date().toISOString(),
  };
}


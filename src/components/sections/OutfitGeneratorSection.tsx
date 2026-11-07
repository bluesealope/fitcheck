'use client';

import React, { useMemo, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { WardrobeItem } from '@/types/fitcheck';
import {
  Shuffle,
  Sparkles,
  Bookmark,
  Trash2,
  CalendarPlus,
  Check,
  Shirt,
} from 'lucide-react';

export const OutfitGeneratorSection: React.FC = () => {
  const {
    profile,
    wardrobe,
    savedOutfits,
    addSavedOutfit,
    deleteSavedOutfit,
    addOutfitPlan,
    setActiveNav,
  } = useFitCheck();

  const [activity, setActivity] = useState<string>('Campus / Creative Workday');
  const [occasion, setOccasion] = useState<string>('Smart Casual');
  const [targetStyle, setTargetStyle] = useState<string>(
    profile?.selected_styles[0] || 'Old Money'
  );
  const [targetColor, setTargetColor] = useState<string>('Any Harmonious Color');

  const topsAndDresses = useMemo(
    () => wardrobe.filter((w) => w.category === 'Tops' || w.category === 'Dresses'),
    [wardrobe]
  );
  const bottoms = useMemo(
    () => wardrobe.filter((w) => w.category === 'Bottoms'),
    [wardrobe]
  );
  const outerwearList = useMemo(
    () => wardrobe.filter((w) => w.category === 'Outerwear'),
    [wardrobe]
  );
  const shoesList = useMemo(
    () => wardrobe.filter((w) => w.category === 'Shoes'),
    [wardrobe]
  );
  const bagsAndAccessories = useMemo(
    () => wardrobe.filter((w) => w.category === 'Bags' || w.category === 'Accessories'),
    [wardrobe]
  );
  const hijabList = useMemo(
    () => wardrobe.filter((w) => w.category === 'Hijab'),
    [wardrobe]
  );

  // Selected piece IDs from actual Digital Wardrobe
  const [selectedTopId, setSelectedTopId] = useState<string>(
    () => topsAndDresses[0]?.id || ''
  );
  const [selectedBottomId, setSelectedBottomId] = useState<string>(
    () => bottoms[0]?.id || ''
  );
  const [selectedOuterId, setSelectedOuterId] = useState<string>(
    () => outerwearList[0]?.id || 'none'
  );
  const [selectedShoeId, setSelectedShoeId] = useState<string>(
    () => shoesList[0]?.id || ''
  );
  const [selectedAccId, setSelectedAccId] = useState<string>(
    () => bagsAndAccessories[0]?.id || 'none'
  );
  const [selectedHijabId, setSelectedHijabId] = useState<string>(
    () => hijabList[0]?.id || 'none'
  );

  const [outfitTitle, setOutfitTitle] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<string>('');

  const availableStylesInWardrobe = useMemo(() => {
    const s = new Set<string>(profile?.selected_styles || []);
    wardrobe.forEach((w) => w.style_tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [wardrobe, profile]);

  const availableColorsInWardrobe = useMemo(() => {
    const c = new Set<string>();
    wardrobe.forEach((w) => c.add(w.color_name));
    return Array.from(c);
  }, [wardrobe]);

  // Assemble currently active WardrobeItems
  const activeOutfitItems: WardrobeItem[] = useMemo(() => {
    const ids = [
      selectedHijabId !== 'none' ? selectedHijabId : '',
      selectedTopId,
      selectedOuterId !== 'none' ? selectedOuterId : '',
      selectedBottomId,
      selectedShoeId,
      selectedAccId !== 'none' ? selectedAccId : '',
    ].filter(Boolean);

    return ids
      .map((id) => wardrobe.find((w) => w.id === id))
      .filter((item): item is WardrobeItem => Boolean(item));
  }, [
    wardrobe,
    selectedHijabId,
    selectedTopId,
    selectedOuterId,
    selectedBottomId,
    selectedShoeId,
    selectedAccId,
  ]);

  // Intelligent Mix & Match Generator using only user's owned Digital Wardrobe items
  const handleGenerateOutfit = () => {
    setSaveMessage('');
    const pickBestOrRandom = (pool: WardrobeItem[]): WardrobeItem | undefined => {
      if (pool.length === 0) return undefined;
      const matching = pool.filter((item) => {
        const styleMatch =
          !targetStyle ||
          targetStyle === 'All Styles' ||
          item.style_tags.some((t) => t.toLowerCase() === targetStyle.toLowerCase());
        const colorMatch =
          !targetColor ||
          targetColor === 'Any Harmonious Color' ||
          item.color_name.toLowerCase() === targetColor.toLowerCase();
        return styleMatch || colorMatch;
      });
      const candidates = matching.length > 0 ? matching : pool;
      return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const pickedTop = pickBestOrRandom(topsAndDresses);
    if (pickedTop) setSelectedTopId(pickedTop.id);

    // If top is a Dress, bottom is optional, otherwise pick bottom
    if (pickedTop?.category !== 'Dresses') {
      const pickedBottom = pickBestOrRandom(bottoms);
      if (pickedBottom) setSelectedBottomId(pickedBottom.id);
    }

    const pickedOuter = pickBestOrRandom(outerwearList);
    setSelectedOuterId(pickedOuter ? pickedOuter.id : 'none');

    const pickedShoe = pickBestOrRandom(shoesList);
    if (pickedShoe) setSelectedShoeId(pickedShoe.id);

    const pickedAcc = pickBestOrRandom(bagsAndAccessories);
    setSelectedAccId(pickedAcc ? pickedAcc.id : 'none');

    if (
      hijabList.length > 0 &&
      profile?.gender_profile === 'Women' &&
      profile.styling_preference !== 'Non-Hijab'
    ) {
      const pickedHijab = pickBestOrRandom(hijabList);
      if (pickedHijab) setSelectedHijabId(pickedHijab.id);
    }
  };

  const handleSaveFavoriteOutfit = async () => {
    if (activeOutfitItems.length === 0) return;
    const title =
      outfitTitle.trim() || `${targetStyle} ${occasion} Look (${activeOutfitItems[0].color_name})`;

    await addSavedOutfit({
      title,
      activity,
      occasion,
      target_style: targetStyle,
      target_color: targetColor,
      item_ids: activeOutfitItems.map((i) => i.id),
      items_snapshot: activeOutfitItems,
      harmony_note: `Assembled from ${activeOutfitItems.length} owned Digital Wardrobe pieces (${activeOutfitItems
        .map((i) => i.color_name)
        .join(', ')}).`,
      is_favorite: true,
    });

    setOutfitTitle('');
    setSaveMessage('Outfit saved to your Favorite Outfits collection!');
  };

  const handleSendToPlanner = async () => {
    if (activeOutfitItems.length === 0) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const title =
      outfitTitle.trim() || `${targetStyle} ${occasion} Ensemble`;

    await addOutfitPlan({
      plan_date: todayStr,
      event_name: activity,
      occasion_type: occasion,
      outfit_title: title,
      item_ids: activeOutfitItems.map((i) => i.id),
      items_snapshot: activeOutfitItems,
      notes: `Generated via Mix & Match Studio for ${targetStyle}.`,
    });

    setSaveMessage('Scheduled in Outfit Planner for today!');
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 07 — Mix & Match Studio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Outfit Generator
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Every combination here is built strictly from the garments you own in your Digital
            Wardrobe ({wardrobe.length} items available). Select your activity, occasion, style, and
            color to generate or manually mix & match your look.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateOutfit}
          className="px-6 py-3.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2 shrink-0"
        >
          <Shuffle className="w-4 h-4 text-[#A58E79]" />
          <span>Generate Smart Outfit</span>
        </button>
      </div>

      {/* Activity, Occasion, Style & Color Parameters */}
      <div className="bg-white border border-[#DED5C8] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1.5">
            1. Select Activity
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs text-[#252525]"
          >
            <option value="Campus / Creative Workday">Campus / Creative Workday</option>
            <option value="Executive Meeting & Presentation">Executive Meeting & Presentation</option>
            <option value="Coffee Run & Bookstore">Coffee Run & Bookstore</option>
            <option value="Evening Dinner & Lounge">Evening Dinner & Lounge</option>
            <option value="Weekend City Walk & Gallery">Weekend City Walk & Gallery</option>
            <option value="Formal Gala & Ceremony">Formal Gala & Ceremony</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1.5">
            2. Select Occasion
          </label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs text-[#252525]"
          >
            <option value="Smart Casual">Smart Casual</option>
            <option value="Casual Everyday">Casual Everyday</option>
            <option value="Formal / Business">Formal / Business</option>
            <option value="Date Night / Social">Date Night / Social</option>
            <option value="Street / Urban Hangout">Street / Urban Hangout</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1.5">
            3. Select Target Style
          </label>
          <select
            value={targetStyle}
            onChange={(e) => setTargetStyle(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs text-[#252525]"
          >
            <option value="All Styles">All Styles</option>
            {availableStylesInWardrobe.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1.5">
            4. Select Color Focus
          </label>
          <select
            value={targetColor}
            onChange={(e) => setTargetColor(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs text-[#252525]"
          >
            <option value="Any Harmonious Color">Any Harmonious Color</option>
            {availableColorsInWardrobe.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Mix & Match Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Slot-by-Slot Selector from User's Wardrobe */}
        <div className="lg:col-span-5 bg-white border border-[#DED5C8] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
            <span className="text-xs uppercase tracking-widest text-[#252525] font-medium">
              Mix & Match Wardrobe Slots
            </span>
            <button
              type="button"
              onClick={() => setActiveNav('wardrobe')}
              className="text-[10px] uppercase tracking-widest text-[#A58E79] underline"
            >
              + Add More Clothes
            </button>
          </div>

          <div className="space-y-4">
            {/* Hijab Slot (if Hijab items exist in wardrobe) */}
            {hijabList.length > 0 && (
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Hijab / Headscarf Slot (Owned)
                </label>
                <select
                  value={selectedHijabId}
                  onChange={(e) => setSelectedHijabId(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
                >
                  <option value="none">— None / Non-Hijab —</option>
                  {hijabList.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.item_name} ({h.color_name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Top / Dress Slot */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                Top or Dress Slot (Owned)
              </label>
              <select
                value={selectedTopId}
                onChange={(e) => setSelectedTopId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
              >
                {topsAndDresses.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.category}] {t.item_name} ({t.color_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Outerwear Slot */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                Outerwear Layer (Owned)
              </label>
              <select
                value={selectedOuterId}
                onChange={(e) => setSelectedOuterId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
              >
                <option value="none">— No Outerwear Layer —</option>
                {outerwearList.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.item_name} ({o.color_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Bottom Slot */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                Bottoms Slot (Owned)
              </label>
              <select
                value={selectedBottomId}
                onChange={(e) => setSelectedBottomId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
              >
                <option value="">— None (When Wearing Dress) —</option>
                {bottoms.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.item_name} ({b.color_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Footwear Slot */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                Shoes / Footwear Slot (Owned)
              </label>
              <select
                value={selectedShoeId}
                onChange={(e) => setSelectedShoeId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
              >
                {shoesList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.item_name} ({s.color_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Bag / Accessory Slot */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                Bag & Accessories Slot (Owned)
              </label>
              <select
                value={selectedAccId}
                onChange={(e) => setSelectedAccId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2 text-xs text-[#252525]"
              >
                <option value="none">— No Accessory Selected —</option>
                {bagsAndAccessories.map((a) => (
                  <option key={a.id} value={a.id}>
                    [{a.category}] {a.item_name} ({a.color_name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E0D5] space-y-3">
            <input
              type="text"
              value={outfitTitle}
              onChange={(e) => setOutfitTitle(e.target.value)}
              placeholder="Name this look (e.g., Old Money Friday Capsule)..."
              className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleSaveFavoriteOutfit}
                className="flex-1 py-3 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-widest flex items-center justify-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#A58E79]" />
                <span>Save Favorite Outfit</span>
              </button>
              <button
                type="button"
                onClick={handleSendToPlanner}
                className="py-3 px-4 bg-[#F7F5F0] border border-[#252525] text-[#252525] text-xs uppercase tracking-widest flex items-center justify-center gap-1.5"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Plan Today</span>
              </button>
            </div>

            {saveMessage && (
              <div className="p-3 bg-[#252525] text-[#F7F5F0] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A58E79]" />
                <span>{saveMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Visual Editorial Flat-Lay Board */}
        <div className="lg:col-span-7 bg-white border border-[#252525] p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DED5C8] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
                Live Editorial Lookboard
              </span>
              <h3 className="font-serif text-2xl text-[#252525]">
                {outfitTitle.trim() || `${targetStyle} · ${occasion} Ensemble`}
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              {activeOutfitItems.map((it) => (
                <span
                  key={it.id}
                  title={`${it.item_name} (${it.color_name})`}
                  className="w-5 h-5 border border-[#252525]/30"
                  style={{ backgroundColor: it.hex_code }}
                />
              ))}
            </div>
          </div>

          {activeOutfitItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {activeOutfitItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F7F5F0] border border-[#DED5C8] overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-[#E8E0D5]">
                    <img
                      src={item.image_url}
                      alt={item.item_name}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute top-2 left-2 bg-[#252525]/85 text-[#F7F5F0] text-[9px] uppercase tracking-widest px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-xs font-medium text-[#252525] line-clamp-1">
                      {item.item_name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6E655C]">
                      <span
                        className="w-3 h-3 border border-[#252525]/30"
                        style={{ backgroundColor: item.hex_code }}
                      />
                      <span>{item.color_name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center space-y-3">
              <Shirt className="w-8 h-8 text-[#A58E79] mx-auto" />
              <p className="font-serif text-xl text-[#252525]">
                Select Pieces from Your Wardrobe to Preview
              </p>
            </div>
          )}

          <div className="p-4 bg-[#F7F5F0] border border-[#DED5C8] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#A58E79] shrink-0 mt-0.5" />
            <div className="text-xs text-[#6E655C]">
              <strong className="text-[#252525] uppercase tracking-wider">
                Wardrobe Authenticity Guarantee:{' '}
              </strong>
              All {activeOutfitItems.length} pieces shown above come directly from your Digital
              Wardrobe collection for {activity} ({occasion}).
            </div>
          </div>
        </div>
      </div>

      {/* Saved Favorite Outfits Archive */}
      <div className="space-y-4 pt-6 border-t border-[#DED5C8]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
            Curated Lookbook
          </span>
          <h3 className="font-serif text-2xl text-[#252525]">
            Saved Favorite Outfits ({savedOutfits.length})
          </h3>
        </div>

        {savedOutfits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-white border border-[#DED5C8] p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                        {outfit.target_style} · {outfit.occasion}
                      </span>
                      <h4 className="font-serif text-lg text-[#252525]">{outfit.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteSavedOutfit(outfit.id)}
                      className="p-1.5 text-[#6E655C] hover:text-[#800020]"
                      title="Delete Saved Outfit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {outfit.items_snapshot.slice(0, 4).map((it) => (
                      <div
                        key={it.id}
                        className="h-16 bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden"
                      >
                        <img
                          src={it.image_url}
                          alt={it.item_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-[#6E655C]">{outfit.harmony_note}</p>
                </div>

                <div className="pt-3 border-t border-[#E8E0D5] flex items-center justify-between text-[11px] text-[#6E655C]">
                  <span>Activity: {outfit.activity}</span>
                  <span>{new Date(outfit.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#DED5C8] p-8 text-center text-xs text-[#6E655C]">
            No favorite outfits saved yet. Click <strong>&ldquo;Save Favorite Outfit&rdquo;</strong>{' '}
            above to build your personal lookbook.
          </div>
        )}
      </div>
    </div>
  );
};


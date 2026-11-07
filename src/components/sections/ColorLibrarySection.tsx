'use client';

import React, { useMemo, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { COLOR_GROUPS } from '@/data/colorCatalog';
import { ColorCatalogItem, UndertoneType } from '@/types/fitcheck';
import { findNearestCatalogColor } from '@/lib/fashionEngine';
import {
  Search,
  Heart,
  Plus,
  Pipette,
  Copy,
  Check,
  Sparkles,
  X,
} from 'lucide-react';

export const ColorLibrarySection: React.FC = () => {
  const {
    profile,
    colorCatalog,
    colorProfile,
    toggleFavoriteColor,
    addCustomColor,
  } = useFitCheck();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [undertoneFilter, setUndertoneFilter] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Interactive Color Picker & Matching Studio
  const [pickerHex, setPickerHex] = useState<string>('#A58E79');
  const [copiedHex, setCopiedHex] = useState<string>('');

  // Custom Color Modal
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [customGroup, setCustomGroup] =
    useState<ColorCatalogItem['color_group']>('Custom');
  const [customHex, setCustomHex] = useState<string>('#4A6B5D');
  const [customUndertone, setCustomUndertone] =
    useState<UndertoneType>('Neutral Undertone');
  const [customDesc, setCustomDesc] = useState<string>('');

  const nearestToPicker = useMemo(() => {
    return findNearestCatalogColor(pickerHex, colorCatalog);
  }, [pickerHex, colorCatalog]);

  const filteredColors = useMemo(() => {
    return colorCatalog.filter((col) => {
      const matchesGroup =
        selectedGroup === 'All' || col.color_group === selectedGroup;
      const matchesUndertone =
        undertoneFilter === 'All' ||
        col.undertone_match.includes(undertoneFilter as UndertoneType);
      const matchesFav =
        !onlyFavorites || profile?.favorite_colors.includes(col.name);
      const matchesSearch =
        !searchQuery.trim() ||
        col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.hex_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.color_group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesGroup && matchesUndertone && matchesFav && matchesSearch;
    });
  }, [colorCatalog, selectedGroup, undertoneFilter, onlyFavorites, profile, searchQuery]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(''), 1800);
  };

  const handleCreateCustomColor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    await addCustomColor({
      name: customName.trim(),
      color_group: customGroup,
      hex_code: customHex.toUpperCase(),
      undertone_match: [customUndertone],
      seasonal_match: [colorProfile?.seasonal_palette || 'Soft Autumn'],
      pairing_suggestions: [
        { name: 'Ivory', hex: '#F7F5F0' },
        { name: 'Charcoal', hex: '#252525' },
        { name: 'Taupe', hex: '#A58E79' },
      ],
      description:
        customDesc.trim() ||
        'Custom swatch added by user to the FITCHECK Complete Color Library.',
    });

    await toggleFavoriteColor(customName.trim());
    setCustomName('');
    setCustomDesc('');
    setIsCustomModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 06 — Chromatic Archive
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Complete Color Library ({colorCatalog.length} Swatches)
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Explore all 11 editorial color families—Neutral, Brown, Red, Pink, Orange, Yellow,
            Green, Blue, Purple, Grey, and Monochrome. Open to all genders with live HEX Color
            Picker, Undertone Matching, and Custom Swatch creation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCustomModalOpen(true)}
          className="px-5 py-3 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#A58E79]" />
          <span>Add Custom Color</span>
        </button>
      </div>

      {/* Interactive Color Picker & Color Matching Studio */}
      <div className="bg-white border border-[#DED5C8] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-[#E8E0D5] pb-5 lg:pb-0 lg:pr-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
            <Pipette className="w-3.5 h-3.5" />
            <span>Interactive Color Picker & Matcher</span>
          </div>
          <h3 className="font-serif text-xl text-[#252525]">
            Pick Any HEX Shade to Find Its Nearest Sartorial Match & Pairings
          </h3>
          <div className="flex items-center gap-3 pt-1">
            <input
              type="color"
              value={pickerHex}
              onChange={(e) => setPickerHex(e.target.value.toUpperCase())}
              className="w-14 h-12 border border-[#252525] cursor-pointer bg-white shrink-0"
            />
            <input
              type="text"
              value={pickerHex}
              onChange={(e) => setPickerHex(e.target.value.toUpperCase())}
              className="w-36 bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs font-mono text-[#252525]"
            />
            <button
              type="button"
              onClick={() => {
                setCustomHex(pickerHex);
                setIsCustomModalOpen(true);
              }}
              className="px-3.5 py-2.5 bg-[#252525] text-white text-[11px] uppercase tracking-widest"
            >
              Save Swatch
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">
              Closest FITCHECK Catalog Match:
            </span>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 border border-[#252525]/30 shrink-0"
                style={{ backgroundColor: nearestToPicker.hex_code }}
              />
              <div>
                <p className="font-serif text-xl text-[#252525]">
                  {nearestToPicker.name}{' '}
                  <span className="text-xs font-mono text-[#A58E79]">
                    ({nearestToPicker.hex_code})
                  </span>
                </p>
                <p className="text-xs text-[#6E655C]">{nearestToPicker.description}</p>
              </div>
            </div>
          </div>

          <div className="shrink-0 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#6E655C] block">
              Recommended Color Pairings:
            </span>
            <div className="flex items-center gap-2">
              {nearestToPicker.pairing_suggestions.map((ps) => (
                <div
                  key={ps.name}
                  className="px-2.5 py-1.5 bg-[#F7F5F0] border border-[#DED5C8] flex items-center gap-1.5 text-xs"
                >
                  <span
                    className="w-3.5 h-3.5 border border-[#252525]/30"
                    style={{ backgroundColor: ps.hex }}
                  />
                  <span>{ps.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search, Undertone Match Filter & Favorites Filter */}
      <div className="bg-white border border-[#DED5C8] p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#6E655C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Camel, Burgundy, Sage, #F7F5F0..."
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] pl-10 pr-4 py-2.5 text-xs text-[#252525]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
          <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">
            Undertone Filter:
          </span>
          {(['All', 'Warm Undertone', 'Cool Undertone', 'Neutral Undertone'] as const).map(
            (ut) => (
              <button
                key={ut}
                type="button"
                onClick={() => setUndertoneFilter(ut)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border ${
                  undertoneFilter === ut
                    ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                    : 'bg-[#F7F5F0] text-[#252525] border-[#DED5C8]'
                }`}
              >
                {ut === 'All' ? 'All Undertones' : ut.replace(' Undertone', '')}
              </button>
            )
          )}

          {colorProfile && (
            <button
              type="button"
              onClick={() => setUndertoneFilter(colorProfile.undertone)}
              className="px-3 py-1.5 text-[11px] uppercase tracking-wider bg-[#A58E79] text-white flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Match My Undertone</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setOnlyFavorites((v) => !v)}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-[#800020] text-white border-[#800020]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Favorites ({profile?.favorite_colors.length || 0})</span>
          </button>
        </div>
      </div>

      {/* 11 Color Group Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedGroup('All')}
          className={`px-3.5 py-2 text-xs uppercase tracking-widest border whitespace-nowrap ${
            selectedGroup === 'All'
              ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
              : 'bg-white text-[#252525] border-[#DED5C8]'
          }`}
        >
          All 11 Families ({colorCatalog.length})
        </button>
        {COLOR_GROUPS.map((grp) => (
          <button
            key={grp}
            type="button"
            onClick={() => setSelectedGroup(grp)}
            className={`px-3.5 py-2 text-xs uppercase tracking-widest border whitespace-nowrap ${
              selectedGroup === grp
                ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                : 'bg-white text-[#252525] border-[#DED5C8]'
            }`}
          >
            {grp}
          </button>
        ))}
      </div>

      {/* Color Swatch Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredColors.map((col) => {
          const isFav = profile?.favorite_colors.includes(col.name);
          return (
            <div
              key={col.id}
              className="bg-white border border-[#DED5C8] flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Large Color Swatch Banner */}
                <div
                  className="h-36 w-full border-b border-[#DED5C8] relative flex items-end justify-between p-3"
                  style={{ backgroundColor: col.hex_code }}
                >
                  <span className="bg-[#252525]/85 text-[#F7F5F0] px-2.5 py-1 text-[10px] uppercase tracking-widest">
                    {col.color_group}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFavoriteColor(col.name)}
                    className={`p-2 border transition-colors ${
                      isFav
                        ? 'bg-[#800020] text-white border-[#800020]'
                        : 'bg-white/90 text-[#252525] border-[#DED5C8]'
                    }`}
                    title="Toggle Favorite Color"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-[#252525]">{col.name}</h3>
                    <button
                      type="button"
                      onClick={() => handleCopyHex(col.hex_code)}
                      className="flex items-center gap-1 text-xs font-mono text-[#6E655C] hover:text-[#252525] bg-[#F7F5F0] px-2 py-1 border border-[#DED5C8]"
                      title="Copy HEX Code"
                    >
                      {copiedHex === col.hex_code ? (
                        <Check className="w-3 h-3 text-[#2E8B57]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{col.hex_code}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#6E655C] leading-relaxed">{col.description}</p>

                  {/* Undertone Compatibility */}
                  <div className="flex flex-wrap gap-1">
                    {col.undertone_match.map((ut) => (
                      <span
                        key={ut}
                        className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F7F5F0] border border-[#DED5C8] text-[#252525]"
                      >
                        {ut.replace(' Undertone', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pairing Suggestions Footer */}
              <div className="px-5 py-3 bg-[#F7F5F0] border-t border-[#E8E0D5] flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">
                  Best Pairings:
                </span>
                <div className="flex items-center gap-1.5">
                  {col.pairing_suggestions.map((pair) => (
                    <span
                      key={pair.name}
                      title={`Pairs with ${pair.name} (${pair.hex})`}
                      className="w-4 h-4 border border-[#252525]/35"
                      style={{ backgroundColor: pair.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Color Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-md w-full p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  Custom Swatch
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  Add Custom Color to Catalog
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(false)}
                className="p-2 border border-[#DED5C8] bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomColor} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Color Name *
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., Matcha Green, Oxblood, Midnight Slate..."
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                    Color Group
                  </label>
                  <select
                    value={customGroup}
                    onChange={(e) =>
                      setCustomGroup(e.target.value as ColorCatalogItem['color_group'])
                    }
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                  >
                    <option value="Custom">Custom</option>
                    {COLOR_GROUPS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                    HEX Picker
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value.toUpperCase())}
                      className="w-10 h-10 border border-[#DED5C8] bg-white cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-[#DED5C8] px-2.5 py-2.5 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Primary Undertone Harmony
                </label>
                <select
                  value={customUndertone}
                  onChange={(e) => setCustomUndertone(e.target.value as UndertoneType)}
                  className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                >
                  <option value="Warm Undertone">Warm Undertone</option>
                  <option value="Cool Undertone">Cool Undertone</option>
                  <option value="Neutral Undertone">Neutral Undertone</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Editorial Note
                </label>
                <textarea
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="How you like to style this color..."
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#DED5C8]">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2.5 border border-[#DED5C8] bg-white text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest"
                >
                  Save Swatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


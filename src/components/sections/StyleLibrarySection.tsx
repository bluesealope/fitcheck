'use client';

import React, { useMemo, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { STYLE_GROUPS } from '@/data/styleCatalog';
import { FashionStyleItem } from '@/types/fitcheck';
import { Search, Plus, Check, X, Sparkles } from 'lucide-react';

export const StyleLibrarySection: React.FC = () => {
  const {
    profile,
    styleCatalog,
    toggleStyleInProfile,
    addCustomStyle,
  } = useFitCheck();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [visualMode, setVisualMode] = useState<'Both' | 'Men' | 'Women'>('Both');
  const [inspectStyle, setInspectStyle] = useState<FashionStyleItem | null>(null);

  // Custom Style Modal State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [customGroup, setCustomGroup] =
    useState<FashionStyleItem['category_group']>('Custom');
  const [customDesc, setCustomDesc] = useState<string>('');
  const [customElements, setCustomElements] = useState<string>(
    'Tailored Blazer, Relaxed Denim, Leather Loafers'
  );
  const [customImageMen, setCustomImageMen] = useState<string>(
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
  );
  const [customImageWomen, setCustomImageWomen] = useState<string>(
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80'
  );

  const filteredStyles = useMemo(() => {
    return styleCatalog.filter((st) => {
      const matchesGroup =
        selectedGroup === 'All' || st.category_group === selectedGroup;
      const matchesSearch =
        !searchQuery.trim() ||
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.category_group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.key_elements.some((k) =>
          k.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesGroup && matchesSearch;
    });
  }, [styleCatalog, selectedGroup, searchQuery]);

  const handleAddCustomStyle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const elementsArr = customElements
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await addCustomStyle({
      name: customName.trim(),
      category_group: customGroup,
      description:
        customDesc.trim() ||
        'Custom user-defined aesthetic added to the FITCHECK Fashion Style Library.',
      key_elements: elementsArr.length > 0 ? elementsArr : ['Signature Silhouette'],
      color_palette: [
        { name: 'Ivory', hex: '#F7F5F0' },
        { name: 'Charcoal', hex: '#252525' },
        { name: 'Taupe', hex: '#A58E79' },
      ],
      visual_url_men: customImageMen,
      visual_url_women: customImageWomen,
      signature_pieces_men: elementsArr,
      signature_pieces_women: elementsArr,
    });

    await toggleStyleInProfile(customName.trim());
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
            Issue No. 05 — Complete Encyclopedia
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Complete Fashion Style Library ({styleCatalog.length} Styles)
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Every aesthetic across all 14 groups is open to all genders. Select multiple styles to
            personalize your recommendations, inspect Men & Women editorial references, or create a
            Custom Style.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCustomModalOpen(true)}
          className="px-5 py-3 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#A58E79]" />
          <span>Create Custom Style</span>
        </button>
      </div>

      {/* Search & Visual Reference Toggle */}
      <div className="bg-white border border-[#DED5C8] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#6E655C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Old Money, Quiet Luxury, Coquette, Techwear, Hijab..."
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] pl-10 pr-4 py-2.5 text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">
            Editorial Visuals:
          </span>
          {(['Both', 'Men', 'Women'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setVisualMode(mode)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest border ${
                visualMode === mode
                  ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                  : 'bg-[#F7F5F0] text-[#252525] border-[#DED5C8]'
              }`}
            >
              {mode === 'Both' ? 'Men & Women Split' : mode}
            </button>
          ))}
        </div>
      </div>

      {/* 14 Group Filter Pills */}
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
          All 14 Groups ({styleCatalog.length})
        </button>
        {STYLE_GROUPS.map((grp) => (
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

      {/* Style Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStyles.map((style) => {
          const isSelected = profile?.selected_styles.includes(style.name);
          return (
            <div
              key={style.id}
              className={`bg-white border flex flex-col justify-between overflow-hidden transition-all ${
                isSelected ? 'border-[#252525] ring-1 ring-[#252525]' : 'border-[#DED5C8]'
              }`}
            >
              <div>
                {/* Balanced Men & Women Visual Reference */}
                {visualMode === 'Both' ? (
                  <div className="grid grid-cols-2 h-52 bg-[#E8E0D5] border-b border-[#DED5C8] relative">
                    <div className="relative overflow-hidden border-r border-[#DED5C8]">
                      <img
                        src={style.visual_url_men}
                        alt={`${style.name} Men`}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#252525]/80 text-white text-[9px] uppercase tracking-widest px-1.5 py-0.5">
                        Men
                      </span>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={style.visual_url_women}
                        alt={`${style.name} Women`}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#252525]/80 text-white text-[9px] uppercase tracking-widest px-1.5 py-0.5">
                        Women
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 bg-[#252525] text-[#F7F5F0] px-2.5 py-1 text-[10px] uppercase tracking-widest">
                      {style.category_group}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-52 bg-[#E8E0D5] border-b border-[#DED5C8] overflow-hidden">
                    <img
                      src={
                        visualMode === 'Men'
                          ? style.visual_url_men
                          : style.visual_url_women
                      }
                      alt={style.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 left-3 bg-[#252525] text-[#F7F5F0] px-2.5 py-1 text-[10px] uppercase tracking-widest">
                      {style.category_group}
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-[#252525]">{style.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#A58E79] text-white">
                        In My Profile
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6E655C] leading-relaxed">
                    {style.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {style.key_elements.map((el) => (
                      <span
                        key={el}
                        className="px-2 py-0.5 bg-[#F7F5F0] border border-[#DED5C8] text-[10px] text-[#252525]"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[#E8E0D5] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setInspectStyle(style)}
                  className="px-3 py-2 border border-[#DED5C8] text-[11px] uppercase tracking-widest text-[#252525] hover:border-[#252525]"
                >
                  Inspect Dossier
                </button>
                <button
                  type="button"
                  onClick={() => toggleStyleInProfile(style.name)}
                  className={`flex-1 py-2 px-3 text-[11px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors ${
                    isSelected
                      ? 'bg-[#252525] text-[#F7F5F0]'
                      : 'bg-[#F7F5F0] border border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{isSelected ? 'Selected in Profile' : 'Select Style'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Style Detail Modal */}
      {inspectStyle && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-2xl w-full p-7 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#A58E79]">
                  {inspectStyle.category_group}
                </span>
                <h3 className="font-serif text-3xl text-[#252525]">{inspectStyle.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectStyle(null)}
                className="p-2 border border-[#DED5C8] bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 h-56">
              <div className="relative bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden">
                <img
                  src={inspectStyle.visual_url_men}
                  alt="Men Reference"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-2 left-2 bg-[#252525]/85 text-white text-[10px] uppercase tracking-widest px-2 py-0.5">
                  Men Reference
                </span>
              </div>
              <div className="relative bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden">
                <img
                  src={inspectStyle.visual_url_women}
                  alt="Women Reference"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-2 left-2 bg-[#252525]/85 text-white text-[10px] uppercase tracking-widest px-2 py-0.5">
                  Women Reference
                </span>
              </div>
            </div>

            <p className="text-xs text-[#252525] leading-relaxed">
              {inspectStyle.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#DED5C8] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79] block">
                  Signature Menswear Pieces
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[#6E655C]">
                  {inspectStyle.signature_pieces_men.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-white border border-[#DED5C8] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79] block">
                  Signature Womenswear Pieces
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[#6E655C]">
                  {inspectStyle.signature_pieces_women.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#DED5C8]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#6E655C]">
                  Core Palette:
                </span>
                {inspectStyle.color_palette.map((cp) => (
                  <div key={cp.name} className="flex items-center gap-1 text-xs">
                    <span
                      className="w-4 h-4 border border-[#252525]/30"
                      style={{ backgroundColor: cp.hex }}
                    />
                    <span>{cp.name}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleStyleInProfile(inspectStyle.name);
                  setInspectStyle(null);
                }}
                className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest"
              >
                {profile?.selected_styles.includes(inspectStyle.name)
                  ? 'Remove from My Styles'
                  : 'Add to My Styles'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Custom Style Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-lg w-full p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  Expand Catalog
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  Add Custom Fashion Style
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

            <form onSubmit={handleAddCustomStyle} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Style Name *
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., Dark Academia, Coastal Grandmother, Gorpcore..."
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Category Group
                </label>
                <select
                  value={customGroup}
                  onChange={(e) =>
                    setCustomGroup(e.target.value as FashionStyleItem['category_group'])
                  }
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs"
                >
                  <option value="Custom">Custom</option>
                  {STYLE_GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="Describe the silhouette, mood, and fabric characteristics..."
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  Key Garment Elements (Comma-Separated)
                </label>
                <input
                  type="text"
                  value={customElements}
                  onChange={(e) => setCustomElements(e.target.value)}
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                    Men Reference Photo URL
                  </label>
                  <input
                    type="text"
                    value={customImageMen}
                    onChange={(e) => setCustomImageMen(e.target.value)}
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#6E655C] mb-1">
                    Women Reference Photo URL
                  </label>
                  <input
                    type="text"
                    value={customImageWomen}
                    onChange={(e) => setCustomImageWomen(e.target.value)}
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2 text-xs"
                  />
                </div>
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
                  className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A58E79]" />
                  <span>Save Custom Style</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { WardrobeCategory, WardrobeItem } from '@/types/fitcheck';
import { extractColorsFromImage, findNearestCatalogColor } from '@/lib/fashionEngine';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Upload,
  X,
  Check,
  Filter,
} from 'lucide-react';

const WARDROBE_CATEGORIES: WardrobeCategory[] = [
  'Tops',
  'Bottoms',
  'Outerwear',
  'Dresses',
  'Shoes',
  'Bags',
  'Accessories',
  'Hijab',
];

export const DigitalWardrobeSection: React.FC = () => {
  const {
    wardrobe,
    addWardrobeItem,
    updateWardrobeItem,
    deleteWardrobeItem,
    colorCatalog,
    styleCatalog,
  } = useFitCheck();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterColor, setFilterColor] = useState<string>('All');
  const [filterStyle, setFilterStyle] = useState<string>('All');

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);

  const [itemName, setItemName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
  );
  const [category, setCategory] = useState<WardrobeCategory>('Tops');
  const [colorName, setColorName] = useState<string>('Ivory');
  const [hexCode, setHexCode] = useState<string>('#F7F5F0');
  const [brand, setBrand] = useState<string>('');
  const [styleTags, setStyleTags] = useState<string[]>(['Minimalist', 'Old Money']);
  const [description, setDescription] = useState<string>('');

  const availableColorsInWardrobe = useMemo(() => {
    const set = new Set(wardrobe.map((w) => w.color_name));
    return Array.from(set);
  }, [wardrobe]);

  const availableStylesInWardrobe = useMemo(() => {
    const set = new Set<string>();
    wardrobe.forEach((w) => w.style_tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [wardrobe]);

  const filteredWardrobe = useMemo(() => {
    return wardrobe.filter((item) => {
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      const matchesColor = filterColor === 'All' || item.color_name === filterColor;
      const matchesStyle =
        filterStyle === 'All' || item.style_tags.includes(filterStyle);
      const matchesSearch =
        !searchQuery.trim() ||
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color_name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesColor && matchesStyle && matchesSearch;
    });
  }, [wardrobe, filterCategory, filterColor, filterStyle, searchQuery]);

  const openAddModal = () => {
    setEditingItem(null);
    setItemName('');
    setImageUrl(
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    );
    setCategory('Tops');
    setColorName('Ivory');
    setHexCode('#F7F5F0');
    setBrand('Atelier Essential');
    setStyleTags(['Minimalist', 'Smart Casual']);
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: WardrobeItem) => {
    setEditingItem(item);
    setItemName(item.item_name);
    setImageUrl(item.image_url);
    setCategory(item.category);
    setColorName(item.color_name);
    setHexCode(item.hex_code);
    setBrand(item.brand);
    setStyleTags(item.style_tags);
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImageUrl(dataUrl);
      const extracted = await extractColorsFromImage(dataUrl);
      if (extracted.dominantColors[0]) {
        setColorName(extracted.dominantColors[0].name);
        setHexCode(extracted.dominantColors[0].hex);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    if (editingItem) {
      await updateWardrobeItem({
        ...editingItem,
        item_name: itemName.trim(),
        image_url: imageUrl,
        category,
        color_name: colorName,
        hex_code: hexCode,
        brand: brand.trim() || 'Unbranded',
        style_tags: styleTags.length > 0 ? styleTags : ['Casual'],
        description: description.trim(),
      });
    } else {
      await addWardrobeItem({
        item_name: itemName.trim(),
        image_url: imageUrl,
        category,
        color_name: colorName,
        hex_code: hexCode,
        brand: brand.trim() || 'Unbranded',
        style_tags: styleTags.length > 0 ? styleTags : ['Casual'],
        description: description.trim(),
      });
    }

    setIsModalOpen(false);
  };

  const toggleStyleTag = (tag: string) => {
    setStyleTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 03 — Personal Archive
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Digital Wardrobe ({wardrobe.length} Pieces)
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Manage your real clothing collection across Tops, Bottoms, Outerwear, Dresses, Shoes,
            Bags, Accessories, and Hijab. Every item fuels the Outfit Generator and Recommendation
            Engine.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-6 py-3.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#A58E79]" />
          <span>Add Wardrobe Piece</span>
        </button>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setFilterCategory('All')}
          className={`px-4 py-2 text-xs uppercase tracking-widest border whitespace-nowrap ${
            filterCategory === 'All'
              ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
              : 'bg-white text-[#252525] border-[#DED5C8] hover:border-[#252525]'
          }`}
        >
          All Categories ({wardrobe.length})
        </button>
        {WARDROBE_CATEGORIES.map((cat) => {
          const count = wardrobe.filter((w) => w.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                  : 'bg-white text-[#252525] border-[#DED5C8] hover:border-[#252525]'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Search, Color Filter, and Style Filter */}
      <div className="bg-white border border-[#DED5C8] p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6E655C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by item name, brand, description..."
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] pl-10 pr-4 py-2.5 text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#A58E79] shrink-0" />
          <span className="text-[11px] uppercase tracking-widest text-[#6E655C] shrink-0">
            Color:
          </span>
          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs text-[#252525]"
          >
            <option value="All">All Colors</option>
            {availableColorsInWardrobe.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-widest text-[#6E655C] shrink-0">
            Style Tag:
          </span>
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#DED5C8] px-3 py-2.5 text-xs text-[#252525]"
          >
            <option value="All">All Style Tags</option>
            {availableStylesInWardrobe.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      {filteredWardrobe.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWardrobe.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DED5C8] flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative h-64 w-full bg-[#E8E0D5] overflow-hidden border-b border-[#DED5C8]">
                  <img
                    src={item.image_url}
                    alt={item.item_name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#252525]/90 text-[#F7F5F0] px-2.5 py-1 text-[10px] uppercase tracking-widest">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-2 bg-white/90 border border-[#DED5C8] text-[#252525] hover:bg-[#252525] hover:text-white transition-colors"
                      title="Edit Garment"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteWardrobeItem(item.id)}
                      className="p-2 bg-white/90 border border-[#DED5C8] text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
                      title="Delete Garment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A58E79]">
                    <span>{item.brand}</span>
                    <span>{new Date(item.date_added).toLocaleDateString()}</span>
                  </div>

                  <h3 className="font-serif text-lg text-[#252525] leading-snug">
                    {item.item_name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#6E655C]">
                    <span
                      className="w-4 h-4 border border-[#252525]/30 shrink-0"
                      style={{ backgroundColor: item.hex_code }}
                    />
                    <span>{item.color_name}</span>
                    <span className="font-mono text-[10px] text-[#A58E79]">{item.hex_code}</span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-[#6E655C] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-5 pb-4 pt-2 border-t border-[#E8E0D5] flex flex-wrap gap-1">
                {item.style_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#F7F5F0] border border-[#DED5C8] text-[10px] uppercase tracking-wider text-[#252525]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#DED5C8] p-12 text-center space-y-4">
          <p className="font-serif text-2xl text-[#252525]">No Matching Garments Found</p>
          <p className="text-xs text-[#6E655C]">
            Try clearing your search or category filter, or add a new clothing piece to your
            Digital Wardrobe.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('All');
              setFilterColor('All');
              setFilterStyle('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 border border-[#252525] text-xs uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Add / Edit Wardrobe Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-2xl w-full p-7 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A58E79]">
                  Digital Wardrobe Entry
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  {editingItem ? 'Edit Wardrobe Garment' : 'Add New Wardrobe Garment'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 border border-[#DED5C8] bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1.5">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g., Cream Linen Shirt / Silk Pashmina"
                    className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WardrobeCategory)}
                    className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
                  >
                    {WARDROBE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Upload or URL */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C]">
                  Garment Photo (Upload File or Paste Image URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-widest flex items-center justify-center gap-2 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
                  />
                </div>
              </div>

              {/* Color & HEX Picker + Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1.5">
                    Catalog Color
                  </label>
                  <select
                    value={colorName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setColorName(val);
                      const found = colorCatalog.find((c) => c.name === val);
                      if (found) setHexCode(found.hex_code);
                    }}
                    className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
                  >
                    {colorCatalog.map((col) => (
                      <option key={col.id} value={col.name}>
                        {col.name} ({col.color_group})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1.5">
                    HEX Code & Swatch
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hexCode}
                      onChange={(e) => {
                        const hex = e.target.value.toUpperCase();
                        setHexCode(hex);
                        const nearest = findNearestCatalogColor(hex, colorCatalog);
                        setColorName(nearest.name);
                      }}
                      className="w-10 h-10 border border-[#DED5C8] bg-white cursor-pointer"
                    />
                    <input
                      type="text"
                      value={hexCode}
                      onChange={(e) => setHexCode(e.target.value)}
                      className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs font-mono text-[#252525]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1.5">
                    Brand / Label
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g., Uniqlo, Zara, Bespoke..."
                    className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
                  />
                </div>
              </div>

              {/* Style Tags Multi-Select */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-2">
                  Style Tags ({styleTags.length} selected)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-3 bg-white border border-[#DED5C8]">
                  {styleCatalog.map((st) => {
                    const active = styleTags.includes(st.name);
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => toggleStyleTag(st.name)}
                        className={`px-2.5 py-1 text-[11px] border flex items-center gap-1 ${
                          active
                            ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                            : 'bg-[#F7F5F0] text-[#6E655C] border-[#DED5C8]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                        <span>{st.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1.5">
                  Garment Notes & Fabric Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Material, fit notes, care instructions..."
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs text-[#252525]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DED5C8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-[#DED5C8] bg-white text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-widest"
                >
                  {editingItem ? 'Save Changes' : 'Add to Wardrobe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


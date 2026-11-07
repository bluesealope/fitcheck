'use client';

import React, { useMemo, useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { OutfitPlanItem } from '@/types/fitcheck';
import {
  Calendar,
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const OutfitPlannerSection: React.FC = () => {
  const {
    wardrobe,
    savedOutfits,
    outfitPlans,
    addOutfitPlan,
    updateOutfitPlan,
    deleteOutfitPlan,
  } = useFitCheck();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState<string>(
    today.toISOString().split('T')[0]
  );

  // Add / Edit Plan Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<OutfitPlanItem | null>(null);

  const [planDate, setPlanDate] = useState<string>(selectedDate);
  const [eventName, setEventName] = useState<string>('');
  const [occasionType, setOccasionType] = useState<string>('Smart Casual');
  const [outfitTitle, setOutfitTitle] = useState<string>('');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString('en-US', {
    month: 'long',
  });

  // Build calendar days for current month
  const calendarDays = useMemo(() => {
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const cells: { dateStr: string; dayNum: number }[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ dateStr: '', dayNum: 0 });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = String(currentMonth + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      cells.push({
        dateStr: `${currentYear}-${mStr}-${dStr}`,
        dayNum: d,
      });
    }
    return cells;
  }, [currentYear, currentMonth]);

  const plansByDate = useMemo(() => {
    const map = new Map<string, OutfitPlanItem[]>();
    outfitPlans.forEach((p) => {
      const list = map.get(p.plan_date) || [];
      list.push(p);
      map.set(p.plan_date, list);
    });
    return map;
  }, [outfitPlans]);

  const openNewPlanModal = (dateOverride?: string) => {
    const target = dateOverride || selectedDate;
    setEditingPlan(null);
    setPlanDate(target);
    setEventName('');
    setOccasionType('Smart Casual');
    setOutfitTitle('');
    setSelectedItemIds(wardrobe.slice(0, 3).map((w) => w.id));
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditPlanModal = (plan: OutfitPlanItem) => {
    setEditingPlan(plan);
    setPlanDate(plan.plan_date);
    setEventName(plan.event_name);
    setOccasionType(plan.occasion_type);
    setOutfitTitle(plan.outfit_title);
    setSelectedItemIds(plan.item_ids);
    setNotes(plan.notes);
    setIsModalOpen(true);
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleLoadFromSavedOutfit = (savedOutfitId: string) => {
    const found = savedOutfits.find((s) => s.id === savedOutfitId);
    if (!found) return;
    setOutfitTitle(found.title);
    setOccasionType(found.occasion);
    setSelectedItemIds(found.item_ids);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !planDate) return;

    const snapshot = wardrobe.filter((w) => selectedItemIds.includes(w.id));

    if (editingPlan) {
      await updateOutfitPlan({
        ...editingPlan,
        plan_date: planDate,
        event_name: eventName.trim(),
        occasion_type: occasionType,
        outfit_title: outfitTitle.trim() || `${occasionType} Ensemble`,
        item_ids: selectedItemIds,
        items_snapshot: snapshot,
        notes: notes.trim(),
      });
    } else {
      await addOutfitPlan({
        plan_date: planDate,
        event_name: eventName.trim(),
        occasion_type: occasionType,
        outfit_title: outfitTitle.trim() || `${occasionType} Ensemble`,
        item_ids: selectedItemIds,
        items_snapshot: snapshot,
        notes: notes.trim(),
      });
    }

    setSelectedDate(planDate);
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 08 — Sartorial Calendar
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Outfit Planner ({outfitPlans.length} Scheduled)
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Schedule your outfits by date and event, select garments from your Digital Wardrobe or
            Saved Outfits, and add styling notes. Edit or delete plans anytime.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openNewPlanModal(selectedDate)}
          className="px-6 py-3.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#A58E79]" />
          <span>Schedule New Outfit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Monthly Editorial Calendar Grid */}
        <div className="lg:col-span-7 bg-white border border-[#DED5C8] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#A58E79]" />
              <h3 className="font-serif text-2xl text-[#252525]">
                {monthName} {currentYear}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 border border-[#DED5C8] hover:border-[#252525]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 border border-[#DED5C8] hover:border-[#252525]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-widest text-[#6E655C]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-1.5">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((cell, idx) => {
              if (!cell.dateStr) {
                return <div key={`empty-${idx}`} className="h-20 bg-[#F7F5F0]/40" />;
              }
              const dayPlans = plansByDate.get(cell.dateStr) || [];
              const isSelected = selectedDate === cell.dateStr;
              return (
                <button
                  key={cell.dateStr}
                  type="button"
                  onClick={() => setSelectedDate(cell.dateStr)}
                  onDoubleClick={() => openNewPlanModal(cell.dateStr)}
                  className={`h-20 p-2 border text-left flex flex-col justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                      : dayPlans.length > 0
                      ? 'bg-[#F7F5F0] border-[#A58E79] text-[#252525]'
                      : 'bg-white border-[#E8E0D5] text-[#252525] hover:border-[#A58E79]'
                  }`}
                >
                  <span className="text-xs font-mono">{cell.dayNum}</span>
                  {dayPlans.length > 0 && (
                    <div className="space-y-0.5">
                      <span
                        className={`block text-[9px] uppercase tracking-wider truncate px-1 py-0.5 ${
                          isSelected
                            ? 'bg-[#A58E79] text-white'
                            : 'bg-[#252525] text-[#F7F5F0]'
                        }`}
                      >
                        {dayPlans[0].event_name}
                      </span>
                      {dayPlans.length > 1 && (
                        <span className="block text-[9px] opacity-75">
                          +{dayPlans.length - 1} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Date & Upcoming Plans List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#252525] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  Selected Date
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">{selectedDate}</h3>
              </div>
              <button
                type="button"
                onClick={() => openNewPlanModal(selectedDate)}
                className="px-3.5 py-2 bg-[#252525] text-[#F7F5F0] text-[10px] uppercase tracking-widest"
              >
                + Plan This Date
              </button>
            </div>

            {(plansByDate.get(selectedDate) || []).length > 0 ? (
              <div className="space-y-4">
                {(plansByDate.get(selectedDate) || []).map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 bg-[#F7F5F0] border border-[#DED5C8] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                          {plan.occasion_type}
                        </span>
                        <h4 className="font-serif text-lg text-[#252525]">{plan.event_name}</h4>
                        <p className="text-xs font-medium text-[#6E655C]">{plan.outfit_title}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditPlanModal(plan)}
                          className="p-1.5 bg-white border border-[#DED5C8] text-[#252525]"
                          title="Edit Plan"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteOutfitPlan(plan.id)}
                          className="p-1.5 bg-white border border-[#DED5C8] text-[#800020]"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {plan.items_snapshot.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {plan.items_snapshot.map((it) => (
                          <div
                            key={it.id}
                            className="h-14 bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden"
                            title={it.item_name}
                          >
                            <img
                              src={it.image_url}
                              alt={it.item_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {plan.notes && (
                      <p className="text-xs text-[#6E655C] italic">&ldquo;{plan.notes}&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#6E655C] py-6 text-center">
                No outfit scheduled for {selectedDate} yet. Click{' '}
                <strong>&ldquo;+ Plan This Date&rdquo;</strong> to assign an outfit.
              </p>
            )}
          </div>

          {/* All Scheduled Outfit Plans */}
          <div className="bg-white border border-[#DED5C8] p-6 space-y-4">
            <h4 className="font-serif text-xl text-[#252525] border-b border-[#E8E0D5] pb-2">
              All Scheduled Outfit Plans ({outfitPlans.length})
            </h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {outfitPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-3.5 bg-[#F7F5F0] border border-[#DED5C8] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#A58E79] block">
                      {plan.plan_date} · {plan.occasion_type}
                    </span>
                    <p className="text-xs font-medium text-[#252525] truncate">
                      {plan.event_name} — {plan.outfit_title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditPlanModal(plan)}
                      className="p-1.5 bg-white border border-[#DED5C8] text-[#252525]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteOutfitPlan(plan.id)}
                      className="p-1.5 bg-white border border-[#DED5C8] text-[#800020]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Outfit Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-2xl w-full p-7 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  Outfit Calendar Entry
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  {editingPlan ? 'Edit Outfit Plan' : 'Schedule New Outfit Plan'}
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

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                    1. Select Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={planDate}
                    onChange={(e) => setPlanDate(e.target.value)}
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                    2. Event Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g., Final Project Presentation"
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                    3. Occasion Type
                  </label>
                  <select
                    value={occasionType}
                    onChange={(e) => setOccasionType(e.target.value)}
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                  >
                    <option value="Smart Casual">Smart Casual</option>
                    <option value="Formal / Academic">Formal / Academic</option>
                    <option value="Executive Business">Executive Business</option>
                    <option value="Casual Hangout">Casual Hangout</option>
                    <option value="Evening Dinner">Evening Dinner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                    4. Outfit Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={outfitTitle}
                    onChange={(e) => setOutfitTitle(e.target.value)}
                    placeholder="e.g., Old Money Cream & Mocha Tailoring"
                    className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                  />
                </div>

                {savedOutfits.length > 0 && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                      Or Load From Saved Favorite Outfits
                    </label>
                    <select
                      onChange={(e) => handleLoadFromSavedOutfit(e.target.value)}
                      defaultValue=""
                      className="w-full bg-white border border-[#DED5C8] px-3 py-2.5 text-xs"
                    >
                      <option value="" disabled>
                        — Choose Saved Outfit —
                      </option>
                      {savedOutfits.map((so) => (
                        <option key={so.id} value={so.id}>
                          {so.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Select Garments from Wardrobe */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-2">
                  Select Wardrobe Pieces for This Plan ({selectedItemIds.length} selected)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-3 bg-white border border-[#DED5C8]">
                  {wardrobe.map((item) => {
                    const active = selectedItemIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItemSelection(item.id)}
                        className={`p-2 border text-left flex items-center gap-2 text-xs ${
                          active
                            ? 'bg-[#252525] text-[#F7F5F0] border-[#252525]'
                            : 'bg-[#F7F5F0] text-[#252525] border-[#DED5C8]'
                        }`}
                      >
                        <img
                          src={item.image_url}
                          alt={item.item_name}
                          className="w-8 h-8 object-cover shrink-0"
                        />
                        <span className="truncate flex-1">{item.item_name}</span>
                        {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#6E655C] mb-1">
                  5. Styling Notes & Reminders
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Steam linen shirt the night before, bring umbrella, wear leather watch..."
                  className="w-full bg-white border border-[#DED5C8] px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#DED5C8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-[#DED5C8] bg-white text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest"
                >
                  {editingPlan ? 'Update Plan' : 'Save Outfit Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


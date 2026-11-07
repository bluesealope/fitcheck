'use client';

import React, { useState } from 'react';
import { useFitCheck } from '@/context/FitCheckContext';
import { OutfitAnalysisResult } from '@/types/fitcheck';
import {
  History,
  Trash2,
  Eye,
  ScanEye,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const FashionHistorySection: React.FC = () => {
  const { analyses, deleteOutfitAnalysis, setActiveNav } = useFitCheck();
  const [selectedAnalysis, setSelectedAnalysis] = useState<OutfitAnalysisResult | null>(
    null
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#DED5C8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#A58E79]">
            Issue No. 09 — Sartorial Evaluation Log
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#252525] mt-1">
            Fashion History ({analyses.length} Analyses)
          </h2>
          <p className="text-xs text-[#6E655C] mt-1 max-w-2xl">
            Review your past outfit evaluations, inspect 0–100 weighted score breakdowns, revisit
            tailored improvement recommendations, or delete archived entries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveNav('analyzer')}
          className="px-6 py-3.5 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] hover:bg-[#3A3530] transition-colors flex items-center gap-2 shrink-0"
        >
          <ScanEye className="w-4 h-4 text-[#A58E79]" />
          <span>New Outfit Analysis</span>
        </button>
      </div>

      {analyses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DED5C8] flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="relative h-72 w-full bg-[#E8E0D5] border-b border-[#DED5C8] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt="Analyzed Outfit"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 bg-[#252525] text-[#F7F5F0] px-3 py-1.5 text-xs font-serif">
                    Score: {item.outfit_score}/100
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedAnalysis(item)}
                      className="p-2 bg-white/90 border border-[#DED5C8] text-[#252525] hover:bg-[#252525] hover:text-white transition-colors"
                      title="Open Full Report"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteOutfitAnalysis(item.id)}
                      className="p-2 bg-white/90 border border-[#DED5C8] text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
                      title="Delete History Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A58E79]">
                    <span>{item.gender_context} Context</span>
                    <span>{new Date(item.created_at).toLocaleString()}</span>
                  </div>

                  <h3 className="font-serif text-lg text-[#252525]">
                    {item.color_harmony}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    {item.detected_styles.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 bg-[#252525] text-[#F7F5F0] text-[10px] uppercase tracking-wider"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {item.detected_colors.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs text-[#6E655C]">
                        <span
                          className="w-3.5 h-3.5 border border-[#252525]/30"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-[#6E655C] line-clamp-2">
                    {item.improvement_tips[0]}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[#E8E0D5] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedAnalysis(item)}
                  className="flex-1 py-2.5 bg-[#F7F5F0] border border-[#252525] text-xs uppercase tracking-widest text-[#252525] hover:bg-[#252525] hover:text-white transition-colors"
                >
                  Open Complete Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#DED5C8] p-12 text-center space-y-4">
          <History className="w-10 h-10 text-[#A58E79] mx-auto" />
          <h3 className="font-serif text-2xl text-[#252525]">
            Your Fashion Evaluation Archive Is Empty
          </h3>
          <p className="text-xs text-[#6E655C] max-w-md mx-auto">
            Analyze an outfit in the Fashion Analyzer to permanently store your score breakdown,
            detected garments, and styling recommendations here.
          </p>
          <button
            type="button"
            onClick={() => setActiveNav('analyzer')}
            className="px-6 py-3 bg-[#252525] text-[#F7F5F0] text-xs uppercase tracking-widest"
          >
            Go to Fashion Analyzer
          </button>
        </div>
      )}

      {/* Detailed Analysis Modal */}
      {selectedAnalysis && (
        <div className="fixed inset-0 z-50 bg-[#252525]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F7F5F0] border border-[#252525] max-w-3xl w-full p-7 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#DED5C8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A58E79]">
                  Archived Analysis · {new Date(selectedAnalysis.created_at).toLocaleString()}
                </span>
                <h3 className="font-serif text-2xl text-[#252525]">
                  {selectedAnalysis.color_harmony} — Score: {selectedAnalysis.outfit_score}/100
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnalysis(null)}
                className="p-2 border border-[#DED5C8] bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 space-y-3">
                <div className="h-72 bg-[#E8E0D5] border border-[#DED5C8] overflow-hidden">
                  <img
                    src={selectedAnalysis.image_url}
                    alt="Analyzed Outfit"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3 bg-white border border-[#DED5C8] text-xs space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#A58E79] block">
                    Detected Garments
                  </span>
                  {selectedAnalysis.detected_items.map((g, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-medium text-[#252525]">{g.item_type}</span>
                      <span className="text-[#6E655C]">
                        {g.color_name} ({g.category})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-xs">
                <div className="p-4 bg-white border border-[#DED5C8] space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#A58E79] block">
                    Weighted Score Breakdown
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      Color Harmony (30%):{' '}
                      <strong>{selectedAnalysis.score_breakdown.color_harmony}/100</strong>
                    </div>
                    <div>
                      Outfit Combination (30%):{' '}
                      <strong>{selectedAnalysis.score_breakdown.outfit_combination}/100</strong>
                    </div>
                    <div>
                      Style Consistency (25%):{' '}
                      <strong>{selectedAnalysis.score_breakdown.style_consistency}/100</strong>
                    </div>
                    <div>
                      Accessories Match (15%):{' '}
                      <strong>{selectedAnalysis.score_breakdown.accessories_match}/100</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#DED5C8] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-[#252525] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    <span>Strengths</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[#6E655C]">
                    {selectedAnalysis.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white border border-[#DED5C8] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-[#252525] uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-[#A58E79]" />
                    <span>Improvement Suggestions & Alternatives</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[#6E655C]">
                    {selectedAnalysis.improvement_tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                    {selectedAnalysis.alternative_combinations.map((alt, i) => (
                      <li key={`alt-${i}`}>{alt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#DED5C8]">
              <button
                type="button"
                onClick={() => {
                  deleteOutfitAnalysis(selectedAnalysis.id);
                  setSelectedAnalysis(null);
                }}
                className="px-4 py-2.5 border border-[#800020] text-[#800020] text-xs uppercase tracking-widest"
              >
                Delete Record
              </button>
              <button
                type="button"
                onClick={() => setSelectedAnalysis(null)}
                className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


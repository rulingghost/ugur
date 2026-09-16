"use client";

import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { COMPARISON_DATA } from "@/data/comparison";

export const Comparison: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Mimari Karşılaştırma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Akıllı Cam ve Geleneksel Sistemler
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Neden modern mimarlık ofisleri ve seçkin yaşam alanları klasik perde ve mekanik storlar yerine MARBAR Switchable Glass tercih ediyor?
          </p>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          
          {/* Header row */}
          <div className="grid grid-cols-12 bg-slate-50/80 border-b border-slate-200 text-xs sm:text-sm font-bold text-slate-900 py-4 px-4 sm:px-8">
            <div className="col-span-4 sm:col-span-4 text-slate-500 uppercase tracking-wider text-[11px]">
              Özellik & Kriter
            </div>
            <div className="col-span-4 sm:col-span-4 text-[#0B132B] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
              <span>MARBAR Switchable Glass</span>
            </div>
            <div className="col-span-4 sm:col-span-4 text-slate-500">
              Geleneksel Perde / Stor
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_DATA.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 py-5 px-4 sm:px-8 items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Feature Column */}
                <div className="col-span-12 sm:col-span-4 pb-2 sm:pb-0">
                  <span className="text-sm font-bold text-slate-900">
                    {item.feature}
                  </span>
                </div>

                {/* MARBAR (Premium Column) */}
                <div className="col-span-6 sm:col-span-4 pr-2 sm:pr-4">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 rounded-full bg-sky-100 text-[#0284c7] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0B132B]">
                        {item.marbar.title}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed pt-0.5">
                        {item.marbar.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Traditional Blinds Column */}
                <div className="col-span-6 sm:col-span-4 pl-2 sm:pl-4 border-l border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 rounded-full bg-slate-100 text-slate-400 shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700">
                        {item.traditional.title}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed pt-0.5">
                        {item.traditional.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

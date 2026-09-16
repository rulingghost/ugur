"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Info, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PRODUCT_DETAILS, ContentTab, SpecsTab } from "@/data/specs";

export const ProductDetails: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("genel-bakis");

  const currentTab =
    PRODUCT_DETAILS.tabs.find((t) => t.id === activeTabId) ||
    PRODUCT_DETAILS.tabs[0];

  const isContentTab = (tab: unknown): tab is ContentTab => {
    return Boolean(tab && typeof tab === "object" && "content" in tab);
  };

  const isSpecsTab = (tab: unknown): tab is SpecsTab => {
    return Boolean(tab && typeof tab === "object" && "specs" in tab);
  };

  return (
    <section
      id="teknik-ozellikler"
      className="py-24 bg-white relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Mühendislik & Standartlar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            {PRODUCT_DETAILS.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {PRODUCT_DETAILS.description}
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-200/80 scrollbar-none">
          {PRODUCT_DETAILS.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTabId === tab.id
                  ? "bg-[#0B132B] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left / Active Tab Data */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* 1. Genel Bakış */}
                {activeTabId === "genel-bakis" && isContentTab(currentTab) && (
                  <div className="space-y-6">
                    <p className="text-base text-slate-700 leading-relaxed">
                      {currentTab.content.summary}
                    </p>
                    <div className="space-y-4">
                      {currentTab.content.highlights?.map((hl, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-bold text-[#0B132B] mb-1">
                              {hl.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {hl.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Teknik Özellikler (Strictly Placeholders, No Fake Claims) */}
                {activeTabId === "teknik-ozellikler" && isSpecsTab(currentTab) && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-sky-50/80 border border-sky-200/80 rounded-xl flex items-center gap-2.5 text-xs text-sky-800">
                      <Info className="w-4 h-4 shrink-0 text-[#0284c7]" />
                      <span>
                        Teknik parametreler lamine cam, ısıcam ve proje konfigürasyonuna göre düzenlenmektedir.
                      </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200 bg-white">
                      {currentTab.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              {spec.label}
                            </span>
                            {spec.description && (
                              <p className="text-[11px] text-slate-500">
                                {spec.description}
                              </p>
                            )}
                          </div>
                          <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium self-start sm:self-center">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Uygulama */}
                {activeTabId === "uygulama" && isContentTab(currentTab) && (
                  <div className="space-y-6">
                    <p className="text-base text-slate-700 leading-relaxed">
                      {currentTab.content.summary}
                    </p>
                    <div className="space-y-4">
                      {currentTab.content.methods?.map((m, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80"
                        >
                          <h4 className="text-sm font-bold text-[#0B132B] mb-1.5">
                            {m.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {m.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Kontrol */}
                {activeTabId === "kontrol" && isContentTab(currentTab) && (
                  <div className="space-y-6">
                    <p className="text-base text-slate-700 leading-relaxed">
                      {currentTab.content.summary}
                    </p>
                    <div className="space-y-4">
                      {currentTab.content.options?.map((opt, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                        >
                          <h4 className="text-sm font-bold text-[#0B132B]">
                            {opt.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {opt.desc}
                          </p>
                          {opt.note && (
                            <p className="text-[11px] text-slate-400 italic pt-1">
                              {opt.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right / High-Quality Product Showcase Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-50 p-3 shadow-lg">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src="/images/usecase-architecture.jpg"
                  alt="MARBAR Switchable Glass Mimari Uygulama"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-200">
                      MARBAR Standartları
                    </span>
                  </div>
                  <h4 className="text-xl font-bold">
                    Mimari Kalite & Güvenlik
                  </h4>
                  <p className="text-xs text-slate-200">
                    Avrupa güvenlik standartlarına uygun temperli ve lamine cam mimarisi.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

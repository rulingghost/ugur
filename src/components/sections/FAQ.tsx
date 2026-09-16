"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Wrench,
  Truck,
  Zap,
  CheckCircle2,
  Search,
} from "lucide-react";
import { FAQ_DATA, FAQItem } from "@/data/faq";
import { SITE_CONFIG } from "@/data/config";

type CategoryFilter = "all" | "montaj" | "kargo_odeme" | "teknoloji";

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [openId, setOpenId] = useState<string | null>("montaj-kolayligi");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all" as CategoryFilter, label: "Tüm Sorular", icon: Sparkles },
    { id: "montaj" as CategoryFilter, label: "Montaj & Kurulum", icon: Wrench },
    { id: "kargo_odeme" as CategoryFilter, label: "Ödeme & Hızlı Kargo", icon: Truck },
    { id: "teknoloji" as CategoryFilter, label: "Teknoloji & Güvenlik", icon: Zap },
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsappAskUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, MARBAR akıllı film hakkında bir sorum olacaktı:"
  )}`;

  return (
    <section id="sss" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-[#0284c7] tracking-wider uppercase shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Aklınızdaki Soruları Yanıtlıyoruz</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Montaj kolaylığı, kapıda ödeme, hızlı kargo ve akıllı film teknolojisi hakkında merak ettiğiniz tüm detaylar.
          </p>
        </div>

        {/* Modern Category Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0B132B] text-white shadow-md shadow-slate-900/15 scale-[1.02]"
                    : "bg-white text-slate-600 hover:text-[#0B132B] hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Filter for Fast Lookup */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Bir soru veya konu arayın (örn. montaj, kapıda ödeme)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] placeholder:text-slate-400 shadow-xs"
          />
        </div>

        {/* Modern Accordion List */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <p className="text-sm font-bold text-slate-800">
                Aramanıza uygun soru bulunamadı.
              </p>
              <p className="text-xs text-slate-500">
                Sorunuzu doğrudan müşteri temsilcimize sorabilirsiniz.
              </p>
              <a
                href={whatsappAskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp'tan Hemen Sor</span>
              </a>
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#0284c7]/50 bg-gradient-to-r from-sky-50/40 via-white to-white shadow-md shadow-sky-500/5"
                      : "border-slate-200 hover:border-slate-300 bg-white shadow-xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-extrabold text-[#0B132B]">
                            {item.question}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-sky-100 text-[#0284c7]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-[#0284c7] text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          <p className="bg-white/60 p-4 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Modern Support CTA Box */}
        <div className="mt-12 max-w-2xl mx-auto bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Başka bir sorunuz mu var?
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Teknik uzmanımıza WhatsApp'tan yazın, ortalama 2 dakikada yanıtlayalım.
              </p>
            </div>
          </div>

          <a
            href={whatsappAskUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp'tan Danış</span>
          </a>
        </div>

      </div>
    </section>
  );
};

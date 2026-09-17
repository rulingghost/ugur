"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GLASS_PRODUCTS } from "@/data/products";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Ruler,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";

export const Hero: React.FC = () => {
  // State: "transparent" (Şeffaf) or "privacy" (Gizlilik / Opak)
  const [glassMode, setGlassMode] = useState<"transparent" | "privacy">("transparent");

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-60 pointer-events-none" />

      {/* Subtle Ice Blue Glow */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: E-Commerce Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Price & Brand Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-xs font-bold text-[#0284c7] tracking-wider uppercase shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Metrekaresi {GLASS_PRODUCTS[0].basePricePerM2.toLocaleString("tr-TR")} ₺ • Kendinden Yapışkanlı Akıllı Film</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B132B] tracking-tight leading-[1.14]"
            >
              Metrekareye Özel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B132B] via-[#0284c7] to-[#0369a1]">
                Akıllı Cam Filmi.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Mevcut camlarınızı kırmadan veya sökmeden akıllı cama dönüştürün. Milimetrik ölçülerinizi girin, metrekare üzerinden anında canlı fiyatınızı hesaplayın. <strong>Kapıda Ödeme veya Havale</strong> seçenekleriyle doğrudan online sipariş verin.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                onClick={() => scrollTo("#siparis-ver")}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0B132B] text-white font-bold text-sm hover:bg-[#1E293B] shadow-lg shadow-slate-900/15 hover:shadow-xl transition-all duration-300 group active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 text-sky-400 fill-current" />
                <span>Ölçünü Gir, Sipariş Ver</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("#urun")}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white text-slate-800 border border-slate-200 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
              >
                <span>Ürün Özellikleri & Fiyat</span>
              </button>
            </motion.div>

            {/* E-Commerce Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-slate-200/80"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Ruler className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Milimetrik Kesim</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Truck className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Hızlı Kargo</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CreditCard className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Kapıda Ödeme & Kart</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>2 Yıl Garanti</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Signature Interactive Switchable Glass Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Interactive Frame Box */}
            <div className="relative rounded-3xl overflow-hidden bg-white p-3 sm:p-4 shadow-2xl border border-slate-200/90">
              
              {/* Glass Image Container */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900">
                
                {/* Transparent Base Image */}
                <Image
                  src="/images/hero-transparent.jpg"
                  alt="MARBAR Şeffaf Akıllı Cam"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-700"
                />

                {/* Privacy (Frosted) Animated Overlay */}
                <AnimatePresence>
                  {glassMode === "privacy" && (
                    <motion.div
                      key="privacy-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/images/hero-frosted.jpg"
                        alt="MARBAR Gizlilik (Opak) Akıllı Cam"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      {/* Frosted glass shimmer effect */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating State Badge inside Visual */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md transition-colors ${
                      glassMode === "transparent"
                        ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-950/70 text-sky-300 border border-sky-500/30"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        glassMode === "transparent" ? "bg-emerald-400" : "bg-sky-400"
                      }`}
                    />
                    {glassMode === "transparent" ? "ŞEFFAF MOD (AÇIK)" : "MAHREM MOD (OPAK)"}
                  </span>
                </div>

                {/* Interactive Toggle Control inside Image */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-1.5 border border-white/10 flex items-center gap-1 shadow-lg">
                    <button
                      onClick={() => setGlassMode("transparent")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        glassMode === "transparent"
                          ? "bg-white text-[#0B132B] shadow-sm font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>Şeffaf Görünüm</span>
                    </button>

                    <button
                      onClick={() => setGlassMode("privacy")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        glassMode === "privacy"
                          ? "bg-white text-[#0B132B] shadow-sm font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <EyeOff className="w-3.5 h-3.5 text-slate-700" />
                      <span>Opak (Gizlilik)</span>
                    </button>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    0.1 Saniyede Dönüşüm
                  </span>
                </div>
              </div>

              {/* Bottom Micro Explainer */}
              <div className="pt-3 px-1 flex items-center justify-between text-xs text-slate-500">
                <span>Elektrik akımıyla anında şeffaf ve opaklaşan PDLC teknolojisi</span>
                <span className="font-semibold text-slate-800">Tak-Çalıştır Trafo Dahil</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

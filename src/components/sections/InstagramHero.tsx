"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
  Flame,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { GLASS_PRODUCTS, SALE_DISCOUNT_PERCENT } from "@/data/products";

export const InstagramHero: React.FC = () => {
  // Mode: "transparent" (Şeffaf) or "privacy" (Opak/Gizlilik)
  const [glassMode, setGlassMode] = useState<"transparent" | "privacy">("transparent");

  const scrollToOrder = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.querySelector("#siparis-alani");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba! Instagram reklamında gördüğüm MARBAR akıllı cam filmi hakkında bilgi alıp hızlı sipariş vermek istiyorum."
  )}`;

  return (
    <section className="relative pt-36 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-b border-slate-200/80">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct-Response Sales Copy */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Urgency / Offer Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold tracking-wide shadow-xs">
              <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-bounce" />
              <span>İnstagram'a Özel %{SALE_DISCOUNT_PERCENT} Lansman İndirimi • Sınırlı Stok</span>
            </div>

            {/* High Converting Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-[1.12]">
              Eski Camlarını Kırmadan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0B132B]">
                Tek Dokunuşla Akıllı Cama
              </span>{" "}
              Dönüştür!
            </h1>

            {/* Sub-headline: Eliminating customer friction */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Perde yıkama ve tozlu jaluzi derdine son! Milimetrik ölçünüze özel üretilen{" "}
              <strong className="text-slate-900 font-bold">Kendinden Yapışkanlı Akıllı Film</strong> ile tek tuşla kristal şeffaflıktan tam mahremiyete geçin. Mevcut camı sökmeden kendiniz kolayca yapıştırın.
            </p>

            {/* Price Box with Anchor & Discount */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-sky-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 line-through font-semibold">
                    {GLASS_PRODUCTS[0].regularPricePerM2.toLocaleString("tr-TR")} ₺ / m²
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                    %{SALE_DISCOUNT_PERCENT} KAZANÇ
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B132B]">
                    {GLASS_PRODUCTS[0].basePricePerM2.toLocaleString("tr-TR")} ₺
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ m² başlayan</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium block">
                  Hızlı Kargo Ücretsiz • Tak-Çalıştır Trafo Dahil
                </span>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                  📦 Kapıda Ödeme Var
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Nakit veya Kredi Kartı</span>
              </div>
            </div>

            {/* Primary & Secondary Direct-Response Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#siparis-alani"
                onClick={scrollToOrder}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0B132B] hover:bg-[#1E293B] text-white font-black text-sm sm:text-base shadow-xl shadow-slate-900/20 hover:shadow-2xl transition-all duration-200 group active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-5 h-5 text-yellow-400 fill-current" />
                <span>Hemen Sipariş Ver (Kapıda Ödeme)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp'tan Sipariş Ver</span>
              </a>
            </div>

            {/* Trust Micro-Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Truck className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Hızlı Kargo</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CreditCard className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Kapıda Nakit / Kart</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>2 Yıl Resmi Garanti</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Ruler className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Kendin Yap (DIY)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Signature Interactive Before/After Visualizer */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white p-3 sm:p-4 shadow-2xl border border-slate-200/90">
              
              {/* Visual Container */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950">
                
                {/* Clear Mode Base Image */}
                <Image
                  src="/images/hero-transparent.jpg"
                  alt="MARBAR Şeffaf Akıllı Cam"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-500"
                />

                {/* Frosted / Privacy Animated Layer */}
                <AnimatePresence>
                  {glassMode === "privacy" && (
                    <motion.div
                      key="frosted-layer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/images/hero-frosted.jpg"
                        alt="MARBAR Buzlu (Gizlilik) Akıllı Cam"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Badge: Mode Status */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wide shadow-lg backdrop-blur-md transition-colors ${
                      glassMode === "transparent"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-400/40"
                        : "bg-slate-950/80 text-sky-300 border border-sky-400/40"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        glassMode === "transparent" ? "bg-emerald-400 animate-pulse" : "bg-sky-400"
                      }`}
                    />
                    {glassMode === "transparent" ? "ŞEFFAF MOD (AÇIK)" : "GİZLİLİK MODU (OPAK / BUZLU)"}
                  </span>
                </div>

                {/* Top Right: Reaction Time Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 hidden sm:block">
                  <span className="bg-black/60 text-white/90 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    ⚡ 0.1 Sn Reaksiyon
                  </span>
                </div>

                {/* Interactive Touch / Click Controls Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between gap-2">
                  <div className="bg-slate-950/90 backdrop-blur-md rounded-xl p-1 border border-white/15 flex items-center gap-1 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => setGlassMode("transparent")}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        glassMode === "transparent"
                          ? "bg-white text-[#0B132B] shadow-md scale-100"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>Şeffaf Görünüm</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGlassMode("privacy")}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        glassMode === "privacy"
                          ? "bg-white text-[#0B132B] shadow-md scale-100"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <EyeOff className="w-3.5 h-3.5 text-slate-800" />
                      <span>Buzlu (Gizlilik)</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-semibold text-white/90 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10 hidden sm:inline-block">
                    Dene & Dokun 👆
                  </span>
                </div>

              </div>

              {/* Bottom Explainer Row */}
              <div className="pt-3 px-2 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Mevcut camı sökmeden doğrudan yapıştırılır
                </span>
                <span className="font-bold text-[#0B132B]">RF Kumanda Hediye</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

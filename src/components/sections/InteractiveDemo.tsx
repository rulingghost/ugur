"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, EyeOff, Sparkles, Zap } from "lucide-react";

export const InteractiveDemo: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"clear" | "frosted">("clear");

  return (
    <section id="urun" className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Etkileşimli Deneyim</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Bir Camdan Çok Daha Fazlası.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Mekanınızın ışık ve mahremiyet dengesini anında kontrol edin. Sıradan bir bölme camından akıllı mimari bir deneyime geçiş yapın.
          </p>
        </div>

        {/* Dual Mode Cards & Live Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / State Selection Tabs */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Şeffaf Mod */}
            <div
              onClick={() => setActiveMode("clear")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                activeMode === "clear"
                  ? "bg-white border-[#0284c7] shadow-lg shadow-sky-500/5 ring-2 ring-sky-100"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl transition-colors ${
                    activeMode === "clear"
                      ? "bg-sky-500 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  <Sun className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#0B132B]">
                      Şeffaf Mod (Açık Alan)
                    </h3>
                    {activeMode === "clear" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    &ldquo;Doğal ışığı ve açık alan hissini koruyun.&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                    Elektrik akımı ile PDLC kristalleri düzene girer; cam kesintisiz bir berraklık kazanarak mekanlar arası görsel bağı ve gün ışığını en üst düzeye çıkarır.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Gizlilik Modu */}
            <div
              onClick={() => setActiveMode("frosted")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                activeMode === "frosted"
                  ? "bg-white border-[#0B132B] shadow-lg shadow-slate-900/5 ring-2 ring-slate-200"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl transition-colors ${
                    activeMode === "frosted"
                      ? "bg-[#0B132B] text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  <EyeOff className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#0B132B]">
                      Gizlilik Modu (Mahremiyet)
                    </h3>
                    {activeMode === "frosted" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    &ldquo;Tek dokunuşla alanınızı özel hale getirin.&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                    Elektrik sinyali kesildiğinde kristaller rastgele dağılarak ışığı yumuşakça diffüze eder; içerideki tüm detayları görünmez kılarak anında mahremiyet oluşturur.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-400">
                  Reaksiyon Süresi
                </p>
                <p className="text-lg font-bold text-[#0B132B]">
                  &lt; 0.1 Saniye
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-400">
                  Gizlilik Düzeyi
                </p>
                <p className="text-lg font-bold text-[#0B132B]">
                  %100 Görsel Blokaj
                </p>
              </div>
            </div>

          </div>

          {/* Right / Live Architectural Presentation */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Clear image */}
                <Image
                  src="/images/hero-transparent.jpg"
                  alt="MARBAR Şeffaf Cam Deneyimi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />

                {/* Frosted overlay */}
                <AnimatePresence>
                  {activeMode === "frosted" && (
                    <motion.div
                      key="demo-frosted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/images/hero-frosted.jpg"
                        alt="MARBAR Buzlu Gizlilik Cam Deneyimi"
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interactive Status Float */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/90 shadow-md">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-semibold text-slate-800">
                      {activeMode === "clear" ? "Voltaj Açık: Şeffaf" : "Voltaj Kapalı: Opak Gizlilik"}
                    </span>
                  </div>
                </div>

                {/* Bottom glass blur banner */}
                <div className="absolute bottom-4 left-4 right-4 z-10 glass-surface p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {activeMode === "clear"
                        ? "Doğal Işık ve Derinlik Korunur"
                        : "Süt Beyazı Homojen Difüzyon"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {activeMode === "clear"
                        ? "Mekansal süreklilik ve kristal şeffaflık"
                        : "Gölge ve silüetleri tamamen engelleyen gizlilik"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setActiveMode(activeMode === "clear" ? "frosted" : "clear")
                    }
                    className="px-3.5 py-1.5 bg-[#0B132B] text-white text-xs font-medium rounded-lg hover:bg-[#1E293B] transition-colors shrink-0"
                  >
                    Geçiş Yap
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

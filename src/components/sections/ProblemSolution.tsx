"use client";

import React from "react";
import { XCircle, CheckCircle2, Sparkles, ShieldAlert, ArrowRight, Zap } from "lucide-react";

export const ProblemSolution: React.FC = () => {
  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#siparis-alani");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const comparisons = [
    {
      problem: "Sürekli toz, kireç ve mikrop tutar; yıkaması ve temizliği eziyettir.",
      solution: "Toz tutmaz! Standart cam silme beziyle 5 saniyede tertemiz ve hijyeniktir.",
    },
    {
      problem: "Kapatıldığında tüm gün ışığını ve manzarayı keser, odayı karanlık yapar.",
      solution: "Buzlu (mahrem) moddayken bile gün ışığını engellemez, odayı ferah ve aydınlık tutar.",
    },
    {
      problem: "Mekanik ipleri kopar, rayları sıkışır ve birkaç yılda yıpranıp eskir.",
      solution: "100.000+ saat ömürlü katı hal PDLC teknolojisi. Aşınan mekanik parça yoktur.",
    },
    {
      problem: "Güneşin yakıcı UV ışınlarını geçirerek mobilya ve parkeleri soldurur.",
      solution: "%99 Zararlı UV blokajı sağlayarak mobilyalarınızı ve cildinizi korur.",
    },
    {
      problem: "Cam önünde 15-20 cm kalınlık kaplayarak yaşam alanınızı daraltır.",
      solution: "0.4 mm ultra ince film; doğrudan cam yüzeyinde çalışır, sıfır alan kaybı.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-bold text-[#0284c7] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Neden Geleneksel Perdeyi Bırakmalısınız?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B] tracking-tight">
            Eski Usul Perdeler vs. MARBAR Akıllı Film
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Kumaş perdelerin ve temizliği bitmeyen jaluzilerin yarattığı zahmeti hayatınızdan çıkarın.
          </p>
        </div>

        {/* Side-by-Side Comparison Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Left: The Old Frustrating Way */}
          <div className="bg-red-50/40 rounded-3xl p-6 sm:p-8 border border-red-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6 text-red-700 font-extrabold text-lg sm:text-xl">
                <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                <span>Geleneksel Perde & Jaluziler</span>
              </div>

              <div className="space-y-4">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="leading-relaxed">{item.problem}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-200/60 text-xs font-semibold text-red-600 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Yıllık bakım masrafı ve toz temizliği gerektirir</span>
            </div>
          </div>

          {/* Right: The Modern MARBAR Solution */}
          <div className="bg-gradient-to-br from-slate-900 via-[#0B132B] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-sky-400/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2.5 text-sky-400 font-extrabold text-lg sm:text-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <span>MARBAR Akıllı PDLC Film</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold text-[10px] tracking-wider uppercase border border-sky-400/30">
                  Geleceğin Teknolojisi
                </span>
              </div>

              <div className="space-y-4">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item.solution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Quick Action */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <span className="text-xs text-sky-300 font-medium">
                Tak-çalıştır trafo & RF kumanda pakete dahildir.
              </span>
              <a
                href="#siparis-alani"
                onClick={scrollToOrder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-colors shrink-0 shadow-md"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Hemen Sahip Ol</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

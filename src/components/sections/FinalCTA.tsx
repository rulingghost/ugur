"use client";

import React from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export const FinalCTA: React.FC = () => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, MARBAR Switchable Glass projem için doğrudan görüşmek istiyorum."
  )}`;

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#teklif-al");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Glass Showcase Box */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B132B] to-slate-900 text-white p-8 sm:p-16 lg:p-20 shadow-2xl">
          
          {/* Subtle Grid and Glow */}
          <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-7">
            
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-sky-300 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Geleceğin Mekanları</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Projenizi Akıllı Cam <br className="hidden sm:inline" />
              Teknolojisiyle Dönüştürün.
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              MARBAR Switchable Glass çözümleri hakkında bilgi alın, projenize özel seçenekleri birlikte değerlendirelim.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#teklif-al"
                onClick={handleQuoteClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#0B132B] font-bold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Fiyat Teklifi Al</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600/90 text-white font-semibold text-sm hover:bg-emerald-600 border border-emerald-500/50 backdrop-blur-md transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp&apos;tan Yaz</span>
              </a>
            </div>

            {/* Reassurance text */}
            <p className="text-xs text-slate-400 pt-2">
              Ölçülerinizi iletin, 24 saat içerisinde teknik şartname ve projelendirme teklifinizi iletelim.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Zap, ArrowRight, Truck } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export const MobileStickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, Instagram reklamında gördüğüm MARBAR akıllı film siparişi için yazıyorum."
  )}`;

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#siparis-alani");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside 
      aria-label="Mobil Sipariş Çubuğu"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-2.5 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_25px_rgba(11,19,43,0.12)] animate-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Fast Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-xs"
          title="WhatsApp Sipariş"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 fill-current" />
        </a>

        {/* Price & Shipping Info */}
        <div className="flex-1 min-w-0 px-1">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black text-[#0B132B]">3.450 ₺</span>
            <span className="text-[10px] text-slate-500 font-semibold">/ m² başlayan</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold truncate">
            <Truck className="w-3 h-3 shrink-0" />
            <span>Kargo Bedava • Kapıda Ödeme</span>
          </div>
        </div>

        {/* Big Action Button */}
        <a
          href="#siparis-alani"
          onClick={handleOrderClick}
          className="flex-none flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-black shadow-lg shadow-slate-900/20 active:scale-[0.97] transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current shrink-0" />
          <span>Sipariş Ver</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </aside>
  );
};

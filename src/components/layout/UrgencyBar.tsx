"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Clock, Flame, ShieldCheck } from "lucide-react";

export const UrgencyBar: React.FC = () => {
  // Countdown timer: 4 hours, 18 mins, 35 secs
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, "0");

  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#siparis-alani");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside 
      aria-label="Kampanya Duyurusu"
      className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#0B132B] text-white py-2 px-3 text-xs sm:text-sm font-medium border-b border-sky-500/20 relative z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
        
        {/* Left Side: Campaign Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/90 text-white font-black text-[10px] sm:text-xs uppercase tracking-wider animate-pulse">
            <Flame className="w-3 h-3 text-yellow-300 fill-current" />
            İnstagram Lansman Fırsatı
          </span>
          <span className="text-slate-200 font-semibold text-[11px] sm:text-xs">
            %35 İndirim • <strong className="text-sky-300">Ücretsiz Hızlı Kargo</strong> • Kapıda Ödeme
          </span>
        </div>

        {/* Right Side: Live Countdown & Quick CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10 font-mono">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>Kalan Süre:</span>
            <span className="font-bold text-white">
              {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
            </span>
          </div>

          <a
            href="#siparis-alani"
            onClick={scrollToOrder}
            className="text-[11px] sm:text-xs font-bold text-sky-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            Fırsatı Yakala →
          </a>
        </div>

      </div>
    </aside>
  );
};

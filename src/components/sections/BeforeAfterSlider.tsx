"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  // Slider position in percentage (0 - 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerçek Zamanlı Karşılaştırma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Mahremiyet İhtiyacınız Olduğunda, <br />
            <span className="text-[#0284c7]">Camınız Buna Hazır.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Aynı mekânda şeffaf ve gizlilik modları arasındaki farkı kaydırıcıyı sağa-sola sürükleyerek anında test edin.
          </p>
        </div>

        {/* Draggable Slider Container */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 cursor-ew-resize select-none bg-slate-100"
          >
            {/* 1. Base Image (AFTER: Privacy / Frosted Glass) */}
            <div className="absolute inset-0">
              <Image
                src="/images/hero-frosted.jpg"
                alt="Gizlilik Modu (Opak Cam)"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 right-6 z-10">
                <span className="glass-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-900 shadow-md">
                  Gizlilik Modu (Opak)
                </span>
              </div>
            </div>

            {/* 2. Top Image (BEFORE: Transparent Glass), clipped by sliderPosition */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/images/hero-transparent.jpg"
                alt="Şeffaf Mod (Saydam Cam)"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="glass-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-900 shadow-md">
                  Şeffaf Mod (Saydam)
                </span>
              </div>
            </div>

            {/* 3. Divider Line and Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
            >
              {/* Central Draggable Knob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#0B132B] rounded-full shadow-2xl border-2 border-slate-200 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <MoveHorizontal className="w-5 h-5 text-slate-800" />
              </div>
            </div>

            {/* Top Helper Indicator */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-medium text-slate-700 shadow">
                ← Karşılaştırmak için kaydırın →
              </span>
            </div>

          </div>

          {/* Bottom Descriptive Caption */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 px-2">
            <p>Sol: Şeffaf kristal cam görünümü</p>
            <p className="font-semibold text-slate-700">
              Konut, Ofis ve Otel Projeleri için Tek Dokunuşla Dönüşüm
            </p>
            <p>Sağ: %100 mahremiyet sağlayan buzlu cam görünümü</p>
          </div>
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import { Layers, Zap, Sliders, CheckCircle2, ShieldCheck, PlayCircle, Sparkles } from "lucide-react";

export const HowItWorksSteps: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Camı Temizle & Yapıştır",
      time: "15 Dakika",
      desc: "Mevcut camınızı temizleyin. Kendinden yapışkanlı optik silikon tabanı sayesinde hava kabarcığı yapmadan camınıza kendiniz kolayca yapıştırın.",
      icon: Layers,
      highlight: "Usta veya montaj ekibi gerekmez",
    },
    {
      step: "02",
      title: "Kabloyu Prize Uzat",
      time: "10 Dakika",
      desc: "Filmin köşesindeki ultra ince, esnek elektrik kablosunu doğrama kenarından en yakın prize doğru gizli kanal ile uzatın.",
      icon: Sliders,
      highlight: "Tüm bağlantı aparatları kutudadır",
    },
    {
      step: "03",
      title: "Fişe Tak & Kumandaya Bas!",
      time: "1 Dakika",
      desc: "220V akıllı trafoyu prize takın. Hediye kablosuz RF kumandaya bastığınız anda camınız 0.1 saniyede şeffaftan buzluya dönüşür.",
      icon: Zap,
      highlight: "30 metre menzilli kablosuz kumanda",
    },
  ];

  return (
    <section id="kurulum" className="py-16 sm:py-20 bg-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0284c7] tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kolay Kendin Yap (DIY) Montaj</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B] tracking-tight">
            3 Kolay Adımda Evinde Kendin Kur
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Cam sökme, inşaat pisliği veya pahalı ustalar yok. Kutusundan çıkarıp yarım saatte kullanmaya başlayın.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284c7] border border-sky-100 flex items-center justify-center font-black text-sm">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      ⏱️ {item.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B132B] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video & Support Note */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-4 border border-sky-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B132B]">
                Kutu İçinde Adım Adım QR Video Kılavuzu Mevcuttur
              </h4>
              <p className="text-[11px] text-slate-500">
                Ayrıca montaj sırasında WhatsApp üzerinden görüntülü canlı teknik destek alabilirsiniz.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
            %100 Destek Garantisi
          </span>
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ToggleRight, Radio, Home, Check, Info } from "lucide-react";

export const ControlOptions: React.FC = () => {
  const options = [
    {
      title: "Duvar Anahtarı",
      tagline: "Geleneksel & Güvenilir Dokunuş",
      description:
        "Mekanınızın mevcut elektrik anahtarlarıyla aynı estetik standartta çalışan, duvara monte klasik anahtar çözümü. Basit ve sezgisel.",
      icon: ToggleRight,
      features: [
        "Mevcut elektrik altyapısıyla uyumlu",
        "Aç/Kapa mekanik veya dokunmatik seçenek",
        "Sıfır gecikme süresi",
      ],
    },
    {
      title: "Uzaktan Kumanda",
      tagline: "Kablosuz & Taşınabilir Esneklik",
      description:
        "Masa başından veya koltuğunuzdan kalkmadan camlarınızı tek tek veya grup halinde yönetmenizi sağlayan çok kanallı RF kumanda ünitesi.",
      icon: Radio,
      features: [
        "Çok kanallı bağımsız cam yönetimi",
        "Geniş çekim menzili",
        "Minimal ve ergonomik tasarım",
      ],
    },
    {
      title: "Akıllı Ev Entegrasyonu*",
      tagline: "Merkezi & Otomasyon Uyumlu",
      description:
        "Bina otomasyon sistemleri ve senaryoları ile senkronize çalışabilme. Toplantı başladığında veya gün batımında otomatik mod değişimi.",
      icon: Home,
      features: [
        "Merkezi senaryolara dahil edilebilme",
        "Mobil uygulama veya sesli komut altyapısı",
        "Mühendislik ekibimizce uyarlanan kontrol paneli",
      ],
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase">
            <ToggleRight className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Kullanıcı Arayüzü</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Kontrol Sizde.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            MARBAR Switchable Glass sistemlerini yaşam tarzınıza ve mekanın teknik altyapısına en uygun yöntemle yönetin.
          </p>
        </div>

        {/* 3 Control Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {options.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:bg-white"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0B132B] group-hover:bg-[#0B132B] group-hover:text-white transition-all duration-300 mb-6 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0B132B] mb-1">
                    {opt.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#0284c7] mb-4">
                    {opt.tagline}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/70 space-y-2.5">
                  {opt.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Required Disclaimer Note */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <p>
            * Uyumluluk kullanılacak otomasyon sistemine ve altyapı protokolüne göre değişiklik gösterebilir. Teknik keşif sırasında projeniz için özel projelendirme yapılır.
          </p>
        </div>

      </div>
    </section>
  );
};

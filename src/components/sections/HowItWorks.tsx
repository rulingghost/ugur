"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sliders, RefreshCw, CheckCircle2, Layers } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(2);

  const steps = [
    {
      num: "01",
      title: "Elektrik Kontrollü Akıllı Katman",
      desc: "Cam içerisinde kullanılan özel PDLC (Polymer Dispersed Liquid Crystal) teknolojisi düşük voltajlı elektrik akımıyla aktif hale gelir.",
      icon: Zap,
    },
    {
      num: "02",
      title: "Tek Dokunuşla Kontrol",
      desc: "Duvar anahtarı, uzaktan kumanda veya uyumlu akıllı bina otomasyon sistemleri üzerinden zahmetsizce kontrol edilebilir.",
      icon: Sliders,
    },
    {
      num: "03",
      title: "Anında Dönüşüm",
      desc: "Cam saniyeler içinde şeffaf ve gizlilik modları arasında sessiz, pürüzsüz ve anında geçiş yapar.",
      icon: RefreshCw,
    },
  ];

  const layers = [
    {
      id: 0,
      name: "1. Dış Cam Panel",
      desc: "Ekstra berrak (Ultra-Clear) temperli mimari cam yüzey.",
      color: "bg-slate-200/80 border-slate-300",
    },
    {
      id: 1,
      name: "2. İletken ITO Film",
      desc: "Görünmez mikroskobik indiyum kalay oksit elektrik iletken katmanı.",
      color: "bg-sky-100/90 border-sky-300",
    },
    {
      id: 2,
      name: "3. PDLC Sıvı Kristal Akıllı Çekirdek",
      desc: "Elektrik sinyali ile hizalanan polimer matris ve sıvı kristal damlacıkları.",
      color: "bg-sky-500/20 border-sky-400 text-[#0284c7]",
    },
    {
      id: 3,
      name: "4. İkinci İletken ITO Katmanı",
      desc: "Homojen elektrik dağılımı sağlayan alt iletken film.",
      color: "bg-sky-100/90 border-sky-300",
    },
    {
      id: 4,
      name: "5. İç Güvenlik Lamine Camı",
      desc: "Darbe dayanımı ve ses yalıtımı sağlayan yapısal lamine cam.",
      color: "bg-slate-200/80 border-slate-300",
    },
  ];

  return (
    <section
      id="nasil-calisir"
      className="py-24 bg-slate-50/60 relative overflow-hidden border-b border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Çalışma Prensibi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Teknoloji Görünmez. <br className="hidden sm:inline" />
            Etkisi Büyük.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Karmaşık mühendisliği sade bir kullanıcı deneyimine dönüştürdük. MARBAR Switchable Glass teknolojisinin arka planındaki 3 temel adım:
          </p>
        </div>

        {/* 3 Step Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#0B132B]/20 tracking-tighter group-hover:text-[#0284c7]/40 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-3 rounded-xl bg-slate-50 text-[#0B132B] group-hover:bg-[#0B132B] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B132B] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-400 group-hover:text-[#0284c7] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Kusursuz Entegrasyon</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Architectural Layer Diagram */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl font-bold text-[#0B132B] mb-2">
              Akıllı PDLC Katman Mimarisi
            </h3>
            <p className="text-sm text-slate-600">
              Camın iç yapısını keşfetmek için katmanların üzerine gelebilir veya tıklayabilirsiniz:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Layer Visual Stack */}
            <div className="lg:col-span-7 space-y-2.5">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    activeLayer === layer.id
                      ? "bg-slate-50 border-[#0284c7] shadow-sm translate-x-2"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        activeLayer === layer.id
                          ? "bg-[#0284c7]"
                          : "bg-slate-300"
                      }`}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {layer.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {layer.id === 2 ? "Akıllı Çekirdek" : "Yapısal Katman"}
                  </span>
                </div>
              ))}
            </div>

            {/* Layer Detail Focus Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-center space-y-4">
              <span className="text-xs font-semibold tracking-wider text-[#0284c7] uppercase">
                Seçili Katman Detayı
              </span>
              <h4 className="text-lg font-bold text-[#0B132B]">
                {layers[activeLayer].name}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {layers[activeLayer].desc}
              </p>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span>Mimari Güvenlik Standardı</span>
                <span className="font-semibold text-slate-800">EN / ISO Uyumlu</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

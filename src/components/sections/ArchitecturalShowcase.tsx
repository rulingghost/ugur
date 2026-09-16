"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";

export const ArchitecturalShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const galleryItems = [
    {
      id: "office-1",
      title: "Yönetici Toplantı Salonu",
      category: "office",
      categoryName: "Ofis & Kurumsal",
      location: "Levent, İstanbul",
      image: "/images/usecase-office.jpg",
      description: "Doğal gün ışığı ile açık çalışma ortamı sağlayan akıllı bölme camı.",
    },
    {
      id: "home-1",
      title: "Lüks Rezidans Bahçe & Havuz Cephesi",
      category: "residential",
      categoryName: "Lüks Konut",
      location: "Bodrum, Muğla",
      image: "/images/usecase-home.jpg",
      description: "İç ve dış yaşam alanlarını kesintisiz birleştiren geniş cam açıklıklar.",
    },
    {
      id: "hotel-1",
      title: "5 Yıldızlı Otel Master Süit Banyo",
      category: "hospitality",
      categoryName: "Otel & Spa",
      location: "Beşiktaş, İstanbul",
      image: "/images/usecase-hotel.jpg",
      description: "Yatak odası ile mermer küvet arasında anında mahremiyet sağlayan akıllı cam.",
    },
    {
      id: "clinic-1",
      title: "Medikal Estetik Klinik Danışma",
      category: "clinic",
      categoryName: "Klinik & Sağlık",
      location: "Nişantaşı, İstanbul",
      image: "/images/usecase-clinic.jpg",
      description: "Pürüzsüz hijyenik yüzey ve hasta mahremiyetini koruyan gizlilik modu.",
    },
    {
      id: "retail-1",
      title: "Flagship Tasarım Showroomu",
      category: "retail",
      categoryName: "Ticari & Perakende",
      location: "Zorlu Center, İstanbul",
      image: "/images/usecase-retail.jpg",
      description: "Dinamik vitrin sunumları ve VIP deneme alanları için opaklaşan cam mimarisi.",
    },
    {
      id: "arch-1",
      title: "Bespoke Mimari Villa Cephesi",
      category: "residential",
      categoryName: "Lüks Konut",
      location: "Kemerburgaz, İstanbul",
      image: "/images/usecase-architecture.jpg",
      description: "Güneş kontrolü ve estetik duruşu bir araya getiren strüktürel cam çözümü.",
    },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <section className="py-24 bg-slate-50/70 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase">
              <Camera className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Mimari Portföy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
              Mekân Değişmez. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B132B] to-[#0284c7]">
                Deneyim Değişir.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              MARBAR Switchable Glass’ın prestijli yaşam ve çalışma mekanlarında yarattığı dönüşümü inceleyin.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "all", label: "Tümü" },
              { id: "office", label: "Ofis & Kurumsal" },
              { id: "residential", label: "Lüks Konut" },
              { id: "hospitality", label: "Otel & Spa" },
              { id: "clinic", label: "Klinik" },
              { id: "retail", label: "Ticari" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filter === btn.id
                    ? "bg-[#0B132B] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                  <div className="absolute top-4 left-4">
                    <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 shadow-sm">
                      {item.categoryName}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] text-slate-200 font-medium mb-1">
                      {item.location}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {item.description}
                  </p>
                  <a
                    href="#teklif-al"
                    className="p-1.5 rounded-lg text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

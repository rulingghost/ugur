"use client";

import React from "react";
import { Check, ArrowRight, Sparkles, Layers, ShieldCheck, Zap, SunMedium, Eye } from "lucide-react";
import { GLASS_PRODUCTS } from "@/data/products";

export const ProductModels: React.FC = () => {
  const product = GLASS_PRODUCTS[0];

  const scrollToConfigurator = () => {
    const el = document.querySelector("#siparis-ver");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const productHighlights = [
    {
      title: "Mevcut Cama Doğrudan Uygulama",
      desc: "Camlarınızı kırmaya, sökmeye veya doğrama değiştirmeye gerek kalmaz. Doğrudan mevcut camın iç yüzeyine uygulanır.",
      icon: Layers,
    },
    {
      title: "0.1 Saniyede Anında Geçiş",
      desc: "Elektrik akımıyla tek dokunuşta kristal şeffaflıktan tam mahremiyet sağlayan buzlu (opak) moda geçer.",
      icon: Eye,
    },
    {
      title: "%99 Zararlı UV Koruması",
      desc: "Güneşin zararlı UV ışınlarını bloke ederek mobilyalarınızın solmasını önler ve termal konfor sağlar.",
      icon: SunMedium,
    },
    {
      title: "Tak-Çalıştır Güvenli Trafo",
      desc: "Standart 220V prize takılan akıllı güç ünitesi ve kablosuz RF uzaktan kumandası kutuya dahildir.",
      icon: Zap,
    },
    {
      title: "Düşük Enerji Tüketimi",
      desc: "Metrekare başına sadece 5W enerji harcar. Bir LED ampulden daha az elektrik tüketir.",
      icon: Sparkles,
    },
    {
      title: "2 Yıl Birebir Garanti",
      desc: "Tüm akıllı film panellerimiz ve elektrik donanımımız resmi üretici garantisi altındadır.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="urun" className="py-20 bg-white relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Teknoloji & Ürün Özellikleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            {product.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Mevcut camlarınızı değiştirmeden saniyeler içinde akıllı cama dönüştüren yeni nesil kendinden yapışkanlı PDLC film teknolojisi.
          </p>
        </div>

        {/* Big Spotlight Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-50 to-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          
          {/* Price Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                Özel Milimetrik Kesim • Tak-Çalıştır Trafo Dahil
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B132B]">
                Kendinden Yapışkanlı Akıllı PDLC Film
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Ev pencereleri, ofis toplantı odaları, cam bölmeler ve vitrinler için idealdir.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-[#0284c7]/30 text-left sm:text-right shrink-0 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Metrekare Birim Fiyatı:</span>
              <div className="flex sm:block items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#0B132B]">
                  {product.basePricePerM2.toLocaleString("tr-TR")} ₺
                </span>
                <span className="text-sm text-slate-400 font-semibold"> / m²</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                ✓ Kredi Kartına 9 Taksit İmkanı
              </span>
            </div>
          </div>

          {/* 6 Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {productHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B132B]">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span>İstediğiniz En ve Boy ölçüsünü girerek anında net fiyatınızı hesaplayabilirsiniz.</span>
            </div>

            <button
              onClick={scrollToConfigurator}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B132B] text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <span>Ölçü Gir & m² Fiyatı Hesapla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

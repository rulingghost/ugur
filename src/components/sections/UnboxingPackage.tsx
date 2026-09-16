"use client";

import React from "react";
import { Package, Gift, ShieldCheck, Check, Sparkles, Truck } from "lucide-react";

export const UnboxingPackage: React.FC = () => {
  const packageItems = [
    {
      title: "Milimetrik Kesilmiş Akıllı Film",
      desc: "Seçtiğiniz ölçüde CNC lazerle kesilmiş, elektrotları ve kablo çıkışları fabrikada hazırlanmış kullanıma hazır film.",
      tag: "Özel Kesim",
      isGift: false,
    },
    {
      title: "Tak-Çalıştır Akıllı Güç Trafosu",
      desc: "Standart 220V prize takılan, aşırı akım ve kısa devre korumalı CE/RoHS sertifikalı güvenlikli adaptör.",
      tag: "Sistem Dahili",
      isGift: false,
    },
    {
      title: "RF Kablosuz Uzaktan Kumanda",
      desc: "30 metreye kadar duvar arkasından bile çeken, ergonomik tuşlu kablosuz uzaktan kumanda seti.",
      tag: "HEDİYE 🎁",
      isGift: true,
    },
    {
      title: "Profesyonel Uygulama Spatulası",
      desc: "Cam yüzeyine yapıştırırken hava kabarcığı bırakmayan özel keçe kenarlı yumuşak uygulama aparatı.",
      tag: "HEDİYE 🎁",
      isGift: true,
    },
    {
      title: "Özel Yüzey Temizlik Bezi & Kiti",
      desc: "Camın üzerindeki toz ve lekeleri sıfırlayarak pürüzsüz yapışma sağlayan mikrofiber temizlik seti.",
      tag: "HEDİYE 🎁",
      isGift: true,
    },
    {
      title: "Özel Korumalı Hızlı Kargo",
      desc: "Kargoda ezilme veya bükülmeyi sıfıra indiren özel korumalı ambalajıyla doğrudan adresinize en hızlı şekilde ulaştırılır.",
      tag: "ÜCRETSİZ 🚚",
      isGift: true,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kutu İçeriği & Hediye Donanımlar</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B] tracking-tight">
            Siparişinizle Birlikte Neler Geliyor?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Ekstra hiçbir parça veya aparat almanıza gerek yok. Kutusunu açıp prize takmanız için her şey eksiksiz gönderilir.
          </p>
        </div>

        {/* 6 Package Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {packageItems.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                item.isGift
                  ? "bg-gradient-to-b from-sky-50/60 to-white border-sky-200/80 shadow-xs"
                  : "bg-slate-50/70 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    item.isGift
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {item.tag}
                </span>
                <span className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold text-xs shadow-xs border border-slate-100">
                  ✓
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0B132B] mb-1.5">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Cargo Guarantee Banner */}
        <div className="max-w-4xl mx-auto mt-10 p-5 rounded-2xl bg-[#0B132B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Kargo Sırasında %100 Hasarsızlık Garantisi</h4>
              <p className="text-xs text-slate-300">
                Ürününüz sağlam özel ambalajı içerisinde sigortalı taşınır. Hasar durumunda anında yenisi gönderilir.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg">
              ✓ Sigortalı Hızlı Kargo
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { CUSTOMER_REVIEWS } from "@/data/reviews";

export const CustomerReviews: React.FC = () => {
  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#siparis-alani");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="yorumlar" className="py-16 sm:py-24 bg-white relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Big Rating */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 tracking-wider uppercase">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Doğrulanmış Müşteri Deneyimleri</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B] tracking-tight">
            1.840+ Mutlu Kullanıcımız Ne Diyor?
          </h2>

          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-xl font-black text-slate-900">4.9 / 5</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              (Instagram & Web Doğrulanmış Siparişler)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header: User Info & Rating */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs">
                      {rev.avatarText}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                        {rev.name}
                      </h4>
                      <span className="text-[11px] text-slate-500">{rev.location}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Doğrulanmış Alıcı
                    </span>
                  )}
                </div>

                {/* Bundle Tag */}
                <div className="mb-3 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
                  📦 {rev.bundleBought}
                </div>

                {/* Title & Comment */}
                <h5 className="font-bold text-xs sm:text-sm text-[#0B132B] mb-1.5">
                  "{rev.title}"
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Bottom Project Photo if available */}
              {rev.image && (
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={rev.image}
                      alt={rev.area}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-[11px]">
                    <span className="text-slate-400 block">Uygulama Alanı:</span>
                    <strong className="text-slate-800 font-semibold">{rev.area}</strong>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-600">
            Siz de evinizin veya iş yerinizin konforunu artırın, perde derdine son verin.
          </p>
          <a
            href="#siparis-alani"
            onClick={scrollToOrder}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <span>Hemen Ölçünü Seç & Sipariş Ver</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

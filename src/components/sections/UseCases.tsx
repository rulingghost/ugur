"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2 } from "lucide-react";
import { USE_CASES } from "@/data/useCases";

export const UseCases: React.FC = () => {
  const handleScrollToQuote = (category: string) => {
    const quoteEl = document.querySelector("#teklif-al");
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event to preselect space in configurator if applicable
      window.dispatchEvent(
        new CustomEvent("select-configurator-space", { detail: category })
      );
    }
  };

  return (
    <section
      id="kullanim-alanlari"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Mimari Entegrasyon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
              Her Mekâna Uyum Sağlayan Teknoloji
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              MARBAR Switchable Glass, kurumsal ofislerden lüks konutlara, sağlık yapılarından konaklama tesislerine kadar mekanların işlevselliğini yeniden tanımlar.
            </p>
          </div>

          <div>
            <button
              onClick={() => handleScrollToQuote("Ev")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>Projenize Özel Teklif Alın</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USE_CASES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <Image
                  src={item.image}
                  alt={`MARBAR Switchable Glass - ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle glass gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#0B132B] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#0284c7] mb-3">
                    &ldquo;{item.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  {/* Aspect tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.aspects.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleScrollToQuote(item.title)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
                    aria-label={`${item.title} için fiyat al`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

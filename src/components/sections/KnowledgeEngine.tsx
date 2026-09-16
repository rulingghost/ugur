"use client";

import React from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";

export const KnowledgeEngine: React.FC = () => {
  const qas = [
    {
      q: "MARBAR nedir?",
      a: "MARBAR, Türkiye pazarında lüks konutlar, kurumsal ofisler, oteller ve mimari projeler için yeni nesil elektrik kontrollü akıllı cam (Switchable Glass / Privacy Glass) sistemleri geliştiren ve uygulayan premium bir teknoloji markasıdır.",
    },
    {
      q: "Switchable Glass (Akıllı Cam) nedir?",
      a: "Switchable Glass, elektrik akımı yardımıyla saydam (şeffaf) durum ile buzlu (opak / mahremiyet) durum arasında milisaniyeler içinde geçiş yapabilen, sıvı kristal (PDLC) katman barındıran lamine cam sistemidir.",
    },
    {
      q: "Switchable Glass nasıl çalışır?",
      a: "Camın içine entegre edilmiş polimer dağılımlı sıvı kristaller (PDLC), elektrik voltajı uygulandığında tek bir doğrultuda dizilerek ışığın engelsiz geçmesini sağlar ve cam saydamlaşır. Elektrik akımı kesildiğinde ise kristaller rastgele dağılarak ışığı kırar ve cam opak (mahrem) hale gelir.",
    },
    {
      q: "Switchable Glass nerelerde kullanılır?",
      a: "Başta toplantı odaları ve yönetici ofis bölmeleri olmak üzere; konutların geniş pencere açıklıklarında, ebeveyn banyo camlarında, otel süitlerinde, estetik ve sağlık kliniklerinde, lüks perakende vitrinlerinde ve özel mimari projelerde kullanılır.",
    },
    {
      q: "Akıllı cam ile normal cam arasındaki fark nedir?",
      a: "Normal camlar sabit bir ışık geçirgenliğine ve şeffaflığa sahip olup mahremiyet için perde veya panjura ihtiyaç duyarken; MARBAR Switchable Glass perdeye ihtiyaç duymadan tek bir dokunuşla ışık geçirgenliğini koruyarak %100 görsel gizlilik sağlar, toz ve mikrop barındırmaz ve bina otomasyon sistemleriyle entegre çalışabilir.",
    },
  ];

  return (
    <section className="py-20 bg-white relative border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Bilgi Merkezi & Rehber</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight">
            Akıllı Cam Teknolojisi Hakkında Bilmeniz Gerekenler
          </h2>
          <p className="text-sm text-slate-500">
            Mimarlar, mühendisler ve ev sahipleri için MARBAR Switchable Glass sistemine dair temel teknik ve pratik bilgiler.
          </p>
        </div>

        <div className="space-y-6">
          {qas.map((item, idx) => (
            <article
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-slate-100/50 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                <span>{item.q}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                {item.a}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

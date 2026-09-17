"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Ruler,
  Truck,
  CreditCard,
  ShieldCheck,
  Zap,
  Sparkles,
  Check,
} from "lucide-react";

export const Benefits: React.FC = () => {
  const ecomBenefits = [
    {
      title: "Milimetrik Özel Kesim",
      subtitle: "Doğramanıza Birebir Uyum",
      desc: "İster 80x210 cm ister 180x260 cm olsun, fabrikamızda son teknoloji CNC ve lazerle milimetrik hassasiyette kesim yapılır.",
      icon: Ruler,
    },
    {
      title: "Sigortalı Hızlı Kargo",
      subtitle: "Hasara Karşı %100 Güvence",
      desc: "Cam ve film ürünlerimiz özel darbe emici korumalı ambalajlarda paketlenir, sigortalı hızlı kargo ile doğrudan kapınıza ulaştırılır.",
      icon: Truck,
    },
    {
      title: "2 Güvenli Ödeme Yolu",
      subtitle: "Kapıda Ödeme ve Havale",
      desc: "Kapıda nakit veya kartla teslimatta ödeme, ya da avantajlı havale/EFT ile güvenli sipariş.",
      icon: CreditCard,
    },
    {
      title: "2 Yıl Birebir Garanti",
      subtitle: "CE & RoHS Sertifikalı Mühendislik",
      desc: "Tüm akıllı cam panelleri, akıllı filmler ve güç trafoları 2 yıl boyunca üretici garantisi ve teknik servis güvencesi altındadır.",
      icon: ShieldCheck,
    },
    {
      title: "Tak-Çalıştır Güç Ünitesi",
      subtitle: "Kolay Kurulum İmkanı",
      desc: "Sistemle birlikte gelen akıllı trafo standart 220V prize takılır; RF kumandası veya duvar anahtarıyla hemen çalışmaya hazırdır.",
      icon: Zap,
    },
    {
      title: "Toz Tutmaz, Kolay Temizlenir",
      subtitle: "Perde ve Jaluziye Son",
      desc: "Kumaş perde ve jaluziler gibi toz, mikrop veya akar tutmaz. Standart cam silme beziyle saniyeler içinde tertemiz olur.",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="avantajlar"
      className="py-20 bg-slate-50/80 relative border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 tracking-wider uppercase shadow-xs">
            <Check className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Neden MARBAR E-Ticaret?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            Güvenli, Hızlı ve Sorunsuz Alışveriş
          </h2>
          <p className="text-base text-slate-600">
            Aracıları ortadan kaldırarak doğrudan fabrikadan metrekare bazlı akıllı cam ve film siparişi vermenin ayrıcalığını yaşayın.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecomBenefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0B132B] group-hover:bg-[#0B132B] group-hover:text-white transition-all duration-300 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B132B] mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#0284c7] mb-2.5">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-medium text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                  <span>MARBAR Güvencesi</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import {
  Calculator,
  Building,
  Home,
  Briefcase,
  Hospital,
  Store,
  HelpCircle,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { formatArea } from "@/lib/utils";

export const GlassConfigurator: React.FC = () => {
  // Step 1: Kullanım Alanı
  const [spaceType, setSpaceType] = useState<string>("Ofis");

  // Step 2: Yaklaşık Ölçüler
  const [widthCm, setWidthCm] = useState<number>(200);
  const [heightCm, setHeightCm] = useState<number>(250);
  const [quantity, setQuantity] = useState<number>(1);

  // Step 3: Montaj Seçeneği
  const [installation, setInstallation] = useState<"product_only" | "installation_included">("installation_included");

  // Step 4: Müşteri İletişim Bilgileri
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("İstanbul");
  const [projectNote, setProjectNote] = useState<string>("");

  // Submission state
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Listen for custom event from UseCases cards
  useEffect(() => {
    const handleSelectSpace = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSpaceType(customEvent.detail);
      }
    };
    window.addEventListener("select-configurator-space", handleSelectSpace);
    return () =>
      window.removeEventListener("select-configurator-space", handleSelectSpace);
  }, []);

  // Calculate Square Meters: (Width cm * Height cm / 10000) * Quantity
  const totalM2 = Number(
    (((Math.max(1, widthCm) * Math.max(1, heightCm)) / 10000) * quantity).toFixed(2)
  );

  const spaceOptions = [
    { id: "Ev", label: "Ev / Konut", icon: Home },
    { id: "Ofis", label: "Ofis / Toplantı", icon: Briefcase },
    { id: "Otel", label: "Otel / Spa", icon: Building },
    { id: "Klinik", label: "Klinik / Sağlık", icon: Hospital },
    { id: "Mağaza", label: "Mağaza / Showroom", icon: Store },
    { id: "Diğer", label: "Diğer Özel Proje", icon: HelpCircle },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare message payload
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const getWhatsAppLeadText = () => {
    return encodeURIComponent(
      `*MARBAR Switchable Glass Fiyat Teklifi Talebi*\n\n` +
        `👤 *Ad Soyad:* ${name || "Belirtilmedi"}\n` +
        `📞 *Telefon:* ${phone || "Belirtilmedi"}\n` +
        `📧 *E-posta:* ${email || "Belirtilmedi"}\n` +
        `📍 *Şehir:* ${city || "Belirtilmedi"}\n` +
        `🏢 *Kullanım Alanı:* ${spaceType}\n` +
        `📐 *Ölçüler:* ${widthCm} cm × ${heightCm} cm\n` +
        `🔢 *Adet:* ${quantity} Adet\n` +
        `📏 *Tahmini Toplam Alan:* ${formatArea(totalM2)} m²\n` +
        `🔧 *Montaj Tercihi:* ${
          installation === "installation_included"
            ? "Montaj Dahil Teklif"
            : "Sadece Ürün"
        }\n` +
        `📝 *Proje Notu:* ${projectNote || "-"}\n\n` +
        `Bu proje için özel fiyat teklifi rica ediyorum.`
    );
  };

  const resetForm = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setEmail("");
    setProjectNote("");
  };

  return (
    <section
      id="teklif-al"
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-b border-slate-200/80"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Akıllı Proje Konfigüratörü</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Projenizi Oluşturun
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Mekanınızın yaklaşık ölçülerini ve tercihlerini belirleyin, mimari ekibimiz projenize özel net fiyatlandırmayı hazırlasın.
          </p>
        </div>

        {/* Configurator Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {submitted ? (
            /* Success View */
            <div className="p-8 sm:p-14 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-[#0B132B]">
                  Talebiniz Başarıyla Alındı
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sayın <strong>{name || "Ziyaretçimiz"}</strong>,{" "}
                  <strong>{formatArea(totalM2)} m²</strong> {spaceType} projenize ait teklif talebiniz kaydedildi. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
              </div>

              {/* Direct WhatsApp Instant Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${getWhatsAppLeadText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Teklifi WhatsApp’tan Anında Gönder</span>
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  Yeni Bir Proje Hesapla
                </button>
              </div>
            </div>
          ) : (
            /* Wizard Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
              
              {/* STEP 1: Kullanım Alanı */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0B132B] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-[#0B132B]">
                    Kullanım Alanı Seçin
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {spaceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = spaceType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSpaceType(opt.id)}
                        className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all duration-200 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-300"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? "text-sky-300" : "text-slate-500"}`} />
                        <span className="text-xs font-semibold">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Yaklaşık Ölçüler & Otomatik m² */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0B132B] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-[#0B132B]">
                    Yaklaşık Ölçüler ve Panel Adedi
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                  {/* Width Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Genişlik (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="20"
                        max="5000"
                        value={widthCm}
                        onChange={(e) => setWidthCm(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all"
                        placeholder="200"
                        required
                      />
                      <span className="absolute right-3.5 top-3.5 text-xs font-medium text-slate-400">
                        cm
                      </span>
                    </div>
                  </div>

                  {/* Height Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Yükseklik (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="20"
                        max="5000"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all"
                        placeholder="250"
                        required
                      />
                      <span className="absolute right-3.5 top-3.5 text-xs font-medium text-slate-400">
                        cm
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Panel Adedi
                    </label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-xs transition-all"
                        aria-label="Azalt"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Math.max(1, Number(e.target.value)))
                        }
                        className="w-full text-center bg-transparent text-sm font-bold text-slate-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-xs transition-all"
                        aria-label="Arttır"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* AUTOMATIC TOTAL AREA DISPLAY */}
                <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-5 h-5 text-[#0284c7]" />
                    <span className="text-xs font-medium text-slate-700">
                      Hesaplanan Toplam Cam Yüzeyi:
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-[#0B132B]">
                    Tahmini Toplam Alan:{" "}
                    <span className="text-[#0284c7]">{formatArea(totalM2)} m²</span>
                  </div>
                </div>
              </div>

              {/* STEP 3: Montaj */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0B132B] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-[#0B132B]">
                    Montaj ve Hizmet Tercihi
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setInstallation("installation_included")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      installation === "installation_included"
                        ? "bg-white border-[#0B132B] ring-2 ring-slate-300 shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        Montaj Dahil Teklif
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          installation === "installation_included"
                            ? "border-[#0B132B] bg-[#0B132B]"
                            : "border-slate-300"
                        }`}
                      >
                        {installation === "installation_included" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      MARBAR uzman teknik ekibi tarafından yerinde keşif, gizli kablolama ve anahtar teslim kurulum.
                    </p>
                  </div>

                  <div
                    onClick={() => setInstallation("product_only")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      installation === "product_only"
                        ? "bg-white border-[#0B132B] ring-2 ring-slate-300 shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        Sadece Ürün (Cam / Panel)
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          installation === "product_only"
                            ? "border-[#0B132B] bg-[#0B132B]"
                            : "border-slate-300"
                        }`}
                      >
                        {installation === "product_only" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Kendi doğrama/cephe uygulayıcınız veya taşeronunuz için özel ebatlarda fabrikasyon üretim ve teslimat.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 4: Müşteri İletişim Bilgileri */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0B132B] text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-lg font-bold text-[#0B132B]">
                    İletişim Bilgileriniz
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@sirket.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Şehir / Proje Lokasyonu *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="İstanbul, Ankara, İzmir vb."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Proje Notu / Özel İstekler (Opsiyonel)
                    </label>
                    <textarea
                      rows={3}
                      value={projectNote}
                      onChange={(e) => setProjectNote(e.target.value)}
                      placeholder="Mevcut doğramalar, kat yüksekliği veya otomasyon entegrasyonu hakkında notlarınız..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA & WhatsApp alternative */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 max-w-sm text-center sm:text-left">
                  Bilgilerinizi gönderin, projenize özel fiyatlandırma ve teknik detaylar için sizinle iletişime geçelim.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0B132B] text-white font-semibold text-sm hover:bg-[#1E293B] shadow-lg shadow-slate-900/10 transition-all"
                  >
                    {loading ? (
                      <span>Hazırlanıyor...</span>
                    ) : (
                      <>
                        <span>Fiyat Teklifi Al</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

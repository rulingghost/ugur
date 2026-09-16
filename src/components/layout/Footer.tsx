"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Mail, MapPin, CreditCard, Truck, Lock, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { LegalModal } from "@/components/ui/LegalModal";

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    title: string;
    type: "kvkk" | "gizlilik" | "sozlesme" | "cerez";
  }>({
    isOpen: false,
    title: "",
    type: "kvkk",
  });

  const openModal = (
    title: string,
    type: "kvkk" | "gizlilik" | "sozlesme" | "cerez"
  ) => {
    setLegalModal({ isOpen: true, title, type });
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, MARBAR Akıllı Cam m² sipariş hakkında bilgi almak istiyorum."
  )}`;

  return (
    <>
      <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-24 lg:pb-12 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="shrink-0">
                <Image
                  src="/marbar-logo.png"
                  alt="MARBAR"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>
              <p className="text-sm font-bold text-slate-900 tracking-tight">
                Metrekareye Özel Akıllı Cam ve Film E-Ticaret
              </p>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Özel milimetrik ölçülerinizle sipariş verebileceğiniz yeni nesil akıllı cam ve kendinden yapışkanlı akıllı film sistemleri. Kredi Kartı, Kapıda Ödeme ve Havale seçenekleriyle güvenli alışveriş.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-emerald-600 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-xs transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-pink-600 hover:text-pink-700 hover:border-pink-300 hover:shadow-xs transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                E-Ticaret Menüsü
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#modeller" className="hover:text-slate-900 transition-colors">
                    Ürünler & Fiyatlar
                  </a>
                </li>
                <li>
                  <a href="#siparis-ver" className="hover:text-slate-900 transition-colors font-semibold text-[#0284c7]">
                    m² Hesapla & Sipariş
                  </a>
                </li>
                <li>
                  <a href="#avantajlar" className="hover:text-slate-900 transition-colors">
                    Neden MARBAR?
                  </a>
                </li>
                <li>
                  <a href="#sss" className="hover:text-slate-900 transition-colors">
                    Sıkça Sorulanlar
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Consumer Rights */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Müşteri Hakları & Sözleşmeler
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => openModal("Mesafeli Satış Sözleşmesi", "sozlesme")}
                    className="hover:text-slate-900 transition-colors text-left"
                  >
                    Mesafeli Satış Sözleşmesi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("İptal, İade ve Değişim Koşulları", "sozlesme")}
                    className="hover:text-slate-900 transition-colors text-left"
                  >
                    İptal & İade Koşulları
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("KVKK ve Gizlilik Politikası", "kvkk")}
                    className="hover:text-slate-900 transition-colors text-left"
                  >
                    KVKK Aydınlatma Metni
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("Gizlilik ve Çerez Politikası", "gizlilik")}
                    className="hover:text-slate-900 transition-colors text-left"
                  >
                    Gizlilik & Çerez Politikası
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Contact & Support */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Sipariş & Destek Hattı
              </p>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{SITE_CONFIG.contact.whatsappDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.contact.city}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Payment Badges & Trust Banner */}
          <div className="py-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="font-bold text-slate-800">Güvenli Ödeme Seçenekleri:</span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 font-bold text-slate-700">
                💳 Kredi Kartı (9 Taksit)
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 font-bold text-slate-700">
                📦 Kapıda Ödeme (Nakit/Kart)
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 font-bold text-slate-700">
                🏦 Havale / EFT
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" /> 3D Secure
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Truck className="w-3.5 h-3.5 text-amber-600" /> Hızlı Kargo
              </span>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} MARBAR Akıllı Cam Teknolojileri. Tüm hakları saklıdır.</p>
            <p className="text-slate-400 text-center sm:text-right">
              Metrekare bazlı özel üretim akıllı cam ve film sistemleri.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Document Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal((prev) => ({ ...prev, isOpen: false }))}
        title={legalModal.title}
        type={legalModal.type}
      />
    </>
  );
};

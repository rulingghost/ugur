"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "kvkk" | "gizlilik" | "sozlesme" | "cerez";
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto text-sm text-slate-600 leading-relaxed space-y-4">
          {type === "kvkk" && (
            <>
              <p className="font-semibold text-slate-900">
                6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) Kapsamında Bilgilendirme
              </p>
              <p>
                MARBAR Akıllı Cam Teknolojileri olarak, web sitemiz üzerinden sunduğumuz teklif formu, WhatsApp iletişim kanalı ve etkileşimli konfigüratör aracılığıyla paylaştığınız kişisel verilerinizin güvenliğine büyük önem veriyoruz.
              </p>
              <p>
                <strong>İşlenen Veriler:</strong> Ad-soyad, telefon numarası, e-posta adresi, şehir ve talep edilen projenin ölçü / teknik not bilgileri.
              </p>
              <p>
                <strong>İşleme Amacı:</strong> Switchable Glass ürünlerimize dair fiyat teklifi hazırlamak, müşteri ilişkilerini yürütmek ve teknik keşif süreçlerini organize etmek amacıyla sınırlıdır.
              </p>
              <p>
                Kişisel verileriniz 6698 sayılı Kanun’un 5. ve 6. maddelerine uygun olarak korunmakta ve üçüncü şahıslarla pazarlama amacıyla asla paylaşılmamaktadır.
              </p>
            </>
          )}

          {type === "gizlilik" && (
            <>
              <p className="font-semibold text-slate-900">Gizlilik Politikası</p>
              <p>
                Bu gizlilik politikası, MARBAR web sitesini ziyaret eden kullanıcıların gizlilik haklarını korumak amacıyla hazırlanmıştır.
              </p>
              <p>
                Web sitemizi ziyaret ederken paylaştığınız iletişim bilgileri yalnızca talep ettiğiniz mimari akıllı cam çözümlerine ilişkin teklif sunumu ve operasyonel bilgilendirme için kullanılır.
              </p>
              <p>
                Sitemiz SSL güvenlik sertifikası ile korunmakta olup, ilettiğiniz veriler şifreli protokoller üzerinden işlenmektedir.
              </p>
            </>
          )}

          {type === "sozlesme" && (
            <>
              <p className="font-semibold text-slate-900">Mesafeli Satış ve Proje Sözleşmesi Esasları</p>
              <p>
                MARBAR Switchable Glass ürünleri, müşterinin beyan ettiği özel mimari ölçülere ve projenin teknik gereksinimlerine göre özel siparişle imal edilen niteliktedir.
              </p>
              <p>
                Teklif aşamasının ardından onaylanan projeler için karşılıklı teknik şartname ve imalat sözleşmesi imzalanarak üretime geçilir. Özel ölçü üretimlerde ilgili mevzuat uyarınca cayma hakkı istisnaları geçerlidir.
              </p>
            </>
          )}

          {type === "cerez" && (
            <>
              <p className="font-semibold text-slate-900">Çerez Politikası</p>
              <p>
                MARBAR, web sitesi deneyiminizi iyileştirmek, konfigüratör tercihlerinizi hatırlamak ve site performansını analiz etmek amacıyla temel teknik çerezler kullanmaktadır.
              </p>
              <p>
                Tarayıcı ayarlarınız üzerinden çerez tercihlerinizi dilediğiniz zaman değiştirebilir veya silebilirsiniz.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B132B] text-white text-sm font-medium rounded-xl hover:bg-[#1E293B] transition-colors"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};

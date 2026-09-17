"use client";

import React, { useState } from "react";
import {
  X,
  CreditCard,
  Truck,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Package,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BANK_ACCOUNTS } from "@/data/products";
import { SITE_CONFIG } from "@/data/config";
import { formatArea } from "@/lib/utils";
import { generateOrderNumber, submitSiteOrder } from "@/lib/orders";

type PaymentMethod = "cod" | "bank_transfer";

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    itemsCount,
    totalM2,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  // Form State: Customer Info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceType, setInvoiceType] = useState<"individual" | "corporate">("individual");
  const [taxNumber, setTaxNumber] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [orderNote, setOrderNote] = useState("");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  // UI Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [copiedIban, setCopiedIban] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban.replace(/\s/g, ""));
    setCopiedIban(iban);
    setTimeout(() => setCopiedIban(null), 2500);
  };

  const getCalculatedTotal = () => {
    if (paymentMethod === "cod") {
      return grandTotal + SITE_CONFIG.ecommerce.codFee;
    }
    return grandTotal;
  };

  const finalPayableTotal = getCalculatedTotal();

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payMethodName = paymentMethod === "cod" ? "Kapıda Ödeme" : "Havale / EFT";

    const generatedOrderNo = generateOrderNumber();
    const result = await submitSiteOrder({
      type: "order",
      orderNumber: generatedOrderNo,
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email,
        city,
        district,
        address,
        invoiceType,
        companyName: companyName.trim() || undefined,
        taxOffice: taxOffice.trim() || undefined,
        taxNumber: taxNumber.trim() || undefined,
      },
      items: cart.map((item) => ({
        name: item.productName,
        details: `${item.widthCm}×${item.heightCm} cm, ${formatArea(item.areaM2)} m²${
          item.selectedAccessories.length
            ? ` • ${item.selectedAccessories.map((acc) => acc.name).join(", ")}`
            : ""
        }`,
        quantity: item.quantity,
        total: item.itemTotal,
      })),
      paymentMethod: payMethodName,
      total: finalPayableTotal,
      note: orderNote.trim() || undefined,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      alert(result.error || "Sipariş iletilemedi. Lütfen tekrar deneyin veya WhatsApp üzerinden yazın.");
      return;
    }

    setOrderNumber(result.orderNumber);
    setOrderCompleted(true);
    clearCart();
  };

  const closeModal = () => {
    setIsCheckoutOpen(false);
    if (orderCompleted) {
      setOrderCompleted(false);
      setOrderNumber("");
    }
  };

  // WhatsApp confirmation text
  const getWhatsAppOrderConfirmationText = () => {
    const payMethodName = paymentMethod === "cod" ? "Kapıda Ödeme" : "Havale / EFT";

    return encodeURIComponent(
      `*MARBAR Akıllı Cam Sipariş Bildirimi*\n` +
        `📦 *Sipariş No:* ${orderNumber}\n` +
        `👤 *Müşteri:* ${fullName}\n` +
        `📞 *Telefon:* ${phone}\n` +
        `📍 *Teslimat İli:* ${city} / ${district}\n` +
        `💳 *Ödeme Yöntemi:* ${payMethodName}\n` +
        `💰 *Ödenecek Tutar:* ${finalPayableTotal.toLocaleString("tr-TR")} ₺\n\n` +
        `Siparişimle ilgili bilgi almak ve teyit etmek istiyorum.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B132B] text-white flex items-center justify-center text-xs font-bold">
              MB
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0B132B]">
                {orderCompleted ? "Siparişiniz Alındı" : "Güvenli Tek Sayfa Ödeme"}
              </h2>
              <p className="text-xs text-slate-500">
                {orderCompleted
                  ? "Siparişiniz başarıyla sisteme kaydedildi"
                  : "256-Bit SSL Korumalı Hızlı Sipariş Formu"}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {orderCompleted ? (
            /* ORDER SUCCESS VIEW */
            <div className="text-center py-6 sm:py-10 space-y-6 max-w-xl mx-auto">
              <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-mono font-bold tracking-wider">
                  Sipariş No: {orderNumber}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
                  Teşekkürler, Siparişiniz Alındı!
                </h3>
                <p className="text-sm text-slate-600">
                  Sayın <strong>{fullName}</strong>, siparişiniz başarıyla kaydedildi. Detaylar ve kargo takip bilgileri <strong>{phone}</strong> ve <strong>{email}</strong> adresinize iletilecektir.
                </p>
              </div>

              {/* Payment Specific Instructions */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between font-bold text-sm text-[#0B132B]">
                  <span>Ödeme Detayı:</span>
                  <span>{finalPayableTotal.toLocaleString("tr-TR")} ₺</span>
                </div>

                {paymentMethod === "cod" && (
                  <p className="text-slate-600 leading-relaxed">
                    Siparişiniz kapıda ödeme olarak kaydedilmiştir. Ürününüz özel korumalı ambalajında adresinize ulaştığında nakit veya kredi kartıyla ödeme yapabilirsiniz.
                  </p>
                )}

                {paymentMethod === "bank_transfer" && (
                  <div className="space-y-2 pt-1 border-t border-slate-200">
                    <p className="font-semibold text-slate-800">
                      Lütfen aşağıdaki banka hesabına <strong>{orderNumber}</strong> sipariş kodunu açıklama kısmına yazarak havale/EFT yapınız:
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#0B132B]">{BANK_ACCOUNTS[0].bankName}</div>
                        <div className="text-[11px] text-slate-600 font-sans">Alıcı: {BANK_ACCOUNTS[0].accountHolder}</div>
                        <span>{BANK_ACCOUNTS[0].iban}</span>
                      </div>
                      <button
                        onClick={() => handleCopyIban(BANK_ACCOUNTS[0].iban)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
                        title="Kopyala"
                      >
                        {copiedIban === BANK_ACCOUNTS[0].iban ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${getWhatsAppOrderConfirmationText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp'tan Siparişi Teyit Et</span>
                </a>

                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0B132B] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Tamam / Anasayfaya Dön
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleCompleteOrder} className="space-y-7">
              
              {/* Mini Order Summary Pill */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#0284c7]" />
                  <span className="font-semibold text-slate-800">
                    {itemsCount} Parça Cam ({formatArea(totalM2)} m²)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">Hızlı Kargo: <strong className="text-emerald-700 uppercase">Ücretsiz</strong></span>
                  <span className="text-sm font-extrabold text-[#0B132B]">
                    {finalPayableTotal.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              {/* 1. Teslimat & İletişim Bilgileri */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Truck className="w-4 h-4 text-[#0284c7]" />
                  <h3 className="text-sm font-bold text-[#0B132B] uppercase tracking-wider">
                    1. Teslimat & İletişim Bilgileri
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Telefon Numarası <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      E-posta Adresi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ahmet@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        İl <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        İlçe <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Kadıköy"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-700 mb-1">
                      Açık Teslimat Adresi (Hızlı Kargo Teslimatı İçin) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Mahalle, Cadde, Sokak, Bina No, Daire..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                {/* Fatura Türü Switch */}
                <div className="pt-1 flex items-center gap-4 text-xs">
                  <span className="font-semibold text-slate-700">Fatura Türü:</span>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="invoice"
                      checked={invoiceType === "individual"}
                      onChange={() => setInvoiceType("individual")}
                      className="text-[#0284c7] focus:ring-0"
                    />
                    <span>Bireysel Fatura</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="invoice"
                      checked={invoiceType === "corporate"}
                      onChange={() => setInvoiceType("corporate")}
                      className="text-[#0284c7] focus:ring-0"
                    />
                    <span>Kurumsal Şirket Faturası</span>
                  </label>
                </div>

                {invoiceType === "corporate" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div>
                      <label className="block text-slate-600 mb-1">Şirket Unvanı</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: ABC Mimarlık Ltd."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Vergi Dairesi</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Kadıköy V.D."
                        value={taxOffice}
                        onChange={(e) => setTaxOffice(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Vergi Numarası</label>
                      <input
                        type="text"
                        required
                        placeholder="10 Haneli VKN"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Ödeme Yöntemi Seçimi */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CreditCard className="w-4 h-4 text-[#0284c7]" />
                  <h3 className="text-sm font-bold text-[#0B132B] uppercase tracking-wider">
                    2. Ödeme Yöntemi Seçiniz
                  </h3>
                </div>

                {/* Method Selector Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#0284c7] bg-sky-50/40 ring-1 ring-[#0284c7]"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <Truck className={`w-5 h-5 ${paymentMethod === "cod" ? "text-[#0284c7]" : "text-slate-500"}`} />
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        Teslimatta
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B132B]">Kapıda Ödeme</h4>
                      <p className="text-[11px] text-slate-500">Nakit veya Kredi Kartı</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === "bank_transfer"
                        ? "border-[#0284c7] bg-sky-50/40 ring-1 ring-[#0284c7]"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <Building2 className={`w-5 h-5 ${paymentMethod === "bank_transfer" ? "text-[#0284c7]" : "text-slate-500"}`} />
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                        Anında İndirim
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B132B]">Havale / EFT</h4>
                      <p className="text-[11px] text-slate-500">Kurumsal Banka Hesabı</p>
                    </div>
                  </button>
                </div>

                {/* Payment Option 2: Cash On Delivery */}
                {paymentMethod === "cod" && (
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-900">Kapıda Güvenli Teslimat & Ödeme</h4>
                        <p className="text-slate-600 leading-relaxed mt-1">
                          Siparişiniz özel korumalı ambalajında kapınıza ulaştığında, kargo teslimat personeline <strong>Nakit</strong> veya <strong>Tüm Bankaların Kredi Kartları</strong> ile tek çekim şeklinde ödeme yapabilirsiniz.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-200/60 flex justify-between items-center font-medium text-amber-900">
                      <span>Kapıda Tahsilat Hizmet Bedeli:</span>
                      <span>+{SITE_CONFIG.ecommerce.codFee} ₺</span>
                    </div>
                  </div>
                )}

                {/* Payment Option 3: Bank Transfer / EFT */}
                {paymentMethod === "bank_transfer" && (
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-start gap-2 text-slate-600">
                      <Building2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                      <p>
                        Siparişinizi tamamladıktan sonra aşağıdaki İş Bankası hesabına havale/EFT yapabilirsiniz. Siparişiniz havale teyidinin ardından derhal kesim işlemine alınır.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      {BANK_ACCOUNTS.map((bank) => (
                        <div
                          key={bank.bankName}
                          className="p-3 bg-white rounded-xl border border-slate-200/90 flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-800 flex items-center gap-2">
                              <span>{bank.bankName}</span>
                              {bank.branch ? (
                                <span className="text-[10px] text-slate-400 font-normal">({bank.branch})</span>
                              ) : null}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Alıcı: <strong className="text-slate-700">{bank.accountHolder}</strong>
                            </div>
                            <div className="font-mono text-xs font-semibold text-[#0B132B] mt-1 tracking-wide">
                              {bank.iban}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyIban(bank.iban)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shrink-0"
                          >
                            {copiedIban === bank.iban ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Kopyalandı</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sipariş Notu */}
              <div className="text-xs">
                <label className="block font-medium text-slate-700 mb-1">
                  Sipariş / Özel Kesim Notu (Opsiyonel)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Kablo çıkışı sol üst köşeden olsun, teslimat saat 14:00'ten sonra yapılsın..."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              {/* Submit Button & Total */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Ödenecek Net Tutar</span>
                    <span className="text-2xl font-extrabold text-[#0B132B]">
                      {finalPayableTotal.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-[#0B132B] text-white font-semibold text-sm hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sipariş İşleniyor...</span>
                      </div>
                    ) : (
                      <>
                        <span>Siparişi Onayla & Satın Al</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 2 Yıl Üretici Garantisi
                  </span>
                  <span>•</span>
                  <span>Sigortalı Hızlı Kargo</span>
                  <span>•</span>
                  <span>Anında WhatsApp Teyidi</span>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Check,
  Truck,
  CreditCard,
  Ruler,
  Zap,
  Gift,
  ShieldCheck,
  Phone,
  User,
  MapPin,
  CheckCircle2,
  Lock,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Building2,
} from "lucide-react";
import { BESTSELLER_BUNDLES, GLASS_PRODUCTS, ACCESSORY_OPTIONS, BANK_ACCOUNTS, INSTALLMENT_OPTIONS, BestsellerBundle, AccessoryOption } from "@/data/products";
import { SITE_CONFIG } from "@/data/config";
import { formatArea } from "@/lib/utils";
import { generateOrderNumber, submitSiteOrder } from "@/lib/orders";

type OrderType = "bundle" | "custom";
type PaymentType = "cod" | "credit_card" | "bank_transfer" | "whatsapp";

export const OnePageOrderEngine: React.FC = () => {
  // Order selection state
  const [orderType, setOrderType] = useState<OrderType>("bundle");
  const [selectedBundle, setSelectedBundle] = useState<BestsellerBundle>(BESTSELLER_BUNDLES[0]);
  
  // Custom dimensions state
  const [customWidth, setCustomWidth] = useState<number>(120);
  const [customHeight, setCustomHeight] = useState<number>(200);

  // Selected accessories
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  // Customer checkout form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("cod");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [installment, setInstallment] = useState<number>(1);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [copiedIban, setCopiedIban] = useState<string | null>(null);

  // Calculations
  const customM2 = Number(((Math.max(10, customWidth) * Math.max(10, customHeight)) / 10000).toFixed(2));
  const customCalculatedM2 = Math.max(0.5, customM2);
  const customBasePrice = Math.round(customCalculatedM2 * GLASS_PRODUCTS[0].basePricePerM2);
  const customRegularPrice = Math.round(customCalculatedM2 * GLASS_PRODUCTS[0].regularPricePerM2);

  // Base item price depending on bundle or custom
  const currentBasePrice = orderType === "bundle" ? selectedBundle.salePrice : customBasePrice;
  const currentRegularPrice = orderType === "bundle" ? selectedBundle.regularPrice : customRegularPrice;
  
  // Accessories total
  const optionalAccessories = ACCESSORY_OPTIONS.filter((a) => a.id !== "power-remote-kit"); // Trafo is already included free!
  const accessoriesTotal = selectedAccessories.reduce((sum, id) => {
    const acc = optionalAccessories.find((a) => a.id === id);
    return sum + (acc ? acc.price : 0);
  }, 0);

  // Subtotal & Final
  const subtotal = currentBasePrice + accessoriesTotal;
  
  // Bank transfer has 5% discount
  const bankDiscount = paymentMethod === "bank_transfer" ? Math.round(subtotal * 0.05) : 0;
  
  // Card installment interest if any
  const installmentRate = paymentMethod === "credit_card" ? (INSTALLMENT_OPTIONS.find((i) => i.count === installment)?.rate || 0) : 0;
  const installmentInterest = Math.round((subtotal - bankDiscount) * installmentRate);

  const finalTotal = subtotal - bankDiscount + installmentInterest;
  const totalSavings = (currentRegularPrice - currentBasePrice) + bankDiscount;

  // Toggle Accessory
  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Card Formatters
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(raw.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban.replace(/\s/g, ""));
    setCopiedIban(iban);
    setTimeout(() => setCopiedIban(null), 2500);
  };

  const getPaymentMethodLabel = () => {
    if (paymentMethod === "credit_card") return `Kredi Kartı (${installment} Taksit)`;
    if (paymentMethod === "cod") return "Kapıda Ödeme";
    if (paymentMethod === "bank_transfer") return "Havale / EFT";
    return "WhatsApp Sipariş";
  };

  const getSelectedItemName = () =>
    orderType === "bundle"
      ? selectedBundle.name
      : `Özel Ölçü (${customWidth}x${customHeight} cm)`;

  const getSelectedItemDetails = () => {
    const accessories = optionalAccessories
      .filter((acc) => selectedAccessories.includes(acc.id))
      .map((acc) => acc.name)
      .join(", ");

    if (orderType === "bundle") {
      return `${selectedBundle.widthCm}×${selectedBundle.heightCm} cm${accessories ? ` • ${accessories}` : ""}`;
    }

    return `${customWidth}×${customHeight} cm, ${customCalculatedM2} m²${accessories ? ` • ${accessories}` : ""}`;
  };

  const triggerWhatsAppOrder = (orderNo: string) => {
    const text = `Merhaba! MARBAR Akıllı Film siparişi vermek istiyorum.%0A%0A📦 *Sipariş No:* ${orderNo}%0A📦 *Seçilen Paket:* ${getSelectedItemName()}%0A💰 *Tutar:* ${finalTotal.toLocaleString("tr-TR")} ₺%0A👤 *Ad Soyad:* ${fullName || "(Girilmedi)"}%0A📞 *Telefon:* ${phone || "(Girilmedi)"}%0A📍 *Şehir/Adres:* ${city} ${district} ${address || ""}%0A%0AOnaylamak için dönüşünüzü bekliyorum.`;
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${text}`, "_blank");
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      alert("Lütfen Ad Soyad ve Telefon bilgilerini doldurunuz.");
      return;
    }

    if (paymentMethod !== "whatsapp" && !address.trim()) {
      alert("Lütfen Ad Soyad, Telefon ve Teslimat Adresi bilgilerini doldurunuz.");
      return;
    }

    if (paymentMethod === "credit_card") {
      if (cardNumber.replace(/\s/g, "").length < 16 || cardExpiry.length < 5 || cardCvc.length < 3) {
        alert("Lütfen geçerli kart bilgilerinizi eksiksiz giriniz.");
        return;
      }
    }

    setIsSubmitting(true);
    const generatedId = generateOrderNumber();

    const result = await submitSiteOrder({
      type: "order",
      orderNumber: generatedId,
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        city,
        district,
        address,
      },
      items: [
        {
          name: getSelectedItemName(),
          details: getSelectedItemDetails(),
          quantity: 1,
          total: finalTotal,
        },
      ],
      paymentMethod: getPaymentMethodLabel(),
      total: finalTotal,
      note: orderNote.trim() || undefined,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      alert(result.error || "Sipariş iletilemedi. Lütfen WhatsApp üzerinden yazın veya tekrar deneyin.");
      return;
    }

    setOrderId(result.orderNumber);
    setOrderSuccess(true);

    if (paymentMethod === "whatsapp") {
      triggerWhatsAppOrder(result.orderNumber);
    }
  };

  return (
    <section
      id="siparis-alani"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative border-b border-slate-200 scroll-mt-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-red-600 animate-pulse" />
            <span>Tek Sayfada Hızlı Sipariş İstasyonu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight">
            Paketini Seç, Kapıda Ödemeyle Satın Al
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Sepet adımlarında kaybolmayın! En çok satan hazır paketlerimizden birini seçin veya özel ölçünüzü girip hemen siparişinizi tamamlayın.
          </p>
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {orderSuccess ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                Siparişiniz Alındı
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
                Tebrikler! Siparişiniz Başarıyla Oluşturuldu
              </h3>
              <p className="text-sm text-slate-600">
                Sipariş Numaranız: <strong className="text-slate-900 font-mono text-base">{orderId}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left text-xs sm:text-sm space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Alıcı:</span>
                <strong className="text-slate-900">{fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telefon:</span>
                <strong className="text-slate-900">{phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Teslimat Adresi:</span>
                <strong className="text-slate-900">{district} / {city}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ödeme Yöntemi:</span>
                <strong className="text-[#0284c7]">
                  {paymentMethod === "cod" ? "Kapıda Ödeme (Nakit / Kredi Kartı)" : paymentMethod === "credit_card" ? "Kredi Kartı (3D Secure)" : "Banka Havalesi / EFT"}
                </strong>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-base text-slate-900">
                <span>Ödenecek Tutar:</span>
                <span className="text-emerald-700">{finalTotal.toLocaleString("tr-TR")} ₺</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 text-left flex items-start gap-2.5">
              <Truck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <span>
                Ürününüz fabrikanızda milimetrik olarak kesilip özel korumalı ambalajında hızlı kargo ile 1-3 iş günü içinde kargoya verilecektir. Kargo takip kodunuz SMS ile iletilecektir.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerWhatsAppOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp'tan Teyit Et / Bilgi Al</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderSuccess(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Yeni Sipariş Oluştur
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left 7 Cols: Step 1 Package Selection + Step 2 Customer Address */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. SEÇİM: Paket mi Özel Ölçü mü? */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-[#0B132B] text-white flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <h3 className="text-lg font-bold text-[#0B132B]">
                        Ölçünüzü veya Paketinizi Seçin
                      </h3>
                    </div>

                    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setOrderType("bundle")}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          orderType === "bundle"
                            ? "bg-white text-[#0B132B] shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        🌟 Hazır Paketler
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType("custom")}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          orderType === "custom"
                            ? "bg-white text-[#0B132B] shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        📐 Özel Ölçü Gir
                      </button>
                    </div>
                  </div>

                  {/* HAZIR PAKETLER LİSTESİ */}
                  {orderType === "bundle" && (
                    <div className="space-y-3.5">
                      {BESTSELLER_BUNDLES.map((bundle) => {
                        const isSelected = selectedBundle.id === bundle.id;
                        return (
                          <div
                            key={bundle.id}
                            onClick={() => setSelectedBundle(bundle)}
                            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                              isSelected
                                ? "border-[#0284c7] bg-sky-50/40 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <div
                                className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "border-[#0284c7] bg-[#0284c7] text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-extrabold text-[#0B132B] text-base">
                                    {bundle.name}
                                  </h4>
                                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-red-100 text-red-700">
                                    {bundle.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  Ölçü: <strong className="text-slate-800 font-bold">{bundle.widthCm} × {bundle.heightCm} cm</strong> ({bundle.areaM2} m²) • {bundle.description}
                                </p>
                                <span className="inline-block mt-1 text-[11px] text-emerald-700 font-semibold">
                                  ✓ Tak-Çalıştır Trafo + RF Kumanda Dahil
                                </span>
                              </div>
                            </div>

                            <div className="text-left sm:text-right shrink-0 pl-8 sm:pl-0">
                              <span className="text-xs text-slate-400 line-through block">
                                {bundle.regularPrice.toLocaleString("tr-TR")} ₺
                              </span>
                              <span className="text-2xl font-black text-[#0B132B]">
                                {bundle.salePrice.toLocaleString("tr-TR")} ₺
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ÖZEL ÖLÇÜ GİRİŞİ */}
                  {orderType === "custom" && (
                    <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cam Genişliği (En - cm)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min={20}
                              max={400}
                              value={customWidth}
                              onChange={(e) => setCustomWidth(Math.max(1, Number(e.target.value)))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                            />
                            <span className="absolute right-3 top-3 text-xs font-bold text-slate-400">cm</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cam Yüksekliği (Boy - cm)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min={20}
                              max={600}
                              value={customHeight}
                              onChange={(e) => setCustomHeight(Math.max(1, Number(e.target.value)))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                            />
                            <span className="absolute right-3 top-3 text-xs font-bold text-slate-400">cm</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-600">
                          Hesaplanan Alan: <strong className="text-slate-900">{customCalculatedM2} m²</strong> ({GLASS_PRODUCTS[0].basePricePerM2.toLocaleString("tr-TR")} ₺/m²)
                        </span>
                        <div className="text-right">
                          <span className="text-slate-400 line-through mr-2">
                            {customRegularPrice.toLocaleString("tr-TR")} ₺
                          </span>
                          <span className="font-extrabold text-[#0B132B] text-base">
                            {customBasePrice.toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPSİYONEL EKSTRA DONANIMLAR */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-700 block mb-2.5">
                      İsteğe Bağlı Ek Donanımlar (Opsiyonel):
                    </span>
                    <div className="space-y-2">
                      {optionalAccessories.map((acc) => {
                        const isChecked = selectedAccessories.includes(acc.id);
                        return (
                          <div
                            key={acc.id}
                            onClick={() => toggleAccessory(acc.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                              isChecked
                                ? "bg-sky-50/50 border-sky-300 text-[#0B132B]"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/60"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border ${
                                  isChecked
                                    ? "bg-[#0284c7] border-[#0284c7] text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>
                              <div>
                                <strong className="font-bold text-slate-900">{acc.name}</strong>
                                <span className="text-[11px] text-slate-500 block">{acc.description}</span>
                              </div>
                            </div>
                            <span className="font-bold text-slate-900 shrink-0 ml-2">
                              +{acc.price.toLocaleString("tr-TR")} ₺
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* 2. TESLİMAT VE ADRES BİLGİLERİ FORMU */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                    <span className="w-7 h-7 rounded-xl bg-[#0B132B] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <h3 className="text-lg font-bold text-[#0B132B]">
                      Teslimat ve İletişim Bilgileri
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Burak Taşçı"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Telefon Numaranız (Kargo SMS İçin) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="05XX XXX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        İl (Şehir) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="İstanbul, Ankara, İzmir..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        İlçe *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Kadıköy, Çankaya, Karşıyaka..."
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Açık Teslimat Adresi (Hızlı Kargo Teslimatı İçin) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Mahalle, cadde, sokak, bina ve daire no..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0284c7] focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sipariş Notu (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Zili çalmayınız / Cam sağa açılır"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none"
                    />
                  </div>
                </div>

              </div>

              {/* Right 5 Cols: Payment Method & Live Order Summary & Big Button */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* PAYMENT SELECTION */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <span className="w-7 h-7 rounded-xl bg-[#0B132B] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <h3 className="text-base font-bold text-[#0B132B]">
                      Ödeme Yöntemini Seçin
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {/* OPTION 1: KAPIDA ÖDEME (STAR OF INSTAGRAM ADS) */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethod === "cod"
                          ? "border-emerald-500 bg-emerald-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "cod"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {paymentMethod === "cod" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-xs sm:text-sm font-extrabold text-slate-900">
                              📦 Kapıda Ödeme (Nakit / Kart)
                            </strong>
                            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                              En Kolay
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Kapınızda teslim alırken güvenle ödeyin.
                          </p>
                        </div>
                      </div>
                      <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                    </div>

                    {/* OPTION 2: KREDİ KARTI 9 TAKSİT */}
                    <div
                      onClick={() => setPaymentMethod("credit_card")}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethod === "credit_card"
                          ? "border-[#0284c7] bg-sky-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "credit_card"
                              ? "border-[#0284c7] bg-[#0284c7] text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {paymentMethod === "credit_card" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-xs sm:text-sm font-extrabold text-slate-900">
                              💳 Kredi Kartı / 9 Taksit
                            </strong>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            256-Bit SSL & 3D Secure Güvenli Ödeme.
                          </p>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-[#0284c7] shrink-0" />
                    </div>

                    {/* OPTION 3: HAVALE / EFT */}
                    <div
                      onClick={() => setPaymentMethod("bank_transfer")}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethod === "bank_transfer"
                          ? "border-indigo-500 bg-indigo-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "bank_transfer"
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {paymentMethod === "bank_transfer" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-xs sm:text-sm font-extrabold text-slate-900">
                              🏦 Havale / EFT
                            </strong>
                            <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                              %5 Ekstra İndirim
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Garanti, İş Bankası, Yapı Kredi hesaplarına havale.
                          </p>
                        </div>
                      </div>
                      <Building2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    </div>

                    {/* OPTION 4: WHATSAPP DIRECT */}
                    <div
                      onClick={() => setPaymentMethod("whatsapp")}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethod === "whatsapp"
                          ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "whatsapp"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {paymentMethod === "whatsapp" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-xs sm:text-sm font-extrabold text-emerald-800">
                              💬 WhatsApp ile Sipariş Ver
                            </strong>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Müşteri temsilcimizle 1 dakikada siparişinizi onaylayın.
                          </p>
                        </div>
                      </div>
                      <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 fill-current" />
                    </div>
                  </div>

                  {/* KREDİ KARTI ALANLARI (Sadece Kart Seçildiğinde) */}
                  {paymentMethod === "credit_card" && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in-50 duration-200">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Kart Üzerindeki İsim
                        </label>
                        <input
                          type="text"
                          placeholder="Ad Soyad"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Kart Numarası
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Son Kullanma (AA/YY)
                          </label>
                          <input
                            type="text"
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Güvenlik (CVC)
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Taksit Seçeneği
                        </label>
                        <select
                          value={installment}
                          onChange={(e) => setInstallment(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                        >
                          {INSTALLMENT_OPTIONS.map((opt) => (
                            <option key={opt.count} value={opt.count}>
                              {opt.count === 1 ? "Tek Çekim (Komisyonsuz)" : `${opt.count} Taksit`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* HAVALE BİLGİSİ (Sadece Havale Seçildiğinde) */}
                  {paymentMethod === "bank_transfer" && (
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs animate-in fade-in-50 duration-200">
                      <p className="text-[11px] text-indigo-700 font-semibold">
                        Sipariş onayından sonra aşağıdaki IBAN'a sipariş kodunuzla havale yapabilirsiniz:
                      </p>
                      <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200">
                        <div className="flex justify-between font-bold text-slate-900 mb-1">
                          <span>{BANK_ACCOUNTS[0].bankName}</span>
                          <span className="text-indigo-600">%5 İndirimli</span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-700 bg-white p-2 rounded border border-indigo-100 flex items-center justify-between">
                          <span>{BANK_ACCOUNTS[0].iban}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyIban(BANK_ACCOUNTS[0].iban)}
                            className="text-indigo-600 font-bold hover:underline"
                          >
                            {copiedIban === BANK_ACCOUNTS[0].iban ? "Kopyalandı!" : "Kopyala"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* SİPARİŞ ÖZETİ VE SATIN ALMA BUTONU */}
                <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="font-bold text-sm text-slate-200">Sipariş Özeti</h4>
                    <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {totalSavings.toLocaleString("tr-TR")} ₺ Kazanç
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>{orderType === "bundle" ? selectedBundle.name : `Özel Ölçü (${customWidth}×${customHeight} cm)`}:</span>
                      <span className="font-semibold text-white">{currentBasePrice.toLocaleString("tr-TR")} ₺</span>
                    </div>

                    {accessoriesTotal > 0 && (
                      <div className="flex justify-between">
                        <span>Ekstra Donanımlar:</span>
                        <span className="font-semibold text-white">+{accessoriesTotal.toLocaleString("tr-TR")} ₺</span>
                      </div>
                    )}

                    <div className="flex justify-between text-emerald-400">
                      <span>RF Kumanda & Trafo:</span>
                      <span className="font-bold">HEDİYE (0 ₺)</span>
                    </div>

                    <div className="flex justify-between text-emerald-400">
                      <span>Hızlı Kargo:</span>
                      <span className="font-bold">ÜCRETSİZ (0 ₺)</span>
                    </div>

                    {bankDiscount > 0 && (
                      <div className="flex justify-between text-indigo-300 font-semibold">
                        <span>Havale İndirimi (%5):</span>
                        <span>-{bankDiscount.toLocaleString("tr-TR")} ₺</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/15 pt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Toplam Tutar:</span>
                      <span className="text-[10px] text-slate-500">KDV Dahil • Ücretsiz Hızlı Kargo</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through block">
                        {currentRegularPrice.toLocaleString("tr-TR")} ₺
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        {finalTotal.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>

                  {/* HIGH-IMPACT CONVERSION BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Siparişiniz Hazırlanıyor...</span>
                      </div>
                    ) : paymentMethod === "whatsapp" ? (
                      <>
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>WhatsApp ile 1 Tıkta Sipariş Ver</span>
                      </>
                    ) : paymentMethod === "cod" ? (
                      <>
                        <Zap className="w-5 h-5 text-yellow-300 fill-current" />
                        <span>Siparişi Onayla (Kapıda Ödeme)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Güvenli Satın Al ({finalTotal.toLocaleString("tr-TR")} ₺)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      256-Bit SSL Güvenliği
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#0284c7]" />
                      2 Yıl Birebir Garanti
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </form>
        )}

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import {
  Calculator,
  Ruler,
  Layers,
  Sparkles,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { GLASS_PRODUCTS, ACCESSORY_OPTIONS, GlassProduct, AccessoryOption } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatArea } from "@/lib/utils";

export const GlassStore: React.FC = () => {
  const { addToCart, directBuy } = useCart();

  // Selected Product (Kendinden Yapışkanlı Akıllı Film)
  const [selectedProduct, setSelectedProduct] = useState<GlassProduct>(GLASS_PRODUCTS[0]);

  // Dimension inputs (in cm)
  const [widthCm, setWidthCm] = useState<number>(120);
  const [heightCm, setHeightCm] = useState<number>(220);
  const [quantity, setQuantity] = useState<number>(1);
  const [pieceName, setPieceName] = useState<string>("Bölme / Pencere 1");

  // Interactive preview state (clear vs privacy)
  const [previewMode, setPreviewMode] = useState<"clear" | "frosted">("clear");

  // Selected accessories
  const [selectedAccessories, setSelectedAccessories] = useState<AccessoryOption[]>([
    ACCESSORY_OPTIONS[0], // Power + Remote Kit default selected
  ]);

  // Quick preset sizes
  const presets = [
    { label: "Standart Kapı", w: 90, h: 210 },
    { label: "Ofis Bölmesi", w: 120, h: 240 },
    { label: "Geniş Cephe", w: 180, h: 260 },
    { label: "Banyo / Duş", w: 100, h: 200 },
  ];

  // Mathematical Area Calculations
  const rawAreaM2 = Number(((Math.max(1, widthCm) * Math.max(1, heightCm)) / 10000).toFixed(2));
  const billedSingleAreaM2 = Math.max(rawAreaM2, selectedProduct.minAreaM2);
  const totalBilledAreaM2 = Number((billedSingleAreaM2 * quantity).toFixed(2));

  // Cost calculations
  const singleGlassCost = billedSingleAreaM2 * selectedProduct.basePricePerM2;
  const singleAccessoriesCost = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
  const singleItemTotal = singleGlassCost + singleAccessoriesCost;

  const totalGlassCost = singleGlassCost * quantity;
  const totalAccessoriesCost = singleAccessoriesCost * quantity;
  const subtotal = totalGlassCost + totalAccessoriesCost;
  const kdv = Math.round(subtotal * 0.20);
  const grandTotal = subtotal + kdv;

  // Toggle Accessory
  const toggleAccessory = (acc: AccessoryOption) => {
    setSelectedAccessories((prev) => {
      const exists = prev.some((item) => item.id === acc.id);
      if (exists) {
        return prev.filter((item) => item.id !== acc.id);
      } else {
        return [...prev, acc];
      }
    });
  };

  // Build Cart Item
  const buildCurrentCartItem = () => ({
    productId: selectedProduct.id,
    productName: selectedProduct.name,
    widthCm,
    heightCm,
    areaM2: rawAreaM2,
    billedAreaM2: billedSingleAreaM2,
    unitPricePerM2: selectedProduct.basePricePerM2,
    glassSubtotal: totalGlassCost,
    selectedAccessories,
    accessoriesTotal: totalAccessoriesCost,
    itemTotal: grandTotal, // inclusive
    quantity,
    pieceName: pieceName || "Özel Kesim Cam",
  });

  const handleAddToCart = () => {
    addToCart(buildCurrentCartItem());
  };

  const handleDirectBuy = () => {
    directBuy(buildCurrentCartItem());
  };

  // Calculate dynamic aspect ratio for visual preview (clamped for UX)
  const aspectRatio = Math.min(2.2, Math.max(0.45, widthCm / heightCm));

  return (
    <section
      id="siparis-ver"
      className="py-20 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Metrekareye Özel Kesim & Sipariş</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Ölçünüzü Girin, Anında Satın Alın
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Proje veya aracı beklemeden, milimetrik ölçülerinizi belirleyip metrekare üzerinden doğrudan online sipariş oluşturabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Product Model & Dimension Inputs & Accessories */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Tek Ürün Bilgisi */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B132B] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                  Sipariş Edilen Ürün
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  ✓ Orijinal PDLC Film
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#0284c7] bg-sky-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white bg-[#0284c7] px-2 py-0.5 rounded-md uppercase">
                      Kendinden Yapışkanlı
                    </span>
                    <h4 className="text-base font-bold text-[#0B132B]">
                      {selectedProduct.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                    Mevcut cam doğramalarınızı kırmadan/sökmeden doğrudan cam yüzeyine uygulanan akıllı film. Tak-çalıştır trafo ve kablosuz uzaktan kumanda setiyle birlikte sevk edilir.
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
                  <span className="text-xs text-slate-400 block">m² Birim Fiyatı:</span>
                  <div className="flex sm:block items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0B132B]">
                      {selectedProduct.basePricePerM2.toLocaleString("tr-TR")} ₺
                    </span>
                    <span className="text-xs text-slate-400"> / m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Dimensions & Quantity */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B132B] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                  Ölçü ve Adet Bilgileri
                </span>

                {/* Preset Buttons */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 mr-1">Örnek:</span>
                  {presets.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setWidthCm(p.w);
                        setHeightCm(p.h);
                      }}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parça İsmi / Notu */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parça Tanımı / Kullanım Yeri (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={pieceName}
                  onChange={(e) => setPieceName(e.target.value)}
                  placeholder="Örn: Salon Cephesi, Toplantı Odası Camı..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              {/* Dimensions Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Width */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Genişlik (En)</label>
                    <span className="text-[11px] text-slate-400 font-mono">cm</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={20}
                      max={400}
                      value={widthCm}
                      onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 text-sm font-bold text-[#0B132B] rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284c7]"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold pointer-events-none">
                      cm
                    </span>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Yükseklik (Boy)</label>
                    <span className="text-[11px] text-slate-400 font-mono">cm</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={20}
                      max={400}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 text-sm font-bold text-[#0B132B] rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284c7]"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold pointer-events-none">
                      cm
                    </span>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Adet</label>
                    <span className="text-[11px] text-slate-400">Aynı Ölçüde</span>
                  </div>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full text-center text-sm font-bold text-[#0B132B] focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Live m² Indicator Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Ruler className="w-4 h-4 text-[#0284c7]" />
                  <span>Tek Parça Alanı: <strong>{formatArea(rawAreaM2)} m²</strong></span>
                  {rawAreaM2 < selectedProduct.minAreaM2 && (
                    <span className="text-[10px] text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded font-medium">
                      (Min. faturalandırılan alan 0.50 m²)
                    </span>
                  )}
                </div>

                <div className="font-bold text-[#0B132B]">
                  Toplam Kesim Alanı: <span className="text-[#0284c7] font-extrabold">{formatArea(totalBilledAreaM2)} m²</span>
                </div>
              </div>
            </div>

            {/* Step 3: Donanım ve Aksesuarlar */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B132B] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                  Kontrol ve Donanım Tercihleri
                </span>
                <span className="text-[11px] text-slate-400">İsteğe Bağlı Ekle / Çıkar</span>
              </div>

              <div className="space-y-2.5">
                {ACCESSORY_OPTIONS.map((acc) => {
                  const isChecked = selectedAccessories.some((a) => a.id === acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc)}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? "border-[#0284c7] bg-sky-50/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#0284c7] border-[#0284c7] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#0B132B]">{acc.name}</h5>
                          <p className="text-[11px] text-slate-500">{acc.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-[#0B132B]">
                          +{acc.price.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: Live Visualizer & Price Summary & Direct Checkout */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Visual Simulator Frame */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                  Canlı Cam Simülatörü
                </span>

                {/* State Toggle Buttons */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs">
                  <button
                    onClick={() => setPreviewMode("clear")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                      previewMode === "clear"
                        ? "bg-white text-[#0B132B] shadow-xs font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Eye className="w-3 h-3 text-[#0284c7]" />
                    <span>Şeffaf</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode("frosted")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                      previewMode === "frosted"
                        ? "bg-white text-[#0B132B] shadow-xs font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <EyeOff className="w-3 h-3 text-slate-700" />
                    <span>Opak (Gizlilik)</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Glass Frame Box */}
              <div className="relative w-full h-56 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-slate-800">
                {/* Background Modern Room */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')`,
                  }}
                />

                {/* Simulated Glass Panel with Dynamic Aspect Ratio */}
                <div
                  className="relative rounded-xl border-4 border-slate-800/90 shadow-2xl transition-all duration-500 flex flex-col justify-between p-3"
                  style={{
                    width: `${Math.min(90, Math.max(35, 60 * aspectRatio))}%`,
                    height: "85%",
                    backdropFilter: previewMode === "frosted" ? "blur(24px)" : "blur(0px)",
                    backgroundColor:
                      previewMode === "frosted"
                        ? "rgba(255, 255, 255, 0.88)"
                        : "rgba(255, 255, 255, 0.12)",
                  }}
                >
                  {/* Top Measurement Pill */}
                  <div className="self-center bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold tracking-wider">
                    {widthCm} cm
                  </div>

                  {/* Center Badge */}
                  <div className="self-center text-center">
                    <span
                      className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full ${
                        previewMode === "clear"
                          ? "bg-emerald-500/80 text-white"
                          : "bg-slate-800/80 text-white"
                      }`}
                    >
                      {previewMode === "clear" ? "Açık (Şeffaf)" : "Kapalı (Mahrem)"}
                    </span>
                  </div>

                  {/* Bottom Measurement */}
                  <div className="self-center bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold tracking-wider">
                    {heightCm} cm
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 px-1">
                <span>Ölçüye göre ölçeklenmiş önizleme</span>
                <span>Elektrik kesildiğinde otomatik opak kalır</span>
              </div>
            </div>

            {/* LIVE PRICE SUMMARY CARD */}
            <div className="bg-[#0B132B] text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
                  Sipariş Özeti & Fiyatlandırma
                </span>
                <h3 className="text-xl font-bold">Özel Ölçü Siparişi</h3>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs border-y border-slate-700/80 py-4 text-slate-300">
                <div className="flex justify-between items-center">
                  <span>
                    {selectedProduct.name} ({formatArea(totalBilledAreaM2)} m² × {selectedProduct.basePricePerM2.toLocaleString("tr-TR")} ₺)
                  </span>
                  <span className="font-semibold text-white">
                    {totalGlassCost.toLocaleString("tr-TR")} ₺
                  </span>
                </div>

                {totalAccessoriesCost > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Seçilen Donanımlar ({selectedAccessories.length} adet)</span>
                    <span className="font-semibold text-white">
                      +{totalAccessoriesCost.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-emerald-400 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Hızlı Kargo
                  </span>
                  <span className="font-bold uppercase tracking-wider text-[11px]">ÜCRETSİZ</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t border-slate-700/80 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Genel Toplam (KDV Dahil)</span>
                  <span className="text-[11px] text-slate-500">Hızlı Kargo Ücretsiz</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">
                    {grandTotal.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleDirectBuy}
                  className="w-full py-4 px-5 rounded-xl bg-[#0284c7] hover:bg-sky-600 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Hemen Satın Al ({grandTotal.toLocaleString("tr-TR")} ₺)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Sepete Ekle</span>
                </button>
              </div>

              {/* Trust Badges under Price */}
              <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Kapıda Ödeme</strong> • <strong>Havale</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Özel korumalı ambalajında hasara karşı %100 sigortalı teslimat.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

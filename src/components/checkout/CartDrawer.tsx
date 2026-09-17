"use client";

import React from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatArea } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    itemsCount,
    totalM2,
    subtotal,
    kdv,
    grandTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B132B] text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B132B]">Sipariş Sepetiniz</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {itemsCount} parça cam • Toplam {formatArea(totalM2)} m²
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Sepeti Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <Package className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-slate-800">Sepetiniz Boş</h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Özel ölçülerinizi belirleyip hemen sepetinize ekleyebilir veya doğrudan sipariş verebilirsiniz.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0B132B] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Ölçü Gir & Hesapla
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-[#0284c7] uppercase tracking-wider">
                        {item.pieceName || "Özel Kesim Parça"}
                      </span>
                      <h4 className="text-sm font-bold text-[#0B132B] leading-snug">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Ölçü: <strong className="text-slate-900">{item.widthCm} cm × {item.heightCm} cm</strong>
                        {" "}({formatArea(item.areaM2)} m²)
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Selected Accessories */}
                  {item.selectedAccessories.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                      <span className="font-semibold text-slate-700">Dahil Donanımlar:</span>
                      {item.selectedAccessories.map((acc) => (
                        <div key={acc.id} className="flex justify-between items-center text-slate-600">
                          <span>+ {acc.name}</span>
                          <span className="font-medium text-slate-800">{acc.price.toLocaleString("tr-TR")} ₺</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                        title="Azalt"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                        title="Artır"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#0B132B]">
                        {item.itemTotal.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Totals and Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-200/90 bg-slate-50/70 space-y-4">
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="font-medium text-slate-800">{subtotal.toLocaleString("tr-TR")} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>KDV (%20)</span>
                  <span className="font-medium text-slate-800">{kdv.toLocaleString("tr-TR")} ₺</span>
                </div>
                <div className="flex justify-between items-center text-emerald-700">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Sigortalı Hızlı Kargo
                  </div>
                  <span className="font-bold uppercase tracking-wider text-[11px]">ÜCRETSİZ</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#0B132B]">Genel Toplam</span>
                  <span className="text-xl font-extrabold text-[#0B132B]">
                    {grandTotal.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={openCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0B132B] text-white font-semibold text-sm hover:bg-slate-800 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.99]"
                >
                  <span>Siparişi Tamamla / Ödemeye Geç</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  Kapıda Ödeme • Havale/EFT
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

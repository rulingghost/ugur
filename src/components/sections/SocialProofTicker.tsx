"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, CheckCircle2, TrendingUp, Users, ShoppingBag } from "lucide-react";
import { LIVE_ORDERS_MOCK } from "@/data/reviews";
import { motion, AnimatePresence } from "framer-motion";

export const SocialProofTicker: React.FC = () => {
  const [currentOrderIdx, setCurrentOrderIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Rotate simulated live order toasts every 8 seconds
  useEffect(() => {
    // Initial delay before first toast
    const initialTimer = setTimeout(() => {
      setShowToast(true);
    }, 3500);

    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setCurrentOrderIdx((prev) => (prev + 1) % LIVE_ORDERS_MOCK.length);
        setShowToast(true);
      }, 800);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const activeOrder = LIVE_ORDERS_MOCK[currentOrderIdx];

  return (
    <>
      {/* Horizontal Trust Banner under Hero */}
      <div className="bg-white border-y border-slate-200/80 py-3 sm:py-4 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs sm:text-sm text-slate-700">
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-slate-900">4.9 / 5</span>
            <span className="text-slate-500 font-medium">(1.840+ Doğrulanmış Müşteri)</span>
          </div>

          {/* Social Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Bugün 48 Kişi Sipariş Verdi</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 font-medium text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
              <span>2 Yıl Birebir Üretici Değişim Garantisi</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sigortalı Hızlı Kargo Güvencesi</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Live Order Notification Popup (Bottom Left) */}
      <aside aria-label="Canlı Sipariş Bildirimleri">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 left-4 z-40 max-w-sm hidden sm:flex items-center gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 text-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-bold text-slate-900 truncate">{activeOrder.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{activeOrder.time}</span>
                </div>
                <p className="text-slate-600 text-[11px] truncate">
                  <strong className="text-[#0284c7]">{activeOrder.item}</strong> siparişi verdi.
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{activeOrder.city} • Kapıda Ödeme</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};

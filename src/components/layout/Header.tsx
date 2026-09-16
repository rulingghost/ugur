"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle, ShoppingBag, ArrowRight, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { UrgencyBar } from "@/components/layout/UrgencyBar";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemsCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, MARBAR kendinden yapışkanlı akıllı film m² siparişi hakkında bilgi almak istiyorum."
  )}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Top Urgency Bar */}
        <UrgencyBar />

        {/* Main Navbar */}
        <div
          className={cn(
            "w-full transition-all duration-300",
            isScrolled
              ? "glass-nav py-2 shadow-sm"
              : "bg-white/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-slate-100/80"
          )}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Identity - Bulletproof explicit dimensions */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 py-0.5">
            <Image
              src="/marbar-logo.png"
              alt="MARBAR"
              width={80}
              height={80}
              style={{ height: "68px", width: "auto" }}
              className="object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-[#0284c7] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions & Cart Trigger */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100/80 transition-all"
              title="WhatsApp Danışma Hattı"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-xs"
              aria-label="Sepet"
            >
              <ShoppingBag className="w-4 h-4 text-[#0284c7]" />
              <span>Sepetim</span>
              {itemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#0284c7] text-white text-[11px] font-bold flex items-center justify-center -mr-1">
                  {itemsCount}
                </span>
              )}
            </button>

            {/* CTA Order Now */}
            <a
              href="#siparis-alani"
              onClick={(e) => handleNavClick(e, "#siparis-alani")}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0B132B] rounded-xl hover:bg-slate-800 transition-all shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span>Sipariş Ver (Kapıda Ödeme)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl border border-slate-200 bg-white text-slate-800"
              aria-label="Sepetim"
            >
              <ShoppingBag className="w-5 h-5 text-[#0284c7]" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0284c7] text-white text-[10px] font-bold flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden pt-28 bg-white/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="px-6 py-6 flex flex-col justify-between h-[calc(100vh-7rem)]">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Menü
              </p>
              {SITE_CONFIG.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-base font-semibold text-slate-800 hover:text-[#0284c7] transition-colors py-2 border-b border-slate-100"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <a
                href="#siparis-alani"
                onClick={(e) => handleNavClick(e, "#siparis-alani")}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-[#0B132B] rounded-xl shadow"
              >
                <span>Hemen Sipariş Ver (Kapıda Ödeme)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Danışma Hattı</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

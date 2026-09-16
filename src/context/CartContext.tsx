"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AccessoryOption } from "@/data/products";
import { SITE_CONFIG } from "@/data/config";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  widthCm: number;
  heightCm: number;
  areaM2: number;
  billedAreaM2: number;
  unitPricePerM2: number;
  glassSubtotal: number;
  selectedAccessories: AccessoryOption[];
  accessoriesTotal: number;
  itemTotal: number;
  quantity: number;
  pieceName?: string;
}

interface CartContextType {
  cart: CartItem[];
  itemsCount: number;
  totalM2: number;
  subtotal: number;
  kdv: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  directBuy: (item: Omit<CartItem, "id">) => void;
  openCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("marbar_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("marbar_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, mounted]);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const directBuy = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            const singleGlassSubtotal = item.billedAreaM2 * item.unitPricePerM2;
            const singleAccTotal = item.selectedAccessories.reduce((acc, a) => acc + a.price, 0);
            return {
              ...item,
              quantity: newQty,
              glassSubtotal: singleGlassSubtotal * newQty,
              accessoriesTotal: singleAccTotal * newQty,
              itemTotal: (singleGlassSubtotal + singleAccTotal) * newQty,
            };
          }
          return item;
        })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Totals calculations
  const itemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalM2 = Number(cart.reduce((sum, i) => sum + i.areaM2 * i.quantity, 0).toFixed(2));
  const subtotal = cart.reduce((sum, i) => sum + i.itemTotal, 0);
  const kdv = Math.round(subtotal * SITE_CONFIG.ecommerce.kdvRate);
  const grandTotal = subtotal + kdv;

  return (
    <CartContext.Provider
      value={{
        cart,
        itemsCount,
        totalM2,
        subtotal,
        kdv,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        directBuy,
        openCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

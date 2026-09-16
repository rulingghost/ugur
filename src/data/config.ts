/**
 * MARBAR Brand & System Configuration
 * Tüm iletişim, WhatsApp ve e-ticaret ayarları buradan yönetilir.
 */
export const SITE_CONFIG = {
  name: "MARBAR",
  title: "MARBAR | Metrekareye Özel Kendinden Yapışkanlı Akıllı Film E-Ticaret",
  tagline: "Tek Dokunuşla Şeffaf. Tek Dokunuşla Mahrem.",
  description:
    "MARBAR Kendinden Yapışkanlı Akıllı Film ürününü metrekare bazlı özel ölçülerinizle hemen hesaplayın, Kredi Kartı (Taksit), Kapıda Ödeme veya Havale ile anında sipariş verin.",
  url: "https://marbarglass.com",

  // İletişim & WhatsApp Ayarları
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905355573961",
    whatsappDisplay: "+90 535 557 39 61",
    phone: "+90 535 557 39 61",
    email: "siparis@marbarglass.com",
    city: "İstanbul, Türkiye",
    instagramUrl: "https://instagram.com/marbarglass",
  },

  // E-Ticaret Ayarları
  ecommerce: {
    currency: "₺",
    currencyCode: "TRY",
    kdvRate: 0.20, // %20 KDV
    freeShippingThreshold: 5000,
    shippingCost: 0, // Tüm sevkiyatlar ücretsiz hızlı kargo ile yapılır
    codFee: 150, // Kapıda ödeme tahsilat hizmet bedeli (TL)
  },

  // Navigasyon Bağlantıları (Sade, Şık ve Net)
  navLinks: [
    { label: "Neden Akıllı Film?", href: "#avantajlar" },
    { label: "Nasıl Kurulur?", href: "#kurulum" },
    { label: "Müşteri Yorumları", href: "#yorumlar" },
    { label: "Paketler & Sipariş", href: "#siparis-alani" },
    { label: "Sıkça Sorulanlar", href: "#sss" },
  ],

  // Güven Vurguları
  trustPillars: [
    "Milimetrik Özel Kesim",
    "Sigortalı Hızlı Kargo",
    "Kredi Kartı / Kapıda Ödeme / Havale",
    "2 Yıl Birebir Değişim Garantisi",
  ],
};

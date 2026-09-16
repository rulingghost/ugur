import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/config";
import { FAQ_DATA } from "@/data/faq";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/checkout/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "MARBAR | Metrekareye Özel Akıllı Cam ve Film E-Ticaret",
  description:
    "MARBAR Akıllı Cam ve Kendinden Yapışkanlı Akıllı Film ürünlerini metrekare bazlı özel ölçülerinizle hemen hesaplayın, Kredi Kartı (Taksitli), Kapıda Ödeme veya Havale/EFT ile güvenle online satın alın.",
  keywords: [
    "switchable glass",
    "akıllı cam fiyatları",
    "akıllı cam metrekare fiyatı",
    "akıllı film satın al",
    "kendinden yapışkanlı akıllı film",
    "pdlc film satın al",
    "kapıda ödeme akıllı cam",
    "taksitli akıllı cam",
    "özel ölçü akıllı cam",
    "MARBAR",
  ],
  authors: [{ name: "MARBAR Smart Glass Technologies" }],
  creator: "MARBAR",
  publisher: "MARBAR",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_CONFIG.url,
    title: "MARBAR | Metrekareye Özel Akıllı Cam ve Film E-Ticaret",
    description:
      "Metrekare bazlı özel ölçü akıllı cam ve retrofit film siparişi. Kredi Kartı, Kapıda Ödeme, Havale seçenekleri.",
    siteName: "MARBAR",
    images: [
      {
        url: "/images/hero-transparent.jpg",
        width: 1200,
        height: 675,
        alt: "MARBAR Akıllı Cam E-Ticaret",
      },
    ],
  },
  icons: {
    icon: "/marbar-logo.png",
    shortcut: "/marbar-logo.png",
    apple: "/marbar-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: "MARBAR",
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/marbar-logo.png`,
        description: SITE_CONFIG.description,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: "TR",
          availableLanguage: ["Turkish", "English"],
        },
      },
      {
        "@type": "Product",
        "@id": `${SITE_CONFIG.url}/#product`,
        name: "MARBAR Switchable Glass & Film",
        image: `${SITE_CONFIG.url}/images/hero-transparent.jpg`,
        description: SITE_CONFIG.description,
        brand: {
          "@type": "Brand",
          name: "MARBAR",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "TRY",
          lowPrice: "3450",
          highPrice: "4850",
          offerCount: "2",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_CONFIG.url}/#faq`,
        mainEntity: FAQ_DATA.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0B132B]">
        <CartProvider>
          {children}
          <CartDrawer />
          <CheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}

export interface GlassProduct {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  basePricePerM2: number; // Kampanyalı m² birim fiyatı
  regularPricePerM2: number; // Çizili liste fiyatı
  badge?: string;
  features: string[];
  recommendedFor: string;
  minAreaM2: number;
}

export interface BestsellerBundle {
  id: string;
  name: string;
  subtitle: string;
  widthCm: number;
  heightCm: number;
  areaM2: number;
  regularPrice: number;
  salePrice: number;
  badge: string;
  popular?: boolean;
  image: string;
  description: string;
  includes: string[];
}

export interface AccessoryOption {
  id: string;
  name: string;
  price: number;
  description: string;
  defaultSelected?: boolean;
}

export interface BankAccount {
  bankName: string;
  accountHolder: string;
  iban: string;
  branch: string;
  logoColor: string;
}

export const GLASS_PRODUCTS: GlassProduct[] = [
  {
    id: "retrofit-smart-film",
    name: "MARBAR Kendinden Yapışkanlı Akıllı Film",
    shortDescription: "Mevcut camlarınızı sökmeden akıllı cama dönüştüren profesyonel film",
    description:
      "Mevcut cam doğramalarını veya cam kapıları değiştirmeden, doğrudan cam yüzeyine yapıştırılarak uygulanan yeni nesil akıllı PDLC film teknolojisi.",
    basePricePerM2: 2200,
    regularPricePerM2: 5300,
    badge: "Instagram'a Özel %58 İndirim",
    features: [
      "Mevcut camı sökmeden/kırmadan doğrudan uygulama",
      "Ultra ince, kristal berraklığında yüksek optik netlik",
      "Elektrik kesildiğinde otomatik mahremiyet (opak) modu",
      "Düşük enerji tüketimi (sadece 5W / m²)",
      "Kendinden yapışkanlı özel silikon optik katman",
      "%99 Zararlı UV ve yüksek güneş ışığı blokajı",
      "Uzaktan kumanda ve duvar anahtarı ile anında kontrol",
    ],
    recommendedFor: "Ofis bölmeleri, ev pencereleri, toplantı odaları, kış bahçeleri ve vitrinler",
    minAreaM2: 0.5,
  },
];

export const BESTSELLER_BUNDLES: BestsellerBundle[] = [
  {
    id: "bundle-shower",
    name: "Banyo & Duşakabin Seti",
    subtitle: "En Çok Tercih Edilen Ölçü",
    widthCm: 100,
    heightCm: 200,
    areaM2: 2.0,
    regularPrice: 10600,
    salePrice: 4400,
    badge: "EN ÇOK SATAN 🔥",
    popular: true,
    image: "/images/usecase-home.jpg",
    description: "Ebeveyn banyosu ve duş camları için hazır kesim. Su buharına ve neme %100 dayanıklı.",
    includes: [
      "100 × 200 cm Milimetrik Kesilmiş Akıllı Film",
      "220V Güvenlik Sigortalı Akıllı Trafo",
      "Hediye: 30m RF Kablosuz Kumanda",
      "Hediye: Montaj Spatulası & Solüsyonu",
      "Ücretsiz Hızlı Kargo",
    ],
  },
  {
    id: "bundle-door",
    name: "Standart Balkon & Kapı Seti",
    subtitle: "Cam Kapı ve Balkon Geçişleri",
    widthCm: 90,
    heightCm: 210,
    areaM2: 1.89,
    regularPrice: 9800,
    salePrice: 4158,
    badge: "POPÜLER SEÇİM",
    popular: false,
    image: "/images/usecase-clinic.jpg",
    description: "Fransız balkonlar, kış bahçesi kapıları ve salon geçişleri için tam milimetrik uyum.",
    includes: [
      "90 × 210 cm Milimetrik Kesilmiş Akıllı Film",
      "220V Güvenlik Sigortalı Akıllı Trafo",
      "Hediye: 30m RF Kablosuz Kumanda",
      "Hediye: Montaj Spatulası & Solüsyonu",
      "Ücretsiz Hızlı Kargo",
    ],
  },
  {
    id: "bundle-office",
    name: "Ofis & Salon Bölme Seti",
    subtitle: "Geniş Bölmeler ve Toplantı Odaları",
    widthCm: 120,
    heightCm: 240,
    areaM2: 2.88,
    regularPrice: 15200,
    salePrice: 6336,
    badge: "KURUMSAL FAVORİ",
    popular: false,
    image: "/images/usecase-office.jpg",
    description: "Yönetici odaları, toplantı salonları ve geniş mimari cam bölmeler için yüksek prestij.",
    includes: [
      "120 × 240 cm Milimetrik Kesilmiş Akıllı Film",
      "220V Güvenlik Sigortalı Akıllı Trafo",
      "Hediye: 30m RF Kablosuz Kumanda",
      "Hediye: Montaj Spatulası & Solüsyonu",
      "Ücretsiz Hızlı Kargo",
    ],
  },
];

export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  {
    id: "power-remote-kit",
    name: "Akıllı Güç Ünitesi & RF Uzaktan Kumanda",
    price: 1450,
    description: "Tak-çalıştır güvenlik sigortalı akıllı trafo ve 30m menzilli kablosuz kumanda seti.",
    defaultSelected: true,
  },
  {
    id: "wifi-smart-home",
    name: "WiFi & Tuya Akıllı Ev Entegrasyon Modülü",
    price: 850,
    description: "Cep telefonu uygulaması (iOS/Android), Siri ve Google Asistan ile sesli kontrol imkanı.",
    defaultSelected: false,
  },
  {
    id: "luxury-wall-switch",
    name: "Dokunmatik Temperli Cam Duvar Anahtarı",
    price: 650,
    description: "Şık siyah/beyaz cam panel, kablosuz veya sıva altı kullanım seçeneği.",
    defaultSelected: false,
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bankName: "İş Bankası",
    accountHolder: "Uğur Başaran",
    iban: "TR88 0006 4000 0014 3610 2593 20",
    branch: "",
    logoColor: "text-blue-700 bg-blue-50 border-blue-200",
  },
];

export const SALE_DISCOUNT_PERCENT = Math.round(
  (1 - GLASS_PRODUCTS[0].basePricePerM2 / GLASS_PRODUCTS[0].regularPricePerM2) * 100
);

export const INSTALLMENT_OPTIONS = [
  { count: 1, label: "Tek Çekim", rate: 0 },
  { count: 3, label: "3 Taksit", rate: 0.04 },
  { count: 6, label: "6 Taksit", rate: 0.08 },
  { count: 9, label: "9 Taksit", rate: 0.12 },
];

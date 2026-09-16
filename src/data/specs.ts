/**
 * MARBAR Switchable Glass - Teknik Özellikler ve Ürün Detayları
 * 
 * NOT: Firmanızın resmi test ve üretim verilerine göre köşeli parantezli
 * [TEKNİK DEĞER EKLENECEK] alanlarını güncelleyebilirsiniz.
 */

export interface ProductSpecItem {
  label: string;
  value: string;
  description?: string;
}

export interface ContentTab {
  id: string;
  label: string;
  content: {
    summary: string;
    highlights?: Array<{ title: string; desc: string }>;
    methods?: Array<{ title: string; desc: string }>;
    options?: Array<{ title: string; desc: string; note?: string }>;
  };
}

export interface SpecsTab {
  id: string;
  label: string;
  specs: ProductSpecItem[];
}

export type ProductTab = ContentTab | SpecsTab;

export const PRODUCT_DETAILS = {
  title: "MARBAR Switchable Glass",
  subtitle: "Yeni Nesil Akıllı Cam Teknolojileri",
  description:
    "MARBAR Switchable Glass, modern mimari projelerde şeffaflık ve mahremiyeti tek sistemde buluşturan akıllı cam çözümüdür. Elektrik akımı ile kontrol edilen PDLC katmanı sayesinde saniyeler içinde şeffaf durumdan tam mahremiyet sağlayan opak duruma geçer.",

  tabs: [
    {
      id: "genel-bakis",
      label: "Genel Bakış",
      content: {
        summary:
          "MARBAR Switchable Glass, geleneksel perde ve jaluzi sistemlerinin mimari kısıtlamalarını ortadan kaldırarak ferah, aydınlık ve anında mahremiyet sağlayan yenilikçi bir cam çözümüdür.",
        highlights: [
          {
            title: "Tek Dokunuşla Dönüşüm",
            desc: "Anahtar, kumanda veya bina otomasyonu üzerinden tek tıkla şeffaflıktan opaklığa anında geçiş.",
          },
          {
            title: "Doğal Gün Işığı Geçirgenliği",
            desc: "Opak (gizlilik) modundayken bile doğal gün ışığını mekanın derinliklerine yumuşak bir şekilde dağıtır.",
          },
          {
            title: "Özel Proje Bazlı Üretim",
            desc: "Mekanınızın ve doğramalarınızın milimetrik ölçülerine göre özel lamine veya çift cam konfigürasyonu.",
          },
        ],
      },
    } as ContentTab,
    {
      id: "teknik-ozellikler",
      label: "Teknik Özellikler",
      specs: [
        {
          label: "Çalışma Voltajı",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Sistem çalışma gerilimi (örn. 48V / 65V AC)",
        },
        {
          label: "Cam Kalınlığı",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Lamine veya ısıcam kompozisyonu (örn. 5+5 mm, 6+6 mm)",
        },
        {
          label: "Maksimum Ölçü",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Tek parça üretilebilir maksimum panel ebatları",
        },
        {
          label: "Geçiş Süresi",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Şeffaf ve opak modlar arası milisaniyelik reaksiyon süresi",
        },
        {
          label: "Güç Tüketimi",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "m² başına nominal enerji sarfiyatı (W/m²)",
        },
        {
          label: "Işık Geçirgenliği (Şeffaf Mod)",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Görünür ışık iletim yüzdesi (VLT %)",
        },
        {
          label: "Işık Geçirgenliği (Gizlilik Modu)",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Buzlu modda ışık dağılımı ve mahremiyet katsayısı",
        },
        {
          label: "UV Koruması",
          value: "[TEKNİK DEĞER EKLENECEK]",
          description: "Zararlı ultraviyole ışınlarını engelleme oranı (%)",
        },
      ],
    } as SpecsTab,
    {
      id: "uygulama",
      label: "Uygulama Alanları",
      content: {
        summary:
          "MARBAR Switchable Glass, iç mekan bölme duvarlarından dış cephe ve ıslak hacimlere kadar geniş bir mimari yelpazede güvenle uygulanır.",
        methods: [
          {
            title: "Lamine Akıllı Cam Çözümleri",
            desc: "İki cam katmanı arasına entegre edilmiş yüksek güvenlikli PDLC filmi ile iç mekan bölmelerinde ideal çözüm.",
          },
          {
            title: "Isıcam & Çift Cam Entegrasyonu",
            desc: "Dış cephe ve yalıtım gerektiren yüzeyler için termal konfor sağlayan akıllı ısıcam üniteleri.",
          },
          {
            title: "Gizli Kablolama ve Montaj",
            desc: "Alüminyum veya çelik doğrama profilleri içerisinden görünmez kablo geçişleri ile kusursuz mimari detay.",
          },
        ],
      },
    } as ContentTab,
    {
      id: "kontrol",
      label: "Kontrol Seçenekleri",
      content: {
        summary:
          "Kullanım alışkanlıklarınıza ve projenin teknik altyapısına uygun esnek kontrol donanımları.",
        options: [
          {
            title: "Standart Duvar Anahtarı",
            desc: "Mevcut aydınlatma anahtarlarınızla uyumlu klasik aç/kapa mekanizması.",
          },
          {
            title: "RF Uzaktan Kumanda",
            desc: "Mekan içerisinde kablosuz, çok kanallı bağımsız cam kontrolü.",
          },
          {
            title: "Akıllı Ev & Bina Otomasyonu (KNX / DALI vb.)",
            desc: "Merkezi otomasyon senaryolarına ve mobil uygulama entegrasyonuna tam uyumluluk.*",
            note: "*Uyumluluk projenizde kullanılacak otomasyon protokolüne göre mühendislik ekibimizce yapılandırılır.",
          },
        ],
      },
    } as ContentTab,
  ],
};

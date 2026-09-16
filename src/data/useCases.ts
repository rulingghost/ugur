export interface UseCaseItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  aspects: string[];
}

export const USE_CASES: UseCaseItem[] = [
  {
    id: "ofisler",
    category: "Kurumsal & Çalışma Alanları",
    title: "Ofisler",
    tagline: "Toplantı odalarında gerektiğinde açıklık, gerektiğinde gizlilik.",
    description:
      "Modern çalışma kültüründe açık ofisin ferahlığı ile toplantı ve yönetici odalarının mahremiyet ihtiyacını tek bir tuşla dengeler. Perde ve jaluzilerin getirdiği karmaşık görüntüyü ortadan kaldırır.",
    image: "/images/usecase-office.jpg",
    aspects: ["Yönetici Odaları", "Toplantı Salonları", "Bölme Duvarlar"],
  },
  {
    id: "evler",
    category: "Lüks Yaşam Alanları",
    title: "Evler",
    tagline: "Modern yaşam alanlarında perde ihtiyacını azaltan minimalist çözüm.",
    description:
      "Geniş cam cephelerde, salonlarda ve ebeveyn banyolarında perde ihtiyacını sıfırlayarak dış manzarayı ve gün ışığını engellemeden anında mahremiyet sağlar.",
    image: "/images/usecase-home.jpg",
    aspects: ["Geniş Cepheler", "Ebeveyn Banyoları", "Bahçe Geçişleri"],
  },
  {
    id: "oteller",
    category: "Konaklama & Ağırlama",
    title: "Oteller",
    tagline: "Banyo, spa ve özel alanlarda premium misafir deneyimi.",
    description:
      "Otel süitlerinde banyo ile yatak odası arasındaki sınırları kaldırarak mekan algısını ikiye katlar; misafir mahremiyet istediğinde saniyeler içinde opaklaşır.",
    image: "/images/usecase-hotel.jpg",
    aspects: ["Süit Odalar", "Banyo Bölmeleri", "Spa & Wellness"],
  },
  {
    id: "klinikler",
    category: "Sağlık & Estetik",
    title: "Klinikler",
    tagline: "Mahremiyet gerektiren alanlarda modern ve hijyenik çözüm.",
    description:
      "Toz ve mikrop tutan geleneksel perdelerin aksine, pürüzsüz cam yüzeyi sayesinde üstün hijyen sunar. Muayene ve operasyon anlarında anında gizlilik yaratır.",
    image: "/images/usecase-clinic.jpg",
    aspects: ["Muayenehaneler", "Diş Klinikleri", "Estetik Merkezleri"],
  },
  {
    id: "magazalar",
    category: "Ticari & Perakende",
    title: "Mağazalar",
    tagline: "Vitrin ve iç mekânlarda dinamik kullanım seçenekleri.",
    description:
      "Lüks butiklerde kabin bölmelerinden etkileyici vitrin lansmanlarına kadar dinamik bir görsel şov sunar. Saydam vitrin bir anda projeksiyon veya gizlilik yüzeyine dönüşür.",
    image: "/images/usecase-retail.jpg",
    aspects: ["Dinamik Vitrinler", "VIP Deneme Kabinleri", "Showroomlar"],
  },
  {
    id: "mimari-projeler",
    category: "Özel Mimari Tasarımlar",
    title: "Mimari Projeler",
    tagline: "Modern projelere entegre edilebilen geleceğin cam teknolojisi.",
    description:
      "Mimarlar ve iç mimarlar için sınırsız mekansal esneklik. Hem iç bölmelerde hem dış cephelerde projeye özel ebat ve konfigürasyonla üretilir.",
    image: "/images/usecase-architecture.jpg",
    aspects: ["Özel Villalar", "Akıllı Rezidanslar", "Konsept Yapılar"],
  },
];

export interface ComparisonItem {
  feature: string;
  marbar: {
    title: string;
    description: string;
    isAdvantage: boolean;
  };
  traditional: {
    title: string;
    description: string;
    isAdvantage: boolean;
  };
}

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: "Gizlilik Kontrolü",
    marbar: {
      title: "Milisaniyeler İçinde Dönüşüm",
      description: "Tek bir dokunuşla saydamlıktan tam gizlilik sağlayan opak moda geçer. Mekanik bekleme süresi yoktur.",
      isAdvantage: true,
    },
    traditional: {
      title: "Manuel / Mekanik Açma-Kapama",
      description: "Perde çekme veya motorlu storun aşağı inmesini bekleme gerektirir; yıpranabilir mekanik parçalara sahiptir.",
      isAdvantage: false,
    },
  },
  {
    feature: "Modern Görünüm & Estetik",
    marbar: {
      title: "Minimalist ve Akıcı Mimari",
      description: "Gereksiz kumaş, korniş veya stor kutusu olmadan camın saf şeffaflığını korur. Kesintisiz hatlar sunar.",
      isAdvantage: true,
    },
    traditional: {
      title: "Hacimli ve Parçalı Yapı",
      description: "Kumaş kıvrımları, jaluzi şeritleri ve tavan kutuları mekanın mimari bütünlüğünü böler.",
      isAdvantage: false,
    },
  },
  {
    feature: "Alan & Hacim Kullanımı",
    marbar: {
      title: "Sıfır Ekstra Alan Kaybı",
      description: "Doğrudan cam panelin kendi kalınlığında çalışır; mekanlarda santimetrelerce perde derinliği gerektirmez.",
      isAdvantage: true,
    },
    traditional: {
      title: "Ölü Alan ve Girinti İhtiyacı",
      description: "Perde payı ve ray montajı için en az 10-20 cm pencere önü alanı işgal edilir.",
      isAdvantage: false,
    },
  },
  {
    feature: "Temizlik & Hijyen",
    marbar: {
      title: "Ultra Kolay & Hijyenik Yüzey",
      description: "Standart cam temizleyicisi ile saniyeler içinde silinir; toz, alerjen veya mikrop barındırmaz.",
      isAdvantage: true,
    },
    traditional: {
      title: "Zorlu Bakım ve Toz Tutma",
      description: "Kumaş perdeler toz tutar, lekelenir, kuru temizleme veya stor mekanizması sökümü gerektirir.",
      isAdvantage: false,
    },
  },
  {
    feature: "Kontrol Esnekliği",
    marbar: {
      title: "Anahtar, Kumanda & Akıllı Ev",
      description: "Duvar anahtarı, RF kumanda veya KNX/bina otomasyon sistemlerine tam uyumlu olarak yönetilebilir.",
      isAdvantage: true,
    },
    traditional: {
      title: "Kısıtlı veya Motor Bağımlı",
      description: "Genellikle elle çekilir; motorlu modeller ise gürültülü ve ayrı servis gerektirebilir.",
      isAdvantage: false,
    },
  },
  {
    feature: "Mimari Entegrasyon",
    marbar: {
      title: "Projenin Doğal Bir Parçası",
      description: "İç bölmelerde, dış cephelerde ve ıslak hacimlerde mimariye entegre, çağdaş teknolojik çözüm.",
      isAdvantage: true,
    },
    traditional: {
      title: "Sonradan Eklenen Eklenti",
      description: "Tasarım tamamlandıktan sonra zorunlu olarak asılan, binanın kimliğine yabancı bir tekstil katmanı.",
      isAdvantage: false,
    },
  },
];

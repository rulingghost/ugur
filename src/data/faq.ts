export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "montaj" | "kargo_odeme" | "teknoloji";
  badge?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "montaj-kolayligi",
    question: "Montajı kendim yapabilir miyim, usta çağırmak gerekir mi?",
    answer:
      "Kesinlikle bir usta veya montaj ekibi gerekmez! Kendinden Yapışkanlı Akıllı Film ürünümüz özel silikon yapışkan tabana sahiptir; koruyucu filmi söküp camınıza sıvazlayarak 20-30 dakikada kolayca yapıştırabilirsiniz. Kutu içinde gelen Türkçe QR kodlu videolu montaj kılavuzumuz ve WhatsApp görüntülü destek hattımız kurulum boyunca yanınızdadır.",
    category: "montaj",
    badge: "En Çok Sorulan 🔥",
  },
  {
    id: "odeme-yontemleri",
    question: "Kapıda ödeme nasıl işliyor, teslimatta kredi kartı geçerli mi?",
    answer:
      "Sitemizden siparişinizi oluştururken 'Kapıda Ödeme' seçtiğinizde sizden hiçbir kredi kartı bilgisi istenmez. Ürününüz adresinize ulaştığında kargo görevlisine ister nakit, ister kredi kartı veya banka kartı ile güvenle ödeyebilirsiniz.",
    category: "kargo_odeme",
    badge: "Güvenli Ödeme",
  },
  {
    id: "kargo-paketleme",
    question: "Kargo süreci nasıl işler, kargoda hasar görme riski var mı?",
    answer:
      "Siparişleriniz milimetrik kesim ve elektriksel testlerden geçtikten sonra 1-3 iş günü içinde sigortalı Hızlı Kargo ile sevk edilir. Özel kalın korumalı ambalajında taşınır; olası bir taşıma hasarı durumunda anında sorgusuz sualsiz yenisi adresinize gönderilir.",
    category: "kargo_odeme",
    badge: "Hızlı Kargo 🚚",
  },
  {
    id: "banyo-nem-su",
    question: "Banyoda ve duşakabinde su buharından veya sudan etkilenir mi?",
    answer:
      "Hayır, kesinlikle etkilenmez! Akıllı filmlerimiz IPX7 standardında neme, buhara ve doğrudan su sıçramalarına tam dayanıklı polimerik sızdırmazlık katmanına sahiptir. Ebeveyn banyoları ve cam duşakabinler Türkiye genelinde en çok satış yaptığımız alanların başında gelir.",
    category: "teknoloji",
    badge: "Suya Dayanıklı",
  },
  {
    id: "elektrik-kesintisi",
    question: "Elektrik kesildiğinde veya sistem kapalıyken cam nasıl görünür?",
    answer:
      "Sistem güvenlik ve mahremiyet standartları gereği 'Normalde Opak' (Gizlilik modu) olarak tasarlanmıştır. Yani elektrik verilmediğinde veya kesinti olduğunda cam otomatik olarak buzlu/opak kalarak mahremiyetinizi daima korur. Kumandaya bastığınız anda 0.1 saniyede berrak şeffaflığa kavuşur.",
    category: "teknoloji",
  },
  {
    id: "elektrik-tuketimi",
    question: "Elektrik faturasına ne kadar yansır, dokunduğumda elektrik çarpar mı?",
    answer:
      "Metrekare başına sadece 5 Watt enerji tüketir; bu küçük bir LED gece lambasından bile daha azdır (aylık faturanıza 5-10 TL gibi önemsiz bir etkisi olur). Güç trafosu 220V şebeke elektriğini düşük güvenli voltaja dönüştürdüğü için film yüzeyine veya kabloya dokunulduğunda hiçbir elektrik çarpma tehlikesi yoktur.",
    category: "teknoloji",
    badge: "Düşük Enerji (5W)",
  },
  {
    id: "m2-hesaplama",
    question: "Metrekare (m²) ve ölçü hesabı nasıl yapılır?",
    answer:
      "Camınızın veya uygulanacak yüzeyin En (cm) ve Boy (cm) ölçülerini yukarıdaki sipariş alanına yazmanız yeterlidir. Sistem otomatik olarak metrekareyi (En × Boy / 10.000) ve net tutarı hesaplar. Veya duşakabin, kapı gibi standart alanlar için hazırladığımız indirimli hazır paketlerimizi tek tıkla seçebilirsiniz.",
    category: "kargo_odeme",
  },
  {
    id: "garanti-destek",
    question: "Garanti süresi ve teknik destek nasıldır?",
    answer:
      "Tüm MARBAR akıllı film panellerimiz ve elektrik güç ünitelerimiz 2 yıl resmi üretici garantisi altındadır. Kurulum öncesinde ve sonrasında WhatsApp teknik destek hattımız üzerinden görüntülü veya yazılı canlı destek alabilirsiniz.",
    category: "montaj",
    badge: "2 Yıl Birebir Garanti",
  },
];

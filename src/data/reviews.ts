export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  bundleBought: string;
  area: string;
  title: string;
  comment: string;
  verified: boolean;
  image?: string;
  avatarText?: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Burak T.",
    location: "Kadıköy, İstanbul",
    rating: 5,
    date: "3 gün önce",
    bundleBought: "Banyo & Duşakabin Seti (100x200 cm)",
    area: "Ebeveyn Banyosu",
    title: "Perde ve kireçli jaluzi derdinden kurtulduk!",
    comment:
      "Instagram'da videoyu görüp tereddütle sipariş vermiştim ama sonuç tek kelimeyle mükemmel! Montajını videoya bakarak eşimle 35 dakikada yaptık. Duş alırken tek tuşla buzlu oluyor, dışarıdan zerre görünmüyor. Su buharından kesinlikle etkilenmiyor. Hızlı kargoyla özel korumalı paketinde sapasağlam geldi, kapıda kartla ödedim.",
    verified: true,
    image: "/images/usecase-home.jpg",
    avatarText: "BT",
  },
  {
    id: "rev-2",
    name: "Av. Selin G.",
    location: "Çankaya, Ankara",
    rating: 5,
    date: "1 hafta önce",
    bundleBought: "Ofis & Salon Bölmesi Seti (120x240 cm)",
    area: "Hukuk Bürosu Toplantı Odası",
    title: "Müvekkillerim gördüğünde şaşırıp kalıyor",
    comment:
      "Hukuk büromuzun cam toplantı odası için 2 adet sipariş ettik. Jaluziler hem çok toz tutuyordu hem de eski duruyordu. Marbar akıllı filmi yapıştırdıktan sonra ofisin havası tamamen değişti. Kumandaya basınca anında şeffaf veya opak olması müthiş bir prestij sağladı. Teşekkürler!",
    verified: true,
    image: "/images/usecase-office.jpg",
    avatarText: "SG",
  },
  {
    id: "rev-3",
    name: "Murat & Derya K.",
    location: "Karşıyaka, İzmir",
    rating: 5,
    date: "2 hafta önce",
    bundleBought: "Standart Balkon & Kapı Seti (90x210 cm)",
    area: "Fransız Balkon Camı",
    title: "Gündüz deniz manzarası, gece %100 mahremiyet",
    comment:
      "Evimiz zemin kata yakın olduğu için akşamları perdeyi kapatmak zorunda kalıyorduk ve gündüzleri de manzara kayboluyordu. Artık gündüz tamamen şeffaf cam, akşam lamba yanınca tek tuşla buzlu cam yapıyoruz. Dışarıdan en ufak bir silüet dahi seçilmiyor. 9 taksitle aldık, çok memnunuz.",
    verified: true,
    image: "/images/usecase-clinic.jpg",
    avatarText: "MD",
  },
  {
    id: "rev-4",
    name: "Cemil S.",
    location: "Nilüfer, Bursa",
    rating: 5,
    date: "3 hafta önce",
    bundleBought: "Özel Milimetrik Kesim (145x230 cm)",
    area: "Kış Bahçesi Cephesi",
    title: "Kargolama inanılmaz, hızlı ve çok sağlam geldi",
    comment:
      "İnternetten cam filmi alırken kargoda kırılır veya katlanır diye çok korkmuştum. Hızlı kargoyla 2 günde geldi. Gelen paket özel korumalı, darbeye dayanıklı kalın ambalajlıydı. İçinde köpükler, trafosu, kumandası ve uygulama spatulası eksiksiz çıktı. WhatsApp destek hattı da montaj sırasında hemen görüntülü arayıp yardımcı oldu.",
    verified: true,
    image: "/images/usecase-architecture.jpg",
    avatarText: "CS",
  },
  {
    id: "rev-5",
    name: "Dr. Kaan V.",
    location: "Muratpaşa, Antalya",
    rating: 5,
    date: "1 ay önce",
    bundleBought: "Banyo & Duşakabin Seti (100x200 cm)",
    area: "Klinik Muayene Bölmesi",
    title: "Hijyenik ve modern, hastalar çok beğeniyor",
    comment:
      "Klinikte hastaları alırken perde hijyen açısından sıkıntı yaratıyordu. Marbar akıllı film silinebilir olduğu için dezenfekte etmesi çok kolay. Güneş ışığını kırmıyor ama içeriyi gizliyor.",
    verified: true,
    image: "/images/usecase-hotel.jpg",
    avatarText: "KV",
  },
];

export const LIVE_ORDERS_MOCK = [
  { name: "Ahmet K.", city: "Kadıköy / İstanbul", item: "Banyo & Duşakabin Seti", time: "4 dakika önce" },
  { name: "Selin Y.", city: "Çankaya / Ankara", item: "Standart Balkon Seti", time: "11 dakika önce" },
  { name: "Mustafa B.", city: "Nilüfer / Bursa", item: "Ofis Bölme Seti", time: "18 dakika önce" },
  { name: "Ece D.", city: "Karşıyaka / İzmir", item: "Banyo & Duşakabin Seti", time: "27 dakika önce" },
  { name: "Onur S.", city: "Muratpaşa / Antalya", item: "Özel Milimetrik Ölçü", time: "35 dakika önce" },
];

import { Coffee, MapPin, Sparkles, Sun } from "lucide-react";

export const HERO_IMAGE =
  "/assets/images/auth/luu-tru-nho-hien-nha_334da7fa.webp";
export const ROOM_IMAGE =
  "/assets/images/auth/luu-tru-nho-goc-phong_acb95aea.webp";
export const WINDOW_ART = "/assets/images/auth/luu-tru-nho-o-cua_d1bbcd4a.webp";
export const LOGO_IMAGE = "/assets/images/logo-stay-flow.png";
export const GALLERY_HIEN =
  "/assets/images/auth/luu-tru-nho-hien-nha_334da7fa.webp";
export const GALLERY_PHONG =
  "/assets/images/auth/luu-tru-nho-goc-phong_acb95aea.webp";
export const GALLERY_BREAKFAST =
  "/assets/images/auth/luu-tru-nho-o-cua_d1bbcd4a.webp";
export const GALLERY_GARDEN =
  "/assets/images/auth/luu-tru-nho-hien-nha_334da7fa.webp";

export const ZALO_URL = "https://zalo.me/0900000000";
export const FACEBOOK_URL = "https://m.me/luutrunnho.demo";
export const INSTAGRAM_URL = "https://instagram.com/luutrunnho.demo";
export const DEMO_ADDRESS = "88 Nguyễn Thái Học, Hội An, Quảng Nam";
export const DEMO_PHONE = "0900 000 000";
export const DEMO_EMAIL = "hello@luutrunnho.demo";
export const DEMO_HOURS = "08:00 – 21:00 mỗi ngày";
export const DEMO_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=15.8799,108.3278";

export interface RoomItem {
  name: string;
  type: string;
  price: string;
  description: string;
  image: string;
  featured: boolean;
}

export const rooms: RoomItem[] = [
  {
    name: "Phòng Mây",
    type: "Phòng đôi · Tầng 2",
    price: "840.000đ",
    description: "Ánh sáng hiền và một ban công nhìn về khoảng xanh.",
    image: ROOM_IMAGE,
    featured: true,
  },
  {
    name: "Phòng Nắng",
    type: "Phòng đôi · Tầng 1",
    price: "960.000đ",
    description: "Nắng sớm ghé qua cửa sổ, vừa đủ cho một ngày chậm.",
    image: HERO_IMAGE,
    featured: false,
  },
  {
    name: "Phòng Hiên",
    type: "Phòng đơn · Tầng 1",
    price: "460.000đ",
    description: "Một căn phòng nhỏ gọn cho những chuyến đi vừa đủ.",
    image: ROOM_IMAGE,
    featured: false,
  },
  {
    name: "Phòng Gió",
    type: "Phòng đôi · Tầng 2",
    price: "890.000đ",
    description: "Làn gió nhẹ thoáng mát qua từng ô cửa gỗ mở rộng.",
    image: HERO_IMAGE,
    featured: true,
  },
  {
    name: "Phòng Sen",
    type: "Phòng VIP · Tầng 3",
    price: "1.250.000đ",
    description: "Tầm nhìn bao quát toàn bộ khoảng sân vườn xanh mượt.",
    image: ROOM_IMAGE,
    featured: false,
  },
  {
    name: "Phòng Trăng",
    type: "Phòng đơn · Tầng 2",
    price: "520.000đ",
    description: "Góc phòng yên tĩnh thích hợp cho đọc sách và thư giãn.",
    image: HERO_IMAGE,
    featured: false,
  },
];

export const dayMoments = [
  {
    time: "07:30",
    title: "Mở cửa đón nắng",
    text: "Thức dậy cùng ánh sáng dịu, một ly cà phê và khoảng hiên còn yên.",
  },
  {
    time: "10:00",
    title: "Đi một vòng thật chậm",
    text: "Rời phòng khi muốn, ghé qua một góc phố, một hàng cây hay một quán quen.",
  },
  {
    time: "15:00",
    title: "Trở về nghỉ ngơi",
    text: "Nhận lại căn phòng gọn gàng, đặt túi xuống và để ngày trôi theo cách riêng.",
  },
  {
    time: "20:00",
    title: "Khép ngày bên hiên",
    text: "Một bữa tối nhẹ, một cuốn sách hoặc chỉ là ngồi yên nghe khu phố chậm lại.",
  },
];

export const nearbyRhythms = [
  {
    icon: Coffee,
    title: "Một quán cà phê gần nhà",
    text: "Tìm một chiếc bàn cạnh cửa sổ, gọi món mình thích và bắt đầu ngày không vội.",
  },
  {
    icon: MapPin,
    title: "Một vòng quanh khu phố",
    text: "Đi bộ theo những con đường nhỏ, nhìn ngắm nhịp sống địa phương và trở về trước khi mỏi chân.",
  },
  {
    icon: Sun,
    title: "Một buổi sáng ngoài hiên",
    text: "Không cần lịch trình dày. Chỉ cần một khoảng nắng để nhớ rằng mình đang đi nghỉ.",
  },
];

export interface DemoPlace {
  id: string;
  title: string;
  category: string;
  description: string;
  distance: string;
  lat: number;
  lng: number;
  accent: string;
}

export const demoPlaces: DemoPlace[] = [
  {
    id: "stay",
    title: "Lưu Trú Nhỏ · vị trí",
    category: "Homestay",
    description: "Điểm lưu trú minh họa tại Hội An",
    distance: "Điểm chính",
    lat: 15.8799,
    lng: 108.3278,
    accent: "#3a4a38",
  },
  {
    id: "old-town",
    title: "Phố cổ Hội An",
    category: "Di sản & dạo phố",
    description: "Những con đường nhỏ, mái ngói và nhịp sống ven sông.",
    distance: "≈ 5 phút",
    lat: 15.8777,
    lng: 108.3264,
    accent: "#8f5b3a",
  },
  {
    id: "chua-cau",
    title: "Chùa Cầu",
    category: "Biểu tượng địa phương",
    description: "Một điểm dừng để ngắm kiến trúc và ánh đèn khi phố lên đèn.",
    distance: "≈ 6 phút",
    lat: 15.877,
    lng: 108.3266,
    accent: "#a48d55",
  },
  {
    id: "market",
    title: "Chợ Hội An",
    category: "Ẩm thực & nhịp chợ",
    description: "Gợi ý cho một vòng khám phá món ăn và sản vật địa phương.",
    distance: "≈ 7 phút",
    lat: 15.8757,
    lng: 108.3283,
    accent: "#b5744e",
  },
  {
    id: "an-bang",
    title: "Biển An Bàng",
    category: "Biển & thư giãn",
    description:
      "Một lựa chọn cho buổi sáng muốn nhìn thấy nhiều khoảng trời hơn.",
    distance: "≈ 15 phút",
    lat: 15.9203,
    lng: 108.3496,
    accent: "#54776b",
  },
  {
    id: "tra-que",
    title: "Làng rau Trà Quế",
    category: "Trải nghiệm xanh",
    description: "Một gợi ý đi xa hơn một chút để chạm vào nhịp sống làm vườn.",
    distance: "≈ 18 phút",
    lat: 15.9156,
    lng: 108.3335,
    accent: "#6b855e",
  },
];

export const localGuide = [
  {
    image: GALLERY_GARDEN,
    label: "Gợi ý buổi sáng",
    title: "Chợ sáng địa phương",
    text: "Ghé qua một khu chợ gần nhà, chọn chút trái cây theo mùa và nhìn khu phố bắt đầu ngày mới.",
    icon: Sun,
  },
  {
    image: GALLERY_BREAKFAST,
    label: "Gợi ý thư thả",
    title: "Quán cà phê bên cửa sổ",
    text: "Tìm một góc có nắng, gọi ly cà phê và để một buổi sáng trôi qua không cần lịch trình.",
    icon: Coffee,
  },
  {
    image: GALLERY_HIEN,
    label: "Gợi ý khám phá",
    title: "Một vòng quanh khu phố",
    text: "Đi bộ chậm qua những con đường nhỏ, ghé một hàng cây và trở về khi vừa đủ mỏi chân.",
    icon: MapPin,
  },
  {
    image: GALLERY_PHONG,
    label: "Gợi ý buổi tối",
    title: "Bữa tối bản địa",
    text: "Hỏi chủ nhà về một món ăn quanh đây, rồi mang câu chuyện của khu phố về lại bên hiên.",
    icon: Sparkles,
  },
];

export const faqs = [
  {
    question: "Mình có thể xem phòng trống theo ngày không?",
    answer:
      "Có. Bạn chọn ngày nhận phòng, ngày trả phòng và số khách ở form tìm phòng. Yêu cầu sẽ được ghi nhận để kiểm tra căn phù hợp.",
  },
  {
    question: "Nếu chưa chắc lịch đi thì có thể hỏi trước không?",
    answer:
      "Được. Bạn có thể gửi ngày dự kiến hoặc nhắn một câu hỏi ngắn; đội ngũ sẽ cùng bạn xem phương án nhẹ nhàng nhất.",
  },
  {
    question: "Mỗi phòng có những tiện nghi gì?",
    answer:
      "Từng phòng có mô tả riêng về loại giường, sức chứa, ánh sáng và các tiện nghi đi kèm. Hãy mở phần Không gian để chọn góc hợp với mình.",
  },
  {
    question: "Mình muốn đổi ngày sau khi gửi yêu cầu thì sao?",
    answer:
      "Bạn chỉ cần gửi lại ngày mới trước khi xác nhận đặt phòng. Tình trạng phòng sẽ được kiểm tra lại theo lịch cập nhật.",
  },
];

export const galleryFilters = [
  "Tất cả",
  "Phòng ngủ",
  "Sân vườn",
  "Bữa ăn",
  "Hiên nhà",
] as const;

export type GalleryFilter = (typeof galleryFilters)[number];

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category: GalleryFilter;
  number: string;
  className: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: GALLERY_HIEN,
    alt: "Hiên nhà với ghế mây và cây xanh",
    caption: "Hiên nhà đón nắng",
    category: "Hiên nhà",
    number: "01",
    className: "sm:col-span-7 sm:row-span-2 rounded-2xl",
  },
  {
    src: GALLERY_PHONG,
    alt: "Chi tiết giường và ánh sáng trong phòng",
    caption: "Một góc phòng",
    category: "Phòng ngủ",
    number: "02",
    className: "sm:col-span-5 rounded-2xl",
  },
  {
    src: GALLERY_BREAKFAST,
    alt: "Bữa sáng bên cửa sổ",
    caption: "Bữa sáng chậm",
    category: "Bữa ăn",
    number: "03",
    className: "sm:col-span-5 rounded-2xl",
  },
  {
    src: GALLERY_GARDEN,
    alt: "Khoảng vườn nhỏ bên cửa sổ",
    caption: "Một khoảng xanh",
    category: "Sân vườn",
    number: "04",
    className: "sm:col-span-5 rounded-2xl",
  },
];

export function ScrollLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="transition-colors duration-200 hover:text-[#8f5b3a]"
    >
      {children}
    </a>
  );
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  desc: string;
  rating: number;
  date: string;
}

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    name: "Minh Anh & Đức Hoàng",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "Tháng 7, 2024",
    desc: "Căn phòng ngập tràn ánh nắng buổi sáng, không khí yên tĩnh lạ kỳ. Thích nhất cảm giác ngồi ở hiên uống trà chiều và nghe nhạc nhẹ. Chắc chắn chúng mình sẽ quay lại Lưu Trú Nhỏ vào mùa thu!",
  },
  {
    id: "rev-2",
    name: "Thanh Hằng",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "Tháng 8, 2024",
    desc: "Từ chiếc ly gốm đến mùi hương gỗ nhẹ nhàng trong phòng đều thể hiện sự chăm chút tỉ mỉ. Bữa sáng bánh mì giòn rụm giao tận phòng làm mình thấy vô cùng ấm áp.",
  },
  {
    id: "rev-3",
    name: "Quốc Bảo & Gia đình",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "Tháng 8, 2024",
    desc: "Khung cửa sổ nhìn ra khoảng sân vườn riêng siêu xinh. Các con nhà mình mê tít khoảng hiên ngập nắng. Một chuyến đi không vội vã, đúng nghĩa nghỉ ngơi.",
  },
];

export function formatBookingDate(value: string) {
  if (!value) return "Chưa chọn";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export type CategorySlug =
  | 'all'
  | 'fruits-vegetables'
  | 'dairy-eggs'
  | 'bakery'
  | 'meat-seafood'
  | 'pantry'
  | 'snacks'
  | 'beverages'
  | 'household'
  | 'offers';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  subtitle?: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  unit: string;
  category: string;
  categorySlug: Exclude<CategorySlug, 'all' | 'offers'>;
  pricePkr: number;
  originalPricePkr?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  origin: string;
  isDailyDeal?: boolean;
  isRecommended?: boolean;
  isBestSeller?: boolean;
  bestSellerRank?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface HeroSlide {
  id: string;
  kicker: string;
  headline: string;
  subtitle: string;
  ctaLabel: string;
  targetCategory: CategorySlug;
  image: string;
  badgeTop: string;
  badgeBottom: string;
  accentTone: 'mint' | 'cream' | 'sage';
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface CityOption {
  name: string;
  deliveryEta: string;
  hub: string;
}

export interface OrderReceipt {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'card';
  totalPkr: number;
  estimatedTime: string;
  createdAt: string;
}

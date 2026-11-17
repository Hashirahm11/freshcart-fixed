import React from 'react';
import { ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types/grocery';
import { ProductCard } from './ProductCard';
import { SafeImage } from './SafeImage';

interface RecommendedAndBestSellersProps {
  recommendedProducts: Product[];
  bestSellers: Product[];
  getCartQuantity: (productId: string) => number;
  isWishlisted: (productId: string) => boolean;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onViewAllRecommended: () => void;
  onViewAllBestSellers: () => void;
}

export const RecommendedAndBestSellers: React.FC<RecommendedAndBestSellersProps> = ({
  recommendedProducts,
  bestSellers,
  getCartQuantity,
  isWishlisted,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onQuickView,
  onViewAllRecommended,
  onViewAllBestSellers,
}) => {
  return (
    <section id="recommended" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Recommended for You */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D24] tracking-tight">
                Recommended for You
              </h2>
              <button
                type="button"
                onClick={onViewAllRecommended}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#197B30] hover:text-[#0F3D24] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                View All
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  compact
                  cartQuantity={getCartQuantity(product.id)}
                  isWishlisted={isWishlisted(product.id)}
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Best Sellers Compact Ranked List */}
          <aside className="lg:col-span-3 bg-[#F9FCF9] rounded-2xl border border-[#E5ECE6] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="font-display text-lg font-bold text-[#0F3D24]">
                Best Sellers
              </h2>
              <button
                type="button"
                onClick={onViewAllBestSellers}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#197B30] hover:text-[#0F3D24] transition-colors whitespace-nowrap cursor-pointer"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-[#E7EFE8]">
              {bestSellers.map((product, index) => {
                const qty = getCartQuantity(product.id);
                return (
                  <div
                    key={product.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#22993D] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {product.bestSellerRank || index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="w-12 h-12 rounded-lg bg-white border border-[#E5ECE6] overflow-hidden shrink-0 cursor-pointer"
                      aria-label={`Inspect ${product.name}`}
                    >
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="text-left block w-full cursor-pointer"
                      >
                        <h3 className="text-xs font-semibold text-[#102A1C] hover:text-[#197B30] truncate">
                          {product.name}
                        </h3>
                      </button>
                      <p className="text-[11px] text-[#5B7363]">{product.unit}</p>
                      <p className="text-xs font-bold text-[#0F3D24] tabular-nums mt-0.5">
                        Rs. {product.pricePkr.toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      aria-label={`Quick add ${product.name} to cart`}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        qty > 0
                          ? 'bg-[#E0F2E3] text-[#197B30] border border-[#22993D]'
                          : 'bg-[#22993D] hover:bg-[#197B30] text-white'
                      }`}
                    >
                      {qty > 0 ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

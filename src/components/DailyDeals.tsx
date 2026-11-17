import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, X, SearchX } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategorySlug, Product } from '../types/grocery';
import { ProductCard } from './ProductCard';

interface DailyDealsProps {
  products: Product[];
  activeCategory: CategorySlug;
  searchQuery: string;
  showAllCatalog: boolean;
  onToggleShowAll: () => void;
  onResetFilters: () => void;
  getCartQuantity: (productId: string) => number;
  isWishlisted: (productId: string) => boolean;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const DailyDeals: React.FC<DailyDealsProps> = ({
  products,
  activeCategory,
  searchQuery,
  showAllCatalog,
  onToggleShowAll,
  onResetFilters,
  getCartQuantity,
  isWishlisted,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onQuickView,
}) => {
  // 12 hours 34 minutes 56 seconds initial countdown matching reference
  const [secondsLeft, setSecondsLeft] = useState(12 * 3600 + 34 * 60 + 56);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 12 * 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  const isFiltered = activeCategory !== 'all' || searchQuery.trim().length > 0 || showAllCatalog;
  const categoryObj = CATEGORIES.find((c) => c.slug === activeCategory);

  const sectionHeading = searchQuery.trim()
    ? `Search Results for "${searchQuery.trim()}"`
    : activeCategory === 'offers'
      ? 'Special Offers & Savings'
      : categoryObj
        ? categoryObj.name
        : showAllCatalog
          ? 'All Fresh Groceries'
          : 'Daily Deals';

  return (
    <section id="daily-deals" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D24] tracking-tight">
              {sectionHeading}
            </h2>

            {/* Countdown Timer */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E0523C] text-white text-xs font-semibold tabular-nums shadow-xs"
              aria-label={`Daily deals end in ${pad(hours)} hours ${pad(minutes)} minutes ${pad(seconds)} seconds`}
            >
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Ends in</span>
              <span className="font-bold tracking-wider">
                {pad(hours)} : {pad(minutes)} : {pad(seconds)}
              </span>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A6354] hover:text-[#DC2626] px-2.5 py-1 rounded-md bg-[#F2F9F3] border border-[#DCE6DD] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Clear Filter
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleShowAll}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#197B30] hover:text-[#0F3D24] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {showAllCatalog ? 'Show Daily Deals' : 'View All'}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Product Grid or Empty State */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#E5ECE6] bg-[#F8FBF8] py-12 px-6 text-center">
            <SearchX className="w-10 h-10 text-[#6B8273] mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-[#0F3D24]">
              No matching groceries found
            </h3>
            <p className="text-sm text-[#4A6354] mt-1 max-w-md mx-auto">
              Try clearing your search or choosing a different grocery category to browse fresh daily deals.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQuantity={getCartQuantity(product.id)}
                isWishlisted={isWishlisted(product.id)}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

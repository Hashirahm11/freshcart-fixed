import React from 'react';
import { Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { Product } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  isWishlisted,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onQuickView,
  compact = false,
}) => {
  return (
    <article className="group bg-white rounded-xl border border-[#E5ECE6] hover:border-[#B6D7BC] hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative bg-[#FAFAFA] aspect-[4/3] overflow-hidden">
        {product.discountPercent && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#DC2626] text-white text-[11px] font-bold tabular-nums">
            -{product.discountPercent}%
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-[#FEF2F2] text-[#DC2626]'
              : 'bg-white/90 text-[#5B7363] hover:text-[#DC2626] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#DC2626]' : ''}`} />
        </button>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="w-full h-full block focus-visible:outline-none cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <SafeImage
            src={product.image}
            alt={`${product.name} (${product.unit})`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet unboxed metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#5B7363] truncate">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{product.unit}</span>
          </div>

          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="mt-1 text-left w-full focus-visible:outline-none cursor-pointer"
          >
            <h3
              className={`font-display font-semibold text-[#102A1C] group-hover:text-[#197B30] transition-colors leading-snug line-clamp-2 ${
                compact ? 'text-sm' : 'text-[15px]'
              }`}
            >
              {product.name}
            </h3>
          </button>

          {/* Rating & Reviews */}
          <div className="mt-1.5 flex items-center gap-1 text-xs text-[#4A6354] tabular-nums">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] shrink-0" aria-hidden="true" />
            <span className="font-semibold text-[#102A1C]">{product.rating.toFixed(1)}</span>
            <span className="text-[#6B8273]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing + Cart Action */}
        <div className="mt-3 pt-2.5 border-t border-[#F1F5F1]">
          <div className="flex items-baseline gap-2 tabular-nums mb-2.5">
            <span className="font-display text-base font-bold text-[#0F3D24]">
              Rs. {product.pricePkr.toLocaleString()}
            </span>
            {product.originalPricePkr && (
              <span className="text-xs text-[#7B9183] line-through">
                Rs. {product.originalPricePkr.toLocaleString()}
              </span>
            )}
          </div>

          {cartQuantity > 0 ? (
            <div className="flex items-center justify-between h-9 rounded-lg bg-[#F2F9F3] border border-[#22993D] px-1">
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-7 h-7 rounded-md flex items-center justify-center text-[#197B30] hover:bg-[#E0F2E3] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#0F3D24] tabular-nums">
                {cartQuantity} in cart
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-7 h-7 rounded-md flex items-center justify-center text-[#197B30] hover:bg-[#E0F2E3] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="w-full h-9 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

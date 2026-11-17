import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingCart, MapPin, Plus, Minus } from 'lucide-react';
import { Product } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface QuickViewModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onAddMultiple: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onAddMultiple,
  onToggleWishlist,
}) => {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Product details for ${product.name}`}
    >
      <div
        className="fixed inset-0 bg-[#092917]/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5ECE6] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-[#F2F9F3] border border-[#E5ECE6] flex items-center justify-center text-[#102A1C] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image */}
        <div className="relative bg-[#FAFAFA] aspect-[4/3] md:aspect-auto md:min-h-[340px]">
          {product.discountPercent && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-[#DC2626] text-white text-xs font-bold tabular-nums">
              -{product.discountPercent}% OFF
            </span>
          )}
          <SafeImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Details */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7363]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.unit}</span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D24] mt-1">
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#102A1C] tabular-nums">
                <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                {product.rating.toFixed(1)}
                <span className="text-[#5B7363] font-normal">({product.reviewCount} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#197B30] font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {product.origin}
              </span>
            </div>

            <p className="mt-4 text-sm text-[#3D5747] leading-relaxed">
              {product.description}
            </p>

            <div className="mt-5 flex items-baseline gap-2.5 tabular-nums">
              <span className="font-display text-2xl font-extrabold text-[#0F3D24]">
                Rs. {product.pricePkr.toLocaleString()}
              </span>
              {product.originalPricePkr && (
                <span className="text-sm text-[#7B9183] line-through">
                  Rs. {product.originalPricePkr.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5ECE6] flex items-center gap-3">
            {/* Quantity Picker */}
            <div className="flex items-center h-11 rounded-xl border border-[#DCE6DD] bg-[#F8FBF8]">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-full flex items-center justify-center text-[#102A1C] hover:bg-[#E0F2E3] rounded-l-xl cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-9 text-center text-sm font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-full flex items-center justify-center text-[#102A1C] hover:bg-[#E0F2E3] rounded-r-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddMultiple(product, qty);
                onClose();
              }}
              className="flex-1 h-11 rounded-xl bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]'
                  : 'border-[#DCE6DD] text-[#5B7363] hover:text-[#DC2626]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#DC2626]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

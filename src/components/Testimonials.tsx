import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import { SafeImage } from './SafeImage';

interface TestimonialsProps {
  onShowAllReviews: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onShowAllReviews }) => {
  return (
    <section id="reviews" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D24] tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs text-[#5B7363] mt-0.5">
              Sample customer reviews from across Pakistan
            </p>
          </div>
          <button
            type="button"
            onClick={onShowAllReviews}
            className="text-sm font-semibold text-[#197B30] hover:text-[#0F3D24] transition-colors whitespace-nowrap cursor-pointer"
          >
            View All Reviews →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex items-start gap-4 p-5 rounded-2xl bg-[#F9FCF9] border border-[#E5ECE6] shadow-[0_1px_4px_rgba(15,61,36,0.03)]"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-[#E0F2E3]">
                <SafeImage
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-0.5 mb-2" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#243E2E] leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-3 text-xs">
                  <span className="font-bold text-[#0F3D24]">{review.name}</span>
                  <span className="text-[#5B7363] mx-1.5" aria-hidden="true">·</span>
                  <span className="text-[#5B7363]">{review.city}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

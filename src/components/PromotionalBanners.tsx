import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROMO_BANNERS } from '../data/products';
import { CategorySlug } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface PromotionalBannersProps {
  onSelectCategory: (slug: CategorySlug) => void;
}

export const PromotionalBanners: React.FC<PromotionalBannersProps> = ({
  onSelectCategory,
}) => {
  const { seasonsBest, healthyChoices } = PROMO_BANNERS;

  return (
    <section aria-label="Seasonal promotions" className="pb-8 sm:pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Wide Banner: Season's Best */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-[#124927] text-white min-h-[210px] sm:min-h-[230px] shadow-sm group">
            <SafeImage
              src={seasonsBest.image}
              alt="Season's Best fresh vegetable basket"
              className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0F3D24]/95 via-[#124927]/80 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 h-full p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="max-w-xs sm:max-w-sm">
                <p className="text-sm sm:text-base font-medium text-[#D1FAE5]">
                  {seasonsBest.title}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5 text-balance">
                  {seasonsBest.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 mt-1.5">
                  {seasonsBest.caption}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectCategory(seasonsBest.targetCategory)}
                  className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-[#F2F9F3] text-[#0F3D24] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {seasonsBest.cta}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Circular Offer Callout */}
              <div className="hidden sm:flex w-24 h-24 rounded-full bg-[#FBBF24] text-[#0F3D24] flex-col items-center justify-center text-center shadow-md shrink-0 mr-4">
                <span className="text-[10px] font-bold uppercase tracking-wide">Up to</span>
                <span className="font-display text-2xl font-extrabold leading-none">30%</span>
                <span className="text-[11px] font-bold uppercase">Off</span>
              </div>
            </div>
          </div>

          {/* Right Banner: Healthy Choices */}
          <button
            type="button"
            onClick={() => onSelectCategory(healthyChoices.targetCategory)}
            className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-[#FCE3C7] text-left min-h-[210px] sm:min-h-[230px] shadow-sm group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22993D]"
          >
            <SafeImage
              src={healthyChoices.image}
              alt="Healthy Choices avocado and fresh oranges"
              className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#FCE3C7]/95 via-[#FCE3C7]/70 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-center max-w-[65%]">
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#7C2D12] leading-tight">
                {healthyChoices.title},
                <span className="block font-semibold text-[#9A3412] mt-0.5">
                  {healthyChoices.subtitle}
                </span>
              </h3>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#7C2D12] group-hover:translate-x-0.5 transition-transform">
                Explore Offers
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

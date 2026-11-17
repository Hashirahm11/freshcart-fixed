import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROMO_BANNERS } from '../data/products';
import { CategorySlug } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface ProduceBannersProps {
  onSelectCategory: (slug: CategorySlug) => void;
}

export const ProduceBanners: React.FC<ProduceBannersProps> = ({ onSelectCategory }) => {
  const { freshFruits, premiumVegetables } = PROMO_BANNERS;

  return (
    <section aria-label="Fresh produce promotions" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Fresh Fruits Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-[#D97706] text-white min-h-[190px] sm:min-h-[210px] shadow-sm group">
            <SafeImage
              src={freshFruits.image}
              alt="Fresh seasonal oranges, apples, strawberries, and grapes"
              className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#B45309]/95 via-[#D97706]/80 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 h-full p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="max-w-[230px]">
                <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
                  {freshFruits.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#FEF3C7] mt-0.5">
                  {freshFruits.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectCategory(freshFruits.targetCategory)}
                  className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-[#FFFBEB] text-[#92400E] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  {freshFruits.cta}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="hidden sm:flex w-22 h-22 rounded-full bg-[#FDE047] text-[#78350F] flex-col items-center justify-center text-center shadow-md shrink-0 mr-4">
                <span className="text-[9px] font-bold uppercase">Up to</span>
                <span className="font-display text-xl font-extrabold leading-none">25%</span>
                <span className="text-[10px] font-bold uppercase">Off</span>
              </div>
            </div>
          </div>

          {/* Premium Vegetables Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0F3D24] text-white min-h-[190px] sm:min-h-[210px] shadow-sm group">
            <SafeImage
              src={premiumVegetables.image}
              alt="Fresh broccoli, bell peppers, tomatoes, cucumber, and spinach"
              className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0F3D24]/95 via-[#0F3D24]/80 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 h-full p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="max-w-[240px]">
                <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
                  {premiumVegetables.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#BBF7D0] mt-0.5">
                  {premiumVegetables.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectCategory(premiumVegetables.targetCategory)}
                  className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-[#F2F9F3] text-[#0F3D24] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  {premiumVegetables.cta}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="hidden sm:flex w-22 h-22 rounded-full bg-[#FACC15] text-[#0F3D24] flex-col items-center justify-center text-center shadow-md shrink-0 mr-4">
                <span className="text-[9px] font-bold uppercase">Up to</span>
                <span className="font-display text-xl font-extrabold leading-none">30%</span>
                <span className="text-[10px] font-bold uppercase">Off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategorySlug } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface CategorySectionProps {
  activeCategory: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3D24] tracking-tight">
            Shop by Category
          </h2>
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#197B30] hover:text-[#0F3D24] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            View All
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.slug;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(isSelected ? 'all' : category.slug)}
                aria-pressed={isSelected}
                className="group flex flex-col items-center text-center focus-visible:outline-none cursor-pointer"
              >
                <div
                  className={`w-24 h-24 sm:w-26 sm:h-26 rounded-full p-1.5 transition-all duration-150 bg-[#F7FAF7] border-2 ${
                    isSelected
                      ? 'border-[#22993D] ring-4 ring-[#22993D]/15 shadow-sm'
                      : 'border-[#E6EFE7] group-hover:border-[#7AC489] group-hover:-translate-y-0.5 group-hover:shadow-sm'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>

                <span
                  className={`mt-2.5 text-xs sm:text-[13px] font-semibold leading-snug transition-colors ${
                    isSelected ? 'text-[#197B30]' : 'text-[#102A1C] group-hover:text-[#197B30]'
                  }`}
                >
                  {category.name}
                </span>
                {category.subtitle && (
                  <span className="text-[11px] text-[#5B7363] leading-tight">
                    {category.subtitle}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Tag, Truck } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { CategorySlug } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface HeroSliderProps {
  onShopNow: (targetCategory: CategorySlug) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopNow }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const bgGradient =
    currentSlide.accentTone === 'mint'
      ? 'from-[#F1F8F2] via-[#FAFDF9] to-[#E6F4E8]'
      : currentSlide.accentTone === 'cream'
        ? 'from-[#FBF8F1] via-[#FFFFFF] to-[#F1F8F2]'
        : 'from-[#EFF6F0] via-[#FFFFFF] to-[#E3F1E5]';

  return (
    <section
      aria-label="Featured grocery promotions"
      className="relative overflow-hidden bg-[#F4F9F4] border-b border-[#E5ECE6]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 sm:py-6">
        <div
          className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${bgGradient} border border-[#DDEADC] shadow-sm`}
        >
          {/* Full-bleed background visual on desktop right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[340px] sm:min-h-[390px]">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#197B30] mb-2">
                {currentSlide.kicker}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0F3D24] leading-[1.12] text-balance max-w-lg">
                {currentSlide.headline}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#3D5747] max-w-md leading-relaxed">
                {currentSlide.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onShopNow(currentSlide.targetCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {currentSlide.ctaLabel}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Three Benefits */}
              <div className="mt-7 pt-5 border-t border-[#DCE8DD] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-[#102A1C]">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4 text-[#22993D] shrink-0" aria-hidden="true" />
                  Fresh Quality
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Tag className="w-4 h-4 text-[#22993D] shrink-0" aria-hidden="true" />
                  Great Prices
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Truck className="w-4 h-4 text-[#22993D] shrink-0" aria-hidden="true" />
                  Fast Delivery
                </span>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
              <SafeImage
                src={currentSlide.image}
                alt={currentSlide.headline}
                loading="eager"
                className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
              />
              {/* Subtle left fade on desktop so image blends cleanly with copy */}
              <div
                className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAFDF9] to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Seal Badge inspired by FreshCart reference */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1B7F31] text-white shadow-md border-4 border-white/90 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#BBF7D0]">
                  {currentSlide.badgeTop}
                </span>
                <span className="text-xs sm:text-sm font-extrabold leading-tight mt-0.5">
                  {currentSlide.badgeBottom}
                </span>
              </div>
            </div>
          </div>

          {/* Slider Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous promotional slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0F3D24] border border-[#DCE6DD] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next promotional slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0F3D24] border border-[#DCE6DD] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Pagination Dots */}
          <div
            className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#DCE6DD]"
            role="tablist"
            aria-label="Hero slide pagination"
          >
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Slide ${idx + 1}: ${slide.headline}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-[#22993D]' : 'w-2 bg-[#B6CBB9] hover:bg-[#7CA784]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

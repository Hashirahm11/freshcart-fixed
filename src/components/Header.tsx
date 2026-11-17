import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  User,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Leaf,
  Tag,
} from 'lucide-react';
import { CITIES, NAV_LINKS } from '../data/products';
import { CategorySlug } from '../types/grocery';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  activeCategory: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  cartCount: number;
  wishlistCount: number;
  userName: string | null;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenTrackOrder: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  activeCategory,
  onSelectCategory,
  selectedCity,
  onSelectCity,
  cartCount,
  wishlistCount,
  userName,
  onOpenCart,
  onOpenAccount,
  onOpenTrackOrder,
  onOpenHelp,
}) => {
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setCityMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCityInfo = CITIES.find((c) => c.name === selectedCity) || CITIES[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5ECE6] shadow-[0_1px_8px_rgba(15,61,36,0.04)]">
      {/* Top Announcement Bar - desktop/tablet only to keep mobile sticky height compact */}
      <div className="hidden sm:block bg-[#197B30] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <Leaf className="w-3.5 h-3.5 text-[#A7F3B5] shrink-0" aria-hidden="true" />
            <span className="font-medium truncate">
              Fresh Food. Brighter Days! Free delivery on orders over Rs. 2,000
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-white/90">
            <button
              type="button"
              onClick={onOpenTrackOrder}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Track Order
            </button>
            <span aria-hidden="true" className="text-white/40">|</span>
            <button
              type="button"
              onClick={onOpenHelp}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Help
            </button>
            <span aria-hidden="true" className="text-white/40">|</span>
            <span className="font-semibold text-white whitespace-nowrap shrink-0">PKR</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22993D] rounded-lg"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F2F9F3] border border-[#D7EAD9] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#197B30]" aria-hidden="true" />
            </div>
            <div className="leading-none">
              <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#0F3D24] block">
                Fresh<span className="text-[#22993D]">Cart</span>
              </span>
              <span className="text-[11px] font-medium text-[#4A6354] hidden sm:block mt-0.5">
                Good Food. Happier You.
              </span>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="hidden md:flex flex-1 max-w-xl items-center"
            role="search"
            aria-label="Search grocery products"
          >
            <div className="relative flex w-full items-center">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for fruits, vegetables, milk, snacks..."
                className="w-full h-10 pl-4 pr-20 text-sm bg-[#F7FAF7] border border-[#DCE6DD] rounded-l-lg text-[#102A1C] placeholder:text-[#6B8273] focus:outline-none focus:bg-white focus:border-[#22993D] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2 text-[#6B8273] hover:text-[#102A1C] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              aria-label="Search products"
              className="h-10 px-4 bg-[#22993D] hover:bg-[#1A7D30] text-white rounded-r-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Controls: Location, Account/Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Location Selector */}
            <div className="relative hidden lg:block" ref={cityRef}>
              <button
                type="button"
                onClick={() => setCityMenuOpen((prev) => !prev)}
                aria-expanded={cityMenuOpen}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#F2F9F3] transition-colors text-left cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#22993D] shrink-0" aria-hidden="true" />
                <div className="leading-tight">
                  <span className="block text-[11px] text-[#5B7363]">Location</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#102A1C] whitespace-nowrap">
                    {selectedCity}
                    <ChevronDown className="w-3.5 h-3.5 text-[#5B7363]" />
                  </span>
                </div>
              </button>

              {cityMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-[#DCE6DD] shadow-lg py-2 z-50">
                  <div className="px-3.5 py-1.5 text-xs font-semibold text-[#4A6354] border-b border-[#EEF3EE]">
                    Delivery City ({currentCityInfo.deliveryEta})
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => {
                        onSelectCity(city.name);
                        setCityMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left flex items-center justify-between text-sm hover:bg-[#F2F9F3] transition-colors cursor-pointer ${
                        city.name === selectedCity ? 'bg-[#F2F9F3] font-semibold text-[#197B30]' : 'text-[#102A1C]'
                      }`}
                    >
                      <span>{city.name}</span>
                      <span className="text-xs text-[#5B7363] tabular-nums">{city.deliveryEta}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account & Wishlist */}
            <button
              type="button"
              onClick={onOpenAccount}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#F2F9F3] transition-colors text-left cursor-pointer relative"
              aria-label="Account and saved wishlist"
            >
              <div className="relative">
                <User className="w-5 h-5 text-[#102A1C]" aria-hidden="true" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="block text-[11px] text-[#5B7363]">
                  {userName ? 'Account' : 'Account'}
                </span>
                <span className="text-xs font-semibold text-[#102A1C] whitespace-nowrap flex items-center gap-1">
                  {userName ? userName.split(' ')[0] : 'Sign In'}
                  {wishlistCount > 0 && (
                    <Heart className="w-3 h-3 text-[#DC2626] fill-[#DC2626]" aria-hidden="true" />
                  )}
                </span>
              </div>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F2F9F3] hover:bg-[#E0F2E3] border border-[#D7EAD9] text-[#0F3D24] transition-colors cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#197B30]" aria-hidden="true" />
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#22993D] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">Cart</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg border border-[#DCE6DD] text-[#102A1C] hover:bg-[#F2F9F3] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Category Navigation Bar */}
      <nav
        aria-label="Primary grocery categories"
        className="hidden md:block border-t border-[#EEF3EE] bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-11 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {NAV_LINKS.filter((l) => !l.isOffer).map((link) => {
              const isActive = activeCategory === link.slug;
              return (
                <button
                  key={link.slug}
                  type="button"
                  onClick={() => onSelectCategory(link.slug)}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 py-2.5 border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'border-[#22993D] text-[#197B30] font-semibold'
                      : 'border-transparent text-[#344E3D] hover:text-[#197B30]'
                  }`}
                >
                  {link.slug === 'all' && (
                    <Menu className="w-4 h-4 inline-block mr-1.5 -mt-0.5 text-[#197B30]" aria-hidden="true" />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory('offers')}
            className={`flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap shrink-0 px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeCategory === 'offers'
                ? 'bg-[#DC2626] text-white'
                : 'text-[#DC2626] hover:bg-[#FEF2F2]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" aria-hidden="true" />
            Offers
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu & Search */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EEF3EE] bg-white px-4 py-3 space-y-3 shadow-md">
          <form onSubmit={handleFormSubmit} className="flex items-center">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search fruits, milk, bread..."
              className="flex-1 h-10 px-3.5 text-sm bg-[#F7FAF7] border border-[#DCE6DD] rounded-l-lg text-[#102A1C] focus:outline-none focus:border-[#22993D]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="h-10 px-4 bg-[#22993D] text-white rounded-r-lg"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-[#4A6354] bg-[#F7FAF7] px-3 py-2 rounded-lg">
            <span className="flex items-center gap-1.5 font-medium text-[#102A1C]">
              <MapPin className="w-3.5 h-3.5 text-[#22993D]" /> Delivery to:
            </span>
            <select
              aria-label="Select delivery city"
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              className="bg-transparent font-semibold text-[#197B30] focus:outline-none"
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.deliveryEta})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.slug}
                type="button"
                onClick={() => {
                  onSelectCategory(link.slug);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === link.slug
                    ? 'bg-[#22993D] text-white'
                    : link.isOffer
                      ? 'bg-[#FEF2F2] text-[#DC2626] font-semibold'
                      : 'bg-[#F7FAF7] text-[#102A1C] hover:bg-[#E0F2E3]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#EEF3EE] text-xs text-[#4A6354]">
            <button type="button" onClick={() => { onOpenTrackOrder(); setMobileMenuOpen(false); }} className="font-medium hover:text-[#197B30]">
              Track Order
            </button>
            <button type="button" onClick={() => { onOpenHelp(); setMobileMenuOpen(false); }} className="font-medium hover:text-[#197B30]">
              Help & Support
            </button>
            <span className="font-semibold text-[#0F3D24]">PKR</span>
          </div>
        </div>
      )}
    </header>
  );
};

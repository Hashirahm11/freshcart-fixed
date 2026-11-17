import React from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { CategorySlug } from '../types/grocery';

interface FooterProps {
  onSelectCategory: (slug: CategorySlug) => void;
  onOpenTrackOrder: () => void;
  onOpenHelp: () => void;
  onShowNotice: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTrackOrder,
  onOpenHelp,
  onShowNotice,
}) => {
  return (
    <footer className="bg-[#0F3D24] text-white pt-12 pb-6 mt-4">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#22993D] flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-tight text-white block leading-none">
                  FreshCart
                </span>
                <span className="text-[11px] text-[#A7F3B5] block mt-0.5">
                  Good Food. Happier You.
                </span>
              </div>
            </div>
            <p className="text-sm text-white/80 max-w-xs leading-relaxed">
              Fresh groceries. Healthier families. A brighter tomorrow across Karachi, Lahore, and Islamabad.
            </p>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { name: 'Facebook', label: 'f' },
                { name: 'Instagram', label: 'ig' },
                { name: 'YouTube', label: 'yt' },
                { name: 'TikTok', label: 'tt' },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={() => onShowNotice(`FreshCart ${social.name} community page opened in demo mode.`)}
                  aria-label={`FreshCart on ${social.name}`}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#22993D] text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  {social.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Categories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Offers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('recommended')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('fruits-vegetables')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fresh Harvest
                </button>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white mb-3">Help</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={onOpenTrackOrder}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenHelp}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns &amp; Refunds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenHelp}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenHelp}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white mb-3">About</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onShowNotice('FreshCart partners directly with over 120 local Pakistani farms.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onShowNotice('Every FreshCart order is covered by our 100% Freshness Promise.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quality Promise
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onShowNotice('We use recyclable kraft bags and plastic-free produce trays.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onShowNotice('FreshCart careers portal — growing hubs in Karachi, Lahore & Islamabad.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* App Download Badges */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white mb-3">Download Our App</h3>
            <p className="text-xs text-white/75 mb-3">
              Get the FreshCart app for a better shopping experience.
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onShowNotice('FreshCart Android app preview — coming soon on Google Play.')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#092917] hover:bg-black border border-white/20 text-left transition-colors cursor-pointer"
              >
                <span className="text-base font-bold text-[#A7F3B5]" aria-hidden="true">▶</span>
                <span className="leading-tight">
                  <span className="block text-[9px] uppercase text-white/70">Get it on</span>
                  <span className="block text-xs font-bold text-white">Google Play</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => onShowNotice('FreshCart iOS app preview — coming soon on App Store.')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#092917] hover:bg-black border border-white/20 text-left transition-colors cursor-pointer"
              >
                <span className="text-base font-bold text-white" aria-hidden="true"></span>
                <span className="leading-tight">
                  <span className="block text-[9px] uppercase text-white/70">Download on the</span>
                  <span className="block text-xs font-bold text-white">App Store</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onShowNotice('Privacy Policy: Your cart & wishlist are stored locally in your browser.')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onShowNotice('Terms of Service: Demo storefront with simulated PKR checkout.')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
          <p className="inline-flex items-center gap-1.5 text-[#A7F3B5] font-medium">
            Good Food. Happier You.
            <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
};

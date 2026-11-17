import React from 'react';
import { Truck, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Fast & Reliable Delivery',
    subtitle: 'At your doorstep',
  },
  {
    icon: ShieldCheck,
    title: '100% Fresh Guarantee',
    subtitle: 'Farm fresh quality',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    subtitle: 'Shop with confidence',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: 'Hassle-free service',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section aria-label="Shopping benefits" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#F4F9F4] border border-[#E2EDE3]"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[#D7EAD9] flex items-center justify-center shrink-0 text-[#197B30]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-[#0F3D24] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A6354] mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

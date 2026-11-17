import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface NewsletterProps {
  subscribedEmail: string | null;
  onSubscribe: (email: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  subscribedEmail,
  onSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setError('');
    onSubscribe(trimmed);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#E6F4E8] via-[#EFF8F0] to-[#E0F2E3] border border-[#CFE6D2] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#22993D] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mail className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#0F3D24]">
                Join Our Fresh Community
              </h2>
              <p className="text-xs sm:text-sm text-[#3D5747] mt-0.5">
                Get exclusive offers, seasonal deals and healthy living tips.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[430px]">
            {subscribedEmail ? (
              <div className="flex items-center gap-2.5 bg-white border border-[#B6D7BC] rounded-xl px-4 py-3 text-sm text-[#0F3D24]">
                <CheckCircle2 className="w-5 h-5 text-[#22993D] shrink-0" aria-hidden="true" />
                <span>
                  Subscribed with <strong className="font-semibold">{subscribedEmail}</strong>. Use code{' '}
                  <strong className="text-[#197B30]">FRESH10</strong> at checkout!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    aria-invalid={Boolean(error)}
                    className="flex-1 h-11 px-4 rounded-lg bg-white border border-[#CFE0D2] text-sm text-[#102A1C] placeholder:text-[#6B8273] focus:outline-none focus:border-[#22993D]"
                  />
                  <button
                    type="submit"
                    className="h-11 px-6 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {error && (
                  <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#DC2626]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

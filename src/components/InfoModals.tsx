import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Trash2, PackageCheck, HelpCircle, UserCheck } from 'lucide-react';
import { OrderReceipt, Product } from '../types/grocery';
import { SafeImage } from './SafeImage';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string | null;
  onSignIn: (name: string) => void;
  onSignOut: () => void;
  wishlistIds: string[];
  products: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveWishlist: (productId: string) => void;
}

export const AccountWishlistModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  userName,
  onSignIn,
  onSignOut,
  wishlistIds,
  products,
  onAddToCart,
  onRemoveWishlist,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.includes('@')) {
      setError('Please enter your name and a valid email address.');
      return;
    }
    setError('');
    onSignIn(nameInput.trim());
    setNameInput('');
    setEmailInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Account and Wishlist">
      <div className="fixed inset-0 bg-[#092917]/50 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5ECE6] overflow-hidden max-h-[85vh] flex flex-col">
        <div className="px-5 py-4 border-b border-[#E5ECE6] flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#0F3D24]">
            Account &amp; Saved Wishlist
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg hover:bg-[#F2F9F3] flex items-center justify-center text-[#4A6354] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6">
          {/* Account Section */}
          {userName ? (
            <div className="p-4 rounded-xl bg-[#F4F9F4] border border-[#D7EAD9] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22993D] text-white flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F3D24]">Signed in as {userName}</p>
                  <p className="text-xs text-[#4A6354]">FreshCart Member · Saved locally</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className="text-xs font-semibold text-[#DC2626] hover:underline cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#F8FBF8] border border-[#E5ECE6] space-y-3">
              <h3 className="font-display text-sm font-bold text-[#0F3D24]">
                Quick Demo Sign In
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name"
                  className="h-9 px-3 text-xs bg-white border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
                />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Email Address"
                  className="h-9 px-3 text-xs bg-white border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
                />
              </div>
              {error && <p className="text-xs text-[#DC2626]">{error}</p>}
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Wishlist Section */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#0F3D24] flex items-center gap-1.5 mb-3">
              <Heart className="w-4 h-4 text-[#DC2626] fill-[#DC2626]" />
              Saved Wishlist ({savedProducts.length})
            </h3>

            {savedProducts.length === 0 ? (
              <p className="text-xs text-[#5B7363] py-6 text-center rounded-xl border border-dashed border-[#DCE6DD]">
                Tap the heart icon on any grocery item to save it here for quick reordering.
              </p>
            ) : (
              <div className="space-y-2.5">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E5ECE6] bg-white"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAFAFA] shrink-0">
                      <SafeImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#102A1C] truncate">{product.name}</p>
                      <p className="text-xs font-bold text-[#0F3D24] tabular-nums">
                        Rs. {product.pricePkr.toLocaleString()} <span className="font-normal text-[#5B7363]">· {product.unit}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1.5 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="p-1.5 text-[#7B9183] hover:text-[#DC2626] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastOrder: OrderReceipt | null;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  lastOrder,
}) => {
  const [lookupId, setLookupId] = useState(lastOrder?.orderId || 'FC-1042');
  const [checked, setChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Track Order">
      <div className="fixed inset-0 bg-[#092917]/50 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5ECE6] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#0F3D24] flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#22993D]" />
            Track Your Order
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close track order modal"
            className="w-8 h-8 rounded-lg hover:bg-[#F2F9F3] flex items-center justify-center text-[#4A6354] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setChecked(true);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="Order ID (e.g. FC-1042)"
            className="flex-1 h-10 px-3 text-sm border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-xs font-semibold cursor-pointer"
          >
            Check Status
          </button>
        </form>

        {(checked || lastOrder) && (
          <div className="rounded-xl bg-[#F4F9F4] border border-[#D7EAD9] p-4 space-y-2.5 text-xs">
            <div className="flex justify-between font-bold text-[#0F3D24]">
              <span>Order #{lookupId || lastOrder?.orderId}</span>
              <span className="text-[#197B30]">Out for Express Delivery</span>
            </div>
            <p className="text-[#4A6354]">
              Freshly packed in temperature-controlled bags · Arriving in{' '}
              <strong>{lastOrder?.estimatedTime || '45–60 mins'}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="FreshCart Help and FAQs">
      <div className="fixed inset-0 bg-[#092917]/50 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5ECE6] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#0F3D24] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#22993D]" />
            FreshCart Customer Support
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close help modal"
            className="w-8 h-8 rounded-lg hover:bg-[#F2F9F3] flex items-center justify-center text-[#4A6354] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-[#3D5747]">
          <div className="p-3 rounded-xl bg-[#F8FBF8] border border-[#E5ECE6]">
            <h3 className="font-bold text-[#0F3D24] mb-1">How fast is delivery?</h3>
            <p>Orders across Karachi, Lahore, Islamabad, and Rawalpindi arrive in 45–90 minutes. Orders over Rs. 2,000 qualify for free delivery.</p>
          </div>
          <div className="p-3 rounded-xl bg-[#F8FBF8] border border-[#E5ECE6]">
            <h3 className="font-bold text-[#0F3D24] mb-1">What is your Freshness Guarantee?</h3>
            <p>If any fruit, vegetable, or dairy item does not meet your expectations at the door, we replace or refund it immediately.</p>
          </div>
          <div className="p-3 rounded-xl bg-[#F8FBF8] border border-[#E5ECE6]">
            <h3 className="font-bold text-[#0F3D24] mb-1">Need more help?</h3>
            <p>Support hours: 8:00 AM – 11:00 PM PKT daily · care@freshcart.pk (Demo)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

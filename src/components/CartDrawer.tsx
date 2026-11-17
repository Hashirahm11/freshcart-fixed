import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Truck,
  Tag,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { CartItem, OrderReceipt, Product } from '../types/grocery';
import { CITIES } from '../data/products';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  selectedCity: string;
  userName: string | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderComplete: (receipt: OrderReceipt) => void;
}

const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE = 150;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  products,
  selectedCity,
  userName,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderComplete,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');

  const [customerName, setCustomerName] = useState(userName || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [formError, setFormError] = useState('');
  const [latestReceipt, setLatestReceipt] = useState<OrderReceipt | null>(null);

  if (!isOpen) return null;

  const detailedItems = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((x): x is { product: Product; quantity: number } => x !== null);

  const subtotal = detailedItems.reduce(
    (sum, { product, quantity }) => sum + product.pricePkr * quantity,
    0
  );

  const totalSavings = detailedItems.reduce((sum, { product, quantity }) => {
    const orig = product.originalPricePkr || product.pricePkr;
    return sum + Math.max(0, orig - product.pricePkr) * quantity;
  }, 0);

  const promoDiscount = appliedPromo === 'FRESH10' ? Math.round(subtotal * 0.1) : 0;
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
  const deliveryFee = qualifiesFreeDelivery ? 0 : DELIVERY_FEE;
  const grandTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const cityInfo = CITIES.find((c) => c.name === selectedCity) || CITIES[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'FRESH10') {
      setAppliedPromo('FRESH10');
      setPromoError('');
    } else {
      setPromoError('Try code FRESH10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Please fill in your name, mobile number, and delivery address.');
      return;
    }

    const receipt: OrderReceipt = {
      orderId: `FC-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: selectedCity,
      paymentMethod,
      totalPkr: grandTotal,
      estimatedTime: cityInfo.deliveryEta,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setFormError('');
    setLatestReceipt(receipt);
    onOrderComplete(receipt);
    onClearCart();
    setAppliedPromo(null);
    setPromoInput('');
    setStep('receipt');
  };

  const handleClose = () => {
    if (step === 'receipt') {
      setStep('cart');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#092917]/45 backdrop-blur-[1px] transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#E5ECE6] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to cart"
                className="p-1.5 rounded-lg hover:bg-[#F2F9F3] text-[#0F3D24] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-lg font-bold text-[#0F3D24]">
              {step === 'cart'
                ? `Your Basket (${detailedItems.reduce((a, b) => a + b.quantity, 0)})`
                : step === 'checkout'
                  ? 'Express Delivery Details'
                  : 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart drawer"
            className="w-8 h-8 rounded-lg hover:bg-[#F2F9F3] text-[#4A6354] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Cart View */}
        {step === 'cart' && (
          <>
            {/* Free Delivery Progress */}
            {detailedItems.length > 0 && (
              <div className="px-5 py-3 bg-[#F4F9F4] border-b border-[#E5ECE6]">
                <div className="flex items-center gap-2 text-xs font-medium text-[#0F3D24]">
                  <Truck className="w-4 h-4 text-[#22993D] shrink-0" aria-hidden="true" />
                  {qualifiesFreeDelivery ? (
                    <span>
                      You unlocked <strong className="text-[#197B30]">Free Delivery</strong> in {selectedCity}!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="tabular-nums">Rs. {remainingForFree.toLocaleString()}</strong> more for Free Delivery
                    </span>
                  )}
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#DCE9DD] overflow-hidden">
                  <div
                    className="h-full bg-[#22993D] transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {detailedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#F2F9F3] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-[#22993D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0F3D24]">
                    Your FreshCart basket is empty
                  </h3>
                  <p className="text-sm text-[#4A6354] mt-1 max-w-xs">
                    Browse fresh fruits, dairy, bakery loaves, and daily deals to fill your basket.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-5 px-5 py-2.5 rounded-lg bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                detailedItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#E5ECE6] bg-white"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#FAFAFA] border border-[#EEF3EE] overflow-hidden shrink-0">
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#102A1C] truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5B7363]">{product.unit}</p>
                      <div className="mt-1 flex items-baseline gap-2 tabular-nums">
                        <span className="text-sm font-bold text-[#0F3D24]">
                          Rs. {(product.pricePkr * quantity).toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#6B8273]">
                          (Rs. {product.pricePkr} each)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="text-[#7B9183] hover:text-[#DC2626] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center rounded-lg border border-[#DCE6DD] bg-[#F8FBF8]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="w-7 h-7 flex items-center justify-center text-[#102A1C] hover:bg-[#E0F2E3] rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          className="w-7 h-7 flex items-center justify-center text-[#102A1C] hover:bg-[#E0F2E3] rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Summary */}
            {detailedItems.length > 0 && (
              <div className="border-t border-[#E5ECE6] bg-[#FAFDF9] px-5 py-4 space-y-3">
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#5B7363] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        if (promoError) setPromoError('');
                      }}
                      placeholder="Promo code (try FRESH10)"
                      className="w-full h-9 pl-8 pr-3 text-xs bg-white border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-9 px-3.5 rounded-lg bg-[#0F3D24] hover:bg-[#197B30] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoError && <p className="text-[11px] text-[#DC2626]">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-[11px] font-semibold text-[#197B30]">
                    Code FRESH10 applied — saving Rs. {promoDiscount.toLocaleString()}!
                  </p>
                )}

                <div className="space-y-1.5 text-sm tabular-nums pt-1">
                  <div className="flex justify-between text-[#4A6354]">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[#197B30] text-xs font-medium">
                      <span>Deal Savings</span>
                      <span>-Rs. {totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#197B30] text-xs font-medium">
                      <span>Promo (FRESH10)</span>
                      <span>-Rs. {promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#4A6354]">
                    <span>Delivery ({selectedCity})</span>
                    <span>{deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-display text-base font-bold text-[#0F3D24] pt-2 border-t border-[#E5ECE6]">
                    <span>Total</span>
                    <span>Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full h-11 rounded-xl bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Simulated Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between p-5 overflow-y-auto">
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#F4F9F4] border border-[#DCE6DD] text-xs text-[#0F3D24]">
                Dispatching from <strong>{cityInfo.hub}</strong> · Estimated arrival{' '}
                <strong>{cityInfo.deliveryEta}</strong>
              </div>

              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#102A1C] mb-1">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full h-10 px-3 text-sm border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
                />
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#102A1C] mb-1">
                  Mobile Number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full h-10 px-3 text-sm border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
                />
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#102A1C] mb-1">
                  Street Address ({selectedCity})
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Flat No., Street, Sector or Block"
                  className="w-full p-3 text-sm border border-[#DCE6DD] rounded-lg focus:outline-none focus:border-[#22993D]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#102A1C] mb-1.5">
                  Payment Method (Demo)
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#22993D] bg-[#F2F9F3] text-[#197B30]'
                        : 'border-[#DCE6DD] text-[#4A6354]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#22993D] bg-[#F2F9F3] text-[#197B30]'
                        : 'border-[#DCE6DD] text-[#4A6354]'
                    }`}
                  >
                    Card on Delivery
                  </button>
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-[#DC2626]">
                  {formError}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5ECE6] space-y-3">
              <div className="flex justify-between font-display text-base font-bold text-[#0F3D24] tabular-nums">
                <span>Payable Total</span>
                <span>Rs. {grandTotal.toLocaleString()}</span>
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Place Demo Order
              </button>
              <p className="text-[11px] text-center text-[#5B7363]">
                Demo storefront — no real charge or payment is processed.
              </p>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation Receipt */}
        {step === 'receipt' && latestReceipt && (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#E0F2E3] text-[#197B30] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0F3D24]">
              Order {latestReceipt.orderId} Confirmed
            </h3>
            <p className="text-sm text-[#4A6354] mt-1">
              Preparing your fresh groceries for delivery in {latestReceipt.city}.
            </p>

            <div className="mt-6 w-full rounded-xl bg-[#F8FBF8] border border-[#E5ECE6] p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5B7363]">Customer</span>
                <span className="font-semibold text-[#102A1C]">{latestReceipt.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B7363]">Delivery Window</span>
                <span className="font-semibold text-[#197B30]">{latestReceipt.estimatedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B7363]">Payment</span>
                <span className="font-semibold text-[#102A1C]">
                  {latestReceipt.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card on Delivery'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5ECE6] text-sm font-bold text-[#0F3D24] tabular-nums">
                <span>Total</span>
                <span>Rs. {latestReceipt.totalPkr.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full h-11 rounded-xl bg-[#22993D] hover:bg-[#197B30] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

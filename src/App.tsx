import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { CartItem, CategorySlug, OrderReceipt, Product } from './types/grocery';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CategorySection } from './components/CategorySection';
import { PromotionalBanners } from './components/PromotionalBanners';
import { DailyDeals } from './components/DailyDeals';
import { ProduceBanners } from './components/ProduceBanners';
import { RecommendedAndBestSellers } from './components/RecommendedAndBestSellers';
import { BenefitsSection } from './components/BenefitsSection';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AccountWishlistModal, HelpModal, TrackOrderModal } from './components/InfoModals';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('freshcart_cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage('freshcart_wishlist', []));
  const [selectedCity, setSelectedCity] = useState<string>(() =>
    readStorage('freshcart_city', 'Karachi')
  );
  const [userName, setUserName] = useState<string | null>(() =>
    readStorage('freshcart_user', null)
  );
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(() =>
    readStorage('freshcart_newsletter', null)
  );
  const [lastOrder, setLastOrder] = useState<OrderReceipt | null>(() =>
    readStorage('freshcart_last_order', null)
  );

  const [activeCategory, setActiveCategory] = useState<CategorySlug>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCatalog, setShowAllCatalog] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem('freshcart_cart', JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem('freshcart_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      window.localStorage.setItem('freshcart_city', JSON.stringify(selectedCity));
    } catch {
      // ignore
    }
  }, [selectedCity]);

  useEffect(() => {
    try {
      window.localStorage.setItem('freshcart_user', JSON.stringify(userName));
    } catch {
      // ignore
    }
  }, [userName]);

  useEffect(() => {
    try {
      window.localStorage.setItem('freshcart_newsletter', JSON.stringify(subscribedEmail));
    } catch {
      // ignore
    }
  }, [subscribedEmail]);

  useEffect(() => {
    try {
      window.localStorage.setItem('freshcart_last_order', JSON.stringify(lastOrder));
    } catch {
      // ignore
    }
  }, [lastOrder]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('daily-deals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (slug: CategorySlug) => {
    setActiveCategory(slug);
    setShowAllCatalog(false);
    if (slug !== 'all' || searchQuery.trim()) {
      scrollToCatalog();
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setShowAllCatalog(false);
  };

  const handleAddToCart = (product: Product, count = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + count } : i
        );
      }
      return [...prev, { productId: product.id, quantity: count }];
    });
    showToast(`Added ${product.name} to your basket`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`Removed ${product.name} from wishlist`);
        return prev.filter((id) => id !== productId);
      }
      if (product) showToast(`Saved ${product.name} to wishlist`);
      return [...prev, productId];
    });
  };

  const getCartQuantity = (productId: string) =>
    cart.find((i) => i.productId === productId)?.quantity || 0;

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  // Filtered items for Daily Deals / Active Catalog grid
  const visibleCatalogProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query || activeCategory !== 'all' || showAllCatalog) {
      return PRODUCTS.filter((product) => {
        const matchesQuery =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);

        const matchesCategory =
          activeCategory === 'all'
            ? true
            : activeCategory === 'offers'
              ? Boolean(product.discountPercent)
              : product.categorySlug === activeCategory;

        return matchesQuery && matchesCategory;
      });
    }

    return PRODUCTS.filter((p) => p.isDailyDeal);
  }, [activeCategory, searchQuery, showAllCatalog]);

  const recommendedProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isRecommended),
    []
  );

  const bestSellers = useMemo(
    () =>
      PRODUCTS.filter((p) => p.isBestSeller).sort(
        (a, b) => (a.bestSellerRank || 99) - (b.bestSellerRank || 99)
      ),
    []
  );

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#102A1C]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={scrollToCatalog}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          showToast(`Delivery location updated to ${city}`);
        }}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        userName={userName}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenTrackOrder={() => setIsTrackOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <main className="flex-1">
        <HeroSlider onShopNow={handleSelectCategory} />

        <CategorySection
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        <PromotionalBanners onSelectCategory={handleSelectCategory} />

        <DailyDeals
          products={visibleCatalogProducts}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          showAllCatalog={showAllCatalog}
          onToggleShowAll={() => setShowAllCatalog((prev) => !prev)}
          onResetFilters={handleResetFilters}
          getCartQuantity={getCartQuantity}
          isWishlisted={isWishlisted}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onUpdateQuantity={handleUpdateQuantity}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
        />

        <ProduceBanners onSelectCategory={handleSelectCategory} />

        <RecommendedAndBestSellers
          recommendedProducts={recommendedProducts}
          bestSellers={bestSellers}
          getCartQuantity={getCartQuantity}
          isWishlisted={isWishlisted}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onUpdateQuantity={handleUpdateQuantity}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onViewAllRecommended={() => {
            setActiveCategory('all');
            setShowAllCatalog(true);
            scrollToCatalog();
          }}
          onViewAllBestSellers={() => {
            setActiveCategory('offers');
            scrollToCatalog();
          }}
        />

        <BenefitsSection />

        <Testimonials
          onShowAllReviews={() =>
            showToast('Showing verified sample customer highlights from Karachi, Lahore & Islamabad.')
          }
        />

        <Newsletter
          subscribedEmail={subscribedEmail}
          onSubscribe={(email) => {
            setSubscribedEmail(email);
            showToast('Welcome to FreshCart! Code FRESH10 unlocked.');
          }}
        />
      </main>

      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenTrackOrder={() => setIsTrackOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onShowNotice={showToast}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        products={PRODUCTS}
        selectedCity={selectedCity}
        userName={userName}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onOrderComplete={(receipt) => {
          setLastOrder(receipt);
          showToast(`Order ${receipt.orderId} confirmed!`);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onAddMultiple={(p, qty) => handleAddToCart(p, qty)}
        onToggleWishlist={handleToggleWishlist}
      />

      <AccountWishlistModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        userName={userName}
        onSignIn={(name) => {
          setUserName(name);
          showToast(`Welcome back, ${name}!`);
        }}
        onSignOut={() => {
          setUserName(null);
          showToast('Signed out');
        }}
        wishlistIds={wishlist}
        products={PRODUCTS}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onRemoveWishlist={handleToggleWishlist}
      />

      <TrackOrderModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        lastOrder={lastOrder}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F3D24] text-white text-xs sm:text-sm font-medium shadow-lg border border-white/10"
        >
          <CheckCircle2 className="w-4 h-4 text-[#A7F3B5] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

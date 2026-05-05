import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Globe, X, Minus, Heart, ClipboardList, User, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data with I18n
const content = {
  EN: {
    brand: 'The Culinary Architect',
    trending: 'TRENDING FAVORITES',
    popular: 'Popular Now',
    viewAll: 'View All',
    categoriesTitle: 'Categories',
    exclusiveOffers: 'Exclusive Offers',
    cart: 'Your Order',
    checkout: 'Checkout',
    emptyCart: 'Your cart is empty',
    total: 'Total',
    nav: {
      menu: 'MENU',
      favorites: 'FAVORITES',
      orders: 'ORDERS',
      profile: 'PROFILE'
    },
    items: [
      {
        id: 1,
        name: 'Architect Burger',
        description: 'Black Angus, Truffle Mayo, Aged...',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300&q=80',
        category: 'Burgers',
        badge: 'BEST SELLER'
      },
      {
        id: 2,
        name: 'Verona Pasta',
        description: 'Fresh basil, pine nuts, parm...',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&h=300&q=80',
        category: 'Pasta'
      },
    ],
    categories: [
      { name: 'BURGERS', icon: '🍔', color: 'bg-category-burgers' },
      { name: 'PIZZAS', icon: '🍕', color: 'bg-category-pizzas' },
      { name: 'SALADS', icon: '🥗', color: 'bg-category-salads' },
      { name: 'DRINKS', icon: '🥤', color: 'bg-category-drinks' },
    ],
    offers: [
      {
        id: 1,
        tag: 'SUMMER SPECIAL',
        title: '20% OFF',
        subtitle: 'On all orders above $40',
        color: 'bg-blue-900',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 2,
        tag: 'CAMPUS PERK',
        title: 'Student Deal',
        subtitle: 'Free drink with any main dish',
        color: 'bg-orange-800',
        image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=200&q=80'
      },
    ]
  },
  AR: {
    brand: 'ذا كوليناري أركيتكت',
    trending: 'المفضلات الشائعة',
    popular: 'الأكثر طلباً',
    viewAll: 'عرض الكل',
    categoriesTitle: 'الأصناف',
    exclusiveOffers: 'عروض حصرية',
    cart: 'طلباتك',
    checkout: 'إتمام الطلب',
    emptyCart: 'السلة فارغة',
    total: 'المجموع',
    nav: {
      menu: 'القائمة',
      favorites: 'المفضلة',
      orders: 'الطلبات',
      profile: 'حسابي'
    },
    items: [
      {
        id: 1,
        name: 'أركيتكت برجر',
        description: 'بلاك أنجوس، ترافل مايو، معتق...',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300&q=80',
        category: 'برجر',
        badge: 'الأكثر مبيعاً'
      },
      {
        id: 2,
        name: 'باستا فيرونا',
        description: 'ريحان طازج، صنوبر، بارميزان...',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&h=300&q=80',
        category: 'باستا'
      },
    ],
    categories: [
      { name: 'برجر', icon: '🍔', color: 'bg-category-burgers' },
      { name: 'بيتزا', icon: '🍕', color: 'bg-category-pizzas' },
      { name: 'سلطات', icon: '🥗', color: 'bg-category-salads' },
      { name: 'مشروبات', icon: '🥤', color: 'bg-category-drinks' },
    ],
    offers: [
      {
        id: 1,
        tag: 'عرض الصيف',
        title: 'خصم 20%',
        subtitle: 'على جميع الطلبات فوق 40$',
        color: 'bg-blue-900',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 2,
        tag: 'امتياز الحرم الجامعي',
        title: 'عرض الطلاب',
        subtitle: 'مشروب مجاني مع أي وجبة رئيسية',
        color: 'bg-orange-800',
        image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=200&q=80'
      },
    ]
  }
};

interface CartItemState {
  id: number;
  quantity: number;
}

export default function App() {
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [cartState, setCartState] = useState<CartItemState[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('MENU');

  const t = content[language];

  // Resolve cart items
  const cartItems = cartState.map(stateItem => {
    const itemData = content.EN.items.find(i => i.id === stateItem.id) || content.EN.items[0];
    const localizedData = content[language].items.find(i => i.id === stateItem.id) || content[language].items[0];
    return {
      ...itemData,
      name: localizedData.name,
      quantity: stateItem.quantity
    };
  });

  const cartCount = cartState.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (id: number) => {
    setCartState(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartState(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing?.quantity === 1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  return (
    <div className={`min-h-screen bg-background pb-32 font-sans ${language === 'AR' ? 'text-right' : 'text-left'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between bg-white/80 backdrop-blur-xl px-5 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-blue-600">
             <Globe className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-display">{t.brand}</span>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setLanguage(lang => lang === 'EN' ? 'AR' : 'EN')}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            {language === 'EN' ? 'AR' : 'EN'}
          </button>

          <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full active:scale-95 transition-transform">
            <div className="relative">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-blue-600 text-[10px] font-bold text-blue-600"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </header>

      <main className="mt-4 space-y-10">
        {/* Trending Section */}
        <section>
          <div className="px-5 mb-2">
            <p className="text-[10px] font-extrabold text-orange-700 tracking-[0.2em] uppercase">{t.trending}</p>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                <span className="text-3xl">🔥</span> {t.popular}
              </h2>
              <button className="text-sm font-bold text-blue-600">{t.viewAll}</button>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto px-5 pb-6 no-scrollbar">
            {t.items.map((item) => (
              <motion.div
                whileTap={{ scale: 0.98 }}
                key={item.id}
                className="min-w-[280px] shrink-0 rounded-[32px] bg-white shadow-premium border border-slate-50 overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover rounded-[24px]"
                  />
                  {item.badge && (
                    <div className="absolute top-6 start-6 bg-blue-600 px-3 py-1 rounded-full shadow-lg">
                      <p className="text-[9px] font-bold text-white uppercase tracking-wider">{item.badge}</p>
                    </div>
                  )}
                </div>
                <div className="px-5 pb-5 pt-1">
                  <h3 className="text-lg font-bold text-slate-900 font-display">{item.name}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-blue-600">${item.price.toFixed(2)}</p>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => addToCart(item.id)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200"
                    >
                      <Plus className="h-6 w-6" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-5">
          <h2 className="mb-5 text-2xl font-extrabold text-slate-900 font-display">{t.categoriesTitle}</h2>
          <div className="grid grid-cols-2 gap-4">
            {t.categories.map((category) => (
              <motion.button
                key={category.name}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center justify-center rounded-[32px] ${category.color} py-7 transition-all`}
              >
                <span className="text-4xl mb-3 transform scale-125">{category.icon}</span>
                <span className="text-xs font-bold text-slate-900 tracking-widest uppercase">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Offers Section */}
        <section className="pb-6">
          <h2 className="px-5 mb-5 text-2xl font-extrabold text-slate-900 font-display">{t.exclusiveOffers}</h2>
          <div className="flex gap-4 overflow-x-auto px-5 no-scrollbar">
            {t.offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileTap={{ scale: 0.98 }}
                className={`relative shrink-0 w-[85%] overflow-hidden rounded-[32px] ${offer.color} p-8 text-white min-h-[160px] flex flex-col justify-center`}
              >
                <div className="relative z-10">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] mb-2 opacity-90">{offer.tag}</p>
                  <h3 className="text-3xl font-extrabold font-display leading-none mb-2">{offer.title}</h3>
                  <p className="text-xs font-medium opacity-80">{offer.subtitle}</p>
                </div>
                {/* Abstract shapes or images in background */}
                <div className="absolute top-0 right-0 h-full w-1/2 opacity-30 pointer-events-none">
                  <img src={offer.image} alt="" className="h-full w-full object-cover mix-blend-overlay" />
                </div>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex items-center justify-between pb-8">
        <button
          onClick={() => setActiveTab('MENU')}
          className={`flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-full transition-all ${activeTab === 'MENU' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400'}`}
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span className="text-[9px] font-black tracking-widest">{t.nav.menu}</span>
        </button>

        <button
          onClick={() => setActiveTab('FAVORITES')}
          className={`flex flex-col items-center gap-1.5 px-3 transition-all ${activeTab === 'FAVORITES' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Heart className="h-5 w-5" />
          <span className="text-[9px] font-black tracking-widest">{t.nav.favorites}</span>
        </button>

        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex flex-col items-center gap-1.5 px-3 transition-all ${activeTab === 'ORDERS' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <ClipboardList className="h-5 w-5" />
          <span className="text-[9px] font-black tracking-widest">{t.nav.orders}</span>
        </button>

        <button
          onClick={() => setActiveTab('PROFILE')}
          className={`flex flex-col items-center gap-1.5 px-3 transition-all ${activeTab === 'PROFILE' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-[9px] font-black tracking-widest">{t.nav.profile}</span>
        </button>
      </nav>

      {/* Floating Cart Button (Optional, since it's in header, but user requested bottom-right in original prompt) */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className={`fixed bottom-28 ${language === 'EN' ? 'right-6' : 'left-6'} z-30 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-400 ring-4 ring-white`}
          >
            <div className="relative">
              <ShoppingCart className="h-7 w-7" />
              <motion.span
                key={cartCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[12px] font-black text-blue-600 shadow-sm"
              >
                {cartCount}
              </motion.span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] rounded-t-[48px] bg-white p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 font-display">{t.cart}</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 rounded-full bg-slate-50 text-slate-400"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto max-h-[50vh] no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <ShoppingCart className="h-10 w-10 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold">{t.emptyCart}</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-5">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-[20px] object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        <p className="font-extrabold text-blue-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-10 space-y-5">
                  <div className="flex items-center justify-between text-2xl font-extrabold">
                    <span className="text-slate-400">{t.total}</span>
                    <span className="text-slate-900 font-display">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full h-16 rounded-[28px] bg-blue-600 text-white font-extrabold text-lg shadow-xl shadow-blue-200 active:scale-[0.98] transition-transform">
                    {t.checkout}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

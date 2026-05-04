import { useState } from 'react';
import { ShoppingCart, Plus, Search, Globe, ChevronRight, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data with I18n
const content = {
  EN: {
    title: 'Gourmet Hub',
    searchPlaceholder: "What's on your mind today?",
    popular: '🔥 Popular Now',
    categoriesTitle: 'Categories',
    bestOffers: 'Best Offers',
    viewAll: 'View All',
    explore: 'Explore',
    claimNow: 'Claim Now',
    cart: 'Your Order',
    checkout: 'Proceed to Checkout',
    emptyCart: 'Your cart is empty',
    total: 'Total',
    items: [
      { id: 1, name: 'Truffle Glazed Burger', price: 45.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300&q=80', category: 'Burgers' },
      { id: 2, name: 'Margherita Burrata Pizza', price: 52.00, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&h=300&q=80', category: 'Pizza' },
      { id: 3, name: 'Quinoa Avocado Salad', price: 38.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=300&q=80', category: 'Salads' },
    ],
    categories: [
      { name: 'Burgers', icon: '🍔', color: 'bg-orange-50 text-orange-600' },
      { name: 'Pizza', icon: '🍕', color: 'bg-red-50 text-red-600' },
      { name: 'Salads', icon: '🥗', color: 'bg-green-50 text-green-600' },
      { name: 'Desserts', icon: '🍰', color: 'bg-pink-50 text-pink-600' },
      { name: 'Drinks', icon: '🥤', color: 'bg-blue-50 text-blue-600' },
      { name: 'Sushi', icon: '🍣', color: 'bg-slate-50 text-slate-600' },
    ],
    offers: [
      { id: 1, title: '🔥 20% OFF', subtitle: 'On your first order', color: 'from-blue-600 to-blue-500' },
      { id: 2, title: 'Student Deal 💰', subtitle: 'Free drink with any meal', color: 'from-indigo-600 to-indigo-500' },
    ]
  },
  AR: {
    title: 'جورميه هاب',
    searchPlaceholder: 'ماذا يدور في ذهنك اليوم؟',
    popular: '🔥 الأكثر طلباً',
    categoriesTitle: 'الأصناف',
    bestOffers: 'أفضل العروض',
    viewAll: 'عرض الكل',
    explore: 'استكشف',
    claimNow: 'احصل عليه الآن',
    cart: 'طلباتك',
    checkout: 'إتمام الطلب',
    emptyCart: 'سلة التسوق فارغة',
    total: 'المجموع',
    items: [
      { id: 1, name: 'برجر ترافل جليزد', price: 45.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300&q=80', category: 'برجر' },
      { id: 2, name: 'بيتزا مارغريتا بوراتا', price: 52.00, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&h=300&q=80', category: 'بيتزا' },
      { id: 3, name: 'سلطة كينوا أفوكادو', price: 38.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=300&q=80', category: 'سلطات' },
    ],
    categories: [
      { name: 'برجر', icon: '🍔', color: 'bg-orange-50 text-orange-600' },
      { name: 'بيتزا', icon: '🍕', color: 'bg-red-50 text-red-600' },
      { name: 'سلطات', icon: '🥗', color: 'bg-green-50 text-green-600' },
      { name: 'حلويات', icon: '🍰', color: 'bg-pink-50 text-pink-600' },
      { name: 'مشروبات', icon: '🥤', color: 'bg-blue-50 text-blue-600' },
      { name: 'سوشي', icon: '🍣', color: 'bg-slate-50 text-slate-600' },
    ],
    offers: [
      { id: 1, title: '🔥 خصم 20%', subtitle: 'على طلبك الأول', color: 'from-blue-600 to-blue-500' },
      { id: 2, title: 'عرض الطلاب 💰', subtitle: 'مشروب مجاني مع أي وجبة', color: 'from-indigo-600 to-indigo-500' },
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

  const t = content[language];

  // Resolve cart items based on current language
  const cartItems = cartState.map(stateItem => {
    const itemData = content.EN.items.find(i => i.id === stateItem.id)!;
    const localizedName = content[language].items.find(i => i.id === stateItem.id)!.name;
    return {
      ...itemData,
      name: localizedName,
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
    <div className={`min-h-screen bg-background pb-24 font-sans ${language === 'AR' ? 'text-right' : 'text-left'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between bg-white px-4 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
            G
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">{t.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(lang => lang === 'EN' ? 'AR' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-sm font-bold text-slate-600 active:scale-95 transition-transform"
          >
            <Globe className="h-4 w-4" />
            {language}
          </button>

          <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-slate-50 transition-colors cursor-pointer">
            <ShoppingCart className="h-6 w-6 text-slate-800" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white ring-2 ring-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      <main className="mt-6 space-y-10">
        {/* Search Bar */}
        <section className="px-4">
          <div className="relative group">
            <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="h-14 w-full rounded-2xl bg-white ps-12 pe-4 text-base shadow-sm ring-1 ring-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </section>

        {/* Popular Section */}
        <section>
          <div className="mb-4 flex items-center justify-between px-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.popular}</h2>
            <button className="text-sm font-bold text-primary hover:underline">{t.viewAll}</button>
          </div>

          <div className="flex gap-5 overflow-x-auto px-4 pb-4 no-scrollbar">
            {t.items.map((item) => (
              <motion.div
                whileTap={{ scale: 0.97 }}
                key={item.id}
                className="min-w-[240px] shrink-0 rounded-[24px] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50"
              >
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-[20px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => addToCart(item.id)}
                    className="absolute bottom-3 end-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30"
                  >
                    <Plus className="h-6 w-6" />
                  </motion.button>
                </div>
                <h3 className="line-clamp-1 text-lg font-bold text-slate-900 leading-tight">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xl font-black text-primary">${item.price}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-sm font-bold text-slate-500">4.9</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="px-4">
          <h2 className="mb-4 text-2xl font-black text-slate-900 tracking-tight">{t.categoriesTitle}</h2>
          <div className="grid grid-cols-2 gap-4">
            {t.categories.map((category) => (
              <motion.button
                key={category.name}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center justify-center rounded-[28px] bg-white p-6 shadow-sm border border-slate-50 transition-all active:shadow-inner"
              >
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color} text-3xl mb-3 shadow-sm`}>
                  {category.icon}
                </span>
                <span className="text-lg font-extrabold text-slate-800">{category.name}</span>
                <span className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">{t.explore}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Offers Section */}
        <section className="pb-10">
          <div className="mb-4 px-4">
             <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.bestOffers}</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar">
            {t.offers.map((offer) => (
              <div
                key={offer.id}
                className={`relative min-w-[300px] shrink-0 overflow-hidden rounded-[32px] bg-gradient-to-br ${offer.color} p-8 text-white shadow-xl shadow-indigo-500/10`}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black">{offer.title}</h3>
                  <p className="mt-2 text-base font-medium opacity-90">{offer.subtitle}</p>
                  <button className="mt-6 px-5 py-2.5 bg-white text-slate-900 rounded-full text-sm font-bold shadow-lg shadow-black/5 active:scale-95 transition-transform">
                    {t.claimNow}
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, y: 100, rotate: -45 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0, y: 100, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className={`fixed bottom-8 ${language === 'EN' ? 'right-6' : 'left-6'} z-[30] flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 ring-4 ring-white`}
          >
            <div className="relative">
              <ShoppingCart className="h-7 w-7" />
              <motion.span
                key={cartCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[12px] font-black text-primary shadow-sm"
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
              className="fixed inset-0 z-[50] bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[60] max-h-[85vh] rounded-t-[40px] bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">{t.cart}</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[50vh] pe-2 no-scrollbar">
                {cartItems.length === 0 ? (
                  <p className="text-center py-10 text-slate-400 font-medium">{t.emptyCart}</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-2 rounded-2xl border border-slate-50">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        <p className="font-black text-primary">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between text-xl font-black">
                    <span className="text-slate-500">{t.total}</span>
                    <span className="text-primary">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full h-16 rounded-[24px] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform">
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

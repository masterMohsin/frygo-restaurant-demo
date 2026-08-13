import React, { useMemo, useState } from 'react';
import {
  Menu as MenuIcon,
  X,
  Search,
  ShoppingCart,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Navigation,
  Flame,
} from 'lucide-react';

const RESTAURANT_CONFIG = {
  name: 'FRYGO',
  tagline: 'Fresh flavor. Made for cravings.',
  phone: '[PHONE NUMBER]',
  whatsapp: '',
  address: '[FRYGO ADDRESS]',
  openingHours: '[OPENING HOURS]',
  googleMapsUrl: '',
  instagramUrl: '',
  facebookUrl: '',
  tiktokUrl: '',
};

// Demo data is intentionally price-free until the restaurant provides its verified menu.
const MENU_ITEMS = [
  { id: 1, name: 'Signature Burger', category: 'Burgers', description: 'Signature burger with fresh toppings and house sauce.', visual: 'burger', popular: true, spicy: false },
  { id: 2, name: 'Crispy Chicken Burger', category: 'Burgers', description: 'Crispy chicken with fresh toppings and special sauce.', visual: 'chicken', popular: true, spicy: true },
  { id: 3, name: 'Double Stack Burger', category: 'Burgers', description: 'Double-patty burger with a rich, cheesy finish.', visual: 'burger', popular: false, spicy: false },
  { id: 4, name: 'Loaded Fries', category: 'Fries', description: 'Crispy fries finished with creamy sauce and toppings.', visual: 'fries', popular: true, spicy: false },
  { id: 5, name: 'Spicy Cheese Fries', category: 'Fries', description: 'Crispy fries with cheese and a spicy kick.', visual: 'fries', popular: false, spicy: true },
  { id: 6, name: 'Crispy Chicken Wings', category: 'Chicken', description: 'Golden crispy wings served with a flavorful dip.', visual: 'wings', popular: true, spicy: true },
  { id: 7, name: 'Chicken Wrap', category: 'Wraps', description: 'Tender chicken, fresh vegetables and creamy sauce.', visual: 'wrap', popular: false, spicy: false },
  { id: 8, name: 'Deluxe Pizza', category: 'Pizza', description: 'Loaded pizza with savory toppings and melted cheese.', visual: 'pizza', popular: true, spicy: false },
  { id: 9, name: 'Spicy Pizza', category: 'Pizza', description: 'Cheesy pizza with a bold spicy finish.', visual: 'pizza', popular: true, spicy: true },
  { id: 10, name: 'Chicken Shawarma', category: 'Shawarma', description: 'Seasoned chicken with fresh salad and sauce.', visual: 'shawarma', popular: true, spicy: false },
  { id: 11, name: 'Beef Shawarma', category: 'Shawarma', description: 'Tender beef with fresh salad and signature sauce.', visual: 'shawarma', popular: true, spicy: false },
  { id: 12, name: 'Seekh Kebab', category: 'Kebab', description: 'Grilled seekh kebab with aromatic spices.', visual: 'kebab', popular: false, spicy: true },
  { id: 13, name: 'Family Combo', category: 'Deals', description: 'A shareable family meal. Final items and price to be confirmed.', visual: 'combo', popular: true, spicy: false },
  { id: 14, name: 'Cold Drink', category: 'Drinks', description: 'Refreshing chilled beverage.', visual: 'drink', popular: false, spicy: false },
  { id: 15, name: 'Iced Coffee', category: 'Drinks', description: 'Cold coffee served over ice.', visual: 'coffee', popular: true, spicy: false },
];

const DEALS = [
  { title: 'COMBO DEAL', badge: 'POPULAR', description: 'Burger + Fries + Drink', visual: 'combo' },
  { title: 'FAMILY DEAL', badge: 'BEST VALUE', description: 'Family-sized meal combination', visual: 'family' },
  { title: 'CHICKEN DEAL', badge: 'FAVORITE', description: 'Crispy chicken + fries', visual: 'chicken' },
];

const WHY_CHOOSE = [
  { icon: '🍔', title: 'Menu at a Glance', description: 'Let customers browse your food categories quickly on mobile.' },
  { icon: '🔥', title: 'Deals That Stand Out', description: 'Give combos and promotions a dedicated place on the homepage.' },
  { icon: '💬', title: 'Easy Ordering', description: 'Connect the final WhatsApp number for a simple ordering journey.' },
  { icon: '📍', title: 'Easy to Find', description: 'Put your verified location and directions one tap away.' },
];

function FoodVisual({ type = 'burger', compact = false }) {
  return (
    <div
      aria-hidden="true"
      className={`food-visual food-${type} ${compact ? 'food-visual--compact' : ''}`}
    >
      <div className="food-stage-glow" />
      <div className="food-shadow" />
      {type === 'burger' && (
        <div className="illustration burger-art">
          <div className="bun bun-top"><i /><i /><i /><i /></div>
          <div className="lettuce" />
          <div className="cheese" />
          <div className="patty" />
          <div className="lettuce" />
          <div className="bun bun-bottom" />
        </div>
      )}
      {type === 'chicken' && <div className="illustration chicken-art"><span /><span /><span /></div>}
      {type === 'wings' && <div className="illustration wings-art"><span /><span /><span /></div>}
      {type === 'fries' && <div className="illustration fries-art"><div className="fries-box"><b /><b /><b /><b /><b /></div></div>}
      {type === 'pizza' && <div className="illustration pizza-art"><div className="pizza-slice"><i /><i /><i /><i /></div></div>}
      {type === 'wrap' && <div className="illustration wrap-art"><div className="wrap-body"><i /><i /><i /></div></div>}
      {type === 'shawarma' && <div className="illustration shawarma-art"><div className="shawarma-body"><i /><i /><i /></div></div>}
      {type === 'kebab' && <div className="illustration kebab-art"><span /><span /><span /><span /></div>}
      {type === 'drink' && <div className="illustration drink-art"><div className="cup"><i /></div></div>}
      {type === 'coffee' && <div className="illustration coffee-art"><div className="coffee-cup"><i /></div></div>}
      {(type === 'combo' || type === 'family') && (
        <div className="illustration combo-art">
          <div className="mini-burger"><div /><div /><div /></div>
          <div className="mini-fries"><b /><b /><b /><b /></div>
          <div className="mini-cup" />
        </div>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      {eyebrow && <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-600 mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-600 leading-7">{subtitle}</p>}
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['All', 'Popular', ...new Set(MENU_ITEMS.map((item) => item.category))],
    []
  );

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        category === 'All' ||
        (category === 'Popular' && item.popular) ||
        item.category === category;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item) => {
    setCart((current) => {
      const found = current.find((x) => x.id === item.id);
      if (found) return current.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...current, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => setCart((current) => current.filter((item) => item.id !== id));

  const whatsappOrder = () => {
    if (!RESTAURANT_CONFIG.whatsapp) {
      alert('WhatsApp number will be connected after FRYGO provides its verified number.');
      return;
    }
    const lines = cart.map((item) => `• ${item.name} × ${item.quantity}`);
    const message = `Assalam o Alaikum FRYGO 👋\n\nI would like to place an order:\n\n${lines.join('\n')}\n\nPlease confirm availability and final price.`;
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const callRestaurant = () => {
    if (!RESTAURANT_CONFIG.phone || RESTAURANT_CONFIG.phone.startsWith('[')) {
      alert('Phone number will be added after FRYGO provides its verified number.');
      return;
    }
    window.location.href = `tel:${RESTAURANT_CONFIG.phone}`;
  };

  const navTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #fff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        * { box-sizing: border-box; }
        .hero-bg {
          background:
            radial-gradient(circle at 80% 20%, rgba(248,113,113,.28), transparent 30%),
            radial-gradient(circle at 60% 80%, rgba(251,146,60,.20), transparent 28%),
            linear-gradient(135deg, #fff7ed 0%, #ffffff 55%, #fff1f2 100%);
        }
        .food-visual {
          position: relative;
          min-height: 250px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 1.5rem;
          background:
            radial-gradient(circle at 50% 45%, rgba(248,113,113,.18), transparent 30%),
            radial-gradient(circle at 65% 55%, rgba(251,146,60,.20), transparent 35%),
            linear-gradient(135deg, #fff7ed 0%, #fff 52%, #fff1f2 100%);
        }
        .food-visual--compact { min-height: 145px; border-radius: 1rem; }
        .food-stage-glow {
          position: absolute; width: 62%; aspect-ratio: 1; border-radius: 50%;
          background: rgba(255,255,255,.82); filter: blur(2px);
        }
        .food-shadow {
          position: absolute; bottom: 18%; width: 42%; height: 9%;
          border-radius: 50%; background: rgba(15,23,42,.14); filter: blur(10px);
        }
        .illustration { position: relative; z-index: 2; transform: translateY(-3px); filter: drop-shadow(0 18px 14px rgba(15,23,42,.18)); }
        .food-visual--compact .illustration { transform: scale(.72); }
        .burger-art { width: 210px; display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .bun { width: 190px; background: linear-gradient(#f8c46b,#d8872e); box-shadow: inset 0 -5px rgba(151,74,20,.18); }
        .bun-top { height: 62px; border-radius: 110px 110px 22px 22px; position: relative; }
        .bun-top i { position: absolute; width: 7px; height: 3px; border-radius: 99px; background: #ffe7a8; transform: rotate(20deg); top: 23px; }
        .bun-top i:nth-child(1){left:45px}.bun-top i:nth-child(2){left:83px;top:14px}.bun-top i:nth-child(3){left:119px;top:28px}.bun-top i:nth-child(4){left:147px;top:17px}
        .bun-bottom { height: 24px; border-radius: 8px 8px 20px 20px; }
        .lettuce { width: 196px; height: 14px; background: #6f9d38; border-radius: 50%; }
        .cheese { width: 188px; height: 15px; background: #ffc83d; clip-path: polygon(0 0,100% 0,92% 100%,75% 55%,55% 100%,35% 55%,15% 100%); }
        .patty { width: 192px; height: 35px; border-radius: 9px; background: linear-gradient(#6f3d24,#3e2117); }
        .chicken-art,.wings-art { width: 220px; height: 155px; }
        .chicken-art span,.wings-art span { position:absolute; background:linear-gradient(145deg,#f5c26a,#c9682d); border-radius:55% 45% 50% 45%; box-shadow:inset -7px -8px rgba(122,54,22,.18); }
        .chicken-art span:nth-child(1){width:105px;height:72px;left:35px;top:30px;transform:rotate(-18deg)}
        .chicken-art span:nth-child(2){width:90px;height:70px;left:95px;top:48px;transform:rotate(22deg)}
        .chicken-art span:nth-child(3){width:68px;height:55px;left:73px;top:6px;transform:rotate(7deg)}
        .wings-art span:nth-child(1){width:115px;height:65px;left:12px;top:50px;transform:rotate(22deg)}
        .wings-art span:nth-child(2){width:105px;height:62px;left:92px;top:25px;transform:rotate(-18deg)}
        .wings-art span:nth-child(3){width:78px;height:50px;left:76px;top:78px;transform:rotate(8deg)}
        .fries-art { width:180px;height:180px;display:grid;place-items:center; }
        .fries-box { position:relative;width:145px;height:105px;background:linear-gradient(90deg,#e63e32,#bd231e);clip-path:polygon(7% 0,93% 0,84% 100%,16% 100%);display:flex;justify-content:center;gap:8px;padding-top:5px; }
        .fries-box b { width:18px;height:105px;background:linear-gradient(#ffd45c,#e99b24);border-radius:5px;transform:rotate(-5deg);margin-top:-35px;box-shadow:inset -3px 0 rgba(142,78,12,.15); }
        .fries-box b:nth-child(2){transform:rotate(3deg);height:118px}.fries-box b:nth-child(3){transform:rotate(-1deg);height:125px}.fries-box b:nth-child(4){transform:rotate(6deg);height:112px}.fries-box b:nth-child(5){transform:rotate(-8deg);height:115px}
        .pizza-art { width:200px;height:170px;display:grid;place-items:center; }
        .pizza-slice { width:180px;height:145px;background:linear-gradient(145deg,#ffd56c,#e78b2d);clip-path:polygon(3% 10%,97% 42%,6% 98%);position:relative;filter:drop-shadow(0 10px 6px rgba(15,23,42,.18)); }
        .pizza-slice:after { content:'';position:absolute;inset:18px 30px 32px 24px;background:#d33b2c;clip-path:polygon(0 10%,100% 42%,8% 100%); }
        .pizza-slice i { position:absolute;z-index:2;width:16px;height:16px;border-radius:50%;background:#a62b21; }
        .pizza-slice i:nth-child(1){left:68px;top:45px}.pizza-slice i:nth-child(2){left:112px;top:59px}.pizza-slice i:nth-child(3){left:58px;top:82px}.pizza-slice i:nth-child(4){left:93px;top:91px}
        .wrap-art,.shawarma-art { width:170px;height:190px;display:grid;place-items:center; }
        .wrap-body,.shawarma-body { width:95px;height:165px;background:linear-gradient(120deg,#f2bd68,#d8792c);clip-path:polygon(14% 0,86% 0,100% 82%,50% 100%,0 82%);position:relative; }
        .wrap-body:after,.shawarma-body:after { content:'';position:absolute;left:12px;right:12px;top:36px;height:12px;background:#6d8f38;border-radius:50%;box-shadow:0 35px #f2c24f, 0 70px #8d4d29; }
        .kebab-art { width:220px;height:160px;display:flex;gap:14px;align-items:center;justify-content:center; }
        .kebab-art span { width:38px;height:110px;border-radius:50%;background:linear-gradient(#8b4b2e,#542b1c);box-shadow:inset 5px 0 rgba(255,255,255,.08);transform:rotate(12deg); }
        .kebab-art span:nth-child(2){height:92px;transform:rotate(-8deg)}.kebab-art span:nth-child(3){height:105px;transform:rotate(8deg)}.kebab-art span:nth-child(4){height:85px;transform:rotate(-12deg)}
        .drink-art,.coffee-art { width:150px;height:190px;display:grid;place-items:center; }
        .cup,.coffee-cup { width:90px;height:125px;border-radius:10px 10px 28px 28px;background:linear-gradient(90deg,#f4f4f4,#fff,#d7d7d7);position:relative;box-shadow:inset 0 -10px rgba(0,0,0,.05); }
        .cup:before,.coffee-cup:before { content:'';position:absolute;left:12px;right:12px;top:-8px;height:25px;border-radius:50%;background:#b9e8f2;border:5px solid #fff; }
        .cup i { position:absolute;left:23px;right:23px;top:34px;height:50px;background:linear-gradient(#ef5350,#d92d28);border-radius:8px; }
        .coffee-cup { background:linear-gradient(90deg,#f1e1c2,#fff,#d7c09b);height:110px; }
        .coffee-cup:before { background:#5b351f; border-color:#e9d7b8; }
        .coffee-cup i { position:absolute;left:16px;right:16px;top:27px;height:55px;border-radius:8px;background:#63391f; }
        .combo-art { width:260px;height:180px;display:flex;align-items:end;justify-content:center;gap:9px; }
        .mini-burger { width:95px;height:100px;display:flex;flex-direction:column;justify-content:end;align-items:center;gap:3px; }
        .mini-burger div:nth-child(1){width:85px;height:32px;background:#d88b36;border-radius:50% 50% 10px 10px}.mini-burger div:nth-child(2){width:82px;height:23px;background:#4b271b;border-radius:5px}.mini-burger div:nth-child(3){width:85px;height:20px;background:#e2a13b;border-radius:4px 4px 12px 12px}
        .mini-fries { width:62px;height:75px;background:#d72f2a;display:flex;justify-content:center;gap:3px;padding-top:4px;clip-path:polygon(4% 0,96% 0,86% 100%,14% 100%); }
        .mini-fries b {width:7px;height:66px;background:#ffd45c;margin-top:-25px;border-radius:2px}.mini-fries b:nth-child(2){height:72px}.mini-fries b:nth-child(3){height:61px}.mini-fries b:nth-child(4){height:68px}
        .mini-cup { width:48px;height:78px;border-radius:6px 6px 15px 15px;background:linear-gradient(#fff,#d5d5d5);position:relative; }
        .mini-cup:before{content:'';position:absolute;left:6px;right:6px;top:8px;height:8px;border-radius:50%;background:#b9e8f2}
        .glass {
          background: rgba(255,255,255,.86);
          backdrop-filter: blur(14px);
        }
        .hide-scrollbar::-webkit-scrollbar { display:none; }
        .hide-scrollbar { scrollbar-width:none; }
        @media (prefers-reduced-motion: no-preference) {
          .float-food { animation: floatFood 5s ease-in-out infinite; }
          @keyframes floatFood { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
        }

        /* Responsive hardening */
        html, body, #root { max-width: 100%; overflow-x: hidden; }
        .food-visual { width: 100%; max-width: 100%; }
        .illustration { max-width: 90%; }
        .hero-actions { min-width: 0; }
        .cart-drawer { max-width: 100vw; }
        @media (max-width: 640px) {
          .hero-bg { overflow: hidden; }
          .hero-bg .float-food { font-size: clamp(3.5rem, 16vw, 6rem); }
          .food-visual { min-height: 280px !important; }
          .food-visual--compact { min-height: 130px !important; }
          .food-visual .illustration { transform: scale(.78); }
          .food-visual--compact .illustration { transform: scale(.58); }
          header nav { min-width: 0; }
          header nav > div { min-width: 0; }
          header button { flex-shrink: 0; }
          p, button, h1, h2, h3, h4 { overflow-wrap: anywhere; }
          .cart-drawer { width: 100% !important; max-width: 100vw !important; }
        }
        @media (max-width: 380px) {
          .hero-bg h1 { font-size: 2.35rem !important; line-height: 1.02 !important; }
          .hero-actions { flex-direction: column !important; align-items: stretch !important; }
          .hero-actions > * { width: 100% !important; justify-content: center !important; }
          .food-visual { min-height: 240px !important; }
          .food-visual .illustration { transform: scale(.68); }
          .food-visual--compact .illustration { transform: scale(.52); }
        }
      `}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 glass">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navTo('home')} className="font-black text-2xl tracking-tight">
              <span className="text-slate-950">FRY</span><span className="text-red-600">GO</span>
            </button>
            <span className="hidden sm:inline-flex rounded-full bg-red-50 border border-red-100 text-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
              Prepared for FRYGO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            {[
              ['home', 'Home'],
              ['menu', 'Menu'],
              ['deals', 'Deals'],
              ['about', 'About'],
              ['location', 'Location'],
            ].map(([id, label]) => (
              <button key={id} onClick={() => navTo(id)} className="text-slate-600 hover:text-red-600 transition-colors">
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-full bg-slate-950 text-white px-4 py-2.5 text-sm font-extrabold hover:bg-red-600 transition-colors"
            >
              <ShoppingCart size={17} />
              <span className="hidden sm:inline">Order Now</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[11px] grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100"
              aria-label="Open menu"
            >
              {mobileOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3">
            {[
              ['home', 'Home'],
              ['menu', 'Menu'],
              ['deals', 'Deals'],
              ['about', 'About'],
              ['location', 'Location'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => navTo(id)}
                className="block w-full text-left px-3 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <div className="bg-slate-950 text-white text-center text-[11px] sm:text-xs font-bold px-4 py-2">
          A modern digital home for FRYGO • Menu • Deals • Ordering • Location
        </div>

        {/* Hero */}
        <section id="home" className="hero-bg overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-red-100 px-4 py-2 text-xs sm:text-sm font-extrabold text-red-600 shadow-sm">
                <Flame size={15} />
                GOOD FOOD. GOOD MOOD.
              </div>
              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[.94]">
                Fresh flavor.<br />
                <span className="text-red-600">Made for cravings.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600 leading-8">
                A modern restaurant website concept built to put your menu, deals, ordering and location in one simple customer journey.
              </p>
              <div className="hero-actions mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navTo('menu')}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-6 py-3.5 font-extrabold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
                >
                  Explore Menu <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-6 py-3.5 font-extrabold hover:border-red-200 hover:text-red-600 transition-colors"
                >
                  <MessageCircle size={18} /> Order Now
                </button>
              </div>
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  [MapPin, 'Location', RESTAURANT_CONFIG.address],
                  [Clock, 'Hours', RESTAURANT_CONFIG.openingHours],
                  [Phone, 'Contact', RESTAURANT_CONFIG.phone],
                  [MessageCircle, 'WhatsApp', 'Easy ordering'],
                ].map(([Icon, title, value]) => (
                  <div key={title} className="bg-white/75 border border-white rounded-2xl p-3 shadow-sm">
                    <Icon size={17} className="text-red-600" />
                    <p className="mt-2 text-xs font-extrabold text-slate-500">{title}</p>
                    <p className="mt-1 text-xs font-bold text-slate-800 truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-red-200/30 blur-3xl rounded-full" />
              <div className="relative rounded-[2rem] bg-white/70 border border-white p-4 sm:p-6 shadow-2xl shadow-slate-900/10">
                <div className="food-visual min-h-[360px] sm:min-h-[480px]">
                  <div className="absolute top-5 left-5 glass rounded-full px-4 py-2 text-xs font-black text-slate-800 shadow-sm">FRESH & HOT</div>
                  <div className="absolute bottom-5 right-5 glass rounded-full px-4 py-2 text-xs font-black text-red-600 shadow-sm">FRYGO</div>
                  <span className="float-food">🍔🍟</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FRYGO"
              title="Customer Favorites"
              subtitle="A clean showcase for the dishes customers should discover first."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MENU_ITEMS.filter((item) => item.popular).slice(0, 4).map((item) => (
                <article key={item.id} className="group rounded-3xl border border-slate-200 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all">
                  <FoodVisual type={item.visual} compact />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black text-lg">{item.name}</h3>
                      {item.spicy && <span title="Spicy" className="text-red-600">🌶️</span>}
                    </div>
                    <p className="mt-2 text-sm text-slate-500 leading-6">{item.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Final price on launch</span>
                      <button onClick={() => addToCart(item)} className="rounded-full bg-slate-950 text-white px-4 py-2 text-xs font-extrabold hover:bg-red-600 transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="scroll-mt-20 py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="MENU"
              title="Explore Our Menu"
              subtitle="Search dishes and browse categories. Verified prices and final menu items can be added when FRYGO provides them."
            />

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-7">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors ${
                      category === item ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-red-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="relative w-full lg:w-80 shrink-0">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <article key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <FoodVisual type={item.visual} compact />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">{item.category}</span>
                      {item.spicy && <span className="text-xs font-bold text-red-500">Spicy 🌶️</span>}
                    </div>
                    <h3 className="mt-2 font-black text-lg">{item.name}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-6 min-h-[48px]">{item.description}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-400">Final price on launch</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 text-white px-4 py-2.5 text-xs font-extrabold hover:bg-red-600 transition-colors"
                      >
                        Add <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16 text-slate-500 font-semibold">No menu items found.</div>
            )}
          </div>
        </section>

        {/* Deals */}
        <section id="deals" className="scroll-mt-20 py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="OFFERS" title="FRYGO Deals" subtitle="A dedicated place for your best combos and promotions." />
            <div className="grid md:grid-cols-3 gap-5">
              {DEALS.map((deal) => (
                <article key={deal.title} className="rounded-3xl bg-slate-950 text-white p-6 overflow-hidden relative">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-600/20 blur-2xl rounded-full" />
                  <div className="relative">
                    <span className="inline-flex rounded-full bg-red-600 px-3 py-1 text-[11px] font-black">{deal.badge}</span>
                    <h3 className="mt-5 text-2xl font-black">{deal.title}</h3>
                    <p className="mt-2 text-slate-300">{deal.description}</p>
                    <div className="mt-5 flex items-end justify-between">
                      <span className="text-xs text-slate-400">Final price on launch</span>
                      <button onClick={() => navTo('menu')} className="rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-black">
                        Explore <ChevronRight size={14} className="inline" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Promotion */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-slate-950 text-white">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-8 sm:p-12">
                <p className="text-red-400 font-black uppercase tracking-[0.2em] text-xs">SPECIAL OFFERS</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black">Good food deserves a good deal.</h2>
                <p className="mt-4 text-slate-300 leading-7">Keep your latest promotions, family deals and limited-time offers right where customers can see them.</p>
                <button onClick={() => navTo('deals')} className="mt-7 rounded-full bg-red-600 px-6 py-3 font-extrabold hover:bg-red-700">
                  View Deals
                </button>
              </div>
              <div className="p-5 sm:p-8">
                <FoodVisual type="combo" />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-600">ABOUT FRYGO</p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black">Made for food lovers.</h2>
              <p className="mt-5 text-slate-600 leading-8">
                Give customers a quick introduction to FRYGO, your menu and the food experience you want the brand to be known for.
                This presentation keeps the copy flexible until the final brand story is provided.
              </p>
              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                {WHY_CHOOSE.map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-4">
                    <div className="text-2xl">{item.icon}</div>
                    <h3 className="mt-3 font-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-6">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <FoodVisual type="burger" />
            </div>
          </div>
        </section>

        {/* Order Steps */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="HOW IT WORKS" title="Order in a few simple steps" subtitle="A simple customer journey designed around mobile users." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                ['01', 'Choose your food', 'Browse the menu and discover your favorites.'],
                ['02', 'Build your order', 'Add items to your cart.'],
                ['03', 'Send on WhatsApp', 'Send your order details directly to FRYGO.'],
                ['04', 'Enjoy', 'FRYGO confirms availability and final price.'],
              ].map(([num, title, text]) => (
                <div key={num} className="rounded-3xl border border-slate-200 p-6">
                  <span className="text-sm font-black text-red-600">{num}</span>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-2 text-slate-500 leading-6">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="scroll-mt-20 py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="VISIT US" title="Find FRYGO" subtitle="Add the verified restaurant location here so customers can get directions instantly." />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="min-h-[330px] rounded-3xl border border-slate-200 bg-white grid place-items-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 text-red-600 grid place-items-center">
                    <MapPin size={30} />
                  </div>
                  <h3 className="mt-5 text-xl font-black">Google Maps Location</h3>
                  <p className="mt-2 text-slate-500 max-w-sm">The verified FRYGO address and map link will be added before launch.</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950 text-white p-7 sm:p-9">
                <h3 className="text-3xl font-black">FRYGO</h3>
                <div className="mt-7 space-y-5">
                  <div className="flex gap-4"><MapPin className="text-red-400 shrink-0" /><div><p className="font-bold">Address</p><p className="text-slate-400 mt-1">{RESTAURANT_CONFIG.address}</p></div></div>
                  <div className="flex gap-4"><Clock className="text-red-400 shrink-0" /><div><p className="font-bold">Opening Hours</p><p className="text-slate-400 mt-1">{RESTAURANT_CONFIG.openingHours}</p></div></div>
                  <div className="flex gap-4"><Phone className="text-red-400 shrink-0" /><div><p className="font-bold">Phone</p><p className="text-slate-400 mt-1">{RESTAURANT_CONFIG.phone}</p></div></div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={callRestaurant} className="rounded-full bg-white text-slate-950 px-5 py-3 font-extrabold text-sm">
                    <Phone size={16} className="inline mr-2" /> Call Now
                  </button>
                  <button
                    onClick={() => RESTAURANT_CONFIG.googleMapsUrl ? window.open(RESTAURANT_CONFIG.googleMapsUrl, '_blank', 'noopener,noreferrer') : alert('Google Maps link will be added after FRYGO provides its verified location.')}
                    className="rounded-full border border-white/20 px-5 py-3 font-extrabold text-sm hover:bg-white/10"
                  >
                    <Navigation size={16} className="inline mr-2" /> Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="rounded-[2rem] bg-red-600 text-white p-9 sm:p-14">
              <MessageCircle className="mx-auto" size={38} />
              <h2 className="mt-5 text-3xl sm:text-4xl font-black">Ready to order?</h2>
              <p className="mt-3 text-red-100">Connect with FRYGO directly through WhatsApp.</p>
              <button onClick={() => setCartOpen(true)} className="mt-7 rounded-full bg-white text-red-600 px-7 py-3.5 font-black hover:bg-red-50">
                Start Your Order
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-black">FRY<span className="text-red-500">GO</span></div>
              <p className="mt-4 text-slate-400 leading-7 max-w-xs">A modern restaurant experience built around great food, easy discovery and simple ordering.</p>
            </div>
            <div>
              <h3 className="font-black">Quick Links</h3>
              <div className="mt-4 space-y-2 text-slate-400 text-sm">
                {['home','menu','deals','about','location'].map((id) => (
                  <button key={id} onClick={() => navTo(id)} className="block hover:text-white capitalize">{id}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-black">Contact</h3>
              <div className="mt-4 space-y-3 text-slate-400 text-sm">
                <p>{RESTAURANT_CONFIG.address}</p>
                <p>{RESTAURANT_CONFIG.phone}</p>
                <p>{RESTAURANT_CONFIG.openingHours}</p>
              </div>
            </div>
            <div>
              <h3 className="font-black">Order</h3>
              <p className="mt-4 text-slate-400 text-sm leading-6">Use the menu to build your order, then connect through WhatsApp once the verified number is added.</p>
              <button onClick={() => setCartOpen(true)} className="mt-4 rounded-full bg-red-600 px-5 py-2.5 text-sm font-black">Order Now</button>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
            <span>© 2026 FRYGO. All rights reserved.</span>
            <span>Website concept by Mohsin</span>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      {cartCount > 0 && (
        <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
          <button onClick={() => setCartOpen(true)} className="w-full rounded-2xl bg-slate-950 text-white px-5 py-4 shadow-2xl flex items-center justify-between font-black">
            <span className="flex items-center gap-2"><ShoppingCart size={19} /> {cartCount} item{cartCount === 1 ? '' : 's'}</span>
            <span>View Order →</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <button className="absolute inset-0 bg-slate-950/50" onClick={() => setCartOpen(false)} aria-label="Close cart" />
          <aside className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-black text-red-600">FRYGO</p>
                <h2 className="text-2xl font-black">Your Order</h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-xl hover:bg-slate-100" aria-label="Close cart"><X /></button>
            </div>

            <div className="flex-1 overflow-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full grid place-items-center text-center">
                  <div>
                    <ShoppingCart className="mx-auto text-slate-300" size={48} />
                    <h3 className="mt-4 font-black text-xl">Your cart is empty</h3>
                    <p className="mt-2 text-slate-500">Add something delicious from the menu.</p>
                    <button onClick={() => { setCartOpen(false); navTo('menu'); }} className="mt-5 rounded-full bg-red-600 text-white px-5 py-3 font-black">Browse Menu</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 shrink-0">
                          <FoodVisual type={item.visual} compact />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-2">
                            <h3 className="font-black truncate">{item.name}</h3>
                            <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-600" aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Price to be confirmed</p>
                          <div className="mt-3 flex items-center gap-2">
                            <button onClick={() => changeQty(item.id, -1)} className="w-8 h-8 rounded-full border grid place-items-center hover:bg-slate-50"><Minus size={14} /></button>
                            <span className="w-8 text-center font-black">{item.quantity}</span>
                            <button onClick={() => changeQty(item.id, 1)} className="w-8 h-8 rounded-full border grid place-items-center hover:bg-slate-50"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50">
                <p className="text-sm text-slate-500 leading-6">Final prices and availability will be confirmed by FRYGO after the order is sent.</p>
                <button onClick={whatsappOrder} className="mt-4 w-full rounded-2xl bg-green-600 text-white py-4 font-black hover:bg-green-700">
                  <MessageCircle size={19} className="inline mr-2" /> Order on WhatsApp
                </button>
                <button onClick={() => setCart([])} className="mt-2 w-full py-2 text-sm font-bold text-slate-500 hover:text-red-600">Clear Order</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
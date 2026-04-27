import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Locale = "en" | "ar";

type Dict = Record<string, string>;

const translations: Record<Locale, Dict> = {
  en: {
    "brand.name": "Botynex Global",
    "brand.tagline": "AI Trading Bots",
    "search.placeholder": "Search bots, strategies, platforms...",
    "search.title": "Search",
    "nav.dashboard": "Dashboard",
    "nav.marketplace": "Marketplace",
    "nav.top": "Top Bots",
    "nav.new": "New Bots",
    "nav.pro": "Pro Bots",
    "nav.platforms": "Platforms",
    "nav.strategies": "Strategies",
    "nav.portfolio": "Portfolio",
    "nav.myBots": "My Bots",
    "nav.favorites": "Favorites",
    "nav.notifications": "Notifications",
    "nav.settings": "Settings",
    "menu.title": "Menu",
    "user.profile": "Profile",
    "user.settings": "Settings",
    "user.billing": "Billing",
    "user.logout": "Logout",
    "bottom.favorites": "Favorites",
    "bottom.home": "Home",
    "bottom.market": "Market",
    "bottom.guides": "Guides",
    "bottom.quick": "Quick",
    "lang.toggle": "Switch language",
    "theme.toggle": "Toggle theme",
    "notifications.title": "Notifications",
    "notifications.empty": "You're all caught up.",
    "welcome.title": "Welcome to",
    "welcome.subtitle": "Professional AI-powered trading bots marketplace.",
    "stat.activeBots": "Active Bots",
    "stat.dailyPnL": "Daily P&L",
    "stat.totalTrades": "Total Trades",

    // Platforms section
    "platforms.title": "Trading Platforms",
    "platforms.subtitle": "Pick your platform and discover compatible bots in one click.",
    "platforms.searchPlaceholder": "Search platforms (Binance, MT5, TradingView...)",
    "platforms.tab.all": "All",
    "platforms.tab.crypto": "Crypto",
    "platforms.tab.forex": "Forex",
    "platforms.tab.analysis": "Analysis & Signals",
    "platforms.support": "Support",
    "platforms.bots": "bots",
    "platforms.viewBots": "View Bots",
    "platforms.empty.title": "No platforms found",
    "platforms.empty.desc": "Try a different keyword or category.",
    "platforms.cat.crypto": "Cryptocurrency Exchange",
    "platforms.cat.forex": "Forex Platform",
    "platforms.cat.analysis": "Analysis & Signals",
    "platforms.stats.platforms": "Platforms",
    "platforms.stats.bots": "Total Bots",
    "platforms.stats.categories": "Categories",
    "platforms.back": "Back to platforms",
    "platforms.detail.about": "About",
    "platforms.detail.features": "Key Features",
    "platforms.detail.compatible": "Compatible Bots",
    "platforms.detail.visit": "Visit Website",
    "platforms.detail.connect": "Connect Bot",
    "platforms.detail.howItWorks": "How automation works",
    "platforms.detail.howApi": "Connect via API key — bots execute trades automatically with real-time data.",
    "platforms.detail.howEa": "Install the bot file inside the platform and configure it as an Expert Advisor.",
    "platforms.detail.howSignals": "Send TradingView alerts via webhook to trigger your bot's strategy.",
    "platforms.detail.security": "We never store your API keys or sensitive data.",
    "bot.return": "Monthly",
    "bot.winRate": "Win Rate",
    "bot.rating": "Rating",
    "bot.drawdown": "Drawdown",
    "bot.reviews": "reviews",
    "bot.performance": "Performance Overview",
    "bot.compatiblePlatforms": "Compatible Platforms",
    "bot.notFound.title": "Bot not found",
    "bot.notFound.desc": "The bot you're looking for doesn't exist anymore.",
    "bot.risk.low": "Low Risk",
    "bot.risk.medium": "Medium Risk",
    "bot.risk.high": "High Risk",
    "bot.tag.top": "Top",
    "bot.tag.new": "New",
    "bot.tag.pro": "Pro",

    // Marketplace
    "market.title": "Marketplace",
    "market.subtitle": "Browse all trading bots and pick the one that fits your strategy and platform.",
    "market.searchPlaceholder": "Search bots, platforms, strategies...",
    "market.filters": "Filters",
    "market.reset": "Reset filters",
    "market.found": "Found {count} bots",
    "market.filter.platform": "Platform",
    "market.filter.strategy": "Strategy",
    "market.filter.price": "Price",
    "market.filter.rating": "Rating",
    "market.price": "Price",
    "market.price.free": "Free",
    "market.price.lt50": "Under $50",
    "market.price.50to100": "$50 – $100",
    "market.price.gt100": "Over $100",
    "market.free": "Free",
    "market.viewDetails": "View Details",
    "market.empty.title": "No bots found",
    "market.empty.desc": "Try a different keyword or adjust your filters.",
    "market.backToMarket": "Back to Marketplace",
    "market.buyNow": "Buy Now",
    "market.installNow": "Install Now",
    "market.addToFavorites": "Add to Favorites",
    "market.lifetime": "lifetime",
    "market.guarantee": "7-day money-back guarantee",
    "market.riskLevel": "Risk Level",
    "market.youMayLike": "You may also like",
    "market.buyToastTitle": "Order ready",
    "market.buyToastDesc": "{name} added to your cart.",
  },
  ar: {
    "brand.name": "Botynex Global",
    "brand.tagline": "روبوتات تداول بالذكاء الاصطناعي",
    "search.placeholder": "ابحث عن الروبوتات والاستراتيجيات والمنصات...",
    "search.title": "بحث",
    "nav.dashboard": "لوحة التحكم",
    "nav.marketplace": "المتجر",
    "nav.top": "أفضل الروبوتات",
    "nav.new": "أحدث الروبوتات",
    "nav.pro": "الروبوتات الاحترافية",
    "nav.platforms": "المنصات",
    "nav.strategies": "الاستراتيجيات",
    "nav.portfolio": "محفظتي",
    "nav.myBots": "روبوتاتي",
    "nav.favorites": "المفضلة",
    "nav.notifications": "الإشعارات",
    "nav.settings": "الإعدادات",
    "menu.title": "القائمة",
    "user.profile": "الملف الشخصي",
    "user.settings": "الإعدادات",
    "user.billing": "الفوترة",
    "user.logout": "تسجيل الخروج",
    "bottom.favorites": "المفضلة",
    "bottom.home": "الرئيسية",
    "bottom.market": "السوق",
    "bottom.guides": "الإرشادات",
    "bottom.quick": "تنفيذ سريع",
    "lang.toggle": "تغيير اللغة",
    "theme.toggle": "تبديل الوضع",
    "notifications.title": "الإشعارات",
    "notifications.empty": "لا توجد إشعارات جديدة.",
    "welcome.title": "أهلاً بك في",
    "welcome.subtitle": "منصة احترافية لروبوتات التداول المدعومة بالذكاء الاصطناعي.",
    "stat.activeBots": "الروبوتات النشطة",
    "stat.dailyPnL": "الأرباح اليومية",
    "stat.totalTrades": "إجمالي الصفقات",

    // قسم المنصات
    "platforms.title": "منصات التداول",
    "platforms.subtitle": "اختر منصتك واكتشف الروبوتات المتوافقة بنقرة واحدة.",
    "platforms.searchPlaceholder": "ابحث عن منصة (Binance، MT5، TradingView...)",
    "platforms.tab.all": "الكل",
    "platforms.tab.crypto": "كريبتو",
    "platforms.tab.forex": "فوركس",
    "platforms.tab.analysis": "تحليل وإشارات",
    "platforms.support": "الدعم",
    "platforms.bots": "روبوت",
    "platforms.viewBots": "عرض الروبوتات",
    "platforms.empty.title": "لا توجد منصات",
    "platforms.empty.desc": "جرّب كلمة بحث أخرى أو فئة مختلفة.",
    "platforms.cat.crypto": "منصة عملات رقمية",
    "platforms.cat.forex": "منصة فوركس",
    "platforms.cat.analysis": "تحليل وإشارات",
    "platforms.stats.platforms": "منصة",
    "platforms.stats.bots": "إجمالي الروبوتات",
    "platforms.stats.categories": "فئات",
    "platforms.back": "رجوع إلى المنصات",
    "platforms.detail.about": "نبذة عن المنصة",
    "platforms.detail.features": "أهم المميزات",
    "platforms.detail.compatible": "الروبوتات المتوافقة",
    "platforms.detail.visit": "زيارة الموقع",
    "platforms.detail.connect": "ربط الروبوت",
    "platforms.detail.howItWorks": "آلية عمل الأتمتة",
    "platforms.detail.howApi": "ربط عبر مفتاح API — ينفذ الروبوت الصفقات تلقائيًا ببيانات لحظية.",
    "platforms.detail.howEa": "حمّل ملف الروبوت داخل المنصة وشغّله كـ Expert Advisor.",
    "platforms.detail.howSignals": "أرسل تنبيهات TradingView عبر Webhook لتشغيل استراتيجية الروبوت.",
    "platforms.detail.security": "لا نحفظ أي مفاتيح API أو بيانات حساسة.",
    "bot.return": "العائد الشهري",
    "bot.winRate": "نسبة النجاح",
    "bot.rating": "التقييم",
    "bot.risk.low": "مخاطرة منخفضة",
    "bot.risk.medium": "مخاطرة متوسطة",
    "bot.risk.high": "مخاطرة عالية",
    "bot.tag.top": "الأفضل",
    "bot.tag.new": "جديد",
    "bot.tag.pro": "احترافي",
  },
};

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);
const STORAGE_KEY = "botynex-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem(STORAGE_KEY) as Locale) || "en";
  });

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, dir]);

  const t = (key: string) => translations[locale][key] ?? key;
  const setLocale = (l: Locale) => setLocaleState(l);
  const toggleLocale = () => setLocaleState((p) => (p === "en" ? "ar" : "en"));

  return (
    <I18nContext.Provider value={{ locale, dir, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

const fallbackI18n: I18nContextValue = {
  locale: "en",
  dir: "ltr",
  t: (key: string) => translations.en[key] ?? key,
  setLocale: () => {},
  toggleLocale: () => {},
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  return ctx ?? fallbackI18n;
}

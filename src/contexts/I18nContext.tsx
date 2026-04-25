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

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

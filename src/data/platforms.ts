export type PlatformCategory = "crypto" | "forex" | "analysis";
export type SupportType = "API" | "EA" | "Signals";

export interface Platform {
  id: string;
  name: string;
  slug: string;
  category: PlatformCategory;
  /** Tailwind gradient classes for the logo tile */
  color: string;
  /** Short brand mark text (1-3 chars) */
  mark: string;
  website: string;
  support: SupportType[];
  botsCount: number;
  rating: number; // 0-5
  descriptionEn: string;
  descriptionAr: string;
  features: { en: string; ar: string }[];
}

export interface BotPreview {
  id: string;
  slug?: string;
  name: string;
  strategy: { en: string; ar: string };
  monthlyReturn: number; // %
  winRate: number; // %
  rating: number; // 0-5
  risk: "low" | "medium" | "high";
  platforms: string[]; // platform ids
  tag?: "top" | "new" | "pro";
  /** Price in USD; 0 = free */
  price?: number;
  description?: { en: string; ar: string };
  reviewsCount?: number;
  drawdown?: number; // %
}

export const platforms: Platform[] = [
  // 🟡 Crypto
  {
    id: "binance",
    slug: "binance",
    name: "Binance",
    category: "crypto",
    color: "from-yellow-400 to-amber-600",
    mark: "B",
    website: "https://www.binance.com",
    support: ["API"],
    botsCount: 48,
    rating: 4.9,
    descriptionEn: "World's largest crypto exchange with deep liquidity and powerful API.",
    descriptionAr: "أكبر منصة كريبتو عالميًا بسيولة عميقة وواجهة API قوية.",
    features: [
      { en: "Spot, Futures & Margin", ar: "فوري، عقود، وهامش" },
      { en: "Powerful REST & WebSocket API", ar: "واجهة API متقدمة" },
      { en: "Low fees & high liquidity", ar: "رسوم منخفضة وسيولة عالية" },
    ],
  },
  {
    id: "bybit",
    slug: "bybit",
    name: "Bybit",
    category: "crypto",
    color: "from-amber-500 to-orange-600",
    mark: "By",
    website: "https://www.bybit.com",
    support: ["API"],
    botsCount: 32,
    rating: 4.7,
    descriptionEn: "Derivatives-focused exchange with fast execution and great API.",
    descriptionAr: "منصة متخصصة في المشتقات بتنفيذ سريع وAPI ممتاز.",
    features: [
      { en: "Perpetual Futures", ar: "عقود دائمة" },
      { en: "Copy trading support", ar: "دعم نسخ الصفقات" },
      { en: "Fast order matching", ar: "مطابقة أوامر سريعة" },
    ],
  },
  {
    id: "kucoin",
    slug: "kucoin",
    name: "KuCoin",
    category: "crypto",
    color: "from-emerald-400 to-teal-600",
    mark: "K",
    website: "https://www.kucoin.com",
    support: ["API"],
    botsCount: 24,
    rating: 4.5,
    descriptionEn: "Wide token selection and built-in trading bot infrastructure.",
    descriptionAr: "تشكيلة عملات واسعة وبنية مدمجة لروبوتات التداول.",
    features: [
      { en: "700+ tokens", ar: "أكثر من 700 عملة" },
      { en: "Spot & Futures API", ar: "API فوري ومستقبلي" },
      { en: "Sub-accounts", ar: "حسابات فرعية" },
    ],
  },
  {
    id: "okx",
    slug: "okx",
    name: "OKX",
    category: "crypto",
    color: "from-zinc-400 to-zinc-700",
    mark: "OK",
    website: "https://www.okx.com",
    support: ["API"],
    botsCount: 28,
    rating: 4.6,
    descriptionEn: "Top-tier exchange with advanced derivatives and unified API.",
    descriptionAr: "منصة من الطراز الأول بمشتقات متقدمة وAPI موحد.",
    features: [
      { en: "Unified trading account", ar: "حساب تداول موحد" },
      { en: "Options & Futures", ar: "خيارات وعقود" },
      { en: "Advanced order types", ar: "أوامر متقدمة" },
    ],
  },
  {
    id: "gateio",
    slug: "gate-io",
    name: "Gate.io",
    category: "crypto",
    color: "from-sky-400 to-blue-600",
    mark: "G",
    website: "https://www.gate.io",
    support: ["API"],
    botsCount: 18,
    rating: 4.3,
    descriptionEn: "Long-running exchange with broad market coverage.",
    descriptionAr: "منصة عريقة بتغطية واسعة للأسواق.",
    features: [
      { en: "Wide altcoin coverage", ar: "تغطية واسعة للعملات البديلة" },
      { en: "Margin trading", ar: "تداول بالهامش" },
      { en: "Stable API", ar: "API مستقر" },
    ],
  },
  {
    id: "kraken",
    slug: "kraken",
    name: "Kraken",
    category: "crypto",
    color: "from-violet-500 to-purple-700",
    mark: "Kr",
    website: "https://www.kraken.com",
    support: ["API"],
    botsCount: 14,
    rating: 4.6,
    descriptionEn: "Established US-based exchange with strong security record.",
    descriptionAr: "منصة أمريكية معروفة بسجل أمان قوي.",
    features: [
      { en: "Top-tier security", ar: "أمان عالي" },
      { en: "Fiat on/off ramps", ar: "إيداع وسحب نقدي" },
      { en: "Pro trading API", ar: "API احترافي" },
    ],
  },
  {
    id: "coinbase",
    slug: "coinbase",
    name: "Coinbase",
    category: "crypto",
    color: "from-blue-500 to-indigo-700",
    mark: "C",
    website: "https://www.coinbase.com",
    support: ["API"],
    botsCount: 12,
    rating: 4.4,
    descriptionEn: "Beginner-friendly exchange with regulated US infrastructure.",
    descriptionAr: "منصة سهلة للمبتدئين ببنية أمريكية منظمة.",
    features: [
      { en: "Regulated environment", ar: "بيئة منظمة" },
      { en: "Advanced Trade API", ar: "API تداول متقدم" },
      { en: "Reliable uptime", ar: "موثوقية عالية" },
    ],
  },
  {
    id: "bitget",
    slug: "bitget",
    name: "Bitget",
    category: "crypto",
    color: "from-cyan-400 to-blue-600",
    mark: "Bg",
    website: "https://www.bitget.com",
    support: ["API"],
    botsCount: 21,
    rating: 4.5,
    descriptionEn: "Copy-trading powerhouse with strong derivatives offering.",
    descriptionAr: "منصة قوية في نسخ الصفقات والمشتقات.",
    features: [
      { en: "Best-in-class copy trading", ar: "أفضل نسخ صفقات" },
      { en: "Futures API", ar: "API للعقود" },
      { en: "Bot grid support", ar: "دعم شبكة الروبوتات" },
    ],
  },
  {
    id: "mexc",
    slug: "mexc",
    name: "MEXC",
    category: "crypto",
    color: "from-blue-400 to-cyan-600",
    mark: "M",
    website: "https://www.mexc.com",
    support: ["API"],
    botsCount: 16,
    rating: 4.2,
    descriptionEn: "Fast listings and broad altcoin coverage.",
    descriptionAr: "إدراج سريع وتغطية واسعة للعملات البديلة.",
    features: [
      { en: "New listings daily", ar: "إدراجات يومية" },
      { en: "Spot & Futures", ar: "فوري وعقود" },
      { en: "Low taker fees", ar: "رسوم منخفضة" },
    ],
  },
  {
    id: "cryptocom",
    slug: "crypto-com",
    name: "Crypto.com",
    category: "crypto",
    color: "from-blue-600 to-indigo-800",
    mark: "Cd",
    website: "https://www.crypto.com",
    support: ["API"],
    botsCount: 10,
    rating: 4.3,
    descriptionEn: "Mobile-first exchange with global card and payment integrations.",
    descriptionAr: "منصة تركز على الجوال مع تكامل دفع عالمي.",
    features: [
      { en: "Mobile-first UX", ar: "تجربة تركز على الجوال" },
      { en: "Exchange API", ar: "API للتبادل" },
      { en: "Card integrations", ar: "تكامل بطاقات" },
    ],
  },

  // 🔵 Forex
  {
    id: "mt4",
    slug: "metatrader-4",
    name: "MetaTrader 4",
    category: "forex",
    color: "from-blue-500 to-blue-800",
    mark: "MT4",
    website: "https://www.metatrader4.com",
    support: ["EA"],
    botsCount: 35,
    rating: 4.8,
    descriptionEn: "The industry standard for forex trading and Expert Advisors.",
    descriptionAr: "المعيار العالمي لتداول الفوركس والروبوتات (EAs).",
    features: [
      { en: "Expert Advisors (EAs)", ar: "روبوتات خبيرة (EAs)" },
      { en: "Custom indicators", ar: "مؤشرات مخصصة" },
      { en: "MQL4 scripting", ar: "برمجة MQL4" },
    ],
  },
  {
    id: "mt5",
    slug: "metatrader-5",
    name: "MetaTrader 5",
    category: "forex",
    color: "from-indigo-500 to-blue-800",
    mark: "MT5",
    website: "https://www.metatrader5.com",
    support: ["EA"],
    botsCount: 41,
    rating: 4.8,
    descriptionEn: "Multi-asset successor to MT4 with advanced backtesting.",
    descriptionAr: "خليفة MT4 متعدد الأصول مع اختبار رجعي متقدم.",
    features: [
      { en: "Multi-asset support", ar: "دعم متعدد الأصول" },
      { en: "Strategy tester", ar: "اختبار الاستراتيجيات" },
      { en: "MQL5 scripting", ar: "برمجة MQL5" },
    ],
  },
  {
    id: "ctrader",
    slug: "ctrader",
    name: "cTrader",
    category: "forex",
    color: "from-rose-500 to-pink-700",
    mark: "cT",
    website: "https://ctrader.com",
    support: ["EA"],
    botsCount: 17,
    rating: 4.5,
    descriptionEn: "Modern ECN-focused platform with cBots automation.",
    descriptionAr: "منصة حديثة تركز على ECN مع أتمتة cBots.",
    features: [
      { en: "cBots automation", ar: "أتمتة cBots" },
      { en: "Level II pricing", ar: "أسعار المستوى الثاني" },
      { en: "C# scripting", ar: "برمجة C#" },
    ],
  },
  {
    id: "ninjatrader",
    slug: "ninjatrader",
    name: "NinjaTrader",
    category: "forex",
    color: "from-orange-500 to-red-700",
    mark: "Nt",
    website: "https://ninjatrader.com",
    support: ["EA"],
    botsCount: 9,
    rating: 4.4,
    descriptionEn: "Pro-grade platform for futures and advanced automation.",
    descriptionAr: "منصة احترافية للعقود المستقبلية والأتمتة المتقدمة.",
    features: [
      { en: "Futures specialist", ar: "متخصصة في العقود المستقبلية" },
      { en: "NinjaScript C#", ar: "برمجة NinjaScript" },
      { en: "Advanced charting", ar: "رسوم بيانية متقدمة" },
    ],
  },
  {
    id: "fxcm",
    slug: "trading-station",
    name: "Trading Station",
    category: "forex",
    color: "from-emerald-500 to-green-700",
    mark: "FX",
    website: "https://www.fxcm.com",
    support: ["EA"],
    botsCount: 6,
    rating: 4.1,
    descriptionEn: "FXCM's proprietary platform with strong analytics.",
    descriptionAr: "منصة FXCM الخاصة بأدوات تحليل قوية.",
    features: [
      { en: "Algorithmic trading", ar: "تداول خوارزمي" },
      { en: "Forex specialist", ar: "متخصصة في الفوركس" },
      { en: "Real-time data", ar: "بيانات لحظية" },
    ],
  },

  // 🟣 Analysis & Signals
  {
    id: "tradingview",
    slug: "tradingview",
    name: "TradingView",
    category: "analysis",
    color: "from-fuchsia-500 to-purple-700",
    mark: "TV",
    website: "https://www.tradingview.com",
    support: ["Signals"],
    botsCount: 22,
    rating: 4.9,
    descriptionEn: "World-class charts and alerts to power signal-based bots.",
    descriptionAr: "أفضل رسوم بيانية وتنبيهات لتشغيل روبوتات الإشارات.",
    features: [
      { en: "Pine Script alerts", ar: "تنبيهات Pine Script" },
      { en: "Webhooks integration", ar: "تكامل Webhooks" },
      { en: "Signal-based strategies", ar: "استراتيجيات إشارات" },
    ],
  },
];

export const bots: BotPreview[] = [
  {
    id: "alpha-grid",
    slug: "alpha-grid-pro",
    name: "Alpha Grid Pro",
    strategy: { en: "Grid Trading", ar: "تداول شبكي" },
    monthlyReturn: 12.4,
    winRate: 68,
    rating: 4.8,
    reviewsCount: 412,
    drawdown: 8,
    risk: "medium",
    platforms: ["binance", "bybit", "okx"],
    tag: "top",
    price: 79,
    description: {
      en: "Smart grid bot that profits from sideways and ranging markets with adaptive spacing.",
      ar: "روبوت شبكي ذكي يحقق أرباحًا من الأسواق العرضية بمسافات متكيّفة.",
    },
  },
  {
    id: "scalp-x",
    slug: "scalpx-ai",
    name: "ScalpX AI",
    strategy: { en: "AI Scalping", ar: "سكالبينغ بالذكاء الاصطناعي" },
    monthlyReturn: 18.7,
    winRate: 72,
    rating: 4.7,
    reviewsCount: 318,
    drawdown: 14,
    risk: "high",
    platforms: ["binance", "bybit", "mexc", "bitget"],
    tag: "pro",
    price: 149,
    description: {
      en: "AI-driven scalper that captures micro-trends on 1m–5m timeframes with ultra-fast execution.",
      ar: "سكالبر مدعوم بالذكاء الاصطناعي يلتقط الاتجاهات الدقيقة على فريمات 1د–5د بتنفيذ فائق السرعة.",
    },
  },
  {
    id: "trend-rider",
    slug: "trend-rider",
    name: "Trend Rider",
    strategy: { en: "Trend Following", ar: "تتبع الاتجاه" },
    monthlyReturn: 8.3,
    winRate: 64,
    rating: 4.5,
    reviewsCount: 256,
    drawdown: 6,
    risk: "low",
    platforms: ["mt4", "mt5", "ctrader"],
    tag: "top",
    price: 49,
    description: {
      en: "Classic trend-following EA with strong risk management and multi-timeframe confirmation.",
      ar: "روبوت تتبع اتجاه كلاسيكي بإدارة مخاطر قوية وتأكيد متعدد الأطر الزمنية.",
    },
  },
  {
    id: "fx-pulse",
    slug: "fx-pulse-ea",
    name: "FX Pulse EA",
    strategy: { en: "Breakout EA", ar: "روبوت الاختراق" },
    monthlyReturn: 9.6,
    winRate: 61,
    rating: 4.4,
    reviewsCount: 189,
    drawdown: 10,
    risk: "medium",
    platforms: ["mt4", "mt5"],
    price: 59,
    description: {
      en: "Breakout strategy EA targeting major forex pairs during London/New York sessions.",
      ar: "روبوت اختراق يستهدف أزواج الفوركس الرئيسية خلال جلسات لندن ونيويورك.",
    },
  },
  {
    id: "tv-signal",
    slug: "tv-signal-hub",
    name: "TV Signal Hub",
    strategy: { en: "Webhook Signals", ar: "إشارات Webhook" },
    monthlyReturn: 11.1,
    winRate: 66,
    rating: 4.6,
    reviewsCount: 142,
    drawdown: 7,
    risk: "medium",
    platforms: ["tradingview"],
    tag: "new",
    price: 0,
    description: {
      en: "Free TradingView webhook router that connects your Pine Script alerts to any exchange.",
      ar: "موجّه Webhook مجاني من TradingView يربط تنبيهات Pine Script بأي منصة تداول.",
    },
  },
  {
    id: "nova-arb",
    slug: "nova-arbitrage",
    name: "Nova Arbitrage",
    strategy: { en: "Cross-Exchange Arb", ar: "موازنة بين المنصات" },
    monthlyReturn: 6.9,
    winRate: 81,
    rating: 4.6,
    reviewsCount: 98,
    drawdown: 3,
    risk: "low",
    platforms: ["binance", "kucoin", "okx", "kraken"],
    price: 99,
    description: {
      en: "Detects price gaps across exchanges and executes risk-free arbitrage in milliseconds.",
      ar: "يكتشف فجوات الأسعار بين المنصات وينفّذ صفقات موازنة بدون مخاطر خلال أجزاء من الثانية.",
    },
  },
  {
    id: "dca-master",
    slug: "dca-master",
    name: "DCA Master",
    strategy: { en: "DCA Strategy", ar: "استراتيجية DCA" },
    monthlyReturn: 5.4,
    winRate: 74,
    rating: 4.3,
    reviewsCount: 211,
    drawdown: 4,
    risk: "low",
    platforms: ["binance", "coinbase", "kraken", "cryptocom"],
    tag: "new",
    price: 0,
    description: {
      en: "Automated dollar-cost-averaging bot — perfect for long-term crypto investors.",
      ar: "روبوت متوسّط التكلفة بالدولار آليًا — مثالي للمستثمرين على المدى البعيد.",
    },
  },
  {
    id: "futures-edge",
    slug: "futures-edge",
    name: "Futures Edge",
    strategy: { en: "Momentum Futures", ar: "زخم العقود" },
    monthlyReturn: 22.5,
    winRate: 58,
    rating: 4.5,
    reviewsCount: 167,
    drawdown: 18,
    risk: "high",
    platforms: ["bybit", "okx", "bitget"],
    tag: "pro",
    price: 199,
    description: {
      en: "Aggressive momentum bot for perpetual futures — high reward, high risk.",
      ar: "روبوت زخم عدواني للعقود الدائمة — عائد مرتفع ومخاطرة مرتفعة.",
    },
  },
  {
    id: "ninja-trend",
    slug: "ninja-trend",
    name: "Ninja Trend",
    strategy: { en: "Multi-TF Trend", ar: "اتجاه متعدد الأطر" },
    monthlyReturn: 7.8,
    winRate: 63,
    rating: 4.2,
    reviewsCount: 76,
    drawdown: 9,
    risk: "medium",
    platforms: ["ninjatrader", "mt5"],
    price: 39,
    description: {
      en: "Multi-timeframe trend bot tuned for futures markets with conservative position sizing.",
      ar: "روبوت اتجاه متعدد الأطر مضبوط لأسواق العقود مع حجم مراكز محافظ.",
    },
  },
];

export function getPlatformBySlug(slug: string) {
  return platforms.find((p) => p.slug === slug);
}

export function getBotsForPlatform(platformId: string) {
  return bots.filter((b) => b.platforms.includes(platformId));
}

export function getBotBySlug(slug: string) {
  return bots.find((b) => b.slug === slug || b.id === slug);
}

export function getPlatformById(id: string) {
  return platforms.find((p) => p.id === id);
}

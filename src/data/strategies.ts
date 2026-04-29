import {
  Brain,
  TrendingUp,
  Repeat,
  Zap,
  Shuffle,
  Target,
  Layers,
  Activity,
  type LucideIcon,
} from "lucide-react";

export interface Strategy {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: LucideIcon;
  color: string; // tailwind gradient
  risk: "low" | "medium" | "high";
  bestFor: { en: string; ar: string };
  botsCount: number;
}

export const strategies: Strategy[] = [
  {
    id: "grid",
    slug: "grid-trading",
    name: { en: "Grid Trading", ar: "التداول الشبكي" },
    description: {
      en: "Place buy/sell orders at preset intervals to profit from market volatility.",
      ar: "ضع أوامر شراء وبيع على فواصل محددة للربح من تذبذب السوق.",
    },
    icon: Layers,
    color: "from-blue-500 to-cyan-600",
    risk: "medium",
    bestFor: { en: "Sideways markets", ar: "الأسواق العرضية" },
    botsCount: 18,
  },
  {
    id: "scalping",
    slug: "ai-scalping",
    name: { en: "AI Scalping", ar: "السكالبينغ بالذكاء الاصطناعي" },
    description: {
      en: "Ultra-fast trades targeting micro price movements on low timeframes.",
      ar: "صفقات فائقة السرعة تستهدف تحركات سعرية صغيرة على أطر زمنية منخفضة.",
    },
    icon: Zap,
    color: "from-rose-500 to-pink-700",
    risk: "high",
    bestFor: { en: "Volatile markets", ar: "الأسواق المتقلبة" },
    botsCount: 12,
  },
  {
    id: "trend",
    slug: "trend-following",
    name: { en: "Trend Following", ar: "تتبع الاتجاه" },
    description: {
      en: "Ride sustained directional moves using moving averages and momentum.",
      ar: "تتبع الاتجاهات القوية باستخدام المتوسطات المتحركة والزخم.",
    },
    icon: TrendingUp,
    color: "from-emerald-500 to-green-700",
    risk: "low",
    bestFor: { en: "Trending markets", ar: "الأسواق ذات الاتجاه" },
    botsCount: 22,
  },
  {
    id: "dca",
    slug: "dca",
    name: { en: "DCA", ar: "متوسط التكلفة" },
    description: {
      en: "Automate periodic purchases to smooth out cost basis over time.",
      ar: "أتمتة الشراء الدوري لتنعيم متوسط التكلفة بمرور الوقت.",
    },
    icon: Repeat,
    color: "from-indigo-500 to-blue-700",
    risk: "low",
    bestFor: { en: "Long-term investors", ar: "المستثمرين طويل الأجل" },
    botsCount: 9,
  },
  {
    id: "arbitrage",
    slug: "arbitrage",
    name: { en: "Arbitrage", ar: "المراجحة" },
    description: {
      en: "Exploit price differences across exchanges with risk-controlled execution.",
      ar: "استغلال فروق الأسعار بين المنصات بتنفيذ مضبوط المخاطر.",
    },
    icon: Shuffle,
    color: "from-violet-500 to-purple-700",
    risk: "low",
    bestFor: { en: "Multi-exchange traders", ar: "متداولين متعددي المنصات" },
    botsCount: 6,
  },
  {
    id: "breakout",
    slug: "breakout",
    name: { en: "Breakout", ar: "الاختراق" },
    description: {
      en: "Enter trades when price breaks key support/resistance with volume.",
      ar: "الدخول عند اختراق السعر للدعوم والمقاومات الرئيسية بحجم تداول.",
    },
    icon: Target,
    color: "from-orange-500 to-red-700",
    risk: "medium",
    bestFor: { en: "News & sessions", ar: "الأخبار والجلسات النشطة" },
    botsCount: 14,
  },
  {
    id: "ai",
    slug: "ai-strategies",
    name: { en: "AI Strategies", ar: "استراتيجيات الذكاء الاصطناعي" },
    description: {
      en: "Machine-learning models adapt to changing markets in real time.",
      ar: "نماذج تعلم آلي تتكيف مع تغيرات السوق في الوقت الفعلي.",
    },
    icon: Brain,
    color: "from-fuchsia-500 to-purple-700",
    risk: "medium",
    bestFor: { en: "All market conditions", ar: "جميع ظروف السوق" },
    botsCount: 8,
  },
  {
    id: "momentum",
    slug: "momentum",
    name: { en: "Momentum", ar: "الزخم" },
    description: {
      en: "Capture strong directional bursts using momentum indicators.",
      ar: "التقاط الموجات القوية باستخدام مؤشرات الزخم.",
    },
    icon: Activity,
    color: "from-amber-500 to-orange-700",
    risk: "high",
    bestFor: { en: "Futures markets", ar: "أسواق العقود" },
    botsCount: 11,
  },
];

export function getStrategyBySlug(slug: string) {
  return strategies.find((s) => s.slug === slug);
}

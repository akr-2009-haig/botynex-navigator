export type NotificationType = "trade" | "system" | "alert" | "promo";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: { en: string; ar: string };
  message: { en: string; ar: string };
  time: string; // ISO
  read: boolean;
}

export const initialNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "trade",
    title: { en: "Trade closed in profit", ar: "تم إغلاق صفقة بربح" },
    message: {
      en: "Alpha Grid Pro closed BTCUSDT with +1.84%.",
      ar: "أغلق Alpha Grid Pro صفقة BTCUSDT بربح 1.84%.",
    },
    time: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    read: false,
  },
  {
    id: "n2",
    type: "alert",
    title: { en: "High drawdown warning", ar: "تحذير انخفاض كبير" },
    message: {
      en: "ScalpX AI hit 12% drawdown today. Review your risk settings.",
      ar: "وصل ScalpX AI إلى انخفاض 12% اليوم. راجع إعدادات المخاطر.",
    },
    time: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    read: false,
  },
  {
    id: "n3",
    type: "system",
    title: { en: "New platform supported", ar: "منصة جديدة مدعومة" },
    message: {
      en: "Bitget API v3 is now live across compatible bots.",
      ar: "أصبح Bitget API v3 مفعّلًا في الروبوتات المتوافقة.",
    },
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
  },
  {
    id: "n4",
    type: "promo",
    title: { en: "30% off Pro Bots", ar: "خصم 30% على الروبوتات الاحترافية" },
    message: {
      en: "Limited time offer on all Pro-tier bots — ends in 24h.",
      ar: "عرض محدود على جميع الروبوتات الاحترافية — ينتهي خلال 24 ساعة.",
    },
    time: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    read: true,
  },
];

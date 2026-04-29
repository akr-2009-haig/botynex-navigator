import { Bell, AlertTriangle, TrendingUp, Info, Tag } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/data/notifications";

const iconMap: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  trade: TrendingUp,
  alert: AlertTriangle,
  system: Info,
  promo: Tag,
};

const toneMap: Record<NotificationType, string> = {
  trade: "text-emerald-500 bg-emerald-500/10",
  alert: "text-amber-500 bg-amber-500/10",
  system: "text-primary bg-primary/10",
  promo: "text-violet-500 bg-violet-500/10",
};

function timeAgo(iso: string, t: (k: string) => string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return t("notifications.justNow");
  if (m < 60) return t("notifications.minAgo").replace("{n}", String(m));
  const h = Math.floor(m / 60);
  if (h < 24) return t("notifications.hAgo").replace("{n}", String(h));
  const d = Math.floor(h / 24);
  return t("notifications.dAgo").replace("{n}", String(d));
}

const NotificationsPage = () => {
  const { t, locale } = useI18n();
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-3xl mx-auto">
        <PageHeader
          title={t("notifications.title")}
          subtitle={`${unreadCount} ${t("notifications.unread")}`}
          highlight="🔔"
          actions={
            unreadCount > 0 ? (
              <Button variant="outline" size="sm" onClick={markAllRead}>
                {t("notifications.markAllRead")}
              </Button>
            ) : null
          }
        />

        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <Bell className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">{t("notifications.empty")}</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => {
              const Icon = iconMap[n.type];
              const title = locale === "ar" ? n.title.ar : n.title.en;
              const msg = locale === "ar" ? n.message.ar : n.message.en;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => markRead(n.id)}
                    className={cn(
                      "w-full text-start rounded-xl border border-border bg-card p-4 hover:bg-secondary/30 transition-colors flex gap-3",
                      !n.read && "border-primary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                        toneMap[n.type],
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm">{title}</h3>
                        {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{msg}</p>
                      <p className="text-[11px] text-muted-foreground/80 mt-1.5">{timeAgo(n.time, t)}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </AppLayout>
  );
};

export default NotificationsPage;

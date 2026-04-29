import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Briefcase, BarChart3, TrendingUp, Bot, Activity, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useI18n } from "@/contexts/I18nContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { bots } from "@/data/platforms";
import { equityCurve } from "@/data/portfolio";
import { MarketplaceBotCard } from "@/components/marketplace/MarketplaceBotCard";
import { cn } from "@/lib/utils";

const Index = () => {
  const { t, dir } = useI18n();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const featured = [...bots].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const max = Math.max(...equityCurve.map((e) => e.value));
  const min = Math.min(...equityCurve.map((e) => e.value));

  const stats = [
    { key: "stat.activeBots", value: "12", icon: Bot },
    { key: "stat.dailyPnL", value: "+4.8%", icon: TrendingUp, tone: "positive" as const },
    { key: "stat.totalTrades", value: "1,284", icon: Activity },
    { key: "stat.winRate", value: "68%", icon: BarChart3, tone: "positive" as const },
  ];

  const actions = [
    { key: "dashboard.exploreMarket", icon: Store, route: "/marketplace", color: "from-blue-500 to-cyan-600" },
    { key: "dashboard.viewPortfolio", icon: Briefcase, route: "/portfolio", color: "from-emerald-500 to-teal-600" },
    { key: "dashboard.connectPlatform", icon: BarChart3, route: "/platforms", color: "from-violet-500 to-purple-600" },
  ];

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("welcome.title")} <span className="gradient-text">Botynex Global</span>
          </h1>
          <p className="text-muted-foreground">{t("welcome.subtitle")}</p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <Icon
                  className={cn(
                    "h-5 w-5 mb-2",
                    s.tone === "positive" ? "text-emerald-500" : "text-primary",
                  )}
                />
                <p className={cn("text-2xl font-bold", s.tone === "positive" && "text-emerald-500")}>
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{t(s.key)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick actions */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-10 mb-3">
          {t("dashboard.quickActions")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => navigate(a.route)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-start hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div
                  className={cn(
                    "absolute -top-12 -end-12 h-32 w-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br group-hover:opacity-40 transition-opacity",
                    a.color,
                  )}
                />
                <div
                  className={cn(
                    "relative h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg mb-3",
                    a.color,
                  )}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t(a.key)}</span>
                  <ArrowRight className={cn("h-4 w-4 text-primary", dir === "rtl" && "rotate-180")} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Equity curve */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            {t("dashboard.equityCurve")}
          </h2>
          <div className="flex items-end gap-2 h-32">
            {equityCurve.map((p, i) => {
              const h = ((p.value - min) / (max - min)) * 100 + 10;
              return (
                <div key={p.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="w-full rounded-t-md gradient-primary"
                  />
                  <span className="text-[10px] text-muted-foreground">{p.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured */}
        <div className="mt-10 flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t("dashboard.featured")}
          </h2>
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            {t("common.viewAll")}
            <ArrowRight className={cn("h-3.5 w-3.5", dir === "rtl" && "rotate-180")} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((b, i) => (
            <MarketplaceBotCard
              key={b.id}
              bot={b}
              index={i}
              isFavorite={isFavorite(b.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, Activity } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "@/contexts/I18nContext";
import { portfolioPositions, equityCurve } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const { t } = useI18n();
  const open = portfolioPositions.filter((p) => p.status === "open");
  const history = portfolioPositions.filter((p) => p.status === "closed");

  const balance = 10580;
  const openPnL = open.reduce((acc, p) => acc + p.pnl, 0);
  const totalPnL = 5.8;

  const max = Math.max(...equityCurve.map((e) => e.value));
  const min = Math.min(...equityCurve.map((e) => e.value));

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <PageHeader title={t("portfolio.title")} subtitle={t("portfolio.subtitle")} highlight="💼" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Wallet} label={t("portfolio.balance")} value={`$${balance.toLocaleString()}`} />
          <StatCard
            icon={TrendingUp}
            label={t("portfolio.openPnL")}
            value={`+${openPnL.toFixed(2)}%`}
            tone="positive"
          />
          <StatCard
            icon={Activity}
            label={t("portfolio.totalPnL")}
            value={`+${totalPnL}%`}
            tone="positive"
          />
          <StatCard icon={TrendingDown} label={t("bot.drawdown")} value="-3.2%" tone="warn" />
        </div>

        {/* Equity curve */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-5 mb-6"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            {t("dashboard.equityCurve")}
          </h2>
          <div className="flex items-end gap-2 h-40">
            {equityCurve.map((p, i) => {
              const h = ((p.value - min) / (max - min)) * 100 + 10;
              return (
                <div key={p.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="w-full rounded-t-md gradient-primary"
                  />
                  <span className="text-[10px] text-muted-foreground">{p.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Positions */}
        <Tabs defaultValue="open">
          <TabsList>
            <TabsTrigger value="open">
              {t("portfolio.openPositions")} ({open.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              {t("portfolio.history")} ({history.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="open" className="mt-4">
            <PositionsTable positions={open} />
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <PositionsTable positions={history} />
          </TabsContent>
        </Tabs>
      </section>
    </AppLayout>
  );
};

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "default" | "positive" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon
        className={cn(
          "h-5 w-5 mb-2",
          tone === "positive" && "text-emerald-500",
          tone === "warn" && "text-amber-500",
          tone === "default" && "text-primary",
        )}
      />
      <div
        className={cn(
          "text-xl font-bold",
          tone === "positive" && "text-emerald-500",
          tone === "warn" && "text-amber-500",
        )}
      >
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}

function PositionsTable({ positions }: { positions: typeof portfolioPositions }) {
  const { t } = useI18n();
  if (positions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
        {t("portfolio.empty")}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-start p-3">{t("portfolio.bot")}</th>
              <th className="text-start p-3">{t("portfolio.pair")}</th>
              <th className="text-start p-3">{t("portfolio.side")}</th>
              <th className="text-end p-3">{t("portfolio.entry")}</th>
              <th className="text-end p-3">{t("portfolio.current")}</th>
              <th className="text-end p-3">{t("portfolio.qty")}</th>
              <th className="text-end p-3">{t("portfolio.pnl")}</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-secondary/30">
                <td className="p-3 font-semibold">{p.botName}</td>
                <td className="p-3">{p.pair}</td>
                <td className="p-3">
                  <Badge
                    className={cn(
                      "border-0",
                      p.side === "long"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-rose-500/15 text-rose-500",
                    )}
                  >
                    {p.side === "long" ? t("portfolio.long") : t("portfolio.short")}
                  </Badge>
                </td>
                <td className="p-3 text-end tabular-nums">{p.entry.toLocaleString()}</td>
                <td className="p-3 text-end tabular-nums">{p.current.toLocaleString()}</td>
                <td className="p-3 text-end tabular-nums">{p.qty}</td>
                <td
                  className={cn(
                    "p-3 text-end font-bold tabular-nums",
                    p.pnl >= 0 ? "text-emerald-500" : "text-rose-500",
                  )}
                >
                  {p.pnl >= 0 ? "+" : ""}
                  {p.pnl.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;

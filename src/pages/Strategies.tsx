import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";
import { strategies } from "@/data/strategies";
import { cn } from "@/lib/utils";

const riskTone: Record<string, string> = {
  low: "bg-emerald-500/10 text-emerald-500",
  medium: "bg-amber-500/10 text-amber-500",
  high: "bg-rose-500/10 text-rose-500",
};

const Strategies = () => {
  const { t, locale, dir } = useI18n();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <PageHeader title={t("strategies.title")} subtitle={t("strategies.subtitle")} highlight="🧠" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {strategies.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => navigate(`/marketplace?q=${encodeURIComponent(s.name.en)}`)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden text-start rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div
                  className={cn(
                    "absolute -top-12 -end-12 h-32 w-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br group-hover:opacity-40 transition-opacity",
                    s.color,
                  )}
                />
                <div
                  className={cn(
                    "relative h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg mb-4",
                    s.color,
                  )}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">
                  {locale === "ar" ? s.name.ar : s.name.en}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {locale === "ar" ? s.description.ar : s.description.en}
                </p>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <Badge className={cn("text-[10px] border-0", riskTone[s.risk])}>
                    {t(`bot.risk.${s.risk}`)}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    {t("strategies.totalBots").replace("{n}", String(s.botsCount))}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mb-3">
                  <span className="font-semibold">{t("strategies.bestFor")}: </span>
                  {locale === "ar" ? s.bestFor.ar : s.bestFor.en}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  {t("strategies.viewBots")}
                  <ArrowRight className={cn("h-3.5 w-3.5", dir === "rtl" && "rotate-180")} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
};

export default Strategies;

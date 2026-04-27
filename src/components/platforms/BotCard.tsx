import { motion } from "framer-motion";
import { Star, TrendingUp, Target, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";
import type { BotPreview } from "@/data/platforms";

interface BotCardProps {
  bot: BotPreview;
  index?: number;
}

const riskColors: Record<BotPreview["risk"], string> = {
  low: "text-emerald-500 bg-emerald-500/10",
  medium: "text-amber-500 bg-amber-500/10",
  high: "text-rose-500 bg-rose-500/10",
};

const tagStyles: Record<NonNullable<BotPreview["tag"]>, string> = {
  top: "bg-orange-500/15 text-orange-500 border-orange-500/30",
  new: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  pro: "bg-violet-500/15 text-violet-500 border-violet-500/30",
};

export function BotCard({ bot, index = 0 }: BotCardProps) {
  const { t, locale } = useI18n();
  const strategy = locale === "ar" ? bot.strategy.ar : bot.strategy.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      className={cn(
        "rounded-xl bg-card border border-border p-4 flex flex-col gap-3",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-sm text-foreground truncate">{bot.name}</h4>
            {bot.tag && (
              <span
                className={cn(
                  "text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wider",
                  tagStyles[bot.tag],
                )}
              >
                {t(`bot.tag.${bot.tag}`)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{strategy}</p>
        </div>
        <div className="flex items-center gap-0.5 text-xs font-semibold text-accent shrink-0">
          <Star className="h-3 w-3 fill-accent" />
          {bot.rating.toFixed(1)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat
          icon={TrendingUp}
          label={t("bot.return")}
          value={`+${bot.monthlyReturn}%`}
          tone="positive"
        />
        <Stat icon={Target} label={t("bot.winRate")} value={`${bot.winRate}%`} />
        <div
          className={cn(
            "rounded-lg px-2 py-1.5 flex flex-col items-center justify-center text-center",
            riskColors[bot.risk],
          )}
        >
          <Shield className="h-3.5 w-3.5 mb-0.5" />
          <span className="text-[10px] font-semibold leading-tight">
            {t(`bot.risk.${bot.risk}`)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface StatProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "default" | "positive";
}

function Stat({ icon: Icon, label, value, tone = "default" }: StatProps) {
  return (
    <div className="rounded-lg bg-secondary/60 px-2 py-1.5 flex flex-col items-center text-center">
      <Icon
        className={cn(
          "h-3.5 w-3.5 mb-0.5",
          tone === "positive" ? "text-emerald-500" : "text-muted-foreground",
        )}
      />
      <span
        className={cn(
          "text-xs font-bold leading-tight",
          tone === "positive" ? "text-emerald-500" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="text-[9px] text-muted-foreground leading-tight">{label}</span>
    </div>
  );
}

export default BotCard;

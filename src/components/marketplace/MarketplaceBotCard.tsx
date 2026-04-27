import { motion } from "framer-motion";
import { Star, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";
import { getPlatformById, type BotPreview } from "@/data/platforms";
import { PlatformLogo } from "@/components/platforms/PlatformLogo";

interface MarketplaceBotCardProps {
  bot: BotPreview;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const tagStyles: Record<NonNullable<BotPreview["tag"]>, string> = {
  top: "bg-orange-500/15 text-orange-500 border-orange-500/30",
  new: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  pro: "bg-violet-500/15 text-violet-500 border-violet-500/30",
};

const riskStyles: Record<BotPreview["risk"], string> = {
  low: "bg-emerald-500/10 text-emerald-500",
  medium: "bg-amber-500/10 text-amber-500",
  high: "bg-rose-500/10 text-rose-500",
};

export function MarketplaceBotCard({
  bot,
  index = 0,
  isFavorite,
  onToggleFavorite,
}: MarketplaceBotCardProps) {
  const { t, locale, dir } = useI18n();
  const slug = bot.slug ?? bot.id;
  const desc = bot.description ? (locale === "ar" ? bot.description.ar : bot.description.en) : "";
  const strategy = locale === "ar" ? bot.strategy.ar : bot.strategy.en;
  const primaryPlatform = getPlatformById(bot.platforms[0]);
  const isFree = !bot.price || bot.price === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <div
        className={cn(
          "group relative h-full flex flex-col rounded-2xl overflow-hidden",
          "bg-card border border-border",
          "transition-all duration-300",
          "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5",
        )}
      >
        {/* Glow */}
        {primaryPlatform && (
          <div
            className={cn(
              "absolute -top-16 -end-16 h-40 w-40 rounded-full blur-3xl opacity-20",
              "bg-gradient-to-br",
              primaryPlatform.color,
              "group-hover:opacity-40 transition-opacity duration-500",
            )}
            aria-hidden="true"
          />
        )}

        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(bot.id);
            }}
            aria-label="favorite"
            className={cn(
              "absolute top-3 z-10 h-8 w-8 rounded-full flex items-center justify-center",
              "bg-background/70 backdrop-blur-sm border border-border",
              "transition-colors hover:bg-background",
              dir === "rtl" ? "left-3" : "right-3",
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground",
              )}
            />
          </button>
        )}

        <Link
          to={`/marketplace/${slug}`}
          className="relative p-5 flex flex-col gap-3 flex-1"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            {primaryPlatform && (
              <PlatformLogo mark={primaryPlatform.mark} color={primaryPlatform.color} size="md" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-base leading-tight text-foreground truncate">
                  {bot.name}
                </h3>
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
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {primaryPlatform?.name} · {strategy}
              </p>
            </div>
          </div>

          {/* Description */}
          {desc && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{desc}</p>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-emerald-500 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />+{bot.monthlyReturn}%
            </div>
            <div className="flex items-center gap-1 text-accent font-semibold">
              <Star className="h-3.5 w-3.5 fill-accent" />
              {bot.rating.toFixed(1)}
            </div>
            <Badge
              variant="secondary"
              className={cn("text-[10px] font-semibold px-2 py-0.5 border-0", riskStyles[bot.risk])}
            >
              {t(`bot.risk.${bot.risk}`)}
            </Badge>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {t("market.price")}
              </span>
              {isFree ? (
                <span className="text-base font-bold text-emerald-500">{t("market.free")}</span>
              ) : (
                <span className="text-base font-bold gradient-text">${bot.price}</span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
              {t("market.viewDetails")}
              <ArrowRight className={cn("h-3.5 w-3.5", dir === "rtl" && "rotate-180")} />
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default MarketplaceBotCard;

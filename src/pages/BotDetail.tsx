import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  Target,
  Shield,
  Activity,
  ShieldCheck,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/contexts/I18nContext";
import { getBotBySlug, getPlatformById, bots } from "@/data/platforms";
import { PlatformLogo } from "@/components/platforms/PlatformLogo";
import { MarketplaceBotCard } from "@/components/marketplace/MarketplaceBotCard";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const BotDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, locale, dir } = useI18n();
  const bot = slug ? getBotBySlug(slug) : undefined;

  const compatible = useMemo(
    () => (bot ? bot.platforms.map(getPlatformById).filter(Boolean) : []),
    [bot],
  );

  const related = useMemo(() => {
    if (!bot) return [];
    return bots
      .filter((b) => b.id !== bot.id && b.platforms.some((p) => bot.platforms.includes(p)))
      .slice(0, 4);
  }, [bot]);

  if (!bot) {
    return (
      <AppLayout>
        <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">{t("bot.notFound.title")}</h1>
          <p className="text-muted-foreground mb-6">{t("bot.notFound.desc")}</p>
          <Button onClick={() => navigate("/marketplace")}>{t("market.backToMarket")}</Button>
        </section>
      </AppLayout>
    );
  }

  const strategy = locale === "ar" ? bot.strategy.ar : bot.strategy.en;
  const desc = bot.description ? (locale === "ar" ? bot.description.ar : bot.description.en) : "";
  const isFree = !bot.price || bot.price === 0;

  const handleBuy = () => {
    toast({
      title: t("market.buyToastTitle"),
      description: t("market.buyToastDesc").replace("{name}", bot.name),
    });
  };

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        {/* Back */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className={cn("h-4 w-4", dir === "rtl" && "rotate-180")} />
          {t("market.backToMarket")}
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl border border-border bg-card overflow-hidden p-6 sm:p-8 mb-8"
        >
          <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full blur-3xl opacity-20 gradient-primary" />

          <div className="relative flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                {bot.tag && (
                  <Badge className="text-[10px] uppercase tracking-wider gradient-primary border-0 text-primary-foreground">
                    {t(`bot.tag.${bot.tag}`)}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-[10px]">
                  {strategy}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold mb-3">{bot.name}</h1>
              {desc && (
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{desc}</p>
              )}

              <div className="flex items-center gap-4 mt-5 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-bold">{bot.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({bot.reviewsCount ?? 0} {t("bot.reviews")})
                  </span>
                </div>
              </div>
            </div>

            {/* Price card */}
            <div className="lg:w-80 shrink-0 rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {t("market.price")}
              </div>
              {isFree ? (
                <div className="text-3xl font-bold text-emerald-500 mb-4">{t("market.free")}</div>
              ) : (
                <div className="text-3xl font-bold gradient-text mb-4">
                  ${bot.price}
                  <span className="text-sm text-muted-foreground font-normal">
                    {" "}
                    / {t("market.lifetime")}
                  </span>
                </div>
              )}

              <Button onClick={handleBuy} className="w-full gap-2 h-11 mb-2">
                <ShoppingCart className="h-4 w-4" />
                {isFree ? t("market.installNow") : t("market.buyNow")}
              </Button>
              <Button variant="outline" className="w-full gap-2 h-11">
                <Heart className="h-4 w-4" />
                {t("market.addToFavorites")}
              </Button>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                {t("market.guarantee")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatBlock
            icon={TrendingUp}
            label={t("bot.return")}
            value={`+${bot.monthlyReturn}%`}
            tone="positive"
          />
          <StatBlock icon={Target} label={t("bot.winRate")} value={`${bot.winRate}%`} />
          <StatBlock
            icon={Activity}
            label={t("bot.drawdown")}
            value={`${bot.drawdown ?? 0}%`}
            tone="warn"
          />
          <StatBlock
            icon={Shield}
            label={t("market.riskLevel")}
            value={t(`bot.risk.${bot.risk}`)}
          />
        </div>

        {/* Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-bold text-lg mb-5">{t("bot.performance")}</h2>
            <div className="space-y-4">
              <PerfBar label={t("bot.winRate")} value={bot.winRate} colorClass="bg-emerald-500" />
              <PerfBar
                label={t("bot.return")}
                value={Math.min(bot.monthlyReturn * 4, 100)}
                colorClass="bg-primary"
                display={`+${bot.monthlyReturn}%`}
              />
              <PerfBar
                label={t("bot.drawdown")}
                value={bot.drawdown ?? 0}
                colorClass="bg-amber-500"
                display={`${bot.drawdown ?? 0}%`}
              />
            </div>
          </div>

          {/* Compatible platforms */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-bold text-lg mb-4">{t("bot.compatiblePlatforms")}</h2>
            <ul className="space-y-2">
              {compatible.map(
                (p) =>
                  p && (
                    <li key={p.id}>
                      <Link
                        to={`/platforms/${p.slug}`}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/60 transition-colors"
                      >
                        <PlatformLogo mark={p.mark} color={p.color} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{p.name}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {p.support.join(" · ")}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mb-4">{t("market.youMayLike")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((b, i) => (
                <MarketplaceBotCard key={b.id} bot={b} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

function StatBlock({
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
          "text-xl font-bold leading-tight",
          tone === "positive" && "text-emerald-500",
        )}
      >
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

function PerfBar({
  label,
  value,
  colorClass,
  display,
}: {
  label: string;
  value: number;
  colorClass: string;
  display?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{display ?? `${value}%`}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", colorClass)}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default BotDetail;

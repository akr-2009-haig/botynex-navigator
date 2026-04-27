import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Shield, Star, Zap, Bot as BotIcon, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";
import { getBotsForPlatform, getPlatformBySlug } from "@/data/platforms";
import { PlatformLogo } from "@/components/platforms/PlatformLogo";
import { BotCard } from "@/components/platforms/BotCard";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

const PlatformDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale, dir } = useI18n();
  const platform = slug ? getPlatformBySlug(slug) : undefined;

  if (!platform) return <NotFound />;

  const bots = getBotsForPlatform(platform.id);
  const description = locale === "ar" ? platform.descriptionAr : platform.descriptionEn;

  const howItWorksKey =
    platform.support[0] === "EA"
      ? "platforms.detail.howEa"
      : platform.support[0] === "Signals"
        ? "platforms.detail.howSignals"
        : "platforms.detail.howApi";

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/platforms"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className={cn("h-4 w-4", dir === "rtl" && "rotate-180")} />
          {t("platforms.back")}
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8"
        >
          <div
            className={cn(
              "absolute -top-24 -end-24 h-64 w-64 rounded-full blur-3xl opacity-30 bg-gradient-to-br",
              platform.color,
            )}
            aria-hidden="true"
          />
          <div className="relative flex flex-col sm:flex-row gap-6 items-start">
            <PlatformLogo mark={platform.mark} color={platform.color} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{platform.name}</h1>
                <div className="flex items-center gap-0.5 text-sm font-semibold text-accent">
                  <Star className="h-4 w-4 fill-accent" />
                  {platform.rating.toFixed(1)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {t(`platforms.cat.${platform.category}`)}
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {platform.support.map((s) => (
                  <Badge key={s} variant="secondary" className="font-semibold">
                    {s}
                  </Badge>
                ))}
                <Badge variant="outline" className="font-semibold">
                  <BotIcon className="h-3 w-3 me-1" />
                  {platform.botsCount} {t("platforms.bots")}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gradient-primary text-primary-foreground hover:opacity-90">
                  <Zap className="h-4 w-4" />
                  {t("platforms.detail.connect")}
                </Button>
                <Button variant="outline" asChild>
                  <a href={platform.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {t("platforms.detail.visit")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features + How it works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <Sparkle /> {t("platforms.detail.features")}
            </h2>
            <ul className="space-y-2.5">
              {platform.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/85">
                    {locale === "ar" ? f.ar : f.en}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              {t("platforms.detail.howItWorks")}
            </h2>
            <p className="text-sm text-foreground/85 leading-relaxed mb-4">
              {t(howItWorksKey)}
            </p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground rounded-lg bg-secondary/60 p-3">
              <Shield className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{t("platforms.detail.security")}</span>
            </div>
          </motion.div>
        </div>

        {/* Compatible bots */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <BotIcon className="h-5 w-5 text-primary" />
            {t("platforms.detail.compatible")}
            <span className="text-muted-foreground text-sm font-normal">
              ({bots.length})
            </span>
          </h2>
        </div>

        {bots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((b, i) => (
              <BotCard key={b.id} bot={b} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center">
            <BotIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No bots yet for this platform.</p>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

function Sparkle() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md gradient-primary text-primary-foreground">
      <Star className="h-3.5 w-3.5 fill-current" />
    </span>
  );
}

export default PlatformDetail;

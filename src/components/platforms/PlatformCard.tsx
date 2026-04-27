import { motion } from "framer-motion";
import { ArrowRight, Bot, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";
import type { Platform } from "@/data/platforms";
import { PlatformLogo } from "./PlatformLogo";

interface PlatformCardProps {
  platform: Platform;
  index?: number;
}

export function PlatformCard({ platform, index = 0 }: PlatformCardProps) {
  const { t, locale, dir } = useI18n();
  const description = locale === "ar" ? platform.descriptionAr : platform.descriptionEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4), ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        to={`/platforms/${platform.slug}`}
        className={cn(
          "group relative h-full flex flex-col rounded-2xl overflow-hidden",
          "bg-card border border-border",
          "transition-all duration-300",
          "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5",
        )}
      >
        {/* Decorative gradient glow */}
        <div
          className={cn(
            "absolute -top-16 -end-16 h-40 w-40 rounded-full blur-3xl opacity-20",
            "bg-gradient-to-br",
            platform.color,
            "group-hover:opacity-40 transition-opacity duration-500",
          )}
          aria-hidden="true"
        />

        <div className="relative p-5 flex flex-col gap-4 flex-1">
          {/* Header */}
          <div className="flex items-start gap-3">
            <PlatformLogo mark={platform.mark} color={platform.color} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base leading-tight text-foreground truncate">
                {platform.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t(`platforms.cat.${platform.category}`)}
              </p>
            </div>
            <div className="flex items-center gap-0.5 text-xs font-semibold text-accent shrink-0">
              <Star className="h-3.5 w-3.5 fill-accent" />
              {platform.rating.toFixed(1)}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Support badges */}
          <div className="flex flex-wrap gap-1.5">
            {platform.support.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="text-[10px] font-semibold px-2 py-0.5"
              >
                {s}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Bot className="h-3.5 w-3.5 text-primary" />
              <span>
                <span className="font-bold text-foreground">{platform.botsCount}</span>{" "}
                {t("platforms.bots")}
              </span>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold text-primary",
                "group-hover:gap-2 transition-all",
              )}
            >
              {t("platforms.viewBots")}
              <ArrowRight
                className={cn("h-3.5 w-3.5", dir === "rtl" && "rotate-180")}
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default PlatformCard;

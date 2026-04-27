import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Layers, Bot as BotIcon, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/contexts/I18nContext";
import { platforms, type PlatformCategory } from "@/data/platforms";
import { PlatformCard } from "@/components/platforms/PlatformCard";
import { cn } from "@/lib/utils";

type Filter = "all" | PlatformCategory;

const Platforms = () => {
  const { t, dir } = useI18n();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return platforms.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.mark.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const totalBots = useMemo(
    () => platforms.reduce((acc, p) => acc + p.botsCount, 0),
    [],
  );

  const stats = [
    { key: "platforms", icon: Layers, value: platforms.length, labelKey: "platforms.stats.platforms" },
    { key: "bots", icon: BotIcon, value: totalBots, labelKey: "platforms.stats.bots" },
    { key: "categories", icon: Sparkles, value: 3, labelKey: "platforms.stats.categories" },
  ];

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            <span className="gradient-text">{t("platforms.title")}</span>
          </h1>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">
            {t("platforms.subtitle")}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="rounded-xl border border-border bg-card p-3 sm:p-4 flex items-center gap-3"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground shrink-0">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl font-bold leading-tight">
                    {s.value}
                    <span className="text-primary">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {t(s.labelKey)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Search + Tabs */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="relative">
            <Search
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                dir === "rtl" ? "right-3" : "left-3",
              )}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("platforms.searchPlaceholder")}
              className={cn("h-11", dir === "rtl" ? "pr-9" : "pl-9")}
            />
          </div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="w-full sm:w-auto h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                {t("platforms.tab.all")}
              </TabsTrigger>
              <TabsTrigger value="crypto" className="text-xs sm:text-sm">
                🟡 {t("platforms.tab.crypto")}
              </TabsTrigger>
              <TabsTrigger value="forex" className="text-xs sm:text-sm">
                🔵 {t("platforms.tab.forex")}
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs sm:text-sm">
                🟣 {t("platforms.tab.analysis")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <PlatformCard key={p.id} platform={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-semibold text-foreground">{t("platforms.empty.title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("platforms.empty.desc")}</p>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default Platforms;

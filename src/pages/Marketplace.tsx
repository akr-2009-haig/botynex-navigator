import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/contexts/I18nContext";
import { bots, platforms } from "@/data/platforms";
import { MarketplaceBotCard } from "@/components/marketplace/MarketplaceBotCard";
import { cn } from "@/lib/utils";

type PriceFilter = "all" | "free" | "lt50" | "50to100" | "gt100";
type RatingFilter = "all" | "4plus" | "3plus";

const STORAGE_FAV = "botynex-favorites";

const Marketplace = () => {
  const { t, dir } = useI18n();
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [strategyFilter, setStrategyFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_FAV) || "[]");
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_FAV, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const strategies = useMemo(() => {
    const set = new Map<string, { en: string; ar: string }>();
    bots.forEach((b) => set.set(b.strategy.en, b.strategy));
    return Array.from(set.values());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bots.filter((b) => {
      if (platformFilter !== "all" && !b.platforms.includes(platformFilter)) return false;
      if (strategyFilter !== "all" && b.strategy.en !== strategyFilter) return false;
      if (ratingFilter === "4plus" && b.rating < 4) return false;
      if (ratingFilter === "3plus" && b.rating < 3) return false;
      const price = b.price ?? 0;
      if (priceFilter === "free" && price !== 0) return false;
      if (priceFilter === "lt50" && (price === 0 || price >= 50)) return false;
      if (priceFilter === "50to100" && (price < 50 || price > 100)) return false;
      if (priceFilter === "gt100" && price <= 100) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.strategy.en.toLowerCase().includes(q) ||
        b.strategy.ar.includes(q) ||
        b.platforms.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [query, platformFilter, strategyFilter, priceFilter, ratingFilter]);

  const activeFiltersCount =
    (platformFilter !== "all" ? 1 : 0) +
    (strategyFilter !== "all" ? 1 : 0) +
    (priceFilter !== "all" ? 1 : 0) +
    (ratingFilter !== "all" ? 1 : 0);

  const resetFilters = () => {
    setPlatformFilter("all");
    setStrategyFilter("all");
    setPriceFilter("all");
    setRatingFilter("all");
  };

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            <span className="gradient-text">{t("market.title")}</span>
          </h1>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">
            {t("market.subtitle")}
          </p>
        </motion.div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                dir === "rtl" ? "right-3" : "left-3",
              )}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("market.searchPlaceholder")}
              className={cn("h-11", dir === "rtl" ? "pr-9" : "pl-9")}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters((v) => !v)}
            className="h-11 gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("market.filters")}
            {activeFiltersCount > 0 && (
              <span className="inline-flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full text-[10px] font-bold gradient-primary text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-5"
          >
            {/* Platform */}
            <FilterGroup label={t("market.filter.platform")}>
              <Tabs value={platformFilter} onValueChange={setPlatformFilter}>
                <TabsList className="h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
                  <TabsTrigger value="all" className="text-xs">
                    {t("platforms.tab.all")}
                  </TabsTrigger>
                  {platforms.slice(0, 8).map((p) => (
                    <TabsTrigger key={p.id} value={p.id} className="text-xs">
                      {p.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </FilterGroup>

            {/* Strategy */}
            <FilterGroup label={t("market.filter.strategy")}>
              <Tabs value={strategyFilter} onValueChange={setStrategyFilter}>
                <TabsList className="h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
                  <TabsTrigger value="all" className="text-xs">
                    {t("platforms.tab.all")}
                  </TabsTrigger>
                  {strategies.map((s) => (
                    <TabsTrigger key={s.en} value={s.en} className="text-xs">
                      {dir === "rtl" ? s.ar : s.en}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </FilterGroup>

            {/* Price */}
            <FilterGroup label={t("market.filter.price")}>
              <Tabs value={priceFilter} onValueChange={(v) => setPriceFilter(v as PriceFilter)}>
                <TabsList className="h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
                  <TabsTrigger value="all" className="text-xs">
                    {t("platforms.tab.all")}
                  </TabsTrigger>
                  <TabsTrigger value="free" className="text-xs">
                    {t("market.price.free")}
                  </TabsTrigger>
                  <TabsTrigger value="lt50" className="text-xs">
                    {t("market.price.lt50")}
                  </TabsTrigger>
                  <TabsTrigger value="50to100" className="text-xs">
                    {t("market.price.50to100")}
                  </TabsTrigger>
                  <TabsTrigger value="gt100" className="text-xs">
                    {t("market.price.gt100")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </FilterGroup>

            {/* Rating */}
            <FilterGroup label={t("market.filter.rating")}>
              <Tabs value={ratingFilter} onValueChange={(v) => setRatingFilter(v as RatingFilter)}>
                <TabsList className="h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
                  <TabsTrigger value="all" className="text-xs">
                    {t("platforms.tab.all")}
                  </TabsTrigger>
                  <TabsTrigger value="4plus" className="text-xs">
                    ⭐ 4+
                  </TabsTrigger>
                  <TabsTrigger value="3plus" className="text-xs">
                    ⭐ 3+
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </FilterGroup>

            {activeFiltersCount > 0 && (
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
                  <X className="h-3.5 w-3.5" />
                  {t("market.reset")}
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Result count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {t("market.found").replace("{count}", String(filtered.length))}
        </div>

        {/* Grid / Empty */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((b, i) => (
              <MarketplaceBotCard
                key={b.id}
                bot={b}
                index={i}
                isFavorite={favorites.includes(b.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-semibold text-foreground">{t("market.empty.title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("market.empty.desc")}</p>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4">
                {t("market.reset")}
              </Button>
            )}
          </div>
        )}
      </section>
    </AppLayout>
  );
};

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

// Skeleton kept available for future async loading
export function MarketplaceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-2xl" />
      ))}
    </div>
  );
}

export default Marketplace;

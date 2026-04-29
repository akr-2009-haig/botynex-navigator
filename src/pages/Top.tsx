import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { MarketplaceBotCard } from "@/components/marketplace/MarketplaceBotCard";
import { useI18n } from "@/contexts/I18nContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { bots } from "@/data/platforms";

const Top = () => {
  const { t } = useI18n();
  const { isFavorite, toggleFavorite } = useFavorites();
  const list = [...bots]
    .sort((a, b) => b.rating * b.monthlyReturn - a.rating * a.monthlyReturn)
    .slice(0, 12);

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <PageHeader title={t("top.title")} subtitle={t("top.subtitle")} highlight="🔥" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((b, i) => (
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

export default Top;

import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { MarketplaceBotCard } from "@/components/marketplace/MarketplaceBotCard";
import { useI18n } from "@/contexts/I18nContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { bots } from "@/data/platforms";

const Favorites = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const list = bots.filter((b) => favorites.includes(b.id));

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <PageHeader title={t("favorites.title")} subtitle={t("favorites.subtitle")} highlight="❤️" />
        {list.length > 0 ? (
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
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <Heart className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-semibold">{t("favorites.empty.title")}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">{t("favorites.empty.desc")}</p>
            <Button onClick={() => navigate("/marketplace")}>{t("nav.marketplace")}</Button>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default Favorites;

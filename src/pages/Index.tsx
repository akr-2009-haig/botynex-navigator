import { AppLayout } from "@/components/AppLayout";
import { useI18n } from "@/contexts/I18nContext";

const Index = () => {
  const { t } = useI18n();
  const stats = [
    { key: "stat.activeBots", value: "12" },
    { key: "stat.dailyPnL", value: "+4.8%" },
    { key: "stat.totalTrades", value: "1,284" },
  ];

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {t("welcome.title")}{" "}
          <span className="gradient-text">Botynex Global</span>
        </h1>
        <p className="text-muted-foreground">{t("welcome.subtitle")}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div
              key={s.key}
              className="rounded-xl border border-border bg-card p-5 transition-colors"
            >
              <p className="text-sm text-muted-foreground">{t(s.key)}</p>
              <p className="text-2xl font-bold mt-1 gradient-text">{s.value}</p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Pause, Play, Settings as SettingsIcon, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";
import { bots, getPlatformById } from "@/data/platforms";
import { PlatformLogo } from "@/components/platforms/PlatformLogo";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface InstalledBot {
  id: string;
  running: boolean;
}

const MyBots = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  // Pre-installed demo bots
  const [installed, setInstalled] = useState<InstalledBot[]>([
    { id: "alpha-grid", running: true },
    { id: "scalp-x", running: true },
    { id: "trend-rider", running: false },
  ]);

  const items = installed
    .map((i) => ({ inst: i, bot: bots.find((b) => b.id === i.id) }))
    .filter((x) => x.bot);

  const toggle = (id: string) =>
    setInstalled((prev) =>
      prev.map((b) => (b.id === id ? { ...b, running: !b.running } : b)),
    );

  const uninstall = (id: string) => {
    setInstalled((prev) => prev.filter((b) => b.id !== id));
    toast({ title: t("myBots.uninstall"), description: id });
  };

  if (items.length === 0) {
    return (
      <AppLayout>
        <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
          <PageHeader title={t("myBots.title")} subtitle={t("myBots.subtitle")} highlight="🤖" />
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <Bot className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-semibold">{t("myBots.empty.title")}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">{t("myBots.empty.desc")}</p>
            <Button onClick={() => navigate("/marketplace")}>{t("myBots.empty.cta")}</Button>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <PageHeader title={t("myBots.title")} subtitle={t("myBots.subtitle")} highlight="🤖" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map(({ inst, bot }, i) => {
            if (!bot) return null;
            const platform = getPlatformById(bot.platforms[0]);
            return (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  {platform && <PlatformLogo mark={platform.mark} color={platform.color} size="md" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base">{bot.name}</h3>
                      <Badge
                        className={cn(
                          "border-0 text-[10px]",
                          inst.running
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-zinc-500/15 text-muted-foreground",
                        )}
                      >
                        {inst.running ? t("myBots.status.running") : t("myBots.status.paused")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {platform?.name} · +{bot.monthlyReturn}% / mo
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button variant={inst.running ? "outline" : "default"} size="sm" onClick={() => toggle(inst.id)}>
                    {inst.running ? (
                      <>
                        <Pause className="h-3.5 w-3.5 me-1" /> {t("myBots.pause")}
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 me-1" /> {t("myBots.resume")}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
                    <SettingsIcon className="h-3.5 w-3.5 me-1" /> {t("myBots.configure")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => uninstall(inst.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5 me-1" /> {t("myBots.uninstall")}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
};

export default MyBots;

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [apiKeys, setApiKeys] = useState<{ id: string; platform: string; label: string }[]>([
    { id: "1", platform: "Binance", label: "Main account" },
  ]);

  const save = () => toast({ title: t("settings.savedToast") });

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-4xl mx-auto">
        <PageHeader title={t("settings.title")} subtitle={t("settings.subtitle")} highlight="⚙️" />

        <Tabs defaultValue="account">
          <TabsList className="mb-4">
            <TabsTrigger value="account">{t("settings.tab.account")}</TabsTrigger>
            <TabsTrigger value="security">{t("settings.tab.security")}</TabsTrigger>
            <TabsTrigger value="preferences">{t("settings.tab.preferences")}</TabsTrigger>
            <TabsTrigger value="api">{t("settings.tab.api")}</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <Field label={t("settings.account.name")} defaultValue="Botynex Trader" />
              <Field label={t("settings.account.email")} defaultValue="trader@botynex.com" type="email" />
              <Field label={t("settings.account.phone")} defaultValue="+1 555 0100" />
              <div className="pt-2">
                <Button onClick={save}>{t("common.save")}</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <h3 className="font-semibold mb-4">{t("settings.security.password")}</h3>
              <Field label={t("settings.security.currentPassword")} type="password" />
              <Field label={t("settings.security.newPassword")} type="password" />
              <div className="border-t border-border my-5" />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{t("settings.security.2fa")}</h4>
                  <p className="text-xs text-muted-foreground">{t("settings.security.2fa.desc")}</p>
                </div>
                <Switch checked={twoFA} onCheckedChange={setTwoFA} />
              </div>
              <div className="pt-4">
                <Button onClick={save}>{t("common.save")}</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <div className="flex items-center justify-between py-2">
                <Label>{t("settings.preferences.lang")}</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={locale === "en" ? "default" : "outline"}
                    onClick={() => setLocale("en")}
                  >
                    EN
                  </Button>
                  <Button
                    size="sm"
                    variant={locale === "ar" ? "default" : "outline"}
                    onClick={() => setLocale("ar")}
                  >
                    AR
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <Label>{t("settings.preferences.theme")}</Label>
                <Button size="sm" variant="outline" onClick={toggleTheme}>
                  {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
                </Button>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <Label>{t("settings.preferences.notifications")}</Label>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <h3 className="font-semibold mb-1">{t("settings.api.title")}</h3>
              <p className="text-xs text-muted-foreground mb-4">{t("settings.api.desc")}</p>
              <ul className="space-y-2 mb-4">
                {apiKeys.map((k) => (
                  <li
                    key={k.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <div className="font-semibold text-sm">{k.platform}</div>
                      <div className="text-xs text-muted-foreground">{k.label}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setApiKeys((prev) => prev.filter((x) => x.id !== k.id))}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                onClick={() => {
                  setApiKeys((prev) => [
                    ...prev,
                    { id: String(Date.now()), platform: "Bybit", label: "Sub-account" },
                  ]);
                  toast({ title: t("settings.savedToast") });
                }}
              >
                <Plus className="h-4 w-4 me-2" />
                {t("settings.api.add")}
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </AppLayout>
  );
};

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">{children}</div>;
}

function Field({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} defaultValue={defaultValue} />
    </div>
  );
}

export default SettingsPage;

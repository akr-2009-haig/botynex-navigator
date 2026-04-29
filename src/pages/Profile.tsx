import { useNavigate } from "react-router-dom";
import { Mail, Phone, Calendar, Award } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

const Profile = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-3xl mx-auto">
        <PageHeader title={t("profile.title")} highlight="👤" />

        <div className="rounded-3xl border border-border bg-card p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold shrink-0">
              BT
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold">Botynex Trader</h2>
              <p className="text-sm text-muted-foreground">trader@botynex.com</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => navigate("/settings")}>
                  {t("profile.editProfile")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate("/billing")}>
                  {t("user.billing")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoRow icon={Mail} label="Email" value="trader@botynex.com" />
          <InfoRow icon={Phone} label="Phone" value="+1 555 0100" />
          <InfoRow icon={Calendar} label={t("profile.memberSince")} value="Jan 2024" />
          <InfoRow icon={Award} label="Plan" value="Pro" />
        </div>
      </section>
    </AppLayout>
  );
};

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-semibold text-sm">{value}</div>
      </div>
    </div>
  );
}

export default Profile;

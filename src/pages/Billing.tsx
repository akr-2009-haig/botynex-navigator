import { Check, CreditCard, Plus } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const plans = [
  { id: "free", price: 0, current: false, features: ["Browse marketplace", "1 free bot", "Community support"] },
  { id: "pro", price: 29, current: true, features: ["All free bots", "Up to 5 paid bots", "Priority support", "Portfolio analytics"] },
  { id: "elite", price: 99, current: false, features: ["Unlimited bots", "Custom strategies", "1-on-1 onboarding", "API access"] },
];

const Billing = () => {
  const { t } = useI18n();

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-5xl mx-auto">
        <PageHeader title={t("billing.title")} highlight="💳" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "rounded-3xl border p-6 bg-card flex flex-col",
                p.current ? "border-primary ring-2 ring-primary/30 relative" : "border-border",
              )}
            >
              {p.current && (
                <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 gradient-primary border-0 text-primary-foreground">
                  {t("billing.currentPlan")}
                </Badge>
              )}
              <h3 className="text-lg font-bold capitalize">{t(`billing.${p.id}`)}</h3>
              <div className="text-3xl font-bold mt-2 mb-4">
                ${p.price}
                <span className="text-sm font-normal text-muted-foreground"> / mo</span>
              </div>
              <ul className="space-y-2 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-5 w-full"
                variant={p.current ? "outline" : "default"}
                onClick={() => toast({ title: t("billing.upgrade"), description: t("common.comingSoon") })}
                disabled={p.current}
              >
                {p.current ? t("billing.currentPlan") : t("billing.upgrade")}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3">{t("billing.method")}</h3>
            <div className="rounded-lg border border-border p-3 flex items-center gap-3 mb-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-semibold">Visa •••• 4242</div>
                <div className="text-xs text-muted-foreground">Exp 12/27</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 me-2" />
              {t("billing.addMethod")}
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3">{t("billing.history")}</h3>
            <ul className="text-sm divide-y divide-border">
              <li className="py-2 flex justify-between">
                <span>Pro Plan – Apr 2026</span>
                <span className="font-semibold">$29.00</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Pro Plan – Mar 2026</span>
                <span className="font-semibold">$29.00</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Alpha Grid Pro</span>
                <span className="font-semibold">$79.00</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Billing;

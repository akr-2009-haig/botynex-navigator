import { useState } from "react";
import { Search, MessageCircle, Mail, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "@/hooks/use-toast";

const Help = () => {
  const { t, dir } = useI18n();
  const [q, setQ] = useState("");

  const faqs = [
    { q: t("help.q1"), a: t("help.a1") },
    { q: t("help.q2"), a: t("help.a2") },
    { q: t("help.q3"), a: t("help.a3") },
    { q: t("help.q4"), a: t("help.a4") },
  ].filter((f) => !q || f.q.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppLayout>
      <section className="px-4 sm:px-8 py-8 max-w-4xl mx-auto">
        <PageHeader title={t("help.title")} subtitle={t("help.subtitle")} highlight="🛟" />

        <div className="relative mb-8">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${
              dir === "rtl" ? "right-3" : "left-3"
            }`}
          />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("help.searchPlaceholder")}
            className={`h-12 ${dir === "rtl" ? "pr-9" : "pl-9"}`}
          />
        </div>

        {/* Quick action tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Tile icon={BookOpen} title="Guides" desc="Step-by-step tutorials" />
          <Tile icon={MessageCircle} title="Live chat" desc="Avg reply ~2 min" />
          <Tile icon={Mail} title="Email" desc="support@botynex.com" />
        </div>

        <h2 className="font-bold text-lg mb-3">{t("help.faq")}</h2>
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)} className="px-4">
              <AccordionTrigger className="text-start">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <h3 className="font-bold mb-1">{t("help.contact")}</h3>
          <p className="text-sm text-muted-foreground mb-4">support@botynex.com</p>
          <Button onClick={() => toast({ title: t("help.contact"), description: t("common.comingSoon") })}>
            {t("help.contact")}
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

function Tile({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors cursor-pointer">
      <Icon className="h-6 w-6 text-primary mb-2" />
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
    </div>
  );
}

export default Help;

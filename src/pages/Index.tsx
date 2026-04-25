import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <div dir="rtl" className="dark min-h-screen flex w-full bg-background text-foreground">
      <AppSidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">
            أهلاً بك في <span className="gradient-text">Botynex Global</span>
          </h1>
          <p className="text-muted-foreground">
            منصة احترافية لروبوتات التداول المدعومة بالذكاء الاصطناعي.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "الروبوتات النشطة", value: "12" },
              { label: "الأرباح اليومية", value: "+4.8%" },
              { label: "إجمالي الصفقات", value: "1,284" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold mt-1 gradient-text">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

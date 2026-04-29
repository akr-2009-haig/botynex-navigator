import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/contexts/I18nContext";
import logo from "@/assets/botynex-logo.png";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  mode: "login" | "signup";
}

export function AuthShell({ mode }: AuthShellProps) {
  const { t, dir } = useI18n();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: mode === "login" ? t("user.login") : t("user.signup"),
      description: t("auth.demoToast"),
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-16 px-4 flex items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className={cn("h-4 w-4", dir === "rtl" && "rotate-180")} />
          {t("common.back")}
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-2xl gradient-primary blur-xl opacity-50" />
              <img
                src={logo}
                alt="Botynex Global"
                className="relative h-14 w-14 rounded-2xl ring-1 ring-border"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {mode === "login" ? t("auth.login.title") : t("auth.signup.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? t("auth.login.subtitle") : t("auth.signup.subtitle")}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label>{t("auth.name")}</Label>
                <Input required placeholder="John Doe" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label>{t("auth.email")}</Label>
              <Input type="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("auth.password")}</Label>
              <Input type="password" required placeholder="••••••••" />
            </div>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label>{t("auth.confirmPassword")}</Label>
                <Input type="password" required placeholder="••••••••" />
              </div>
            )}

            {mode === "login" && (
              <div className="text-end">
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => toast({ title: t("auth.forgot"), description: t("common.comingSoon") })}
                >
                  {t("auth.forgot")}
                </button>
              </div>
            )}

            <Button type="submit" className="w-full h-11">
              {mode === "login" ? t("user.login") : t("user.signup")}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>{t("auth.continueWith")}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => toast({ title: t("auth.google"), description: t("auth.demoToast") })}
            >
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => toast({ title: t("auth.apple"), description: t("auth.demoToast") })}
            >
              Apple
            </Button>
          </div>

          <p className="text-center text-sm mt-6">
            {mode === "login" ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
            <Link
              to={mode === "login" ? "/signup" : "/login"}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "login" ? t("user.signup") : t("user.login")}
            </Link>
          </p>

          <p className="text-[11px] text-center text-muted-foreground mt-4">{t("auth.terms")}</p>
        </motion.div>
      </main>
    </div>
  );
}

export const Login = () => <AuthShell mode="login" />;
export const Signup = () => <AuthShell mode="signup" />;

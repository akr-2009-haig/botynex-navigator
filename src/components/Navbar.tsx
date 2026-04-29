import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Globe,
  Moon,
  Sun,
  Bell,
  User,
  LogOut,
  Settings,
  CreditCard,
  Bot,
  BarChart3,
  Brain,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/botynex-logo.png";
import { bots, platforms } from "@/data/platforms";
import { strategies } from "@/data/strategies";
import { toast } from "@/hooks/use-toast";

interface NavbarProps {
  onMenuClick: () => void;
  onHomeClick: () => void;
}

function timeAgo(iso: string, t: (k: string) => string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return t("notifications.justNow");
  if (m < 60) return t("notifications.minAgo").replace("{n}", String(m));
  const h = Math.floor(m / 60);
  if (h < 24) return t("notifications.hAgo").replace("{n}", String(h));
  const d = Math.floor(h / 24);
  return t("notifications.dAgo").replace("{n}", String(d));
}

export function Navbar({ onMenuClick, onHomeClick }: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t, dir } = useI18n();
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const iconBtn =
    "h-9 w-9 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors relative";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { bots: [], platforms: [], strategies: [] };
    return {
      bots: bots
        .filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.strategy.en.toLowerCase().includes(q) ||
            b.strategy.ar.includes(q),
        )
        .slice(0, 5),
      platforms: platforms
        .filter((p) => p.name.toLowerCase().includes(q))
        .slice(0, 4),
      strategies: strategies
        .filter(
          (s) =>
            s.name.en.toLowerCase().includes(q) ||
            s.name.ar.includes(q),
        )
        .slice(0, 4),
    };
  }, [query]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const goTo = (path: string) => {
    closeSearch();
    navigate(path);
  };

  const handleLogout = () => {
    toast({ title: t("user.logout"), description: t("auth.demoToast") });
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full",
          "border-b border-border/60",
          "bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        )}
      >
        <div className="h-16 px-3 sm:px-5 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={t("menu.title")}
            className={iconBtn}
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onHomeClick}
            className="flex items-center gap-2 min-w-0 group"
            aria-label="Home"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-lg gradient-primary blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <img
                src={logo}
                alt="Botynex Global"
                className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-cover ring-1 ring-border"
              />
            </div>
            <span className="hidden sm:inline text-base font-bold truncate">
              Botynex<span className="gradient-text"> Global</span>
            </span>
          </button>

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t("search.title")}
            className={iconBtn}
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t("lang.toggle")}
            className={cn(iconBtn, "gap-1 px-2 w-auto")}
          >
            <Globe className="h-5 w-5" />
            <span className="text-[11px] font-semibold uppercase">
              {locale === "en" ? "EN" : "AR"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            className={iconBtn}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label={t("notifications.title")} className={iconBtn}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 end-1.5 h-4 min-w-4 px-1 rounded-full text-[9px] font-bold gradient-primary text-primary-foreground inline-flex items-center justify-center ring-2 ring-background">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
                <DropdownMenuLabel className="p-0 text-sm font-semibold">
                  {t("notifications.title")}
                </DropdownMenuLabel>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    {t("notifications.markAllRead")}
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="px-2 py-8 text-center text-sm text-muted-foreground">
                  {t("notifications.empty")}
                </div>
              ) : (
                <ul className="max-h-80 overflow-y-auto scrollbar-thin">
                  {notifications.slice(0, 5).map((n) => {
                    const title = locale === "ar" ? n.title.ar : n.title.en;
                    const msg = locale === "ar" ? n.message.ar : n.message.en;
                    return (
                      <li key={n.id}>
                        <button
                          type="button"
                          onClick={() => markRead(n.id)}
                          className={cn(
                            "w-full text-start px-3 py-2.5 hover:bg-secondary/60 transition-colors flex gap-2",
                            !n.read && "bg-primary/5",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-1.5 h-2 w-2 rounded-full shrink-0",
                              n.read ? "bg-transparent" : "bg-primary",
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">{title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {msg}
                            </div>
                            <div className="text-[10px] text-muted-foreground/80 mt-1">
                              {timeAgo(n.time, t)}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <DropdownMenuSeparator className="my-0" />
              <button
                type="button"
                onClick={() => navigate("/notifications")}
                className="w-full text-center py-2.5 text-xs font-semibold text-primary hover:bg-secondary/60 transition-colors"
              >
                {t("notifications.viewAll")}
              </button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="User menu"
                className={cn(iconBtn, "ring-1 ring-border")}
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Botynex Trader</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="me-2 h-4 w-4" />
                {t("user.profile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="me-2 h-4 w-4" />
                {t("user.settings")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/billing")}>
                <CreditCard className="me-2 h-4 w-4" />
                {t("user.billing")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/login")}>
                <User className="me-2 h-4 w-4" />
                {t("user.login")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="me-2 h-4 w-4" />
                {t("user.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={(o) => (o ? setSearchOpen(true) : closeSearch())}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Search className="h-4 w-4" />
              {t("search.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="relative px-4 pb-3 border-b border-border">
            <Search
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                dir === "rtl" ? "right-7" : "left-7",
              )}
            />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className={cn("h-11", dir === "rtl" ? "pr-9" : "pl-9")}
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin px-2 py-2">
            {!query && (
              <div className="px-3 py-6 text-sm text-muted-foreground text-center">
                {t("search.suggestions")}
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {["Binance", "MT5", "Grid", "Scalping", "TradingView"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <>
                {results.bots.length > 0 && (
                  <SearchGroup icon={Bot} label="Bots">
                    {results.bots.map((b) => (
                      <SearchItem
                        key={b.id}
                        title={b.name}
                        subtitle={locale === "ar" ? b.strategy.ar : b.strategy.en}
                        onClick={() => goTo(`/marketplace/${b.slug ?? b.id}`)}
                      />
                    ))}
                  </SearchGroup>
                )}
                {results.platforms.length > 0 && (
                  <SearchGroup icon={BarChart3} label="Platforms">
                    {results.platforms.map((p) => (
                      <SearchItem
                        key={p.id}
                        title={p.name}
                        subtitle={t(`platforms.cat.${p.category}`)}
                        onClick={() => goTo(`/platforms/${p.slug}`)}
                      />
                    ))}
                  </SearchGroup>
                )}
                {results.strategies.length > 0 && (
                  <SearchGroup icon={Brain} label="Strategies">
                    {results.strategies.map((s) => (
                      <SearchItem
                        key={s.id}
                        title={locale === "ar" ? s.name.ar : s.name.en}
                        subtitle={t("strategies.totalBots").replace("{n}", String(s.botsCount))}
                        onClick={() => goTo(`/strategies`)}
                      />
                    ))}
                  </SearchGroup>
                )}

                {results.bots.length === 0 &&
                  results.platforms.length === 0 &&
                  results.strategies.length === 0 && (
                    <div className="px-3 py-10 text-center text-sm text-muted-foreground">
                      {t("search.noResults")} <span className="font-semibold">"{query}"</span>
                    </div>
                  )}

                <div className="px-2 pt-2 pb-1">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => goTo(`/marketplace?q=${encodeURIComponent(query)}`)}
                  >
                    {t("search.viewAll")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SearchGroup({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <ul>{children}</ul>
    </div>
  );
}

function SearchItem({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full text-start px-3 py-2 rounded-md hover:bg-secondary/60 transition-colors"
      >
        <div className="text-sm font-semibold truncate">{title}</div>
        <div className="text-xs text-muted-foreground truncate">{subtitle}</div>
      </button>
    </li>
  );
}

export default Navbar;

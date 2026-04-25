import { useState } from "react";
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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";
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
import logo from "@/assets/botynex-logo.png";

interface NavbarProps {
  onMenuClick: () => void;
  onHomeClick: () => void;
  notificationCount?: number;
}

export function Navbar({ onMenuClick, onHomeClick, notificationCount = 3 }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);

  const iconBtn =
    "h-9 w-9 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors relative";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full",
          "border-b border-border/60",
          "bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="h-16 px-3 sm:px-5 flex items-center gap-2 sm:gap-3">
          {/* Hamburger */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={t("menu.title")}
            className={iconBtn}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Brand */}
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Actions */}
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
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 end-1.5 h-4 min-w-4 px-1 rounded-full text-[9px] font-bold gradient-primary text-primary-foreground inline-flex items-center justify-center ring-2 ring-background">
                    {notificationCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>{t("notifications.title")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                {t("notifications.empty")}
              </div>
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
              <DropdownMenuItem>
                <User className="me-2 h-4 w-4" />
                {t("user.profile")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="me-2 h-4 w-4" />
                {t("user.settings")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="me-2 h-4 w-4" />
                {t("user.billing")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="me-2 h-4 w-4" />
                {t("user.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {t("search.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder={t("search.placeholder")}
              className="ps-9 h-11"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;

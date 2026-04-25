import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Store,
  Flame,
  Sparkles,
  Gem,
  BarChart3,
  Brain,
  Briefcase,
  Bot,
  Heart,
  Bell,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";
import logo from "@/assets/botynex-logo.png";

type NavItem = {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  badge?: number;
};

const navItems: NavItem[] = [
  { id: "dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { id: "marketplace", labelKey: "nav.marketplace", icon: Store },
  { id: "top", labelKey: "nav.top", icon: Flame },
  { id: "new", labelKey: "nav.new", icon: Sparkles },
  { id: "pro", labelKey: "nav.pro", icon: Gem },
  { id: "platforms", labelKey: "nav.platforms", icon: BarChart3 },
  { id: "strategies", labelKey: "nav.strategies", icon: Brain },
  { id: "portfolio", labelKey: "nav.portfolio", icon: Briefcase },
  { id: "myBots", labelKey: "nav.myBots", icon: Bot },
  { id: "favorites", labelKey: "nav.favorites", icon: Heart },
  { id: "notifications", labelKey: "nav.notifications", icon: Bell, badge: 3 },
  { id: "settings", labelKey: "nav.settings", icon: Settings },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  active: string;
  onSelect: (id: string) => void;
}

export function AppSidebar({ open, onClose, active, onSelect }: AppSidebarProps) {
  const { t, dir } = useI18n();
  const side: "left" | "right" = dir === "rtl" ? "right" : "left";

  // Lock body scroll while open + close on Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const slideFrom = side === "right" ? { x: "100%" } : { x: "-100%" };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu.title")}
            initial={slideFrom}
            animate={{ x: 0 }}
            exit={slideFrom}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className={cn(
              "fixed top-0 z-50 h-full w-[280px] sm:w-[300px]",
              "bg-sidebar text-sidebar-foreground",
              "flex flex-col shadow-2xl shadow-black/40",
              side === "right"
                ? "right-0 border-l border-sidebar-border"
                : "left-0 border-r border-sidebar-border"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-lg gradient-primary blur-md opacity-50" />
                <img
                  src={logo}
                  alt="Botynex Global"
                  className="relative h-10 w-10 rounded-lg object-cover ring-1 ring-sidebar-border"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-sidebar-accent-foreground leading-tight truncate">
                  Botynex<span className="gradient-text"> Global</span>
                </span>
                <span className="text-[10px] tracking-widest text-sidebar-foreground/60 uppercase truncate">
                  {t("brand.tagline")}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="h-9 w-9 rounded-md flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelect(item.id);
                          onClose();
                        }}
                        className={cn(
                          "group relative w-full flex items-center gap-3 rounded-lg",
                          "px-3 h-11 text-sm font-medium",
                          "transition-colors duration-200",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="sidebar-active-indicator"
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            className={cn(
                              "absolute top-1/2 -translate-y-1/2 h-6 w-1 gradient-primary",
                              side === "right"
                                ? "right-0 rounded-l-full"
                                : "left-0 rounded-r-full"
                            )}
                          />
                        )}
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-transform duration-200",
                            isActive
                              ? "text-primary"
                              : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-hover:scale-110"
                          )}
                        />
                        <span className="flex-1 text-start truncate">
                          {t(item.labelKey)}
                        </span>
                        {item.badge !== undefined && (
                          <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold gradient-primary text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-4 py-3 border-t border-sidebar-border text-[11px] text-sidebar-foreground/50">
              © {new Date().getFullYear()} Botynex Global
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default AppSidebar;

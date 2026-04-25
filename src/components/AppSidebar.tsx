import { useState } from "react";
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
  ChevronsLeft,
  ChevronsRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logo from "@/assets/botynex-logo.png";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "marketplace", label: "المتجر", icon: Store },
  { id: "top", label: "أفضل الروبوتات", icon: Flame },
  { id: "new", label: "أحدث الروبوتات", icon: Sparkles },
  { id: "pro", label: "الروبوتات الاحترافية", icon: Gem },
  { id: "platforms", label: "المنصات", icon: BarChart3 },
  { id: "strategies", label: "الاستراتيجيات", icon: Brain },
  { id: "portfolio", label: "محفظتي", icon: Briefcase },
  { id: "my-bots", label: "روبوتاتي", icon: Bot },
  { id: "favorites", label: "المفضلة", icon: Heart },
  { id: "notifications", label: "الإشعارات", icon: Bell, badge: 3 },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        dir="rtl"
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "sticky top-0 h-screen shrink-0",
          "bg-sidebar text-sidebar-foreground",
          "border-l border-sidebar-border",
          "flex flex-col overflow-hidden",
          "shadow-2xl shadow-black/20"
        )}
      >
        {/* Header / Logo */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 h-20 border-b border-sidebar-border shrink-0",
            collapsed && "justify-center px-2"
          )}
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-xl gradient-primary blur-md opacity-50" />
            <img
              src={logo}
              alt="Botynex Global"
              className="relative h-12 w-12 rounded-xl object-cover ring-1 ring-sidebar-border"
            />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-base font-bold text-sidebar-accent-foreground leading-tight">
                  Botynex
                  <span className="gradient-text"> Global</span>
                </span>
                <span className="text-[10px] tracking-widest text-sidebar-foreground/60 uppercase">
                  AI Trading Bots
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              const Icon = item.icon;

              const button = (
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "group relative w-full flex items-center gap-3 rounded-lg",
                    "px-3 h-11 text-sm font-medium",
                    "transition-colors duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-l-full gradient-primary"
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

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 text-right truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {item.badge !== undefined && !collapsed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold gradient-primary text-primary-foreground"
                    >
                      {item.badge}
                    </motion.span>
                  )}

                  {item.badge !== undefined && collapsed && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent ring-2 ring-sidebar" />
                  )}
                </button>
              );

              return (
                <li key={item.id}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{button}</TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge !== undefined && (
                            <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-bold gradient-primary text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    button
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg px-3 h-10",
              "text-sm font-medium text-sidebar-foreground",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "transition-colors duration-200",
              collapsed && "justify-center px-0"
            )}
            aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {collapsed ? (
                <ChevronsLeft className="h-5 w-5" />
              ) : (
                <ChevronsRight className="h-5 w-5" />
              )}
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 text-right"
                >
                  طي القائمة
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}

export default AppSidebar;

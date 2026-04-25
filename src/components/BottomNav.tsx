import { motion } from "framer-motion";
import { Star, Home, BarChart3, BookOpen, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

type Item = { id: string; labelKey: string; icon: LucideIcon };

const items: Item[] = [
  { id: "favorites", labelKey: "bottom.favorites", icon: Star },
  { id: "home", labelKey: "bottom.home", icon: Home },
  { id: "market", labelKey: "bottom.market", icon: BarChart3 },
  { id: "guides", labelKey: "bottom.guides", icon: BookOpen },
  { id: "quick", labelKey: "bottom.quick", icon: Zap },
];

interface BottomNavProps {
  active: string;
  onSelect: (id: string) => void;
}

export function BottomNav({ active, onSelect }: BottomNavProps) {
  const { t } = useI18n();

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-30",
        "bg-background/80 backdrop-blur-xl border-t border-border/60",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      aria-label="Bottom navigation"
    >
      <ul className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex">
              <motion.button
                type="button"
                onClick={() => onSelect(item.id)}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex-1 flex flex-col items-center justify-center gap-1",
                  "text-[10px] font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-active"
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute top-0 inset-x-6 h-0.5 rounded-full gradient-primary"
                  />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )}
                />
                <span className="truncate max-w-full px-1">{t(item.labelKey)}</span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNav;

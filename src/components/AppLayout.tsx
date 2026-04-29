import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

const navRoutes: Record<string, string> = {
  dashboard: "/",
  marketplace: "/marketplace",
  top: "/top",
  new: "/new",
  pro: "/pro",
  platforms: "/platforms",
  strategies: "/strategies",
  portfolio: "/portfolio",
  myBots: "/my-bots",
  favorites: "/favorites",
  notifications: "/notifications",
  settings: "/settings",
  help: "/help",
};

const bottomRoutes: Record<string, string> = {
  home: "/",
  market: "/marketplace",
  favorites: "/favorites",
  guides: "/help",
  quick: "/portfolio",
};

function deriveActiveNav(pathname: string): string {
  if (pathname.startsWith("/marketplace")) return "marketplace";
  if (pathname.startsWith("/platforms")) return "platforms";
  if (pathname.startsWith("/top")) return "top";
  if (pathname.startsWith("/new")) return "new";
  if (pathname.startsWith("/pro")) return "pro";
  if (pathname.startsWith("/strategies")) return "strategies";
  if (pathname.startsWith("/portfolio")) return "portfolio";
  if (pathname.startsWith("/my-bots")) return "myBots";
  if (pathname.startsWith("/favorites")) return "favorites";
  if (pathname.startsWith("/notifications")) return "notifications";
  if (pathname.startsWith("/settings")) return "settings";
  if (pathname.startsWith("/help")) return "help";
  return "dashboard";
}

function deriveActiveBottom(pathname: string): string {
  if (pathname.startsWith("/marketplace") || pathname.startsWith("/platforms")) return "market";
  if (pathname.startsWith("/favorites")) return "favorites";
  if (pathname.startsWith("/portfolio")) return "quick";
  if (pathname.startsWith("/help")) return "guides";
  return "home";
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNav = deriveActiveNav(pathname);
  const activeBottom = deriveActiveBottom(pathname);

  const goHome = () => navigate("/");
  const handleNavSelect = (id: string) => {
    const route = navRoutes[id];
    if (route) navigate(route);
  };
  const handleBottomSelect = (id: string) => {
    const route = bottomRoutes[id];
    if (route) navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar onMenuClick={() => setSidebarOpen(true)} onHomeClick={goHome} />

      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onSelect={handleNavSelect}
      />

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <BottomNav active={activeBottom} onSelect={handleBottomSelect} />
    </div>
  );
}

export default AppLayout;

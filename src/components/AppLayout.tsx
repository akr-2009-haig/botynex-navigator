import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

// Map sidebar item ids -> routes (only those with real pages)
const navRoutes: Record<string, string> = {
  dashboard: "/",
  platforms: "/platforms",
};

const bottomRoutes: Record<string, string> = {
  home: "/",
  market: "/platforms",
};

function deriveActiveNav(pathname: string): string {
  if (pathname.startsWith("/platforms")) return "platforms";
  if (pathname === "/") return "dashboard";
  return "dashboard";
}

function deriveActiveBottom(pathname: string): string {
  if (pathname.startsWith("/platforms")) return "market";
  if (pathname === "/") return "home";
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

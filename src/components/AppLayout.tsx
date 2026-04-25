import { ReactNode, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeBottom, setActiveBottom] = useState("home");

  const goHome = () => {
    setActiveNav("dashboard");
    setActiveBottom("home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar onMenuClick={() => setSidebarOpen(true)} onHomeClick={goHome} />

      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onSelect={setActiveNav}
      />

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <BottomNav active={activeBottom} onSelect={setActiveBottom} />
    </div>
  );
}

export default AppLayout;

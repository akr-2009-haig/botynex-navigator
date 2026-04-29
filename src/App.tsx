import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Platforms from "./pages/Platforms.tsx";
import PlatformDetail from "./pages/PlatformDetail.tsx";
import Marketplace from "./pages/Marketplace.tsx";
import BotDetail from "./pages/BotDetail.tsx";
import Top from "./pages/Top.tsx";
import NewBots from "./pages/NewBots.tsx";
import ProBots from "./pages/ProBots.tsx";
import Strategies from "./pages/Strategies.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import MyBots from "./pages/MyBots.tsx";
import Favorites from "./pages/Favorites.tsx";
import NotificationsPage from "./pages/Notifications.tsx";
import SettingsPage from "./pages/Settings.tsx";
import Help from "./pages/Help.tsx";
import Profile from "./pages/Profile.tsx";
import Billing from "./pages/Billing.tsx";
import { Login, Signup } from "./pages/Auth.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
        <NotificationsProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:slug" element={<BotDetail />} />
                  <Route path="/platforms" element={<Platforms />} />
                  <Route path="/platforms/:slug" element={<PlatformDetail />} />
                  <Route path="/top" element={<Top />} />
                  <Route path="/new" element={<NewBots />} />
                  <Route path="/pro" element={<ProBots />} />
                  <Route path="/strategies" element={<Strategies />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/my-bots" element={<MyBots />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </FavoritesProvider>
        </NotificationsProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import CookieConsent from "./components/CookieConsent";
import CustomCursor from "./components/CustomCursor";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AppLayout from "./components/AppLayout";
import ScholarshipDeepLink from "./pages/ScholarshipDeepLink";

import ProtectedRoute from "./components/ProtectedRoute";
import Maintenance from "./pages/Maintenance";

const queryClient = new QueryClient();

const IS_MAINTENANCE_MODE =false;  // during maintenance make it true ;

const App = () => {
  // Bypasses maintenance mode if you are running on localhost so you can see live changes
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const showMaintenance = IS_MAINTENANCE_MODE && !isLocalhost;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            {showMaintenance ? (
              <Maintenance />
            ) : (
              <BrowserRouter>
                <ScrollToTop />
                <CustomCursor />
                <Routes>
                {/* Auth Route - stand alone or inside layout? Usually stand alone to avoid distractions */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                {/* Public deep-link for shared scholarship URLs */}
                <Route path="/scholarship/:slug" element={<ScholarshipDeepLink />} />

                {/* Main Layout routes */}
                <Route element={<AppLayout />}>
                  {/* Public Routes accessible within Layout */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} /> {/* Modified element to use About component */}

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    {navItems.map(({ to, page }) => (
                      <Route key={to} path={to} element={page} />
                    ))}
                  </Route>
                </Route>
              </Routes>
              <CookieConsent />
              <WhatsAppButton />
            </BrowserRouter>
            )}
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
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
import AppLayout from "./components/AppLayout";

import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <ScrollToTop />
              <CustomCursor />
              <Routes>
                {/* Auth Route - stand alone or inside layout? Usually stand alone to avoid distractions */}
                <Route path="/auth" element={<Auth />} />

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
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
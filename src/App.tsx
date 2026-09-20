import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import CookieConsent from "./components/CookieConsent";
import StudyDisclaimerModal from "./components/StudyDisclaimerModal";
import CustomCursor from "./components/CustomCursor";
import WhatsAppButton from "./components/WhatsAppButton";
import AIAssistant from "./components/ai-assistant/AIAssistant";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import BannedScreen from "./components/BannedScreen";
import PendingApprovalScreen from "./components/PendingApprovalScreen";

const Auth = lazy(() => import("./pages/Auth"));
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ScholarshipDeepLink = lazy(() => import("./pages/ScholarshipDeepLink"));
const OpportunityDeepLink = lazy(() => import("./pages/OpportunityDeepLink"));
const Maintenance = lazy(() => import("./pages/Maintenance"));

// Configure 5-minute caching to eliminate duplicate Supabase calls
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false, // Don't re-query on tab focus switch
      retry: 1,
    },
  },
});

const IS_MAINTENANCE_MODE = false; // during maintenance make it true

const AppContent = () => {
  const { user, isBanned, approvalStatus, refreshApprovalStatus, signOut } = useAuth();
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const showMaintenance = IS_MAINTENANCE_MODE && !isLocalhost;

  if (isBanned) {
    return <BannedScreen userEmail={user?.email} onSignOut={signOut} />;
  }

  return (
    <SidebarProvider>
      <TooltipProvider>
        <Toaster />
        {showMaintenance ? (
                <Suspense fallback={<PageLoader />}>
                  <Maintenance />
                </Suspense>
              ) : (
                <BrowserRouter>
                  <ScrollToTop />
                  <CustomCursor />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Standalone routes */}
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/pending-approval" element={
                        <PendingApprovalScreen
                          userEmail={user?.email}
                          onRefresh={refreshApprovalStatus}
                          onSignOut={signOut}
                        />
                      } />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      {/* Public deep-link for shared URLs */}
                      <Route path="/scholarship/:slug" element={<ScholarshipDeepLink />} />
                      <Route path="/opportunity/:id" element={<OpportunityDeepLink />} />

                      {/* Main Layout routes */}
                      <Route element={<AppLayout />}>
                        {/* Public Routes accessible within Layout */}
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                        {/* Protected Routes (Require Login / Signup) */}
                        <Route element={<ProtectedRoute />}>
                          {navItems
                            .filter(({ to }) => !['/', '/about', '/terms-of-service', '/privacy-policy'].includes(to))
                            .map(({ to, page }) => (
                              <Route
                                key={to}
                                path={to}
                                element={page}
                              />
                            ))}
                        </Route>
                      </Route>
                    </Routes>
                  </Suspense>
                  <WhatsAppButton />
                  <AIAssistant />
                  <CookieConsent />
                  <StudyDisclaimerModal />
                </BrowserRouter>
              )}
            </TooltipProvider>
          </SidebarProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
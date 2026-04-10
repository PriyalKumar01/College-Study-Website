import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileCompletionModal } from "./ProfileCompletionModal";
import { Menu, X } from "lucide-react";

const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const showSidebar = !!user;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex bg-background h-screen overflow-hidden">

        {/* ── Desktop Sidebar (always visible on md+) ── */}
        {showSidebar && (
          <aside className="hidden md:block w-auto h-full flex-shrink-0 z-40 border-r border-border bg-background transition-all duration-300">
            <AppSidebar className="h-full" />
          </aside>
        )}

        {/* ── Mobile Sidebar Overlay ── */}
        {showSidebar && mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* ── Mobile Sidebar Drawer ── */}
        {showSidebar && (
          <aside
            className={`fixed top-0 left-0 h-full z-50 w-[280px] transition-transform duration-300 md:hidden
              ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <AppSidebar className="h-full" />
          </aside>
        )}

        {/* ── Main Content ── */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth w-full flex flex-col">


          <Outlet />
          <ProfileCompletionModal />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

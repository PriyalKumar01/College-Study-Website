import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileCompletionModal } from "./ProfileCompletionModal";
import { Menu, X, LayoutDashboard, BookOpen, Award, Briefcase } from "lucide-react";

const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isQuizExam = location.pathname.includes('/gate-study/quiz') && new URLSearchParams(location.search).get('mode') === 'exam';
  const showSidebar = !!user && !isQuizExam;

  const isActiveTab = (path: string) => {
    if (path === '/notes') {
      return location.pathname.startsWith('/notes') || location.pathname.includes('-notes') || location.pathname.startsWith('/bsms') || location.pathname.startsWith('/first-semester') || location.pathname.startsWith('/second-semester') || location.pathname.startsWith('/third-semester') || location.pathname.startsWith('/fourth-semester') || location.pathname.startsWith('/fifth-semester') || location.pathname.startsWith('/sixth-semester') || location.pathname.startsWith('/seventh-semester') || location.pathname.startsWith('/eighth-semester');
    }
    return location.pathname.startsWith(path);
  };

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
        <main className={`flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth w-full flex flex-col ${showSidebar ? 'pb-16 md:pb-0' : ''}`}>
          <Outlet />
          <ProfileCompletionModal />
        </main>
      </div>

      {/* Sticky Mobile Bottom Navigation Bar */}
      {user && !isQuizExam && (
        <div 
          className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-300"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-center justify-around h-16 px-2">
            {[
              { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
              { label: "Notes", href: "/notes", icon: BookOpen },
              { label: "Scholarships", href: "/scholarship-portal", icon: Award },
              { label: "Opportunities", href: "/opportunities", icon: Briefcase }
            ].map((item) => {
              const active = isActiveTab(item.href);
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-bold transition-all relative ${
                    active 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                    active 
                      ? "bg-blue-600/10 scale-110" 
                      : "bg-transparent"
                  }`}>
                    <Icon className="h-[20px] w-[20px]" />
                  </div>
                  <span className={`mt-0.5 transition-colors ${active ? "font-black" : "font-medium text-slate-400 dark:text-slate-500"}`}>
                    {item.label}
                  </span>
                  
                  {active && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;

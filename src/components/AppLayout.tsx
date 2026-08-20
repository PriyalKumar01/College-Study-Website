import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { ProfileCompletionModal } from "./ProfileCompletionModal";
import { LayoutDashboard, BookOpen, Award, Briefcase } from "lucide-react";

const AppLayout = () => {
  const { user } = useAuth();
  const { isSidebarVisible } = useSidebar();
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

        {/* ── Desktop Sidebar (smooth slide in/out transition) ── */}
        {showSidebar && (
          <aside 
            className={`hidden md:block h-full flex-shrink-0 z-40 bg-background transition-all duration-500 ease-in-out overflow-hidden ${
              isSidebarVisible 
                ? "w-auto max-w-[300px] opacity-100 translate-x-0 border-r border-border" 
                : "w-0 max-w-0 opacity-0 -translate-x-full border-r-0 pointer-events-none"
            }`}
          >
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

        {/* ── Main Content (with safe bottom padding so footer is never cut off on mobile) ── */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth w-full flex flex-col ${user ? 'pb-28 md:pb-0' : 'pb-12 md:pb-0'}`}>
          <Outlet />
          <ProfileCompletionModal />
        </main>
      </div>

      {/* ── Professional Sticky Mobile Bottom Navigation Bar ── */}
      {user && !isQuizExam && (
        <nav 
          className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white/95 dark:bg-slate-950/95 border-t border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-around h-[62px] px-2">
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
                  className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all relative group cursor-pointer ${
                    active 
                      ? "text-indigo-600 dark:text-indigo-400 font-bold" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                  }`}
                >
                  {/* Active top glowing indicator */}
                  {active && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                  )}

                  <div className={`p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    active 
                      ? "bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/60 shadow-sm scale-105" 
                      : "bg-transparent group-hover:bg-slate-100 dark:group-hover:bg-slate-900"
                  }`}>
                    <Icon className={`h-5 w-5 transition-transform ${active ? "stroke-[2.2px]" : "stroke-[1.7px]"}`} />
                  </div>

                  <span className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                    active 
                      ? "text-indigo-600 dark:text-indigo-400 font-bold" 
                      : "text-slate-500 dark:text-slate-400 font-medium"
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppLayout;

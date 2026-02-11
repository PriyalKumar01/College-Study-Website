import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileCompletionModal } from "./ProfileCompletionModal";

const AppLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // If loading, we might want to show a spinner or nothing, 
  // but for now let's just render.

  // Decide if we should show sidebar. 
  // User Requirement: "Sidebar must remain visible and fixed throughout the entire website AFTER login"
  const showSidebar = !!user;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Navbar logic might need adjustment, but putting Navbar here for global context if needed. 
           However, Index.tsx and Dashboard.tsx use Navbar internally. 
           Let's rely on pages to render Navbar if they need specific props, or unify it.
           Wait, `Dashboard.tsx` has `<Navbar />` hidden on desktop. 
           `Index.tsx` has `<Navbar />`.
           To avoid double navbars, we should check implementation.
           User said: "Sidebar ... fixed ... right content area scrollable".
       */}

      <div className="flex bg-background h-screen overflow-hidden">
        {/* Sidebar - Fixed and non-scrollable container */}
        {showSidebar && (
          <aside className="hidden md:block w-auto h-full flex-shrink-0 z-40 border-r border-border bg-background transition-all duration-300">
            <AppSidebar className="h-full" />
          </aside>
        )}

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth w-full flex flex-col">
          {/* 
             Note: Individual pages (Dashboard, etc.) are responsible for rendering the Navbar 
             if they need it to be sticky within this scrollable area, 
             OR we can hoist Navbar here if it's truly global.
             Given current codebase, let's keep it in pages but ensure this container allows sticky behavior.
          */}
          <Outlet />
          <ProfileCompletionModal />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

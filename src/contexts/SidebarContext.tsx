import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  setSidebarVisible: (visible: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('studyhub_sidebar_visible');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => {
      const next = !prev;
      try {
        localStorage.setItem('studyhub_sidebar_visible', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const setSidebarVisible = (visible: boolean) => {
    setIsSidebarVisible(visible);
    try {
      localStorage.setItem('studyhub_sidebar_visible', JSON.stringify(visible));
    } catch {}
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, setSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    return {
      isSidebarVisible: true,
      toggleSidebar: () => {},
      setSidebarVisible: () => {}
    };
  }
  return context;
};

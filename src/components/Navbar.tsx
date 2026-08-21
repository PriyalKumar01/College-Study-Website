import { useState } from 'react';
import { 
  Menu, Moon, Sun, User, LogOut, Home, 
  LayoutDashboard, BookOpen, Calculator, FileText, 
  Users, Award, Briefcase, Brain, Info,
  Shield, Crown, Lock, Trophy, ChevronDown, Globe, ExternalLink,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import NotificationBell from './NotificationBell';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UsefulWebsitesDropdown, USEFUL_WEBSITES } from './UsefulWebsitesDropdown';
import NotesDropdown, { NOTE_CATEGORIES } from './NotesDropdown';
import InstallPWAButton from './InstallPWAButton';

interface NavbarProps {
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut, isAdmin, isOwner } = useAuth();
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileWebsitesOpen, setMobileWebsitesOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Mobile Drawer Items (Dashboard & Notes excluded since they are already in bottom nav)
  const authenticatedMobileItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/gate-study', label: 'Gate Study', icon: Trophy },
    { href: '/cgpa-calculator', label: 'CGPA Calculator', icon: Calculator },
    { href: '/premium-content', label: 'Premium Content', icon: Lock },
    { href: '/useful-ai-tools', label: '500+ AI Tools', icon: Brain },
    { href: '/notes-contributors', label: 'Contributor List', icon: Users },
    { href: '/about', label: 'About', icon: Info },
    ...(isAdmin ? [{ href: '/admin-portal', label: 'Admin Portal', icon: Shield }] : []),
    ...(isOwner ? [{ href: '/owner-dashboard', label: 'Owner Dashboard', icon: Crown }] : []),
  ];

  const defaultMobileItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
  ];

  const mobileNavItems = user ? authenticatedMobileItems : defaultMobileItems;
  const firstName = user?.user_metadata?.first_name || 'User';

  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-none sticky top-0 inset-x-0 z-40 w-full shrink-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Desktop Sidebar Toggle & Logo */}
          <div className="flex items-center">
            {user && (
              <button
                onClick={toggleSidebar}
                className="hidden md:flex p-2 mr-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                title={isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
                aria-label="Toggle Sidebar"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            )}

            <Link to="/" className="flex items-center space-x-2 mr-6 shrink-0">
              <img
                src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                alt="College Study Hub"
                className="h-8 md:h-10 w-auto block"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-start">
            {/* 1. Home */}
            <Link
              to="/"
              className={`text-sm font-medium transition-colors relative group py-1 ${
                isActive('/') ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>

            {/* Authenticated Links: Dashboard, Notes Dropdown, Useful Websites Dropdown */}
            {user && (
              <>
                {/* 2. Dashboard */}
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors relative group py-1 ${
                    isActive('/dashboard') ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  Dashboard
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                    isActive('/dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>

                {/* 3. Notes Dropdown (Hover to open) */}
                <NotesDropdown />

                {/* 4. Useful Websites Dropdown (Hover to open) */}
                <UsefulWebsitesDropdown />
              </>
            )}

            {/* 5. About (Rightmost in nav links) */}
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors relative group py-1 ${
                isActive('/about') ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
          </div>

          {/* Right Section: Desktop Auth/Actions & Mobile Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Desktop Download App Button */}
            <div className="hidden md:block">
              <InstallPWAButton variant="desktop-navbar" />
            </div>

            {/* Notification Bell - desktop */}
            {user && (
              <div className="hidden md:block">
                <NotificationBell />
              </div>
            )}

            {/* Desktop Theme Toggle & Auth */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={toggleTheme}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />}
              </button>

              {!user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth ? onOpenAuth('signin') : null}
                    className="h-9 px-4 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                  </button>
                  <button
                    onClick={() => onOpenAuth ? onOpenAuth('signup') : null}
                    className="h-9 px-4 text-xs font-semibold rounded-xl bg-[#0a1931] hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-sm hover:shadow transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    {onOpenAuth ? <span>Get Started</span> : <Link to="/auth">Get Started</Link>}
                  </button>
                </div>
              ) : null}
            </div>

            {/* ── Mobile Top Header Actions ── */}
            <div className="md:hidden flex items-center gap-1.5">
              {/* 1. Mobile Download App Pill */}
              <InstallPWAButton variant="mobile-header" />

              {/* 2. Mobile Useful Websites Dropdown Trigger (Only if logged in) */}
              {user && <UsefulWebsitesDropdown isMobileIcon={true} />}

              {/* 3. Notification Bell (if user logged in) */}
              {user && <NotificationBell />}

              {/* 4. Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />}
              </button>

              {/* 5. Mobile Drawer Trigger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none" aria-label="Menu">
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[82%] sm:w-[350px] p-5">
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2">
                      <img
                        src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                        alt="Logo"
                        className="h-6 w-auto"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-4 mt-5">
                    {/* Install PWA Button on Mobile Drawer */}
                    <div>
                      <InstallPWAButton variant="drawer-full" />
                    </div>

                    {/* User Info Mobile - Clickable to Profile */}
                    {user && (
                      <Link to="/profile" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                          <Avatar className="h-10 w-10 border border-indigo-200 dark:border-indigo-800">
                            <AvatarImage src={user.user_metadata?.avatar_url || user.user_metadata?.picture} />
                            <AvatarFallback>{user.user_metadata?.first_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{firstName}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                      </Link>
                    )}

                    <div className="flex flex-col space-y-1 max-h-[50vh] overflow-y-auto pb-4 custom-scrollbar">
                      {/* Nav items before Useful Websites (Home to Contributor List) */}
                      {mobileNavItems.filter(item => item.href !== '/about' && item.href !== '/admin-portal' && item.href !== '/owner-dashboard').map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${isActive(item.href)
                            ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${isActive(item.href) ? 'bg-indigo-600/20 text-indigo-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          {item.label}
                        </Link>
                      ))}

                      {/* Useful Websites Mobile Collapsible Section (Only if user logged in, right ABOVE About) */}
                      {user && (
                        <div className="pt-1.5 pb-1">
                          <button
                            onClick={() => setMobileWebsitesOpen(!mobileWebsitesOpen)}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/50 transition-all border border-indigo-100 dark:border-indigo-900/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-600 dark:text-indigo-400">
                                <Globe className="h-4 w-4" />
                              </div>
                              <span>Useful Websites (6)</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileWebsitesOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {mobileWebsitesOpen && (
                            <div className="mt-2 space-y-1 pl-2 pr-1">
                              {USEFUL_WEBSITES.map((site, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={site.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                                >
                                  <span>{site.name}</span>
                                  <ExternalLink className="h-3 w-3 text-slate-400 shrink-0 ml-2" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* About Link (Right AFTER Useful Websites) */}
                      <Link
                        to="/about"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${isActive('/about')
                          ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                          }`}
                      >
                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${isActive('/about') ? 'bg-indigo-600/20 text-indigo-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                          <Info className="h-4 w-4" />
                        </div>
                        About
                      </Link>

                      {/* Admin / Owner items */}
                      {mobileNavItems.filter(item => item.href === '/admin-portal' || item.href === '/owner-dashboard').map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${isActive(item.href)
                            ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${isActive(item.href) ? 'bg-indigo-600/20 text-indigo-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Drawer Bottom Footer: Theme Mode Button + Sign Out / Login */}
                    <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="w-full justify-start gap-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />}
                        <span className="font-medium text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                      </Button>

                      {user ? (
                        <Button variant="ghost" className="w-full justify-start gap-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10" onClick={() => signOut()}>
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => { setIsOpen(false); if (onOpenAuth) onOpenAuth('signin'); }}
                            className="py-2 px-3 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-center transition-all"
                          >
                            {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                          </button>
                          <button
                            onClick={() => { setIsOpen(false); if (onOpenAuth) onOpenAuth('signup'); }}
                            className="py-2 px-3 text-xs font-semibold rounded-xl bg-[#0a1931] hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 text-center shadow-sm transition-all"
                          >
                            {onOpenAuth ? <span>Join</span> : <Link to="/auth">Join</Link>}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { 
  Menu, Moon, Sun, User, LogOut, Home, 
  LayoutDashboard, BookOpen, Calculator, FileText, 
  Users, Award, Briefcase, Brain, Info,
  Shield, Crown, Lock, Trophy, ChevronDown, Globe, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
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
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileWebsitesOpen, setMobileWebsitesOpen] = useState(false);
  const [mobileNotesOpen, setMobileNotesOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Mobile AppSidebar Items shown when logged in
  const authenticatedMobileItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'Notes', icon: BookOpen },
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
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'Notes', icon: BookOpen },
    { href: '/about', label: 'About', icon: Info },
  ];

  const mobileNavItems = user ? authenticatedMobileItems : defaultMobileItems;
  const firstName = user?.user_metadata?.first_name || 'User';

  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-none sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 mr-6 shrink-0">
            <img
              src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
              alt="College Study Hub"
              className="h-8 md:h-10 w-auto block"
            />
          </Link>

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

            {/* 2. Dashboard */}
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors relative group py-1 ${
                isActive('/dashboard') ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-foreground'
              }`}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  if (onOpenAuth) onOpenAuth('signin');
                }
              }}
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

          <div className="flex items-center gap-3">
            {/* Install PWA Button on Desktop */}
            <div className="hidden sm:block">
              <InstallPWAButton />
            </div>

            {/* Notification Bell - visible only when logged in */}
            {user && <NotificationBell />}

            {/* Desktop Theme Toggle & Auth */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              {!user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-4 font-medium"
                    onClick={() => onOpenAuth ? onOpenAuth('signin') : null}
                    asChild={!onOpenAuth}
                  >
                    {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    onClick={() => onOpenAuth ? onOpenAuth('signup') : null}
                    asChild={!onOpenAuth}
                  >
                    {onOpenAuth ? <span>Get Started</span> : <Link to="/auth">Get Started</Link>}
                  </Button>
                </>
              ) : null}
            </div>

            {/* Mobile Menu (Sheet) */}
            <div className="md:hidden flex items-center gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-accent focus:outline-none" aria-label="Menu">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2">
                      <img
                        src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                        alt="Logo"
                        className="h-6 w-auto"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-5 mt-6">
                    {/* Install PWA Button on Mobile Drawer */}
                    <div>
                      <InstallPWAButton isMobile={true} />
                    </div>

                    {/* User Info Mobile - Clickable to Profile */}
                    {user && (
                      <Link to="/profile" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback>{user.user_metadata?.first_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <div className="overflow-hidden">
                            <p className="font-medium truncate">{firstName}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                      </Link>
                    )}

                    <div className="flex flex-col space-y-1 max-h-[55vh] overflow-y-auto pb-4 custom-scrollbar">
                      {mobileNavItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive(item.href)
                            ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${isActive(item.href) ? 'bg-blue-600/20' : 'bg-slate-200 dark:bg-slate-800'}`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          {item.label}
                        </Link>
                      ))}

                      {/* Useful Websites Mobile Collapsible Section */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setMobileWebsitesOpen(!mobileWebsitesOpen)}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-600 dark:text-blue-400">
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
                                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                              >
                                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{site.name}</span>
                                <ExternalLink className="h-3 w-3 text-slate-400 shrink-0 ml-2" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto border-t pt-4 space-y-3">
                      <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start gap-2">
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </Button>

                      {user ? (
                        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10" onClick={() => signOut()}>
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" onClick={() => onOpenAuth ? onOpenAuth('signin') : null} asChild={!onOpenAuth}>
                            {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                          </Button>
                          <Button onClick={() => onOpenAuth ? onOpenAuth('signup') : null} asChild={!onOpenAuth}>
                            {onOpenAuth ? <span>Join</span> : <Link to="/auth">Join</Link>}
                          </Button>
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

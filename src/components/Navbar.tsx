import { useState, useRef, useEffect } from 'react';
import { 
  Menu, Moon, Sun, LogOut, Home, 
  LayoutDashboard, BookOpen, Calculator, 
  Users, Award, Briefcase, Brain, Info,
  Shield, Crown, Lock, Trophy, ChevronDown, Globe, ExternalLink,
  Clock, AlertCircle, Code, LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { ReportIssueModal } from './ReportIssueModal';
import InstallPWAButton from './InstallPWAButton';

interface NavbarProps {
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut, isAdmin, isOwner, approvalStatus } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileWebsitesOpen, setMobileWebsitesOpen] = useState(false);
  const [reportIssueOpen, setReportIssueOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const isApproved = !!user && approvalStatus === 'approved';
  const isPending = !!user && approvalStatus === 'pending';

  // Mobile Drawer Navigation Items
  const authenticatedMobileItems = [
    { href: '/dashboard', label: 'Explore Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'Curated Notes', icon: BookOpen },
    { href: '/coding-space', label: 'Coding Calendar', icon: Code },
    { href: '/gate-study', label: 'Gate Study', icon: Trophy },
    { href: '/cgpa-calculator', label: 'CGPA Calculator', icon: Calculator },
    { href: '/premium-content', label: 'Premium Content', icon: Lock },
    { href: '/useful-ai-tools', label: '500+ AI Tools', icon: Brain },
    { href: '/notes-contributors', label: 'Contributors & Admins', icon: Users },
    { href: '/about', label: 'About', icon: Info },
    ...(isAdmin ? [{ href: '/admin-portal', label: 'Admin Portal', icon: Shield }] : []),
    ...(isOwner ? [{ href: '/owner-dashboard', label: 'Owner Dashboard', icon: Crown }] : []),
  ];

  const defaultMobileItems = [
    { href: '/about', label: 'About', icon: Info },
  ];

  const mobileNavItems = isApproved ? authenticatedMobileItems : defaultMobileItems;
  const firstName = user?.user_metadata?.first_name || 'User';

  return (
    <>
      <nav className="bg-white/85 dark:bg-slate-950/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70 border-b border-gray-200 dark:border-slate-800 shadow-xs sticky top-0 inset-x-0 z-40 w-full shrink-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Platform Logo (Clicking navigates to Home) */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 mr-6 shrink-0" title="College Study Hub">
                <img
                  src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                  alt="College Study Hub"
                  className="h-8 md:h-10 w-auto block"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-6 flex-1 justify-start">
              {/* Authenticated Links: Only for approved users */}
              {isApproved && (
                <>
                  {/* 1. Explore Dashboard Link (Instant direct link, no hover dropdown) */}
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors relative group py-1 ${
                      isActive('/dashboard') ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    Explore Dashboard
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                      isActive('/dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>

                  {/* 2. Curated Notes Link (Instant direct link, no hover dropdown) */}
                  <Link
                    to="/notes"
                    className={`text-sm font-medium transition-colors relative group py-1 ${
                      isActive('/notes') ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    Curated Notes
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                      isActive('/notes') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>

                  {/* 3. Coding Calendar Link (Navigates directly to Coding Space) */}
                  <Link
                    to="/coding-space"
                    className={`text-sm font-medium transition-colors relative group py-1 ${
                      isActive('/coding-space') || isActive('/coding-calendar') ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    Coding Calendar
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                      isActive('/coding-space') || isActive('/coding-calendar') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>

                  {/* 4. Useful Websites Dropdown */}
                  <UsefulWebsitesDropdown />
                </>
              )}

              {/* Pending Approval Badge Link */}
              {isPending && (
                <Link
                  to="/pending-approval"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shadow-xs"
                >
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Pending Approval</span>
                </Link>
              )}

              {/* 4. About */}
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors relative group py-1 ${
                  isActive('/about') ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                About
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                  isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            </div>

            {/* Right Section: Desktop Auth/Actions & Mobile Header Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Report Issue Button for All Students (Right Side next to Bell) */}
              {user && (
                <button
                  onClick={() => setReportIssueOpen(true)}
                  className="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-sm border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all shadow-xs cursor-pointer"
                  title="Report any issue, glitch or missing notes directly to the support team"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Report Issue</span>
                </button>
              )}

              {/* Notification Bell - desktop */}
              {user && (
                <div className="hidden md:block">
                  <NotificationBell />
                </div>
              )}

              {/* Desktop Theme Toggle & Auth */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                  aria-label="Toggle theme"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />}
                </button>

                {!user ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenAuth ? onOpenAuth('signin') : null}
                      className="h-8 px-3.5 text-xs font-semibold rounded-sm border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                    </button>
                    <button
                      onClick={() => onOpenAuth ? onOpenAuth('signup') : null}
                      className="h-8 px-3.5 text-xs font-semibold rounded-sm bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      {onOpenAuth ? <span>Get Started</span> : <Link to="/auth">Get Started</Link>}
                    </button>
                  </div>
                ) : (
                  <ProfileDropdown />
                )}
              </div>

              {/* ── Mobile Top Header Actions ── */}
              <div className="md:hidden flex items-center gap-1.5">
                {/* 1. Mobile Download App Pill */}
                <InstallPWAButton variant="mobile-header" />

                {/* 2. Mobile Useful Websites Dropdown Trigger */}
                {user && <UsefulWebsitesDropdown isMobileIcon={true} />}

                {/* 3. Notification Bell */}
                {user && <NotificationBell />}

                {/* 4. Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />}
                </button>

                {/* 5. Mobile Drawer Trigger */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none" aria-label="Menu">
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

                      {/* User Info Mobile */}
                      {user && (
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-sm hover:bg-muted transition-colors cursor-pointer">
                            <Avatar className="h-9 w-9 border border-indigo-200 dark:border-indigo-800">
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
                        {mobileNavItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-sm transition-all ${
                              isActive(item.href)
                                ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className={`p-1.5 rounded-sm flex-shrink-0 ${
                              isActive(item.href)
                                ? 'bg-indigo-600/20 text-indigo-600'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              <item.icon className="h-3.5 w-3.5" />
                            </div>
                            <span>{item.label}</span>
                          </Link>
                        ))}

                        {/* Report Issue Button in Mobile Drawer (Only for authenticated verified students) */}
                        {user && (
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              setReportIssueOpen(true);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all text-left cursor-pointer"
                          >
                            <div className="p-1.5 rounded-sm bg-amber-500/20 text-amber-600">
                              <AlertCircle className="h-3.5 w-3.5" />
                            </div>
                            <span>Report Issue / Bug</span>
                          </button>
                        )}
                      </div>

                      {/* Drawer Bottom Footer: Theme Mode Button + Sign Out / Login */}
                      <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleTheme}
                          className="w-full justify-start gap-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm"
                        >
                          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />}
                          <span className="font-medium text-xs">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </Button>

                        {user ? (
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-sm text-xs"
                            onClick={() => signOut()}
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => { setIsOpen(false); if (onOpenAuth) onOpenAuth('signin'); }}
                              className="py-2 px-3 text-xs font-semibold rounded-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-center transition-all"
                            >
                              {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                            </button>
                            <button
                              onClick={() => { setIsOpen(false); if (onOpenAuth) onOpenAuth('signup'); }}
                              className="py-2 px-3 text-xs font-semibold rounded-sm bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 text-center shadow-xs transition-all"
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

      {/* Global Report Issue Modal */}
      <ReportIssueModal
        isOpen={reportIssueOpen}
        onClose={() => setReportIssueOpen(false)}
      />
    </>
  );
};

export default Navbar;

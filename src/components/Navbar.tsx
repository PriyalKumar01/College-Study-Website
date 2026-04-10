import { useState } from 'react';
import { 
  Menu, Moon, Sun, User, LogOut, Home, 
  LayoutDashboard, BookOpen, Calculator, FileText, 
  Users, Layers, Award, Briefcase, Brain, Info,
  Shield, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Desktop Navbar Items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/notes', label: 'Notes' },
    { href: '/about', label: 'About' },
  ];

  // Mobile AppSidebar Items shown when logged in
  const authenticatedMobileItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'Notes', icon: BookOpen },
    { href: '/cgpa-calculator', label: 'CGPA Calculator', icon: Calculator },
    { href: '/ats-friendly-resume', label: 'ATS Friendly Resume', icon: FileText },
    { href: '/notes-contributors', label: 'Contributor List', icon: Users },
    { href: '/learning-platforms', label: 'Integrated Platforms', icon: Layers },
    { href: '/opportunities?type=scholarship', label: 'Scholarships', icon: Award },
    { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
    { href: '/useful-ai-tools', label: 'AI Tools', icon: Brain },
    { href: '/about', label: 'About', icon: Info },
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
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <img
              src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
              alt="College Study Hub"
              className="h-8 md:h-10 w-auto block" // Ensure block to be visible
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-start">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors relative group py-1 ${isActive(item.href)
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
                  }`}
                onClick={(e) => {
                  if (!user && item.href !== '/' && item.href !== '/about') {
                    e.preventDefault();
                    if (onOpenAuth) onOpenAuth('signin');
                  }
                }}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
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
              ) : (
                // Profile is hidden on desktop because it's available in the Sidebar
                null
              )}
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
                      {/* Removed 'Menu' text as per request */}
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 mt-8">
                    {/* User Info Mobile - Clickable to Profile */}
                    {user && (
                      <Link to="/profile" onClick={() => setIsOpen(false)}> {/* Add Link wrapper */}
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

                    <div className="flex flex-col space-y-1 max-h-[60vh] overflow-y-auto pb-4 custom-scrollbar">
                      {mobileNavItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)} // Ensure setOpen is used
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
                    </div>

                    <div className="mt-auto border-t pt-6 space-y-4">
                      <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start gap-2">
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </Button>

                      {user ? (
                        <>
                          {/* Removed 'My Profile' button as requested since top section is clickable */}
                          <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10" onClick={() => signOut()}>
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
                        </>
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

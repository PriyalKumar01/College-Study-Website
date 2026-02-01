import { useState } from 'react';
import { Menu, X, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

interface NavbarProps {
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Simplified navbar items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/notes', label: 'Notes' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="bg-blue-50/60 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-blue-50/40 dark:supports-[backdrop-filter]:bg-slate-900/40 border-b border-blue-200 dark:border-slate-700 sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <img
              src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
              alt="College Study Hub"
              className="h-8 md:h-10 w-auto"
            />
          </Link>

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

          <div className="flex items-center space-x-3">
            {!user && (
              <>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <div className="hidden md:flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-4 font-medium"
                    onClick={() => onOpenAuth ? onOpenAuth('signin') : null}
                    asChild={!onOpenAuth}
                  >
                    {onOpenAuth ? (
                      <span>Login</span>
                    ) : (
                      <Link to="/auth">Login</Link>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    onClick={() => onOpenAuth ? onOpenAuth('signup') : null}
                    asChild={!onOpenAuth}
                  >
                    {onOpenAuth ? (
                      <span>Get Started</span>
                    ) : (
                      <Link to="/auth">Get Started</Link>
                    )}
                  </Button>
                </div>
              </>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t">
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    if (!user && item.href !== '/' && item.href !== '/about') {
                      e.preventDefault();
                      setIsOpen(false);
                      if (onOpenAuth) onOpenAuth('signin');
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`block px-4 py-2.5 text-sm font-medium rounded transition-colors ${isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground hover:bg-accent/50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 px-4 border-t mt-4 space-y-3">
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start">
                  {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
                {user ? (
                  <div className="w-full flex justify-start">
                    <ProfileDropdown />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => { onOpenAuth ? onOpenAuth('signin') : null; setIsOpen(false); }}
                      asChild={!onOpenAuth}
                    >
                      {onOpenAuth ? <span>Login</span> : <Link to="/auth">Login</Link>}
                    </Button>
                    <Button
                      className="w-full justify-center bg-primary text-primary-foreground"
                      onClick={() => { onOpenAuth ? onOpenAuth('signup') : null; setIsOpen(false); }}
                      asChild={!onOpenAuth}
                    >
                      {onOpenAuth ? <span>Get Started</span> : <Link to="/auth">Get Started</Link>}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

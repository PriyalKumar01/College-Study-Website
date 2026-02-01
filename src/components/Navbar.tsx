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
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png" 
              alt="College Study Hub" 
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <div className="hidden md:block">
              {user ? (
                <ProfileDropdown />
              ) : onOpenAuth ? (
                <Button 
                  size="sm" 
                  onClick={() => onOpenAuth('signin')}
                  className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              ) : (
                <Button size="sm" asChild className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white">
                  <Link to="/auth">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
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
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium rounded transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 px-4 border-t mt-4 space-y-2">
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start">
                  {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
                {user ? (
                  <ProfileDropdown />
                ) : onOpenAuth ? (
                  <Button 
                    className="w-full justify-start bg-gray-900 hover:bg-gray-800 text-white" 
                    onClick={() => { onOpenAuth('signin'); setIsOpen(false); }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                ) : (
                  <Button asChild className="w-full justify-start bg-gray-900 hover:bg-gray-800 text-white">
                    <Link to="/auth">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
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

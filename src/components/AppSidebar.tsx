import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  Users,
  Layers,
  Award,
  Briefcase,
  BookOpen,
  Code,
  Brain,
  Info,
  LogOut,
  Moon,
  Sun,
  Edit,
  GraduationCap,
  FileText,
  Laptop,
  Home,
  BadgeCheck
} from 'lucide-react';

interface AppSidebarProps {
  className?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  children?: NavItem[];
}

const AppSidebar = ({ className }: AppSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = user?.email || '';
  const userMetadata = user?.user_metadata || {};
  const firstName = userMetadata.first_name || userEmail.split('@')[0];
  const lastName = userMetadata.last_name || '';
  const avatarUrl = userMetadata.avatar_url;

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return firstName ? firstName[0].toUpperCase() : 'U';
  };

  const navItems: NavItem[] = [
    { icon: <Home className="h-4 w-4" />, label: 'Home', href: '/' },
    { icon: <Calculator className="h-4 w-4" />, label: 'CGPA Calculator', href: '/cgpa-calculator' },
    { icon: <Users className="h-4 w-4" />, label: 'Contributor List', href: '/notes-contributors' },
    { icon: <Layers className="h-4 w-4" />, label: 'Integrated Platforms', href: '/learning-platforms' },
    { icon: <Award className="h-4 w-4" />, label: 'Scholarships', href: '/opportunities?type=scholarship' },
    { icon: <Briefcase className="h-4 w-4" />, label: 'Opportunities', href: '/opportunities' },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: 'Notes',
      href: '/notes',
      children: [
        { icon: <GraduationCap className="h-4 w-4" />, label: 'BTech Notes', href: '/btech-notes' },
        { icon: <FileText className="h-4 w-4" />, label: 'BBA Notes', href: '/bba-notes' },
        { icon: <FileText className="h-4 w-4" />, label: 'MBA Notes', href: '/mba-notes' },
        { icon: <Code className="h-4 w-4" />, label: 'DSA', href: '/dsa-notes' },
        { icon: <Laptop className="h-4 w-4" />, label: 'Development', href: '/web-development-notes' },
        { icon: <Code className="h-4 w-4" />, label: 'Coding Notes', href: '/coding-study-material' },
      ]
    },
    { icon: <Brain className="h-4 w-4" />, label: 'AI Tools', href: '/useful-ai-tools' },
    { icon: <Info className="h-4 w-4" />, label: 'About', href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label)
        ? prev.filter(g => g !== label)
        : [...prev, label]
    );
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`h-full bg-blue-50/30 dark:bg-slate-900/50 border-r border-blue-200 dark:border-slate-700 flex flex-col backdrop-blur-sm ${className}`}
    >
      {/* Toggle Button - Moved inside the sidebar */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-2 top-3 z-50 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-muted-foreground"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Profile Section - Clickable Box */}
      <div className={`p-4 border-b border-border ${isCollapsed ? 'items-center' : ''}`}>
        <div
          onClick={() => navigate('/profile')}
          className={`flex ${isCollapsed ? 'flex-col items-center justify-center p-2' : 'items-center gap-3 p-3'} rounded-xl cursor-pointer transition-all duration-200 hover:bg-secondary/50 border border-transparent hover:border-border group`}
          title="View Profile"
        >
          <Avatar className="h-10 w-10 flex-shrink-0 border border-border/50 group-hover:border-primary/50 transition-colors">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors flex items-center gap-2">
                  {firstName} {lastName}
                  <span className="relative flex-shrink-0">
                    <BadgeCheck className="h-5 w-5 text-white fill-green-500 relative z-10 drop-shadow-lg" />
                    <span className="absolute inset-0 bg-green-500/30 rounded-full blur-sm animate-pulse" />
                  </span>
                </p>
                <p className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground/80">
                  {userEmail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleGroup(item.label.toLowerCase())}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${isCollapsed ? 'justify-center' : ''
                      }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${expandedGroups.includes(item.label.toLowerCase()) ? 'rotate-90' : ''
                            }`}
                        />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {!isCollapsed && expandedGroups.includes(item.label.toLowerCase()) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 mt-1 space-y-1"
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <button
                              onClick={() => navigate(child.href)}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${isActive(child.href)
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground'
                                }`}
                            >
                              {child.icon}
                              <span>{child.label}</span>
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <button
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${isActive(item.href)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${isCollapsed ? 'justify-center' : ''
            }`}
          title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : undefined}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <button
          onClick={handleSignOut}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 ${isCollapsed ? 'justify-center' : ''
            }`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;

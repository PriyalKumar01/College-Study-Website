import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

  // Local state for profile avatar to override metadata if available
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      const fetchProfileAvatar = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .maybeSingle();

        if (data?.avatar_url) {
          setProfileAvatar(data.avatar_url);
        }
      };

      fetchProfileAvatar();
    }
  }, [user?.id]);

  const userEmail = user?.email || '';
  const userMetadata = user?.user_metadata || {};

  const firstName = userMetadata.first_name || userEmail.split('@')[0];
  const lastName = userMetadata.last_name || '';
  // Prioritize locally fetched profile avatar (DB) over auth metadata (Google)
  const avatarUrl = profileAvatar || userMetadata.avatar_url;

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
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
      className={`h-full bg-slate-900/95 border-r border-slate-800 flex flex-col text-slate-100 ${className}`}
    >
      {/* Profile Section */}
      <div className="p-4 mb-2">
        <div
          onClick={() => navigate('/profile')}
          className={`flex ${isCollapsed ? 'justify-center' : 'items-center gap-3'} p-2 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700 group`}
          title="View Profile"
        >
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-slate-700 group-hover:border-blue-500 transition-colors">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-slate-800 text-slate-300 font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-900"></div>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="font-bold text-sm truncate text-white group-hover:text-blue-400 transition-colors">
                  {firstName} {lastName}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {userEmail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar Toggle Button (Moved Below Profile) */}
      <div className={`px-4 mb-4 flex ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-sm border border-slate-700"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleGroup(item.label.toLowerCase())}
                  className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all group ${expandedGroups.includes(item.label.toLowerCase()) ? 'bg-slate-800/50' : 'hover:bg-slate-800/50'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  {/* 3D Icon Container */}
                  <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-900/20 border border-white/10 group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </div>

                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${expandedGroups.includes(item.label.toLowerCase()) ? 'rotate-90' : ''
                          }`}
                      />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {!isCollapsed && expandedGroups.includes(item.label.toLowerCase()) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 mt-1 space-y-1 border-l-2 border-slate-800 pl-3"
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => navigate(child.href)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive(child.href)
                            ? 'text-blue-400 bg-blue-500/10 font-semibold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`}
                        >
                          {/* Smaller 3D Icon for Sub-items */}
                          <div className={`p-1 rounded-md ${isActive(child.href) ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
                            {child.icon}
                          </div>
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <button
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all group ${isActive(item.href) ? 'bg-slate-800 border border-slate-700' : 'hover:bg-slate-800/50 border border-transparent'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* 3D Icon Container */}
                <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg shadow-lg border border-white/10 transition-transform duration-200 group-hover:scale-110 ${isActive(item.href)
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/20'
                  : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300 group-hover:from-blue-600 group-hover:to-indigo-700 group-hover:text-white'
                  }`}>
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <span className={`text-sm font-medium transition-colors ${isActive(item.href) ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-slate-800/50 group ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : undefined}
        >
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-yellow-400 border border-slate-700 group-hover:bg-slate-700 transition-colors">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </div>
          {!isCollapsed && <span className="text-sm font-medium text-slate-300 group-hover:text-white">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <button
          onClick={handleSignOut}
          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-red-500/10 group ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-red-500 border border-slate-700 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          {!isCollapsed && <span className="text-sm font-medium text-slate-300 group-hover:text-red-400">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;

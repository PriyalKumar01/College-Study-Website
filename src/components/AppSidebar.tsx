import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/providers/ThemeProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  Award,
  Briefcase,
  BookOpen,
  Code,
  Brain,
  Info,
  LogOut,
  Moon,
  Sun,
  GraduationCap,
  FileText,
  Laptop,
  Home,
  Shield,
  Crown,
  Lock,
  Trophy,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface AppSidebarProps {
  className?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: {
    text: string;
    className: string;
  };
  openInNewTab?: boolean;
  children?: NavItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const AppSidebar = ({ className }: AppSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { user, signOut, isAdmin, isOwner } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileAvatar, setProfileAvatar] = useState<string | null>(() => {
    try {
      return user?.id ? sessionStorage.getItem(`cached_avatar_${user.id}`) : null;
    } catch {
      return null;
    }
  });

  const [oppCount, setOppCount] = useState<number | null>(() => {
    try {
      const cached = sessionStorage.getItem('cached_opp_count');
      const time = sessionStorage.getItem('cached_opp_count_time');
      if (cached && time && Date.now() - Number(time) < 15 * 60 * 1000) {
        return Number(cached);
      }
    } catch {}
    return null;
  });

  const PREMIUM_PLANS_COUNT = 4;

  useEffect(() => {
    if (user?.id && !profileAvatar) {
      const fetchProfileAvatar = async () => {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .maybeSingle();

          if (data?.avatar_url) {
            setProfileAvatar(data.avatar_url);
            try { sessionStorage.setItem(`cached_avatar_${user.id}`, data.avatar_url); } catch {}
          }
        } catch (e) {
          console.error("Error fetching avatar:", e);
        }
      };
      fetchProfileAvatar();
    }
  }, [user?.id, profileAvatar]);

  useEffect(() => {
    const fetchOppCount = async () => {
      const cached = getCachedData<number>('sidebar_opp_count', DEFAULT_CACHE_TTL_MS);
      if (cached !== null) {
        setOppCount(cached);
        return;
      }

      try {
        const { count, error } = await supabase
          .from('opportunities')
          .select('id', { count: 'exact', head: true });
        if (!error && count !== null) {
          setOppCount(count);
          setCachedData('sidebar_opp_count', count);
        }
      } catch (err) {
        console.error('Error fetching opportunities count for sidebar:', err);
      }
    };
    fetchOppCount();
  }, []);

  const userEmail = user?.email || '';
  const userMetadata = user?.user_metadata || {};
  const firstName = userMetadata.first_name || userEmail.split('@')[0];
  const lastName = userMetadata.last_name || '';
  const avatarUrl = profileAvatar?.trim() || userMetadata.avatar_url?.trim() || userMetadata.picture?.trim() || '';

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return firstName ? firstName[0].toUpperCase() : 'U';
  };

  // Structured Sections (Codolio Professional Architecture)
  const navSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { icon: <Home className="h-4 w-4" />, label: 'Home', href: '/' },
      ],
    },
    {
      title: 'Academics',
      items: [
        {
          icon: <BookOpen className="h-4 w-4" />,
          label: 'Notes',
          href: '/notes',
          children: [
            { icon: <GraduationCap className="h-3.5 w-3.5" />, label: 'BTech Notes', href: '/btech-notes' },
            { icon: <GraduationCap className="h-3.5 w-3.5" />, label: 'BS-MS Notes', href: '/bsms-notes' },
            { icon: <FileText className="h-3.5 w-3.5" />, label: 'BBA Notes', href: '/bba-notes' },
            { icon: <FileText className="h-3.5 w-3.5" />, label: 'MBA Notes', href: '/mba-notes' },
            { icon: <Code className="h-3.5 w-3.5" />, label: 'DSA', href: '/dsa-notes' },
            { icon: <Laptop className="h-3.5 w-3.5" />, label: 'Development', href: '/web-development-notes' },
            { icon: <Code className="h-3.5 w-3.5" />, label: 'Coding Notes', href: '/coding-study-material' },
          ],
        },
        {
          icon: <Trophy className="h-4 w-4 text-emerald-400" />,
          label: 'Gate Study',
          href: '/gate-study',
          badge: { text: 'NEW', className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' },
        },
        {
          icon: <Calculator className="h-4 w-4" />,
          label: 'CGPA Calculator',
          href: '/cgpa-calculator',
        },
      ],
    },
    {
      title: 'Career & Coding',
      items: [
        {
          icon: <Code className="h-4 w-4 text-emerald-400" />,
          label: 'Coding Space',
          href: '/coding-space',
          badge: { text: 'NEW', className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' },
        },
        {
          icon: <Lock className="h-4 w-4 text-amber-400" />,
          label: `Premium Content (${PREMIUM_PLANS_COUNT})`,
          href: '/premium-content',
          badge: { text: 'PRO', className: 'bg-amber-500/10 text-amber-400 border border-amber-500/25' },
        },
        {
          icon: <Briefcase className="h-4 w-4" />,
          label: `Opportunities${oppCount !== null ? ` (${oppCount})` : ''}`,
          href: '/opportunities',
          badge: oppCount ? { text: `${oppCount}`, className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' } : undefined,
        },
        {
          icon: <Award className="h-4 w-4" />,
          label: 'Scholarships',
          href: '/scholarship-portal',
        },
      ],
    },
    {
      title: 'Tools & Community',
      items: [
        { icon: <Award className="h-4 w-4" />, label: 'Contributors', href: '/notes-contributors' },
        { icon: <Info className="h-4 w-4" />, label: 'About', href: '/about' },
      ],
    },
    ...(isAdmin || isOwner
      ? [
          {
            title: 'Administration',
            items: [
              ...(isAdmin ? [{ icon: <Shield className="h-4 w-4 text-rose-400" />, label: 'Admin Portal', href: '/admin-portal', badge: { text: 'ADMIN', className: 'bg-rose-500/10 text-rose-400 border border-rose-500/25' } }] : []),
              ...(isOwner ? [{ icon: <Crown className="h-4 w-4 text-amber-400" />, label: 'Owner Dashboard', href: '/owner-dashboard', badge: { text: 'OWNER', className: 'bg-amber-500/10 text-amber-400 border border-amber-500/25' } }] : []),
            ],
          },
        ]
      : []),
  ];

  useEffect(() => {
    navSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children && item.children.some((child) => location.pathname === child.href)) {
          const groupLabel = item.label.toLowerCase();
          if (!expandedGroups.includes(groupLabel)) {
            setExpandedGroups((prev) => [...prev, groupLabel]);
          }
        }
      });
    });
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
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
      animate={{ width: isCollapsed ? 76 : 270 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`h-full bg-slate-900 border-r border-slate-800 flex flex-col text-slate-100 select-none ${className}`}
    >
      {/* Top Header & User Profile */}
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div
          onClick={() => navigate('/profile')}
          className={`flex items-center gap-2.5 p-1.5 rounded-sm cursor-pointer hover:bg-slate-800/60 transition-colors flex-1 min-w-0 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="View Profile"
        >
          <div className="relative shrink-0">
            <Avatar className="h-8 w-8 border border-slate-700">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-slate-800 text-slate-300 font-bold text-xs">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-2.5 h-2.5 rounded-full border border-slate-900"></div>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 flex-1 overflow-hidden"
              >
                <p className="font-bold text-xs truncate text-white">
                  {firstName} {lastName}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {userEmail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Smooth Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-sm bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60 shrink-0"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Navigation Groups (Codolio Professional Layout) */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-none">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-0.5">
            {/* Section Header */}
            {!isCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {section.title}
              </div>
            )}

            {/* Section Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isAct = isActive(item.href);
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isGroupExpanded = expandedGroups.includes(item.label.toLowerCase());

                if (hasChildren) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleGroup(item.label.toLowerCase())}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-sm text-xs font-medium transition-all group ${
                          isGroupExpanded || isAct
                            ? 'bg-slate-800 text-white font-semibold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        } ${isCollapsed ? 'justify-center px-1' : ''}`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <div className="shrink-0 text-slate-400 group-hover:text-slate-200">
                          {item.icon}
                        </div>

                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left truncate">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider ${item.badge.className}`}>
                                {item.badge.text}
                              </span>
                            )}
                            <ChevronDown
                              className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${
                                isGroupExpanded ? 'rotate-180 text-slate-300' : ''
                              }`}
                            />
                          </>
                        )}
                      </button>

                      {/* Sub-items (Child links) */}
                      <AnimatePresence>
                        {!isCollapsed && isGroupExpanded && item.children && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 mt-0.5 space-y-0.5 border-l border-slate-800 pl-2"
                          >
                            {item.children.map((child) => {
                              const isChildAct = isActive(child.href);
                              const isExt = child.href.startsWith('http');
                              return (
                                <button
                                  key={child.label}
                                  onClick={() => {
                                    if (isExt) {
                                      window.open(child.href, '_blank', 'noopener,noreferrer');
                                    } else {
                                      navigate(child.href);
                                    }
                                  }}
                                  className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-sm text-[11px] transition-colors ${
                                    isChildAct
                                      ? 'text-emerald-400 bg-emerald-500/10 font-bold border-l-2 border-emerald-500'
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <div className="shrink-0 text-slate-400">{child.icon}</div>
                                    <span className="truncate">{child.label}</span>
                                  </div>
                                  {isExt && <ExternalLink className="h-3 w-3 text-slate-500 shrink-0" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.openInNewTab) {
                        window.open(item.href, '_blank', 'noopener,noreferrer');
                      } else {
                        navigate(item.href);
                      }
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-sm text-xs font-medium transition-all group ${
                      isAct
                        ? 'bg-slate-800 text-white font-semibold border-l-2 border-emerald-500 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    } ${isCollapsed ? 'justify-center px-1' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className={`shrink-0 ${isAct ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {item.icon}
                    </div>

                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-sm font-bold uppercase tracking-wider ${item.badge.className}`}>
                            {item.badge.text}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions: Sign Out (Theme toggle already at top navbar) */}
      <div className="p-2.5 border-t border-slate-800 space-y-1">
        <button
          onClick={handleSignOut}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-sm text-xs text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <div className="shrink-0 text-rose-400">
            <LogOut className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <span>Sign Out</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;

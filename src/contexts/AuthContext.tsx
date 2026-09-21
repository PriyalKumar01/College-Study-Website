import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, removeCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

import { isDisposableDomain, validateEmail, isDirectlyAllowedDomain } from '@/utils/emailValidation';

type UserRole = 'member' | 'admin' | 'owner';
type ApprovalStatus = 'approved' | 'pending' | 'rejected';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: UserRole;
  isAdmin: boolean;
  isOwner: boolean;
  isBanned: boolean;
  approvalStatus: ApprovalStatus;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
  refreshApprovalStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('member');
  const [isBanned, setIsBanned] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('csh_banned_user'));
  });
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(() => {
    try {
      const cached = localStorage.getItem('csh_approval_status');
      if (cached === 'approved' || cached === 'pending' || cached === 'rejected') {
        return cached as ApprovalStatus;
      }
    } catch {}
    return 'pending';
  });

  const checkAndRejectDisposable = async (email?: string, userObj?: User | null): Promise<boolean> => {
    if (!email) return false;

    // 1. Fast synchronous disposable domain check
    const domain = email.split('@')[1];
    if (domain && isDisposableDomain(domain)) {
      console.warn('Disposable email session detected and terminated (sync):', email);
      setTimeout(() => supabase.auth.signOut(), 0);
      setUser(null);
      setSession(null);
      setUserRole('member');
      setLoading(false);
      alert(`Security Notice: Accounts using temporary or disposable email providers (${domain}) are strictly prohibited on College Study Hub. You have been logged out.`);
      return true;
    }

    // If directly allowed (Gmail, Outlook, HBTU, .ac.in, .edu, etc.), allow immediately without any network delay
    if (isDirectlyAllowedDomain(domain)) {
      return false;
    }

    // 2. Asynchronous validation check for non-whitelisted domains
    try {
      const valResult = await validateEmail(email);
      if (!valResult.isValid || valResult.isDisposable) {
        console.warn('Disposable email session detected and terminated (async):', email);
        setTimeout(() => supabase.auth.signOut(), 0);
        setUser(null);
        setSession(null);
        setUserRole('member');
        setLoading(false);
        alert(`Security Notice: Accounts using temporary or disposable email providers (${domain}) are strictly prohibited on College Study Hub. You have been logged out.`);
        return true;
      }
    } catch (valErr) {
      console.warn('validateEmail check error in AuthContext:', valErr);
    }

    return false;
  };

  const fetchUserRole = async (email: string | undefined, force = false) => {
    if (!email) {
      setUserRole('member');
      return;
    }

    if (!force) {
      const cachedRole = getCachedData<UserRole>(`role_${email}`, DEFAULT_CACHE_TTL_MS);
      if (cachedRole) {
        setUserRole(cachedRole);
        return;
      }
    }

    try {
      const { data, error } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_email', email)
        .maybeSingle();

      if (error) {
        console.error('Error fetching role:', error);
        setUserRole('member');
        return;
      }

      let role: UserRole = 'member';
      const isSuper = data?.role === 'owner' || data?.role === 'super_admin' || email.toLowerCase() === 'priyalkumar06@gmail.com';
      if (isSuper) {
        role = 'owner';
      } else if (data?.role === 'admin') {
        role = 'admin';
      }
      setUserRole(role);
      setCachedData(`role_${email}`, role);
    } catch {
      if (email.toLowerCase() === 'priyalkumar06@gmail.com') {
        setUserRole('owner');
      } else {
        setUserRole('member');
      }
    }
  };

  const refreshRole = async () => {
    await fetchUserRole(user?.email ?? undefined, true);
  };

  const checkBanAndApproval = async (userObj: User | null): Promise<boolean> => {
    if (!userObj) {
      setIsBanned(false);
      setApprovalStatus('approved');
      return false;
    }

    try {
      // 1. Query public.profiles for banned_until and approval_status (Direct PostgREST query, no auth mutex lock)
      const { data: profile } = await supabase
        .from('profiles')
        .select('banned_until, approval_status')
        .or(`id.eq.${userObj.id},user_id.eq.${userObj.id}`)
        .maybeSingle();

      const bannedUntil = profile?.banned_until || (userObj as any)?.banned_until;
      if (bannedUntil) {
        const bannedTime = new Date(bannedUntil).getTime();
        if (bannedTime > Date.now()) {
          console.warn('User is currently banned until:', bannedUntil);
          setIsBanned(true);
          localStorage.setItem('csh_banned_user', userObj.email || 'banned');
          setTimeout(() => supabase.auth.signOut(), 0);
          setUser(null);
          setSession(null);
          setLoading(false);
          return true;
        }
      }

      // Not banned
      setIsBanned(false);
      localStorage.removeItem('csh_banned_user');

      // 2. Approval status check
      const email = userObj.email?.toLowerCase().trim() || '';
      const domain = email.split('@')[1] || '';
      const isOwnerOrAdmin = email === 'priyalkumar06@gmail.com' || userRole === 'owner' || userRole === 'admin';
      const isWhitelisted = isDirectlyAllowedDomain(domain);

      let determinedStatus: ApprovalStatus = 'pending';

      if (isOwnerOrAdmin || isWhitelisted) {
        determinedStatus = 'approved';
      } else if (profile?.approval_status) {
        determinedStatus = profile.approval_status as ApprovalStatus;
      } else {
        determinedStatus = 'pending';
      }

      setApprovalStatus(determinedStatus);
      try {
        localStorage.setItem('csh_approval_status', determinedStatus);
      } catch {}
    } catch (err) {
      console.warn('Error checking ban and approval status:', err);
    }
    return false;
  };

  const refreshApprovalStatus = async () => {
    if (!user) return;
    await checkBanAndApproval(user);
  };

  useEffect(() => {
    // 1. Set up auth state listener - strictly synchronous/non-blocking
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);

        if (newSession?.user?.email) {
          const activeUser = newSession.user;
          const email = activeUser.email.toLowerCase().trim();
          const domain = email.split('@')[1] || '';
          const isAllowed = email === 'priyalkumar06@gmail.com' || isDirectlyAllowedDomain(domain);
          if (isAllowed) {
            setApprovalStatus('approved');
            try { localStorage.setItem('csh_approval_status', 'approved'); } catch {}
          } else {
            setApprovalStatus('pending');
            try { localStorage.setItem('csh_approval_status', 'pending'); } catch {}
          }

          // Defer verification to next tick outside GoTrue auth dispatch lock
          setTimeout(async () => {
            const isBlocked = await checkAndRejectDisposable(activeUser.email, activeUser);
            if (isBlocked) return;

            const isUserBanned = await checkBanAndApproval(activeUser);
            if (isUserBanned) return;

            fetchUserRole(activeUser.email);
          }, 0);
        } else {
          setUserRole('member');
          setApprovalStatus('approved');
          try {
            localStorage.removeItem('csh_approval_status');
          } catch {}
        }
      }
    );

    // 2. Initial session retrieval
    const getInitialSession = async () => {
      try {
        if (localStorage.getItem('csh_banned_user')) {
          setIsBanned(true);
        }

        const { data: { session: initSession } } = await supabase.auth.getSession();
        setSession(initSession);
        setUser(initSession?.user ?? null);

        if (initSession?.user?.email) {
          const activeUser = initSession.user;
          const email = activeUser.email.toLowerCase().trim();
          const domain = email.split('@')[1] || '';
          const isAllowed = email === 'priyalkumar06@gmail.com' || isDirectlyAllowedDomain(domain);
          if (isAllowed) {
            setApprovalStatus('approved');
            try { localStorage.setItem('csh_approval_status', 'approved'); } catch {}
          } else {
            setApprovalStatus('pending');
            try { localStorage.setItem('csh_approval_status', 'pending'); } catch {}
          }

          const isBlocked = await checkAndRejectDisposable(activeUser.email, activeUser);
          if (!isBlocked) {
            const isUserBanned = await checkBanAndApproval(activeUser);
            if (!isUserBanned) {
              await fetchUserRole(activeUser.email);
            }
          }
        } else {
          setApprovalStatus('approved');
          try {
            localStorage.removeItem('csh_approval_status');
          } catch {}
        }
      } catch (err) {
        console.warn('Error retrieving initial session:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  // Real-time ban and approval listener for active session
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`profile-security-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`,
        },
        async (payload: any) => {
          const updated = payload.new;
          if (updated?.banned_until) {
            const bannedTime = new Date(updated.banned_until).getTime();
            if (bannedTime > Date.now()) {
              console.warn('Real-time ban event received for user:', user.email);
              setIsBanned(true);
              localStorage.setItem('csh_banned_user', user.email || 'banned');
              await supabase.auth.signOut();
              setUser(null);
              setSession(null);
              return;
            }
          } else {
            setIsBanned(false);
            localStorage.removeItem('csh_banned_user');
          }

          if (updated?.approval_status) {
            const newStatus = updated.approval_status as ApprovalStatus;
            setApprovalStatus(newStatus);
            try {
              localStorage.setItem('csh_approval_status', newStatus);
            } catch {}
          }
        }
      )
      .subscribe();

    // Heartbeat & focus checks (backup in case websocket dropped)
    const handleFocus = () => {
      checkBanAndApproval(user);
    };
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(() => {
      checkBanAndApproval(user);
    }, 20000);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [user?.id]);

  const signOut = async () => {
    setLoading(true);
    if (user?.email) {
      removeCachedData(`role_${user.email}`);
    }
    localStorage.removeItem('csh_banned_user');
    localStorage.removeItem('csh_approval_status');
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole('member');
    setIsBanned(false);
    setApprovalStatus('approved');
    setLoading(false);
  };

  const isOwner = userRole === 'owner' || user?.email?.toLowerCase() === 'priyalkumar06@gmail.com';
  const isAdmin = isOwner || userRole === 'admin';

  const value = {
    user,
    session,
    loading,
    userRole,
    isAdmin,
    isOwner,
    isBanned,
    approvalStatus,
    signOut,
    refreshRole,
    refreshApprovalStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, removeCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

import { isDisposableDomain, validateEmail, isDirectlyAllowedDomain } from '@/utils/emailValidation';
import { syncUserMetadataIfIncomplete, isValidAcademicField, isNumericOrRollNumber } from '@/utils/userMetadataHelper';

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
  isProfileComplete: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
  refreshApprovalStatus: () => Promise<void>;
  refreshProfileStatus: () => Promise<void>;
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

  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(() => {
    try {
      return localStorage.getItem('csh_profile_complete') === 'true';
    } catch {
      return false;
    }
  });

  const checkAndRejectDisposable = async (email?: string, userObj?: User | null): Promise<boolean> => {
    if (!email) return false;

    // For active sessions, only flag known disposable domains synchronously without aggressive external network API timeouts
    const domain = email.split('@')[1];
    if (domain && isDisposableDomain(domain)) {
      console.warn('Disposable email domain flagged:', email);
      return false;
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
        .neq('role', 'removed')
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

  const checkBanAndApproval = async (userObj: User | null, force = false): Promise<boolean> => {
    if (!userObj) {
      setIsBanned(false);
      setApprovalStatus('approved');
      return false;
    }

    const email = userObj.email?.toLowerCase().trim() || '';
    const domain = email.split('@')[1] || '';
    const isOwnerOrAdmin = email === 'priyalkumar06@gmail.com' || userRole === 'owner' || userRole === 'admin';
    const isWhitelisted = isDirectlyAllowedDomain(domain);

    // Whitelisted domains & owners are instantly approved without database roundtrips
    if (isOwnerOrAdmin || isWhitelisted) {
      setIsBanned(false);
      setApprovalStatus('approved');
      try { localStorage.setItem('csh_approval_status', 'approved'); } catch {}
      return false;
    }

    // Cache check: avoid hammering Supabase on every tab switch / interval
    const cacheKey = `sec_check_${userObj.id}`;
    if (!force) {
      const cached = getCachedData<{ banned: boolean; status: ApprovalStatus }>(cacheKey, 15 * 60 * 1000);
      if (cached) {
        setIsBanned(cached.banned);
        setApprovalStatus(cached.status);
        return cached.banned;
      }
    }

    try {
      // 1. Query public.profiles for banned_until and approval_status
      let query = supabase
        .from('profiles')
        .select('banned_until, approval_status');

      query = query.or(`id.eq.${userObj.id},user_id.eq.${userObj.id}`);

      const { data: profile } = await query.maybeSingle();

      const bannedUntil = profile?.banned_until || (userObj as any)?.banned_until;
      if (bannedUntil) {
        const bannedTime = new Date(bannedUntil).getTime();
        if (bannedTime > Date.now()) {
          console.warn('User is currently banned until:', bannedUntil);
          setIsBanned(true);
          localStorage.setItem('csh_banned_user', userObj.email || 'banned');
          setCachedData(cacheKey, { banned: true, status: 'pending' });
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
      const determinedStatus: ApprovalStatus = profile?.approval_status
        ? (profile.approval_status as ApprovalStatus)
        : 'pending';

      setApprovalStatus(determinedStatus);
      try {
        localStorage.setItem('csh_approval_status', determinedStatus);
      } catch {}

      setCachedData(cacheKey, { banned: false, status: determinedStatus });
    } catch (err) {
      console.warn('Error checking ban and approval status:', err);
    }
    return false;
  };

  const refreshApprovalStatus = async () => {
    if (!user) return;
    await checkBanAndApproval(user, true);
  };

  const checkProfileCompletion = async (userObj: User | null): Promise<boolean> => {
    if (!userObj) {
      setIsProfileComplete(false);
      try {
        localStorage.removeItem('csh_profile_complete');
      } catch {}
      return false;
    }

    // Fast path: if already marked complete locally, don't query Supabase
    try {
      if (
        localStorage.getItem('csh_profile_complete') === 'true' ||
        localStorage.getItem(`profile_completed_${userObj.id}`) === 'true'
      ) {
        setIsProfileComplete(true);
        return true;
      }
    } catch {}

    const meta = userObj.user_metadata || {};
    const metaFirstName = (meta.first_name || meta.name || '').trim();
    const hasCompleteMeta = Boolean(
      (meta.profile_completed === true || meta.college) &&
      metaFirstName &&
      metaFirstName.toLowerCase() !== 'user' &&
      !isNumericOrRollNumber(metaFirstName) &&
      isValidAcademicField(meta.college) &&
      isValidAcademicField(meta.branch) &&
      isValidAcademicField(meta.year)
    );

    if (hasCompleteMeta) {
      setIsProfileComplete(true);
      try {
        localStorage.setItem('csh_profile_complete', 'true');
        localStorage.setItem(`profile_completed_${userObj.id}`, 'true');
      } catch {}
      return true;
    }

    // Check DB profile table if metadata appears incomplete
    try {
      const { data } = await supabase
        .from('profiles')
        .select('first_name, last_name, college, branch, year')
        .eq('user_id', userObj.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const dbFirst = (data?.first_name || '').trim();
      if (
        data &&
        dbFirst &&
        dbFirst.toLowerCase() !== 'user' &&
        !isNumericOrRollNumber(dbFirst) &&
        isValidAcademicField(data.college) &&
        isValidAcademicField(data.branch) &&
        isValidAcademicField(data.year)
      ) {
        setIsProfileComplete(true);
        try {
          localStorage.setItem('csh_profile_complete', 'true');
          localStorage.setItem(`profile_completed_${userObj.id}`, 'true');
        } catch {}
        // Sync metadata quietly so user_metadata also reflects completion
        syncUserMetadataIfIncomplete(userObj, data);
        return true;
      }
    } catch (err) {
      console.warn('Error checking profile completion in AuthContext:', err);
    }

    setIsProfileComplete(false);
    try {
      localStorage.removeItem('csh_profile_complete');
      localStorage.removeItem(`profile_completed_${userObj.id}`);
    } catch {}
    return false;
  };

  const refreshProfileStatus = async () => {
    if (!user) return;
    await checkProfileCompletion(user);
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

          // Check profile completion immediately
          checkProfileCompletion(activeUser);

          // Defer verification to next tick outside GoTrue auth dispatch lock
          setTimeout(async () => {
            const isBlocked = await checkAndRejectDisposable(activeUser.email, activeUser);
            if (isBlocked) return;

            const isUserBanned = await checkBanAndApproval(activeUser);
            if (isUserBanned) return;

            fetchUserRole(activeUser.email);
            syncUserMetadataIfIncomplete(activeUser);
          }, 0);
        } else if (_event === 'SIGNED_OUT') {
          setUserRole('member');
          setApprovalStatus('approved');
          setIsProfileComplete(false);
          try {
            localStorage.removeItem('csh_approval_status');
            localStorage.removeItem('csh_profile_complete');
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

          checkProfileCompletion(activeUser);

          const isBlocked = await checkAndRejectDisposable(activeUser.email, activeUser);
          if (!isBlocked) {
            const isUserBanned = await checkBanAndApproval(activeUser);
            if (!isUserBanned) {
              await fetchUserRole(activeUser.email);
            }
          }
        } else {
          setApprovalStatus('approved');
          setIsProfileComplete(false);
          try {
            localStorage.removeItem('csh_approval_status');
            localStorage.removeItem('csh_profile_complete');
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

  // Listen for custom profile update events across the entire app
  useEffect(() => {
    const handleProfileUpdated = async () => {
      try {
        const { data: { user: freshUser } } = await supabase.auth.getUser();
        if (freshUser) {
          setUser(freshUser);
          await checkProfileCompletion(freshUser);
        } else if (user) {
          await checkProfileCompletion(user);
        }
      } catch (err) {
        if (user) {
          await checkProfileCompletion(user);
        }
      }
    };
    window.addEventListener('studyhub_profile_updated', handleProfileUpdated);
    return () => {
      window.removeEventListener('studyhub_profile_updated', handleProfileUpdated);
    };
  }, [user]);

  // Zero-Egress lightweight security listener (Eliminates WebSocket connection & WAL replication egress)
  useEffect(() => {
    if (!user?.id) return;

    // Check ban and approval on mount with long cache TTL (2 hours) to prevent egress & log spikes
    checkBanAndApproval(user);

    // Refresh profile completion quietly only once per session mount if not yet complete
    try {
      if (localStorage.getItem('csh_profile_complete') !== 'true') {
        checkProfileCompletion(user);
      }
    } catch {}

    // Only verify on focus if user has been away for more than 4 hours
    let lastFocusCheck = Date.now();
    const handleFocus = () => {
      if (Date.now() - lastFocusCheck > 4 * 60 * 60 * 1000) {
        lastFocusCheck = Date.now();
        checkBanAndApproval(user);
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [user?.id]);

  const signOut = async () => {
    setLoading(true);
    if (user?.email) {
      removeCachedData(`role_${user.email}`);
    }
    localStorage.removeItem('csh_banned_user');
    localStorage.removeItem('csh_approval_status');
    localStorage.removeItem('csh_profile_complete');
    if (user?.id) {
      localStorage.removeItem(`profile_completed_${user.id}`);
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole('member');
    setIsBanned(false);
    setApprovalStatus('approved');
    setIsProfileComplete(false);
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
    isProfileComplete,
    signOut,
    refreshRole,
    refreshApprovalStatus,
    refreshProfileStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// Reviewed: academic catalog & interface consistency check (v2.0.113)

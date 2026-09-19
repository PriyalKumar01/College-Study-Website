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
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('approved');

  const checkAndRejectDisposable = async (email?: string, userObj?: User | null): Promise<boolean> => {
    if (!email) return false;

    // 1. Strictly enforce email confirmation for email provider accounts
    const provider = userObj?.app_metadata?.provider;
    const isEmailAccount = provider === 'email' || (userObj?.app_metadata?.providers || []).includes('email');
    if (isEmailAccount && userObj) {
      const isConfirmed = Boolean(userObj.email_confirmed_at || userObj.confirmed_at || userObj.user_metadata?.email_verified === true);
      if (!isConfirmed) {
        console.warn('Unverified email session detected and terminated:', email);
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setUserRole('member');
        setLoading(false);
        alert('Security Notice: Your email address has not been verified. Please verify your email using the verification OTP sent to your inbox before accessing College Study Hub.');
        return true;
      }
    }

    const domain = email.split('@')[1];

    // 2. Fast synchronous disposable domain check
    if (domain && isDisposableDomain(domain)) {
      console.warn('Disposable email session detected and terminated (sync):', email);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRole('member');
      setLoading(false);
      alert(`Security Notice: Accounts using temporary or disposable email providers (${domain}) are strictly prohibited on College Study Hub. You have been logged out. Please sign up or log in using a valid personal or university email address.`);
      return true;
    }

    // 3. Comprehensive asynchronous validation check (Mailcheck.ai / CDN / Debounce)
    try {
      const valResult = await validateEmail(email);
      if (!valResult.isValid || valResult.isDisposable) {
        console.warn('Disposable email session detected and terminated (async):', email);
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setUserRole('member');
        setLoading(false);
        alert(`Security Notice: Accounts using temporary or disposable email providers (${domain}) are strictly prohibited on College Study Hub. You have been logged out. Please sign up or log in using a valid personal or university email address.`);
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
      if (data?.role === 'owner') {
        role = 'owner';
      } else if (data?.role === 'admin') {
        role = 'admin';
      }
      setUserRole(role);
      setCachedData(`role_${email}`, role);
    } catch {
      setUserRole('member');
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
      // 1. Verify with Supabase Auth server whether user token is banned/revoked
      const { data: serverUserData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        const msg = userError.message?.toLowerCase() || '';
        if (msg.includes('banned') || userError.status === 403) {
          console.warn('User is marked as banned by Supabase Auth server.');
          setIsBanned(true);
          localStorage.setItem('csh_banned_user', userObj.email || 'banned');
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          return true;
        }
      }

      // 2. Query public.profiles for banned_until and approval_status
      const { data: profile } = await supabase
        .from('profiles')
        .select('banned_until, approval_status')
        .eq('user_id', userObj.id)
        .maybeSingle();

      if (profile?.banned_until) {
        const bannedTime = new Date(profile.banned_until).getTime();
        if (bannedTime > Date.now()) {
          console.warn('User is currently banned until:', profile.banned_until);
          setIsBanned(true);
          localStorage.setItem('csh_banned_user', userObj.email || 'banned');
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          return true;
        }
      }

      // Not banned
      setIsBanned(false);
      localStorage.removeItem('csh_banned_user');

      // 3. Approval status check
      const domain = userObj.email?.split('@')[1] || '';
      if (isDirectlyAllowedDomain(domain)) {
        setApprovalStatus('approved');
      } else if (profile?.approval_status) {
        setApprovalStatus(profile.approval_status as ApprovalStatus);
      } else {
        setApprovalStatus('pending');
      }
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user?.email) {
          const isBlocked = await checkAndRejectDisposable(session.user.email, session.user);
          if (isBlocked) return;

          const isUserBanned = await checkBanAndApproval(session.user);
          if (isUserBanned) return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user?.email) {
          // Use setTimeout to avoid Supabase deadlock during auth callback
          setTimeout(() => fetchUserRole(session.user.email), 0);
        } else {
          setUserRole('member');
        }
        setLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      // Check if user was previously marked banned in localStorage
      if (localStorage.getItem('csh_banned_user')) {
        setIsBanned(true);
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const isBlocked = await checkAndRejectDisposable(session.user.email, session.user);
        if (isBlocked) return;

        const isUserBanned = await checkBanAndApproval(session.user);
        if (isUserBanned) return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        await fetchUserRole(session.user.email);
      }
      setLoading(false);
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
            setApprovalStatus(updated.approval_status as ApprovalStatus);
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
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole('member');
    setIsBanned(false);
    setApprovalStatus('approved');
    setLoading(false);
  };

  const isAdmin = userRole === 'admin' || userRole === 'owner';
  const isOwner = userRole === 'owner';

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
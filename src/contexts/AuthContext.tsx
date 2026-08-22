import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, removeCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

type UserRole = 'member' | 'admin' | 'owner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: UserRole;
  isAdmin: boolean;
  isOwner: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
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

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
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
      const { data: { session } } = await supabase.auth.getSession();
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

  const signOut = async () => {
    setLoading(true);
    if (user?.email) {
      removeCachedData(`role_${user.email}`);
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole('member');
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
    signOut,
    refreshRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
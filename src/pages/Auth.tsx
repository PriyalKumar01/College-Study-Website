import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const navigate = useNavigate();
  const { user, session, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check for errors in URL (hash or query)
    const params = new URLSearchParams(window.location.hash.substring(1)); // Remove #
    const errorDescription = params.get('error_description');
    const errorCode = params.get('error_code');

    if (errorDescription) {
      setErrorMsg(decodeURIComponent(errorDescription).replace(/\+/g, ' '));
      return;
    }

    // Also check query params just in case
    const queryParams = new URLSearchParams(window.location.search);
    const queryError = queryParams.get('error_description');
    if (queryError) {
      setErrorMsg(decodeURIComponent(queryError).replace(/\+/g, ' '));
      return;
    }

    // Collect debug info
    if (user) {
      setDebugInfo({
        email: user.email,
        email_confirmed_at: user.email_confirmed_at,
        provider: user.app_metadata?.provider,
        providers: user.app_metadata?.providers,
        metadata: user.user_metadata,
        session_expires_at: session?.expires_at,
      });
    }
  }, [user, session]);

  // Auto-redirect if logged in
  useEffect(() => {
    if (!loading && user) {
      // Small delay to allow session to settle
      const timer = setTimeout(() => navigate('/dashboard'), 500);
      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-lg border border-border">

        {errorMsg ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-md mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">Authentication Issue</h3>
                  <div className="mt-2 text-sm text-amber-700 dark:text-amber-300/90">
                    <p>{errorMsg}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate('/')} className="w-full">
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative bg-background rounded-full p-4 border-2 border-primary/20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
            <h1 className="text-xl font-bold mb-2">Verifying Credentials</h1>
            <p className="text-muted-foreground text-sm">Please wait while we secure your connection...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Auth;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  deadline: string | null;
  description: string;
  apply_url: string;
  duration?: string | null;
}

export default function OpportunityDeepLink() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch opportunity by ID
  useEffect(() => {
    const fetch = async () => {
      setLoadingData(true);
      try {
        const { data, error } = await (supabase as any)
          .from('opportunities')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          setOpp(data as Opportunity);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoadingData(false);
      }
    };
    if (id) fetch();
  }, [id]);

  // If user is logged in, redirect to opportunities with highlight param
  useEffect(() => {
    if (!authLoading && user && opp) {
      navigate(`/opportunities?highlight=${opp.id}`, { replace: true });
    }
  }, [authLoading, user, opp, navigate]);

  const handleSignIn = () => {
    // store the current path so auth can redirect back
    try {
      sessionStorage.setItem('postLoginRedirect', `/opportunity/${id}`);
    } catch {}
    navigate('/', { state: { openAuth: true, redirectAfter: `/opportunity/${id}` } });
  };

  const isLoading = authLoading || loadingData;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading opportunity…</p>
          </div>
        ) : notFound ? (
          <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-3">🔍</div>
            <h1 className="text-xl font-bold text-foreground mb-2">Opportunity Not Found</h1>
            <p className="text-sm text-muted-foreground mb-6">
              This opportunity may have been removed or the link is incorrect.
            </p>
            <Button onClick={() => navigate('/opportunities')}>
              Browse All Opportunities
            </Button>
          </div>
        ) : opp && !user ? (
          /* ── AUTH GATE ── */
          <div className="max-w-lg w-full">
            {/* Opportunity preview card */}
            <div className="bg-card border border-border border-l-4 border-l-primary rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                  {opp.type || 'Opportunity'}
                </span>
              </div>
              <h1 className="text-xl font-bold text-foreground mb-1 leading-tight">{opp.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">{opp.company}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Location</div>
                  <div className="text-sm font-bold text-foreground">{opp.location}</div>
                </div>
                {opp.deadline && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Deadline</div>
                    <div className="text-sm font-bold text-foreground">
                      {new Date(opp.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 whitespace-pre-wrap">{opp.description}</p>
            </div>

            {/* Auth prompt */}
            <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl mb-3">🔐</div>
              <h2 className="text-lg font-bold text-foreground mb-2">Sign in to View Full Details</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Create a free account or sign in to access eligibility criteria, apply links, and all details.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleSignIn} className="gap-2">
                  Sign In / Register <ArrowRight size={14} />
                </Button>
                <Button variant="outline" onClick={() => navigate('/opportunities')}>
                  Browse All Opportunities
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

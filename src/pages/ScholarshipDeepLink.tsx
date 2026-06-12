import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { GraduationCap, Loader2, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

// Build slug from name
const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface Scholarship {
  id: string;
  name: string;
  org: string;
  amount: string;
  amount_num: number;
  status: string;
  description: string;
  income: string;
  marks: string;
  deadline: string;
  apply_url: string;
}

export default function ScholarshipDeepLink() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch scholarship by slug match
  useEffect(() => {
    const fetch = async () => {
      setLoadingData(true);
      const { data, error } = await (supabase as any)
        .from('scholarships')
        .select('*')
        .eq('approval_status', 'approved');

      if (!error && data) {
        const match = (data as Scholarship[]).find(
          (s) => toSlug(s.name) === slug
        );
        if (match) setScholarship(match);
        else setNotFound(true);
      } else {
        setNotFound(true);
      }
      setLoadingData(false);
    };
    if (slug) fetch();
  }, [slug]);

  // If user is logged in, redirect to portal with highlight param
  useEffect(() => {
    if (!authLoading && user && scholarship) {
      navigate(`/scholarship-portal?highlight=${scholarship.id}`, { replace: true });
    }
  }, [authLoading, user, scholarship, navigate]);

  const handleSignIn = () => {
    // store the current path so auth can redirect back
    try {
      sessionStorage.setItem('postLoginRedirect', `/scholarship/${slug}`);
    } catch {}
    navigate('/', { state: { openAuth: true, redirectAfter: `/scholarship/${slug}` } });
  };

  const isLoading = authLoading || loadingData;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading scholarship…</p>
          </div>
        ) : notFound ? (
          <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h1 className="text-xl font-bold text-foreground mb-2">Scholarship Not Found</h1>
            <p className="text-sm text-muted-foreground mb-6">
              This scholarship may have been removed or the link is incorrect.
            </p>
            <Button onClick={() => navigate('/scholarship-portal')}>
              Browse All Scholarships
            </Button>
          </div>
        ) : scholarship && !user ? (
          /* ── AUTH GATE ── */
          <div className="max-w-lg w-full">
            {/* Scholarship preview card */}
            <div className="bg-card border border-border border-l-4 border-l-primary rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                  Scholarship
                </span>
              </div>
              <h1 className="text-xl font-bold text-foreground mb-1 leading-tight">{scholarship.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">{scholarship.org}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Amount</div>
                  <div className="text-sm font-bold text-foreground">{scholarship.amount}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Deadline</div>
                  <div className="text-sm font-bold text-foreground">{scholarship.deadline}</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{scholarship.description}</p>
            </div>

            {/* Auth prompt */}
            <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl mb-3">🔐</div>
              <h2 className="text-lg font-bold text-foreground mb-2">Sign in to View Full Details</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Create a free account or sign in to access eligibility criteria, apply links, and all scholarship details.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleSignIn} className="gap-2">
                  Sign In / Register <ArrowRight size={14} />
                </Button>
                <Button variant="outline" onClick={() => navigate('/scholarship-portal')}>
                  Browse All Scholarships
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins, Shield, Award, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from "@/lib/cacheUtils";
import { getContributorBadge } from "@/lib/contributorBadgeUtils";
import { MilestoneCelebrationModal } from "@/components/MilestoneCelebrationModal";

// ── Interfaces ──────────────────────────────────────────────────────────────
interface Contributor {
  id: string;
  name: string;
  branch: string;
  batch: string;
  coins: number;
  linkedin_url?: string | null;
  image_url?: string | null;
}

interface AdminRecord {
  id: string;
  user_name: string | null;
  user_email: string;
  role: string;
  from_date: string | null;
  to_date: string | null;
  avatar_url?: string | null;
  branch?: string | null;
  college?: string | null;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const SIDEBAR_PURPLE = "#1e1b4b";

// ── Admin Card (Matching Rank 4+ Contributor Layout) ──────────────────────────
function AdminCard({ admin, index }: { admin: AdminRecord; index: number }) {
  const isOwner = admin.role === "owner" || admin.role === "super_admin";
  const isActive = !admin.to_date;
  const displayName = admin.user_name || (admin.user_email === "priyalkumar06@gmail.com" ? "Priyal Kumar" : admin.user_email.split("@")[0]);

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      <Card className="border border-border/70 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-card hover:scale-[1.01] hover:border-sky-300/80 hover:bg-sky-50/40 dark:hover:border-sky-800/80 dark:hover:bg-sky-950/20 border-l-4 border-l-transparent hover:border-l-sky-500 hover:shadow-sky-500/5">
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-lg shadow-sm flex-shrink-0 ${
              isOwner
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            }`}>
              {isOwner ? "👑" : index + 1}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100">
                  {displayName}
                </h3>

                {/* Role badge */}
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  isOwner
                    ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300"
                    : "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300"
                }`}>
                  {isOwner ? "👑 Owner" : "⚔️ Admin"}
                </span>

                {/* Active / Former */}
                {isActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400">
                    Former
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                  🎓 {admin.college || 'HBTU Kanpur'}{admin.branch ? ` • ${admin.branch}` : ''}
                </Badge>
              </div>
            </div>
          </div>

          {/* Tenure right side */}
          <div className="text-right min-w-fit pl-4">
            <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
              {fmt(admin.from_date) || "Start"} → {admin.to_date ? fmt(admin.to_date) : <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Present</span>}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium mt-0.5">Tenure</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ── Default fallback admins (ensures admin team always shows) ───────────────
const DEFAULT_ADMINS: AdminRecord[] = [
  {
    id: "admin-priyal",
    user_name: "Priyal Kumar",
    user_email: "priyalkumar06@gmail.com",
    role: "owner",
    from_date: "2024-01-01",
    to_date: null,
  }
];

// ── Main Page ─────────────────────────────────────────────────────────────────
const NotesContributors = ({ defaultTab }: { defaultTab?: "contributors" | "admins" } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const requestedTab = defaultTab || (searchParams.get("tab") === "admins" || location.pathname === "/admins" || location.pathname === "/team" ? "admins" : "contributors");
  const [tab, setTab] = useState<"contributors" | "admins">(requestedTab);

  const [admins, setAdmins] = useState<AdminRecord[]>(() => {
    const cached = getCachedData<AdminRecord[]>('contributors_admins', DEFAULT_CACHE_TTL_MS);
    return cached && cached.length > 0 ? cached : DEFAULT_ADMINS;
  });
  const [contributors, setContributors] = useState<Contributor[]>(() => {
    return getCachedData<Contributor[]>('contributors_list', DEFAULT_CACHE_TTL_MS) || [];
  });
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [loadingContributors, setLoadingContributors] = useState(() => {
    return !getCachedData<Contributor[]>('contributors_list', DEFAULT_CACHE_TTL_MS);
  });
  const [celebrationData, setCelebrationData] = useState<{ name: string; coins: number; tierName: string } | null>(null);

  const sortedAdmins = useMemo(() => {
    return [...admins].sort((a, b) => {
      const isOwnerA = a.role === "owner" || a.role === "super_admin" || a.user_email === "priyalkumar06@gmail.com";
      const isOwnerB = b.role === "owner" || b.role === "super_admin" || b.user_email === "priyalkumar06@gmail.com";
      if (isOwnerA && !isOwnerB) return -1;
      if (!isOwnerA && isOwnerB) return 1;

      const nameA = (a.user_name || a.user_email.split('@')[0]).trim().toLowerCase();
      const nameB = (b.user_name || b.user_email.split('@')[0]).trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [admins]);

  const handleTabChange = (newTab: "contributors" | "admins") => {
    setTab(newTab);
    const newUrl = newTab === "admins" ? "/notes-contributors?tab=admins" : "/notes-contributors";
    window.history.replaceState(null, "", newUrl);
  };

  // Sync tab if URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "admins" || location.pathname === "/admins" || location.pathname === "/team") {
      setTab("admins");
    } else if (params.get("tab") === "contributors") {
      setTab("contributors");
    }
  }, [location.search, location.pathname]);

  // Helper to fetch and enrich all admins from admin_roles + profiles
  const fetchAdminsList = async () => {
    try {
      const { data: adminData, error } = await (supabase as any)
        .from("admin_roles")
        .select("id, user_name, user_email, role, from_date, to_date, created_at")
        .neq("role", "removed")
        .order("created_at", { ascending: true });

      if (!error && adminData && adminData.length > 0) {
        const emails = adminData.map((a: any) => a.user_email?.toLowerCase()).filter(Boolean);
        const { data: profs } = await supabase
          .from("profiles")
          .select("email, first_name, last_name, branch, college, avatar_url")
          .in("email", emails);

        const profMap = new Map((profs || []).map((p: any) => [p.email?.toLowerCase(), p]));

        const enriched = adminData.map((a: any) => {
          const prof = profMap.get(a.user_email?.toLowerCase());
          const fullName = [prof?.first_name, prof?.last_name].filter(Boolean).join(' ');
          return {
            ...a,
            user_name: a.user_name || (fullName ? fullName : (a.user_email === "priyalkumar06@gmail.com" ? "Priyal Kumar" : a.user_email?.split('@')[0])),
            avatar_url: prof?.avatar_url || null,
            branch: prof?.branch || null,
            college: prof?.college || 'HBTU Kanpur',
          };
        });

        setAdmins(enriched);
        setCachedData('contributors_admins', enriched);
      } else if (!adminData || adminData.length === 0) {
        setAdmins(prev => (prev && prev.length > 0 ? prev : DEFAULT_ADMINS));
      }
    } catch (e) {
      console.warn("Error fetching admin team:", e);
      setAdmins(prev => (prev && prev.length > 0 ? prev : DEFAULT_ADMINS));
    } finally {
      setLoadingAdmins(false);
    }
  };

  // Helper to fetch all contributors
  const fetchContributorsList = async () => {
    try {
      const { data } = await (supabase as any)
        .from("contributors")
        .select("id, name, branch, batch, coins, linkedin_url, image_url")
        .order("coins", { ascending: false });
      if (data) {
        setContributors(data as Contributor[]);
        setCachedData('contributors_list', data);
      }
    } catch (e) {
      console.warn("Error fetching contributors:", e);
    } finally {
      setLoadingContributors(false);
    }
  };

  // Fetch both contributors and admins on mount (Stale-While-Revalidate pattern)
  useEffect(() => {
    // 1. Contributors: render cache immediately if available, then fetch fresh in background
    const cachedContribs = getCachedData<Contributor[]>('contributors_list', DEFAULT_CACHE_TTL_MS);
    if (cachedContribs && cachedContribs.length > 0) {
      setContributors(cachedContribs);
      setLoadingContributors(false);
    } else {
      setLoadingContributors(true);
    }
    fetchContributorsList();

    // 2. Admins: render cache immediately if available, then fetch fresh in background
    const cachedAdmins = getCachedData<AdminRecord[]>('contributors_admins', DEFAULT_CACHE_TTL_MS);
    if (cachedAdmins && cachedAdmins.length > 0) {
      setAdmins(cachedAdmins);
      setLoadingAdmins(false);
    } else {
      setLoadingAdmins(true);
    }
    fetchAdminsList();
  }, []);

  // Listen to updates from OwnerDashboard or uploads
  useEffect(() => {
    const handleUpdate = () => {
      fetchContributorsList();
      fetchAdminsList();
    };

    window.addEventListener('studyhub_contributors_updated', handleUpdate);
    return () => window.removeEventListener('studyhub_contributors_updated', handleUpdate);
  }, []);

  // S-wave SVG path coordinates (viewBox 0 0 400 54)
  const S_LEFT  = "M 0 0 L 200 0 C 252 0 252 27 200 27 C 148 27 148 54 200 54 L 0 54 Z";
  const S_RIGHT = "M 200 0 C 252 0 252 27 200 27 C 148 27 148 54 200 54 L 400 54 L 400 0 Z";
  const S_LINE  = "M 200 0 C 252 0 252 27 200 27 C 148 27 148 54 200 54";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300/15 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-indigo-400/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10 pb-24">

        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-slate-200 dark:hover:bg-slate-800 text-foreground gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* ══════════ S-WAVE TAB SWITCHER ══════════ */}
        <div className="flex justify-center mb-10">
          <div style={{
            position: "relative",
            width: 400,
            maxWidth: "calc(100vw - 40px)",
            height: 54,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 4px 28px rgba(30,27,75,0.2)",
            border: "2px solid rgba(30,27,75,0.14)",
          }}>
            {/* SVG paints the two colour panels + S-curve divider */}
            <svg
              viewBox="0 0 400 54"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            >
              <path d={S_LEFT}  fill={tab === "contributors" ? SIDEBAR_PURPLE : "#ffffff"} style={{ transition: "fill 0.35s ease" }} />
              <path d={S_RIGHT} fill={tab === "admins"       ? SIDEBAR_PURPLE : "#ffffff"} style={{ transition: "fill 0.35s ease" }} />
              <path d={S_LINE}  fill="none" stroke="rgba(30,27,75,0.18)" strokeWidth="1.5" />
            </svg>

            {/* Transparent click buttons on top */}
            <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 10 }}>
              <button
                id="tab-contributors"
                onClick={() => handleTabChange("contributors")}
                style={{
                  flex: 1, background: "transparent", border: "none", cursor: "pointer",
                  color: tab === "contributors" ? "#ffffff" : SIDEBAR_PURPLE,
                  fontWeight: 700, fontSize: 14, letterSpacing: 0.3, fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  paddingRight: "8%",
                  transition: "color 0.35s ease",
                }}
              >
                🥇 Contributors {contributors.length > 0 ? `(${contributors.length})` : ''}
              </button>
              <button
                id="tab-admins"
                onClick={() => handleTabChange("admins")}
                style={{
                  flex: 1, background: "transparent", border: "none", cursor: "pointer",
                  color: tab === "admins" ? "#ffffff" : SIDEBAR_PURPLE,
                  fontWeight: 700, fontSize: 14, letterSpacing: 0.3, fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  paddingLeft: "8%",
                  transition: "color 0.35s ease",
                }}
              >
                ⚔️ Admins {admins.length > 0 ? `(${admins.length})` : ''}
              </button>
            </div>
          </div>
        </div>

        {/* ══════════ TAB CONTENT ══════════ */}
        <AnimatePresence mode="wait">

          {/* ── CONTRIBUTORS TAB ── */}
          {tab === "contributors" && (
            <motion.div
              key="contributors"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-800 dark:text-slate-100 tracking-tight">
                  Top Contributors{" "}
                  <span className="inline-block animate-bounce text-4xl">🥇</span>
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Recognizing the students who selflessly contributed their valuable notes to help the community.
                </p>
              </div>

              {loadingContributors ? (
                <div className="flex justify-center py-20">
                  <div className="w-9 h-9 rounded-full border-[3px] border-yellow-400 border-t-transparent animate-spin" />
                </div>
              ) : (
                <>
                  {/* ── Podium (Top 3) ── */}
                  {contributors.length >= 1 && (
                    <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-12 px-4 mt-8 md:mt-24">

                      {/* Rank 2 */}
                      {contributors[1] && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                          className="order-2 md:order-1 w-full md:w-1/3 max-w-[280px]">
                          <Card className="border-0 shadow-lg bg-gradient-to-b from-gray-100 to-gray-300 dark:from-slate-800 dark:to-slate-900 border-t-4 border-gray-400 hover:scale-105 transition-all duration-300 hover:shadow-sky-500/15">
                            <div className="p-4 flex flex-col items-center text-center">
                              <div className="relative mb-3">
                                <div className="w-24 h-24 rounded-full border-4 border-gray-400 bg-white dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-gray-500 shadow-md overflow-hidden">
                                  {contributors[1].image_url
                                    ? <img src={contributors[1].image_url} alt={contributors[1].name} className="w-full h-full object-cover" />
                                    : "2"}
                                </div>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">🥈</div>
                              </div>
                              <a href={contributors[1].linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 hover:text-primary transition-colors">{contributors[1].name}</h3>
                              </a>

                              {/* Dominator #2 Badge */}
                              <button
                                type="button"
                                onClick={() => setCelebrationData({ name: contributors[1].name, coins: contributors[1].coins, tierName: 'Dominator #2' })}
                                className="mt-1 mb-1 bg-gradient-to-r from-slate-400 to-zinc-500 text-white font-extrabold border border-slate-300 text-xs px-3 py-0.5 rounded-full shadow-xs hover:scale-105 transition-transform cursor-pointer"
                                title="Click to view League Achievement"
                              >
                                🥈 Dominator #2
                              </button>

                              <Badge variant="secondary" className="mt-1 mb-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                                {contributors[1].branch} '{contributors[1].batch} • HBTU
                              </Badge>
                              <div className="flex items-center text-yellow-600 dark:text-yellow-500 font-bold">
                                <Coins className="h-4 w-4 mr-1" />{contributors[1].coins}
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )}

                      {/* Rank 1 */}
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="order-1 md:order-2 w-full md:w-1/3 max-w-[320px] -mt-8 md:-mt-12 z-20">
                        <Card className="border-0 shadow-xl bg-gradient-to-b from-yellow-50 to-yellow-200 dark:from-amber-900/40 dark:to-amber-900/10 border-t-8 border-yellow-500 hover:scale-110 transition-all duration-300 hover:shadow-sky-500/15">
                          <div className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
                            <div className="relative mb-5">
                              <div className="w-32 h-32 rounded-full border-4 border-yellow-500 bg-white dark:bg-slate-800 flex items-center justify-center text-4xl font-bold text-yellow-600 shadow-lg overflow-hidden">
                                {contributors[0].image_url
                                  ? <img src={contributors[0].image_url} alt={contributors[0].name} className="w-full h-full object-cover" />
                                  : "1"}
                              </div>
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl">👑</div>
                            </div>
                            <a href={contributors[0].linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
                              <h3 className="font-bold text-2xl text-slate-900 dark:text-slate-50 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors">{contributors[0].name}</h3>
                            </a>

                            {/* Dominator #1 Badge */}
                            <button
                              type="button"
                              onClick={() => setCelebrationData({ name: contributors[0].name, coins: contributors[0].coins, tierName: 'Dominator #1' })}
                              className="mt-2 mb-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold border border-yellow-300 text-xs px-3.5 py-0.5 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer"
                              title="Click to view League Achievement"
                            >
                              👑 Dominator #1
                            </button>

                            <Badge className="mt-1 mb-3 bg-yellow-100 text-yellow-800 border-yellow-200 text-sm px-3">
                              {contributors[0].branch} '{contributors[0].batch} • HBTU
                            </Badge>
                            <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-extrabold text-xl">
                              <Coins className="h-6 w-6 mr-1" />{contributors[0].coins}
                            </div>
                            <p className="text-xs text-yellow-600/60 dark:text-yellow-400/60 font-medium uppercase tracking-wider mt-1">Top Contributor</p>
                          </div>
                        </Card>
                      </motion.div>

                      {/* Rank 3 */}
                      {contributors[2] && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                          className="order-3 w-full md:w-1/3 max-w-[280px]">
                          <Card className="border-0 shadow-lg bg-gradient-to-b from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 border-t-4 border-orange-500 hover:scale-105 transition-all duration-300 hover:shadow-sky-500/15">
                            <div className="p-4 flex flex-col items-center text-center">
                              <div className="relative mb-3">
                                <div className="w-24 h-24 rounded-full border-4 border-orange-500 bg-white dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-orange-600 shadow-md overflow-hidden">
                                  {contributors[2].image_url
                                    ? <img src={contributors[2].image_url} alt={contributors[2].name} className="w-full h-full object-cover" />
                                    : "3"}
                                </div>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">🥉</div>
                              </div>
                              <a href={contributors[2].linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 hover:text-primary transition-colors">{contributors[2].name}</h3>
                              </a>

                              {/* Dominator #3 Badge */}
                              <button
                                type="button"
                                onClick={() => setCelebrationData({ name: contributors[2].name, coins: contributors[2].coins, tierName: 'Dominator #3' })}
                                className="mt-1 mb-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-extrabold border border-orange-300 text-xs px-3 py-0.5 rounded-full shadow-xs hover:scale-105 transition-transform cursor-pointer"
                                title="Click to view League Achievement"
                              >
                                🥉 Dominator #3
                              </button>

                              <Badge variant="secondary" className="mt-1 mb-2 bg-orange-100 dark:bg-slate-700 text-orange-800 dark:text-orange-200">
                                {contributors[2].branch} '{contributors[2].batch} • HBTU
                              </Badge>
                              <div className="flex items-center text-yellow-600 dark:text-yellow-500 font-bold">
                                <Coins className="h-4 w-4 mr-1" />{contributors[2].coins}
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* ── Remaining list (rank 4+) with Tier Badges ── */}
                  <div className="max-w-4xl mx-auto space-y-3">
                    {contributors.slice(3).map((c, idx) => {
                      const rank = idx + 4;
                      const badge = getContributorBadge(rank, c.coins);

                      return (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
                        >
                          <Card className="border border-border/70 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-card hover:scale-[1.01] hover:border-sky-300/80 hover:bg-sky-50/40 dark:hover:border-sky-800/80 dark:hover:bg-sky-950/20 border-l-4 border-l-transparent hover:border-l-sky-500 hover:shadow-sky-500/5">
                            <div className="p-4 sm:p-5 flex items-center justify-between">
                              <div className="flex items-center gap-4 md:gap-6">
                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-lg shadow-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex-shrink-0">
                                  {rank}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <a href={c.linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
                                      <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 hover:text-primary transition-colors">{c.name}</h3>
                                    </a>

                                    {/* Tier Badge */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCelebrationData({ name: c.name, coins: c.coins, tierName: badge.badgeLabel });
                                      }}
                                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs hover:scale-105 transition-transform cursor-pointer ${badge.badgeClass}`}
                                      title="Click to view League Milestone"
                                    >
                                      <span>{badge.icon}</span> {badge.badgeLabel}
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                      {c.branch} '{c.batch} • HBTU
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right min-w-fit pl-4">
                                <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-bold text-lg md:text-xl justify-end">
                                  <Coins className="h-5 w-5 fill-yellow-500 text-yellow-600" />
                                  {c.coins.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium mt-0.5">Notes</p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* ── CTA ── */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12 text-center">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 p-6 sm:p-8 text-center space-y-3 max-w-2xl mx-auto shadow-xl">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-white text-xl">Have Class Notes or Slides for 1st Year?</h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                        CollegeStudy Hub is maintained by students, for students. If you take neat notes from your professors or have tutorial solutions, message Priyal Sir (CSE'27 HBTU) on WhatsApp to get contributor credentials!
                      </p>
                      <div className="pt-2">
                        <Button
                          onClick={() => window.open(
                            "https://wa.me/918957221543?text=" + encodeURIComponent("Hello Priyal Sir (CSE'27 HBTU), I want to share my notes to help other students on CollegeStudy Hub."),
                            "_blank"
                          )}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 gap-2"
                        >
                          Start Contributing on WhatsApp
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          {/* ── ADMINS TAB ── */}
          {tab === "admins" && (
            <motion.div
              key="admins"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-800 dark:text-slate-100 tracking-tight">
                  Admin Team <span className="text-3xl">⚔️</span>
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                  The dedicated team that manages and moderates CollegeStudy Hub.
                </p>
              </div>

              {/* Clean layout matching rank 4+ contributor cards */}
              <div className="max-w-4xl mx-auto space-y-3">
                {loadingAdmins ? (
                  <div className="flex justify-center py-14">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                  </div>
                ) : admins.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No admin records found.</div>
                ) : (
                  sortedAdmins.map((admin, i) => <AdminCard key={admin.id} admin={admin} index={i} />)
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 50+ Milestone Celebration Modal */}
      {celebrationData && (
        <MilestoneCelebrationModal
          isOpen={!!celebrationData}
          onClose={() => setCelebrationData(null)}
          contributorName={celebrationData.name}
          coins={celebrationData.coins}
          tierName={celebrationData.tierName}
        />
      )}
    </div>
  );
};

export default NotesContributors;

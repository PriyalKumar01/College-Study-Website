import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
}

// ── Constants ─────────────────────────────────────────────────────────────────
const SIDEBAR_PURPLE = "#1e1b4b";

// ── Avatar helpers ────────────────────────────────────────────────────────────
const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#43e97b,#38f9d7)",
  "linear-gradient(135deg,#fa709a,#fee140)",
  "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  "linear-gradient(135deg,#ffecd2,#fcb69f)",
];

function initials(name: string) {
  const p = name.trim().split(" ");
  return p.length === 1 ? (p[0][0] || "?").toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
}

function avatarGradient(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h);
  return GRADIENTS[Math.abs(h) % GRADIENTS.length];
}

// ── Admin Card ────────────────────────────────────────────────────────────────
function AdminCard({ admin, index }: { admin: AdminRecord; index: number }) {
  const isOwner = admin.role === "owner";
  const isActive = !admin.to_date;
  const displayName = admin.user_name || admin.user_email.split("@")[0];
  const [hov, setHov] = useState(false);

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : null;

  // card bg: white → dark purple on hover
  const cardBg   = hov ? SIDEBAR_PURPLE : "#ffffff";
  const textMain  = hov ? "#ffffff" : "var(--foreground)";
  const textSub   = hov ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      style={{ marginBottom: 10 }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: cardBg,
          borderRadius: 14,
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          transition: "background 0.22s ease, box-shadow 0.22s ease",
          boxShadow: hov
            ? "0 8px 30px rgba(30,27,75,0.25)"
            : "0 1px 4px rgba(0,0,0,0.07)",
          cursor: "default",
          width: "100%",
        }}
      >
        {/* Rank or Crown */}
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hov ? "rgba(255,255,255,0.12)" : isOwner ? "#fef3c7" : "#ede9fe",
          fontSize: isOwner ? 18 : 13, fontWeight: 800,
          color: hov ? "#c7d2fe" : isOwner ? "#d97706" : "#6d28d9",
          transition: "background 0.22s, color 0.22s",
        }}>
          {isOwner ? "👑" : index + 1}
        </div>

        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          background: avatarGradient(admin.user_email),
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
          userSelect: "none",
        }}>
          {initials(displayName)}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: textMain, transition: "color 0.22s" }}>
              {displayName}
            </span>

            {/* Role badge */}
            <span style={{
              padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
              background: hov ? "rgba(255,255,255,0.13)" : isOwner ? "#fef3c7" : "#ede9fe",
              color: hov ? "#c7d2fe" : isOwner ? "#b45309" : "#5b21b6",
              border: `1.5px solid ${hov ? "rgba(199,210,254,0.3)" : isOwner ? "#fcd34d" : "#c4b5fd"}`,
              transition: "all 0.22s",
            }}>
              {isOwner ? "👑 Owner" : "⚔️ Admin"}
            </span>

            {/* Active / Former */}
            {!isOwner && isActive && (
              <span style={{
                padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: 5,
                background: hov ? "rgba(134,239,172,0.15)" : "#f0fdf4",
                color: hov ? "#86efac" : "#16a34a",
                border: `1.5px solid ${hov ? "rgba(134,239,172,0.3)" : "#bbf7d0"}`,
                transition: "all 0.22s",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: hov ? "#86efac" : "#22c55e" }} />
                Active
              </span>
            )}
            {!isOwner && !isActive && (
              <span style={{
                padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: hov ? "rgba(255,255,255,0.08)" : "#f8fafc",
                color: hov ? "rgba(255,255,255,0.5)" : "#64748b",
                border: `1.5px solid ${hov ? "rgba(255,255,255,0.15)" : "#e2e8f0"}`,
                transition: "all 0.22s",
              }}>
                Former
              </span>
            )}
          </div>

          <p style={{ fontSize: 12, margin: 0, color: textSub, transition: "color 0.22s" }}>
            {admin.user_email}
          </p>

          {/* Mobile dates */}
          {admin.from_date && (
            <p className="sm:hidden" style={{ fontSize: 11, margin: "4px 0 0", color: textSub, transition: "color 0.22s" }}>
              📅 {fmt(admin.from_date)} → {admin.to_date ? fmt(admin.to_date) : "Present"}
            </p>
          )}
        </div>

        {/* Desktop date range */}
        {(admin.from_date || admin.to_date) && (
          <div className="hidden sm:block" style={{ textAlign: "right", flexShrink: 0, minWidth: 88 }}>
            <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: textMain, opacity: 0.8, transition: "color 0.22s" }}>
              {fmt(admin.from_date) || "?"}
            </span>
            <span style={{ display: "block", fontSize: 11, color: textSub, transition: "color 0.22s" }}>
              →{" "}
              {admin.to_date
                ? fmt(admin.to_date)
                : <span style={{ color: hov ? "#86efac" : "#16a34a", fontWeight: 700 }}>Present</span>}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const NotesContributors = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"contributors" | "admins">("contributors");
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [loadingContributors, setLoadingContributors] = useState(true);

  // Fetch contributors on mount
  useEffect(() => {
    (async () => {
      setLoadingContributors(true);
      const { data } = await (supabase as any)
        .from("contributors")
        .select("*")
        .order("coins", { ascending: false });
      if (data) setContributors(data as Contributor[]);
      setLoadingContributors(false);
    })();
  }, []);

  // Fetch admins when tab switches
  useEffect(() => {
    if (tab === "admins") {
      setLoadingAdmins(true);
      (supabase as any)
        .from("admin_roles")
        .select("*")
        .order("from_date", { ascending: true, nullsFirst: false })
        .then(({ data }: any) => {
          if (data) setAdmins(data as AdminRecord[]);
          setLoadingAdmins(false);
        });
    }
  }, [tab]);

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
                onClick={() => setTab("contributors")}
                style={{
                  flex: 1, background: "transparent", border: "none", cursor: "pointer",
                  color: tab === "contributors" ? "#ffffff" : SIDEBAR_PURPLE,
                  fontWeight: 700, fontSize: 14, letterSpacing: 0.3, fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  paddingRight: "8%",
                  transition: "color 0.35s ease",
                }}
              >
                🥇 Contributors
              </button>
              <button
                id="tab-admins"
                onClick={() => setTab("admins")}
                style={{
                  flex: 1, background: "transparent", border: "none", cursor: "pointer",
                  color: tab === "admins" ? "#ffffff" : SIDEBAR_PURPLE,
                  fontWeight: 700, fontSize: 14, letterSpacing: 0.3, fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  paddingLeft: "8%",
                  transition: "color 0.35s ease",
                }}
              >
                ⚔️ Admins
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
                          <Card className="border-0 shadow-lg bg-gradient-to-b from-gray-100 to-gray-300 dark:from-slate-800 dark:to-slate-900 border-t-4 border-gray-400 hover:scale-105 transition-transform duration-300">
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
                        <Card className="border-0 shadow-xl bg-gradient-to-b from-yellow-50 to-yellow-200 dark:from-amber-900/40 dark:to-amber-900/10 border-t-8 border-yellow-500 hover:scale-110 transition-transform duration-300">
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
                            <Badge className="mt-2 mb-3 bg-yellow-100 text-yellow-800 border-yellow-200 text-sm px-3">
                              {contributors[0].branch} '{contributors[0].batch} • HBTU
                            </Badge>
                            <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-extrabold text-xl">
                              <Coins className="h-6 w-6 mr-1" />{contributors[0].coins}
                            </div>
                            <p className="text-xs text-yellow-600/60 dark:text-yellow-400/60 font-medium uppercase tracking-wider mt-2">Top Contributor</p>
                          </div>
                        </Card>
                      </motion.div>

                      {/* Rank 3 */}
                      {contributors[2] && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                          className="order-3 w-full md:w-1/3 max-w-[280px]">
                          <Card className="border-0 shadow-lg bg-gradient-to-b from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 border-t-4 border-orange-500 hover:scale-105 transition-transform duration-300">
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

                  {/* ── Remaining list (rank 4+) ── */}
                  <div className="max-w-4xl mx-auto space-y-3">
                    {contributors.slice(3).map((c, idx) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
                      >
                        <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-yellow-50 hover:to-white dark:hover:from-yellow-900/10 dark:hover:to-slate-800 border-l-4 border-l-transparent hover:border-l-yellow-400">
                          <div className="p-4 sm:p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4 md:gap-6">
                              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-lg shadow-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex-shrink-0">
                                {idx + 4}
                              </div>
                              <div>
                                <a href={c.linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
                                  <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 hover:text-primary transition-colors">{c.name}</h3>
                                </a>
                                <Badge variant="secondary" className="mt-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                  {c.branch} '{c.batch} • HBTU
                                </Badge>
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
                    ))}
                  </div>

                  {/* ── CTA ── */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12 text-center">
                    <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 border-dashed border-2">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-2">Want to Contribute?</h3>
                        <p className="text-muted-foreground mb-4">Share your notes and help fellow students. Earn coins and get recognized!</p>
                        <Button className="btn-hero" onClick={() => window.open(
                          "https://wa.me/918957221543?text=Respected%20Priyal%20Sir%2C%20I%20would%20like%20to%20share%20my%20notes%20to%20help%20other%20students.%20I%E2%80%99ll%20send%20the%20maximum%20possible%20PDFs%20so%20they%20can%20be%20uploaded%20and%20make%20learning%20easier%20and%20more%20accessible%20for%20everyone.",
                          "_blank")}>
                          Start Contributing
                        </Button>
                      </CardContent>
                    </Card>
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

              {/* Sky-blue section wrapper */}
              <div className="max-w-3xl mx-auto" style={{
                background: "linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 100%)",
                borderRadius: 20,
                padding: "20px 16px",
                boxShadow: "0 2px 20px rgba(14,165,233,0.1)",
              }}>
                {loadingAdmins ? (
                  <div className="flex justify-center py-14">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                  </div>
                ) : admins.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No admin records found.</div>
                ) : (
                  admins.map((admin, i) => <AdminCard key={admin.id} admin={admin} index={i} />)
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesContributors;

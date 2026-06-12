import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Award, Medal, Coins, Shield, Crown, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Contributor {
  rank: number;
  name: string;
  branch: string;
  batch: string;
  coins: number;
  medal?: "gold" | "silver" | "bronze";
  socialUrl?: string;
  imageUrl?: string;
}

interface AdminRecord {
  id: string;
  user_name: string | null;
  user_email: string;
  role: string;
  from_date: string | null;
  to_date: string | null;
  created_at: string | null;
}

const NotesContributors = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'contributors' | 'admins'>('contributors');
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);

  const contributors: Contributor[] = [
    {
      rank: 1, name: "Devanshi Saxena", branch: "PT", batch: "28", coins: 219, medal: "gold",
      socialUrl: "https://www.linkedin.com/in/devanshisaxena82/", imageUrl: "/Devanshi.png"
    },
    {
      rank: 2, name: "Raunak Gupta", branch: "EE", batch: "28", coins: 120, medal: "silver",
      socialUrl: "https://www.linkedin.com/in/raunak-gupta-4a4266328/", imageUrl: "/Raunak.png"
    },
    {
      rank: 3, name: "Rahul Singh", branch: "CHE", batch: "27", coins: 105, medal: "bronze",
      socialUrl: "https://www.linkedin.com/in/rahul-singh-79729b28a/", imageUrl: "/Rahul.png"
    },
    { rank: 4, name: "Tanishka Gupta", branch: "ET", batch: "28", coins: 98, socialUrl: "https://www.linkedin.com/in/tanishka-gupta-a6b6b7325/" },
    { rank: 5, name: "Manya Singh", branch: "BS-MS", batch: "29", coins: 95, socialUrl: "" },
    { rank: 6, name: "Sonam Yadav", branch: "BioTech", batch: "28", coins: 90, socialUrl: "" },
    { rank: 7, name: "Anmol Singh", branch: "ET", batch: "27", coins: 82, socialUrl: "https://www.linkedin.com/in/anmol94" },
    { rank: 8, name: "Smriti Dwivedi", branch: "CE", batch: "28", coins: 75, socialUrl: "#" },
    { rank: 9, name: "Vrishti Chauhan", branch: "ME", batch: "28", coins: 70, socialUrl: "https://www.linkedin.com/in/vrishti-chauhan-51b752375/" },
    { rank: 10, name: "Devanshi Saxena", branch: "PT", batch: "28", coins: 70, socialUrl: "https://www.linkedin.com/in/devanshisaxena82/" },
    { rank: 11, name: "Kanchan Upadhyay", branch: "PT", batch: "28", coins: 67, socialUrl: "https://www.linkedin.com/in/kanchan-upadhyay-1a051a326/" },
    { rank: 12, name: "Bhoomika", branch: "MBA", batch: "27", coins: 54, socialUrl: "#" },
    { rank: 13, name: "Shikhar Maurya", branch: "ME", batch: "28", coins: 48, socialUrl: "https://www.linkedin.com/in/shikhar-maurya-003541321/" },
    { rank: 14, name: "Ananya Kanujiya", branch: "CSE", batch: "28", coins: 40, socialUrl: "https://www.linkedin.com/in/ananya-kanaujiya-1475b5380/" },
    { rank: 15, name: "Rachna Sharma", branch: "FT", batch: "28", coins: 40, socialUrl: "#" },
    { rank: 16, name: "Amarendra Sengar", branch: "CSE", batch: "27", coins: 15, socialUrl: "https://www.linkedin.com/in/amarendra386/" },
    { rank: 17, name: "Amit Singh", branch: "CSE", batch: "27", coins: 13, socialUrl: "#" },
    { rank: 18, name: "Sumit Chaurasia", branch: "ET", batch: "28", coins: 10, socialUrl: "#" },
    { rank: 19, name: "Rakesh Varun", branch: "PL", batch: "29", coins: 8, socialUrl: "https://www.linkedin.com/in/rakesh-varun-618309381/" },
    { rank: 20, name: "Anshika chaudhary", branch: "CSE", batch: "29", coins: 7, socialUrl: "https://www.linkedin.com/in/anshika-chaudhary-5535763a1/" },
    { rank: 21, name: "Ghanisth Umrao", branch: "ET", batch: "28", coins: 5, socialUrl: "https://www.linkedin.com/in/ghanisth-umrao-98a66732a/" },
    { rank: 22, name: "Sudhir Kumar Gupta", branch: "CSE", batch: "27", coins: 4, socialUrl: "https://www.linkedin.com/in/spidy-sudhir/" },
    { rank: 23, name: "Vishal Yadav", branch: "CSE", batch: "27", coins: 2, socialUrl: "#" },
    { rank: 24, name: "Tanya Verma", branch: "FT", batch: "28", coins: 2, socialUrl: "https://www.linkedin.com/in/verma-tanya-18t/" },
    { rank: 25, name: "Soni Rawat", branch: "ME", batch: "28", coins: 2, socialUrl: "https://www.linkedin.com/in/soni-rawat-717768332/" },
    { rank: 26, name: "Kanishtha Mishra", branch: "LFT", batch: "28", coins: 2, socialUrl: "https://www.linkedin.com/in/kanishtha-mishra-8709932ba/" },
    { rank: 27, name: "Satyam Tripathi", branch: "IT", batch: "28", coins: 2, socialUrl: "#" },
    { rank: 28, name: "Ankit Yadav", branch: "FT", batch: "27", coins: 1, socialUrl: "#" },
    { rank: 29, name: "Aryan Gaurav", branch: "IT", batch: "27", coins: 1, socialUrl: "https://www.linkedin.com/in/aryan-gaurav-420744242/" },
    { rank: 30, name: "Laxita Rajora", branch: "PT", batch: "29", coins: 1, socialUrl: "https://www.linkedin.com/in/laxita-rajora-3000b7380/" },
    { rank: 31, name: "Jaideep Kumar", branch: "CSE", batch: "29", coins: 1, socialUrl: "#" },
    { rank: 32, name: "Arjun Gupta", branch: "CHE", batch: "28", coins: 1, socialUrl: "https://www.linkedin.com/in/arjun-gupta-9597a8329/" },
    { rank: 33, name: "Radhika Goyal", branch: "ET", batch: "29", coins: 1, socialUrl: "https://www.linkedin.com/in/radhika-goyal-8b7950383/" },
  ];

  // Always refetch when switching to admins tab
  useEffect(() => {
    if (tab === 'admins') {
      setLoadingAdmins(true);
      (supabase as any)
        .from('admin_roles')
        .select('*')
        .order('from_date', { ascending: true, nullsFirst: false })
        .then(({ data }: any) => {
          if (data) setAdmins(data as AdminRecord[]);
          setLoadingAdmins(false);
        });
    }
  }, [tab]);

  const formatDate = (d: string | null) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative">
      <Navbar />

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10 w-full pb-20">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 hover:bg-slate-200 dark:hover:bg-slate-800 text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* ─── TAB SWITCHER (curve style) ───── */}
        <div className="flex justify-center mb-8">
          <div
            className="relative flex rounded-2xl p-1 gap-1"
            style={{
              background: 'hsl(var(--card))',
              border: '1.5px solid hsl(var(--border))',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}
          >
            {/* Sliding highlight */}
            <div
              style={{
                position: 'absolute',
                top: 4, bottom: 4,
                left: tab === 'contributors' ? 4 : '50%',
                width: 'calc(50% - 4px)',
                background: 'hsl(var(--primary))',
                borderRadius: 12,
                transition: 'left 0.28s cubic-bezier(.4,0,.2,1)',
                zIndex: 0,
              }}
            />
            <button
              onClick={() => setTab('contributors')}
              style={{
                position: 'relative', zIndex: 1,
                padding: '9px 28px',
                fontSize: 14, fontWeight: 700,
                borderRadius: 12, border: 'none', cursor: 'pointer',
                color: tab === 'contributors' ? '#fff' : 'hsl(var(--foreground))',
                background: 'transparent',
                transition: 'color 0.2s',
                fontFamily: 'inherit',
              }}
            >
              🏆 Contributors
            </button>
            <button
              onClick={() => setTab('admins')}
              style={{
                position: 'relative', zIndex: 1,
                padding: '9px 28px',
                fontSize: 14, fontWeight: 700,
                borderRadius: 12, border: 'none', cursor: 'pointer',
                color: tab === 'admins' ? '#fff' : 'hsl(var(--foreground))',
                background: 'transparent',
                transition: 'color 0.2s',
                fontFamily: 'inherit',
              }}
            >
              🛡️ Admins
            </button>
          </div>
        </div>

        {/* ═══════════════════ CONTRIBUTORS TAB ═══════════════════ */}
        {tab === 'contributors' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-800 dark:text-slate-100 tracking-tight">
                Top Contributors <span className="text-yellow-500 inline-block animate-bounce">🏆</span>
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
                <i>Recognizing the students who selflessly contributed their valuable notes to help the community.</i>
              </p>
            </motion.div>

            {/* Podium Section for Top 3 */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-12 px-4 mt-8 md:mt-24">
              {/* Rank 2 (Left) */}
              {contributors[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="order-2 md:order-1 w-full md:w-1/3 max-w-[280px]"
                >
                  <Card className="border-0 shadow-lg bg-gradient-to-b from-gray-100 to-gray-300 dark:from-slate-800 dark:to-slate-900 border-t-4 border-gray-400 transform hover:scale-105 transition-transform duration-300">
                    <div className="p-4 flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-400 bg-white dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-gray-500 shadow-md overflow-hidden">
                          {contributors[1].imageUrl ? (
                            <img src={contributors[1].imageUrl} alt={contributors[1].name} className="w-full h-full object-cover" />
                          ) : "2"}
                        </div>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl">🥈</div>
                      </div>
                      <a href={contributors[1].socialUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-gray-400 underline-offset-4">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 truncate w-full hover:text-primary transition-colors">{contributors[1].name}</h3>
                      </a>
                      <div className="flex items-center gap-2 mt-1 mb-2 justify-center">
                        <Badge variant="secondary" className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300">{contributors[1].branch} '{contributors[1].batch} • HBTU</Badge>
                      </div>
                      <div className="flex items-center text-yellow-600 dark:text-yellow-500 font-bold">
                        <Coins className="h-4 w-4 mr-1" /> {contributors[1].coins}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Rank 1 (Center) */}
              {contributors[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="order-1 md:order-2 w-full md:w-1/3 max-w-[320px] -mt-8 md:-mt-12 z-20"
                >
                  <Card className="border-0 shadow-xl bg-gradient-to-b from-yellow-50 to-yellow-200 dark:from-amber-900/40 dark:to-amber-900/10 border-t-8 border-yellow-500 transform hover:scale-110 transition-transform duration-300">
                    <div className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
                      <div className="relative mb-5">
                        <div className="w-32 h-32 rounded-full border-4 border-yellow-500 bg-white dark:bg-slate-800 flex items-center justify-center text-4xl font-bold text-yellow-600 shadow-lg overflow-hidden">
                          {contributors[0].imageUrl ? (
                            <img src={contributors[0].imageUrl} alt={contributors[0].name} className="w-full h-full object-cover" />
                          ) : "1"}
                        </div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-6xl">👑</div>
                      </div>
                      <a href={contributors[0].socialUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-yellow-500 underline-offset-4">
                        <h3 className="font-bold text-2xl text-slate-900 dark:text-slate-50 truncate w-full hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors">{contributors[0].name}</h3>
                      </a>
                      <div className="flex items-center gap-2 mt-2 mb-3 justify-center">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-sm px-3">{contributors[0].branch} '{contributors[0].batch} • HBTU</Badge>
                      </div>
                      <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-extrabold text-xl">
                        <Coins className="h-6 w-6 mr-1" /> {contributors[0].coins}
                      </div>
                      <p className="text-xs text-yellow-600/60 dark:text-yellow-400/60 font-medium uppercase tracking-wider mt-2">Top Contributor</p>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Rank 3 (Right) */}
              {contributors[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="order-3 w-full md:w-1/3 max-w-[280px]"
                >
                  <Card className="border-0 shadow-lg bg-gradient-to-b from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 border-t-4 border-orange-500 transform hover:scale-105 transition-transform duration-300">
                    <div className="p-4 flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <div className="w-24 h-24 rounded-full border-4 border-orange-500 bg-white dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-orange-600 shadow-md overflow-hidden">
                          {contributors[2].imageUrl ? (
                            <img src={contributors[2].imageUrl} alt={contributors[2].name} className="w-full h-full object-cover" />
                          ) : "3"}
                        </div>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl">🥉</div>
                      </div>
                      <a href={contributors[2].socialUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-orange-500 underline-offset-4">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 truncate w-full hover:text-primary transition-colors">{contributors[2].name}</h3>
                      </a>
                      <div className="flex items-center gap-2 mt-1 mb-2 justify-center">
                        <Badge variant="secondary" className="bg-orange-100 dark:bg-slate-700 text-orange-800 dark:text-orange-200">{contributors[2].branch} '{contributors[2].batch} • HBTU</Badge>
                      </div>
                      <div className="flex items-center text-yellow-600 dark:text-yellow-500 font-bold">
                        <Coins className="h-4 w-4 mr-1" /> {contributors[2].coins}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Remaining List */}
            <div className="max-w-4xl mx-auto space-y-4">
              {contributors.slice(3).map((contributor, index) => (
                <motion.div
                  key={contributor.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05), duration: 0.4 }}
                >
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 hover:scale-105 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-white dark:hover:from-yellow-900/10 dark:hover:to-slate-800 border-l-4 border-l-transparent hover:border-l-yellow-400">
                    <div className="p-4 sm:p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-lg shadow-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {contributor.rank}
                        </div>
                        <div>
                          <a href={contributor.socialUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-slate-300 underline-offset-4">
                            <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 flex items-center gap-1.5 lead hover:text-primary transition-colors">
                              {contributor.name}
                            </h3>
                          </a>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-600">
                              {contributor.branch} '{contributor.batch} • HBTU
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-fit pl-4">
                        <div className="flex items-center justify-end gap-1.5 text-yellow-600 dark:text-yellow-500 font-bold text-lg md:text-xl">
                          <Coins className="h-5 w-5 md:h-6 md:w-6 fill-yellow-500 text-yellow-600" />
                          {contributor.coins.toLocaleString()}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium mt-0.5">Notes</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 border-dashed border-2">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Want to Contribute?</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your notes and help fellow students. Earn coins and get recognized!
                  </p>
                  <Button
                    className="btn-hero"
                    onClick={() => {
                      window.open(
                        "https://wa.me/918957221543?text=Respected%20Priyal%20Sir%2C%20I%20would%20like%20to%20share%20my%20notes%20to%20help%20other%20students.%20I%E2%80%99ll%20send%20the%20maximum%20possible%20PDFs%20so%20they%20can%20be%20uploaded%20and%20make%20learning%20easier%20and%20more%20accessible%20for%20everyone.",
                        "_blank"
                      );
                    }}
                  >
                    Start Contributing
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

        {/* ═══════════════════ ADMINS TAB ═══════════════════ */}
        {tab === 'admins' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-800 dark:text-slate-100 tracking-tight">
                Admin Team <span className="inline-block">🛡️</span>
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                The dedicated team that manages and moderates CollegeStudy Hub.
              </p>
            </div>

            {loadingAdmins ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-3">
                {admins.map((admin, i) => {
                  const isOwnerRole = admin.role === 'owner';
                  const isActive = !admin.to_date;
                  const displayName = admin.user_name || null;
                  const adminRank = i + 1;
                  return (
                    <motion.div
                      key={admin.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card
                        className={`border-0 shadow-sm transition-all duration-200 ${
                          isOwnerRole
                            ? 'bg-gradient-to-r from-amber-50 to-yellow-50/60 dark:from-amber-900/20 dark:to-amber-800/10 border-l-4 border-l-amber-400'
                            : isActive
                              ? 'bg-white dark:bg-slate-800 border-l-4 border-l-blue-400 hover:shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-l-4 border-l-slate-300 opacity-70'
                        }`}
                      >
                        <div className="p-4 sm:p-5 flex items-center gap-4">
                          {/* Rank number — no circle photo */}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                              isOwnerRole
                                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {isOwnerRole ? <Crown className="h-4 w-4" /> : adminRank}
                          </div>

                          {/* Name + Email + Badges */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-bold text-[15px] ${
                                displayName ? 'text-foreground' : 'text-muted-foreground italic text-sm'
                              }`}>
                                {displayName || admin.user_email.split('@')[0]}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[10px] px-2 py-0 capitalize font-semibold ${
                                  isOwnerRole
                                    ? 'border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                                    : 'border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                }`}
                              >
                                {isOwnerRole ? '👑 Owner' : '🛡️ Admin'}
                              </Badge>
                              {!isOwnerRole && isActive && (
                                <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {admin.user_email}
                            </p>
                          </div>

                          {/* Duration — right side */}
                          <div className="text-right flex-shrink-0 min-w-[100px] hidden sm:block">
                            {admin.from_date ? (
                              <>
                                <p className="text-[12px] font-semibold text-foreground/70">
                                  {new Date(admin.from_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                  →{' '}
                                  {admin.to_date
                                    ? new Date(admin.to_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                                    : <span className="text-green-600 font-bold">Present</span>
                                  }
                                </p>
                              </>
                            ) : (
                              <p className="text-[10px] text-muted-foreground italic">—</p>
                            )}
                          </div>
                        </div>

                        {/* Mobile: show date below on small screens */}
                        {admin.from_date && (
                          <div className="sm:hidden px-4 pb-3 -mt-1">
                            <p className="text-[11px] text-muted-foreground">
                              📅 {new Date(admin.from_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                              {' → '}
                              {admin.to_date
                                ? new Date(admin.to_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                                : <span className="text-green-600 font-semibold">Present</span>
                              }
                            </p>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}

                {admins.length === 0 && (
                  <div className="text-center py-16">
                    <Shield className="h-12 w-12 text-muted-foreground opacity-30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No admin records found.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotesContributors;

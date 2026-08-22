import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, BookOpen, PlusCircle, Calculator, Bot, Trophy, Sparkles, Calendar, TrendingUp, Lock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

const StatCounter = ({ value, trigger }: { value: string; trigger: boolean }) => {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!trigger) {
      setDisplayValue(value);
      return;
    }

    const kMatch = value.match(/^([0-9.]+)(k)\+$/);
    const plusMatch = value.match(/^([0-9.]+)\+$/);

    if (kMatch) {
      const targetNum = parseFloat(kMatch[1]); // e.g. 2.25
      const duration = 1200; // 1.2s count
      const steps = 50;
      const stepTime = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const ease = progress * (2 - progress); // easeOutQuad

        if (ease < 0.4) {
          const subProgress = ease / 0.4;
          const currentCount = Math.floor(subProgress * 999);
          setDisplayValue(`${currentCount}`);
        } else {
          const subProgress = (ease - 0.4) / 0.6;
          const startK = 1.0;
          const currentK = startK + subProgress * (targetNum - startK);
          setDisplayValue(`${currentK.toFixed(2)}k+`);
        }

        if (step >= steps) {
          clearInterval(interval);
          setDisplayValue(value);
        }
      }, stepTime);

      return () => clearInterval(interval);
    } else if (plusMatch) {
      const targetNum = parseFloat(plusMatch[1]);
      const duration = 1000;
      const steps = 40;
      const stepTime = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const ease = progress * (2 - progress);
        const currentCount = Math.floor(ease * targetNum);
        setDisplayValue(`${currentCount}+`);

        if (step >= steps) {
          clearInterval(interval);
          setDisplayValue(value);
        }
      }, stepTime);

      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
    }
  }, [value, trigger]);

  return <span>{displayValue}</span>;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState<number | string>(() => {
    return getCachedData<string>('dash_user_count', DEFAULT_CACHE_TTL_MS) || '-';
  });
  const [notesCount, setNotesCount] = useState<number | string>(() => {
    return getCachedData<string>('dash_notes_count', DEFAULT_CACHE_TTL_MS) || '1478+';
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const cachedNotes = getCachedData<string>('dash_notes_count', DEFAULT_CACHE_TTL_MS);
      const cachedUsers = getCachedData<string>('dash_user_count', DEFAULT_CACHE_TTL_MS);
      if (cachedNotes && cachedUsers) {
        setNotesCount(cachedNotes);
        setUserCount(cachedUsers);
        return;
      }

      // Fetch Notes Count
      const { count: nNotes } = await supabase
        .from('notes')
        .select('id', { count: 'exact', head: true })
        .eq('approved', true);
      if (nNotes !== null && nNotes > 0) {
        const val = nNotes + '+';
        setNotesCount(val);
        setCachedData('dash_notes_count', val);
      }

      // Try fetching Users count via RPC or profiles table
      // @ts-ignore - 'get_user_count' missing from generated database types
      const { data: countData, error } = await supabase.rpc('get_user_count');
      if (!error && countData !== null) {
        const val = countData + '+';
        setUserCount(val);
        setCachedData('dash_user_count', val);
      } else {
        const { count: pCount, error: pError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });
        if (!pError && pCount !== null) {
          const val = pCount + '+';
          setUserCount(val);
          setCachedData('dash_user_count', val);
        } else {
          setUserCount('4,500+'); // Fallback estimate if table/rpc missing
        }
      }
    };
    fetchCounts();
  }, []);

  // Get user's first name from metadata or email
  const getDisplayName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return user?.email?.split('@')[0] || 'Student';
  };

  const quickActions = [
    {
      title: 'Browse Notes',
      description: 'Semester study materials, notes, official PYQs, syllabus & YouTube links for BTech, BS-MS, BBA, and MBA.',
      icon: <BookOpen className="h-6 w-6" />,
      href: '/notes',
      color: 'bg-blue-600',
    },
    {
      title: 'CGPA Calculator',
      description: 'Calculate semester SGPA and overall CGPA accurately according to university grading standards.',
      icon: <Calculator className="h-6 w-6" />,
      href: '/cgpa-calculator',
      color: 'bg-indigo-600',
    },
    {
      title: 'Premium Content',
      description: 'Unlock 3 premium packages: MNC Career Pages (jobs/internships platforms), 1800+ HR Emails list, and ATS Resume Guide.',
      icon: <Lock className="h-6 w-6" />,
      href: '/premium-content',
      color: 'bg-amber-500',
    },
    {
      title: 'AI Tools',
      description: 'Curated AI tools to boost study productivity, research writing, academic summaries, and coding assistance.',
      icon: <Bot className="h-6 w-6" />,
      href: '/useful-ai-tools',
      color: 'bg-orange-500',
    },
    {
      title: 'Contributor List',
      description: 'Meet the dedicated students who shared their study resources and helped build this platform.',
      icon: <Users className="h-6 w-6" />,
      href: '/notes-contributors',
      color: 'bg-teal-600',
    },
    {
      title: 'Scholarships Portal',
      description: 'Discover and apply for national, state-wise, corporate, and international financial aid opportunities.',
      icon: <Sparkles className="h-6 w-6" />,
      href: '/scholarship-portal',
      color: 'bg-purple-600',
    },
    {
      title: 'Opportunities Hub',
      description: 'Explore off-campus job openings, tech internships, coding challenges, hackathons, and hiring events.',
      icon: <Briefcase className="h-6 w-6" />,
      href: '/opportunities',
      color: 'bg-emerald-600',
    },
  ];

  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const statCardsData = [
    {
      value: '2.25k+',
      label: 'Registered Users',
      badge: 'Active Now',
      description: 'Join a rapidly growing community of students sharing resources, collaborating, and studying together in real time.',
      icon: <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      iconBg: 'bg-blue-50 dark:bg-blue-950/45',
      badgeColor: 'bg-blue-100/70 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    },
    {
      value: '1.67k+',
      label: 'Notes Available',
      badge: '100% Free',
      description: 'Access high-quality, peer-reviewed notes, past year papers (PYQs), and syllabus resources for all semesters.',
      icon: <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/45',
      badgeColor: 'bg-emerald-100/70 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
    },
    {
      value: '40+',
      label: 'Notes Contributors',
      badge: 'Student Heroes',
      description: 'A proud team of students who actively upload and share their curated study materials to help peers succeed.',
      icon: <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      iconBg: 'bg-amber-50 dark:bg-amber-950/45',
      badgeColor: 'bg-amber-100/70 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
    },
    {
      value: '30+',
      label: 'Support Admins',
      badge: 'Moderator Team',
      description: 'Dedicated student leaders keeping the portal clean, organized, and running smoothly 24/7.',
      icon: <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      iconBg: 'bg-purple-50 dark:bg-purple-950/45',
      badgeColor: 'bg-purple-100/70 text-purple-755 dark:bg-purple-900/50 dark:text-purple-300'
    },
    {
      value: '1800+',
      label: 'Premium HR Emails',
      badge: 'Direct Referrals',
      description: 'Unlock direct contact emails of recruiters at top product-based companies and startups for job referrals.',
      icon: <Lock className="h-6 w-6 text-rose-600 dark:text-rose-455" />,
      iconBg: 'bg-rose-50 dark:bg-rose-950/45',
      badgeColor: 'bg-rose-100/70 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
    },
    {
      value: 'Premium',
      label: 'Premium ATS Resume Guide',
      badge: 'Template & Guide',
      description: 'Get verified, ATS-compliant resume templates and step-by-step guides to secure interview shortlists.',
      icon: <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/45',
      badgeColor: 'bg-indigo-100/70 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
    },
    {
      value: '150+',
      label: 'Useful AI Tools',
      badge: 'Study Boosters',
      description: 'Explore the best handpicked artificial intelligence tools for writing, coding, researching, and summarization.',
      icon: <Bot className="h-6 w-6 text-orange-600 dark:text-orange-455" />,
      iconBg: 'bg-orange-50 dark:bg-orange-950/45',
      badgeColor: 'bg-orange-100/70 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
    },
    {
      value: 'All-in-One',
      label: 'All-in-One Career Platforms',
      badge: 'Jobs & Hackathons',
      description: 'Instantly find curated career boards, active hiring challenges, hackathons, and internship resources.',
      icon: <Briefcase className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
      iconBg: 'bg-teal-50 dark:bg-teal-950/45',
      badgeColor: 'bg-teal-100/70 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300'
    }
  ];

  const handleNextStat = () => {
    setCurrentStatIndex((prev) => (prev + 1) % statCardsData.length);
  };

  const handlePrevStat = () => {
    setCurrentStatIndex((prev) => (prev - 1 + statCardsData.length) % statCardsData.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNextStat, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 overflow-x-hidden">

        {/* Merged Hero Section (App-style Sky Blue/Indigo Gradient) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-950/20 dark:to-blue-900/20 border border-blue-100 dark:border-blue-900/30 shadow-sm"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-100/25 dark:bg-blue-950/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-950/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between pt-6 pb-6 px-6 sm:px-10 lg:px-12 gap-6 md:gap-10">
            <div className="text-left md:max-w-xl lg:max-w-2xl flex-grow">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-flex items-center py-1.5 px-3 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-widest mb-3 border border-blue-200 dark:border-blue-800 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                  YOUR COLLEGE STUDY DASHBOARD
                </span>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-2 leading-tight tracking-tight lg:whitespace-nowrap">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">@{getDisplayName()}!</span> 👋
                </h1>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-semibold mb-3">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}</span>
                </div>

                <p className="text-slate-650 dark:text-slate-400 text-sm md:text-base font-semibold leading-relaxed mb-4">
                  Ready to continue your academic journey? All your study materials and resources, organized for easy access in one place.
                </p>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-3 mt-4 leading-tight tracking-tight lg:whitespace-nowrap">
                  Study Better With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Curated Notes</span>
                </h3>

                <div className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-2.5 font-medium mb-4">
                  <span className="block">✨ <strong>Structured & Curated Notes + PYQs:</strong> Make it easier to score well! Use these + AI Tools to make your own notes.</span>
                  <span className="block">🎉 <strong>Enjoy College Life:</strong> Make memories, have lots of fun, participate in events, and lead clubs & sub-councils.</span>
                  <span className="block">📚 <strong>Study Smart:</strong> Prepare 3-4 days or 1 week before exams as per your learning capability.</span>
                  <span className="block">🎯 <strong>Maintain GPA:</strong> 8.0+ comes under the excellent category. A minimum GPA of 6.5 to 7.0 is required depending from company to company.</span>
                </div>
              </motion.div>
            </div>

            {/* Illustration + Buttons Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              className="flex flex-col items-center justify-center flex-shrink-0 w-full md:w-auto"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-64 h-36 md:w-80 md:h-48 lg:w-[400px] lg:h-[230px] relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-blue-400/10 blur-[45px] rounded-full"></div>
                <img
                  src="/images/study/GirlsBoysGroupOf4.png"
                  alt="Students studying together"
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                />
              </motion.div>

              {/* Start Studying (blue), Check CGPA (green), Try Premium (amber) vertically stacked under illustration */}
              <div className="flex flex-col gap-2.5 mt-2 justify-center w-full max-w-[280px]">
                <Link to="/notes" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm border-none flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Start Studying
                  </Button>
                </Link>
                <Link to="/cgpa-calculator" className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm border-none flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Check CGPA
                  </Button>
                </Link>
                <Link to="/premium-content" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold h-12 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm border-none flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-slate-955" />
                    Try Premium
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2.5 text-slate-800 dark:text-slate-100">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Explore Features
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
                className={index === quickActions.length - 1 ? "col-span-2 md:col-span-3" : ""}
              >
                <Link to={action.href} className="block h-full">
                  <Card className="h-full border border-border/60 hover:border-primary/50 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-card/80 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] hover:-translate-y-1.5 group rounded-2xl overflow-hidden relative">
                    {/* Nice subtle gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500"></div>

                    <CardHeader className="p-5 md:p-6 text-center relative z-10 flex flex-col items-center">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${action.color} shadow-lg shadow-${action.color.split('-')[1]}-500/30 flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                        {action.icon}
                      </div>
                      <CardTitle className="text-base md:text-lg font-bold mb-1.5 text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{action.title}</CardTitle>
                      <CardDescription className="text-xs md:text-sm leading-relaxed">{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>


        {/* Stats and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white dark:bg-card">
              <CardHeader className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400">
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700">
                        <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      Website Statistics
                    </CardTitle>
                    <CardDescription className="text-sm font-semibold mt-2 text-slate-500 dark:text-slate-400">Real-time insights of our thriving student community</CardDescription>
                  </div>

                  <Link to="/ats-friendly-resume" className="shrink-0">
                    <Button variant="default" className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-955 border-none shadow-md hover:shadow-lg transition-all rounded-xl font-extrabold px-4 h-10 w-full sm:w-auto flex items-center justify-center gap-2 relative">
                      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                      </span>
                      <Sparkles className="w-4 h-4 text-slate-955" />
                      ATS Friendly Resume (Premium)
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[300px]">
                  {/* Left Side: Stats info description and manual controls */}
                  <div className="flex-1 text-left space-y-5 w-full">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Interactive Metrics
                      </span>
                      <h4 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                        Community & Career Insights
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed max-w-md">
                        Our platform is designed to provide BTech, BS-MS, BBA, and MBA students with premium resources. Click or swipe the cards to explore the key numbers driving StudyHub.
                      </p>
                    </div>

                    {/* Progress indicators: 8 dots */}
                    <div className="flex items-center gap-2">
                      {statCardsData.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentStatIndex(idx)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentStatIndex 
                              ? 'w-7 bg-indigo-600 dark:bg-indigo-400' 
                              : 'w-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-350 dark:hover:bg-slate-700'
                          }`}
                          aria-label={`Go to stat ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Prev/Next buttons */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevStat}
                        className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextStat}
                        className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Side: Stacked Card Deck */}
                  <div 
                    className="flex-shrink-0 w-full max-w-[340px] sm:max-w-[380px] h-[270px] relative flex items-center justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <AnimatePresence>
                      {[2, 1, 0].map((depth) => {
                        const index = (currentStatIndex + depth) % statCardsData.length;
                        const card = statCardsData[index];

                        return (
                          <motion.div
                            key={index}
                            style={{
                              zIndex: 30 - depth,
                              position: 'absolute',
                              width: '100%',
                              transformOrigin: 'bottom center',
                            }}
                            initial={{
                              scale: 0.92,
                              y: 20,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1 - depth * 0.045,
                              y: depth * 12,
                              opacity: depth === 0 ? 1 : depth === 1 ? 0.85 : 0.45,
                            }}
                            exit={{
                              x: [0, 200, 0],
                              y: [0, -10, 24],
                              scale: [1, 0.96, 0.92],
                              opacity: [1, 0.8, 0],
                              transition: { duration: 0.4, ease: "easeInOut" }
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 26,
                            }}
                            onTap={() => {
                              if (depth === 0) {
                                handleNextStat();
                              }
                            }}
                            className="bg-gradient-to-br from-[#edf5ff] via-[#e4f0ff] to-[#dbebff] dark:from-[#0d162a]/95 dark:via-[#090f1d]/95 dark:to-[#050810]/98 border border-blue-200/60 dark:border-blue-900/40 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-between h-[230px] sm:h-[240px] select-none cursor-pointer hover:border-indigo-500/30 dark:hover:border-indigo-400/20 transition-colors duration-300 rounded-3xl p-6"
                          >
                            {/* Card Top: Icon & Badge */}
                            <div className="flex items-center justify-between w-full">
                              <div className={`p-2.5 rounded-xl ${card.iconBg} flex items-center justify-center shadow-sm`}>
                                {card.icon}
                              </div>
                              <span className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border border-slate-200/40 dark:border-slate-700/30 shadow-sm ${card.badgeColor}`}>
                                {card.badge}
                              </span>
                            </div>

                            {/* Card Body: Huge number & title */}
                            <div className="my-2">
                              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 tracking-tight whitespace-nowrap mb-0.5 leading-none">
                                <StatCounter value={card.value} trigger={depth === 0} />
                              </div>
                              <div className="text-sm font-bold text-slate-750 dark:text-slate-200 leading-snug">
                                {card.label}
                              </div>
                            </div>

                            {/* Card Footer: Detailed Description */}
                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed line-clamp-2 mt-auto">
                              {card.description}
                            </p>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Student Success Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="h-full"
          >
            <Card className="h-full border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-lg transition-all rounded-3xl relative group bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-indigo-950/20 dark:via-blue-900/10 dark:to-indigo-950/20 flex flex-col pt-6 px-6 overflow-hidden">
              {/* decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-950/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10 pb-1">
                <h3 className="text-xl md:text-2xl font-black mb-2 text-slate-800 dark:text-slate-100 leading-tight mt-2">
                  Unlock Academic Excellence 🚀
                </h3>
                <p className="text-xs md:text-sm font-bold text-slate-650 dark:text-slate-350 max-w-[95%] leading-relaxed">
                  High-quality resources, roadmaps, and career opportunities curated by top-performing students.
                </p>
              </div>

              {/* Images expanding inside container */}
              <div className="relative z-20 w-full mt-auto flex justify-center items-end flex-1 pb-0 pt-4">
                <img
                  src="/images/study/image.png"
                  alt="Student reading"
                  className="w-[125%] sm:w-[110%] lg:w-[145%] max-w-[400px] object-contain object-bottom drop-shadow-2xl transition-transform duration-500 hover:scale-[1.03] origin-bottom scale-[1.15]"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, BookOpen, PlusCircle, Calculator, Bot, Trophy, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
const Dashboard = () => {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState<number | string>('-');
  const [notesCount, setNotesCount] = useState<number | string>('1478+');

  useEffect(() => {
    const fetchCounts = async () => {
      // Fetch Notes Count
      const { count: nNotes } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('approved', true);
      if (nNotes !== null && nNotes > 0) {
        setNotesCount(nNotes + '+');
      }

      // Try fetching Users count via RPC or profiles table
      // @ts-ignore - 'get_user_count' missing from generated database types
      const { data: countData, error } = await supabase.rpc('get_user_count');
      if (!error && countData !== null) {
        setUserCount(countData + '+');
      } else {
        const { count: pCount, error: pError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        if (!pError && pCount !== null) {
          setUserCount(pCount + '+');
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
      description: 'Access thousands of quality notes',
      icon: <FileText className="h-6 w-6" />,
      href: '/notes',
      color: 'bg-primary',
    },
    {
      title: 'Internships',
      description: 'Find amazing internship opportunities',
      icon: <Briefcase className="h-6 w-6" />,
      href: '/opportunities?tab=Internships',
      color: 'bg-blue-600',
    },
    {
      title: 'Jobs',
      description: 'Explore full-time job openings',
      icon: <Trophy className="h-6 w-6" />,
      href: '/opportunities?tab=Jobs',
      color: 'bg-green-600',
    },
    {
      title: 'Scholarships',
      description: 'Apply for educational scholarships',
      icon: <Sparkles className="h-6 w-6" />,
      href: '/opportunities?tab=Scholarships',
      color: 'bg-purple-600',
    },
    {
      title: 'AI Tools',
      description: 'Useful AI tools for students',
      icon: <Bot className="h-6 w-6" />,
      href: '/useful-ai-tools',
      color: 'bg-orange-600',
    },
    {
      title: 'CGPA Calculator',
      description: 'Calculate your semester and overall CGPA',
      icon: <Calculator className="h-6 w-6" />,
      href: '/cgpa-calculator',
      color: 'bg-teal-600',
    },
  ];

  const recentStats = [
    { label: 'Registered Students', value: userCount, change: 'Active Now' },
    { label: 'Total Notes', value: notesCount, change: '100% Free' },
    { label: 'Users', value: '478+', change: 'Check GPA Accurately' },
    { label: 'AI Tools', value: '105+', change: '+16 this week' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 overflow-x-hidden">

        {/* Animated Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-10 lg:p-12 shadow-2xl shadow-indigo-500/20 border border-white/10"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-left md:max-w-xl lg:max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-flex items-center py-1.5 px-3 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest mb-4 border border-white/20 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  YOUR COLLEGE STUDY DASHBOARD
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 leading-tight">
                  Welcome back, <span className="text-blue-200">@{getDisplayName()}!</span> 👋
                </h1>

                <div className="flex items-center gap-2 text-blue-100/80 text-sm font-medium mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}</span>
                </div>

                <p className="text-blue-100/90 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                  Ready to continue your academic journey? All your study materials and resources, organized for easy access in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/notes">
                    <Button className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-bold px-7 h-12 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Studying
                    </Button>
                  </Link>
                  <Link to="/cgpa-calculator">
                    <Button className="bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:text-white font-bold px-7 h-12 rounded-xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95 text-sm">
                      <Calculator className="w-4 h-4 mr-2" />
                      Check CGPA
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              className="hidden md:block relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 bg-blue-400/30 blur-[40px] rounded-full"></div>
                <img
                  src="/images/study/3d-study-group.png"
                  alt="Students studying together"
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                />
              </motion.div>
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
              >
                <Link to={action.href} className="block h-full block">
                  <Card className="h-full border border-border/60 hover:border-primary/50 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-card/80 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] hover:-translate-y-1.5 group rounded-2xl overflow-hidden relative">
                    {/* Nice subtle gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500"></div>

                    <CardHeader className="p-5 md:p-6 text-center relative z-10 flex flex-col items-center">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${action.color} shadow-lg shadow-${action.color.split('-')[1]}-500/30 flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                        {action.icon}
                      </div>
                      <CardTitle className="text-base md:text-lg font-bold mb-1.5 text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{action.title}</CardTitle>
                      <CardDescription className="text-xs md:text-sm line-clamp-2 leading-relaxed">{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Inspiring Community Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mb-14 xl:mb-20 relative rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-950/20 dark:to-blue-900/20 border border-blue-100 dark:border-blue-900/30 shadow-sm overflow-visible"
        >
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-8 md:p-8 lg:p-10 h-full">
            <div className="md:max-w-xl z-20 mb-8 md:mb-0">
              <span className="inline-flex items-center py-1.5 px-3 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider mb-4 border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                COLLEGE STUDY COMMUNITY
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
                Study Better With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Curated Notes</span>
              </h3>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 font-medium">
                <span className="block">✨ <strong>Structured & Curated Notes + PYQs:</strong> Make it easier to score well! Use these + AI Tools to make your own notes. (Though many learn just by scrolling PDFs!)</span>
                <span className="block">🎉 <strong>Enjoy College Life:</strong> Make memories, have lots of fun, participate in events, and lead clubs & sub-councils.</span>
                <span className="block">📚 <strong>Study Smart:</strong> Prepare 3-4 days or 1 week before exams as per your learning capability.</span>
                <span className="block">🎯 <strong>Maintain GPA:</strong> 8.0+ comes under the excellent category. A minimum GPA of 6.5 to 7.0 is required depending from company to company.</span>
              </p>
            </div>
            
            <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center z-10 md:pl-4 xl:-mt-8">
              <div className="absolute inset-0 bg-blue-400/20 blur-[60px] rounded-full pointer-events-none scale-110"></div>
              <img 
                src="/images/study/GirlsBoysGroupOf4.png" 
                alt="Students studying together" 
                className="w-[120%] md:w-[130%] lg:w-[150%] max-w-[350px] md:max-w-[450px] lg:max-w-[550px] object-contain relative z-20 drop-shadow-2xl transition-transform duration-700 hover:scale-[1.03] origin-bottom mb-5"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/30 border-none font-bold h-12 px-8 transition-all hover:scale-105 active:scale-95 relative z-30 min-w-[200px] text-lg w-full max-w-xs">
                Start Learning
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white dark:bg-card">
              <CardHeader className="bg-slate-50 dark:bg-white/[0.02] border-b border-border/50 pb-5">
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
                    <Button variant="default" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none shadow-md hover:shadow-lg transition-all rounded-xl font-bold px-4 h-10 w-full sm:w-auto flex items-center justify-center gap-2 relative">
                      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <Sparkles className="w-4 h-4" />
                      ATS Resume Builder (NEW)
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                  {recentStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-center p-4 md:p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col items-center justify-center"
                    >
                      <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 mb-2 drop-shadow-sm">{stat.value}</div>
                      <div className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2 min-h-[35px] flex items-center justify-center leading-snug">{stat.label}</div>
                      <div className="inline-flex items-center text-[10px] md:text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50 shadow-inner">
                        {stat.change}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Recently Added Updates
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <p><span className="font-semibold text-slate-800 dark:text-slate-200">ATS Friendly Resume Guide & Templates</span> added to the database recently.</p>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
                      <p><span className="font-semibold text-slate-800 dark:text-slate-200">PYQs of 4th Sem CSE Branch</span> uploaded successfully and are now live!</p>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <p><span className="font-semibold text-slate-800 dark:text-slate-200">5th & 6th Sem ET Branch Notes</span> added to the database recently.</p>
                    </li>
                  </ul>
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
            <Card className="h-full border-border/50 shadow-sm hover:shadow-lg transition-all rounded-3xl relative group bg-gradient-to-br from-indigo-500 to-purple-700 flex flex-col pt-6 px-6 overflow-hidden">
              {/* decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10 pb-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white leading-tight drop-shadow-sm mt-2">
                  College Study Website ✨
                </h3>
                <p className="text-xs md:text-sm font-medium text-blue-50 max-w-[95%] leading-snug drop-shadow-sm line-clamp-2">
                  Access top-tier resources to boost your grades.
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
    </div>
  );
};

export default Dashboard;

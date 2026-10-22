import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Briefcase, UserCheck, TrendingUp, Users, Award,
  GraduationCap, ArrowRight, CheckCircle, ChevronLeft, ChevronRight,
  Rocket, BrainCircuit, PieChart, LibraryBig
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedCounter from '@/components/AnimatedCounter';
import AuthModal from '@/components/AuthModal';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquarePlus } from 'lucide-react';
import StudentSuccessStories from '@/components/StudentSuccessStories';
import { useLiveStudentCount } from '@/hooks/useLiveStudentCount';

const HOME_CAROUSEL_SLIDES = [
  {
    id: 1,
    bgImage: "/csh_banner_coding_calendar.jpg",
    title: "Coding Space & CP Contest Calendar",
    badge: "Contest Hub",
    ctaText: "Open Coding Calendar",
    href: "/coding-space"
  },
  {
    id: 2,
    bgImage: "/csh_banner_curated_notes.jpg",
    title: "Curated Notes, Official PYQs & Syllabus",
    badge: "All Semesters",
    ctaText: "Browse Notes",
    href: "/notes"
  },
  {
    id: 3,
    bgImage: "/csh_banner_cgpa_calculator.jpg",
    title: "Precision CGPA & SGPA Calculator",
    badge: "GPA Tracker",
    ctaText: "Calculate CGPA",
    href: "/cgpa-calculator"
  },
  {
    id: 4,
    bgImage: "/csh_banner_gate_prep.jpg",
    title: "GATE Preparation Portal & Quizzes",
    badge: "100% Free",
    ctaText: "Start Prep Now",
    href: "/gate-study"
  },
  {
    id: 5,
    bgImage: "/csh_feature_scholarship_portal.jpg",
    title: "Scholarships & Financial Aid Portal",
    badge: "Grants & Aid",
    ctaText: "Find Scholarships",
    href: "/scholarship-portal"
  },
  {
    id: 6,
    bgImage: "/csh_feature_ai_suite.jpg",
    title: "500+ Curated AI Tools Directory",
    badge: "500+ AI Tools",
    ctaText: "Explore AI Tools",
    href: "/useful-ai-tools"
  },
  {
    id: 7,
    bgImage: "/csh_feature_premium_content.jpg",
    title: "Placement Vault & HR Contacts",
    badge: "Career Kits",
    ctaText: "Access Placement Vault",
    href: "/premium-content"
  },
  {
    id: 8,
    bgImage: "/csh_feature_contributor_list.jpg",
    title: "Contributors & Student Heroes",
    badge: "Community",
    ctaText: "View Contributors",
    href: "/notes-contributors"
  }
];

const Index = () => {
  const { user, isOwner } = useAuth();
  const { rawCount } = useLiveStudentCount();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [hasShownScrollPopup, setHasShownScrollPopup] = useState(false);
  const [hasClosedInitialPopup, setHasClosedInitialPopup] = useState(false);
  const [currentHomeSlide, setCurrentHomeSlide] = useState(0);








  // If redirected here from a protected route or query parameter, prompt sign-in/sign-up immediately
  const location = useLocation();
  useEffect(() => {
    if (user) return;
    const searchParams = new URLSearchParams(location.search);
    const authModalParam = searchParams.get('auth_modal');
    if (authModalParam === 'signup') {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }
    if (authModalParam === 'signin') {
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }

    const fromState = (location.state as any)?.from;
    const stored = (() => { try { return sessionStorage.getItem('postLoginRedirect'); } catch { return null; } })();
    if (fromState || stored) {
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  }, [user, location.search, location.state]);
  // Auto-show signup popup on first visit
  useEffect(() => {
    if (user) return; // Don't show if logged in

    const hasSignedUp = sessionStorage.getItem('hasSignedUp');
    const hasSeenInitialPopup = sessionStorage.getItem('hasSeenInitialPopup');
    const pendingRedirect = sessionStorage.getItem('postLoginRedirect');

    if (!hasSignedUp && !hasSeenInitialPopup && !pendingRedirect) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setAuthMode('signup');
        setShowAuthModal(true);
        sessionStorage.setItem('hasSeenInitialPopup', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Home Slide Auto-Scroll Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHomeSlide((prev) => (prev + 1) % HOME_CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Since we are in a custom scroll container (AppLayout main), window scroll won't work easily.
  // We'll rely on the initial timer for now, which is user-friendly enough.

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
    if (!hasClosedInitialPopup) {
      setHasClosedInitialPopup(true);
    }
  };

  const handleNavigation = (path: string) => {
    // Navigation logic
    if (['/', '/about', '/privacy-policy', '/terms-of-service'].includes(path)) {
      navigate(path);
      return;
    }

    if (!user) {
      openAuth('signin');
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      title: 'Curated Academic Notes',
      description: 'Semester-wise notes, past papers (PYQs), official syllabus & faculty materials for B.Tech, BS-MS, BBA, MBA & Pharmacy.',
      href: '/notes',
      image: '/csh_feature_curated_notes.jpg',
      badge: 'All University Courses',
      tags: ['B.Tech Engineering', 'BS-MS Science', 'BBA & MBA', 'PYQs Included'],
    },
    {
      title: 'Coding Space & Contest Hub',
      description: 'Live contest calendars for LeetCode, Codeforces & CodeChef, structured DSA sheets (Striver A2Z, NeetCode 150) & company kits.',
      href: '/coding-space',
      image: '/csh_feature_coding_calendar.jpg',
      badge: 'Live CP & DSA',
      tags: ['Contest Calendar', 'Striver A2Z', 'NeetCode 150', 'Company Kits'],
    },
    {
      title: 'GATE Exam Study Portal',
      description: 'Free comprehensive GATE preparation materials, chapter-wise quizzes with live timers, full mock tests & performance analysis.',
      href: '/gate-study',
      image: '/csh_feature_gate_exam.jpg',
      badge: '100% Free Mock Tests',
      tags: ['GATE CSE', 'Engineering Core', 'PYQs Quizzes', 'Timed Mocks'],
    },
    {
      title: '500+ Curated AI Tools',
      description: 'Handpicked artificial intelligence tools to turbocharge research writing, code generation, summarization & project workflows.',
      href: '/useful-ai-tools',
      image: '/csh_feature_ai_suite.jpg',
      badge: '500+ AI Directory',
      tags: ['Coding Assistants', 'Research Tools', 'Study Boosters', 'Automation'],
    },
    {
      title: 'Opportunities & Tech Jobs',
      description: 'Explore verified off-campus job openings, tech internships, hackathons, and company-specific hiring challenges in real-time.',
      href: '/opportunities',
      image: '/csh_feature_scholarships_jobs.jpg',
      badge: 'Jobs & Internships',
      tags: ['Off-Campus Jobs', 'Tech Internships', 'Hackathons', 'Hiring Events'],
    },
    {
      title: 'Scholarships & Financial Aid',
      description: 'Directly discover and apply for national, state-wise, corporate, and international financial aid opportunities with deadlines.',
      href: '/scholarship-portal',
      image: '/csh_feature_scholarship_portal.jpg',
      badge: 'Education Funding',
      tags: ['Sarkari Scholarships', 'Corporate Grants', 'Financial Aid', 'Active Deadlines'],
    },
  ];

  const stats = [
    {
      end: rawCount || 3096,
      suffix: '+',
      title: 'Active Students',
      description: 'Students actively using our platform',
      icon: <Users className="h-8 w-8" />,
    },
    {
      end: 1000,
      suffix: '+',
      title: 'Notes Downloaded',
      description: 'Study materials shared by Us',
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      end: 1200,
      suffix: '+',
      title: 'Positive Reviews',
      description: 'Recognition certificates awarded',
      icon: <Award className="h-8 w-8" />,
    },
    {
      end: 50,
      suffix: '+',
      title: 'Colleges Covered',
      description: 'Different engineering branches',
      icon: <GraduationCap className="h-8 w-8" />,
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      branch: 'Computer Science',
      message: 'College Study Hub helped me find amazing notes and land my dream internship!',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      branch: 'Electronics',
      message: 'The CGPA calculator and opportunities section helped me plan my career better.',
      rating: 5,
    },
    {
      name: 'Amit Kumar',
      branch: 'Mechanical',
      message: 'Such a helpful platform for students. The notes quality is excellent.',
      rating: 5,
    },
  ];

  const benefitsList = [
    'Access semester-wise study materials',
    'Separate section for internships & jobs',
    'Calculate CGPA instantly with precision',
    'DSA, & coding, & placement study material also available here',
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onOpenAuth={openAuth} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleAuthClose}
        defaultMode={authMode}
      />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative pt-6 pb-20 lg:pb-28 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-background">
        {/* ... (Kept as is, simplified for replacement matching if needed, but I'll target specific blocks) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* ... content ... */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge Removed */}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                Your One-Stop
                <span className="block bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">Academic Platform</span>
              </h1>

              {/* Mobile Hero Image (Hidden on Desktop) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:hidden mb-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
                <img
                  src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                  alt="College Study Hub"
                  className="w-48 h-auto mx-auto relative z-10 drop-shadow-xl"
                />
              </motion.div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Empowering students with comprehensive notes, career resources,
                and academic tools. Join thousands already benefiting from our platform.
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefitsList.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="h-12 px-6 sm:px-8 bg-gray-900 hover:bg-gray-800 text-white font-medium flex-shrink-0"
                  onClick={() => user ? navigate("/dashboard") : openAuth('signup')}
                >
                  {user ? 'Go to Dashboard' : 'Get Started Free'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 sm:px-8 bg-transparent border-gray-200 text-foreground hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 hover:text-foreground font-medium flex-shrink-0 transition-colors"
                  onClick={() => user ? navigate('/notes') : openAuth('signup')}
                >
                  {user ? 'Browse Notes' : 'Explore Notes'}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
                <img
                  src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                  alt="College Study Hub"
                  className="w-full max-w-md mx-auto relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Beautiful Auto-Scrolling Features Banner Carousel (Full 16:9 Visuals with Zero Cut & Zero Overlap) */}
      <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 select-none">
            {/* 16:9 Aspect Ratio Display Container - Shows full height & width without cut */}
            <div 
              onClick={() => handleNavigation(HOME_CAROUSEL_SLIDES[currentHomeSlide].href)}
              className="w-full aspect-[16/9] relative overflow-hidden cursor-pointer bg-slate-950 group"
            >
              <div 
                className="w-full h-full flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentHomeSlide * 100}%)` }}
              >
                {HOME_CAROUSEL_SLIDES.map((slide) => (
                  <div 
                    key={slide.id}
                    className="w-full h-full shrink-0 relative flex items-center justify-center bg-slate-950"
                  >
                    <img
                      src={slide.bgImage}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dedicated Non-Overlapping Control Bar (Below the image, completely unobstructed) */}
            <div className="h-14 sm:h-16 px-4 sm:px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 sm:gap-4">
              {/* Left: Active Slide Info */}
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                  {HOME_CAROUSEL_SLIDES[currentHomeSlide].badge}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {HOME_CAROUSEL_SLIDES[currentHomeSlide].title}
                </span>
              </div>

              {/* Center: Interactive Dot Indicators */}
              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                {HOME_CAROUSEL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHomeSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentHomeSlide === idx ? 'bg-primary w-7 shadow-xs' : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 w-2'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Right: CTA Button */}
              <Button
                onClick={() => handleNavigation(HOME_CAROUSEL_SLIDES[currentHomeSlide].href)}
                className="h-9 sm:h-10 px-4 sm:px-6 text-xs sm:text-sm font-bold rounded-xl shadow-md bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shrink-0 transition-transform active:scale-95"
              >
                <span>{HOME_CAROUSEL_SLIDES[currentHomeSlide].ctaText}</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories (3D Hall of Fame) */}
      <StudentSuccessStories />

      {/* Stats Section Removed (Moved inside StudentSuccessStories) */}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white dark:bg-card rounded-3xl shadow-xl border border-gray-100 dark:border-border p-5 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12 relative z-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools and resources designed specifically for students.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div
                    onClick={() => handleNavigation(feature.href)}
                    className="cursor-pointer group h-full"
                  >
                    <div className="h-full rounded-2xl bg-white dark:bg-card border border-border/80 hover:border-primary/50 hover:shadow-2xl dark:hover:shadow-primary/5 transition-all duration-300 overflow-hidden flex flex-col">
                      {/* Large Wide AI Visual Image Banner */}
                      <div className="h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                        <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-900/90 text-white border border-white/20 backdrop-blur-xs shadow-md">
                          {feature.badge}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-2">
                        <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors text-foreground">
                          {feature.title}
                        </h3>

                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1">
                          {feature.description}
                        </p>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {feature.tags?.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-2">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Free Access
                          </span>
                          <div className="flex items-center text-primary font-bold text-xs sm:text-sm group-hover:translate-x-1.5 transition-transform duration-300">
                            Explore Platform
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Footer - Professional Dark Theme */}
      <footer className="bg-gray-950 border-t border-gray-800 py-16 text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                  alt="College Study Hub"
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-white">College Study Hub</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                Empowering students with comprehensive academic resources, global opportunities, and career development tools.
              </p>
              <div className="text-sm">
                Built with <span className="text-red-500">❤️</span> for the student community.
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
              <div className="space-y-3">
                <div className="hover:text-primary cursor-pointer transition-colors" onClick={() => handleNavigation("/notes")}>Notes</div>
                <div className="hover:text-primary cursor-pointer transition-colors" onClick={() => handleNavigation("/opportunities")}>Opportunities</div>
                <div className="hover:text-primary cursor-pointer transition-colors" onClick={() => handleNavigation("/cgpa-calculator")}>CGPA Calculator</div>
                <div className="hover:text-primary cursor-pointer transition-colors" onClick={() => handleNavigation("/about")}>About Us</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gray-800 p-1.5 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </div>
                  <div>
                    <p className="text-white hover:text-primary transition-colors cursor-pointer" onClick={() => window.open('mailto:collegestudy.support@gmail.com')}>collegestudy.support@gmail.com</p>
                    <p className="text-xs text-gray-500 mt-1">For support & inquiries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2026 College Study Hub. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

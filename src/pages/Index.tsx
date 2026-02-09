import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
import CookieConsent from '@/components/CookieConsent';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquarePlus } from 'lucide-react';
import StudentSuccessStories from '@/components/StudentSuccessStories';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [hasShownScrollPopup, setHasShownScrollPopup] = useState(false);
  const [hasClosedInitialPopup, setHasClosedInitialPopup] = useState(false);








  // Auto-show signup popup on first visit
  useEffect(() => {
    if (user) return; // Don't show if logged in

    const hasSignedUp = sessionStorage.getItem('hasSignedUp');
    const hasSeenInitialPopup = sessionStorage.getItem('hasSeenInitialPopup');

    if (!hasSignedUp && !hasSeenInitialPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setAuthMode('signup');
        setShowAuthModal(true);
        sessionStorage.setItem('hasSeenInitialPopup', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Handle scroll-based popup via Intersection Observer or just Timer
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
      icon: <LibraryBig className="h-8 w-8 text-white" />,
      title: 'Premium Notes',
      description: 'Access thousands of quality notes for 1st-4th semester.',
      href: '/notes',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/30' // Custom shadow color
    },
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: 'Opportunities',
      description: 'Explore internships, jobs, scholarships, and hackathons.',
      href: '/opportunities',
      gradient: 'bg-gradient-to-br from-orange-500 to-pink-600',
      shadow: 'shadow-orange-500/30'
    },
    {
      icon: <PieChart className="h-8 w-8 text-white" />,
      title: 'CGPA Calculator',
      description: 'Calculate your semester and overall CGPA easily.',
      href: '/cgpa-calculator',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/30'
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-white" />,
      title: 'AI Tools',
      description: 'Access useful AI tools to enhance learning.',
      href: '/useful-ai-tools',
      gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/30'
    },
  ];

  const stats = [
    {
      end: 4500,
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

      {/* Cookie Consent */}
      <CookieConsent />

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
                  onClick={() => navigate('/notes')}
                >
                  Browse Notes
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

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 relative z-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    onClick={() => handleNavigation(feature.href)}
                    className="cursor-pointer group h-full"
                  >
                    <div className="h-full p-3 md:p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300">
                      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 ${feature.gradient} shadow-lg ring-2 md:ring-4 ring-white dark:ring-gray-900`}>
                        {/* Clone element to modify className for mobile size if needed, or rely on parent size */}
                        <div className="scale-75 md:scale-100 origin-center">{feature.icon}</div>
                      </div>
                      <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-xs md:text-sm group-hover:translate-x-1 transition-transform duration-300">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4" />
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
                    <p className="text-white hover:text-primary transition-colors cursor-pointer">priyalkumar06@gmail.com</p>
                    <p className="text-xs text-gray-500 mt-1">For support & inquiries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2025 College Study Hub. All rights reserved.</p>
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

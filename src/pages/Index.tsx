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

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [hasShownScrollPopup, setHasShownScrollPopup] = useState(false);
  const [hasClosedInitialPopup, setHasClosedInitialPopup] = useState(false);

  // Review State
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('studentReviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    }
    return [
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
      {
        name: 'Sneha Gupta',
        branch: 'Civil Engineering',
        message: 'Finally found a place where I can get all B.Tech notes organized properly.',
        rating: 4,
      },
      {
        name: 'Vikram Malhotra',
        branch: 'MBA',
        message: 'Great resource for management students as well. Keep it up!',
        rating: 5,
      }
    ];
  });

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', branch: '', message: '', rating: 5 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Manual Scroll
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Continuous Auto-Scroll Loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId: number;

    const animate = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += 1; // Consistent smooth flow

        // Instant Reset when halfway (infinite loop illusion)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, reviews]);

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.message) return;
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('studentReviews', JSON.stringify(updatedReviews));
    setNewReview({ name: '', branch: '', message: '', rating: 5 });
    setIsReviewOpen(false);
  };


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
    'Find internships & job opportunities',
    'Calculate CGPA instantly',
    'Connect with fellow students',
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
      <section className="relative pt-6 pb-20 lg:pb-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        {/* ... (Kept as is, simplified for replacement matching if needed, but I'll target specific blocks) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* ... content ... */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                <GraduationCap className="h-4 w-4" />
                Your Academic Success Partner
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                Your One-Stop
                <span className="block bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">Academic Platform</span>
              </h1>

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
                  className="h-12 px-6 sm:px-8 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 font-medium flex-shrink-0"
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

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AnimatedCounter {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white dark:bg-card rounded-3xl shadow-xl border border-gray-100 dark:border-border p-8 md:p-12 relative overflow-hidden">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
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
                    <div className="h-full p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.gradient} shadow-lg ring-4 ring-white dark:ring-gray-900`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
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

      {/* Testimonials & Reviews */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Professional Container Box */}
          <div className="bg-white dark:bg-card rounded-3xl shadow-xl border border-gray-100 dark:border-border p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  What Students Say
                </h2>
                <p className="text-muted-foreground">
                  Real feedback from our community
                </p>
              </div>

              <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg transition-all">
                    <MessageSquarePlus className="h-4 w-4" />
                    Submit Your Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Share Your Experience</DialogTitle>
                    <DialogDescription>
                      Tell us how College Study Hub helped you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="branch">Branch (Optional)</Label>
                      <Input
                        id="branch"
                        value={newReview.branch}
                        onChange={(e) => setNewReview({ ...newReview, branch: e.target.value })}
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-6 w-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Review</Label>
                      <Textarea
                        id="message"
                        value={newReview.message}
                        onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                        placeholder="Write your review here..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitReview}>Submit Review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Carousel Area */}
            <div
              className="relative group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >

              {/* Left Arrow */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 text-foreground hover:scale-110 transition-transform hidden md:block"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[...reviews, ...reviews].map((review, idx) => (
                  <div
                    key={idx}
                    className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-yellow-50/50 dark:bg-gray-800/50 border border-yellow-200 dark:border-yellow-900/30 rounded-xl p-6 flex-shrink-0 snap-center hover:shadow-lg transition-all duration-300 relative group/card"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed min-h-[60px]">
                      "{review.message}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.branch}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 text-foreground hover:scale-110 transition-transform hidden md:block"
                aria-label="Scroll Right"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
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

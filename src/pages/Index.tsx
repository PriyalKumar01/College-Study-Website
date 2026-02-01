import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, UserCheck, TrendingUp, Users, Award, 
  GraduationCap, Star, ArrowRight, CheckCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedCounter from '@/components/AnimatedCounter';
import AuthModal from '@/components/AuthModal';
import CookieConsent from '@/components/CookieConsent';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [hasShownScrollPopup, setHasShownScrollPopup] = useState(false);
  const [hasClosedInitialPopup, setHasClosedInitialPopup] = useState(false);
  const scrollListenerRef = useRef<boolean>(false);

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

  // Handle scroll-based popup (show once after closing initial popup)
  useEffect(() => {
    if (user) return;
    if (!hasClosedInitialPopup) return;
    if (hasShownScrollPopup) return;
    if (scrollListenerRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 400; // Show after scrolling 400px
      
      if (scrollY > scrollThreshold && !hasShownScrollPopup) {
        setAuthMode('signup');
        setShowAuthModal(true);
        setHasShownScrollPopup(true);
        sessionStorage.setItem('hasShownScrollPopup', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    scrollListenerRef.current = true;
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, hasClosedInitialPopup, hasShownScrollPopup]);

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

  const features = [
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: 'Premium Notes',
      description: 'Access thousands of quality notes for 1st-4th semester.',
      href: '/notes',
    },
    {
      icon: <Briefcase className="h-7 w-7" />,
      title: 'Opportunities',
      description: 'Explore internships, jobs, scholarships, and hackathons.',
      href: '/opportunities',
    },
    {
      icon: <UserCheck className="h-7 w-7" />,
      title: 'CGPA Calculator',
      description: 'Calculate your semester and overall CGPA easily.',
      href: '/cgpa-calculator',
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: 'AI Tools',
      description: 'Access useful AI tools to enhance learning.',
      href: '/useful-ai-tools',
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
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={openAuth} />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthClose} 
        defaultMode={authMode}
      />

      {/* Cookie Consent */}
      <CookieConsent />
      
      {/* Hero Section - Clean & Professional */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                <span className="block text-primary">Academic Platform</span>
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
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white font-medium"
                  onClick={() => user ? navigate("/dashboard") : openAuth('signup')}
                >
                  {user ? 'Go to Dashboard' : 'Get Started Free'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border-gray-300 font-medium"
                  onClick={() => navigate("/notes")}
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for students.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  onClick={() => navigate(feature.href)} 
                  className="cursor-pointer group"
                >
                  <Card className="h-full border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Students Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from our community members
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base text-foreground/80 italic">
                      "{testimonial.message}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.branch}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Boost Your Academic Success?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of students who are already benefiting from our comprehensive platform.
            </p>
            
            <Button 
              size="lg"
              className="h-12 px-8 bg-white text-gray-900 hover:bg-gray-100 font-medium"
              onClick={() => user ? navigate("/dashboard") : openAuth('signup')}
            >
              {user ? "Continue to Dashboard" : "Get Started Now - It's Free!"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img 
                src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png" 
                alt="College Study Hub" 
                className="h-12 mb-4"
              />
              <p className="text-muted-foreground mb-4 max-w-sm">
                Empowering students with comprehensive academic resources and career development tools.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ by <strong>Priyal Kumar</strong> for the student community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate("/notes")}>Notes</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate("/opportunities")}>Opportunities</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate("/cgpa-calculator")}>CGPA Calculator</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate("/about")}>About</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>priyalkumar06@gmail.com</p>
                <p>For support and inquiries</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 College Study Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Briefcase, UserCheck, TrendingUp, Users, Award, 
  GraduationCap, Star, ArrowRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedCounter from '@/components/AnimatedCounter';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Premium Notes',
      description: 'Access thousands of quality notes for 1st-4th semester with sign-in protection.',
      href: '/notes',
      gradient: 'bg-gradient-primary',
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Opportunities',
      description: 'Explore internships, jobs, scholarships, hackathons and competitions.',
      href: '/opportunities',
      gradient: 'bg-warning',
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: 'CGPA Calculator',
      description: 'Calculate your semester and overall CGPA with our advanced calculator.',
      href: '/cgpa-calculator',
      gradient: 'bg-accent',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'AI Tools',
      description: 'Access useful AI tools for students to enhance learning and productivity.',
      href: '/useful-ai-tools',
      gradient: 'bg-gradient-secondary',
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
      title: 'College Covered',
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar onOpenAuth={openAuth} />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultMode={authMode}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🎓 Your Academic Success Partner
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your One-Stop
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Academic Platform
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Empowering HBTU students with comprehensive notes sharing, resume building, 
                and academic resources. Join thousands of students already benefiting from our platform.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="btn-hero text-lg px-8 py-6 w-full sm:w-auto"
                  onClick={() => navigate("/dashboard")}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 w-full sm:w-auto border-2"
                  onClick={() => navigate("/learning-platforms")}
                >
                  Explore Integrated Platforms
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6"
              >
                <Button
                  size="lg"
                  className="bg-success hover:bg-success/90 text-white text-lg px-8 py-6 w-full sm:w-auto"
                  onClick={() => navigate("/notes-contributors")}
                >
                  Notes Contributor's list
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative float-animation">
                <img 
                  src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png" 
                  alt="College Study Hub" 
                  className="w-full max-w-md mx-auto pulse-glow"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands of Students
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our growing community of successful students
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools and resources designed specifically for HBTU students 
              to excel in their academic journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div onClick={() => navigate(feature.href)} className="cursor-pointer">
                  <Card className={`feature-card h-full group ${
                    feature.title === 'Premium Notes' || feature.title === 'Opportunities'
                      ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border-primary/20 hover:border-primary/30 shadow-lg'
                      : ''
                  }`}>
                    <CardHeader>
                      <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <CardTitle className={`text-xl mb-2 ${
                        feature.title === 'Premium Notes' || feature.title === 'Opportunities'
                          ? 'text-primary font-bold'
                          : ''
                      }`}>{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to unlock your academic potential
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-10 h-10" />,
                title: 'Access Notes Instantly',
                description: 'Browse semester-wise notes, assignments, and curated study materials - no login required.',
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: 'Explore & Learn',
                description: 'Utilize CGPA calculators, previous year papers, AI tools, and placement resources.',
              },
              {
                icon: <Briefcase className="w-10 h-10" />,
                title: 'Discover Opportunities',
                description: 'Find internships, scholarships, hackathons, and career guidance to excel beyond academics.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from our community members
            </p>
          </motion.div>
          
          {/* Auto-scrolling testimonials */}
          <div className="relative">
            <motion.div 
              className="flex gap-6"
              animate={{
                x: [0, -1800],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Repeat testimonials 3 times for seamless loop */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[350px]"
                >
                  <Card className="gradient-card h-full">
                    <CardHeader>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-base italic">
                        "{testimonial.message}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.branch}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Boost Your Academic Success?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who are already benefiting from our comprehensive platform.
            </p>
            
            <Button 
              variant="secondary" 
              className="text-lg px-8 py-3"
              onClick={() => navigate("/dashboard")}
            >
              {user ? "Continue to Dashboard" : "Get Started Now - It's Free!"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/95 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img 
                src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png" 
                alt="College Study Hub" 
                className="h-12 mb-4"
              />
              <p className="text-muted-foreground mb-4">
                Empowering students with comprehensive academic resources and career development tools.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ by <strong>Priyal Kumar</strong> for the student community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <div className="block text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => navigate("/notes")}>Notes</div>
                <div className="block text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => navigate("/opportunities")}>Opportunities</div>
                <div className="block text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => navigate("/cgpa-calculator")}>CGPA Calculator</div>
                <div className="block text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => navigate("/about")}>About</div>
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
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 College Study Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Heart, 
  Users, 
  BookOpen, 
  Award, 
  Briefcase, 
  FileText, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Compass, 
  ShieldCheck,
  Calendar,
  MessageSquare,
  Star,
  Laptop,
  Code,
  DollarSign,
  TrendingUp,
  Building2,
  Calculator
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Smooth counting animation helper component for the stats widget
const AboutStatCounterInline = ({ targetVal, decimals = 0, isK = false }: { targetVal: number; decimals?: number; isK?: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s count
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = progress * (2 - progress); // easeOutQuad
      setCount(ease * targetVal);

      if (step >= steps) {
        clearInterval(interval);
        setCount(targetVal);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [targetVal]);

  if (isK) {
    return <span>{count.toFixed(2)}k+</span>;
  }
  return <span>{count.toFixed(decimals)}</span>;
};

const About = () => {
  // 12 Curated platform serves representing the actual and newly added modules
  const platformServes = [
    { 
      title: 'Semester Notes & PYQs', 
      desc: 'High-quality, branch-wise notes and official previous year question papers structured by semesters.', 
      icon: <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />, 
      iconBg: 'bg-blue-50 dark:bg-blue-950/40' 
    },
    { 
      title: 'Lab Files & Practicals', 
      desc: 'Complete practical files, lab codes, experiment sheets, and guides to clear lab examinations.', 
      icon: <Laptop className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />, 
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40' 
    },
    { 
      title: 'Study Guides', 
      desc: 'Comprehensive roadmaps, cheat sheets, and subject summaries to speed up revision.', 
      icon: <Compass className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />, 
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40' 
    },
    { 
      title: 'Important Questions', 
      desc: 'Curated lists of repeating topics and high-weightage questions compiled by academic experts.', 
      icon: <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />, 
      iconBg: 'bg-purple-50 dark:bg-purple-950/40' 
    },
    { 
      title: 'Scholarships Updates', 
      desc: 'Real-time verified updates on national, global, and corporate scholarship programs.', 
      icon: <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />, 
      iconBg: 'bg-amber-50 dark:bg-amber-950/40' 
    },
    { 
      title: 'Jobs & Hackathons', 
      desc: 'Latest tech openings, software internships, coding hackathons, and innovation contest alerts.', 
      icon: <Rocket className="h-5 w-5 text-rose-600 dark:text-rose-400" />, 
      iconBg: 'bg-rose-50 dark:bg-rose-950/40' 
    },
    { 
      title: 'Curated Platform Links', 
      desc: 'Handpicked external links, online learning directories, and top developer portals.', 
      icon: <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400" />, 
      iconBg: 'bg-teal-50 dark:bg-teal-950/40' 
    },
    { 
      title: 'ATS Resume Templates', 
      desc: 'ATS-friendly resume templates with an optimization guide to bypass recruiter filters.', 
      icon: <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />, 
      iconBg: 'bg-cyan-50 dark:bg-cyan-950/40' 
    },
    { 
      title: 'Coding & DSA Materials', 
      desc: 'Syllabus-oriented coding resources, DSA sheets, sheet links, and algorithm crash notes.', 
      icon: <Code className="h-5 w-5 text-violet-600 dark:text-violet-400" />, 
      iconBg: 'bg-violet-50 dark:bg-violet-950/40' 
    },
    { 
      title: 'Placement Resources', 
      desc: 'Company-specific recruitment papers, HR questions, and aptitude test preparation files.', 
      icon: <TrendingUp className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />, 
      iconBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40' 
    },
    { 
      title: '130+ MNC Career Directory', 
      desc: 'Career site URLs of 130+ top corporations in one list, avoiding tedious manual bookmarks.', 
      icon: <Building2 className="h-5 w-5 text-sky-600 dark:text-sky-400" />, 
      iconBg: 'bg-sky-50 dark:bg-sky-950/40' 
    },
    { 
      title: 'CGPA Calculator', 
      desc: 'Accurate, custom-tailored SGPA and CGPA calculators supporting major university standards.', 
      icon: <Calculator className="h-5 w-5 text-lime-600 dark:text-lime-400" />, 
      iconBg: 'bg-lime-50 dark:bg-lime-950/40' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-16">
        
        {/* 1. Hero Header (Split layout Logo left, Intro right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white dark:bg-slate-900/20 border border-slate-200/50 dark:border-blue-900/10 rounded-3xl p-6 md:p-10 shadow-sm">
          {/* Left Side: Simple Large Logo (no background container or floating animation, just like home page) */}
          <div className="lg:col-span-5 flex justify-center w-full relative">
            {/* Simple soft glow behind logo similar to home page */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <img
              src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
              alt="College Study Logo"
              className="w-64 h-auto md:w-80 relative z-10 drop-shadow-xl"
            />
          </div>

          {/* Right Side: Introduction */}
          <div className="lg:col-span-7 text-left space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center py-1 px-3 rounded-full bg-blue-100/60 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black tracking-widest border border-blue-200/50 dark:border-blue-900/30 shadow-sm uppercase">
                <Sparkles className="w-3 h-3 mr-1.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                About College Study
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white leading-tight tracking-tight">
                Making Quality Education{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-650 to-purple-650 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  Easily Accessible
                </span>
              </h1>
              <div className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-350 leading-relaxed">
                <p>
                  College Study is a student-focused academic platform designed to simplify access to high-quality learning materials. Launched with a mission to help students learn better and prepare smarter, the platform centralizes essential academic resources so students don't have to waste hours searching across fragmented sources.
                </p>
                <p>
                  Our goal is to build an organized, reliable, and user-friendly portal where everything from study guides to placement resources is available in just a few clicks, empowering students throughout their academic and professional journeys.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. Need/Why Created Section (Split layout - Left Content, Right Features Mockup & Google Stars) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Why Created */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-blue-900/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between text-left h-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 mb-4 font-black text-[10px] tracking-wider uppercase">
                <Heart className="h-3.5 w-3.5" /> The Purpose
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-5">
                Why Was College Study Created?
              </h2>
              <div className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-350 leading-relaxed">
                <p>
                  Many college students struggle to find reliable class notes, previous year papers, and practical files, especially when semesters are drawing to a close. Important study materials end up scattered across disorganized WhatsApp threads, private Google Drives, Telegram channels, and local drives.
                </p>
                <p>
                  College Study was created to solve this fragmentation by providing a structured, centralized hub. Here, students can retrieve verified resources in seconds rather than wasting hours asking peers or searching blindly.
                </p>
                <p>
                  By taking the friction out of searching for academic resources, we allow learners to focus 100% on what actually matters: studying, comprehending, and preparing for future career success.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Illustration & Stats Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Generated Feature Image */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-lg group bg-white dark:bg-slate-900">
              <img
                src="/lovable-uploads/college_study_features_mockup.png"
                alt="College Study Platform Features"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Google-Style Rating & User Widget */}
            <div className="grid grid-cols-2 gap-4">
              {/* Rating Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                <div className="flex items-baseline gap-0.5 text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-1">
                  <AboutStatCounterInline targetVal={4.9} decimals={1} />
                  <span className="text-xs text-slate-400 font-bold">/5</span>
                </div>
                
                {/* 5 Stars widget (4.9 filled) */}
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  ))}
                  <div className="relative">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-none" />
                    <div className="absolute top-0 left-0 overflow-hidden w-[90%]">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    </div>
                  </div>
                </div>
                
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Community Rating</span>
              </div>

              {/* Users Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-400 dark:to-indigo-400 mb-1.5">
                  <AboutStatCounterInline targetVal={2.25} isK={true} />
                </div>
                
                <div className="flex items-center gap-1.5 text-green-500 mb-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-wider">Registered</span>
                </div>

                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student Base</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. What Our Platform Serves */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              What Our Platform Serves
            </h2>
            <p className="text-xs md:text-sm font-semibold text-slate-505 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              We provide a comprehensive academic ecosystem structured to serve every dimension of a college student's life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {platformServes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 shrink-0`}>
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-505 dark:text-slate-450 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Vision & Contribution Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-4">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-left space-y-4 relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/45 flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2">Our Vision</h3>
              <p className="text-sm font-semibold text-slate-505 dark:text-slate-400 leading-relaxed italic">
                "To become one of the most trusted student-driven academic resource platforms, helping college students learn, collaborate, and succeed throughout their academic journey."
              </p>
            </div>
          </motion.div>

          {/* Contribution Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-left space-y-4 relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/45 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-450" />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2">Contribution Policy</h3>
              <p className="text-sm font-semibold text-slate-505 dark:text-slate-400 leading-relaxed">
                College Study serves as a platform for sharing educational resources. Students who wish to contribute study material can contact us directly. Contributors are credited appropriately whenever their resources are published.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 5. Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 text-left">
            {/* Left Side: Photo Offset Frame */}
            <div className="shrink-0 w-full md:w-auto">
              <a 
                href="https://priyalkumar01.github.io/priyalkumar.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block group max-w-xs mx-auto"
              >
                {/* Glow behind frame */}
                <div className="absolute -inset-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[28px] blur-xl opacity-35 group-hover:opacity-75 transition duration-500"></div>
                
                {/* Dual offset border frame */}
                <div className="relative overflow-hidden rounded-[24px] border-4 border-white dark:border-slate-800 bg-slate-955 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-20 pointer-events-none"></div>
                  <img
                    src="https://priyalkumar01.github.io/priyalkumar.github.io/images/bg_1.png"
                    alt="Priyal Kumar"
                    className="w-56 h-72 md:w-60 md:h-76 object-cover object-center relative z-10 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Portfolio Badge overlay */}
                  <div className="absolute bottom-3 right-3 z-30 px-3 py-1 bg-black/75 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-black text-white flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Portfolio <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
              </a>
            </div>

            {/* Right Side: Bio & Contacts */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                  Founder & Lead Developer
                </span>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1">
                  Priyal Kumar
                </h3>
                <p className="text-sm font-bold text-slate-505 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  CSE'27 @ HBTU Kanpur
                </p>
              </div>

              {/* Multi-paragraph bio details */}
              <div className="space-y-4 text-sm font-semibold text-slate-655 dark:text-slate-350 leading-relaxed">
                <p>
                  College Study was founded by Priyal Kumar, with a vision to simplify access to academic resources for college students.
                </p>
                <p>
                  Having experienced firsthand the challenges students face while searching for notes, previous year papers, practical files, and other study materials scattered across multiple platforms, he decided to build a centralized solution that makes learning resources accessible, organized, and reliable.
                </p>
                <p>
                  Under his leadership, College Study has grown into a student-driven academic platform trusted by thousands of learners. The platform continues to expand with new features, resources, and improvements aimed at enhancing the overall student learning experience.
                </p>
                <p>
                  His goal is to leverage technology to create practical solutions that help students save time, learn efficiently, and achieve academic success.
                </p>
              </div>

              {/* Connect buttons */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Connect With Me
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <a href="mailto:priyalkumar06@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
                    <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Email
                  </a>
                  <a href="https://www.linkedin.com/in/priyal-kumar-29b26529a/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
                    <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-450" />
                    LinkedIn
                  </a>
                  <a href="https://github.com/PriyalKumar01" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
                    <Github className="w-4 h-4 text-slate-800 dark:text-white" />
                    GitHub
                  </a>
                  <a href="https://priyalkumar01.github.io/priyalkumar.github.io/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-450" />
                    Portfolio Website
                  </a>
                  <a href="https://wa.me/918957221543?text=Hi%20Priyal,%20I%20need%2520help%252520regarding%252520College%252520Study%25252520Hub." target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    WhatsApp
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-450 font-bold">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Kanpur, Uttar Pradesh, India
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6. Closing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto py-2"
        >
          <div className="bg-slate-100/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200/40 dark:border-slate-850">
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-extrabold italic leading-relaxed">
              "Thank you for being a part of the College Study community. Together, we are making learning simpler, faster, and more accessible for every student."
            </p>
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default About;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Info,
  Sparkles,
  Award,
  PlayCircle,
  GraduationCap,
  FileText,
  AlertTriangle,
  ChevronDown,
  BookOpen,
  Compass,
  Search
} from 'lucide-react';
import { GATE_QUIZ_DATA } from '@/data/gateQuizzesData';
import { GATE_NOTES_DATA, COMMON_GATE_NOTES } from '@/data/gateNotesData';
import { GENERAL_APTITUDE_QUIZ_DATA } from '@/data/gateAptitudeQuizzesData';

const APTITUDE_CATEGORIES: Record<string, string[]> = {
  "Quantitative Aptitude": [
    "Numbers", "LCM and HCF", "Ratio, Proportion", "Average", "Problem on Age", "Percentages",
    "Profit and Loss", "Mixture and Alligations", "Simple Interest", "Compound Interest",
    "Time, Speed, and Distance", "Trains, Boats, and Streams", "Race", "Work and Wages",
    "Pipes and Cistern", "Algebra", "Mensuration 2D", "Mensuration 3D", "Geometry",
    "Trigonometry & Height and Distances", "Progressions", "Logarithms", "Permutation and Combination",
    "Probability", "Clocks", "Calendars", "Simplification and Approximation", "Data Interpretation"
  ],
  "Logical Reasoning": [
    "Number Series", "Letter and Symbol Series", "Verbal Classification", "Analogies",
    "Logical Problems", "Course of Action", "Statement and Conclusion", "Theme Detection",
    "Blood Relations", "Directions", "Statement and Argument", "Logical Deduction",
    "Letter Series", "Coding Decoding", "Statement and Assumptions", "Logical Venn Diagram"
  ],
  "Verbal Ability": [
    "Spotting Errors", "Synonyms", "Antonyms", "Selecting Words", "Spellings",
    "Sentence Formation", "Ordering of Words", "Sentence Correction", "Sentence Improvement",
    "Completing Statements", "Para Jumbles", "Paragraph Formation", "Cloze Test",
    "Comprehension", "One Word Substitutes", "Idioms and Phrases", "Change of Voice",
    "Change of Speech", "Verbal Analogies", "Articles", "Preposition", "Adjectives"
  ],
  "Rarely Asked Topics in Aptitude Exams": [
    "Artificial Language", "Matching Definitions", "Making Judgments", "Logical Games",
    "Verification of the Truth of the Statement", "Assertion and Reason"
  ]
};


const BRANCH_OPTIONS = [
  { label: 'CSE', value: 'CSE' },
  { label: 'ECE', value: 'ECE' },
  { label: 'EE', value: 'EE' },
  { label: 'ME', value: 'ME' },
  { label: 'CE', value: 'CE' },
  { label: 'IN', value: 'IN' },
  { label: 'DA', value: 'DA' },
];

const COLLEGE_OPTIONS = [
  'HBTU Kanpur',
  'AITH Kanpur',
  'IIT Kanpur',
  'IIT Delhi',
  'IIT Bombay',
  'IIT Madras',
  'IIT Kharagpur',
  'IIT Roorkee',
  'IIT Guwahati',
  'IIT Hyderabad',
  'IIT BHU Varanasi',
  'NIT Trichy',
  'NIT Surathkal',
  'NIT Rourkela',
  'NIT Warangal',
  'MNNIT Allahabad',
  'VNIT Nagpur',
  'BITS Pilani',
  'DTU Delhi',
  'NSUT Delhi',
  'IIIT Allahabad',
  'IIIT Hyderabad',
  'IIIT Bangalore',
  'RMLAU Ayodhya',
  'RMLAU Lucknow',
  'Jadavpur University',
  'Anna University',
  'VIT Vellore',
  'COEP Pune',
  'VJTI Mumbai',
  'Other'
];

const PREPARATION_YEARS = Array.from({ length: 24 }, (_, i) => {
  const y = String(2027 + i);
  return { label: y, value: y };
});

const GateStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Registration modal states
  const [showRegModal, setShowRegModal] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  const [formData, setFormData] = useState({
    college: '',
    otherCollege: '',
    preparingFor: '',
    year: '',
  });

  const [tcAccepted, setTcAccepted] = useState(false);

  // Selected Branch for content
  const [selectedBranch, setSelectedBranch] = useState('CSE');

  // Attempt History for Mock Tests
  const [attemptsHistory, setAttemptsHistory] = useState<any[]>([]);

  // Accordion collapsed/expanded states (collapsed by default)
  const [isMockTestOpen, setIsMockTestOpen] = useState(false);
  const [isAptitudeQuizzesOpen, setIsAptitudeQuizzesOpen] = useState(false);
  const [isCoreNotesOpen, setIsCoreNotesOpen] = useState(false);
  const [isCommonNotesOpen, setIsCommonNotesOpen] = useState(false);

  // Aptitude Search & Categorization States
  const [aptitudeSearch, setAptitudeSearch] = useState('');
  const [expandedSubCat, setExpandedSubCat] = useState<string | null>('Quantitative Aptitude');

  // Hero Banner Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const CAROUSEL_SLIDES = [
    {
      id: 1,
      bgImage: "/gate_hero_bg_1.png",
      header: "TARGETING GATE 2027, 2028, OR 2029?",
      title: "All Structured Materials in One Place",
      subtitle: "Get access to professionally organized notes, topic-wise practice quizzes, and full-length exam papers - absolutely free!",
      ctaText: "Start Preparation Now",
      action: () => {
        setIsAptitudeQuizzesOpen(true);
        const el = document.getElementById('aptitude-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      ctaBg: "bg-purple-600 hover:bg-purple-500",
      branches: ["CSE", "DA", "ECE", "EE", "ME", "CE", "IN"],
      author: "By - Priyal Kumar"
    },
    {
      id: 2,
      bgGradient: "from-amber-600/90 to-red-800/95",
      header: "100% FREE STUDY PORTAL",
      title: "Boost Your Rank with Handpicked Resources",
      subtitle: "Handwritten class notes, reference textbooks, formula sheets, and solved papers curated for your top score.",
      ctaText: "Explore Subjects",
      action: () => {
        setIsCoreNotesOpen(true);
        const el = document.getElementById('subjects-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      ctaBg: "bg-amber-600 hover:bg-amber-500",
      branches: ["Textbooks", "Handwritten Notes", "Formula Sheets", "Interactive Quizzes"],
      author: "By - Priyal Kumar"
    },
    {
      id: 3,
      bgGradient: "from-blue-600/90 to-indigo-900/95",
      header: "INTERACTIVE MOCK TESTS",
      title: "Simulate the Real GATE Exam",
      subtitle: "Practice full-length papers under exam conditions with interactive question palettes, timers, and accuracy metrics.",
      ctaText: "Practice Now",
      action: () => {
        setIsMockTestOpen(true);
        const el = document.getElementById('mock-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      ctaBg: "bg-blue-600 hover:bg-blue-500",
      branches: ["CSE PYQs", "DA PYQs", "Live Timer", "Detailed Solutions"],
      author: "By - Priyal Kumar"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  // Check access in Supabase
  const checkGateAccess = async () => {
    if (!user) {
      setCheckingAccess(false);
      return;
    }
    setCheckingAccess(true);
    try {
      // Check if gate_study access exists in premium_purchases table
      const { data, error } = await supabase
        .from('premium_purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('plan', 'gate_study')
        .in('payment_status', ['completed', 'free'])
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsRegistered(true);
        setShowRegModal(false);
        // Fetch target branch from profiles to set active tab
        const { data: profile } = await supabase
          .from('profiles')
          .select('branch')
          .eq('id', user.id)
          .maybeSingle();
        if (profile?.branch) {
          setSelectedBranch(profile.branch);
        }
      } else {
        setIsRegistered(false);
        setShowRegModal(true);
      }
    } catch (e) {
      console.error('Error checking GATE access:', e);
    } finally {
      setCheckingAccess(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      checkGateAccess();
    }
  }, [user?.id]);

  // Load attempts history
  const loadAttemptsHistory = () => {
    const historyStr = localStorage.getItem('gate_attempts_history');
    if (historyStr) {
      try {
        setAttemptsHistory(JSON.parse(historyStr));
      } catch (e) {}
    }
  };

  useEffect(() => {
    loadAttemptsHistory();
    const handleStorageChange = () => {
      loadAttemptsHistory();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadAttemptsHistory);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadAttemptsHistory);
    };
  }, []);

  const handleBranchChange = (val: string) => {
    setSelectedBranch(val);
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (!formData.college || !formData.preparingFor || !formData.year) {
      toast({
        title: 'Validation Error',
        description: 'Please fill out all mandatory fields.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.college === 'Other' && !formData.otherCollege) {
      toast({
        title: 'Validation Error',
        description: 'Please specify your college name.',
        variant: 'destructive',
      });
      return;
    }

    if (!tcAccepted) {
      toast({
        title: 'Terms & Conditions',
        description: 'You must accept the Terms & Conditions to proceed.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setCheckingAccess(true);
      const targetCollege = formData.college === 'Other' ? formData.otherCollege : formData.college;

      // 1. Update college, branch, and target year in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          college: targetCollege,
          branch: formData.preparingFor,
          year: formData.year,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Insert access record in premium_purchases table for 'gate_study' plan
      const { error: purchaseError } = await supabase
        .from('premium_purchases')
        .insert({
          user_id: user.id,
          user_email: user.email?.toLowerCase(),
          plan: 'gate_study',
          amount_paid: 0,
          original_amount: 0,
          payment_status: 'free',
          razorpay_payment_id: 'gate_onboarding',
        });

      if (purchaseError) throw purchaseError;

      setIsRegistered(true);
      setShowRegModal(false);
      setSelectedBranch(formData.preparingFor);

      toast({
        title: 'Registration Successful!',
        description: `Welcome to the GATE Prep Portal. Accessing notes for ${formData.preparingFor}.`,
      });
    } catch (err: any) {
      toast({
        title: 'Registration Failed',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setCheckingAccess(false);
    }
  };

  // Helper for downloads
  const smartDownload = (url: string, title: string) => {
    if (url === '#') {
      toast({
        title: 'Material Coming Soon',
        description: `Subject materials for "${title}" are being uploaded. Please check back shortly.`,
      });
      return;
    }
    window.open(url, '_blank');
  };

  const viewInBrowser = (url: string) => {
    if (url === '#') {
      toast({
        title: 'Material Coming Soon',
        description: 'Online viewing will be available once files are uploaded.',
      });
      return;
    }
    window.open(url, '_blank');
  };

  // Fetch quizzes for active branch
  const activeBranchQuizzes = GATE_QUIZ_DATA[selectedBranch] || {};
  
  // Sort quizzes descending by year so "2026 Set-1" is first
  const quizKeys = Object.keys(activeBranchQuizzes).sort((a, b) => {
    const yearA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const yearB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    if (yearB !== yearA) return yearB - yearA;
    return b.localeCompare(a); // Fallback to set sets in descending order (e.g. Set 2 first)
  });

  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verifying student credentials...</p>
        </div>
      </div>
    );
  }

  if (!isRegistered && showRegModal) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white dark:selection:bg-purple-500 dark:selection:text-white transition-colors duration-200">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex items-center justify-center">
          <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl rounded-2xl flex flex-col md:flex-row h-auto min-h-[460px]">
            {/* Column 1: Disclaimer & Logo Left Sidebar Panel */}
            <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-900 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 shrink-0">
              <div className="w-full bg-gradient-to-b from-sky-100/70 via-sky-50/20 to-transparent dark:from-sky-950/40 dark:via-sky-950/5 dark:to-transparent flex items-center justify-start p-4 pb-6 -mx-6 -mt-6 rounded-tl-2xl">
                <img
                  src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                  alt="College Study Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center py-4">
                <div className="space-y-1">
                  <span className="block text-3xl font-serif font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-slate-100 dark:to-purple-400 leading-none">
                    College Study
                  </span>
                  <span className="block text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase tracking-[0.2em] leading-none pt-2">
                    Your Academic Success Partner
                  </span>
                  
                  <div className="flex items-center gap-2 py-3 w-full">
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-455 dark:text-slate-550">presents</span>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                  </div>

                  <span className="block text-2xl font-black tracking-tight text-slate-850 dark:text-slate-100 leading-tight">
                    GATE Study Section
                  </span>
                  <span className="block text-xs font-extrabold text-purple-600 dark:text-purple-450 uppercase tracking-[0.15em] leading-none pt-2">
                    Your Gateway to Success
                  </span>
                </div>
              </div>

              <div className="border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded-xl space-y-1.5">
                <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">Important Disclaimer:</span>
                <p className="text-[10px] leading-relaxed text-amber-800 dark:text-amber-300/80">
                  Access to these premium resources is a privilege. If any submitted registration information is found to be false, inaccurate, or fraudulent, your access will be revoked immediately without notice.
                </p>
              </div>
            </div>

            {/* Right Main Pane: Form and Terms side-by-side grid */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                    Student Verification Onboarding
                  </h1>
                  <p className="text-[10.5px] text-slate-505 dark:text-slate-400">
                    Please specify your academic details to request immediate access.
                  </p>
                </div>

                <form onSubmit={handleRegSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <Label htmlFor="college" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your College *</Label>
                        <Select
                          value={formData.college}
                          onValueChange={(val) => handleInputChange('college', val)}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-9 text-xs focus:ring-blue-600">
                            <SelectValue placeholder="Select College" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-905 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs max-h-56 overflow-y-auto">
                            {COLLEGE_OPTIONS.map((col) => (
                              <SelectItem key={col} value={col}>
                                {col === 'Other' ? 'Other (Specify below)' : col}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.college === 'Other' && (
                        <div className="space-y-1">
                          <Label htmlFor="otherCollege" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Specify College Name *</Label>
                          <Input
                            id="otherCollege"
                            placeholder="Enter college name"
                            value={formData.otherCollege}
                            onChange={(e) => handleInputChange('otherCollege', e.target.value)}
                            className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-9 text-xs focus-visible:ring-purple-600"
                            required
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <Label htmlFor="preparingFor" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Preparing for GATE (Branch) *</Label>
                        <Select
                          value={formData.preparingFor}
                          onValueChange={(val) => handleInputChange('preparingFor', val)}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-9 text-xs focus:ring-blue-600">
                            <SelectValue placeholder="Select Target Paper" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-905 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs">
                            {BRANCH_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="year" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Year *</Label>
                        <Select
                          value={formData.year}
                          onValueChange={(val) => handleInputChange('year', val)}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-9 text-xs">
                            <SelectValue placeholder="Select Exam Year" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-905 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs">
                            {PREPARATION_YEARS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950/80 rounded-xl p-4 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 space-y-2 shadow-inner">
                      <p className="font-bold text-slate-900 dark:text-slate-305 text-xs">Terms & Conditions</p>
                      <p>
                        <strong>Curated Resources:</strong> Materials are curated from public internet and Telegram sources. Credit belongs strictly to respective owners.
                      </p>
                      <p>
                        <strong>Ethical Use:</strong> Built for social welfare. You pledge not to sell, commercialize, or misuse any content.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={tcAccepted}
                        onCheckedChange={(checked) => setTcAccepted(checked === true)}
                        className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white mt-0.5 shrink-0"
                      />
                      <Label htmlFor="terms" className="text-[10px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 select-none cursor-pointer leading-normal">
                        I agree to the Terms & Conditions and understand the disclaimer.
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold h-9 text-xs shadow-lg"
                    >
                      Accept & Enter
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white dark:selection:bg-purple-500 dark:selection:text-white transition-colors duration-200">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-4 pb-4 px-4 sm:px-8 transition-colors duration-200">
        <div className="max-w-5xl mx-auto flex items-start gap-3 flex-col relative w-full">
          <button
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-slate-505 dark:text-slate-400 hover:text-slate-955 dark:hover:text-slate-100 transition-colors mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Notes
          </button>

          {/* Branch Switcher Dropdown (Top Right) */}
          <div className="absolute top-0 right-0 z-10 flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Active Branch:</span>
            <Select value={selectedBranch} onValueChange={handleBranchChange}>
              <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 h-8 text-xs font-bold w-32 focus:ring-blue-600">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                {BRANCH_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            {/* Premium 3D Gold Coin Logo (Double-sided, elegant rotating) */}
            <div className="group [perspective:1000px] w-12 h-12 flex-shrink-0 cursor-pointer select-none">
              <div className="relative w-full h-full [transform-style:preserve-3d] animate-slow-coin">
                {/* Front Side: Coin Image (Clipped corners to hide checkerboard background) */}
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden border border-amber-500/20 shadow-md bg-transparent [backface-visibility:hidden]">
                  <img
                    src="/gate_study_coin.png"
                    alt="GATE Study Coin Front"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                {/* Back Side: Mirror Flipped Coin Image (Creates 3D double-sided coin effect!) */}
                <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden border border-amber-500/20 shadow-md bg-transparent [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <img
                    src="/gate_study_coin.png"
                    alt="GATE Study Coin Back"
                    className="w-full h-full object-cover scale-110 transform -scale-x-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-slate-100 dark:via-slate-200 dark:to-purple-300 leading-tight">
                GATE Study
              </h1>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest mt-1">Your gate to success</p>
            </div>
          </div>

          {/* Beautiful Auto-Scrolling Banner Carousel */}
          <div className="w-full relative h-[260px] md:h-[220px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md mt-4 bg-slate-900 select-none">
            <div 
              className="w-full h-full flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {CAROUSEL_SLIDES.map((slide) => (
                <div 
                  key={slide.id}
                  className="w-full h-full shrink-0 relative flex flex-col justify-center p-6 md:p-8 text-white"
                  style={{
                    backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Backdrop overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgImage ? 'from-slate-950 via-slate-950/85 to-transparent' : slide.bgGradient} z-0`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* Header */}
                    <div className="space-y-1 md:space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 dark:text-purple-300">
                        {slide.header}
                      </span>
                      <h2 className="text-lg md:text-2xl font-serif font-extrabold leading-tight tracking-tight max-w-2xl">
                        {slide.title}
                      </h2>
                      <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed hidden sm:block">
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Footer Info & CTA */}
                    <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
                      <div className="space-y-1.5">
                        {/* Branches / Features List */}
                        <div className="flex flex-wrap gap-1.5">
                          {slide.branches.map((b) => (
                            <span 
                              key={b} 
                              className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md border ${slide.badgeColor}`}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        {/* Author Corner */}
                        <span className="text-[10px] font-bold text-slate-400 block italic">
                          {slide.author}
                        </span>
                      </div>

                      <Button
                        onClick={slide.action}
                        className={`h-9 px-5 text-xs font-bold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-white ${slide.ctaBg}`}
                      >
                        {slide.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Founder message block */}
          <div className="mt-4 p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 w-full relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500" />
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-850 dark:text-slate-300">Message from the Founder:</p>
                <p className="text-xs italic leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                  &ldquo;All the content here is curated from various sources which are generally freely available on the internet, telegram, or other platforms. We do not claim credit for third-party files; credit belongs to their respective owners. This portal is built purely for social welfare and educational purposes to assist juniors, and is entirely non-profit. Please use responsibly. Do not sell or misuse these contents.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid - Collapsed state accordion dropdown panels to avoid vertical scrollbar bloat */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6 flex-1 w-full mb-12">
        {/* Accordion Part 1: General Aptitude - Topic-wise Quizzes */}
        <div id="aptitude-section"></div>
        <div className="space-y-3">
          <button
            onClick={() => setIsAptitudeQuizzesOpen(!isAptitudeQuizzesOpen)}
            className="w-full flex items-center justify-between p-5 bg-purple-50/15 dark:bg-purple-950/5 border border-purple-200 dark:border-purple-900/50 rounded-2xl shadow-md shadow-purple-500/5 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500 transition-all duration-300 text-left group relative overflow-hidden"
          >
            {/* Soft background pulse decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 dark:bg-purple-500/2 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800/40 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="h-5 w-5 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    General Aptitude - GATE
                  </h2>
                  <span className="text-[9px] font-extrabold uppercase bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-200/30 dark:border-purple-900/20 px-2.5 py-0.5 rounded-full tracking-wider">
                    Common to all
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Practice topic-wise Quantitative Aptitude, Logical Reasoning, and Verbal quizzes common to all GATE branches.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* Green resource count badge */}
              <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-250/20 dark:border-emerald-900/20 shadow-sm">
                {Object.keys(GENERAL_APTITUDE_QUIZ_DATA).length} Topics Available
              </span>
              <div className="text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors p-1 rounded-full border border-purple-100 dark:border-purple-900/30 bg-white dark:bg-slate-950">
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isAptitudeQuizzesOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isAptitudeQuizzesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md relative mt-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Search and Toggle Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                      <Input
                        type="text"
                        placeholder="Search aptitude topics (e.g., Percentages, Series)..."
                        value={aptitudeSearch}
                        onChange={(e) => setAptitudeSearch(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-purple-600 focus:border-purple-600 focus:outline-none transition-colors text-sm shadow-sm"
                      />
                      {aptitudeSearch && (
                        <button
                          onClick={() => setAptitudeSearch('')}
                          className="absolute right-4 top-3 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-750"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {aptitudeSearch ? (
                    /* Search results grid view */
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider pl-1">
                        Search Results for "{aptitudeSearch}"
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Object.keys(GENERAL_APTITUDE_QUIZ_DATA)
                          .filter((topic) => topic.toLowerCase().includes(aptitudeSearch.toLowerCase()))
                          .map((topic) => {
                            const qList = GENERAL_APTITUDE_QUIZ_DATA[topic] || [];
                            const quizAttempts = attemptsHistory.filter(
                              (h) => h.branch === 'General Aptitude' && h.quizKey === topic
                            );
                            const latestAttempt = quizAttempts.length > 0 ? quizAttempts[quizAttempts.length - 1] : null;
                            const bestAttempt = quizAttempts.length > 0 ? [...quizAttempts].sort((a, b) => b.score - a.score)[0] : null;

                            return (
                              <motion.div
                                key={topic}
                                whileHover={{ scale: 1.01 }}
                                className="border border-slate-250 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 p-5 rounded-xl flex flex-col justify-between gap-4 group hover:border-purple-500/30 transition-all duration-300 shadow-sm"
                              >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                                  <div className="space-y-1.5 flex-1">
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                      {topic}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase">
                                      <span>{qList.length} Questions</span>
                                      <span>•</span>
                                      <span>15 Minutes</span>
                                      <span>•</span>
                                      <span>General Aptitude</span>
                                    </div>
                                  </div>

                                  {latestAttempt && (
                                    <div className="bg-slate-55 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-[10px] text-slate-600 dark:text-slate-400 shrink-0 space-y-1">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Last Run:</span>
                                        <span className="text-slate-900 dark:text-slate-205 font-medium">{latestAttempt.score} Marks ({latestAttempt.accuracy}% Acc)</span>
                                      </div>
                                      {bestAttempt && bestAttempt.score !== latestAttempt.score && (
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[9px] font-bold text-purple-600 dark:text-purple-500 uppercase tracking-wider">Best Run:</span>
                                          <span className="text-purple-700 dark:text-purple-300 font-bold">{bestAttempt.score} Marks</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-900">
                                  <Button
                                    onClick={() => window.open(`/gate-study/quiz/General%20Aptitude/${encodeURIComponent(topic)}?mode=exam`, '_blank')}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-9 flex items-center justify-center gap-1.5 rounded-lg shadow-sm"
                                  >
                                    <PlayCircle className="h-4 w-4" /> Start Exam
                                  </Button>

                                  <Button
                                    onClick={() => window.open(`/gate-study/quiz/General%20Aptitude/${encodeURIComponent(topic)}?mode=practice`, '_blank')}
                                    variant="outline"
                                    className="flex-1 border-purple-500/50 hover:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:text-purple-800 dark:hover:text-purple-300 text-xs font-bold h-9 flex items-center justify-center gap-1.5 rounded-lg"
                                  >
                                    <GraduationCap className="h-4 w-4" /> Practice Quiz
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    /* Sub-accordions List Mode */
                    <div className="space-y-4">
                      {Object.entries(APTITUDE_CATEGORIES).map(([catName, topics]) => {
                        const isExpanded = expandedSubCat === catName;
                        const availableTopics = topics.filter((t) => GENERAL_APTITUDE_QUIZ_DATA[t]);
                        if (availableTopics.length === 0) return null;

                        return (
                          <div
                            key={catName}
                            className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/30 dark:bg-slate-955/30 transition-all duration-250"
                          >
                            <button
                              onClick={() => setExpandedSubCat(isExpanded ? null : catName)}
                              className={`w-full flex items-center justify-between p-5 text-left font-bold text-sm transition-all duration-300 ${
                                isExpanded
                                  ? 'bg-purple-50/40 dark:bg-purple-950/10 text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-900/30'
                                  : 'bg-slate-50/50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-850 border-b border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-1 h-4 rounded-full inline-block shrink-0 transition-transform duration-300 ${
                                  isExpanded ? 'bg-purple-600 dark:bg-purple-400 scale-y-125' : 'bg-slate-400 dark:bg-slate-650'
                                }`} />
                                <span>{catName}</span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                                  isExpanded
                                    ? 'bg-purple-100/60 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200/40 dark:border-purple-900/30'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/60'
                                }`}>
                                  {availableTopics.length} Topics
                                </span>
                              </div>
                              <ChevronDown
                                className={`h-4.5 w-4.5 transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180 text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-slate-500'
                                }`}
                              />
                            </button>

                            {isExpanded && (
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-slate-900/50">
                                {availableTopics.map((topic) => {
                                  const qList = GENERAL_APTITUDE_QUIZ_DATA[topic] || [];
                                  const quizAttempts = attemptsHistory.filter(
                                    (h) => h.branch === 'General Aptitude' && h.quizKey === topic
                                  );
                                  const latestAttempt = quizAttempts.length > 0 ? quizAttempts[quizAttempts.length - 1] : null;
                                  const bestAttempt = quizAttempts.length > 0 ? [...quizAttempts].sort((a, b) => b.score - a.score)[0] : null;

                                  return (
                                    <motion.div
                                      key={topic}
                                      whileHover={{ scale: 1.01 }}
                                      className="border border-slate-250 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 p-5 rounded-xl flex flex-col justify-between gap-4 group hover:border-purple-500/30 transition-all duration-300 shadow-sm"
                                    >
                                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                                        <div className="space-y-1.5 flex-1">
                                          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                            {topic}
                                          </h3>
                                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase">
                                            <span>{qList.length} Questions</span>
                                            <span>•</span>
                                            <span>15 Minutes</span>
                                            <span>•</span>
                                            <span>General Aptitude</span>
                                          </div>
                                        </div>

                                        {latestAttempt && (
                                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-[10px] text-slate-600 dark:text-slate-400 shrink-0 space-y-1">
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Last Run:</span>
                                              <span className="text-slate-900 dark:text-slate-205 font-medium">{latestAttempt.score} Marks ({latestAttempt.accuracy}% Acc)</span>
                                            </div>
                                            {bestAttempt && bestAttempt.score !== latestAttempt.score && (
                                              <div className="flex items-center gap-1.5">
                                                <span className="text-[9px] font-bold text-purple-600 dark:text-purple-500 uppercase tracking-wider">Best Run:</span>
                                                <span className="text-purple-700 dark:text-purple-300 font-bold">{bestAttempt.score} Marks</span>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-900">
                                        <Button
                                          onClick={() => window.open(`/gate-study/quiz/General%20Aptitude/${encodeURIComponent(topic)}?mode=exam`, '_blank')}
                                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-9 flex items-center justify-center gap-1.5 rounded-lg shadow-sm"
                                        >
                                          <PlayCircle className="h-4 w-4" /> Start Exam
                                        </Button>

                                        <Button
                                          onClick={() => window.open(`/gate-study/quiz/General%20Aptitude/${encodeURIComponent(topic)}?mode=practice`, '_blank')}
                                          variant="outline"
                                          className="flex-1 border-purple-500/50 hover:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:text-purple-800 dark:hover:text-purple-300 text-xs font-bold h-9 flex items-center justify-center gap-1.5 rounded-lg"
                                        >
                                          <GraduationCap className="h-4 w-4" /> Practice Quiz
                                        </Button>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion Part 2: GATE PYQs Mock Test Series */}
        <div id="mock-section"></div>
        <div className="space-y-3">
          <button
            onClick={() => setIsMockTestOpen(!isMockTestOpen)}
            className="w-full flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-lg hover:border-purple-500/30 transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    GATE PYQs Mock Test Series ({selectedBranch})
                  </h2>
                  <span className="text-[9px] font-extrabold uppercase bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-200/30 dark:border-purple-900/20 px-2.5 py-0.5 rounded-full tracking-wider">
                    Exam Simulator
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Practice full length GATE questions. Simulated exam timer, sidebar palette navigator, and scorecard feedback.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* Green resource count badge */}
              <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-250/20 dark:border-emerald-900/20 shadow-sm">
                {quizKeys.length} Tests Available
              </span>
              <div className="text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors p-1 rounded-full border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-950">
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isMockTestOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isMockTestOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md relative mt-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {quizKeys.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {quizKeys.map((quizKey) => {
                        const qList = activeBranchQuizzes[quizKey] || [];
                        const quizAttempts = attemptsHistory.filter(
                          (h) => h.branch === selectedBranch && h.quizKey === quizKey
                        );
                        const latestAttempt = quizAttempts.length > 0 ? quizAttempts[quizAttempts.length - 1] : null;
                        const bestAttempt = quizAttempts.length > 0 ? [...quizAttempts].sort((a, b) => b.score - a.score)[0] : null;

                        return (
                          <motion.div
                            key={quizKey}
                            whileHover={{ scale: 1.01 }}
                            className="border border-slate-250 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-955 p-5 rounded-xl flex flex-col justify-between gap-4 group hover:border-purple-500/30 transition-all duration-300 shadow-sm"
                          >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                              <div className="space-y-1.5 flex-1">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                  GATE {selectedBranch} {quizKey}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase">
                                  <span>{qList.length} Questions</span>
                                  <span>•</span>
                                  <span>3 Hours</span>
                                  <span>•</span>
                                  <span>{selectedBranch === 'CSE' ? 'Set-wise' : 'Complete'}</span>
                                </div>
                              </div>

                              {latestAttempt && (
                                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-lg p-2 text-[10px] text-slate-600 dark:text-slate-400 shrink-0 space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Last Run:</span>
                                    <span className="text-slate-900 dark:text-slate-200 font-medium">{latestAttempt.score} Marks ({latestAttempt.accuracy}% Acc)</span>
                                  </div>
                                  {bestAttempt && bestAttempt.score !== latestAttempt.score && (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-bold text-purple-600 dark:text-purple-500 uppercase tracking-wider">Best Run:</span>
                                      <span className="text-purple-700 dark:text-purple-300 font-bold">{bestAttempt.score} Marks</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-905">
                              <Button
                                onClick={() => window.open(`/gate-study/quiz/${encodeURIComponent(selectedBranch)}/${encodeURIComponent(quizKey)}?mode=exam`, '_blank')}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-505 text-white text-xs font-bold h-9 flex items-center justify-center gap-1.5 rounded-lg shadow-sm"
                              >
                                <PlayCircle className="h-4 w-4" /> Start Exam
                              </Button>

                              <Button
                                onClick={() => window.open(`/gate-study/quiz/${encodeURIComponent(selectedBranch)}/${encodeURIComponent(quizKey)}?mode=practice`, '_blank')}
                                variant="outline"
                                className="flex-1 border-purple-500/50 hover:border-purple-405 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:text-purple-800 dark:hover:text-purple-300 text-xs font-bold h-9 flex items-center justify-center gap-1.5 rounded-lg"
                              >
                                <GraduationCap className="h-4 w-4" /> Practice Quiz
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 bg-amber-50/20 dark:bg-amber-950/10 rounded-xl border border-amber-500/20 dark:border-amber-900/20 p-6 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm text-slate-850 dark:text-slate-350">Quizzes Not Available for {selectedBranch}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                          Full-length GATE practice tests are currently compiled for **CSE** and **DA** branches. Select **CSE** or **DA** from the top right to practice their exam papers, which contain General Aptitude and Engineering Mathematics common to all engineering branches!
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleBranchChange('CSE')}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                        >
                          Try CSE Quizzes
                        </Button>
                        <Button
                          onClick={() => handleBranchChange('DA')}
                          size="sm"
                          variant="outline"
                          className="border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs text-slate-600 dark:text-slate-300"
                        >
                          Try DA Quizzes
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion Part 3: Core Subject Materials */}
        <div id="subjects-section"></div>
        <div className="space-y-3">
          <button
            onClick={() => setIsCoreNotesOpen(!isCoreNotesOpen)}
            className="w-full flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-lg hover:border-purple-500/30 transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    Core Subject Materials ({selectedBranch})
                  </h2>
                  <span className="text-[9px] font-extrabold uppercase bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-200/30 dark:border-purple-900/20 px-2.5 py-0.5 rounded-full tracking-wider">
                    Textbooks & Notes
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Access core engineering syllabus textbooks, handwritten notes, and topic-wise slides.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* Green resource count badge */}
              <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-250/20 dark:border-emerald-900/20 shadow-sm">
                {GATE_NOTES_DATA[selectedBranch]?.length || 0} Subjects Available
              </span>
              <div className="text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors p-1 rounded-full border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-955">
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isCoreNotesOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isCoreNotesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md relative mt-1 space-y-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(GATE_NOTES_DATA[selectedBranch] || []).map((note, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-xl flex flex-col justify-between gap-4 group hover:border-purple-500/30 transition-all duration-300 shadow-sm"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-3 bg-purple-500 rounded-full inline-block shrink-0" />
                            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                              {note.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {note.description}
                          </p>
                        </div>

                        <div className="flex gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-900 w-full">
                          {note.url.includes('pw.live') ? (
                            <button
                              onClick={() => viewInBrowser(note.url)}
                              className="w-full inline-flex items-center justify-center gap-2 text-xs font-extrabold tracking-wider uppercase py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/10 hover:scale-[1.01]"
                            >
                              <ExternalLink className="h-3.5 w-3.5" /> Open PW Library
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => smartDownload(note.url, note.title)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                                disabled={note.url === '#'}
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </button>
                              <button
                                onClick={() => viewInBrowser(note.url)}
                                className="inline-flex items-center justify-center p-2 rounded border border-slate-200 dark:border-slate-805 bg-slate-100 dark:bg-slate-955 hover:bg-slate-200 dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-700 transition-colors"
                                disabled={note.url === '#'}
                                title="View in Browser"
                              >
                                <ExternalLink className="h-3.5 w-3.5 text-slate-500 dark:text-slate-405" />
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Info Banner at bottom */}
                  <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 dark:bg-purple-950/10 rounded-r-xl">
                    <h3 className="text-base font-bold text-slate-850 dark:text-slate-200 mb-2">📚 About GATE Study Section</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      Access curated study materials, handwritten notes, reference books, and interactive PYQ practice quizzes organized specifically for your preparation. Swap branches using the top-right menu to view other subject resources.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-750 dark:text-slate-300 px-2.5 py-1 rounded">🚀 GATE Preparation</span>
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-750 dark:text-slate-300 px-2.5 py-1 rounded">📝 PYQs Solved</span>
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-750 dark:text-slate-300 px-2.5 py-1 rounded">🧠 Interactive Quizzes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
</div>

      <Footer />
    </div>
  );
};

export default GateStudy;
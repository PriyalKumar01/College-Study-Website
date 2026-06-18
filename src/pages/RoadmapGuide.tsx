import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Compass, Laptop, Code, Award, CheckCircle2, ChevronRight,
  TrendingUp, Sparkles, BookOpen, ArrowLeft, ArrowRightLeft,
  ChevronDown, ChevronUp, Terminal, Database,
  Globe, Layers, ArrowUpRight, Check, PlayCircle, HelpCircle,
  Crown, GraduationCap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { LockedSection } from '@/components/LockedSection';
import { PremiumModal } from '@/components/PremiumModal';
import Footer from '@/components/Footer';

const CAREER_EXAMS = [
  {
    id: 'gate',
    name: 'GATE (Graduate Aptitude Test in Engineering)',
    tier: 'Tier 1 (Highest Priority)',
    target: 'M.Tech at IITs/IISc, PSU Jobs, Core R&D, PhD',
    eligibility: 'B.Tech students eligible (3rd/4th year). No age limit.',
    priorityCSE: '10/10 (Highest Priority)',
    priorityCore: '9.5/10 (Highest Priority)',
    benefits: [
      'Admission to M.Tech/MS at IITs/NITs/IISc with stipend (₹12,400/month)',
      'Direct entry to top Maharatna/Navratna PSUs (ONGC, IOCL, NTPC, etc.)',
      'Global higher education opportunities at NUS & NTU Singapore',
      'Strong CS/Core fundamentals develop hote hain'
    ],
    downsides: 'Conceptual and rigorous; requires consistent daily practice.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'cat',
    name: 'CAT (Common Admission Test)',
    tier: 'Tier 1 (Highest Priority)',
    target: 'Management, Consulting, Product Management, MBA',
    eligibility: 'Graduates in any stream. No age limit.',
    priorityCSE: '9/10 (High Priority)',
    priorityCore: '9/10 (High Priority)',
    benefits: [
      'Admission to premium IIMs and top MBA colleges in India',
      'Opens doors to high-salary corporate roles, investment banking, & management consulting',
      'Highly preferred for Product Management roles at tech startups'
    ],
    downsides: 'Extremely high competitive cutoffs; requires strong quantitative & verbal skills.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'upsc_cse',
    name: 'UPSC CSE (Civil Services Examination)',
    tier: 'Tier 1 (Highest Priority)',
    target: 'IAS, IPS, IFS, IRS, and Group-A Central Services',
    eligibility: 'Graduates from any stream eligible. Age: 21 to 32 years.',
    priorityCSE: '8.5/10',
    priorityCore: '8.5/10',
    benefits: [
      'Top administrative services with high social status & policy-making power',
      'Huge societal impact and unmatched prestige'
    ],
    downsides: 'Extremely high competition and vast, non-technical general studies syllabus.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'ssc_cgl',
    name: 'SSC CGL (Staff Selection Commission)',
    tier: 'Tier 2 (Best Government Job Exams)',
    target: 'Income Tax Inspector, GST Inspector, CBI Sub-Inspector, Auditor, ASO',
    eligibility: 'Any graduate eligible. Age: 18 to 30/32 years.',
    priorityCSE: '8/10',
    priorityCore: '8/10',
    benefits: [
      'Respected Central Inspector posts with strong authority',
      'Excellent work-life balance for Assistant Section Officer (ASO) in ministries',
      'Direct entry to CBI and Income Tax departments'
    ],
    downsides: 'Slightly slow promotional avenues in some departments.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'rbi_grade_b',
    name: 'RBI Grade B Officer',
    tier: 'Tier 2 (Best Government Job Exams)',
    target: 'Officer Grade-B in Reserve Bank of India',
    eligibility: 'Graduates with min 60% marks. Age: 21 to 30 years.',
    priorityCSE: '8.5/10 (One of the best jobs)',
    priorityCore: '8.5/10 (One of the best jobs)',
    benefits: [
      'Excellent starting salary (₹1 Lakh+/month including all perks)',
      'Prestigious RBI officer status with great corporate exposure',
      'Better work-life balance and postings mostly in metro cities'
    ],
    downsides: 'Intense phase 2 exam covering economics, finance, and descriptive writing.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'sebi_grade_a',
    name: 'SEBI Grade A Officer',
    tier: 'Tier 2 (Best Government Job Exams)',
    target: 'Assistant Manager in Securities & Exchange Board of India',
    eligibility: 'Bachelor\'s Degree in Engineering (B.Tech) or Master\'s degree.',
    priorityCSE: '8/10 (IT stream has highly specialized lower competition)',
    priorityCore: '8/10 (General stream is open to all engineers)',
    benefits: [
      'Very premium salary (~₹1.1 Lakh/month) and metro living standards',
      'Reputed regulatory authority status',
      'Relatively low applicant numbers compared to general bank PO exams'
    ],
    downsides: 'Phase-2 requires understanding commerce, accounting, and finance.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'nabard_grade_a',
    name: 'NABARD Grade A Officer',
    tier: 'Tier 2 (Best Government Job Exams)',
    target: 'Assistant Manager in NABARD',
    eligibility: 'Graduates in any discipline with min 60% marks.',
    priorityCSE: '7.5/10',
    priorityCore: '7.5/10',
    benefits: [
      'Great work-life balance and highly peaceful office environment',
      'Starting package of ~₹90,000/month',
      'Fulfilling role focused on rural development policies'
    ],
    downsides: 'Requires studying agricultural economics and rural issues.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'ibps_sbi_po',
    name: 'IBPS PO / SBI PO',
    tier: 'Tier 2 (Best Government Job Exams)',
    target: 'Probationary Officer in Public Sector Banks',
    eligibility: 'Any graduate eligible. Age: 21 to 30 years.',
    priorityCSE: '7.5/10',
    priorityCore: '7.5/10',
    benefits: [
      'Highly stable banking career with predictable promotion cycles',
      'Good starting salary with extensive low-interest bank loan benefits'
    ],
    downsides: 'High workload, public dealing pressure, and frequent rural/semi-urban transfers.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'ese_ies',
    name: 'Engineering Services Examination (ESE / IES)',
    tier: 'Tier 3 (Engineering-Specific Government Exams)',
    target: 'Group-A Technical Officer in Central Civil Engineering Services',
    eligibility: 'B.Tech in Civil, Mechanical, Electrical, or Electronics & Telecom.',
    priorityCSE: '2/10 (Opportunities limited for CSE students)',
    priorityCore: '9.8/10 (Highest Priority for Core Engineers)',
    benefits: [
      'Most prestigious and powerful government job for core engineers',
      'High administrative authority over government infra and engineering blocks'
    ],
    downsides: 'Extremely tough three-stage exam; not conducted for CS/IT graduates.',
    applicableBranches: ['core_engg']
  },
  {
    id: 'isro_scientist',
    name: 'ISRO Scientist Recruitment (ICRB)',
    tier: 'Tier 3 (Engineering-Specific Government Exams)',
    target: 'Scientist / Engineer \'SC\' in ISRO centers',
    eligibility: 'B.Tech with minimum 65% aggregate marks.',
    priorityCSE: '8/10 (Occasions exist for CS graduates)',
    priorityCore: '9.5/10 (Elite technical job)',
    benefits: [
      'Research-focused patriotic work environment building satellite technologies',
      'Highly respected scientist status with excellent research support'
    ],
    downsides: 'Notifications are sometimes irregular; deep technical academic knowledge is required.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'barc_scientific_officer',
    name: 'BARC Scientific Officer (OCES/DGFS)',
    tier: 'Tier 3 (Engineering-Specific Government Exams)',
    target: 'Scientific Officer at Bhabha Atomic Research Centre',
    eligibility: 'B.Tech with minimum 60% aggregate marks.',
    priorityCSE: '7/10',
    priorityCore: '9.5/10',
    benefits: [
      'Direct entry via GATE scores or a dedicated BARC online exam',
      'Elite scientific role working on nuclear technology and core energy research'
    ],
    downsides: 'Strict security constraints; postings are mostly in restricted nuclear facility zones.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'cds',
    name: 'CDS (Combined Defence Services)',
    tier: 'Defence Exams',
    target: 'Commissioned Officer in Indian Army, Navy, or Air Force',
    eligibility: 'Unmarried Graduates. Age: 19 to 24 years.',
    priorityCSE: '7/10',
    priorityCore: '7/10',
    benefits: [
      'Elite commissioned officer life with high administrative respect',
      'Top-class lifestyle, sports facilities, and post-service security'
    ],
    downsides: 'SSB interview is highly selective and physical/medical standards are rigorous.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'afcat',
    name: 'AFCAT (Air Force Common Admission Test)',
    tier: 'Defence Exams',
    target: 'Technical / Ground Duty Officer in Indian Air Force',
    eligibility: 'B.Tech graduates with Physics & Math at 10+2. Age: 20 to 26 years.',
    priorityCSE: '8/10 (Technical/IT officer jobs)',
    priorityCore: '8/10 (Technical/Aeronautical jobs)',
    benefits: [
      'Opportunity to serve in the IAF with standard engineering roles',
      'B.Tech degree holders are highly preferred for technical ground duty wings'
    ],
    downsides: 'Extremely strict physical and visual criteria.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'capf_ac',
    name: 'CAPF AC (Assistant Commandant)',
    tier: 'Defence Exams',
    target: 'Assistant Commandant (Group-A Officer) in BSF, CRPF, CISF, ITBP',
    eligibility: 'Graduates in any stream. Age: 20 to 25 years.',
    priorityCSE: '7/10',
    priorityCore: '7/10',
    benefits: [
      'Direct command over paramilitary battalions at a young age',
      'Equal rank and authority to state DSP / Army Captain'
    ],
    downsides: 'Demanding field conditions, border patrol, and posting in volatile zones.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'state_pcs',
    name: 'State PCS (UPPCS, BPSC, MPPSC, etc.)',
    tier: 'State Government Exams',
    target: 'Deputy Collector (SDM), DSP, Block Officer, Tehsildar',
    eligibility: 'Graduates in any discipline. Age limit varies (21 to 35/40 years).',
    priorityCSE: '7.5/10',
    priorityCore: '7.5/10',
    benefits: [
      'Top administrative control at the state level',
      'Direct connection with grassroot governance and local community administration'
    ],
    downsides: 'Exam schedules are sometimes delayed, and state-specific General Studies is required.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'ib_acio',
    name: 'IB ACIO (Intelligence Bureau)',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Assistant Central Intelligence Officer (National Security)',
    eligibility: 'Any graduate eligible. Age: 18 to 27 years.',
    priorityCSE: '8.5/10 (Highly recommended for Tech/Cybersecurity interests)',
    priorityCore: '8/10',
    benefits: [
      'Exciting intelligence operations career with low public-dealing stress',
      'Starting salary of ~₹75,000/month with extra 20% risk allowance',
      'Lower applicant numbers due to irregular cycles and fears about interview security'
    ],
    downsides: 'Postings can be in sensitive locations; complete operational privacy required.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'epfo_eo_ao',
    name: 'EPFO EO/AO (Enforcement Officer)',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Enforcement / Accounts Officer at EPFO',
    eligibility: 'Graduates in any discipline. Age: 30 years (EO/AO) / 35 years (APFC).',
    priorityCSE: '8/10',
    priorityCore: '8/10',
    benefits: [
      'UPSC conducted exam with a far simpler pattern than Civil Services',
      'Zero public-dealing stress, comfortable desk job, and standard weekend holidays',
      'Excellent pay matrix (Level 8 and Level 10)'
    ],
    downsides: 'Conducted after intervals of 2-3 years.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'irdai_grade_a',
    name: 'IRDAI Grade A Assistant Manager',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Officer in Insurance Regulatory Authority of India',
    eligibility: 'B.Tech degree or Master\'s degree. Age: 21 to 30 years.',
    priorityCSE: '8/10',
    priorityCore: '8/10',
    benefits: [
      'Regulatory authority status with high starting salaries (~₹80,000 - ₹1 Lakh/month)',
      'Very low general competition due to lack of notification awareness',
      'Postings primarily in Hyderabad (HQ) or major metro branch offices'
    ],
    downsides: 'Very limited vacancies in each hiring phase.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'pfrda_grade_a',
    name: 'PFRDA Grade A Assistant Manager',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Officer in Pension Fund Regulatory Authority of India',
    eligibility: 'B.Tech or Post-graduate. Age: 21 to 30 years.',
    priorityCSE: '8/10',
    priorityCore: '8/10',
    benefits: [
      'Premium regulatory job with desk stability and top salaries (~₹80,000 - ₹1 Lakh/month)',
      'Highly ignored by general aspirants because the pension sector seems boring'
    ],
    downsides: 'Hiring volume is very small (often under 20-30 seats).',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'insurance_ao',
    name: 'Insurance AO (NIACL / NICL / UIIC / LIC AAO)',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Administrative Officer (Generalist)',
    eligibility: 'Any graduate. Age: 21 to 30 years.',
    priorityCSE: '7.5/10',
    priorityCore: '7.5/10',
    benefits: [
      'Predictable office hours with very low stress compared to banking jobs',
      'Starting salary around ₹70,000 - ₹90,000/month',
      'Solid work-life balance with regular weekend holidays'
    ],
    downsides: 'Syllabus resembles banking PO; requires preparing insurance concepts.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'railway_psu_gate',
    name: 'Railway PSUs via GATE (RITES, IRCON, RVNL)',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Executive Technical Engineer / Assistant Manager',
    eligibility: 'B.Tech with valid GATE score.',
    priorityCSE: '7/10',
    priorityCore: '9/10 (Top technical postings)',
    benefits: [
      'Work on nationwide railway and metro infrastructure systems',
      'Premium PSU salaries, allowances, and government railway travel perks',
      'Lower competition since candidates target top Maharatna companies instead'
    ],
    downsides: 'Recruitment is sometimes on a contract-to-regularization basis.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'fci_manager',
    name: 'FCI Manager & Assistant Grade III',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'General Admin Manager in Food Corporation of India',
    eligibility: 'Graduates in any discipline. B.Tech eligible.',
    priorityCSE: '7.5/10',
    priorityCore: '7.5/10',
    benefits: [
      'Stable public sector corporation with strong administrative reach',
      'Fewer candidates are aware of recruitment alerts compared to banking/SSC'
    ],
    downsides: 'Irregular timelines for conducting tests.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'dda_aso_je',
    name: 'DDA Officer (ASO / JE)',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Assistant Section Officer / Junior Engineer at DDA',
    eligibility: 'Any Graduate (ASO) / B.Tech or Diploma in Civil/Electrical (JE).',
    priorityCSE: '7.5/10',
    priorityCore: '8.5/10 (Excellent Technical JE roles)',
    benefits: [
      'Postings are guaranteed to be in Delhi NCR (highly desired)',
      'Great work-life balance with standard office hours and weekends'
    ],
    downsides: 'Recruitment advertisements come after gaps of 2-3 years.',
    applicableBranches: ['cse_it', 'core_engg']
  },
  {
    id: 'ssc_jso',
    name: 'SSC Junior Statistical Officer (JSO)',
    tier: 'Hidden Gems (Low Competition, High Yield)',
    target: 'Statistical Officer in Ministry of Statistics',
    eligibility: 'B.Tech or Graduation with 60% in Math at 10+2 OR Statistics in college.',
    priorityCSE: '7.5/10 (If Math eligibility met)',
    priorityCore: '7.5/10 (If Math eligibility met)',
    benefits: [
      'Much lower cutoffs because of specific math/statistics requirements',
      'Restricted applicant pool makes it highly achievable'
    ],
    downsides: 'Requires preparing a dedicated statistics paper.',
    applicableBranches: ['cse_it', 'core_engg']
  }
];

export default function RoadmapGuide() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; plan: 'companies' | 'hr_emails' | 'resume' | 'roadmaps' }>({
    open: false,
    plan: 'roadmaps'
  });
  const [activeStep, setActiveStep] = useState(1);
  const [activeDirTab, setActiveDirTab] = useState('general');

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    directories: false,
    pythonLibs: false,
    playlists: false,
    dsaProjects: false,
    exams: false
  });

  const [examBranchFilter, setExamBranchFilter] = useState<'all' | 'cse_it' | 'core_engg'>('all');

  const [stackIndex, setStackIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSwipe = () => {
    if (swiping) return;
    setSwiping(true);
    setTimeout(() => {
      setStackIndex(prev => (prev + 1) % 5);
      setSwiping(false);
    }, 300);
  };

  const checkPurchase = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await (supabase as any)
        .from('premium_purchases')
        .select('plan')
        .eq('user_id', user.id)
        .in('payment_status', ['completed', 'free']);

      const unlockedPlans = data ? data.map((p: any) => p.plan) : [];
      setHasAccess(unlockedPlans.includes('roadmaps'));
    } catch (err) {
      console.error('Error checking purchase:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkPurchase();
  }, [checkPurchase]);

  // Steps Data
  const ROADMAP_STEPS = [
    {
      step: 1,
      title: 'Pick ONE Programming Language',
      subtitle: 'Build a solid foundation',
      icon: <Laptop className="w-5 h-5 text-indigo-500" />,
      tagline: 'Don\'t keep switching languages. Master one first.',
      focus: [
        { name: 'Syntax & Data Types', desc: 'Variables, conditional structures, arrays, and basic data types.' },
        { name: 'Loops & Conditionals', desc: 'While/for loops, switch-cases, and optimized if-else logic.' },
        { name: 'Functions & Scope', desc: 'Pass-by-value vs reference, global vs block variables.' },
        { name: 'OOP Concepts', desc: 'Inheritance, polymorphism, encapsulation, and abstraction.' },
        { name: 'Basic Problem Solving', desc: 'Practice simple pattern matching, string/array iterations.' }
      ],
      recommendations: ['Java', 'C++', 'Python']
    },
    {
      step: 2,
      title: 'Master DSA (Non-Negotiable)',
      subtitle: 'This is what clears coding rounds',
      icon: <Code className="w-5 h-5 text-indigo-500" />,
      tagline: 'Solve problems daily. Even 2 per day compounds massively.',
      focus: [
        { name: 'Arrays & Strings', desc: 'Two-pointer technique, sliding window, prefix sums.' },
        { name: 'Linked Lists', desc: 'Singly, doubly, circular, reversing, and cycle detection.' },
        { name: 'Stacks & Queues', desc: 'Monotonic stack, priority queues, and queue implementations.' },
        { name: 'Trees & Graphs', desc: 'DFS, BFS, Binary trees, BSTs, and traversals.' },
        { name: 'Recursion & Backtracking', desc: 'Recursion trees, N-Queens, Sudoku solver, combinations.' },
        { name: 'Dynamic Programming', desc: 'Memoization, tabulation, knapsack, LCS, and LIS.' }
      ],
      creators: ['Striver (Take U Forward)', 'Love Babbar (Code Help)', 'Abdul Bari', 'NeetCode']
    },
    {
      step: 3,
      title: 'Learn CS Fundamentals & System Design',
      subtitle: 'The differentiator in interviews',
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      tagline: 'Most students ignore fundamentals and system design. This is a big mistake.',
      focus: [
        { name: 'DBMS & SQL', desc: 'Normalization, ACID properties, JOIN queries, indexing, and subqueries.' },
        { name: 'Operating Systems', desc: 'Process scheduling, multithreading, memory management, deadlock, and semaphores.' },
        { name: 'Computer Networks', desc: 'OSI layers, TCP vs UDP, DNS, HTTP/HTTPS, and IP routing.' },
        { name: 'Basic System Design', desc: 'Understand Client-Server models, Monolith vs Microservices, APIs (REST/GraphQL), Load Balancers, Caching (Redis), and Database scaling basics.' }
      ]
    },
    {
      step: 4,
      title: 'Build Projects That Prove Your Skills',
      subtitle: 'Certificates won\'t impress recruiters, projects will',
      icon: <Award className="w-5 h-5 text-indigo-500" />,
      tagline: 'Build real applications that demonstrate practical development capabilities.',
      focus: [
        { name: '2 Solid Development Projects', desc: 'Full-stack apps (React + Node + DB) or equivalent in your chosen stack.' },
        { name: '1 Project Solving a Real Problem', desc: 'A custom tool, extension, library, or website addressing a real-world friction point.' },
        { name: 'GitHub Portfolio', desc: 'Clean readmes, documentation, commit history, and hosted demo links.' },
        { name: 'Open-Source Contributions', desc: 'Make pull requests, fix small issues in libraries, or make documentation additions.' }
      ]
    },
    {
      step: 5,
      title: 'Optimize Resume + LinkedIn',
      subtitle: 'Opportunities often come from visibility',
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      tagline: 'Get noticed by HRs and build networking connections.',
      focus: [
        { name: 'ATS-Friendly Resume', desc: 'Single-page, achievement-focused, project-heavy, standard Overleaf/LaTeX layout.' },
        { name: 'LinkedIn Personal Brand', desc: 'Showcase your learning journey, build in public, write posts, and share project milestones.' },
        { name: 'Network & Referrals', desc: 'Reach out to seniors/alumni, request warm referrals, and build meaningful professional connections.' }
      ]
    }
  ];

  // Bonus Creators Data
  const BONUS_CREATORS = {
    dsa: ['Striver', 'Love Babbar', 'Abdul Bari', 'NeetCode'],
    webdev: ['Hitesh Choudhary', 'Piyush Garg', 'CodeWithHarry', 'Akshay Saini'],
    sysdesign: ['Gaurav Sen', 'Hussein Nasser', 'Arpit Bhayani', 'Alex Xu'],
    aiml: ['Krish Naik', 'CampusX', 'Andrej Karpathy', 'Sentdex'],
    mixed: ['Harkirat Singh', 'Fireship', 'Tech with Tim', 'Traversy Media']
  };

  // Job Search Websites (Image 2)
  const JOB_SEARCH_DIRECTORIES = [
    {
      category: 'General Job Boards',
      id: 'general',
      items: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com' },
        { name: 'Indeed', url: 'https://www.indeed.com' },
        { name: 'Glassdoor', url: 'https://www.glassdoor.com' },
        { name: 'Naukri.com', url: 'https://www.naukri.com' },
        { name: 'Foundit', url: 'https://www.foundit.in' },
        { name: 'SimplyHired', url: 'https://www.simplyhired.com' },
        { name: 'ZipRecruiter', url: 'https://www.ziprecruiter.com' },
        { name: 'CareerBuilder', url: 'https://www.careerbuilder.com' },
        { name: 'Shine.com', url: 'https://www.shine.com' },
        { name: 'TimesJobs', url: 'https://www.timesjobs.com' }
      ]
    },
    {
      category: 'Startup Job Platforms',
      id: 'startups',
      items: [
        { name: 'Wellfound (AngelList)', url: 'https://wellfound.com' },
        { name: 'Y Combinator Jobs', url: 'https://www.ycombinator.com/jobs' },
        { name: 'Cutshort', url: 'https://cutshort.io' },
        { name: 'Hirect', url: 'https://www.hirect.in' },
        { name: 'Instahyre', url: 'https://www.instahyre.com' },
        { name: 'Flexiple', url: 'https://flexiple.com' },
        { name: 'Arc.dev', url: 'https://arc.dev' },
        { name: 'Braintrust', url: 'https://www.usebraintrust.com' },
        { name: 'Turing', url: 'https://www.turing.com' },
        { name: 'Lemon.io', url: 'https://lemon.io' }
      ]
    },
    {
      category: 'Remote Work Boards',
      id: 'remote',
      items: [
        { name: 'RemoteOK', url: 'https://remoteok.com' },
        { name: 'We Work Remotely', url: 'https://weworkremotely.com' },
        { name: 'Remotive', url: 'https://remotive.com' },
        { name: 'FlexJobs', url: 'https://www.flexjobs.com' },
        { name: 'Jobspresso', url: 'https://jobspresso.co' },
        { name: 'Himalayas', url: 'https://himalayas.app' },
        { name: 'JustRemote', url: 'https://justremote.co' },
        { name: 'Dynamite Jobs', url: 'https://dynamitejobs.com' },
        { name: 'Working Nomads', url: 'https://www.workingnomads.com' },
        { name: 'SkipTheDrive', url: 'https://www.skipthedrive.com' }
      ]
    },
    {
      category: 'Freelance & Contract',
      id: 'freelance',
      items: [
        { name: 'Upwork', url: 'https://www.upwork.com' },
        { name: 'Fiverr', url: 'https://www.fiverr.com' },
        { name: 'Freelancer', url: 'https://www.freelancer.com' },
        { name: 'Guru', url: 'https://www.guru.com' },
        { name: 'Contra', url: 'https://contra.com' },
        { name: 'PeoplePerHour', url: 'https://www.peopleperhour.com' },
        { name: 'Workana', url: 'https://www.workana.com' },
        { name: 'Toptal', url: 'https://www.toptal.com' },
        { name: 'Outsourcely', url: 'https://www.outsourcely.com' },
        { name: 'SolidGigs', url: 'https://solidgigs.com' }
      ]
    },
    {
      category: 'Developer & Tech Specific',
      id: 'tech',
      items: [
        { name: 'Dice', url: 'https://www.dice.com' },
        { name: 'HackerRank Jobs', url: 'https://www.hackerrank.com/jobs' },
        { name: 'Stack Overflow Jobs', url: 'https://stackoverflow.com/jobs' },
        { name: 'Authentic Jobs', url: 'https://authenticjobs.com' },
        { name: 'Gun.io', url: 'https://gun.io' }
      ]
    },
    {
      category: 'Internships & Entry Level',
      id: 'internships',
      items: [
        { name: 'Internshala', url: 'https://internshala.com' },
        { name: 'LetsIntern', url: 'https://www.letsintern.com' },
        { name: 'GradConnection', url: 'https://gradconnection.com' },
        { name: 'WayUp', url: 'https://www.wayup.com' },
        { name: 'BreakintoStartups', url: 'https://breakintostartups.com' }
      ]
    },
    {
      category: 'Executive & Professional Roles',
      id: 'executive',
      items: [
        { name: 'Ladders', url: 'https://www.theladders.com' },
        { name: 'Hired', url: 'https://hired.com' },
        { name: 'Experteer', url: 'https://www.experteer.com' },
        { name: 'Robert Half', url: 'https://www.roberthalf.com' },
        { name: 'Michael Page', url: 'https://www.michaelpage.co.in' }
      ]
    },
    {
      category: 'Data, AI & Analytics',
      id: 'data',
      items: [
        { name: 'DataJobs.com', url: 'https://datajobs.com' },
        { name: 'Analytics Vidhya Jobs', url: 'https://jobs.analyticsvidhya.com' },
        { name: 'Kaggle Jobs', url: 'https://www.kaggle.com/jobs' },
        { name: 'BigDataJobs', url: 'https://www.bigdatajobs.com' },
        { name: 'Chief Data Officer Portal', url: 'https://www.cdo-portal.com' }
      ]
    },
    {
      category: 'Global Search Engines',
      id: 'global',
      items: [
        { name: 'Jooble', url: 'https://jooble.org' },
        { name: 'Adzuna', url: 'https://www.adzuna.com' },
        { name: 'Talent.com', url: 'https://www.talent.com' },
        { name: 'Jobrapido', url: 'https://www.jobrapido.com' },
        { name: 'Jora', url: 'https://jora.com' }
      ]
    },
    {
      category: 'Creative, Design & UX',
      id: 'creative',
      items: [
        { name: 'Dribbble Jobs', url: 'https://dribbble.com/jobs' },
        { name: 'Behance Jobs', url: 'https://www.behance.net/joblist' },
        { name: 'Creativepool', url: 'https://creativepool.com/jobs' },
        { name: 'Coroflot', url: 'https://www.coroflot.com/jobs' },
        { name: 'Krop', url: 'https://www.krop.com/jobs' }
      ]
    }
  ];

  // Python Data & AI Career Path Libraries (Image 1)
  const PYTHON_LIBRARIES_MAP = [
    { role: 'Data Analyst', libraries: ['Pandas (data cleaning)', 'NumPy (numerical ops)', 'Matplotlib (basic visualization)', 'Seaborn (statistical charts)', 'Plotly (interactive dashboards)', 'OpenPyXL (Excel automation)'] },
    { role: 'BI Analyst', libraries: ['Pandas (data preparation)', 'Polars (fast transforms)', 'DuckDB (analytical SQL)', 'Plotly (interactive reporting)', 'Streamlit (data apps)', 'SQLAlchemy (database access)'] },
    { role: 'Analytics Engineer', libraries: ['dbt-core (data transformation)', 'Pandas (dataset manipulation)', 'Polars (high-speed processing)', 'DuckDB (local analytics)', 'PyArrow (columnar data)', 'Great Expectations (data validation)'] },
    { role: 'Data Scientist', libraries: ['Pandas (data exploration)', 'NumPy (array computing)', 'SciPy (scientific analysis)', 'Statsmodels (statistical modeling)', 'scikit-learn (machine learning)', 'XGBoost (predictive modeling)'] },
    { role: 'Data Engineer', libraries: ['PySpark (distributed processing)', 'Apache Airflow (pipeline scheduling)', 'SQLAlchemy (database integration)', 'kafka-python (streaming ingestion)', 'Boto3 (AWS automation)', 'Great Expectations (quality checks)'] },
    { role: 'ML Engineer', libraries: ['scikit-learn (model development)', 'XGBoost (boosted models)', 'LightGBM (fast training)', 'TensorFlow (neural networks)', 'PyTorch (deep learning)', 'MLflow (experiment tracking)'] },
    { role: 'Deep Learning Engineer', libraries: ['PyTorch (model training)', 'TensorFlow (production learning)', 'Keras (neural network APIs)', 'JAX (accelerated computation)', 'Optuna (hyperparameter tuning)', 'Lightning (training workflows)'] },
    { role: 'NLP Engineer', libraries: ['NLTK (text processing)', 'spaCy (production NLP)', 'Transformers (language models)', 'Gensim (topic modeling)', 'SentenceTransformers (text embeddings)', 'TextBlob (sentiment analysis)'] },
    { role: 'Computer Vision Engineer', libraries: ['OpenCV (image processing)', 'Pillow (image manipulation)', 'torchvision (vision models)', 'Ultralytics (object detection)', 'Albumentations (image augmentation)', 'scikit-image (vision algorithms)'] },
    { role: 'Generative AI Engineer', libraries: ['Transformers (foundation models)', 'LangChain (LLM applications)', 'LlamaIndex (RAG pipelines)', 'LangGraph (agent workflows)', 'SentenceTransformers (embedding models)', 'vLLM (model inference)'] }
  ];

  // Interview Prep Playlist Data (Image 3)
  const PREP_PLAYLISTS = [
    { title: 'System Design Interview Prep', count: '46 Videos', desc: 'Covers core system design frameworks. Learn to design YouTube, Spotify, and Twitter from scratch.' },
    { title: 'Machine Learning Interview Prep', count: '27 Videos', desc: 'Focuses on ML system design frameworks, model lifecycle pipelines, and practical implementation examples.' },
    { title: 'Data Science Prep', count: '15 Videos', desc: 'Covers practical case studies, statistical modeling, probability, and mock data scientist interviews.' },
    { title: 'SQL Interview Prep', count: '8 Videos', desc: 'Deep dive into query optimization, index tuning, window functions, and real SQL coding round questions.' }
  ];

  const DSA_PROJECT_PAGES = [
    {
      title: '1/ Beginner Projects',
      color: 'from-blue-500 to-indigo-600',
      icon: '🌱',
      items: [
        { name: 'Student Record System', details: 'using Arrays' },
        { name: 'Contact Book', details: 'using Linked List' },
        { name: 'Undo/Redo Feature', details: 'using Stack' },
        { name: 'Printer Queue Simulation', details: 'using Queue' },
        { name: 'Browser History Manager', details: 'using Doubly Linked List' },
        { name: 'Music Playlist', details: 'using Circular Linked List' },
        { name: 'Balanced Brackets Validator', details: 'using Stack' },
        { name: 'Railway Reservation System', details: 'Queue-Based' },
        { name: 'Hospital Token System', details: 'Queue-Based' },
        { name: 'Palindrome Checker', details: 'using Deque' },
        { name: 'Spell Checker', details: 'using Hashing' },
        { name: 'Leaderboard Ranking System', details: 'using Sorting' },
        { name: 'Basic Library Management', details: 'using Arrays' },
        { name: 'Parking Lot Management', details: 'using Stack' },
        { name: 'Online Exam System', details: 'MCQ using Arrays' },
        { name: 'File Compression', details: 'using Huffman Coding' },
        { name: 'Simple Text Editor', details: 'with Undo/Redo' },
        { name: 'Maze Solver', details: 'using BFS' },
        { name: 'Phone Directory', details: 'using HashMap' },
        { name: 'Bank Account System', details: 'using Linked List' }
      ]
    },
    {
      title: '2/ Intermediate Projects',
      color: 'from-sky-500 to-cyan-500',
      icon: '⚡',
      items: [
        { name: 'LRU Cache Implementation', details: 'using Doubly Linked List + HashMap' },
        { name: 'LFU Cache System', details: 'using DLL + Frequency Map' },
        { name: 'URL Shortener', details: 'using Hashing' },
        { name: 'Autocomplete System', details: 'using Trie' },
        { name: 'Spell Checker', details: 'using Trie + Hashing' },
        { name: 'Task Scheduler', details: 'using Priority Queue' },
        { name: 'Event Booking System', details: 'using Arrays/Sorting' },
        { name: 'Rate Limiter', details: 'Token Bucket algorithm' },
        { name: 'Chat Application Backend', details: 'using Queue structure' },
        { name: 'File System Simulator', details: 'using N-ary Trees' },
        { name: 'Search Engine Indexing System', details: 'using Inverted Index' },
        { name: 'Social Network Friend Recommendation', details: 'Graph BFS' },
        { name: 'News Feed System', details: 'like Instagram, using Heaps' },
        { name: 'Calendar Booking System', details: 'Conflict Handling' },
        { name: 'Log Analyzer', details: 'using HashMap' },
        { name: 'Distributed Cache Simulation', details: 'Consistent Hashing' },
        { name: 'Shortest Path Finder', details: 'Dijkstra algorithm' },
        { name: 'Word Ladder Solver', details: 'Graph BFS' },
        { name: 'Expression Evaluator', details: 'Infix → Postfix' },
        { name: 'Stock Price Tracker', details: 'Segment Tree / Heap' }
      ]
    },
    {
      title: '3/ Advanced Projects',
      color: 'from-amber-500 to-orange-500',
      icon: '🔥',
      items: [
        { name: 'Distributed Key-Value Store', details: 'Mini Redis clone' },
        { name: 'Real-Time Recommendation System', details: 'Collaborative Filtering' },
        { name: 'Ride Matching System', details: 'like Ola/Uber, Graph-based' },
        { name: 'Scalable URL Crawling System', details: 'Queue & Hashing' },
        { name: 'Real-Time Leaderboard System', details: 'Redis + Heap logic' },
        { name: 'Distributed Task Queue System', details: 'using Message Brokers' },
        { name: 'Notification Delivery System', details: 'Pub/Sub architecture' },
        { name: 'API Rate Limiter', details: 'Distributed Token Bucket' },
        { name: 'Multi-Level Cache System', details: 'L1/L2 Cache hierarchy' },
        { name: 'Search Engine', details: 'Ranking + Indexing (Trie & Graph)' },
        { name: 'Real-Time Chat System', details: 'WebSocket + Queues' },
        { name: 'Graph-Based Dependency Resolver', details: 'Topological Sort' },
        { name: 'Fraud Detection Rule Engine', details: 'Decision Trees' },
        { name: 'Online Code Judge System', details: 'Sandbox Isolation & Queues' },
        { name: 'Multiplayer Game Matchmaking Engine', details: 'Priority Queues' },
        { name: 'Distributed Log Aggregation System', details: 'Ring Buffer' },
        { name: 'File Deduplication System', details: 'SHA-256 & Hashing' },
        { name: 'Consistent Hashing Load Balancer', details: 'Hashing ring' },
        { name: 'Event-Driven System using Message Queues', details: 'Pub-Sub' },
        { name: 'Traffic Routing & Optimization System', details: 'Graph algorithms' }
      ]
    },
    {
      title: '4/ Algorithmic & Graph Projects',
      color: 'from-emerald-500 to-teal-500',
      icon: '🔮',
      items: [
        { name: 'Autocomplete Keyboard', details: 'Trie, DFS' },
        { name: 'Word Dictionary with Wildcards', details: 'Trie, Backtracking' },
        { name: 'Graph Cycle Detection Tool', details: 'Graph, DFS' },
        { name: 'Top K Frequent Elements System', details: 'Heap, HashMap' },
        { name: 'Sliding Window Log Analyzer', details: 'Sliding Window, Hashing' },
        { name: 'Subarray Sum Visualizer', details: 'Prefix Sum, HashMap' },
        { name: 'Kth Largest Stream Processor', details: 'Heap' },
        { name: 'Merge K Sorted Lists Engine', details: 'Heap, Linked List' },
        { name: 'Task Dependency Resolver', details: 'Graph, Topological Sort' },
        { name: 'Course Planner System', details: 'Graph, BFS/DFS' },
        { name: 'Shortest Path Finder App', details: 'Graph, Dijkstra' },
        { name: 'Network Delay Simulator', details: 'Graph, Priority Queue' },
        { name: 'Island Counter Tool', details: 'Graph, DFS/BFS' },
        { name: 'Flood Fill Visualizer', details: 'Graph, BFS' },
        { name: 'Maze Path Finder', details: 'Backtracking, BFS' },
        { name: 'Sudoku Solver', details: 'Backtracking' },
        { name: 'N-Queens Visualizer', details: 'Backtracking' },
        { name: 'Permutation Generator Tool', details: 'Recursion, Backtracking' },
        { name: 'Combination Sum Solver', details: 'Backtracking' },
        { name: 'Palindrome Partitioning Tool', details: 'DP, Backtracking' }
      ]
    },
    {
      title: '5/ DP & Advanced Data Structures',
      color: 'from-fuchsia-500 to-pink-600',
      icon: '💎',
      items: [
        { name: 'Longest Increasing Subsequence Analyzer', details: 'DP, Binary Search' },
        { name: 'Knapsack Problem Simulator', details: 'DP' },
        { name: 'Coin Change Calculator', details: 'DP' },
        { name: 'Edit Distance Calculator', details: 'DP' },
        { name: 'Grid Path Optimizer', details: 'DP, Matrix' },
        { name: 'Minimum Cost Path Finder', details: 'DP' },
        { name: 'Word Break Validator', details: 'DP, Hashing' },
        { name: 'Longest Common Subsequence Tool', details: 'DP' },
        { name: 'Matrix Chain Multiplication Visualizer', details: 'DP' },
        { name: 'Burst Balloons Solver', details: 'DP, Interval' },
        { name: 'Balanced BST Generator', details: 'Tree, Recursion' },
        { name: 'Binary Tree Serializer/Deserializer', details: 'Tree, DFS' },
        { name: 'Lowest Common Ancestor Finder', details: 'Tree' },
        { name: 'Segment Tree Range Query Tool', details: 'Segment Tree' },
        { name: 'Fenwick Tree (BIT) Implementation', details: 'Binary Indexed Tree' },
        { name: 'Range Minimum Query System', details: 'Segment Tree' },
        { name: 'Interval Scheduling System', details: 'Greedy, Sorting' },
        { name: 'Meeting Room Allocator', details: 'Greedy, Heap' },
        { name: 'Huffman Coding Compressor', details: 'Greedy, Heap' },
        { name: 'Job Scheduling with Deadlines', details: 'Greedy, Heap' }
      ]
    }
  ];

  const getCardStyle = (index: number) => {
    const position = (index - stackIndex + 5) % 5;
    if (position === 0) {
      return { zIndex: 30, scale: 1, y: 0, opacity: 1, pointerEvents: 'auto' as const };
    } else if (position === 1) {
      return { zIndex: 20, scale: 0.95, y: 14, opacity: 0.85, pointerEvents: 'none' as const };
    } else if (position === 2) {
      return { zIndex: 10, scale: 0.90, y: 28, opacity: 0.60, pointerEvents: 'none' as const };
    } else {
      return { zIndex: 0, scale: 0.85, y: 42, opacity: 0, pointerEvents: 'none' as const };
    }
  };

  const getStepStatusClass = (stepNum: number) => {
    if (stepNum === activeStep) {
      return '!bg-slate-950 hover:!bg-slate-900 dark:!bg-slate-800 dark:hover:!bg-slate-700 !text-white shadow-md border-transparent';
    }
    return 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850';
  };

  const getDirTabClass = (tabId: string) => {
    if (tabId === activeDirTab) {
      return 'bg-slate-900 dark:bg-slate-800 text-white shadow-sm border-transparent';
    }
    return 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans antialiased">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-650 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Validating access key...</span>
        </div>
      </div>
    );
  }

  // Get active directory items to display on right side
  const activeDirectoryCategory = JOB_SEARCH_DIRECTORIES.find(d => d.id === activeDirTab);
  const activeDirectoryItems = activeDirectoryCategory ? activeDirectoryCategory.items : [];

  return (
    <div className="min-h-screen bg-[#f9faf7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-300">
      <Navbar />

      {!hasAccess ? (
        <div className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center max-w-2xl mb-8"
          >
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 border border-slate-800 dark:border-slate-700 uppercase tracking-widest inline-flex items-center gap-1.5 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Premium Career Resource
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight mb-3">
              Unlock the Ultimate Placement Prep Blueprint
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Get access to the step-by-step career path, master DSA from the right resources, optimize your resume/LinkedIn, and explore the curated job boards comparison directory.
            </p>
          </motion.div>

          <div className="w-full">
            <LockedSection
              plan="roadmaps"
              onUnlock={() => setPremiumModal({ open: true, plan: 'roadmaps' })}
              hasAccess={hasAccess}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fade-in">
          {/* Header Banner - Attracting Premium Design */}
          <div className="relative rounded-3xl overflow-hidden mb-10 border border-slate-800 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 sm:p-10 shadow-xl shadow-slate-950/40">
            {/* Glowing Gradient Background Shapes */}
            <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] rounded-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[150%] rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/10 pointer-events-none blur-3xl" />

            {/* Subtle background tech grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-20" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <button
                  onClick={() => navigate('/premium-content')}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-300 hover:text-white font-extrabold mb-4 transition-colors uppercase tracking-widest bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to Premium Packages
                </button>
                
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3 flex-wrap">
                  <Compass className="w-9 h-9 text-amber-500 animate-spin-slow shrink-0" />
                  <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                    Placement Prep &amp; Tools Blueprint
                  </span>
                </h1>
                
                <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed font-medium">
                  Step-by-step career development path to crack your first tech job. Follow the roadmap, master standard DSA stacks, and unlock our comparison directories.
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/15 to-yellow-500/5 border border-amber-500/30 rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-md shadow-lg shadow-amber-500/5">
                  <div className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[9px] font-black uppercase tracking-widest leading-none">
                      <Crown className="w-3 h-3 text-amber-450 animate-pulse shrink-0" />
                      <span>LIFETIME ACCESS</span>
                    </div>
                    <span className="text-[11px] font-black text-white mt-1 font-mono tracking-wide leading-none">ACTIVE &amp; UNLOCKED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Quotes Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'SKILL', sign: '>', value: 'DEGREE', color: 'border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200' },
              { label: 'CONSISTENCY', sign: '>', value: 'MOTIVATION', color: 'border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-emerald-600 dark:text-emerald-400' },
              { label: 'EXECUTION', sign: '>', value: 'PLANNING', color: 'border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-amber-600 dark:text-amber-400' },
              { label: '1 FOCUSED YEAR', sign: '→', value: 'CAREER BLUEPRINT', color: 'border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200' }
            ].map((q, idx) => (
              <div key={idx} className={`rounded-2xl p-4 text-center border shadow-xs ${q.color}`}>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">{q.label}</span>
                <span className="text-xs font-bold block my-0.5">{q.sign}</span>
                <span className="text-xs font-black uppercase tracking-wide block">{q.value}</span>
              </div>
            ))}
          </div>

          {/* SECTION 1: 5-STEP ROADMAP */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-slate-900 dark:bg-slate-100 rounded-full" />
              <h2 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 tracking-wider uppercase">
                5-Step Freshers Career Roadmap
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Step Navigation Tabs (Left) */}
              <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0 scrollbar-none">
                {ROADMAP_STEPS.map(s => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 ${getStepStatusClass(s.step)}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-mono border ${
                      s.step === activeStep 
                        ? 'bg-white/20 text-white border-transparent' 
                        : 'bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-750'
                    }`}>
                      {s.step}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold block uppercase tracking-wider opacity-75">Stage 0{s.step}</span>
                      <span className="text-xs font-bold truncate block">{s.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Step Detail Content (Right) */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {ROADMAP_STEPS.map(s => s.step === activeStep && (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5"
                    >
                      {/* Step Header */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                          {s.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black text-slate-850 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                              Stage 0{s.step}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">( {s.subtitle} )</span>
                          </div>
                          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                            {s.title}
                          </h3>
                        </div>
                      </div>

                      {/* Tagline Alert */}
                      <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800/80 rounded-xl p-3.5 flex gap-2.5 items-start">
                        <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-350 leading-relaxed">
                          {s.tagline}
                        </p>
                      </div>

                      {/* Focus Topics List */}
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3">
                          Key Areas to Focus:
                        </h4>
                        <div className="space-y-3.5">
                          {s.focus.map((f, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start">
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                                  {f.name}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5 leading-relaxed">
                                  {f.desc}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Extra Recommendations */}
                      {('recommendations' in s || 'creators' in s) && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {('recommendations' in s) && (
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Recommended Languages:</span>
                              <div className="flex gap-1.5 flex-wrap">
                                {s.recommendations?.map(r => (
                                  <span key={r} className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {('creators' in s) && (
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Top Instructors:</span>
                              <div className="flex gap-1.5 flex-wrap">
                                {s.creators?.map(c => (
                                  <span key={c} className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* COLLAPSIBLE ACCORDIONS CONTAINER */}
          <div className="space-y-5 mb-12">
            
            {/* ACCORDION 1: 2026 MASTER JOB SEARCH DIRECTORIES (TABBED LAYOUT) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection('directories')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      2026 Master Job Search Directories
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Explore curated directories for tech, remote, startups, design, and internships</p>
                  </div>
                </div>
                <div>
                  {openSections.directories ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              <AnimatePresence>
                {openSections.directories && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-150 dark:border-slate-800"
                  >
                    <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/20">
                      <div className="flex flex-col gap-5 w-full">
                        {/* Subheading select selector */}
                        <div className="max-w-md w-full">
                          <label htmlFor="directory-select" className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5 tracking-wider">
                            Choose Directory Category:
                          </label>
                          <div className="relative">
                            <select
                              id="directory-select"
                              value={activeDirTab}
                              onChange={(e) => setActiveDirTab(e.target.value)}
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 pr-10 text-xs font-bold text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-700 appearance-none shadow-xs cursor-pointer"
                            >
                              {JOB_SEARCH_DIRECTORIES.map(dir => (
                                <option key={dir.id} value={dir.id}>
                                  {dir.category}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* Platform links cards full width */}
                        <div className="w-full">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeDirTab}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                            >
                              {activeDirectoryItems.map((web, i) => (
                                <a
                                  key={web.name}
                                  href={web.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/15 rounded-xl border border-slate-150 dark:border-slate-800 hover:border-emerald-250 dark:hover:border-emerald-900 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
                                >
                                  <span className="text-xs font-bold text-blue-605 dark:text-blue-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {web.name}
                                  </span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors shrink-0" />
                                </a>
                              ))}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACCORDION 2: PYTHON LIBRARIES FOR DATA & AI CAREER PATHS */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection('pythonLibs')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      Python Libraries for Data & AI Careers
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Essential package roadmaps for Data Analysts, MLEs, and GenAI Engineers</p>
                  </div>
                </div>
                <div>
                  {openSections.pythonLibs ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              <AnimatePresence>
                {openSections.pythonLibs && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-150 dark:border-slate-800"
                  >
                    <div className="p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PYTHON_LIBRARIES_MAP.map((roleMap, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2.5 shadow-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-xs text-amber-600 dark:text-amber-400">
                                {roleMap.role}
                              </span>
                              <span className="text-[9px] font-bold text-slate-450 bg-slate-50 dark:bg-slate-955 px-1.5 py-0.5 rounded">
                                {roleMap.libraries.length} Libraries
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {roleMap.libraries.map((lib, i) => (
                                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 dark:bg-slate-950 text-slate-655 dark:text-slate-400 border border-slate-100 dark:border-slate-900">
                                  {lib}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACCORDION 3: STUDY PLAYLISTS & CHANNELS */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection('playlists')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      Curated Interview Prep Playlists
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">High-yield study resources for System Design, ML, and SQL prep</p>
                  </div>
                </div>
                <div>
                  {openSections.playlists ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              <AnimatePresence>
                {openSections.playlists && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-150 dark:border-slate-800"
                  >
                    <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/20">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PREP_PLAYLISTS.map((list, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2 shadow-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-xs text-slate-850 dark:text-slate-200">
                                {list.title}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase shrink-0">
                                {list.count}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed mt-1">
                              {list.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Creators Grid list */}
                      <div className="mt-8 border-t border-slate-200 dark:border-slate-850 pt-6">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-4">
                          Instructors Directory (Select 2-3 and stick to them):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { domain: 'DSA Stacks', creators: BONUS_CREATORS.dsa },
                            { domain: 'Web Development', creators: BONUS_CREATORS.webdev },
                            { domain: 'System Design', creators: BONUS_CREATORS.sysdesign },
                            { domain: 'Artificial Intelligence & ML', creators: BONUS_CREATORS.aiml },
                            { domain: 'Practical/Mixed Dev', creators: BONUS_CREATORS.mixed }
                          ].map((group, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2.5">
                              <span className="text-xs font-bold text-slate-905 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                                {group.domain}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {group.creators.map(c => (
                                  <span key={c} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-semibold rounded border border-slate-100 dark:border-slate-900">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACCORDION 4: 100 DSA PROJECT IDEAS (INTERACTIVE BUNDLE STACK) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection('dsaProjects')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      100 DSA Project Ideas Blueprint
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Explore 100 curated projects from Beginner to DP &amp; Advanced Trees</p>
                  </div>
                </div>
                <div>
                  {openSections.dsaProjects ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              <AnimatePresence>
                {openSections.dsaProjects && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-150 dark:border-slate-800"
                  >
                    <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-955/20 flex flex-col items-center">
                      
                      {/* Interactive stack instructions */}
                      <p className="text-xs text-slate-550 dark:text-slate-400 mb-6 text-center max-w-md">
                        Click the active card or press "Next Deck" to rotate the stack and view projects sorted by difficulty.
                      </p>

                      {/* Stack Container */}
                      <div className="relative w-full max-w-3xl h-[1120px] sm:h-[635px] mb-8">
                        {DSA_PROJECT_PAGES.map((card, idx) => {
                          const isTop = idx === stackIndex;
                          const style = getCardStyle(idx);
                          return (
                            <motion.div
                              key={card.title}
                              onClick={isTop ? handleSwipe : undefined}
                              style={{ pointerEvents: style.pointerEvents }}
                              animate={
                                isTop && swiping
                                  ? { x: 360, rotate: 12, opacity: 0, scale: 0.95 }
                                  : { x: 0, rotate: 0, scale: style.scale, y: style.y, opacity: style.opacity, zIndex: style.zIndex }
                              }
                              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                              className={`absolute inset-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between cursor-pointer select-none`}
                            >
                              <div>
                                {/* Card Header */}
                                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800 mb-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">{card.icon}</span>
                                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                                      {card.title}
                                    </h4>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-slate-400">
                                    20 PROJECTS
                                  </span>
                                </div>

                                {/* Items Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                  {card.items.map((p, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                      <span className="text-amber-500 font-bold shrink-0">•</span>
                                      <div className="min-w-0">
                                        <span className="font-extrabold text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 block truncate leading-tight">
                                          {p.name}
                                        </span>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate leading-tight mt-0.5">
                                          {p.details}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Footer indicator */}
                              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-[10px] font-bold text-slate-400">
                                <span>DECK {idx + 1} OF 5</span>
                                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-0.5 group-hover:text-emerald-500 transition-colors">
                                  Click Card to Swipe →
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Navigation controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setStackIndex(prev => (prev - 1 + 5) % 5)}
                          className="px-4.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all shadow-sm"
                        >
                          ← Previous Deck
                        </button>
                        <button
                          onClick={handleSwipe}
                          disabled={swiping}
                          className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white hover:text-emerald-400 text-xs font-black shadow-md transition-all"
                        >
                          Next Deck →
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACCORDION 5: HIGH-YIELD CAREER EXAMS B.TECH STUDENTS MUST CONSIDER */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection('exams')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      High-Yield Career Exams B.Tech Students Must Consider
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Stream-based eligibility, strategic priorities, and officer path comparison matrix</p>
                  </div>
                </div>
                <div>
                  {openSections.exams ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              <AnimatePresence>
                {openSections.exams && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-150 dark:border-slate-800"
                  >
                    <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/20 space-y-6">
                      
                      {/* Filter Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-xs">
                        <div>
                          <span className="text-xs font-black text-slate-850 dark:text-slate-200 uppercase tracking-wider block">
                            Filter by Engineering Stream
                          </span>
                          <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 block">
                            Updates priority ratings, eligibility, and custom technical advice
                          </span>
                        </div>
                        <div className="flex gap-1.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none">
                          {[
                            { id: 'all', label: 'All Branches (Default)' },
                            { id: 'cse_it', label: 'B.Tech CSE/IT Stacks' },
                            { id: 'core_engg', label: 'Core Streams (ECE, EE, ME, CE)' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setExamBranchFilter(opt.id as any)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${
                                examBranchFilter === opt.id
                                  ? 'bg-slate-950 text-white dark:bg-slate-800 dark:text-white border-transparent shadow-sm'
                                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Special Focus: Strategy Tracks */}
                      <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                          <Crown className="w-20 h-20 text-amber-500" />
                        </div>
                        <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          Advisor's Strategic Blueprint for {examBranchFilter === 'cse_it' ? 'CSE/IT Stacks' : (examBranchFilter === 'core_engg' ? 'Core engineering' : 'B.Tech Students')}
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-450 leading-relaxed mb-4">
                          Three specialized preparation tracks to target tech placements, administrative authority, or higher study streams.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Track A */}
                          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-amber-500/10 flex flex-col gap-2.5">
                            <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded self-start">
                              Track A: Software Engineer
                            </span>
                            <div className="space-y-1.5">
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-emerald-500 font-extrabold">1.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>Core Placements:</strong> Focus heavily on DSA + Development workflows.
                                </span>
                              </div>
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-emerald-500 font-extrabold">2.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>GATE (Optional):</strong> Keep as a backup for M.Tech at top IITs/IISc or high-tier PSUs.
                                </span>
                              </div>
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-emerald-500 font-extrabold">3.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>CAT Target:</strong> Target after 1-2 years of software engineering experience for premium management roles.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Track B */}
                          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-amber-500/10 flex flex-col gap-2.5">
                            <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded self-start">
                              Track B: Government Officer
                            </span>
                            <div className="space-y-1.5">
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-amber-500 font-extrabold">1.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>High Prestige:</strong> UPSC Civil Services (IAS/IPS/IFS) or State PCS.
                                </span>
                              </div>
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-amber-500 font-extrabold">2.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>Regulatory Authorities:</strong> RBI Grade B, SEBI Grade A, and NABARD Grade A.
                                </span>
                              </div>
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-amber-500 font-extrabold">3.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>Low Competition:</strong> IB ACIO, EPFO EO/AO, IRDAI Grade A, and Insurance AO.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Track C */}
                          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-xl border border-amber-500/10 flex flex-col gap-2.5">
                            <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded self-start">
                              Track C: Higher Studies
                            </span>
                            <div className="space-y-1.5">
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-blue-500 font-extrabold">1.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>GATE Prep:</strong> Target M.Tech/MS at IISc, IITs, or NITs for research/higher packages.
                                </span>
                              </div>
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-blue-500 font-extrabold">2.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>Technical Scientist:</strong> Target ISRO Scientist ICRB or BARC Scientific Officer recruitment.
                                </span>
                              </div>
                              <div className="flex gap-2 items-start text-xs">
                                <span className="text-blue-500 font-extrabold">3.</span>
                                <span className="text-slate-700 dark:text-slate-350 leading-normal">
                                  <strong>Research &amp; PhD:</strong> Global PhD/MS programs (GATE valid for NUS/NTU, GRE/TOEFL for Western universities).
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Exams List Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CAREER_EXAMS.filter(exam => {
                          if (examBranchFilter === 'all') return true;
                          return exam.applicableBranches.includes(examBranchFilter);
                        }).map(exam => {
                          const priorityStr = examBranchFilter === 'cse_it' 
                            ? exam.priorityCSE 
                            : (examBranchFilter === 'core_engg' ? exam.priorityCore : `CS: ${exam.priorityCSE} | Core: ${exam.priorityCore}`);
                          
                          const ratingNum = parseFloat(priorityStr);
                          const isHighPriority = ratingNum >= 8.5;
                          
                          const priorityColorClass = isHighPriority 
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' 
                            : 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30';

                          return (
                            <div key={exam.id} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                              <div className="space-y-3">
                                {/* Exam Header */}
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                                    {exam.tier}
                                  </span>
                                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${priorityColorClass}`}>
                                    Priority: {examBranchFilter === 'all' 
                                      ? (exam.applicableBranches.includes('cse_it') ? exam.priorityCSE.split(' ')[0] : exam.priorityCore.split(' ')[0]) 
                                      : priorityStr.split(' ')[0]
                                    }
                                  </span>
                                </div>

                                <div>
                                  <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                                    {exam.name}
                                  </h4>
                                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-450 mt-1">
                                    Target: {exam.target}
                                  </p>
                                </div>

                                <div className="text-[11px] space-y-2 border-t border-slate-100 dark:border-slate-850 pt-2.5">
                                  <div>
                                    <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase text-[9px] block">Eligibility:</span>
                                    <span className="text-slate-700 dark:text-slate-350 leading-normal block mt-0.5">{exam.eligibility}</span>
                                  </div>

                                  <div>
                                    <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase text-[9px] block">Key Benefits:</span>
                                    <div className="space-y-1 mt-1">
                                      {exam.benefits.map((b, idx) => (
                                        <div key={idx} className="flex gap-1.5 items-start">
                                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                          <span className="text-slate-655 dark:text-slate-400 leading-normal">{b}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {exam.downsides && (
                                    <div>
                                      <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase text-[9px] block">Downsides/Challenges:</span>
                                      <span className="text-slate-600 dark:text-slate-450 leading-normal block mt-0.5">{exam.downsides}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-end">
                                <a
                                  href={`https://www.google.com/search?q=${encodeURIComponent(exam.name + ' eligibility exam dates syllabus benefits')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-black text-blue-605 hover:text-emerald-500 dark:text-blue-400 dark:hover:text-emerald-400 transition-colors"
                                >
                                  <span>Search Deep Details</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Action Banner */}
          <div className="mt-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
            <span className="text-2xl">⚡</span>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Your Career Trajectory Starts Today</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              Knowledge without execution is useless. Pick one language, open LeetCode, block out the distractions, and stick to your study schedule.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white hover:text-emerald-400 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition-all"
            >
              Start Studying Now <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Payment Modals */}
      <PremiumModal
        open={premiumModal.open}
        onClose={() => setPremiumModal(p => ({ ...p, open: false }))}
        plan={premiumModal.plan}
        onSuccess={checkPurchase}
      />

      <Footer />
    </div>
  );
}

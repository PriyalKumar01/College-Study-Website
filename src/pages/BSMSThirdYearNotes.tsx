import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const semesters = [
  {
    sem: '5th Semester',
    subtitle: 'BS-MS Advanced Machine Learning & Data Science',
    image: '/bsms_sem5.png',
    description: 'Principles of Data Science, Machine Learning, Modern Algebra, Topology & Geometry, and Computational Statistics.',
    tags: ['Machine Learning', 'Data Science', 'Modern Algebra', 'Topology'],
    href: '/bsms/sem-5',
  },
  {
    sem: '6th Semester',
    subtitle: 'BS-MS Deep Learning & Big Data Analytics',
    image: '/bsms_sem6.png',
    description: 'Deep Learning Architectures, Fundamental of Computing (TOC), Functional Analysis, Big Data Analytics, and Program Electives.',
    tags: ['Deep Learning', 'Big Data Analytics', 'Computing', 'Functional Analysis'],
    href: '/bsms/sem-6',
  },
];

const BSMSThirdYearNotes = () => {
  const navigate = useNavigate();

  const handleWhatsAppShare = (semName: string, href: string) => {
    const shareUrl = `${window.location.origin}${href}`;
    const message = `Check out BS-MS ${semName} Notes on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner Header */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/bsms-notes')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/80 shadow-sm text-xs font-bold tracking-wide transition-all mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to BS-MS Years
          </button>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="w-10 h-10 rounded-xl bg-background/10 border border-background/20 flex items-center justify-center text-primary shadow-inner">
              <Layers className="h-5 w-5 text-current" />
            </div>
            <span className="bg-indigo-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              + OFFICIAL HBTU CURRICULUM
            </span>
            <span className="bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3RD YEAR ACTIVE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
            BS-MS 3rd Year Semesters
          </h1>
          <p className="opacity-70 text-sm sm:text-base max-w-2xl leading-relaxed">
            Select your semester to access curated Machine Learning, Deep Learning, Big Data, and advanced mathematical sciences study resources and PYQs.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {semesters.map((sem, index) => (
            <motion.div
              key={sem.sem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.35 }}
              className="group"
            >
              <div
                className="h-full rounded-2xl bg-card border border-border shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-indigo-500/40"
                onClick={() => navigate(sem.href)}
              >
                {/* Image Banner */}
                <div className="relative h-60 overflow-hidden bg-muted">
                  <img
                    src={sem.image}
                    alt={sem.sem}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Share button */}
                  <button
                    className="absolute top-4 right-4 z-10 w-9 h-9 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:scale-110 transition-all border border-border shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppShare(sem.sem, sem.href);
                    }}
                    title="Share on WhatsApp"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>

                  {/* Overlay tags */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {sem.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/50 text-white border border-white/20 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {sem.sem}
                    </h2>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {sem.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {sem.description}
                  </p>

                  <button
                    onClick={() => navigate(sem.href)}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 border border-slate-700 dark:border-slate-300 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <BookOpen className="h-4 w-4" />
                    View Semester Materials & PYQs
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BSMSThirdYearNotes;

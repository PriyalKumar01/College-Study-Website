import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Binary, Layers, CheckCircle2, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const semesters = [
  {
    sem: '3rd Semester',
    subtitle: 'BS-MS Science & Data Foundations',
    image: '/bsms_sem3.png',
    description: 'Engineering Mathematics-II, Economics & Management, Statistical Methods, Data Structures & Algorithms, PRP, and Real Analysis.',
    tags: ['Engg. Maths-II', 'Data Structures', 'Statistical Methods', 'Real Analysis'],
    href: '/bsms/sem-3',
  },
  {
    sem: '4th Semester',
    subtitle: 'BS-MS Computational & Optimization Methods',
    image: '/bsms_sem4.png',
    description: 'Engineering Mathematics-III, CONM, Numerical Optimization, Discrete Maths Structures, Computational Linear Algebra (CLA), and R for Data Science.',
    tags: ['Engg. Maths-III', 'CONM', 'Optimization', 'Linear Algebra', 'R for DS'],
    href: '/bsms/sem-4',
  },
];

const BSMSSecondYearNotes = () => {
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
              <Binary className="h-5 w-5 text-current" />
            </div>
            <span className="bg-violet-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              + OFFICIAL HBTU CURRICULUM
            </span>
            <span className="bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 2ND YEAR ACTIVE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
            BS-MS 2nd Year Semesters
          </h1>
          <p className="opacity-70 text-sm sm:text-base max-w-2xl leading-relaxed">
            Select your semester to access curated Mathematics, Numerical Methods, Data Structures, and Optimization study materials, playlists, and PYQs.
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
                className="h-full rounded-2xl bg-card border border-border shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-violet-500/40"
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
                    <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-0.5">
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

export default BSMSSecondYearNotes;

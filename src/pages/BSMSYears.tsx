import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const years = [
  {
    year: '1st Year',
    semesters: 'Semester 1 & 2',
    description: 'Same as B.Tech 1st year — common 1st & 2nd semester resources.',
    note: 'Shared with B.Tech 1st year curriculum',
    status: 'available',
    image: '/bsms_year1.png',
    fallbackGradient: 'from-blue-600 to-blue-800',
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/btech-notes/first-year'),
    buttonLabel: 'Go to 1st Year',
    icon: <ExternalLink className="h-4 w-4" />,
  },
  {
    year: '2nd Year',
    semesters: 'Semester 3 & 4',
    description: 'BS-MS specific subjects from 2nd year onwards. Core science & research foundation.',
    status: 'available',
    image: '/bsms_year2.png',
    fallbackGradient: 'from-purple-600 to-purple-800',
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/bsms-notes/second-year'),
    buttonLabel: 'View Semesters',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    year: '3rd Year',
    semesters: 'Semester 5 & 6',
    description: 'Advanced science subjects — quantum mechanics, electrodynamics, and specializations.',
    status: 'available',
    image: '/bsms_year3.png',
    fallbackGradient: 'from-indigo-600 to-indigo-800',
    onClick: (navigate: ReturnType<typeof useNavigate>) => navigate('/bsms-notes/third-year'),
    buttonLabel: 'View Semesters',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    year: '4th Year',
    semesters: 'Semester 7 & 8',
    description: 'Advanced specialization and research project work.',
    status: 'coming-soon',
    image: '/bsms_year4.png',
    fallbackGradient: 'from-slate-500 to-slate-700',
    onClick: () => {},
    buttonLabel: 'Coming Soon',
    icon: <Lock className="h-4 w-4" />,
  },
  {
    year: '5th Year',
    semesters: 'Semester 9 & 10',
    description: "Master's level research, thesis, and dissertation.",
    status: 'coming-soon',
    image: '/bsms_year5.png',
    fallbackGradient: 'from-slate-500 to-slate-700',
    onClick: () => {},
    buttonLabel: 'Coming Soon',
    icon: <Lock className="h-4 w-4" />,
  },
];

const BSMSYears = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner Header — Responsive */}
      <div className="bg-slate-900 text-white dark:bg-slate-950 dark:text-slate-100 pt-24 pb-14 px-4 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <button
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider opacity-60 hover:opacity-100 transition-opacity mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Categories
          </button>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="w-10 h-10 rounded-xl bg-background/10 border border-background/20 flex items-center justify-center text-primary shadow-inner text-xl">
              🔬
            </div>
            <span className="bg-violet-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              5-YEAR INTEGRATED SCIENCE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
            BS-MS Notes by Year
          </h1>
          <p className="opacity-70 text-sm sm:text-base max-w-2xl leading-relaxed">
            Select your academic year to access specialized science notes, lab manuals, research topics, and course structure.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full space-y-8">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="p-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 text-foreground shadow-sm"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm leading-relaxed">
              <p className="font-bold text-violet-600 dark:text-violet-400 mb-1">About BS-MS Curriculum</p>
              <p className="opacity-80">
                The BS-MS dual degree is a 5-year integrated science programme. The <strong>1st year syllabus is shared with B.Tech</strong> (Sem 1 & 2). From <strong>2nd year onwards</strong>, BS-MS students have a dedicated syllabus with specialized science subjects.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Year Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year, index) => {
            const available = year.status === 'available';
            return (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="group"
              >
                <div
                  className={`h-full rounded-2xl bg-card border border-border shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
                    available ? 'cursor-pointer hover:-translate-y-1 hover:border-violet-500/40' : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={available ? () => year.onClick(navigate) : undefined}
                >
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={year.image}
                      alt={year.year}
                      className={`w-full h-full object-cover transition-transform duration-500 ${available ? 'group-hover:scale-105' : ''}`}
                      onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {!available && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1.5 rounded-full border border-border">
                          🔒 Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-0.5">
                        {year.year}
                      </h3>
                      <p className="text-xs text-violet-600 dark:text-violet-400 font-bold">{year.semesters}</p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{year.description}</p>

                    {year.note && (
                      <span className="inline-block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-0.5 w-fit">
                        {year.note}
                      </span>
                    )}

                    <button
                      disabled={!available}
                      onClick={available ? () => year.onClick(navigate) : undefined}
                      className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                        available
                          ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 border border-slate-700 dark:border-slate-300 shadow-md hover:shadow-lg'
                          : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
                      }`}
                    >
                      {year.icon}
                      {year.buttonLabel}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BSMSYears;

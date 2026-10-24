import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Mail, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

const noteCategories = [
  {
    id: 'btech',
    title: 'B.Tech Notes',
    description: 'Semester-wise engineering notes for all branches',
    route: '/btech-notes',
    image: '/card_btech.png',
    badge: 'All 1st to 4th Years Notes',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    accentColor: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'bsms',
    title: 'BS-MS Notes',
    description: 'Integrated Bachelor-Master of Science programme materials',
    route: '/bsms-notes',
    image: '/card_bsms.png',
    badge: 'Complete BS-MS Notes',
    badgeColor: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    accentColor: 'from-violet-500 to-violet-700',
  },
  {
    id: 'mba',
    title: 'MBA Notes',
    description: 'Master of Business Administration comprehensive study materials',
    route: '/mba-notes',
    image: '/card_mba.png',
    badge: '1st – 4th Sem',
    badgeColor: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    accentColor: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 'bpharma',
    title: 'B.Pharma Notes',
    description: 'Bachelor of Pharmacy — Pharmaceutical sciences, labs & past papers',
    route: '/bpharma-notes',
    image: '/card_bpharma.png',
    badge: '1st – 8th Sem',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    accentColor: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'bba',
    title: 'BBA Notes',
    description: 'Bachelor of Business Administration study materials',
    route: '/bba-notes',
    image: '/card_bba.png',
    badge: '1st – 6th Sem',
    badgeColor: 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    accentColor: 'from-pink-500 to-rose-600',
  },
  {
    id: 'dsa',
    title: 'DSA Notes',
    description: 'Data Structures & Algorithms — complete topic coverage',
    route: '/dsa-notes',
    image: '/card_dsa.png',
    badge: '50+ Topics',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    accentColor: 'from-emerald-500 to-green-600',
  },
  {
    id: 'coding',
    title: 'Coding Material',
    description: 'Programming languages and coding practice resources',
    route: '/coding-study-material',
    image: '/card_coding.png',
    badge: 'Multi Language',
    badgeColor: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    accentColor: 'from-purple-500 to-purple-700',
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Frontend, backend and full-stack development notes',
    route: '/web-development-notes',
    image: '/card_webdev.png',
    badge: 'Full Stack',
    badgeColor: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    accentColor: 'from-orange-500 to-orange-600',
  },
  {
    id: 'placement',
    title: 'Placement Prep',
    description: 'Resume building, interview guide & complete career success kit',
    route: '/placement-preparation',
    image: '/card_placement.png',
    badge: 'Career Guide',
    badgeColor: 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    accentColor: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'gate',
    title: 'GATE Study',
    description: 'GATE exam preparation notes, syllabus, materials & PYQs Quiz',
    route: '/gate-study',
    image: '/card_gate.png',
    badge: 'PYQs Quiz Included',
    badgeColor: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    accentColor: 'from-purple-600 to-indigo-600',
  },
];

const NotesCategories = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background transition-colors duration-300 flex flex-col font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center pt-2"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            📚 Choose Your Notes Category
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Access comprehensive, well-organised study materials, syllabus, and past exam papers for every course.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {noteCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <Link to={cat.route} className="block h-full">
                <div className="h-full rounded-2xl bg-white dark:bg-card border border-border/70 hover:border-primary/50 shadow-sm hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 overflow-hidden flex flex-col">

                  {/* Card image — tall enough to show full image */}
                  <div className="h-56 overflow-hidden bg-slate-100 dark:bg-slate-800/50">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 gap-2">
                    {/* Title + badge row */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors leading-tight">
                        {cat.title}
                      </h3>
                      <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                      {cat.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                        <Sparkles className="h-4 w-4" />
                        <span>High Quality Content</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${cat.accentColor} group-hover:translate-x-1 transition-transform duration-300`}>
                        <span>Explore</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Contact / Footer Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8">
            <div className="text-center md:text-left">
              <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">For Any Query</p>
              <h3 className="text-white text-2xl font-bold">Contact the Founder</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-[11px] uppercase tracking-wide">Founder</p>
                  <p className="text-white font-semibold text-sm">Priyal Kumar</p>
                </div>
              </div>

              <a
                href="mailto:collegestudy.support@gmail.com"
                className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-[11px] uppercase tracking-wide">Email</p>
                  <p className="text-blue-600 font-semibold text-sm">collegestudy.support@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NotesCategories;

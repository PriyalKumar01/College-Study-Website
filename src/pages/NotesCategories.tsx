import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Award, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { AdminApplicationModal } from '@/components/AdminApplicationModal';

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
  const [showAdminModal, setShowAdminModal] = useState(false);

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

        {/* ── Apply for Website Admin Section (Square, Professional Blue-White Tint) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="border border-sky-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-sky-50/60 to-slate-50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 rounded-none sm:rounded-[4px] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Content Area */}
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-700 dark:text-sky-400 bg-sky-100/80 dark:bg-sky-950/60 px-2.5 py-1 rounded-none sm:rounded-[2px] border border-sky-300/50 dark:border-sky-800/60">
                <Shield className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                <span>STUDENT LEADERSHIP & VOLUNTEERING</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Do you want to Apply for Website Admin?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Become your branch & academic year's official student administrator. Lead academic content quality and help thousands of students study effectively.
                </p>
              </div>

              {/* Responsibilities & Perks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Responsibilities */}
                <div className="bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 p-3.5 rounded-none sm:rounded-[3px] space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Key Responsibilities
                  </span>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                    <li>• Har Mid Sem-1, 2 aur End Sem ke baad apni branch ke official PYQs timely upload karne honge.</li>
                    <li>• Apni branch me jo kami ya missing subject notes lagein, unhe student welfare ke liye upload karna.</li>
                    <li>• Notes quality check karna aur best handwritten study material provide karna.</li>
                  </ul>
                </div>

                {/* Exclusive Perks */}
                <div className="bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 p-3.5 rounded-none sm:rounded-[3px] space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    Admin Perks & Recognition
                  </span>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                    <li>• <strong>Admin Recognition</strong>: Website Admins & Contributors Wall of Fame me aapka naam publicly show hoga.</li>
                    <li>• <strong>Admin Powers</strong>: Direct scholarships add karne aur study materials upload karne ki power.</li>
                    <li>• <strong>Uploader Credit</strong>: Har contributed PDF par aapka naam publicly showcase hoga.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-stretch lg:items-end gap-2.5">
              <button
                onClick={() => setShowAdminModal(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-none sm:rounded-[3px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                <span>Apply for Website Admin</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center lg:text-right">
                1-minute quick application · Reviewed by Founder
              </p>
            </div>

          </div>
        </motion.div>

        <AdminApplicationModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
        />

      </div>
    </div>
  );
};

export default NotesCategories;
// Reviewed: academic catalog & interface consistency check (v2.0.209)

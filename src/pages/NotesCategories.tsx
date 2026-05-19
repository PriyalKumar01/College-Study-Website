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
    badgeColor: 'bg-blue-100 text-blue-700',
    accentColor: 'from-blue-500 to-blue-700',
  },
  {
    id: 'bsms',
    title: 'BS-MS Notes',
    description: 'Integrated Bachelor-Master of Science programme materials',
    route: '/bsms-notes',
    image: '/card_bsms.png',
    badge: 'Complete BS-MS Notes',
    badgeColor: 'bg-violet-100 text-violet-700',
    accentColor: 'from-violet-500 to-violet-700',
  },
  {
    id: 'mba',
    title: 'MBA Notes',
    description: 'Master of Business Administration comprehensive study materials',
    route: '/mba-notes',
    image: '/card_mba.png',
    badge: '1st – 4th Sem',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    accentColor: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 'bba',
    title: 'BBA Notes',
    description: 'Bachelor of Business Administration study materials',
    route: '/bba-notes',
    image: '/card_bba.png',
    badge: '1st – 6th Sem',
    badgeColor: 'bg-pink-100 text-pink-700',
    accentColor: 'from-pink-500 to-rose-600',
  },
  {
    id: 'dsa',
    title: 'DSA Notes',
    description: 'Data Structures & Algorithms — complete topic coverage',
    route: '/dsa-notes',
    image: '/card_dsa.png',
    badge: '50+ Topics',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    accentColor: 'from-emerald-500 to-green-600',
  },
  {
    id: 'coding',
    title: 'Coding Material',
    description: 'Programming languages and coding practice resources',
    route: '/coding-study-material',
    image: '/card_coding.png',
    badge: 'Multi Language',
    badgeColor: 'bg-purple-100 text-purple-700',
    accentColor: 'from-purple-500 to-purple-700',
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Frontend, backend and full-stack development notes',
    route: '/web-development-notes',
    image: '/card_webdev.png',
    badge: 'Full Stack',
    badgeColor: 'bg-orange-100 text-orange-700',
    accentColor: 'from-orange-500 to-orange-600',
  },
  {
    id: 'placement',
    title: 'Placement Prep',
    description: 'Resume building, interview guide & complete career success kit',
    route: '/placement-preparation',
    image: '/card_placement.png',
    badge: 'Career Guide',
    badgeColor: 'bg-teal-100 text-teal-700',
    accentColor: 'from-teal-500 to-cyan-600',
  },
];

const NotesCategories = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e8f0fe 40%, #f0f4ff 100%)' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* ── Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl overflow-hidden shadow-xl"
          style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-8 md:p-12">
            {/* Left content */}
            <div className="flex-1 space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                College Study Community
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Study Better With{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #4f46e5, #2563eb)' }}>
                  Curated Notes
                </span>
              </h1>

              <div className="space-y-3 text-sm md:text-base text-gray-600">
                <p>
                  ✨ <strong>Structured Notes + PYQs:</strong> Score well using curated notes and AI Tools to reinforce learning.
                </p>
                <p>
                  🎉 <strong>Enjoy College Life:</strong> Make memories, participate in events, and lead clubs while studying smart.
                </p>
                <p>
                  📅 <strong>Study Smart:</strong> Prepare 3–4 days or 1 week before exams based on your learning style.
                </p>
                <p>
                  🎯 <strong>Maintain GPA:</strong> 8.0+ is excellent. A minimum of 6.5–7.0 is required by most companies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <Link
                  to="/cgpa-calculator"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-white font-semibold text-xs whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #2563eb)' }}
                >
                  🎓 CGPA Calculator
                </Link>
                <Link
                  to="/scholarship-portal"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-white font-semibold text-xs whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
                >
                  🏆 Scholarships
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-white font-semibold text-xs whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}
                >
                  💼 Opportunities
                </Link>
                <Link
                  to="/ats-friendly-resume"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-white font-semibold text-xs whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #db2777, #9333ea)' }}
                >
                  📄 ATS Resume
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="flex-shrink-0 w-full md:w-80 lg:w-96">
              <img
                src="/notes_hero_students.png"
                alt="College students studying"
                className="w-full h-64 md:h-72 object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Decorative blob */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #4f46e5, transparent)' }}
          />
        </motion.div>

        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            📚 Choose Your Notes Category
          </h2>
          <p className="text-gray-500 text-base">
            Access comprehensive, well-organised study materials for every course
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
                <div className="h-full rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">

                  {/* Card image — tall enough to show full image */}
                  <div className="h-56 overflow-hidden">
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
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {cat.title}
                      </h3>
                      <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {cat.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Sparkles className="h-4 w-4" />
                        <span>High Quality Content</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${cat.accentColor} group-hover:translate-x-1 transition-transform duration-300`}>
                        <span>Explore</span>
                        <ArrowRight className="h-4 w-4 text-blue-600" />
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
          className="rounded-3xl overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)' }}
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
                href="mailto:priyalkumar06@gmail.com"
                className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-[11px] uppercase tracking-wide">Email</p>
                  <p className="text-blue-600 font-semibold text-sm">priyalkumar06@gmail.com</p>
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
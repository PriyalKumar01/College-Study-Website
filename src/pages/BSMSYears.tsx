import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e8f0fe 40%, #f0f4ff 100%)' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <button
            onClick={() => navigate('/notes')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Notes
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🔬
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">BS-MS Notes</h1>
              <p className="text-gray-500">5-Year Integrated Science Programme</p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-5 rounded-2xl border border-violet-200 bg-white shadow-sm"
          style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)' }}
        >
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-violet-800">
              <p className="font-semibold mb-1">About BS-MS Programme</p>
              <p>The BS-MS dual degree is a 5-year integrated science programme. The <strong>1st year syllabus is shared with B.Tech</strong> (Sem 1 & 2). From <strong>2nd year onwards</strong>, BS-MS students have a dedicated syllabus with specialized science subjects.</p>
            </div>
          </div>
        </motion.div>

        {/* Year Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year, index) => {
            const available = year.status === 'available';
            return (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.08, duration: 0.45 }}
                whileHover={available ? { y: -5, scale: 1.02 } : {}}
                className="group"
              >
                <div
                  className={`h-full rounded-2xl bg-white shadow-md overflow-hidden flex flex-col transition-all duration-300 ${available ? 'cursor-pointer hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`}
                  onClick={available ? () => year.onClick(navigate) : undefined}
                >
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={year.image}
                      alt={year.year}
                      className={`w-full h-full object-cover transition-transform duration-500 ${available ? 'group-hover:scale-105' : ''}`}
                    />
                    {!available && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                          🔒 Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 gap-2">
                    <div>
                      <h3 className={`text-xl font-bold mb-0.5 ${available ? 'text-gray-900 group-hover:text-violet-600' : 'text-gray-500'} transition-colors`}>
                        {year.year}
                      </h3>
                      <p className="text-xs text-violet-600 font-semibold">{year.semesters}</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{year.description}</p>
                    {year.note && (
                      <span className="inline-block text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-0.5 w-fit">
                        {year.note}
                      </span>
                    )}
                    <button
                      disabled={!available}
                      onClick={available ? () => year.onClick(navigate) : undefined}
                      className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        available
                          ? 'text-white shadow-md hover:shadow-lg hover:scale-[1.02]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      style={available ? { background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' } : {}}
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
    </div>
  );
};

export default BSMSYears;

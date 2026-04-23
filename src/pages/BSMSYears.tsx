import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, GraduationCap, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

const BSMSYears = () => {
  const navigate = useNavigate();

  const years = [
    {
      year: '1st Year',
      semesters: 'Semester 1 & 2',
      icon: '🎯',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      borderColor: 'border-blue-400',
      description: 'Same as B.Tech 1st year — redirects to common 1st & 2nd semester resources.',
      status: 'available',
      note: 'Shared with B.Tech 1st year curriculum',
      onClick: () => navigate('/btech-notes/first-year')
    },
    {
      year: '2nd Year',
      semesters: 'Semester 3 & 4',
      icon: '🔬',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      borderColor: 'border-purple-400',
      description: 'BS-MS specific subjects from 2nd year onwards. Core science & research foundation.',
      status: 'available',
      onClick: () => navigate('/bsms-notes/second-year')
    },
    {
      year: '3rd Year',
      semesters: 'Semester 5 & 6',
      icon: '⚛️',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
      borderColor: 'border-indigo-400',
      description: 'Advanced science subjects — quantum mechanics, electrodynamics, and specializations.',
      status: 'available',
      onClick: () => navigate('/bsms-notes/third-year')
    },
    {
      year: '4th Year',
      semesters: 'Semester 7 & 8',
      icon: '🧬',
      color: 'bg-gradient-to-br from-slate-500 to-slate-700',
      borderColor: 'border-slate-400',
      description: 'Advanced specialization and research project work.',
      status: 'coming-soon',
      onClick: () => {}
    },
    {
      year: '5th Year',
      semesters: 'Semester 9 & 10',
      icon: '🎓',
      color: 'bg-gradient-to-br from-slate-500 to-slate-700',
      borderColor: 'border-slate-400',
      description: 'Master\'s level research, thesis, and dissertation.',
      status: 'coming-soon',
      onClick: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button onClick={() => navigate('/notes')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Notes
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">BS-MS Notes 🔬</h1>
              <p className="text-muted-foreground">5-Year Integrated Science Programme</p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-5 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg border-2 border-violet-200 dark:border-violet-800"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-violet-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-violet-700 dark:text-violet-300">
              <p className="font-semibold mb-1">About BS-MS Programme</p>
              <p>The BS-MS dual degree is a 5-year integrated science programme. The <strong>1st year syllabus is shared with B.Tech</strong> (Sem 1 & 2). From <strong>2nd year onwards</strong>, BS-MS students have a dedicated syllabus with specialized science subjects.</p>
            </div>
          </div>
        </motion.div>

        {/* Year Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year, index) => (
            <motion.div
              key={year.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
              whileHover={{ scale: year.status === 'available' ? 1.03 : 1 }}
            >
              <Card
                className={`h-full transition-all duration-300 border-2 shadow-lg ${
                  year.status === 'available'
                    ? `${year.borderColor} hover:shadow-xl cursor-pointer`
                    : 'border-slate-300 dark:border-slate-700 opacity-60 cursor-not-allowed'
                }`}
                onClick={year.status === 'available' ? year.onClick : undefined}
              >
                <CardHeader className="text-center pb-3">
                  <div className={`w-20 h-20 ${year.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg`}>
                    {year.icon}
                  </div>
                  <CardTitle className="text-xl">{year.year}</CardTitle>
                  <CardDescription className="font-medium">{year.semesters}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">{year.description}</p>
                  {year.note && (
                    <Badge variant="secondary" className="w-full justify-center text-xs mb-3">
                      {year.note}
                    </Badge>
                  )}
                  {year.status === 'available' ? (
                    <Button className="w-full btn-hero" onClick={year.onClick}>
                      {index === 0 ? (
                        <><ExternalLink className="h-4 w-4 mr-2" /> Go to 1st Year</>
                      ) : (
                        <><BookOpen className="h-4 w-4 mr-2" /> View Semesters</>
                      )}
                    </Button>
                  ) : (
                    <Button className="w-full" disabled>
                      🔒 Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BSMSYears;

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';

const BSMSSecondYearNotes = () => {
  const navigate = useNavigate();

  const semesters = [
    {
      sem: '3rd Semester',
      icon: '🔬',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      borderColor: 'border-blue-400',
      description: 'Core science subjects — Physics, Chemistry, Mathematics, and Computer Science basics.',
      href: '/bsms/sem-3'
    },
    {
      sem: '4th Semester',
      icon: '⚗️',
      color: 'bg-gradient-to-br from-purple-500 to-violet-600',
      borderColor: 'border-purple-400',
      description: 'Classical Mechanics, Thermodynamics, Electrodynamics, and Electronics.',
      href: '/bsms/sem-4'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Button onClick={() => navigate('/bsms-notes')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to BS-MS Years
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">BS-MS 2nd Year 📚</h1>
          <p className="text-muted-foreground text-lg">Select a semester to access study materials</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          {semesters.map((sem, index) => (
            <motion.div
              key={sem.sem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
            >
              <Card
                className={`h-full cursor-pointer border-2 ${sem.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                onClick={() => navigate(sem.href)}
              >
                <CardHeader className="text-center pb-3">
                  <div className={`w-20 h-20 ${sem.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg`}>
                    {sem.icon}
                  </div>
                  <CardTitle className="text-xl">{sem.sem}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">{sem.description}</CardDescription>
                  <Button className="w-full btn-hero" onClick={() => navigate(sem.href)}>
                    <BookOpen className="h-4 w-4 mr-2" /> View Notes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BSMSSecondYearNotes;

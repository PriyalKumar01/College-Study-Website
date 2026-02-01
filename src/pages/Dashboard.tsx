import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, BookOpen, PlusCircle, Calculator, Bot, Trophy, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AppSidebar from '@/components/AppSidebar';

const Dashboard = () => {
  const { user } = useAuth();

  // Get user's first name from metadata or email
  const getDisplayName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return user?.email?.split('@')[0] || 'Student';
  };

  const quickActions = [
    {
      title: 'Browse Notes',
      description: 'Access thousands of quality notes',
      icon: <FileText className="h-6 w-6" />,
      href: '/notes',
      color: 'bg-primary',
    },
    {
      title: 'Internships',
      description: 'Find amazing internship opportunities',
      icon: <Briefcase className="h-6 w-6" />,
      href: '/opportunities?tab=Internships',
      color: 'bg-blue-600',
    },
    {
      title: 'Jobs',
      description: 'Explore full-time job openings',
      icon: <Trophy className="h-6 w-6" />,
      href: '/opportunities?tab=Jobs',
      color: 'bg-green-600',
    },
    {
      title: 'Scholarships',
      description: 'Apply for educational scholarships',
      icon: <Sparkles className="h-6 w-6" />,
      href: '/opportunities?tab=Scholarships',
      color: 'bg-purple-600',
    },
    {
      title: 'AI Tools',
      description: 'Useful AI tools for students',
      icon: <Bot className="h-6 w-6" />,
      href: '/useful-ai-tools',
      color: 'bg-orange-600',
    },
    {
      title: 'CGPA Calculator',
      description: 'Calculate your semester and overall CGPA',
      icon: <Calculator className="h-6 w-6" />,
      href: '/cgpa-calculator',
      color: 'bg-teal-600',
    },
  ];

  const recentStats = [
    { label: 'Notes Downloaded', value: '578+', change: '+77 this week' },
    { label: 'Opportunities', value: '45+', change: '+8 this week' },
    { label: 'Coding Material', value: '53+', change: '+15 this week' },
    { label: 'AI Tools', value: '105+', change: '+16 this week' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome back, @{getDisplayName()}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your academic journey? Here's what you can do today.
          </p>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
              className="group"
            >
              <Link to={action.href}>
                <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50">
                  <CardHeader className="text-center p-4">
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-white mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
                    <CardDescription className="text-xs">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Exam Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8"
        >
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300 text-lg">
                <BookOpen className="h-5 w-5" />
                🚨 Upcoming Exams Alert!
              </CardTitle>
              <CardDescription className="text-orange-600 dark:text-orange-400 text-sm">
                Important exam dates approaching - prepare now!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-gray-900 rounded border border-orange-200 dark:border-orange-800/50">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 text-sm">1st Semester (1st Year)</h4>
                  <p className="text-xs text-muted-foreground mb-1">1st Mid Sem: <strong>22 September 2025</strong></p>
                  <p className="text-xs text-muted-foreground mb-1">2nd Mid Sem: <strong>25 October 2025</strong></p>
                  <p className="text-xs text-muted-foreground mb-3">End Sem: <strong>2-20 December 2025</strong></p>
                  <Link to="/first-semester-notes">
                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 h-8 text-xs">
                      Download 1st Sem Notes 📚
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded border border-orange-200 dark:border-orange-800/50">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 text-sm">3rd Semester (2nd Year)</h4>
                  <p className="text-xs text-muted-foreground mb-1">1st Mid Sem: <strong>22 September 2025</strong></p>
                  <p className="text-xs text-muted-foreground mb-1">2nd Mid Sem: <strong>25 October 2025</strong></p>
                  <p className="text-xs text-muted-foreground mb-3">End Sem: <strong>2-20 December 2025</strong></p>
                  <Link to="/third-semester-notes">
                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 h-8 text-xs">
                      Download 3rd Sem Notes 📚
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  Website Statistics
                </CardTitle>
                <CardDescription className="text-sm">See how we're growing day by day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentStats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 bg-muted/50 rounded">
                      <div className="text-xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-xs font-medium text-foreground mb-1">{stat.label}</div>
                      <div className="text-xs text-green-600">{stat.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Access */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Card className="h-full border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PlusCircle className="h-5 w-5" />
                  Quick Access
                </CardTitle>
                <CardDescription className="text-sm">Essential tools & resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/cgpa-calculator">
                  <Button variant="outline" className="w-full justify-start h-9 text-sm">
                    <Calculator className="h-4 w-4 mr-2" />
                    CGPA Calculator
                  </Button>
                </Link>
                <Link to="/useful-ai-tools">
                  <Button variant="outline" className="w-full justify-start h-9 text-sm">
                    <Bot className="h-4 w-4 mr-2" />
                    AI Tools
                  </Button>
                </Link>
                <Link to="/opportunities?tab=Internships">
                  <Button variant="outline" className="w-full justify-start h-9 text-sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Opportunities
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

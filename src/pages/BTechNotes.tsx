import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, GraduationCap, Info, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Import thumbnail images
import firstSemImg from '@/assets/1st-sem-thumbnail.jpg';
import secondSemImg from '@/assets/2nd-sem-thumbnail.jpg';
import thirdSemImg from '@/assets/3rd-sem-thumbnail.jpg';
import fourthSemImg from '@/assets/4th-sem-thumbnail.jpg';
  

const BTechNotes = () => {
  const navigate = useNavigate();

  const semesters = [
    {
      id: 1,
      name: '1st Semester',
      description: 'Foundation courses and basic engineering subjects',
      available: true,
      route: '/first-semester-notes',
      thumbnail: firstSemImg,
      subjects: ['Chemistry', 'Civil Engineering', 'ICS', 'ICT', 'IET', 'Workshop', 'PYQs'],
      currentFor: 'Engineering Branches',
      nextFor: 'Technology Branches'
    },
    {
      id: 2,
      name: '2nd Semester',
      description: 'Advanced foundation and core engineering subjects',
      available: true,
      route: '/second-semester-notes',
      thumbnail: secondSemImg,
      subjects: ['Mathematics', 'Physics', 'Programming', 'Engineering Graphics'],
      currentFor: 'Technology Branches',
      nextFor: 'Engineering Branches'
    },
    {
      id: 3,
      name: '3rd Semester',
      description: 'Core engineering and specialization introduction',
      available: true,
      route: '/third-semester-notes',
      thumbnail: thirdSemImg,
      subjects: ['DSA', 'DBMS', 'Computer Networks', 'Operating Systems'],
      currentFor: 'Engineering Branches',
      nextFor: 'Technology Branches'
    },
    {
      id: 4,
      name: '4th Semester',
      description: 'Advanced core subjects and practical applications',
      available: true,
      route: '/fourth-semester-notes',
      thumbnail: fourthSemImg,
      subjects: ['Software Engineering', 'Algorithms', 'Computer Graphics'],
      currentFor: 'Technology Branches',
      nextFor: 'Engineering Branches'
    },
    {
      id: 5,
      name: '5th Semester',
      description: 'Specialization subjects and advanced topics',
      available: false,
      route: '/fifth-semester-notes',
      thumbnail: null,
      subjects: [],
      currentFor: 'Engineering Branches',
      nextFor: 'Technology Branches'
    },
    {
      id: 6,
      name: '6th Semester',
      description: 'Advanced specialization and project work',
      available: false,
      route: '/sixth-semester-notes',
      thumbnail: null,
      subjects: [],
      currentFor: 'Technology Branches',
      nextFor: 'Engineering Branches'
    },
    {
      id: 7,
      name: '7th Semester',
      description: 'Industry-oriented subjects and major project',
      available: false,
      route: '/seventh-semester-notes',
      thumbnail: null,
      subjects: [],
      currentFor: 'Engineering Branches',
      nextFor: 'Technology Branches'
    },
    {
      id: 8,
      name: '8th Semester',
      description: 'Final semester with thesis and advanced electives',
      available: false,
      route: '/eighth-semester-notes',
      thumbnail: null,
      subjects: [],
      currentFor: 'Technology Branches',
      nextFor: 'Engineering Branches'
    }
  ];

  const handleSemesterClick = (semester: any) => {
    if (semester.available) {
      navigate(semester.route);
    }
  };

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
            <Button
              onClick={() => navigate('/notes')}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Notes
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  B.Tech Notes 🎓
                </h1>
                <p className="text-muted-foreground text-lg">
                  Select your semester to access comprehensive study materials
                </p>
              </div>
            </div>
          </motion.div>

          {/* Branch Information Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">📚 Important Branch Information</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-green-700 dark:text-green-400">✨For Engineering branches (CSE, IT, EE, ET, CE, ME):</span>
                      <p className="text-gray-700 dark:text-gray-300">The notes available under the 1st Semester section are applicable to your syllabus as well. Please refer to these for your studies.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-400">✨For Technology branches (CHE, BS-MS, FT, PT, PL, BE, BioTech, OT, LT):</span>
                      <p className="text-gray-700 dark:text-gray-300">Your syllabus is currently available under the 2nd Semester section. Kindly download and study from there.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-orange-700 dark:text-orange-400">📅 Next Semester Note:</span>
                      <p className="text-gray-700 dark:text-gray-300">In next semester, the syllabus will interchange between Engineering and Technology branches. That means Engineering students will follow the 2nd Semester materials, while Technology students will refer to the 1st Semester notes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Semesters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {semesters.map((semester, index) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
                whileHover={{ scale: semester.available ? 1.05 : 1, y: semester.available ? -5 : 0 }}
                className="group"
              >
                <Card 
                  className={`feature-card h-full transition-all duration-500 overflow-hidden relative ${
                    semester.available 
                      ? 'cursor-pointer hover:shadow-2xl hover:shadow-primary/20 border-primary/20' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleSemesterClick(semester)}
                >
                  {/* Thumbnail Image */}
                  {semester.thumbnail && (
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={semester.thumbnail} 
                        alt={semester.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge variant={semester.available ? "default" : "secondary"} className="shadow-lg">
                          {semester.available ? 'Available' : 'Coming Soon'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg font-bold border border-white/30">
                          {semester.id}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-center">{semester.name}</CardTitle>
                    <CardDescription className="text-center text-sm line-clamp-2">
                      {semester.description}
                    </CardDescription>
                    
                    {semester.available && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-green-600 dark:text-green-400 font-medium">Currently for: {semester.currentFor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span className="text-purple-600 dark:text-purple-400 font-medium">Next sem: {semester.nextFor}</span>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {semester.available && semester.subjects.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {semester.subjects.slice(0, 3).map((subject, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{subject}</Badge>
                          ))}
                          {semester.subjects.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{semester.subjects.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>Study Materials</span>
                      </div>
                      <Button 
                        variant={semester.available ? "default" : "outline"} 
                        size="sm"
                        disabled={!semester.available}
                        className={semester.available ? "btn-hero" : ""}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSemesterClick(semester);
                        }}
                      >
                        {semester.available ? 'View Notes' : 'Coming Soon'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 p-6 bg-muted/50 rounded-lg border"
          >
            <h3 className="text-lg font-semibold mb-2">📚 About B.Tech Notes</h3>
            <p className="text-muted-foreground">
              Our comprehensive B.Tech notes collection covers all 8 semesters with quality study materials 
              contributed by students and faculty. Each semester includes subject-wise notes, practical files, 
              and important resources to help you excel in your engineering journey.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">✅ 1st-4th Semester Available</Badge>
              <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">⏳ More Semesters Coming Soon</Badge>
              <Badge variant="outline">📝 Student Contributions</Badge>
              <Badge variant="outline">🔍 Easy Search & Filter</Badge>
            </div>
          </motion.div>
        </div>
      </div>
    
  );
};

export default BTechNotes;
// Reviewed: academic catalog & interface consistency check (v2.0.166)

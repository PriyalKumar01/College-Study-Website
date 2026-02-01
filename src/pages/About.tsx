import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Heart, Users, BookOpen, Award, Briefcase, FileText, Rocket } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  const founderAchievements = [
    { icon: <Users className="h-4 w-4" />, text: 'Guide and mentor 10k+ students across all platforms' },
    { icon: <BookOpen className="h-4 w-4" />, text: 'Built study platform serving 2500+ students' },
    { icon: <Award className="h-4 w-4" />, text: 'Founded CodeXtream, a student-led community fostering tech collaboration' },
    { icon: <Heart className="h-4 w-4" />, text: 'Passionate about education technology' },
  ];

  const features = [
    {
      title: 'Notes Sharing',
      description: 'Share and access quality study materials across all branches and semesters',
      icon: <BookOpen className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      title: 'Resume Builder',
      description: 'Create professional, ATS-friendly resumes with our guided builder',
      icon: <FileText className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
    {
      title: 'Career Opportunities',
      description: 'Discover internships and job openings from top companies',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
    {
      title: 'Community Driven',
      description: 'Built by students, for students - join our growing academic community',
      icon: <Rocket className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
  ];

  const technologies = [
    'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
    'Clerk Auth', 'Shadcn/ui', 'Lucide Icons', 'Vite'
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About College Study
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering students with comprehensive academic resources, note sharing,
            and career development tools. Built with ❤️ for the student community.
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <Card className="gradient-card max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src="/lovable-uploads/958026bc-6d17-4c26-851b-51683b70eedf.png"
                  alt="Priyal Kumar - Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl mb-2">Meet the Founder & CEO - College Study</CardTitle>
              <CardDescription className="text-lg">
                <strong>Priyal Kumar</strong> - Computer Science Student & Education Technology Enthusiast
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">About Priyal</h3>
                  <p className="text-muted-foreground mb-6">
                    <strong>Priyal Kumar</strong> — Guide & mentor to 10K+ students across platforms.
                    Founder of CodeXtream. Passionate about student communities, technical education,
                    and open learning. As a computer science student, Priyal recognized the challenges
                    students face in accessing quality study materials and career guidance, inspiring
                    the creation of College Study Hub.
                  </p>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href="mailto:priyalkumar06@gmail.com" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/PriyalKumar01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.linkedin.com/in/priyal-kumar-29b26529a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Achievements</h3>
                  <div className="space-y-3">
                    {founderAchievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                      >
                        <div className="text-primary">{achievement.icon}</div>
                        <span className="text-sm">{achievement.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="feature-card h-full text-center">
                  <CardHeader>
                    <div className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-16"
        >
          <Card className="gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Built With Modern Technologies</CardTitle>
              <CardDescription>
                College Study Hub is built using cutting-edge web technologies for the best user experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-center"
        >
          <Card className="gradient-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create a comprehensive academic ecosystem where students can easily share knowledge,
                access quality study materials, build professional profiles, and discover career opportunities.
                We believe in the power of collaboration and aim to make quality education resources
                accessible to every student, regardless of their background or circumstances.
              </p>

              <div className="mt-8">
                <Button asChild className="btn-hero">
                  <a href="/" className="flex items-center gap-2">
                    Join Our Community
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
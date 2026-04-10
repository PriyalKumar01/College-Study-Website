
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Download } from 'lucide-react';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target, Play, ExternalLink, Star, TrendingUp, Users, BookOpen, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CommunityMaterials from '@/components/CommunityMaterials';

// Import coding platform images
import leetcodeLogo from '@/assets/leetcode-logo.jpg';
import codechefLogo from '@/assets/codechef-logo.jpg';
import codeforcesLogo from '@/assets/codeforces-logo.jpg';
import atcoderLogo from '@/assets/atcoder-logo.jpg';
import code360Logo from '@/assets/code360-logo.jpg';
import geeksforgeeksLogo from '@/assets/geeksforgeeks-logo.jpg';

// Import resume template images
import microsoftResume from '@/assets/microsoft-resume.jpg';
import canvaResume from '@/assets/canva-resume.jpg';
import resumeioTemplate from '@/assets/resumeio-template.jpg';
import jobscanTemplate from '@/assets/jobscan-template.jpg';
import millionResume from '@/assets/1million-resume.jpg';
import overleafTemplate from '@/assets/overleaf-template.jpg';
import { smartDownload } from '@/lib/downloadUtils';

const PlacementPreparation = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('placement');
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const handleDeleteCommunityNote = async (id: string, fileName: string) => {
    if (!user || !isOwner) return;
    try {
      if (fileName) {
        const { error: storageError } = await supabase.storage.from('study-materials').remove([fileName]);
        if (storageError) console.error('Storage deletion error:', storageError);
      }
      const { error: dbError } = await supabase.from('notes').delete().eq('id', id);
      if (dbError) throw dbError;
      toast({ title: "Deleted securely", description: "Material removed successfully." });
      refreshNotes();
    } catch (error: any) {
      toast({ title: "Deletion failed", description: error.message, variant: 'destructive' });
    }
  };

  const handleDownloadNote = (url: string) => {
    window.open(url, '_blank');
  };


  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  // Helper function to get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v\/|.*v=|.*\/))([^?&"'>]+)/)?.[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const importantGuidelines = [
    "Choose a language C++ Or Java.",
    "Then start doing DSA in any one language consistently.",
    "Also, participate in hackathons, open source contribution, in clubs tech related post.",
    "Explore all the trending technologies like AI, ML, DL, agentic AI, blockchain, cyber security, Data Science and lot more are available.",
    "Also, Solve DSA questions on leetcode, codechef, codeforces, atcoder, code360, etc platform and actively participating in contest as well, no matter how many questions solve...ok",
    "Learn Web development Or App development and make atleast 2 major full stack project to show in resume either individually Or in collaboration....",
    "Start making resume from the beginning of 2nd year is advisable, and after that keep updating after every 3-4 month.",
    "And make different resumes for different companies whenever Apply based on companies required and this helps in easy passing from ats, make friendly resume already."
  ];

  const videos = [
    {
      title: 'How to study for college exam? Score Good CGPA',
      url: 'https://youtu.be/EA5_PP9d-OQ?si=3R133joj17aIsoo-',
      description: 'Learn effective study techniques to score good CGPA in college exams'
    },
    {
      title: 'Build ats friendly resume and get shortlisted',
      url: 'https://youtu.be/W1TFjqJGdLU?si=d-i80MFUKtSBsaNl',
      description: 'Create ATS-friendly resumes that pass through screening systems'
    },
    {
      title: 'Best 1st year roadmap Guide',
      url: 'https://youtu.be/uct0wLRq2Uo?si=Q8P7gUWbvf_V73l2',
      description: 'Complete roadmap for first-year engineering students'
    },
    {
      title: 'What should I Choose C++ Or Java',
      url: 'https://youtu.be/9VwXq6a4Gt4?si=GVWxwd07wKka2Bef',
      description: 'Decide between C++ and Java for competitive programming and placements'
    },
    {
      title: 'Ultimate Resume Guide',
      url: 'https://youtu.be/y3R9e2L8I9E?si=EL1tc_wk5fioV3l1',
      description: 'Comprehensive guide to creating professional resumes'
    },
    {
      title: 'How to Calculate CGPA',
      url: 'https://youtu.be/LalJ14mIxeU?si=BP3ObTpfyeZvxD3b',
      description: 'Learn the correct method to calculate your CGPA'
    },
    {
      title: 'How to create Great linkedin Profile',
      url: 'https://youtu.be/lzuiuRgwwrc?si=XqCQI8g8U_Jjt6Qq',
      description: 'Build a professional LinkedIn profile that attracts recruiters'
    }
  ];

  const codingPlatforms = [
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/',
      description: 'Most popular platform for coding interviews preparation',
      image: leetcodeLogo
    },
    {
      name: 'CodeChef',
      url: 'https://www.codechef.com/',
      description: 'Great for competitive programming and contests',
      image: codechefLogo
    },
    {
      name: 'Codeforces',
      url: 'https://codeforces.com/',
      description: 'Competitive programming platform with regular contests',
      image: codeforcesLogo
    },
    {
      name: 'AtCoder',
      url: 'https://atcoder.jp/',
      description: 'High-quality competitive programming contests',
      image: atcoderLogo
    },
    {
      name: 'Code360',
      url: 'https://www.naukri.com/code360/',
      description: 'Coding Ninjas platform for interview preparation',
      image: code360Logo
    },
    {
      name: 'GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org/',
      description: 'Comprehensive resource for coding and algorithms',
      image: geeksforgeeksLogo
    }
  ];

  const resumeTemplates = [
    {
      name: 'Microsoft ATS Resume Templates',
      url: 'https://create.microsoft.com/en-us/templates/ats-resumes',
      platform: 'Microsoft',
      description: 'Professional ATS-friendly templates from Microsoft',
      image: microsoftResume
    },
    {
      name: 'Canva ATS Resume Collection',
      url: 'https://www.canva.com/p/wisscreative/collections/AYv3Dp1Oo-Ewpyjtj32DVw',
      platform: 'Canva',
      description: 'Wide selection of ATS-optimized resume templates',
      image: canvaResume
    },
    {
      name: 'Resume.io ATS Templates',
      url: 'https://resume.io/resume-templates/ats',
      platform: 'Resume.io',
      description: 'Modern ATS-friendly resume templates',
      image: resumeioTemplate
    },
    {
      name: 'JobScan ATS Templates',
      url: 'https://www.jobscan.co/resume-templates/ats-templates',
      platform: 'JobScan',
      description: 'Templates designed to pass ATS screening',
      image: jobscanTemplate
    },
    {
      name: '1 Million Resume Templates',
      url: 'https://1millionresume.com/resume-templates/ats',
      platform: '1MillionResume',
      description: 'High-quality ATS resume templates',
      image: millionResume
    },
    {
      name: 'Overleaf LaTeX Template',
      url: 'https://www.overleaf.com/latex/templates/70-plus-ats-rating-resume-template/ssprfsctyddz',
      platform: 'Overleaf',
      description: '70+ ATS rating LaTeX resume template',
      image: overleafTemplate
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
          <Button
            onClick={() => navigate('/notes')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              <Target className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Placement Preparation Guide 🎯
              </h1>
              <p className="text-muted-foreground text-lg">
                Your complete guide to tech industry placements and career success
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100">🚀 Important Guidelines for Tech Industry Placement</h3>
              <p className="text-orange-800 dark:text-orange-200 font-medium">
                For placement in tech industry, you all must have follow the things told here, every small things have greater effect:
              </p>
              
              <div className="space-y-2">
                {importantGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-orange-700 dark:text-orange-300 text-sm">
                      {guideline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Play className="h-6 w-6 text-primary" />
            Essential Video Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {videos.map((video, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        className="feature-card h-full cursor-pointer"
        onClick={() => handleVideoClick(video.url)}   // 🔥 added this line
      >
        <CardHeader>
          <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
            <img 
              src={getYouTubeThumbnail(video.url)} 
              alt={video.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjZmY0NDQ0Ii8+CjxwYXRoIGQ9Ik0xMjggNjBMMTkyIDEwMEwxMjggMTQwVjYwWiIgZmlsbD0id2hpdGUiLz4KPHN2Zz4K';
              }}
            />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">Video Guide</Badge>
          </div>
          <CardTitle className="text-lg leading-tight mb-2">
            {video.title}
          </CardTitle>
          <CardDescription>
            {video.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full btn-hero"
            onClick={(e) => {
              e.stopPropagation();              // ✅ prevent double triggering
              handleVideoClick(video.url);
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Watch on YouTube
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

        </motion.div>

        {/* Coding Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Essential Coding Platforms
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codingPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full cursor-pointer" onClick={() => window.open(platform.url, '_blank')}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={platform.image} 
                          alt={`${platform.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge variant="secondary">Platform</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{platform.name}</CardTitle>
                    <CardDescription>
                      {platform.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full btn-hero">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Platform
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resume Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Resume Templates & Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTemplates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full cursor-pointer" onClick={() => window.open(template.url, '_blank')}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={template.image} 
                          alt={`${template.name} preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge variant="secondary">{template.platform}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                    <CardDescription>
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full btn-hero">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Why Follow This Guide?
              </CardTitle>
              <CardDescription>Statistics from successful placements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div className="text-2xl font-bold text-primary">85%</div>
                  </div>
                  <div className="text-sm font-medium text-foreground">Students Placed</div>
                  <div className="text-xs text-muted-foreground">Following this guide</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-green-500" />
                    <div className="text-2xl font-bold text-green-500">12+ LPA</div>
                  </div>
                  <div className="text-sm font-medium text-foreground">Average Package</div>
                  <div className="text-xs text-muted-foreground">For tech roles</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div className="text-2xl font-bold text-blue-500">6 Months</div>
                  </div>
                  <div className="text-sm font-medium text-foreground">Prep Time</div>
                  <div className="text-xs text-muted-foreground">Average required</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Materials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.5 }} className="mb-8">
          <CommunityMaterials semester="placement" />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-center"
        >
          <Card className="gradient-card border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Your Placement Journey? 🚀</CardTitle>
              <CardDescription className="text-lg">
                Follow these guidelines consistently and track your progress. Remember, small consistent efforts lead to big results!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero" onClick={() => navigate('/dsa-notes')}>
                  Start with DSA Notes
                </Button>
                <Button variant="outline" onClick={() => navigate('/web-development-notes')}>
                  Development Notes
                </Button>
                <Button variant="outline" onClick={() => navigate('/cgpa-calculator')}>
                  Calculate Your CGPA
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PlacementPreparation;
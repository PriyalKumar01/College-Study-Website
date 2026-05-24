import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Share2, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const FourthSemesterBTNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 4th Semester BioTech on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    BioProcess: {
      detailed: [ ],
      oneshot: []
    },
    foodBiotech: {
      detailed: [],
      oneshot: [ ]
    },
    BioNanoTech: {
      detailed: [],
      oneshot: []
    },
    molecularBiology: {
      detailed: [],
      oneshot: []
    },
    AgricultureBioTech: {
      detailed: [],
      oneshot: []
    },
    BioInformatics: {
      detailed: [],
      oneshot: []
    }
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot') => {
    const playlistKey = subjectId as keyof typeof subjectPlaylists;
    if (subjectPlaylists[playlistKey] && subjectPlaylists[playlistKey][type].length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const playlistKey = subjectId as keyof typeof subjectPlaylists;
    return subjectPlaylists[playlistKey] || { detailed: [], oneshot: [] };
  };

  const staticSubjects = [
    {
      id: 'microBiologyLab',
      name: 'Micro Biology - LAB',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: [
        { title: 'Practical-1 Plastic Isolation Protocol', url: 'https://drive.google.com/file/d/1COdUh_FCQvzl0vGz6o3aotwVyahQrmUf/view?usp=drivesdk' },
        { title: 'Practical-2 Plant DNA Isolation Notebook ', url: 'https://drive.google.com/file/d/16BEdltIt7oGxCaZa_MGOZYMnxBLdb8u_/view?usp=drivesdk' },
        { title: 'Practical -3 ', url: 'https://drive.google.com/file/d/1hx8aRwoHS98AopfHulSW4Ml9U-qYqyje/view?usp=drivesdk' },
        { title: 'Practical -4 ', url: 'https://drive.google.com/file/d/1nvfAs5WsWEgUvpUoWh5x8ad5KDzsaIco/view?usp=drivesdk' },
      ]
    },
    {
      id: 'AgricultureBioTech',
      name: 'Agriculture BioTechnology',
      icon: '🌐',
      color: 'bg-purple-500',
      notes: [ ]
    },
    {
      id: 'BioInformatics',
      name: 'Bio-Informatics Notes',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [ ]
    },
    {
      id: 'BioProcess',
      name: 'Bio-Process Engg.',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: []
    },
    {
      id: 'foodBiotech',
      name: 'Food Bio-Technology',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: []
    },
    {
      id: 'BioNanoTech',
      name: 'Intro. to BioNanoTechnology',
      icon: '🔌',
      color: 'bg-teal-500',
       notes: [ ]
    },
    {
      id: 'molecularBiology',
      name: 'Molecular Biology',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [ ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BT-4th Semester');
  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({
          id: cn.id,
          title: cn.title,
          url: cn.file_url,
          isCommunity: true,
          fileName: cn.file_name,
          uploadedBy: cn.uploaded_by,
          userName: cn.user_name
        }))
    ]
  }));

  const handleDeleteCommunityNote = async (id: string) => {
    if (!window.confirm('Delete this user-uploaded material?')) return;
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Material removed successfully.' });
      refreshNotes();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const syllabus = {
    title: '4th Semester Syllabus',
    url: '#'
  };

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

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
              onClick={() => setSelectedSubject(null)}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {subject.name} 📚
            </h1>
            <p className="text-muted-foreground text-lg">
              All notes for {subject.name} - 4th Semester B.Tech
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white text-lg`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription>
                      {subject.name} study material
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDownload(note.url, note.title)}
                        className="flex-1 btn-hero"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {(note as any).isCommunity && isOwner && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteCommunityNote((note as any).id)}
                          title="Delete Community Upload"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate('/btech-notes')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to B.Tech Notes
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            4th Semester B.Tech Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg">
            <strong>Only for CSE/IT students</strong>
          </p>
        </motion.div>

        {/* Instruction Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">📚 BioTech 4th Semester — Important Instructions</h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">

                <p><strong>✨ Hi CSE/IT Juniors!</strong> A few important things to keep in mind as you progress through 4th semester — read carefully, this will genuinely help you.</p>

                <p>• <strong>Career Focus:</strong> Start building command in at least one domain — <strong>Web Dev, App Dev (frontend/backend/both), AI/ML, or Cybersecurity.</strong> Participate in hackathons and contribute to open-source. These make learning exciting and your profile strong.</p>

                <p>• <strong>DSA is Non-Negotiable:</strong> As a CSE student, strong DSA in C++/Java is a must for placements. Most companies that visit campus are heavily DSA-focused — start early, be consistent.</p>

                <p>• <strong>Maintain CGPA:</strong> Companies keep a cutoff of <strong>7 or 7.5 CGPA</strong> — no excuses below that. Those with <strong>8.5+ are in a very safe zone</strong> — aim for 8+ minimum and maintain it till at least 6th semester.</p>

                <p>• <strong>DSUC:</strong> Quantum PDF + my notes + Programming PDF available on College Study Website are more than enough. Practice programs: Stack, Dijkstra, Insertion Sort, Selection Sort, Linear & Binary Search.</p>

                <p>• <strong>Computer Organisation (CO):</strong> IT students — Amit Sir's classes + write well. CSE students — Gate Smashers or Knowledge Gate OneShot (or both) + PYQs.</p>

                <p>• <strong>ItETiICT:</strong> Notes + PYQs are enough. Focus on IoT, Sensors, and OSI Model — remember the OSI layers using the trick below! 👇</p>

                <p>• <strong>Python Programming (PP):</strong> Pooja Ma'am's notes + PYQs + Quantum PDF — must go through before exam. For practicals: go through all important Python programs from the special PDF & lab file on the website. Exam has 2 programming questions — insertion/selection sort, linear & binary search (most important), Tower of Hanoi, etc.</p>

                <p>• <strong>Digital Electronics (DE):</strong> Question Bank on website + Vaibhav Jain playlist (best) + PYQs.</p>

                <p>• <strong>Maths-II (M2):</strong> Make a short formula sheet yourself while watching YouTube lectures. Solve PYQs. That's it.</p>

                <p>• <strong>Quantum PDFs:</strong> Wherever available, always go through them — they are genuinely very helpful in general preparation.</p>

                <p>• <strong>PP Practical Tip 😄:</strong> Odd roll no. students sit near odd roll no. friends, even near even — because odd and even students get different questions. Plan accordingly!</p>

                {/* OSI Model Trick Image */}
                <div className="mt-4 mb-2">
                  <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🌐 OSI Model Trick — Easy Way to Remember All 7 Layers in Sequence:</p>
                  <div className="rounded-lg overflow-hidden border border-blue-300 dark:border-blue-700 max-w-lg">
                    <img
                      src="/osi-model-trick.png"
                      alt="OSI Model Easy Memory Trick by Priyal Kumar"
                      className="w-full object-contain bg-white"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-blue-600 dark:text-blue-400 italic">Trick by Priyal Kumar — Sequence: Application → Presentation → Session → Transport → Network → Data Link → Physical</p>
                </div>

                <p className="text-red-500"><strong>⚠️ Important:</strong> Always maintain good presentation in exams — use 2 pens, underline important keywords, keep proper spacing after answers, and write sufficiently explained answers for better scoring. Cover every topic from the syllabus using playlists, notes, PYQs, YouTube, Google AI Mode, or any resource possible. Once every topic is understood properly, exams automatically become much easier.</p>

                <p>✨ Best Wishes — <strong>Priyal Kumar</strong></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Syllabus Card */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                4th Semester Syllabus
              </CardTitle>
              <CardDescription>
                Official syllabus for 4th semester B.Tech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleDownload(syllabus.url, syllabus.title)}
                className="btn-hero"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Syllabus
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="feature-card h-full transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-white text-2xl`}>
                      {subject.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-center mb-2">{subject.name}</CardTitle>
                  <CardDescription className="text-center">
                    {subject.notes.length} notes available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {/* Study Playlists Section */}
                    {subject.id !== 'pyqs' && subject.id !== "assignments" &&(
                    <div className="border-t pt-4">
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubjectExpansion(subject.id);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Study Playlists</span>
                        </div>
                        {expandedSubjects.includes(subject.id) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </div>
                      
                      {expandedSubjects.includes(subject.id) && (
                        <div className="mt-3 space-y-2 pl-2">
                          {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs h-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlaylistClick(subject.id, 'detailed');
                              }}
                            >
                              📚 Detailed Playlists ({getSubjectPlaylists(subject.id).detailed.length})
                            </Button>
                          )}
                          {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs h-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlaylistClick(subject.id, 'oneshot');
                              }}
                            >
                              ⚡ One Shot Videos ({getSubjectPlaylists(subject.id).oneshot.length})
                            </Button>
                          )}
                          {getSubjectPlaylists(subject.id).detailed.length === 0 && 
                           getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                            <p className="text-xs text-muted-foreground pl-2">Not available...</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{subject.notes.length} Files</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSubject(subject.id)}
                      >
                        View Notes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Playlist Modal */}
        <PlaylistModal
          isOpen={showPlaylistModal}
          onClose={() => setShowPlaylistModal(false)}
          title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
          playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] : []}
          type={selectedPlaylistType}
        />
      </div>
    </div>
  );
};

export default FourthSemesterBTNotes;
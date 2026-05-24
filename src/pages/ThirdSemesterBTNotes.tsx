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

const ThirdSemesterBTNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 3rd Semester BioTech on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    microBiology: {
      detailed: [ ],
      oneshot: []
    },
    ipr: {
      detailed: [],
      oneshot: []
    },
    immunology: {
      detailed: [ ],
      oneshot: []
    },
    biochemistry: {
      detailed: [],
      oneshot: []
    },
    plantAnimal: {
      detailed: [ ],
      oneshot: []
    },
    analyticalTechniques: {
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
      id: 'biochemistry',
      name: 'BioChemistry Notes',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [
        { title: 'Pyrimidine Synthesis', url: 'https://drive.google.com/file/d/1pTJns7FgSGp7qxVu8T2rLknh-HZ85vWJ/view?usp=drivesdk' },
        { title: 'Purine & Pyrimidine Metabolism', url: 'https://drive.google.com/file/d/1OJf9h9G1TaGaRixcRVp-GlfJ3bEN3eTk/view?usp=drivesdk' },
        { title: 'Nucleic Acid Metabolism', url: 'https://drive.google.com/file/d/1a7ZWZ64UBKFg1p5mqkrgM03q9Es4AOgB/view?usp=drivesdk' },
        { title: 'Lipids- Properties, Structure & Classifications', url: 'https://drive.google.com/file/d/1aBwCyYpW8S6qm2wG14-3ZXeDEoKQWRAR/view?usp=drivesdk' },
        { title: 'Lipid Oxidation of Fatty Acid', url: 'https://drive.google.com/file/d/1U4b4as7ATO8c-XaUODewAt_CNKPJqIa0/view?usp=drivesdk' },
        { title: 'Lipid Disorder PDF', url: 'https://drive.google.com/file/d/1gI0lKKXatGxgExHMfD0tFhtvOu8fqm5L/view?usp=drivesdk' },
        { title: 'BOOK-Principles of BioChemistry (by_Lehninger_4th Edition)', url: 'https://drive.google.com/file/d/1EISLid_3Lsy7qnFlOs1uaUWuQ9uU252S/view?usp=drivesdk' },
        { title: 'Enzyme PDF', url: 'https://drive.google.com/file/d/1c4ZNlSxzT0XYgrEVLK7UtMzB-U4Im8tw/view?usp=drivesdk' },
        { title: 'Disorder Of Carbohydrate Metabolism', url: 'https://drive.google.com/file/d/1J4F1SWGUdJ7MIZnZSxZblJIKEbFvtM-d/view?usp=drivesdk' },
        { title: 'Disorder of Purine and Pyrimidine', url: 'https://drive.google.com/file/d/1LUJg1S4KoxMwqUj_gJlI0IfWCtO-P11n/view?usp=drivesdk' },
        { title: 'Amino Acid Disorder', url: 'https://drive.google.com/file/d/1lF5odTEK-gJfp4s8LXUAYq0KSBZKBRTH/view?usp=drivesdk' },
       ]
    },
    {
      id: 'immunology',
      name: 'Immunology & Immunotechnology',
      icon: '🌐',
      color: 'bg-purple-500',
      notes: [
        { title: 'Hypersensitivity to a Substance', url: 'https://drive.google.com/file/d/1bBXaBG8i55OrKu1OU8gV_Os0td4DU47H/view?usp=drivesdk' },
        { title: 'Immunology PDF Notes', url: 'https://drive.google.com/file/d/1I5CI39rdPx7g5c6YwqLisQ0o2DWa0f79/view?usp=drivesdk' },
        { title: 'Immunology BOOK by-Kuby(5 edition)', url: 'https://drive.google.com/file/d/1qzAlv9xYoYyBOgMgIccmhK_b5wnfkNeH/view?usp=drivesdk' },
        { title: 'Innate Immunity PDF', url: 'https://drive.google.com/file/d/1_m5NlOX_wx5yYF8rxSHn12bf2C5COL1D/view?usp=drivesdk' },
         ]
    },
    {
      id: 'ipr',
      name: 'IPR, Ethics & Patenting in Biotechnology',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [
        { title: 'Unit-4 Bio-Safety (BEST)', url: 'https://drive.google.com/file/d/1r_GASU4kLBYxEOmUTBWJxpswvYUCAoAl/view?usp=drivesdk' , recommended: true },
        { title: 'Unit-4 Bio Safety PDF', url: 'https://drive.google.com/file/d/1_CbZuuk4AC6-XxhaP4rO4gZD2O4sqigZ/view?usp=drivesdk' },
        { title: 'Bombs, Missiles, Rockets Patentability', url: 'https://drive.google.com/file/d/1-wZNO58wp_uxYYOKgLQekkHWIJ04fi7L/view?usp=drivesdk' },
        { title: 'IPR & Patent in Biotechnology', url: 'https://drive.google.com/file/d/1vJO-9aF4JKKt0H-8JJQXhByZz2Pp3HeO/view?usp=drivesdk' },
        { title: 'International Conventions & GATT', url: 'https://drive.google.com/file/d/1IblrgMSmoj_JS3zpKbYnGGGHsZsPIhgl/view?usp=drivesdk' },
        { title: 'IPR PDF', url: 'https://drive.google.com/file/d/1Jwi8aD6EC3APbE5wYqW_NgqMAKd-XNR1/view?usp=drivesdk' },
       ]
    },
    {
      id: 'microBiology',
      name: 'Micro Biology',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: [
        { title: 'Indicator Micro-Organism & Environment MicroBiology', url: 'https://drive.google.com/file/d/1qvJxb3pyd2xdfi7t8hbROALSb4T8BUim/view?usp=drivesdk' },
        { title: 'Bacterial Isolation, Identification & Storage', url: 'https://drive.google.com/file/d/1KZ84vZaL-nEojZ4h-YXbGw-epfifz_bi/view?usp=drivesdk' },
        { title: 'MicroBiology PDF', url: 'https://drive.google.com/drive/folders/17Z8un86xg-4L-npNqap4AvXGhn8_K-Ka' },
        { title: 'Cont. Culture of Micro-Organism', url: 'https://drive.google.com/file/d/1XnLDMceHy2agIIuIUQIilDraJ3hOLgXR/view?usp=drivesdk' },
        { title: 'Control of Microbes', url: 'https://drive.google.com/file/d/1N6CWrOX0DlkZUpkr-Tg_LV01qEQRQu63/view?usp=drivesdk' },
        { title: 'Effect of factors on Growth', url: 'https://drive.google.com/file/d/18Id-MqneDHdEEfXyyuyqNSSTRlIDaAqk/view?usp=drivesdk' },
        { title: 'Growth Curve PDF', url: 'https://drive.google.com/file/d/1C4i81RqL5jN-Oe5aBc5Pmxy-SA_0Vefw/view?usp=drivesdk' },
        { title: 'Micro-Biology BOOK By-Lansing M.Prescott', url: 'https://drive.google.com/file/d/1ByTWe6o6LPOxuVDJ__Ini7PcHVE538Xx/view?usp=drivesdk' },
        { title: 'Maintenance & Preservation Of Microbes', url: 'https://drive.google.com/file/d/1OaLyAQo7r_DRDpw8JXF6Z6E75hoEYIHc/view?usp=drivesdk' },
        { title: 'Media , Type Culture Media PDF', url: 'https://drive.google.com/file/d/12Hxs3WkB_8Nt4Fk0KG52-LfCFOyu7k3v/view?usp=drivesdk' },
         { title: 'MicroBiology BOOK By-Michael J.Pelczar', url: 'https://drive.google.com/file/d/1vBKvXHb1Af6qomRObNjd-VthHXmNuogy/view?usp=drivesdk' },
        { title: 'Unit-2 Microbial Growth Kinetics PDF', url: 'https://drive.google.com/file/d/1WaBiPgZFn6rOj-dgHHJIEqMUp4RX1Mnx/view?usp=drivesdk' },
        { title: 'Unit-2 Numericals on Batch Reactor', url: 'https://drive.google.com/file/d/1GnE6ZkkqC4WGv2OTsIHAAIrwHg9v6jIT/view?usp=drivesdk' },
        { title: 'Procaryotic & Eukaryotic Microbes', url: 'https://drive.google.com/file/d/1G9JZkUliRjPIaj8I8QXBsZN8K5vFkOdq/view?usp=drivesdk' },
        { title: 'UNIT-2 Microbial Growth Kinetics(Batch,Fed batch,Chemostat microbial)', url: 'https://drive.google.com/file/d/1ftQHcySNxc0olXosmVTeGBcaHft-z3-k/view?usp=drivesdk' },
        { title: 'Viruses PDF', url: 'https://drive.google.com/file/d/15O74fVDx18rZfGSnKECvwVhThwqquhTW/view?usp=drivesdk' },
      
           ]
    },
    {
      id: 'plantAnimal',
      name: 'Plant & Animal Biotechnology',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: []
    },
    {
      id: 'analyticalTechniques',
      name: 'Analytical Techniques in Biotechnology',
      icon: '🔌',
      color: 'bg-teal-500',
       notes: []
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BT-3rd Semester');
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
    title: '3rd Semester BT Syllabus',
    url: 'https://drive.google.com/file/d/1h6AmBh57MfadiOaT377p3xcm4in2hA6R/view?usp=drivesdk'
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
              All notes for {subject.name} - 3rd Semester B.Tech
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
            3rd Semester B.Tech Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg">
            <strong>Only for BioTechology students</strong>
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
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">📚 BioTech 3rd Semester — Important Instructions</h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">

                <p><strong>✨ Hi BioTech Juniors!</strong> A few important things to keep in mind as you progress through 3rd semester — read carefully, this will genuinely help you.</p>

                <p>• <strong>Maintain CGPA:</strong> Companies keep a cutoff of <strong>7 or 7.5 CGPA</strong> — no excuses below that. Those with <strong>8.5+ are in a very safe zone</strong> — aim for 8+ minimum and maintain it till at least 6th semester.</p>

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
                3rd Semester Syllabus
              </CardTitle>
              <CardDescription>
                Official syllabus for 3rd semester B.Tech
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

export default ThirdSemesterBTNotes;
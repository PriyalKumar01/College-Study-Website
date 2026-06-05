import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const ThirdSemesterBTNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BT-3rd Semester');
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Playlists for Biotech
  const subjectPlaylists = {
    biochemistry: { detailed: [], oneshot: [] },
    immunology: { detailed: [], oneshot: [] },
    ipr: { detailed: [], oneshot: [] },
    microBiology: { detailed: [], oneshot: [] },
    plantAnimal: { detailed: [], oneshot: [] },
    analyticalTechniques: { detailed: [], oneshot: [] }
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
      icon: '🧪',
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
        { title: 'Amino Acid Disorder', url: 'https://drive.google.com/file/d/1lF5odTEK-gJfp4s8LXUAYq0KSBZKBRTH/view?usp=drivesdk' }
      ]
    },
    {
      id: 'immunology',
      name: 'Immunology & Immunotechnology',
      icon: '🛡️',
      color: 'bg-purple-500',
      notes: [
        { title: 'Hypersensitivity to a Substance', url: 'https://drive.google.com/file/d/1bBXaBG8i55OrKu1OU8gV_Os0td4DU47H/view?usp=drivesdk' },
        { title: 'Immunology PDF Notes', url: 'https://drive.google.com/file/d/1I5CI39rdPx7g5c6YwqLisQ0o2DWa0f79/view?usp=drivesdk' },
        { title: 'Immunology BOOK by-Kuby(5 edition)', url: 'https://drive.google.com/file/d/1qzAlv9xYoYyBOgMgIccmhK_b5wnfkNeH/view?usp=drivesdk' },
        { title: 'Innate Immunity PDF', url: 'https://drive.google.com/file/d/1_m5NlOX_wx5yYF8rxSHn12bf2C5COL1D/view?usp=drivesdk' }
      ]
    },
    {
      id: 'ipr',
      name: 'IPR, Ethics & Patenting in Biotechnology',
      icon: '📄',
      color: 'bg-green-500',
      notes: [
        { title: 'Unit-4 Bio-Safety (BEST)', url: 'https://drive.google.com/file/d/1r_GASU4kLBYxEOmUTBWJxpswvYUCAoAl/view?usp=drivesdk', recommended: true },
        { title: 'Unit-4 Bio Safety PDF', url: 'https://drive.google.com/file/d/1_CbZuuk4AC6-XxhaP4rO4gZD2O4sqigZ/view?usp=drivesdk' },
        { title: 'Bombs, Missiles, Rockets Patentability', url: 'https://drive.google.com/file/d/1-wZNO58wp_uxYYOKgLQekkHWIJ04fi7L/view?usp=drivesdk' },
        { title: 'IPR & Patent in Biotechnology', url: 'https://drive.google.com/file/d/1vJO-9aF4JKKt0H-8JJQXhByZz2Pp3HeO/view?usp=drivesdk' },
        { title: 'International Conventions & GATT', url: 'https://drive.google.com/file/d/1IblrgMSmoj_JS3zpKbYnGGGHsZsPIhgl/view?usp=drivesdk' },
        { title: 'IPR PDF', url: 'https://drive.google.com/file/d/1Jwi8aD6EC3APbE5wYqW_NgqMAKd-XNR1/view?usp=drivesdk' }
      ]
    },
    {
      id: 'microBiology',
      name: 'Micro Biology',
      icon: '🔬',
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
        { title: 'Viruses PDF', url: 'https://drive.google.com/file/d/15O74fVDx18rZfGSnKECvwVhThwqquhTW/view?usp=drivesdk' }
      ]
    },
    {
      id: 'plantAnimal',
      name: 'Plant & Animal Biotechnology',
      icon: '🌿',
      color: 'bg-indigo-500',
      notes: []
    },
    {
      id: 'analyticalTechniques',
      name: 'Analytical Techniques in Biotechnology',
      icon: '⚙️',
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

interface Note {
  id?: string;
  title: string;
  url: string;
  recommended?: boolean;
  isCommunity?: boolean;
  fileName?: string;
  uploadedBy?: string;
  userName?: string;
}

  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes.map(n => ({ ...n, isCommunity: false } as Note)),
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
        } as Note))
    ]
  }));

  const syllabus = {
    title: '3rd Semester Syllabus',
    url: 'https://drive.google.com/file/d/1h6AmBh57MfadiOaT377p3xcm4in2hA6R/view?usp=drivesdk'
  };

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedSubject(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Subjects
            </button>
            <h1 className="text-3xl font-serif leading-tight mb-2">
              {subject.name} Notes
            </h1>
            <p className="text-xs opacity-50 uppercase tracking-widest">BioTechnology — 3rd Semester</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full mb-12">
          {subject.notes.length === 0 ? (
            <div className="text-center py-16 border border-dashed rounded-xl bg-card">
              <p className="text-muted-foreground text-sm mb-1">No study materials uploaded yet for this subject.</p>
              <p className="text-xs text-muted-foreground">Contributions from students are welcome!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {subject.notes.map((note, index) => (
                <motion.div
                  key={note.id || index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-md flex flex-col h-full relative">
                    {note.isCommunity && isOwner && (
                      <button
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-lg transition-colors z-10"
                        onClick={() => handleDeleteCommunityNote(note.id)}
                        title="Delete material"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-full ${subject.color} flex items-center justify-center text-white text-xs`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">PDF</span>
                      {note.isCommunity && (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">Community</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 mb-4">{note.title}</h3>
                    {note.userName && (
                      <p className="text-[10px] text-muted-foreground mb-3">Uploaded by: {note.userName}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(note.url, note.title)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded bg-foreground text-background hover:opacity-85 transition-opacity"
                        disabled={note.url === '#'}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </button>
                      <button
                        onClick={() => viewInBrowser(note.url)}
                        className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
                        disabled={note.url === '#'}
                        title="View in Browser"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/btech-notes/second-year/semester-3')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">BioTechnology Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            3rd Semester<br />
            <span className="opacity-60">BioTechnology Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. BioTechnology — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">BT Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">3rd Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl"
        >
          <h3 className="text-base font-bold text-foreground mb-3">📚 BioTech 3rd Semester — Important Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">✨ Hi BioTech Juniors!</strong> A few important things to keep in mind as you progress through 3rd semester — read carefully.</p>
            <p>• <strong className="text-foreground">Micro Biology:</strong> Learn the isolation, preservation, and classification methods. Growth kinetics and Chemostat models are highly analytical and important for exams.</p>
            <p>• <strong className="text-foreground">BioChemistry:</strong> Focus on metabolic pathways like Glycolysis, TCA cycle, lipid oxidation, and nucleic acid synthesis. Memorizing structural intermediates is essential.</p>
            <p>• <strong className="text-foreground">Maintain CGPA:</strong> Keep your CGPA above <strong className="text-foreground">7.5+</strong> to be safe for placement cutoffs and academic research profiles.</p>
            <p className="text-red-600 dark:text-red-400"><strong>⚠️ Important:</strong> Draw neat diagrams of biochemical cycles and biological pathways. Clearly label the enzymes, substrates, and regulatory control steps in exam answers.</p>
            <p>✨ Best Wishes — <strong className="text-foreground">Priyal Kumar</strong></p>
          </div>
        </motion.div>

        {/* Syllabus */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="border border-border rounded-xl p-5 bg-card flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">3rd Semester Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 3rd semester B.Tech BT</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(syllabus.url, syllabus.title)}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase py-2.5 px-5 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity"
            disabled={syllabus.url === '#'}
          >
            <Download className="h-3.5 w-3.5" /> Download Syllabus
          </button>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">Study Resources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                      {subject.notes.length} files
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 flex-1">{subject.name}</h3>

                  {/* Playlist section */}
                  {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <button
                        className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => toggleSubjectExpansion(subject.id)}
                      >
                        <span className="flex items-center gap-1.5">
                          <Play className="h-3 w-3" /> Study Playlists
                        </span>
                        {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                      {expandedSubjects.includes(subject.id) && (
                        <div className="mt-2 space-y-1">
                          {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                            >
                              📚 Detailed ({getSubjectPlaylists(subject.id).detailed.length})
                            </button>
                          )}
                          {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                            >
                              ⚡ One Shot ({getSubjectPlaylists(subject.id).oneshot.length})
                            </button>
                          )}
                          {getSubjectPlaylists(subject.id).detailed.length === 0 && getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                            <p className="text-xs text-muted-foreground px-2 py-1">Not available yet</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedSubject(subject.id)}
                      className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200"
                    >
                      View Notes
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
        playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] : []}
        type={selectedPlaylistType}
      />
    </div>
  );
};

export default ThirdSemesterBTNotes;



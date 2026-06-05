import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const FourthSemesterCHENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CHE-4th Semester');

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

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  
  const subjectPlaylists = {
    cem: {
      detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
      oneshot: [{ title: 'Playlist Coming Soon', url: '#' }]
    },
    mat: {
     detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
      oneshot: [{ title: 'Playlist Coming Soon', url: '#' }]
    },
    cre: {
      detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
      oneshot: [{ title: 'Playlist Coming Soon', url: '#' }]
    },
    conm : {
      detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
      oneshot: [{ title: 'Playlist Coming Soon', url: '#' }]
    },
    pht : {
      detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
      oneshot: [{ title: 'Playlist Coming Soon', url: '#' }]
    },
    mto : {
      detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
      oneshot: [{ title: 'Playlist Coming Soon', url: '#' }]
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
      id: 'cem',
      name: 'CEM-II',
      fullName: 'Chemical Engineering Thermodynamics - II',
      icon: '🧪',
      color: 'bg-green-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
        { title: 'Chemistry Lab Notes', url: 'https://drive.google.com/file/d/12v99u53GrcMPG33oW6UMfOohjPeSYbfP/view?usp=drivesdk' },
      ]
    },
    {
      id: 'mat',
      name: 'Modern Analytical Techniques',
      fullName: 'Modern Analytical Techniques Notes',
      icon: '📊',
      color: 'bg-green-500',
      notes: [
        { title: 'Differential Scanning Calorimetry Notes', url: 'https://drive.google.com/file/d/1wCEqN3tIifwtS_fv5qQl9LVKHykbuLD_/view?usp=drivesdk' },
        { title: 'Chromatography Notes (Part-1)', url: 'https://drive.google.com/file/d/1iz4Cca_KWzuH7zRhpIBFfUAQ_6nF8NQC/view?usp=drivesdk' },
        { title: 'Chromatography Notes (Part-2)', url: 'https://drive.google.com/file/d/1MRRbdlVurU5vDqABQSvfT1Q-G6oSH1lS/view?usp=drivesdk' },
        { title: 'Thermogravimetric Analysis(TGA) Notes', url: 'https://drive.google.com/file/d/10KgYmaFJ7Z1zX6DQn41RFoW-OQu5SO9d/view?usp=drivesdk' },
        { title: 'Working of TGA Notes', url: 'https://drive.google.com/file/d/1cVe0tAvH_VQt6oi7QBOe91Cut9eUclnj/view?usp=drivesdk' },
        { title: 'DTA-Differential Thermal Analysis Notes', url: 'https://drive.google.com/file/d/1pSFNT94ho5YjNAH1S2ZNA76hETTuBfsg/view?usp=drivesdk' },
        { title: 'Patentiometry & Conductometry Notes', url: 'https://drive.google.com/file/d/1mkXkhL6ua74tE8Ufo7uFxKPBha_ACFkb/view?usp=drivesdk' },
        { title: 'X-ray Diffraction Notes', url: 'https://drive.google.com/file/d/1IWzSzhoYpm-SLShw-N3Xwz2E9OUSgahT/view?usp=drivesdk' },
        { title: 'Basic Principles of Polarography Notes', url: 'https://drive.google.com/file/d/162B6Zu6l491A2HyXgr5GY6s4XC0nV3hA/view?usp=drivesdk' },
        { title: 'IR/Vibrational Spectroscopy Notes', url: 'https://drive.google.com/file/d/18-4JVJ80esN9sMfHbjCsSDt_OO3XtMmQ/view?usp=drivesdk' },
        { title: 'Mass Spectroscopy Notes', url: 'https://drive.google.com/file/d/1U0JBO8ZshIAiBcs_nJv0_kW04pWN-TwY/view?usp=drivesdk' },
        { title: 'Basic Components Of Geo Chromatography Notes', url: 'https://drive.google.com/file/d/1RRRN9lKSRx394X5b3f2MSK8_i7d7tnfG/view?usp=drivesdk' },
        { title: 'Liquid Chromatography Notes', url: 'https://drive.google.com/file/d/1YDHvaxeYZgwPtieALrq4oObI9QhYqlEv/view?usp=drivesdk' },
        { title: 'Chromatography -Intro Notes', url: 'https://drive.google.com/file/d/1gjHkLBLXrZgUsWT0MfDPRsgW4qB8EBNi/view?usp=drivesdk' },
        { title: 'Polarography pdf Notes', url: 'https://drive.google.com/file/d/1TusWFH_WUF1Hshs5ycVyw8RpdbLjFyHK/view?usp=drivesdk' },
        { title: 'Gas Chromatography Notes', url: 'https://drive.google.com/file/d/1jh0Re_Uw31d1MQoQqT5evVrFDKaLweu5/view?usp=drivesdk' },
        { title: 'Nuclear Magnetic Resonance Spectroscopy Notes', url: 'https://drive.google.com/file/d/1yTltHqKtOBREqS26UGayWzTyxaZhsFHM/view?usp=drivesdk' },
        { title: 'NMR Spectroscopy including CMR Notes', url: 'https://drive.google.com/file/d/1zS_Wi7Ml2eHotb7sLNBMO77L-fLuhAAN/view?usp=drivesdk' },
        { title: 'Polarography -DME/RPE Notes', url: 'https://drive.google.com/file/d/1-rAD72lQkObeS4K237E9UpzZJ2cugIWk/view?usp=drivesdk' },
        { title: 'Scanning Electron Microscope Notes', url: 'https://drive.google.com/file/d/1hul-DR8eoWJEowV2jMqLDvqhasnz-ImU/view?usp=drivesdk' },
        { title: 'TEM Notes (Part-1)', url: 'https://drive.google.com/file/d/1aq7Hc_i6RTgDP_acP8Cuf_8tAWC9v-wb/view?usp=drivesdk' },
        { title: 'TEM Notes (Part-2)', url: 'https://drive.google.com/file/d/1njbs465mU1L2QVLznoqMYAlsETi9uMXe/view?usp=drivesdk' },
      ]
    },
    {
      id: 'cre',
      name: 'CRE -I',
      fullName: 'Chemical Reaction Engineering -I',
      icon: '🧪',
      color: 'bg-blue-500',
      notes: [
        { title: 'CRE Notes (Part-1)', url: 'https://drive.google.com/file/d/1c7fQk_yJRZSXqGGCSc_QqC2stEnpbiBq/view?usp=drivesdk' },
        { title: 'CRE Notes (Part-2)', url: 'https://drive.google.com/file/d/1HbnmK2R-ldt9h350knkPMQskvz5IKQtD/view?usp=drivesdk' },
      ]
    },
    {
      id: 'conm',
      name: 'Computer Oriented Numerical Methods',
      fullName: 'Computer Oriented Numerical Methods Notes',
      icon: '📊',
      color: 'bg-green-500',
      notes: [
        { title: 'CONM Notes (Part-1)', url: 'https://drive.google.com/file/d/12e_ozWRloNzQ1sJdaJkZgkY_LzR-2pC9/view?usp=drivesdk' },
        { title: 'CONM Notes (Part-2)', url: 'https://drive.google.com/file/d/1bKvMQvMpZz5IotvJ3uteQaxhnSFP-6Zl/view?usp=drivesdk' },
      ]
    },
    {
      id: 'pht',
      name: 'Process Heat Transfer',
      fullName: 'Process Heat Transfer notes',
      icon: '⚗️',
      color: 'bg-purple-500',
      notes: [
        { title: 'Boiling Condensation Evaporator Notes', url: 'https://drive.google.com/file/d/1NN3lUUUI4vUfI0S3KnEqjFPUzPfe-TqB/view?usp=drivesdk' },
        { title: 'Conduction Notes', url: 'https://drive.google.com/file/d/1nNHHP_VwytaZ8BRfhqHzZWaIc_zsv5Pq/view?usp=drivesdk' },
        { title: 'Convection Notes', url: 'https://drive.google.com/file/d/1ovZoU-PzRqq1ZJ6WMra270wTZUTukg6j/view?usp=drivesdk' },
        { title: 'Radiation Notes', url: 'https://drive.google.com/file/d/1PmROELGO0Zkcw_H_oZEa6v7_qVRxXhVE/view?usp=drivesdk' },
        { title: 'Unsteady State Notes', url: 'https://drive.google.com/file/d/14VcXZmBdLY42veDvQWo2RgsicB529Pw0/view?usp=drivesdk' },
      ]
    },
    {
      id: 'mto',
      name: 'MTO -I',
      fullName: 'Mass Transfer Operations -I',
      icon: '🔬',
      color: 'bg-orange-500',
      notes: [
        { title: 'Unit-1 Class Notes', url: 'https://drive.google.com/file/d/1o_qt4Fxs49Sozjgme6oA60zTII-sgNc8/view?usp=drivesdk' },
        { title: 'Membranes & its Processes Fundamentals', url: 'https://drive.google.com/file/d/1JGXKFisxS4RgxZ0_5znlJQ8fpLgyTypr/view?usp=drivesdk' },
        { title: 'Membrane Separation -Inro.', url: 'https://drive.google.com/file/d/1QqR4h6Q9Co9RdtWNa9tSEOCLwar1fsfc/view?usp=drivesdk' },
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 4th Semester CHE',
      icon: '❓',
      color: 'bg-red-600',
      notes: [
        { title: 'Mid Sem-1 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1iVsbl4dLayRJp2u1i3qjGOZSHpJa6Gzc/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1xnWaqUUM6dt6F-Vqb-b74Q8AQlarNRh2/view?usp=drivesdk' },
        { title: 'End Sem PYQS (2023-24)', url: 'https://drive.google.com/file/d/1ljA5It3SXbRsdeEHQLqnwIZMGtSqvgP1/view?usp=drivesdk' },
        { title: 'All Mid Sem PYQS (2022-23)', url: 'https://drive.google.com/file/d/1kCQYQhGvRwBCi9Ipo_kmfIF5BgI-kHlk/view?usp=drivesdk' },
        { title: 'End Sem PYQS (2022-23)', url: 'https://drive.google.com/file/d/1Y5AZMMpGoJkuuNTTCy5J9x3ZOQnlWEGj/view?usp=drivesdk' },
      ]
    },
  ];

  const syllabus = {
    title: '4th Semester CHE Syllabus',
    url: 'https://drive.google.com/file/d/1MhO63XR0C3lz4ZI7RfuOLLbc4wT2rjkw/view?usp=drivesdk'
  };

  const subjects: any[] = staticSubjects.map(sub => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter(cn => cn.subject === sub.name || cn.subject === sub.id)
        .map(cn => ({
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
            <p className="text-xs opacity-50 uppercase tracking-widest">Chemical Engineering — 4th Semester</p>
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
                        onClick={() => handleDeleteCommunityNote(note.id, note.fileName)}
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
            onClick={() => navigate('/btech-notes/second-year/semester-4')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Chemical Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            4th Semester<br />
            <span className="opacity-60">Chemical Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Chemical Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">CHE Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">4th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Syllabus Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="border border-border rounded-xl p-5 bg-card flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center text-white">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{syllabus.title}</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 4th semester CHE</p>
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
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col relative">
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
                          {getSubjectPlaylists(subject.id).detailed && getSubjectPlaylists(subject.id).detailed.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                            >
                              📚 Detailed ({getSubjectPlaylists(subject.id).detailed.length})
                            </button>
                          )}
                          {getSubjectPlaylists(subject.id).oneshot && getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                            >
                              ⚡ One Shot ({getSubjectPlaylists(subject.id).oneshot.length})
                            </button>
                          )}
                          {(!getSubjectPlaylists(subject.id).detailed || getSubjectPlaylists(subject.id).detailed.length === 0) &&
                           (!getSubjectPlaylists(subject.id).oneshot || getSubjectPlaylists(subject.id).oneshot.length === 0) && (
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

export default FourthSemesterCHENotes;




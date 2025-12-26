import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FourthSemesterCHENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 4th Semester CHE on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot') => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject?.playlists?.[type]?.length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.playlists || { detailed: [], oneshot: [] };
  };

  const subjects = [
    {
      id: 'che-engg-thermodynamics',
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
      id: 'MAT',
      name: 'Modern Analical Techniques',
      fullName: 'Modern Analical Techniques Notes',
      icon: '🧪',
      color: 'bg-green-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
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
      id: 'conm',
      name: 'Computer Oriented Numerical Methods',
      fullName: 'Computer Oriented Numerical Methods Notes',
      icon: '🧪',
      color: 'bg-green-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'CONM Notes (Part-1)', url: 'https://drive.google.com/file/d/12e_ozWRloNzQ1sJdaJkZgkY_LzR-2pC9/view?usp=drivesdk' },
        { title: 'CONM Notes (Part-2)', url: 'https://drive.google.com/file/d/1bKvMQvMpZz5IotvJ3uteQaxhnSFP-6Zl/view?usp=drivesdk' },
      ]
    },
    {
      id: 'cre-I',
      name: 'CRE -I',
      fullName: 'Chemical Reaction Engineering -I',
      icon: '⚗️',
      color: 'bg-blue-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'CRE Notes (Part-1)', url: 'https://drive.google.com/file/d/1c7fQk_yJRZSXqGGCSc_QqC2stEnpbiBq/view?usp=drivesdk' },
        { title: 'CRE Notes (Part-2)', url: 'https://drive.google.com/file/d/1HbnmK2R-ldt9h350knkPMQskvz5IKQtD/view?usp=drivesdk' },
      ]
    },
    {
      id: 'process-heat-transfer',
      name: 'Process Heat Transfer',
      fullName: 'Process Heat Transfer notes',
      icon: '🔬',
      color: 'bg-purple-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'Boiling Condensation Evaporator Notes', url: 'https://drive.google.com/file/d/1NN3lUUUI4vUfI0S3KnEqjFPUzPfe-TqB/view?usp=drivesdk' },
        { title: 'Conduction Notes', url: 'https://drive.google.com/file/d/1nNHHP_VwytaZ8BRfhqHzZWaIc_zsv5Pq/view?usp=drivesdk' },
        { title: 'Convection Notes', url: 'https://drive.google.com/file/d/1ovZoU-PzRqq1ZJ6WMra270wTZUTukg6j/view?usp=drivesdk' },
        { title: 'Radiation Notes', url: 'https://drive.google.com/file/d/1PmROELGO0Zkcw_H_oZEa6v7_qVRxXhVE/view?usp=drivesdk' },
        { title: 'Unsteady State Notes', url: 'https://drive.google.com/file/d/14VcXZmBdLY42veDvQWo2RgsicB529Pw0/view?usp=drivesdk' },
      ]
    },
    {
      id: 'mto-I',
      name: 'MTO -I',
      fullName: 'Mass Transfer Operations -I',
      icon: '📊',
      color: 'bg-orange-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
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
      playlists: {
        detailed: [],
        oneshot: []
      },
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

  const handleDownload = (url: string, title: string) => {
    if (url === '#') return;
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

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
              {subject.fullName} - 4th Semester CHE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
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
                    <Button
                      onClick={() => handleDownload(note.url, note.title)}
                      className="w-full btn-hero"
                      disabled={note.url === '#'}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {note.url === '#' ? 'Coming Soon' : 'Download PDF'}
                    </Button>
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
            onClick={() => navigate('/btech-notes/second-year/semester-4')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            4th Semester CHE Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Chemical Engineering - Comprehensive study materials
          </p>
        </motion.div>

        {/* Syllabus Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{syllabus.title}</h3>
                <p className="text-sm text-muted-foreground">Official syllabus for 4th semester CHE</p>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload(syllabus.url, syllabus.title)} 
              className="btn-hero"
              disabled={syllabus.url === '#'}
            >
              <Download className="h-4 w-4 mr-2" />
              {syllabus.url === '#' ? 'Coming Soon' : 'Download Syllabus'}
            </Button>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const playlists = getSubjectPlaylists(subject.id);
            const hasDetailedPlaylist = playlists.detailed && playlists.detailed.length > 0 && playlists.detailed[0].url !== '#';

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name); }}
                    title="Share on WhatsApp"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
                      {subject.icon}
                    </div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {subject.notes.length} notes available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {subject.notes.length} Files
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubject(subject.id)}
                        className="flex-1"
                      >
                        View Notes
                      </Button>
                    </div>
                    
                    {hasDetailedPlaylist && (
                      <div className="pt-2 border-t">
                        <button
                          onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                          className="w-full flex items-center justify-between p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Study Playlists
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        playlists={getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] || []}
        type={selectedPlaylistType}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
      />
    </div>
  );
};

export default FourthSemesterCHENotes;

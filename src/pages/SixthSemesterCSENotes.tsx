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

const SixthSemesterCSENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const handleWhatsAppShare = (subjectName: string, subjectId: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectId)}`;
    const message = `Check out ${subjectName} notes for 6th Semester CSE on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
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

  const staticSubjects = [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      icon: '🤖',
      color: 'bg-purple-500',
      playlists: {
        detailed: [{ title: 'AI Complete Playlist', url: '#' }],
        oneshot: [{ title: 'AI One Shot', url: '#' }]
      },
      notes: [{ title: 'AI Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/15XHFBtmouZBNB1IW2h6LL57T-uqzGDSH/view?usp=drivesdk' }]
    },
    {
      id: 'dip',
      name: 'Digital Image Processing',
      icon: '📚',
      color: 'bg-blue-500',
      playlists: {
        detailed: [{ title: 'DIP Complete Playlist', url: '#' }],
        oneshot: [{ title: 'DIP One Shot', url: '#' }]
      },
      notes: [{ title: 'DIP Notes', url: '#' }]
    },
    {
      id: 'cd',
      name: 'Compiler Design Notes',
      icon: '💻',
      color: 'bg-blue-500',
      playlists: {
        detailed: [
          { title: 'CD Playlist By- Gate Hub', url: 'https://youtube.com/playlist?list=PL1QH9gyQXfguPNDTsnG90W2kBDQpYLDQr&si=-RC7IX3_lC1n7bRt', recommended: true  },
          { title: 'CD Unitwise OneShot Playlist - MultiAtoms', url: 'https://youtube.com/playlist?list=PLh11ucJN276J4uv6uwawDr3mNHTdx9n43&si=7K6fQKEqeDpyp_Et' },
          ],
        oneshot: [
          { title: 'CD One Shot By-5 Min. Engg', url: 'https://youtu.be/7ICf62fp_4I?si=IyIn0v3m9QmzPrpX' , recommended: true },
          { title: 'Unit-1 One Shot By-Gate Hub', url: 'https://youtu.be/VQeI7lB5ccM?si=qELcs_g6tsZ3exc5' , recommended: true  },
          { title: 'CD One Shot By-Knowledge Gate', url: 'https://youtu.be/OQCjakjCJu4?si=tyAXGu7MVXaPJyD7', recommended: true  },
        ]
      },
      notes: [
        { title: 'CD -Rough Copy (My Lecture Notes)', url: 'https://drive.google.com/file/d/1HfGUofPis_2lNC6HWPUJANSmjJmfQvQt/view?usp=drivesdk' , recommended: true },
        { title: 'Complete CD Notes By-Priyal Kumar (BEST)', url: 'https://drive.google.com/file/d/1uGNVlq5UNufG8Nz9JyJiqeAgvj_F46zb/view?usp=drivesdk' , recommended: true },
        { title: 'Code Optimization Notes (BEST)', url: 'https://drive.google.com/file/d/1ggNi8S3qTwtvrV7oRw1wVBnOOQ7HsoNH/view?usp=drivesdk', recommended: true  },
        { title: 'DAG Notes (BEST)', url: 'https://drive.google.com/file/d/1smxrq6G6IrWo5HmhzewZyNn5Vmif2wJF/view?usp=drivesdk' , recommended: true },
        { title: 'Intermediate Code Generator Notes (BEST)', url: 'https://drive.google.com/file/d/19S6Jzc4a7wx7RMuFggI-SFtSbr3KXuyA/view?usp=drivesdk' , recommended: true },
        { title: 'Full CD Notes (Optional)', url: 'https://drive.google.com/file/d/1o-EHoiE9vK4WmKiOMAKnaI02BYXsRvhp/view?usp=drivesdk' },
      ]
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship Notes',
      icon: '📘',
      color: 'bg-green-500',
      playlists: {
        detailed: [
         { title: 'Financing Decision -Capital Structure', url: 'https://youtu.be/xO20sAjwbq4?si=EmbYJhfQGf8OBd16' , recommended: true },
            { title: 'Investment Decision -Capital Budget', url: 'https://youtu.be/KAITRH_Ohss?si=l9ggbusQWH0rbxOL' , recommended: true },
            { title: 'EBIT/EPS Numerical -Capital Structure', url: 'https://youtu.be/jG0pd7bFMbM?si=dT3qHXuoukRM9cfY' , recommended: true },
            { title: 'ARR Numerical -Capital Structure', url: 'https://youtu.be/duAS8l4GcgM?si=gWTqjks_LLGCsBmF' , recommended: true },
            { title: 'IRR Numerical -Capital Structure', url: 'https://youtu.be/EUGU9q1gzR0?si=osFvPbZY0NsGQBX9' , recommended: true },
            { title: 'NPV Numerical -Capital Structure', url: 'https://youtu.be/sTvV0fkLhh0?si=LeA4JZVzu0ptcFN1' , recommended: true },
            { title: 'Working Capital Management -Concepts', url: 'https://youtu.be/MDeCGC5G2BI?si=PyGYO7Xb_KioasUg' , recommended: true },
            { title: 'Working Capital Management -Numericals', url: 'https://youtu.be/8cB2NI3NkgU?si=59kVTIl96ee1YDs2' , recommended: true },

        ],
        oneshot: [
          { title: 'Financing Decision -Capital Structure', url: 'https://youtu.be/xO20sAjwbq4?si=EmbYJhfQGf8OBd16' , recommended: true },
            { title: 'Investment Decision -Capital Budget', url: 'https://youtu.be/KAITRH_Ohss?si=l9ggbusQWH0rbxOL' , recommended: true },
            { title: 'EBIT/EPS Numerical -Capital Structure', url: 'https://youtu.be/jG0pd7bFMbM?si=dT3qHXuoukRM9cfY' , recommended: true },
            { title: 'ARR Numerical -Capital Structure', url: 'https://youtu.be/duAS8l4GcgM?si=gWTqjks_LLGCsBmF' , recommended: true },
            { title: 'IRR Numerical -Capital Structure', url: 'https://youtu.be/EUGU9q1gzR0?si=osFvPbZY0NsGQBX9' , recommended: true },
            { title: 'NPV Numerical -Capital Structure', url: 'https://youtu.be/sTvV0fkLhh0?si=LeA4JZVzu0ptcFN1' , recommended: true },
            { title: 'Working Capital Management -Concepts', url: 'https://youtu.be/MDeCGC5G2BI?si=PyGYO7Xb_KioasUg' , recommended: true },
            { title: 'Working Capital Management -Numericals', url: 'https://youtu.be/8cB2NI3NkgU?si=59kVTIl96ee1YDs2' , recommended: true },

        ]
      },
      notes: [
        { title: 'Entrepreneurship Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/1m6DIjYxnAQhHJ2j7ER4J2-vVRhIfrsY7/view?usp=drivesdk' , recommended: true },
        { title: 'Full Entrepreneurship Notes (BEST)', url: 'https://docs.google.com/document/d/1-F4WRVvWzW8OZUjUsFtZX0mgtbsq1dGJ5tkl_hJao0I/edit?usp=sharing' , recommended: true },
        { title: 'Entrepreneurship Extra GPT Notes', url: 'https://drive.google.com/file/d/1epEbIJ_Y8J_V7rkbPM50ufwG8DVNVCq9/view?usp=drivesdk' },
        { title: 'Imp. Numerical PDF', url: 'https://drive.google.com/file/d/1X2GW3TcZiIp1RLpB_HECRerQQTBGFWIb/view?usp=drivesdk' , recommended: true },

      ]    },
    {
      id: 'oops',
      name: 'Object Oriented System Design',
      icon: '🤖',
      color: 'bg-green-500',
      playlists: {
        detailed: [
          { title: 'OOPS Playlist', url: '#' },
        ],
        oneshot: []
      },
      notes: [
        { title: 'OOMD Notes with UML', url: 'https://drive.google.com/file/d/15U47qFbbIchLEjjOdDgDTasWDd9a9a0k/view?usp=drivesdk' },
        { title: 'OOS Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/1nT8SZZVX8HNIa-eL8gLHeS4tlSwrBPvz/view?usp=drivesdk' },
      ]
    },
    {
      id: 'cg',
      name: 'Computer Graphics Notes',
      icon: '📘',
      color: 'bg-green-500',
      playlists: {
        detailed: [
          { title: 'CG Playlist - 5 Min. Engg (Must Watch)', url: 'https://youtube.com/playlist?list=PLYwpaL_SFmcAtxMe7ahYC4ZYjQHun_b-T&si=bWK_DqlTVDh7-sXJ' , recommended: true  },
          { title: 'CG OneShot Playlist - MultiAtom', url: 'https://youtube.com/playlist?list=PLvu-LC7buiaW7eFdacsxGSeaoe2euao6c&si=G2ZmT7LIk-wHj8Ll'  },
          { title: 'CG By- Education 4 u Playlist (Must Watch)', url: 'https://youtube.com/playlist?list=PLrjkTql3jnm9cY0ijEyr2fPdwnH-0t8EY&si=1X_5EcUzdr7yXKca' , recommended: true  },
        ],
        oneshot: [
          { title: 'CG Complete OneShot (NEW)', url: 'https://youtu.be/ufafNJAXSnA?si=kcJv6vrKBrNzMJnN' },
          { title: 'Transformations in 2D', url: 'https://youtu.be/LJA8HlPfyQw?si=OEVl7yX1CUoDcTGi' , recommended: true  },
          { title: 'Transformations in 3D', url: 'https://youtu.be/0ebVXplaJFc?si=9Fl1n4k8Osm0CIju' , recommended: true  },
          { title: 'Window to Viewport Transformation', url: 'https://youtu.be/ivNhBhS1UoU?si=QdXdlYHdMSHlO4J_' , recommended: true  },
          { title: 'Curve & Surface -Lecture', url: 'https://youtu.be/uKXbkJR6gek?si=pCKpOIEJEYDWs6df' , recommended: true  },
          { title: 'Hidden & Visible Surfaces -Itro', url: 'https://youtu.be/kPd95B2KOyc?si=BlBl7iDOgxv6WuBs' , recommended: true  },
          { title: 'Hidden & Visible Surfaces -State Space Method', url: 'https://youtu.be/dqsVQ31ZfuE?si=IzlNa0KAQrOe4KWL' , recommended: true  },
          { title: 'Coherence Properties -Lecture', url: 'https://youtu.be/BOiEtlLwUuw?si=ES0-2bAXrJJhUPhY' , recommended: true  },
          { title: 'Back Face Removal -Lecture', url: 'https://youtu.be/_p16NATygqU?si=hqihEdZLK5A_m0Lx' , recommended: true  },
          { title: 'Back Face Dectection Methods-Lecture', url: 'https://youtu.be/tOOiJ91wWJY?si=IVgINXZDM1SmHpjC' , recommended: true  },
          { title: 'Z-Buffer algorithm -Lecture', url: 'https://youtu.be/JZutixUiCEE?si=JH_RSKumVp77DmiZ' , recommended: true  },
          { title: 'Curve & Its Types -Lecture', url: 'https://youtu.be/1iuINGsS_vo?si=ThiB_4HKgJ-rCSxs' , recommended: true  },
          { title: 'Beizer Curve & Its Properties -Lecture', url: 'https://youtu.be/grYrC6_LDcY?si=uRKG1lBnTwvD3sM4' , recommended: true  },
          { title: 'Beizer Curve  -Numerical', url: 'https://youtu.be/wZbazXBkGv4?si=mlvtD15PVaHRixUa' , recommended: true  },
          { title: 'Hermite Curve -Lecture', url: 'https://youtu.be/8vo21tbtDgU?si=OXcsTld9I2bXxLpu' , recommended: true  },
          { title: 'Beizer Curve & Hermite Spline -Numericals', url: 'https://youtu.be/4vjBXh3xYB4?si=k4oTSB3YAVwblJtu' , recommended: true  },
          { title: 'Concepts of B-Spline -Lecture', url: 'https://youtu.be/kFRl2eNyW1E?si=Cefg5esj-FM_dTc5' , recommended: true  },
          { title: 'Numericals on B-Spline', url: 'https://youtu.be/H0VBveFyIZU?si=SY2ZIvDcacwv2z_l' , recommended: true  },
        ]
      },
      notes: [
        { title: 'Unit-1 Complete Notes', url: 'https://drive.google.com/file/d/1YK7hE7bcjU08i1XORSFUyTPU029wzZf6/view?usp=drivesdk', recommended: true },
        { title: 'Unit-2 Complete Notes', url: 'https://drive.google.com/file/d/1mFKMpVux4rH1-u62SJj80Ey_30bGXvYC/view?usp=drivesdk', recommended: true },
        { title: 'Unit-3 Complete Notes', url: 'https://drive.google.com/file/d/1Vu-o6nehnizx8L9Ix9MY6liRZzOKqtm4/view?usp=drivesdk', recommended: true },
        { title: 'Unit-4 Complete Notes', url: 'https://drive.google.com/file/d/1IlfUbqaLyS2mCws7MWCHS844R04eOfj9/view?usp=drivesdk', recommended: true },
        { title: 'Unit-5 Complete Notes', url: 'https://drive.google.com/file/d/1NIdOhmiQzq1ZrUspMA-9xkPCocChfvCS/view?usp=drivesdk', recommended: true },
        { title: 'CG Short Notes(UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/1vrqJcmk6OWhT-78xm24lXYoNc4c9AyyA/view?usp=drivesdk', recommended: true },
        { title: 'CG Lab File by-Priyal Kumar', url: 'https://drive.google.com/file/d/1mYLcW_NtDwqmiMrlYKwhr8CZz5L7wA-s/view?usp=drivesdk', recommended: true },
        { title: 'CG Imp. Lab Program for Practical & ESE', url: 'https://drive.google.com/file/d/1x_jsxXpk-Pk1Yg-Bk9KHX24lji7ZLicf/view?usp=drivesdk', recommended: true },
      ]
    }
    ,
    {
      id: 'pyqs',
      name: 'ALL MID & ESE PYQs',
      icon: '📚',
      color: 'bg-blue-500',
      notes: [
        { title: 'MID SEM-1 PYQS (2025-2026)', url: 'https://drive.google.com/file/d/1knakHpegqEoLF34EjA1n0as_R5uXt_R1/view?usp=drivesdk' },
        { title: 'MID SEM-2 PYQS (2025-2026)', url: 'https://drive.google.com/file/d/1S9Ea1EWunrt6k1nbJmfuygW7DLm-LlAe/view?usp=drivesdk' },
        { title: 'END SEM PYQS (2025-2026)', url: 'https://drive.google.com/file/d/1v7bBFgOJ1tC6dJpCSOuCytlD9Ufmhvah/view?usp=drivesdk' },
        { title: 'MID SEM-1 PYQs (2024-2025)', url: 'https://drive.google.com/file/d/1uGqRQOMAebvV7fUgwknaEGuA6UPCMs9p/view?usp=drivesdk' },
        { title: 'MID SEM-2 PYQs (2024-2025)', url: 'https://drive.google.com/file/d/1p-nQIP-gbllmCIWkrB6dd02AuzStv2-s/view?usp=drivesdk' },
        { title: 'ALL ESE PYQs (2024-2025)', url: 'https://drive.google.com/file/d/1d3WLlDg0bqjTTpkkzAVWhIFxxMKxjGxk/view?usp=drivesdk' },
        { title: 'MID SEM-1 PYQs (2022-2023)', url: 'https://drive.google.com/file/d/1FDEZfXKRBGc5HFb0Kof-8ExBc3Hz5x-Y/view?usp=drivesdk' },
        { title: 'MID SEM-2 PYQs (2022-2023)', url: 'https://drive.google.com/file/d/15XHLzWYTnebL3Z2uWnm-mKg20Wo4S9mm/view?usp=drivesdk' },
        { title: 'ALL ESE PYQs (2022-2023)', url: 'https://drive.google.com/file/d/11qH7_rBDjOB4x0o18obJpvrUoj7ZskSy/view?usp=drivesdk' },
        { title: 'ALL PYQs (2021-2022)', url: 'https://drive.google.com/file/d/1PDajhpJ8QDrCRklkedmPBN2ir23rI7jK/view?usp=drivesdk' },
        { title: 'All OOPS PYQs (2017-2022)', url: 'https://drive.google.com/file/d/1H5tGzQG5WmQ9OpVzJm6QfzkQaXhuEdk1/view?usp=drivesdk' },
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: []
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CSE-6th Semester');
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
    title: '6th Semester CSE Syllabus',
    url: 'https://drive.google.com/file/d/1mOL5meStuQfR61dX-g5LA2S-9V0BGTrb/view?usp=drivesdk'
  };

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Button onClick={() => setSelectedSubject(null)} variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subjects
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{subject.name} 📚</h1>
            <p className="text-muted-foreground text-lg">All notes for {subject.name} - 6th Semester B.Tech</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white text-lg`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription>{subject.name} study material</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button onClick={() => handleDownload(note.url, note.title)} className="flex-1 btn-hero" disabled={note.url === '#'}>
                        <Download className="h-4 w-4 mr-2" /> {note.url === '#' ? 'Coming Soon' : 'Download'}
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Button onClick={() => navigate('/btech-notes/third-year/semester-6')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Branches
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">6th Semester CSE/IT Notes 📖</h1>
          <p className="text-muted-foreground text-lg"><strong>Only for CSE/IT students</strong></p>
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
                <p className="text-sm text-muted-foreground">Official syllabus for 6th semester CSE</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (index + 1) * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
              <Card
                className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader>
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:bg-green-50 h-8 w-8 -mt-2 -mr-2"
                      onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name, subject.id); }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Modern 3D Icon */}
                  <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className={`absolute inset-0 rounded-2xl ${subject.color} blur-xl opacity-20`} />
                    <div className={`relative w-full h-full rounded-2xl ${subject.color} bg-opacity-10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center overflow-hidden`}>
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                      <span className="text-4xl drop-shadow-md">{subject.icon}</span>
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
                    {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
                      <div className="border-t pt-4">
                        <div
                          className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                          onClick={(e) => { e.stopPropagation(); toggleSubjectExpansion(subject.id); }}
                        >
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Study Playlists</span>
                          </div>
                          {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                        {expandedSubjects.includes(subject.id) && (
                          <div className="mt-3 space-y-2 pl-2">
                            {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'detailed'); }}>
                                📚 Detailed Playlists ({getSubjectPlaylists(subject.id).detailed.length})
                              </Button>
                            )}
                            {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'oneshot'); }}>
                                ⚡ One Shot Videos ({getSubjectPlaylists(subject.id).oneshot.length})
                              </Button>
                            )}
                            {getSubjectPlaylists(subject.id).detailed.length === 0 && getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                              <p className="text-xs text-muted-foreground pl-2">Not available...</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary">{subject.notes.length} Files</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setSelectedSubject(subject.id); }}
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

export default SixthSemesterCSENotes;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Share2, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const SixthSemesterCSENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOwner } = useAuth();
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
      notes: [
        { title: 'AI Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/15XHFBtmouZBNB1IW2h6LL57T-uqzGDSH/view?usp=drivesdk' , recommended: true },
        { title: 'A* Algorithm PDF', url: 'https://drive.google.com/file/d/1ks_pUlZYWHxskrM5bt9R5cnSxl7t43qj/view?usp=drivesdk' , recommended: true},
        { title: 'AI Unit-2 PDF Notes', url: 'https://drive.google.com/file/d/1HzAZz8yz8owX-JFUAtnpV5NPBMEQSEiD/view?usp=drivesdk' , recommended: true },
        { title: 'Automated Reasoning & Visual Perception PDF', url: 'https://drive.google.com/file/d/1tXudt3Be5CsIwpDQbxrEAPCc2CAqP1yf/view?usp=drivesdk' , recommended: true },
        { title: 'Fillmore Grammer PDF', url: 'https://drive.google.com/file/d/1UTHmalD0JrzQzYZXY4hINchthZL9E600/view?usp=drivesdk' , recommended: true },
        { title: 'Intro to PROLOG PDF', url: 'https://drive.google.com/file/d/1gYtWG9BDeddCt9n5Q6eS8eJ8_Fm0Xw8k/view?usp=drivesdk' , recommended: true },
        { title: 'Case Studies: DENDRAL, MYCIN & JESS', url: 'https://drive.google.com/file/d/1SBL4n6rUE8gY_lpF0SNhzUVwJP6fncvD/view?usp=drivesdk' , recommended: true },
        { title: 'AI - 5th Assignment', url: 'https://drive.google.com/file/d/1cg9pIUUqqXni3WpSMX92jkYrqF6uXdj_/view?usp=drivesdk'  },
      ]
    },
    {
      id: 'dip',
      name: 'Digital Image Processing',
      icon: '📷',
      color: 'bg-blue-500',
      playlists: {
        detailed: [{ title: 'DIP Complete Playlist', url: '#' }],
        oneshot: [{ title: 'DIP One Shot', url: '#' }]
      },
      notes: [
        { title: 'DIP Complete Notes', url: 'https://youngresearcher.in/dip_qa/' , recommended: true }, 
        { title: 'DIP Book PDF', url: 'https://drive.google.com/file/d/1ftfZb_-YCh0Bn3BB5MqvWsJLIyGOoAcT/view?usp=drivesdk' , recommended: true  }, 
        { title: 'DIP Additional Notes', url: 'https://drive.google.com/file/d/1i2FAENNKaIEYi_0f_J9BkXGIFceovc8s/view?usp=drivesdk' , recommended: true  }, 
        { title: 'DIP Lecture Notes', url: 'https://drive.google.com/file/d/11lifkDAxyt7LMVSy6JfgkzRviUDzAwq9/view?usp=drivesdk' , recommended: true }, 
      ]
    },
    {
      id: 'cd',
      name: 'Compiler Design',
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
      name: 'Entrepreneurship',
      icon: '💡',
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
      ]
    },
    {
      id: 'oops',
      name: 'Object Oriented System Design',
      icon: '⚙️',
      color: 'bg-green-500',
      playlists: {
        detailed: [
          { title: 'OOPS Playlist', url: '#' },
        ],
        oneshot: []
      },
      notes: [
        { title: 'OOMD Notes with UML', url: 'https://drive.google.com/file/d/15U47qFbbIchLEjjOdDgDTasWDd9a9a0k/view?usp=drivesdk' },
        { title: 'OOS Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/1nT8SZZVX8HNIa-eL8gLHeS4tlSwrBPvz/view?usp=drivesdk' , recommended: true },
        { title: 'Unit-1 Best Notes - Priyal Kumar', url: 'https://drive.google.com/file/d/1G2FjarscpxMvRsndYAuhrAIr2tBg0qjK/view?usp=drivesdk' , recommended: true },
        { title: 'Unit-2 Best Notes - Priyal Kumar', url: 'https://drive.google.com/file/d/1rwOWWUwOsb2glQ6qREll3r-twpl6zglV/view?usp=drivesdk' , recommended: true },
        { title: 'Unit-3 Best Notes - Priyal Kumar', url: 'https://drive.google.com/file/d/1VjBU1zMn2BD47RPdRPH09ZvPfaOKOALG/view?usp=drivesdk' , recommended: true },
        { title: 'Unit-4 Best Notes - Priyal Kumar', url: 'https://drive.google.com/file/d/1zgPUZMBFjTA5ndJqAImIZPMBool5sug0/view?usp=drivesdk' , recommended: true },
        { title: 'OOS LAB File -Priyal Kumar', url: 'https://drive.google.com/file/d/1kPFwtHiRu6trNYwHlmgaZgY3HPn9ScTL/view?usp=drivesdk' , recommended: true },
        { title: 'Imp. Diagrams & Last Min. Revision', url: 'https://drive.google.com/file/d/11yWd_yBYrcyGtYWseuzpFBP9sJfBkiI-/view?usp=drivesdk' , recommended: true },
        { title: 'OOS All Assignment Ques. ( for Practice)', url: 'https://drive.google.com/file/d/1R4FSXABX1jfaAAKd2abvgmMl59GLfm1M/view?usp=drivesdk' , recommended: true },
        { title: 'OOS -Quantum Book PDF', url: 'https://drive.google.com/file/d/1x2oKtVibZ-Ww77lw-DZwONHrn3wBvR4Y/view?usp=drivesdk'  },
        { title: 'OOS - Book PDF', url: 'https://drive.google.com/file/d/18jDR9nJfJdz5I5vTYRxiI92-gRizkRdV/view?usp=drivesdk'  },
      ]
    },
    {
      id: 'cg',
      name: 'Computer Graphics',
      icon: '🎨',
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
          { title: 'Hidden & Visible Surfaces -Intro', url: 'https://youtu.be/kPd95B2KOyc?si=BlBl7iDOgxv6WuBs' , recommended: true  },
          { title: 'Hidden & Visible Surfaces -State Space Method', url: 'https://youtu.be/dqsVQ31ZfuE?si=IzlNa0KAQrOe4KWL' , recommended: true  },
          { title: 'Coherence Properties -Lecture', url: 'https://youtu.be/BOiEtlLwUuw?si=ES0-2bAXrJJhUPhY' , recommended: true  },
          { title: 'Back Face Removal -Lecture', url: 'https://youtu.be/_p16NATygqU?si=hqihEdZLK5A_m0Lx' , recommended: true  },
          { title: 'Back Face Detection Methods-Lecture', url: 'https://youtu.be/tOOiJ91wWJY?si=IVgINXZDM1SmHpjC' , recommended: true  },
          { title: 'Z-Buffer algorithm -Lecture', url: 'https://youtu.be/JZutixUiCEE?si=JH_RSKumVp77DmiZ' , recommended: true  },
          { title: 'Curve & Its Types -Lecture', url: 'https://youtu.be/1iuINGsS_vo?si=ThiB_4HKgJ-rCSxs' , recommended: true  },
          { title: 'Bezier Curve & Its Properties -Lecture', url: 'https://youtu.be/grYrC6_LDcY?si=uRKG1lBnTwvD3sM4' , recommended: true  },
          { title: 'Bezier Curve -Numerical', url: 'https://youtu.be/wZbazXBkGv4?si=mlvtD15PVaHRixUa' , recommended: true  },
          { title: 'Hermite Curve -Lecture', url: 'https://youtu.be/8vo21tbtDgU?si=OXcsTld9I2bXxLpu' , recommended: true  },
          { title: 'Bezier Curve & Hermite Spline -Numericals', url: 'https://youtu.be/4vjBXh3xYB4?si=k4oTSB3YAVwblJtu' , recommended: true  },
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
    },
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
      notes: [
        { title: 'OOS All Assignment Ques. ( for Practice)', url: 'https://drive.google.com/file/d/1R4FSXABX1jfaAAKd2abvgmMl59GLfm1M/view?usp=drivesdk' },
        { title: 'AI - 5th Assignment', url: 'https://drive.google.com/file/d/1cg9pIUUqqXni3WpSMX92jkYrqF6uXdj_/view?usp=drivesdk'  },
      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CSE-6th Semester');
  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({ id: cn.id, title: cn.title, url: cn.file_url, isCommunity: true, fileName: cn.file_name, uploadedBy: cn.uploaded_by, userName: cn.user_name })),
    ],
  }));

  const handleDeleteCommunityNote = async (id: string, fileName?: string) => {
    if (!user || !isOwner) return;
    if (!window.confirm('Delete this material?')) return;
    try {
      if (fileName) await supabase.storage.from('study-materials').remove([fileName]);
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
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <button onClick={() => setSelectedSubject(null)} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-6">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Subjects
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{subject.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold">{subject.name}</h1>
            </div>
            <p className="opacity-60 text-sm">{subject.notes.length} file{subject.notes.length !== 1 ? 's' : ''} available · 6th Semester B.Tech</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1">
          {subject.notes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No notes yet</p>
              <p className="text-sm">Notes for this subject will be added soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.notes.map((note, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                  <div className="group relative border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-lg h-full flex flex-col justify-between">
                    <div>
                      {(note as any).recommended && (
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-2">★ Recommended</span>
                      )}
                      {(note as any).isCommunity && (
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-2 ml-2">Community</span>
                      )}
                      <p className="text-sm font-medium text-foreground leading-snug mt-1 mb-3">{note.title}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <button onClick={() => handleDownload(note.url, note.title)} className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity" disabled={(note as any).url === '#'}>
                        <Download className="h-3.5 w-3.5" /> {(note as any).url === '#' ? 'Coming Soon' : 'Download'}
                      </button>
                      <a href={note.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-border hover:bg-muted transition-colors ${note.url === '#' ? 'pointer-events-none opacity-50' : ''}`} title="Open in new tab">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {(note as any).isCommunity && isOwner && (
                        <button onClick={() => handleDeleteCommunityNote((note as any).id, (note as any).fileName)} className="inline-flex items-center justify-center py-2 px-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-xs">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/btech-notes/third-year/semester-6')} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Harcourt Butler Technical University, Kanpur</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
            6th Semester<br />
            <span className="opacity-60">Computer Science & Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. CSE / IT — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">CSE Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">6th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Syllabus Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="border border-border rounded-xl p-5 bg-card flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{syllabus.title}</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 6th semester CSE</p>
            </div>
          </div>
          <button onClick={() => handleDownload(syllabus.url, syllabus.title)} className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase py-2.5 px-5 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity">
            <Download className="h-3.5 w-3.5" /> Download Syllabus
          </button>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">Study Resources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.4 }}>
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                          {subject.notes.length} files
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-700 p-1" onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name, subject.id); }} title="Share on WhatsApp">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">{subject.name}</h3>

                    {/* Playlist section */}
                    {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <button className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors" onClick={() => toggleSubjectExpansion(subject.id)}>
                          <span className="flex items-center gap-1.5">
                            <Play className="h-3 w-3" /> Study Playlists
                          </span>
                          {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                        {expandedSubjects.includes(subject.id) && (
                          <div className="mt-2 space-y-1">
                            {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                              <button className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" onClick={() => handlePlaylistClick(subject.id, 'detailed')}>
                                📚 Detailed ({getSubjectPlaylists(subject.id).detailed.length})
                              </button>
                            )}
                            {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                              <button className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" onClick={() => handlePlaylistClick(subject.id, 'oneshot')}>
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
                  </div>

                  <div className="mt-4">
                    <button onClick={() => setSelectedSubject(subject.id)} className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200">
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

export default SixthSemesterCSENotes;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const FourthSemesterNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 4th Semester CSE/IT on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  
  const subjectPlaylists = {
    ppl: {
      detailed: [
        { title: 'Principal of Programming Language 1', url: 'https://youtube.com/playlist?list=PL-JvKqQx2AtdIkEFDrqsHyKWzb5PWniI1&si=UAZUusqLpaAJZDPk' },
        { title: 'Principal of Programming Language 2', url: 'https://youtube.com/playlist?list=PLbWkMgLvWbDF3bErg6Ejo8d1QtTSqtWwN&si=1Z2lbiTm8JClSOEa' },
        { title: 'Principal of Programming Language 3', url: 'https://youtube.com/playlist?list=PLwheXbz_XBtltsxCn00Hkdc2Dqa9t6wNd&si=WQ5lH-A5EQB1sW_Z' },
        { title: 'Principal of Programming Language 4', url: 'https://youtube.com/playlist?list=PLTo1TmBz2ekof8VsYaoTxP-9VgJ9P-dTO&si=55vMVnCXKNwTVDnp' }
      ],
      oneshot: []
    },
    se: {
      detailed: [
        { title: 'Software Engineering Complete (Best)', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2&si=V_wg1F_QDMAzhqbJ', recommended: true },
        { title: 'Software Engineering Advanced', url: 'https://youtube.com/playlist?list=PLvu-LC7buiaXLZ6P6ePiAhAI1uTWfyVXZ&si=68I7AzesTJAQhrGc' },
        { title: 'Software Engineering Comprehensive', url: 'https://youtube.com/playlist?list=PLqcuf9-ILPYA-OGMephZ0U9c8JvdefE0X&si=o6yJSSIx9o4kvaKL' }
      ],
      oneshot: [
        { title: 'Software Engineering One Shot', url: 'https://youtu.be/NlLM3sVF8wY?si=z9MHr4P7KoiPxX5-' }
      ]
    },
    wt: {
      detailed: [
        { title: 'Web Technology Complete', url: 'https://youtube.com/playlist?list=PLrjkTql3jnm8d1ddpVKifXO_fPjSKATCp&si=mK0fsnBGAZaW8hYN' },
        { title: 'Web Technology Advanced', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8u2dOqXa-f9KSoSx9XICZ1E&si=lv0RPacby30ubHRf' }
      ],
      oneshot: [
        { title: 'Web Technology One Shot', url: 'https://youtube.com/playlist?list=PLR5USSocuZ5eMnOLgS57Uuemx6bGV2lan&si=dazqDSAIkgHk0XPm' }
      ]
    },
    os: {
      detailed: [
        { title: 'Operating System Complete (Best)', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p&si=Q37KNf4AAP4Qk8oq', recommended: true },
        { title: 'Operating System Advanced', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O&si=qbZZeUys9gnBM8_7' },
        { title: 'Operating System Comprehensive', url: 'https://youtube.com/playlist?list=PLG9aCp4uE-s17rFjWM8KchGlffXgOzzVP&si=23zhPsNlTjwU4OGV' }
      ],
      oneshot: [
        { title: 'Operating System One Shot (Best)', url: 'https://youtu.be/xw_OuOhjauw?si=MzjKrv7cY2vswkg5', recommended: true },
        { title: 'Operating System One Shot 2', url: 'https://youtu.be/009FHqBo87Q?si=1SzNKk9iZR8TAZms' }
      ]
    },
    em: {
      detailed: [
        { title: 'Economics and Management Complete (Best)', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy', recommended: true },
        { title: 'Economics and Management Advanced', url: 'https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae' }
      ],
      oneshot: []
    },
    math3: {
      detailed: [
        { title: 'Fourier Integral Playlist by-Fearless (Best)', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyITz_e6F9YiyongjaCryasK&si=xhAnYIkAQTe5jAw-', recommended: true },
        { title: 'Complex Variable (Complete Playlist) by-Fearless (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljVCPXMA2wwA9oIV3blxLLQ6&si=zRcZEv8D7dK-CP2M', recommended: true },
        { title: 'Unit 3 Complex Intigration Playlist By-Fearless (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWlvUJ-YmjMsjkAANOagCk7&si=o7JtHhGSY40pDjWY', recommended: true },
        { title: 'Unit 4 Curve Fitting, Correlation & Regrassion by-Gajendra Prohit (Best)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfL1Mrdj7bs2A6bQOU7FMqKX&si=wFlWnVRj-HEH7qAw', recommended: true },
        { title: 'Unit 5 Probability & Distribution Playlist by- MKS (Best)', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLB62_-fT9VNbjRkDEzJzzp&si=FE8RI4spBCakwAgh', recommended: true },
        { title: 'FITTING OF CURVE IN STATISTICS - BY TIKLE\'S ACADEMY', url: 'https://youtube.com/playlist?list=PLNKD1qB9pptvgPP_zrKXa64SPYtKQpy-C&si=mOUPo8QHIhN5w9md' },
        { title: 'Curve Fitting, Correlation by-Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljVF5-HxU829qWUMRFwDAu3v&si=YqbaDiSVfO_BQrlN' },
        { title: 'Complex Integer Playlist By-Pradeep Giri', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9ibhrkzWki0_tfrugS4rvnJ&si=fOLiA6fhcpYafFnO' },
        { title: 'Laplace Transform & Fourier Series By-Pradeep Giri (Best)', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jr5vb-zUd4GUFaexGDiRc9&si=uMG3aPDDGVRo_QOQ', recommended: true },
        { title: 'Hypothesis Testing Playlist By-Fearless (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWze2qPIgZv-CtBJYHEIvqa&si=yrKbGQpWpqNZeDwi', recommended: true },
        { title: 'Inverse Laplace Transform Playlist By-Pradeep Giri', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9iHqXEfSTmpmOpEkUmj-Qay&si=xiSCdE-W81UTMxg6' },
        { title: 'Fourier Transform By-Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfK_FysPwDqaoUKhTqms_aEg&si=4iqfG5zjBHpBMQU_' }
     ],
      oneshot: [
        { title: 'Engineering Mathematics-III One Shot', url: 'https://youtu.be/_Hjp6aFJO40?si=L8tp3IgTfCBFhxEz' }
      ]
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
      id: 'em',
      name: 'Economics & Management',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'Business Economics Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' },
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' },
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' },
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' }
      ]
    },
    {
      id: 'math3',
      name: 'Engineering Mathematics-III',
      icon: '📐',
      color: 'bg-purple-500',
      notes: [
        { title: 'BS Gerewal Math Book', url: 'https://drive.google.com/file/d/1WO6VBRte2_4ZdXbwuwLoA4PfjgSFdabL/view?usp=drive_link' },
        { title: 'HK Das Math Book', url: 'https://drive.google.com/file/d/1WO_2jHYoYX_T9PoZHVVvts4WssiWRqPK/view?usp=drive_link' },
        { title: 'Complete Unit-1,2 & 3 Notes', url: 'https://drive.google.com/file/d/1CE9GVSQI9YCq6iEZ25ASudXDyLHEL5tJ/view?usp=drive_link' },
        { title: 'Unit 4 (Moment) Notes', url: 'https://drive.google.com/file/d/1R0KO9NqX0WFnSbuFqZMTxyol1KmIrC5T/view?usp=drive_link' },
        { title: 'Unit 5 Notes', url: 'https://drive.google.com/file/d/1R0nue1eUT7kZXKeQnXJiZ6mZuijVoQ07/view?usp=drive_link' },
        { title: 'Unit 4 Curve Fitting Notes', url: 'https://drive.google.com/file/d/1CEcIG1FTaeZdqRn53Fy-O8at9SGbmXX2/view?usp=drive_link' },
        { title: 'Z-Transform Notes', url: 'https://drive.google.com/file/d/1_QbIn7C9i3M8E6HD_J3hNwgMORjrMEaj/view?usp=drive_link' },
        { title: 'EM-III Residue Notes', url: 'https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link' },
        { title: 'Harmonic Function Prove Notes', url: 'https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link' }
      ]
    },
    {
      id: 'os',
      name: 'Operating System',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [
        { title: 'OS Unit-2,3,4 & 5 Notes + Imp. Diagrams', url: 'https://drive.google.com/file/d/1eAmO8ZWoSUJpoD2DratHpmdtX79XYFil/view?usp=drive_link' },
        { title: 'OS Signal Handling Notes', url: 'https://drive.google.com/file/d/1dP129HBR-TeLyeeVaM6IdtjHFlx8uJzo/view?usp=drive_link' },
        { title: 'OS Signal Notes (Part-1)', url: 'https://drive.google.com/file/d/1dWOYpI3__S2wgcXOxwdiLRWNs-NE6TMU/view?usp=drive_link' },
        { title: 'OS Signal Notes (Part-2)', url: 'https://drive.google.com/file/d/1dXKXaUcIar-x_zSu1WgIvXXRI9RlTDRD/view?usp=drive_link' },
        { title: 'OS Thread Notes', url: 'https://drive.google.com/file/d/1dVcpDFeOc3MOn7qtuX38fiJM0xB7lDJz/view?usp=drive_link' },
        { title: 'OS Unit-1,2 & 3 Handwritten Notes', url: 'https://drive.google.com/file/d/1eDNTvHrbaoVGjK1o2hpUpOtZblRUG09L/view?usp=drive_link' },
        { title: 'OS Wiley Book (Very Imp.)', url: 'https://drive.google.com/file/d/1dbo8X8UuubqEyE7fNwGGfV8isF9n57zg/view?usp=drive_link' },
        { title: 'OS Wiley Book (Practice Ques.)', url: 'https://drive.google.com/file/d/1dlHVXg5DniDFYabpuetm0AVZx2LV54PM/view?usp=drive_link' },
        { title: 'OS William Stalling Book', url: 'https://drive.google.com/file/d/1WcCEPMIbYxYzJRSRF_Gc3jhspUNUV5Vl/view?usp=drive_link' },
        { title: 'William Stalling Book (Question\'s Ans.)', url: 'https://drive.google.com/file/d/1daJ9evLWTzhENcIe60k35iM4l-CJJ_PZ/view?usp=drive_link' }
      ]
    },
    {
      id: 'se',
      name: 'Software Engineering',
      icon: '⚙️',
      color: 'bg-orange-500',
      notes: [
        { title: 'Sample Front Page for SE Lab File', url: 'https://drive.google.com/file/d/1f4w_qy8Xw3_wPRY01kz2vj7gzlGfFBvk/view?usp=drive_link' },
        { title: 'Railway Reservation System SRS Document (SE Lab)', url: 'https://drive.google.com/file/d/1f3B8LyiCYj9tw3GwDwlhm59_YfBfZvsc/view?usp=drive_link' },
        { title: 'Software Design Notes + Imp. Diagrams', url: 'https://drive.google.com/file/d/1f-jTrT_1YOFYl9Yfk-8NiLlqIA1E6evA/view?usp=drive_link' },
        { title: 'SE Notes for ESE', url: 'https://drive.google.com/file/d/1cdWjUs4QQcFIsezWgbUvkhbwhHbZY4_y/view?usp=drive_link' },
        { title: 'COCOMO Model Notes', url: 'https://drive.google.com/file/d/1eoRxxiE651xOVu7fdhUIbQ7Gjn7Rtd7Z/view?usp=drive_link' },
        { title: 'SE Unit-1 Notes', url: 'https://drive.google.com/file/d/1cMLUTDTZ9ewZ4imUCAbhW4fp-smNhuQ-/view?usp=drive_link' },
        { title: 'Complete Unit 1 to 5 Notes', url: 'https://drive.google.com/file/d/1cc4ZbPh7dRnPIkRI3ztv5awCGak5yQtv/view?usp=drive_link' },
        { title: 'SE Unit-2 Quantum Notes', url: 'https://drive.google.com/file/d/1cLsEXQnu9TDKGBnO_t8Zwj0WuM_Sxel8/view?usp=drive_link' },
        { title: 'Unit-3 Quantum Notes', url: 'https://drive.google.com/file/d/1cLUwBU7Ptmgmrk4MWVLbVE2i5pJz7ave/view?usp=drive_link' },
        { title: 'Unit-4 Quantum Notes', url: 'https://drive.google.com/file/d/1cN1jyX8BnMrmAh-TH3ic5EWA8covDQpc/view?usp=drive_link' },
        { title: 'Unit-5 Quantum Notes', url: 'https://drive.google.com/file/d/1cOnVxh_6oshKly7E1P2DLe4kCnwsjT6p/view?usp=drive_link' },
        { title: 'SE Unit-1 to 4 Handwritten Notes', url: 'https://drive.google.com/file/d/1cJA-CYdIg3CR42yYeyYAvqLM94egetb1/view?usp=drive_link' },
        { title: 'Unit-2.1 SRS Requirement PDF Notes', url: 'https://drive.google.com/file/d/1eMI451NUOyvAbJ0WKowu0JD25fl7rqPa/view?usp=drive_link' },
        { title: 'Unit-2.2 Estimation Notes', url: 'https://drive.google.com/file/d/1efnISXG6ZEmjJhg5sCIEBehapPQ6KUq5/view?usp=drive_link' },
        { title: 'Unit-3 Software Design PDF Notes', url: 'https://drive.google.com/file/d/1eSi6xDL3HRcyKpQZ7iL_bfThtv7uoLVD/view?usp=drive_link' },
        { title: 'Unit-4 Software Testing Notes', url: 'https://drive.google.com/file/d/1eIfEhGq_A7Z7GeUZaE4_hcZTUSqunOuc/view?usp=drive_link' },
        { title: 'Unit-5 Software Maintenance Notes', url: 'https://drive.google.com/file/d/1eDhut9YkysRfZjqjgmqyLzShg8LmxcUb/view?usp=drive_link' },
        { title: 'Laws of Software Maintenance Notes', url: 'https://drive.google.com/file/d/1euUA6RHIAMUW_Z2yEuVzoVB6B6GyhHv3/view?usp=drive_link' }
      ]
    },
    {
      id: 'ppl',
      name: 'Principles of Programming Language',
      icon: '💻',
      color: 'bg-indigo-500',
      notes: [
        { title: 'PPL Book PDF', url: 'https://drive.google.com/file/d/1ddHsyjqoYPErKWD2vjELX0wC0L3Y9sba/view?usp=drive_link' },
        { title: 'PPL Unit-5 Notes', url: 'https://drive.google.com/file/d/1cmcJTPaiVHDb10m8kmAxdqUGfFuTSSkq/view?usp=drive_link' },
        { title: 'PPL Storage Management Notes', url: 'https://drive.google.com/file/d/1d9Vq_fXAFqEDSBn_1--rTLOL-v011_Ni/view?usp=drive_link' },
        { title: 'PPL Unit-1 to 4 Handwritten Notes', url: 'https://drive.google.com/file/d/1cdvnZ1DFnc5jHvJKvsngM1ys9xwKqvSi/view?usp=drive_link' },
        { title: 'PPL Unit-4 & 5 GPT Notes', url: 'https://drive.google.com/file/d/1cg7TZ1CaIudGt4zT7e9wpPcc7h3ILyMU/view?usp=drive_link' },
        { title: 'Unit-5 Notes PDF', url: 'https://drive.google.com/file/d/1crfywzKWvg5vY6hGLawZ6XkZfJZLHDHy/view?usp=drive_link' },
        { title: 'PPL Sub-program Notes', url: 'https://drive.google.com/file/d/1C5KMC-EHWNvc4LHOrGQoRYoB8DiH5vWw/view?usp=drive_link' },
        { title: 'Exception Handling Notes', url: 'https://drive.google.com/file/d/1d5gfmpTLefmvlb1ZOx9ftwVO7VLL89cr/view?usp=drive_link' },
        { title: 'Unit-1 (Part 1) Notes', url: 'https://drive.google.com/file/d/1dXwzaV3nuTNkHiXvTMs7WqAxuYxY-591/view?usp=drive_link' },
        { title: 'Unit-1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1dY_dh8D_Nrx62JsGb_UmQ6t8XOc7szQc/view?usp=drive_link' },
        { title: 'Unit-1 (Part 3) Notes', url: 'https://drive.google.com/file/d/1dbfV9QCs0eocXoWlRsMHaJRGjCNsERxz/view?usp=drive_link' },
        { title: 'Unit 2 (Part 1) Notes', url: 'https://drive.google.com/file/d/1dcLD7ZvrgQWqmspqtBsiMdQ2kcjPBuNH/view?usp=drive_link' },
        { title: 'Unit 2 (Part 2) Notes', url: 'https://drive.google.com/file/d/1Bof5brMwKyqX7pLh2H-7JREw8mCHb-I1/view?usp=drive_link' },
        { title: 'Unit 2 (Part 3) Notes', url: 'https://drive.google.com/file/d/1BxiydjcOonC6LN6IVSaBkWo4G8sAlUR1/view?usp=drive_link' },
        { title: 'Unit-2 (Part 4) & Unit-3 (Part 1) Notes', url: 'https://drive.google.com/file/d/1BzzpT_s5n3YhXFSPCAi-P7ykE5TQhG9V/view?usp=drive_link' },
        { title: 'Unit-3 (Part 2) Notes', url: 'https://drive.google.com/file/d/1C4yFY25rkAdLYoZ65TpEo1ogtMu969hs/view?usp=drive_link' },
        { title: 'Unit-4 Stage of Translation Notes', url: 'https://drive.google.com/file/d/1dHkajpGfI75LcTsnAl2SN6KgWZKtlmBY/view?usp=drive_link' }
      ]
    },
    {
      id: 'wt',
      name: 'Web Technology',
      icon: '🌐',
      color: 'bg-teal-500',
      notes: [
        { title: 'Complete Unit-1 to 5 Quantum Notes', url: 'https://drive.google.com/file/d/1dPJxkCx-uuN2tvHMFrp3gURZjF-mlLTH/view?usp=drive_link' },
        { title: 'WT Handwritten Notes', url: 'https://drive.google.com/file/d/1WjOaDpW8qhOpBIZRS8s7eY5RoaviloO3/view?usp=drive_link' },
        { title: 'WT Imp. Question Bank', url: 'https://drive.google.com/file/d/1Wdup17mKYlv5J4t5NLaCQrTiYH_SU7-S/view?usp=drive_link' },
        { title: 'WT Unit-3,4 & 5 GPT Notes', url: 'https://drive.google.com/file/d/1W_pBYiKIBI4C6TowcYnWdtx6wuaPpWsI/view?usp=drive_link' },
        { title: 'Unit-1 OneShot Notes', url: 'https://drive.google.com/file/d/1WmdI24FpQYcpfXHuv2wkozCkQP8GTp-p/view?usp=drive_link' },
        { title: 'Unit-2 OneShot Notes', url: 'https://drive.google.com/file/d/1Wp-Z1W5_XhK9AV4V26wvugWNqTFN3nZO/view?usp=drive_link' },
        { title: 'Unit-3 OneShot Notes', url: 'https://drive.google.com/file/d/1Wwi2cc_4Ro6XYGEwFabqJlANB-I-l3Su/view?usp=drive_link' },
        { title: 'Unit-4 OneShot Notes', url: 'https://drive.google.com/file/d/1WzZc5csum5vJdXJY1eFfxVk3nmhZyF06/view?usp=drive_link' },
        { title: 'Unit-5 OneShot Notes', url: 'https://drive.google.com/file/d/1X6xWaulVOBcpySBmd3fvDf8uUWKMB2JF/view?usp=drive_link' },
        { title: 'WT Full YouTube SS Notes', url: 'https://drive.google.com/file/d/1WfwsbrbRDXSfyb6nPaPqoxw_h01wHFGf/view?usp=drive_link' }
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [
        { title: 'E&M Assignment-2', url: 'https://drive.google.com/file/d/1fDegieCMpAuj47Y3TzIVidqm2cQqM5yV/view?usp=drive_link' },
        { title: 'EM-III Assignment Ques. (For Practice)', url: 'https://drive.google.com/file/d/1_UnztNjMw8E_in3W-Fy75go8igGuV_Iq/view?usp=drive_link' },
        { title: 'EM-III Assignment Ques. (For Practice)', url: 'https://drive.google.com/file/d/1_XXityVgli5CQoOpWTKiHRgBVMzQM5wm/view?usp=drive_link' },
        { title: 'OS Assignment-1', url: 'https://drive.google.com/file/d/1b4mUC6HdmaGEmnOi-t0iCmw96laEnMuo/view?usp=drive_link' },
        { title: 'OS Assignment-2', url: 'https://drive.google.com/file/d/1b4yH8R2Dmv9k_1NL8-XuYTUjKo3sXORe/view?usp=drive_link' },
        { title: 'OS Assignment-3', url: 'https://drive.google.com/file/d/19qSrVD2RIYKaKrbRq12U8ODBvYYn8Yun/view?usp=drive_link' },
        { title: 'OS Assignment-4', url: 'https://drive.google.com/file/d/19qDDjL8LNFZ5z01POO6y8_SCBrwZBObQ/view?usp=drive_link' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'MID SEM-1 PYQs(2023-24)', url: 'https://drive.google.com/file/d/14F6R3Hj0wikQOGmVXW9HVUwEvgpf739X/view?usp=drivesdk' },
        { title: 'MID SEM-2 PYQs(2023-24)', url: 'https://drive.google.com/file/d/1wJJpB62nd1K7hZZW6SKCtOweKADD_cha/view?usp=drivesdk' },
        { title: 'END SEM PYQs(2023-24)', url: 'https://drive.google.com/file/d/18Ipuy7EjuIn9hqTdBg1Mrr2TButtQuxV/view?usp=drivesdk' },
        { title: 'MID SEM-1 PYQs(2024-25)', url: 'https://drive.google.com/file/d/1L2I-8b37kC8FqAwzuOhirBnV4q5c2kBR/view?usp=drivesdk' },
        { title: 'MID SEM-2 PYQs(2024-25)', url: 'https://drive.google.com/file/d/1O7h6JmXUjNBQXgm3DZGGNfHgk84T4SOT/view?usp=drivesdk' },
        { title: 'END SEM PYQs(2024-25)', url: 'https://drive.google.com/file/d/1UkJvfwupN5gEVkSb27m2mp4BxukHhglv/view?usp=drivesdk' },
        { title: 'PPL PYQs with Solution', url: 'https://drive.google.com/file/d/1zmI94Kwpn-hVY5hTSeK5e_pwZc_RCP6A/view?usp=drive_link' },
        { title: 'MID SEM-1 PYQs(2025-26)', url: 'https://drive.google.com/file/d/1JEXebFcpFKNcrvx8DG4gtnibEYYTLp07/view?usp=drivesdk' },
        { title: 'All Mid Sem-1 PYQs(2024-25)', url: 'https://drive.google.com/file/d/1zhJ4vgSUR3N0pefSDKHQwCIsEFxwM8sE/view?usp=drive_link' },
        { title: 'Math\'s PYQs (2024-25)', url: 'https://drive.google.com/file/d/1R1MAUoeyvU813aNWlkzVhoioK2Z7NBRH/view?usp=drive_link' },
        { title: 'WT ESE PYQs with Solutions', url: 'https://drive.google.com/file/d/1WcMLbY9sTbBqyLrqe_lPAt3E4BSVo-gw/view?usp=drive_link' },
     
      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CSE-4th Semester');
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
    url: 'https://drive.google.com/file/d/1Pj0S0G7EnEaFwQfBPndyIE_v37Z_P4pi/view?usp=drive_link'
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
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white text-lg`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" >PDF</Badge>
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
            onClick={() => navigate('/btech-notes/second-year/semester-4')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to 4th Semester
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            4th Sem B.Tech CSE Notes 📖
          </h1>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
    📚 Important Branch Information
  </h3>

  <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
    <p><strong>✨ Only for CSE/IT students:</strong> These notes are specifically designed for Computer Science and Information Technology students.</p>

    <p>• <strong>Engg. Math's:</strong> For Maths, follow the Fearless and MKS playlists. MKS playlist and notes are very helpful, and many PYQs match from them.</p>

    <p>• <strong>Web Technology (WT):</strong> This is a 5-credit subject, so give it proper importance. It can significantly improve your CGPA or lower it if ignored.</p>

    <p>• <strong>E&amp;M:</strong> This subject is easy to crack. Write detailed answers in the exam with clean handwriting and proper presentation to score well. It is only a 2-credit subject, so its impact is limited.</p>

    <p>• <strong>OS, SE, WT:</strong> These subjects may feel boring, but the GateHub playlists are available and usually sufficient along with the notes.</p>

    <p>• <strong>Quantum Book:</strong> The Quantum book is very effective for these subjects because it already contains many important questions and answers. Practice PYQs as well.</p>

    <p>• <strong>Assignments:</strong> Follow your professors' instructions and review assignments before the exam, as questions are often asked from them.</p>
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
          <Card className="gradient-card border-2 border-primary/20 shadow-lg">
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
              <Card 
                className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto shadow-lg`}>
                    {subject.icon}
                  </div>
                  <CardTitle className="text-lg text-center">{subject.name}</CardTitle>
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



        {showPlaylistModal && (
          <PlaylistModal
          isOpen={showPlaylistModal}
          onClose={() => setShowPlaylistModal(false)}
          title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
          playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] : []}
          type={selectedPlaylistType}
        />
        )}
        </div>
      </div>
    );
  }

export default FourthSemesterNotes;

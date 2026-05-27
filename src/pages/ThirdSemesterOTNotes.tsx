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

const ThirdSemesterOTNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 3rd Semester Oil Tech on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    em: {
      detailed: [
        { title: 'Economics and Management Complete (Best)', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy', recommended: true },
        { title: 'Economics and Management Advanced', url: 'https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae' }
      ],
      oneshot: []
    },
    cpc: {
      detailed: [],
      oneshot: [ ]
    },
    fmmo: {
      detailed: [],
      oneshot: []
    },
    coap: {
      detailed: [],
      oneshot: []
    },
    oal: {
      detailed: [],
      oneshot: []
    },
    math2: {
      detailed: [
        { title: 'Unit 1 Differential Equation- Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy' },
        { title: ' Unit 3 Laplace Transform - Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB' },
        { title: 'Fourier Series -Pradeep Giri Playlist', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7' },
        { title: 'Fourier Series - MKS Playlist', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8' },
        { title: 'Partial Diff. Eq.- MKS Playlist', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyJoNnAqghUK-Lit3qBgfa6o&si=RfESwXzHT7mFK_DG' },
        { title: 'Partial Diff. Eq.- Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k', recommended: true },
        { title: 'Appliaction of Fourier Transforms to BVP', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyJCwFXRDW8KmDlBFGRAxnAu&si=Vi9_HhLL2K5r15gn' },
        { title: 'Complete Engg Math-II -By: Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx', recommended: true }
      ],
      oneshot: []
    },
    sccofw: {
      detailed: [],
      oneshot: [ ]
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
      id: 'cpc',
      name: 'Chemical Process calculations',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: [
        { title: 'CPC BOOK By-D.C. SIKDAR', url: 'https://drive.google.com/file/d/13MfTeTun6v9N6V23N900a4DCQslGVhLx/view?usp=drivesdk' },
        { title: 'CPC BOOK PDF By- Richard', url: 'https://drive.google.com/file/d/1YVThx8aLj0LLrwrif1wxTMJ1exoHRfcU/view?usp=drivesdk' },
        { title: 'CPC Imp. Notes', url: 'https://drive.google.com/file/d/1E4Im3I0DagUzRPz7-t2dzqdt3D6iozTA/view?usp=drivesdk' },
        { title: 'CPC Notes', url: 'https://drive.google.com/file/d/1IlIEc5WezQ2HJqSzgyAS40bhfPuFB6JJ/view?usp=drivesdk' },
        { title: 'CPC Class Ques.', url: 'https://drive.google.com/file/d/1D7sM9TggsJCuYrqHe9SSstIkIDBtRm9T/view?usp=drivesdk' },
        { title: 'CPC Unit-1 Notes', url: 'https://drive.google.com/file/d/1xjEHt0QYO1inJEuOvaoFzvN8pQov5i2c/view?usp=drivesdk' },
        { title: 'CPC Numerical Notes Plastic', url: 'https://drive.google.com/file/d/1zndHWn8Di_onzrLYqsXg6qQ8w_Mty5vc/view?usp=drivesdk' },
        { title: 'CPC -Unit & Dimensions Notes', url: 'https://drive.google.com/file/d/1WaDMh8m02FyeO8nJGo36AlJhK914FfBh/view?usp=drivesdk' },
        { title: 'CPC All Unit Practice Problem', url: 'https://drive.google.com/file/d/1SvFXHNktnf7e7hIAkRrc9fvxEZNhqEN7/view?usp=drivesdk' },
        { title: 'CPC Theory Part PDF', url: 'https://drive.google.com/file/d/1RaOznhdQL9TSuup6Vw193FupiBclMkIB/view?usp=drivesdk' },
        { title: 'CPC Unit-1,2 PYQs', url: 'https://drive.google.com/file/d/1TI77F8ycCA1gRXDMq6xaxo0uAhMB-KFc/view?usp=drivesdk' },
        { title: 'CPC Unit-2 Notes', url: 'https://drive.google.com/file/d/1Bp_prijNXbbdXcN6Eqs-BhPWbtaWFOEU/view?usp=drivesdk' },
        { title: 'CPC Unit-2,3,4 PYQs', url: 'https://drive.google.com/file/d/1xQ1qfqTyaesMtrhPvNHaGbcozj2Kf7Xn/view?usp=drivesdk' },
        { title: 'CPC Unit-3 & 4 Notes ', url: 'https://drive.google.com/file/d/1NixNyYKaq0gyU3GmZlBh6WmsiBnyQmUI/view?usp=drivesdk' },
        { title: 'BEST CPC Notes -Unit Operations & Process', url: 'https://drive.google.com/file/d/1m2VrF8AnRiHrfdGY7eiX6fR8kqbR5kfF/view?usp=drivesdk', recommended : true },
        { title: 'Idial Gas Law Notes', url: 'https://drive.google.com/file/d/1CzzJqujElxsMlmvED5wM6g-IZ0Wm4FGv/view?usp=drivesdk' },
        { title: 'CPC Full Handwritten Notes', url: 'https://drive.google.com/file/d/1mqfkuHUGZ9scJ5Erv8qFEXMfm5bXptZy/view?usp=drivesdk', recommended : true },
        { title: 'Numerical PDF', url: 'https://drive.google.com/file/d/13FFVHJVzOUg6H9r-gEvMyz8mHaxSH2S4/view?usp=drivesdk' },
      ]
    },
     {
      id: 'fmmo',
      name: 'Fluid Mechanics & Mechanical Operations',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [
        { title: 'FMMO BOOK By-R.K.Bansal', url: 'https://drive.google.com/file/d/1gUIEEQgB-gr2kzFVMUjjvaP3DBsH0fYA/view?usp=drivesdk' },
        { title: 'FMMO Unit Operations-I BOOK', url: 'https://drive.google.com/file/d/1vGhqjvUuZpufXPTAT2f_zqULgTwGI2_K/view?usp=drivesdk' },
        { title: 'Unit-1 PDF (Prof.)', url: 'https://drive.google.com/file/d/1sv5aeZzhBcru7YyyI22SiH0YMD2hh-Vz/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-1 Notes (BEST)', url: 'https://drive.google.com/file/d/1pBTj_SwMPldAp8SYxBtBEyGJ2IDUo85p/view?usp=drivesdk', recommended : true },
        { title: 'Unit-2 Notes (BEST)', url: 'https://drive.google.com/file/d/1ZRcG0KYOn1owZTAZgNwbf49bQZ4fX2dU/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-3 Notes (BEST)', url: 'https://drive.google.com/file/d/1U0pCF65tSsQFNAjvrGvtlxay6qbB1hMk/view?usp=drivesdk', recommended : true },
        { title: 'Unit-4 Notes (BEST)', url: 'https://drive.google.com/file/d/1IAKxwQTXgo08XTJ_dKHqqeu1hpoRm6aS/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-5 Notes (BEST)', url: 'https://drive.google.com/file/d/1AWr7NUjpJIdoMSPRCv1JFc55f6ZiF-hx/view?usp=drivesdk', recommended : true },
        { title: 'Complete FMMO Notes (NEW & BEST)', url: 'https://drive.google.com/file/d/1SJ3aWlJFH-zFs15mvyUz9r0MkM7XuLsL/view?usp=drivesdk' , recommended : true},
        { title: 'FMMO Full Notes PDF (OLD)', url: 'https://drive.google.com/file/d/1G9NYplt56PH5BGzJObGRybQbPrYB1AOs/view?usp=drivesdk' },
        { title: 'FMMO PYQS Solution PDF', url: 'https://drive.google.com/file/d/1W57HazGKgGCzYWW-zqAqa7PS5TDKZ8Fq/view?usp=drivesdk' },
        { title: 'FMMO Unit-5 Diagram PDF', url: 'https://drive.google.com/file/d/1bcqck-B9HE1QPbR6JSgz1RnOn2na7cQq/view?usp=drivesdk' , recommended : true },
        { title: 'Rotameter PDF', url: 'https://drive.google.com/file/d/1x9JM67WQ-7_ymlpnr7G4FFdxgoMMKIK-/view?usp=drivesdk'  },
        { title: 'Pump & Valves PDF', url: 'https://drive.google.com/file/d/1MzHpprRwR1j3EyToLPkL5HK-6pd6QLah/view?usp=drivesdk'  },
        { title: 'Size Reduction Equipments Notes', url: 'https://drive.google.com/file/d/1AIPD6fjZwYaFyCvHj8VQcVb0k62wkXEh/view?usp=drivesdk' , recommended : true },
        { title: 'FMMO Lab Exp. -Settling PDF', url: 'https://drive.google.com/file/d/1j9Qs-4MWG56ld5CreZGWTh6VRqKdizrH/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Screen Analysis PDF', url: 'https://drive.google.com/file/d/1BlYeGIH6WKgTAsCSS2nt_eS8Ce8hPWtq/view?usp=drivesdk' },
        { title: 'FMMO Lab Exp. -Rotameter PDF', url: 'https://drive.google.com/file/d/12cN4OntYDhyj7J5peP2Rb1AxjAFbn6QV/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Jaw Crusher PDF', url: 'https://drive.google.com/file/d/159Z5Hs2YQ2J6NE29ojo65iYhDNHKuGkm/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Reynolds PDF', url: 'https://drive.google.com/file/d/1W5EACqOzZfKF4ftkEMNJu7qAXPJOzLXn/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Bernoullis Theorem PDF', url: 'https://drive.google.com/file/d/1uUW8X5RnykpdJtanfKf7W0rrEgy93fgl/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Ball Mill PDF', url: 'https://drive.google.com/file/d/1o2qXKBm1iYYvLWB1lSUgIEfBicrY-7Pe/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Roll Crusher PDF', url: 'https://drive.google.com/file/d/1U_9VVlvaAQv4t2GvAcJTvGAx0Zvrc-KS/view?usp=drivesdk'  },
        { title: 'FMMO Lab Manual PDF', url: 'https://drive.google.com/file/d/1SeTY3_cjBAXwRPJF-zcXmzir2subMH7Y/view?usp=drivesdk' , recommended : true },
      ]
    },
    {
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'BEST Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk' },
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
    {
      id: 'em',
      name: 'Economics & Management',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'BEST Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk', recommended : true },
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
      id: 'sccofw',
      name: 'Source Composition Characterization of Oils,Fat & Waxes',
      icon: '🔌',
      color: 'bg-teal-500',
       notes: [ ]
    },
    {
      id: 'oal',
      name: 'Oil & Oilseed Analysis Lab',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [ ]
    },
    {
      id: 'coap',
      name: 'Chemistry of Oil & Applied Product',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [ ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [
        { title: 'FMMO Asssignment-1 PDF', url: 'https://drive.google.com/file/d/1AX9L3O9O3kn6s1TUAx20zHG-FUa-CuIF/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-2 PDF', url: 'https://drive.google.com/file/d/1TUNcZDO9MmMZ42U3LSCkbLcLHNeMniAd/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-3 PDF', url: 'https://drive.google.com/file/d/1nsAGVFz2d8Irrho4Rw8uFGUMmJgvIv6D/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-4 PDF', url: 'https://drive.google.com/file/d/1ZGXG9oFx3FRkAvsqygTmxBm6OA74PaWa/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-5 PDF', url: 'https://drive.google.com/file/d/1VZMjpCRvpJD0UOC-Iwvdquy_m0ahgEFG/view?usp=drivesdk' },
        { title: 'FMMO Assignment-1 to 5 Solutions PDF', url: 'https://drive.google.com/file/d/10OhOmXg5NbN_St5YSnqB8m-A_hSmNLEv/view?usp=drivesdk' },

      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem 1 & 2 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TOeiztCSFWqpnRpeQHYNnq-BcXtbmyzi/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) End Sem PYQs (2023-24)', url: 'https://drive.google.com/file/d/1v1htAchF9MpbRT9zlywqiFZWqNQL5zm-/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem 1 & 2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1eR4KaUm939MyT0RErzv98a1gxPravAVO/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1jPJ0ryFU0kKpLvUhCG8uDSEOspHe_8-W/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem 1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1lcZ-zCNw_Cj0nyuISjPTaCBAPXDOmWKT/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1CRDbW8rmMG6NbcG7iD6QqpYgqgFK2Vp_/view?usp=drivesdk' },
        { title: 'All CPC PYQs', url: 'https://drive.google.com/file/d/1F5fQM16Y9_OrGDvvDizqsjB_05ip1uq_/view?usp=drivesdk' },
        { title: 'All E&M PYQs', url: 'https://drive.google.com/file/d/1DuFhji3a_PYAdTIOhkZtYHWEIqL-hu-H/view?usp=drivesdk' },
        { title: 'All FMMO PYQs', url: 'https://drive.google.com/file/d/1BiRBS_qkvONqMqC5YDwJU4VyAyZqngP6/view?usp=drivesdk' },
        { title: 'All EM-II PYQs', url: 'https://drive.google.com/file/d/1m3f0xcG3MUEOfLV9aY0jt4CEJ97fpo2g/view?usp=drivesdk' },
        { title: 'EM-II -End Sem PYQs Solutions (2023-24)', url: 'https://drive.google.com/file/d/1g0GAIl_67M6b8RMnT8iJ9SEVQOPKJgjh/view?usp=drivesdk' },
     ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'OT-3rd Semester');
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
    title: '3rd Semester Syllabus',
    url: 'https://drive.google.com/file/d/1mpACtmx9BF_gInlrOa8U-8ykmGHumQRk/view?usp=drive_link'
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
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">📚 Oil Tech 3rd Semester — Important Instructions</h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">

                <p><strong>✨ Hi CSE/IT Juniors!</strong> A few important things to keep in mind as you progress through 3rd semester — read carefully, this will genuinely help you.</p>

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

export default ThirdSemesterOTNotes;
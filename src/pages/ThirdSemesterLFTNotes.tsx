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
import { smartDownload } from '@/lib/downloadUtils';

const ThirdSemesterLFTNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'LFT-3rd Semester');
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

  // Playlist data for LFT subjects (mostly empty, except Math-II)
  const subjectPlaylists = {
    em: {
      detailed: [
        { title: 'Economics and Management Complete (Best)', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy', recommended: true },
        { title: 'Economics and Management Advanced', url: 'https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae' }
      ],
      oneshot: []
    },
    fmmo: { detailed: [], oneshot: [] },
    cpc: { detailed: [], oneshot: [] },
    pths: { detailed: [], oneshot: [] },
    lmsp: { detailed: [], oneshot: [] },
    lmspl: { detailed: [], oneshot: [] },
    math2: {
      detailed: [
        { title: 'Unit 1 Differential Equation- Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy' },
        { title: 'Unit 3 Laplace Transform - Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB' },
        { title: 'Fourier Series -Pradeep Giri Playlist', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7' },
        { title: 'Fourier Series - MKS Playlist', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8' },
        { title: 'Partial Diff. Eq.- Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k', recommended: true },
        { title: 'Complete Engg Math-II -By: Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx', recommended: true }
      ],
      oneshot: []
    }
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
      id: 'fmmo',
      name: 'Fluid Mechanics & Mechanical Operations (FMMO)',
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
      id: 'cpc',
      name: 'Chemical Process calculations (CPC)',
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
        { title: 'CPC All Unit Practice Problem', url: 'https://drive.google.com/file/d/1SvFXHNktnf7e7hIAkRrc9fvxEZNhqEN7/view?usp=drivesdk' , recommended : true},
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
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk', recommended : true },
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' , recommended : true},
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link', recommended : true },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' , recommended : true},
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' , recommended : true},
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link', recommended : true },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
        {
      id: 'em',
      name: 'Economics & Management (E & M)',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk' , recommended : true },
        { title: 'Business Economics Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' , recommended : true },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' , recommended : true },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' , recommended : true},
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' , recommended : true},
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' , recommended : true},
        { title: 'Unit 4 Notes', url: 'https://drive.google.com/file/d/1oFpjOIShc09HqzTfaLGO9R8ARQh4JQb8/view?usp=drivesdk' },
        { title: 'Unit 5 Notes', url: 'https://drive.google.com/file/d/1Bo3URn-WujyZCXYY5KuPQdL7itjztXyy/view?usp=drivesdk' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' , recommended : true},
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' , recommended : true}
      ]
    },
    
    {
      id: 'pths',
      name: 'Pre-Tanning & Tanning of Hides and Skins',
      icon: '🧪',
      color: 'bg-emerald-500',
      notes: []
    },
    {
      id: 'lmsp',
      name: 'Leather Microscopy & Skin Proteins',
      icon: '⚙️',
      color: 'bg-blue-500',
      notes: []
    },
    {
      id: 'lmspl',
      name: 'Leather Microscopy & Skin PreTannages Lab',
      icon: '👞',
      color: 'bg-amber-500',
      notes: []
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
        { title: 'FMMO Assignment-1 to 5 Solutions PDF', url: 'https://drive.google.com/file/d/10OhOmXg5NbN_St5YSnqB8m-A_hSmNLEv/view?usp=drivesdk' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: '(SEE Your Subjects Only) Mid Sem 1 & 2 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TOeiztCSFWqpnRpeQHYNnq-BcXtbmyzi/view?usp=drivesdk' },
        { title: '(SEE Your Subjects Only) End Sem PYQs (2023-24)', url: 'https://drive.google.com/file/d/1v1htAchF9MpbRT9zlywqiFZWqNQL5zm-/view?usp=drivesdk' },
        { title: '(SEE Your Subjects Only) Mid Sem 1 & 2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1eR4KaUm939MyT0RErzv98a1gxPravAVO/view?usp=drivesdk' },
        { title: '(SEE Your Subjects Only) End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1jPJ0ryFU0kKpLvUhCG8uDSEOspHe_8-W/view?usp=drivesdk' },
        { title: '(SEE Your Subjects Only) Mid Sem 1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1lcZ-zCNw_Cj0nyuISjPTaCBAPXDOmWKT/view?usp=drivesdk' },
        { title: '(SEE Your Subjects Only) Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1CRDbW8rmMG6NbcG7iD6QqpYgqgFK2Vp_/view?usp=drivesdk' },
        { title: 'All CPC PYQs', url: 'https://drive.google.com/file/d/1F5fQM16Y9_OrGDvvDizqsjB_05ip1uq_/view?usp=drivesdk' },
        { title: 'All E&M PYQs', url: 'https://drive.google.com/file/d/1DuFhji3a_PYAdTIOhkZtYHWEIqL-hu-H/view?usp=drivesdk' },
        { title: 'All FMMO PYQs', url: 'https://drive.google.com/file/d/1BiRBS_qkvONqMqC5YDwJU4VyAyZqngP6/view?usp=drivesdk' },
        { title: 'All EM-II PYQs', url: 'https://drive.google.com/file/d/1m3f0xcG3MUEOfLV9aY0jt4CEJ97fpo2g/view?usp=drivesdk' },
        { title: 'EM-II End Sem PYQs Solutions (2023-24)', url: 'https://drive.google.com/file/d/1g0GAIl_67M6b8RMnT8iJ9SEVQOPKJgjh/view?usp=drivesdk' },

      ]
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
    url: 'https://drive.google.com/file/d/1-VxCb09fwIwohJ05JHK35MB0V7j-8VZp/view?usp=drivesdk'
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
            <p className="text-xs opacity-50 uppercase tracking-widest">Leather & Fashion Technology — 3rd Semester</p>
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
                        onClick={() => window.open(note.url, '_blank')}
                        className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
                        disabled={note.url === '#'}
                        title="Open Link"
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
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Leather & Fashion Technology Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            3rd Semester<br />
            <span className="opacity-60">Leather & Fashion Technology Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Leather & Fashion Technology — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">LFT Department</span>
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
          <h3 className="text-base font-bold text-foreground mb-3">📚 LFT 3rd Semester — Important Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">✨ Hi LFT Juniors!</strong> A few important points for your 3rd semester — read carefully.</p>
            <p>• <strong className="text-foreground">Chemical Process Calculations (CPC):</strong> Practice numericals daily. This forms the analytical core of chemical and oil process calculations.</p>
            <p>• <strong className="text-foreground">Fluid Mechanics & Mechanical Operations (FMMO):</strong> Focus on Bernoulli\'s derivations, pump characteristics, and particle size distribution. Lab files are very useful here.</p>
            <p>• <strong className="text-foreground">Maths-II (M2):</strong> Make a short formula sheet yourself while watching YouTube lectures. Solve PYQs. That's it.</p>
            <p>• <strong className="text-foreground">E&amp;M:</strong> This subject is easy to crack. Write detailed answers in the exam with clean handwriting and proper presentation to score well. It is only a 2-credit subject, so its impact is limited.</p>
            <p>• <strong className="text-foreground">Maintain CGPA:</strong> Companies keep a cutoff of <strong className="text-foreground">7 or 7.5 CGPA</strong> — no excuses below that. Those with <strong className="text-foreground">8.5+ are in a very safe zone</strong> — aim for 8+ minimum and maintain it till at least 6th semester.</p>
            <p className="text-red-600 dark:text-red-400"><strong>⚠️ Important:</strong> Always maintain good presentation in exams — use 2 pens, underline important keywords, keep proper spacing after answers, and write sufficiently explained answers for better scoring. Cover every topic from the syllabus using playlists, notes, PYQs, YouTube, Google AI Mode, or any resource possible. Once every topic is understood properly, exams automatically become much easier.</p>
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
              <p className="text-xs text-muted-foreground">Official syllabus for 3rd semester B.Tech LFT</p>
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

export default ThirdSemesterLFTNotes;
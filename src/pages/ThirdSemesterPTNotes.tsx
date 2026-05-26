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

const ThirdSemesterPTNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 3rd Semester Paint Tech on College Study Hub: ${shareUrl}`;
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
    tofep: {
      detailed: [],
      oneshot: []
    },
    fmmo: {
      detailed: [ ],
      oneshot: []
    },
    isctc: {
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
    cpc: {
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
      id: 'em',
      name: 'Economics & Management',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk', recommended : true },
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
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk' , recommended : true },
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
    {
      id: 'isctc',
      name: 'Introduction to Surface Coatings & their Components',
      icon: '🌐',
      color: 'bg-purple-500',
      notes: [
        { title: 'ISCTC Lab Manual PDF', url: 'https://drive.google.com/file/d/1SicKQPQDoaQDrwiGN3qzoLPrmLj4BuF0/view?usp=drivesdk' },
        { title: 'ISCTC Handwritten Lab Manual(2024-25)', url: 'https://drive.google.com/file/d/15_XZh01dDFy22raYnK-E1Gy7EZYFiebm/view?usp=drivesdk' },
        { title: 'Lab File PDF (2025-26)', url: 'https://drive.google.com/file/d/1yhFEy1Y61SO5AWhFlB9HPfMQWvK9lJOC/view?usp=drivesdk' },
        { title: 'ISCTC Material Science Notes', url: 'https://drive.google.com/file/d/1eADE8vXR9e_q_YW77XUmS2tLctzDW59G/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-1)', url: 'https://drive.google.com/file/d/1BV0U_5NCjihkqVTw6VN1Vz5TYh0IX2iW/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-2)', url: 'https://drive.google.com/file/d/1dlunt7Ld7zlnpYNCZmWvY7-ypb7IwiNf/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-3)', url: 'https://drive.google.com/file/d/1N9ALEID284Xkawk9DpGf99bJOdPEQGOs/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-4A)', url: 'https://drive.google.com/file/d/1Tegayk6H03oo4gyqhbOMOTe4Vt6iKw8F/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-4B)', url: 'https://drive.google.com/file/d/17_3NQnEx2lq-XCgKJZDvUNI7fcU1MdOC/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-5)', url: 'https://drive.google.com/file/d/1PkS_pe5gOpo4CVoNqLRrO7sgmoCHCjYE/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-6)', url: 'https://drive.google.com/file/d/1a7tAQF2D6YrZkk1BKPHO9lITWjhwcXY-/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-7A)', url: 'https://drive.google.com/file/d/1uFZBjYHqZnfSWzRADhVnq_kFfx2i96hw/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-7B)', url: 'https://drive.google.com/file/d/1T_QGrdzYKIDmhjZcGhPGajLT9kh6rZJH/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-17)', url: 'https://drive.google.com/file/d/1xEKfsiqGD5CG6Xg0nUyK5Sr28j6c1iij/view?usp=drivesdk' },
        { title: 'ISCTC NOTES (Part-20)', url: 'https://drive.google.com/file/d/1CX6cGVitRhKf9FyAi6y8YBMkNLjU8TZt/view?usp=drivesdk' },
        { title: 'UNIT-1 NOTES', url: 'https://drive.google.com/file/d/1pqPVNSdlt5MCDPkicOxvOF8LaLfPPl1i/view?usp=drivesdk' },
        { title: 'UNIT-2 NOTES', url: 'https://drive.google.com/file/d/1f6uFKrkjkho-au-JqpskZ9a7yoPB4eZw/view?usp=drivesdk' },
        { title: 'Unit-3 Modification of Oil', url: 'https://drive.google.com/file/d/18DyNRafEKaiGX5UUmlzuVZAhc9HGYcXY/view?usp=drivesdk' },
        { title: 'Unit-1,2,3 Class Notes', url: 'https://drive.google.com/file/d/1gb9wH8WicEIwZDUf40kGQGeIqrMNeKQM/view?usp=drivesdk' },
        { title: 'ISCTC Unit-4&5 Notes', url: 'https://drive.google.com/file/d/1_BZ8jfH52ckWoMkFxQzJOnW9dpow8nAl/view?usp=drivesdk' },
        { title: 'ISCTC Unit-4 Class Notes', url: 'https://drive.google.com/file/d/1NOmb2eglOFAUX9gJ3H3VHQ4Y_0qwae_J/view?usp=drivesdk' },
        { title: 'ISCTC Unit-5  Class Notes', url: 'https://drive.google.com/file/d/1CNhrXXrXrlHeivRRaRJJ7UONIJbwMzFy/view?usp=drivesdk' },
        { title: 'HF Paint-Volume 2 BOOK', url: 'https://drive.google.com/file/d/1XPcSgZwmWXDefe7YFpKMCXq0XAQmgNS9/view?usp=drivesdk' },
        { title: 'Driers PDF Notes', url: 'https://drive.google.com/file/d/11MLvSqJybl6LQFXpbAfOJu3O7GBPcYsg/view?usp=drivesdk' },
        { title: 'BOOK Content - Vegetable Oil', url: 'https://drive.google.com/file/d/1JZDaR_05rlsgQenrtAuTSehQ9dxmrdDz/view?usp=drivesdk' },
        { title: 'BOOK Content - Solvents', url: 'https://drive.google.com/file/d/1DSzJzKo0jk-l8dXPgy214kjKaN6nfBgS/view?usp=drivesdk' },
        { title: 'BOOK Content - Driers (Part-1)', url: 'https://drive.google.com/file/d/1DyYFJCUmLWMSdgmxicqRkD_KJZRP3-hx/view?usp=drivesdk' },
        { title: 'BOOK Content - Driers (Part-2)', url: 'https://drive.google.com/file/d/1OHtEQWWgdgYvvAQVNaR3vC_xZhHb9LVw/view?usp=drivesdk' },
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
      id: 'tofep',
      name: 'Technology of Organic, Functional & Effect Pigments',
      icon: '🔌',
      color: 'bg-teal-500',
       notes: [
         { title: 'Unit-1 Notes (Prof.)', url: 'https://drive.google.com/file/d/1Rd194AYuRrzBlpHwutK9wyX5IObAxRnN/view?usp=drivesdk', recommended : true },
         { title: 'Unit-1 Notes (student)', url: 'https://drive.google.com/file/d/1AA4RV0KFEPbWM_sB27CFcsPC-LytIRjz/view?usp=drivesdk' },
         { title: 'Unit-2 Notes(Prof.)', url: 'https://drive.google.com/file/d/1M1DvMpvH08uy4Jz9D1zpWKUFIKM8Gfvu/view?usp=drivesdk', recommended : true },
         { title: 'Full Unit-3 Notes', url: 'https://drive.google.com/file/d/1_1ycfadTfGxxTtvV7EEOQO65Yi3EO1EO/view?usp=drivesdk', recommended : true },
         { title: 'Unit-4 Notes (Part-1)', url: 'https://drive.google.com/file/d/1a8AdHWHHDa_zl-vP8lQgsBvLLfiwc--v/view?usp=drivesdk', recommended : true },
         { title: 'Unit-4 Notes (Part-2)', url: 'https://drive.google.com/file/d/1u_JiNsEZ3N3O7TeToMSL-aU6gEIypGt1/view?usp=drivesdk', recommended : true },
         { title: 'Unit-3 & 4 Notes', url: 'https://drive.google.com/file/d/1RQNw3ezA1-sSHTnE4357uqcIksc7FPDs/view?usp=drivesdk' , recommended : true},
         { title: 'Unit-5 Notes', url: 'https://drive.google.com/file/d/1M1ODKKsA6nc9hYLnpK4x7665yUgSSkUz/view?usp=drivesdk', recommended : true },
         { title: 'BOOK -HF PAYNE VOL.1 PDF', url: 'https://drive.google.com/file/d/1fm5Lw8W4uCZQpTxy_ucMeqY10AKbEacI/view?usp=drivesdk' },
         { title: 'BOOK -OUTLINES OF PAINT TECHNOLOGY (BY-WM MORGANS)', url: 'https://drive.google.com/file/d/1LaApEGFI4z5n-6N54CtgmRwq7B03EZq5/view?usp=drivesdk' },
        ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [
        { title: 'Asssignment-1 PDF', url: 'https://drive.google.com/file/d/1AX9L3O9O3kn6s1TUAx20zHG-FUa-CuIF/view?usp=drivesdk' },
        { title: 'Asssignment-2 PDF', url: 'https://drive.google.com/file/d/1TUNcZDO9MmMZ42U3LSCkbLcLHNeMniAd/view?usp=drivesdk' },
        { title: 'Asssignment-3 PDF', url: 'https://drive.google.com/file/d/1nsAGVFz2d8Irrho4Rw8uFGUMmJgvIv6D/view?usp=drivesdk' },
        { title: 'Asssignment-4 PDF', url: 'https://drive.google.com/file/d/1ZGXG9oFx3FRkAvsqygTmxBm6OA74PaWa/view?usp=drivesdk' },
        { title: 'Asssignment-5 PDF', url: 'https://drive.google.com/file/d/1VZMjpCRvpJD0UOC-Iwvdquy_m0ahgEFG/view?usp=drivesdk' },
        { title: 'Assignment-1 to 5 Solutions PDF', url: 'https://drive.google.com/file/d/10OhOmXg5NbN_St5YSnqB8m-A_hSmNLEv/view?usp=drivesdk' },

      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Mid Sem 1 & 2 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TOeiztCSFWqpnRpeQHYNnq-BcXtbmyzi/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2023-24)', url: 'https://drive.google.com/file/d/1v1htAchF9MpbRT9zlywqiFZWqNQL5zm-/view?usp=drivesdk' },
        { title: 'Mid Sem 1 & 2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1eR4KaUm939MyT0RErzv98a1gxPravAVO/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1jPJ0ryFU0kKpLvUhCG8uDSEOspHe_8-W/view?usp=drivesdk' },
        { title: 'Mid Sem 1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1lcZ-zCNw_Cj0nyuISjPTaCBAPXDOmWKT/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1CRDbW8rmMG6NbcG7iD6QqpYgqgFK2Vp_/view?usp=drivesdk' },
        { title: 'All CPC PYQs', url: 'https://drive.google.com/file/d/1F5fQM16Y9_OrGDvvDizqsjB_05ip1uq_/view?usp=drivesdk' },
        { title: 'All E&M PYQs', url: 'https://drive.google.com/file/d/1DuFhji3a_PYAdTIOhkZtYHWEIqL-hu-H/view?usp=drivesdk' },
        { title: 'All FMMO PYQs', url: 'https://drive.google.com/file/d/1BiRBS_qkvONqMqC5YDwJU4VyAyZqngP6/view?usp=drivesdk' },
        { title: 'All ISCTC PYQs(Part-I)', url: 'https://drive.google.com/file/d/1JtSxz8bGBOfTFUyGZRnFf_JrJ1uw-b6m/view?usp=drivesdk' },
        { title: 'All ISCTC PYQs (Part-II)', url: 'https://drive.google.com/file/d/10sCvflNNe9yYmtB6SEt7m6SUYI8PUIvg/view?usp=drivesdk' },
        { title: 'All EM-II PYQs', url: 'https://drive.google.com/file/d/1m3f0xcG3MUEOfLV9aY0jt4CEJ97fpo2g/view?usp=drivesdk' },
        { title: 'All TOFEP PYQs', url: 'https://drive.google.com/file/d/18d4EOXKbFKM3ugEJI1zLVrbjW2a-bxBL/view?usp=drivesdk' },
        { title: 'EM-II -End Sem PYQs Solutions (2023-24)', url: 'https://drive.google.com/file/d/1g0GAIl_67M6b8RMnT8iJ9SEVQOPKJgjh/view?usp=drivesdk' },
     ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'PT-3rd Semester');
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
    url: 'https://drive.google.com/file/d/1ikG58R0J9zc-0NmfDZbsFumu2edAJ3Y3/view?usp=drivesdk'
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
            <strong>Only for PT students</strong>
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
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">📚 Paint Tech 3rd Semester — Important Instructions</h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">

                <p><strong>✨ Hi PT Juniors!</strong> A few important things to keep in mind as you progress through 3rd semester — read carefully, this will genuinely help you.</p>

                <p>• <strong>Maintain CGPA:</strong> Companies keep a cutoff of <strong>7 or 7.5 CGPA</strong> — no excuses below that. Those with <strong>8.5+ are in a very safe zone</strong> — aim for 8+ minimum and maintain it till at least 6th semester.</p>

                <p>• <strong>Maths-II (M2):</strong> Make a short formula sheet yourself while watching YouTube lectures. Solve PYQs. That's it.</p>

                <p>• <strong>E&amp;M:</strong> This subject is easy to crack. Write detailed answers in the exam with clean handwriting and proper presentation to score well. It is only a 2-credit subject, so its impact is limited.</p>

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

export default ThirdSemesterPTNotes;
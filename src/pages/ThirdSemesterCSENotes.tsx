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

const ThirdSemesterNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 3rd Semester CSE/IT on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    co: {
      detailed: [
        { title: 'Computer Organization Complete', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX&si=DIFQTSm2C9CeKCSW' }
      ],
      oneshot: [
        { title: 'Computer Organization One Shot 1', url: 'https://youtu.be/DsK35f8wyUw?si=txkw3jBfvMrPRHI9' },
        { title: 'Computer Organization One Shot 2', url: 'https://youtu.be/nezosHntjPg?si=b07dVQUqLYcwXAak' }
      ]
    },
    dsuc: {
      detailed: [
        { title: 'DSUC Complete Playlist', url: 'https://youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU&si=ywuxQFLJq-6kBNBz' },
        { title: 'DSUC Advanced Playlist', url: 'https://youtube.com/playlist?list=PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j&si=UoNjnrMNLqIyMOJ7' }
      ],
      oneshot: [
        { title: 'DSUC One Shot Complete', url: 'https://youtu.be/MdG0Vw9f1A4?si=l-gk-33QAWwbhSeC' }
      ]
    },
    de: {
      detailed: [
        { title: 'Digital Electronics Complete (Best)', url: 'https://youtube.com/playlist?list=PL0c0N7xv8s06alYrdpsYjGXBs1IqIU8QS&si=YrMsDIvKhqS3pAjx', recommended: true },
        { title: 'Digital Electronics Advanced', url: 'https://youtube.com/playlist?list=PLgwJf8NK-2e7nYSG31YWEUfwgAp2uIOBY&si=gjuY7Q3o8GBTfdR3' }
      ],
      oneshot: [
        { title: 'Digital Electronics One Shot 1', url: 'https://youtu.be/pHNbm-4reIc?si=BAIqs2C-Ga8NRzPJ' },
        { title: 'Digital Electronics One Shot 2', url: 'https://youtu.be/9Tn9M98yER8?si=Mubongdz8rnHGTaz' }
      ]
    },
    python: {
      detailed: [
        { title: 'Python Programming Complete', url: 'https://youtube.com/playlist?list=PLvu-LC7buiaVdESLhxGj0BDQMjSLIEiSL&si=_GpcglKz_pZ78pt_' }
      ],
      oneshot: [
        { title: 'Python Programming One Shot', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8vu2RWHdPsuRNRAcd89-eaz&si=dTvCvGhRbf7esBPJ' }
      ]
    },
    math2: {
      detailed: [
        { title: 'Engineering Mathematics-II Unit 1', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy' },
        { title: 'Engineering Mathematics-II Unit 3', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB' },
        { title: 'Fourier Series Playlist', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7' },
        { title: 'Engineering Math-II Playlist 1', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8' },
        { title: 'Engineering Math-II Playlist 2', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyJoNnAqghUK-Lit3qBgfa6o&si=RfESwXzHT7mFK_DG' },
        { title: 'Complete Engineering Math-II (Best)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k', recommended: true },
        { title: 'Engineering Math-II Advanced', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyJCwFXRDW8KmDlBFGRAxnAu&si=Vi9_HhLL2K5r15gn' },
        { title: 'Engineering Math-II Advanced (Best)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx', recommended: true }
      ],
      oneshot: []
    },
    itetiict: {
      detailed: [],
      oneshot: [
        { title: 'ICT Introduction Video 1', url: 'https://youtu.be/6ptZr9VRxPs?si=IRMWuVFfR4-Yj6rM' },
        { title: 'ICT Introduction Video 2', url: 'https://youtu.be/Pg_9kXV1lXg?si=Z-jfUI57nI_c8_2w' },
        { title: 'ICT Introduction Video 3', url: 'https://youtu.be/mbdl-Fh5ALg?si=1JQlwxU9UroBsgL8' }
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
      id: 'dsuc',
      name: 'Data Structures Using C',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [
        { title: 'Complete DSUC Best Notes - Quantum', url: 'https://drive.google.com/file/d/1owA6SjSqpZrLk1-qH_W0o96jamAcciOC/view?usp=drive_link' },
        { title: 'All Most Important Programs for End Sem DSUC', url: 'https://drive.google.com/file/d/16eqDnz71Ir1RulrBmeN7Lsxb54NnFPVs/view?usp=drive_link' },
        { title: 'DSUC Lab File', url: 'https://drive.google.com/file/d/1-XiDXdsHOUgn_FWc7Vj3nqkPIpvQ6Z00/view?usp=drive_link' },
        { title: 'DSUC Unit 3 Notes', url: 'https://drive.google.com/file/d/16vyaX2v03fQIIRlPQEuRpZlj9yMkwslJ/view?usp=drive_link' },
        { title: 'DSUC Unit 1 Notes', url: 'https://drive.google.com/file/d/17AvvwyJt04S2BVhsGaeIPTmKiauFjFt3/view?usp=drive_link' },
        { title: 'DSUC Unit 2 Notes', url: 'https://drive.google.com/file/d/176a8uPhPDR4sCE0OGOnem3fAJzhEafHp/view?usp=drive_link' },
        { title: 'DSUC Unit 4 Notes', url: 'https://drive.google.com/file/d/16puOi7D4C8zNYQy7b5g57ldSY4uxKu1U/view?usp=drive_link' },
        { title: 'DSUC Unit 5 Notes', url: 'https://drive.google.com/file/d/16lSiwGeeApPd-ROVWiHzE2p_lrGl8Nmx/view?usp=drive_link' },
        { title: 'Best Unit 1 Notes', url: 'https://drive.google.com/file/d/1ox2uuOi9_5E_OykzE4HVFziuaztrG_6h/view?usp=drive_link' }
      ]
    },
    {
      id: 'itetiict',
      name: 'Intro to Emerging Technologies in ICT',
      icon: '🌐',
      color: 'bg-purple-500',
      notes: [
        { title: 'IoT Introduction PDF', url: 'https://drive.google.com/file/d/1_RxHI-c9kG75CDeqvMaq6ZF7kfpcASfr/view?usp=drive_link' },
        { title: 'Cryptocurrency Notes', url: 'https://drive.google.com/file/d/1nXHy2Yc2Sj9Dbnk5sc8b40WRdR5FEYt-/view?usp=drive_link' },
        { title: 'IoT Smart City PDF', url: 'https://drive.google.com/file/d/1_Ptg9E0I-o6t8yu_dx3tEEZ1SdF3mk7M/view?usp=drive_link' },
        { title: 'OSI Model PDF', url: 'https://drive.google.com/file/d/1_UGWKcSl3PlJoPFnh7doApswuIxVDoxA/view?usp=drive_link' },
        { title: 'Blockchain Notes', url: 'https://drive.google.com/file/d/1naxhYNRX8Jh3F761QKSXgz1GSPvEWQPI/view?usp=drive_link' },
        { title: 'Mid Sem 2 (Unit 3 & 4 Revision Notes)', url: 'https://drive.google.com/file/d/1o66wwin_5zxme7XQZtLxzrfDfRndVaIN/view?usp=drive_link' },
        { title: 'Blockchain Reference Book', url: 'https://drive.google.com/file/d/1n31Nl9JGvvB9gu2IcYnHxA_f-_f81Abd/view?usp=drive_link' },
        { title: 'Unit 3 Topic Smart Contract PDF', url: 'https://drive.google.com/file/d/1ncpHnKX8YdQb0S-qYPjZpy0raJSG6xCx/view?usp=drive_link' },
        { title: 'AWS, Azure & Cloud Difference - Most Important PDF', url: 'https://drive.google.com/file/d/1_5MPY5RNWggsfMMZ8OfNYwv25cTe5o1J/view?usp=drive_link' },
        { title: 'Artificial Intelligence Notes', url: 'https://drive.google.com/file/d/1nQMQcUnAiWtmGsA7I8O5uhkGCJfVpumY/view?usp=drive_link' },
        { title: '10 V\'s of Big Data PDF', url: 'https://drive.google.com/file/d/1n3L4z2CaXd1GEbVE6A3ghpX1wYLWxlCv/view?usp=drive_link' },
        { title: '10 Use Cases of Blockchain PDF', url: 'https://drive.google.com/file/d/1nWBxdm1CXBihI_yI8BLan6lKeWkshEus/view?usp=drive_link' },
        { title: 'Unit 1 Short Notes', url: 'https://drive.google.com/file/d/1Yx6KtWPOFZo9r0Gkzz4wB63xGlzcRD7E/view?usp=drive_link' },
        { title: 'Unit 2 Short Notes', url: 'https://drive.google.com/file/d/1Z75dUAIGpD9BjO6XbTmrC5PLR3hbu4H6/view?usp=drive_link' },
        { title: 'Unit 3 Short Notes', url: 'https://drive.google.com/file/d/1Z7DnmJZGdh9FvJf-9uzGWb2X0wlAi2ep/view?usp=drive_link' },
        { title: 'Unit 5 Short Notes', url: 'https://drive.google.com/file/d/1ZIdEag2hUDiDcS0oMMD6_0AYzucWll0n/view?usp=drive_link' }
      ]
    },
    {
      id: 'co',
      name: 'Computer Organisation',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [
        { title: 'CO Notes', url: 'https://drive.google.com/file/d/1_BSSWlVYgFZrNF2tmNEBhMDATUmCj73B/view?usp=drive_link' },
        { title: 'CO Unit 3 & 4 Notes', url: 'https://drive.google.com/file/d/1nmTLVoJw-JmThfro0vm5Wk-taA1jDHBn/view?usp=drive_link' },
        { title: 'CO Unit 3 Handwritten Notes', url: 'https://drive.google.com/file/d/1nt9Llpt9gmc2SlQb0fqwVzcEfAYjZkGD/view?usp=drive_link' },
        { title: 'Full CO Playlist SS Notes', url: 'https://drive.google.com/file/d/1565sCtaXE8cUAYyQ9t6hlShUkteSK8di/view?usp=drive_link' },
        { title: 'Control Unit & Design Notes', url: 'https://drive.google.com/file/d/1o3kF8AMJDkFcIFVaaxiB2i8HNejd-GTk/view?usp=drive_link' },
        { title: 'Full Important CO Material - ESE', url: 'https://drive.google.com/file/d/15Ah5duaHgJSNDRD2chR68rUc1dozjcYW/view?usp=drive_link' },
        { title: 'RISC Vs CISC PDF', url: 'https://drive.google.com/file/d/1nuRiot85uZwMmsH_4vizdT92BNGGdPEJ/view?usp=drive_link' },
        { title: 'CO Mid Sem 2 Numericals - Last Minute Revision PDF', url: 'https://drive.google.com/file/d/1o4JJ7-guZ4ttvNNitQd0Vh4aDeoNogRe/view?usp=drive_link' }
      ]
    },
    {
      id: 'python',
      name: 'Python Programming',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: [
        { title: 'PP Notes', url: 'https://drive.google.com/file/d/14MsO70g821_IZrtXEp8bezOKnte8Enak/view?usp=drive_link' },
        { title: 'PP Lab File', url: 'https://drive.google.com/file/d/1-Vb1JsaRf3VnonTH80EtYzg2W53n5HV5/view?usp=drive_link' },
        { title: 'PP Best Quantum Notes', url: 'https://drive.google.com/file/d/1ovVLnKwYM1vsYSeAk0UNEqcF-lU7otVH/view?usp=drive_link' },
        { title: 'Important PP Programs for ESE', url: 'https://drive.google.com/file/d/13viyP84UNb_1UfGWPUnqOapXUSq2jcMz/view?usp=drive_link' },
        { title: 'Python Full Handwritten Notes', url: 'https://drive.google.com/file/d/1_VF2ORzst49Yu5BtYdhSkTbw16Wge2rE/view?usp=drive_link' }
      ]
    },
    {
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
    {
      id: 'de',
      name: 'Digital Electronics',
      icon: '🔌',
      color: 'bg-teal-500',
       notes: [
        { title: 'DE Complete Notes', url: 'https://drive.google.com/file/d/1BUBUuMlABL7Uu-CxOa8_Q5tbFajxBI8t/view?usp=drivesdk' },
       { title: 'Full DE Notes - 5 Min. Engg.', url: 'https://drive.google.com/file/d/1LaApEGFI4z5n-6N54CtgmRwq7B03EZq5/view?usp=drivesdk' },
        { title: 'Question Bank (Chapter Wise)', url: 'https://drive.google.com/file/d/1ANtk5b6Sr6Q6LQLDELmjDsiLis77ThjI/view?usp=drive_link' },
        { title: 'DE Complete Lab File', url: 'https://drive.google.com/file/d/1-u7KbXNDxNQNw7g64PEbwfqE7FOhZmRb/view?usp=drive_link' }
       ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [
        { title: 'PP Assignment-1', url: 'https://drive.google.com/file/d/1-dydD1SBZZ7Grggn3whZwA4Fbfo-xupA/view?usp=drive_link' },
        { title: 'ItETiICT Assignment-1', url: 'https://drive.google.com/file/d/1rXGsAnU9Shr7YNybgAQJVZrtR3QbfOwU/view?usp=drive_link' },
        { title: 'EM-II Assignment 1', url: 'https://drive.google.com/file/d/1TIUedXB4mRke7CDxuvHnVn9lXXA6KmQf/view?usp=drive_link' },
        { title: 'EM-II Assignment-2', url: 'https://drive.google.com/file/d/1TKW4nyYuBMe5LJxXLBlEwEIOdSvbWTpI/view?usp=drive_link' },
        { title: 'EM-II Assignment-3', url: 'https://drive.google.com/file/d/1tDZaX9nQEPecEtrDgjgtPOblvp_GA9TG/view?usp=drive_link' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Mid Sem 1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1aYXQlrMqS8wIP_k__SrXBOwTq8g9q42T/view?usp=drivesdk' },
        { title: 'Mid Sem 2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1uPEiDJyEzEz2OsyCXJ2ZuyS-m1k8NpR4/view?usp=drivesdk' },
        { title: 'Mid Sem 1 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1SFi-2scaPEeehBKK7sW-vuag0-t3Z3Pk/view?usp=drive_link' },
        { title: 'Mid Sem 2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1my2tho6uAeNtm2r6wA9Egare2Wsj6MzX/view?usp=drive_link' },
        { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1P6gRk-loWPVrYtclKa9YaXa5AKLiebZ7/view?usp=drive_link' },
        { title: 'Mid Sem-1 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TLslQyKp3OofBB61ApE4-5q0epHzVcik/view?usp=drive_link' },
        { title: 'End Sem PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TeQ1Pee5v93WkAncNgNss9JQaXhg4b0h/view?usp=drive_link' },
      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CSE-3rd Semester');
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

export default ThirdSemesterNotes;
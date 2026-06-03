import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const FirstSemesterNotes = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ALL-1st Semester');

  const subjectPlaylists = {
    chemistry: {
      detailed: [
        { title: 'Engineering Chemistry Complete', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jB7qJkp5qn35021QUBC8xP&si=kE_79WdmozBtD5ZS' },
        { title: 'Chemistry Concepts Part 1', url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhBKXPlljxAHMCkdw7Lb_Qbn&si=4SmEbrEMClBJIb7M' },
        { title: 'Advanced Chemistry Topics', url: 'https://youtube.com/playlist?list=PLg2LVpcRrOF5BVVKG_DdYRPEaMx6C9XsW&si=wOvmSVvGHocZWco2' }
      ],
      oneshot: [
        { title: 'Chemistry One Shot', url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhBKXPlljxAHMCkdw7Lb_Qbn&si=J_GtKZCpwqQCeZ42' }
      ],
      workshop: []
    },
    civil: {
      detailed: [
        { title: 'Civil Engineering Complete (Best)', url: 'https://youtube.com/playlist?list=PLEYBvmdYQH_Z3sFfITPeEv-qg3sgHVIqC&si=p7O3LMHX28BDkQxU', recommended: true },
      ],
      oneshot: [
        { title: 'Civil Engineering One Shot', url: 'https://youtu.be/o-oCyZtCqR0?si=tVpcOQdTAzSSz82u' }
      ],
      workshop: []
    },
    iet: {
      detailed: [
        { title: 'IET Complete Course (Best)', url: 'https://youtube.com/playlist?list=PL0c0N7xv8s06iL0pUc8VXGH_v-vbGOSv4&si=D7XeqGctlD86CpnA', recommended: true },
        { title: 'Digital Electronics Concepts', url: 'https://youtube.com/playlist?list=PL3qvHcrYGy1uF5KAGntUITTJ85Dm3Dtdy&si=1AvreP0F8uaS4Nyw' }
      ],
      oneshot: [
        { title: 'Unit 3 One Shot', url: 'https://youtu.be/wVL5X4DSVQo?si=VUANHiiHJpQnvDiu' },
        { title: 'Unit 5 One Shot', url: 'https://youtu.be/czUrC3t3zWM?si=rqLOu6D6XrbouDmb' },
        { title: 'Digital Electronics Full (6 hrs)', url: 'https://youtu.be/pHNbm-4reIc?si=vm26Px3CwVDjkaAZ' }
      ],
      workshop: []
    },
    workshop: {
      detailed: [],
      oneshot: [],
      workshop: [
        { title: 'Foundry Workshop', url: 'https://youtu.be/RIwEspSqY1s?si=CdRIS_VaiH1HOG7w' },
        { title: 'Machine Workshop', url: 'https://youtu.be/as-H6RX3lr8?si=yEUw-Z9jjijM_AsY' },
        { title: 'Fitting Workshop', url: 'https://youtu.be/g3f9m24cx0s?si=ZQEF31XxTZolfvwX' },
        { title: 'Carpentry Workshop', url: 'https://youtu.be/xCKK4l_q8vU?si=UxuRYis-lBCkcs0k' }
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

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot' | 'workshop') => {
    const playlistKey = subjectId as keyof typeof subjectPlaylists;
    if (subjectPlaylists[playlistKey] && subjectPlaylists[playlistKey][type].length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const playlistKey = subjectId as keyof typeof subjectPlaylists;
    return subjectPlaylists[playlistKey] || { detailed: [], oneshot: [], workshop: [] };
  };

  const staticSubjects = [
    {
      id: 'chemistry',
      name: 'Chemistry Notes',
      icon: '🧪',
      color: 'bg-green-500',
      notes: [
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/file/d/1Kr7Cs7O-VHKYnHu5W2TjOWX-ZVNGdHVF/view?usp=drivesdk' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/file/d/138hWk93eecUFZSuV5QeH8_JngRdaVwg1/view?usp=drivesdk' },
        { title: 'Unit-4 Reaction Mechanism Notes', url: 'https://drive.google.com/file/d/1qK9pGG8Vof78o-1v5aV48duAyoyHx0CF/view?usp=drivesdk' },
        { title: 'Unit-5 Notes', url: 'https://drive.google.com/file/d/1SKb7fg3lcyhT5lp0OWSvqmFtJYOEBei2/view?usp=drivesdk' },
        { title: 'Lab Related theory', url: 'https://drive.google.com/file/d/1pDN8Id0uViXtk5GeV6DRP52NnOB_zGfn/view?usp=drivesdk' },
        { title: 'Coordination & Compound', url: 'https://drive.google.com/file/d/1RZ_mEFT7IjEgSSJl4_Rt71ZhT7EEdWNX/view?usp=sharing' },
        { title: 'Chemistry Practical File', url: 'https://drive.google.com/file/d/1ovxq8fHzhGVIYnYwS3L3hYRnqpjCYTqa/view?usp=drive_link' },
        { title: 'Engg. Chemistry Lecture Notes: Priyal Kumar (CSE"27)', url: 'https://drive.google.com/file/d/1W5Sj-qYeWSaegcB2WUcKXymRQtOigM1f/view?usp=drive_link' },
        { title: 'Nomenclature Notes', url: 'https://drive.google.com/file/d/1ROFkIOZ_PbPQYf1LcW49EPg-F78Zqjwz/view?usp=drive_link' },
        { title: 'Polymer Notes', url: 'https://drive.google.com/file/d/1RSder5E5rNZ3Nkn5ToQkt_8E8WJiDG_B/view?usp=drive_link' },
        { title: 'Full Chemistry Notes: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/1SU4yAUpxOcw_YPEvnnakgLJAqMlTcLBi/view?usp=drivesdk' }
      ]
    },
    {
      id: 'civil',
      name: 'Civil Engineering Notes',
      icon: '🏗️',
      color: 'bg-orange-500',
      notes: [
        { title: 'Bitumen Notes', url: 'https://drive.google.com/file/d/1YDuklfVCl1EsZYbIx6prmQWjUsl1oflv/view?usp=drive_link' },
        { title: 'Bricks & Stone', url: 'https://drive.google.com/file/d/1Y23Skew2v5zv-Boph-77TdiChtsqjiJR/view?usp=drive_link' },
        { title: 'Cement & Concrete Notes', url: 'https://drive.google.com/file/d/1YAOneWG4NSZkZ_3quAQHG4fsmIYPJran/view?usp=drive_link' },
        { title: 'Civil Engineering Lecture Notes', url: 'https://drive.google.com/file/d/1QNnJexZgJLWCIIDFLlxKIjmEcnf6Q5Ld/view?usp=drive_link' },
        { title: 'Highway Topic Notes', url: 'https://drive.google.com/file/d/1YXMgMQrZYnphcJ7zbR6_N9ICBtflVGAV/view?usp=drive_link' },
        { title: 'Railway & Airport Notes', url: 'https://drive.google.com/file/d/1Y_Qm-e4uW2nFE0Zr_AQOPaXS4A8ohLI_/view?usp=drive_link' },
        { title: 'Soil Mechanism Notes', url: 'https://drive.google.com/file/d/1YGC7dH5Kqf7bDe7bjdyEJ5zxkLu1fkIU/view?usp=drive_link' },
        { title: 'Surkhi & Stone Dust Notes', url: 'https://drive.google.com/file/d/1YKXTKcL0ozY6OCtOC1gocUgRxJpUct_c/view?usp=drive_link' },
        { title: 'Surveying Notes', url: 'https://drive.google.com/file/d/1Xx7kvJhCV5GQnKe9iWi9hWlOVyjj5Wuz/view?usp=drive_link' },
        { title: 'Unit 1 Notes', url: 'https://drive.google.com/file/d/1XxSq3_HJB3DnNUwjepBME6UjB9F1xNWj/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1YV3-xqPi-uERYjZ4XfXH6lYTqjmJr_qm/view?usp=drive_link' }
      ]
    },
    {
      id: 'ics',
      name: 'ICS Handwritten Notes',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [
        { title: 'Full ICS Notes: Priyal Kumar (CSE"27)', url: 'https://drive.google.com/file/d/1Q5neO5-oIEwcVtmqzLNzHm5GQXzrixGx/view?usp=drivesdk' },
        { title: 'ICS Unit-1 & 2 Notes', url: 'https://drive.google.com/file/d/1BabE6apr738EHwcFiBT30ncC8sa-y7TB/view?usp=drivesdk' },
        { title: 'ICS Unit 3 Notes', url: 'https://drive.google.com/file/d/1ALdaWqRVSTwAlrGKVQbjdqePsj3_PIlW/view?usp=drivesdk' },
        { title: 'ICS Unit 4 Notes', url: 'https://drive.google.com/file/d/1ZFGP8oM3ew0N6XkGsYu3XlJdrkgq35gL/view?usp=drivesdk' },
        { title: 'ICS Unit 5 Notes', url: 'https://drive.google.com/file/d/1NkhoqObE7MulcpapaBgKARCs63b_Vxci/view?usp=drivesdk' },
        { title: 'ICS UNIX Notes', url: 'https://drive.google.com/file/d/1tPZekj8Nhbt3m3N_wJY0YFDXUq1ALrtj/view?usp=drivesdk' },
        { title: 'Full ICS Notes: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/18OszxRCXnRxCzMOk6lmOPO0oCx_9zvP1/view?usp=drivesdk' }
      ]
    },
    {
      id: 'ict',
      name: 'ICT Handwritten Notes',
      icon: '🔧',
      color: 'bg-purple-500',
      notes: [
        { title: 'Paint Technology (ICT)', url: 'https://drive.google.com/file/d/1Q4LDUfRyXzSwN9PCrQ8zN7D9sc-xeAt4/view?usp=drivesdk' },
        { title: 'Food Technology (ICT)', url: 'https://drive.google.com/file/d/1Wd9BbM9BYNAtNehllNTXo_7PxVDfX5P8/view?usp=drivesdk' },
        { title: 'Leather Technology (ICT)', url: 'https://drive.google.com/file/d/1Fv9uAi3qeM8vxngFbG1tmMo6J20vF3qy/view?usp=drivesdk' },
        { title: 'ICT Notes: Priyal Kumar', url: 'https://drive.google.com/file/d/1PzevLkCwsQBQh_bZDwZnPgdWA6Qqv_5m/view?usp=drivesdk' }
      ]
    },
    {
      id: 'iet',
      name: 'IET Handwritten Notes',
      icon: '⚡',
      color: 'bg-yellow-500',
      notes: [
        { title: 'IET Notes', url: 'https://drive.google.com/file/d/1Ps9wD-x7CZLNy-bY8HmeqDy7Uytp6flq/view?usp=drive_link' }
      ]
    },
    {
      id: 'workshop',
      name: 'Workshop Notes',
      icon: '🔨',
      color: 'bg-red-500',
      notes: [
        { title: 'Workshop File Part 1', url: 'https://drive.google.com/file/d/1W2cNn_GykLkrO3gvDBvRhRgw5IwkzYy8/view?usp=drive_link' },
        { title: 'Workshop File Part 2', url: 'https://drive.google.com/file/d/1W3OE6MjtYXe5Ln3_jaztoEvUf9FoIzKE/view?usp=drive_link' },
        { title: 'Complete Workshop File: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/1-xXwVfGrvvfLpanOo8YsnCHeVyKSS2Dd/view?usp=drivesdk' },
        { title: 'Workshop Material Science Notes', url: 'https://drive.google.com/file/d/1W8lcNGdqsP5sI3h5ey3ORYBTdDJijFF7/view?usp=drive_link' },
        { title: 'Material Science Additional PDF 1', url: 'https://drive.google.com/file/d/1_YgthLZ625NzKcnUYJIzx8lvuvtpsCZ_/view?usp=drive_link' },
        { title: 'Material Science Additional PDF 2', url: 'https://drive.google.com/file/d/1_a9SNbiP_M2yN4ZCwbC9xHBoOcBhYGI_/view?usp=drive_link' },
        { title: 'Blacksmithy Workshop Book', url: 'https://drive.google.com/file/d/1h6bKd9giFf2P9A0rIKbJvJ2vn4qOqzQk/view?usp=drivesdk' },
        { title: 'Complete workshop Notes:-Ananya(CSE"28)', url: 'https://drive.google.com/file/d/1YBdb4IWdChFR0kNt6vCa7CjP8Xr-Mg8N/view?usp=drivesdk' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [ 
        { title: 'Mid Sem-1 PYQs (2025-26)-EVEN SEM', url: 'https://drive.google.com/file/d/18k4F_9KcyfRkEt-rjsDIMA2wN4BvZj_1/view' },
        { title: 'Mid Sem-1 PYQs (2025-26)-ODD SEM', url: 'https://drive.google.com/file/d/1UHEYh3ykfe1QtYE_VfOF09nLwfWkjx5Z/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs (2025-26)-ODD SEM', url: 'https://drive.google.com/file/d/1VzarRmsgnrELjL9fsGKFy31Ba1G9nZZi/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2025-26)-ODD SEM', url: 'https://drive.google.com/file/d/1RvGVTwQiqsc2AcodFj8g7P76_Dy75B_8/view?usp=drivesdk' },
        { title: 'Mid Sem-1 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1SFx9P6EEyEu5fCwHrL6hMjnugNkodV2t/view?usp=drive_link' },
        { title: 'Mid Sem-2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1oBW8TZphAGA3jPf5PaiXzhr3CDkRX8cb/view?usp=drive_link' },
        { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1FefFp2xjatHyPb205qKyORxsdQKeqVDP/view?usp=drive_link' },
        { title: 'Complete All PYQs(2024-25)', url: 'https://drive.google.com/file/d/1Fc0AwAU84kbiYuOYfDScpiYCx9vfbV_I/view?usp=drive_link' },
        { title: 'Complete All PYQs (2023-24)', url: 'https://drive.google.com/file/d/1_mrm9SbSkJmqiWuRDT9pwkLAEjKv6e_n/view?usp=drive_link' }
      ]
    }
  ];

  const syllabus = {
    title: '1st Semester Syllabus',
    url: 'https://drive.google.com/file/d/1fZ_EtsAe94yc9-SM20b6P8-j_9pjdOkN/view?usp=drive_link'
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

  const handleDeleteCommunityNote = async (id: string, fileName: string) => {
    if (!user || !isOwner) return;
    if (!window.confirm('Delete this user-uploaded material?')) return;
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
            <p className="text-xs opacity-50 uppercase tracking-widest">B.Tech — 1st Semester</p>
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
                        onClick={() => handleDeleteCommunityNote(note.id, note.fileName || '')}
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
            onClick={() => navigate('/btech-notes/first-year')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to First Year
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">1st Semester Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            1st Semester<br />
            <span className="opacity-60">B.Tech Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. 1st Semester — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">Engineering Branches</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">1st Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Important Information */}
        <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl">
          <h3 className="text-base font-bold text-foreground mb-3">
            📚 Important Branch Information
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>✨ For Engineering branches (CSE, IT, EE, ET, CE, ME):</strong> The notes available under the 1st Semester section are applicable to your syllabus as well. Please refer to these for your studies.</p>
            <p><strong>✨ For Technology branches (CHE, BS-MS, FT, PT, PL, BE, BioTech, OT, LT):</strong> Your syllabus is currently available under the 2nd Semester section. Kindly download and study from there.</p>
            <p><strong>📋 Next semester:</strong> The syllabus will interchange between Engineering and Technology branches. Engineering students will follow the 2nd Semester materials, while Technology students will refer to the 1st Semester notes.</p>
          </div>
        </div>

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
              <p className="font-semibold text-foreground text-sm">1st Sem Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 1st Semester B.Tech</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(syllabus.url, syllabus.title)}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase py-2.5 px-5 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity"
            disabled={syllabus.url === '#'}
          >
            <Download className="h-3.5 w-3.5" /> Download Syllabus
          </button>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">Study Resources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => {
              const playlists = getSubjectPlaylists(subject.id);
              const isExpanded = expandedSubjects.includes(subject.id);

              return (
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
                    {subject.id !== 'pyqs' && (playlists.detailed.length > 0 || playlists.oneshot.length > 0 || (playlists.workshop && playlists.workshop.length > 0)) && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <button
                          className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => toggleSubjectExpansion(subject.id)}
                        >
                          <span className="flex items-center gap-1.5">
                            <Play className="h-3 w-3" /> Study Playlists
                          </span>
                          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                        {isExpanded && (
                          <div className="mt-2 space-y-1">
                            {playlists.detailed.length > 0 && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                              >
                                📚 Detailed ({playlists.detailed.length})
                              </button>
                            )}
                            {playlists.oneshot.length > 0 && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                              >
                                ⚡ One Shot ({playlists.oneshot.length})
                              </button>
                            )}
                            {subject.id === 'workshop' && playlists.workshop && playlists.workshop.length > 0 && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'workshop')}
                              >
                                🔧 Workshop ({playlists.workshop.length})
                              </button>
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
              );
            })}
          </div>
        </div>
      </div>
      <Footer />

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
        playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] || [] : []}
        type={selectedPlaylistType}
      />
    </div>
  );
};

export default FirstSemesterNotes;

import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FirstSemesterNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes } = useCommunityNotes('btech', 'ALL-1st Semester');
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDeleteCommunityNote = async (id: string, fileName: string) => {
    if (!user || user.email !== 'priyalkumar06@gmail.com') return;
    try {
      if (fileName) {
        const { error: storageError } = await supabase.storage.from('study-materials').remove([fileName]);
        if (storageError) console.error('Storage deletion error:', storageError);
      }
      const { error: dbError } = await supabase.from('notes').delete().eq('id', id);
      if (dbError) throw dbError;
      toast({ title: "Deleted securely", description: "Material removed successfully." });
      window.location.reload();
    } catch (error: any) {
      toast({ title: "Deletion failed", description: error.message, variant: 'destructive' });
    }
  };

  const location = useLocation();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 1st Semester B.Tech on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

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
      playlists: {
        detailed: [
          {
            title: 'Engineering Chemistry Detailed Playlist 1',
            url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jB7qJkp5qn35021QUBC8xP&si=kE_79WdmozBtD5ZS',
            recommended: false },
          {
            title: 'Engineering Chemistry Detailed Playlist 2',
            url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhBKXPlljxAHMCkdw7Lb_Qbn&si=4SmEbrEMClBJIb7M',
            recommended: false  },
          {
            title: 'Engineering Chemistry Detailed Playlist 3 (Best)',
            url: 'https://youtube.com/playlist?list=PLg2LVpcRrOF5BVVKG_DdYRPEaMx6C9XsW&si=wOvmSVvGHocZWco2',
            recommended: true }
        ],
        oneshot: [
          {
            title: 'Chemistry One Shot',
            url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhBKXPlljxAHMCkdw7Lb_Qbn&si=J_GtKZCpwqQCeZ42',
            recommended: false
          }
        ]
      },
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
        { title: 'Complete All PYQs (2023-24)', url: 'https://drive.google.com/file/d/1_mrm9SbSkJmqiWuRDT9pwkLAEjKv6e_n/view?usp=drive_link' },
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
              All notes for {subject.name} - 1st Semester B.Tech
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
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">

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
            onClick={() => navigate('/btech-notes/first-year')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Years
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            1st Semester B.Tech Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg mb-6 text-center">
            <strong>Only for Engineering branches (CSE, IT, EE, ET, CE, ME)</strong>
          </p>
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
                <p><strong>✨ For Engineering branches (CSE, IT, EE, ET, CE, ME):</strong> The notes available under the 1st Semester section are applicable to your syllabus as well. Please refer to these for your studies.</p>
                <p><strong>✨ For Technology branches (CHE, BS-MS, FT, PT, PL, BE, BioTech, OT, LT):</strong> Your syllabus is currently available under the 2nd Semester section. Kindly download and study from there.</p>
                <p><strong>📋 Next semester:</strong> The syllabus will interchange between Engineering and Technology branches. Engineering students will follow the 2nd Semester materials, while Technology students will refer to the 1st Semester notes.</p>
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
                1st Semester Syllabus
              </CardTitle>
              <CardDescription>
                Official syllabus for 1st semester B.Tech
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
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{subject.notes.length} Files</Badge>
                    <Button variant="outline" size="sm">View Notes</Button>
                  </div>
                  
                  {/* Study Playlists Section */}
                  {subject.id !== 'pyqs' && (
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
                          {subject.id === 'workshop' && getSubjectPlaylists(subject.id).workshop && getSubjectPlaylists(subject.id).workshop.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs h-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlaylistClick(subject.id, 'workshop');
                              }}
                            >
                              🔧 Workshop Videos ({getSubjectPlaylists(subject.id).workshop?.length || 0})
                            </Button>
                          )}
                          {getSubjectPlaylists(subject.id).detailed.length === 0 && 
                           getSubjectPlaylists(subject.id).oneshot.length === 0 && 
                           (!getSubjectPlaylists(subject.id).workshop || getSubjectPlaylists(subject.id).workshop.length === 0) && (
                            <p className="text-xs text-muted-foreground pl-2">Not available...</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
        playlists={getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] || []}
        type={selectedPlaylistType}
      />
    </div>
  );
};

export default FirstSemesterNotes;
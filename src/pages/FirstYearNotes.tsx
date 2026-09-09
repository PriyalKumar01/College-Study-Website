import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight,
  Trash2, ExternalLink, Search, BookOpen, Sparkles, Info,
  GraduationCap, MessageCircle, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

interface NoteItem {
  id?: string;
  title: string;
  url: string;
  recommended?: boolean;
  isCommunity?: boolean;
  fileName?: string;
  uploadedBy?: string;
  userName?: string;
  yearSession?: string;
}

interface PlaylistEntry {
  title: string;
  url: string;
  recommended?: boolean;
}

interface Subject {
  id: string;
  code?: string;
  name: string;
  fullName?: string;
  category: 'core' | 'computing' | 'engineering' | 'tech' | 'pyq_assign';
  icon: string;
  color: string;
  badge?: string;
  description?: string;
  syllabusUrl?: string;
  playlists: {
    detailed?: PlaylistEntry[];
    oneshot?: PlaylistEntry[];
    workshop?: PlaylistEntry[];
  };
  notes: NoteItem[];
}

const FIRST_YEAR_SEMESTER_TAGS = [
  'ALL-1st Semester',
  'ALL-2nd Semester',
  'ALL-1st Year',
  'ALL-First Year (All Subjects)',
  '1st Year',
  'btech-first-year'
];

const FirstYearNotes = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Fetch community notes for all 1st year semester tags so no uploads are missed
  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', FIRST_YEAR_SEMESTER_TAGS);

  const staticSubjects: Subject[] = [

    // ── COMPUTING & TECH ───────────────────────────────────────────────,

    {
      id: 'pps',
      code: 'DCS101',
      name: 'Programming for Problem Solving (PPS)',
      fullName: 'Programming for Problem Solving (C Language & Problem Solving)',
      category: 'computing',
      icon: '💻',
      color: 'bg-blue-600',
      badge: 'New Syllabus (2026)',
      description: 'Foundations of algorithms, flowcharts, and C programming for first-year engineers.',
      syllabusUrl: 'https://hbtu.ac.in/naac/CS/B.Tech.%201st%20Year%20Course%20C-06222026063347.pdf',
      playlists: {
        detailed: [
          { title: 'Programming for Problem Solving (C Language) - Gate Smashers', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiGmiGl_ndKXJ430Sc8rq4uO', recommended: true },
          { title: 'C Programming for Beginners - Neso Academy', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuF5QextdCSM', recommended: true },
        ],
        oneshot: [
          { title: 'C Programming Complete One Shot (10 Hours)', url: 'https://youtu.be/irqbmMNs2Bo', recommended: true },
        ]
      },
      notes: [
        { title: 'PPS Syllabus & Course Outline', url: 'https://hbtu.ac.in/naac/CS/B.Tech.%201st%20Year%20Course%20C-06222026063347.pdf', recommended: true },
        { title: 'Full C Programming & Problem Solving: Priyal Kumar (CSE"27)', url: 'https://drive.google.com/file/d/1Q5neO5-oIEwcVtmqzLNzHm5GQXzrixGx/view?usp=drivesdk', recommended: true },
        { title: 'PPS Unit-1 & 2 Notes (Algorithms & Basics)', url: 'https://drive.google.com/file/d/1BabE6apr738EHwcFiBT30ncC8sa-y7TB/view?usp=drivesdk' },
        { title: 'PPS Unit 3 Notes (Control Structures & Loops)', url: 'https://drive.google.com/file/d/1ALdaWqRVSTwAlrGKVQbjdqePsj3_PIlW/view?usp=drivesdk' },
        { title: 'PPS Unit 4 Notes (Arrays, Strings & Functions)', url: 'https://drive.google.com/file/d/1ZFGP8oM3ew0N6XkGsYu3XlJdrkgq35gL/view?usp=drivesdk' },
        { title: 'PPS Unit 5 Notes (Pointers, Structures & Files)', url: 'https://drive.google.com/file/d/1NkhoqObE7MulcpapaBgKARCs63b_Vxci/view?usp=drivesdk' },
        { title: 'ICS UNIX / Linux Basics Notes', url: 'https://drive.google.com/file/d/1tPZekj8Nhbt3m3N_wJY0YFDXUq1ALrtj/view?usp=drivesdk' },
        { title: 'Full Programming Notes: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/18OszxRCXnRxCzMOk6lmOPO0oCx_9zvP1/view?usp=drivesdk' },
      ]
    },,

    {
      id: 'python',
      code: 'DCS201',
      name: 'Python Programming',
      fullName: 'Python Programming (Core Language, Data Structures & Scripting)',
      category: 'computing',
      icon: '🐍',
      color: 'bg-emerald-600',
      badge: 'New Syllabus (2026)',
      description: 'Modern Python programming fundamentals, syntax, control flows, functions, and modules.',
      syllabusUrl: 'https://hbtu.ac.in/naac/CS/B.Tech.%201st%20Year%20Course%20C-06222026063347.pdf',
      playlists: {
        detailed: [
          { title: 'Python Programming Complete (CSE Curriculum)', url: 'https://youtube.com/playlist?list=PLvu-LC7buiaVdESLhxGj0BDQMjSLIEiSL&si=_GpcglKz_pZ78pt_', recommended: true },
          { title: 'Python for Beginners (Full Course) - CodeWithHarry', url: 'https://youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg' },
        ],
        oneshot: [
          { title: 'Python Programming One Shot (Curated)', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8vu2RWHdPsuRNRAcd89-eaz&si=dTvCvGhRbf7esBPJ', recommended: true },
          { title: 'Python One Shot Complete Course (YouTube)', url: 'https://youtu.be/7wnove7K-ZQ' },
        ]
      },
      notes: [
        { title: 'Python Syllabus & Course Outline', url: 'https://hbtu.ac.in/naac/CS/B.Tech.%201st%20Year%20Course%20C-06222026063347.pdf', recommended: true },
        { title: 'Python Full Handwritten Notes: Priyal Kumar (CSE"27)', url: 'https://drive.google.com/file/d/1_VF2ORzst49Yu5BtYdhSkTbw16Wge2rE/view?usp=drive_link', recommended: true },
        { title: 'PP Best Revision Notes (CSE Standard)', url: 'https://drive.google.com/file/d/1ovVLnKwYM1vsYSeAk0UNEqcF-lU7otVH/view?usp=drive_link', recommended: true },
        { title: 'Important PP Practice Programs', url: 'https://drive.google.com/file/d/13viyP84UNb_1UfGWPUnqOapXUSq2jcMz/view?usp=drive_link', recommended: true },
        { title: 'PP Comprehensive Lecture Notes', url: 'https://drive.google.com/file/d/14MsO70g821_IZrtXEp8bezOKnte8Enak/view?usp=drive_link', recommended: true },
        { title: 'PP Complete Lab Practical File', url: 'https://drive.google.com/file/d/1-Vb1JsaRf3VnonTH80EtYzg2W53n5HV5/view?usp=drive_link' },
        { title: 'PP Sessional Assignment 1 Set', url: 'https://drive.google.com/file/d/1-dydD1SBZZ7Grggn3whZwA4Fbfo-xupA/view?usp=drive_link' },
        { title: 'Python Comprehensive Handout & Cheatsheet', url: 'https://drive.google.com/file/d/1ZiIw217rbI2IKt6HO_3WePIQ5caos3Od/view?usp=drivesdk' },
      ]
    },

    // ── CORE SCIENCES & MATHS ──────────────────────────────────────────,

    {
      id: 'math',
      code: 'DMA101',
      name: 'Mathematics-I',
      fullName: 'Engineering Mathematics-I',
      category: 'core',
      icon: '📐',
      color: 'bg-green-600',
      description: 'Differential calculus, multiple integrals, vector calculus, and matrices.',
      playlists: {
        detailed: [
          { title: 'Unit: 1 Successive Differentiation (Playlist 1)', url: 'https://youtube.com/playlist?list=PLNKD1qB9pptuRMEOXm3qVok9RST30R_e5&si=JtcKkBubUPUSd7bN', recommended: true },
          { title: 'Unit: 1 Successive Differentiation (Playlist 2)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfLLAU6Hxi0C_TnrZeqgbJMJ&si=9-MPIw5HXtpIaoKM' },
          { title: 'Unit: 1 Improper Integral', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfL-2NhraOYEYevl9LTqDaCU&si=zcyygF0jIbqnjPBq' },
          { title: 'Engineering Mathematics-I Unit 2', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9hsRRQi1X_4kn6Lw6K_-9cq&si=XXROQe9OYuMetPj7' },
          { title: 'Engineering Mathematics-I Unit 3', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9hvSQJ1XqJIcxZPyo5sNwj_&si=eEz87z83Y37Gege9' },
          { title: 'Engg Math-I Unit 4 (Playlist 1)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfI7Ebw_j-Vy8YKHdbHKP9am&si=kb0fRKlpH6cfcoTE' },
          { title: 'Engg Math-I Unit 4 (Playlist 2)', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jPn19ja8WFf6VRlPspl4eQ&si=6geutTvZ9jmxtliq', recommended: true },
          { title: 'Engg Math-I Unit 5 (Playlist 1)', url: 'https://youtube.com/playlist?list=PLIgDtce9BR0dZv1aZwVTmuWXc_vJPbB3q&si=U6Mwcg0_ZkXfilGh' },
          { title: 'Engg Math-I Unit 5 (Playlist 2)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfLewoQPYjgg7SMBLjSV704v&si=7O6fCxdOL9LIHAid', recommended: true }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Engineering Math Handwritten Notes', url: 'https://drive.google.com/file/d/1TZ8L0xmAQju60MFrkJ6ixvhJXEPcuNnh/view?usp=drive_link', recommended: true },
        { title: 'Engineering Math Book - BS Grewal', url: 'https://drive.google.com/file/d/1_ofPrUVZXyrwggNv8WeJTX1DeoHMqldX/view?usp=drive_link', recommended: true },
        { title: 'LPP Graphical Method Notes', url: 'https://drive.google.com/file/d/1_sOUHSZ4dfLHW8cKLd_n0UQoC427cSBi/view?usp=drive_link' }
      ]
    },,

    {
      id: 'physics',
      code: 'DPH101',
      name: 'Engineering Physics',
      fullName: 'Physics (Optics, Quantum, Electromagnetics & Semiconductors)',
      category: 'core',
      icon: '🔬',
      color: 'bg-indigo-600',
      description: 'Wave optics, laser, quantum mechanics, electromagnetic theory, and semiconductor physics.',
      playlists: {
        detailed: [
          { title: 'Engineering Physics Complete (Best)', url: 'https://youtube.com/playlist?list=PL3qvHcrYGy1u112gfsHycdWaLTVRt8ame&si=3MrtW-X9PPCjeexh', recommended: true },
          { title: 'Engineering Physics Comprehensive', url: 'https://youtube.com/playlist?list=PLg2LVpcRrOF4prkeAuDqOkHYubzW4meNs&si=3uUy122XB8m4ehot' },
          { title: 'Engineering Physics Advanced', url: 'https://youtube.com/playlist?list=PLEYBvmdYQH_b3GqXdz2Z377qWNUTOQPCC&si=Zx9BNaMlGapFSC8N' }
        ],
        oneshot: [
          { title: 'Engineering Physics One Shot (Best)', url: 'https://youtube.com/playlist?list=PLkojphh8hBnah-09sz2BzQo4PpjKmZeii&si=hoEBYHozo_qWmu5f', recommended: true },
          { title: 'LASER Topic One Shot', url: 'https://youtu.be/Xy67j-KZytY?si=pIp14jVwhdOfZL5W' }
        ]
      },
      notes: [
        { title: 'Dielectric Materials Notes', url: 'https://drive.google.com/file/d/1RfW4S61Eqg8WxD-unbh_7se3qhdIoS70/view?usp=drive_link' },
        { title: 'Electromagnetic Theory Notes', url: 'https://drive.google.com/file/d/1kUlhq50o1PBRfrCHBQrFs9zf2pupHOWU/view?usp=drive_link' },
        { title: 'Engineering Physics Handwritten Notes', url: 'https://drive.google.com/file/d/1VzZEDMbinHRr_QUcK1YrWBwq-nRhDera/view?usp=drive_link', recommended: true },
        { title: 'LASER Topic Notes', url: 'https://drive.google.com/file/d/1RijFS5VF7vdaW6D7UF_ymcr6XOPt5-A1/view?usp=drive_link' },
        { title: 'Nanomaterials Notes', url: 'https://drive.google.com/file/d/1Rt82c5VWLhL5HfyZka68A-Zd7OB1geIb/view?usp=drive_link' },
        { title: 'Physics Lab Experiment (1-13)', url: 'https://drive.google.com/file/d/1YYafb_TK1gWabj3kRC34wUn_Rztt-piI/view?usp=drive_link', recommended: true },
        { title: 'Unit 1 Notes', url: 'https://drive.google.com/file/d/1kNPYkJ-KIWNAsqgY5UpmphraTSlTLUDI/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1RgAj7_fhV20RT88XGDHK_o7S7fLCKFsL/view?usp=drive_link' },
        { title: 'Quantum Mechanics Notes', url: 'https://drive.google.com/file/d/1RtnZADoZD40qQkEp5ARa1DldZiafchnr/view?usp=drive_link', recommended: true },
        { title: 'Semiconducting Materials Notes', url: 'https://drive.google.com/file/d/1Ruy7Ij_Mq_UImQnhKCLKvJ_WBg5Cj7h5/view?usp=drive_link' },
        { title: 'Semiconductor - Unit 4 Notes', url: 'https://drive.google.com/file/d/1kKqBU2pqeqZOFCdimRFOjnxkj9WP2L6F/view?usp=drive_link' },
        { title: 'Statistical Mechanics Notes', url: 'https://drive.google.com/file/d/1S1ehd1Ri0K_HHNpPur7Z8xbHLVMxo80k/view?usp=drive_link' }
      ]
    },,

    {
      id: 'chemistry',
      code: 'DCY201',
      name: 'Engineering Chemistry',
      fullName: 'Chemistry (Organic, Polymers, Electrochemistry & Spectroscopic Techniques)',
      category: 'core',
      icon: '🧪',
      color: 'bg-emerald-600',
      description: 'Chemical bonding, reaction mechanisms, coordination compounds, and industrial polymers.',
      playlists: {
        detailed: [
          { title: 'Engineering Chemistry Complete', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jB7qJkp5qn35021QUBC8xP&si=kE_79WdmozBtD5ZS', recommended: true },
          { title: 'Chemistry Concepts Part 1', url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhBKXPlljxAHMCkdw7Lb_Qbn&si=4SmEbrEMClBJIb7M' },
          { title: 'Advanced Chemistry Topics', url: 'https://youtube.com/playlist?list=PLg2LVpcRrOF5BVVKG_DdYRPEaMx6C9XsW&si=wOvmSVvGHocZWco2' }
        ],
        oneshot: [
          { title: 'Chemistry One Shot', url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhBKXPlljxAHMCkdw7Lb_Qbn&si=J_GtKZCpwqQCeZ42', recommended: true }
        ]
      },
      notes: [
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/file/d/1Kr7Cs7O-VHKYnHu5W2TjOWX-ZVNGdHVF/view?usp=drivesdk' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/file/d/138hWk93eecUFZSuV5QeH8_JngRdaVwg1/view?usp=drivesdk' },
        { title: 'Unit-4 Reaction Mechanism Notes', url: 'https://drive.google.com/file/d/1qK9pGG8Vof78o-1v5aV48duAyoyHx0CF/view?usp=drivesdk' },
        { title: 'Unit-5 Notes', url: 'https://drive.google.com/file/d/1SKb7fg3lcyhT5lp0OWSvqmFtJYOEBei2/view?usp=drivesdk' },
        { title: 'Lab Related Theory', url: 'https://drive.google.com/file/d/1pDN8Id0uViXtk5GeV6DRP52NnOB_zGfn/view?usp=drivesdk' },
        { title: 'Coordination & Compound', url: 'https://drive.google.com/file/d/1RZ_mEFT7IjEgSSJl4_Rt71ZhT7EEdWNX/view?usp=sharing' },
        { title: 'Chemistry Practical File', url: 'https://drive.google.com/file/d/1ovxq8fHzhGVIYnYwS3L3hYRnqpjCYTqa/view?usp=drive_link', recommended: true },
        { title: 'Engg. Chemistry Lecture Notes: Priyal Kumar (CSE"27)', url: 'https://drive.google.com/file/d/1W5Sj-qYeWSaegcB2WUcKXymRQtOigM1f/view?usp=drive_link', recommended: true },
        { title: 'Nomenclature Notes', url: 'https://drive.google.com/file/d/1ROFkIOZ_PbPQYf1LcW49EPg-F78Zqjwz/view?usp=drive_link' },
        { title: 'Polymer Notes', url: 'https://drive.google.com/file/d/1RSder5E5rNZ3Nkn5ToQkt_8E8WJiDG_B/view?usp=drive_link' },
        { title: 'Full Chemistry Notes: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/1SU4yAUpxOcw_YPEvnnakgLJAqMlTcLBi/view?usp=drivesdk', recommended: true }
      ]
    },

    // ── ENGINEERING SCIENCES ───────────────────────────────────────────,

    {
      id: 'electrical',
      code: 'DEE101',
      name: 'Basic Electrical Engineering (BEE)',
      fullName: 'Basic Electrical Engineering (Circuits, Machines, Transformers)',
      category: 'engineering',
      icon: '⚡',
      color: 'bg-amber-500',
      description: 'DC circuits, AC circuits, magnetic circuits, single-phase transformers, and electrical machines.',
      playlists: {
        detailed: [
          { title: 'Electrical Engineering Complete (Best)', url: 'https://youtube.com/playlist?list=PL3qvHcrYGy1v2kJX4SSsurE3_GdVe0ZD5&si=LN9LSPXI_zFjSjXS', recommended: true },
          { title: 'Electrical Engineering Comprehensive (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCSOqr7-rUz6-GtdTAjlvul&si=dJR9but1DQvKc9sC', recommended: true },
          { title: 'Electrical Engineering Advanced', url: 'https://youtube.com/playlist?list=PL9RcWoqXmzaLTYUdnzKhF4bYug3GjGcEc&si=yZMlK1LpsZk6L3Eo' }
        ],
        oneshot: [
          { title: 'Electrical Engineering One Shot', url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhD41z0I7qFs1jcr1K40IGsy&si=f2nvJs_Zg1OCthgE', recommended: true }
        ]
      },
      notes: [
        { title: 'Basic Electrical Engineering Book', url: 'https://drive.google.com/file/d/1S2t5UuoQF8vOfr1C9Zy53BfpXhd0gzeB/view?usp=drive_link', recommended: true },
        { title: 'IEE Full Handwritten Notes', url: 'https://drive.google.com/file/d/1VtdV8ZT2I1_dtD8xyUgeor-4G_01RHm8/view?usp=drive_link', recommended: true },
        { title: 'Electrical Book - C.L Wadhwa', url: 'https://drive.google.com/file/d/1k5EBek40Ou-BXrSwYtLcy8RmW9k0qFbH/view?usp=drive_link' },
        { title: 'Electrical File PDF', url: 'https://drive.google.com/file/d/1Wj06KV7jXwpONsvFpRd2T79776mwfDv5/view?usp=drive_link' },
        { title: 'Unit 1 Notes', url: 'https://drive.google.com/file/d/1SAYkzsR88yrvU8yTQLdQ78N8zM3cefN2/view?usp=drive_link' },
        { title: 'Unit 1 Handwritten Notes', url: 'https://drive.google.com/file/d/1jcfwsClNa0PnIdVM21VxBuXPnBT7PAbz/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1WguCYHHNsnbB0_T3EQsyzv3H2FlDVTGk/view?usp=drive_link' },
        { title: 'Unit 3 Handwritten Notes', url: 'https://drive.google.com/file/d/1_ypFDDG_e7GoMF2dzWSHhiDhFW4yWyyD/view?usp=drive_link' },
        { title: 'Unit 4 Handwritten Notes', url: 'https://drive.google.com/file/d/1_yPLVG8DQuKMzITmRJkh2se_wOdYhbEm/view?usp=drive_link' },
        { title: 'Unit 5 DC Machine Notes', url: 'https://drive.google.com/file/d/1WKvvTkqGPDMPmSP_nC3mM7qvkKZdlTpN/view?usp=drive_link' },
        { title: 'Unit 5 Handwritten Notes', url: 'https://drive.google.com/file/d/1_yiMvCtTgCTvnCIVnc_UrxnsGu5OeUnO/view?usp=drive_link' },
        { title: 'Transformer Notes', url: 'https://drive.google.com/file/d/1W_bGwn702donDpAde0Qznxcdkl-2GtRY/view?usp=drive_link' }
      ]
    },,

    {
      id: 'graphics',
      code: 'DCE101',
      name: 'Engineering Graphics & Design',
      fullName: 'Engineering Graphics & Design (Projections, Sections, CAD Basics)',
      category: 'engineering',
      icon: '📐',
      color: 'bg-teal-600',
      description: 'Orthographic projections, isometric views, solids, sections, and engineering dimensioning.',
      playlists: {
        detailed: [
          { title: 'Engineering Graphics Complete', url: 'https://youtube.com/playlist?list=PL9RcWoqXmzaJT-fliqTSwUjWU4zCX_H2A&si=7Nqyi7RZvzTG4FDx', recommended: true },
          { title: 'Plane Scale', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiDHez0vbl2L-BlxvOh7LKbC&si=C21LkKsmpznrnRXe' },
          { title: 'Projection of Straight Line', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiC9wFOTiDp8ekWAf40BwSct&si=wXPd0mqkRJnPObY1', recommended: true },
          { title: 'Orthographic Projection', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBpnIOK5r3KXdfFOVzGHJSt&si=T6Bdal3q7No8wIAH', recommended: true },
          { title: 'Projection of Solid', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiA9qy-OWuoEYoXsu7lsSaE9&si=2JhDN_Sdjn60mS-y' },
          { title: 'Projection of Plane', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBVR22X01vcnvVCuQIklXGx&si=1xN1LyxHTM-GtzvY' },
          { title: 'Isometric View', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCf-raL06kSCeqR8h61eYIC&si=xd00ke4OruPzCLu1', recommended: true },
          { title: 'Section of Solid', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBrAkdOhEvkmVPs2UtwfGao&si=LVKO8cnvQO0JVmOZ' },
          { title: 'Parabola', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBeWnVOMzE43WvHttggwr9C&si=McxrA0WQVn_TO6rM' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Engineering Graphics Diagram', url: 'https://drive.google.com/file/d/1auehP9w9Ot4CIP6QVzjE6KJk48GJHX_s/view?usp=drive_link', recommended: true },
        { title: 'Engineering Graphics Notes', url: 'https://drive.google.com/file/d/1X-847TSkSxdsvIi1y8mJtPHD99ACtiCl/view?usp=drive_link', recommended: true },
        { title: 'Engineering Graphics Book', url: 'https://drive.google.com/file/d/1hY68Wif6LCQUipraYXIT_utPQvzsKK_F/view?usp=drive_link' },
        { title: 'Isometric Projection Notes', url: 'https://drive.google.com/file/d/1hZYat1B9h-8TXO77vIyXSpydsWmg1uK5/view?usp=drive_link' },
        { title: 'Orthographic View Notes', url: 'https://drive.google.com/file/d/1hc0lIdW75OUQA9eKVkIgxJd6S-AmJ1e3/view?usp=drive_link' },
        { title: 'Projection of Straight Line Notes', url: 'https://drive.google.com/file/d/1hdZ9go7GiT69tLqh4N8SX-HILNKKN0s3/view?usp=drive_link' },
        { title: 'Rules of Dimensions', url: 'https://drive.google.com/file/d/1a5toVeLKoFgUkEesqJJ0qnvCgeC1svAt/view?usp=drive_link' },
        { title: 'Section of Solid Notes', url: 'https://drive.google.com/file/d/1a-MdUdcohktnqRpG9AdFtDuSwfXvYNPS/view?usp=drive_link' }
      ]
    },,

    {
      id: 'mechanics',
      code: 'DME101/201',
      name: 'Basic Engineering Mechanics (BEM)',
      fullName: 'Basic Engineering Mechanics (Statics, Dynamics & Friction)',
      category: 'engineering',
      icon: '⚙️',
      color: 'bg-blue-600',
      description: 'Coplanar force systems, friction, centroid, moment of inertia, beams, and trusses.',
      playlists: {
        detailed: [
          { title: 'Friction (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiAcwK1Fz4n7KVF7yUlBlqaC&si=vDV-TMhH1k2QKl4N', recommended: true },
          { title: 'Equilibrium (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiAAqXRqpIPTEgf_KcblFrPx&si=FHwwoufHVAl6jxIv', recommended: true },
          { title: 'Beam (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCAnu7Rjta7vvNhoJZv_gAt&si=FDtaMcLkqDY-mDgk', recommended: true },
          { title: 'Truss (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBwwGZKmNzKJIRh4E0G9cfx&si=gdrUdACUxxxP9fdQ', recommended: true },
          { title: 'Centroid and Center of Gravity (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBVYBMlotEZiS6ivj147brP&si=qMEyTHCEvwRosEaS', recommended: true },
          { title: 'Lami\'s Theorem (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiDEfVIPV-IsxlZGh55cxL2J&si=lDjE-PrMTbELnfU2', recommended: true },
          { title: 'Moment & Couple (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiB8ys9x_dWnPLqhuI3T2nTG&si=SQKM4cbUDlaW129h', recommended: true },
          { title: 'Impact and Impulse', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCT6GSB-7AZvsTqVstHyPGD&si=PzWE8m3K_zSZ7cSh' },
          { title: 'Moment of Inertia (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCfqJSWygjzY_EjSJeoEJ2x&si=rbv12__4tamLxC1Q', recommended: true },
          { title: 'Product of Inertia', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiD23ld8GO7BHJ1nT_NWmkCP&si=kP-aDJXhR2dLh_4Y' },
          { title: '2D Force System (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiB4wJ9KwN9LzBCawifVEKc4&si=RU2-a5UxL8AG86fV', recommended: true }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Unit 1 Notes', url: 'https://docs.google.com/document/d/1SbrdyYktEpHGJ271gbl-bbbB9EvmlLI2/edit?usp=drive_link&ouid=114822883182552949712&rtpof=true&sd=true' },
        { title: 'Unit 2 & 3 Combined Handwritten Notes', url: 'https://drive.google.com/file/d/1_XgDXt6FY0NBUktGfQDxXWFOdSY8LEOU/view?usp=drive_link', recommended: true },
        { title: 'Complete Mechanical Engineering Handwritten Notes', url: 'https://drive.google.com/file/d/1WDJbOvvQ68rFrs0kAQnzXNOACmEAe7-2/view?usp=drive_link', recommended: true },
        { title: 'Engineering Mechanics Book - RK Bansal', url: 'https://drive.google.com/file/d/1SDkvZJ1JciXW_yXjwVBZhI7mUVRpwpMp/view?usp=drive_link', recommended: true }
      ]
    },,

    {
      id: 'electronics',
      code: 'DET201',
      name: 'Basic Electronics Engineering (BET / IET)',
      fullName: 'Basic Electronics Engineering / Introduction to Electronics Tech',
      category: 'engineering',
      icon: '📻',
      color: 'bg-amber-600',
      description: 'Semiconductor diodes, transistors, amplifiers, operational amplifiers, and digital logic gates.',
      playlists: {
        detailed: [
          { title: 'IET Complete Course (Best)', url: 'https://youtube.com/playlist?list=PL0c0N7xv8s06iL0pUc8VXGH_v-vbGOSv4&si=D7XeqGctlD86CpnA', recommended: true },
          { title: 'Digital Electronics Concepts', url: 'https://youtube.com/playlist?list=PL3qvHcrYGy1uF5KAGntUITTJ85Dm3Dtdy&si=1AvreP0F8uaS4Nyw' }
        ],
        oneshot: [
          { title: 'Unit 3 One Shot', url: 'https://youtu.be/wVL5X4DSVQo?si=VUANHiiHJpQnvDiu' },
          { title: 'Unit 5 One Shot', url: 'https://youtu.be/czUrC3t3zWM?si=rqLOu6D6XrbouDmb' },
          { title: 'Digital Electronics Full (6 hrs)', url: 'https://youtu.be/pHNbm-4reIc?si=vm26Px3CwVDjkaAZ', recommended: true }
        ]
      },
      notes: [
        { title: 'IET Handwritten Notes', url: 'https://drive.google.com/file/d/1Ps9wD-x7CZLNy-bY8HmeqDy7Uytp6flq/view?usp=drive_link', recommended: true }
      ]
    },,

    {
      id: 'civil',
      code: 'DCE201',
      name: 'Environmental Science & Engineering (EES / Civil)',
      fullName: 'Environmental Science & Engineering / Civil Engineering Fundamentals',
      category: 'engineering',
      icon: '🌱',
      color: 'bg-emerald-600',
      description: 'Building materials, surveying, environmental ecology, pollution control, and sustainable technology.',
      playlists: {
        detailed: [
          { title: 'Civil Engineering Complete (Best)', url: 'https://youtube.com/playlist?list=PLEYBvmdYQH_Z3sFfITPeEv-qg3sgHVIqC&si=p7O3LMHX28BDkQxU', recommended: true },
        ],
        oneshot: [
          { title: 'Civil Engineering One Shot', url: 'https://youtu.be/o-oCyZtCqR0?si=tVpcOQdTAzSSz82u' }
        ]
      },
      notes: [
        { title: 'Civil Engineering Lecture Notes', url: 'https://drive.google.com/file/d/1QNnJexZgJLWCIIDFLlxKIjmEcnf6Q5Ld/view?usp=drive_link', recommended: true },
        { title: 'Bitumen Notes', url: 'https://drive.google.com/file/d/1YDuklfVCl1EsZYbIx6prmQWjUsl1oflv/view?usp=drive_link' },
        { title: 'Bricks & Stone', url: 'https://drive.google.com/file/d/1Y23Skew2v5zv-Boph-77TdiChtsqjiJR/view?usp=drive_link' },
        { title: 'Cement & Concrete Notes', url: 'https://drive.google.com/file/d/1YAOneWG4NSZkZ_3quAQHG4fsmIYPJran/view?usp=drive_link' },
        { title: 'Highway Topic Notes', url: 'https://drive.google.com/file/d/1YXMgMQrZYnphcJ7zbR6_N9ICBtflVGAV/view?usp=drive_link' },
        { title: 'Railway & Airport Notes', url: 'https://drive.google.com/file/d/1Y_Qm-e4uW2nFE0Zr_AQOPaXS4A8ohLI_/view?usp=drive_link' },
        { title: 'Soil Mechanism Notes', url: 'https://drive.google.com/file/d/1YGC7dH5Kqf7bDe7bjdyEJ5zxkLu1fkIU/view?usp=drive_link' },
        { title: 'Surkhi & Stone Dust Notes', url: 'https://drive.google.com/file/d/1YKXTKcL0ozY6OCtOC1gocUgRxJpUct_c/view?usp=drive_link' },
        { title: 'Surveying Notes', url: 'https://drive.google.com/file/d/1Xx7kvJhCV5GQnKe9iWi9hWlOVyjj5Wuz/view?usp=drive_link' },
        { title: 'Unit 1 Notes', url: 'https://drive.google.com/file/d/1XxSq3_HJB3DnNUwjepBME6UjB9F1xNWj/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1YV3-xqPi-uERYjZ4XfXH6lYTqjmJr_qm/view?usp=drive_link' }
      ]
    },,

    {
      id: 'workshop',
      code: 'DME202',
      name: 'Digital Fabrication & Workshop Practices',
      fullName: 'Digital Fabrication / Workshop / Manufacturing Practices',
      category: 'engineering',
      icon: '🔨',
      color: 'bg-rose-600',
      description: 'Hands-on practicals in carpentry, fitting, foundry, blacksmithy, and modern digital fabrication.',
      playlists: {
        detailed: [],
        oneshot: [],
        workshop: [
          { title: 'Foundry Workshop Demo', url: 'https://youtu.be/RIwEspSqY1s?si=CdRIS_VaiH1HOG7w', recommended: true },
          { title: 'Machine Workshop Demo', url: 'https://youtu.be/as-H6RX3lr8?si=yEUw-Z9jjijM_AsY', recommended: true },
          { title: 'Fitting Workshop Demo', url: 'https://youtu.be/g3f9m24cx0s?si=ZQEF31XxTZolfvwX' },
          { title: 'Carpentry Workshop Demo', url: 'https://youtu.be/xCKK4l_q8vU?si=UxuRYis-lBCkcs0k' }
        ]
      },
      notes: [
        { title: 'Workshop File Part 1', url: 'https://drive.google.com/file/d/1W2cNn_GykLkrO3gvDBvRhRgw5IwkzYy8/view?usp=drive_link' },
        { title: 'Workshop File Part 2', url: 'https://drive.google.com/file/d/1W3OE6MjtYXe5Ln3_jaztoEvUf9FoIzKE/view?usp=drive_link' },
        { title: 'Complete Workshop File: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/1-xXwVfGrvvfLpanOo8YsnCHeVyKSS2Dd/view?usp=drivesdk', recommended: true },
        { title: 'Workshop Material Science Notes', url: 'https://drive.google.com/file/d/1W8lcNGdqsP5sI3h5ey3ORYBTdDJijFF7/view?usp=drive_link' },
        { title: 'Material Science Additional PDF 1', url: 'https://drive.google.com/file/d/1_YgthLZ625NzKcnUYJIzx8lvuvtpsCZ_/view?usp=drive_link' },
        { title: 'Material Science Additional PDF 2', url: 'https://drive.google.com/file/d/1_a9SNbiP_M2yN4ZCwbC9xHBoOcBhYGI_/view?usp=drive_link' },
        { title: 'Blacksmithy Workshop Book', url: 'https://drive.google.com/file/d/1h6bKd9giFf2P9A0rIKbJvJ2vn4qOqzQk/view?usp=drivesdk' },
        { title: 'Complete Workshop Notes: Ananya (CSE"28)', url: 'https://drive.google.com/file/d/1YBdb4IWdChFR0kNt6vCa7CjP8Xr-Mg8N/view?usp=drivesdk', recommended: true }
      ]
    },

    // ── HUMANITIES, ETHICS & COMMUNICATION ─────────────────────────────,

    {
      id: 'uhv',
      code: 'DHS101',
      name: 'Universal Human Values (UHV)',
      fullName: 'Universal Human Values (Understanding Harmony & Human Conduct)',
      category: 'core',
      icon: '🕊️',
      color: 'bg-violet-600',
      badge: 'New Syllabus (2026)',
      description: 'Value education, harmony in self, family, society, nature, and professional ethics.',
      playlists: {
        detailed: [
          { title: 'Universal Human Values (UHV) Complete Lectures', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8uQ6B-qZtYm-b3e3rO8g76Y', recommended: true }
        ],
        oneshot: []
      },
      notes: [
        { title: 'UHV Foundation & Harmony Course Guide', url: 'https://drive.google.com/file/d/1STrVBwHdz4WLytQ-KxO4SebJwX0jh6jM/view?usp=drive_link', recommended: true },
        { title: 'Human Conduct & Professional Ethics Handout', url: 'https://drive.google.com/file/d/1k9DQuSHvbBc_-iB8RPC4g1MZJgHmFBOO/view?usp=drive_link' }
      ]
    },,

    {
      id: 'pc',
      code: 'DHS102 / DHS203',
      name: 'English for Technical Writing / Communication Skills',
      fullName: 'English for Technical Writing & Communication Skills (PC)',
      category: 'core',
      icon: '💬',
      color: 'bg-purple-600',
      description: 'Grammar, technical writing, professional presentation, reading comprehension, and literature.',
      playlists: {
        detailed: [
          { title: 'Professional Communication Complete', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8u7yPX99x1TCuyV4aWulD1X&si=lCMEpcKJ7uXmkBKp', recommended: true }
        ],
        oneshot: []
      },
      notes: [
        { title: 'One Word Substitution Important PDF', url: 'https://drive.google.com/file/d/1k9DQuSHvbBc_-iB8RPC4g1MZJgHmFBOO/view?usp=drive_link', recommended: true },
        { title: 'PC Handwritten Notes', url: 'https://drive.google.com/file/d/1STrVBwHdz4WLytQ-KxO4SebJwX0jh6jM/view?usp=drive_link', recommended: true },
        { title: 'PC Old Notes', url: 'https://drive.google.com/file/d/1iFWlH6L2YJHnH0IxLsZYH-duRJ5wl8u0/view?usp=drive_link' },
        { title: 'Renunciation Story PDF', url: 'https://drive.google.com/file/d/1hn_7lGRiVyuCuQbo1IPnVROIj8DYfZ7p/view?usp=drive_link' },
        { title: 'The Barber\'s Trade Union Story PDF', url: 'https://drive.google.com/file/d/1i2ph1pYGL7KXNcOxNu6WjrhL5Sl5LTi1/view?usp=drive_link' },
        { title: 'The Eyes Are Not Here Story PDF', url: 'https://drive.google.com/file/d/1i9sA1LbAtppEyEjA9YUUmr4rrZXA9h7K/view?usp=drive_link' },
        { title: 'The Lament Story PDF', url: 'https://drive.google.com/file/d/1hvnLA7_Nb9rfRHHvz6eaeGRsPxcE7_cz/view?usp=drive_link' },
        { title: 'Unit 5 Essay Writing PDF', url: 'https://drive.google.com/file/d/1hiZrrMy7d88ZGJcK1hXENVlCuEmaaBZe/view?usp=drive_link' }
      ]
    },

    // ── TECHNOLOGY BRANCH INTRODUCTORY COURSES ────────────────────────,

    {
      id: 'food_tech',
      code: 'IFT101',
      name: 'Introduction to Food Technology (IFT)',
      fullName: 'Introduction to Food Technology / Food Preservation Basics',
      category: 'tech',
      icon: '🥫',
      color: 'bg-amber-600',
      badge: 'Tech Branch',
      description: 'Introductory course for Food Technology (FT) first-year students.',
      playlists: {
        detailed: [],
        oneshot: [
          { title: 'ICT Introduction Video 1', url: 'https://youtu.be/6ptZr9VRxPs?si=IRMWuVFfR4-Yj6rM' }
        ]
      },
      notes: [
        { title: 'Food Technology (ICT Core Notes)', url: 'https://drive.google.com/file/d/1Wd9BbM9BYNAtNehllNTXo_7PxVDfX5P8/view?usp=drivesdk', recommended: true },
        { title: 'General Chemical Tech Notes: Priyal Kumar', url: 'https://drive.google.com/file/d/1PzevLkCwsQBQh_bZDwZnPgdWA6Qqv_5m/view?usp=drivesdk' }
      ]
    },,

    {
      id: 'paint_tech',
      code: 'IPT101',
      name: 'Introduction to Paint Technology (IPT)',
      fullName: 'Introduction to Paint & Surface Coating Technology',
      category: 'tech',
      icon: '🎨',
      color: 'bg-pink-600',
      badge: 'Tech Branch',
      description: 'Introductory course for Paint Technology (PT) first-year students.',
      playlists: {
        detailed: [],
        oneshot: [
          { title: 'ICT Introduction Video 2', url: 'https://youtu.be/Pg_9kXV1lXg?si=Z-jfUI57nI_c8_2w' }
        ]
      },
      notes: [
        { title: 'Paint Technology (ICT Core Notes)', url: 'https://drive.google.com/file/d/1Q4LDUfRyXzSwN9PCrQ8zN7D9sc-xeAt4/view?usp=drivesdk', recommended: true },
        { title: 'General Chemical Tech Notes: Priyal Kumar', url: 'https://drive.google.com/file/d/1PzevLkCwsQBQh_bZDwZnPgdWA6Qqv_5m/view?usp=drivesdk' }
      ]
    },,

    {
      id: 'leather_tech',
      code: 'ILT101',
      name: 'Introduction to Leather Technology (ILT)',
      fullName: 'Introduction to Leather & Footwear Technology',
      category: 'tech',
      icon: '👞',
      color: 'bg-yellow-700',
      badge: 'Tech Branch',
      description: 'Introductory course for Leather & Footwear Technology (LFT/LT) first-year students.',
      playlists: {
        detailed: [],
        oneshot: [
          { title: 'ICT Introduction Video 3', url: 'https://youtu.be/mbdl-Fh5ALg?si=1JQlwxU9UroBsgL8' }
        ]
      },
      notes: [
        { title: 'Leather Technology (ICT Core Notes)', url: 'https://drive.google.com/file/d/1Fv9uAi3qeM8vxngFbG1tmMo6J20vF3qy/view?usp=drivesdk', recommended: true },
        { title: 'General Chemical Tech Notes: Priyal Kumar', url: 'https://drive.google.com/file/d/1PzevLkCwsQBQh_bZDwZnPgdWA6Qqv_5m/view?usp=drivesdk' }
      ]
    },,

    {
      id: 'plastic_polymer_tech',
      code: 'IPL101',
      name: 'Introduction to Plastic & Polymer Tech',
      fullName: 'Introduction to Plastic Technology & Polymer Science',
      category: 'tech',
      icon: '🧪',
      color: 'bg-cyan-600',
      badge: 'Tech Branch',
      description: 'Introductory course for Plastic Technology (PL) & Chemical branches.',
      playlists: {
        detailed: [],
        oneshot: []
      },
      notes: [
        { title: 'Polymer Science & Technology Notes', url: 'https://drive.google.com/file/d/1RSder5E5rNZ3Nkn5ToQkt_8E8WJiDG_B/view?usp=drive_link', recommended: true },
        { title: 'General Chemical Tech Notes: Priyal Kumar', url: 'https://drive.google.com/file/d/1PzevLkCwsQBQh_bZDwZnPgdWA6Qqv_5m/view?usp=drivesdk' }
      ]
    },
,

    {
      id: 'elementary_math',
      code: 'DMA102',
      name: 'Elementary Mathematics (for Bio & Tech Branches)',
      fullName: 'Elementary Mathematics (Foundations for Technology & Biological Sciences)',
      category: 'core',
      icon: '📊',
      color: 'bg-slate-600',
      badge: '0 Files • Notes Wanted',
      description: 'Foundational mathematics for students in Biotechnology, Food Tech, and chemical technology streams. Notes coming soon — contribute your lecture notes!',
      playlists: {
        detailed: [],
        oneshot: []
      },
      notes: []
    },

    // ── ASSIGNMENTS & PYQs ─────────────────────────────────────────────,

    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      fullName: '1st Year Sessional & Homework Assignment Sets',
      category: 'pyq_assign',
      icon: '📝',
      color: 'bg-orange-600',
      description: 'Question sheets and homework problem sets for Electrical, Maths, Mechanics, Physics, and Python.',
      playlists: { detailed: [], oneshot: [] },
      notes: [
        { title: 'PP Sessional Assignment-1 Set', url: 'https://drive.google.com/file/d/1-dydD1SBZZ7Grggn3whZwA4Fbfo-xupA/view?usp=drive_link', recommended: true },
        { title: 'Electrical 3rd Assignment', url: 'https://drive.google.com/file/d/1k2HJZ84Fm3ZNJzO6PJ_qr94_-l4J0vi7/view?usp=drive_link' },
        { title: 'Maths 8th Assignment', url: 'https://drive.google.com/file/d/1k4aOot_K5gGAxy_afRjhtVaZT_0nRUjk/view?usp=drive_link' },
        { title: 'Mechanics 2nd Assignment', url: 'https://drive.google.com/file/d/1jm9LUxJiRf6OgNGFmynBmu6LbU9pU0dz/view?usp=drive_link' },
        { title: 'Mechanics 3rd Assignment', url: 'https://drive.google.com/file/d/1jf8MMsZAp-BZaLbcp0YHZhA-rgYUR10r/view?usp=drive_link' },
        { title: 'Physics 1st Assignment', url: 'https://drive.google.com/file/d/1k1-Si6BvF8nY8J40aOhpOmm564Yzn8Ck/view?usp=drive_link' },
        { title: 'Physics 2nd Assignment', url: 'https://drive.google.com/file/d/1k-syKk-vljcqWp51kxWe3tin1Q73JE6n/view?usp=drive_link' },
        { title: 'Physics 3rd Assignment', url: 'https://drive.google.com/file/d/1jzmYWysA38KVYlTQNdcRa_lnvAQ412O7/view?usp=drive_link' },
        { title: 'Physics 4th Assignment', url: 'https://drive.google.com/file/d/1jxMnbGqis4JDtNSqdcfEqb8dFNFIZFow/view?usp=drive_link' },
        { title: 'Physics 5th Assignment', url: 'https://drive.google.com/file/d/1jtpSRohBmacgFKmAGJUQ6oX9n6xQqHk1/view?usp=drive_link' }
      ]
    },,
    {
      id: 'pyqs',
      name: 'Previous Year Questions (PYQs)',
      fullName: '1st Year Complete PYQs (Sequenced Chronologically by Year)',
      category: 'pyq_assign',
      icon: '❓',
      color: 'bg-red-600',
      badge: 'High Value',
      description: 'Year-wise organized exam question papers (2025-26, 2024-25, 2023-24, 2022-23) for Mid Sem 1, Mid Sem 2, and End Sem.',
      playlists: { detailed: [], oneshot: [] },
      notes: [
        { title: '[2025-26] Mid Sem-1 PYQs (Odd Semester)', url: 'https://drive.google.com/file/d/1UHEYh3ykfe1QtYE_VfOF09nLwfWkjx5Z/view?usp=drivesdk', recommended: true },
        { title: '[2025-26] Mid Sem-2 PYQs (Odd Semester)', url: 'https://drive.google.com/file/d/1VzarRmsgnrELjL9fsGKFy31Ba1G9nZZi/view?usp=drivesdk', recommended: true },
        { title: '[2025-26] End Sem PYQs (Odd Semester)', url: 'https://drive.google.com/file/d/1RvGVTwQiqsc2AcodFj8g7P76_Dy75B_8/view?usp=drivesdk', recommended: true },
        { title: '[2025-26] Mid Sem-1 PYQs (Even Semester / 2nd Sem)', url: 'https://drive.google.com/file/d/18k4F_9KcyfRkEt-rjsDIMA2wN4BvZj_1/view', recommended: true },
        { title: '[2025-26] Mid Sem-2 PYQs (Even Semester / 2nd Sem)', url: 'https://drive.google.com/file/d/1wty3ubMfR4Vyt6ClzFfi0gKi-jNH0EmY/view?usp=drivesdk' },
        { title: '[2025-26] End Sem PYQs (Even Semester / 2nd Sem)', url: 'https://drive.google.com/file/d/1S41rOchlw2VV0JUqd-NA2-lJSv9MvaJM/view?usp=drivesdk' }
      ]
    }
  ];

  // Combined community notes matching any 1st year tags
  const allCommunityNotes = useMemo(() => {
    return communityNotes || [];
  }, [communityNotes]);

  // Combine static and community notes
  const subjects: Subject[] = useMemo(() => {
    return staticSubjects.map(sub => {
      const matchedCommunityNotes = allCommunityNotes
        .filter(cn => {
          const s = (cn.subject || '').toLowerCase();
          const target = sub.name.toLowerCase();
          const subId = sub.id.toLowerCase();
          return s === target || s.includes(subId) || target.includes(s);
        })
        .map(cn => ({
          id: cn.id,
          title: cn.title,
          url: cn.file_url,
          isCommunity: true,
          fileName: cn.file_name,
          uploadedBy: cn.uploaded_by,
          userName: cn.user_name
        }));

      return {
        ...sub,
        notes: [...sub.notes, ...matchedCommunityNotes]
      };
    });
  }, [allCommunityNotes]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(sub => {
      let matchesCat = true;
      if (activeCategory === 'computing') {
        matchesCat = sub.category === 'computing';
      } else if (activeCategory === 'pyq_assign') {
        matchesCat = sub.category === 'pyq_assign';
      }

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const matchesSearch =
        sub.name.toLowerCase().includes(q) ||
        (sub.fullName && sub.fullName.toLowerCase().includes(q)) ||
        (sub.code && sub.code.toLowerCase().includes(q)) ||
        sub.notes.some(n => n.title.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [subjects, activeCategory, searchQuery]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot' | 'workshop') => {
    const sub = subjects.find(s => s.id === subjectId);
    if (sub?.playlists?.[type] && sub.playlists[type]!.length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const sub = subjects.find(s => s.id === subjectId);
    return sub?.playlists || { detailed: [], oneshot: [], workshop: [] };
  };

  const handleDeleteCommunityNote = async (id: string, fileName?: string) => {
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

  // Exact 3 tabs as requested: All Subjects, Computing & Python, PYQs & Assignments
  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'computing', label: 'Computing & Python' },
    { id: 'pyq_assign', label: 'PYQs & Assignments' },
  ];

  // ── INDIVIDUAL SUBJECT DETAIL VIEW ──────────────────────────────────────────
  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />

        {/* Subject Header */}
        <div className="bg-slate-900 text-white pt-10 pb-8 px-4 sm:px-8 border-b border-slate-800">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedSubject(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to 1st Year Subjects
            </button>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-3xl">{subject.icon}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {subject.name}
              </h1>
              {subject.code && (
                <span className="text-xs font-mono font-bold uppercase bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                  {subject.code}
                </span>
              )}
              {subject.badge && (
                <span className="text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  {subject.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              B.Tech 1st Year • {subject.fullName || subject.name}
            </p>
          </div>
        </div>

        {/* Subject Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full mb-16">
          {/* If 0 files: Display clean contribution prompt card */}
          {subject.notes.length === 0 ? (
            <div className="text-center py-14 px-6 border-2 border-dashed border-border rounded-2xl bg-card">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <h3 className="text-foreground font-bold text-lg mb-1">Study materials coming soon for this subject!</h3>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
                This course is part of the updated curriculum. If you are attending lectures for {subject.name}, take neat handwritten notes and share your softcopy with us at the end of the semester!
              </p>
              <button
                onClick={() => window.open(
                  "https://wa.me/918957221543?text=" + encodeURIComponent("Hello Priyal Sir (CSE'27 HBTU), I have notes / classroom material for 1st Year " + subject.name + " and would like to contribute."),
                  "_blank"
                )}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                Message Priyal Sir (CSE'27 HBTU) to Contribute
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.notes.map((note, index) => (
                <motion.div
                  key={note.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.25 }}
                >
                  <div className="group border border-border bg-card hover:border-sky-300/80 hover:bg-sky-50/40 dark:hover:border-sky-800/80 dark:hover:bg-sky-950/20 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:shadow-sky-500/5 flex flex-col h-full relative">
                    {note.recommended && (
                      <div className="absolute top-3 right-3 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                          ⭐ Recommended
                        </span>
                      </div>
                    )}
                    {note.isCommunity && isOwner && (
                      <button
                        className={`absolute top-3 ${note.recommended ? 'left-3' : 'right-3'} text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-lg transition-colors z-10`}
                        onClick={() => handleDeleteCommunityNote(note.id!, note.fileName)}
                        title="Delete material"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${subject.color} flex items-center justify-center text-white text-xs shadow-sm`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">PDF</span>
                      {note.isCommunity && (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">Community</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug flex-1 mb-3">{note.title}</h3>
                    {note.userName && (
                      <p className="text-[10px] text-muted-foreground mb-3">Uploaded by: {note.userName}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(note.url, note.title)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity"
                        disabled={note.url === '#'}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </button>
                      <button
                        onClick={() => viewInBrowser(note.url)}
                        className="inline-flex items-center justify-center p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                        disabled={note.url === '#'}
                        title="View in Browser"
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

  // ── MAIN UNIFIED 1ST YEAR VIEW ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* ══════════ CLEAN HERO HEADER (NO CLIPPING, NO OVERFLOW) ══════════ */}
      <div className="bg-slate-900 text-white pt-10 pb-8 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/btech-notes")}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Years
          </button>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">B.Tech • First Year</span>
            <span className="text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
              New Revised Scheme (2026)
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            1st Year Notes & Resources
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed mb-4">
            Unified foundation portal for Engineering & Technology cycles. Includes core sciences, PPS, Python, engineering fundamentals, tech branches, and previous year papers.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg">
              📚 {subjects.length} Subjects & Modules
            </span>
            <a
              href="https://drive.google.com/file/d/14W4ah2ZTGgUeYKefVthmq7MZBJCLkiuJ/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" /> 1st Year Syllabus PDF
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex-1 w-full space-y-6">

        {/* ══════════ OFFICIAL STUDENT INSTRUCTION & STUDY GUIDE BANNER ══════════ */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 p-5 md:p-6 shadow-md relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-slate-700 shadow-sm">
                <Info className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-white text-base md:text-lg tracking-tight">
                Important Guidance for 1st Year Students
              </h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Combined Semester View:</strong> Both 1st and 2nd-semester subjects are unified here so students from all branches (Engineering & Technology cycles) can access their respective subjects in one place.
            </p>

            {/* Structured Subject Guide Points — Full Width Space Utilization */}
            <div className="text-xs text-slate-300/90 leading-relaxed space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">💻</span>
                <p>
                  <strong>Programming (PPS DCS101 & Python DCS201):</strong> Practice coding on an IDE. Focus on loops, arrays, pointers & file handling in C; lists, dictionaries, OOP & functions in Python. Check out the authentic <strong>CSE-curated Python handwritten notes</strong> added below.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">📐</span>
                <p>
                  <strong>Graphics (DCE101) & Mechanics (DME101/201):</strong> Practice manual drawing sheets with standard instruments for projections and isometric views. In Mechanics, draw clear Free-Body Diagrams (FBDs) and solve numericals on equilibrium, friction, centroids, and trusses.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">🔬</span>
                <p>
                  <strong>Core Sciences & Electrical (Maths, Physics, Chemistry, BEE):</strong> Master key derivations, formula sheets, and tutorial questions. Use the recommended detailed and one-shot playlists for rapid conceptual revision.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">📖</span>
                <p>
                  <strong>For Newly Introduced Courses (without online notes yet):</strong> Attend professor lectures attentively and maintain clean handwritten notes directly from class. Don't rely solely on last-minute shortcuts.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">🤝</span>
                <p>
                  <strong>Contribute & Become a Verified Contributor:</strong> At the end of the semester, scan your handwritten notes or files and message Priyal Sir. You will be awarded <strong>Admin / Contributor privileges</strong> to upload directly and get featured on the Contributors Leaderboard!
                </p>
              </div>
            </div>

            {/* Compact Green Professional Button at bottom (like Dashboard) */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <p className="text-[11px] text-slate-400">
                Want to contribute softcopies or need guidance for any subject? Contact directly:
              </p>
              <button
                onClick={() => window.open(
                  "https://wa.me/918957221543?text=" + encodeURIComponent("Hello Priyal Sir (CSE'27 HBTU), I am a 1st Year student and would like to contribute notes / need guidance for the new syllabus."),
                  "_blank"
                )}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/30 transition-all hover:scale-105 active:scale-95 border-none"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-white" />
                <span>Message Priyal Sir (CSE'27 HBTU)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════ SEARCH & EXACT 3 FILTER TABS (NO HORIZONTAL OVERFLOW) ══════════ */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search subjects, codes (e.g. DCS101), topics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            {/* Subject count indicator */}
            <div className="text-xs text-muted-foreground font-semibold flex items-center gap-2 self-start sm:self-auto">
              <span>Showing {filteredSubjects.length} of {subjects.length} subjects</span>
            </div>
          </div>

          {/* EXACT 3 FILTER PILLS AS SPECIFIED BY USER */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as 'all' | 'computing' | 'pyq_assign')}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  activeCategory === tab.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ SUBJECTS GRID ══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.map((subject, index) => {
            const playlists = getSubjectPlaylists(subject.id);
            const hasDetailed = playlists.detailed && playlists.detailed.length > 0;
            const hasOneshot = playlists.oneshot && playlists.oneshot.length > 0;
            const hasWorkshop = playlists.workshop && playlists.workshop.length > 0;
            const hasAnyPlaylist = hasDetailed || hasOneshot || hasWorkshop;

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.25 }}
              >
                <div className="group border border-border bg-card hover:border-sky-300/80 hover:bg-sky-50/40 dark:hover:border-sky-800/80 dark:hover:bg-sky-950/20 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:shadow-sky-500/5 h-full flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Badges + File Count */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-2xl p-2 rounded-lg bg-muted/60">{subject.icon}</span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {subject.code && (
                          <span className="text-[10px] font-mono font-bold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {subject.code}
                          </span>
                        )}
                        {subject.badge && (
                          <span className="text-[10px] font-extrabold uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            {subject.badge}
                          </span>
                        )}
                        {/* File count indicator: Shows 0 files gracefully if empty */}
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          subject.notes.length > 0 
                            ? "bg-emerald-600 text-white" 
                            : "bg-muted text-muted-foreground border border-border"
                        }`}>
                          {subject.notes.length} files
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-foreground text-base leading-snug mb-1.5 group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    {subject.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                        {subject.description}
                      </p>
                    )}
                  </div>

                  {/* Playlists Accordion & View Action */}
                  <div>
                    {hasAnyPlaylist && (
                      <div className="mt-2 pt-3 border-t border-border">
                        <button
                          className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => toggleSubjectExpansion(subject.id)}
                        >
                          <span className="flex items-center gap-1.5">
                            <Play className="h-3 w-3 text-indigo-500" /> Curated Playlists
                          </span>
                          {expandedSubjects.includes(subject.id) ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5" />
                          )}
                        </button>

                        {expandedSubjects.includes(subject.id) && (
                          <div className="mt-2 space-y-1">
                            {hasDetailed && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex items-center justify-between"
                                onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                              >
                                <span>📚 Detailed Topics</span>
                                <span className="text-[10px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded">
                                  {playlists.detailed!.length}
                                </span>
                              </button>
                            )}
                            {hasOneshot && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex items-center justify-between"
                                onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                              >
                                <span>⚡ One Shot</span>
                                <span className="text-[10px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded">
                                  {playlists.oneshot!.length}
                                </span>
                              </button>
                            )}
                            {hasWorkshop && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex items-center justify-between"
                                onClick={() => handlePlaylistClick(subject.id, 'workshop')}
                              >
                                <span>🔨 Workshop Practicals</span>
                                <span className="text-[10px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded">
                                  {playlists.workshop!.length}
                                </span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* View Notes Action Button */}
                    <div className="mt-4">
                      <button
                        onClick={() => setSelectedSubject(subject.id)}
                        className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-xl border border-border hover:bg-foreground hover:text-background transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        {subject.notes.length === 0 ? "View Subject / Contribute" : "View Notes & PDFs"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ══════════ CONTRIBUTION CALLOUT CARD (AMPLE BOTTOM SPACING) ══════════ */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 p-6 text-center space-y-3 pb-8 mb-8">
          <GraduationCap className="h-9 w-9 text-indigo-400 mx-auto opacity-80" />
          <h3 className="font-bold text-white text-lg">Have Class Notes or Slides for 1st Year?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            CollegeStudy Hub is maintained by students, for students. If you take neat notes from your professors or have tutorial solutions, message Priyal Sir (CSE'27 HBTU) on WhatsApp to get contributor credentials!
          </p>
          <button
            onClick={() => window.open(
              "https://wa.me/918957221543?text=" + encodeURIComponent("Hello Priyal Sir (CSE'27 HBTU), I want to share my 1st Year lecture notes to help other students on CollegeStudy Hub."),
              "_blank"
            )}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-white" /> Start Contributing on WhatsApp
          </button>
        </div>

      </div>

      <Footer />

      {/* Playlists Modal */}
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

export default FirstYearNotes;

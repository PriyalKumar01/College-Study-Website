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
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const SecondSemesterNotes = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ALL-2nd Semester');

  const subjectPlaylists = {
    physics: {
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
    graphics: {
      detailed: [
        { title: 'Engineering Graphics Complete', url: 'https://youtube.com/playlist?list=PL9RcWoqXmzaJT-fliqTSwUjWU4zCX_H2A&si=7Nqyi7RZvzTG4FDx' },
        { title: 'Plane Scale', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiDHez0vbl2L-BlxvOh7LKbC&si=C21LkKsmpznrnRXe' },
        { title: 'Projection of Straight Line', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiC9wFOTiDp8ekWAf40BwSct&si=wXPd0mqkRJnPObY1' },
        { title: 'Orthographic Projection', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBpnIOK5r3KXdfFOVzGHJSt&si=T6Bdal3q7No8wIAH' },
        { title: 'Projection of Solid', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiA9qy-OWuoEYoXsu7lsSaE9&si=2JhDN_Sdjn60mS-y' },
        { title: 'Projection of Plane', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBVR22X01vcnvVCuQIklXGx&si=1xN1LyxHTM-GtzvY' },
        { title: 'Isometric View', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCf-raL06kSCeqR8h61eYIC&si=xd00ke4OruPzCLu1' },
        { title: 'Section of Solid', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBrAkdOhEvkmVPs2UtwfGao&si=LVKO8cnvQO0JVmOZ' },
        { title: 'Parabola', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiBeWnVOMzE43WvHttggwr9C&si=McxrA0WQVn_TO6rM' }
      ],
      oneshot: []
    },
    mechanics: {
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
        { title: '2D Face System (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiB4wJ9KwN9LzBCawifVEKc4&si=RU2-a5UxL8AG86fV', recommended: true }
      ],
      oneshot: []
    },
    electrical: {
      detailed: [
        { title: 'Electrical Engineering Complete (Best)', url: 'https://youtube.com/playlist?list=PL3qvHcrYGy1v2kJX4SSsurE3_GdVe0ZD5&si=LN9LSPXI_zFjSjXS', recommended: true },
        { title: 'Electrical Engineering Comprehensive (Best)', url: 'https://youtube.com/playlist?list=PLDN15nk5uLiCSOqr7-rUz6-GtdTAjlvul&si=dJR9but1DQvKc9sC', recommended: true },
        { title: 'Electrical Engineering Advanced', url: 'https://youtube.com/playlist?list=PL9RcWoqXmzaLTYUdnzKhF4bYug3GjGcEc&si=yZMlK1LpsZk6L3Eo' }
      ],
      oneshot: [
        { title: 'Electrical Engineering One Shot', url: 'https://youtube.com/playlist?list=PL-vEH_IPWrhD41z0I7qFs1jcr1K40IGsy&si=f2nvJs_Zg1OCthgE' }
      ]
    },
    math: {
      detailed: [
        { title: 'Unit: 1 Successive Differentiation (Playlist 1)', url: 'https://youtube.com/playlist?list=PLNKD1qB9pptuRMEOXm3qVok9RST30R_e5&si=JtcKkBubUPUSd7bN', recommended: true },
        { title: 'Unit: 1 Successive Differentiation (Playlist 2)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfLLAU6Hxi0C_TnrZeqgbJMJ&si=9-MPIw5HXtpIaoKM' },
        { title: 'Unit: 1 Improper Integral ', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfL-2NhraOYEYevl9LTqDaCU&si=zcyygF0jIbqnjPBq' },
        { title: 'Engineering Mathematics-I Unit 2 ', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9hsRRQi1X_4kn6Lw6K_-9cq&si=XXROQe9OYuMetPj7' },
        { title: 'Engineering Mathematics-I Unit 3 ', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9hvSQJ1XqJIcxZPyo5sNwj_&si=eEz87z83Y37Gege9' },
        { title: 'Engg Math-I Unit 4 (Playlist 1)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfI7Ebw_j-Vy8YKHdbHKP9am&si=kb0fRKlpH6cfcoTE' },
        { title: 'Engg Math-I Unit 4 (Playlist 2)', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jPn19ja8WFf6VRlPspl4eQ&si=6geutTvZ9jmxtliq' , recommended: true },
        { title: 'Engg Math-I Unit 5 (Playlist 1)', url: 'https://youtube.com/playlist?list=PLIgDtce9BR0dZv1aZwVTmuWXc_vJPbB3q&si=U6Mwcg0_ZkXfilGh' },
        { title: 'Engg Math-I Unit 5 (Playlist 2)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfLewoQPYjgg7SMBLjSV704v&si=7O6fCxdOL9LIHAid', recommended: true }
      ],
      oneshot: []
    },
    pc: {
      detailed: [
        { title: 'Professional Communication Complete', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8u7yPX99x1TCuyV4aWulD1X&si=lCMEpcKJ7uXmkBKp' }
      ],
      oneshot: []
    },
    ict: {
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
      id: 'electrical',
      name: 'Electrical Engineering',
      icon: '⚡',
      color: 'bg-yellow-500',
      notes: [
        { title: 'Basic Electrical Engineering Book', url: 'https://drive.google.com/file/d/1S2t5UuoQF8vOfr1C9Zy53BfpXhd0gzeB/view?usp=drive_link' },
        { title: 'Unit 5 DC Machine Notes', url: 'https://drive.google.com/file/d/1WKvvTkqGPDMPmSP_nC3mM7qvkKZdlTpN/view?usp=drive_link' },
        { title: 'Electrical Book - C.L Wadhwa', url: 'https://drive.google.com/file/d/1k5EBek40Ou-BXrSwYtLcy8RmW9k0qFbH/view?usp=drive_link' },
        { title: 'Electrical File PDF', url: 'https://drive.google.com/file/d/1Wj06KV7jXwpONsvFpRd2T79776mwfDv5/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1WguCYHHNsnbB0_T3EQsyzv3H2FlDVTGk/view?usp=drive_link' },
        { title: 'Transformer Notes', url: 'https://drive.google.com/file/d/1W_bGwn702donDpAde0Qznxcdkl-2GtRY/view?usp=drive_link' },
        { title: 'Unit 1 Notes', url: 'https://drive.google.com/file/d/1SAYkzsR88yrvU8yTQLdQ78N8zM3cefN2/view?usp=drive_link' },
        { title: 'IEE Full Handwritten Notes', url: 'https://drive.google.com/file/d/1VtdV8ZT2I1_dtD8xyUgeor-4G_01RHm8/view?usp=drive_link' },
        { title: 'Unit 3 Handwritten Notes', url: 'https://drive.google.com/file/d/1_ypFDDG_e7GoMF2dzWSHhiDhFW4yWyyD/view?usp=drive_link' },
        { title: 'Unit 4 Handwritten Notes', url: 'https://drive.google.com/file/d/1_yPLVG8DQuKMzITmRJkh2se_wOdYhbEm/view?usp=drive_link' },
        { title: 'Unit 5 Handwritten Notes', url: 'https://drive.google.com/file/d/1_yiMvCtTgCTvnCIVnc_UrxnsGu5OeUnO/view?usp=drive_link' },
        { title: 'Unit 1 Handwritten Notes', url: 'https://drive.google.com/file/d/1jcfwsClNa0PnIdVM21VxBuXPnBT7PAbz/view?usp=drive_link' }
      ]
    },
    {
      id: 'mechanics',
      name: 'Engineering Mechanics',
      icon: '⚙️',
      color: 'bg-blue-500',
      notes: [
        { title: 'Unit 1 Notes', url: 'https://docs.google.com/document/d/1SbrdyYktEpHGJ271gbl-bbbB9EvmlLI2/edit?usp=drive_link&ouid=114822883182552949712&rtpof=true&sd=true' },
        { title: 'Unit 2 & 3 Combined Handwritten Notes', url: 'https://drive.google.com/file/d/1_XgDXt6FY0NBUktGfQDxXWFOdSY8LEOU/view?usp=drive_link' },
        { title: 'Complete Mechanical Engineering Handwritten Notes', url: 'https://drive.google.com/file/d/1WDJbOvvQ68rFrs0kAQnzXNOACmEAe7-2/view?usp=drive_link' },
        { title: 'Engineering Mechanics Book - RK Bansal', url: 'https://drive.google.com/file/d/1SDkvZJ1JciXW_yXjwVBZhI7mUVRpwpMp/view?usp=drive_link' }
      ]
    },
    {
      id: 'math',
      name: 'Engineering Mathematics',
      icon: '📐',
      color: 'bg-green-500',
      notes: [
        { title: 'Engineering Math Handwritten Notes', url: 'https://drive.google.com/file/d/1TZ8L0xmAQju60MFrkJ6ixvhJXEPcuNnh/view?usp=drive_link' },
        { title: 'Engineering Math Book - BS Gerewal', url: 'https://drive.google.com/file/d/1_ofPrUVZXyrwggNv8WeJTX1DeoHMqldX/view?usp=drive_link' },
        { title: 'LPP Graphical Method Notes', url: 'https://drive.google.com/file/d/1_sOUHSZ4dfLHW8cKLd_n0UQoC427cSBi/view?usp=drive_link' }
      ]
    },
    {
      id: 'pc',
      name: 'Professional Communication',
      icon: '💬',
      color: 'bg-purple-500',
      notes: [
        { title: 'One Word Substitution Important PDF', url: 'https://drive.google.com/file/d/1k9DQuSHvbBc_-iB8RPC4g1MZJgHmFBOO/view?usp=drive_link' },
        { title: 'PC Handwritten Notes', url: 'https://drive.google.com/file/d/1STrVBwHdz4WLytQ-KxO4SebJwX0jh6jM/view?usp=drive_link' },
        { title: 'PC Old Notes', url: 'https://drive.google.com/file/d/1iFWlH6L2YJHnH0IxLsZYH-duRJ5wl8u0/view?usp=drive_link' },
        { title: 'Renunciation Story PDF', url: 'https://drive.google.com/file/d/1hn_7lGRiVyuCuQbo1IPnVROIj8DYfZ7p/view?usp=drive_link' },
        { title: 'The Barber\'s Trade Union Story PDF', url: 'https://drive.google.com/file/d/1i2ph1pYGL7KXNcOxNu6WjrhL5Sl5LTi1/view?usp=drive_link' },
        { title: 'The Eyes Are Not Here Story PDF', url: 'https://drive.google.com/file/d/1i9sA1LbAtppEyEjA9YUUmr4rrZXA9h7K/view?usp=drive_link' },
        { title: 'The Lament Story PDF', url: 'https://drive.google.com/file/d/1hvnLA7_Nb9rfRHHvz6eaeGRsPxcE7_cz/view?usp=drive_link' },
        { title: 'Unit 5 Essay Writing PDF', url: 'https://drive.google.com/file/d/1hiZrrMy7d88ZGJcK1hXENVlCuEmaaBZe/view?usp=drive_link' }
      ]
    },
    {
      id: 'physics',
      name: 'Engineering Physics',
      icon: '🔬',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Dielectric Materials Notes', url: 'https://drive.google.com/file/d/1RfW4S61Eqg8WxD-unbh_7se3qhdIoS70/view?usp=drive_link' },
        { title: 'Electromagnetic Theory Notes', url: 'https://drive.google.com/file/d/1kUlhq50o1PBRfrCHBQrFs9zf2pupHOWU/view?usp=drive_link' },
        { title: 'Engineering Physics Handwritten Notes', url: 'https://drive.google.com/file/d/1VzZEDMbinHRr_QUcK1YrWBwq-nRhDera/view?usp=drive_link' },
        { title: 'LASER Topic Notes', url: 'https://drive.google.com/file/d/1RijFS5VF7vdaW6D7UF_ymcr6XOPt5-A1/view?usp=drive_link' },
        { title: 'Nanomaterials Notes', url: 'https://drive.google.com/file/d/1Rt82c5VWLhL5HfyZka68A-Zd7OB1geIb/view?usp=drive_link' },
        { title: 'Physics Lab Experiment (1-13)', url: 'https://drive.google.com/file/d/1YYafb_TK1gWabj3kRC34wUn_Rztt-piI/view?usp=drive_link' },
        { title: 'Unit 1 Notes', url: 'https://drive.google.com/file/d/1kNPYkJ-KIWNAsqgY5UpmphraTSlTLUDI/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1RgAj7_fhV20RT88XGDHK_o7S7fLCKFsL/view?usp=drive_link' },
        { title: 'Quantum Mechanics Notes', url: 'https://drive.google.com/file/d/1RtnZADoZD40qQkEp5ARa1DldZiafchnr/view?usp=drive_link' },
        { title: 'Semiconducting Materials Notes', url: 'https://drive.google.com/file/d/1Ruy7Ij_Mq_UImQnhKCLKvJ_WBg5Cj7h5/view?usp=drive_link' },
        { title: 'Semiconductor - Unit 4 Notes', url: 'https://drive.google.com/file/d/1kKqBU2pqeqZOFCdimRFOjnxkj9WP2L6F/view?usp=drive_link' },
        { title: 'Statistical Mechanics Notes', url: 'https://drive.google.com/file/d/1S1ehd1Ri0K_HHNpPur7Z8xbHLVMxo80k/view?usp=drive_link' }
      ]
    },
    {
      id: 'graphics',
      name: 'Engineering Graphics',
      icon: '📐',
      color: 'bg-teal-500',
      notes: [
        { title: 'Engineering Graphics Diagram', url: 'https://drive.google.com/file/d/1auehP9w9Ot4CIP6QVzjE6KJk48GJHX_s/view?usp=drive_link' },
        { title: 'Engineering Graphics Notes', url: 'https://drive.google.com/file/d/1X-847TSkSxdsvIi1y8mJtPHD99ACtiCl/view?usp=drive_link' },
        { title: 'Engineering Graphics Book', url: 'https://drive.google.com/file/d/1hY68Wif6LCQUipraYXIT_utPQvzsKK_F/view?usp=drive_link' },
        { title: 'Isometric Projection Notes', url: 'https://drive.google.com/file/d/1hZYat1B9h-8TXO77vIyXSpydsWmg1uK5/view?usp=drive_link' },
        { title: 'Orthographic View Notes', url: 'https://drive.google.com/file/d/1hc0lIdW75OUQA9eKVkIgxJd6S-AmJ1e3/view?usp=drive_link' },
        { title: 'Projection of Straight Line Notes', url: 'https://drive.google.com/file/d/1hdZ9go7GiT69tLqh4N8SX-HILNKKN0s3/view?usp=drive_link' },
        { title: 'Rules of Dimensions', url: 'https://drive.google.com/file/d/1a5toVeLKoFgUkEesqJJ0qnvCgeC1svAt/view?usp=drive_link' },
        { title: 'Section of Solid Notes', url: 'https://drive.google.com/file/d/1a-MdUdcohktnqRpG9AdFtDuSwfXvYNPS/view?usp=drive_link' }
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-orange-500',
      notes: [
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
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Mid Sem-1 PYQs (2025-26)-EVEN SEM', url: 'https://drive.google.com/file/d/135yNwTL1_MdXO9IgaRWO3f8CHTq33bDY/view' },
        { title: 'Mid Sem 1 PYQs (2025-26) -ODD SEM', url: 'https://drive.google.com/file/d/1SXPBclZ-Bjv6l9O3iKFRionXUq9iLhkW/view?usp=drivesdk' },
        { title: 'Mid Sem 2 PYQs (2025-26) -ODD SEM', url: 'https://drive.google.com/file/d/1wty3ubMfR4Vyt6ClzFfi0gKi-jNH0EmY/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2025-26) -ODD SEM', url: 'https://drive.google.com/file/d/1S41rOchlw2VV0JUqd-NA2-lJSv9MvaJM/view?usp=drivesdk' },
        { title: 'Mid Sem 1 PYQs (2024-25) -ODD SEM', url: 'https://drive.google.com/file/d/1SHThDw8j2ar0oJ7huAKSTTBWAqLqgT86/view?usp=drive_link' },
        { title: 'Mid Sem 2 PYQs (2024-25) -ODD SEM', url: 'https://drive.google.com/file/d/1FmF7U7v0GnqSYhEY5V05Sh2nbq5_Io2V/view?usp=drive_link' },
        { title: 'End Sem PYQs (2024-25) -ODD SEM', url: 'https://drive.google.com/file/d/1FoxxXrQZyJYqIWNxgqoix-whiELRM9ap/view?usp=drive_link' },
        { title: 'Mid Sem 1 PYQs (2023-24) -ODD SEM', url: 'https://drive.google.com/file/d/1SzIrS0HedxD7rXrfdeleOMO9YXI-O4Cg/view?usp=drive_link' },
        { title: 'End Sem PYQs (2022-23) -EVEN SEM', url: 'https://drive.google.com/file/d/1TUqMumNd8NU2KLY7oSapwyZKDxUwBwEe/view?usp=drive_link' },
        { title: 'All Electrical Engg Subject PYQs (2022-23)', url: 'https://drive.google.com/file/d/1T_SDeOBPNk2_PuR-MSNvyZO083YAawZT/view?usp=drive_link' },
        { title: 'All Engg Graphics ESE PYQs (2022-24)', url: 'https://drive.google.com/file/d/1XAQWVkHIBL98_6DQ_g5gLdJtPItnr6Fr/view?usp=drive_link' },
        { title: 'All Engg Math PYQs (2022-24)', url: 'https://drive.google.com/file/d/1XAuHs6HHsd83jqxAhSg8jm8CqCAMubIT/view?usp=drive_link' },
        { title: 'PC All End Sem PYQs (2021-24)', url: 'https://drive.google.com/file/d/1_gxaLSw8Uz3OhjCGUkr4nCDeFYaVy816/view?usp=drive_link' },
        { title: 'Important Unit 1-5 Physics PYQs', url: 'https://drive.google.com/file/d/1_chuSn7TOwmsI8M-TAiISYE_AvHKMg7S/view?usp=drive_link' }
      ]
    }
  ];

  const syllabus = {
    title: '2nd Semester Syllabus',
    url: 'https://drive.google.com/file/d/1TGhKLkREEFgTGkDLhn5m9pKWJo9soALy/view?usp=drive_link'
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
            <p className="text-xs opacity-50 uppercase tracking-widest">B.Tech — 2nd Semester</p>
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
                        onClick={() => viewInBrowser(note.url)}
                        className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
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
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">2nd Semester Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            2nd Semester<br />
            <span className="opacity-60">B.Tech Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. 2nd Semester — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">B.Tech First Year</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">2nd Semester</span>
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
              <p className="font-semibold text-foreground text-sm">2nd Sem Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 2nd Semester B.Tech</p>
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
                  <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col relative animate-fade-in">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                        {subject.notes.length} files
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 flex-1">{subject.name}</h3>

                    {/* Playlist section */}
                    {subject.id !== 'assignments' && subject.id !== 'pyqs' && (playlists.detailed.length > 0 || playlists.oneshot.length > 0) && (
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

export default SecondSemesterNotes;



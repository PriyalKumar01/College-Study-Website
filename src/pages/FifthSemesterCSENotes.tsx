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

const FifthSemesterCSENotes = () => {
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

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
      id: 'toafl',
      name: 'TOAFL',
      fullName: 'Theory of Automata and Formal Languages',
      icon: '🤖',
      color: 'bg-purple-500',
      playlists: {
        detailed: [
          { title: 'TOAFL Playlist -Gate Smashers', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i&si=RnlhLn9QVUpKRBWj', recommended: true },
          { title: 'TOAFL Playlist -Gate Hub', url: 'https://youtube.com/playlist?list=PL1QH9gyQXfgsUBfYUR0WirJASgif4pHVX&si=ErI3w0QFAdHp0vik', recommended: true },
          { title: 'TOAFL Playlist -CSE Academy', url: 'https://youtube.com/playlist?list=PLS6nugESt9lKS5TYU6VgqUgT1uPbYH9eE&si=3vXsmMfhOZK-FiGY', recommended: false },
        ],
        oneshot: [
          { title: 'TOAFL-by 5 Min.Engg.', url: 'https://youtu.be/acCztqcZi_Q?si=u77gG3cBgxXyi94Q', recommended: true },
          { title: 'TOAFL-by Knowledge GATE', url: 'https://youtu.be/9kuynHcM3UA?si=S0ZoakGy81zG1-r2', recommended: true },
        ]
      },
      notes: [
        { title: 'Unit-1 (Part-1) Intro', url: 'https://drive.google.com/uc?export=download&id=1kjeyYAnyvZ27BRNS-809YVqRA_S3l6lS' },
        { title: 'Unit-1 (Part-2) Finite Automata', url: 'https://drive.google.com/uc?export=download&id=1leNJq-PeybsShSZzAi1q4AxXfvQx0dbs' },
        { title: 'Unit-1 (Part-3) Finite Automata', url: 'https://drive.google.com/uc?export=download&id=1s5xIbwm8SW0nWwUe5yCKkTpgKXe1N12P' },
        { title: 'Unit-1 (Part-4) FSA', url: 'https://drive.google.com/uc?export=download&id=12iicJxCdSfeDMkMlVYW7jiT_GGdriSKT' },
        { title: 'Unit-1 (Part-5) Minimization of DFA', url: 'https://drive.google.com/uc?export=download&id=1RCEWYXj2CbuFSwbImho21oE5BC_LEVTl' },
        { title: 'Unit-1 (Part-6) Numericals', url: 'https://drive.google.com/uc?export=download&id=1dvmHtwB8xgHW4XHcRIDbFOU4HtiEWZ_3' },
        { title: 'Unit-2 (Part-1) Formal Language', url: 'https://drive.google.com/uc?export=download&id=12ibIAp1ADgGHx-aXO_f0-gG94bFLXBuU' },
        { title: 'Unit-2 (Part-2) Regular Language', url: 'https://drive.google.com/uc?export=download&id=178jZZLY_uUgGabJ_pt26EdVuMxhfNwbm' },
        { title: 'Unit-2 (Part-3) Identification of R.L', url: 'https://drive.google.com/uc?export=download&id=1jTGsam3FTCJcNKBFn9m2ZlL-4cUh1OOV' },
        { title: 'Unit-2 (Part-4) Conversion of F.A ↔ R.E', url: 'https://drive.google.com/uc?export=download&id=1LF5Ty6aCr3rErbp9nXyKCDyklq7ZF_Sg' },
        { title: 'Unit-2 (Part-5) Numericals', url: 'https://drive.google.com/uc?export=download&id=1ZvoI1UK0-UBpqcPwWDrfCB1SvjgqfZpO' },
        { title: 'Unit-3 (Part-1) C.F.G', url: 'https://drive.google.com/uc?export=download&id=16vRF2qbp_Qy0PlmGbNIFSgk8CXyJcTJt' },
        { title: 'Unit-3 (Part-2) Ambiguity', url: 'https://drive.google.com/uc?export=download&id=1HHhQqw1vENarMeC43GRK0XpUD9wEutwx' },
        { title: 'Unit-3 (Part-3) Normal form of CFG', url: 'https://drive.google.com/uc?export=download&id=1Uv2BRORyA3MM2VejDACIwgGvGWc93HBr' },
        { title: 'Unit-3 (Part-4) Conversion R.G to F.A', url: 'https://drive.google.com/uc?export=download&id=1Hc9UmUpAb-jefzVJkkz4lwLqMBQ1SGwi' },
        { title: 'Unit-3 (Part-5) Removal of € Production', url: 'https://drive.google.com/uc?export=download&id=1H4TrVwfMIK99FL09vFka14VYXBz7qU7l' },
        { title: 'Unit-3 (Part-6) Numericals', url: 'https://drive.google.com/uc?export=download&id=1FgF7K2tBaNbnDSKU1gxNbeYJSPKazhAt' },
        { title: 'Unit-4 (Part-1) PDA', url: 'https://drive.google.com/uc?export=download&id=1z34TgJxZAv8TdhQu2LT8cdJdX_2dF1e1' },
        { title: 'Unit-4 (Part-2) CFL & PDA', url: 'https://drive.google.com/uc?export=download&id=11zgw3vxokIntpi_X7uyvaDtwurwozhTy' },
        { title: 'Unit-4 (Part-3) Deterministic PDA & CFL', url: 'https://drive.google.com/uc?export=download&id=19AtDKXmRjEDDy2AUyGpzPzmGmxRHr-K5' },
        { title: 'Unit-4 (Part-4) Numericals', url: 'https://drive.google.com/uc?export=download&id=1jOerH4n6SsTS1GauHKYqQ6MhhIwpzFCN' },
        { title: 'Unit-5 (Part-1) Turing Machine', url: 'https://drive.google.com/uc?export=download&id=18npomOndEib0Sfp4w61bIJA6Pwf_0V_z' },
        { title: 'Unit-5 (Part-2) Turing Machine as Lang. Acceptor', url: 'https://drive.google.com/uc?export=download&id=1ZE6BNjPKb9kWh8F-8eUQv9UtDBQT-gJX' },
        { title: 'Unit-5 (Part-3) LBA & Decidability Problem', url: 'https://drive.google.com/uc?export=download&id=1c5Xyn5CYpTsBmuCXqUohX3dwYaPvGEgT' },
        { title: 'Unit-5 (Part-4) Numericals', url: 'https://drive.google.com/uc?export=download&id=1L_D8l0_FkYEcWrPLXBmxPPIEHbnGojfH' },
        { title: 'TOAFL Full Notes by 5 min. Engg.', url: 'https://drive.google.com/uc?export=download&id=1Coqf6FN6nUBddkL8uXp_bwUmsLTNje2E' },
      ]
    },
    {
      id: 'dbms',
      name: 'DBMS',
      fullName: 'Database Management Systems',
      icon: '🗄️',
      color: 'bg-blue-500',
      playlists: {
        detailed: [
          { title: 'DBMS -Neso Academy', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRiyryTrbKHX1Sh9luYI0dhX&si=LX8H6EbBHJjR3iH-', recommended: true },
          { title: 'DBMS Unitwise Oneshot Playlist -Multi Atoms', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8sApWY0hYEaO-GldGwPE6Yo&si=OYP3sxnYZh53izrw', recommended: true },
          { title: 'DBMS -Gate Smashers', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y&si=729UvQmL-7UcJw0x', recommended: false },
        ],
        oneshot: [
          { title: 'Unit 1 Oneshot', url: 'https://youtu.be/ptlIJiIByMc?si=WI-U-oZcuwaqnK_I', recommended: true },
          { title: 'Unit 2 Oneshot', url: 'https://youtu.be/jRReZoQi1hw?si=amSvqZu4LJ_mrU6S', recommended: true },
          { title: 'Unit 3 Oneshot', url: 'https://youtu.be/VAd8Audkxro?si=Q7AAnCx5Suu2ctiv', recommended: true },
          { title: 'Unit 4 Oneshot', url: 'https://youtu.be/0Skq_YqrHjg?si=Ox5vgpaxUKE5MOmS', recommended: true },
          { title: 'Unit 5 Oneshot', url: 'https://youtu.be/oR6IXFrJBEk?si=7DzaF2QkfEhv12yL', recommended: true },
          { title: 'DBMS One Shot -5 Min. Engg.', url: 'https://youtu.be/jzuzxEFoiss?si=keewHhai6mXkNmOg', recommended: true },
          { title: 'DBMS One Shot -Knowledge Gate', url: 'https://youtu.be/YRnjGeQbsHQ?si=mgvvNkChOHukHobq', recommended: true },
        ]
      },
      notes: [
        { title: 'Unit-1 Part-1 Navathe', url: 'https://drive.google.com/uc?export=download&id=1Njok356K8ftqy6IfELlH2LoYh4ncX0Kx' },
        { title: 'Unit-1 Part-2 Navathe', url: 'https://drive.google.com/uc?export=download&id=1il-V1xgTxz0cRdiVzhYqdpE4hrWIA_Kw' },
        { title: 'Unit-2 Part-3 Navathe', url: 'https://drive.google.com/uc?export=download&id=1xK0r9BkxR3BtA0iM9zJdcM5UNe7duy8S' },
        { title: 'Unit-1 Part-4 Navathe', url: 'https://drive.google.com/uc?export=download&id=1_PyxPpuWG1F7NJYxjaW2wFqjmuseUjsT' },
        { title: 'DBMS-Quantum Book', url: 'https://drive.google.com/uc?export=download&id=1DNKGyHci5Du4yjaL2Mf3EYHSADPz13la' },
        { title: 'DBMS Complete Notes - KnowledgeGATE', url: 'https://drive.google.com/uc?export=download&id=1oubD7Ov62JD1SOwhx-XsWqqK3TbOHAbn' },
        { title: 'DBMS Complete Notes-MultiAtoms', url: 'https://drive.google.com/uc?export=download&id=1O399cHUYpgAFswLIIzZjJuZ_Se98_oby' },
        { title: 'DBMS Complete Notes-5 min. Engg.', url: 'https://drive.google.com/uc?export=download&id=15lUt9NLdShn6fTg4QaRiGRyUWJJ3K4Z5' },
        { title: 'DBMS Book-Henry Korth', url: 'https://drive.google.com/uc?export=download&id=1GMdDx-BuR3pcnla16xVJ4mOx4JMrxlTd' },
        { title: 'DBMS Practical File- Priyal Kumar', url: 'https://drive.google.com/file/d/1FhsohpFS5j91ykfH350X90VezA2u9_ZT/view?usp=drivesdk' },
      ]
    },
    {
      id: 'ds',
      name: 'Data Science',
      fullName: 'Data Science',
      icon: '📊',
      color: 'bg-green-500',
      playlists: {
        detailed: [
          { title: 'Data Science (Statistics)', url: 'https://youtu.be/1Cg9-KUqoUI?si=FyDOyUrgQEP-mUxE', recommended: true }
        ],
        oneshot: [
          { title: 'Data Science One Shot', url: 'https://youtu.be/1Cg9-KUqoUI?si=FyDOyUrgQEP-mUxE', recommended: true }
        ]
      },
      notes: [
        { title: 'FULL Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1tevE9l-E44Jd3l2lL9YlDY1qrXfEBhDA' },
        { title: 'Statistics Notes', url: 'https://drive.google.com/file/d/1NV6lQsVOTc2c4OpMt6VykRZvMvtYe8DT/view?usp=drivesdk' },
        { title: 'Unit-2 Part-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1LXSfbvhVZbJDUI6eivtySq7b98bKWZac' },
        { title: 'Full DS Notes from Data Modeling Onwards', url: 'https://drive.google.com/file/d/1MavBmoF6Ayn2OX6-JEtjXSj-8B0lQa7V/view?usp=drivesdk' },
        { title: 'DS -last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Wm4dpAN2nI39nNSIK-7jx3H8htZaqssM/view?usp=drivesdk' },
        { title: 'DS -Complete Notes', url: 'https://drive.google.com/file/d/1ZiIw217rbI2IKt6HO_3WePIQ5caos3Od/view?usp=drivesdk' },
        { title: 'Numpy Cheat Sheet', url: 'https://drive.google.com/file/d/1lN2L0jdfTdFLuOCcaxDtja3JLly0t1rm/view?usp=drivesdk' },
        { title: 'Pandas Cheat Sheet', url: 'https://drive.google.com/file/d/1_hLM3xGLJ4VHFrMVjtPw2kjHZsX0zOk0/view?usp=drivesdk' },
        { title: 'DS Practical File- Priyal(CSE)', url: 'https://drive.google.com/file/d/19RsKe9Aw3FT1_m35r9kOhqSKsA5tF1jg/view?usp=drivesdk' },
        { title: 'DS -Practical Exam PYQs(2025-26)', url: 'https://drive.google.com/file/d/1V7Un3Ye1MEQvx_LEY-3QHvYKJyUEUfuZ/view?usp=drivesdk' },
      ]
    },
    {
      id: 'cn',
      name: 'Computer Network',
      fullName: 'Computer Networks',
      icon: '🌐',
      color: 'bg-orange-500',
      playlists: {
        detailed: [
          { title: 'CN Oneshot Playlist -Multi Atoms', url: 'https://youtube.com/playlist?list=PLh11ucJN276IL28KPahyHA5orDh4dYaJt&si=Pw-g5ySBMgOZxkEk', recommended: true },
          { title: 'CN Playlist -Neso Academy', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx&si=hFzQqIYH4m4bNQD0', recommended: true },
          { title: 'CN Playlist -Gate Smashers', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_&si=lLZUzL2F1Us0kbL4', recommended: false },
        ],
        oneshot: [
          { title: 'CN Oneshot -Knowledge Gate', url: 'https://youtu.be/q3Z3Qa1UNBA?si=aAM7JKTpm_hPjTW6', recommended: true },
          { title: 'CN Oneshot -5 Min. Engg.', url: 'https://youtu.be/1V9mhVgVH3A?si=KvEkmDtyEnhJGFMS', recommended: true },
        ]
      },
      notes: [
        { title: 'CN -Forouzan Book', url: 'https://drive.google.com/uc?export=download&id=1kLMlKMA0AZ1saBEmQzYJv-8OZjYp04G0' },
        { title: 'CN -Tanenbaum Book', url: 'https://drive.google.com/uc?export=download&id=17Lzpfbjp_TUzirEfqEwBujBRpwGlM_1x' },
        { title: 'CN -Quantum Book', url: 'https://drive.google.com/uc?export=download&id=135ML5uks26wJiAKR9oOQ4kOK8CO6aBAC' },
        { title: 'FULL Unit-1 & 2 Handwritten Notes', url: 'https://drive.google.com/uc?export=download&id=1FdlyWmdpcePy9ON19EckOpM32MATHk1W' },
        { title: 'CN Complete Notes (best)', url: 'https://drive.google.com/file/d/1L3WfHCH893Xr6LGOeS8uXPhFloVP6xMB/view?usp=drivesdk' },
        { title: 'CN Practical File- Priyal', url: 'https://drive.google.com/file/d/1YpEVjHMbPVa8nIXD1yhSHPAwV5FmAcWe/view?usp=drivesdk' },
        { title: 'CH-1 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1dOdNZ3FfsRM9cOKbyvqwQVpk3oHe51YP/view?usp=drivesdk' },
        { title: 'CH-2 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/14S8oSaSzeiMdBjGhB5wlGN3deyF7vgUK/view?usp=drivesdk' },
        { title: 'CH-3 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1T7WtlX_uqy8CsgtrPPoRzojV1lr9yqz5/view?usp=drivesdk' },
        { title: 'CH-4 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/19thdrTwUKTbagPX5Yi1AsmYDv938YA76/view?usp=drivesdk' },
        { title: 'CH-5 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1fweOgN6kQI6_HEdAW5ZFsJg7HsTmolJy/view?usp=drivesdk' },
        { title: 'CH-6 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1gmFl-4xoUvz6BreneM23zm8_z5OobqRs/view?usp=drivesdk' },
        { title: 'CH-7 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1H_JHkidn2TrEQxjhs5_yZ1QSIIOa1X5Y/view?usp=drivesdk' },
        { title: 'CH-8 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1zceqjuMFJvh-uOFZ6jvCv551PKrtKvnO/view?usp=drivesdk' },
        { title: 'CH-9 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1xJH2ZX60D0eK2fIB-SYRkiJdQWG-cP-D/view?usp=drivesdk' },
        { title: 'CH-10 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1t1O0BDJJZpLdoQ4otTGrsjIZxUFXRvId/view?usp=drivesdk' },
        { title: 'CH-11 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1AARuEcWjx88472RzeGIF-wxRf7h1k5_7/view?usp=drivesdk' },
        { title: 'CH-12 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1HbZSaeNJPu9lUG7tLVOQ_4AbXitT8fEv/view?usp=drivesdk' },
        { title: 'CH-13 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1RysuSt_NhF-LZY2iTD_hpgR50PxMUsmY/view?usp=drivesdk' },
        { title: 'CH-14 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1PxTAIazka1oX5MjSeyS-19TaB3iRnJPN/view?usp=drivesdk' },
        { title: 'CH-15 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1eDAAiFwrH7iy4GN5jrPrLmFJruXlNFZk/view?usp=drivesdk' },
        { title: 'CH-16 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1geAtQLRbHf9wlRkFnB5IOuKztr8x0A0J/view?usp=drivesdk' },
        { title: 'CH-19 (*17th & 18th pdf is not in syllabus)', url: 'https://drive.google.com/file/d/14fESRsqsXSMgJb1z07KO3ehB0_jqr7qx/view?usp=drivesdk' },
        { title: 'CH-20 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1_dMYKuNyPfQZ4BYS5Xr_Uxl9wzO0any6/view?usp=drivesdk' },
        { title: 'CH-21 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/163aOxOTx67ViY9p9ruFPoI4MPTGBCC64/view?usp=drivesdk' },
        { title: 'CH-22 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/18GqmVKynljQJT_yuMWzjIRp2pYpPmdBz/view?usp=drivesdk' },
        { title: 'CH-23 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1qSPvU_lDg896jhxgez9ZEVcj7O1MdL3C/view?usp=drivesdk' },
        { title: 'CH-24 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1s8TEx5g0CMWbcUz4pbQywa2dweBTwYo-/view?usp=drivesdk' },
        { title: 'CH-25 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1B45I-setY6TKy4KASaOzQvenmcV1qB25/view?usp=drivesdk' },
        { title: 'CH-26 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1B8954jXkFSoJ5FhZcvZpIZbfD4p52eiU/view?usp=drivesdk' },
        { title: 'CH-27 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1D_ggHdoGfLTuBB8uBEEZCF0QZKixCTXw/view?usp=drivesdk' },
        { title: 'CH-28 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1xD7cmGzPr0dfOqB71xKv4nyswFVIMl8h/view?usp=drivesdk' },
        { title: 'CH-29 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1N-c6cThH9Kd_AO8yrseeIfzyIyeNQ5ga/view?usp=drivesdk' },
        { title: 'CH-30 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/1Ervot1e8P9uaroZqn-CQ8myzThDWYiZr/view?usp=drivesdk' },
        { title: 'CH-31 (Prof. Lecture PDF)', url: 'https://drive.google.com/file/d/12heVyuBQXsmHMd-lA9P7rc4wLJyUHiz_/view?usp=drivesdk' },
        { title: 'CH-32 (Last Prof. Lec. PDF)', url: 'https://drive.google.com/file/d/1LxbWvmZfbuiLaT9f3W5WMPzUBqYxw_-e/view?usp=drivesdk' },
      ]
    },
    {
      id: 'daa',
      name: 'DAA',
      fullName: 'Design and Analysis of Algorithms',
      icon: '⚙️',
      color: 'bg-red-500',
      playlists: {
        detailed: [
          { title: 'DAA Playlist -Gate Hub', url: 'https://youtube.com/playlist?list=PL1QH9gyQXfgs7foRxIbIH8wmJyDh5QzAm&si=vo60TQy-DFTAaQ7Z', recommended: true },
          { title: 'Unitwise Oneshot Playlist -Multi Atoms', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8tP7SvFD3zS8zxRYfKWg_yf&si=uoCCPq2VIigQ5cNj', recommended: true },
          { title: 'DAA Playlist -University Academy', url: 'https://youtube.com/playlist?list=PL-JvKqQx2Atd--1Gs3WB8nmWOWRbEM7WW&si=Cs-dTfF4-xdHYysV', recommended: true },
        ],
        oneshot: [
          { title: 'DAA One Shot -Knowledge Gate', url: 'https://youtu.be/z6DY_YSdyww?si=_vhMIt9WJPoAkhKV' },
          { title: 'DAA One Shot -5 Min. Engg.', url: 'https://youtu.be/h1mAUcDXCG0?si=Kvqf4Vmk6hwOnb4x', recommended: true },
        ]
      },
      notes: [
        { title: 'DAA Unit-1 Notes', url: 'https://drive.google.com/file/d/14Trs7Ge_xdaGCLUA6Lh1cpLD-EHWUEbT/view?usp=drivesdk' },
        { title: 'DAA Unit-2 Notes', url: 'https://drive.google.com/file/d/18rKTgtSxtn7p6RTWzDka8CSiLF-6Pow2/view?usp=drivesdk' },
        { title: 'DAA Unit-3 Notes', url: 'https://drive.google.com/file/d/1VNo796SOhr3PUejZW0kdqubUmyxapH30/view?usp=drivesdk' },
        { title: 'DAA Unit-4 Notes', url: 'https://drive.google.com/file/d/1Dd_61x5YnAj2EWD_auhXFmXv2OLSBgy8/view?usp=drivesdk' },
        { title: 'DAA Unit-5 Notes', url: 'https://drive.google.com/file/d/1PrMeHxGMgrQhWc4asCs00UJ3XSNw3sdk/view?usp=drivesdk' },
        { title: 'DAA All Unit Notes', url: 'https://drive.google.com/file/d/1AtK4hZ9wHSZ-pSlN8fd36zmZp7o-u60q/view?usp=drivesdk' },
        { title: 'Complete DAA Notes-5 Min.Engg. (best)', url: 'https://drive.google.com/uc?export=download&id=1D9ElRUV9QF6Ri3x5aRxyEeeQ3VUfdNYv' },
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 5th Semester CSE',
      icon: '❓',
      color: 'bg-red-600',
      playlists: { detailed: [], oneshot: [] },
      notes: [
        { title: 'Mid Sem-1 PYQs (2025-26)', url: 'https://drive.google.com/uc?export=download&id=1hwZUf4FxQfW8EoLcWR2XWjWroxvFz_As' },
        { title: 'Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1PZ-P27xJkvH3FCj_fv_QrC88HrJAD5SA/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2025-26)', url: 'https://drive.google.com/file/d/1WlsPtaDNmbLESlsuxPj8v3j2imF6eRST/view?usp=drivesdk' },
        { title: 'Mid sem-1 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1EazLLUeWlY2BZxFJP25PlcEo5Zu4V1rG' },
        { title: 'ESE PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1yHRuoCBaTwQ8i32JLiqxFUeiaS38__fp' },
        { title: 'Mid Sem-1 PYQs (2022-23)', url: 'https://drive.google.com/uc?export=download&id=1JuRAwhvJT_CKXeajVgBcFAbq-gc7yeCk' },
        { title: 'Mid Sem-2 PYQs (2022-23)', url: 'https://drive.google.com/uc?export=download&id=12FS2XjhzpgWpDyWSPUj-Kji_ygTViDjv' },
        { title: '5th & 6th Sem_Mid & ESE (2021-22)', url: 'https://drive.google.com/uc?export=download&id=1Ri4K7fLnTx3uAi1RyBwG1RSs8PrqFLQn' },
      ]
    },
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CSE-5th Semester');
  
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
    title: '5th Semester CSE Syllabus',
    url: 'https://drive.google.com/file/d/1FLX3oeRQM_jGcT1NvsY85EtygH6Lxtkf/view?usp=drivesdk'
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
            <h1 className="text-3xl font-serif leading-tight mb-2">{subject.name} Notes</h1>
            <p className="text-xs opacity-50 uppercase tracking-widest">Computer Science & Engineering — 5th Semester</p>
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
            onClick={() => navigate('/btech-notes/third-year/semester-5')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Computer Science & Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            5th Semester<br />
            <span className="opacity-60">Computer Science & IT Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Computer Science & IT — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">CSE Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">5th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
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
              <p className="font-semibold text-foreground text-sm">5th Semester CSE Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 5th semester CSE/IT</p>
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
            {subjects.map((subject, index) => {
              const playlists = getSubjectPlaylists(subject.id);
              const hasDetailedPlaylist = playlists.detailed && playlists.detailed.length > 0;
              const hasOneshotPlaylist = playlists.oneshot && playlists.oneshot.length > 0;

              return (
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

                    {subject.id !== 'pyqs' && (hasDetailedPlaylist || hasOneshotPlaylist) && (
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
                            {hasDetailedPlaylist && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                              >
                                📚 Detailed ({playlists.detailed.length})
                              </button>
                            )}
                            {hasOneshotPlaylist && (
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

            {/* Open Elective Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: subjects.length * 0.06, duration: 0.4 }}
            >
              <div
                className="group border border-yellow-500/50 hover:border-yellow-500 rounded-xl p-5 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col cursor-pointer"
                onClick={() => navigate('/fifth-semester-open-electives')}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">📚</span>
                  <span className="text-xs font-bold text-white bg-yellow-500 px-2 py-0.5 rounded-full">7 Subjects</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 flex-1">Open Electives</h3>
                <p className="text-xs text-muted-foreground mb-4">Business Ethics, Environment & Ecology, Soft Skills, and more...</p>
                <div className="mt-auto">
                  <button className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-yellow-500/50 hover:bg-yellow-500 hover:text-white transition-all duration-200">
                    View All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

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

export default FifthSemesterCSENotes;

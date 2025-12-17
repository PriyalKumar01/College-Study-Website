import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FifthSemesterCSENotes = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');

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

  const subjects = [
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
          { title: 'TOAFL-by 5 Min.Engg.', url: 'https://youtu.be/acCztqcZi_Q?si=u77gG3cBgxXyi94Q' , recommended: true},
          { title: 'TOAFL-by Knowledge GATE', url: 'https://youtu.be/9kuynHcM3UA?si=S0ZoakGy81zG1-r2', recommended: true },
        ]
      },
      notes: [
        { title: 'Unit-1 (Part-1) Intro', url: 'https://drive.google.com/uc?export=download&id=1kjeyYAnyvZ27BRNS-809YVqRA_S3l6lS' },
        { title: 'Unit-1 (Part-2) Finite Automata', url: 'https://drive.google.com/uc?export=download&id=1leNJq-PeybsShSZzAi1q4AxXfvQx0dbs' },
        { title: 'Unit-1 (Part-3) Finite Automata', url: 'https://drive.google.com/uc?export=download&id=1s5xIbwm8SW0nWwUe5yCKkTpgKXe1N12P' },
        { title: 'Unit-1 (Part-4) FSA', url: 'https://drive.google.com/uc?export=download&id=12iicJxCdSfDeMkMlVYW7jiT_GGdriSKT' },
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
          { title: 'All Unit Imp. Ques.', url: 'https://youtu.be/Jl3gLo2fUYM?si=7OSKmeps1gQ-xBmB', recommended: true },
          { title: 'DBMS One Shot -5 Min. Engg.', url: 'https://youtu.be/jzuzxEFoiss?si=keewHhai6mXkNmOg', recommended: true },
          { title: 'DBMS One Shot -Knowledge Gate', url: 'https://youtu.be/YRnjGeQbsHQ?si=mgvvNkChOHukHobq', recommended: true },
        ]
      },
      notes: [
        { title: 'DBMS-Quantum Book', url: 'https://drive.google.com/uc?export=download&id=1DNKGyHci5Du4yjaL2Mf3EYHSADPz13la' },
        { title: 'DBMS Complete Notes - KnowledgeGATE', url: 'https://drive.google.com/uc?export=download&id=1oubD7Ov62JD1SOwhx-XsWqqK3TbOHAbn' },
        { title: 'DBMS Complete Notes-MultiAtoms', url: 'https://drive.google.com/uc?export=download&id=1O399cHUYpgAFswLIIzZjJuZ_Se98_oby' },
        { title: 'DBMS Complete Notes-5 min. Engg.', url: 'https://drive.google.com/uc?export=download&id=15lUt9NLdShn6fTg4QaRiGRyUWJJ3K4Z5' },
        { title: 'DBMS Book-Henry Korth', url: 'https://drive.google.com/uc?export=download&id=1GMdDx-BuR3pcnla16xVJ4mOx4JMrxlTd' },
        { title: 'DBMS Practical File- Priyal Kumar', url: 'https://drive.google.com/file/d/1FhsohpFS5j91ykfH350X90VezA2u9_ZT/view?usp=drivesdk' },
        { title: 'Unit-1 Part-1 Navathe', url: 'https://drive.google.com/uc?export=download&id=1Njok356K8ftqy6IfELlH2LoYh4ncX0Kx' },
        { title: 'Unit-1 Part-2 Navathe', url: 'https://drive.google.com/uc?export=download&id=1il-V1xgTxz0cRdiVzhYqdpE4hrWIA_Kw' },
        { title: 'Unit-2 Part-3 Navathe', url: 'https://drive.google.com/uc?export=download&id=1xK0r9BkxR3BtA0iM9zJdcM5UNe7duy8S' },
        { title: 'Unit-1 Part-4 Navathe', url: 'https://drive.google.com/uc?export=download&id=1_PyxPpuWG1F7NJYxjaW2wFqjmuseUjsT' },
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
        { title: 'CH-19 (*17th & 18th pdf is not in syllabus )', url: 'https://drive.google.com/file/d/14fESRsqsXSMgJb1z07KO3ehB0_jqr7qx/view?usp=drivesdk' },
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
      id: 'business-ethics',
      name: 'Business Ethics',
      fullName: 'Business Ethics (Open Elective)',
      icon: '📋',
      color: 'bg-indigo-500',
      playlists: {
        detailed: [
          { title: 'Business Ethics Playlist', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7ejgPDoJZW9Q22qJgXDB8IA&si=pDbk-4sUa5AdafNx' , recommended: true },
          { title: 'Playlist -Only watch related topics Videos', url: 'https://youtube.com/playlist?list=PLI8rtkxfMUYVuC_POmiWKTlRutAdGWfSq&si=KjP_lyImdrxB37mk' },
          { title: 'Playlist -Only watch topics-wise Videos', url: 'https://youtube.com/playlist?list=PLeUIXA68NobWnEOojETHpolPkR6qXszU2&si=AoNt743N0d1I3_A7' , recommended: true  },
        ],
        oneshot: [
          { title: 'Business Ethics', url: 'https://youtu.be/ltW7KVYJ1go?si=VNMtqFzwF6Ge7wq3' },
          { title: 'Ethical Decision Making', url: 'https://youtu.be/73MnDxDPv6w?si=Q9EnJRn2xxf-vpSw' },
          { title: 'Corporate Social Responsibility', url: 'https://youtu.be/BWQ56WOMTT4?si=GoS-gd2AdrgKY5a2' },
          { title: 'Marketing Ethics', url: 'https://youtu.be/rfAWVcORC_M?si=pDupNteELaSY3L3P' },
          { title: 'Corporate Governance', url: 'https://youtu.be/hVOkmReERiE?si=CihY_vL13DjYlj14' },
          { title: 'Theories of Corporate Governance', url: 'https://youtu.be/SZAHAXYxX34?si=OEhJaTeZ3Y_a8I4k' },
        ]
      },
      notes: [
        { title: 'Syllabus', url: 'https://drive.google.com/uc?export=download&id=1Q7abTYsAJ14M2VgXaKWKYWYKZ1VHzR7O' },
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1JIhpotQbWbC_ryy7H-fyZOgMmqwXewsA' },
        { title: 'Unit-2 Part-1', url: 'https://drive.google.com/uc?export=download&id=1BG0eCO9jLeoLR68sBreMSxUCPA-DOmSI' },
        { title: 'Unit-2 Part-2', url: 'https://drive.google.com/uc?export=download&id=1BF7V9tNpAK8i3awM6zU8UtW9QDJvkUeV' },
        { title: 'Unit-2 Part-3', url: 'https://drive.google.com/uc?export=download&id=1enrdv3TDcXVAAXOd8zoNAFsBOMi58eNC' },
        { title: 'Unit-2 Part-4', url: 'https://drive.google.com/uc?export=download&id=14C3hUK3bPYA1KpNuBqr7HnQ6pFP8g410' },
        { title: 'Unit-2 Part-5', url: 'https://drive.google.com/uc?export=download&id=1D0QrnqjcONsYvDtyoiZKS4ueGSIMbgAT' },
        { title: 'Unit-2 Case Study: On Dilemma', url: 'https://drive.google.com/uc?export=download&id=1Dp1NF-RIATPr6CU-yQrTka2ibaowWw_l' },
        { title: 'Unit-3 Part-1', url: 'https://drive.google.com/uc?export=download&id=1pB5cQ7iJ_NPiDs-w77Xw0KIIVeEGGLNv' },
        { title: 'Unit-3 Part-2', url: 'https://drive.google.com/uc?export=download&id=1zgzoyye9-shZCxCNYWcP8n5HwJiN09cd' },
        { title: 'Unit-3 Part-3', url: 'https://drive.google.com/uc?export=download&id=1WzQMBm4wG1aUwulXKUeNXMNjmeqX_zFy' },
        { title: 'Unit-3 Part-4', url: 'https://drive.google.com/uc?export=download&id=12alClJeKBTeE_1XIRJvJPkQ-Un9tS4X4' },
        { title: 'Unit-4 Part-1', url: 'https://drive.google.com/uc?export=download&id=1I_1P84wI9Ke8bUuptcCsQq7iSXprJEzT' },
        { title: 'Unit-4 Part-2', url: 'https://drive.google.com/uc?export=download&id=1tHs6ovfZ8dFwsV516_gGRvu4rvtAz899' },
        { title: 'Unit-5 Corporate Governance', url: 'https://drive.google.com/file/d/1h8x6Md6_4X2jn35_W07yCrBpOEfy-OM5/view?usp=drivesdk' },
      ]
    },
    {
      id: 'env-ecology',
      name: 'Environment & Ecology',
      fullName: 'Environment & Ecology (Open Elective)',
      icon: '🌿',
      color: 'bg-emerald-500',
      playlists: {
        detailed: [
          { title: 'Environment & Ecology Playlist', url: '#' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'soft-skills',
      name: 'Soft Skills & PD',
      fullName: 'Soft Skills & Personality Development (Open Elective)',
      icon: '🎯',
      color: 'bg-pink-500',
      playlists: {
        detailed: [
          { title: 'Soft Skills Playlist', url: '#' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'critical-thinking',
      name: 'Critical & Logical Thinking',
      fullName: 'Critical & Logical Thinking (Open Elective)',
      icon: '🧠',
      color: 'bg-cyan-500',
      playlists: {
        detailed: [
          { title: 'Critical Thinking Playlist', url: '#' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'solar-energy',
      name: 'Solar Energy',
      fullName: 'Solar Energy (Open Elective)',
      icon: '☀️',
      color: 'bg-yellow-500',
      playlists: {
        detailed: [
          { title: 'Solar Energy Playlist', url: '#' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'non-conventional-energy',
      name: 'Non-Conventional Energy',
      fullName: 'Non-Conventional Energy Resources (Open Elective)',
      icon: '⚡',
      color: 'bg-amber-500',
      playlists: {
        detailed: [
          { title: 'Non-Conventional Energy Playlist', url: '#' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'discrete-maths',
      name: 'Discrete Maths',
      fullName: 'Discrete Mathematics (Open Elective)',
      icon: '🔢',
      color: 'bg-violet-500',
      playlists: {
        detailed: [
          { title: 'Discrete Maths Playlist', url: '#' }
        ],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 5th Semester CSE',
      icon: '❓',
      color: 'bg-red-600',
      playlists: {
        detailed: [],
        oneshot: []
      },
      notes: [
        { title: 'Mid Sem-1 PYQs (2025-26)', url: 'https://drive.google.com/uc?export=download&id=1hwZUf4FxQfW8EoLcWR2XWjWroxvFz_As' },
        { title: 'Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1PZ-P27xJkvH3FCj_fv_QrC88HrJAD5SA/view?usp=drivesdk' },
        { title: 'Mid sem-1 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1EazLLUeWlY2BZxFJP25PlcEo5Zu4V1rG' },
        { title: 'ESE PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1yHRuoCBaTwQ8i32JLiqxFUeiaS38__fp' },
        { title: 'Mid Sem-1 PYQs (2022-23)', url: 'https://drive.google.com/uc?export=download&id=1JuRAwhvJT_CKXeajVgBcFAbq-gc7yeCk' },
        { title: 'Mid Sem-2 PYQs (2022-23)', url: 'https://drive.google.com/uc?export=download&id=12FS2XjhzpgWpDyWSPUj-Kji_ygTViDjv' },
        { title: '5th & 6th Sem_Mid & ESE (2021-22)', url: 'https://drive.google.com/uc?export=download&id=1Ri4K7fLnTx3uAi1RyBwG1RSs8PrqFLQn' },
      ]
    },
  ];

  const syllabus = {
    title: '5th Semester CSE Syllabus',
    url: '#'
  };

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

  // Subject detail view
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
              {subject.fullName} - 5th Semester CSE/IT
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
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

  // Main subjects grid view
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
            onClick={() => navigate('/btech-notes/third-year/semester-5')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            5th Semester CSE/IT Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Computer Science & IT - Comprehensive study materials
          </p>
        </motion.div>

        {/* Syllabus Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{syllabus.title}</h3>
                <p className="text-sm text-muted-foreground">Official syllabus for 5th semester CSE/IT</p>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload(syllabus.url, syllabus.title)} 
              className="btn-hero"
              disabled={syllabus.url === '#'}
            >
              <Download className="h-4 w-4 mr-2" />
              {syllabus.url === '#' ? 'Coming Soon' : 'Download Syllabus'}
            </Button>
          </div>
        </motion.div>

        {/* Open Electives Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                📚 Open Elective Subjects
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Students choose ONE open elective from the available options. Scroll down to find notes for all open elective subjects.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const playlists = getSubjectPlaylists(subject.id);
            const hasDetailedPlaylist = playlists.detailed && playlists.detailed.length > 0;
            const hasOneshotPlaylist = playlists.oneshot && playlists.oneshot.length > 0;

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
                      {subject.icon}
                    </div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {subject.notes.length} notes available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {subject.notes.length} Files
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubject(subject.id)}
                        className="flex-1"
                      >
                        View Notes
                      </Button>
                    </div>
                    
                    {/* Playlists Section */}
                    {(hasDetailedPlaylist || hasOneshotPlaylist) && (
                      <div className="pt-2 border-t">
                        <button
                          onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                          className="w-full flex items-center justify-between p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Study Playlists
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Playlist Modal */}
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

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FifthSemesterCSENotes = () => {
  const navigate = useNavigate();
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
    url: 'https://drive.google.com/file/d/1FLX3oeRQM_jGcT1NvsY85EtygH6Lxtkf/view?usp=drivesdk'
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
          className="mb-8"
        >
          <Card className="gradient-card border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                5th Semester CSE Syllabus
              </CardTitle>
              <CardDescription>
                Official syllabus for 5th semester CSE/IT
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
          {subjects.map((subject, index) => {
            const playlists = getSubjectPlaylists(subject.id);
            const hasDetailedPlaylist = playlists.detailed && playlists.detailed.length > 0;
            const hasOneshotPlaylist = playlists.oneshot && playlists.oneshot.length > 0;

            return (
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
                      <Badge className="bg-green-500 text-white">{subject.notes.length} Files</Badge>
                      <Button variant="outline" size="sm">View Notes</Button>
                    </div>
                    
                    {/* Study Playlists Section - Collapsible like FirstSemesterNotes */}
                    {subject.id !== 'pyqs' && (hasDetailedPlaylist || hasOneshotPlaylist) && (
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
                            {hasDetailedPlaylist && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs h-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlaylistClick(subject.id, 'detailed');
                                }}
                              >
                                📚 Detailed Playlists ({playlists.detailed.length})
                              </Button>
                            )}
                            {hasOneshotPlaylist && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs h-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlaylistClick(subject.id, 'oneshot');
                                }}
                              >
                                ⚡ One Shot Videos ({playlists.oneshot.length})
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* Open Elective Card - Navigate to separate page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (subjects.length + 1) * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-yellow-500/50 hover:border-yellow-500 shadow-lg hover:shadow-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
              onClick={() => navigate('/fifth-semester-cse-open-electives')}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto shadow-lg">
                  📚
                </div>
                <CardTitle className="text-lg text-center">Open Electives</CardTitle>
                <CardDescription className="text-center">
                  7 elective subjects available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-yellow-500 text-white">7 Subjects</Badge>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Choose from Business Ethics, Environment & Ecology, Soft Skills, and more...
                </p>
              </CardContent>
            </Card>
          </motion.div>
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

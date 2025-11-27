import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const FifthSemesterCSENotes = () => {
  const navigate = useNavigate();
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const subjects = [
    {
      id: 'toafl',
      name: 'TOAFL',
      fullName: 'Theory of Automata and Formal Languages',
      description: 'Finite automata, regular languages, context-free grammars, and Turing machines',
      notes: [
        { title: 'Unit-1 (Part-1) Intro', url: 'https://drive.google.com/uc?export=download&id=1kjeyYAnyvZ27BRNS-809YVqRA_S3l6lS' },
        { title: 'Unit-1 (Part-2) Finite Automata', url: 'https://drive.google.com/uc?export=download&id=1leNJq-PeybsShSZzAi1q4AxXfvQx0dbs' },
        { title: 'Unit-1 (Part-3) Finite Automata', url: 'https://drive.google.com/uc?export=download&id=1s5xIbwm8SW0nWwUe5yCKkTpgKXe1N12P' },
        { title: 'Unit-1 (Part-4) FSA', url: 'https://drive.google.com/uc?export=download&id=12iicJxCdSfDeMkMlVYW7jiT_GGdriSKT' },
        { title: 'Unit-1 (Part-5) Minimization of DFA', url: 'https://drive.google.com/uc?export=download&id=1RCEWYXj2CbuFSwbImho21oE5BC_LEVTl' },
        { title: 'Unit-1 (Part-6) Numerical\'s', url: 'https://drive.google.com/uc?export=download&id=1dvmHtwB8xgHW4XHcRIDbFOU4HtiEWZ_3' },
        { title: 'Unit-2 (Part-1) Formal Language', url: 'https://drive.google.com/uc?export=download&id=12ibIAp1ADgGHx-aXO_f0-gG94bFLXBuU' },
        { title: 'Unit-2 (Part-2) Regular Language', url: 'https://drive.google.com/uc?export=download&id=178jZZLY_uUgGabJ_pt26EdVuMxhfNwbm' },
        { title: 'Unit-2 (Part-3) Identification of R.L', url: 'https://drive.google.com/uc?export=download&id=1jTGsam3FTCJcNKBFn9m2ZlL-4cUh1OOV' },
        { title: 'Unit-2 (Part-4) Conversion of F.A 🔁 R.E', url: 'https://drive.google.com/uc?export=download&id=1LF5Ty6aCr3rErbp9nXyKCDyklq7ZF_Sg' },
        { title: 'Unit-2 (Part-5) Numerical\'s', url: 'https://drive.google.com/uc?export=download&id=1ZvoI1UK0-UBpqcPwWDrfCB1SvjgqfZpO' },
        { title: 'Unit-3 (Part-1) C.F.G', url: 'https://drive.google.com/uc?export=download&id=16vRF2qbp_Qy0PlmGbNIFSgk8CXyJcTJt' },
        { title: 'Unit-3 (Part-2) Ambiguity', url: 'https://drive.google.com/uc?export=download&id=1HHhQqw1vENarMeC43GRK0XpUD9wEutwx' },
        { title: 'Unit-3 (Part-3) Normal form of CFG', url: 'https://drive.google.com/uc?export=download&id=1Uv2BRORyA3MM2VejDACIwgGvGWc93HBr' },
        { title: 'Unit-3 (Part-4) Conversion R.G to F.A', url: 'https://drive.google.com/uc?export=download&id=1Hc9UmUpAb-jefzVJkkz4lwLqMBQ1SGwi' },
        { title: 'Unit-3 (Part-5) Removal of € Production', url: 'https://drive.google.com/uc?export=download&id=1H4TrVwfMIK99FL09vFka14VYXBz7qU7l' },
        { title: 'Unit-3 (Part-6) Numerical\'s', url: 'https://drive.google.com/uc?export=download&id=1FgF7K2tBaNbnDSKU1gxNbeYJSPKazhAt' },
        { title: 'Unit-4 (Part-1) PDA', url: 'https://drive.google.com/uc?export=download&id=1z34TgJxZAv8TdhQu2LT8cdJdX_2dF1e1' },
        { title: 'Unit-4 (Part-2) CFL & PDA', url: 'https://drive.google.com/uc?export=download&id=11zgw3vxokIntpi_X7uyvaDtwurwozhTy' },
        { title: 'Unit-4 (Part-3) Deterministic PDA & CFL', url: 'https://drive.google.com/uc?export=download&id=19AtDKXmRjEDDy2AUyGpzPzmGmxRHr-K5' },
        { title: 'Unit-4 (Part-4) Numerical\'s', url: 'https://drive.google.com/uc?export=download&id=1jOerH4n6SsTS1GauHKYqQ6MhhIwpzFCN' },
        { title: 'Unit-5 (Part-1) Turing Machine', url: 'https://drive.google.com/uc?export=download&id=18npomOndEib0Sfp4w61bIJA6Pwf_0V_z' },
        { title: 'Unit-5 (Part-2) Turing Machine as Lang. Acceptor', url: 'https://drive.google.com/uc?export=download&id=1ZE6BNjPKb9kWh8F-8eUQv9UtDBQT-gJX' },
        { title: 'Unit-5 (Part-3) LBA & Decidability Problem', url: 'https://drive.google.com/uc?export=download&id=1c5Xyn5CYpTsBmuCXqUohX3dwYaPvGEgT' },
        { title: 'Unit-5 (Part-4) Numerical\'s', url: 'https://drive.google.com/uc?export=download&id=1L_D8l0_FkYEcWrPLXBmxPPIEHbnGojfH' },
        { title: 'TOAFL Full Notes by 5 min. Engg.', url: 'https://drive.google.com/uc?export=download&id=1Coqf6FN6nUBddkL8uXp_bwUmsLTNje2E' },
      ]
    },
    {
      id: 'dbms',
      name: 'DBMS',
      fullName: 'Database Management Systems',
      description: 'Database design, SQL, normalization, and transaction management',
      notes: [
        { title: 'DBMS Book', url: 'https://drive.google.com/uc?export=download&id=1GMdDx-BuR3pcnla16xVJ4mOx4JMrxlTd' },
        { title: 'Complete DBMS Notes', url: 'https://drive.google.com/uc?export=download&id=15lUt9NLdShn6fTg4QaRiGRyUWJJ3K4Z5' },
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
      description: 'Data analysis, machine learning, and statistical modeling',
      notes: [
        { title: 'FULL Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1tevE9l-E44Jd3l2lL9YlDY1qrXfEBhDA' },
        { title: 'Statistics Notes', url: 'https://drive.google.com/file/d/1NV6lQsVOTc2c4OpMt6VykRZvMvtYe8DT/view?usp=drivesdk' },
        { title: 'Unit-2 Part-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1LXSfbvhVZbJDUI6eivtySq7b98bKWZac' },
        { title: 'All DS Notes from Data Modeling Onwards', url: 'https://drive.google.com/file/d/1MavBmoF6Ayn2OX6-JEtjXSj-8B0lQa7V/view?usp=drivesdk' },
        { title: 'DS Practical File- Priyal', url: 'https://drive.google.com/file/d/19RsKe9Aw3FT1_m35r9kOhqSKsA5tF1jg/view?usp=drivesdk' },
        { title: 'DS Practical Exam PYQs(2025-26)', url: 'https://drive.google.com/file/d/1V7Un3Ye1MEQvx_LEY-3QHvYKJyUEUfuZ/view?usp=drivesdk' },
      ]
    },
    {
      id: 'cn',
      name: 'Computer Network',
      fullName: 'Computer Networks',
      description: 'Network protocols, layers, routing, and network security',
      notes: [
        { title: 'CN Forouzan Book', url: 'https://drive.google.com/uc?export=download&id=1kLMlKMA0AZ1saBEmQzYJv-8OZjYp04G0' },
        { title: 'CN Book - Tanenbaum', url: 'https://drive.google.com/uc?export=download&id=17Lzpfbjp_TUzirEfqEwBujBRpwGlM_1x' },
        { title: 'FULL Unit-1 & 2 Handwritten Notes', url: 'https://drive.google.com/uc?export=download&id=1FdlyWmdpcePy9ON19EckOpM32MATHk1W' },
        { title: 'CN Quantum Book (best)', url: 'https://drive.google.com/uc?export=download&id=135ML5uks26wJiAKR9oOQ4kOK8CO6aBAC' },
        { title: 'CN Complete Notes', url: 'https://drive.google.com/file/d/1L3WfHCH893Xr6LGOeS8uXPhFloVP6xMB/view?usp=drivesdk' },
        { title: 'CN Practical File- Priyal', url: 'https://drive.google.com/file/d/1YpEVjHMbPVa8nIXD1yhSHPAwV5FmAcWe/view?usp=drivesdk' },
        
      ]
    },
    {
      id: 'daa',
      name: 'DAA',
      fullName: 'Design and Analysis of Algorithms',
      description: 'Algorithm design techniques, complexity analysis, and optimization',
      notes: [
        { title: 'Complete DAA Notes', url: 'https://drive.google.com/uc?export=download&id=1D9ElRUV9QF6Ri3x5aRxyEeeQ3VUfdNYv' },
      ]
    },
    {
      id: 'business-ethics',
      name: 'Business Ethics',
      fullName: 'Business Ethics (Open Elective)',
      description: 'Ethical principles and decision-making in business contexts',
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
      ]
    },
  ];

  const pyqs = [
    { title: 'Mid Sem-1 PYQ\'S (2025-26)', url: 'https://drive.google.com/uc?export=download&id=1hwZUf4FxQfW8EoLcWR2XWjWroxvFz_As' },
    { title: 'Mid Sem-2 PYQ\'S (2025-26)', url: 'https://drive.google.com/file/d/1PZ-P27xJkvH3FCj_fv_QrC88HrJAD5SA/view?usp=drivesdk' },
    { title: 'Mid sem-1 PYQ\'S (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1EazLLUeWlY2BZxFJP25PlcEo5Zu4V1rG' },
    { title: 'ESE PYQ\'S (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1yHRuoCBaTwQ8i32JLiqxFUeiaS38__fp' },
    { title: 'Mid Sem-1 PYQ\'S (2022-23)', url: 'https://drive.google.com/uc?export=download&id=1JuRAwhvJT_CKXeajVgBcFAbq-gc7yeCk' },
    { title: 'Mid Sem-2 PYQ\'S (2022-23)', url: 'https://drive.google.com/uc?export=download&id=12FS2XjhzpgWpDyWSPUj-Kji_ygTViDjv' },
    { title: '5th & 6th Sem_Mid & ESE (2021-22)', url: 'https://drive.google.com/uc?export=download&id=1Ri4K7fLnTx3uAi1RyBwG1RSs8PrqFLQn' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate('/btech-notes/third-year/semester-5')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Branches
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            5th Semester - CSE/IT Notes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Computer Science & IT - Comprehensive study materials and resources
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-5xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{subject.name}</CardTitle>
                      </div>
                      <CardDescription className="text-base mb-1">
                        {subject.fullName}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {subject.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSubjectExpansion(subject.id)}
                      className="ml-4"
                    >
                      {expandedSubjects.includes(subject.id) ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {expandedSubjects.includes(subject.id) && (
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Study Notes
                      </h3>
                      <div className="grid gap-2">
                        {subject.notes.map((note, idx) => (
                          <a
                            key={idx}
                            href={note.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <span className="text-sm font-medium">{note.title}</span>
                            <Download className="h-4 w-4 text-primary" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}

          {/* PYQs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="feature-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">Previous Year Questions</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Practice with past examination papers
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSubjectExpansion('pyqs')}
                    className="ml-4"
                  >
                    {expandedSubjects.includes('pyqs') ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedSubjects.includes('pyqs') && (
                <CardContent>
                  <div className="grid gap-2">
                    {pyqs.map((pyq, idx) => (
                      <a
                        key={idx}
                        href={pyq.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <span className="text-sm font-medium">{pyq.title}</span>
                        <Download className="h-4 w-4 text-primary" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FifthSemesterCSENotes;

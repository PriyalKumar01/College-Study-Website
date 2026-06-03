import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MBANotes = () => {
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
      id: 'me',
      name: 'Managerial Economics',
      fullName: 'Managerial Economics',
      description: 'Economic principles for business decision-making',
      notes: [
        { title: 'Elasticity of Demand', url: 'https://drive.google.com/uc?export=download&id=1uwwvFNabyQRv64ba-OhGwUrGTWvDQyX3' },
        { title: 'Managerial Economics Notes', url: 'https://drive.google.com/uc?export=download&id=1sgJkwKN__TzP_xD6daGFjJvk3iJhZmU7' },
        { title: 'Utility Notes', url: 'https://drive.google.com/uc?export=download&id=1dRjRVlSIrEzAwJzuC7WTMf-wBp5iyCk7' },
        { title: 'Unit-2 Supply Notes', url: 'https://drive.google.com/uc?export=download&id=1VystvhTyb86aBjrEjh72phrvc9r_pZxd' },
        { title: 'Demand Notes', url: 'https://drive.google.com/uc?export=download&id=1Dc5bPzpChi1UdwmWzwya2YSSt_rz-h4I' }
      ]
    },
    {
      id: 'be',
      name: 'Business Environment',
      fullName: 'Business Environment',
      description: 'Understanding business ecosystems and regulations',
      notes: [
        { title: 'Business Environment Book', url: 'https://drive.google.com/uc?export=download&id=14BKVSOGc2Kacu_Mcut3TI1UqLlxgKTiH' },
        { title: 'Business Laws & Corporate Governance', url: 'https://drive.google.com/uc?export=download&id=1DZ3Tj6FMnBTxePzhfnRFAAlU15_cJIpo' },
        { title: 'Role of Gov. in Business', url: 'https://drive.google.com/uc?export=download&id=1Ha4bZBL2PpiPDXGaWrmVCXmk5VkBkfGO' },
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1ddJ-3CUtNeQiGAwQjmMna9MalEThq92L' }
      ]
    },
    {
      id: 'bs',
      name: 'Business Statistics',
      fullName: 'Business Statistics',
      description: 'Statistical methods for business analysis',
      notes: [
        { title: 'Dispersion & Its Measurement', url: 'https://drive.google.com/uc?export=download&id=1vlypeFTaGoRVNXEGijllY_lnt-SPKmz2' },
        { title: 'Imp. Questions PDF', url: 'https://drive.google.com/uc?export=download&id=1f7hfLod17GCGvqS9pb8WNVAUTxmzssPV' },
        { title: 'Objective & Type of Planning', url: 'https://drive.google.com/uc?export=download&id=1aR0ucLQW_asZpnQyUcakDzMdOeaVk1kG' },
        { title: 'Probability Notes', url: 'https://drive.google.com/uc?export=download&id=1vmo8FlYFKjNMUh2U7-ZeVg5y5V_1Y4J9' }
      ]
    },
    {
      id: 'comm',
      name: 'Communication',
      fullName: 'Business Communication',
      description: 'Effective communication in business',
      notes: [
        { title: 'Handwritten Notes by Priyal Kumar', url: 'https://drive.google.uc?export=download&id=1IU2Sx7z1UWJkz4kDH7dXj8g7sKF6qJ6G' },
        { title: 'Process of Business Communication', url: 'https://drive.google.com/uc?export=download&id=1lcZa_5W2Fivb-9UhvIyljuEE-H-UWtUa' },
        { title: 'Concept, Role & Purpose of Communication', url: 'https://drive.google.com/uc?export=download&id=1SvhC9kjWH7oDPw3K-kQih0Kwku8z1RSn' },
        { title: 'Classification of Communication', url: 'https://drive.google.com/uc?export=download&id=1zQ6y5xKO4y7ZNXTurQ8LmoHIuBgy7tWU' },
        { title: 'Verbal & Non-Verbal Communication', url: 'https://drive.google.com/uc?export=download&id=1RoSV8Zn9FuOSAJc94JB1j24snkfQOZoa' }
      ]
    },
    {
      id: 'comp',
      name: 'Computer',
      fullName: 'Computer Applications',
      description: 'Computer fundamentals and applications',
      notes: [
        { title: 'Computer Fundamental', url: 'https://drive.google.com/uc?export=download&id=1hEb-Te7pLTl4ilV4tWVvyLORxbFXyWhu' },
        { title: 'Computer Network PDF', url: 'https://drive.google.com/uc?export=download&id=1hV6QheeX6NXBHSz2zuaBbn7Ub_kB3Kzw' },
        { title: 'Client Server & Peer-to-Peer Network', url: 'https://drive.google.com/uc?export=download&id=1sQic3pnjt346ewYbOAwXqRRtcL2h58Do' },
        { title: 'Windows, File, Folder PDF', url: 'https://drive.google.com/uc?export=download&id=1O_oIKxMDBt--Al6z3KaXEaf5yveYTQmo' }
      ]
    },
    {
      id: 'fa',
      name: 'Financial Accounting',
      fullName: 'Financial Accounting',
      description: 'Principles and practices of accounting',
      notes: [
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1EA5gKb4RwXJMqy1M9PmNrqqHefCln6L3' },
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/uc?export=download&id=1DPvXTzFwopVuDBCl3V4vTB-X8QnwOVB-' },
        { title: 'Normal Distribution Notes', url: 'https://drive.google.com/uc?export=download&id=14JC6zEI5r1laIR0MQZT9w7-bRXac7qCy' }
      ]
    },
    {
      id: 'pom',
      name: 'Principles of Management',
      fullName: 'Principles of Management',
      description: 'Fundamental management concepts and practices',
      notes: [
        { title: 'Concept & Definition of Management', url: 'https://drive.google.com/uc?export=download&id=1ezrP5fk_2rh2NjbweI6qs9JFa3XplZMH' },
        { title: 'Principles of Management', url: 'https://drive.google.com/uc?export=download&id=13YKzgPOmWxlwAlQNT1L3Aez66OmvntSX' }
      ]
    }
  ];

  const pyqs = [
    { title: 'Mid Sem-1 PYQs (2023-24)', url: 'https://drive.google.com/uc?export=download&id=1xQXuYYiSIIAQkrZyg17FUJGaWjHxGTII', sem: '1st' },
    { title: 'Mid Sem-1 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1AL9BWWal0O_I1Cyxm1qn8wXRUWDFBg8z', sem: '1st' },
    { title: 'Mid Sem-2 PYQs (2023-24)', url: 'https://drive.google.com/uc?export=download&id=1OTl_qDkd7v4loY5XsmSwzNY_OM0Q9-gC', sem: '1st' },
    { title: 'Mid Sem-2 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1wZR1TNA91Cg8SuVF79Ho2IrOQMBrARZu', sem: '1st' },
    { title: 'End Sem PYQs (2023-24)', url: 'https://drive.google.com/uc?export=download&id=1TmlJME2NLjNutjPqgDQaR0XEycU83YST', sem: '1st' },
    { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1cCjBfjGygSwn5qmM6me07enDymGuCWHW', sem: '1st' },
    { title: 'Mid Sem-1 PYQs (2023-24)', url: 'https://drive.google.com/uc?export=download&id=1Fx9J_tQzOuAi6GpsCiYgnJMqx-F0pz74', sem: '2nd' },
    { title: 'Mid Sem-1 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1ESeMGiWvCcqtvnUvXD6QYsyW2zjtSVCU', sem: '2nd' },
    { title: 'Mid Sem-2 PYQs (2023-24)', url: 'https://drive.google.com/uc?export=download&id=1DbHciHqd4n2bb6rw2SQDEbW6yg7E7niC', sem: '2nd' },
    { title: 'Mid Sem-2 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1P0DibtM2x0G-64ySMveLvqTcn1pOgtqv', sem: '2nd' },
    { title: 'End Sem PYQs (2023-24)', url: 'https://drive.google.com/uc?export=download&id=188KoRVuImmJ8b60srkb1Z_hzM-G25hs5', sem: '2nd' },
    { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1Zj5gxZ82y_eJNyjItA0thc-XxIJaNN26', sem: '2nd' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Notes
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Management Studies</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            MBA Notes<br />
            <span className="opacity-60">Study Resources</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">Master of Business Administration — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">MBA Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{subjects.length} Core Subjects</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-6 flex-1 w-full mb-12">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4">Core Subjects</p>
        <div className="grid gap-4">
          {subjects.map((subject, index) => {
            const isExpanded = expandedSubjects.includes(subject.id);
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className="group border border-border bg-card rounded-xl p-5 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-foreground text-lg leading-snug">{subject.name}</h3>
                        <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                          {subject.notes.length} files
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground opacity-80 mb-1">{subject.fullName}</p>
                      <p className="text-xs text-muted-foreground">{subject.description}</p>
                    </div>
                    <button
                      onClick={() => toggleSubjectExpansion(subject.id)}
                      className="ml-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-border space-y-4 animate-fade-in">
                      <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-primary" /> Study Notes
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {subject.notes.map((note: any, idx: number) => (
                          <a
                            key={idx}
                            href={note.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-muted transition-all duration-200 border border-border group"
                          >
                            <span className="text-xs font-medium text-foreground line-clamp-1">{note.title}</span>
                            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              <Download className="h-3.5 w-3.5 text-foreground" />
                              <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* PYQs Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: subjects.length * 0.05, duration: 0.3 }}
          >
            <div className="group border border-border bg-card rounded-xl p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-lg leading-snug">Previous Year Questions</h3>
                    <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                      {pyqs.length} files
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Practice with past examination papers</p>
                </div>
                <button
                  onClick={() => toggleSubjectExpansion('pyqs')}
                  className="ml-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {expandedSubjects.includes('pyqs') ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </div>

              {expandedSubjects.includes('pyqs') && (
                <div className="mt-5 pt-5 border-t border-border space-y-6 animate-fade-in">
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-3">1st Semester PYQs</h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {pyqs.filter(p => p.sem === '1st').map((pyq, idx) => (
                        <a
                          key={idx}
                          href={pyq.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-muted transition-all duration-200 border border-border group"
                        >
                          <span className="text-xs font-medium text-foreground line-clamp-1">{pyq.title}</span>
                          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <Download className="h-3.5 w-3.5 text-foreground" />
                            <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-3">2nd Semester PYQs</h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {pyqs.filter(p => p.sem === '2nd').map((pyq, idx) => (
                        <a
                          key={idx}
                          href={pyq.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-muted transition-all duration-200 border border-border group"
                        >
                          <span className="text-xs font-medium text-foreground line-clamp-1">{pyq.title}</span>
                          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <Download className="h-3.5 w-3.5 text-foreground" />
                            <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MBANotes;

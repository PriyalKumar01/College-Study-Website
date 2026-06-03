import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BBANotes = () => {
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
      id: 'em',
      name: 'E&M',
      fullName: 'Economics & Management',
      description: 'Business economics and management principles',
      notes: [
        { title: 'Business Economics Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' },
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' },
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' },
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' }
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
    },
    {
      id: 'itm',
      name: 'IT in Management',
      fullName: 'Information Technology in Management',
      description: 'Application of IT in business management',
      notes: [
        { title: 'Unit-1 Full Notes', url: 'https://drive.google.com/uc?export=download&id=1aRcSfppNYSjYH9BwGjqOORSTFrueWxBc' },
        { title: 'Unit-4 Part-1 Notes', url: 'https://drive.google.com/uc?export=download&id=17yx1tH3FE2bXp0Aq9-z4wCOyXtCzTMoh' },
        { title: 'Unit-4 Part-2 Notes', url: 'https://drive.google.com/uc?export=download&id=1jsD77T9K75mQ_vZ_WIY7qMs6eBYHoSLJ' },
        { title: 'Ms Word (File, Folder, Window)', url: 'https://drive.google.com/uc?export=download&id=16OuKsOaN9ZR3q5tNbh_VstT_pJ5FR5Xu' },
        { title: 'Unit-2 Types of OS Notes', url: 'https://drive.google.com/uc?export=download&id=1OqT3XBqf6P05jgAJSM6hGZZvniIy-9bS' }
      ]
    },
    {
      id: 'ic',
      name: 'Indian Constitution',
      fullName: 'Indian Constitution',
      description: 'Constitutional framework and governance',
      notes: [
        { title: 'Unit-1 Preamble PDF', url: 'https://drive.google.com/uc?export=download&id=1e2zbkhTSLRzaR_WyJrpStQ4yA4DrVqfa' },
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/uc?export=download&id=1praW_irxDoN--7CNsG_ZGM2ymgNUCUTt' },
        { title: 'Unit-4 Notes', url: 'https://drive.google.com/uc?export=download&id=1TmjNFBsL4FneJFKpvzDM6jyp12NzPV-A' },
        { title: 'Keshavanand Bharti Case PDF', url: 'https://drive.google.com/uc?export=download&id=1oYSTGRVg5Yr3d40s-JGBG6rBg_YWbbTB' }
      ]
    },
    {
      id: 'bc',
      name: 'Business Communication',
      fullName: 'Business Communication',
      description: 'Effective communication skills for business',
      notes: [
        { title: 'Unit-2 Sample Business Letter PDF', url: 'https://drive.google.com/uc?export=download&id=1Y4BC0ijoUl9ZyHElbxBOjAydqkeHjKpw' },
        { title: 'Unit-2 Resume Templates PDF', url: 'https://drive.google.com/uc?export=download&id=1nyL84z6M-l_f-mxhRnmMlUtwRUqWEIag' },
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1WI-eXtUiW-rqj25KXPChkKbjDscNwUtA' },
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/uc?export=download&id=1oIjxOmyD6jwDTneOaa_sEX7o7M8GqSgO' }
      ]
    }
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
            BBA Notes<br />
            <span className="opacity-60">Study Resources</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">Bachelor of Business Administration — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">BBA Department</span>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BBANotes;

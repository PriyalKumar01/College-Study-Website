import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, ChevronDown, ChevronRight, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { smartDownload } from '@/lib/downloadUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSubjectsOnly } from '@/data/courseStructure';

const SEMESTERS = [
  '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
  '5th Semester', '6th Semester', '7th Semester', '8th Semester'
];

const BPharmaNotes = () => {
  const navigate = useNavigate();
  const [activeSem, setActiveSem] = useState<string>('1st Semester');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  // Fetch real-time community & admin uploaded materials for B.Pharma
  const { data: communityNotes } = useCommunityNotes('bpharma', [
    activeSem,
    `BPHARMA-${activeSem}`,
    'bpharma'
  ]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const semSubjects = getSubjectsOnly('bpharma', activeSem);

  // Group community notes by subject or special tags
  const subjectsWithNotes = semSubjects.map(sub => {
    const matched = (communityNotes || []).filter(cn => 
      cn.subject === sub.name || 
      cn.subject === sub.fullName || 
      (cn.subject && cn.subject.toLowerCase() === sub.name.toLowerCase())
    );
    return {
      ...sub,
      notes: matched.map(m => ({
        id: m.id,
        title: m.title,
        url: m.file_url,
        fileName: m.file_name,
        uploadedBy: m.user_name || m.uploaded_by,
      }))
    };
  });

  const pyqs = (communityNotes || []).filter(cn => 
    cn.material_type === 'pyqs' || 
    (cn.subject && cn.subject.toLowerCase().includes('pyq'))
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-background text-white pt-16 pb-12 px-4 sm:px-8 border-b border-border/40">
        <div className="max-w-6xl mx-auto">
          <Button
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/80 shadow-sm text-xs font-bold tracking-wide transition-all mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Categories
          </Button>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner">
              💊
            </div>
            <Badge className="bg-emerald-500 text-slate-950 font-extrabold text-xs uppercase px-3 py-1">
              Bachelor of Pharmacy (B.Pharm)
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            B.Pharma Notes & Study Resources
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Curated pharmaceutical sciences resources, lecture notes, lab manuals, and previous year examination question papers.
          </p>

          {/* Semester Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none">
            {SEMESTERS.map(sem => (
              <button
                key={sem}
                onClick={() => { setActiveSem(sem); setExpandedSubjects([]); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  activeSem === sem
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-500" />
              {activeSem} Subjects
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click on any subject to explore unit notes, reference files, and downloads.
            </p>
          </div>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold">
            {subjectsWithNotes.length} Subjects
          </Badge>
        </div>

        {/* Subjects List */}
        <div className="space-y-4">
          {subjectsWithNotes.map((subject, idx) => {
            const isExpanded = expandedSubjects.includes(subject.name);
            return (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
                className="group border border-border bg-card rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:border-emerald-500/40"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSubjectExpansion(subject.name)}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-500/20">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground text-base sm:text-lg truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {subject.name}
                      </h3>
                      {subject.fullName !== subject.name && (
                        <p className="text-xs text-muted-foreground truncate">{subject.fullName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {subject.notes.length} {subject.notes.length === 1 ? 'file' : 'files'}
                    </span>
                    <button className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
                      {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded notes list */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border space-y-2 overflow-hidden"
                    >
                      {subject.notes.length === 0 ? (
                        <div className="py-6 text-center text-xs text-muted-foreground">
                          <p>No study notes uploaded for {subject.name} yet.</p>
                          <p className="text-[11px] mt-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            Be the first to contribute notes via Admin / Contributor Portal!
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {subject.notes.map(note => (
                            <div
                              key={note.id}
                              className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted border border-border/60 transition-colors"
                            >
                              <div className="min-w-0 flex items-center gap-2 pr-2">
                                <FileText className="h-4 w-4 text-emerald-500 shrink-0" />
                                <span className="text-xs font-semibold truncate text-foreground">{note.title}</span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => smartDownload(note.url, note.title)}
                                className="h-8 px-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                              >
                                <Download className="h-3.5 w-3.5 mr-1" /> PDF
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Previous Year Questions Section */}
        <div className="mt-10 border border-border bg-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <span>❓</span> {activeSem} Previous Year Questions (PYQs)
            </h3>
            <Badge variant="outline" className="border-red-500/30 text-red-500 font-semibold">
              {pyqs.length} PYQs Available
            </Badge>
          </div>
          {pyqs.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No previous year questions uploaded for {activeSem} yet. New question papers will be added soon.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {pyqs.map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted border border-border/60"
                >
                  <span className="text-xs font-semibold truncate text-foreground">{p.title}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => smartDownload(p.file_url, p.title)}
                    className="h-8 px-2.5 text-xs font-bold text-red-500"
                  >
                    <Download className="h-3.5 w-3.5 mr-1" /> PDF
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BPharmaNotes;

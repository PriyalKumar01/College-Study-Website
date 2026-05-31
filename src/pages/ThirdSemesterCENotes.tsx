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
import { smartDownload } from '@/lib/downloadUtils';

const ThirdSemesterCENotes = () => {
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CE-3rd Semester');

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const staticSubjects = [
    {
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk' },
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/uc?export=download&id=1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/uc?export=download&id=1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/uc?export=download&id=1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/uc?export=download&id=1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/uc?export=download&id=1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/uc?export=download&id=1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX' }
      ]
    },
    {
      id: 'som',
      name: 'Strength of Materials',
      icon: '💪',
      color: 'bg-green-500',
      notes: [
        { title: 'SOM Book-by RK Bansal', url: 'https://drive.google.com/uc?export=download&id=15ahuMSoS3b6XeNwK7WVxOQ93pk9ukMwx' },
        { title: 'SOM lab Ques.', url: 'https://drive.google.com/uc?export=download&id=15aa0NBdtwFBJUaaK1tMdMM8GTxsDvlcL' },
        { title: 'Unit-1, 2 & 3 Handwritten Notes', url: 'https://drive.google.com/uc?export=download&id=17blfHAcJBn3xuR72YyZEos8HpX4gah50' },
        { title: 'Unit-4 Notes', url: 'https://drive.google.com/uc?export=download&id=1oKnyxO-KzRUuu2qFl21zgxyulHTxFZ0S' },
        { title: 'Unit-5 Notes', url: 'https://drive.google.com/uc?export=download&id=1fJZ2clBRsX8t6hZoA_Sue85IueQzL25e' },
        { title: 'Unit-1 pdf Notes', url: 'https://drive.google.com/uc?export=download&id=19bTcoGiDiYm6rtoXGe8IJvhgbCTc48h5' }
      ]
    },
    {
      id: 'fm',
      name: 'Fluid Mechanics',
      icon: '💧',
      color: 'bg-blue-500',
      notes: []
    },
    {
      id: 'surveying',
      name: 'Surveying',
      icon: '🗺️',
      color: 'bg-orange-500',
      notes: [
        { title: 'Surveying Book', url: 'https://drive.google.com/uc?export=download&id=1qtJeCVp96BCwBEL7VZFnw4ad4s5u5vHi' },
        { title: 'Ch-2 Horizontal Measurement Notes', url: 'https://drive.google.com/uc?export=download&id=1bV1bMacPNYa2zg2cwEsGgSm333f9NIsd' },
        { title: 'Ch-3 Compass Surveying', url: 'https://drive.google.com/uc?export=download&id=1dEQzPdFcZ0H83LHX3ZG_mS3H18fm2-Dk' },
        { title: 'Ch-4 Traversing Notes', url: 'https://drive.google.com/uc?export=download&id=12hNbwceSBlMebKC82Z1A9wMN-Mo0enM2' },
        { title: 'Module 4: Theodolite Surveying', url: 'https://drive.google.com/uc?export=download&id=13RKz1xnIfY2-gVg_4X-tdOM1Taa-jMyH' },
        { title: 'Surveying Lab Manual', url: 'https://drive.google.com/uc?export=download&id=12CaI5d370Xc9fgHwFh2u79DtCAzIuglE' },
        { title: 'Surveying Book-by SK.Duggal', url: 'https://drive.google.com/uc?export=download&id=1PikDBlGKeE3kmqDc8G-4mI_eB0f1t27y' },
        { title: 'Ch-1 Surveying', url: 'https://drive.google.com/uc?export=download&id=1bXv399k77ntNOUN--FfOZpT5icMv1trf' }
      ]
    },
    {
      id: 'geotechnical',
      name: 'Geotechnical Engineering',
      icon: '🪨',
      color: 'bg-yellow-600',
      notes: [
        { title: 'Unit-3 Consolidation of Soil', url: 'https://drive.google.com/uc?export=download&id=1-9mhmPtgVA02vg6g3W1eW87extGq3W92' },
        { title: 'Unit-3 Soil Compaction', url: 'https://drive.google.com/uc?export=download&id=1UpGmsD-noROZH64GTt6mrjQ_7cYDlD8l' },
        { title: 'Unit-4 Shear Stress of Soil', url: 'https://drive.google.com/uc?export=download&id=1luBPv3QT2WpifPJJ5tjJTGvNpyeiUYbE' },
        { title: 'Unit-4 Stress Distribution of Soil', url: 'https://drive.google.com/uc?export=download&id=1Zz6_7Jtjz55SLPQ0GqYxYzvxNZQO08BW' }
      ]
    },
    {
      id: 'bmc',
      name: 'Building Material & Construction',
      icon: '🧱',
      color: 'bg-amber-600',
      notes: [
        { title: 'Exp.16- Compressive Strength', url: 'https://drive.google.com/uc?export=download&id=1Ihajiuc7lfFm9VBNJrPDbrtlCgnBnp8j' },
        { title: 'Unit-1 Composition of Good Bricks', url: 'https://drive.google.com/uc?export=download&id=1rVw0nHZSp4mPoyzsbpJwY4mc9Xayyedb' },
        { title: 'Unit-1 Designing of Stone', url: 'https://drive.google.com/uc?export=download&id=1obFomPg8EBisPXULfw132MELLMLkL9vw' },
        { title: 'Unit-1 Lime', url: 'https://drive.google.com/uc?export=download&id=1l-0Fh4ic3wCqDXChReowInUe-dyJrcP7' },
        { title: 'Unit-1 Topic: Manufacturing of Bricks', url: 'https://drive.google.com/uc?export=download&id=1jXmdfXPYApDYN0CcA1F2RIJM5qs9Z-bL' },
        { title: 'Unit-1 Topic: Stone Notes', url: 'https://drive.google.com/uc?export=download&id=1K8ProTDLlwm2F0rBUP4xYjKGvNdvkw3E' },
        { title: 'Unit-2 Characteristics of Aggregate', url: 'https://drive.google.com/uc?export=download&id=1L_racpULP-TQVAnNTs5GRLkTeZXHeC2-' },
        { title: 'Unit-2 Mortar & Its Classification', url: 'https://drive.google.com/uc?export=download&id=1ZUYNMO5unrpBMwrK7DwKYvhZWS-yczAD' },
        { title: 'Unit-2 Topic Admixture/Additives', url: 'https://drive.google.com/uc?export=download&id=1bTjel4NQY5-V2tIf7RXHtYYnW75lw5kL' },
        { title: 'Unit-2 Topic Cement', url: 'https://drive.google.com/uc?export=download&id=17L-FOB_cSJUuVY9f9KR_5iw0wwChH56T' },
        { title: 'Unit-2 Topic Manufacturing of Cement', url: 'https://drive.google.com/uc?export=download&id=1p6r1z9yh1_XY3ecD_ZQux4D-WL9k1pe8' },
        { title: 'Unit-2 Topic Timber Notes', url: 'https://drive.google.com/uc?export=download&id=1PuttlH6uYi9CqlAtBZ4IuJ7ulcrQRk7z' },
        { title: 'Unit-2 Types of Cement', url: 'https://drive.google.com/uc?export=download&id=1fgln9WybK5lcRmpGRxAJ_sOLaVFvMCwY' },
        { title: 'Unit-2 Aggregate Notes', url: 'https://drive.google.com/uc?export=download&id=19X6xdj_W7dPP1zx_0HLPtPg01ut33-Yn' },
        { title: 'Unit-2 Testing of Cement', url: 'https://drive.google.com/uc?export=download&id=1ym2P7Ik8aEk0zyT0N6kyt5a03hn_C2Pm' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Mid Sem-1 PYQS (2025-26)', url: 'https://drive.google.com/file/d/1AbcNUDNorVmQEvFSnSDDGmL9nW5dtYGm/view?usp=drivesdk' },
        { title: 'All PYQS (2024-25)', url: 'https://drive.google.com/file/d/1AbcNUDNorVmQEvFSnSDDGmL9nW5dtYGm/view?usp=drivesdk' },

      ]
    }
  ];

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
    title: '3rd Semester Syllabus',
    url: 'https://drive.google.com/file/d/1yGXpaeW4G9unX-fdppgdJHCGgfuUvETn/view?usp=drivesdk'
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
            <p className="text-xs opacity-50 uppercase tracking-widest">Civil Engineering — 3rd Semester</p>
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
            onClick={() => navigate('/btech-notes/second-year/semester-3')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Civil Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            3rd Semester<br />
            <span className="opacity-60">Civil Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Civil Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">CE Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">3rd Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl"
        >
          <h3 className="text-base font-bold text-foreground mb-3">📚 Civil Engg 3rd Semester — Important Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">✨ Hi CE Juniors!</strong> Here are a few important points for your 3rd semester.</p>
            <p>• <strong className="text-foreground">Strength of Materials (SOM):</strong> Extremely important. Focus on internal stress distribution, shear force, and bending moments. Practice numerical problems regularly.</p>
            <p>• <strong className="text-foreground">Surveying:</strong> Understand calculations for traversing and leveling. Lab practicals are very helpful here.</p>
            <p>• <strong className="text-foreground">Maintain CGPA:</strong> Keep target of <strong className="text-foreground">7.5+ CGPA</strong>. Focus on understanding concepts well.</p>
            <p className="text-red-600 dark:text-red-400"><strong>⚠️ Important:</strong> Exams require neat sketches for structural elements and step-by-step mathematical reasoning. Make sure to present your answers clearly.</p>
            <p>✨ Best Wishes — <strong className="text-foreground">Priyal Kumar</strong></p>
          </div>
        </motion.div>

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
              <p className="font-semibold text-foreground text-sm">3rd Semester Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 3rd semester B.Tech CE</p>
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
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                      {subject.notes.length} files
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 flex-1">{subject.name}</h3>

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
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThirdSemesterCENotes;

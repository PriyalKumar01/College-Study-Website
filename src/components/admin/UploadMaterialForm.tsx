import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Upload, FileText, CheckCircle2, Loader2, X, AlertTriangle,
  GraduationCap, BookOpen, Briefcase, Database, Code, Globe,
  Sparkles, ChevronRight
} from 'lucide-react';
import {
  CATEGORIES, BTECH_YEARS, BTECH_BRANCHES,
  getSubjects, getSemesters
} from '@/data/courseStructure';

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  Briefcase: <Briefcase className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
};

interface UploadMaterialFormProps {
  onUploadSuccess?: () => void;
}

const UploadMaterialForm = ({ onUploadSuccess }: UploadMaterialFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Refs for auto-scrolling
  const yearRef = useRef<HTMLDivElement>(null);
  const semesterRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Form state - cascading
  const [category, setCategory] = useState('');
  const [branch, setBranch] = useState('');
  const [branchType, setBranchType] = useState<'engineering' | 'technology' | ''>(''); // 1st year only
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [materialType, setMaterialType] = useState<'notes' | 'pyqs' | 'assignments'>('notes');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Active expanded step state (1 to 6)
  const [activeStep, setActiveStep] = useState<number>(1);

  // PYQ Smart Title Builder state
  const PYQ_EXAM_TYPES = [
    "Mid Sem-1 PYQ'S",
    "Mid Sem-2 PYQ'S",
    "End Sem PYQ'S",
    'Other',
  ];
  const ACADEMIC_YEARS = [
    '2024-25', '2025-26', '2026-27', '2027-28',
    '2028-29', '2029-30', '2030-31', '2031-32',
  ];
  const [pyqExamType, setPyqExamType] = useState('');
  const [pyqAcademicYear, setPyqAcademicYear] = useState('');
  const [pyqCustomTitle, setPyqCustomTitle] = useState('');

  // Derived: is current upload a PYQ?
  const isPyqMode =
    materialType === 'pyqs' || subject === 'Previous Year Questions';

  // Auto-build title for PYQs
  const autoPyqTitle =
    isPyqMode && pyqExamType && pyqExamType !== 'Other' && pyqAcademicYear
      ? `${pyqExamType} (${pyqAcademicYear})`
      : isPyqMode && pyqExamType === 'Other'
      ? pyqCustomTitle
      : title;

  // Effective title used for submission
  const effectiveTitle = isPyqMode ? autoPyqTitle : title;

  // For 1st year: map the actual semester to the correct subject list
  const isFirstYear = category === 'btech' && year === '1st';
  const mappedSemester = isFirstYear && branchType === 'technology' && semester
    ? (semester === '1st Semester' ? '2nd Semester' : '1st Semester')
    : semester;

  // Derived data
  const selectedCategory = CATEGORIES.find(c => c.id === category);
  const availableSemesters = category ? getSemesters(category, year) : [];
  const availableSubjects = category && (isFirstYear ? (branchType && semester) : semester)
    ? getSubjects(category, isFirstYear ? mappedSemester : semester, isFirstYear ? undefined : branch)
    : [];

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setBranch('');
    setBranchType('');
    setYear('');
    setSemester('');
    setSubject('');
    setActiveStep(val === 'btech' ? 2 : 3);
  };

  const handleYearChange = (val: string) => {
    setYear(val);
    setBranchType('');
    setSemester('');
    setSubject('');
    setBranch('');
    setActiveStep(val === '1st' ? 3 : 4);
  };

  const handleBranchTypeChange = (val: 'engineering' | 'technology') => {
    setBranchType(val);
    setSemester('');
    setSubject('');
    setActiveStep(4);
  };

  const handleSemesterChange = (val: string) => {
    setSemester(val);
    setSubject('');
    if (category === 'btech' && !isFirstYear) {
      setActiveStep(5);
    } else {
      setActiveStep(6);
    }
  };

  const handleBranchChange = (val: string) => {
    setBranch(val);
    setSubject('');
    setActiveStep(6);
  };

  const handleSubjectChange = (val: string) => {
    setSubject(val);
    setActiveStep(7);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== 'application/pdf') {
        toast({ title: 'Invalid file', description: 'Only PDF files are accepted.', variant: 'destructive' });
        return;
      }
      if (selected.size > 20 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Maximum file size is 20MB.', variant: 'destructive' });
        return;
      }
      setFile(selected);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      if (droppedFile.size > 20 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Maximum file size is 20MB.', variant: 'destructive' });
        return;
      }
      setFile(droppedFile);
    } else {
      toast({ title: 'Invalid file', description: 'Only PDF files are accepted.', variant: 'destructive' });
    }
  };

  const derivedMaterialType = 
    subject === 'Previous Year Questions' ? 'pyqs' :
    subject === 'Assignments' ? 'assignments' :
    ['dsa', 'coding', 'webdev', 'placement'].includes(category) ? 'notes' :
    null;

  const finalMaterialType = derivedMaterialType || materialType;

  // Returns null if valid, or a friendly reason string if not
  const getValidationError = (): string | null => {
    if (!user) return 'You are not logged in. Please re-login and try again.';
    if (!category) return 'Please select a category.';
    if (selectedCategory?.hasYears && !year) return 'Please select a year.';
    if (isFirstYear && !branchType) return 'Please select a branch type (Engineering or Technology).';
    if (selectedCategory?.hasSemesters && !semester) return 'Please select a semester.';
    if (selectedCategory?.hasBranches && !isFirstYear && !branch) return 'Please select a branch.';
    if (availableSubjects.length > 0 && !subject) return 'Please select a subject.';

    if (isPyqMode) {
      if (!pyqExamType) return 'Please select PYQ exam type.';
      if (!pyqAcademicYear) return 'Please select PYQ academic year.';
      if (pyqExamType === 'Other' && !pyqCustomTitle.trim()) return 'Please enter a custom PYQ title.';
    } else {
      if (!title.trim()) return 'Please enter a title.';
    }
    if (!file) return 'Please choose a PDF file to upload.';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = getValidationError();
    if (validationError) {
      toast({ title: 'Missing info', description: validationError, variant: 'destructive' });
      return;
    }
    setUploading(true);

    try {
      const dbSemester = category === 'btech'
        ? (isFirstYear ? `ALL-${mappedSemester}` : `${branch}-${semester}`)
        : (semester || category);

      const finalTitle = effectiveTitle.trim();

      const fileExt = (file!.name.split('.').pop() || 'pdf').toLowerCase();
      const safeCat = category || 'misc';
      const safeBranch = branch || 'general';
      const safeSem = semester || 'misc';
      const rand = Math.random().toString(36).slice(2, 10);
      const filePath = `${safeCat}/${safeBranch}/${safeSem}/${Date.now()}-${rand}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(filePath, file!, {
          cacheControl: '3600',
          upsert: false,
          contentType: file!.type || 'application/pdf',
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('study-materials')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('notes')
        .insert({
          title: finalTitle,
          subject: subject || category,
          semester: dbSemester,
          material_type: finalMaterialType,
          year: year || null,
          description: description.trim() || null,
          file_url: urlData.publicUrl,
          file_name: file!.name,
          uploaded_by: user!.id,
          user_email: user!.email!,
          user_name: user!.user_metadata?.first_name || user!.email?.split('@')[0] || 'Admin',
          status: 'pending',
        });

      if (insertError) {
        await supabase.storage.from('study-materials').remove([filePath]).catch(() => {});
        throw insertError;
      }

      toast({
        title: '✅ Uploaded Successfully!',
        description: 'Your material has been submitted for approval. It will appear on the website once the owner approves it.',
      });

      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      setPyqExamType('');
      setPyqAcademicYear('');
      setPyqCustomTitle('');
      setActiveStep(1);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onUploadSuccess?.();
    } catch (error: any) {
      console.error('[UploadMaterial] Failed:', error);
      toast({ title: 'Upload failed', description: error?.message || 'Failed to upload file', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  // ── Selection breadcrumb ─────────────────────────────────────
  const breadcrumb = [
    selectedCategory?.label,
    isFirstYear && branchType ? (branchType === 'engineering' ? 'Engineering Branch' : 'Technology Branch') : undefined,
    !isFirstYear && branch ? BTECH_BRANCHES.find(b => b.code === branch)?.fullName : undefined,
    year && BTECH_YEARS.find(y => y.id === year)?.label,
    semester,
    subject && availableSubjects.find(s => s.name === subject)?.fullName,
  ].filter(Boolean);

  return (
    <div className="border border-border bg-card shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Form Envelope Header */}
      <div className="border-b border-border pb-4 mb-2 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Study Material Form
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Follow the steps below to upload study notes, PYQs, or assignments.
          </p>
        </div>
        <Badge variant="outline" className="border-primary/40 text-primary font-bold text-[11px] px-3 py-1">
          STEP-BY-STEP UPLOADER
        </Badge>
      </div>

      {/* Breadcrumb trail */}
      {breadcrumb.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap text-sm text-foreground bg-muted/60 rounded-xl px-4 py-3 border border-border shadow-sm">
          <BookOpen className="h-4 w-4 mr-1.5 text-primary" />
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
              <span className={i === breadcrumb.length - 1 ? 'text-foreground font-bold' : 'text-muted-foreground'}>{item}</span>
            </span>
          ))}
        </div>
      )}

      {/* Step 1: Category */}
      <div className="space-y-3">
        {category && activeStep !== 1 ? (
          <div
            onClick={() => setActiveStep(1)}
            className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
              <div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Step 1: Category Selected</p>
                <p className="text-sm font-bold text-foreground">{selectedCategory?.label}</p>
              </div>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
          </div>
        ) : (
          <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
            <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
              <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">1</span>
              Select Category
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map(cat => (
                <Card
                  key={cat.id}
                  className={`cursor-pointer transition-all duration-200 hover:-translate-y-0.5 border-border bg-card ${
                    category === cat.id
                      ? 'ring-2 ring-primary bg-primary/10 border-primary'
                      : 'hover:border-primary/40 hover:bg-muted/50'
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <CardContent className="p-3.5 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
                      {ICON_MAP[cat.icon] || <BookOpen className="h-5 w-5" />}
                    </div>
                    <span className="text-xs font-bold leading-tight text-foreground">{cat.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Year (BTech only) */}
      {category === 'btech' && (
        <div className="space-y-3" ref={yearRef}>
          {year && activeStep !== 2 ? (
            <div
              onClick={() => setActiveStep(2)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Step 2: Academic Year Selected</p>
                  <p className="text-sm font-bold text-foreground">{BTECH_YEARS.find(y => y.id === year)?.label}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">2</span>
                Select Year
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BTECH_YEARS.map(y => (
                  <Card
                    key={y.id}
                    className={`cursor-pointer transition-all duration-200 text-center border-border bg-card ${
                      year === y.id
                        ? 'ring-2 ring-primary bg-primary/10 border-primary'
                        : 'hover:border-primary/40 hover:bg-muted/50'
                    }`}
                    onClick={() => handleYearChange(y.id)}
                  >
                    <CardContent className="p-3.5">
                      <div className="text-base font-extrabold text-primary">{y.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {y.semesters.join(' & ')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3 (1st year): Branch Type - Engineering or Technology */}
      {isFirstYear && (
        <div className="space-y-3" ref={branchRef}>
          {branchType && activeStep !== 3 ? (
            <div
              onClick={() => setActiveStep(3)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Step 3: Branch Type Selected</p>
                  <p className="text-sm font-bold text-foreground">{branchType === 'engineering' ? 'Engineering Branch' : 'Technology Branch'}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">3</span>
                Select Branch Type
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Card
                  className={`cursor-pointer transition-all duration-200 text-center border-border bg-card ${
                    branchType === 'engineering'
                      ? 'ring-2 ring-primary bg-primary/10 border-primary'
                      : 'hover:border-primary/40 hover:bg-muted/50'
                  }`}
                  onClick={() => handleBranchTypeChange('engineering')}
                >
                  <CardContent className="p-4">
                    <div className="text-base font-bold text-primary">Engineering</div>
                    <div className="text-xs text-muted-foreground mt-1">CSE/IT, ME, CE, ET, EE</div>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all duration-200 text-center border-border bg-card ${
                    branchType === 'technology'
                      ? 'ring-2 ring-primary bg-primary/10 border-primary'
                      : 'hover:border-primary/40 hover:bg-muted/50'
                  }`}
                  onClick={() => handleBranchTypeChange('technology')}
                >
                  <CardContent className="p-4">
                    <div className="text-base font-bold text-primary">Technology</div>
                    <div className="text-xs text-muted-foreground mt-1">CHE, PT (Paint), PL (Plastic), FT, OT, LFT, BE</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3/4: Semester */}
      {((category === 'btech' && year && (isFirstYear ? branchType : true)) || (selectedCategory?.hasSemesters && category !== 'btech')) && (
        <div className="space-y-3" ref={semesterRef}>
          {semester && activeStep !== 4 ? (
            <div
              onClick={() => setActiveStep(4)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Semester Selected</p>
                  <p className="text-sm font-bold text-foreground">{semester}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                  {isFirstYear ? '4' : (category === 'btech' ? '3' : '2')}
                </span>
                Select Semester
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {availableSemesters.map(sem => (
                  <Card
                    key={sem}
                    className={`cursor-pointer transition-all duration-200 text-center border-border bg-card ${
                      semester === sem
                        ? 'ring-2 ring-primary bg-primary/10 border-primary'
                        : 'hover:border-primary/40 hover:bg-muted/50'
                    }`}
                    onClick={() => handleSemesterChange(sem)}
                  >
                    <CardContent className="p-3.5">
                      <div className="text-base font-bold text-foreground">{sem}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4/5: Branch (BTech only, NOT 1st year) */}
      {category === 'btech' && !isFirstYear && semester && (
        <div className="space-y-3" ref={branchRef}>
          {branch && activeStep !== 5 ? (
            <div
              onClick={() => setActiveStep(5)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Branch Selected</p>
                  <p className="text-sm font-bold text-foreground">{branch} — {BTECH_BRANCHES.find(b => b.code === branch)?.fullName}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">4</span>
                Select Branch
              </Label>
              <Select value={branch} onValueChange={handleBranchChange}>
                <SelectTrigger className="h-12 bg-background border-border text-foreground">
                  <SelectValue placeholder="Choose engineering branch" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  {BTECH_BRANCHES.map(b => (
                    <SelectItem key={b.code} value={b.code} className="hover:bg-muted">
                      <span className="font-bold text-primary">{b.code}</span>
                      <span className="text-muted-foreground ml-2">— {b.fullName}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Step 5/6: Subject */}
      {semester && availableSubjects.length > 0 && (
        <div className="space-y-3" ref={subjectRef}>
          {subject && activeStep !== 6 ? (
            <div
              onClick={() => setActiveStep(6)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Subject Selected</p>
                  <p className="text-sm font-bold text-foreground">{subject}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                  {category === 'btech' ? '5' : '3'}
                </span>
                Select Subject
              </Label>
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger className="h-12 bg-background border-border text-foreground">
                  <SelectValue placeholder="Choose subject" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground max-h-64">
                  {availableSubjects.map(s => (
                    <SelectItem key={s.name} value={s.name} className="hover:bg-muted">
                      <span className="font-semibold text-foreground">{s.name}</span>
                      {s.name !== s.fullName && (
                        <span className="text-muted-foreground ml-2">— {s.fullName}</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Step 6 / Final Upload Details Section */}
      {((!selectedCategory?.hasSemesters && category) || (semester && (availableSubjects.length === 0 || subject))) && (
        <div className="border border-border/80 rounded-xl p-5 sm:p-6 bg-muted/20 space-y-6 text-foreground" ref={detailsRef}>
          <Label className="text-lg font-extrabold flex items-center gap-3 text-foreground border-b border-border pb-4">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
              {category === 'btech' ? (availableSubjects.length > 0 ? '6' : '5') : 
               selectedCategory?.hasSemesters ? (availableSubjects.length > 0 ? '4' : '3') : '2'}
            </span>
            Upload Material Details 📁
          </Label>

          {/* Material Type */}
          {!derivedMaterialType && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Material Type</Label>
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant={materialType === 'notes' ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    materialType === 'notes' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted border-border'
                  }`}
                  onClick={() => setMaterialType('notes')}
                >
                  <FileText className="h-4 w-4 mr-1.5" />
                  Notes
                </Badge>
                <Badge
                  variant={materialType === 'pyqs' ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    materialType === 'pyqs' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted border-border'
                  }`}
                  onClick={() => setMaterialType('pyqs')}
                >
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Previous Year Questions
                </Badge>
                <Badge
                  variant={materialType === 'assignments' ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    materialType === 'assignments' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted border-border'
                  }`}
                  onClick={() => setMaterialType('assignments')}
                >
                  <Briefcase className="h-4 w-4 mr-1.5" />
                  Assignments
                </Badge>
              </div>
            </div>
          )}

          {/* Title input / builder */}
          {isPyqMode ? (
            <div className="space-y-4">
              <Label className="text-sm font-bold flex items-center gap-2 text-amber-500">
                <span>📋</span> PYQ Title Builder *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="pyq-exam-type" className="text-xs text-muted-foreground">Exam Type</Label>
                  <Select value={pyqExamType} onValueChange={val => { setPyqExamType(val); setPyqCustomTitle(''); }}>
                    <SelectTrigger id="pyq-exam-type" className="h-11 bg-background border-border text-foreground">
                      <SelectValue placeholder="Choose exam type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      {PYQ_EXAM_TYPES.map(et => (
                        <SelectItem key={et} value={et}>{et}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pyq-year" className="text-xs text-muted-foreground">Academic Year</Label>
                  <Select value={pyqAcademicYear} onValueChange={setPyqAcademicYear}>
                    <SelectTrigger id="pyq-year" className="h-11 bg-background border-border text-foreground">
                      <SelectValue placeholder="Choose year e.g. 2025-26" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      {ACADEMIC_YEARS.map(yr => (
                        <SelectItem key={yr} value={yr}>{yr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {pyqExamType === 'Other' && (
                <div className="space-y-1.5">
                  <Label htmlFor="pyq-custom" className="text-xs text-muted-foreground">Custom Title *</Label>
                  <Input
                    id="pyq-custom"
                    value={pyqCustomTitle}
                    onChange={e => setPyqCustomTitle(e.target.value)}
                    placeholder="e.g., Supplementary PYQ 2025-26"
                    className="h-11 bg-background border-border text-foreground"
                  />
                </div>
              )}

              {autoPyqTitle && (
                <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/30 rounded-xl">
                  <span className="text-xs text-muted-foreground">Title preview:</span>
                  <span className="text-sm font-bold text-primary">{autoPyqTitle}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="upload-title" className="text-sm font-bold text-foreground">Title *</Label>
              <Input
                id="upload-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Unit-1 Complete Notes, Assignment 2024"
                className="h-12 bg-background border-border text-foreground"
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="upload-desc" className="text-sm font-bold text-foreground">Description (optional)</Label>
            <Textarea
              id="upload-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the content..."
              rows={3}
              className="bg-background border-border text-foreground"
            />
          </div>

          {/* File Upload Box */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-foreground">PDF File * (max 20MB)</Label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                dragOver
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : file
                    ? 'border-emerald-500/60 bg-emerald-500/10'
                    : 'border-border bg-background hover:border-primary/50'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  <div className="text-left">
                    <p className="font-bold text-sm text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-3 text-muted-foreground hover:text-foreground"
                    onClick={e => { e.stopPropagation(); setFile(null); }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-9 w-9 mx-auto text-primary" />
                  <p className="text-sm text-foreground">
                    Drag & drop a PDF or <span className="text-primary font-bold underline">click to browse</span>
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload PDF file"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full h-13 text-base font-bold bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all rounded-xl mt-4"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Uploading PDF & Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" /> Submit Material for Approval
              </span>
            )}
          </Button>

          <div className="flex items-start gap-2.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Your upload will be sent to the site owner for approval before appearing live on the notes page.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterialForm;


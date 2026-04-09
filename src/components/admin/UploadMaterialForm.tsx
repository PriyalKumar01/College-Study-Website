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

  // For 1st year: map the actual semester to the correct subject list
  // Engineering: 1st Sem → 1st Semester subjects, 2nd Sem → 2nd Semester subjects
  // Technology: 1st Sem → 2nd Semester subjects, 2nd Sem → 1st Semester subjects
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
    setYear('');
    setSemester('');
    setSubject('');
    scrollToRef(yearRef);
  };

  const handleYearChange = (val: string) => {
    setYear(val);
    setSemester('');
    setSubject(''); // Branch remains but sub-selections reset
    scrollToRef(semesterRef);
  };

  const handleSemesterChange = (val: string) => {
    setSemester(val);
    setSubject('');
    scrollToRef(branchRef);
  };

  const handleBranchChange = (val: string) => {
    setBranch(val);
    setSubject('');
    scrollToRef(subjectRef);
  };

  const handleSubjectChange = (val: string) => {
    setSubject(val);
    scrollToRef(detailsRef);
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

  const isFormValid = () => {
    if (!category || !title.trim() || !file) return false;
    if (selectedCategory?.hasSemesters && !semester) return false;
    if (selectedCategory?.hasBranches && !branch) return false;
    if (selectedCategory?.hasYears && !year) return false;
    if (availableSubjects.length > 0 && !subject) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!user || !isFormValid()) return;
    setUploading(true);

    try {
      // Build the semester string for DB
      const dbSemester = category === 'btech' ? `${branch}-${semester}` : 
                         (semester || category);

      // Check duplicates
      const { data: existing } = await supabase
        .from('notes')
        .select('id')
        .eq('title', title.trim())
        .eq('subject', subject || category)
        .eq('semester', dbSemester)
        .eq('material_type', finalMaterialType)
        .maybeSingle();

      if (existing) {
        toast({ title: 'Duplicate found', description: 'A material with this title already exists.', variant: 'destructive' });
        setUploading(false);
        return;
      }

      // Upload file
      const fileExt = file!.name.split('.').pop();
      const filePath = `${category}/${branch || 'general'}/${semester || 'misc'}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(filePath, file!);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('study-materials')
        .getPublicUrl(filePath);

      // Insert record
      const { error: insertError } = await supabase
        .from('notes')
        .insert({
          title: title.trim(),
          subject: subject || category,
          semester: dbSemester,
          material_type: finalMaterialType,
          year: year || null,
          description: description.trim() || null,
          file_url: urlData.publicUrl,
          file_name: file!.name,
          uploaded_by: user.id,
          user_email: user.email,
          user_name: user.user_metadata?.first_name || user.email?.split('@')[0],
          status: 'pending',
        });

      if (insertError) throw insertError;

      toast({
        title: '✅ Uploaded Successfully!',
        description: 'Your material has been submitted for approval. It will appear on the website once the owner approves it.',
      });

      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onUploadSuccess?.();
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  // ── Selection breadcrumb ─────────────────────────────────────
  const breadcrumb = [
    selectedCategory?.label,
    branch && BTECH_BRANCHES.find(b => b.code === branch)?.fullName,
    year && BTECH_YEARS.find(y => y.id === year)?.label,
    semester,
    subject && availableSubjects.find(s => s.name === subject)?.fullName,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Breadcrumb trail */}
      {breadcrumb.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-2.5 border">
          <BookOpen className="h-4 w-4 mr-1 text-primary" />
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
              <span className={i === breadcrumb.length - 1 ? 'text-foreground font-medium' : ''}>{item}</span>
            </span>
          ))}
        </div>
      )}

      {/* Step 1: Category */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Select Category
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <Card
              key={cat.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                category === cat.id
                  ? 'ring-2 ring-primary bg-primary/5 border-primary'
                  : 'hover:border-primary/50 hover:bg-accent/50'
              }`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shrink-0`}>
                  {ICON_MAP[cat.icon] || <BookOpen className="h-5 w-5" />}
                </div>
                <span className="text-sm font-medium leading-tight">{cat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Step 2: Year (BTech only) */}
      {category === 'btech' && (
        <div className="space-y-3" ref={yearRef}>
          <Label className="text-base font-semibold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Select Year
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BTECH_YEARS.map(y => (
              <Card
                key={y.id}
                className={`cursor-pointer transition-all duration-200 text-center ${
                  year === y.id
                    ? 'ring-2 ring-primary bg-primary/5 border-primary'
                    : 'hover:border-primary/50 hover:bg-accent/50'
                }`}
                onClick={() => handleYearChange(y.id)}
              >
                <CardContent className="p-3">
                  <div className="text-lg font-bold text-primary">{y.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {y.semesters.join(' & ')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}



      {/* Step 3: Semester */}
      {((category === 'btech' && year) || (selectedCategory?.hasSemesters && category !== 'btech')) && (
        <div className="space-y-3" ref={semesterRef}>
          <Label className="text-base font-semibold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
              {category === 'btech' ? '3' : '2'}
            </span>
            Select Semester
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {availableSemesters.map(sem => (
              <Card
                key={sem}
                className={`cursor-pointer transition-all duration-200 text-center ${
                  semester === sem
                    ? 'ring-2 ring-primary bg-primary/5 border-primary'
                    : 'hover:border-primary/50 hover:bg-accent/50'
                }`}
                onClick={() => handleSemesterChange(sem)}
              >
                <CardContent className="p-3">
                  <div className="text-base font-semibold">{sem}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Branch (BTech only, after semester) */}
      {category === 'btech' && semester && (
        <div className="space-y-3" ref={branchRef}>
          <Label className="text-base font-semibold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">4</span>
            Select Branch
          </Label>
          <Select value={branch} onValueChange={handleBranchChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Choose your engineering branch" />
            </SelectTrigger>
            <SelectContent>
              {BTECH_BRANCHES.map(b => (
                <SelectItem key={b.code} value={b.code}>
                  <span className="font-medium">{b.code}</span>
                  <span className="text-muted-foreground ml-2">— {b.fullName}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Step 5: Subject (if subjects are available for this combination) */}
      {semester && availableSubjects.length > 0 && (
        <div className="space-y-3" ref={subjectRef}>
          <Label className="text-base font-semibold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
              {category === 'btech' ? '5' : '3'}
            </span>
            Select Subject
          </Label>
          <Select value={subject} onValueChange={handleSubjectChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Choose subject" />
            </SelectTrigger>
            <SelectContent>
              {availableSubjects.map(s => (
                <SelectItem key={s.name} value={s.name}>
                  <span className="font-medium">{s.name}</span>
                  {s.name !== s.fullName && (
                    <span className="text-muted-foreground ml-2">— {s.fullName}</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Step 6: Material details */}
      {((!selectedCategory?.hasSemesters && category) || (semester && (availableSubjects.length === 0 || subject))) && (
        <div className="space-y-5 pt-2" ref={detailsRef}>
          <div className="h-px bg-border" />

          <Label className="text-base font-semibold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
              {category === 'btech' ? (availableSubjects.length > 0 ? '6' : '5') : 
               selectedCategory?.hasSemesters ? (availableSubjects.length > 0 ? '4' : '3') : '2'}
            </span>
            Upload Details
          </Label>

          {/* Material Type */}
          {!derivedMaterialType && (
            <div className="space-y-2">
              <Label>Material Type</Label>
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant={materialType === 'notes' ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    materialType === 'notes' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-accent/80 hover:text-accent-foreground text-foreground border-border'
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
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-accent/80 hover:text-accent-foreground text-foreground border-border'
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
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-accent/80 hover:text-accent-foreground text-foreground border-border'
                  }`}
                  onClick={() => setMaterialType('assignments')}
                >
                  <Briefcase className="h-4 w-4 mr-1.5" />
                  Assignments
                </Badge>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="upload-title">Title *</Label>
            <Input
              id="upload-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Unit-1 Complete Notes, Mid Sem PYQ 2024"
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="upload-desc">Description (optional)</Label>
            <Textarea
              id="upload-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the content..."
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>PDF File * (max 20MB)</Label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                dragOver
                  ? 'border-primary bg-primary/5 scale-[1.01]'
                  : file
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-border hover:border-primary/30'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <div className="text-left">
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-2"
                    onClick={e => { e.stopPropagation(); setFile(null); }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop a PDF or <span className="text-primary font-medium underline">click to browse</span>
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

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || uploading}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            {uploading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Submit for Approval
              </>
            )}
          </Button>

          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <span>Your upload will be reviewed by the site owner. Once approved, it will appear live on the respective notes page.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterialForm;

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, GraduationCap, CheckCircle2, AlertTriangle, ImageIcon } from 'lucide-react';

const STREAM_OPTIONS = [
  { value: 'all', label: 'All Streams' },
  { value: 'engineering', label: 'Engineering (B.Tech/BE)' },
  { value: 'medical', label: 'Medical (MBBS/BDS)' },
  { value: 'science', label: 'Science (B.Sc)' },
  { value: 'commerce', label: 'Commerce (B.Com/BBA)' },
  { value: 'arts', label: 'Arts / Humanities (BA)' },
  { value: 'law', label: 'Law (LLB)' },
  { value: 'diploma', label: 'Diploma / ITI / Polytechnic' },
  { value: 'management', label: 'Management (MBA)' },
];

const WHO_OPTIONS = [
  { value: 'all', label: 'All Students' },
  { value: 'girls', label: 'Girls Only' },
  { value: 'sc', label: 'SC Students' },
  { value: 'st', label: 'ST Students' },
  { value: 'obc', label: 'OBC / EBC / DNT' },
  { value: 'minority', label: 'Minority Students' },
];

interface SubmitScholarshipFormProps {
  onSuccess?: () => void;
}

export default function SubmitScholarshipForm({ onSuccess }: SubmitScholarshipFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [activeStep, setActiveStep] = useState(1);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [amountNum, setAmountNum] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [deadline, setDeadline] = useState(''); // stored as YYYY-MM-DD
  const [income, setIncome] = useState('');
  const [marks, setMarks] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState('government');
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedWho, setSelectedWho] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleStream = (val: string) => {
    setSelectedStreams(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const toggleWho = (val: string) => {
    setSelectedWho(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const isStep1Valid = () => name.trim() && org.trim() && description.trim();
  const isStep2Valid = () => amount.trim() && deadline.trim();
  const isStep3Valid = () => applyUrl.trim();
  const isStep4Valid = () => selectedStreams.length > 0 && selectedWho.length > 0;

  const isValid = () => isStep1Valid() && isStep2Valid() && isStep3Valid() && isStep4Valid();

  // Determine initial status from deadline date
  const computeInitialStatus = (dl: string): string => {
    if (!dl) return 'open';
    const d = new Date(dl);
    if (isNaN(d.getTime())) return 'open';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today ? 'closed' : 'open';
  };

  const handleSubmit = async () => {
    if (!user || !isValid()) return;
    setSubmitting(true);
    try {
      const tagsArr = tags.split(',').map(t => t.trim()).filter(Boolean);
      const { error } = await (supabase as any)
        .from('scholarships')
        .insert({
          name: name.trim(),
          org: org.trim(),
          description: description.trim(),
          amount: amount.trim(),
          amount_num: parseInt(amountNum) || 0,
          apply_url: applyUrl.trim(),
          deadline: deadline.trim(),
          income: income.trim() || 'Any',
          marks: marks.trim() || 'Any',
          tags: tagsArr,
          type,
          level: 'central',
          status: computeInitialStatus(deadline),
          streams: selectedStreams,
          who: selectedWho,
          image_url: imageUrl.trim() || null,
          approval_status: 'pending',
          submitted_by: user.user_metadata?.first_name || user.email?.split('@')[0],
          submitted_by_email: user.email,
        });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: '✅ Scholarship Submitted!', description: 'Awaiting owner approval before going live.' });
      onSuccess?.();
    } catch (err: any) {
      toast({ title: 'Submission failed', description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setName(''); setOrg(''); setDescription(''); setAmount(''); setAmountNum('');
    setApplyUrl(''); setDeadline(''); setIncome(''); setMarks(''); setTags('');
    setType('government'); setImageUrl('');
    setSelectedStreams([]); setSelectedWho([]);
    setActiveStep(1);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-card rounded-2xl border border-border shadow-xl space-y-4">
        <CheckCircle2 size={56} className="text-emerald-500 mx-auto" />
        <h3 className="text-2xl font-extrabold text-foreground">Scholarship Submitted Successfully!</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The owner will review and approve it. Once approved, it will appear live on the Scholarships portal.
        </p>
        <Button onClick={reset} variant="outline" className="mt-4 font-bold">
          Submit Another Scholarship
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Form Envelope Header */}
      <div className="border-b border-border pb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-foreground">Add New Scholarship Form</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Follow the steps below to submit scholarship details for owner review.
            </p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary/40 text-primary font-bold text-[11px] px-3 py-1">
          STEP-BY-STEP SCHOLARSHIP FORM
        </Badge>
      </div>

      {/* Step 1: Basic Information */}
      <div className="space-y-3">
        {activeStep > 1 && isStep1Valid() ? (
          <div
            onClick={() => setActiveStep(1)}
            className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
              <div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Step 1: Basic Info Completed</p>
                <p className="text-sm font-bold text-foreground">{name} — <span className="text-muted-foreground font-normal">{org}</span></p>
              </div>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
          </div>
        ) : (
          <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
            <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
              <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">1</span>
              Basic Information
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">Scholarship Name *</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g., Reliance Foundation UG Scholarship"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">Organization / Provider *</Label>
                <Input
                  value={org}
                  onChange={e => setOrg(e.target.value)}
                  placeholder="e.g., Reliance Foundation"
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Description *</Label>

              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief description of the scholarship — who it's for, what it covers..."
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-primary" />
                Banner Image URL <span className="text-[11px] font-normal text-muted-foreground">(optional)</span>
              </Label>
              {imageUrl && (
                <div className="mb-2 rounded-lg overflow-hidden h-20 border border-border">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
              <Input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://example.com/scholarship-banner.jpg"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => setActiveStep(2)}
                disabled={!isStep1Valid()}
                className="font-bold text-xs"
              >
                Next: Amount & Timeline →
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Amount & Timeline */}
      {activeStep >= 2 && (
        <div className="space-y-3">
          {activeStep > 2 && isStep2Valid() ? (
            <div
              onClick={() => setActiveStep(2)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Step 2: Amount & Timeline Completed</p>
                  <p className="text-sm font-bold text-foreground">{amount} | Deadline: {deadline}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">2</span>
                Amount & Timeline
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-foreground">Amount Display *</Label>
                  <Input
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g., Up to ₹2 Lakh"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-foreground">Amount (₹ number for sorting)</Label>
                  <Input
                    type="number"
                    value={amountNum}
                    onChange={e => setAmountNum(e.target.value)}
                    placeholder="e.g., 200000"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-foreground">Deadline *</Label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-background border-border text-foreground"
                  />
                  <p className="text-[10px] text-muted-foreground">Status (Open/Expired) is auto-set from deadline.</p>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => setActiveStep(3)}
                  disabled={!isStep2Valid()}
                  className="font-bold text-xs"
                >
                  Next: Links & Classification →
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Links & Classification */}
      {activeStep >= 3 && (
        <div className="space-y-3">
          {activeStep > 3 && isStep3Valid() ? (
            <div
              onClick={() => setActiveStep(3)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:bg-emerald-500/15 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Step 3: Links & Classification Completed</p>
                  <p className="text-sm font-bold text-foreground">{applyUrl} ({type})</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Change</span>
            </div>
          ) : (
            <div className="border border-border/80 rounded-xl p-5 bg-muted/20 space-y-4">
              <Label className="text-base font-bold flex items-center gap-2.5 text-foreground">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">3</span>
                Links & Classification
              </Label>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-foreground">Apply URL *</Label>
                  <Input
                    value={applyUrl}
                    onChange={e => setApplyUrl(e.target.value)}
                    placeholder="https://scholarships.gov.in"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground">Scholarship Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="h-10 bg-background border-border text-foreground"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-card border-border text-foreground">
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="private">Private / Corporate</SelectItem>
                        <SelectItem value="central">Central Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center p-3 rounded-lg border border-border bg-card text-xs text-muted-foreground">
                    📅 Status is auto-computed from deadline date — no manual status needed.
                  </div>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => setActiveStep(4)}
                  disabled={!isStep3Valid()}
                  className="font-bold text-xs"
                >
                  Next: Eligibility & Categories →
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Eligibility & Final Submit */}
      {activeStep >= 4 && (
        <div className="border border-border/80 rounded-xl p-5 sm:p-6 bg-muted/20 space-y-6 text-foreground">
          <Label className="text-base font-bold flex items-center gap-2.5 text-foreground border-b border-border pb-4">
            <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-md">4</span>
            Eligibility & Categories
          </Label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Income Limit (optional)</Label>
              <Input
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="e.g., Below ₹2.5 Lakh/year"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Marks Criteria (optional)</Label>
              <Input
                value={marks}
                onChange={e => setMarks(e.target.value)}
                placeholder="e.g., 60% in previous exam"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">Tags (comma-separated)</Label>
            <Input
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="e.g., Girls Only, Merit-based, Renewable"
              className="bg-background border-border text-foreground"
            />
          </div>

          {/* Streams */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-foreground">Eligible Streams * (select all that apply)</Label>
            <div className="flex flex-wrap gap-2">
              {STREAM_OPTIONS.map(opt => {
                const checked = selectedStreams.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleStream(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      checked
                        ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                        : 'bg-background border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Who */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-foreground">Eligible Category * (select all that apply)</Label>
            <div className="flex flex-wrap gap-2">
              {WHO_OPTIONS.map(opt => {
                const checked = selectedWho.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleWho(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      checked
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'bg-background border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-border space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={!isValid() || submitting}
              className="w-full h-12 text-base font-extrabold shadow-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <GraduationCap className="h-5 w-5 mr-2" /> Submit for Owner Approval
                </>
              )}
            </Button>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Submitted scholarships go live only after owner approval. Ensure all link URLs and information are valid.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

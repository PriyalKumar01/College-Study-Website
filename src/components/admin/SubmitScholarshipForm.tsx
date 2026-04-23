import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, GraduationCap, CheckCircle2, AlertTriangle } from 'lucide-react';

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

  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [amountNum, setAmountNum] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [deadline, setDeadline] = useState('');
  const [income, setIncome] = useState('');
  const [marks, setMarks] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState('government');
  const [schStatus, setSchStatus] = useState('open');
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedWho, setSelectedWho] = useState<string[]>([]);
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

  const isValid = () =>
    name.trim() && org.trim() && description.trim() && amount.trim() &&
    applyUrl.trim() && deadline.trim() && selectedStreams.length > 0 && selectedWho.length > 0;

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
          status: schStatus,
          streams: selectedStreams,
          who: selectedWho,
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
    setType('government'); setSchStatus('open');
    setSelectedStreams([]); setSelectedWho([]);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div style={{
        textAlign: 'center', padding: '60px 24px',
        background: 'hsl(var(--card))', borderRadius: 16,
        border: '1px solid hsl(var(--border))'
      }}>
        <CheckCircle2 size={52} style={{ color: '#10B981', margin: '0 auto 16px' }} />
        <div style={{ fontSize: 20, fontWeight: 700, color: 'hsl(var(--foreground))', marginBottom: 8 }}>
          Scholarship Submitted!
        </div>
        <div style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', marginBottom: 24 }}>
          The owner will review and approve it. Once approved, it will appear live on the Scholarships page.
        </div>
        <Button onClick={reset} variant="outline">Submit Another</Button>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
    background: 'hsl(var(--card))', color: 'hsl(var(--foreground))',
    border: '1px solid hsl(var(--border))', outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box' as const
  };

  const labelStyle = {
    fontSize: 13, fontWeight: 600, color: 'hsl(var(--foreground))',
    display: 'block', marginBottom: 6
  };

  const sectionStyle = {
    background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
    borderRadius: 12, padding: '20px 22px', marginBottom: 16
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
        padding: '16px 20px', borderRadius: 12,
        background: 'hsl(var(--primary)/0.08)', border: '1px solid hsl(var(--primary)/0.2)'
      }}>
        <GraduationCap size={22} style={{ color: 'hsl(var(--primary))', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'hsl(var(--foreground))' }}>
            Add New Scholarship
          </div>
          <div style={{ fontSize: 12.5, color: 'hsl(var(--muted-foreground))' }}>
            Fill all required fields. Owner will review before publishing.
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Basic Information
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Scholarship Name *</label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g., Reliance Foundation UG Scholarship" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Organization / Provider *</label>
            <input value={org} onChange={e => setOrg(e.target.value)}
              placeholder="e.g., Reliance Foundation" style={inputStyle} />
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <label style={labelStyle}>Description *</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            rows={3} placeholder="Brief description of the scholarship — who it's for, what it covers, special features..."
            style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
      </div>

      {/* Amount & Deadline */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Amount & Timeline
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Amount Display *</label>
            <input value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="e.g., Up to ₹2 Lakh" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Amount (₹ number, for sorting)</label>
            <input value={amountNum} onChange={e => setAmountNum(e.target.value)}
              placeholder="e.g., 200000" type="number" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Deadline *</label>
            <input value={deadline} onChange={e => setDeadline(e.target.value)}
              placeholder="e.g., Nov 30, 2025" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Links & Classification */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Links & Classification
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Apply URL *</label>
          <input value={applyUrl} onChange={e => setApplyUrl(e.target.value)}
            placeholder="https://scholarships.gov.in" style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="private">Private / Corporate</SelectItem>
                <SelectItem value="central">Central Government</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label style={labelStyle}>Current Status</label>
            <Select value={schStatus} onValueChange={setSchStatus}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open Now</SelectItem>
                <SelectItem value="upcoming">Opening Soon</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Eligibility
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>Income Limit</label>
            <input value={income} onChange={e => setIncome(e.target.value)}
              placeholder="e.g., Below ₹2.5 Lakh/year" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Marks Criteria</label>
            <input value={marks} onChange={e => setMarks(e.target.value)}
              placeholder="e.g., 60% in previous exam" style={inputStyle} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Tags (comma-separated)</label>
          <input value={tags} onChange={e => setTags(e.target.value)}
            placeholder="e.g., Girls Only, Merit-based, Renewable" style={inputStyle} />
        </div>

        {/* Streams */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Eligible Streams * (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STREAM_OPTIONS.map(opt => {
              const checked = selectedStreams.includes(opt.value);
              return (
                <button key={opt.value} onClick={() => toggleStream(opt.value)} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12.5, fontWeight: 500,
                  background: checked ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  color: checked ? '#fff' : 'hsl(var(--muted-foreground))',
                  border: checked ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s'
                }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Who */}
        <div>
          <label style={labelStyle}>Eligible Category * (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {WHO_OPTIONS.map(opt => {
              const checked = selectedWho.includes(opt.value);
              return (
                <button key={opt.value} onClick={() => toggleWho(opt.value)} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12.5, fontWeight: 500,
                  background: checked ? 'hsl(262 83% 52%)' : 'hsl(var(--muted))',
                  color: checked ? '#fff' : 'hsl(var(--muted-foreground))',
                  border: checked ? '1px solid hsl(262 83% 52%)' : '1px solid hsl(var(--border))',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s'
                }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Button
          onClick={handleSubmit}
          disabled={!isValid() || submitting}
          style={{
            flex: 1, height: 48, fontSize: 15, fontWeight: 600,
            background: isValid() ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
          }}
        >
          {submitting ? (
            <><Loader2 size={18} style={{ marginRight: 8, animation: 'spin 1s linear infinite' }} />Submitting...</>
          ) : (
            <><GraduationCap size={18} style={{ marginRight: 8 }} />Submit for Owner Approval</>
          )}
        </Button>
      </div>

      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        marginTop: 12, padding: '10px 14px', borderRadius: 8,
        background: 'hsl(var(--muted)/0.5)', border: '1px solid hsl(var(--border))'
      }}>
        <AlertTriangle size={14} style={{ color: '#F59E0B', flexShrink: 0, marginTop: 2 }} />
        <span style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>
          Submitted scholarships go live only after owner approval. Make sure all links are working and information is accurate.
        </span>
      </div>
    </div>
  );
}

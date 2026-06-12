import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, X, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Scholarship {
  id: string;
  name: string;
  org: string;
  description: string;
  amount: string;
  amount_num: number;
  apply_url: string;
  deadline: string;
  income: string;
  marks: string;
  tags: string[];
  type: string;
  status: string;
  streams: string[];
  who: string[];
  image_url?: string;
}

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

interface EditScholarshipModalProps {
  scholarship: Scholarship;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditScholarshipModal({ scholarship, onClose, onSaved }: EditScholarshipModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [name, setName] = useState(scholarship.name);
  const [org, setOrg] = useState(scholarship.org);
  const [description, setDescription] = useState(scholarship.description);
  const [amount, setAmount] = useState(scholarship.amount);
  const [amountNum, setAmountNum] = useState(String(scholarship.amount_num));
  const [applyUrl, setApplyUrl] = useState(scholarship.apply_url);
  const [deadline, setDeadline] = useState(scholarship.deadline);
  const [income, setIncome] = useState(scholarship.income);
  const [marks, setMarks] = useState(scholarship.marks);
  const [tags, setTags] = useState((scholarship.tags || []).join(', '));
  const [type, setType] = useState(scholarship.type);
  const [schStatus, setSchStatus] = useState(scholarship.status);
  const [selectedStreams, setSelectedStreams] = useState<string[]>(scholarship.streams || []);
  const [selectedWho, setSelectedWho] = useState<string[]>(scholarship.who || []);
  const [imageUrl, setImageUrl] = useState(scholarship.image_url || '');
  const [imagePreview, setImagePreview] = useState(scholarship.image_url || '');

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setImageUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `scholarship-${Date.now()}.${ext}`;
      const { data, error } = await (supabase as any).storage
        .from('scholarship-images')
        .upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = (supabase as any).storage
        .from('scholarship-images')
        .getPublicUrl(fileName);
      const url = urlData?.publicUrl || '';
      setImageUrl(url);
      setImagePreview(url);
    } catch (err: any) {
      // Fallback: just use direct URL input
      toast({ title: 'Image upload failed', description: 'Enter image URL manually below.', variant: 'destructive' });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const tagsArr = tags.split(',').map(t => t.trim()).filter(Boolean);
      const { error } = await (supabase as any)
        .from('scholarships')
        .update({
          name: name.trim(),
          org: org.trim(),
          description: description.trim(),
          amount: amount.trim(),
          amount_num: parseInt(amountNum) || 0,
          apply_url: applyUrl.trim(),
          deadline: deadline.trim(),
          income: income.trim(),
          marks: marks.trim(),
          tags: tagsArr,
          type,
          status: schStatus,
          streams: selectedStreams,
          who: selectedWho,
          image_url: imageUrl.trim() || null,
        })
        .eq('id', scholarship.id);
      if (error) throw error;
      toast({ title: '✅ Scholarship updated!', description: 'Changes saved successfully.' });
      onSaved();
      onClose();
    } catch (err: any) {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 13,
    background: 'hsl(var(--background))', color: 'hsl(var(--foreground))',
    border: '1px solid hsl(var(--border))', outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'hsl(var(--foreground))', display: 'block', marginBottom: 5 };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'hsl(var(--card))', borderRadius: 16, border: '1px solid hsl(var(--border))',
        width: '100%', maxWidth: 700, maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid hsl(var(--border))',
          background: 'hsl(var(--primary)/0.07)', borderRadius: '16px 16px 0 0',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'hsl(var(--foreground))' }}>Edit Scholarship</div>
            <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>{scholarship.name}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))' }}>
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: 'auto', padding: '20px', flex: 1 }}>

          {/* Image Section */}
          <div style={{ marginBottom: 16, padding: '14px 16px', borderRadius: 10, border: '1px solid hsl(var(--border))', background: 'hsl(var(--muted)/0.3)' }}>
            <label style={labelStyle}>Scholarship Banner Image (optional)</label>
            {imagePreview && (
              <div style={{ marginBottom: 10, borderRadius: 8, overflow: 'hidden', maxHeight: 140 }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                  onError={() => setImagePreview('')} />
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 7, fontSize: 12.5, fontWeight: 600,
                background: 'hsl(var(--primary)/0.1)', color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--primary)/0.25)', cursor: 'pointer',
              }}>
                {imageUploading ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <ImageIcon size={13} />}
                {imageUploading ? 'Uploading…' : 'Upload Image'}
                <input type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
              </label>
              <span style={{ fontSize: 11.5, color: 'hsl(var(--muted-foreground))' }}>or paste URL:</span>
              <input value={imageUrl} onChange={e => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                placeholder="https://example.com/image.jpg"
                style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
              {imageUrl && (
                <button onClick={() => { setImageUrl(''); setImagePreview(''); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 12, fontWeight: 600 }}>
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Scholarship Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Organization *</label>
              <input value={org} onChange={e => setOrg(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Description *</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Amount Display *</label>
              <input value={amount} onChange={e => setAmount(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Amount (₹ number)</label>
              <input value={amountNum} onChange={e => setAmountNum(e.target.value)} type="number" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Deadline *</label>
              <input value={deadline} onChange={e => setDeadline(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Apply URL *</label>
            <input value={applyUrl} onChange={e => setApplyUrl(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Income Limit</label>
              <input value={income} onChange={e => setIncome(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Marks Criteria</label>
              <input value={marks} onChange={e => setMarks(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private / Corporate</SelectItem>
                  <SelectItem value="central">Central Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <Select value={schStatus} onValueChange={setSchStatus}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open Now</SelectItem>
                  <SelectItem value="upcoming">Opening Soon</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)}
              placeholder="e.g., Girls Only, Merit-based" style={inputStyle} />
          </div>

          {/* Streams */}
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Eligible Streams *</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {STREAM_OPTIONS.map(opt => {
                const checked = selectedStreams.includes(opt.value);
                return (
                  <button key={opt.value} onClick={() => toggleArr(selectedStreams, opt.value, setSelectedStreams)}
                    style={{
                      padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      background: checked ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                      color: checked ? '#fff' : 'hsl(var(--muted-foreground))',
                      border: checked ? '1px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Who */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Eligible Category *</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {WHO_OPTIONS.map(opt => {
                const checked = selectedWho.includes(opt.value);
                return (
                  <button key={opt.value} onClick={() => toggleArr(selectedWho, opt.value, setSelectedWho)}
                    style={{
                      padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      background: checked ? 'hsl(262 83% 52%)' : 'hsl(var(--muted))',
                      color: checked ? '#fff' : 'hsl(var(--muted-foreground))',
                      border: checked ? '1px solid hsl(262 83% 52%)' : '1px solid hsl(var(--border))',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', gap: 10, padding: '14px 20px',
          borderTop: '1px solid hsl(var(--border))',
          borderRadius: '0 0 16px 16px',
        }}>
          <Button variant="outline" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} style={{ flex: 2 }}>
            {saving ? <><Loader2 size={15} style={{ marginRight: 6, animation: 'spin 1s linear infinite' }} />Saving…</> : <><Save size={15} style={{ marginRight: 6 }} />Save Changes</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

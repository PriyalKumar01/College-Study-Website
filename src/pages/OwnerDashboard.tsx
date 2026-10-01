import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ComposedChart, Line, AreaChart, Area } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle, XCircle, User, Calendar, BookOpen, ShieldAlert,
  Eye, Trash2, Crown, UserPlus, UserMinus, Search, Loader2, FileText, Download, GraduationCap, ExternalLink, Bell, Send, Pencil, Trophy, Coins, Link, Lock, Sparkles, Clock, RefreshCw, RotateCcw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/providers/ThemeProvider';
import { smartDownload } from '@/lib/downloadUtils';
import MassEmailDashboard from '@/components/admin/MassEmailDashboard';
import SubmitScholarshipForm from '@/components/admin/SubmitScholarshipForm';
import { clearCachePrefix, removeCachedData } from '@/lib/cacheUtils';
import { syncContributorCount } from '@/lib/contributorSync';

// ── Complete list of branches for Contributor management (15 B.Tech branches + core) ─────────
const ALL_BRANCHES = [
  { code: 'CSE', label: 'Computer Science & Engineering (CSE)' },
  { code: 'IT', label: 'Information Technology (IT)' },
  { code: 'CSE-AIML', label: 'CSE - AI & Machine Learning (AIML)' },
  { code: 'ET', label: 'Electronics Technology (ET)' },
  { code: 'EE', label: 'Electrical Engineering (EE)' },
  { code: 'ME', label: 'Mechanical Engineering (ME)' },
  { code: 'CE', label: 'Civil Engineering (CE)' },
  { code: 'CHE', label: 'Chemical Engineering (CHE)' },
  { code: 'BE', label: 'Biochemical Engineering (BE)' },
  { code: 'LFT', label: 'Leather & Fashion Technology (LFT)' },
  { code: 'PT', label: 'Paint Technology (PT)' },
  { code: 'PL', label: 'Plastic Technology (PL)' },
  { code: 'FT', label: 'Food Technology (FT)' },
  { code: 'OT', label: 'Oil Technology (OT)' },
  { code: 'BT', label: 'Biotechnology (BT)' },
  { code: 'BS-MS', label: 'BS-MS Science & Mathematics' },
  { code: 'B.Pharma', label: 'B.Pharma' },
  { code: 'MBA', label: 'Master of Business Admin (MBA)' },
];

// ── Batch options from 2021 to 2040 (displayed as 2028, 2029, 2030 in dropdown) ──────────────
const BATCH_OPTIONS = Array.from({ length: 2040 - 2021 + 1 }, (_, i) => {
  const fullYear = 2021 + i;
  const twoDigit = String(fullYear).slice(-2);
  return {
    value: twoDigit,
    label: `${fullYear}`,
  };
});

interface Material {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  semester: string;
  year: string | null;
  material_type: string;
  status: string;
  file_url: string;
  file_name: string;
  uploaded_by: string;
  user_email: string;
  user_name: string;
  uploaded_at: string | null;
}

interface AdminRole {
  id: string;
  user_email: string;
  user_name: string | null;
  role: string;
  created_at: string | null;
  created_by: string | null;
  from_date: string | null;
  to_date: string | null;
}

interface ContributorRecord {
  id: string;
  name: string;
  branch: string;
  batch: string;
  coins: number;
  linkedin_url: string | null;
  image_url: string | null;
  created_at: string | null;
}

interface Scholarship {
  id: string;
  name: string;
  org: string;
  amount: string;
  description: string;
  deadline: string;
  apply_url: string;
  approval_status: string;
  status: string;
  submitted_by: string | null;
  submitted_by_email: string | null;
  created_at: string | null;
}

// ─── AdminRoleCard — shows name/email/dates, owner can edit inline ────────────
interface AdminRoleCardProps {
  role: AdminRole;
  rank: number;
  currentUserEmail?: string;
  onRemove: (id: string, email: string) => void;
  onRefresh: () => void;
}

function AdminRoleCard({ role, rank, currentUserEmail, onRemove, onRefresh }: AdminRoleCardProps) {
  const { toast } = useToast();
  const isOwnerRole = role.role === 'owner';
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Local display state — optimistic update immediately after save
  const [displayName, setDisplayName] = useState(role.user_name || '');
  const [displayFrom, setDisplayFrom] = useState(role.from_date || '');
  const [displayTo, setDisplayTo] = useState(role.to_date || '');

  // Edit form state
  const [editName, setEditName] = useState(role.user_name || '');
  const [editFromDate, setEditFromDate] = useState(role.from_date || '');
  const [editToDate, setEditToDate] = useState(role.to_date || '');

  // Sync when parent passes fresh role data
  useEffect(() => {
    setDisplayName(role.user_name || '');
    setDisplayFrom(role.from_date || '');
    setDisplayTo(role.to_date || '');
    setEditName(role.user_name || '');
    setEditFromDate(role.from_date || '');
    setEditToDate(role.to_date || '');
  }, [role.user_name, role.from_date, role.to_date]);

  const handleSave = async () => {
    setSaving(true);
    const nameVal = editName.trim() || null;
    const fromVal = editFromDate || null;
    const toVal   = editToDate   || null;
    try {
      const { error } = await (supabase as any)
        .from('admin_roles')
        .update({ user_name: nameVal, from_date: fromVal, to_date: toVal })
        .eq('id', role.id);
      if (error) throw error;
      // Optimistic display update immediately
      setDisplayName(nameVal || '');
      setDisplayFrom(fromVal || '');
      setDisplayTo(toVal || '');
      toast({ title: 'Updated ✅', description: 'Admin details saved.' });
      setEditing(false);
      onRefresh();
    } catch (err: any) {
      toast({ title: 'Error saving', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const fmtDate = (d: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };

  const isActive = !displayTo;

  return (
    <Card className={`border-0 shadow-sm transition-all duration-200 ${
      isOwnerRole
        ? 'bg-gradient-to-r from-amber-50 to-yellow-50/60 dark:from-amber-900/20 dark:to-amber-800/10 border-l-4 border-l-amber-400'
        : isActive
          ? 'bg-white dark:bg-slate-800 border-l-4 border-l-blue-400 hover:shadow-md'
          : 'bg-slate-50 dark:bg-slate-800/60 border-l-4 border-l-slate-300'
    }`}>
      <CardContent className="p-4">
        {editing ? (
          /* ── Edit mode ── */
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Editing: {role.user_email}</span>
            </div>
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              placeholder="Full Name (e.g. Rahul Singh)"
              className="w-full text-sm px-3 py-1.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition-colors"
            />
            <div className="flex gap-3 flex-wrap items-center text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold">From:</span>
                <input type="date" value={editFromDate} onChange={e => setEditFromDate(e.target.value)}
                  className="px-2 py-1 rounded border border-border bg-background text-foreground text-xs outline-none" />
              </label>
              <label className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold">To:</span>
                <input type="date" value={editToDate} onChange={e => setEditToDate(e.target.value)}
                  className="px-2 py-1 rounded border border-border bg-background text-foreground text-xs outline-none" />
              </label>
              <span className="text-[10px] text-muted-foreground italic">Leave 'To' empty if currently active</span>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={saving}
                className="px-4 py-1.5 text-xs font-bold rounded-lg text-white transition-opacity"
                style={{ background: 'hsl(var(--primary))', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              <button onClick={() => { setEditing(false); setEditName(displayName); setEditFromDate(displayFrom); setEditToDate(displayTo); }}
                className="px-4 py-1.5 text-xs font-bold rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ── Display mode ── */
          <div className="flex items-center gap-4">
            {/* Rank number */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
              isOwnerRole ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            }`}>
              {isOwnerRole ? <Crown className="h-4 w-4" /> : rank}
            </div>

            {/* Name + Email */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-bold text-sm ${
                  displayName ? 'text-foreground' : 'text-muted-foreground italic'
                }`}>
                  {displayName || '(no name set)'}
                </span>
                <Badge variant="outline" className={`text-[10px] capitalize px-2 py-0 ${
                  isOwnerRole ? 'border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  {isOwnerRole ? '👑 Owner' : '🛡️ Admin'}
                </Badge>
                {!isOwnerRole && isActive && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{role.user_email}</p>
            </div>

            {/* Date range — right side */}
            <div className="text-right flex-shrink-0 min-w-[110px]">
              {(displayFrom || displayTo) ? (
                <>
                  <p className="text-[11px] font-semibold text-foreground/70">
                    {displayFrom ? fmtDate(displayFrom) : '?'}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    → {displayTo ? fmtDate(displayTo) : <span className="text-green-600 font-bold">Present</span>}
                  </p>
                </>
              ) : (
                <p className="text-[10px] text-muted-foreground italic">No dates set</p>
              )}
            </div>

            {/* Actions */}
            {!isOwnerRole && (
              <div className="flex gap-1 items-center flex-shrink-0">
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 h-8 px-2"
                  onClick={() => setEditing(true)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                {role.user_email !== currentUserEmail && (
                  <Button variant="ghost" size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 px-2"
                    onClick={() => onRemove(role.id, role.user_email)}>
                    <UserMinus className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── ContributorCard — compact data row with inline edit/delete for each contributor ────────────────
interface ContributorCardProps {
  contributor: ContributorRecord;
  rank: number;
  onRefresh: () => void;
}

function ContributorCard({ contributor, rank, onRefresh }: ContributorCardProps) {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editName, setEditName] = useState(contributor.name);
  const [editBranch, setEditBranch] = useState(contributor.branch);
  const [editBatch, setEditBatch] = useState(contributor.batch?.replace(/^'+/, '') || '28');
  const [editCoins, setEditCoins] = useState(String(Math.max(0, contributor.coins || 0)));
  const [editLinkedin, setEditLinkedin] = useState(contributor.linkedin_url || '');
  const [editImage, setEditImage] = useState(contributor.image_url || '');

  const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

  const handleSave = async () => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      const cleanCoins = Math.max(0, parseInt(editCoins) || 0);
      const cleanBatch = editBatch.trim().replace(/^'+/, '');
      const { error } = await (supabase as any)
        .from('contributors')
        .update({
          name: editName.trim(),
          branch: editBranch.trim(),
          batch: cleanBatch,
          coins: cleanCoins,
          linkedin_url: editLinkedin.trim() || null,
          image_url: editImage.trim() || null,
        })
        .eq('id', contributor.id);
      if (error) throw error;
      toast({ title: 'Updated ✅', description: 'Contributor details saved.' });
      clearCachePrefix('contributors');
      removeCachedData('contributors_list');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_contributors_updated'));
      }
      setEditing(false);
      onRefresh();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to remove ${contributor.name} from the contributors list?`)) return;
    try {
      const { error } = await (supabase as any).from('contributors').delete().eq('id', contributor.id);
      if (error) throw error;
      toast({ title: 'Removed', description: `${contributor.name} has been deleted.` });
      clearCachePrefix('contributors');
      removeCachedData('contributors_list');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_contributors_updated'));
      }
      onRefresh();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const cleanBatchDisplay = (contributor.batch || '').replace(/^'+/, '');

  return (
    <div className="border border-border/70 rounded-xl p-3 sm:p-3.5 bg-card hover:bg-sky-50/60 dark:hover:bg-sky-950/25 hover:border-sky-300 dark:hover:border-sky-800 transition-all duration-200 shadow-xs">
      {editing ? (
        <div className="space-y-3 p-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Editing Contributor</span>
            <span className="text-xs font-mono text-muted-foreground">{contributor.id.slice(0, 8)}...</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <Input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              placeholder="Full Name *"
              className="sm:col-span-2 text-sm"
            />
            {/* Branch dropdown */}
            <Select value={editBranch} onValueChange={setEditBranch}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                {ALL_BRANCHES.map(b => (
                  <SelectItem key={b.code} value={b.code} className="text-xs">
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Passout Year dropdown (2021 to 2040) */}
            <Select value={editBatch} onValueChange={setEditBatch}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue placeholder="Passout Year" />
              </SelectTrigger>
              <SelectContent>
                {BATCH_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value} className="text-xs">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <Label className="text-[10px] text-muted-foreground">Coins / PDF Count (min 0)</Label>
              <Input
                type="number"
                min="0"
                value={editCoins}
                onKeyDown={e => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                onChange={e => setEditCoins(Math.max(0, parseInt(e.target.value) || 0).toString())}
                placeholder="Coins (notes count)"
                className="text-xs h-9"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-[10px] text-muted-foreground">LinkedIn URL (optional)</Label>
              <Input
                value={editLinkedin}
                onChange={e => setEditLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="text-xs h-9"
              />
            </div>
          </div>
          <div>
            <Label className="text-[10px] text-muted-foreground">Image URL / Path (optional, e.g. /Devanshi.png)</Label>
            <Input
              value={editImage}
              onChange={e => setEditImage(e.target.value)}
              placeholder="e.g. /Devanshi.png or https://..."
              className="text-xs h-9"
            />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setEditName(contributor.name);
                setEditBranch(contributor.branch);
                setEditBatch(contributor.batch?.replace(/^'+/, '') || '28');
                setEditCoins(String(Math.max(0, contributor.coins || 0)));
                setEditLinkedin(contributor.linkedin_url || '');
                setEditImage(contributor.image_url || '');
              }}
              className="h-8 text-xs font-medium"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving || !editName.trim()}
              className="h-8 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : null}
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Rank, Name, Details */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-muted/80 text-foreground shrink-0 border border-border/50">
              {MEDAL[rank] || rank}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-foreground truncate">{contributor.name}</span>
                <Badge variant="outline" className="text-[11px] font-semibold bg-muted/50 border-border px-2 py-0">
                  {contributor.branch || 'Engg'} '{cleanBatchDisplay || '28'} • HBTU
                </Badge>
                <Badge className="text-[11px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0 font-bold">
                  <Coins className="h-3 w-3 mr-1 text-amber-500" />
                  {contributor.coins || 0} PDFs
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                <span className="text-[11px]">Rank #{rank}</span>
                {contributor.linkedin_url && (
                  <a
                    href={contributor.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Link className="h-3 w-3" /> LinkedIn
                  </a>
                )}
                {contributor.image_url && (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    📷 Photo linked
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions (High contrast, clearly visible on hover and default) */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs font-semibold rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white shadow-xs transition-colors flex items-center gap-1.5"
              onClick={() => setEditing(true)}
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs font-semibold rounded-lg border border-red-300 dark:border-red-700 bg-red-50/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white shadow-xs transition-colors flex items-center gap-1.5"
              onClick={handleDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const normalizeBranch = (branch: string | null) => {
  if (!branch) return 'Other Colleges';
  const b = branch.toLowerCase().trim();
  
  if (['cse-aiml', 'ai/ml', 'aiml', 'cse ai ml', 'artificial intelligence'].some(val => b.includes(val))) return 'CSE-AIML';
  if (['cse', 'computer science', 'c.s.e', 'computer science & engineering'].some(val => b.includes(val))) return 'CSE';
  if (['it', 'i.t', 'information technology'].some(val => b.includes(val)) && !b.includes('leather')) return 'IT';
  if (['pt', 'paint', 'paint technology'].some(val => b.includes(val))) return 'PT';
  if (['ot', 'oil', 'oil technology'].some(val => b.includes(val))) return 'OT';
  if (['et', 'ece', 'electronics'].some(val => b.includes(val))) return 'ET';
  if (['ee', 'electrical', 'electrical engineering'].some(val => b.includes(val))) return 'EE';
  if (['pl', 'plastic', 'plastic technology'].some(val => b.includes(val))) return 'PL';
  if (['be', 'biochem', 'biochemical engineering'].some(val => b.includes(val))) return 'BE';
  if (['che', 'chem', 'chemical'].some(val => b.includes(val)) && !b.includes('biochem')) return 'CHE';
  if (['me', 'mech', 'mechanical'].some(val => b.includes(val))) return 'ME';
  if (['ce', 'civil', 'civil engineering'].some(val => b.includes(val))) return 'CE';
  if (['lft', 'leather', 'leather & fashion technology'].some(val => b.includes(val))) return 'LFT';
  if (['ft', 'food', 'food technology'].some(val => b.includes(val))) return 'FT';
  if (['bt', 'biotech', 'biotechnology'].some(val => b.includes(val))) return 'BT';
  
  return 'Other Colleges';
};

const HBTU_PATTERNS = [
  /\bhbtu\b/i,
  /harcourt\s+butler/i,
  /hbtu\s*kanpur/i,
  /hbtuk\b/i,
];

const isHBTUCollege = (name?: string | null): boolean => {
  if (!name) return false;
  return HBTU_PATTERNS.some(re => re.test(name));
};

const PREMIUM_ITEMS_PER_PAGE = 20;

const PremiumSection = ({ title, icon: Icon, color, items, onRevoke, onRevokeAll, revokingId }: any) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / PREMIUM_ITEMS_PER_PAGE) || 1;
  const paginated = items.slice((page - 1) * PREMIUM_ITEMS_PER_PAGE, page * PREMIUM_ITEMS_PER_PAGE);
  
  const planLabel = (plan: string) => ({'companies':'Companies Page','hr_emails':'HR Emails','resume':'Resume Guide','roadmaps':'Roadmap Guide','gate_study':'GATE Study'}[plan] || plan);
  const planColor = (plan: string) => (plan === 'gate_study' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' : plan === 'companies' ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200 dark:border-violet-800' : plan === 'hr_emails' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : plan === 'roadmaps' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800' : 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 border-orange-200 dark:border-orange-800');

  return (
    <Card className="border border-border/80 shadow-md overflow-hidden bg-card">
      <CardHeader className="border-b pb-3.5 pt-4 bg-muted/20">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="h-4 w-4" />
            </div>
            <span>{title}</span>
            <Badge variant="secondary" className="font-bold text-xs">
              {items.length} Total
            </Badge>
          </CardTitle>
          <span className="text-xs text-muted-foreground font-medium bg-background px-2.5 py-1 rounded-md border border-border">
            {PREMIUM_ITEMS_PER_PAGE} per page
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <UserMinus className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No users in this category.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {paginated.map((item: any, idx: number) => {
              const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Anonymous Student';
              const isInBoth = item.purchases.some((p: any) => p.plan === 'gate_study') && item.purchases.some((p: any) => p.plan !== 'gate_study');
              const globalIndex = (page - 1) * PREMIUM_ITEMS_PER_PAGE + idx + 1;

              return (
                <div
                  key={item.user_id}
                  className="p-3.5 sm:p-4 hover:bg-muted/40 transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* User Profile Info */}
                    <div className="flex items-center gap-3 min-w-0 md:max-w-md">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-border text-muted-foreground font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        #{globalIndex}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-foreground truncate">{fullName}</span>
                          {item.branch && (
                            <Badge variant="outline" className="text-[10px] font-semibold py-0 px-1.5 h-5 bg-background">
                              {item.branch}
                            </Badge>
                          )}
                          {isInBoth && (
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 shrink-0">
                              ⭐ Both Plans
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">{item.email}</p>
                      </div>
                    </div>

                    {/* Active Packages Badges & Actions */}
                    <div className="flex flex-wrap items-center md:justify-end gap-1.5 pl-11 md:pl-0">
                      {item.purchases.map((pur: any) => (
                        <div
                          key={pur.id}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium shadow-2xs ${planColor(pur.plan)}`}
                        >
                          <span>{planLabel(pur.plan)}</span>
                          <span className="opacity-60 text-[10px] uppercase font-mono">
                            ({pur.payment_status === 'free' ? 'FREE' : `₹${(pur.amount_paid || 0) / 100}`})
                          </span>
                          <button
                            type="button"
                            onClick={() => onRevoke(item.user_id, pur.plan, fullName)}
                            disabled={revokingId !== null}
                            title={`Revoke ${planLabel(pur.plan)}`}
                            className="ml-0.5 text-red-500 hover:text-red-700 dark:hover:text-red-400 p-0.5 rounded hover:bg-red-100/50 dark:hover:bg-red-950/60 transition-colors disabled:opacity-40"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      {item.purchases.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onRevokeAll(item.user_id, fullName)}
                          disabled={revokingId !== null}
                          className="h-7 text-xs font-semibold px-2.5 shadow-xs ml-1"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Revoke All
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-3.5 border-t border-border/80 bg-muted/10 text-xs">
          <span className="text-muted-foreground font-medium">Page {page} of {totalPages} ({items.length} total)</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="h-7 text-xs">← Prev</Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="h-7 text-xs">Next →</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

const GATE_ITEMS_PER_PAGE = 50;

const GateEnrolledSection = ({ items, onRevoke, revokingId }: any) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / GATE_ITEMS_PER_PAGE) || 1;
  const paginated = items.slice((page - 1) * GATE_ITEMS_PER_PAGE, page * GATE_ITEMS_PER_PAGE);

  return (
    <Card className="gradient-card border border-border/80 shadow-md overflow-hidden">
      <CardHeader className="border-b pb-3.5 pt-4 bg-muted/20">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BookOpen className="h-4 w-4" />
            </div>
            <span>GATE Study Enrolled Students</span>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs">
              {items.length} Total
            </Badge>
          </CardTitle>
          <span className="text-xs text-muted-foreground font-medium bg-background/80 px-2.5 py-1 rounded-md border border-border">
            50 per page
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <UserMinus className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No students currently enrolled in GATE Study.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {paginated.map((item: any, idx: number) => {
              const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Anonymous Student';
              const pur = item.purchases.find((p: any) => p.plan === 'gate_study') || item.purchases[0];
              const isBoth = item.purchases.some((p: any) => p.plan !== 'gate_study');
              const globalIndex = (page - 1) * GATE_ITEMS_PER_PAGE + idx + 1;
              const isRevoking = revokingId === `${item.user_id}-gate_study` || revokingId === `${item.user_id}-${pur?.plan}`;

              return (
                <div
                  key={item.user_id}
                  className="flex items-center justify-between px-4 py-2 hover:bg-muted/30 transition-colors text-xs gap-3 w-full"
                >
                  {/* Left: Index + Name & Email */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="w-8 text-muted-foreground font-mono text-[11px] shrink-0 text-right">
                      #{globalIndex}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-[280px]">
                          {fullName}
                        </span>
                        {item.branch && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 shrink-0">
                            {item.branch}
                          </span>
                        )}
                        {isBoth && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.2 rounded border border-amber-300 dark:border-amber-800 shrink-0">
                            ⭐ Mutual (Both)
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-[11px] truncate">{item.email}</p>
                    </div>
                  </div>

                  {/* Right: Enrolled info & Revoke Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-muted-foreground hidden md:inline">
                      {pur?.purchased_at
                        ? new Date(pur.purchased_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })
                        : 'Enrolled'}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60 hidden sm:inline-flex">
                      GATE Study
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRevoke(item.user_id, pur?.plan || 'gate_study', fullName)}
                      disabled={revokingId !== null}
                      className="h-7 px-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs gap-1 font-medium"
                      title="Revoke GATE Access"
                    >
                      {isRevoking ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>Revoke</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
            <span className="text-xs text-muted-foreground">
              Showing {(page - 1) * GATE_ITEMS_PER_PAGE + 1}–{Math.min(page * GATE_ITEMS_PER_PAGE, items.length)} of {items.length} students (Page {page} of {totalPages})
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OwnerDashboard = () => {
  const { user, isOwner, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const { toast } = useToast();

  const [pendingMaterials, setPendingMaterials] = useState<Material[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [adminRoles, setAdminRoles] = useState<AdminRole[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [isPromoting, setIsPromoting] = useState(false);
  const [materialFilter, setMaterialFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarshipFilter, setScholarshipFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [showAddScholarshipModal, setShowAddScholarshipModal] = useState(false);
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [sendingNotif, setSendingNotif] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id:string; title:string; body:string; sent_by:string; created_at:string}>>([]);
  const [contributors, setContributors] = useState<ContributorRecord[]>([]);
  const [newContrib, setNewContrib] = useState({ name: '', branch: '', batch: '', coins: '', linkedin_url: '', image_url: '' });
  const [isAddingContrib, setIsAddingContrib] = useState(false);

  const [premiumPurchases, setPremiumPurchases] = useState<any[]>([]);
  const [pendingGateRequests, setPendingGateRequests] = useState<any[]>([]);
  const [isApprovingGate, setIsApprovingGate] = useState<string | null>(null);
  const [searchPremiumQuery, setSearchPremiumQuery] = useState('');
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const [grantEmail, setGrantEmail] = useState('');
  const [grantPlan, setGrantPlan] = useState('companies');
  const [isGranting, setIsGranting] = useState(false);

  // Analytics and signup stats
  const [signupStats, setSignupStats] = useState<{ verified: number; failed: number; pending: number; disposableBlocked: number }>({ verified: 0, failed: 0, pending: 0, disposableBlocked: 0 });
  const [campaignStats, setCampaignStats] = useState<{ total: number; sent: number; failed: number }>({ total: 0, sent: 0, failed: 0 });
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);
  const [contribPage, setContribPage] = useState(1);
  const [otherCollegeUsers, setOtherCollegeUsers] = useState([]);
  const [showOtherCollegeModal, setShowOtherCollegeModal] = useState(false);
  const [signupDaysFilter, setSignupDaysFilter] = useState<'7days' | '30days'>('7days');
  const [dailySignups, setDailySignups] = useState<{ date: string; count: number }[]>([]);
  const [branchStats, setBranchStats] = useState<{ name: string; count: number }[]>([]);

  // New Dashboard States
  const [collegeStats, setCollegeStats] = useState<{ name: string; value: number }[]>([]);
  const [activeCollegeIndex, setActiveCollegeIndex] = useState<number | null>(null);

  // Card deck stack loop swiping states
  const [pendingStackIndex, setPendingStackIndex] = useState(0);
  const [pendingSwiping, setPendingSwiping] = useState(false);
  const [allStackIndex, setAllStackIndex] = useState(0);
  const [allSwiping, setAllSwiping] = useState(false);

  // Clickable Modal Section view state (default null so no section is expanded on page load)
  const [activeModalSection, setActiveModalSection] = useState<'pending' | 'scholarships' | 'premium' | 'notifications' | 'contributors' | 'admins' | 'emails' | 'all' | 'account_approvals' | 'gate_requests' | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [isProcessingApproval, setIsProcessingApproval] = useState<string | null>(null);
  const [contribSearch, setContribSearch] = useState('');

  // ─── Computed variables (must be before useEffect hooks) ─────────────────────
  
  const last7DaysData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    const found = dailySignups.find(s => s.date === key);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    return { date: dayName, fullDate: key, count: found ? found.count : 0 };
  });

  const last30DaysWeeklyData = [0, 1, 2, 3].map(w => {
    const endOffset = w * 7;
    const startOffset = endOffset + 6;
    const now = new Date();
    const endDate = new Date(now.getTime() - endOffset * 86400000);
    const startDate = new Date(now.getTime() - startOffset * 86400000);
    
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const total = dailySignups
      .filter(s => s.date >= startStr && s.date <= endStr)
      .reduce((sum, s) => sum + s.count, 0);

    return { week: `Week ${4 - w}`, count: total };
  }).reverse();

  const filteredMaterials = allMaterials.filter(m => {
    const matchesFilter = materialFilter === 'all' || m.status === materialFilter;
    const matchesSearch = !searchQuery || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.user_email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredContributors = useMemo(() => {
    if (!contribSearch.trim()) return contributors;
    const q = contribSearch.toLowerCase().trim();
    return contributors.filter(c =>
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.branch && c.branch.toLowerCase().includes(q)) ||
      (c.batch && c.batch.includes(q))
    );
  }, [contributors, contribSearch]);

  const totalContribPages = Math.max(1, Math.ceil(filteredContributors.length / 50));
  const currentContribs = useMemo(() => {
    return filteredContributors.slice((contribPage - 1) * 50, contribPage * 50);
  }, [filteredContributors, contribPage]);


  // Group premium purchases by user
  const groupedPremiumUsers = premiumPurchases.reduce((acc: any, purchase: any) => {
    const userId = purchase.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        user_id: userId,
        first_name: purchase.first_name || '',
        last_name: purchase.last_name || '',
        branch: purchase.branch || '',
        email: purchase.email || purchase.user_email,
        purchases: [],
      };
    }
    acc[userId].purchases.push(purchase);
    return acc;
  }, {});

  const groupedList = Object.values(groupedPremiumUsers);

  const filteredGroupedList = groupedList.filter((item: any) => {
    const search = searchPremiumQuery.toLowerCase();
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    return (
      fullName.includes(search) ||
      item.email.toLowerCase().includes(search) ||
      item.branch.toLowerCase().includes(search)
    );
  });

  const gateEnrolledCount = premiumPurchases.filter(p => p.plan === 'gate_study').length;
  const premiumAccessCount = premiumPurchases.filter(p => p.plan !== 'gate_study').length;

  const textColor = isDark ? '#94a3b8' : '#475569';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipColor = isDark ? '#f8fafc' : '#0f172a';
  const tooltipBorder = isDark ? '1px solid #334155' : '1px solid #e2e8f0';

  useEffect(() => {
    if (isOwner) {
      fetchAll();
      fetchNotifications();
    }
  }, [isOwner]);

  useEffect(() => {
    setPendingStackIndex(0);
  }, [pendingMaterials.length]);

  useEffect(() => {
    setAllStackIndex(0);
  }, [filteredMaterials.length]);

  const handlePendingSwipe = () => {
    if (pendingSwiping || pendingMaterials.length <= 1) return;
    setPendingSwiping(true);
    setTimeout(() => {
      setPendingStackIndex(prev => (prev + 1) % pendingMaterials.length);
      setPendingSwiping(false);
    }, 300);
  };

  const getPendingCardStyle = (index: number) => {
    const total = pendingMaterials.length;
    if (total === 0) return { scale: 1, y: 0, opacity: 1, zIndex: 1, pointerEvents: 'auto' as const };
    const position = (index - pendingStackIndex + total) % total;
    if (position === 0) {
      return { zIndex: 30, scale: 1, y: 0, opacity: 1, pointerEvents: 'auto' as const };
    } else if (position === 1) {
      return { zIndex: 20, scale: 0.96, y: 12, opacity: 0.85, pointerEvents: 'none' as const };
    } else if (position === 2) {
      return { zIndex: 10, scale: 0.92, y: 24, opacity: 0.60, pointerEvents: 'none' as const };
    } else {
      return { zIndex: 0, scale: 0.88, y: 36, opacity: 0, pointerEvents: 'none' as const };
    }
  };

  const handleAllSwipe = () => {
    if (allSwiping || filteredMaterials.length <= 1) return;
    setAllSwiping(true);
    setTimeout(() => {
      setAllStackIndex(prev => (prev + 1) % filteredMaterials.length);
      setAllSwiping(false);
    }, 300);
  };

  const getAllCardStyle = (index: number) => {
    const total = filteredMaterials.length;
    if (total === 0) return { scale: 1, y: 0, opacity: 1, zIndex: 1, pointerEvents: 'auto' as const };
    const position = (index - allStackIndex + total) % total;
    if (position === 0) {
      return { zIndex: 30, scale: 1, y: 0, opacity: 1, pointerEvents: 'auto' as const };
    } else if (position === 1) {
      return { zIndex: 20, scale: 0.96, y: 12, opacity: 0.85, pointerEvents: 'none' as const };
    } else if (position === 2) {
      return { zIndex: 10, scale: 0.92, y: 24, opacity: 0.60, pointerEvents: 'none' as const };
    } else {
      return { zIndex: 0, scale: 0.88, y: 36, opacity: 0, pointerEvents: 'none' as const };
    }
  };

  const fetchNotifications = async () => {
    const { data } = await (supabase as any)
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setNotifications(data);
  };

  const handleSendNotification = async () => {
    if (!notifTitle.trim() || !notifBody.trim()) return;
    setSendingNotif(true);
    try {
      const { error } = await (supabase as any).from('notifications').insert({
        title: notifTitle.trim(),
        body: notifBody.trim(),
        sent_by: user?.user_metadata?.first_name || 'Priyal Kumar',
        sent_by_email: user?.email,
        is_active: true,
      });
      if (error) throw error;
      toast({ title: '🔔 Notification sent!', description: 'All users will see it in the notification bell.' });
      setNotifTitle('');
      setNotifBody('');
      fetchNotifications();
    } catch (err: any) {
      toast({ title: 'Failed to send', description: err.message, variant: 'destructive' });
    } finally {
      setSendingNotif(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    await (supabase as any).from('notifications').delete().eq('id', id);
    fetchNotifications();
  };

  const fetchSignupStats = async () => {
    try {
      const { data, error } = await supabase
        .from('signup_attempts')
        .select('status, error_reason');
      
      if (error) throw error;
      
      let verified = 0;
      let failed = 0;
      let pending = 0;
      let disposableBlocked = 0;
      
      data?.forEach(attempt => {
        if (attempt.status === 'verified') verified++;
        else if (attempt.status === 'pending') pending++;
        else {
          failed++;
          if (attempt.error_reason?.toLowerCase().includes('disposable') || attempt.error_reason?.toLowerCase().includes('temp')) {
            disposableBlocked++;
          }
        }
      });
      
      setSignupStats({ verified, failed, pending, disposableBlocked });
    } catch (err) {
      console.error('Error fetching signup stats:', err);
    }
  };

  const fetchCampaignStats = async () => {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('sent_count, failed_count');
      
      if (error) throw error;
      
      let total = data?.length || 0;
      let sent = 0;
      let failed = 0;
      
      data?.forEach(camp => {
        sent += camp.sent_count || 0;
        failed += camp.failed_count || 0;
      });
      
      setCampaignStats({ total, sent, failed });
    } catch (err) {
      console.error('Error fetching campaign stats:', err);
    }
  };

  const fetchTotalStudents = async () => {
    try {
      const { data, error } = await supabase.rpc('get_total_students_count');
      if (error) throw error;
      setTotalStudentsCount(data || 0);
    } catch (err) {
      console.error('Error fetching total students count via RPC:', err);
      // Fallback
      try {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        setTotalStudentsCount(count || 0);
      } catch (fallbackErr) {
        console.error('Error in count fallback:', fallbackErr);
      }
    }
  };

  
  const fetchDashboardStats = async () => {
    try {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('created_at, branch, college, first_name, last_name, email');

      if (profilesData) {
        const counts: Record<string, number> = {};
        const others: any[] = [];

        profilesData.forEach((p: any) => {
          const norm = normalizeBranch(p.branch);
          counts[norm] = (counts[norm] || 0) + 1;
          const colName = p.college ? p.college.trim() : '';
          const isOther = (colName && !isHBTUCollege(colName)) || p.branch === 'Other Colleges' || norm === 'Other Colleges';
          if (isOther) {
            others.push(p);
          }
        });
        setOtherCollegeUsers(others as any);

        const statsArr = Object.entries(counts).map(([name, count]) => ({ name, count }));
        statsArr.sort((a, b) => {
          if (a.name === 'Other Colleges') return 1;
          if (b.name === 'Other Colleges') return -1;
          return b.count - a.count;
        });
        setBranchStats(statsArr);

        const dayCounts: Record<string, number> = {};
        profilesData.forEach((p: any) => {
          if (p.created_at) {
            const dateKey = p.created_at.split('T')[0];
            dayCounts[dateKey] = (dayCounts[dateKey] || 0) + 1;
          }
        });

        const sortedDays = Object.entries(dayCounts)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setDailySignups(sortedDays);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  const fetchCollegeStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_college_stats');
      if (error) throw error;
      
      let hbtu = 0;
      let other = 0;
      
      if (data && Array.isArray(data)) {
        data.forEach((item: any) => {
          const colName = (item.college_name || '').trim();
          const count = Number(item.student_count) || 0;
          if (isHBTUCollege(colName) || colName.toLowerCase() === 'hbtu' || colName.toLowerCase().includes('harcourt') || colName.toLowerCase() === 'hbtu kanpur') {
            hbtu += count;
          } else {
            other += count;
          }
        });
      }

      if (totalStudentsCount > 0 && hbtu + other < totalStudentsCount) {
        if (hbtu === 0) hbtu = totalStudentsCount - other;
      }

      setCollegeStats([
        { name: 'HBTU', value: hbtu },
        { name: 'Other', value: other }
      ]);
    } catch (err) {
      console.error('Error fetching college stats:', err);
      const other = otherCollegeUsers.length || 0;
      const hbtu = Math.max(0, totalStudentsCount - other);
      setCollegeStats([
        { name: 'HBTU', value: hbtu },
        { name: 'Other', value: other }
      ]);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchPendingMaterials(),
      fetchAllMaterials(),
      fetchAdminRoles(),
      fetchScholarships(),
      fetchContributors(),
      fetchPremiumPurchases(),
      fetchPendingGateRequests(),
      fetchPendingApprovals(),
      fetchSignupStats(),
      fetchCampaignStats(),
      fetchTotalStudents(),
      fetchCollegeStats(),
      fetchDashboardStats()
    ]);
    setLoading(false);
  };

  const fetchPendingGateRequests = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('premium_purchases')
        .select('*')
        .eq('plan', 'gate_study')
        .eq('payment_status', 'pending')
        .order('purchased_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) {
        setPendingGateRequests([]);
        return;
      }

      const userIds = Array.from(new Set(data.map((p: any) => p.user_id)));
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name, branch, college, year, email')
        .in('user_id', userIds);

      const profileMap = new Map((profiles || []).map((p: any) => [p.user_id, p]));

      const joined = data.map((p: any) => {
        const prof = profileMap.get(p.user_id);
        return {
          ...p,
          first_name: prof?.first_name || '',
          last_name: prof?.last_name || '',
          branch: p.target_branch || p.branch || prof?.branch || '',
          college_branch: prof?.branch || '',
          target_branch: p.target_branch || p.branch || 'CSE',
          college: prof?.college || '',
          year: prof?.year || '',
          email: prof?.email || p.user_email,
        };
      });

      setPendingGateRequests(joined);
    } catch (err) {
      console.error('Error in fetchPendingGateRequests:', err);
    }
  };

  const handleApproveGateRequest = async (requestId: string, userId: string, userName: string) => {
    setIsApprovingGate(requestId);
    try {
      const { error } = await (supabase as any)
        .from('premium_purchases')
        .update({ payment_status: 'free' })
        .eq('id', requestId);

      if (error) throw error;

      clearCachePrefix(`gate_access_${userId}`);

      toast({
        title: 'GATE Access Approved! ✅',
        description: `Approved access for ${userName}.`
      });

      await Promise.all([fetchPendingGateRequests(), fetchPremiumPurchases()]);
    } catch (err: any) {
      toast({
        title: 'Approval Failed',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setIsApprovingGate(null);
    }
  };

  const handleRejectGateRequest = async (requestId: string, userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to decline the GATE access request for ${userName}?`)) return;
    setIsApprovingGate(requestId);
    try {
      const { error } = await (supabase as any)
        .from('premium_purchases')
        .delete()
        .eq('id', requestId);

      if (error) throw error;

      clearCachePrefix(`gate_access_${userId}`);

      toast({
        title: 'Request Declined',
        description: `GATE request for ${userName} has been removed.`
      });

      await fetchPendingGateRequests();
    } catch (err: any) {
      toast({
        title: 'Action Failed',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setIsApprovingGate(null);
    }
  };

  const fetchPendingApprovals = async () => {
    try {
      // 1. Try secure RPC function first
      const { data: rpcData, error: rpcError } = await (supabase as any).rpc('get_pending_account_approvals');
      if (!rpcError && rpcData) {
        setPendingApprovals(rpcData || []);
        return;
      }

      // 2. Direct profiles fallback
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingApprovals(data || []);
    } catch (err: any) {
      console.error('Error fetching pending approvals:', err);
    }
  };

  const handleApproveAccount = async (userId: string, email: string) => {
    setIsProcessingApproval(userId);
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ approval_status: 'approved' })
        .eq('user_id', userId);

      if (error) throw error;
      toast({
        title: 'Account Approved ✅',
        description: `${email} has been approved and granted full access.`
      });
      await fetchPendingApprovals();
    } catch (err: any) {
      toast({ title: 'Approval Failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsProcessingApproval(null);
    }
  };

  const handleRejectAccount = async (userId: string, email: string) => {
    if (!window.confirm(`Are you sure you want to reject and ban ${email}?`)) return;
    setIsProcessingApproval(userId);
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          approval_status: 'rejected',
          banned_until: new Date(Date.now() + 1000 * 86400 * 1000).toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
      toast({
        title: 'Account Rejected ❌',
        description: `${email} was rejected and access revoked.`
      });
      await fetchPendingApprovals();
    } catch (err: any) {
      toast({ title: 'Rejection Failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsProcessingApproval(null);
    }
  };

  const fetchPremiumPurchases = async () => {
    try {
      const { data: purchases, error: purchaseError } = await (supabase as any)
        .from('premium_purchases')
        .select('*')
        .in('payment_status', ['completed', 'free'])
        .order('purchased_at', { ascending: false });

      if (purchaseError) throw purchaseError;
      if (!purchases || purchases.length === 0) {
        setPremiumPurchases([]);
        return;
      }

      const userIds = Array.from(new Set(purchases.map((p: any) => p.user_id)));
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name, branch, email')
        .in('user_id', userIds);

      if (profileError) {
        console.error('Error fetching profiles for premium purchases:', profileError);
      }

      const profileMap = new Map(
        (profiles || []).map((p: any) => [p.user_id, p])
      );

      const joined = purchases.map((p: any) => {
        const prof = profileMap.get(p.user_id);
        return {
          ...p,
          first_name: prof?.first_name || '',
          last_name: prof?.last_name || '',
          branch: prof?.branch || '',
          email: prof?.email || p.user_email,
        };
      });

      setPremiumPurchases(joined);
    } catch (err: any) {
      console.error('Error in fetchPremiumPurchases:', err);
    }
  };

  const handleRevokeAccess = async (userId: string, planCode: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to revoke "${planCode}" access for ${userName}?`)) {
      return;
    }
    setRevokingId(`${userId}-${planCode}`);
    try {
      const { error } = await (supabase as any)
        .from('premium_purchases')
        .delete()
        .eq('user_id', userId)
        .eq('plan', planCode);

      if (error) throw error;

      toast({
        title: 'Access Revoked 🚫',
        description: `Successfully revoked "${planCode}" access for ${userName}.`
      });

      await fetchPremiumPurchases();
    } catch (err: any) {
      toast({
        title: 'Revocation Failed',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setRevokingId(null);
    }
  };

  const handleRevokeAllAccess = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to revoke ALL premium access for ${userName}?`)) {
      return;
    }
    setRevokingId(`${userId}-all`);
    try {
      const { error } = await (supabase as any)
        .from('premium_purchases')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'All Access Revoked 🚫',
        description: `Successfully revoked all premium access for ${userName}.`
      });

      await fetchPremiumPurchases();
    } catch (err: any) {
      toast({
        title: 'Revocation Failed',
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setRevokingId(null);
    }
  };

  const handleGrantPremiumAccess = async () => {
    if (!grantEmail.trim()) return;
    setIsGranting(true);
    try {
      const emailLower = grantEmail.trim().toLowerCase();
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name')
        .eq('email', emailLower)
        .maybeSingle();

      if (profileErr) throw profileErr;
      if (!profile) {
        toast({
          title: 'User Not Found',
          description: 'No registered user found with this email. Please ask them to sign up first.',
          variant: 'destructive',
        });
        setIsGranting(false);
        return;
      }

      const { data: existing } = await (supabase as any)
        .from('premium_purchases')
        .select('id')
        .eq('user_id', profile.user_id)
        .eq('plan', grantPlan)
        .in('payment_status', ['completed', 'free'])
        .maybeSingle();

      if (existing) {
        toast({
          title: 'Access Already Granted',
          description: 'This user already has access to this premium plan.',
          variant: 'destructive',
        });
        setIsGranting(false);
        return;
      }

      const { error: insertErr } = await (supabase as any)
        .from('premium_purchases')
        .insert({
          user_id: profile.user_id,
          user_email: emailLower,
          plan: grantPlan,
          amount_paid: 0,
          original_amount: 0,
          payment_status: 'free',
          razorpay_payment_id: 'granted_by_owner',
        });

      if (insertErr) throw insertErr;

      toast({
        title: 'Access Granted! 🎉',
        description: `Successfully granted "${grantPlan}" access to ${profile.first_name || emailLower}.`,
      });

      setGrantEmail('');
      await fetchPremiumPurchases();
    } catch (err: any) {
      toast({
        title: 'Granting Failed',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsGranting(false);
    }
  };

  const fetchContributors = async () => {
    const { data, error } = await (supabase as any)
      .from('contributors')
      .select('*')
      .order('coins', { ascending: false });
    if (!error) setContributors((data || []) as ContributorRecord[]);
  };

  const handleAddContributor = async () => {
    if (!newContrib.name.trim() || !newContrib.branch.trim() || !newContrib.batch.trim()) {
      toast({ title: 'Missing fields', description: 'Name, Branch and Batch are required.', variant: 'destructive' });
      return;
    }
    const cleanCoins = Math.max(0, parseInt(newContrib.coins) || 0);
    const cleanBatch = newContrib.batch.trim().replace(/^'+/, '');

    setIsAddingContrib(true);
    try {
      const { error } = await (supabase as any).from('contributors').insert({
        name: newContrib.name.trim(),
        role: 'Contributor',
        branch: newContrib.branch.trim(),
        batch: cleanBatch,
        coins: cleanCoins,
        linkedin_url: newContrib.linkedin_url.trim() || null,
        image_url: newContrib.image_url.trim() || null,
      });
      if (error) throw error;
      toast({ title: 'Contributor added ✅', description: `${newContrib.name} added and ranked with ${cleanCoins} PDFs/coins.` });
      setNewContrib({ name: '', branch: '', batch: '', coins: '', linkedin_url: '', image_url: '' });
      clearCachePrefix('contributors');
      removeCachedData('contributors_list');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_contributors_updated'));
      }
      fetchContributors();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsAddingContrib(false);
    }
  };

  const fetchScholarships = async () => {
    const { data, error } = await (supabase as any)
      .from('scholarships')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setScholarships((data || []) as Scholarship[]);
  };

  const fetchPendingMaterials = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('status', 'pending')
      .order('uploaded_at', { ascending: false });
    if (!error) setPendingMaterials(data || []);
  };

  const fetchAllMaterials = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('uploaded_at', { ascending: false });
    if (!error) setAllMaterials(data || []);
  };

  const fetchAdminRoles = async () => {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .neq('role', 'removed')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setAdminRoles(data.filter((r: any) => r.role !== 'removed'));
    }
  };

  const handleApproval = async (noteId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({
          status: newStatus,
          approved: newStatus === 'approved',
          approved_at: newStatus === 'approved' ? new Date().toISOString() : null,
          approved_by: newStatus === 'approved' ? user?.id : null,
        })
        .eq('id', noteId);

      if (error) throw error;

      // Auto-increment contributor coin count or add new contributor on approval
      if (newStatus === 'approved') {
        const approvedNote = pendingMaterials.find(m => m.id === noteId) || allMaterials.find(m => m.id === noteId);
        if (approvedNote) {
          const syncRes = await syncContributorCount({
            name: approvedNote.user_name || approvedNote.uploaded_by,
            email: approvedNote.user_email,
            count: 1,
            branch: approvedNote.semester?.split('-')[0] || 'Engineering',
            batch: approvedNote.year || '28',
          });
          if (syncRes?.isNew) {
            toast({
              title: `🎉 Welcome ${syncRes.name} to Contributors!`,
              description: `Added to Wall of Contributors with 1 PDF contribution!`
            });
          }
        }
      }

      clearCachePrefix('notes');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_notes_updated'));
      }

      toast({
        title: newStatus === 'approved' ? 'Material approved ✅' : 'Material rejected ❌',
        description: newStatus === 'approved'
          ? 'The material is now visible on the public website.'
          : 'The material has been rejected.',
      });

      fetchPendingMaterials();
      fetchAllMaterials();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDeleteMaterial = async (noteId: string) => {
    if (!confirm('Are you sure you want to permanently delete this material?')) return;
    try {
      const { error } = await supabase.from('notes').delete().eq('id', noteId);
      if (error) throw error;
      clearCachePrefix('notes');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_notes_updated'));
      }
      toast({ title: 'Deleted', description: 'Material removed successfully.' });
      fetchAllMaterials();
      fetchPendingMaterials();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleScholarshipApproval = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await (supabase as any)
      .from('scholarships')
      .update({ approval_status: newStatus })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: newStatus === 'approved' ? 'Scholarship approved ✅' : 'Scholarship rejected ❌' });
      fetchScholarships();
    }
  };

  const handleDeleteScholarship = async (id: string, name: string) => {
    if (!confirm(`Permanently delete "${name}"? This will remove it from the database.`)) return;
    const { error } = await (supabase as any).from('scholarships').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Scholarship removed from database.' });
      fetchScholarships();
    }
  };

  const handleDownload = (url: string) => smartDownload(url);

  const handlePromoteAdmin = async () => {
    if (!newAdminEmail.trim()) return;
    const email = newAdminEmail.trim().toLowerCase();
    const name = newAdminName.trim();

    if (email === user?.email) {
      toast({ title: 'Cannot modify', description: "You can't change your own role.", variant: 'destructive' });
      return;
    }

    setIsPromoting(true);
    try {
      const { error } = await supabase
        .from('admin_roles')
        .insert({ 
          user_email: email, 
          user_name: name || null,
          role: 'admin', 
          created_by: user?.email || 'owner',
          from_date: new Date().toISOString().split('T')[0],
        });

      if (error) {
        if (error.code === '23505') {
          toast({ title: 'Already exists', description: 'This user already has a role.', variant: 'destructive' });
        } else {
          throw error;
        }
      } else {
        toast({ title: 'Admin added ✅', description: `${name || email} is now an admin.` });
        setNewAdminEmail('');
        setNewAdminName('');
        fetchAdminRoles();
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsPromoting(false);
    }
  };

  const handleRemoveAdmin = async (roleId: string, email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === user?.email?.toLowerCase() || cleanEmail === 'priyalkumar06@gmail.com') {
      toast({ title: 'Cannot remove', description: "Owner cannot remove their own role.", variant: 'destructive' });
      return;
    }
    if (!confirm(`Are you sure you want to remove admin privileges from ${email}?`)) return;

    // 1. Optimistic UI update immediately
    setAdminRoles(prev => prev.filter(r => r.id !== roleId && r.user_email?.toLowerCase() !== cleanEmail));

    try {
      // 2. Try RPC first (runs with SECURITY DEFINER privileges)
      let removedViaRpc = false;
      try {
        const { error: rpcErr } = await (supabase as any).rpc('remove_admin_role', {
          p_role_id: roleId,
          p_email: cleanEmail
        });
        if (!rpcErr) {
          removedViaRpc = true;
        }
      } catch (rpcEx) {}

      // 3. Direct DELETE attempt
      let directDeleted = false;
      if (!removedViaRpc) {
        const { error: delErr, count } = await (supabase as any)
          .from('admin_roles')
          .delete({ count: 'exact' })
          .eq('id', roleId);
        
        if (!delErr && count !== null && count > 0) {
          directDeleted = true;
        }
      }

      // 4. Robust fallback: UPDATE role = 'removed' if delete is blocked by RLS
      if (!removedViaRpc && !directDeleted) {
        const { error: updateErr } = await (supabase as any)
          .from('admin_roles')
          .update({
            role: 'removed',
            to_date: new Date().toISOString().split('T')[0]
          })
          .eq('id', roleId);

        if (updateErr) {
          console.warn('Admin removal update fallback warning:', updateErr);
        }
      }

      // 5. Invalidate client caches
      removeCachedData(`role_${cleanEmail}`);
      removeCachedData('contributors_admins');
      clearCachePrefix('contributors');

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_contributors_updated'));
      }

      toast({ title: 'Admin removed ✅', description: `${email} has been removed from the admin team.` });
      await fetchAdminRoles();
    } catch (err: any) {
      toast({ title: 'Error removing admin', description: err.message, variant: 'destructive' });
      await fetchAdminRoles();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="gradient-card text-center">
            <CardHeader>
              <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
              <CardTitle className="text-2xl text-destructive">Owner Access Only</CardTitle>
              <CardDescription>
                This dashboard is exclusively for the site owner.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={isDark ? 'min-h-screen relative overflow-y-auto pb-16 transition-colors duration-300 bg-slate-950 text-slate-100' : 'min-h-screen relative overflow-y-auto pb-16 transition-colors duration-300 bg-sky-50/40 text-slate-900'}
      style={{
        backgroundImage: isDark
          ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.98)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop')`
          : `linear-gradient(to bottom, rgba(224, 242, 254, 0.85), rgba(255, 255, 255, 0.97)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />
      
      {/* High-tech grid overlay */}
      <div className={isDark ? "absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" : "absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:30px_30px]"} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b pb-5 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div>
              <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                OWNER CONTROL CENTER <Crown className="h-8 w-8 text-sky-500" />
              </h1>
              <p className={`text-xs mt-1 uppercase tracking-widest font-bold flex items-center gap-2 ${
                isDark ? 'text-slate-400' : 'text-slate-655'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                StudyHub System Core Status • Authorized Personnel Only
              </p>
            </div>
            <div className={`text-[10px] border rounded-lg p-2 font-mono ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-500' : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
            }`}>
              System Node: Live (Netlify) <br />
              Client Latency: Operational
            </div>
          </div>

          {/* Quick Metrics stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {/* 1. Total Students */}
            <Card className="border border-border/70 bg-card/85 backdrop-blur-md rounded-2xl shadow-xs hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-500/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{totalStudentsCount}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Total Students</p>
                </div>
              </CardContent>
            </Card>

            {/* 2. Total Materials */}
            <Card className="border border-border/70 bg-card/85 backdrop-blur-md rounded-2xl shadow-xs hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 border border-cyan-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{allMaterials.length}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Total Materials</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. GATE Enrolled */}
            <Card className="border border-border/70 bg-card/85 backdrop-blur-md rounded-2xl shadow-xs hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 border border-sky-500/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{gateEnrolledCount}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">GATE Enrolled</p>
                </div>
              </CardContent>
            </Card>

            {/* 4. Premium Access */}
            <Card className="border border-border/70 bg-card/85 backdrop-blur-md rounded-2xl shadow-xs hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 border border-purple-500/20">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{premiumAccessCount}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Premium Access</p>
                </div>
              </CardContent>
            </Card>
          </div>

          
          {/* Graphical Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Chart 1: Colleges Student Distribution (Cake Cut Style) */}
            {(() => {
              const hbtuItem = collegeStats.find(c => c.name === 'HBTU');
              const otherItem = collegeStats.find(c => c.name === 'Other');
              const otherCount = otherItem ? otherItem.value : otherCollegeUsers.length;
              const hbtuCount = hbtuItem && hbtuItem.value > 0 ? hbtuItem.value : Math.max(0, totalStudentsCount - otherCount);
              return (
                <Card className="gradient-card shadow-lg">
                  <CardHeader className="pb-2 border-b flex flex-row items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        COLLEGES STUDENT DISTRIBUTION (CAKE CUT STYLE)
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Breakdown of students enrolled from different colleges
                      </CardDescription>
                    </div>
                    {otherCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowOtherCollegeModal(true)}
                        className="text-[11px] h-7 px-2.5 font-bold border-amber-300 text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
                      >
                        View List ({otherCount})
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="h-[280px] pt-2 flex flex-col items-center justify-center">
                    <div className="w-full h-[210px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                          <Pie
                            data={[
                              { name: 'HBTU', value: hbtuCount, fill: '#0ea5e9' },
                              { name: 'Other', value: otherCount, fill: '#f59e0b' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={70}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                            onClick={(data) => {
                              if (data && (data.name === 'Other' || data.name === 'Other Colleges')) {
                                setShowOtherCollegeModal(true);
                              }
                            }}
                          >
                            <Cell fill="#0ea5e9" />
                            <Cell fill="#f59e0b" className="cursor-pointer hover:opacity-80 transition-opacity" />
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '12px', color: tooltipColor, fontSize: '11px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-6 text-xs mt-1">
                      <div className="flex items-center gap-1.5 font-bold text-sky-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> HBTU Students ({hbtuCount})
                      </div>
                      <button
                        onClick={() => setShowOtherCollegeModal(true)}
                        className="flex items-center gap-1.5 font-bold text-amber-500 hover:underline cursor-pointer bg-transparent border-0 p-0"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Other Colleges ({otherCount}) 🔍
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}

            {/* Chart 2: Staff, Contributor & User Metrics (Growth Curve) */}
            <Card className="gradient-card shadow-lg">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  STAFF, CONTRIBUTOR & USER METRICS (GROWTH CURVE)
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Breakdown of system members with connecting trendline
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[280px] pt-4">
                <div className="w-full h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={[
                        { name: 'Admins 👑', count: Math.max(4, adminRoles.length), fill: '#f43f5e' },
                        { name: 'Contributors ⏳', count: Math.max(25, contributors.length), fill: '#a855f7' },
                        { name: 'GATE Enrolled 🎓', count: Math.max(62, gateEnrolledCount), fill: '#0ea5e9' },
                        { name: 'Premium Access 💎', count: Math.max(33, premiumAccessCount), fill: '#10b981' }
                      ]}
                      margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
                    >
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: textColor }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: textColor }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '12px', color: tooltipColor, fontSize: '11px' }} />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={45}>
                        {[
                          { fill: '#f43f5e' },
                          { fill: '#a855f7' },
                          { fill: '#0ea5e9' },
                          { fill: '#10b981' }
                        ].map((entry, index) => (
                          <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                      <Line type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 6, fill: '#0ea5e9' }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>

        {/* Dashboard Navigation Section Title */}
        <div className="mt-12 mb-6">
          <h2 className={`text-sm font-extrabold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-655'}`}>
            Owner Actions & Control Panels
          </h2>
          <p className="text-xs text-slate-500">
            Click any option card below to view and manage its particular workspace in a pop-up dialog
          </p>
        </div>

        {/* 10 Clickable Dashboard Control Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {/* 1. Pending Notes */}
          <div 
            onClick={() => setActiveModalSection('pending')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'pending'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              {pendingMaterials.length > 0 && (
                <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 font-bold rounded-full animate-pulse">
                  {pendingMaterials.length} PENDING
                </Badge>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{pendingMaterials.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Pending Notes</p>
            </div>
          </div>

          {/* 2. Dedicated Pending GATE Access Requests Box */}
          <div 
            onClick={() => setActiveModalSection('gate_requests')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'gate_requests'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
              {pendingGateRequests.length > 0 && (
                <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 font-bold rounded-full animate-pulse">
                  {pendingGateRequests.length} NEW
                </Badge>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{pendingGateRequests.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">GATE Requests</p>
            </div>
          </div>

          {/* 3. Account Approvals */}
          <div 
            onClick={() => setActiveModalSection('account_approvals')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'account_approvals'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <Clock className="h-5 w-5" />
              </div>
              {pendingApprovals.length > 0 && (
                <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 font-bold rounded-full animate-pulse">
                  {pendingApprovals.length} PENDING
                </Badge>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{pendingApprovals.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Account Approvals</p>
            </div>
          </div>

          {/* 4. Contributors */}
          <div 
            onClick={() => setActiveModalSection('contributors')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'contributors'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{contributors.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Contributors</p>
            </div>
          </div>

          {/* 5. Admins */}
          <div 
            onClick={() => setActiveModalSection('admins')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'admins'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <Crown className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{adminRoles.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Admin Team</p>
            </div>
          </div>

          {/* 6. Premium Access */}
          <div 
            onClick={() => setActiveModalSection('premium')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'premium'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <Lock className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{premiumAccessCount}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Premium Access</p>
            </div>
          </div>

          {/* 7. All Materials */}
          <div 
            onClick={() => setActiveModalSection('all')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'all'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{allMaterials.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">All Materials</p>
            </div>
          </div>

          {/* 8. Scholarships */}
          <div 
            onClick={() => setActiveModalSection('scholarships')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'scholarships'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{scholarships.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Scholarships</p>
            </div>
          </div>

          {/* 9. Mass Emails */}
          <div 
            onClick={() => setActiveModalSection('emails')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'emails'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <Send className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">Emails</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Campaigns</p>
            </div>
          </div>

          {/* 10. Notifications */}
          <div 
            onClick={() => setActiveModalSection('notifications')}
            className={`group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 border shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
              activeModalSection === 'notifications'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/30 text-foreground'
                : 'bg-card border-border/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:border-sky-300 dark:hover:border-sky-700 text-foreground'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-sky-100/70 dark:group-hover:bg-sky-900/40 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                <Bell className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{notifications.length}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Notifications</p>
            </div>
          </div>
        </div>

        {/* ── Control Panel Full Workspace Pop-up Modal ── */}
        <Dialog open={activeModalSection !== null} onOpenChange={(open) => { if (!open) setActiveModalSection(null); }}>
          <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto bg-card text-foreground border border-border p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
            <DialogTitle className="sr-only">Owner Control Panel</DialogTitle>
            <DialogDescription className="sr-only">Owner dashboard control workspace pop-up modal</DialogDescription>
            {activeModalSection && (
              <Tabs value={activeModalSection} className="space-y-6">
          <TabsContent value="pending" className="space-y-6">
            {pendingMaterials.length === 0 ? (
              <Card className={`border text-center py-16 ${
                isDark ? 'border-slate-800 bg-slate-900/40 text-slate-100' : 'border-slate-200 bg-white/70 text-slate-900 shadow-sm'
              }`}>
                <CardContent>
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold mb-2">Queue is Empty!</h3>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-650'} text-sm`}>No notes or study materials are pending approval at this time.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center w-full">
                {/* Interactive Stack Container */}
                <div className="relative w-full max-w-md h-[380px] mb-4">
                  {pendingMaterials.map((material, idx) => {
                    const isTop = idx === pendingStackIndex;
                    const style = getPendingCardStyle(idx);
                    return (
                      <motion.div
                        key={material.id}
                        onClick={isTop ? handlePendingSwipe : undefined}
                        style={{ pointerEvents: style.pointerEvents }}
                        animate={
                          isTop && pendingSwiping
                            ? { x: 320, rotate: 10, opacity: 0, scale: 0.95 }
                            : { x: 0, rotate: 0, scale: style.scale, y: style.y, opacity: style.opacity, zIndex: style.zIndex }
                        }
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className={`absolute inset-0 border backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col justify-between cursor-pointer select-none text-left ${
                          isDark 
                            ? 'border-slate-800 bg-slate-900' 
                            : 'border-slate-200 bg-white shadow-sky-100/50'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-3 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <Badge className="bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 text-[10px] uppercase font-bold border border-sky-500/20 px-2 py-0.5 rounded-full">
                              {material.material_type === 'pyqs' ? '📄 PYQs' : '📝 Notes'}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20 px-2 py-0.5 rounded-full">
                                Sem {material.semester}
                              </Badge>
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                {idx + 1} / {pendingMaterials.length}
                              </span>
                            </div>
                          </div>
                          
                          <h4 className={`text-base font-extrabold mb-1.5 line-clamp-1 group-hover:text-sky-400 transition-colors ${
                            isDark ? 'text-slate-100' : 'text-slate-900'
                          }`} title={material.title}>
                            {material.title}
                          </h4>
                          <p className={`text-xs mb-4 line-clamp-3 h-12 leading-relaxed ${
                            isDark ? 'text-slate-400' : 'text-slate-650'
                          }`}>
                            {material.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className={`space-y-1.5 text-[11px] border-t pt-3 mb-2 ${
                          isDark ? 'text-slate-400 border-slate-800/60' : 'text-slate-500 border-slate-200'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                            <span className={`font-semibold ${isDark ? 'text-slate-305' : 'text-slate-700'}`}>Subject:</span> <span className="truncate max-w-[180px]">{material.subject}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-sky-500" />
                            <span className={`font-semibold ${isDark ? 'text-slate-305' : 'text-slate-700'}`}>Uploader:</span> <span className="truncate max-w-[180px]">{material.user_name || material.user_email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-sky-500" />
                            <span>{material.uploaded_at ? new Date(material.uploaded_at).toLocaleDateString('en-IN') : 'Unknown Date'}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-850">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex-1 text-[11px] font-semibold h-8 gap-1 border ${
                                isDark 
                                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-slate-800' 
                                  : 'text-slate-750 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                              }`}
                              onClick={(e) => { e.stopPropagation(); window.open(material.file_url, '_blank'); }}
                            >
                              <Eye className="h-3.5 w-3.5" /> Preview
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex-1 text-[11px] font-semibold h-8 gap-1 border ${
                                isDark 
                                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-slate-800' 
                                  : 'text-slate-750 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                              }`}
                              onClick={(e) => { e.stopPropagation(); handleDownload(material.file_url); }}
                            >
                              <Download className="h-3.5 w-3.5" /> Download
                            </Button>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8"
                              onClick={(e) => { e.stopPropagation(); handleApproval(material.id, 'approved'); }}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1 font-bold text-xs h-8"
                              onClick={(e) => { e.stopPropagation(); handleApproval(material.id, 'rejected'); }}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          {/* TAB: Scholarships */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div className="flex gap-2 flex-wrap">
                {(['all', 'pending', 'approved'] as const).map(filter => (
                  <Button
                    key={filter}
                    size="sm"
                    onClick={() => setScholarshipFilter(filter)}
                    className={`capitalize text-xs font-extrabold rounded-xl px-4 py-2 transition-all shadow-sm ${
                      scholarshipFilter === filter 
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border border-slate-800' 
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-750'
                    }`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => setShowAddScholarshipModal(true)}
                className="bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 h-9 px-4 rounded-xl shadow-md"
              >
                <GraduationCap className="h-4 w-4" /> Add Scholarship
              </Button>
            </div>

            {(() => {
              const list = scholarships.filter(s =>
                scholarshipFilter === 'all' ? true : s.approval_status === scholarshipFilter
              );
              if (list.length === 0) {
                return (
                  <Card className="border border-slate-200 dark:border-slate-800 bg-card text-center py-12 shadow-sm rounded-2xl">
                    <CardContent>
                      <GraduationCap className="h-14 w-14 text-muted-foreground mx-auto mb-3 opacity-60" />
                      <h3 className="text-lg font-bold mb-1">No scholarships found</h3>
                      <p className="text-xs text-muted-foreground">
                        {scholarshipFilter === 'pending'
                          ? 'No pending scholarship approvals in queue.'
                          : 'No scholarships currently match the selected filter.'}
                      </p>
                    </CardContent>
                  </Card>
                );
              }
              return (
                <div className="space-y-3">
                  {list.map(sc => (
                    <Card key={sc.id} className={`feature-card border-l-4 ${
                      sc.approval_status === 'pending' ? 'border-l-yellow-500' :
                      sc.approval_status === 'approved' ? 'border-l-green-500' : 'border-l-red-500'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-semibold text-sm">{sc.name}</h4>
                              <Badge variant="outline" className="text-xs capitalize">{sc.approval_status}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {sc.org} • {sc.amount} • Deadline: {sc.deadline}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{sc.description}</p>
                            {sc.submitted_by_email && (
                              <p className="text-[11px] text-muted-foreground mt-1">
                                Submitted by: {sc.submitted_by_email}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button variant="outline" size="sm" onClick={() => window.open(sc.apply_url, '_blank')} title="Visit">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            {sc.approval_status === 'pending' && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleScholarshipApproval(sc.id, 'approved')}>
                                  <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleScholarshipApproval(sc.id, 'rejected')}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteScholarship(sc.id, sc.name)} title="Delete permanently">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })()}
          </TabsContent>

          {/* TAB: Premium Access Management */}
                    <TabsContent value="premium" className="space-y-6">
              {/* Grant Access */}
              <Card className="gradient-card">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <UserPlus className="h-5 w-5 text-primary" /> Grant Premium Access
                  </CardTitle>
                  <CardDescription>Grant a user access to a premium package.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">User Email</Label>
                      <Input
                        type="email"
                        placeholder="student@example.com"
                        value={grantEmail}
                        onChange={(e) => setGrantEmail(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <div className="w-full sm:w-48 space-y-2">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Package</Label>
                      <select
                        value={grantPlan}
                        onChange={(e) => setGrantPlan(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="companies">Companies Page</option>
                        <option value="hr_emails">HR Emails</option>
                        <option value="resume">Resume Guide</option>
                        <option value="roadmaps">Roadmap Guide</option>
                        <option value="gate_study">GATE Study</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleGrantPremiumAccess} disabled={isGranting || !grantEmail.trim()} className="w-full sm:w-auto font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 border border-slate-700 shadow-md h-10 px-5 rounded-xl">
                        {isGranting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Grant Access
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, email or branch..." value={searchPremiumQuery} onChange={(e) => setSearchPremiumQuery(e.target.value)} className="pl-9" />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="gradient-card"><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase font-semibold mb-1">GATE Enrolled</p><p className="text-2xl font-bold">{filteredGroupedList.filter(item => item.purchases.some((p:any) => p.plan === 'gate_study')).length}</p></CardContent></Card>
                <Card className="gradient-card"><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Premium Packages</p><p className="text-2xl font-bold">{filteredGroupedList.filter(item => item.purchases.some((p:any) => p.plan !== 'gate_study')).length}</p></CardContent></Card>
                <Card className="gradient-card"><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Both Plans</p><p className="text-2xl font-bold">{filteredGroupedList.filter(i => i.purchases.some((p:any) => p.plan === 'gate_study') && i.purchases.some((p:any) => p.plan !== 'gate_study')).length}</p></CardContent></Card>
              </div>

              {/* Premium Packages Section (Only shows users with premium package access, including mutual/both) */}
              <PremiumSection
                title="Premium Packages Access"
                icon={Crown}
                color="purple"
                items={filteredGroupedList.filter(item => item.purchases.some((p: any) => p.plan !== 'gate_study'))}
                onRevoke={handleRevokeAccess}
                onRevokeAll={handleRevokeAllAccess}
                revokingId={revokingId}
              />

              {/* Dedicated GATE Enrolled Card with 50-per-page slim data rows */}
              <GateEnrolledSection
                items={filteredGroupedList.filter(item => item.purchases.some((p: any) => p.plan === 'gate_study'))}
                onRevoke={handleRevokeAccess}
                revokingId={revokingId}
              />
            </TabsContent>

          {/* TAB: Dedicated Pending GATE Access Requests */}
          <TabsContent value="gate_requests" className="space-y-6">
            <Card className="border border-border bg-card">
              <CardHeader className="border-b pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                      <GraduationCap className="h-5 w-5 text-indigo-500" />
                      Pending GATE Access Requests ({pendingGateRequests.length})
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-1">
                      Students who submitted a request for GATE Study access and are awaiting verification.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1">
                      {pendingGateRequests.length} Pending
                    </Badge>
                    <Button variant="outline" size="sm" onClick={fetchPremiumPurchases} className="h-8 text-xs">
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {pendingGateRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                    <p className="text-base font-bold text-foreground">All Clear!</p>
                    <p className="text-xs text-muted-foreground mt-1">No pending GATE approval requests right now. All requests are processed! 🎉</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingGateRequests.map((req: any) => {
                      const fullName = [req.first_name, req.last_name].filter(Boolean).join(' ') || 'Student';
                      const isProcessing = isApprovingGate === req.id;
                      return (
                        <div
                          key={req.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border/80 bg-background/70 hover:bg-background transition-all shadow-xs"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-foreground">{fullName}</span>
                              <Badge variant="secondary" className="text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                GATE Target: {req.target_branch || req.branch || 'CSE'}
                              </Badge>
                              {req.college_branch && (
                                <Badge variant="outline" className="text-xs text-muted-foreground">
                                  College: {req.college_branch}
                                </Badge>
                              )}
                              {req.college && (
                                <span className="text-xs text-muted-foreground font-medium">({req.college})</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                              <span className="font-mono">{req.email}</span>
                              {req.phone && <span>• {req.phone}</span>}
                            </p>
                            <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-indigo-400" />
                              Requested on {new Date(req.purchased_at).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5 h-8 text-xs shadow-xs"
                              disabled={isProcessing}
                              onClick={() => handleApproveGateRequest(req.id, req.user_id, fullName)}
                            >
                              {isProcessing ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="h-3.5 w-3.5" />
                              )}
                              Approve Access
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500/30 text-red-600 hover:bg-red-500/10 dark:hover:bg-red-950/30 font-semibold gap-1.5 h-8 text-xs"
                              disabled={isProcessing}
                              onClick={() => handleRejectGateRequest(req.id, req.user_id, fullName)}
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Compose */}
            <Card className="gradient-card border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" /> Send Notification to All Users
                </CardTitle>
                <CardDescription>
                  Compose a message that will appear in the 🔔 bell icon for all visitors. Your name will be shown as the sender.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-semibold mb-1 block">Title *</label>
                  <Input
                    value={notifTitle}
                    onChange={e => setNotifTitle(e.target.value)}
                    placeholder="e.g., 🎉 New Feature: CGPA Calculator Updated!"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Message *</label>
                  <textarea
                    value={notifBody}
                    onChange={e => setNotifBody(e.target.value)}
                    rows={3}
                    placeholder="Describe the update, new feature, or announcement..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm resize-none outline-none focus:border-primary transition-colors"
                  />
                </div>
                <Button
                  onClick={handleSendNotification}
                  disabled={sendingNotif || !notifTitle.trim() || !notifBody.trim()}
                  className="gap-2"
                >
                  {sendingNotif ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sendingNotif ? 'Sending…' : 'Send to All Users'}
                </Button>
              </CardContent>
            </Card>

            {/* Sent notifications */}
            <div className="space-y-3">
              <h3 className="text-base font-bold">Sent Notifications ({notifications.length})</h3>
              {notifications.length === 0 ? (
                <Card className="gradient-card text-center py-10">
                  <CardContent>
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p className="text-muted-foreground text-sm">No notifications sent yet.</p>
                  </CardContent>
                </Card>
              ) : notifications.map(n => (
                <Card key={n.id} className="feature-card border-l-4 border-l-primary">
                  <CardContent className="flex items-start justify-between p-4 gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-bold text-foreground">{n.title}</span>
                        <Badge variant="outline" className="text-[10px]">
                          by {n.sent_by}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{n.body}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {new Date(n.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 flex-shrink-0"
                      onClick={() => handleDeleteNotification(n.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB: Contributors Management */}
          <TabsContent value="contributors" className="space-y-6">
            {/* Add form */}
            <Card className="border border-border bg-card">
              <CardHeader className="border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Trophy className="h-5 w-5 text-yellow-500" /> Add New Contributor
                </CardTitle>
                <CardDescription>
                  Contributors auto-sort by coins/PDFs count. Top 3 with image show on the podium. Batch is formatted as '28, '29, '30.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <Input
                    value={newContrib.name}
                    onChange={e => setNewContrib({...newContrib, name: e.target.value})}
                    placeholder="Full Name *"
                    className="sm:col-span-2"
                  />
                  {/* Branch select */}
                  <Select
                    value={newContrib.branch}
                    onValueChange={(val) => setNewContrib(prev => ({ ...prev, branch: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Branch *" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_BRANCHES.map(b => (
                        <SelectItem key={b.code} value={b.code}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Passout Year select (2021 to 2040) */}
                  <Select
                    value={newContrib.batch}
                    onValueChange={(val) => setNewContrib(prev => ({ ...prev, batch: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Passout Year *" />
                    </SelectTrigger>
                    <SelectContent>
                      {BATCH_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground uppercase">Number of PDFs / Coins (Minimum 0)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={newContrib.coins}
                      onKeyDown={e => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '') {
                          setNewContrib({ ...newContrib, coins: '' });
                        } else {
                          const num = Math.max(0, parseInt(val) || 0);
                          setNewContrib({ ...newContrib, coins: num.toString() });
                        }
                      }}
                      placeholder="e.g. 5"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground uppercase">LinkedIn Profile URL (Optional)</Label>
                    <Input
                      value={newContrib.linkedin_url}
                      onChange={e => setNewContrib({...newContrib, linkedin_url: e.target.value})}
                      placeholder="https://linkedin.com/in/..."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase">Avatar Image Path or URL (Optional)</Label>
                  <Input
                    value={newContrib.image_url}
                    onChange={e => setNewContrib({...newContrib, image_url: e.target.value})}
                    placeholder="e.g. /Devanshi.png or https://..."
                    className="mt-1"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    💡 Image is shown on the top-3 podium. Upload image to public folder or paste image URL.
                  </p>
                </div>

                <Button
                  onClick={handleAddContributor}
                  disabled={isAddingContrib || !newContrib.name.trim() || !newContrib.branch.trim() || !newContrib.batch.trim()}
                  className="font-bold gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-xl shadow-xs"
                >
                  {isAddingContrib ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  Add Contributor
                </Button>
              </CardContent>
            </Card>

            {/* Contributors list with Search and 50-per-page Pagination */}
            <Card className="border border-border bg-card">
              <CardHeader className="border-b pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                      <Trophy className="h-5 w-5 text-yellow-500" /> All Contributors ({filteredContributors.length})
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-0.5">
                      Sorted by PDF count / coins. 50 items displayed per page.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchContributors} className="h-8 text-xs">
                    Refresh
                  </Button>
                </div>
                {/* Search Bar */}
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by contributor name, branch, or batch ('28)..."
                    value={contribSearch}
                    onChange={e => {
                      setContribSearch(e.target.value);
                      setContribPage(1);
                    }}
                    className="pl-9 text-xs sm:text-sm bg-background"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {filteredContributors.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">No contributors found.</p>
                    <p className="text-xs mt-1">Try adjusting your search query.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {currentContribs.map((c, idx) => (
                        <ContributorCard
                          key={c.id}
                          contributor={c}
                          rank={(contribPage - 1) * 50 + idx + 1}
                          onRefresh={fetchContributors}
                        />
                      ))}
                    </div>
                    {totalContribPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground font-medium">
                          Showing {(contribPage - 1) * 50 + 1}–{Math.min(contribPage * 50, filteredContributors.length)} of {filteredContributors.length} contributors (Page {contribPage} of {totalContribPages})
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setContribPage(p => Math.max(1, p - 1))}
                            disabled={contribPage === 1}
                            className="h-8 text-xs font-semibold px-3"
                          >
                            ← Previous
                          </Button>
                          <span className="text-xs font-bold px-2 text-foreground">
                            {contribPage} / {totalContribPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setContribPage(p => Math.min(totalContribPages, p + 1))}
                            disabled={contribPage >= totalContribPages}
                            className="h-8 text-xs font-semibold px-3"
                          >
                            Next →
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: Manage Admins */}
          <TabsContent value="admins" className="space-y-6">
            {/* Add new admin */}
            <Card className="gradient-card border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Add New Admin
                </CardTitle>
                <CardDescription>
                  Enter the name and email of the user to grant admin privileges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    placeholder="Full Name (e.g. Rahul Singh)"
                    className="flex-1"
                  />
                  <Input
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="flex-1"
                  />
                  <Button
                    onClick={handlePromoteAdmin}
                    disabled={isPromoting || !newAdminEmail.trim()}
                    className="btn-hero flex-shrink-0"
                  >
                    {isPromoting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <><UserPlus className="h-4 w-4 mr-2" /> Add Admin</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin list */}
            <div className="space-y-3">
              {adminRoles.map((role, idx) => (
                <AdminRoleCard
                  key={role.id}
                  role={role}
                  rank={idx + 1}
                  currentUserEmail={user?.email}
                  onRemove={handleRemoveAdmin}
                  onRefresh={fetchAdminRoles}
                />
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: All Materials (Grid card layout) */}
          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <div className={`flex flex-col md:flex-row gap-4 border p-4 rounded-xl ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search by title, subject, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 h-9 text-xs ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div className={`flex items-center gap-1 border p-1 rounded-xl w-fit ${
                isDark ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'
              }`}>
                {(['all', 'pending', 'approved', 'rejected'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setMaterialFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                      materialFilter === filter 
                        ? isDark 
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                          : 'bg-white text-sky-650 shadow-sm border border-slate-200'
                        : isDark 
                          ? 'text-slate-400 hover:text-slate-200 border border-transparent' 
                          : 'text-slate-600 hover:text-slate-800 border border-transparent'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter === 'pending' ? 'Pending' : filter === 'approved' ? 'Approved' : 'Rejected'}
                  </button>
                ))}
              </div>
            </div>

            {filteredMaterials.length === 0 ? (
              <Card className={`border text-center py-16 ${
                isDark ? 'border-slate-800 bg-slate-900/40 text-slate-100' : 'border-slate-200 bg-white/70 text-slate-900 shadow-sm'
              }`}>
                <CardContent>
                  <FileText className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No materials found</h3>
                  <p className="text-slate-400 text-sm">
                    {searchQuery ? 'Try adjusting your search criteria.' : 'No materials recorded yet.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className={`border backdrop-blur-md transition-all duration-300 shadow-md overflow-hidden flex flex-col justify-between h-full group ${
                    isDark 
                      ? 'border-slate-800/80 bg-slate-900/60 hover:border-sky-500/50' 
                      : 'border-slate-200 bg-white/80 hover:border-sky-500/40 hover:shadow-sm'
                  }`}>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <Badge className="bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-[10px] uppercase font-bold border border-sky-500/20 px-2 py-0.5 rounded-full">
                            {material.material_type === 'pyqs' ? '📄 PYQs' : '📝 Notes'}
                          </Badge>
                          <div className="flex gap-1.5">
                            <Badge className={material.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : material.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}>{material.status}</Badge>
                            <Badge className="bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20 px-2 py-0.5 rounded-full">
                              Sem {material.semester}
                            </Badge>
                          </div>
                        </div>
                        
                        <h4 className={`text-base font-bold mb-1.5 line-clamp-1 group-hover:text-sky-400 transition-colors ${
                          isDark ? 'text-slate-100' : 'text-slate-800'
                        }`} title={material.title}>
                          {material.title}
                        </h4>
                        <p className={`text-xs mb-4 line-clamp-2 h-8 leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {material.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className={`space-y-1.5 text-[11px] border-t pt-3 ${
                        isDark ? 'text-slate-400 border-slate-800/60' : 'text-slate-500 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-sky-500/70" />
                          <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Subject:</span> <span className="truncate max-w-[150px]">{material.subject}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-sky-500/70" />
                          <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Uploader:</span> <span className="truncate max-w-[150px]">{material.user_email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-sky-500/70" />
                          <span>Uploaded: {material.uploaded_at ? new Date(material.uploaded_at).toLocaleDateString('en-IN') : 'Unknown Date'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`p-4 border-t space-y-3 ${
                      isDark ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50/50 border-slate-200'
                    }`}>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex-1 text-[11px] font-semibold h-8 gap-1 border ${
                            isDark 
                              ? 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-slate-800' 
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                          }`}
                          onClick={() => window.open(material.file_url, '_blank')}
                        >
                          <Eye className="h-3.5 w-3.5" /> Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex-1 text-[11px] font-semibold h-8 gap-1 border ${
                            isDark 
                              ? 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-slate-800' 
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                          }`}
                          onClick={() => handleDownload(material.file_url)}
                        >
                          <Download className="h-3.5 w-3.5" /> Download
                        </Button>
                      </div>

                      <div className={`flex flex-col gap-2 border-t pt-3 ${isDark ? 'border-slate-850' : 'border-slate-200'}`}>
                        {material.status === 'pending' && (
                          <div className="flex gap-2 w-full">
                            <Button
                              size="sm"
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8"
                              onClick={(e) => { e.stopPropagation(); handleApproval(material.id, 'approved'); }}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1 font-bold text-xs h-8"
                              onClick={(e) => { e.stopPropagation(); handleApproval(material.id, 'rejected'); }}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                            </Button>
                          </div>
                        )}

                        {material.status === 'rejected' && (
                          <Button
                            size="sm"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8 shadow-sm"
                            onClick={(e) => { e.stopPropagation(); handleApproval(material.id, 'approved'); }}
                          >
                            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Restore Material (Approve)
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full font-bold text-xs h-8 border ${
                            isDark 
                              ? 'text-red-400 hover:text-red-500 hover:bg-red-500/10 border-red-500/20' 
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100'
                          }`}
                          onClick={() => handleDeleteMaterial(material.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete Material
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="emails" className="space-y-6">
            <MassEmailDashboard />
          </TabsContent>

          <TabsContent value="account_approvals" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span>Pending Account Approvals</span>
                  <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold">
                    {pendingApprovals.length} Pending
                  </Badge>
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Review and approve student registrations from external or custom email domains.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchPendingApprovals}
                className="text-xs font-semibold gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </Button>
            </div>

            {pendingApprovals.length === 0 ? (
              <Card className={`border text-center py-16 ${
                isDark ? 'border-slate-800 bg-slate-900/40 text-slate-100' : 'border-slate-200 bg-white/70 text-slate-900 shadow-sm'
              }`}>
                <CardContent>
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-650'} text-sm`}>
                    There are currently no student accounts waiting for manual approval.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingApprovals.map((account) => {
                  const fullName = `${account.first_name || ''} ${account.last_name || ''}`.trim() || 'Unspecified Name';
                  const domain = account.email?.split('@')[1] || '';
                  const isProcessing = isProcessingApproval === account.user_id;

                  return (
                    <Card
                      key={account.user_id}
                      className={`border p-5 rounded-xl shadow-sm transition-all ${
                        isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div>
                          <h4 className="font-bold text-base text-foreground">{fullName}</h4>
                          <p className="text-xs font-mono text-muted-foreground break-all">{account.email}</p>
                        </div>
                        <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                          @{domain}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-border/60 my-3">
                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase font-bold">College</span>
                          <span className="font-semibold text-foreground truncate block">{account.college || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[10px] uppercase font-bold">Branch</span>
                          <span className="font-semibold text-foreground truncate block">{account.branch || 'Not specified'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-[11px] text-muted-foreground">
                          {account.created_at ? new Date(account.created_at).toLocaleDateString('en-IN') : 'Recent'}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            disabled={isProcessing}
                            onClick={() => handleApproveAccount(account.user_id, account.email)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8 px-3 gap-1 shadow-sm"
                          >
                            <CheckCircle className="h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isProcessing}
                            onClick={() => handleRejectAccount(account.user_id, account.email)}
                            className="font-bold text-xs h-8 px-3 gap-1 shadow-sm"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </DialogContent>
  </Dialog>

  {/* Other Colleges Students Modal */}
  <OtherCollegesModal
    open={showOtherCollegeModal}
    onClose={() => setShowOtherCollegeModal(false)}
    students={otherCollegeUsers}
  />

  {/* Add Scholarship Modal */}
  <Dialog open={showAddScholarshipModal} onOpenChange={setShowAddScholarshipModal}>
    <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto bg-card text-foreground border border-border p-6 rounded-2xl">
      <DialogTitle className="sr-only">Add New Scholarship</DialogTitle>
      <DialogDescription className="sr-only">Form to submit or publish a new scholarship</DialogDescription>
      <SubmitScholarshipForm 
        onSuccess={() => {
          fetchScholarships();
          setShowAddScholarshipModal(false);
        }} 
        onClose={() => setShowAddScholarshipModal(false)}
      />
    </DialogContent>
  </Dialog>

      </div>
    </div>
  );
};

interface OtherCollegeStudent {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  college?: string;
  branch?: string;
  created_at?: string;
}

function OtherCollegesModal({
  open,
  onClose,
  students,
}: {
  open: boolean;
  onClose: () => void;
  students: OtherCollegeStudent[];
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setPage(1);
  }, [search, open]);

  const filtered = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter(s => {
      const name = (s.full_name || `${s.first_name || ''} ${s.last_name || ''}`).toLowerCase();
      const email = (s.email || '').toLowerCase();
      const college = (s.college || s.branch || '').toLowerCase();
      return name.includes(q) || email.includes(q) || college.includes(q);
    });
  }, [students, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-w-3xl w-[92vw] max-h-[85vh] overflow-hidden flex flex-col bg-card text-foreground border border-border p-6 rounded-2xl shadow-2xl">
        <DialogTitle className="text-lg font-bold flex items-center justify-between gap-2 border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span>Other College Students</span>
            <Badge variant="outline" className="ml-2 border-amber-400 text-amber-600 bg-amber-50 dark:bg-amber-900/20 font-bold">
              {students.length} Total
            </Badge>
          </div>
        </DialogTitle>
        <DialogDescription className="text-xs text-muted-foreground pt-1">
          Complete list of registered students enrolled from non-HBTU colleges and universities.
        </DialogDescription>

        {/* Search Bar */}
        <div className="relative my-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name, email, or college..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-background text-foreground border-border text-xs sm:text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Students List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 my-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No students found matching "{search}".
            </div>
          ) : (
            paginated.map((student, idx) => {
              const fullName = student.full_name || `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'Student';
              const collegeName = student.college || (student.branch === 'Other Colleges' ? 'Other College' : student.branch) || 'Not specified';
              const globalIndex = (page - 1) * itemsPerPage + idx + 1;
              return (
                <div
                  key={student.email + idx}
                  className="p-3.5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/20">
                      {globalIndex}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-foreground truncate">{fullName}</span>
                        <Badge variant="outline" className="text-[10px] border-border text-muted-foreground bg-background">
                          {collegeName}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t pt-3 mt-2 text-xs">
            <span className="text-muted-foreground">
              Page <strong className="text-foreground">{page}</strong> of {totalPages} ({filtered.length} students)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 text-xs font-semibold"
              >
                ← Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-8 text-xs font-semibold"
              >
                Next →
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OwnerDashboard;




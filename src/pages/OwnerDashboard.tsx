import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ComposedChart, Line } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  CheckCircle, XCircle, User, Calendar, BookOpen, ShieldAlert,
  Eye, Trash2, Crown, UserPlus, UserMinus, Search, Loader2, FileText, Download, GraduationCap, ExternalLink, Bell, Send, Pencil, Trophy, Coins, Link, Lock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/providers/ThemeProvider';
import { smartDownload } from '@/lib/downloadUtils';
import MassEmailDashboard from '@/components/admin/MassEmailDashboard';

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

// ─── ContributorCard — inline edit/delete for each contributor ────────────────
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
  const [editBatch, setEditBatch] = useState(contributor.batch);
  const [editCoins, setEditCoins] = useState(String(contributor.coins));
  const [editLinkedin, setEditLinkedin] = useState(contributor.linkedin_url || '');
  const [editImage, setEditImage] = useState(contributor.image_url || '');

  const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

  const handleSave = async () => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('contributors')
        .update({
          name: editName.trim(),
          branch: editBranch.trim(),
          batch: editBatch.trim(),
          coins: Math.max(0, parseInt(editCoins) || 0),
          linkedin_url: editLinkedin.trim() || null,
          image_url: editImage.trim() || null,
        })
        .eq('id', contributor.id);
      if (error) throw error;
      toast({ title: 'Updated ✅', description: 'Contributor saved.' });
      setEditing(false);
      onRefresh();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remove ${contributor.name} from contributors list?`)) return;
    try {
      const { error } = await (supabase as any).from('contributors').delete().eq('id', contributor.id);
      if (error) throw error;
      toast({ title: 'Removed', description: `${contributor.name} deleted.` });
      onRefresh();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <Card className="feature-card">
      <CardContent className="p-4">
        {editing ? (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Editing: {contributor.name}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Full Name *" className="col-span-2" />
              <Input value={editBranch} onChange={e => setEditBranch(e.target.value)} placeholder="Branch" />
              <Input value={editBatch} onChange={e => setEditBatch(e.target.value)} placeholder="Batch" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" value={editCoins} onChange={e => setEditCoins(e.target.value)} placeholder="Coins" />
              <Input value={editLinkedin} onChange={e => setEditLinkedin(e.target.value)} placeholder="LinkedIn URL (optional)" />
            </div>
            <Input value={editImage} onChange={e => setEditImage(e.target.value)} placeholder="Image path/URL (optional, e.g. /Devanshi.png)" />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving || !editName.trim()}
                style={{ background: 'hsl(var(--primary))' }} className="text-white">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Save Changes'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setEditing(false); setEditName(contributor.name); setEditBranch(contributor.branch); setEditBatch(contributor.batch); setEditCoins(String(contributor.coins)); setEditLinkedin(contributor.linkedin_url || ''); setEditImage(contributor.image_url || ''); }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex-shrink-0">
              {MEDAL[rank] || rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{contributor.name}</span>
                <Badge variant="outline" className="text-xs">{contributor.branch} '{contributor.batch} • HBTU</Badge>
                <Badge className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400">
                  <Coins className="h-3 w-3 mr-1" />{contributor.coins}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <span className="text-xs text-muted-foreground">Rank #{rank}</span>
                {contributor.linkedin_url && (
                  <a href={contributor.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                    <Link className="h-3 w-3" /> LinkedIn
                  </a>
                )}
                {contributor.image_url && <span className="text-xs text-green-600">📷 Image set</span>}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 h-8 px-2" onClick={() => setEditing(true)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 px-2" onClick={handleDelete}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



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
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [sendingNotif, setSendingNotif] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id:string; title:string; body:string; sent_by:string; created_at:string}>>([]);
  const [contributors, setContributors] = useState<ContributorRecord[]>([]);
  const [newContrib, setNewContrib] = useState({ name: '', branch: '', batch: '', coins: '', linkedin_url: '', image_url: '' });
  const [isAddingContrib, setIsAddingContrib] = useState(false);

  const [premiumPurchases, setPremiumPurchases] = useState<any[]>([]);
  const [searchPremiumQuery, setSearchPremiumQuery] = useState('');
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const [grantEmail, setGrantEmail] = useState('');
  const [grantPlan, setGrantPlan] = useState('companies');
  const [isGranting, setIsGranting] = useState(false);

  // Analytics and signup stats
  const [signupStats, setSignupStats] = useState<{ verified: number; failed: number; pending: number; disposableBlocked: number }>({ verified: 0, failed: 0, pending: 0, disposableBlocked: 0 });
  const [campaignStats, setCampaignStats] = useState<{ total: number; sent: number; failed: number }>({ total: 0, sent: 0, failed: 0 });
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);

  // New Dashboard States
  const [collegeStats, setCollegeStats] = useState<{ name: string; value: number }[]>([]);
  const [activeCollegeIndex, setActiveCollegeIndex] = useState<number | null>(null);

  // Card deck stack loop swiping states
  const [pendingStackIndex, setPendingStackIndex] = useState(0);
  const [pendingSwiping, setPendingSwiping] = useState(false);
  const [allStackIndex, setAllStackIndex] = useState(0);
  const [allSwiping, setAllSwiping] = useState(false);

  // Clickable Navigation subpages view state
  const [currentView, setCurrentView] = useState<'pending' | 'scholarships' | 'premium' | 'notifications' | 'contributors' | 'admins' | 'emails' | 'all'>('pending');

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

  const fetchCollegeStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_college_stats');
      if (error) throw error;
      const formatted = (data || []).map((item: any) => ({
        name: item.college_name,
        value: Number(item.student_count)
      }));
      setCollegeStats(formatted);
    } catch (err) {
      console.error('Error fetching college stats:', err);
      // Fallback
      setCollegeStats([
        { name: 'HBTU', value: 1200 },
        { name: 'Other', value: 50 }
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
      fetchSignupStats(),
      fetchCampaignStats(),
      fetchTotalStudents(),
      fetchCollegeStats()
    ]);
    setLoading(false);
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
    setIsAddingContrib(true);
    try {
      const { error } = await (supabase as any).from('contributors').insert({
        name: newContrib.name.trim(),
        branch: newContrib.branch.trim(),
        batch: newContrib.batch.trim(),
        coins: Math.max(0, parseInt(newContrib.coins) || 0),
        linkedin_url: newContrib.linkedin_url.trim() || null,
        image_url: newContrib.image_url.trim() || null,
      });
      if (error) throw error;
      toast({ title: 'Contributor added ✅', description: `${newContrib.name} added and auto-ranked by coins.` });
      setNewContrib({ name: '', branch: '', batch: '', coins: '', linkedin_url: '', image_url: '' });
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
      .order('created_at', { ascending: false });
    if (!error) setAdminRoles(data || []);
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
    if (email === user?.email) {
      toast({ title: 'Cannot remove', description: "You can't remove your own role.", variant: 'destructive' });
      return;
    }
    if (!confirm(`Remove admin privileges from ${email}?`)) return;

    try {
      const { error } = await supabase.from('admin_roles').delete().eq('id', roleId);
      if (error) throw error;
      toast({ title: 'Admin removed', description: `${email} is no longer an admin.` });
      fetchAdminRoles();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
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

  const filteredMaterials = allMaterials.filter(m => {
    const matchesFilter = materialFilter === 'all' || m.status === materialFilter;
    const matchesSearch = !searchQuery || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.user_email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusBadge = (status: string) => {
    const configs: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return <Badge className={configs[status] || ''}>{status}</Badge>;
  };

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

  return (
    <div 
      className={`min-h-screen relative overflow-y-auto pb-16 transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-sky-50/40 text-slate-900'
      }`}
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
      <div className={`absolute inset-0 pointer-events-none opacity-20 ${
        isDark 
          ? "bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)]"
          : "bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)]"
      } bg-[size:30px_30px]`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b pb-5 ${
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
            <Card className={`border shadow-sm transition-all duration-300 backdrop-blur-md ${
              isDark 
                ? 'border-indigo-500/20 bg-slate-900/60 text-slate-100' 
                : 'border-indigo-500/30 bg-white/70 text-slate-900 shadow-sm'
            }`}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-505 shrink-0 border border-indigo-500/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalStudentsCount}</p>
                  <p className="text-[9px] text-indigo-500 uppercase tracking-widest font-bold font-semibold">Total Students</p>
                </div>
              </CardContent>
            </Card>

            {/* 2. Total Materials */}
            <Card className={`border shadow-sm transition-all duration-300 backdrop-blur-md ${
              isDark 
                ? 'border-cyan-500/20 bg-slate-900/60 text-slate-100' 
                : 'border-cyan-500/30 bg-white/70 text-slate-900 shadow-sm'
            }`}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{allMaterials.length}</p>
                  <p className="text-[9px] text-cyan-500 uppercase tracking-widest font-bold font-semibold">Total Materials</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. GATE Enrolled */}
            <Card className={`border shadow-sm transition-all duration-300 backdrop-blur-md ${
              isDark 
                ? 'border-sky-500/20 bg-slate-900/60 text-slate-100' 
                : 'border-sky-500/30 bg-white/70 text-slate-900 shadow-sm'
            }`}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0 border border-sky-500/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{gateEnrolledCount}</p>
                  <p className="text-[9px] text-sky-500 uppercase tracking-widest font-bold font-semibold">GATE Enrolled</p>
                </div>
              </CardContent>
            </Card>

            {/* 4. Premium Access */}
            <Card className={`border shadow-sm transition-all duration-300 backdrop-blur-md ${
              isDark 
                ? 'border-purple-500/20 bg-slate-900/60 text-slate-100' 
                : 'border-purple-500/30 bg-white/70 text-slate-900 shadow-sm'
            }`}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 border border-purple-500/20">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{premiumAccessCount}</p>
                  <p className="text-[9px] text-purple-500 uppercase tracking-widest font-bold font-semibold">Premium Access</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphical Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Chart 1: College Distribution (Cake Cut Style) */}
            <Card className={`border shadow-lg ${
              isDark 
                ? 'border-slate-800 bg-slate-900/60 backdrop-blur-md text-slate-100' 
                : 'border-slate-200 bg-white/70 backdrop-blur-md text-slate-800'
            }`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-650'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Colleges Student Distribution (Cake Cut Style)
                </CardTitle>
                <CardDescription className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Breakdown of students enrolled from different colleges
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                {collegeStats.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">No college data in database.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={collegeStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={75}
                        dataKey="value"
                        activeIndex={activeCollegeIndex !== null ? activeCollegeIndex : undefined}
                        activeShape={{ outerRadius: 85 }}
                        onMouseEnter={(_, index) => setActiveCollegeIndex(index)}
                        onMouseLeave={() => setActiveCollegeIndex(null)}
                      >
                        {collegeStats.map((entry, index) => {
                          const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#a855f7', '#ec4899', '#f43f5e', '#64748b'];
                          return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={isDark ? "#1e293b" : "#ffffff"} strokeWidth={2} />;
                        })}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg, 
                          border: tooltipBorder, 
                          borderRadius: '12px', 
                          color: tooltipColor, 
                          fontSize: '11px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }} 
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '10px', color: textColor, pt: 4 }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Chart 2: Registration & System Staff Users */}
            <Card className={`border shadow-lg ${
              isDark 
                ? 'border-slate-800 bg-slate-900/60 backdrop-blur-md text-slate-100' 
                : 'border-slate-200 bg-white/70 backdrop-blur-md text-slate-800'
            }`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-655'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Staff, Contributor & User Metrics (Growth Curve)
                </CardTitle>
                <CardDescription className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Breakdown of system members with connecting trendline
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart 
                    data={[
                      { name: 'Admins 👑', count: adminRoles.length },
                      { name: 'Contributors 🏆', count: contributors.length },
                      { name: 'GATE Enrolled 🎓', count: gateEnrolledCount },
                      { name: 'Premium Access 💎', count: premiumAccessCount }
                    ]} 
                    margin={{ top: 15, right: 10, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: textColor }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: textColor }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(148, 163, 184, 0.04)' }}
                      contentStyle={{ 
                        backgroundColor: tooltipBg, 
                        border: tooltipBorder, 
                        borderRadius: '12px', 
                        color: tooltipColor, 
                        fontSize: '11px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={45}>
                      {[
                        { color: '#f43f5e' },
                        { color: '#a855f7' },
                        { color: '#0ea5e9' },
                        { color: '#10b981' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Line type="monotone" dataKey="count" stroke={isDark ? "#38bdf8" : "#0284c7"} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Dashboard Navigation Section Title */}
        <div className="mt-12 mb-6">
          <h2 className={`text-sm font-extrabold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-655'}`}>
            Owner Actions & Control Panels
          </h2>
          <p className="text-xs text-slate-500">
            Click any option card below to view and manage its particular workspace
          </p>
        </div>

        {/* 8 Clickable Dashboard Control Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* 1. Pending Queue */}
          <div 
            onClick={() => setCurrentView('pending')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'pending'
                ? isDark 
                  ? 'bg-slate-900 border-amber-500 border-l-amber-500 text-white' 
                  : 'bg-amber-50/50 border-amber-300 border-l-amber-500 text-amber-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-amber-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-amber-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{pendingMaterials.length}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Pending Queue</p>
            </div>
          </div>

          {/* 2. Scholarships */}
          <div 
            onClick={() => setCurrentView('scholarships')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'scholarships'
                ? isDark 
                  ? 'bg-slate-900 border-emerald-500 border-l-emerald-500 text-white' 
                  : 'bg-emerald-50/50 border-emerald-300 border-l-emerald-500 text-emerald-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-emerald-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-emerald-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{scholarships.length}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Scholarships</p>
            </div>
          </div>

          {/* 3. Premium Access */}
          <div 
            onClick={() => setCurrentView('premium')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'premium'
                ? isDark 
                  ? 'bg-slate-900 border-purple-500 border-l-purple-500 text-white' 
                  : 'bg-purple-50/50 border-purple-300 border-l-purple-500 text-purple-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-purple-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-purple-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 border border-purple-500/20">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{premiumAccessCount}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Premium Access</p>
            </div>
          </div>

          {/* 4. Notifications */}
          <div 
            onClick={() => setCurrentView('notifications')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'notifications'
                ? isDark 
                  ? 'bg-slate-900 border-sky-500 border-l-sky-500 text-white' 
                  : 'bg-sky-50/50 border-sky-300 border-l-sky-500 text-sky-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-sky-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-sky-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0 border border-sky-500/20">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{notifications.length}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Notifications</p>
            </div>
          </div>

          {/* 5. Contributors */}
          <div 
            onClick={() => setCurrentView('contributors')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'contributors'
                ? isDark 
                  ? 'bg-slate-900 border-rose-500 border-l-rose-500 text-white' 
                  : 'bg-rose-50/50 border-rose-300 border-l-rose-500 text-rose-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-rose-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-rose-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 border border-rose-500/20">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{contributors.length}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Contributors</p>
            </div>
          </div>

          {/* 6. Admins */}
          <div 
            onClick={() => setCurrentView('admins')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'admins'
                ? isDark 
                  ? 'bg-slate-900 border-indigo-500 border-l-indigo-500 text-white' 
                  : 'bg-indigo-50/50 border-indigo-300 border-l-indigo-500 text-indigo-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-indigo-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-indigo-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-505 shrink-0 border border-indigo-500/20">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{adminRoles.length}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Admins</p>
            </div>
          </div>

          {/* 7. Mass Emails */}
          <div 
            onClick={() => setCurrentView('emails')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'emails'
                ? isDark 
                  ? 'bg-slate-900 border-pink-500 border-l-pink-500 text-white' 
                  : 'bg-pink-50/50 border-pink-300 border-l-pink-500 text-pink-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-pink-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-pink-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 shrink-0 border border-pink-500/20">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">Emails</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">Mass Emails</p>
            </div>
          </div>

          {/* 8. All Materials */}
          <div 
            onClick={() => setCurrentView('all')}
            className={`cursor-pointer border shadow-sm transition-all duration-300 rounded-xl p-4 flex items-center gap-3 border-l-4 hover:scale-[1.02] ${
              currentView === 'all'
                ? isDark 
                  ? 'bg-slate-900 border-cyan-500 border-l-cyan-500 text-white' 
                  : 'bg-cyan-50/50 border-cyan-300 border-l-cyan-500 text-cyan-900'
                : isDark 
                  ? 'border-slate-800 bg-slate-900/60 border-l-cyan-500 text-slate-100 hover:border-slate-700' 
                  : 'border-slate-200 bg-white/70 border-l-cyan-500 text-slate-900 hover:border-slate-350'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{allMaterials.length}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold">All Materials</p>
            </div>
          </div>
        </div>

        <Tabs value={currentView} className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingMaterials.map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`border backdrop-blur-md transition-all duration-300 shadow-md overflow-hidden flex flex-col justify-between h-full group ${
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
                            <Badge className="bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20 px-2 py-0.5 rounded-full">
                              Sem {material.semester} • {material.year} Year
                            </Badge>
                          </div>
                          
                          <h4 className={`text-base font-bold mb-1.5 line-clamp-1 group-hover:text-sky-400 transition-colors ${
                            isDark ? 'text-slate-100' : 'text-slate-805'
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
                            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Uploader:</span> <span className="truncate max-w-[150px]">{material.user_name || material.user_email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-sky-500/70" />
                            <span>{material.uploaded_at ? new Date(material.uploaded_at).toLocaleDateString('en-IN') : 'Unknown Date'}</span>
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

                        <div className={`flex gap-2 border-t pt-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                          <Button
                            size="sm"
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8"
                            onClick={() => handleApproval(material.id, 'approved')}
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1 font-bold text-xs h-8"
                            onClick={() => handleApproval(material.id, 'rejected')}
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB: Scholarships */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex gap-2">
                {(['all', 'pending', 'approved'] as const).map(filter => (
                  <Button
                    key={filter}
                    variant={scholarshipFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setScholarshipFilter(filter)}
                    className="capitalize text-xs font-bold border border-slate-800"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {(() => {
              const list = scholarships.filter(s =>
                scholarshipFilter === 'all' ? true : s.approval_status === scholarshipFilter
              );
              if (list.length === 0) {
                return (
                  <Card className="gradient-card text-center py-12">
                    <CardContent>
                      <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
                      <p className="text-muted-foreground">
                        Admins can submit new scholarships from the Admin Portal.
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
            {/* Grant Premium Access Card */}
            <Card className="gradient-card border border-indigo-100 dark:border-indigo-950 shadow-sm bg-white dark:bg-slate-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <UserPlus className="h-5 w-5" /> Grant Premium Access
                </CardTitle>
                <CardDescription>
                  Enter a registered user's email and select the premium resource package to grant access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
                  <div className="flex-1 w-full space-y-1">
                    <Label htmlFor="grant-email" className="text-xs font-semibold text-gray-500">User Email Address</Label>
                    <Input
                      id="grant-email"
                      value={grantEmail}
                      onChange={(e) => setGrantEmail(e.target.value)}
                      placeholder="user@gmail.com"
                      className="bg-slate-50 dark:bg-slate-800/50"
                    />
                  </div>
                  <div className="flex-1 w-full space-y-1">
                    <Label htmlFor="grant-plan" className="text-xs font-semibold text-gray-500">Premium Package Plan</Label>
                    <select
                      id="grant-plan"
                      value={grantPlan}
                      onChange={(e) => setGrantPlan(e.target.value)}
                      className="w-full rounded-md border border-input bg-slate-50 dark:bg-slate-800/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="companies">Company Career Pages Directory (₹149)</option>
                      <option value="hr_emails">1800+ HR Email Contacts Directory (₹999)</option>
                      <option value="resume">ATS Friendly Resume Guide (₹167)</option>
                      <option value="roadmaps">Fresher Placement Roadmap & Tool Guide (₹549)</option>
                      <option value="gate_study">GATE Prep Section Access (Free/Premium)</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleGrantPremiumAccess}
                    disabled={isGranting || !grantEmail.trim()}
                    className="btn-hero flex-shrink-0 h-10 w-full sm:w-auto"
                  >
                    {isGranting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <><Lock className="h-4 w-4 mr-2" /> Grant Access</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <Lock className="h-5 w-5" />
                      Premium Content Access Manager
                    </CardTitle>
                    <CardDescription>
                      Monitor and manage active student accesses to the premium resources. Revoke access package-wise if needed.
                    </CardDescription>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email or branch..."
                      value={searchPremiumQuery}
                      onChange={(e) => setSearchPremiumQuery(e.target.value)}
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-0 focus-visible:ring-1"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredGroupedList.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <UserMinus className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="font-semibold text-sm">No premium members found.</p>
                    <p className="text-xs">Either no users have purchased, or the search filter didn't match any records.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredGroupedList.map((item: any) => {
                      const fullName = `${item.first_name} ${item.last_name}`.trim() || 'Anonymous User';
                      return (
                        <div
                          key={item.user_id}
                          className="p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* User details */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2.5">
                                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                                  {fullName}
                                </h4>
                                {item.branch && (
                                  <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-800 border-0 text-slate-600 dark:text-slate-400 font-semibold px-2 py-0.5 rounded-lg">
                                    {item.branch}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground font-medium">{item.email}</p>
                            </div>

                            {/* Actions and Packages */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap lg:justify-end">
                              {item.purchases.map((pur: any) => {
                                const isCoupon = pur.payment_status === 'free';
                                const planLabel =
                                  pur.plan === 'companies'
                                    ? 'Companies Page'
                                    : pur.plan === 'hr_emails'
                                    ? 'HR Emails'
                                    : pur.plan === 'resume'
                                    ? 'Resume Guide'
                                    : pur.plan === 'roadmaps'
                                    ? 'Roadmap Guide'
                                    : pur.plan;
                                
                                const planColor =
                                  pur.plan === 'companies'
                                    ? 'border-violet-250 bg-violet-50 text-violet-700 dark:bg-violet-950/20 dark:text-violet-400 dark:border-violet-900/50'
                                    : pur.plan === 'hr_emails'
                                    ? 'border-emerald-250 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50'
                                    : pur.plan === 'roadmaps'
                                    ? 'border-sky-250 bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/50'
                                    : 'border-orange-255 bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/50';

                                return (
                                  <div
                                    key={pur.id}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${planColor} text-xs font-semibold`}
                                  >
                                    <span>{planLabel}</span>
                                    <span className="text-[10px] opacity-75">
                                      ({isCoupon ? `Coupon: ${pur.coupon_used || 'FREE'}` : `₹${pur.amount_paid / 100}`})
                                    </span>
                                    <button
                                      onClick={() => handleRevokeAccess(item.user_id, pur.plan, fullName)}
                                      disabled={revokingId !== null}
                                      className="ml-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 transition-colors p-0.5 hover:bg-red-150 dark:hover:bg-red-950/40 rounded-lg"
                                      title={`Revoke access to ${planLabel}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                );
                              })}

                              {item.purchases.length > 1 && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRevokeAllAccess(item.user_id, fullName)}
                                  disabled={revokingId !== null}
                                  className="h-8 rounded-xl text-xs font-bold px-3 py-1.5 flex items-center gap-1.5"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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
            <Card className="gradient-card border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" /> Add New Contributor
                </CardTitle>
                <CardDescription>
                  Contributors auto-sort by coins. Top 3 with image show on the podium.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Input value={newContrib.name} onChange={e => setNewContrib({...newContrib, name: e.target.value})} placeholder="Full Name *" className="col-span-2" />
                  <Input value={newContrib.branch} onChange={e => setNewContrib({...newContrib, branch: e.target.value})} placeholder="Branch * (e.g. CSE)" />
                  <Input value={newContrib.batch} onChange={e => setNewContrib({...newContrib, batch: e.target.value})} placeholder="Batch * (e.g. 28)" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" value={newContrib.coins} onChange={e => setNewContrib({...newContrib, coins: e.target.value})} placeholder="Coins (notes count)" />
                  <Input value={newContrib.linkedin_url} onChange={e => setNewContrib({...newContrib, linkedin_url: e.target.value})} placeholder="LinkedIn URL (optional)" />
                </div>
                <Input value={newContrib.image_url} onChange={e => setNewContrib({...newContrib, image_url: e.target.value})} placeholder="Image path or URL (optional, e.g. /Devanshi.png or https://...)" />
                <p className="text-xs text-muted-foreground">💡 Image is only shown for top-3 podium. Upload image to /public folder first, then enter path like /Name.png</p>
                <Button
                  onClick={handleAddContributor}
                  disabled={isAddingContrib || !newContrib.name.trim() || !newContrib.branch.trim() || !newContrib.batch.trim()}
                  className="btn-hero gap-2"
                >
                  {isAddingContrib ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  Add Contributor
                </Button>
              </CardContent>
            </Card>

            {/* Contributors list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">All Contributors ({contributors.length}) — sorted by coins</h3>
                <Button variant="outline" size="sm" onClick={fetchContributors}>
                  Refresh
                </Button>
              </div>
              {contributors.length === 0 ? (
                <Card className="gradient-card text-center py-10">
                  <CardContent>
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p className="text-muted-foreground text-sm">No contributors yet. Add the first one above.</p>
                  </CardContent>
                </Card>
              ) : (
                contributors.map((c, idx) => (
                  <ContributorCard key={c.id} contributor={c} rank={idx + 1} onRefresh={fetchContributors} />
                ))
              )}
            </div>
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
                            {statusBadge(material.status)}
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
                              onClick={() => handleApproval(material.id, 'approved')}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1 font-bold text-xs h-8"
                              onClick={() => handleApproval(material.id, 'rejected')}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                            </Button>
                          </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;

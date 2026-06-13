import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle, XCircle, User, Calendar, BookOpen, ShieldAlert,
  Eye, Trash2, Crown, UserPlus, UserMinus, Search, Loader2, FileText, Download, GraduationCap, ExternalLink, Bell, Send, Pencil, Trophy, Coins, Link
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { smartDownload } from '@/lib/downloadUtils';

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

  useEffect(() => {
    if (isOwner) {
      fetchAll();
      fetchNotifications();
    }
  }, [isOwner]);

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

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchPendingMaterials(), fetchAllMaterials(), fetchAdminRoles(), fetchScholarships(), fetchContributors()]);
    setLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Owner Dashboard 👑
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage content approvals, admin roles, and all study materials.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="gradient-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">{pendingMaterials.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card className="gradient-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{allMaterials.filter(m => m.status === 'approved').length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
            <Card className="gradient-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{allMaterials.filter(m => m.status === 'rejected').length}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </CardContent>
            </Card>
            <Card className="gradient-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{adminRoles.length}</p>
                <p className="text-xs text-muted-foreground">Admin Users</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Pending ({pendingMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Scholarships
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="contributors" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Contributors ({contributors.length})
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Admins
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Materials
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Pending Approvals */}
          <TabsContent value="pending" className="space-y-6">
            {pendingMaterials.length === 0 ? (
              <Card className="gradient-card text-center py-12">
                <CardContent>
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No materials pending approval.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingMaterials.map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="feature-card border-l-4 border-l-yellow-500">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="capitalize">
                            {material.material_type === 'pyqs' ? '📄 PYQs' : '📝 Notes'}
                          </Badge>
                          <Badge variant="outline">
                            {material.year} Year • Sem {material.semester}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                        <CardDescription>{material.description || 'No description'}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Subject: {material.subject}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" /> By: {material.user_name} ({material.user_email})
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {material.uploaded_at ? new Date(material.uploaded_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            }) : 'Unknown date'}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-[80px]"
                            onClick={() => window.open(material.file_url, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-[80px]"
                            onClick={() => handleDownload(material.file_url)}
                          >
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(material.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleApproval(material.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB: Scholarships */}
          <TabsContent value="scholarships" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {(['all', 'pending', 'approved'] as const).map(f => (
                <Button
                  key={f}
                  size="sm"
                  variant={scholarshipFilter === f ? 'default' : 'outline'}
                  onClick={() => setScholarshipFilter(f)}
                  className="capitalize"
                >
                  {f} ({f === 'all' ? scholarships.length : scholarships.filter(s => s.approval_status === f).length})
                </Button>
              ))}
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

          {/* TAB 3: All Materials */}
          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, subject, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map(filter => (
                  <Button
                    key={filter}
                    variant={materialFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMaterialFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {filteredMaterials.length === 0 ? (
              <Card className="gradient-card text-center py-12">
                <CardContent>
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No materials found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search.' : 'No materials uploaded yet.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className="feature-card">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium text-sm truncate">{material.title}</span>
                          {statusBadge(material.status)}
                          <Badge variant="outline" className="text-xs capitalize">
                            {material.material_type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {material.subject} • {material.year} Year • Sem {material.semester} • by {material.user_email}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => window.open(material.file_url, '_blank')} title="Preview">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownload(material.file_url)} title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        {material.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproval(material.id, 'approved')}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleApproval(material.id, 'rejected')}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteMaterial(material.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;

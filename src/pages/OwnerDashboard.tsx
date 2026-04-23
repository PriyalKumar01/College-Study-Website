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
  Eye, Trash2, Crown, UserPlus, UserMinus, Search, Loader2, FileText, Download, GraduationCap, ExternalLink
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
  role: string;
  created_at: string | null;
  created_by: string | null;
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

const OwnerDashboard = () => {
  const { user, isOwner, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [pendingMaterials, setPendingMaterials] = useState<Material[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [adminRoles, setAdminRoles] = useState<AdminRole[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isPromoting, setIsPromoting] = useState(false);
  const [materialFilter, setMaterialFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarshipFilter, setScholarshipFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    if (isOwner) {
      fetchAll();
    }
  }, [isOwner]);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchPendingMaterials(), fetchAllMaterials(), fetchAdminRoles(), fetchScholarships()]);
    setLoading(false);
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

    if (email === user?.email) {
      toast({ title: 'Cannot modify', description: "You can't change your own role.", variant: 'destructive' });
      return;
    }

    setIsPromoting(true);
    try {
      const { error } = await supabase
        .from('admin_roles')
        .insert({ user_email: email, role: 'admin', created_by: user?.email || 'owner' });

      if (error) {
        if (error.code === '23505') {
          toast({ title: 'Already exists', description: 'This user already has a role.', variant: 'destructive' });
        } else {
          throw error;
        }
      } else {
        toast({ title: 'Admin added ✅', description: `${email} is now an admin.` });
        setNewAdminEmail('');
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Pending ({pendingMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Scholarships ({scholarships.filter(s => s.approval_status === 'pending').length})
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

          {/* TAB 2: Manage Admins */}
          <TabsContent value="admins" className="space-y-6">
            {/* Promote new admin */}
            <Card className="gradient-card border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Add New Admin
                </CardTitle>
                <CardDescription>
                  Enter the email of a registered user to grant admin privileges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="flex-1"
                  />
                  <Button
                    onClick={handlePromoteAdmin}
                    disabled={isPromoting || !newAdminEmail.trim()}
                    className="btn-hero"
                  >
                    {isPromoting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" /> Add Admin
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin list */}
            <div className="space-y-3">
              {adminRoles.map((role) => (
                <Card key={role.id} className="feature-card">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        role.role === 'owner' 
                          ? 'bg-amber-100 dark:bg-amber-900/30' 
                          : 'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {role.role === 'owner' ? (
                          <Crown className="h-5 w-5 text-amber-600" />
                        ) : (
                          <User className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{role.user_email}</p>
                        <Badge variant="outline" className="text-xs capitalize mt-1">
                          {role.role}
                        </Badge>
                      </div>
                    </div>
                    {role.role !== 'owner' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveAdmin(role.id, role.user_email)}
                      >
                        <UserMinus className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    )}
                  </CardContent>
                </Card>
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

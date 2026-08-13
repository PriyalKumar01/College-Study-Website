import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, ShieldAlert, ShieldCheck, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import UploadMaterialForm from '@/components/admin/UploadMaterialForm';
import MySubmissions from '@/components/admin/MySubmissions';
import SubmitScholarshipForm from '@/components/admin/SubmitScholarshipForm';
import { useTheme } from '@/providers/ThemeProvider';

const AdminPortal = () => {
  const { user, isAdmin, loading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (loading) {
    return (
      <div className={isDark ? 'min-h-screen bg-slate-950 text-slate-100' : 'min-h-screen bg-sky-50/40 text-slate-900'}>
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={isDark ? 'min-h-screen bg-slate-950 text-slate-100' : 'min-h-screen bg-sky-50/40 text-slate-900'}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="gradient-card text-center">
            <CardHeader>
              <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
              <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
              <CardDescription>
                You don't have admin privileges. Only admins and the owner can access the Admin Portal.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 p-6 rounded-2xl border border-border bg-card shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-sm mt-1">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> AUTHORIZED ADMIN CONSOLE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Admin Management Portal
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
                Upload study materials, submit scholarship entries, or manage your active content. All submissions undergo owner review prior to publishing.
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/80 p-1.5 rounded-xl border border-border shadow-sm h-auto">
            <TabsTrigger value="upload" className="flex items-center justify-center gap-2 py-3 font-bold rounded-lg transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
              <Upload className="h-4 w-4" />
              <span>Upload Material</span>
            </TabsTrigger>
            <TabsTrigger value="scholarship" className="flex items-center justify-center gap-2 py-3 font-bold rounded-lg transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
              <GraduationCap className="h-4 w-4" />
              <span>Add Scholarship</span>
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center justify-center gap-2 py-3 font-bold rounded-lg transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
              <FileText className="h-4 w-4" />
              <span>My Submissions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <UploadMaterialForm onUploadSuccess={() => setRefreshTrigger(prev => prev + 1)} />
          </TabsContent>

          <TabsContent value="scholarship">
            <SubmitScholarshipForm onSuccess={() => setRefreshTrigger(prev => prev + 1)} />
          </TabsContent>

          <TabsContent value="submissions">
            <MySubmissions refreshTrigger={refreshTrigger} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;

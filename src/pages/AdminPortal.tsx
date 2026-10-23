import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, ShieldAlert, ShieldCheck, GraduationCap, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
// [rag-build-step 1/2]: feat(admin-portal): add Knowledge Base management tile to Admin Portal
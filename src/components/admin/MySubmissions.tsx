import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText, Calendar, Eye, Clock, BookOpen, AlertCircle } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  subject: string;
  semester: string;
  year: string | null;
  material_type: string;
  status: string;
  file_url: string;
  file_name: string;
  description: string | null;
  uploaded_at: string | null;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
};

interface MySubmissionsProps {
  refreshTrigger?: number;
}

const MySubmissions = ({ refreshTrigger }: MySubmissionsProps) => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('uploaded_by', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user, refreshTrigger]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <Card className="gradient-card text-center py-12">
        <CardContent>
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
          <p className="text-muted-foreground">
            Upload your first study material using the form above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Submissions</h2>
        <Badge variant="secondary">{materials.length} total</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((item, index) => {
          const status = statusConfig[item.status] || statusConfig.pending;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="feature-card h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="capitalize">
                      {item.material_type === 'pyqs' ? '📄 PYQs' : '📝 Notes'}
                    </Badge>
                    <Badge className={status.className}>
                      {status.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {item.subject}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Sem {item.semester}
                    </span>
                    {item.year && (
                      <span className="flex items-center gap-1">
                        📅 {item.year} Year
                      </span>
                    )}
                  </div>
                  {item.uploaded_at && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.uploaded_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => window.open(item.file_url, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview PDF
                  </Button>

                  {item.status === 'rejected' && (
                    <div className="flex items-start gap-2 p-2 rounded bg-red-50 dark:bg-red-900/10 text-xs">
                      <AlertCircle className="h-3 w-3 text-red-500 mt-0.5" />
                      <span className="text-red-600 dark:text-red-400">
                        This submission was rejected. You may upload a revised version.
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MySubmissions;

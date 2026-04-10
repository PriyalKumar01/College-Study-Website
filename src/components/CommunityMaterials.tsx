import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, Users, Sparkles } from 'lucide-react';
import { downloadFile } from '@/lib/downloadUtils';

interface CommunityMaterial {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string;
  material_type: string;
  user_name: string | null;
  uploaded_at: string;
}

interface CommunityMaterialsProps {
  /** The semester key to match, e.g. "CSE-5th Semester" for BTech or "dsa" for non-semester categories */
  semester: string;
  /** The subject name to filter by, e.g. "TOAFL", "DBMS" */
  subject?: string;
  /** Optional class */
  className?: string;
}

/**
 * Fetches and displays approved community-uploaded materials.
 * Place this component inside existing notes pages to inject live approved uploads.
 */
const CommunityMaterials = ({ semester, subject, className = '' }: CommunityMaterialsProps) => {
  const [materials, setMaterials] = useState<CommunityMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      let query = supabase
        .from('notes')
        .select('id, title, description, file_url, file_name, material_type, user_name, uploaded_at')
        .eq('status', 'approved')
        .eq('semester', semester);

      if (subject) {
        query = query.eq('subject', subject);
      }

      query = query.order('uploaded_at', { ascending: false });

      const { data, error } = await query;

      if (!error && data) {
        setMaterials(data as CommunityMaterial[]);
      }
      setLoading(false);
    };

    fetchMaterials();
  }, [semester, subject]);

  if (loading) return null;
  if (materials.length === 0) return null;

  const notes = materials.filter(m => m.material_type === 'notes');
  const pyqs = materials.filter(m => m.material_type === 'pyqs');

  return (
    <div className={`mt-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              Community Contributions
              <Sparkles className="h-4 w-4 text-amber-500" />
            </h3>
            <p className="text-xs text-muted-foreground">
              Approved study materials uploaded by community members
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">
            {materials.length} {materials.length === 1 ? 'Resource' : 'Resources'}
          </Badge>
        </div>

        {/* Notes Section */}
        {notes.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-3.5 w-3.5" />
              Community Notes
            </h4>
            <div className="grid gap-2">
              <AnimatePresence>
                {notes.map((mat, i) => (
                  <MaterialCard key={mat.id} material={mat} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* PYQs Section */}
        {pyqs.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-3.5 w-3.5" />
              Community PYQs
            </h4>
            <div className="grid gap-2">
              <AnimatePresence>
                {pyqs.map((mat, i) => (
                  <MaterialCard key={mat.id} material={mat} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ── Individual material card ──────────────────────────────────────
const MaterialCard = ({ material, index }: { material: CommunityMaterial; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="group hover:shadow-md transition-all duration-200 border-violet-500/10 hover:border-violet-500/30 bg-violet-500/[0.02]">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-violet-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{material.title}</p>
            {material.description && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">{material.description}</p>
            )}
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">
              by {material.user_name || 'Community Member'} • {new Date(material.uploaded_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-violet-600"
              onClick={() => window.open(material.file_url, '_blank')}
              title="Preview"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-emerald-600"
              onClick={() => downloadFile(material.file_url, material.file_name || 'download.pdf')}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityMaterials;

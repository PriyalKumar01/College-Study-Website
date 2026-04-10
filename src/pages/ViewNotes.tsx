import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, User, Calendar, BookOpen, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import NotesCategories from '@/components/NotesCategories';
import { smartDownload } from '@/lib/downloadUtils';

const ViewNotes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from Supabase
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('approved', true)
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: 'Error loading notes',
        description: 'Failed to load notes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const subjects = ['all', 'Complete B.Tech Notes (1st Semester)', 'Complete B.Tech Notes (2nd Semester)', 
    'Complete B.Tech Notes (3rd Semester)', 'Complete B.Tech Notes (4th Semester)',
    'Complete B.Tech Notes (5th Semester)', 'Complete B.Tech Notes (6th Semester)',
    'Complete B.Tech Notes (7th Semester)', 'Complete B.Tech Notes (8th Semester)',
    'BBA Notes', 'DSA in C++', 'DSA in Java', 'GATE Notes', 'JEE Notes', 'Web Development Notes',
    'Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Electronics',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Information Technology', 'Chemical Engineering', 'Biotechnology'];
  const semesters = ['all', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || note.subject === filterSubject;
    const matchesSemester = filterSemester === 'all' || note.semester === filterSemester;
    
    return matchesSearch && matchesSubject && matchesSemester;
  });

  const handleDownload = async (noteId: string, title: string, fileUrl: string) => {
    try {
      // Open the file URL in a new tab
      window.open(fileUrl, '_blank');
      
      toast({
        title: 'Download started',
        description: `Downloading: ${title}`,
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Failed to download the file. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Study Notes Library 📖
          </h1>
          <p className="text-muted-foreground text-lg">
            Access thousands of quality notes shared by students across all branches and semesters.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search notes, subjects, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterSemester} onValueChange={setFilterSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester === 'all' ? 'All Semesters' : `${semester} Semester`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Notes Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <NotesCategories />
        </motion.div>

        {/* Uploaded Notes */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 text-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading notes...</p>
          </motion.div>
        ) : filteredNotes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Recently Uploaded Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="feature-card h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{note.subject}</Badge>
                        <Badge variant="outline">{note.semester} Sem</Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {note.description || 'No description available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>By {note.user_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(note.uploaded_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>File: {note.file_name}</span>
                        </div>
                        <Button
                          onClick={() => handleDownload(note.id, note.title, note.file_url)}
                          className="w-full btn-hero"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const SixthSemesterCSENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 6th Semester CSE on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const subjects = [
    { id: 'ai', name: 'Artificial Intelligence', icon: '🤖', color: 'bg-purple-500', notes: [{ title: 'AI Notes', url: '#' }] },
    { id: 'se', name: 'Software Engineering', icon: '💻', color: 'bg-blue-500', notes: [{ title: 'SE Notes', url: '#' }] },
    { id: 'xyz', name: 'Subject XYZ', icon: '📘', color: 'bg-green-500', notes: [{ title: 'XYZ Notes', url: '#' }] },
  ];

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Button onClick={() => setSelectedSubject(null)} variant="outline" className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
          <h1 className="text-3xl font-bold mb-6">{subject.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subject.notes.map((note, i) => (
              <Card key={i} className="feature-card">
                <CardHeader><CardTitle className="text-lg">{note.title}</CardTitle></CardHeader>
                <CardContent><Button className="w-full" disabled={note.url === '#'}><Download className="h-4 w-4 mr-2" /> Coming Soon</Button></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/btech-notes/third-year/semester-6')} className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">6th Semester CSE/IT Notes</h1>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject, i) => (
            <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="feature-card relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-green-600" onClick={() => handleWhatsAppShare(subject.name)}><Share2 className="h-4 w-4" /></Button>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center text-2xl mb-4`}>{subject.icon}</div>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>{subject.notes.length} Notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-hero" onClick={() => setSelectedSubject(subject.id)}><FileText className="h-4 w-4 mr-2" /> View Notes</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SixthSemesterCSENotes;

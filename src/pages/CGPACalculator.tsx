import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Calculator, Download, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface Subject {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

interface Semester {
  id: string;
  number: number;
  subjects: Subject[];
  sgpa: number;
}

const CGPACalculator = () => {
  const { toast } = useToast();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [currentSemester, setCurrentSemester] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [overallCGPA, setOverallCGPA] = useState(0);

  const addSemester = () => {
    const newSemester: Semester = {
      id: `sem-${currentSemester}`,
      number: currentSemester,
      subjects: [],
      sgpa: 0
    };
    setSemesters(prev => [...prev, newSemester]);
    setCurrentSemester(prev => prev + 1);
  };

  const addSubject = (semesterId: string) => {
    const newSubject: Subject = {
      id: `${semesterId}-subject-${Date.now()}`,
      name: '',
      credits: 0,
      gradePoint: 0
    };

    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId 
        ? { ...sem, subjects: [...sem.subjects, newSubject] }
        : sem
    ));
  };

  const updateSubject = (semesterId: string, subjectId: string, field: keyof Subject, value: string | number) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId 
        ? {
            ...sem,
            subjects: sem.subjects.map(subject =>
              subject.id === subjectId 
                ? { ...subject, [field]: value }
                : subject
            )
          }
        : sem
    ));
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId 
        ? { ...sem, subjects: sem.subjects.filter(subject => subject.id !== subjectId) }
        : sem
    ));
  };

  const removeSemester = (semesterId: string) => {
    setSemesters(prev => prev.filter(sem => sem.id !== semesterId));
  };

  const calculateResults = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    const updatedSemesters = semesters.map(semester => {
      let semesterCredits = 0;
      let semesterGradePoints = 0;

      semester.subjects.forEach(subject => {
        if (subject.credits > 0 && subject.gradePoint >= 0) {
          semesterCredits += subject.credits;
          semesterGradePoints += subject.credits * subject.gradePoint;
          totalCredits += subject.credits;
          totalGradePoints += subject.credits * subject.gradePoint;
        }
      });

      const sgpa = semesterCredits > 0 ? semesterGradePoints / semesterCredits : 0;
      return { ...semester, sgpa: parseFloat(sgpa.toFixed(3)) };
    });

    const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    
    setSemesters(updatedSemesters);
    setOverallCGPA(parseFloat(cgpa.toFixed(3)));
    setShowResults(true);

    toast({
      title: "CGPA Calculated! 🎉",
      description: `Your overall CGPA is ${cgpa.toFixed(3)}`,
    });
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9.0) return 'text-green-600 bg-green-50 border-green-200';
    if (cgpa >= 8.0) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (cgpa >= 7.0) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (cgpa >= 6.0) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getCGPALabel = (cgpa: number) => {
    if (cgpa >= 9.0) return 'Excellent! 🌟';
    if (cgpa >= 8.0) return 'Very Good! 🎯';
    if (cgpa >= 7.0) return 'Good! 👍';
    if (cgpa >= 6.0) return 'Average 📚';
    return 'Need Improvement 💪';
  };

  const downloadResults = () => {
    const results = `
🎓 CGPA Calculator Results
========================

Overall CGPA: ${overallCGPA} (${getCGPALabel(overallCGPA)})

Semester-wise Results:
${semesters.map((sem, index) => `
Semester ${sem.number}:
SGPA: ${sem.sgpa}
Subjects:
${sem.subjects.map(subject => `  • ${subject.name || 'Subject'}: ${subject.credits} credits, GP: ${subject.gradePoint}`).join('\n')}
`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CGPA_Results_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Results Downloaded! 📄",
      description: "Your CGPA results have been saved to your device.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <GraduationCap className="h-8 w-8" />
            CGPA Calculator 🎓
          </h1>
          <p className="text-muted-foreground text-lg">
            Calculate your Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA)
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="gradient-card border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="font-medium">Add Semesters</p>
                    <p className="text-muted-foreground">Click "Add Semester" to create a new semester</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <p className="font-medium">Enter Subject Details</p>
                    <p className="text-muted-foreground">Add subjects with their credits (1-6) and grade points (0-10)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <p className="font-medium">Calculate Results</p>
                    <p className="text-muted-foreground">Click "Calculate CGPA" to see your results</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Semester Button */}
        <div className="mb-6">
          <Button onClick={addSemester} className="btn-hero">
            <Plus className="h-4 w-4 mr-2" />
            Add Semester {currentSemester}
          </Button>
        </div>

        {/* Semesters */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {semesters.map((semester, semIndex) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: semIndex * 0.1, duration: 0.5 }}
            >
              <Card className="feature-card border-2 border-transparent hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {semester.number}
                      </span>
                      Semester {semester.number}
                      {showResults && (
                        <Badge className={`ml-2 ${getCGPAColor(semester.sgpa)}`}>
                          SGPA: {semester.sgpa.toFixed(3)}
                        </Badge>
                      )}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSemester(semester.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {semester.subjects.map((subject, subIndex) => (
                      <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <Label htmlFor={`subject-name-${subject.id}`}>Subject Name</Label>
                          <Input
                            id={`subject-name-${subject.id}`}
                            placeholder="Enter subject name"
                            value={subject.name}
                            onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`credits-${subject.id}`}>Credits</Label>
                          <Input
                            id={`credits-${subject.id}`}
                            type="number"
                            min="1"
                            max="6"
                            step="1"
                            placeholder="Credits"
                            value={subject.credits || ''}
                            onChange={(e) => updateSubject(semester.id, subject.id, 'credits', Math.floor(Number(e.target.value)) || 0)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`grade-point-${subject.id}`}>Grade Point</Label>
                          <Input
                            id={`grade-point-${subject.id}`}
                            type="number"
                            min="0"
                            max="10"
                            step="1"
                            placeholder="0-10"
                            value={subject.gradePoint || ''}
                            onChange={(e) => updateSubject(semester.id, subject.id, 'gradePoint', Math.floor(Number(e.target.value)) || 0)}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubject(semester.id, subject.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => addSubject(semester.id)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Calculate Button */}
        {semesters.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={calculateResults} className="btn-hero">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate CGPA
            </Button>
            {showResults && (
              <Button onClick={downloadResults} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </Button>
            )}
          </div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`gradient-card border-2 ${getCGPAColor(overallCGPA)} shadow-lg`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">🎯 Final CGPA</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">{overallCGPA}</div>
                <Badge className={`text-lg px-4 py-2 ${getCGPAColor(overallCGPA)}`}>
                  {getCGPALabel(overallCGPA)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    Based on {semesters.length} semester{semesters.length !== 1 ? 's' : ''} of academic performance
                  </p>
                  {overallCGPA >= 8.5 && (
                    <p className="text-green-600 font-medium">
                      🎉 Great job! You're eligible for most competitive opportunities!
                    </p>
                  )}
                  {overallCGPA >= 7.0 && overallCGPA < 8.5 && (
                    <p className="text-blue-600 font-medium">
                      👍 Good performance! Keep up the consistent work!
                    </p>
                  )}
                  {overallCGPA < 7.0 && (
                    <p className="text-orange-600 font-medium">
                      💪 Focus on improvement in upcoming semesters!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CGPACalculator;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Calculator, Download, GraduationCap, ArrowLeft, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface Subject {
  id: string;
  name: string;
  credits: number;
  points: number;
  obtainedMarks?: number;
  totalMarks?: number;
}

interface PreviousSemester {
  semester: number;
  sgpa: number;
  totalCredits: number;
  percentage?: number;
}

const COURSES = [
  'BTech',
  'BSc',
  'MBA',
  'BBA',
  'BCA',
  'MCA',
  'MTech',
  'MSc',
  'Other'
];

const DURATIONS = ['2 Years', '3 Years', '4 Years', '5 Years'];
const SCORE_SYSTEMS = ['GPA (0-10)', 'Percentage (0-100)'];

const CGPACalculator = () => {
  const { toast } = useToast();

  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [customCourse, setCustomCourse] = useState('');
  const [duration, setDuration] = useState<string>('');
  const [scoreSystem, setScoreSystem] = useState<string>('');
  const [currentSemester, setCurrentSemester] = useState<number>(0);

  const [previousSemesters, setPreviousSemesters] = useState<PreviousSemester[]>([]);
  const [currentSubjects, setCurrentSubjects] = useState<Subject[]>([]);

  const [showResults, setShowResults] = useState(false);
  const [cgpa, setCgpa] = useState(0);
  const [currentSGPA, setCurrentSGPA] = useState(0);

  const [step, setStep] = useState<'config' | 'entry'>('config');

  const isPercentageSystem = scoreSystem.includes('Percentage');

  const getTotalSemesters = () => {
    const years = parseInt(duration);
    return years * 2;
  };

  const handleStartCalculation = () => {
    if (!selectedCourse || !duration || !scoreSystem || currentSemester === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const prevSems: PreviousSemester[] = [];
    for (let i = 1; i < currentSemester; i++) {
      prevSems.push({ semester: i, sgpa: 0, totalCredits: 0, percentage: 0 });
    }
    setPreviousSemesters(prevSems);
    setCurrentSubjects([]);
    setStep('entry');
  };

  const updatePreviousSemester = (index: number, field: 'sgpa' | 'totalCredits' | 'percentage', value: number) => {
    setPreviousSemesters(prev => prev.map((sem, i) =>
      i === index ? { ...sem, [field]: value } : sem
    ));
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: `subject-${Date.now()}`,
      name: '',
      credits: 0,
      points: 0,
      obtainedMarks: 0,
      totalMarks: 0
    };
    setCurrentSubjects(prev => [...prev, newSubject]);
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setCurrentSubjects(prev => prev.map(sub =>
      sub.id === id ? { ...sub, [field]: value } : sub
    ));
  };

  const removeSubject = (id: string) => {
    setCurrentSubjects(prev => prev.filter(sub => sub.id !== id));
  };

  const calculateResults = () => {
    if (isPercentageSystem) {
      // Percentage System Calculation
      let prevTotalPercentage = 0;
      let prevCount = 0;

      previousSemesters.forEach(sem => {
        if ((sem.percentage || 0) > 0) {
          prevTotalPercentage += sem.percentage || 0;
          prevCount++;
        }
      });

      // Calculate current semester percentage
      let totalObtained = 0;
      let totalMaxMarks = 0;

      currentSubjects.forEach(sub => {
        if ((sub.obtainedMarks || 0) > 0 && (sub.totalMarks || 0) > 0) {
          totalObtained += sub.obtainedMarks || 0;
          totalMaxMarks += sub.totalMarks || 0;
        }
      });

      const currPercentage = totalMaxMarks > 0 ? (totalObtained / totalMaxMarks) * 100 : 0;
      setCurrentSGPA(parseFloat(currPercentage.toFixed(2)));

      // Overall percentage is average of all semesters
      const overallPercentage = prevCount + 1 > 0 ?
        (prevTotalPercentage + currPercentage) / (prevCount + 1) : 0;

      setCgpa(parseFloat(overallPercentage.toFixed(2)));
      setShowResults(true);

      toast({
        title: "Calculation Complete! 🎉",
        description: `Your Overall Percentage is ${overallPercentage.toFixed(2)}%`,
      });
    } else {
      // GPA System Calculation (credit-based)
      let prevTotalCredits = 0;
      let prevTotalPoints = 0;

      previousSemesters.forEach(sem => {
        if (sem.sgpa > 0 && sem.totalCredits > 0) {
          prevTotalCredits += sem.totalCredits;
          prevTotalPoints += sem.sgpa * sem.totalCredits;
        }
      });

      let currCredits = 0;
      let currPoints = 0;

      currentSubjects.forEach(sub => {
        if (sub.credits > 0 && sub.points >= 0) {
          currCredits += sub.credits;
          currPoints += sub.credits * sub.points;
        }
      });

      const currSGPA = currCredits > 0 ? currPoints / currCredits : 0;
      setCurrentSGPA(parseFloat(currSGPA.toFixed(3)));

      const totalCredits = prevTotalCredits + currCredits;
      const totalPoints = prevTotalPoints + currPoints;
      const calculatedCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

      setCgpa(parseFloat(calculatedCGPA.toFixed(3)));
      setShowResults(true);

      toast({
        title: "Calculation Complete! 🎉",
        description: `Your CGPA is ${calculatedCGPA.toFixed(3)}`,
      });
    }
  };

  const getCGPAColor = (value: number) => {
    const maxValue = isPercentageSystem ? 100 : 10;
    const percentage = (value / maxValue) * 100;

    if (percentage >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const downloadResults = () => {
    const courseName = selectedCourse === 'Other' ? customCourse : selectedCourse;
    const unit = isPercentageSystem ? '%' : '';
    let content = `🎓 ${isPercentageSystem ? 'Percentage' : 'CGPA'} Calculator Results\\n`;
    content += `========================\\n\\n`;
    content += `Course: ${courseName}\\n`;
    content += `Duration: ${duration}\\n`;
    content += `Score System: ${scoreSystem}\\n`;
    content += `Current Semester: ${currentSemester}\\n\\n`;
    content += `Overall ${isPercentageSystem ? 'Percentage' : 'CGPA'}: ${cgpa}${unit}\\n`;
    content += `Current Semester ${isPercentageSystem ? 'Percentage' : 'SGPA'}: ${currentSGPA}${unit}\\n\\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${isPercentageSystem ? 'Percentage' : 'CGPA'}_Results_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded! 📄",
      description: "Results saved to your device",
    });
  };

  // Configuration Screen
  if (step === 'config') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold">Professional CGPA Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Calculate Your <span className="text-primary">Academic Score</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your course details to get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Course Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Select Course *</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Choose your course" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {COURSES.map(course => (
                        <SelectItem key={course} value={course} className="text-foreground focus:bg-accent">
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCourse === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <Label className="text-foreground font-medium">Course Name *</Label>
                    <Input
                      placeholder="Enter your course name"
                      value={customCourse}
                      onChange={(e) => setCustomCourse(e.target.value)}
                      className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Course Duration *</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {DURATIONS.map(dur => (
                        <SelectItem key={dur} value={dur} className="text-foreground focus:bg-accent">
                          {dur}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Score System *</Label>
                  <Select value={scoreSystem} onValueChange={setScoreSystem}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Choose scoring system" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {SCORE_SYSTEMS.map(system => (
                        <SelectItem key={system} value={system} className="text-foreground focus:bg-accent">
                          {system}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {duration && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <Label className="text-foreground font-medium">Current Semester *</Label>
                    <Select
                      value={currentSemester.toString()}
                      onValueChange={(val) => setCurrentSemester(parseInt(val))}
                    >
                      <SelectTrigger className="bg-background border-input text-foreground">
                        <SelectValue placeholder="Select current semester" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {Array.from({ length: getTotalSemesters() }, (_, i) => i + 1).map(sem => (
                          <SelectItem key={sem} value={sem.toString()} className="text-foreground focus:bg-accent">
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                <Button
                  onClick={handleStartCalculation}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-lg shadow-lg"
                >
                  Start Calculation
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Data Entry Screen
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => { setStep('config'); setShowResults(false); }}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Change Configuration
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {selectedCourse === 'Other' ? customCourse : selectedCourse} - Semester {currentSemester}
          </h1>
          <p className="text-muted-foreground">
            {scoreSystem} • {duration}
          </p>
        </motion.div>

        {/* Previous Semesters */}
        {previousSemesters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-foreground">📊 Previous Semesters (1 to {currentSemester - 1})</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {isPercentageSystem
                    ? 'Enter percentage for each completed semester'
                    : 'Enter SGPA and total credits for each completed semester'}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previousSemesters.map((sem, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <Label className="text-foreground font-semibold mb-3 block">Semester {sem.semester}</Label>
                      {isPercentageSystem ? (
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1.5 block">Percentage (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="85.50"
                            value={sem.percentage || ''}
                            onChange={(e) => updatePreviousSemester(index, 'percentage', parseFloat(e.target.value) || 0)}
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1.5 block">SGPA</Label>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              step="0.01"
                              placeholder="8.5"
                              value={sem.sgpa || ''}
                              onChange={(e) => updatePreviousSemester(index, 'sgpa', parseFloat(e.target.value) || 0)}
                              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1.5 block">Total Credits</Label>
                            <Input
                              type="number"
                              min="1"
                              max="50"
                              placeholder="24"
                              value={sem.totalCredits || ''}
                              onChange={(e) => updatePreviousSemester(index, 'totalCredits', parseInt(e.target.value) || 0)}
                              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Current Semester */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">📚 Current Semester {currentSemester}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {isPercentageSystem
                  ? 'Add subjects with obtained marks and total marks'
                  : 'Add subjects with credits and grade points'}
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {currentSubjects.map((subject) => (
                <div key={subject.id} className={`grid ${isPercentageSystem ? 'md:grid-cols-4' : 'md:grid-cols-4'} gap-3 p-4 bg-muted/50 rounded-lg border border-border`}>
                  <div>
                    <Label className="text-foreground text-sm mb-1.5 block">Subject Name</Label>
                    <Input
                      placeholder="e.g., Data Structures"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                      className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {isPercentageSystem ? (
                    <>
                      <div>
                        <Label className="text-foreground text-sm mb-1.5 block">Obtained Marks</Label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="85"
                          value={subject.obtainedMarks || ''}
                          onChange={(e) => updateSubject(subject.id, 'obtainedMarks', parseFloat(e.target.value) || 0)}
                          className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground text-sm mb-1.5 block">Total Marks</Label>
                        <Input
                          type="number"
                          min="1"
                          placeholder="100"
                          value={subject.totalMarks || ''}
                          onChange={(e) => updateSubject(subject.id, 'totalMarks', parseFloat(e.target.value) || 0)}
                          className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-foreground text-sm mb-1.5 block">Credits</Label>
                        <Input
                          type="number"
                          min="1"
                          max="6"
                          placeholder="4"
                          value={subject.credits || ''}
                          onChange={(e) => updateSubject(subject.id, 'credits', parseInt(e.target.value) || 0)}
                          className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground text-sm mb-1.5 block">Grade Point</Label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="9"
                          value={subject.points || ''}
                          onChange={(e) => updateSubject(subject.id, 'points', parseFloat(e.target.value) || 0)}
                          className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSubject(subject.id)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addSubject}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button
            onClick={calculateResults}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate {isPercentageSystem ? 'Percentage' : 'CGPA'}
          </Button>
          {showResults && (
            <Button
              onClick={downloadResults}
              variant="outline"
              className="h-12 px-8"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Results
            </Button>
          )}
        </div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="bg-card border-2 border-primary/50 shadow-2xl">
              <CardHeader className="text-center border-b border-border pb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 mx-auto border border-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-primary font-semibold">Your Results</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Current Semester {isPercentageSystem ? 'Percentage' : 'SGPA'}
                    </p>
                    <p className={`text-4xl font-bold ${getCGPAColor(currentSGPA)}`}>
                      {currentSGPA}{isPercentageSystem ? '%' : ''}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground text-sm mb-2">
                      Overall {isPercentageSystem ? 'Percentage' : 'CGPA'}
                    </p>
                    <p className={`text-6xl font-bold ${getCGPAColor(cgpa)}`}>
                      {cgpa}{isPercentageSystem ? '%' : ''}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CGPACalculator;

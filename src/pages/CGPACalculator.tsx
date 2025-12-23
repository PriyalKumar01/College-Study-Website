import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Calculator, Download, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
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

interface PreviousSemesterData {
  semesterNumber: number;
  sgpa: number;
  totalCredits: number;
}

interface CurrentSemesterData {
  semesterNumber: number;
  subjects: Subject[];
}

const CGPACalculator = () => {
  const { toast } = useToast();
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [previousSemesters, setPreviousSemesters] = useState<PreviousSemesterData[]>([]);
  const [currentSemesters, setCurrentSemesters] = useState<CurrentSemesterData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [overallCGPA, setOverallCGPA] = useState(0);
  const [currentSGPAs, setCurrentSGPAs] = useState<number[]>([]);
  
  // For 1st year students - traditional view
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [nextSemesterNumber, setNextSemesterNumber] = useState(1);

  const years = [
    { value: 1, label: '1st Year', semesters: [1, 2], currentSemesters: [1, 2] },
    { value: 2, label: '2nd Year', semesters: [1, 2], currentSemesters: [3, 4] },
    { value: 3, label: '3rd Year', semesters: [1, 2, 3, 4], currentSemesters: [5, 6] },
    { value: 4, label: '4th Year', semesters: [1, 2, 3, 4, 5, 6], currentSemesters: [7, 8] },
  ];

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setShowResults(false);
    
    if (year === 1) {
      // Traditional view for 1st year
      setSemesters([]);
      setNextSemesterNumber(1);
    } else {
      // Quick SGPA input for 2nd, 3rd, 4th year
      const prevSemCount = (year - 1) * 2;
      const prevSems: PreviousSemesterData[] = [];
      for (let i = 1; i <= prevSemCount; i++) {
        prevSems.push({ semesterNumber: i, sgpa: 0, totalCredits: 0 });
      }
      setPreviousSemesters(prevSems);
      
      // Initialize current semesters (both semesters for the year)
      const currentYear = years.find(y => y.value === year);
      const currSems: CurrentSemesterData[] = currentYear?.currentSemesters.map(semNum => ({
        semesterNumber: semNum,
        subjects: []
      })) || [];
      setCurrentSemesters(currSems);
    }
  };

  const updatePreviousSemester = (index: number, field: 'sgpa' | 'totalCredits', value: number) => {
    setPreviousSemesters(prev => prev.map((sem, i) => 
      i === index ? { ...sem, [field]: value } : sem
    ));
  };

  const addCurrentSubject = (semIndex: number) => {
    const newSubject: Subject = {
      id: `current-subject-${Date.now()}-${semIndex}`,
      name: '',
      credits: 0,
      gradePoint: 0
    };
    setCurrentSemesters(prev => prev.map((sem, i) => 
      i === semIndex ? { ...sem, subjects: [...sem.subjects, newSubject] } : sem
    ));
  };

  const updateCurrentSubject = (semIndex: number, subjectId: string, field: keyof Subject, value: string | number) => {
    setCurrentSemesters(prev => prev.map((sem, i) => 
      i === semIndex ? {
        ...sem,
        subjects: sem.subjects.map(subject =>
          subject.id === subjectId ? { ...subject, [field]: value } : subject
        )
      } : sem
    ));
  };

  const removeCurrentSubject = (semIndex: number, subjectId: string) => {
    setCurrentSemesters(prev => prev.map((sem, i) => 
      i === semIndex ? { ...sem, subjects: sem.subjects.filter(subject => subject.id !== subjectId) } : sem
    ));
  };

  // Traditional semester methods for 1st year
  const addSemester = () => {
    const newSemester: Semester = {
      id: `sem-${nextSemesterNumber}`,
      number: nextSemesterNumber,
      subjects: [],
      sgpa: 0
    };
    setSemesters(prev => [...prev, newSemester]);
    setNextSemesterNumber(prev => prev + 1);
  };

  const addSubject = (semesterId: string) => {
    const newSubject: Subject = {
      id: `${semesterId}-subject-${Date.now()}`,
      name: '',
      credits: 0,
      gradePoint: 0
    };
    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId ? { ...sem, subjects: [...sem.subjects, newSubject] } : sem
    ));
  };

  const updateSubject = (semesterId: string, subjectId: string, field: keyof Subject, value: string | number) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId ? {
        ...sem,
        subjects: sem.subjects.map(subject =>
          subject.id === subjectId ? { ...subject, [field]: value } : subject
        )
      } : sem
    ));
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === semesterId ? { ...sem, subjects: sem.subjects.filter(subject => subject.id !== subjectId) } : sem
    ));
  };

  const removeSemester = (semesterId: string) => {
    setSemesters(prev => prev.filter(sem => sem.id !== semesterId));
  };

  const calculateResultsAdvanced = () => {
    // Calculate previous semesters contribution
    let totalPreviousCredits = 0;
    let totalPreviousGradePoints = 0;
    
    previousSemesters.forEach(sem => {
      if (sem.sgpa > 0 && sem.totalCredits > 0) {
        totalPreviousCredits += sem.totalCredits;
        totalPreviousGradePoints += sem.sgpa * sem.totalCredits;
      }
    });

    // Calculate current semesters
    let totalCurrentCredits = 0;
    let totalCurrentGradePoints = 0;
    const sgpas: number[] = [];
    
    currentSemesters.forEach(sem => {
      let semCredits = 0;
      let semGradePoints = 0;
      
      sem.subjects.forEach(subject => {
        if (subject.credits > 0 && subject.gradePoint >= 0) {
          semCredits += subject.credits;
          semGradePoints += subject.credits * subject.gradePoint;
        }
      });
      
      const semSgpa = semCredits > 0 ? semGradePoints / semCredits : 0;
      sgpas.push(parseFloat(semSgpa.toFixed(3)));
      
      totalCurrentCredits += semCredits;
      totalCurrentGradePoints += semGradePoints;
    });

    setCurrentSGPAs(sgpas);

    // Calculate overall CGPA
    const totalCredits = totalPreviousCredits + totalCurrentCredits;
    const totalGradePoints = totalPreviousGradePoints + totalCurrentGradePoints;
    const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    
    setOverallCGPA(parseFloat(cgpa.toFixed(3)));
    setShowResults(true);

    toast({
      title: "CGPA Calculated! 🎉",
      description: `Your overall CGPA is ${cgpa.toFixed(3)}`,
    });
  };

  const calculateResultsTraditional = () => {
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
    let results = `🎓 CGPA Calculator Results\n========================\n\nOverall CGPA: ${overallCGPA} (${getCGPALabel(overallCGPA)})\n`;
    
    if (currentYear && currentYear > 1) {
      results += `\nPrevious Semesters:\n`;
      previousSemesters.forEach(sem => {
        results += `  Semester ${sem.semesterNumber}: SGPA ${sem.sgpa.toFixed(3)}, Credits: ${sem.totalCredits}\n`;
      });
      results += `\nCurrent Semesters:\n`;
      currentSemesters.forEach((sem, index) => {
        results += `  Semester ${sem.semesterNumber}: SGPA ${currentSGPAs[index] || 0}\n`;
      });
    } else {
      results += `\nSemester-wise Results:\n`;
      semesters.forEach(sem => {
        results += `  Semester ${sem.number}: SGPA ${sem.sgpa.toFixed(3)}\n`;
      });
    }
    
    results += `\nGenerated on: ${new Date().toLocaleDateString()}`;

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

  // Year selection screen
  if (currentYear === null) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8" /> CGPA Calculator 🎓
            </h1>
            <p className="text-muted-foreground text-lg">Select your current year to get started</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {years.map((year, index) => (
              <motion.div key={year.value} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className="feature-card cursor-pointer hover:border-primary transition-all" onClick={() => handleYearSelect(year.value)}>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-primary">{year.value}</span>
                    </div>
                    <CardTitle>{year.label}</CardTitle>
                    <CardDescription>Sem {year.currentSemesters[0]} & {year.currentSemesters[1]}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full btn-hero">
                      Select <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Advanced view for 2nd, 3rd, 4th year students
  if (currentYear > 1) {
    const yearData = years.find(y => y.value === currentYear);
    
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Button onClick={() => { setCurrentYear(null); setShowResults(false); }} variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Change Year
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <GraduationCap className="h-7 w-7" /> {yearData?.label} CGPA Calculator
            </h1>
            <p className="text-muted-foreground">Enter your previous semester SGPAs and current semester details</p>
          </motion.div>

          {/* Previous Semesters SGPA Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle>📊 Previous Semesters (1 to {(currentYear - 1) * 2})</CardTitle>
                <CardDescription>Enter SGPA (up to 3 decimal places) and total credits for each completed semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previousSemesters.map((sem, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg">
                      <Label className="font-medium mb-2 block">Semester {sem.semesterNumber}</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">SGPA</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            step="0.001"
                            placeholder="e.g., 8.234"
                            value={sem.sgpa || ''}
                            onChange={(e) => updatePreviousSemester(index, 'sgpa', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Total Credits</Label>
                          <Input
                            type="number"
                            min="1"
                            max="40"
                            placeholder="e.g., 24"
                            value={sem.totalCredits || ''}
                            onChange={(e) => updatePreviousSemester(index, 'totalCredits', parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Semesters - Both semesters for the year */}
          {currentSemesters.map((currentSem, semIndex) => (
            <motion.div key={semIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + semIndex * 0.1 }} className="mb-8">
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle>📚 Semester {currentSem.semesterNumber}</CardTitle>
                  <CardDescription>Enter subject details for semester {currentSem.semesterNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentSem.subjects.map((subject) => (
                      <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <Label>Subject Name</Label>
                          <Input
                            placeholder="Enter subject name"
                            value={subject.name}
                            onChange={(e) => updateCurrentSubject(semIndex, subject.id, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Credits</Label>
                          <Input
                            type="number"
                            min="1"
                            max="6"
                            placeholder="Credits"
                            value={subject.credits || ''}
                            onChange={(e) => updateCurrentSubject(semIndex, subject.id, 'credits', Math.floor(Number(e.target.value)) || 0)}
                          />
                        </div>
                        <div>
                          <Label>Grade Point</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            step="1"
                            placeholder="0-10"
                            value={subject.gradePoint || ''}
                            onChange={(e) => updateCurrentSubject(semIndex, subject.id, 'gradePoint', Math.floor(Number(e.target.value)) || 0)}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" size="sm" onClick={() => removeCurrentSubject(semIndex, subject.id)} className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addCurrentSubject(semIndex)} className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add Subject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={calculateResultsAdvanced} className="btn-hero">
              <Calculator className="h-4 w-4 mr-2" /> Calculate CGPA
            </Button>
            {showResults && (
              <Button onClick={downloadResults} variant="outline">
                <Download className="h-4 w-4 mr-2" /> Download Results
              </Button>
            )}
          </div>

          {/* Results */}
          {showResults && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className={`gradient-card border-2 ${getCGPAColor(overallCGPA)} shadow-lg`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">🎯 Results</CardTitle>
                  <div className="space-y-2">
                    {currentSGPAs.map((sgpa, index) => (
                      <div key={index} className="flex items-center justify-center gap-2">
                        <Badge variant="secondary">Sem {currentSemesters[index]?.semesterNumber} SGPA: {sgpa}</Badge>
                      </div>
                    ))}
                    <p className="text-5xl font-bold mt-4">{overallCGPA}</p>
                    <p className="text-lg">{getCGPALabel(overallCGPA)}</p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Traditional view for 1st year students
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button onClick={() => { setCurrentYear(null); setShowResults(false); }} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Change Year
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <GraduationCap className="h-7 w-7" /> 1st Year CGPA Calculator
          </h1>
          <p className="text-muted-foreground">Add semesters and subjects to calculate your CGPA</p>
        </motion.div>

        {/* Add Semester Button */}
        {semesters.length < 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <Button onClick={addSemester} className="btn-hero">
              <Plus className="h-4 w-4 mr-2" /> Add Semester {nextSemesterNumber}
            </Button>
          </motion.div>
        )}

        {/* Semesters */}
        {semesters.map((semester, semIndex) => (
          <motion.div
            key={semester.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: semIndex * 0.1 }}
            className="mb-6"
          >
            <Card className="feature-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>📚 Semester {semester.number}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSemester(semester.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Add subjects with credits and grade points</CardDescription>
                {showResults && semester.sgpa > 0 && (
                  <Badge className="w-fit mt-2" variant="secondary">
                    SGPA: {semester.sgpa}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {semester.subjects.map((subject) => (
                    <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label>Subject Name</Label>
                        <Input
                          placeholder="Enter subject name"
                          value={subject.name}
                          onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Credits</Label>
                        <Input
                          type="number"
                          min="1"
                          max="6"
                          placeholder="Credits"
                          value={subject.credits || ''}
                          onChange={(e) => updateSubject(semester.id, subject.id, 'credits', Math.floor(Number(e.target.value)) || 0)}
                        />
                      </div>
                      <div>
                        <Label>Grade Point</Label>
                        <Input
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
                  <Button variant="outline" onClick={() => addSubject(semester.id)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Subject
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Calculate Button */}
        {semesters.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={calculateResultsTraditional} className="btn-hero">
              <Calculator className="h-4 w-4 mr-2" /> Calculate CGPA
            </Button>
            {showResults && (
              <Button onClick={downloadResults} variant="outline">
                <Download className="h-4 w-4 mr-2" /> Download Results
              </Button>
            )}
          </div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className={`gradient-card border-2 ${getCGPAColor(overallCGPA)} shadow-lg`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">🎯 Your Results</CardTitle>
                <div className="space-y-2">
                  <p className="text-5xl font-bold">{overallCGPA}</p>
                  <p className="text-lg">{getCGPALabel(overallCGPA)}</p>
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

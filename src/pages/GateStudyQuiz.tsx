import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GATE_QUIZ_DATA, QuizQuestion } from '@/data/gateQuizzesData';
import { GENERAL_APTITUDE_QUIZ_DATA } from '@/data/gateAptitudeQuizzesData';

const ALL_QUIZ_DATA: Record<string, Record<string, QuizQuestion[]>> = {
  ...GATE_QUIZ_DATA,
  "General Aptitude": GENERAL_APTITUDE_QUIZ_DATA
};
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Clock,
  Award,
  ArrowLeft,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  BarChart2,
  AlertTriangle,
  Play,
  Monitor,
  Check,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const GateStudyQuiz = () => {
  const { branch, year } = useParams<{ branch: string; year: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Mode: 'exam' (mock test) or 'practice' (practice quiz)
  const mode = searchParams.get('mode') || 'exam';
  const isExamMode = mode === 'exam';

  // Load questions
  const quizBranch = branch || 'CSE';
  const quizYearKey = decodeURIComponent(year || '');
  const questions: QuizQuestion[] = ALL_QUIZ_DATA[quizBranch]?.[quizYearKey] || [];

  // Active quiz states
  const [examStarted, setExamStarted] = useState(!isExamMode); // Practice mode starts immediately
  const [instructionsAccepted, setInstructionsAccepted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10800); // 3 Hours in seconds
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([0]);
  
  // Screen size state to restrict exam mode on mobile
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Practice mode: track whether the current question has been checked
  const [practiceSelectedOption, setPracticeSelectedOption] = useState<any | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fullscreenCheckRef = useRef<boolean>(false);

  // Detect mobile size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Initialize and Reset
  useEffect(() => {
    if (questions.length === 0) {
      toast({
        title: 'Error Loading Quiz',
        description: `No questions found for ${quizBranch} - ${quizYearKey}.`,
        variant: 'destructive',
      });
      navigate('/gate-study');
      return;
    }

    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview([]);
    setIsSubmitted(false);
    setTimeLeft(10800);
    setVisitedQuestions([0]);
    setPracticeSelectedOption(null);
    fullscreenCheckRef.current = false;

    // Reset started state based on mode
    setExamStarted(!isExamMode);
    setInstructionsAccepted(false);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [branch, year, mode]);

  // Start Timer for Exam Mode
  const startExamTimer = () => {
    if (isMobileScreen) {
      toast({
        title: 'Device Not Supported',
        description: 'Mock tests can only be taken on laptops, desktops, or tablets.',
        variant: 'destructive',
      });
      return;
    }

    setExamStarted(true);
    fullscreenCheckRef.current = true;
    
    // Enter Fullscreen Mode
    enterFullscreen();

    // Setup Interval
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitQuiz(true); // Auto-submit on time expire
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: 'Exam Started!',
      description: 'Your 3-hour timer is ticking. Fullscreen mode is now active.',
    });
  };

  // Fullscreen Management
  const enterFullscreen = () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      }
    } catch (e) {
      console.warn('Failed to enter fullscreen:', e);
    }
  };

  const exitFullscreen = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      }
    } catch (e) {
      console.warn('Failed to exit fullscreen:', e);
    }
  };

  // Monitor Fullscreen Change in Exam Mode
  useEffect(() => {
    if (!isExamMode || !examStarted || isSubmitted) return;

    const handleFullscreenChange = () => {
      if (fullscreenCheckRef.current && !document.fullscreenElement) {
        toast({
          title: 'Fullscreen Exit Detected!',
          description: 'Security policy violation: Exiting fullscreen mode automatically submitted your exam.',
          variant: 'destructive',
          duration: 6000,
        });
        handleSubmitQuiz(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isExamMode, examStarted, isSubmitted]);

  // Visited Tracker & Practice mode load state
  useEffect(() => {
    if (examStarted && !visitedQuestions.includes(currentIndex)) {
      setVisitedQuestions((prev) => [...prev, currentIndex]);
    }
    // Load practice checked state if in practice mode
    if (!isExamMode) {
      const hasAnswer = userAnswers[currentIndex] !== undefined;
      setPracticeSelectedOption(hasAnswer ? true : null);
    }
  }, [currentIndex, examStarted]);

  // Option select handler supporting MSQ checkboxes
  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;

    const activeQuestion = questions[currentIndex];
    const isMSQ = activeQuestion.questionType === 'MSQ';

    if (isMSQ) {
      // Toggle selection for MSQ
      setUserAnswers((prev) => {
        const current = Array.isArray(prev[currentIndex]) ? (prev[currentIndex] as number[]) : [];
        const updated = current.includes(optionIdx)
          ? current.filter((x) => x !== optionIdx)
          : [...current, optionIdx];
        
        if (updated.length === 0) {
          const next = { ...prev };
          delete next[currentIndex];
          return next;
        }
        return { ...prev, [currentIndex]: updated };
      });
    } else {
      // MCQ - Radio style selection
      setUserAnswers((prev) => ({
        ...prev,
        [currentIndex]: optionIdx,
      }));

      // In Practice mode, MCQ reveals immediately
      if (!isExamMode) {
        setPracticeSelectedOption(optionIdx);
      }
    }
  };

  // NAT input change handler
  const handleNatChange = (val: string) => {
    if (isSubmitted) return;
    
    // Only allow digits, dot, and minus sign
    if (/^-?\d*\.?\d*$/.test(val) || val === '') {
      setUserAnswers((prev) => {
        if (val === '') {
          const next = { ...prev };
          delete next[currentIndex];
          return next;
        }
        return { ...prev, [currentIndex]: val };
      });
    }
  };

  const handleClearResponse = () => {
    if (isSubmitted) return;
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentIndex];
      return updated;
    });
    if (!isExamMode) {
      setPracticeSelectedOption(null);
    }
  };

  const handleToggleReview = () => {
    if (isSubmitted) return;
    setMarkedForReview((prev) =>
      prev.includes(currentIndex)
        ? prev.filter((idx) => idx !== currentIndex)
        : [...prev, currentIndex]
    );
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Score Evaluation supporting MSQ and NAT
  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let attemptedCount = 0;

    questions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      if (userAns !== undefined) {
        attemptedCount++;
        const isTwoMarks = q.tag.toLowerCase().includes('2 mark');
        const questionMarks = isTwoMarks ? 2 : 1;

        let isCorrect = false;

        if (q.questionType === 'NAT') {
          const enteredVal = parseFloat(String(userAns));
          const range = q.natRange || [0, 0];
          isCorrect = !isNaN(enteredVal) && enteredVal >= range[0] && enteredVal <= range[1];
        } else if (q.questionType === 'MSQ') {
          // Check if exactly correct list of options is selected (sorting for comparison)
          const selected = Array.isArray(userAns) ? [...userAns].sort().join(',') : '';
          const correct = Array.isArray(q.correctAnswers) ? [...q.correctAnswers].sort().join(',') : '';
          isCorrect = selected === correct;
        } else {
          // MCQ
          isCorrect = userAns === q.correctAnswer;
        }

        if (isCorrect) {
          correctCount++;
          score += questionMarks;
        } else {
          incorrectCount++;
          // Apply negative marks only to MCQs in GATE
          if (q.questionType === 'MCQ') {
            score -= questionMarks / 3;
          }
        }
      }
    });

    return {
      score: parseFloat(score.toFixed(2)),
      correct: correctCount,
      incorrect: incorrectCount,
      attempted: attemptedCount,
      unattempted: questions.length - attemptedCount,
      accuracy: attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0,
    };
  };

  // Helper to check if a specific question evaluates to correct
  const isQuestionCorrect = (q: QuizQuestion, userAns: any) => {
    if (userAns === undefined) return false;
    if (q.questionType === 'NAT') {
      const enteredVal = parseFloat(String(userAns));
      const range = q.natRange || [0, 0];
      return !isNaN(enteredVal) && enteredVal >= range[0] && enteredVal <= range[1];
    } else if (q.questionType === 'MSQ') {
      const selected = Array.isArray(userAns) ? [...userAns].sort().join(',') : '';
      const correct = Array.isArray(q.correctAnswers) ? [...q.correctAnswers].sort().join(',') : '';
      return selected === correct;
    } else {
      return userAns === q.correctAnswer;
    }
  };

  // Submit test and save history
  const handleSubmitQuiz = (force = false) => {
    fullscreenCheckRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Exit Fullscreen Mode
    exitFullscreen();

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Calculate final results
    const results = calculateScore();

    // Save attempt history locally
    const historyStr = localStorage.getItem('gate_attempts_history');
    let history: any[] = [];
    if (historyStr) {
      try {
        history = JSON.parse(historyStr);
      } catch (e) {}
    }

    history.push({
      branch: quizBranch,
      quizKey: quizYearKey,
      score: results.score,
      correct: results.correct,
      incorrect: results.incorrect,
      attempted: results.attempted,
      total: questions.length,
      accuracy: results.accuracy,
      date: new Date().toISOString(),
    });

    localStorage.setItem('gate_attempts_history', JSON.stringify(history));

    toast({
      title: force ? 'Time Expired or Exited!' : 'Exam Submitted!',
      description: 'Your scorecard has been updated and saved to your history.',
    });
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setMarkedForReview([]);
    setVisitedQuestions([0]);
    setIsSubmitted(false);
    setTimeLeft(10800);
    setCurrentIndex(0);
    setPracticeSelectedOption(null);

    if (isExamMode) {
      startExamTimer();
    }
  };

  if (questions.length === 0) return null;

  // Block mobile view for Exam Mode
  if (isExamMode && isMobileScreen) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-6 select-none transition-colors duration-200">
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-sm p-6 space-y-6 shadow-2xl rounded-2xl">
          <div className="mx-auto w-12 h-12 bg-amber-100 dark:bg-amber-955/40 border border-amber-200 dark:border-amber-500/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Monitor className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-md font-bold text-slate-900 dark:text-slate-200">Device Not Supported</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              This GATE Mock Test simulates a real computer-based exam environment and is restricted to **laptops, desktops, or tablets** only. Please log in from a larger screen to start this test.
            </p>
          </div>
          <Button
            onClick={() => navigate('/gate-study')}
            className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:text-slate-900 dark:hover:text-slate-100 text-slate-600 dark:text-slate-355 text-xs font-bold"
          >
            Back to Portal
          </Button>
        </Card>
      </div>
    );
  }

  const activeQuestion = questions[currentIndex];
  const results = calculateScore();

  // Sidebar Dashboard Counts for Exam Mode
  const answeredCount = questions.filter((_, idx) => userAnswers[idx] !== undefined && !markedForReview.includes(idx)).length;
  const markedAndAnsweredCount = questions.filter((_, idx) => userAnswers[idx] !== undefined && markedForReview.includes(idx)).length;
  const markedCount = questions.filter((_, idx) => userAnswers[idx] === undefined && markedForReview.includes(idx)).length;
  const notAnsweredCount = questions.filter((_, idx) => userAnswers[idx] === undefined && !markedForReview.includes(idx) && visitedQuestions.includes(idx)).length;
  const notVisitedCount = questions.length - visitedQuestions.length;

  // Decide if we should hide navigation bars (Hide navbar and footer during active exam before submission)
  const hideNavAndFooter = examStarted && isExamMode && !isSubmitted;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-purple-200 dark:selection:bg-purple-900/50 transition-colors duration-200">
      {!hideNavAndFooter && <Navbar />}

      {/* ── Exam Mode Instructions Screen (Shown before starting exam) ── */}
      {isExamMode && !examStarted && (
        <div className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full flex flex-col justify-center animate-in fade-in duration-300">
          <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
            {/* Header */}
            <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Monitor className="h-5.5 w-5.5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-slate-200">GATE Online Mock Examination</h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {quizBranch} • {quizYearKey} Practice Portal
                </p>
              </div>
            </div>

            {/* General Instructions Panel */}
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-300 uppercase tracking-widest border-b border-slate-200 dark:border-slate-850 pb-2">
                  General Instructions
                </h2>

                <div className="border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 p-5 rounded-xl text-xs text-slate-600 dark:text-slate-400 space-y-3 max-h-80 overflow-y-auto leading-relaxed">
                  <p className="font-bold text-slate-800 dark:text-slate-300">Please read the instructions carefully before starting the exam:</p>
                  
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">1. Clock & Duration:</span> The clock is configured on the server. A countdown timer will display in the top-right header, showing the remaining time (3 hours / 180 minutes) to complete the exam.
                  </p>

                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">2. Fullscreen Lock Security Policy:</span> This exam requires mandatory Fullscreen Mode. Once you click "Start Exam", the screen will lock. Exiting fullscreen mode, changing tabs, or pressing Esc before clicking "Submit Test" will result in **immediate, automatic submission of your exam** as-is.
                  </p>

                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">3. Marking Scheme:</span> Questions are tagged with their respective marks (1 Mark or 2 Marks) and type (MCQ, MSQ, NAT).
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>For 1-Mark Questions: +1 for Correct, -0.33 for Incorrect (Only MCQ).</li>
                      <li>For 2-Mark Questions: +2 for Correct, -0.66 for Incorrect (Only MCQ).</li>
                      <li>MSQs (Multiple Select) and NATs (Numerical Answer Type) carry **no negative marking**.</li>
                      <li>MSQs require selecting all correct options to secure marks; no partial marks are awarded.</li>
                    </ul>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">4. Question Palette Legends:</span> The color-coded numbers on the sidebar indicate the status of each question:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2 py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 shrink-0">1</div>
                      <span>You have not visited the question yet.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-red-600 border border-red-500 text-white shrink-0">2</div>
                      <span>You have visited but not answered the question.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-emerald-600 border border-emerald-500 text-white shrink-0">3</div>
                      <span>You have answered the question.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-amber-50 border border-amber-500 text-white shrink-0">4</div>
                      <span>You have marked the question for review (unanswered).</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-indigo-600 border border-indigo-500 text-white shrink-0">5</div>
                      <span>You have answered the question and also marked it for review.</span>
                    </div>
                  </div>

                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">5. Navigating:</span> Select your option and click **Next** to move forward. You can toggle **Mark for Review** to bookmark a question. Clear your selection using **Clear Response**.
                  </p>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-xl flex items-start gap-3">
                <Checkbox
                  id="examTerms"
                  checked={instructionsAccepted}
                  onCheckedChange={(checked) => setInstructionsAccepted(checked === true)}
                  className="border-slate-350 dark:border-slate-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white mt-0.5 shrink-0"
                />
                <Label htmlFor="examTerms" className="text-xs text-slate-500 dark:text-slate-400 select-none cursor-pointer leading-relaxed">
                  I declare that I have read and understood all the exam rules. I understand that exiting fullscreen mode, switching tabs, or providing suspicious details will terminate my exam immediately.
                </Label>
              </div>

              {/* Start Button */}
              <Button
                onClick={startExamTimer}
                disabled={!instructionsAccepted}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 text-xs shadow-lg shadow-emerald-950/20 tracking-wider uppercase"
              >
                <Play className="h-4 w-4 mr-2" /> Start Exam (Enter Fullscreen)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Active Quiz / Exam view ── */}
      {examStarted && (
        <>
          {/* Header Panel */}
          <div className={`bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-8 sticky ${hideNavAndFooter ? 'top-0' : 'top-0 sm:top-16'} z-45 transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (isSubmitted || !isExamMode) {
                      navigate('/gate-study');
                    } else if (window.confirm('Are you sure you want to exit the exam? Your current progress will be lost.')) {
                      exitFullscreen();
                      navigate('/gate-study');
                    }
                  }}
                  className="p-1.5 rounded-lg border border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
                  title="Exit Test"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                  <h1 className="text-md sm:text-lg font-bold text-slate-850 dark:text-slate-200 leading-tight">
                    {isExamMode ? `${quizYearKey} Mock Test` : `GATE PYQs ${quizBranch} ${quizYearKey} as Quiz`}
                  </h1>
                  <p className="text-[10px] text-purple-650 dark:text-purple-400 font-bold uppercase tracking-wider mt-0.5">
                    {isExamMode ? `${quizBranch} Exam Environment` : 'Practice / Self-Paced Mode'}
                  </p>
                </div>
              </div>

              {!isSubmitted && isExamMode && (
                <div className="flex items-center gap-4">
                  {/* Timer */}
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-sm md:text-base font-bold shadow-inner">
                    <Clock className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400 animate-pulse" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>

                  {/* Submit Quiz Alert Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700 font-bold text-white shadow-md text-xs px-4 h-9">
                        Submit Test
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-200">Submit Practice Test?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                          Are you sure you want to end the test? You have answered {results.attempted} out of {questions.length} questions.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 gap-2">
                        <AlertDialogCancel className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-800 dark:hover:text-slate-100 text-slate-500 dark:text-slate-400 text-xs">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleSubmitQuiz(false)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                        >
                          Submit & View Score
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>

          {/* Main Body Grid */}
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all duration-200 ${hideNavAndFooter ? 'h-[calc(100vh-75px)] py-4 overflow-hidden' : 'py-8 flex-1'}`}>
            {!isSubmitted ? (
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${hideNavAndFooter ? 'h-full items-stretch overflow-hidden' : 'items-start'}`}>
                
                {/* Left Section: Question Card (8 columns) */}
                <div className={`lg:col-span-8 ${hideNavAndFooter ? 'h-full overflow-hidden flex flex-col gap-4' : 'space-y-4'}`}>
                  <Card className={`bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md overflow-hidden rounded-2xl transition-colors duration-200 ${hideNavAndFooter ? 'flex flex-col flex-1' : ''}`}>
                    <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-3 flex justify-between items-center shrink-0">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/30 px-3 py-1 rounded-full">
                        Question {currentIndex + 1} of {questions.length}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded uppercase tracking-wider">
                        {activeQuestion.tag}
                      </span>
                    </div>

                    <CardContent className={`p-6 space-y-6 ${hideNavAndFooter ? 'overflow-y-auto flex-1' : ''}`}>
                      {/* Render Question text as HTML */}
                      <div
                        className="quiz-html text-sm md:text-base leading-relaxed text-slate-800 dark:text-slate-200 select-text overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: activeQuestion.question }}
                      />

                      {/* Choices Rendering (Supports MCQ options / MSQ checkboxes / NAT text input) */}
                      {activeQuestion.questionType !== 'NAT' ? (
                        <div className="grid grid-cols-1 gap-3 pt-2">
                          {activeQuestion.options.map((option, idx) => {
                            const letters = ['A', 'B', 'C', 'D'];
                            const isMSQ = activeQuestion.questionType === 'MSQ';
                            
                            // check if selected
                            const isSelected = isMSQ 
                              ? (Array.isArray(userAnswers[currentIndex]) && (userAnswers[currentIndex] as number[]).includes(idx))
                              : (userAnswers[currentIndex] === idx);

                            let optionStyle = "border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-700 text-slate-900 dark:text-slate-100 font-medium shadow-sm hover:shadow-md";
                            let badgeStyle = isMSQ ? "rounded-md bg-slate-200 dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-750 font-bold" : "rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-350 dark:border-slate-700 font-bold";

                            if (isExamMode) {
                              if (isSelected) {
                                optionStyle = "border-purple-600 bg-purple-50/70 dark:bg-purple-950/30 text-purple-950 dark:text-purple-50 font-bold shadow-md ring-2 ring-purple-500/20";
                                badgeStyle = isMSQ ? "rounded-md bg-purple-600 text-white font-extrabold" : "rounded-full bg-purple-600 text-white font-extrabold";
                              }
                            } else {
                              // Practice Mode: show immediate correctness feedback
                              if (practiceSelectedOption !== null) {
                                const isCorrectOpt = (activeQuestion.correctAnswers || []).includes(idx);
                                if (isCorrectOpt) {
                                  optionStyle = "border-emerald-600 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-50 font-bold shadow-md";
                                  badgeStyle = isMSQ ? "rounded-md bg-emerald-600 text-white font-extrabold" : "rounded-full bg-emerald-600 text-white font-extrabold";
                                } else if (isSelected) {
                                  optionStyle = "border-rose-600 bg-rose-50/95 dark:bg-rose-950/40 text-rose-950 dark:text-rose-50 font-bold shadow-md";
                                  badgeStyle = isMSQ ? "rounded-md bg-rose-600 text-white font-extrabold" : "rounded-full bg-rose-600 text-white font-extrabold";
                                } else {
                                  optionStyle = "border-slate-200 dark:border-slate-850 bg-slate-100/30 dark:bg-slate-950/10 text-slate-400 dark:text-slate-500";
                                  badgeStyle = "rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800";
                                }
                              } else if (isSelected) {
                                optionStyle = "border-purple-600 bg-purple-50/70 dark:bg-purple-950/30 text-purple-950 dark:text-purple-50 font-bold shadow-md";
                                badgeStyle = isMSQ ? "rounded-md bg-purple-600 text-white animate-pulse" : "rounded-full bg-purple-600 text-white";
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={!isExamMode && practiceSelectedOption !== null}
                                className={`flex items-center gap-4 text-left p-4 rounded-xl border transition-all duration-200 group ${optionStyle}`}
                              >
                                <div className={`w-8 h-8 flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}>
                                  {isMSQ && isSelected && practiceSelectedOption === null ? (
                                    <Check className="h-3.5 w-3.5 animate-in zoom-in-50" />
                                  ) : (
                                    letters[idx]
                                  )}
                                </div>
                                <div
                                  className="quiz-html text-sm font-medium flex-1 overflow-x-auto"
                                  dangerouslySetInnerHTML={{ __html: option }}
                                />
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        /* NAT numerical input rendering */
                        <div className="space-y-3 pt-2">
                          <Label htmlFor="natInput" className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">
                            Enter your numeric answer:
                          </Label>
                          <div className="flex gap-3">
                            <Input
                              id="natInput"
                              type="text"
                              placeholder="Type numerical value (e.g. 12, -4.5, 0.25)"
                              value={userAnswers[currentIndex] !== undefined ? String(userAnswers[currentIndex]) : ''}
                              onChange={(e) => handleNatChange(e.target.value)}
                              disabled={isSubmitted || (!isExamMode && practiceSelectedOption !== null)}
                              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-purple-600 h-10 text-sm font-mono max-w-xs focus:border-purple-500"
                            />
                            {!isExamMode && practiceSelectedOption === null && (
                              <Button
                                onClick={() => setPracticeSelectedOption(true)}
                                disabled={userAnswers[currentIndex] === undefined || String(userAnswers[currentIndex]).trim() === ''}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-10 text-xs px-5 rounded-lg"
                              >
                                Check Answer
                              </Button>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500">
                            *Numerical answer evaluations permit a specific range specified in the official key (e.g., fractional decimals or exact integers).
                          </p>
                        </div>
                      )}

                      {/* Practice Mode: Check Answer Button for MSQ */}
                      {!isExamMode && activeQuestion.questionType === 'MSQ' && practiceSelectedOption === null && (
                        <div className="pt-2 flex justify-start">
                          <Button
                            onClick={() => setPracticeSelectedOption(true)}
                            disabled={userAnswers[currentIndex] === undefined}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-9 text-xs px-5 rounded-lg"
                          >
                            Check Selected Answers
                          </Button>
                        </div>
                      )}

                      {/* Practice Mode immediate explanation block */}
                      {!isExamMode && practiceSelectedOption !== null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-inner"
                        >
                          <h4 className={`text-xs font-bold flex items-center gap-1.5 ${isQuestionCorrect(activeQuestion, userAnswers[currentIndex]) ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isQuestionCorrect(activeQuestion, userAnswers[currentIndex]) ? (
                              <>
                                <CheckCircle className="h-4 w-4" /> Correct Answer!
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4" /> Incorrect Answer!
                              </>
                            )}
                          </h4>
                          <div className="space-y-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-900">
                            <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Detailed Explanation</span>
                            <div
                              className="quiz-html text-xs leading-relaxed text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre-line"
                              dangerouslySetInnerHTML={{ __html: activeQuestion.explanation }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Action Buttons Panel */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm shrink-0">
                    <div className="flex gap-2">
                      {isExamMode && (
                        <Button
                          onClick={handleToggleReview}
                          variant="outline"
                          className={`border-slate-200 dark:border-slate-800 h-9 text-xs font-semibold ${
                            markedForReview.includes(currentIndex)
                              ? 'bg-amber-100/50 dark:bg-amber-950/40 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-100/80 dark:hover:bg-amber-950/60 hover:text-amber-700 dark:hover:text-amber-300'
                              : 'bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-100 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5 mr-1.5 animate-in slide-in-from-top-1" />
                          {markedForReview.includes(currentIndex) ? 'Marked for Review' : 'Mark for Review'}
                        </Button>
                      )}

                      <Button
                        onClick={handleClearResponse}
                        variant="ghost"
                        className="h-9 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 font-semibold"
                      >
                        Clear Response
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setCurrentIndex((prev) => Math.max(prev - 1, 0));
                          setPracticeSelectedOption(null);
                        }}
                        disabled={currentIndex === 0}
                        variant="outline"
                        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 h-9 text-xs font-bold"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                      </Button>

                      <Button
                        onClick={() => {
                          setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
                          setPracticeSelectedOption(null);
                        }}
                        disabled={currentIndex === questions.length - 1}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-9 text-xs px-4"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Section: Sidebar Palette & Progress (4 columns) */}
                <div className={`lg:col-span-4 ${hideNavAndFooter ? 'h-full overflow-hidden' : 'space-y-4'}`}>
                  <Card className={`bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md rounded-2xl p-5 ${hideNavAndFooter ? 'flex flex-col h-full overflow-hidden' : 'space-y-5'}`}>
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
                      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-300">Question Navigator</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Attempted: {results.attempted} / {questions.length}</span>
                        {isExamMode && <span className="text-[10px] text-amber-600 dark:text-amber-500 font-medium">Flagged: {markedForReview.length}</span>}
                      </div>
                    </div>

                    {/* Grid Palette */}
                    <div className={`grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2 pr-1 ${hideNavAndFooter ? 'overflow-y-auto flex-1 py-4' : 'max-h-72 overflow-y-auto py-2'}`}>
                      {questions.map((_, idx) => {
                        const isCurrent = currentIndex === idx;
                        const isAnswered = userAnswers[idx] !== undefined;
                        const isMarked = markedForReview.includes(idx);
                        const isVisited = visitedQuestions.includes(idx);

                        let btnStyle = "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100";

                        if (isExamMode) {
                          if (isAnswered && isMarked) {
                            btnStyle = "bg-blue-600 border-blue-500 text-white font-semibold shadow-sm";
                          } else if (isAnswered) {
                            btnStyle = "bg-emerald-600 border-emerald-500 text-white font-semibold shadow-sm";
                          } else if (isMarked) {
                            btnStyle = "bg-amber-500 border-amber-400 text-white font-semibold shadow-sm";
                          } else if (isVisited) {
                            btnStyle = "bg-red-600 border-red-500 text-white font-semibold shadow-sm";
                          }
                        } else {
                          // Practice Mode coloring: green if answered, dark grey if visited
                          if (isAnswered) {
                            btnStyle = "bg-emerald-600 border-emerald-500 text-white font-semibold shadow-sm";
                          } else if (isVisited) {
                            btnStyle = "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300";
                          }
                        }

                        if (isCurrent) {
                          btnStyle += " ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-900";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentIndex(idx);
                              setPracticeSelectedOption(null);
                            }}
                            className={`h-9 w-full rounded-lg text-xs font-bold border transition-all ${btnStyle}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    {/* Color Legends / Counter stats panel (For Exam mode, updates on submit/next dynamically) */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3.5 shrink-0">
                      <h4 className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-extrabold">Question Summary</h4>
                      
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-500 shrink-0" />
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Answered</span>
                          </div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{answeredCount}</span>
                        </div>

                        {isExamMode && (
                          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded bg-blue-600 border border-blue-500 shrink-0" />
                              <span className="text-slate-500 dark:text-slate-400 font-medium">Answered & Marked</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{markedAndAnsweredCount}</span>
                          </div>
                        )}

                        {isExamMode && (
                          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded bg-amber-500 border border-amber-400 shrink-0" />
                              <span className="text-slate-500 dark:text-slate-400 font-medium">Marked for Review</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{markedCount}</span>
                          </div>
                        )}

                        {isExamMode ? (
                          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded bg-red-600 border border-red-500 shrink-0" />
                              <span className="text-slate-500 dark:text-slate-400 font-medium">Not Answered</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{notAnsweredCount}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded bg-slate-300 border border-slate-400 shrink-0" />
                              <span className="text-slate-500 dark:text-slate-400 font-medium">Visited</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{visitedQuestions.length}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 col-span-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0" />
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Not Visited</span>
                          </div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{notVisitedCount}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            ) : (
              /* ── Result & Review Section ── */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 animate-in fade-in duration-300"
              >
                {/* Results Scorecard Card */}
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden rounded-2xl relative transition-colors duration-200">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    {/* Score Dial */}
                    <div className="relative w-40 h-40 shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-full border-2 border-purple-500/20 shadow-inner">
                      <div className="absolute inset-2 bg-gradient-to-tr from-purple-100/50 to-white dark:from-purple-950/40 dark:to-slate-950 rounded-full flex flex-col items-center justify-center text-center">
                        <Award className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-0.5" />
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{results.score}</span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">Marks Obtained</span>
                      </div>
                    </div>

                    {/* Score Details Grid */}
                    <div className="flex-1 space-y-6 w-full">
                      <div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-purple-600 dark:from-slate-100 dark:to-purple-300">
                          Practice Results Evaluated
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Excellent job completing the {quizYearKey} practice exam.</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3.5 text-center">
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Correct</p>
                          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{results.correct} Qs</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3.5 text-center">
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Incorrect</p>
                          <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">{results.incorrect} Qs</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3.5 text-center">
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Attempted</p>
                          <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1">{results.attempted} / {questions.length}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3.5 text-center">
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Accuracy</p>
                          <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">{results.accuracy}%</p>
                        </div>
                      </div>

                      {/* Actions buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={handleRetakeQuiz}
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold tracking-wider uppercase h-9 px-5 rounded-xl shadow-lg"
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Retake Exam
                        </Button>
                        <Button
                          onClick={() => {
                            exitFullscreen();
                            navigate('/gate-study');
                          }}
                          variant="outline"
                          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-100 text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase h-9 px-5 rounded-xl"
                        >
                          Back to Materials
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Detailed Question Review List */}
                <div className="space-y-4">
                  <h3 className="text-base md:text-lg font-bold flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-900 dark:text-slate-100">
                    <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Comprehensive Question-by-Question Review
                  </h3>

                  <div className="space-y-6">
                    {questions.map((q, idx) => {
                      const userAns = userAnswers[idx];
                      const isCorrect = isQuestionCorrect(q, userAns);
                      const letters = ['A', 'B', 'C', 'D'];

                      return (
                        <Card key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden rounded-2xl transition-colors duration-200">
                          {/* Header bar */}
                          <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-5 py-3.5 flex justify-between items-center flex-wrap gap-2">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-300">
                              Question {idx + 1}
                            </span>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                                {q.tag}
                              </span>
                              
                              {userAns === undefined ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                                  <HelpCircle className="h-3.5 w-3.5" /> Unattempted
                                </span>
                              ) : isCorrect ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Correct
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                                  <XCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" /> Incorrect
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Content panel */}
                          <CardContent className="p-5 md:p-6 space-y-6">
                            {/* Question body */}
                            <div
                              className="quiz-html text-sm md:text-base leading-relaxed text-slate-800 dark:text-slate-200 overflow-x-auto"
                              dangerouslySetInnerHTML={{ __html: q.question }}
                            />

                            {/* Options rendering for MCQ/MSQ Review */}
                            {q.questionType !== 'NAT' ? (
                              <div className="grid grid-cols-1 gap-2.5">
                                {q.options.map((option, optIdx) => {
                                  const isMSQ = q.questionType === 'MSQ';
                                  const isUserSelected = isMSQ 
                                    ? (Array.isArray(userAns) && userAns.includes(optIdx))
                                    : (userAns === optIdx);
                                  
                                  const isCorrectOpt = isMSQ 
                                    ? (q.correctAnswers || []).includes(optIdx)
                                    : (q.correctAnswer === optIdx);
                                  
                                  let optStyle = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 opacity-60 text-slate-600 dark:text-slate-400";
                                  let badgeStyle = isMSQ ? "rounded-md bg-slate-100 dark:bg-slate-850 text-slate-500 border border-slate-200 dark:border-slate-700" : "rounded-full bg-slate-100 dark:bg-slate-850 text-slate-500";

                                  if (isCorrectOpt) {
                                    optStyle = "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/15 text-emerald-950 dark:text-emerald-100 shadow-sm opacity-100";
                                    badgeStyle = isMSQ ? "rounded-md bg-emerald-600 text-white font-bold" : "rounded-full bg-emerald-600 text-white font-bold";
                                  } else if (isUserSelected) {
                                    optStyle = "border-red-500/50 bg-red-50/10 dark:bg-red-950/15 text-red-900 dark:text-red-100 shadow-sm opacity-100";
                                    badgeStyle = isMSQ ? "rounded-md bg-red-600 text-white font-bold" : "rounded-full bg-red-600 text-white font-bold";
                                  }

                                  return (
                                    <div
                                      key={optIdx}
                                      className={`flex items-center gap-4 text-left p-3.5 rounded-xl border transition-all ${optStyle}`}
                                    >
                                      <div className={`w-7 h-7 flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}>
                                        {isMSQ && isCorrectOpt ? <Check className="h-3.5 w-3.5" /> : letters[optIdx]}
                                      </div>
                                      <div
                                        className="quiz-html text-sm font-medium flex-1 overflow-x-auto"
                                        dangerouslySetInnerHTML={{ __html: option }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              /* NAT Numerical value Review */
                              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                                <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2">
                                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Your Numeric Answer:</span>
                                  <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {userAns !== undefined ? userAns : 'Unattempted'}
                                  </span>
                                </div>
                                <div className="flex justify-between pt-1">
                                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Accepted Range / Value:</span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                                    {q.natRange && q.natRange[0] === q.natRange[1] ? q.natRange[0] : `${q.natRange?.[0]} to ${q.natRange?.[1]}`}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Answers and Explanation */}
                            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-5 space-y-3">
                              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-850 pb-1.5">
                                Answer & Detailed Explanation
                              </h4>
                              <div
                                className="quiz-html text-xs leading-relaxed text-slate-700 dark:text-slate-300 overflow-x-auto"
                                dangerouslySetInnerHTML={{ __html: q.explanation }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}

      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

export default GateStudyQuiz;

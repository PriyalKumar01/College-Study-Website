import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, CheckCircle2, Mail, ArrowLeft, X, AlertCircle, AlertTriangle, School, UserCheck } from 'lucide-react';
import logoImg from '@/assets/college-study-hub-logo.png';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { BRANCH_OPTIONS, YEAR_OPTIONS } from './ProfileCompletionModal';

// hCaptcha Site Key provided by user
const HCAPTCHA_SITE_KEY = "8a4805ba-2f46-4c8a-980a-54b8d5240d88";

const BLOCKED_DOMAINS = [
  'tempmail.com', 'throwawaymail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'getnada.com', 'temp-mail.org', 'fake-email.com', 'dispostable.com',
  'sharklasers.com', 'gmial.com', 'gmal.com', 'test.com', 'example.com', 'testmail.com'
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

const RequiredIndicator = () => (
  <span className="text-red-500 ml-0.5">*</span>
);

const InlineError = ({ message }: { message: string }) => (
  <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
    <AlertCircle className="w-3 h-3" />
    {message}
  </p>
);

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  const lowerEmail = email.toLowerCase();

  // Block specific "test" patterns commonly used
  if (lowerEmail.startsWith('test') || lowerEmail.startsWith('abc') || lowerEmail.startsWith('xyz') || lowerEmail.startsWith('user')) {
    // Only block if it looks like a lazy test email (e.g. test@gmail.com, test@test.com)
    // We'll be a bit strict here to save the user's reputation
    if (lowerEmail.includes('test') && (lowerEmail.length < 15)) return false;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && BLOCKED_DOMAINS.some(d => domain.includes(d))) {
    return false;
  }
  return true;
};

const getPasswordErrors = (pwd: string) => {
  const errors = [];
  if (pwd.length < 8) errors.push("Minimum 8 characters");
  if (!/[A-Z]/.test(pwd)) errors.push("At least one uppercase letter (A-Z)");
  if (!/[a-z]/.test(pwd)) errors.push("At least one lowercase letter (a-z)");
  if (!/[0-9]/.test(pwd)) errors.push("At least one number (0-9)");
  if (!/[@$!%*?&]/.test(pwd)) errors.push("At least one special character (@, #, $, !)");
  return errors;
};

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [step, setStep] = useState<'form' | 'otp' | 'reset-password' | 'signup-complete'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [branch, setBranch] = useState('');
  const [otherBranch, setOtherBranch] = useState('');
  const [year, setYear] = useState('');
  const [otherYear, setOtherYear] = useState('');
  const [collegeType, setCollegeType] = useState<'hbtu' | 'non-hbtu' | ''>('');
  const [customCollege, setCustomCollege] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Verification State
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);

  // Validation & Captcha
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // hCaptcha ref
  const captchaRef = useRef<HCaptcha>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setNewPassword('');
    setFirstName('');
    setLastName('');
    setContactNo('');
    setCollegeType('');
    setCustomCollege('');
    setBranch('');
    setOtherBranch('');
    setYear('');
    setOtherYear('');
    setOtp('');
    setStep('form');
    setAcceptedTerms(false);
    setTouched({});
    setResendTimer(0);
    setIsSendingOtp(false);
    setEmailVerified(false);
    setIsLoading(false);
    setCaptchaToken(null);
    captchaRef.current?.resetCaptcha();
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    if (defaultMode) setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  useEffect(() => {
    // Check for existing timer on mount
    const savedTimer = localStorage.getItem('otp_timer_expiry');
    if (savedTimer) {
      const expiry = parseInt(savedTimer, 10);
      const now = Date.now();
      if (expiry > now) {
        setResendTimer(Math.ceil((expiry - now) / 1000));
        setStep('otp'); // Restore OTP step if timer is running
        // Also restore email if possible? We might lose email on refresh unless we persist it too.
        // For now, let's just respect the timer blocking.
      } else {
        localStorage.removeItem('otp_timer_expiry');
      }
    }
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(t => {
          if (t <= 1) {
            localStorage.removeItem('otp_timer_expiry');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const passwordStrength = useMemo(() => {
    const pwd = mode === 'forgot' ? newPassword : password;
    if (!pwd) return { score: 0, label: '', color: '' };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  }, [password, newPassword, mode]);

  const getEmailError = (emailValue: string, isTouched: boolean): string | null => {
    if (!isTouched) return null;
    if (!emailValue.trim()) return 'Email address is required';
    if (!isValidEmail(emailValue)) return 'Please enter a valid email address';
    return null;
  };

  const emailError = getEmailError(email, touched.email || false);
  const isEmailValid = email.trim() !== '' && !emailError;

  const handleVerifyEmailStart = async (isPasswordReset = false) => {
    setTouched(prev => ({ ...prev, email: true }));
    const error = getEmailError(email, true);
    if (error) {
      toast({ title: "Invalid Email", description: error, variant: "destructive" });
      return;
    }

    // Captcha Check - Only for Forgot Password (as per user request)
    if (mode === 'forgot' && !captchaToken) {
      toast({ title: "CAPTCHA Required", description: "Please complete the CAPTCHA check first.", variant: "destructive" });
      return;
    }

    if (resendTimer > 0) {
      toast({ title: "Please Wait", description: `You can resend in ${resendTimer} seconds.`, variant: "destructive" });
      return;
    }

    if (isSendingOtp) return;
    setIsSendingOtp(true);
    setIsLoading(true);

    try {
      console.log('Initiating OTP login/signup for:', email);

      // STEP 1: Check if user exists (Probe with SignUp)
      if (mode === 'signup') {
        const dummyPassword = "ProbePassword123!@#"; // Temporary password for probing
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: dummyPassword,
        });

        if (signUpError && signUpError.message.includes("already registered")) {
          toast({
            title: "Account Already Exists",
            description: "Redirecting to login...",
          });
          setMode('signin'); // Switch to login mode
          setIsSendingOtp(false);
          setIsLoading(false);
          return;
        }

        // If no error, the user is either created (new) or the probe didn't catch it (unlikely for existing).
        // If created, we continue to send OTP so they can verify.
        // We do NOT stop here.
      }

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: !isPasswordReset,
          captchaToken: (mode === 'forgot' && captchaToken) ? captchaToken : undefined
        }
      });

      if (error) {
        throw error;
      }

      // Success: Set persistent timer (120s = 2 mins)
      const expiry = Date.now() + 120 * 1000;
      localStorage.setItem('otp_timer_expiry', expiry.toString());
      setStep('otp');
      setResendTimer(120);
      setOtp('');

      toast({
        title: "Verification code sent",
        description: `Please check ${email} for your 6-digit code.`,
      });

    } catch (err: any) {
      console.error("OTP Send Error:", err);
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);

      let title = "Verification Failed";
      let desc = err.message || "Something went wrong";

      if (err.message?.includes('captcha')) {
        title = "Captcha Required";
        desc = "Server requires Captcha but it is hidden. Please disable 'Enable Captcha Protection' in Supabase > Authentication > Security.";
      } else if (err.status === 429 || err.message?.includes('limit')) {
        title = "Too Many Requests";
        desc = "Server is busy. Please wait 2 minutes before trying again.";
      } else {
        // Generic fall-back
        title = "Request Failed";
        desc = "Unable to send verification code. Please try again later.";
      }

      toast({ title, description: desc, variant: "destructive" });
    } finally {
      setIsSendingOtp(false);
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({ title: "Invalid Code", description: "Must be 6 digits", variant: "destructive" });
      return;
    }
    setIsLoading(true);

    try {
      // STEP 2: Verify OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp,
        type: 'email',
      });

      if (error) throw error;
      if (!data.session || !data.user) {
        throw new Error("Verification succeeded but no session created.");
      }

      setEmailVerified(true);

      // Determine next step based on mode and profile status
      if (mode === 'forgot') {
        setStep('reset-password');
        toast({ title: "Verified", description: "Please set your new password." });
      } else if (mode === 'signup') {
        // Check if profile is already completed (e.g., existing user trying to signup again)
        const isProfileCompleted = data.user.user_metadata?.profile_completed === true;

        if (isProfileCompleted) {
          // User already exists and is complete -> Just log them in
          toast({ title: "Welcome back!", description: "You already have an account. Signed in successfully." });
          handleClose();
          { const r = (()=>{try{const v=sessionStorage.getItem('postLoginRedirect');if(v){sessionStorage.removeItem('postLoginRedirect');return v;}}catch{}return '/dashboard';})(); navigate(r); }
        } else {
          // New user or incomplete profile -> Move to Profile Completion
          setStep('signup-complete');
          toast({ title: "Verified!", description: "Please complete your profile." });
        }
      } else {
        // Default fallthrough (shouldn't really happen for signin unless we support OTP login)
        setStep('form');
        handleClose();
        { const r = (()=>{try{const v=sessionStorage.getItem('postLoginRedirect');if(v){sessionStorage.removeItem('postLoginRedirect');return v;}}catch{}return '/dashboard';})(); navigate(r); }
      }

    } catch (err: any) {
      console.error("Verification Error:", err);
      toast({
        title: "Verification Failed",
        description: err.message || "Invalid code.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true, lastName: true, password: true,
      branch: true, year: true
    });

    const pwdErrors = getPasswordErrors(password);
    if (pwdErrors.length > 0) {
      toast({ title: "Weak Password", description: "Please check password requirements.", variant: "destructive" });
      return;
    }

    const finalBranch = branch === "Other" ? otherBranch.trim() : branch;
    const finalYear = year === "Other" ? otherYear.trim() : year;
    const resolvedCollege = collegeType === 'hbtu' ? 'HBTU Kanpur' : customCollege.trim();

    if (!firstName || !lastName || !resolvedCollege || !finalBranch || !finalYear) {
      toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    if (!collegeType) {
      toast({ title: "Missing Fields", description: "Please select HBTU or Non-HBTU college.", variant: "destructive" });
      return;
    }
    if (collegeType === 'non-hbtu' && !customCollege.trim()) {
      toast({ title: "Missing Fields", description: "Please enter your college name.", variant: "destructive" });
      return;
    }

    if (year === "Other" && !otherYear.trim()) {
      toast({ title: "Missing Fields", description: "Please specify your year/batch.", variant: "destructive" });
      return;
    }

    if (!acceptedTerms) {
      toast({ title: "Terms Required", description: "You must accept the terms.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // STEP 3: Update User with Password and Profile Data
      const { error } = await supabase.auth.updateUser({
        password: password,
        data: {
          first_name: firstName,
          last_name: lastName,
          mobile_number: contactNo || null,
          college: resolvedCollege, branch: finalBranch, year: finalYear,
          profile_completed: true // MARK PROFILE AS COMPLETE
        }
      });

      if (error) throw error;

      sessionStorage.setItem('hasSignedUp', 'true');
      toast({
        title: "Account Created Successfully",
        description: "Welcome to College Study Hub!",
      });
      handleClose();
      { const r = (()=>{try{const v=sessionStorage.getItem('postLoginRedirect');if(v){sessionStorage.removeItem('postLoginRedirect');return v;}}catch{}return '/dashboard';})(); navigate(r); }

    } catch (err: any) {
      toast({ title: "Signup Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !password) return;

    if (!captchaToken) {
      toast({ title: "CAPTCHA Required", description: "Please complete the CAPTCHA check.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
        options: { captchaToken }
      });

      if (error) throw error;
      if (data.session) {
        toast({ title: "Welcome back!", description: "Signed in successfully." });
        handleClose();
        { const r = (()=>{try{const v=sessionStorage.getItem('postLoginRedirect');if(v){sessionStorage.removeItem('postLoginRedirect');return v;}}catch{}return '/dashboard';})(); navigate(r); }
      }
    } catch (err: any) {
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
      toast({ title: "Login Failed", description: "Invalid email, password, or captcha.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
          // redirectTo: `http://localhost:8080/auth`,   when deploying change this url
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true });
    if (!captchaToken) {
      toast({ title: "CAPTCHA Required", description: "Please complete the CAPTCHA check.", variant: "destructive" });
      return;
    }
    await handleVerifyEmailStart(true);
  };

  const handleResetPasswordFinal = async () => {
    const pwdErrors = getPasswordErrors(newPassword);
    if (pwdErrors.length > 0) {
      toast({ title: "Weak Password", description: "Please check rules.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Success", description: "Password updated. Please login." });
      setMode('signin');
      resetForm();
    } catch (err: any) {
      toast({ title: "Update Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    toast({ title: "To Resend", description: "Please go back and solve Captcha again to request new code." });
    setStep('form');
  };

  const switchMode = (m: 'signin' | 'signup' | 'forgot') => {
    setMode(m);
    resetForm();
  };

  // --- Renderers ---

  const renderOTPScreen = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => setStep('form')} className="p-0 dark:text-gray-300">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
          <Mail className="w-7 h-7 text-gray-700 dark:text-gray-300" />
        </div>
        <h2 className="text-xl font-bold dark:text-white">{mode === 'forgot' ? 'Reset Password' : 'Verify Email'}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-gray-900 dark:text-gray-200">{email}</span>
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <InputOTPSlot key={i} index={i} className="w-11 h-12 text-lg border-gray-300 dark:border-slate-700 rounded dark:text-white" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button onClick={handleVerifyOTP} disabled={isLoading || otp.length !== 6} className="w-full bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white">
        {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Confirm Verification'}
      </Button>
      <div className="text-center mt-4">
        {resendTimer > 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn’t receive? Wait <span className="font-medium text-gray-900 dark:text-white">{Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}</span> ({resendTimer}s)
          </p>
        ) : (
          <button onClick={handleResendOTP} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
            Resend Code (Requires Captcha)
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderSignupStart = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Create Account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Step 1: Verify Email</p>
      </div>

      <div className="space-y-4">
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full relative dark:bg-slate-800 dark:text-white dark:border-slate-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-white transition-colors" onClick={() => handleOAuthSignIn('google')}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" />
            </svg>
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full relative dark:bg-slate-800 dark:text-white dark:border-slate-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-white transition-colors" onClick={() => handleOAuthSignIn('github')}>
            <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Sign up with GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email */}
        <div>
          <Label className="dark:text-gray-300">Email Address<RequiredIndicator /></Label>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value.toLowerCase())}
            disabled={isSendingOtp}
            placeholder="e.g. name@gmail.com or name@hbtu.ac.in"
            className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
          />
          {getEmailError(email, touched.email || false) && (
            <InlineError message={getEmailError(email, true) || ''} />
          )}
        </div>

        {/* hCaptcha Removed from Signup as per request */}

        <Button
          onClick={() => handleVerifyEmailStart(false)}
          disabled={isSendingOtp || !email}
          className="w-full bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white"
        >
          {isSendingOtp ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Verify & Create Account'}
        </Button>
      </div>

      <div className="text-center text-sm dark:text-gray-400 mt-4">
        Already have an account? <button onClick={() => switchMode('signin')} className="text-blue-600 dark:text-blue-400 font-medium">Login</button>
      </div>
    </motion.div>
  );

  const renderSignupComplete = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Complete Profile</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Step 2: Set Details</p>
      </div>

      <form onSubmit={handleFinalSignup} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="dark:text-gray-300">First Name<RequiredIndicator /></Label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="e.g. Priyal"
              className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
            />
          </div>
          <div>
            <Label className="dark:text-gray-300">Last Name<RequiredIndicator /></Label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="e.g. Kumar"
              className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <Label className="dark:text-gray-300">Contact (Optional)</Label>
          <Input
            value={contactNo}
            onChange={e => setContactNo(e.target.value)}
            placeholder="e.g. 9876543210"
            className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
          />
        </div>

        <div>
          <Label className="dark:text-gray-300">Password<RequiredIndicator /></Label>
          <div className="relative mt-1">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pr-10 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              placeholder="Create a strong password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 text-xs space-y-1 bg-slate-50 dark:bg-slate-900 p-2 rounded border border-gray-100 dark:border-slate-800">
              {getPasswordErrors(password).map((err, i) => (
                <p key={i} className="text-red-500 flex items-center gap-1"><X className="w-3 h-3" /> {err}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label className="dark:text-gray-300">Are you an HBTU Student?<RequiredIndicator /></Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              type="button"
              onClick={() => { setCollegeType('hbtu'); setCustomCollege(''); }}
              className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2.5 text-xs font-medium transition-all
                ${collegeType === 'hbtu'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
                  : 'border-gray-200 dark:border-slate-700 hover:border-sky-300 hover:bg-sky-50/40 dark:text-gray-300'}`}
            >
              <School className="w-4 h-4" />
              HBTU Kanpur
            </button>
            <button
              type="button"
              onClick={() => { setCollegeType('non-hbtu'); }}
              className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2.5 text-xs font-medium transition-all
                ${collegeType === 'non-hbtu'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40 dark:text-gray-300'}`}
            >
              <UserCheck className="w-4 h-4" />
              Other College
            </button>
          </div>
          {collegeType === 'hbtu' && (
            <p className="text-xs text-sky-600 mt-1 font-medium">✓ College set to: HBTU Kanpur</p>
          )}
          {collegeType === 'non-hbtu' && (
            <Input
              value={customCollege}
              onChange={e => { setCustomCollege(e.target.value); }}
              placeholder="Enter your full college name"
              className="mt-1.5 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="dark:text-gray-300">Branch</Label>
            <Select value={branch} onValueChange={(val) => { setBranch(val); if (val !== "Other") setOtherBranch(""); }}>
              <SelectTrigger className="mt-1 w-full dark:bg-slate-950 dark:border-slate-800 dark:text-white">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {BRANCH_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {branch === "Other" && (
              <Input
                value={otherBranch}
                onChange={e => setOtherBranch(e.target.value)}
                placeholder="e.g. Architecture, MBA..."
                className="mt-2 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              />
            )}
          </div>
          <div>
            <Label className="dark:text-gray-300">Batch / Graduating Year</Label>
            <Select value={year} onValueChange={(val) => { setYear(val); if (val !== "Other") setOtherYear(""); }}>
              <SelectTrigger className="mt-1 w-full dark:bg-slate-950 dark:border-slate-800 dark:text-white">
                <SelectValue placeholder="Select batch year" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {YEAR_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {year === "Other" && (
              <Input
                value={otherYear}
                onChange={e => setOtherYear(e.target.value)}
                placeholder="e.g. Faculty, 2014..."
                className="mt-2 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(c) => setAcceptedTerms(c as boolean)} className="dark:border-slate-700" />
          <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
            I agree to <Link to="/terms" className="text-blue-600 dark:text-blue-400">Terms</Link> & <Link to="/privacy" className="text-blue-600 dark:text-blue-400">Privacy</Link>
          </label>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white">
          {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Complete Signup'}
        </Button>
      </form>
    </motion.div>
  );

  const renderResetPasswordScreen = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-center dark:text-white">Set New Password</h2>
      <div>
        <Label className="dark:text-gray-300">New Password</Label>
        <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="dark:bg-slate-950 dark:border-slate-800 dark:text-white" />

        {newPassword && (
          <div className="mt-2 text-xs space-y-1 bg-slate-50 dark:bg-slate-900 p-2 rounded border border-gray-100 dark:border-slate-800">
            {getPasswordErrors(newPassword).map((err, i) => (
              <p key={i} className="text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {err}
              </p>
            ))}
          </div>
        )}
      </div>
      <Button onClick={handleResetPasswordFinal} disabled={isLoading || getPasswordErrors(newPassword).length > 0} className="w-full bg-gray-900 dark:bg-slate-50 dark:text-slate-900 text-white">
        {isLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing if we are in the 'signup-complete' step
      if (!open && step === 'signup-complete') {
        return;
      }
      handleClose();
    }}>
      <DialogContent
        hideDefaultClose
        className="sm:max-w-[440px] w-[95vw] max-h-[90vh] p-0 pr-0 gap-0 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 shadow-2xl rounded overflow-hidden flex flex-col"
        onPointerDownOutside={(e) => {
          if (step === 'signup-complete') e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (step === 'signup-complete') e.preventDefault();
        }}
      >
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">Sign in, Sign up, or recover your password</DialogDescription>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-8 h-8" alt="College Study Hub" width="32" height="32" />
            <span className="font-bold text-base block text-gray-900 dark:text-white">College Study</span>
          </div>
          {/* Hide Close button during mandatory profile completion */}
          {step !== 'signup-complete' && (
            <button onClick={handleClose} aria-label="Close"><X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" /></button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {step === 'otp' && renderOTPScreen()}
            {step === 'reset-password' && renderResetPasswordScreen()}

            {step === 'form' && mode === 'signin' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-5 space-y-3">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold dark:text-white">Welcome Back</h2>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">Use social login for instant access</p>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full relative bg-green-50/50 border-green-200 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-white dark:hover:bg-green-900/30 transition-all" onClick={() => handleOAuthSignIn('google')}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full relative bg-green-50/50 border-green-200 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-white dark:hover:bg-green-900/30 transition-all" onClick={() => handleOAuthSignIn('github')}>
                    <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>

                <div className="relative pt-1">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-100 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                    <span className="bg-white dark:bg-slate-900 px-2 text-gray-400">
                      Or with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-3">
                  <div className="space-y-3">
                    <div>
                      <Label className="dark:text-gray-300">Email</Label>
                      <Input
                        value={email}
                        onChange={e => setEmail(e.target.value.toLowerCase())}
                        placeholder="e.g. student@college.edu"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="dark:text-gray-300">Password</Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-10 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* hCAPTCHA for Login */}
                  <div className="flex justify-center scale-90 origin-center">
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={HCAPTCHA_SITE_KEY}
                      onVerify={(token) => setCaptchaToken(token)}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-10 bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
                  </Button>
                </form>
                <div className="space-y-2 text-center text-sm pt-0">
                  <button onClick={() => switchMode('forgot')} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium text-xs">Forgot Password?</button>
                  <div className="dark:text-gray-400 text-xs">
                    Don't have an account? <button onClick={() => switchMode('signup')} className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700">Create Account</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SIGNUP FLOW */}
            {step === 'form' && mode === 'signup' && renderSignupStart()}
            {step === 'signup-complete' && mode === 'signup' && renderSignupComplete()}

            {step === 'form' && mode === 'forgot' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-5 space-y-3">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold dark:text-white">Forgot Password</h2>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">Try instant access via social optimized login</p>
                </div>

                {/* OAuth Shortcut for Forgot Password */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full relative bg-green-50/50 border-green-200 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-white dark:hover:bg-green-900/30 transition-all" onClick={() => handleOAuthSignIn('google')}>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full relative bg-green-50/50 border-green-200 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-white dark:hover:bg-green-900/30 transition-all" onClick={() => handleOAuthSignIn('github')}>
                      <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Button>
                  </div>
                  <div className="relative pt-1">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-100 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                      <span className="bg-white dark:bg-slate-900 px-2 text-gray-400">
                        Or reset via email
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <div>
                    <Label className="dark:text-gray-300">Email Address</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter already registered id only for password reset" className="h-10 dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
                  </div>

                  <div className="flex justify-center scale-90 origin-center">
                    <HCaptcha ref={captchaRef} sitekey={HCAPTCHA_SITE_KEY} onVerify={setCaptchaToken} />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-10 bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Send Code'}
                  </Button>
                </form>

                <div className="text-center mt-2">
                  <button onClick={() => switchMode('signin')} className="flex items-center justify-center text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mx-auto transition-colors">
                    <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 py-3 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex-shrink-0">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Made with ❤️ for HBTU Students
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

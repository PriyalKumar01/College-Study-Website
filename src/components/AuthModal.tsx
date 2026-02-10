import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, CheckCircle2, Mail, ArrowLeft, X, AlertCircle, AlertTriangle } from 'lucide-react';
import logoImg from '@/assets/college-study-hub-logo.png';
import HCaptcha from '@hcaptcha/react-hcaptcha';

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
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
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
    setCollege('');
    setBranch('');
    setYear('');
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

    if (!captchaToken) {
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

      // STEP 1: Request OTP
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: !isPasswordReset,
          captchaToken: captchaToken || undefined
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
        title = "Captcha Error";
        desc = "Please try again.";
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
          navigate('/dashboard');
        } else {
          // New user or incomplete profile -> Move to Profile Completion
          setStep('signup-complete');
          toast({ title: "Verified!", description: "Please complete your profile." });
        }
      } else {
        // Default fallthrough (shouldn't really happen for signin unless we support OTP login)
        setStep('form');
        handleClose();
        navigate('/dashboard');
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
      college: true, branch: true, year: true
    });

    const pwdErrors = getPasswordErrors(password);
    if (pwdErrors.length > 0) {
      toast({ title: "Weak Password", description: "Please check password requirements.", variant: "destructive" });
      return;
    }

    if (!firstName || !lastName || !college || !branch || !year) {
      toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
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
          college, branch, year,
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
      navigate('/dashboard');

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
        navigate('/dashboard');
      }
    } catch (err: any) {
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
      toast({ title: "Login Failed", description: "Invalid email, password, or captcha.", variant: "destructive" });
    } finally {
      setIsLoading(false);
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
        {/* Email */}
        <div>
          <Label className="dark:text-gray-300">Email Address<RequiredIndicator /></Label>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value.toLowerCase())}
            disabled={isSendingOtp}
            placeholder="student@college.edu"
            className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
          />
          {getEmailError(email, touched.email || false) && (
            <InlineError message={getEmailError(email, true) || ''} />
          )}
        </div>

        {/* hCaptcha */}
        <div className="flex justify-center">
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITE_KEY}
            onVerify={(token) => setCaptchaToken(token)}
          />
        </div>

        <Button
          onClick={() => handleVerifyEmailStart(false)}
          disabled={isSendingOtp || !email || !captchaToken}
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
          <Label className="dark:text-gray-300">College<RequiredIndicator /></Label>
          <Input
            value={college}
            onChange={e => setCollege(e.target.value)}
            placeholder="e.g. HBTU Kanpur"
            className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="dark:text-gray-300">Branch</Label>
            <Input
              value={branch}
              onChange={e => setBranch(e.target.value)}
              placeholder="e.g. CSE"
              className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
            />
          </div>
          <div>
            <Label className="dark:text-gray-300">Year</Label>
            <Input
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="e.g. 2nd Year"
              className="mt-1 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
            />
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
        className="sm:max-w-[440px] w-[95vw] max-h-[90vh] p-0 pr-0 gap-0 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 shadow-2xl rounded overflow-hidden flex flex-col"
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
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-center dark:text-white">Welcome Back</h2>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label className="dark:text-gray-300">Email</Label>
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value.toLowerCase())}
                      placeholder="e.g. student@college.edu"
                      className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-gray-300">Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    />
                  </div>

                  {/* hCAPTCHA for Login */}
                  <div className="flex justify-center">
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={HCAPTCHA_SITE_KEY}
                      onVerify={(token) => setCaptchaToken(token)}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
                  </Button>
                </form>
                <div className="space-y-4 text-center text-sm pt-2">
                  <button onClick={() => switchMode('forgot')} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">Forgot Password?</button>
                  <div className="dark:text-gray-400">
                    Don't have an account? <button onClick={() => switchMode('signup')} className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700">Create Account</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SIGNUP FLOW */}
            {step === 'form' && mode === 'signup' && renderSignupStart()}
            {step === 'signup-complete' && mode === 'signup' && renderSignupComplete()}

            {step === 'form' && mode === 'forgot' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
                <div className="flex items-center mb-4"><button onClick={() => switchMode('signin')} className="flex items-center text-sm text-gray-500 dark:text-gray-400"><ArrowLeft className="w-4 h-4 mr-1" /> Back</button></div>
                <h2 className="text-xl font-bold text-center dark:text-white">Forgot Password</h2>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">Enter your email to receive a reset code.</p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <Label className="dark:text-gray-300">Email Address</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
                  </div>

                  <div className="flex justify-center">
                    <HCaptcha ref={captchaRef} sitekey={HCAPTCHA_SITE_KEY} onVerify={setCaptchaToken} />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 text-white">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Send Code'}
                  </Button>
                </form>
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

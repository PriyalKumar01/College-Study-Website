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

// Common temp mail domains to block
const BLOCKED_DOMAINS = [
  'tempmail.com', 'throwawaymail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'getnada.com', 'temp-mail.org', 'fake-email.com', 'dispostable.com',
  'sharklasers.com', 'gmial.com', 'gmal.com'
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
  const [step, setStep] = useState<'form' | 'otp' | 'reset-password'>('form');
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
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(t => t - 1), 1000);
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
      toast({ title: "CAPTCHA Required", description: "Please complete the CAPTCHA check.", variant: "destructive" });
      return;
    }

    if (isSendingOtp) return;
    setIsSendingOtp(true);
    setIsLoading(true);

    try {
      console.log('Initiating OTP login for:', email);

      let error = null;

      if (isPasswordReset) {
        const res = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          captchaToken: captchaToken || undefined
        });
        error = res.error;
      } else {
        const res = await supabase.auth.signInWithOtp({
          email: email.trim().toLowerCase(),
          options: {
            shouldCreateUser: true,
            captchaToken: captchaToken || undefined
          }
        });
        error = res.error;
      }

      if (error) {
        console.error("OTP Send Error:", error);
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);

        let title = "Verification Failed";
        let desc = error.message;

        if (error.message.includes('captcha protection') || error.message.includes('invalid-input-response')) {
          title = "Configuration Error";
          desc = "Supabase rejected the hCaptcha. Please check your Secret Key in Supabase = hCaptcha Secret.";
        } else if (error.message.includes('browser-error')) {
          desc = "Network issue checking Captcha. Please try again.";
        } else if (error.message.includes('Signups not allowed')) {
          title = "Signup Error";
          desc = "Signups are currently disabled.";
        } else if (error.message.includes('unique constraint')) {
          title = "Cannot Verify";
          desc = "This email might already be registered.";
        }

        toast({
          title: title,
          description: desc,
          variant: "destructive",
        });
        return;
      }

      setStep('otp');
      setResendTimer(60);
      setOtp('');

      toast({
        title: "Verification code sent",
        description: `Please check ${email} for your 6-digit code.`,
      });

    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
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
      const type = mode === 'forgot' ? 'recovery' : 'email';

      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp,
        type: type as any,
      });

      if (error) throw error;

      if (!data.session) {
        throw new Error("Verification succeeded but no session created. Please try again.");
      }

      setEmailVerified(true);

      if (mode === 'forgot') {
        setStep('reset-password');
        toast({ title: "Verified", description: "Please set your new password." });
      } else {
        setStep('form');
        toast({
          title: "Verified Successfully! \u2705",
          description: "Your email is confirmed. Please complete your profile."
        });
      }

    } catch (err: any) {
      console.error("Verification Error:", err);
      toast({
        title: "Verification Failed",
        description: err.message || "Invalid code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      email: true, firstName: true, lastName: true, password: true,
      college: true, branch: true, year: true
    });

    if (!emailVerified) {
      toast({ title: "Action Required", description: "Please verify your email first.", variant: "destructive" });
      return;
    }

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
      const { error } = await supabase.auth.updateUser({
        password: password,
        data: {
          first_name: firstName,
          last_name: lastName,
          mobile_number: contactNo || null,
          college, branch, year
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
        <Button variant="ghost" size="sm" onClick={() => setStep('form')} className="p-0">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Mail className="w-7 h-7 text-gray-700" />
        </div>
        <h2 className="text-xl font-bold">{mode === 'forgot' ? 'Reset Password' : 'Verify Email'}</h2>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <InputOTPSlot key={i} index={i} className="w-11 h-12 text-lg border-gray-300 rounded" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button onClick={handleVerifyOTP} disabled={isLoading || otp.length !== 6} className="w-full bg-gray-900 text-white">
        {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Confirm Verification'}
      </Button>
      <div className="text-center mt-4">
        <button onClick={handleResendOTP} disabled={resendTimer > 0} className="text-sm text-blue-600 disabled:text-gray-400">
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code (Requires Captcha)'}
        </button>
      </div>
    </motion.div>
  );

  const renderSignupForm = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">Create Account</h2>
      </div>

      <form onSubmit={handleFinalSignup} className="space-y-3">
        {/* Email & Verify */}
        <div>
          <Label>Email Address<RequiredIndicator /></Label>
          <div className="relative mt-1">
            <Input
              value={email}
              onChange={e => {
                if (emailVerified) setEmailVerified(false);
                setEmail(e.target.value.toLowerCase())
              }}
              disabled={emailVerified || isSendingOtp}
              className={`pr-20 ${emailVerified ? 'border-green-500 bg-green-50 text-green-700' : ''}`}
              placeholder="student@college.edu"
            />
            {emailVerified ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-green-600 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Verified
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleVerifyEmailStart(false)}
                disabled={!isEmailValid || isSendingOtp}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
              >
                {isSendingOtp ? <Loader2 className="w-3 h-3 animate-spin" /> : 'VERIFY'}
              </button>
            )}
          </div>
          {emailError && <InlineError message={emailError} />}
          {!emailVerified && !isSendingOtp && (
            <p className="text-[10px] text-gray-400 mt-1 pl-1">
              * Solve Captcha below to Verify
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>First Name<RequiredIndicator /></Label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              disabled={!emailVerified}
              placeholder="e.g. Priyal"
              className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label>Last Name<RequiredIndicator /></Label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              disabled={!emailVerified}
              placeholder="e.g. Kumar"
              className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <Label>Contact (Optional)</Label>
          <Input
            value={contactNo}
            onChange={e => setContactNo(e.target.value)}
            disabled={!emailVerified}
            placeholder="e.g. 9876543210"
            className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label>Password<RequiredIndicator /></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={!emailVerified}
              className="pr-10 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Create a strong password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {password && (
            <div className="mt-2 text-xs space-y-1 bg-slate-50 p-2 rounded">
              {getPasswordErrors(password).map((err, i) => (
                <p key={i} className="text-red-500 flex items-center gap-1">
                  <X className="w-3 h-3" /> {err}
                </p>
              ))}
              {getPasswordErrors(password).length === 0 && (
                <p className="text-emerald-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Strong Password
                </p>
              )}
            </div>
          )}
          <p className="text-[10px] text-gray-500 mt-1 flex items-start gap-1">
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>Use a strong password containing small & capital letters, numbers, and special symbols.</span>
          </p>
        </div>

        <div>
          <Label>College<RequiredIndicator /></Label>
          <Input
            value={college}
            onChange={e => setCollege(e.target.value)}
            disabled={!emailVerified}
            placeholder="e.g. HBTU Kanpur"
            className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Branch</Label>
            <Input
              value={branch}
              onChange={e => setBranch(e.target.value)}
              disabled={!emailVerified}
              placeholder="e.g. CSE"
              className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              value={year}
              onChange={e => setYear(e.target.value)}
              disabled={!emailVerified}
              placeholder="e.g. 2nd Year"
              className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* hCAPTCHA PLACED HERE - BOTTOM */}
        {!emailVerified && (
          <div className="flex justify-center py-2">
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(c) => setAcceptedTerms(c as boolean)} disabled={!emailVerified} />
          <label htmlFor="terms" className="text-xs text-gray-500">
            I agree to <Link to="/terms" className="text-blue-600">Terms</Link> & <Link to="/privacy" className="text-blue-600">Privacy</Link>
          </label>
        </div>

        <Button type="submit" disabled={isLoading || !emailVerified || !acceptedTerms || getPasswordErrors(password).length > 0} className="w-full bg-gray-900 text-white">
          {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Create Account'}
        </Button>

      </form>

      <div className="text-center text-sm">
        Already have an account? <button onClick={() => switchMode('signin')} className="text-blue-600 font-medium">Login</button>
      </div>
    </motion.div>
  );

  const renderResetPasswordScreen = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-center">Set New Password</h2>
      <div>
        <Label>New Password</Label>
        <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" />

        {newPassword && (
          <div className="mt-2 text-xs space-y-1 bg-slate-50 p-2 rounded">
            {getPasswordErrors(newPassword).map((err, i) => (
              <p key={i} className="text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {err}
              </p>
            ))}
          </div>
        )}
      </div>
      <Button onClick={handleResetPasswordFinal} disabled={isLoading || getPasswordErrors(newPassword).length > 0} className="w-full bg-gray-900 text-white">
        {isLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent hideDefaultClose className="sm:max-w-[440px] w-[95vw] max-h-[90vh] p-0 pr-0 gap-0 bg-white border border-gray-200 shadow-2xl rounded overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-8 h-8" alt="Logo" />
            <span className="font-bold text-base block text-gray-900">College Study</span>
          </div>
          <button onClick={handleClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {step === 'otp' && renderOTPScreen()}
            {step === 'reset-password' && renderResetPasswordScreen()}

            {step === 'form' && mode === 'signin' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-center">Welcome Back</h2>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value.toLowerCase())}
                      placeholder="e.g. student@college.edu"
                      className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

                  <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 text-white">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
                  </Button>
                </form>
                <div className="space-y-4 text-center text-sm pt-2">
                  <button onClick={() => switchMode('forgot')} className="text-blue-600 hover:text-blue-700 font-medium">Forgot Password?</button>
                  <div>
                    Don't have an account? <button onClick={() => switchMode('signup')} className="text-blue-600 font-medium hover:text-blue-700">Create Account</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SIGNUP FORM is handled by renderSignupForm above */}
            {step === 'form' && mode === 'signup' && renderSignupForm()}

            {step === 'form' && mode === 'forgot' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 space-y-4">
                <div className="flex items-center mb-4"><button onClick={() => switchMode('signin')} className="flex items-center text-sm text-gray-500"><ArrowLeft className="w-4 h-4 mr-1" /> Back</button></div>
                <h2 className="text-xl font-bold text-center">Forgot Password</h2>
                <p className="text-sm text-center text-gray-500">Enter your email to receive a reset code.</p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>

                  <div className="flex justify-center">
                    <HCaptcha ref={captchaRef} sitekey={HCAPTCHA_SITE_KEY} onVerify={setCaptchaToken} />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 text-white">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Send Code'}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-500 text-center">
            Made with ❤️ for HBTU Students
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

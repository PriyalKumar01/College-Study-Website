import { useState, useEffect, useMemo, useCallback } from 'react';
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
import { Loader2, Eye, EyeOff, CheckCircle2, Mail, ArrowLeft, X, AlertCircle } from 'lucide-react';
import logoImg from '@/assets/college-study-hub-logo.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

// OTP expiry time in milliseconds (2 minutes)
const OTP_EXPIRY_MS = 2 * 60 * 1000;

// Required field indicator component
const RequiredIndicator = () => (
  <span className="text-red-500 ml-0.5">*</span>
);

// Inline error message component
const InlineError = ({ message }: { message: string }) => (
  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
    <AlertCircle className="w-3 h-3" />
    {message}
  </p>
);

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [step, setStep] = useState<'form' | 'otp' | 'reset-password'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
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
  
  // OTP verification
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpCreatedAt, setOtpCreatedAt] = useState<number | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  
  // Validation errors (touched state)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Reset entire form state when modal closes
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
    setGeneratedOtp('');
    setOtpCreatedAt(null);
    setEmailVerified(false);
    setStep('form');
    setAcceptedTerms(false);
    setTouched({});
    setResendTimer(0);
    setIsSendingOtp(false);
  }, []);

  // Handle modal close - always reset state
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    if (defaultMode) {
      setMode(defaultMode);
    }
  }, [defaultMode]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pwd = mode === 'forgot' ? newPassword : password;
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Strong', color: 'bg-green-500' };
    return { score, label: 'Very Strong', color: 'bg-emerald-500' };
  }, [password, newPassword, mode]);

  // Validation helpers
  const getEmailError = (emailValue: string, isTouched: boolean): string | null => {
    if (!isTouched) return null;
    if (!emailValue.trim()) return 'Email address is required';
    if (!isValidEmail(emailValue)) return 'Please enter a valid email address';
    return null;
  };

  const emailError = getEmailError(email, touched.email || false);
  const isEmailValid = email.trim() !== '' && isValidEmail(email);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPEmail = async (emailAddress: string, otpCode: string, isPasswordReset = false) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-otp-email', {
        body: {
          email: emailAddress,
          otp: otpCode,
          firstName: firstName || 'Student',
          isPasswordReset
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error sending OTP email:', error);
      throw error;
    }
  };

  const handleSendOTP = async (isPasswordReset = false) => {
    // Mark email as touched for validation
    setTouched(prev => ({ ...prev, email: true }));

    // Validate email before sending
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address (e.g., user@example.com)",
        variant: "destructive",
      });
      return;
    }

    // Prevent multiple clicks
    if (isSendingOtp) return;
    setIsSendingOtp(true);
    setIsLoading(true);

    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setOtpCreatedAt(Date.now());
      
      await sendOTPEmail(email, newOtp, isPasswordReset);
      
      setStep('otp');
      setResendTimer(60);
      setOtp('');
      
      toast({
        title: "Verification code sent",
        description: `We've sent a 6-digit code to ${email}. Code expires in 2 minutes.`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to send code",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSendingOtp(false);
    }
  };

  const isOtpExpired = (): boolean => {
    if (!otpCreatedAt) return true;
    return Date.now() - otpCreatedAt > OTP_EXPIRY_MS;
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    // Check if OTP has expired
    if (isOtpExpired()) {
      toast({
        title: "Code expired",
        description: "Your verification code has expired. Please request a new code.",
        variant: "destructive",
      });
      setOtp('');
      return;
    }

    if (otp !== generatedOtp) {
      toast({
        title: "Incorrect code",
        description: "The code you entered doesn't match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'forgot') {
      setStep('reset-password');
      toast({
        title: "Email verified",
        description: "Please set your new password",
      });
    } else {
      setEmailVerified(true);
      setStep('form');
      toast({
        title: "Email verified! ✓",
        description: "Your email has been verified successfully",
      });
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0 || isSendingOtp) return;
    
    setIsSendingOtp(true);
    setIsLoading(true);
    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setOtpCreatedAt(Date.now());
      setOtp('');
      
      await sendOTPEmail(email, newOtp, mode === 'forgot');
      
      setResendTimer(60);
      toast({
        title: "New code sent",
        description: "A new verification code has been sent. It expires in 2 minutes.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to resend",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSendingOtp(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been reset successfully. Please sign in.",
      });
      resetForm();
      setMode('signin');
    } catch (error: any) {
      toast({
        title: "Failed to reset password",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all required fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      college: true,
      branch: true,
      year: true,
    });

    if (!firstName || !lastName || !email || !password || !college || !branch || !year) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!emailVerified) {
      toast({
        title: "Email not verified",
        description: "Please verify your email first by clicking the Verify button",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Accept Terms & Conditions",
        description: "Please accept the Terms & Conditions to continue",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
            mobile_number: contactNo || null,
            college: college,
            branch: branch,
            year: year,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Email already registered",
            description: "This email is already registered. Please login instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome to College Study!",
          description: "Your account has been created successfully",
        });
        handleClose();
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark fields as touched
    setTouched({ email: true, password: true });

    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid credentials",
            description: "Email or password is incorrect",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in",
        });
        handleClose();
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true });
    await handleSendOTP(true);
  };

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  // Calculate remaining OTP time
  const getOtpRemainingTime = (): number => {
    if (!otpCreatedAt) return 0;
    const remaining = Math.max(0, OTP_EXPIRY_MS - (Date.now() - otpCreatedAt));
    return Math.ceil(remaining / 1000);
  };

  const renderOTPScreen = () => {
    const remainingTime = getOtpRemainingTime();
    const isExpired = remainingTime <= 0;

    return (
      <motion.div
        key="otp"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-6"
      >
        <button
          onClick={() => {
            setStep('form');
            setOtp('');
          }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="w-7 h-7 text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Verify Your Email</h2>
          <p className="text-sm text-gray-500">
            Enter the 6-digit code sent to<br />
            <span className="font-medium text-gray-700">{email}</span>
          </p>
          {!isExpired && (
            <p className="text-xs text-amber-600 mt-2">
              Code expires in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
            </p>
          )}
          {isExpired && (
            <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Code expired. Please request a new one.
            </p>
          )}
        </div>
        
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index} 
                  className="w-11 h-12 text-lg border-gray-300 rounded" 
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerifyOTP}
          className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium"
          disabled={isLoading || otp.length !== 6 || isExpired}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : isExpired ? (
            'Code Expired - Request New'
          ) : (
            'Verify & Continue'
          )}
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResendOTP}
            disabled={resendTimer > 0 || isLoading || isSendingOtp}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
          >
            {isSendingOtp ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Sending...
              </span>
            ) : resendTimer > 0 ? (
              `Resend in ${resendTimer}s`
            ) : (
              'Resend Code'
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  const renderResetPasswordScreen = () => (
    <motion.div
      key="reset-password"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Set New Password</h2>
        <p className="text-sm text-gray-500">Create a strong password for your account</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="newPassword" className="text-sm text-gray-700">
            New Password<RequiredIndicator />
          </Label>
          <div className="relative mt-1">
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              className="h-11 pr-10 border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {newPassword && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      level <= passwordStrength.score 
                        ? passwordStrength.color 
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Strength: <span className="font-medium">{passwordStrength.label}</span>
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={handleResetPassword}
          className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium"
          disabled={isLoading || newPassword.length < 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </Button>
      </div>
    </motion.div>
  );

  const renderForgotPasswordForm = () => {
    const forgotEmailError = getEmailError(email, touched.email || false);
    const canSendOtp = isEmailValid && !isSendingOtp;

    return (
      <motion.div
        key="forgot"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-6"
      >
        <button
          onClick={() => switchMode('signin')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Forgot Password?</h2>
          <p className="text-sm text-gray-500">Enter your email and we'll send you a code to reset it</p>
        </div>
        
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <Label htmlFor="forgot-email" className="text-sm text-gray-700">
              Email Address<RequiredIndicator />
            </Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              disabled={isLoading}
              className={`h-11 mt-1 border-gray-300 rounded ${forgotEmailError ? 'border-red-400 focus:border-red-500' : ''}`}
            />
            {forgotEmailError && <InlineError message={forgotEmailError} />}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canSendOtp || isLoading}
          >
            {isLoading || isSendingOtp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Code'
            )}
          </Button>
        </form>
      </motion.div>
    );
  };

  const renderSignInForm = () => {
    const signInEmailError = getEmailError(email, touched.email || false);
    const passwordError = touched.password && !password.trim() ? 'Password is required' : null;
    const canSignIn = isEmailValid && password.trim() !== '';

    return (
      <motion.div
        key="signin"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to continue your learning journey</p>
        </div>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <Label htmlFor="signin-email" className="text-sm text-gray-700">
              Email Address<RequiredIndicator />
            </Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              disabled={isLoading}
              className={`h-11 mt-1 border-gray-300 rounded ${signInEmailError ? 'border-red-400 focus:border-red-500' : ''}`}
            />
            {signInEmailError && <InlineError message={signInEmailError} />}
          </div>

          <div>
            <Label htmlFor="signin-password" className="text-sm text-gray-700">
              Password<RequiredIndicator />
            </Label>
            <div className="relative mt-1">
              <Input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                disabled={isLoading}
                className={`h-11 pr-10 border-gray-300 rounded ${passwordError ? 'border-red-400 focus:border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && <InlineError message={passwordError} />}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !canSignIn}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <button
            onClick={() => switchMode('forgot')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot password?
          </button>
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => switchMode('signup')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create account
            </button>
          </p>
        </div>
      </motion.div>
    );
  };

  const renderSignUpForm = () => {
    const signUpEmailError = getEmailError(email, touched.email || false);
    const canVerifyEmail = isEmailValid && !emailVerified && !isSendingOtp;

    return (
      <motion.div
        key="signup"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-6 max-h-[80vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Create Account</h2>
          <p className="text-sm text-gray-500">Join thousands of students on College Study</p>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName" className="text-sm text-gray-700">
                First Name<RequiredIndicator />
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, firstName: true }))}
                disabled={isLoading}
                className={`h-10 mt-1 border-gray-300 rounded ${touched.firstName && !firstName.trim() ? 'border-red-400' : ''}`}
              />
              {touched.firstName && !firstName.trim() && <InlineError message="First name is required" />}
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm text-gray-700">
                Last Name<RequiredIndicator />
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, lastName: true }))}
                disabled={isLoading}
                className={`h-10 mt-1 border-gray-300 rounded ${touched.lastName && !lastName.trim() ? 'border-red-400' : ''}`}
              />
              {touched.lastName && !lastName.trim() && <InlineError message="Last name is required" />}
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <Label htmlFor="contactNo" className="text-sm text-gray-700">
              Contact Number <span className="text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="contactNo"
              type="tel"
              placeholder="+91 98765 43210"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              disabled={isLoading}
              className="h-10 mt-1 border-gray-300 rounded"
            />
          </div>

          {/* Email with Verification */}
          <div>
            <Label htmlFor="signup-email" className="text-sm text-gray-700">
              Email Address<RequiredIndicator />
            </Label>
            <div className="relative mt-1">
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());
                  setEmailVerified(false);
                }}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                disabled={isLoading || emailVerified}
                className={`h-10 pr-20 border-gray-300 rounded ${
                  emailVerified ? 'bg-green-50 border-green-400' : signUpEmailError ? 'border-red-400' : ''
                }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {emailVerified ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendOTP(false)}
                    disabled={!canVerifyEmail || isLoading}
                    className="text-blue-600 hover:text-blue-700 h-8 px-2 text-sm disabled:text-gray-400"
                  >
                    {isSendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                  </Button>
                )}
              </div>
            </div>
            {signUpEmailError && <InlineError message={signUpEmailError} />}
            {!emailVerified && !signUpEmailError && email && isEmailValid && (
              <p className="text-xs text-gray-500 mt-1">Click "Verify" to receive a verification code</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="signup-password" className="text-sm text-gray-700">
              Password<RequiredIndicator />
            </Label>
            <div className="relative mt-1">
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                disabled={isLoading}
                className={`h-10 pr-10 border-gray-300 rounded ${touched.password && !password.trim() ? 'border-red-400' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && !password.trim() && <InlineError message="Password is required" />}
            
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= passwordStrength.score 
                          ? passwordStrength.color 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Strength: <span className="font-medium">{passwordStrength.label}</span>
                </p>
              </div>
            )}
          </div>

          {/* College Details */}
          <div>
            <Label htmlFor="college" className="text-sm text-gray-700">
              College Name<RequiredIndicator />
            </Label>
            <Input
              id="college"
              placeholder="e.g., HBTU Kanpur"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, college: true }))}
              disabled={isLoading}
              className={`h-10 mt-1 border-gray-300 rounded ${touched.college && !college.trim() ? 'border-red-400' : ''}`}
            />
            {touched.college && !college.trim() && <InlineError message="College name is required" />}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="branch" className="text-sm text-gray-700">
                Branch<RequiredIndicator />
              </Label>
              <Input
                id="branch"
                placeholder="e.g., CSE"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, branch: true }))}
                disabled={isLoading}
                className={`h-10 mt-1 border-gray-300 rounded ${touched.branch && !branch.trim() ? 'border-red-400' : ''}`}
              />
              {touched.branch && !branch.trim() && <InlineError message="Branch is required" />}
            </div>
            <div>
              <Label htmlFor="year" className="text-sm text-gray-700">
                Year<RequiredIndicator />
              </Label>
              <Input
                id="year"
                placeholder="e.g., 2nd Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, year: true }))}
                disabled={isLoading}
                className={`h-10 mt-1 border-gray-300 rounded ${touched.year && !year.trim() ? 'border-red-400' : ''}`}
              />
              {touched.year && !year.trim() && <InlineError message="Year is required" />}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              disabled={isLoading}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
              I agree to the{' '}
              <Link to="/terms-of-service" className="text-blue-600 hover:underline" target="_blank">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline" target="_blank">
                Privacy Policy
              </Link>
              <RequiredIndicator />
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !emailVerified || !acceptedTerms}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already registered?{' '}
          <button
            onClick={() => switchMode('signin')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </button>
        </p>
      </motion.div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white border border-gray-200 shadow-2xl rounded overflow-hidden">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">Sign in or create an account</DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="College Study" className="h-8 w-8" />
            <div>
              <h1 className="text-base font-semibold text-gray-900">College Study</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Your Study Hub</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'otp' && renderOTPScreen()}
          {step === 'reset-password' && renderResetPasswordScreen()}
          {step === 'form' && mode === 'signin' && renderSignInForm()}
          {step === 'form' && mode === 'signup' && renderSignUpForm()}
          {step === 'form' && mode === 'forgot' && renderForgotPasswordForm()}
        </AnimatePresence>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Made with ❤️ for HBTU Students
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

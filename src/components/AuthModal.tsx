import { useState, useEffect, useMemo } from 'react';
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
import { Loader2, Eye, EyeOff, CheckCircle2, Mail, ArrowLeft, RefreshCw, X } from 'lucide-react';
import logoImg from '@/assets/college-study-hub-logo.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

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
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (defaultMode) {
      setMode(defaultMode);
    }
  }, [defaultMode]);

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
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      
      await sendOTPEmail(email, newOtp, isPasswordReset);
      
      setStep('otp');
      setResendTimer(60);
      
      toast({
        title: "Verification code sent",
        description: `We've sent a 6-digit code to ${email}`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to send code",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setOtp('');
      
      await sendOTPEmail(email, newOtp, mode === 'forgot');
      
      setResendTimer(60);
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Failed to resend",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
    
    if (!firstName || !lastName || !email || !password || !college || !branch || !year) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!emailVerified) {
      toast({
        title: "Email not verified",
        description: "Please verify your email first",
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
        onClose();
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
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

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
        onClose();
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
    await handleSendOTP(true);
  };

  const resetForm = () => {
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
    setEmailVerified(false);
    setStep('form');
    setAcceptedTerms(false);
  };

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  const renderOTPScreen = () => (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6"
    >
      <button
        onClick={() => setStep('form')}
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
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          'Verify & Continue'
        )}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
        <button
          onClick={handleResendOTP}
          disabled={resendTimer > 0 || isLoading}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
        </button>
      </div>
    </motion.div>
  );

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
          <Label htmlFor="newPassword" className="text-sm text-gray-700">New Password</Label>
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

  const renderForgotPasswordForm = () => (
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
          <Label htmlFor="forgot-email" className="text-sm text-gray-700">Email Address</Label>
          <Input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            disabled={isLoading}
            className="h-11 mt-1 border-gray-300 rounded"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium"
          disabled={isLoading || !email}
        >
          {isLoading ? (
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

  const renderSignInForm = () => (
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
          <Label htmlFor="signin-email" className="text-sm text-gray-700">Email Address</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            disabled={isLoading}
            className="h-11 mt-1 border-gray-300 rounded"
          />
        </div>

        <div>
          <Label htmlFor="signin-password" className="text-sm text-gray-700">Password</Label>
          <div className="relative mt-1">
            <Input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium"
          disabled={isLoading}
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

  const renderSignUpForm = () => (
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
            <Label htmlFor="firstName" className="text-sm text-gray-700">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              className="h-10 mt-1 border-gray-300 rounded"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm text-gray-700">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              className="h-10 mt-1 border-gray-300 rounded"
            />
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
          <Label htmlFor="signup-email" className="text-sm text-gray-700">Email Address</Label>
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
              disabled={isLoading || emailVerified}
              className={`h-10 pr-20 border-gray-300 rounded ${
                emailVerified ? 'bg-green-50 border-green-400' : ''
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
                  disabled={isLoading || !email}
                  className="text-blue-600 hover:text-blue-700 h-8 px-2 text-sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                </Button>
              )}
            </div>
          </div>
          {!emailVerified && (
            <p className="text-xs text-gray-500 mt-1">Click "Verify" to receive a verification code</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="signup-password" className="text-sm text-gray-700">Password</Label>
          <div className="relative mt-1">
            <Input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="h-10 pr-10 border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
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
          <Label htmlFor="college" className="text-sm text-gray-700">College Name</Label>
          <Input
            id="college"
            placeholder="e.g., HBTU Kanpur"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            disabled={isLoading}
            className="h-10 mt-1 border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="branch" className="text-sm text-gray-700">Branch</Label>
            <Input
              id="branch"
              placeholder="e.g., CSE"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={isLoading}
              className="h-10 mt-1 border-gray-300 rounded"
            />
          </div>
          <div>
            <Label htmlFor="year" className="text-sm text-gray-700">Year</Label>
            <Input
              id="year"
              placeholder="e.g., 2nd Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={isLoading}
              className="h-10 mt-1 border-gray-300 rounded"
            />
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
          </label>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded font-medium"
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            onClick={onClose}
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

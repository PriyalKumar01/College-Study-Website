import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, CheckCircle2, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logoImg from '@/assets/college-study-hub-logo.png';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Strong', color: 'bg-green-500' };
    return { score, label: 'Very Strong', color: 'bg-emerald-500' };
  }, [password]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPEmail = async (emailAddress: string, otpCode: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-otp-email', {
        body: {
          email: emailAddress,
          otp: otpCode,
          firstName: firstName || 'Student'
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error sending OTP email:', error);
      throw error;
    }
  };

  const handleSendOTP = async () => {
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
      
      await sendOTPEmail(email, newOtp);
      
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

    setEmailVerified(true);
    setStep('form');
    toast({
      title: "Email verified! ✓",
      description: "Your email has been verified successfully",
    });
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setOtp('');
      
      await sendOTPEmail(email, newOtp);
      
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
            title: "Account exists",
            description: "This email is already registered. Please sign in instead.",
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

  const resetForm = () => {
    setEmail('');
    setPassword('');
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

  const toggleMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={logoImg} 
              alt="College Study" 
              className="h-12 w-12"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-800">College Study</h1>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Your Study Hub</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'otp' ? (
            /* OTP Verification Screen */
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="text-center pb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('form')}
                    className="absolute left-4 top-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Verify Your Email</CardTitle>
                  <CardDescription className="text-slate-500">
                    Enter the 6-digit code sent to<br />
                    <span className="font-medium text-slate-700">{email}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                        <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                        <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                        <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                        <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                        <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button
                    onClick={handleVerifyOTP}
                    className="w-full h-12 text-base font-medium"
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

                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-2">Didn't receive the code?</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResendOTP}
                      disabled={resendTimer > 0 || isLoading}
                      className="text-primary"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-slate-400">
                    By continuing, you agree to our{' '}
                    <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Sign In / Sign Up Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-center">
                    {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                  </CardTitle>
                  <CardDescription className="text-center text-slate-500">
                    {mode === 'signin' 
                      ? 'Sign in to continue your learning journey'
                      : 'Join thousands of students on College Study'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mode Toggle */}
                  <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                    <button
                      onClick={() => toggleMode('signin')}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                        mode === 'signin' 
                          ? 'bg-white text-slate-800 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => toggleMode('signup')}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                        mode === 'signup' 
                          ? 'bg-white text-slate-800 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
                    {mode === 'signup' && (
                      <>
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-slate-600">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              disabled={isLoading}
                              className="h-11"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-slate-600">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              disabled={isLoading}
                              className="h-11"
                            />
                          </div>
                        </div>

                        {/* Contact Number (Optional) */}
                        <div className="space-y-2">
                          <Label htmlFor="contactNo" className="text-slate-600">
                            Contact Number <span className="text-slate-400">(Optional)</span>
                          </Label>
                          <Input
                            id="contactNo"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            disabled={isLoading}
                            className="h-11"
                          />
                        </div>
                      </>
                    )}

                    {/* Email Field with Verification */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value.toLowerCase());
                            if (mode === 'signup') setEmailVerified(false);
                          }}
                          disabled={isLoading || (mode === 'signup' && emailVerified)}
                          className={`h-11 pr-24 ${
                            mode === 'signup' && emailVerified ? 'bg-green-50 border-green-300' : ''
                          }`}
                        />
                        {mode === 'signup' && (
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
                                onClick={handleSendOTP}
                                disabled={isLoading || !email}
                                className="text-primary hover:text-primary/80 h-8"
                              >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                      {mode === 'signup' && !emailVerified && (
                        <p className="text-xs text-slate-500">
                          Click "Verify" to receive a verification code
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-600">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                          className="h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {mode === 'signup' && password && (
                        <div className="space-y-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full transition-colors ${
                                  level <= passwordStrength.score 
                                    ? passwordStrength.color 
                                    : 'bg-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-slate-500">
                            Password strength: <span className="font-medium">{passwordStrength.label}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {mode === 'signup' && (
                      <>
                        {/* College Details */}
                        <div className="space-y-2">
                          <Label htmlFor="college" className="text-slate-600">College Name</Label>
                          <Input
                            id="college"
                            placeholder="e.g., HBTU Kanpur"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            disabled={isLoading}
                            className="h-11"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="branch" className="text-slate-600">Branch</Label>
                            <Input
                              id="branch"
                              placeholder="e.g., CSE"
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                              disabled={isLoading}
                              className="h-11"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="year" className="text-slate-600">Year</Label>
                            <Input
                              id="year"
                              placeholder="e.g., 2nd Year"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              disabled={isLoading}
                              className="h-11"
                            />
                          </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox
                            id="terms"
                            checked={acceptedTerms}
                            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                            disabled={isLoading}
                            className="mt-0.5"
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-slate-600 leading-tight"
                          >
                            I agree to the{' '}
                            <Link 
                              to="/terms-of-service" 
                              className="text-primary hover:underline font-medium"
                              target="_blank"
                            >
                              Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link 
                              to="/privacy-policy" 
                              className="text-primary hover:underline font-medium"
                              target="_blank"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium mt-6"
                      disabled={isLoading || (mode === 'signup' && (!emailVerified || !acceptedTerms))}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                        </>
                      ) : (
                        mode === 'signin' ? 'Sign In' : 'Create Account'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-slate-500 mt-6"
        >
          Made with ❤️ for HBTU Students
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;

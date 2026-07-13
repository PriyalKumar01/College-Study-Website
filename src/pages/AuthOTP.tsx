import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, User, BookOpen, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StudyBackground } from '@/components/StudyBackground';
import { validateEmail } from '@/utils/emailValidation';

interface FormData {
  fullName: string;
  username: string;
  mobileNumber: string;
  email: string;
}

interface SessionData {
  user_id: string;
  email?: string;
  phone?: string;
}

const AuthOTP = () => {
  const [authMode, setAuthMode] = useState<'email' | 'mobile'>('email');
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  
  // Check URL params for mode
  const urlParams = new URLSearchParams(window.location.search);
  const initialMode = urlParams.get('mode') === 'signup' ? false : true;
  const [isLogin, setIsLogin] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    mobileNumber: '',
    email: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    // For login mode, only validate the authentication field
    if (isLogin) {
      if (authMode === 'email' && !formData.email.trim()) {
        toast({
          title: "Email required",
          description: "Please enter your email address",
          variant: "destructive",
        });
        return false;
      }
      
      if (authMode === 'mobile' && !formData.mobileNumber.trim()) {
        toast({
          title: "Mobile number required",
          description: "Please enter your mobile number",
          variant: "destructive",
        });
        return false;
      }
      
      // Validate mobile number format for mobile login
      if (authMode === 'mobile') {
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(formData.mobileNumber)) {
          toast({
            title: "Invalid Mobile Number",
            description: "Please enter a valid 10-digit Indian mobile number",
            variant: "destructive",
          });
          return false;
        }
      }
      
      return true;
    }

    // For signup mode, validate all required fields
    if (!formData.fullName.trim()) {
      toast({
        title: "Full Name required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.username.trim()) {
      toast({
        title: "Username required", 
        description: "Please enter a username",
        variant: "destructive",
      });
      return false;
    }

    if (authMode === 'email' && !formData.email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return false;
    }

    if (authMode === 'mobile' && !formData.mobileNumber.trim()) {
      toast({
        title: "Mobile number required",
        description: "Please enter your mobile number",
        variant: "destructive",
      });
      return false;
    }

    // Validate mobile number format (Indian format)
    if (authMode === 'mobile') {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(formData.mobileNumber)) {
        toast({
          title: "Invalid Mobile Number",
          description: "Please enter a valid 10-digit Indian mobile number",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (authMode === 'email') {
        const validationResult = await validateEmail(formData.email);
        if (!validationResult.isValid) {
          toast({
            title: "Invalid Email Provider",
            description: "Temporary or disposable email accounts are not permitted on our platform to prevent abuse.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      const contact = authMode === 'email' ? formData.email : `+91${formData.mobileNumber}`;
      
      // For signup, we need to create user with metadata
      const signUpOptions = isLogin ? {} : {
        data: {
          full_name: formData.fullName,
          username: formData.username,
        }
      };
      
      const { error } = await supabase.auth.signInWithOtp({
        email: authMode === 'email' ? contact : undefined,
        phone: authMode === 'mobile' ? contact : undefined,
        options: {
          ...signUpOptions,
          shouldCreateUser: !isLogin // Only create user for signup
        }
      });

      if (error) {
        toast({
          title: "Error sending OTP",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your ${authMode}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      toast({
        title: "OTP required",
        description: "Please enter the OTP code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const contact = authMode === 'email' ? formData.email : `+91${formData.mobileNumber}`;
      
      let verifyParams;
      if (authMode === 'email') {
        verifyParams = {
          email: contact,
          token: otp,
          type: 'email' as const
        };
      } else {
        verifyParams = {
          phone: contact,
          token: otp,
          type: 'sms' as const
        };
      }
      
      const { data, error } = await supabase.auth.verifyOtp(verifyParams);

      if (error) {
        toast({
          title: "Invalid OTP",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.session && data.user) {
        // Only upsert profile for new signups (not returning users)
        if (!isLogin) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              user_id: data.user.id,
              email: authMode === 'email' ? formData.email : data.user.email,
              first_name: formData.fullName.split(' ')[0],
              last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
              mobile_number: authMode === 'mobile' ? `+91${formData.mobileNumber}` : null,
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }
        }

        setSessionData({
          user_id: data.user.id,
          email: data.user.email || formData.email,
          phone: authMode === 'mobile' ? `+91${formData.mobileNumber}` : undefined,
        });

        setStep('success');
        toast({
          title: "Welcome to College Study Hub!",
          description: "You have successfully logged in",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setStep('form');
    setSessionData(null);
    setOtp('');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const resetToForm = () => {
    setStep('form');
    setOtp('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: '',
      username: '',
      mobileNumber: '',
      email: ''
    });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <StudyBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <img 
                src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png" 
                alt="College Study Hub" 
                className="w-16 h-16"
              />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isLogin ? 'Login to College Study' : 'Join College Study Hub'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 'form' && (isLogin ? 'Enter your credentials to login' : 'Create your account to get started')}
              {step === 'otp' && `Enter the OTP sent to your ${authMode}`}
              {step === 'success' && 'Welcome! You are now logged in'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Login/Signup Toggle */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm">
                      <span className={isLogin ? 'font-medium text-primary' : 'text-muted-foreground'}>
                        Login
                      </span>
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                            isLogin ? 'translate-x-1' : 'translate-x-6'
                          }`}
                        />
                      </button>
                      <span className={!isLogin ? 'font-medium text-primary' : 'text-muted-foreground'}>
                        Signup
                      </span>
                    </div>
                  </div>

                  {/* Authentication Mode Toggle */}
                  <div className="flex rounded-lg bg-muted p-1">
                    <Button
                      type="button"
                      variant={authMode === 'email' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMode('email')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={authMode === 'mobile' ? 'default' : 'ghost'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMode('mobile')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Mobile
                    </Button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Show all fields for signup, only auth field for login */}
                    {!isLogin && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="fullName"
                              name="fullName"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="username"
                              name="username"
                              placeholder="Choose a unique username"
                              className="pl-10"
                              value={formData.username}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {authMode === 'mobile' && (
                      <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <div className="absolute left-10 top-3 text-sm text-muted-foreground">+91</div>
                          <Input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            placeholder={isLogin ? "Your mobile number" : "10-digit mobile number"}
                            className="pl-16"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>
                    )}

                    {authMode === 'email' && (
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={isLogin ? "Your email address" : "Enter your email"}
                            className="pl-10"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full btn-hero"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      `${isLogin ? 'Send Login Code' : 'Send Verification Code'}`
                    )}
                  </Button>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetToForm}
                    className="mb-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to form
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                    />
                  </div>

                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                    className="w-full btn-hero"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                </motion.div>
              )}

              {step === 'success' && sessionData && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium">Session Info</p>
                      <p className="text-xs text-muted-foreground">ID: {sessionData.user_id.slice(0, 8)}...</p>
                      {sessionData.email && (
                        <p className="text-xs text-muted-foreground">Email: {sessionData.email}</p>
                      )}
                      {sessionData.phone && (
                        <p className="text-xs text-muted-foreground">Phone: {sessionData.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleContinue} className="w-full btn-hero">
                      Continue to College Study Hub
                    </Button>
                    <Button onClick={handleSignOut} variant="outline" className="w-full">
                      Sign Out
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthOTP;
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import logoImg from '@/assets/college-study-hub-logo.png';

export function ProfileCompletionModal() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [hasChecked, setHasChecked] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [askForPassword, setAskForPassword] = useState(false);

    useEffect(() => {
        if (user && !hasChecked) {
            checkProfile();
        }
    }, [user, hasChecked]);

    const checkProfile = async () => {
        if (!user) return;

        try {
            // Check if user came from OAuth (provider != 'email')
            // or if they don't have a password set (hard to detect directly, but we can infer from provider)
            // 'email' provider usually implies password set via our signup flow, but OTP-only login is also 'email'.
            // best bet: if they are 'signup' mode from AuthModal, they set a password.
            // if they are OAuth, they            
            // Just defaulting askForPassword to false initially, calculated below
            // const isOAuth = user.app_metadata.provider !== 'email';
            // setAskForPassword(isOAuth); 

            // Check existing profile
            const { data, error } = await supabase
                .from("profiles")
                .select("first_name, college")
                .eq("id", user.id)
                .maybeSingle();

            if (error) {
                console.warn("Error checking profile:", error);
                return;
            }

            // Check metadata status
            const isMetaComplete = user.user_metadata?.profile_completed === true;

            // If data is missing/incomplete or metadata says explicitly incomplete
            if (!isMetaComplete || !data || !data.first_name || !data.college) {
                // Determine if we should ask for password:
                // 1. If OAuth (provider != email) -> YES
                // 2. If New User (no data in profiles) -> YES (Likely OTP signup needing password)
                // 3. If Existing User (data exists but incomplete) -> OPTIONAL (But user demanded it, so let's keep it visible)

                // My logic: If they are here, they need to complete profile. Setting a password is good practice.
                // Let's force it for everyone comfortably.
                setAskForPassword(true);

                // Pre-fill from metadata if available
                if (user.user_metadata) {
                    const { full_name, name, college: metaCollege, branch: metaBranch, year: metaYear } = user.user_metadata;

                    if ((full_name || name) && !firstName) {
                        const names = (full_name || name).split(' ');
                        setFirstName(names[0] || '');
                        setLastName(names.slice(1).join(' ') || '');
                    }
                    if (metaCollege && !college) setCollege(metaCollege);
                    if (metaBranch && !branch) setBranch(metaBranch);
                    if (metaYear && !year) setYear(metaYear);
                }
                setIsOpen(true);
            }

            setHasChecked(true);
        } catch (err) {
            console.error("Profile check failed:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!firstName || !college || !branch || !year) {
            toast({ title: "Required Fields", description: "Please fill in all details.", variant: "destructive" });
            return;
        }

        if (!acceptedTerms) {
            toast({ title: "Terms Required", description: "You must accept the Terms & Conditions.", variant: "destructive" });
            return;
        }

        if (askForPassword && !password) {
            toast({ title: "Password Required", description: "Please set a password for your account.", variant: "destructive" });
            return;
        }

        if (askForPassword || password) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isValidLength = password.length >= 6;

            if (!isValidLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
                toast({
                    title: "Weak Password",
                    description: "Please meet all password requirements highlighted in red.",
                    variant: "destructive"
                });
                return;
            }
        }

        setIsLoading(true);
        try {
            const updates = {
                id: user!.id,
                user_id: user!.id,
                email: user!.email,
                first_name: firstName,
                last_name: lastName,
                college,
                branch,
                year,
                updated_at: new Date().toISOString(),
            };

            // Robust Upsert Logic
            const { error } = await supabase
                .from("profiles")
                .upsert(updates)
                .select()
                .single();

            if (error) throw error;

            // Update auth metadata
            const authUpdates: any = {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    college,
                    branch,
                    year,
                    profile_completed: true
                }
            };

            // Only update password if provided
            if (password) {
                authUpdates.password = password;
            }

            const { error: userError } = await supabase.auth.updateUser(authUpdates);

            if (userError) throw userError;

            toast({ title: "Profile Updated", description: "You are all set!" });
            setIsOpen(false);

            // Optional: Refresh page to update UI context
            window.location.reload();

        } catch (error: any) {
            console.error("Profile update error:", error);
            toast({ title: "Error", description: error.message || "Failed to save profile.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const [showScrollArrow, setShowScrollArrow] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            // Hide arrow if we are near the bottom (within 20px)
            const isBottom = scrollTop + clientHeight >= scrollHeight - 20;
            setShowScrollArrow(!isBottom);
        }
    };

    // Initial check for scrollability
    useEffect(() => {
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            setShowScrollArrow(scrollHeight > clientHeight);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) return; // Prevent closing via state change from outside
            setIsOpen(open);
        }}>
            <DialogContent
                className="sm:max-w-md [&>button]:hidden max-h-[85vh] flex flex-col p-0 gap-0 rounded-lg overflow-hidden border-2 border-sky-500/20 bg-slate-50/95"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex flex-row items-center gap-4 space-y-0 p-6 pb-4 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shrink-0">
                    <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain" />
                    <div className="text-left">
                        <DialogTitle className="text-xl">Complete Your Profile</DialogTitle>
                        <DialogDescription>
                            Please provide a few details to continue.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Scrollable Content Area */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-6 px-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-sky-500/80 [&::-webkit-scrollbar-track]:bg-transparent"
                >
                    <form onSubmit={handleSubmit} className="space-y-5 pb-2">
                        {/* Form content starts here (padding adjusted) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Required" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>

                        {askForPassword && (
                            <div className="space-y-2">
                                <Label htmlFor="password">Create Password *</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter strong password"
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>

                                {/* Password Requirements Checklist */}
                                <div className="text-xs space-y-1 mt-2 p-2 bg-muted/50 rounded-md">
                                    <p className="font-semibold mb-1">Password must contain:</p>
                                    <div className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>{password.length >= 6 ? '✓' : '•'}</span>
                                        <span>At least 6 characters</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>{/[A-Z]/.test(password) ? '✓' : '•'}</span>
                                        <span>One uppercase letter (A-Z)</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${/[a-z]/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>{/[a-z]/.test(password) ? '✓' : '•'}</span>
                                        <span>One lowercase letter (a-z)</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>{/[0-9]/.test(password) ? '✓' : '•'}</span>
                                        <span>One number (0-9)</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '•'}</span>
                                        <span>One special character (!@#...)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="college">College Name *</Label>
                            <Input id="college" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="e.g. HBTU" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="branch">Branch *</Label>
                                <Input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. CSE" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year *</Label>
                                <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2nd Year" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(c) => setAcceptedTerms(c as boolean)} />
                            <label htmlFor="terms" className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I agree to <Link to="/terms" target="_blank" className="text-blue-600 hover:underline">Terms</Link> & <Link to="/privacy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save & Continue
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Fixed Scroll Indicator Overlay (Outside Scroll Area) */}
                {showScrollArrow && (
                    <div className="absolute bottom-4 right-6 pointer-events-none animate-bounce opacity-70 z-10 bg-white/80 rounded-full p-1 shadow-sm">
                        <ChevronDown className="h-6 w-6 text-sky-600" />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

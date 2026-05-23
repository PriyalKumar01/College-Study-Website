import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff, ChevronDown, School, UserCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import logoImg from '@/assets/college-study-hub-logo.png';

// ---------------------------------------------------------------------------
// Batch / Enrollment Year dropdown options
// ---------------------------------------------------------------------------
const YEAR_OPTIONS = [
    { value: "2015-older", label: "2015 or Older" },
    ...Array.from({ length: 2040 - 2016 + 1 }, (_, i) => ({
        value: String(2016 + i),
        label: String(2016 + i),
    })),
    { value: "Professor", label: "Professor" },
    { value: "Other", label: "Other (specify)" },
];

/** Returns true if the year string is a recognised dropdown value */
const isValidYearOption = (y: string) =>
    YEAR_OPTIONS.some((opt) => opt.value === y);

// ---------------------------------------------------------------------------
// HBTU detection helpers
// ---------------------------------------------------------------------------
/** Common abbreviations / spellings that mean HBTU Kanpur */
const HBTU_PATTERNS = [
    /\bhbtu\b/i,
    /harcourt\s+butler/i,
    /hbtu\s*kanpur/i,
    /hbtuk\b/i,
];

const isHBTUCollege = (name: string): boolean =>
    HBTU_PATTERNS.some((re) => re.test(name));

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ProfileCompletionModal() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Tracks whether this is a "quick update" for existing users (year + college only)
    // vs a full profile completion flow for new / incomplete users.
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    // Full-profile fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [otherYear, setOtherYear] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // College type selection for existing users ("hbtu" | "non-hbtu" | "")
    const [collegeType, setCollegeType] = useState<"hbtu" | "non-hbtu" | "">("");
    const [customCollege, setCustomCollege] = useState("");

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
            const { data, error } = await supabase
                .from("profiles")
                .select("first_name, last_name, college, branch, year")
                .eq("user_id", user.id)
                .maybeSingle();

            if (error) {
                console.warn("Error checking profile:", error);
                return;
            }

            const isMetaComplete = user.user_metadata?.profile_completed === true;

            // Existing year value (prefer DB, fall back to metadata)
            const existingYear: string = data?.year || user.user_metadata?.year || "";
            const yearNeedsUpdate = !isValidYearOption(existingYear);

            // Existing college value
            const existingCollege: string = data?.college || user.user_metadata?.college || "";

            // College "needs update" if it's clearly an HBTU variant but not yet normalised
            // OR if the profile is complete but college is the raw short-form
            const collegeIsHBTUVariant = existingCollege !== "" && isHBTUCollege(existingCollege) && existingCollege !== "HBTU Kanpur";
            const collegeNeedsUpdate = existingCollege === "" || collegeIsHBTUVariant;

            // ---------------------------------------------------------------
            // CASE 1 – Existing & already complete profiles that just need
            //           year + college updated (the "quick update" pop-up)
            // ---------------------------------------------------------------
            if (isMetaComplete && data && data.first_name && data.college && (yearNeedsUpdate || collegeNeedsUpdate)) {
                setIsUpdateMode(true);

                // Pre-fill names & branch (read-only in update mode, but kept for saving)
                setFirstName(data.first_name || user.user_metadata?.first_name || "");
                setLastName(data.last_name || user.user_metadata?.last_name || "");
                setBranch(data.branch || user.user_metadata?.branch || "");

                // Auto-resolve HBTU variants
                if (collegeIsHBTUVariant) {
                    setCollegeType("hbtu");
                    setCollege("HBTU Kanpur");
                } else if (existingCollege !== "") {
                    // Non-HBTU but needs normalisation (unlikely, but keep it filled)
                    setCollegeType("non-hbtu");
                    setCustomCollege(existingCollege);
                    setCollege(existingCollege);
                }
                // If existingCollege is empty, leave collegeType blank so user chooses

                setIsOpen(true);
                setHasChecked(true);
                return;
            }

            // ---------------------------------------------------------------
            // CASE 2 – New / incomplete profile (full completion flow)
            // ---------------------------------------------------------------
            if (!isMetaComplete || !data || !data.first_name || !data.college) {
                setIsUpdateMode(false);
                setAskForPassword(true);

                // Pre-fill from metadata if available
                if (user.user_metadata) {
                    const { full_name, name, college: metaCollege, branch: metaBranch, year: metaYear } = user.user_metadata;

                    if ((full_name || name) && !firstName) {
                        const names = (full_name || name).split(' ');
                        setFirstName(names[0] || '');
                        setLastName(names.slice(1).join(' ') || '');
                    }
                    if (metaBranch && !branch) setBranch(metaBranch);
                    // Only pre-fill year if already a valid dropdown value
                    if (metaYear && !year && isValidYearOption(metaYear)) setYear(metaYear);

                    // College pre-fill
                    if (metaCollege) {
                        if (isHBTUCollege(metaCollege)) {
                            setCollegeType("hbtu");
                            setCollege("HBTU Kanpur");
                        } else {
                            setCollegeType("non-hbtu");
                            setCustomCollege(metaCollege);
                            setCollege(metaCollege);
                        }
                    }
                }
                setIsOpen(true);
            }

            setHasChecked(true);
        } catch (err) {
            console.error("Profile check failed:", err);
        }
    };

    // The resolved college value to save
    const resolvedCollege =
        collegeType === "hbtu" ? "HBTU Kanpur" :
        collegeType === "non-hbtu" ? customCollege.trim() :
        college.trim();

    const finalYear = year === "Other" ? otherYear.trim() : year;

    // ---------------------------------------------------------------------------
    // HANDLER: Update Mode (year + college only)
    // ---------------------------------------------------------------------------
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!finalYear) {
            toast({ title: "Required", description: "Please select your batch / enrollment year.", variant: "destructive" });
            return;
        }
        if (year === "Other" && !otherYear.trim()) {
            toast({ title: "Required", description: "Please specify your year/batch.", variant: "destructive" });
            return;
        }
        if (!collegeType) {
            toast({ title: "Required", description: "Please tell us whether you are an HBTU student or not.", variant: "destructive" });
            return;
        }
        if (collegeType === "non-hbtu" && !customCollege.trim()) {
            toast({ title: "Required", description: "Please enter your college name.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            const updatesDB: any = {
                year: finalYear,
                college: resolvedCollege,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from("profiles")
                .update(updatesDB)
                .eq("user_id", user!.id);

            if (error) throw error;

            await supabase.auth.updateUser({
                data: {
                    year: finalYear,
                    college: resolvedCollege,
                    profile_completed: true,
                },
            });

            toast({ title: "Profile Updated ✓", description: "Your batch year and college have been saved!" });
            setIsOpen(false);
            window.location.reload();
        } catch (err: any) {
            toast({ title: "Error", description: err.message || "Failed to update profile.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------------
    // HANDLER: Full Profile Completion
    // ---------------------------------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !branch || !finalYear || !resolvedCollege) {
            toast({ title: "Required Fields", description: "Please fill in all details.", variant: "destructive" });
            return;
        }
        if (year === "Other" && !otherYear.trim()) {
            toast({ title: "Required Fields", description: "Please specify your year/batch.", variant: "destructive" });
            return;
        }
        if (!collegeType) {
            toast({ title: "Required", description: "Please indicate HBTU or Non-HBTU.", variant: "destructive" });
            return;
        }
        if (collegeType === "non-hbtu" && !customCollege.trim()) {
            toast({ title: "Required", description: "Please enter your full college name.", variant: "destructive" });
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
                toast({ title: "Weak Password", description: "Please meet all password requirements highlighted in red.", variant: "destructive" });
                return;
            }
        }

        setIsLoading(true);
        try {
            const updates = {
                user_id: user!.id,
                email: user!.email,
                first_name: firstName,
                last_name: lastName,
                college: resolvedCollege,
                branch,
                year: finalYear,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from("profiles")
                .upsert(updates, { onConflict: "user_id" })
                .select()
                .single();

            if (error) throw error;

            const authUpdates: any = {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    college: resolvedCollege,
                    branch,
                    year: finalYear,
                    profile_completed: true,
                },
            };
            if (password) authUpdates.password = password;

            const { error: userError } = await supabase.auth.updateUser(authUpdates);
            if (userError) throw userError;

            toast({ title: "Profile Updated", description: "You are all set!" });
            setIsOpen(false);
            window.location.reload();
        } catch (error: any) {
            console.error("Profile update error:", error);
            toast({ title: "Error", description: error.message || "Failed to save profile.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------------
    // Scroll indicator
    // ---------------------------------------------------------------------------
    const [showScrollArrow, setShowScrollArrow] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setShowScrollArrow(scrollTop + clientHeight < scrollHeight - 20);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            setShowScrollArrow(scrollHeight > clientHeight);
        }
    }, [isOpen]);

    // ---------------------------------------------------------------------------
    // College picker shared UI
    // ---------------------------------------------------------------------------
    const renderCollegePicker = (required = true) => (
        <div className="space-y-3">
            <Label>Are you an HBTU Student?{required && " *"}</Label>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => { setCollegeType("hbtu"); setCollege("HBTU Kanpur"); setCustomCollege(""); }}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-sm font-medium transition-all
                        ${collegeType === "hbtu"
                            ? "border-sky-500 bg-sky-50 text-sky-700"
                            : "border-gray-200 hover:border-sky-300 hover:bg-sky-50/40"
                        }`}
                >
                    <School className="h-5 w-5" />
                    HBTU Kanpur
                </button>
                <button
                    type="button"
                    onClick={() => { setCollegeType("non-hbtu"); setCollege(""); }}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-sm font-medium transition-all
                        ${collegeType === "non-hbtu"
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40"
                        }`}
                >
                    <UserCheck className="h-5 w-5" />
                    Other College
                </button>
            </div>
            {collegeType === "hbtu" && (
                <p className="text-xs text-sky-600 font-medium">✓ College set to: HBTU Kanpur</p>
            )}
            {collegeType === "non-hbtu" && (
                <Input
                    value={customCollege}
                    onChange={(e) => { setCustomCollege(e.target.value); setCollege(e.target.value); }}
                    placeholder="Enter your full college name"
                    className="mt-1"
                />
            )}
        </div>
    );

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) return; // Prevent closing
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
                        <DialogTitle className="text-xl">
                            {isUpdateMode ? "Update Your Profile" : "Complete Your Profile"}
                        </DialogTitle>
                        <DialogDescription>
                            {isUpdateMode
                                ? "We've added structured fields — please update your batch year and college."
                                : "Please provide a few details to continue."}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Scrollable Content Area */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-6 px-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-sky-500/80 [&::-webkit-scrollbar-track]:bg-transparent"
                >
                    {/* ====================================================
                        UPDATE MODE – year + college only
                    ==================================================== */}
                    {isUpdateMode ? (
                        <form onSubmit={handleUpdateSubmit} className="space-y-5 pb-2">
                            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                                👋 Hey <strong>{firstName || "there"}</strong>! We've upgraded our profile system.
                                Please select your <strong>batch/enrollment year</strong> from the new dropdown
                                and confirm your college. This helps us show you the right content!
                            </div>

                            {/* College picker */}
                            {renderCollegePicker(true)}

                            {/* Year dropdown */}
                            <div className="space-y-2">
                                <Label htmlFor="year-update">Batch / Enrollment Year *</Label>
                                <Select value={year} onValueChange={(val) => { setYear(val); if (val !== "Other") setOtherYear(""); }}>
                                    <SelectTrigger id="year-update" className="w-full">
                                        <SelectValue placeholder="Select your batch year" />
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
                                        onChange={(e) => setOtherYear(e.target.value)}
                                        placeholder="e.g. Faculty, 2014..."
                                        className="mt-2"
                                    />
                                )}
                            </div>

                            <div className="pt-2">
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save & Continue
                                </Button>
                            </div>
                        </form>
                    ) : (
                    /* ====================================================
                        FULL PROFILE COMPLETION
                    ==================================================== */
                        <form onSubmit={handleSubmit} className="space-y-5 pb-2">
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

                            {/* College picker */}
                            {renderCollegePicker(true)}

                            <div className="space-y-2">
                                <Label htmlFor="branch">Branch *</Label>
                                <Input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. CSE" />
                            </div>

                            {/* Year dropdown */}
                            <div className="space-y-2">
                                <Label htmlFor="year">Batch / Enrollment Year *</Label>
                                <Select value={year} onValueChange={(val) => { setYear(val); if (val !== "Other") setOtherYear(""); }}>
                                    <SelectTrigger id="year" className="w-full">
                                        <SelectValue placeholder="Select your batch year" />
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
                                        id="otherYear"
                                        value={otherYear}
                                        onChange={(e) => setOtherYear(e.target.value)}
                                        placeholder="e.g. Faculty, 2014..."
                                        className="mt-2"
                                    />
                                )}
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
                    )}
                </div>

                {/* Fixed Scroll Indicator */}
                {showScrollArrow && (
                    <div className="absolute bottom-4 right-6 pointer-events-none animate-bounce opacity-70 z-10 bg-white/80 rounded-full p-1 shadow-sm">
                        <ChevronDown className="h-6 w-6 text-sky-600" />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

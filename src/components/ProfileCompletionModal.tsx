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
import { Loader2, Eye, EyeOff, ChevronDown, School, UserCheck, CheckCircle2, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import logoImg from '@/assets/college-study-hub-logo.png';

// ---------------------------------------------------------------------------
// Batch / Graduating Year dropdown options
// ---------------------------------------------------------------------------
export const YEAR_OPTIONS = [
    { value: "2015-older", label: "2015 or Older" },
    ...Array.from({ length: 2040 - 2016 + 1 }, (_, i) => ({
        value: String(2016 + i),
        label: String(2016 + i),
    })),
    { value: "Professor", label: "Professor" },
    { value: "Other", label: "Other (specify)" },
];

export const isValidYearOption = (y: string) =>
    YEAR_OPTIONS.some((opt) => opt.value === y);

// Branch dropdown options
export const BRANCH_OPTIONS = [
    "Computer Science & Engineering (CSE)",
    "Information Technology (IT)",
    "Electronics Engineering (ET)",
    "Electrical Engineering (EE)",
    "Oil Technology (OT)",
    "Paint Technology (PT)",
    "Plastic Technology (PL)",
    "Chemical Engineering (CHE)",
    "Electronics & Communication Engineering (ECE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Leather & Fashion Technology (LFT)",
    "Food Technology (FT)",
    "Biochemical Engineering (BE)",
    "BioTechnology (BT)",
    "CSE - AI/ML",
    "Metallurgy",
    "Other",
];

const HBTU_PATTERNS = [
    /\bhbtu\b/i,
    /harcourt\s+butler/i,
    /hbtu\s*kanpur/i,
    /hbtuk\b/i,
];

const isHBTUCollege = (name: string): boolean =>
    HBTU_PATTERNS.some((re) => re.test(name));

// ---------------------------------------------------------------------------
// Shared styled field wrapper
// ---------------------------------------------------------------------------
const FieldGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-1.5">{children}</div>
);

const FieldLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
    <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide"
    >
        {children}
    </label>
);

const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent transition-all px-3 py-2.5 text-sm shadow-sm";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ProfileCompletionModal() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [otherYear, setOtherYear] = useState("");
    const [otherBranch, setOtherBranch] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

            const existingYear: string = data?.year || user.user_metadata?.year || "";
            const yearNeedsUpdate = !isValidYearOption(existingYear);

            const existingCollege: string = data?.college || user.user_metadata?.college || "";
            const collegeIsHBTUVariant = existingCollege !== "" && isHBTUCollege(existingCollege) && existingCollege !== "HBTU Kanpur";
            const collegeNeedsUpdate = existingCollege === "" || collegeIsHBTUVariant;
            
            const existingBranch: string = data?.branch || user.user_metadata?.branch || "";
            const branchNeedsUpdate = !existingBranch || (!BRANCH_OPTIONS.includes(existingBranch === "Other" ? "Other" : existingBranch) && !existingBranch);

            if (isMetaComplete && data && data.first_name && data.college && (yearNeedsUpdate || collegeNeedsUpdate || branchNeedsUpdate)) {
                setIsUpdateMode(true);
                setFirstName(data.first_name || user.user_metadata?.first_name || "");
                setLastName(data.last_name || user.user_metadata?.last_name || "");
                
                // Handle existing branch
                if (existingBranch && BRANCH_OPTIONS.includes(existingBranch)) {
                    setBranch(existingBranch);
                } else if (existingBranch) {
                    setBranch("Other");
                    setOtherBranch(existingBranch);
                }

                if (collegeIsHBTUVariant) {
                    setCollegeType("hbtu");
                    setCollege("HBTU Kanpur");
                } else if (existingCollege !== "") {
                    setCollegeType("non-hbtu");
                    setCustomCollege(existingCollege);
                    setCollege(existingCollege);
                }
                setIsOpen(true);
                setHasChecked(true);
                return;
            }

            if (!isMetaComplete || !data || !data.first_name || !data.college) {
                setIsUpdateMode(false);
                setAskForPassword(true);

                if (user.user_metadata) {
                    const { full_name, name, college: metaCollege, branch: metaBranch, year: metaYear } = user.user_metadata;

                    if ((full_name || name) && !firstName) {
                        const names = (full_name || name).split(' ');
                        setFirstName(names[0] || '');
                        setLastName(names.slice(1).join(' ') || '');
                    }
                    if (metaBranch && !branch) setBranch(metaBranch);
                    if (metaYear && !year && isValidYearOption(metaYear)) setYear(metaYear);

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

    const resolvedCollege =
        collegeType === "hbtu" ? "HBTU Kanpur" :
        collegeType === "non-hbtu" ? customCollege.trim() :
        college.trim();

    const finalYear = year === "Other" ? otherYear.trim() : year;
    const finalBranch = branch === "Other" ? otherBranch.trim() : branch;

    // ---------------------------------------------------------------------------
    // HANDLER: Update Mode
    // ---------------------------------------------------------------------------
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!finalYear) {
            toast({ title: "Required", description: "Please select your batch / Graduating year.", variant: "destructive" });
            return;
        }
        if (year === "Other" && !otherYear.trim()) {
            toast({ title: "Required", description: "Please specify your year/batch.", variant: "destructive" });
            return;
        }
        if (!collegeType) {
            toast({ title: "Required", description: "Please select HBTU or Other College.", variant: "destructive" });
            return;
        }
        if (collegeType === "non-hbtu" && !customCollege.trim()) {
            toast({ title: "Required", description: "Please enter your college name.", variant: "destructive" });
            return;
        }
        if (!finalBranch) {
            toast({ title: "Required", description: "Please select your branch.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.rpc("upsert_my_profile", {
                p_first_name: firstName || undefined,
                p_last_name: lastName || undefined,
                p_college: resolvedCollege,
                p_branch: finalBranch,
                p_year: finalYear,
                p_email: user!.email
            });

            if (error) throw error;

            await supabase.auth.updateUser({
                data: { year: finalYear, college: resolvedCollege, branch: finalBranch, profile_completed: true },
            });

            toast({ title: "Profile Updated ✓", description: "Your profile has been saved!" });
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

        if (!firstName || !finalBranch || !finalYear || !resolvedCollege) {
            toast({ title: "Required Fields", description: "Please fill in all details.", variant: "destructive" });
            return;
        }
        if (!collegeType) {
            toast({ title: "Required", description: "Please indicate HBTU or Other College.", variant: "destructive" });
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
        if (password) {
            const isOk = password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
            if (!isOk) {
                toast({ title: "Weak Password", description: "Please meet all password requirements.", variant: "destructive" });
                return;
            }
        }

        setIsLoading(true);
        try {
            const { error: rpcError } = await supabase.rpc("upsert_my_profile", {
                p_first_name: firstName,
                p_last_name: lastName,
                p_college: resolvedCollege,
                p_branch: finalBranch,
                p_year: finalYear,
                p_email: user!.email
            });

            if (rpcError) throw rpcError;

            const authUpdates: any = {
                data: { first_name: firstName, last_name: lastName, college: resolvedCollege, branch: finalBranch, year: finalYear, profile_completed: true },
            };
            if (password) authUpdates.password = password;

            const { error: userError } = await supabase.auth.updateUser(authUpdates);
            if (userError) throw userError;

            toast({ title: "Profile Saved ✓", description: "Welcome aboard! You're all set." });
            setIsOpen(false);
            window.location.reload();
        } catch (error: any) {
            console.error("Profile update error:", error);
            
            // Handle the case where the user was deleted from the database but still has a valid JWT session in the browser.
            if (error.message?.includes("foreign key constraint") || error.code === "23503") {
                toast({ 
                    title: "Session Invalid", 
                    description: "Your account appears to have been removed or session is invalid. Logging you out...", 
                    variant: "destructive" 
                });
                await supabase.auth.signOut();
                window.location.reload();
                return;
            }

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
    // College picker UI (shared)
    // ---------------------------------------------------------------------------
    const renderCollegePicker = () => (
        <FieldGroup>
            <FieldLabel>Are you an HBTU Student? <span className="text-red-500">*</span></FieldLabel>
            <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                    type="button"
                    onClick={() => { setCollegeType("hbtu"); setCollege("HBTU Kanpur"); setCustomCollege(""); }}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1
                        ${collegeType === "hbtu"
                            ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 dark:bg-sky-500/20 shadow-sm"
                            : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 dark:hover:border-sky-500"
                        }`}
                >
                    <School className="h-5 w-5" />
                    HBTU Kanpur
                </button>
                <button
                    type="button"
                    onClick={() => { setCollegeType("non-hbtu"); setCollege(""); }}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1
                        ${collegeType === "non-hbtu"
                            ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 dark:bg-violet-500/20 shadow-sm"
                            : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 dark:hover:border-violet-500"
                        }`}
                >
                    <UserCheck className="h-5 w-5" />
                    Other College
                </button>
            </div>
            {collegeType === "hbtu" && (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mt-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> College set to: HBTU Kanpur
                </p>
            )}
            {collegeType === "non-hbtu" && (
                <input
                    value={customCollege}
                    onChange={(e) => { setCustomCollege(e.target.value); setCollege(e.target.value); }}
                    placeholder="Enter your full college name"
                    className={inputClass + " mt-2"}
                />
            )}
        </FieldGroup>
    );

    // Password rules checker
    const pwdRules = [
        { label: "At least 6 characters", ok: password.length >= 6 },
        { label: "One uppercase letter (A-Z)", ok: /[A-Z]/.test(password) },
        { label: "One lowercase letter (a-z)", ok: /[a-z]/.test(password) },
        { label: "One number (0-9)", ok: /[0-9]/.test(password) },
        { label: "One special character (!@#...)", ok: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) return; setIsOpen(open); }}>
            <DialogContent
                className="sm:max-w-[480px] [&>button]:hidden max-h-[90vh] flex flex-col p-0 gap-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                {/* ── Header ── */}
                <DialogHeader className="flex flex-row items-center gap-4 space-y-0 px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-sky-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 shrink-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                        <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="text-left min-w-0">
                        <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            {isUpdateMode ? "Update Your Profile" : "Complete Your Profile"}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                            {isUpdateMode
                                ? "Please confirm your details to continue."
                                : "A few details and you're all set!"}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* ── Scrollable body ── */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sky-400/60 dark:[&::-webkit-scrollbar-thumb]:bg-sky-600/60 [&::-webkit-scrollbar-track]:transparent"
                >

                    {/* ========================================================
                        UPDATE MODE
                    ======================================================== */}
                    {isUpdateMode ? (
                        <form onSubmit={handleUpdateSubmit} className="space-y-5">
                            {/* Info banner */}
                            <div className="flex items-start gap-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 p-3.5">
                                <span className="text-xl leading-none mt-0.5">👋</span>
                                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                                    Hey <strong>{firstName || "there"}</strong>! Please update your{" "}
                                    <strong>branch</strong>, <strong>batch year</strong> and confirm your college.
                                </p>
                            </div>

                            {/* College */}
                            {renderCollegePicker()}

                            {/* Branch */}
                            <FieldGroup>
                                <FieldLabel htmlFor="branch-update">Branch <span className="text-red-500">*</span></FieldLabel>
                                <Select value={branch} onValueChange={(v) => { setBranch(v); if (v !== "Other") setOtherBranch(""); }}>
                                    <SelectTrigger id="branch-update" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 text-sm focus:ring-2 focus:ring-sky-500">
                                        <SelectValue placeholder="Select your branch" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 max-h-60">
                                        {BRANCH_OPTIONS.map((o) => (
                                            <SelectItem key={o} value={o} className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">{o}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {branch === "Other" && (
                                    <input value={otherBranch} onChange={(e) => setOtherBranch(e.target.value)} placeholder="e.g. Architecture, MBA..." className={inputClass + " mt-2"} />
                                )}
                            </FieldGroup>

                            {/* Year */}
                            <FieldGroup>
                                <FieldLabel htmlFor="year-update">Batch / Graduating Year <span className="text-red-500">*</span></FieldLabel>
                                <Select value={year} onValueChange={(v) => { setYear(v); if (v !== "Other") setOtherYear(""); }}>
                                    <SelectTrigger id="year-update" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 text-sm focus:ring-2 focus:ring-sky-500">
                                        <SelectValue placeholder="Select your batch year" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 max-h-60">
                                        {YEAR_OPTIONS.map((o) => (
                                            <SelectItem key={o.value} value={o.value} className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">{o.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {year === "Other" && (
                                    <input value={otherYear} onChange={(e) => setOtherYear(e.target.value)} placeholder="e.g. Faculty, 2014..." className={inputClass + " mt-2"} />
                                )}
                            </FieldGroup>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold py-3 text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            >
                                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Save & Continue
                            </button>
                        </form>

                    ) : (
                    /* ========================================================
                        FULL PROFILE COMPLETION
                    ======================================================== */
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name row */}
                            <div className="grid grid-cols-2 gap-3">
                                <FieldGroup>
                                    <FieldLabel htmlFor="firstName">First Name <span className="text-red-500">*</span></FieldLabel>
                                    <input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="e.g. Priyal"
                                        className={inputClass}
                                    />
                                </FieldGroup>
                                <FieldGroup>
                                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                    <input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="e.g. Kumar"
                                        className={inputClass}
                                    />
                                </FieldGroup>
                            </div>

                            {/* Password */}
                            {askForPassword && (
                                <FieldGroup>
                                    <FieldLabel htmlFor="password">Create Password <span className="text-red-500">*</span></FieldLabel>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a strong password"
                                            className={inputClass + " pr-10"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {password && (
                                        <div className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-1.5">
                                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Password requirements:</p>
                                            {pwdRules.map((r) => (
                                                <div key={r.label} className={`flex items-center gap-2 text-xs ${r.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                                    {r.ok
                                                        ? <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                                                        : <XCircle className="h-3.5 w-3.5 flex-shrink-0" />
                                                    }
                                                    <span>{r.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldGroup>
                            )}

                            {/* College picker */}
                            {renderCollegePicker()}

                            {/* Branch */}
                            <FieldGroup>
                                <FieldLabel htmlFor="branch">Branch <span className="text-red-500">*</span></FieldLabel>
                                <Select value={branch} onValueChange={(v) => { setBranch(v); if (v !== "Other") setOtherBranch(""); }}>
                                    <SelectTrigger id="branch" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 text-sm focus:ring-2 focus:ring-sky-500">
                                        <SelectValue placeholder="Select your branch" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 max-h-60">
                                        {BRANCH_OPTIONS.map((o) => (
                                            <SelectItem key={o} value={o} className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">{o}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {branch === "Other" && (
                                    <input
                                        id="otherBranch"
                                        value={otherBranch}
                                        onChange={(e) => setOtherBranch(e.target.value)}
                                        placeholder="e.g. Architecture, MBA..."
                                        className={inputClass + " mt-2"}
                                    />
                                )}
                            </FieldGroup>

                            {/* Year */}
                            <FieldGroup>
                                <FieldLabel htmlFor="year">Batch / Graduating Year <span className="text-red-500">*</span></FieldLabel>
                                <Select value={year} onValueChange={(v) => { setYear(v); if (v !== "Other") setOtherYear(""); }}>
                                    <SelectTrigger id="year" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 text-sm focus:ring-2 focus:ring-sky-500">
                                        <SelectValue placeholder="Select your batch year" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 max-h-60">
                                        {YEAR_OPTIONS.map((o) => (
                                            <SelectItem key={o.value} value={o.value} className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">{o.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {year === "Other" && (
                                    <input
                                        id="otherYear"
                                        value={otherYear}
                                        onChange={(e) => setOtherYear(e.target.value)}
                                        placeholder="e.g. Faculty, 2014..."
                                        className={inputClass + " mt-2"}
                                    />
                                )}
                            </FieldGroup>

                            {/* Terms */}
                            <div className="flex items-start gap-3 pt-1">
                                <Checkbox
                                    id="terms"
                                    checked={acceptedTerms}
                                    onCheckedChange={(c) => setAcceptedTerms(c as boolean)}
                                    className="mt-0.5 border-gray-300 dark:border-gray-600 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                                />
                                <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer">
                                    I agree to the{" "}
                                    <Link to="/terms" target="_blank" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">Terms of Service</Link>
                                    {" "}and{" "}
                                    <Link to="/privacy" target="_blank" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">Privacy Policy</Link>
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold py-3 text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Save & Continue
                            </button>
                        </form>
                    )}
                </div>

                {/* Scroll indicator */}
                {showScrollArrow && (
                    <div className="absolute bottom-4 right-5 pointer-events-none animate-bounce z-10">
                        <div className="bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-lg border border-gray-200 dark:border-gray-600">
                            <ChevronDown className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

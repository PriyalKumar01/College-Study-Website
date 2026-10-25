import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Loader2, School, UserCheck, CheckCircle2, Sparkles, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import logoImg from '@/assets/college-study-hub-logo.png';
import { isDirectlyAllowedDomain } from '@/utils/emailValidation';
import { parseHbtuRollNumber, resolveCleanUserName, isValidAcademicField } from '@/utils/userMetadataHelper';

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
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all px-3 py-2.5 text-sm shadow-sm";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ProfileCompletionModal() {
    const { user } = useAuth();
    const userEmail = (user?.email || '').toLowerCase().trim();
    const isHbtuRoll = Boolean(userEmail.endsWith('@hbtu.ac.in') && parseHbtuRollNumber(userEmail));
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [otherYear, setOtherYear] = useState("");
    const [otherBranch, setOtherBranch] = useState("");

    const [collegeType, setCollegeType] = useState<"hbtu" | "non-hbtu" | "">("");
    const [customCollege, setCustomCollege] = useState("");

    const [hasChecked, setHasChecked] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // Scroll indicator
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

    // Reset check status when user changes
    useEffect(() => {
        setHasChecked(false);
    }, [user?.id]);

    useEffect(() => {
        if (user && !hasChecked) {
            checkProfile();
        }
    }, [user, hasChecked]);

    // Explicit open & update listener
    useEffect(() => {
        const handleExplicitOpen = () => {
            setHasChecked(false);
            checkProfile();
            setIsOpen(true);
        };
        const handleProfileUpdated = () => {
            setHasChecked(false);
            checkProfile();
        };

        window.addEventListener('studyhub_open_profile_completion', handleExplicitOpen);
        window.addEventListener('studyhub_profile_updated', handleProfileUpdated);

        return () => {
            window.removeEventListener('studyhub_open_profile_completion', handleExplicitOpen);
            window.removeEventListener('studyhub_profile_updated', handleProfileUpdated);
        };
    }, [user]);

    const checkProfile = async () => {
        if (!user) return;

        try {
            // Safely fetch profile data from profiles table (prioritizing active session user_id)
            let data: any = null;
            try {
                const { data: byUid, error: uidErr } = await supabase
                    .from("profiles")
                    .select("id, user_id, email, first_name, last_name, college, branch, year")
                    .eq("user_id", user.id)
                    .order("updated_at", { ascending: false })
                    .limit(1);

                if (!uidErr && byUid && byUid.length > 0) {
                    data = byUid[0];
                } else if (user.email) {
                    const { data: byEmail } = await supabase
                        .from("profiles")
                        .select("id, user_id, email, first_name, last_name, college, branch, year")
                        .eq("email", user.email.toLowerCase().trim())
                        .order("updated_at", { ascending: false })
                        .limit(1);

                    if (byEmail && byEmail.length > 0) {
                        data = byEmail[0];
                    }
                }
            } catch (pErr) {
                console.warn("Could not query profiles table:", pErr);
            }

            const rawYear: string = (data?.year || user.user_metadata?.year || "").trim();
            const rawCollege: string = (data?.college || user.user_metadata?.college || "").trim();
            const rawBranch: string = (data?.branch || user.user_metadata?.branch || "").trim();
            const rawFirstName: string = (data?.first_name || user.user_metadata?.first_name || "").trim();

            const existingYear = isValidAcademicField(rawYear) ? rawYear : "";
            const existingCollege = isValidAcademicField(rawCollege) ? rawCollege : "";
            const existingBranch = isValidAcademicField(rawBranch) ? rawBranch : "";
            const existingFirstName = (rawFirstName && rawFirstName.toLowerCase() !== "user") ? rawFirstName : "";

            const collegeIsHBTUVariant = existingCollege !== "" && isHBTUCollege(existingCollege) && existingCollege !== "HBTU Kanpur";

            // A profile is strictly complete only if ALL 4 core fields (first_name, college, branch, year) are present, valid and profile_completed is true
            const hasCompleteDetails = Boolean(existingFirstName && existingCollege && existingBranch && existingYear);
            const isMetaComplete = user.user_metadata?.profile_completed === true && hasCompleteDetails;

            // If user already has genuinely complete details, NEVER show modal
            if (hasCompleteDetails && isMetaComplete) {
                setIsOpen(false);
                setHasChecked(true);
                try { localStorage.setItem(`profile_completed_${user.id}`, 'true'); } catch {}

                // Silent background cleanup if needed (normalize HBTU variant & link user_id)
                (async () => {
                    try {
                        const updates: any = {};
                        if (collegeIsHBTUVariant) updates.college = "HBTU Kanpur";
                        if (data && data.user_id !== user.id) updates.user_id = user.id;
                        if (Object.keys(updates).length > 0) {
                            if (user.email) {
                                await supabase.from("profiles").update(updates).eq("email", user.email.toLowerCase());
                            } else {
                                await supabase.from("profiles").update(updates).eq("id", user.id);
                            }
                        }
                    } catch (e) {
                        // Silent non-blocking background sync
                    }
                })();
                return;
            }

            // Incomplete details: Clear any stale localStorage flag so completion is strictly required
            try { localStorage.removeItem(`profile_completed_${user.id}`); } catch {}

            const userEmail = (user.email || '').toLowerCase().trim();
            const isHbtu = userEmail.endsWith('@hbtu.ac.in');
            const cleanUser = resolveCleanUserName(user.user_metadata, userEmail);

            const existingFirst = (data?.first_name || user.user_metadata?.first_name || cleanUser.firstName || '').trim();
            const existingLast = (data?.last_name || user.user_metadata?.last_name || cleanUser.lastName || '').trim();

            if (!firstName) {
                setFirstName(existingFirst);
                setLastName(existingLast);
            }

            if (isHbtu) {
                setCollegeType("hbtu");
                setCollege("HBTU Kanpur");
                const parsed = parseHbtuRollNumber(userEmail);
                if (parsed) {
                    if (!branch && parsed.branch) setBranch(parsed.branch);
                    if (!year && parsed.year) setYear(parsed.year);
                }
            } else {
                const validMetaCollege = existingCollege;
                if (validMetaCollege) {
                    if (isHBTUCollege(validMetaCollege)) {
                        setCollegeType("hbtu");
                        setCollege("HBTU Kanpur");
                    } else {
                        setCollegeType("non-hbtu");
                        setCustomCollege(validMetaCollege);
                        setCollege(validMetaCollege);
                    }
                } else {
                    setCollegeType("");
                    setCollege("");
                    setCustomCollege("");
                }

                if (existingBranch && !branch) setBranch(existingBranch);
                else if (!existingBranch) setBranch("");

                if (existingYear && !year && isValidYearOption(existingYear)) setYear(existingYear);
                else if (!existingYear) setYear("");
            }

            setAcceptedTerms(false);
            setIsOpen(true);
        } catch (err) {
            console.error("Profile check failed:", err);
            setHasChecked(true);
        }
    };

    const resolvedCollege =
        collegeType === "hbtu" ? "HBTU Kanpur" :
        collegeType === "non-hbtu" ? customCollege.trim() :
        college.trim();

    const finalYear = year === "Other" ? otherYear.trim() : year;
    const finalBranch = branch === "Other" ? otherBranch.trim() : branch;

    // ---------------------------------------------------------------------------
    // CORE HELPER: Persist Profile Data
    // ---------------------------------------------------------------------------
    const persistProfileData = async (
        targetFirstName: string,
        targetLastName: string,
        targetCollege: string,
        targetBranch: string,
        targetYear: string
    ) => {
        if (!user) throw new Error("No active session found.");

        const effectiveFirstName = targetFirstName.trim();
        const effectiveLastName = targetLastName.trim();
        const fullName = `${effectiveFirstName} ${effectiveLastName}`.trim() || user?.user_metadata?.name || user?.user_metadata?.full_name || '';
        const cleanEmail = (user.email || '').toLowerCase().trim();

        const userDomain = cleanEmail.split('@')[1] || '';
        const isDomainDirect = isDirectlyAllowedDomain(userDomain);
        const isOwnerOrAdmin = (cleanEmail === 'priyalkumar06@gmail.com');
        const approvalVal = (isDomainDirect || isOwnerOrAdmin) ? 'approved' : 'pending';

        let dbUpdated = false;
        let metaUpdated = false;

        // 1. Direct update or insert into public.profiles by user_id
        try {
            const { data: existingUserRow } = await supabase
                .from("profiles")
                .select("id")
                .eq("user_id", user.id)
                .limit(1);

            if (existingUserRow && existingUserRow.length > 0) {
                const { error: upErr } = await supabase
                    .from("profiles")
                    .update({
                        first_name: effectiveFirstName,
                        last_name: effectiveLastName,
                        college: targetCollege,
                        branch: targetBranch,
                        year: targetYear,
                        updated_at: new Date().toISOString()
                    })
                    .eq("user_id", user.id);

                if (!upErr) dbUpdated = true;
                else console.warn("Update by user_id notice:", upErr);
            } else if (cleanEmail) {
                const { data: existingEmailRow } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("email", cleanEmail)
                    .order("updated_at", { ascending: false })
                    .limit(1);

                if (existingEmailRow && existingEmailRow.length > 0) {
                    const { error: upEmailErr } = await supabase
                        .from("profiles")
                        .update({
                            user_id: user.id,
                            first_name: effectiveFirstName,
                            last_name: effectiveLastName,
                            college: targetCollege,
                            branch: targetBranch,
                            year: targetYear,
                            updated_at: new Date().toISOString()
                        })
                        .eq("id", existingEmailRow[0].id);

                    if (!upEmailErr) dbUpdated = true;
                    else console.warn("Update by email notice:", upEmailErr);
                } else {
                    const { error: insErr } = await supabase
                        .from("profiles")
                        .insert({
                            user_id: user.id,
                            email: cleanEmail,
                            first_name: effectiveFirstName,
                            last_name: effectiveLastName,
                            college: targetCollege,
                            branch: targetBranch,
                            year: targetYear,
                            approval_status: approvalVal,
                            updated_at: new Date().toISOString()
                        });

                    if (!insErr) dbUpdated = true;
                    else console.warn("Insert new profile notice:", insErr);
                }
            }
        } catch (upErr) {
            console.warn("Direct profiles update/insert notice:", upErr);
        }

        // 2. Call RPC helper as guaranteed fallback (SECURITY DEFINER)
        try {
            const { error: rpcErr } = await supabase.rpc("upsert_my_profile", {
                p_first_name: effectiveFirstName || undefined,
                p_last_name: effectiveLastName || undefined,
                p_college: targetCollege,
                p_branch: targetBranch,
                p_year: targetYear,
                p_email: cleanEmail
            });
            if (!rpcErr) dbUpdated = true;
            else console.warn("RPC upsert notice:", rpcErr);
        } catch (rpcErr) {
            console.warn("RPC upsert notice:", rpcErr);
        }

        // 3. Update Supabase Auth User Metadata
        try {
            const { error: metaErr } = await supabase.auth.updateUser({
                data: {
                    first_name: effectiveFirstName,
                    last_name: effectiveLastName,
                    name: fullName,
                    full_name: fullName,
                    college: targetCollege,
                    branch: targetBranch,
                    year: targetYear,
                    email: cleanEmail,
                    email_verified: true,
                    phone_verified: false,
                    profile_completed: true
                },
            });
            if (!metaErr) metaUpdated = true;
            else console.warn("updateUser metadata notice:", metaErr);
        } catch (uErr) {
            console.warn("updateUser metadata notice:", uErr);
        }

        if (!metaUpdated && !dbUpdated) {
            throw new Error("Unable to save profile details. Please try again.");
        }

        try {
            localStorage.setItem(`profile_completed_${user.id}`, 'true');
        } catch {}

        try {
            await supabase.auth.refreshSession();
        } catch (refErr) {
            console.warn("Session refresh notice:", refErr);
        }

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('studyhub_profile_updated'));
        }

        setHasChecked(true);
        setIsOpen(false);
    };

    // ---------------------------------------------------------------------------
    // HANDLER: Submit Profile Completion
    // ---------------------------------------------------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName.trim()) {
            toast({ title: "Name Required", description: "Please enter your first name.", variant: "destructive" });
            return;
        }
        if (!collegeType) {
            toast({ title: "College Required", description: "Please indicate HBTU or Other College.", variant: "destructive" });
            return;
        }
        if (collegeType === "non-hbtu" && !customCollege.trim()) {
            toast({ title: "College Required", description: "Please enter your full college name.", variant: "destructive" });
            return;
        }
        if (!finalBranch) {
            toast({ title: "Branch Required", description: "Please select your branch.", variant: "destructive" });
            return;
        }
        if (branch === "Other" && !otherBranch.trim()) {
            toast({ title: "Branch Required", description: "Please specify your branch.", variant: "destructive" });
            return;
        }
        if (!finalYear) {
            toast({ title: "Year Required", description: "Please select your batch / graduating year.", variant: "destructive" });
            return;
        }
        if (year === "Other" && !otherYear.trim()) {
            toast({ title: "Year Required", description: "Please specify your batch/year.", variant: "destructive" });
            return;
        }
        if (!acceptedTerms) {
            toast({ title: "Terms Required", description: "Please agree to the Terms of Service & Privacy Policy.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            await persistProfileData(firstName, lastName, resolvedCollege, finalBranch, finalYear);
            toast({ title: "Profile Saved ✓", description: "Welcome aboard! Your academic details have been saved." });
        } catch (error: any) {
            console.error("Profile update error:", error);
            toast({ title: "Save Failed", description: error.message || "Could not save profile details.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------------
    // College picker UI
    // ---------------------------------------------------------------------------
    const renderCollegePicker = () => (
        <FieldGroup>
            <FieldLabel>Are you an HBTU Student? <span className="text-red-500">*</span></FieldLabel>
            <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                    type="button"
                    onClick={() => { setCollegeType("hbtu"); setCollege("HBTU Kanpur"); setCustomCollege(""); }}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1
                        ${collegeType === "hbtu"
                            ? "border-emerald-600 bg-emerald-600/10 text-emerald-700 dark:text-emerald-500 dark:bg-emerald-600/20 shadow-sm"
                            : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-600/10 dark:hover:border-emerald-600"
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
                <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-500 mt-1">
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

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) return; setIsOpen(open); }}>
            <DialogContent
                hideDefaultClose={true}
                className="sm:max-w-[480px] max-h-[90vh] flex flex-col p-0 gap-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                {/* ── Header ── */}
                <DialogHeader className="flex flex-row items-center gap-4 space-y-0 px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-emerald-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 shrink-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                        <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="text-left min-w-0">
                        <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            Complete Your Profile
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                            Please provide your academic details to continue.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* ── Scrollable body ── */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-500/60 dark:[&::-webkit-scrollbar-thumb]:bg-emerald-700/60 [&::-webkit-scrollbar-track]:transparent"
                >
                    {isHbtuRoll && (
                        <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold">✨ HBTU Roll Number Auto-Detected</p>
                                <p className="opacity-90">We have pre-filled your college, branch, and graduating year. You can freely change them if your branch upgraded in 2nd year or if you are in a lateral entry / PG program.</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        {/* College picker */}
                        {renderCollegePicker()}

                        {/* Branch */}
                        <FieldGroup>
                            <FieldLabel htmlFor="branch">Branch <span className="text-red-500">*</span></FieldLabel>
                            <Select value={branch} onValueChange={(v) => { setBranch(v); if (v !== "Other") setOtherBranch(""); }}>
                                <SelectTrigger id="branch" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 text-sm focus:ring-2 focus:ring-emerald-600">
                                    <SelectValue placeholder="Select your branch" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-h-60">
                                    {BRANCH_OPTIONS.map((o) => (
                                        <SelectItem key={o} value={o} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-emerald-700 focus:text-white dark:focus:bg-emerald-700 dark:focus:text-white data-[highlighted]:bg-emerald-700 data-[highlighted]:text-white text-sm cursor-pointer">{o}</SelectItem>
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
                                <SelectTrigger id="year" className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-10 text-sm focus:ring-2 focus:ring-emerald-600">
                                    <SelectValue placeholder="Select your batch year" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-h-60">
                                    {YEAR_OPTIONS.map((o) => (
                                        <SelectItem key={o.value} value={o.value} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-emerald-700 focus:text-white dark:focus:bg-emerald-700 dark:focus:text-white data-[highlighted]:bg-emerald-700 data-[highlighted]:text-white text-sm cursor-pointer">{o.label}</SelectItem>
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

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mt-2">
                            <Checkbox
                                id="terms"
                                checked={acceptedTerms}
                                onCheckedChange={(c) => setAcceptedTerms(Boolean(c))}
                                className="mt-0.5 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                            <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-300 leading-snug cursor-pointer select-none">
                                I agree to the <Link to="/terms-conditions" target="_blank" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700">Terms of Service</Link> and <Link to="/privacy-policy" target="_blank" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-700">Privacy Policy</Link> of College Study Hub.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !acceptedTerms}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-violet-500 hover:from-emerald-700 hover:to-violet-600 text-white font-semibold py-3 text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-3"
                        >
                            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                            Complete Profile & Proceed
                        </button>
                    </form>
                </div>

                {/* Scroll indicator */}
                {showScrollArrow && (
                    <div className="absolute bottom-4 right-5 pointer-events-none animate-bounce z-10">
                        <div className="bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-lg border border-gray-200 dark:border-gray-600">
                            <ChevronDown className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

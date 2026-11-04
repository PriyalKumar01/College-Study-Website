import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PendingApprovalScreen from "@/components/PendingApprovalScreen";
import { isDirectlyAllowedDomain } from "@/utils/emailValidation";
import { ProfileCompletionModal } from "@/components/ProfileCompletionModal";

const ProtectedRoute = () => {
    const { user, loading, approvalStatus, refreshApprovalStatus, signOut, isOwner, isAdmin, isProfileComplete } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        const target = location.pathname + location.search + location.hash;
        try {
            sessionStorage.setItem('postLoginRedirect', target);
        } catch {
            // Ignore session storage error
        }
        return <Navigate to="/" replace state={{ from: target }} />;
    }

    // Check email verification for email-password accounts
    const isEmailAccount = user.app_metadata?.provider === 'email' || (user.app_metadata?.providers || []).includes('email');
    const isConfirmed = Boolean(user.email_confirmed_at || (user as any).confirmed_at || user.user_metadata?.email_verified === true);
    if (isEmailAccount && !isConfirmed) {
        return <Navigate to="/" replace state={{ error: 'Please verify your email address before accessing this page.' }} />;
    }

    const email = user.email?.toLowerCase().trim() || '';
    const domain = email.split('@')[1] || '';
    const isWhitelisted = isOwner || isAdmin || email === 'priyalkumar06@gmail.com' || isDirectlyAllowedDomain(domain);

    // Strict security check: Block pending unapproved accounts from accessing ANY protected inner route
    if (!isWhitelisted && approvalStatus === 'pending') {
        return (
            <PendingApprovalScreen
                userEmail={user.email}
                onRefresh={refreshApprovalStatus}
                onSignOut={signOut}
            />
        );
    }

    // MANDATORY PROFILE COMPLETION:
    // Any authenticated user (whether college email or @gmail.com) MUST complete their profile
    // before accessing any notes, semesters, dashboard, or protected interior page.
    if (!isProfileComplete) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                <ProfileCompletionModal inline={true} />
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
// Reviewed: academic catalog & interface consistency check (v2.0.49)

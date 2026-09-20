import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PendingApprovalScreen from "@/components/PendingApprovalScreen";

const ProtectedRoute = () => {
    const { user, loading, approvalStatus, refreshApprovalStatus, signOut } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        const target = location.pathname + location.search + location.hash;
        try { sessionStorage.setItem('postLoginRedirect', target); } catch {}
        return <Navigate to="/" replace state={{ from: target }} />;
    }

    // Check email verification for email-password accounts
    const isEmailAccount = user.app_metadata?.provider === 'email' || (user.app_metadata?.providers || []).includes('email');
    const isConfirmed = Boolean(user.email_confirmed_at || (user as any).confirmed_at || user.user_metadata?.email_verified === true);
    if (isEmailAccount && !isConfirmed) {
        return <Navigate to="/" replace state={{ error: 'Please verify your email address before accessing this page.' }} />;
    }

    // Strict security check: Block pending unapproved accounts from accessing ANY protected inner route
    if (approvalStatus === 'pending') {
        return (
            <PendingApprovalScreen
                userEmail={user.email}
                onRefresh={refreshApprovalStatus}
                onSignOut={signOut}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;

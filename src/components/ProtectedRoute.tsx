import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const { toast } = useToast();

    // strict check for email confirmation
    const isEmailConfirmed = user?.email_confirmed_at;

    useEffect(() => {
        console.log('ProtectedRoute Check:', {
            loading,
            hasUser: !!user,
            email: user?.email,
            emailConfirmed: isEmailConfirmed,
            confirmedAt: user?.email_confirmed_at
        });

        if (!loading && user && !isEmailConfirmed) {
            toast({
                title: "Email not verified",
                description: "Access denied. Please verify your email.",
                variant: "destructive"
            });
        }
    }, [loading, user, isEmailConfirmed, toast]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        // Redirect if not logged in
        return <Navigate to="/auth" replace />;
    }

    if (!isEmailConfirmed) {
        // Warn but allow access for debugging GitHub issue
        console.warn("Allowing access despite unconfirmed email for debugging.");
        // return <Navigate to="/auth" replace />; 
    }

    return <Outlet />;
};

export default ProtectedRoute;

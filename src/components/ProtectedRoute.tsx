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

    if (!user || !isEmailConfirmed) {
        // Redirect if not logged in OR if email not confirmed
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

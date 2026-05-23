import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        const target = location.pathname + location.search + location.hash;
        try { sessionStorage.setItem('postLoginRedirect', target); } catch {}
        return <Navigate to="/" replace state={{ from: target }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

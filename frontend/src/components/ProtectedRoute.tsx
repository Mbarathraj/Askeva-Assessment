import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        isAuthenticated,
        initialized,
    } = useAppSelector(state => state.auth);

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("customer" | "vendor")[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, getUserRole } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no role restrictions, allow access
  if (!allowedRoles) {
    return <>{children}</>;
  }

  // Check if user's role is allowed
  const userRole = getUserRole();
  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  // If user doesn't have the right role, redirect to their appropriate dashboard
  if (userRole === "vendor") {
    return <Navigate to="/vendor/dashboard" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

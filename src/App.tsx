import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { Layout, DashboardLayout, VendorDashboardLayout } from "@/components";
import {
  Home,
  Login,
  Register,
  Dashboard,
  CreateProject,
  Projects,
  ProjectDetail,
  VendorOnboarding,
} from "@/pages";

// Protected Route Component
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (without Sidebar) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Customer Protected Routes (with Customer Sidebar) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/* Customer Routes */}
        </Route>
        {/* Vendor Protected Routes (with Vendor Sidebar) */}

        <Route
          path="create-project"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CreateProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="vendor-onboarding" element={<VendorOnboarding />} />
          <Route path="projects" element={<Projects />} />
          <Route path="my-projects" element={<Projects />} />
          <Route path="team" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

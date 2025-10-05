import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  Layout,
  DashboardLayout,
  VendorDashboardLayout,
  ProtectedRoute,
} from "@/components";
import {
  Login,
  Register,
  Dashboard,
  CreateProject,
  Projects,
  ProjectDetail,
  VendorOnboarding,
  Profile,
  Notifications,
} from "@/pages";
import VendorDashboard from "@/pages/Dashboard/VendorDashboard";
import { useAuthStore } from "@/stores/auth";

// Smart redirect component based on user type
const SmartRedirect = () => {
  const { isAuthenticated, getUserRole } = useAuthStore();

  if (isAuthenticated) {
    const userRole = getUserRole();
    if (userRole === "vendor") {
      return <Navigate to="/vendor/dashboard" replace />;
    } else if (userRole === "customer") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If not logged in, show home page
  return <Login />;
};

// Protected Route Component
// const ProtectedRoute = ({
//   children,
//   allowedRoles,
// }: {
//   children: React.ReactNode;
//   allowedRoles?: string[];
// }) => {
//   // Temporarily disabled for development
//   console.log("Allowed roles:", allowedRoles);
//   return <>{children}</>;
// };

// Create router configuration
const router = createBrowserRouter([
  // Public Routes (without Sidebar)
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SmartRedirect />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "create-project",
        element: <CreateProject />,
      },
    ],
  },
  // Customer Protected Routes (with Customer Sidebar)
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  // Vendor Protected Routes (with Vendor Sidebar)
  {
    path: "/vendor",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/vendor/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <VendorDashboard />,
      },
      {
        path: "onboarding",
        element: <VendorOnboarding />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "my-projects",
        element: <Projects />,
      },
      {
        path: "team",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  // Catch all route
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

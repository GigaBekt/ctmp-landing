import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout, DashboardLayout, VendorDashboardLayout } from "@/components";
import {
  Login,
  Register,
  Dashboard,
  CreateProject,
  Projects,
  ProjectDetail,
  VendorOnboarding,
} from "@/pages";
import { type Account } from "@/api";

// Smart redirect component based on user type
const SmartRedirect = () => {
  // Check if user is logged in and has token
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (token && userString) {
    try {
      const userData = JSON.parse(userString);

      // Check if user has vendor organization
      const hasVendorOrg = userData.accounts?.some(
        (account: Account) => account.vendor_organization !== null
      );

      if (hasVendorOrg) {
        return <Navigate to="/vendor/dashboard" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Clear invalid data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return <Login />;
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
    ],
  },
  // Vendor Protected Routes (with Vendor Sidebar)
  {
    path: "/vendor",
    element: <VendorDashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/vendor/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
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

// Route paths constants
export const ROUTES = {
  // Public routes
  PUBLIC: {
    ROOT: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    CREATE_PROJECT: "/create-project",
  },

  // Customer routes
  CUSTOMER: {
    ROOT: "/dashboard",
    DASHBOARD: "/dashboard",
    PROJECTS: "/dashboard/projects",
    PROJECT_DETAIL: "/dashboard/projects/:id",
  },

  // Vendor routes
  VENDOR: {
    ROOT: "/vendor",
    DASHBOARD: "/vendor/dashboard",
    ONBOARDING: "/vendor/onboarding",
    PROJECTS: "/vendor/projects",
    MY_PROJECTS: "/vendor/my-projects",
    TEAM: "/vendor/team",
    PROJECT_DETAIL: "/vendor/projects/:id",
  },
} as const;

// Helper functions to build paths with IDs
export const buildPath = {
  customer: {
    dashboard: () => ROUTES.CUSTOMER.DASHBOARD,
    createProject: () => ROUTES.PUBLIC.CREATE_PROJECT,
    projects: () => ROUTES.CUSTOMER.PROJECTS,
    projectDetail: (id: string) => `/dashboard/projects/${id}`,
  },

  vendor: {
    dashboard: () => ROUTES.VENDOR.DASHBOARD,
    onboarding: () => ROUTES.VENDOR.ONBOARDING,
    projects: () => ROUTES.VENDOR.PROJECTS,
    myProjects: () => ROUTES.VENDOR.MY_PROJECTS,
    team: () => ROUTES.VENDOR.TEAM,
    projectDetail: (id: string) => `/vendor/projects/${id}`,
  },

  public: {
    home: () => ROUTES.PUBLIC.ROOT,
    login: () => ROUTES.PUBLIC.LOGIN,
    register: () => ROUTES.PUBLIC.REGISTER,
  },
};

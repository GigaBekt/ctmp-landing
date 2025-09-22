export interface DashboardStats {
  activeProjects: number;
  newBids: number;
  completedProjects: number;
}

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  value: number | string;
  iconBgColor: string;
  iconColor: string;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  bidsCount?: number;
  priceRange?: string;
  status?: "pending" | "active" | "completed";
}

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export interface ResourceItemProps {
  title: string;
  description: string;
}

// Dashboard specific interfaces
export interface Project {
  id: string;
  title: string;
  address: string;
  status: "pending" | "in_progress" | "in_review" | "completed";
  createdAt: string;
  jobType: string;
}

export interface Bid {
  id: string;
  projectId: string;
  vendorName: string;
  amount: number;
  status: "new" | "pending" | "accepted";
  createdAt: string;
}

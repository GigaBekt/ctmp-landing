interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending_review":
        return {
          bg: "bg-amber-100",
          text: "text-amber-800",
          label: "Pending Review",
        };
      case "draft":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Draft",
        };
      case "active_bidding":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          label: "Active & Bidding",
        };
      case "in_progress":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "In Progress",
        };
      case "completed":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
          label: "Completed",
        };
      case "canceled":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          label: "Canceled",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Unknown",
        };
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  const { bg, text, label } = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${bg} ${text}`}
    >
      {label}
    </span>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getStatusDescription = (status: string): string => {
  switch (status) {
    case "pending_review":
      return "Project is awaiting review and approval";
    case "draft":
      return "Project is in draft stage and being prepared";
    case "active_bidding":
      return "Project is active and receiving vendor bids";
    case "in_progress":
      return "Project is currently being worked on";
    case "completed":
      return "Project has been successfully completed";
    case "canceled":
      return "Project has been canceled";
    default:
      return "Unknown project status";
  }
};

export default StatusBadge;

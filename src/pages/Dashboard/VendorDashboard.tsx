import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard, EmptyState, ResourceItem, Button } from "@/components";
import {
  Lightning,
  Plus,
  Info,
  MapPin,
  ArrowRight,
  Users,
  CurrencyDollar,
  Clock,
  CheckCircle,
  Eye,
} from "phosphor-react";
import { useAuthStore } from "@/stores/auth";

// Mock data interfaces
interface VendorStats {
  activeBids: number;
  totalEarnings: number;
  completedProjects: number;
  averageRating: number;
}

interface BidProject {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: string;
  deadline: string;
  status: "open" | "submitted" | "accepted" | "rejected";
  customerName: string;
  createdAt: string;
  bidAmount?: number;
}

interface RecentActivity {
  id: string;
  type:
    | "bid_submitted"
    | "bid_accepted"
    | "project_completed"
    | "new_opportunity";
  message: string;
  timestamp: string;
  projectId?: string;
}

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<VendorStats>({
    activeBids: 0,
    totalEarnings: 0,
    completedProjects: 0,
    averageRating: 0,
  });
  const [availableProjects, setAvailableProjects] = useState<BidProject[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  // Mock data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock vendor data
      setStats({
        activeBids: 3,
        totalEarnings: 12500,
        completedProjects: 12,
        averageRating: 4.8,
      });

      setAvailableProjects([
        {
          id: "1",
          title: "HVAC System Installation",
          description:
            "Complete HVAC system installation for residential property",
          location: "Atlanta, GA",
          budget: "$3,000 - $5,000",
          deadline: "2024-01-25",
          status: "open",
          customerName: "John Smith",
          createdAt: "2024-01-15",
        },
        {
          id: "2",
          title: "AC Unit Replacement",
          description: "Replace existing AC unit with energy efficient model",
          location: "Marietta, GA",
          budget: "$2,500 - $4,000",
          deadline: "2024-01-30",
          status: "open",
          customerName: "Sarah Johnson",
          createdAt: "2024-01-14",
        },
        {
          id: "3",
          title: "Heating System Repair",
          description: "Diagnose and repair heating system issues",
          location: "Sandy Springs, GA",
          budget: "$1,000 - $2,500",
          deadline: "2024-01-20",
          status: "open",
          customerName: "Mike Davis",
          createdAt: "2024-01-13",
        },
      ]);

      setRecentActivity([
        {
          id: "1",
          type: "bid_accepted",
          message: "Your bid for 'Office HVAC Upgrade' was accepted",
          timestamp: "2024-01-15T10:30:00Z",
          projectId: "proj-123",
        },
        {
          id: "2",
          type: "new_opportunity",
          message: "New project 'HVAC System Installation' is available",
          timestamp: "2024-01-15T09:15:00Z",
          projectId: "proj-124",
        },
        {
          id: "3",
          type: "project_completed",
          message: "Project 'AC Unit Replacement' completed successfully",
          timestamp: "2024-01-14T16:45:00Z",
          projectId: "proj-125",
        },
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleViewAllProjects = () => {
    navigate("/vendor/projects");
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/vendor/projects/${projectId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "bid_accepted":
        return CheckCircle;
      case "new_opportunity":
        return Plus;
      case "project_completed":
        return CheckCircle;
      case "bid_submitted":
        return Clock;
      default:
        return Info;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "bid_accepted":
        return "text-green-600 bg-green-50";
      case "new_opportunity":
        return "text-blue-600 bg-blue-50";
      case "project_completed":
        return "text-purple-600 bg-purple-50";
      case "bid_submitted":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || "Vendor"}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Lightning}
          title="Active Bids"
          value={stats.activeBids}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={CurrencyDollar}
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed Projects"
          value={stats.completedProjects}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Available Projects */}
        <div className="lg:col-span-2 space-y-8">
          {/* Available Projects Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Plus className="text-blue-600" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Projects
                </h2>
              </div>
              {availableProjects.length > 0 && (
                <Button
                  onClick={handleViewAllProjects}
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRight size={16} />}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View All
                </Button>
              )}
            </div>

            {availableProjects.length > 0 ? (
              <div className="p-6 space-y-4">
                {availableProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleViewProject(project.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {project.location}
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollar className="w-3 h-3 mr-1" />
                            {project.budget}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimestamp(project.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {project.status}
                        </span>
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mx-6 mb-6">
                <EmptyState
                  title="No projects available"
                  description="Check back later for new project opportunities in your area"
                  actionLabel="Browse All Projects"
                  onAction={handleViewAllProjects}
                />
              </div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Clock className="text-purple-600" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Activity
                </h2>
              </div>

              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    const colorClasses = getActivityColor(activity.type);

                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`p-2 rounded-full ${colorClasses}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Resources */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Lightning className="w-5 h-5 mr-2 text-blue-600" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                onClick={handleViewAllProjects}
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Plus size={16} />}
              >
                Browse Projects
              </Button>
              <Button
                onClick={() => navigate("/vendor/projects")}
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Users size={16} />}
              >
                My Bids
              </Button>
              <Button
                onClick={() => navigate("/vendor/profile")}
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Info size={16} />}
              >
                Update Profile
              </Button>
            </div>
          </div>

          {/* Smart Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Lightning className="w-5 h-5 mr-2 text-gray-600" />
                AI Tips
              </h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                MVP 2.0
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Boost Your Success Rate
                    </p>
                    <p className="text-xs text-gray-600">
                      Bid on projects before 10 AM for 23% higher acceptance
                      rate
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Focus Your Efforts
                    </p>
                    <p className="text-xs text-gray-600">
                      Residential HVAC projects in your area have 40% higher
                      completion rates
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Improve Your Profile
                    </p>
                    <p className="text-xs text-gray-600">
                      Add customer photos to increase bid acceptance by 15%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Pricing Strategy
                    </p>
                    <p className="text-xs text-gray-600">
                      Projects under $3,000 in your area close 60% faster
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Resources
            </h2>
            <div className="space-y-3">
              <ResourceItem
                title="Bidding Best Practices"
                description="Tips to win more projects"
              />
              <ResourceItem
                title="Customer Communication"
                description="How to build better relationships"
              />
              <ResourceItem
                title="Pricing Guidelines"
                description="Competitive pricing strategies"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

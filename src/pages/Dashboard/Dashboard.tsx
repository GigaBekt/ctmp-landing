import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StatCard,
  EmptyState,
  ResourceItem,
  LatestBids,
  Button,
} from "@/components";
import {
  Lightning,
  ChartBar,
  Calendar,
  Plus,
  Info,
  MapPin,
  ArrowRight,
} from "phosphor-react";
import { type DashboardStats, type Project, type Bid } from "./interfaces";
import { useAuthStore } from "@/stores/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  console.log(user, "this is user");

  // Mock data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setProjects([]);
      setBids([]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const handleViewAllProjects = () => {
    navigate("/my-projects");
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  // Calculate stats from actual data
  const activeProjects = projects.filter((p) => p.status !== "completed");
  const stats: DashboardStats = {
    activeProjects: activeProjects.length,
    newBids: bids.filter((b) => b.status === "new").length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Lightning}
          title="Active Projects"
          value={stats.activeProjects}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={ChartBar}
          title="New Bids"
          value={stats.newBids}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon={Calendar}
          title="Completed Projects"
          value={stats.completedProjects}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Start New Project Card */}
          <div className="bg-gradient-to-r from-[#2c74b3] to-[#24609a] rounded-xl p-6 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <div className="w-full h-full bg-white rounded-full transform translate-x-4 -translate-y-4"></div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold mb-2 font-heading">
                  Start a New Project
                </h2>
                <p className="text-blue-100">
                  Create a new project and receive bids from <br />{" "}
                  professionals
                </p>
              </div>
              <button
                onClick={handleCreateProject}
                className="group bg-white hover:bg-gray-50 text-[#2c74b3] px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center shadow-md hover:shadow-lg"
              >
                <Plus size={18} className="mr-2" />
                Create Project
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Active Projects Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center p-6 ">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Lightning className="text-blue-600" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 font-heading">
                  Active Projects
                </h2>
              </div>
              {activeProjects.length > 0 && (
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

            {activeProjects.length > 0 ? (
              <div className="p-6 space-y-4">
                {activeProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1 capitalize">
                          {project.title} - {project.jobType}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {project.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{project.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mx-6 mb-6">
                <EmptyState
                  title="No active projects yet"
                  description="Create your first project to receive bids from qualified professionals"
                  actionLabel="Create New Project"
                  onAction={handleCreateProject}
                />
              </div>
            )}
          </div>

          {/* Latest Bids Section */}
          <LatestBids onCreateProject={handleCreateProject} />
        </div>

        {/* Right Column - Useful Resources */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center font-heading">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Useful Resources
            </h2>
            <div className="space-y-3">
              <ResourceItem
                title="How CTMP Works"
                description="Learn how our platform can help you"
              />
              <ResourceItem
                title="HVAC Systems Guide"
                description="Explore different types of HVAC systems"
              />
              <ResourceItem
                title="Frequently Asked Questions"
                description="Answers to common questions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

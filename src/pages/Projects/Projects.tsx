import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlass as Search,
  MapPin,
  Calendar,
  CaretDown as ChevronDown,
  Eye,
  DotsThree as MoreHorizontal,
  Wind,
  Lightning as Zap,
  Drop as Droplets,
  GridFour as Grid,
  House as HomeIcon,
  PaintBrush as PaintBucket,
  Trash as Trash2,
  Factory,
} from "phosphor-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { Project, StatusOption } from "./types";
import { ConfirmationModal } from "@/components/shared/Modal";
// import { useUserStore } from "@/stores/useUserStore";
import { projectsApi } from "@/api/projects";

// Project status options
const STATUS_OPTIONS: StatusOption[] = [
  { value: "all", label: "All Projects" },
  { value: "draft", label: "Draft" },
  { value: "pending_review", label: "Pending Review" },
  { value: "active_bidding", label: "Active & Bidding" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "canceled", label: "Canceled" },
];

// Service type mapping to icons
const SERVICE_ICONS = {
  hvac: Wind,
  electricity: Zap,
  plumbing: Droplets,
  flooring: Grid,
  roofing: HomeIcon,
  painting: PaintBucket,
  manufacturer: Factory,
} as Record<string, React.ComponentType<{ className?: string; size?: number }>>;

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
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
        return { bg: "bg-red-100", text: "text-red-800", label: "Canceled" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", label: "Unknown" };
    }
  };

  const { bg, text, label } = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {label}
    </span>
  );
};

// Service icon component
const ServiceIcon = ({ service }: { service: string }) => {
  const IconComponent =
    SERVICE_ICONS[service?.toLowerCase() as keyof typeof SERVICE_ICONS] || Wind;

  return (
    <div className="p-2 rounded-lg bg-gray-100">
      <IconComponent className="w-5 h-5 text-gray-600" />
    </div>
  );
};

// Action dropdown component
const ActionDropdown = ({
  project,
  onDelete,
  onView,
}: {
  project: Project;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1">
          <button
            onClick={() => {
              onView(project.id);
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>

          <button
            onClick={() => {
              onDelete(project.id);
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Project
          </button>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  // const { user } = useUserStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const getProjectsData = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getProjects();
      console.log("projects API response:", response);

      setProjects(response.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      return [];
    }

    return projects
      .filter((project) => {
        // Filter by status
        if (selectedStatus !== "all" && project.status !== selectedStatus) {
          return false;
        }

        // Filter by search query
        if (searchQuery) {
          const address = project.address || "";
          const serviceName = project.service?.name || "";
          if (
            !address.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !serviceName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const aValue = a[sortBy as keyof Project];
        const bValue = b[sortBy as keyof Project];

        if (sortOrder === "asc") {
          return (aValue ?? 0) < (bValue ?? 0) ? -1 : 1;
        } else {
          return (aValue ?? 0) > (bValue ?? 0) ? -1 : 1;
        }
      });
  }, [projects, selectedStatus, searchQuery, sortBy, sortOrder]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Truncate address to prevent UI breaking
  const truncateAddress = (address: string | null, maxLength = 40) => {
    if (!address) return "N/A";
    if (address.length <= maxLength) return address;
    return address.substring(0, maxLength) + "...";
  };

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Handle project actions
  const handleViewProject = (id: string) => {
    navigate(`/dashboard/projects/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      try {
        await projectsApi.deleteProject(projectToDelete);
        setProjects(projects.filter((p) => p.id !== projectToDelete));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }

    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2c74b3]"></div>
          <span className="ml-3 text-gray-600">Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">
          My Projects
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and track all your property service projects
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Status Filters - Scrollable on mobile, fixed on desktop */}
        <div className="w-full lg:flex-1 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-2 min-w-max lg:min-w-0 lg:flex-wrap">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedStatus === option.value
                    ? "bg-[#2c74b3] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-64 flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2c74b3] focus:border-[#2c74b3]"
          />
        </div>
      </div>

      {/* Desktop Table View - hidden on mobile */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="col-span-3 flex items-center gap-1 text-sm font-medium text-gray-700">
            <MapPin className="h-4 w-4" />
            Address
          </div>
          <div className="col-span-2 flex items-center gap-1 text-sm font-medium text-gray-700">
            Service
          </div>
          <div className="col-span-2 flex items-center gap-1 text-sm font-medium text-gray-700">
            Status
          </div>
          <div className="col-span-2 flex items-center gap-1 text-sm font-medium text-gray-700">
            House Type
          </div>
          <div
            className="col-span-2 flex items-center gap-1 text-sm font-medium text-gray-700 cursor-pointer"
            onClick={() => handleSortChange("createdAt")}
          >
            <Calendar className="h-4 w-4" />
            Created
            {sortBy === "createdAt" && (
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  sortOrder === "desc" ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
          <div className="col-span-1 text-sm font-medium text-gray-700 text-right">
            Actions
          </div>
        </div>

        {/* Table Body */}
        {filteredProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedStatus("all");
                setSearchQuery("");
              }}
              className="mt-4 text-[#2c74b3] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#2c74b3]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {truncateAddress(project.address)}
                  </p>
                  <p className="text-xs text-gray-500">{project.zip}</p>
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                <div className="flex items-center gap-3">
                  <ServiceIcon service={project.service?.name || "hvac"} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {project.service?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {project.hvac_project_details?.heat_source?.name?.replace(
                        "_",
                        " "
                      ) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                <StatusBadge status={project.status} />
              </div>

              <div className="col-span-2 flex items-center">
                <p className="text-sm text-gray-900 capitalize">
                  {project.home_type?.name || project.custom_home_type || "N/A"}
                </p>
              </div>

              <div className="col-span-2 flex items-center">
                <p className="text-sm text-gray-900">
                  {formatDate(project.created_at)}
                </p>
              </div>

              <div className="col-span-1 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleViewProject(project.id)}
                  className="p-2 text-gray-500 hover:text-[#2c74b3] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <ActionDropdown
                  project={project}
                  onView={handleViewProject}
                  onDelete={handleDeleteClick}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mobile Card View - visible on mobile only */}
      <div className="lg:hidden space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 px-6 py-12 text-center">
            <p className="text-gray-500">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedStatus("all");
                setSearchQuery("");
              }}
              className="mt-4 text-[#2c74b3] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {/* Header with Address and Actions */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[#2c74b3]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {truncateAddress(project.address, 30)}
                      </p>
                      <p className="text-xs text-gray-500">{project.zip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="p-2 text-gray-500 hover:text-[#2c74b3] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <ActionDropdown
                      project={project}
                      onView={handleViewProject}
                      onDelete={handleDeleteClick}
                    />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <StatusBadge status={project.status} />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Service</p>
                    <div className="flex items-center gap-2">
                      <ServiceIcon service={project.service?.name || "hvac"} />
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {project.service?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">House Type</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {project.home_type?.name ||
                        project.custom_home_type ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Created</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(project.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredProjects.length}</span>{" "}
          of <span className="font-medium">{projects.length}</span> projects
        </p>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Projects;

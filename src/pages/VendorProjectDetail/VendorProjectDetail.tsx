import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CurrencyCircleDollar,
  House,
  FileText,
} from "phosphor-react";

// Import components
import {
  ProjectHeader,
  ProjectIdDisplay,
  OverviewTab,
  DocumentsTab,
} from "../ProjectDetail/components";
import { VendorBiddingTab } from "./components";
import type { Project } from "./types";
import { Tabs } from "@/components/ui";
import { mockProject } from "./data";

const VendorProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!id) {
          setError("Project ID is required");
          return;
        }

        // Using mock data for testing - replace with real API call in production
        // const response = await projectsApi.getProjectById(id);
        // setProject(response);

        // Simulate API delay for realistic experience
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Set mock project with the current ID
        setProject({ ...mockProject, id });
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project details");
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard");
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProjectTabs = () => {
    if (!project) return [];

    return [
      {
        id: "bids",
        label: "My Bids",
        icon: <CurrencyCircleDollar className="w-4 h-4" />,
        content: <VendorBiddingTab />,
      },
      {
        id: "overview",
        label: "Overview",
        icon: <House className="w-4 h-4" />,
        content: (
          <OverviewTab project={project} formatDateTime={formatDateTime} />
        ),
      },
      {
        id: "documents",
        label: "Documents",
        icon: <FileText className="w-4 h-4" />,
        content: <DocumentsTab />,
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent mx-auto"></div>
            <p className="text-gray-600 font-medium">
              Loading project details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowLeft className="w-8 h-8 text-red-600" weight="bold" />
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-3">
              {error || "Project not found"}
            </h2>
            <p className="text-sm text-red-700 mb-6 leading-relaxed">
              The project you're looking for doesn't exist or couldn't be
              loaded. Please check the project ID and try again.
            </p>
            <Link
              to="/vendor/projects"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" weight="bold" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProjectHeader onShare={handleShare} onDelete={undefined} />

        <ProjectIdDisplay projectId={project.id} />

        <Tabs tabs={getProjectTabs()} className="mb-6" />
      </div>
    </div>
  );
};

export default VendorProjectDetail;

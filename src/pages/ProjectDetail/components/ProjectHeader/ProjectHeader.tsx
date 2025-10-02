import { Link } from "react-router-dom";
import { ArrowLeft, Share, Trash } from "phosphor-react";

interface ProjectHeaderProps {
  onShare: () => void;
  onDelete: () => void;
}

export function ProjectHeader({ onShare, onDelete }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="space-y-1">
        <Link
          to="/dashboard/projects"
          className="inline-flex items-center text-sm text-gray-600 hover:text-[#2c74b3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Project Details</h1>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onShare}
          className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 hover:border-red-300 transition-all font-medium shadow-sm"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete Project
        </button>
      </div>
    </div>
  );
}

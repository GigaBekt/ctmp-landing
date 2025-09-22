import { Plus } from "lucide-react";
import { type EmptyStateProps } from "@/pages/Dashboard/interfaces";

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus className="h-8 w-8 text-primary-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2 font-heading">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      <button
        onClick={onAction}
        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;

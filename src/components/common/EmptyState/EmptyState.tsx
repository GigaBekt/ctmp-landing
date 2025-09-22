import { Plus } from "phosphor-react";
import { Button } from "@/components/core";
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
        <Plus className="text-primary-500" size={32} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2 font-heading">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      <Button onClick={onAction} leftIcon={<Plus size={16} />}>
        {actionLabel}
      </Button>
    </div>
  );
};

export default EmptyState;

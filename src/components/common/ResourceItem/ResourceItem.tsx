import { type ResourceItemProps } from "@/pages/Dashboard/interfaces";

const ResourceItem = ({ title, description }: ResourceItemProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer bg-gray-50 hover:bg-gray-100">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default ResourceItem;

import { Plus, CreditCard } from "lucide-react";

interface LatestBidsProps {
  onCreateProject: () => void;
}

const LatestBids = ({ onCreateProject }: LatestBidsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-primary-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 font-heading">
            Latest Bids
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Receive bids from professionals
        </p>
      </div>
      
      <div className="p-8">
        <div className="text-center">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-heading">
            You haven't received any bids yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Create a project to receive bids from professionals and choose the best one
          </p>
          <button
            onClick={onCreateProject}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestBids;

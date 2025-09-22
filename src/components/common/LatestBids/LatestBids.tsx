import { Plus, CreditCard } from "phosphor-react";
import { Button } from "@/components/core";

interface LatestBidsProps {
  onCreateProject: () => void;
}

const LatestBids = ({ onCreateProject }: LatestBidsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 ">
        <div className="flex items-center">
          <div className="bg-primary-100 rounded-full p-2 mr-3">
            <CreditCard className="text-primary-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 font-heading">
              Latest Bids
            </h2>
            <p className="text-sm text-gray-500">
              Receive bids from professionals
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mx-6 mb-6">
        <div className="text-center">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="text-primary-600" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-heading">
            You haven't received any bids yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Create a project to receive bids from professionals and choose the
            best one
          </p>
          <Button
            onClick={onCreateProject}
            leftIcon={<Plus size={16} />}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            Create New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LatestBids;

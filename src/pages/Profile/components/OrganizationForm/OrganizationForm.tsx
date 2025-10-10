import { useForm } from "react-hook-form";
import { Card } from "@/components/ui";
import {
  WarningCircle as AlertCircle,
  FloppyDisk as Save,
  CheckCircle,
} from "phosphor-react";
import type { OrganizationData } from "@/stores/useUserStore";

interface OrganizationFormProps {
  organization: OrganizationData | null;
  onSubmit: (data: OrganizationData) => void;
  orgSuccess: boolean;
}

const legalStructures = [
  "Corporation",
  "LLC",
  "Partnership",
  "Sole Proprietor",
  "Non-Profit",
];

const OrganizationForm = ({
  organization,
  onSubmit,
  orgSuccess,
}: OrganizationFormProps) => {
  const {
    register: registerOrg,
    handleSubmit: handleSubmitOrg,
    formState: { errors: orgErrors },
  } = useForm<OrganizationData>({
    defaultValues: organization || {
      organizationName: "",
      legalStructure: legalStructures[0],
      einNumber: "",
      directorFirstName: "",
      directorLastName: "",
      businessAddress: "",
      businessCity: "",
      businessState: "",
      businessZip: "",
      businessPhone: "",
      businessEmail: "",
      licenseNumber: "",
      insuranceProvider: "",
      yearsInBusiness: "",
    },
  });

  const handleFormSubmit = (data: OrganizationData) => {
    onSubmit(data);
  };

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Organization Information
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Complete your business profile to increase customer confidence
        </p>
      </div>

      <form onSubmit={handleSubmitOrg(handleFormSubmit)} className="space-y-8">
        {/* Basic Organization Info */}
        <div className="space-y-6">
          <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Business Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...registerOrg("organizationName", {
                  required: "Organization name is required",
                })}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                placeholder="Your business name"
              />
              {orgErrors.organizationName && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {orgErrors.organizationName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legal Structure <span className="text-red-500">*</span>
              </label>
              <select
                {...registerOrg("legalStructure", {
                  required: "Legal structure is required",
                })}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
              >
                {legalStructures.map((structure) => (
                  <option key={structure} value={structure}>
                    {structure}
                  </option>
                ))}
              </select>
              {orgErrors.legalStructure && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {orgErrors.legalStructure.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                EIN Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...registerOrg("einNumber", {
                  required: "EIN number is required",
                })}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                placeholder="XX-XXXXXXX"
              />
              {orgErrors.einNumber && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {orgErrors.einNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years in Business
              </label>
              <input
                type="number"
                {...registerOrg("yearsInBusiness")}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                placeholder="5"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-6">
          <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Professional Credentials
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number
              </label>
              <input
                type="text"
                {...registerOrg("licenseNumber")}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                placeholder="Professional license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Provider
              </label>
              <input
                type="text"
                {...registerOrg("insuranceProvider")}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                placeholder="Insurance company name"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-8 py-3 text-sm font-medium text-white bg-[#2c74b3] rounded-lg hover:bg-[#1e5a8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c74b3] transition-colors"
          >
            <Save className="w-4 h-4 inline-block mr-2" />
            Save Organization Info
          </button>
        </div>

        {orgSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Organization information saved successfully!
            </span>
          </div>
        )}
      </form>
    </Card>
  );
};

export default OrganizationForm;

import { useState } from "react";
import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import type {
  InstallSpot,
  InstallLocation,
} from "@/api/services/interface/hvac-interfaces";

const SystemDetailsStep = ({
  title,
  subTitle,
  installSpots,
  installLocations,
}: IWizardStepsProps & {
  installSpots: InstallSpot[];
  installLocations: InstallLocation[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string>("");
  const [customRequirements, setCustomRequirements] = useState("");

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(option);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-6">
        {/* Installation Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Installation Requirements (select all that apply)
          </h3>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Install Locations
            </h3>
            {installLocations.map((option) => (
              <SelectableInput
                key={option.id}
                id={option.id}
                selected={selectedOptions}
                onChange={handleOptionToggle}
                name={option.name}
              />
            ))}

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Install Spots
            </h3>
            {installSpots.map((option) => (
              <SelectableInput
                key={option.id}
                id={option.id}
                selected={selectedOptions}
                onChange={handleOptionToggle}
                name={option.name}
              />
            ))}
          </div>
        </div>

        {/* Custom Requirements */}
        {(selectedOptions === "Other (please specify)" ||
          customRequirements) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Additional Requirements or Specifications
            </label>
            <textarea
              placeholder="Please describe any specific requirements, preferences, or details about your installation..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0 resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Providing detailed installation preferences
            helps contractors give you more accurate quotes and plan their work
            efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemDetailsStep;

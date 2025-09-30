import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import type { HomeType } from "@/api/services/interface";
import { updateProject } from "@/api/create-project/create.project";

const HomeDetailsStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & { homeTypes: HomeType[] }
>(({ title, subTitle, homeTypes }, ref) => {
  const [selectedHomeType, setSelectedHomeType] = useState<HomeType | null>(
    null
  );
  const [otherText, setOtherText] = useState("");

  // Wizard store
  const { data, setHomeDetailsData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.homeDetails) {
      setSelectedHomeType(data.homeDetails.selectedHomeType);
    }
  }, [data.homeDetails]);

  const handleHomeTypeSelect = (homeType: HomeType) => {
    setSelectedHomeType(homeType);
    if (homeType.key !== "other") {
      setOtherText("");
    }
  };

  // Function to update home details
  const handleUpdateHomeDetails = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedHomeType) {
        await updateProject(data.projectId, {
          home_type_id: selectedHomeType.id,
        });
        console.log("Home details updated successfully:", selectedHomeType.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating home details:", error);
      return false;
    }
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedHomeType) {
      return false;
    }

    // If "other" is selected, check if otherText is provided
    if (selectedHomeType.key === "other" && !otherText.trim()) {
      return false;
    }

    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedHomeType,
    };
    // Save to store
    setHomeDetailsData(stepData);

    // Update home details and check if successful
    const homeDetailsUpdated = await handleUpdateHomeDetails();

    // Return both data and success status
    return { data: stepData, success: homeDetailsUpdated };
  };

  // Expose validation and data functions to parent component
  useImperativeHandle(ref, () => ({
    validate: validateStep,
    getData: getStepData,
  }));

  const sortedHomeTypes = homeTypes?.sort((a, b) => {
    if (a.key === "other") return 1;
    if (b.key === "other") return -1;
    return 0;
  });

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-3">
        {sortedHomeTypes?.map((homeType) => (
          <SelectableInput
            key={homeType.id}
            id={homeType.id}
            selected={selectedHomeType?.id ?? ""}
            onChange={handleHomeTypeSelect}
            name={homeType.name}
            value={homeType}
          />
        ))}
      </div>

      {/* Other Home Type Input */}
      {selectedHomeType?.key === "other" && (
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Please specify your property type
          </label>
          <textarea
            placeholder="Describe your property type..."
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0 resize-none"
            rows={3}
          />
        </div>
      )}
    </div>
  );
});

HomeDetailsStep.displayName = "HomeDetailsStep";

export default HomeDetailsStep;

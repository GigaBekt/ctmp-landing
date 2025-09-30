import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import {
  type HeatSource,
  type HeatSourceChild,
} from "@/api/services/interface/hvac-interfaces";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import { updateHvacDetails } from "@/api/create-project/hvac/hvac.update";

interface HeatSourceStepProps {
  title: string;
  heatSources?: HeatSource[];
}

const HeatSourceStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & HeatSourceStepProps
>(({ heatSources = [], title, subTitle }, ref) => {
  const [selectedSystemType, setSelectedSystemType] =
    useState<HeatSource | null>(null);
  const [selectedSystemTypeChild, setSelectedSystemTypeChild] =
    useState<HeatSourceChild | null>(null);
  const [otherText, setOtherText] = useState("");

  // Wizard store
  const { data, setHeatSourceData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.heatSource) {
      setSelectedSystemType(data.heatSource.selectedHeatSource);
    }
  }, [data.heatSource]);

  const handleSystemTypeSelect = (systemType: HeatSource) => {
    setSelectedSystemType(systemType);
    // if (systemType.key !== "other") {
    //   setOtherText("");
    // }
  };

  const handleSystemTypeSelectChild = (systemTypeChild: HeatSourceChild) => {
    setSelectedSystemTypeChild(systemTypeChild);
    // if (systemTypeChild.key !== "other") {
    //   setOtherText("");
    // }
  };
  console.log(data.projectId, "data.projectId");
  // Function to update heat source
  const handleUpdateHeatSource = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedSystemTypeChild) {
        await updateHvacDetails(data.projectId, {
          heat_source_id: selectedSystemTypeChild.id,
        });
        console.log(
          "Heat source updated successfully:",
          selectedSystemTypeChild.id
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating heat source:", error);
      return false;
    }
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedSystemType) {
      return false;
    }

    if (!selectedSystemTypeChild) {
      return false;
    }

    // If "other" is selected, check if otherText is provided
    if (selectedSystemType?.key === "other" && !otherText.trim()) {
      return false;
    }

    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedHeatSource: selectedSystemType,
    };
    // Save to store
    setHeatSourceData(stepData);

    // Update heat source and check if successful
    const heatSourceUpdated = await handleUpdateHeatSource();

    // Return both data and success status
    return { data: stepData, success: heatSourceUpdated };
  };

  // Expose validation and data functions to parent component
  useImperativeHandle(ref, () => ({
    validate: validateStep,
    getData: getStepData,
  }));
  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {heatSources?.map((systemType) => (
          <SelectableInput
            key={systemType.id}
            id={systemType.id}
            selected={selectedSystemType?.id ?? ""}
            onChange={handleSystemTypeSelect}
            name={systemType.name}
            value={systemType}
          />
        ))}
      </div>

      {/* render selected heat sorce children */}
      {selectedSystemType && (
        <div className="mt-6 space-y-3">
          <h3 className="text-md font-medium text-gray-900 mb-4">
            Choose System Type
          </h3>
          {selectedSystemType.children?.map((child) => (
            <SelectableInput
              key={child.id}
              id={child.id}
              selected={selectedSystemTypeChild?.id ?? ""}
              onChange={handleSystemTypeSelectChild}
              name={child.name}
              value={child}
            />
          ))}
        </div>
      )}
      {/* Other System Input */}
      {selectedSystemType?.key === "other" && (
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Please specify your system type
          </label>
          <textarea
            placeholder="Describe your system or needs..."
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

HeatSourceStep.displayName = "HeatSourceStep";

export default HeatSourceStep;

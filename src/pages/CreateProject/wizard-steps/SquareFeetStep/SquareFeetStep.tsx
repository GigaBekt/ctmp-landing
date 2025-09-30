import { useState, forwardRef, useImperativeHandle, useEffect } from "react";

import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import { updateHvacDetails } from "@/api/create-project/hvac/hvac.update";
import type { UnitVolume } from "@/api/services/interface/hvac-interfaces";

const SquareFeetStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & { unitVolumes: UnitVolume[] }
>(({ title, subTitle, unitVolumes }, ref) => {
  const [selectedSize, setSelectedSize] = useState<UnitVolume | null>(null);
  const [customSize, setCustomSize] = useState("");

  // Wizard store
  const { data, setSquareFeetData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.squareFeet) {
      setSelectedSize(data.squareFeet.selectedUnitVolume);
    }
  }, [data.squareFeet]);

  const handleSizeSelect = (size: UnitVolume) => {
    setSelectedSize(() => size);
  };

  // Function to update square feet
  const handleUpdateSquareFeet = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedSize) {
        await updateHvacDetails(data.projectId, {
          hvac_unit_volume_id: selectedSize.id,
          custom_unit_volume:
            selectedSize.id === "custom" ? customSize.trim() : undefined,
        });
        console.log("Square feet updated successfully:", selectedSize.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating square feet:", error);
      return false;
    }
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedSize) {
      return false;
    }

    // If custom is selected, check if customSize is provided
    if (selectedSize.id === "custom" && !customSize.trim()) {
      return false;
    }

    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedUnitVolume: selectedSize,
    };
    // Save to store
    setSquareFeetData(stepData);

    // Update square feet and check if successful
    const squareFeetUpdated = await handleUpdateSquareFeet();

    // Return both data and success status
    return { data: stepData, success: squareFeetUpdated };
  };

  // Expose validation and data functions to parent component
  useImperativeHandle(ref, () => ({
    validate: validateStep,
    getData: getStepData,
  }));

  return (
    <div className="max-w-2xl mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {unitVolumes?.map((size) => (
          <SelectableInput
            key={size.id}
            id={size.id}
            selected={selectedSize?.id ?? ""}
            onChange={(e) => handleSizeSelect(e)}
            name={size.text}
            value={size}
          />
        ))}

        {/* Custom Size Option */}
        <label
          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedSize?.id === "custom"
              ? "border-[#2c74b3] bg-blue-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="size"
              value="custom"
              checked={selectedSize?.id === "custom"}
              onChange={() =>
                setSelectedSize({
                  id: "custom",
                  text: "custom",
                  tonnage: 0,
                  projects_count: 0,
                  created_at: "",
                  updated_at: "",
                })
              }
              className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
            />
            <span className="ml-3 text-gray-700 font-medium">
              Enter exact square footage
            </span>
          </div>
        </label>
      </div>

      {selectedSize?.id === "custom" && (
        <div className="mt-6">
          <input
            type="number"
            placeholder="Enter square footage"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0"
          />
        </div>
      )}
    </div>
  );
});

SquareFeetStep.displayName = "SquareFeetStep";

export default SquareFeetStep;

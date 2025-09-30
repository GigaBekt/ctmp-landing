import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { type Manufacturer } from "@/api/services/interface";

import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import { updateProject } from "@/api/create-project/create.project";

interface ManufacturerStepProps {
  manufacturers?: Manufacturer[];
}

const ManufacturerStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & ManufacturerStepProps
>(({ title, subTitle, manufacturers = [] }, ref) => {
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);
  const [otherText, setOtherText] = useState("");

  // Wizard store
  const { data, setManufacturerData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.manufacturer) {
      setSelectedManufacturer(data.manufacturer.selectedManufacturer);
      setOtherText(data.manufacturer.otherText);
    }
  }, [data.manufacturer]);

  const handleUpdateManufacturer = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedManufacturer) {
        await updateProject(data.projectId, {
          manufacturer_id: selectedManufacturer.id,
        });
        console.log(
          "Manufacturer updated successfully:",
          selectedManufacturer.id
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating manufacturer:", error);
      return false;
    }
  };

  const handleManufacturerSelect = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer);
    if (manufacturer.key !== "other") {
      setOtherText("");
    }
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText(text);
  };

  const validateStep = (): boolean => {
    if (!selectedManufacturer) {
      return false;
    }

    if (selectedManufacturer.key === "other" && !otherText.trim()) {
      return false;
    }

    return true;
  };

  const getStepData = async () => {
    const stepData = {
      selectedManufacturer,
      otherText,
    };

    // Save to wizard store
    setManufacturerData(stepData);

    // Update project with manufacturer
    const manufacturerUpdated = await handleUpdateManufacturer();

    return {
      data: stepData,
      success: manufacturerUpdated,
    };
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    validate: validateStep,
    getData: getStepData,
  }));

  console.log(manufacturers);
  return (
    <div className="flex flex-col h-full">
      <Header title={title} subTitle={subTitle} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {manufacturers?.map((manufacturer) => (
              <SelectableInput
                key={manufacturer.id}
                id={manufacturer.id}
                name={manufacturer.name}
                value={manufacturer}
                selected={selectedManufacturer?.id ?? ""}
                onChange={() => handleManufacturerSelect(manufacturer)}
              />
            ))}
          </div>

          {selectedManufacturer?.key === "other" && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify the manufacturer
              </label>
              <textarea
                value={otherText}
                onChange={(e) => handleOtherTextChange(e.target.value)}
                placeholder="Enter manufacturer name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ManufacturerStep.displayName = "ManufacturerStep";

export default ManufacturerStep;

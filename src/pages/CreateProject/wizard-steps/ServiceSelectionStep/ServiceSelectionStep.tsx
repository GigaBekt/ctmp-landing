import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { type Service } from "@/api/services/interface";

import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import { updateProject } from "@/api/create-project/create.project";

interface ServiceSelectionStepProps {
  services?: Service[];
}

const ServiceSelectionStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & ServiceSelectionStepProps
>(({ title, subTitle, services = [] }, ref) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [otherText, setOtherText] = useState("");

  // Wizard store
  const { data, setServiceSelectionData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.serviceSelection) {
      setSelectedService(data.serviceSelection.selectedService);
      setOtherText(data.serviceSelection.otherText);
    }
  }, [data.serviceSelection]);

  const handleUpdateService = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedService) {
        await updateProject(data.projectId, {
          service_id: selectedService.id,
        });
        console.log("Service updated successfully:", selectedService.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating service:", error);
      return false;
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedService) {
      return false;
    }

    // If "other" is selected, check if otherText is provided
    if (selectedService?.id === "other" && !otherText.trim()) {
      return false;
    }

    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedService,
      otherText: selectedService?.id === "other" ? otherText.trim() : "",
    };
    // Save to store
    setServiceSelectionData(stepData);

    // Update service and check if successful
    const serviceUpdated = await handleUpdateService();

    // Return both data and success status
    return { data: stepData, success: serviceUpdated };
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
        {services?.map((serviceOption) => (
          <SelectableInput
            key={serviceOption.id}
            id={serviceOption.id}
            selected={selectedService?.id ?? ""}
            onChange={handleServiceSelect}
            name={serviceOption.name}
            value={serviceOption}
          />
        ))}
      </div>

      {/* Other Service Input */}
      {selectedService?.id === "other" && (
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Please specify your service needs
          </label>
          <textarea
            placeholder="Describe what service you need..."
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

ServiceSelectionStep.displayName = "ServiceSelectionStep";

export default ServiceSelectionStep;

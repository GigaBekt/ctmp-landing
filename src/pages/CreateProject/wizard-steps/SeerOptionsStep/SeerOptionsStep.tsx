import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Header, SelectableInput } from "../../components";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { useWizardStore } from "@/stores";
import { updateHvacDetails } from "@/api/create-project/hvac/hvac.update";
import type { SeerOption } from "@/api/services/interface/hvac-interfaces";

const SeerOptionsStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & { seerOptions: SeerOption[] }
>(({ title, subTitle, seerOptions }, ref) => {
  const [selectedSeer, setSelectedSeer] = useState<SeerOption | null>(null);

  // Wizard store
  const { data, setSeerOptionsData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.seerOptions) {
      setSelectedSeer(data.seerOptions.selectedSeerOption);
    }
  }, [data.seerOptions]);

  const handleSeerSelect = (seer: SeerOption) => {
    setSelectedSeer(seer);
  };

  // Function to update SEER options
  const handleUpdateSeerOptions = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedSeer) {
        await updateHvacDetails(data.projectId, {
          hvac_seer_option_id: selectedSeer.id,
        });
        console.log("SEER options updated successfully:", selectedSeer.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating SEER options:", error);
      return false;
    }
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedSeer) {
      return false;
    }
    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedSeerOption: selectedSeer,
    };
    // Save to store
    setSeerOptionsData(stepData);

    // Update SEER options and check if successful
    const seerOptionsUpdated = await handleUpdateSeerOptions();

    // Return both data and success status
    return { data: stepData, success: seerOptionsUpdated };
  };

  // Expose validation and data functions to parent component
  useImperativeHandle(ref, () => ({
    validate: validateStep,
    getData: getStepData,
  }));

  return (
    <div>
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {seerOptions?.map((serviceOption) => (
          <SelectableInput
            key={serviceOption.id}
            id={serviceOption.id}
            selected={selectedSeer?.id ?? ""}
            onChange={handleSeerSelect}
            name={serviceOption.name}
            value={serviceOption}
          />
        ))}
      </div>
    </div>
  );
});

SeerOptionsStep.displayName = "SeerOptionsStep";

export default SeerOptionsStep;

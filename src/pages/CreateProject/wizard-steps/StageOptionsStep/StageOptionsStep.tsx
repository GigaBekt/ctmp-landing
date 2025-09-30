import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import { updateHvacDetails } from "@/api/create-project/hvac/hvac.update";
import type { SeerOption } from "@/api/services/interface/hvac-interfaces";

const StageOptionsStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & { stageOptions: SeerOption[] }
>(({ title, subTitle, stageOptions }, ref) => {
  const [selectedStage, setSelectedStage] = useState<SeerOption | null>(null);

  // Wizard store
  const { data, setStageOptionsData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.stageOptions) {
      setSelectedStage(data.stageOptions.selectedStageOption);
    }
  }, [data.stageOptions]);

  const handleStageSelect = (stage: SeerOption) => {
    setSelectedStage(stage);
  };

  // Function to update stage options
  const handleUpdateStageOptions = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedStage) {
        await updateHvacDetails(data.projectId, {
          hvac_stage_option_id: selectedStage.id,
        });
        console.log("Stage options updated successfully:", selectedStage.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating stage options:", error);
      return false;
    }
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedStage) {
      return false;
    }
    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedStageOption: selectedStage,
    };
    // Save to store
    setStageOptionsData(stepData);

    // Update stage options and check if successful
    const stageOptionsUpdated = await handleUpdateStageOptions();

    // Return both data and success status
    return { data: stepData, success: stageOptionsUpdated };
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
        {stageOptions?.map((stageOption) => (
          <SelectableInput
            key={stageOption.id}
            id={stageOption.id}
            selected={selectedStage?.id ?? ""}
            onChange={handleStageSelect}
            name={stageOption.name}
            value={stageOption}
          />
        ))}
      </div>
    </div>
  );
});

StageOptionsStep.displayName = "StageOptionsStep";

export default StageOptionsStep;

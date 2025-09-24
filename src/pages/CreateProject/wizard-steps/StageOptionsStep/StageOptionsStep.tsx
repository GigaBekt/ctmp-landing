import type { IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useState } from "react";
import type { SeerOption } from "@/api/services/interface/hvac-interfaces";

const StageOptionsStep = ({
  title,
  subTitle,
  stageOptions,
}: IWizardStepsProps & { stageOptions: SeerOption[] }) => {
  const [selectedStage, setSelectedStage] = useState("");

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
  };

  return (
    <div>
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-3">
        {stageOptions.map((stageOption) => (
          <SelectableInput
            key={stageOption.id}
            id={stageOption.id}
            selected={selectedStage}
            onChange={handleStageSelect}
            name={stageOption.name}
          />
        ))}
      </div>
    </div>
  );
};

export default StageOptionsStep;

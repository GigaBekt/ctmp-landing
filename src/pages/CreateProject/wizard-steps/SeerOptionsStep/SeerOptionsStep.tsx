import { useState } from "react";
import { Header, SelectableInput } from "../../components";
import type { IWizardStepsProps } from "../Wizard-steps-interface";
import type { SeerOption } from "@/api/services/interface/hvac-interfaces";

const SeerOptionsStep = ({
  title,
  subTitle,
  seerOptions,
}: IWizardStepsProps & { seerOptions: SeerOption[] }) => {
  const [selectedSeer, setSelectedSeer] = useState("");

  const handleSeerSelect = (seerId: string) => {
    setSelectedSeer(seerId);
  };

  return (
    <div>
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {seerOptions.map((serviceOption) => (
          <SelectableInput
            key={serviceOption.id}
            id={serviceOption.id}
            selected={selectedSeer}
            onChange={handleSeerSelect}
            name={serviceOption.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SeerOptionsStep;

import { useState } from "react";
import { type HeatSource } from "@/api/services/interface/hvac-interfaces";
import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";

interface HeatSourceStepProps {
  title: string;
  heatSources?: HeatSource[];
}

const HeatSourceStep = ({
  heatSources = [],
  title,
  subTitle,
}: IWizardStepsProps & HeatSourceStepProps) => {
  const [selectedSystemType, setSelectedSystemType] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleSystemTypeSelect = (systemTypeId: string) => {
    setSelectedSystemType(systemTypeId);
    if (systemTypeId !== "other") {
      setOtherText("");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {heatSources.map((systemType) => (
          <SelectableInput
            key={systemType.id}
            id={systemType.id}
            selected={selectedSystemType}
            onChange={handleSystemTypeSelect}
            name={systemType.name}
          />
        ))}
      </div>

      {/* Other System Input */}
      {selectedSystemType === "other" && (
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
};

export default HeatSourceStep;

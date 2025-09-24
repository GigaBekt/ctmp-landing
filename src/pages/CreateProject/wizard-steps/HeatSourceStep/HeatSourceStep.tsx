import { useState } from "react";
import {
  type HeatSource,
  type HeatSourceChild,
} from "@/api/services/interface/hvac-interfaces";
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
  const [selectedSystemType, setSelectedSystemType] =
    useState<HeatSource | null>(null);
  const [selectedSystemTypeChild, setSelectedSystemTypeChild] =
    useState<HeatSourceChild | null>(null);
  const [otherText, setOtherText] = useState("");

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

  console.log(selectedSystemTypeChild);

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {heatSources.map((systemType) => (
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
          {selectedSystemType.children.map((child) => (
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
};

export default HeatSourceStep;

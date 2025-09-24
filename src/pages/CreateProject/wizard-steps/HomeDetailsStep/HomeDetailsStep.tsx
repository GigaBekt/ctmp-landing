import { useState } from "react";
import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";

const homeTypes = [
  { id: "townhouse", name: "Townhouse" },
  { id: "mobile-home", name: "Mobile home" },
  { id: "other", name: "Other" },
];

const HomeDetailsStep = ({ title, subTitle }: IWizardStepsProps) => {
  const [selectedHomeType, setSelectedHomeType] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleHomeTypeSelect = (homeTypeId: string) => {
    setSelectedHomeType(homeTypeId);
    if (homeTypeId !== "other") {
      setOtherText("");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-3">
        {homeTypes.map((homeType) => (
          <SelectableInput
            key={homeType.id}
            id={homeType.id}
            selected={selectedHomeType}
            onChange={handleHomeTypeSelect}
            name={homeType.name}
          />
        ))}
      </div>

      {/* Other Home Type Input */}
      {selectedHomeType === "other" && (
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Please specify your property type
          </label>
          <textarea
            placeholder="Describe your property type..."
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

export default HomeDetailsStep;

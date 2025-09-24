import { useState } from "react";
import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import type { HomeType } from "@/api/services/interface";

const HomeDetailsStep = ({
  title,
  subTitle,
  homeTypes,
}: IWizardStepsProps & { homeTypes: HomeType[] }) => {
  const [selectedHomeType, setSelectedHomeType] = useState<HomeType | null>(
    null
  );
  const [otherText, setOtherText] = useState("");

  const handleHomeTypeSelect = (homeType: HomeType) => {
    setSelectedHomeType(homeType);
    if (homeType.key !== "other") {
      setOtherText("");
    }
  };

  //  I need to sort array like this other at the end
  const sortedHomeTypes = homeTypes.sort((a, b) => {
    if (a.key === "other") return 1;
    if (b.key === "other") return -1;
    return 0;
  });

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-3">
        {sortedHomeTypes.map((homeType) => (
          <SelectableInput
            key={homeType.id}
            id={homeType.id}
            selected={selectedHomeType?.id ?? ""}
            onChange={handleHomeTypeSelect}
            name={homeType.name}
            value={homeType}
          />
        ))}
      </div>

      {/* Other Home Type Input */}
      {selectedHomeType?.key === "other" && (
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

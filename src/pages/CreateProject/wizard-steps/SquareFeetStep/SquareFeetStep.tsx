import { useState } from "react";

import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import type { UnitVolume } from "@/api/services/interface/hvac-interfaces";

const SquareFeetStep = ({
  title,
  subTitle,
  unitVolumes,
}: IWizardStepsProps & { unitVolumes: UnitVolume[] }) => {
  const [selectedSize, setSelectedSize] = useState<UnitVolume | null>(null);
  const [customSize, setCustomSize] = useState("");
  console.log({ unitVolumes, selectedSize });
  return (
    <div className="max-w-2xl mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {unitVolumes.map((size) => (
          <SelectableInput
            key={size.id}
            id={size.id}
            selected={selectedSize?.id === size.id}
            onChange={setSelectedSize}
            name={size.text}
            value={size}
          />
        ))}

        {/* Custom Size Option */}
        <label
          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedSize?.id === "custom"
              ? "border-[#2c74b3] bg-blue-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="size"
              value="custom"
              checked={selectedSize?.id === "custom"}
              onChange={() =>
                setSelectedSize({
                  id: "custom",
                  text: "custom",
                  tonnage: 0,
                  projects_count: 0,
                  created_at: "",
                  updated_at: "",
                })
              }
              className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
            />
            <span className="ml-3 text-gray-700 font-medium">
              Enter exact square footage
            </span>
          </div>
        </label>
      </div>

      {selectedSize?.id === "custom" && (
        <div className="mt-6">
          <input
            type="number"
            placeholder="Enter square footage"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0"
          />
        </div>
      )}
    </div>
  );
};

export default SquareFeetStep;

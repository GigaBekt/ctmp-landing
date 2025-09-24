import { useState } from "react";

import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";

const sizeRanges = [
  { id: "small", label: "Under 1,000 sq ft", range: "500-999" },
  { id: "medium-small", label: "1,000 - 1,500 sq ft", range: "1000-1499" },

  { id: "extra-large", label: "Over 3,000 sq ft", range: "3000+" },
];

const SquareFeetStep = ({ title, subTitle }: IWizardStepsProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [customSize, setCustomSize] = useState("");

  return (
    <div className="max-w-2xl mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {sizeRanges.map((size) => (
          <SelectableInput
            key={size.id}
            id={size.id}
            selected={selectedSize}
            onChange={setSelectedSize}
            name={size.label}
          />
        ))}

        {/* Custom Size Option */}
        <label
          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedSize === "custom"
              ? "border-[#2c74b3] bg-blue-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="size"
              value="custom"
              checked={selectedSize === "custom"}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
            />
            <span className="ml-3 text-gray-700 font-medium">
              Enter exact square footage
            </span>
          </div>
        </label>
      </div>

      {selectedSize === "custom" && (
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

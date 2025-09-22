import { useState } from "react";

interface SquareFeetStepProps {
  onNext: () => void;
  onBack: () => void;
}

const sizeRanges = [
  { id: "small", label: "Under 1,000 sq ft", range: "500-999" },
  { id: "medium-small", label: "1,000 - 1,500 sq ft", range: "1000-1499" },

  { id: "extra-large", label: "Over 3,000 sq ft", range: "3000+" },
];

const SquareFeetStep = ({}: SquareFeetStepProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [customSize, setCustomSize] = useState("");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What's your home's square footage?
        </h2>
        <p className="text-gray-600">
          Select your home size range to help us calculate the right system
          capacity
        </p>
      </div>

      <div className="space-y-3">
        {sizeRanges.map((size) => (
          <label
            key={size.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedSize === size.id
                ? "border-[#2c74b3] bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="size"
                value={size.id}
                checked={selectedSize === size.id}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
              />
              <span className="ml-3 text-gray-700 font-medium">
                {size.label}
              </span>
            </div>
            <span className="text-sm text-gray-500">{size.range} sq ft</span>
          </label>
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

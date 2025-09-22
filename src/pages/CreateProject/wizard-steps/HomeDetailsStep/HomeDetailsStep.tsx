import { useState } from "react";

const homeTypes = [
  { id: "single-family", name: "Single-family home" },
  { id: "townhouse", name: "Townhouse" },
  { id: "condo", name: "Condominium" },
  { id: "apartment", name: "Apartment" },
  { id: "mobile-home", name: "Mobile home" },
  { id: "other", name: "Other" },
];

const HomeDetailsStep = () => {
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What type of property is this?
        </h2>
      </div>

      <div className="space-y-3">
        {homeTypes.map((homeType) => (
          <label
            key={homeType.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedHomeType === homeType.id
                ? "border-[#2c74b3] bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="homeType"
              value={homeType.id}
              checked={selectedHomeType === homeType.id}
              onChange={(e) => handleHomeTypeSelect(e.target.value)}
              className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
            />
            <span className="ml-3 text-gray-700 font-medium">
              {homeType.name}
            </span>
          </label>
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

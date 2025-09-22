import { useState } from "react";

const systemTypes = [
  { id: "install-central-ac", name: "Install central A/C" },
  { id: "repair-central-ac", name: "Repair central A/C" },
  { id: "window-ac-unit", name: "Window A/C Unit" },
  {
    id: "install-repair-air-cleaner",
    name: "Install or repair central air cleaner",
  },
  { id: "other", name: "Other" },
];

const HeatSourceStep = () => {
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What kind of system do you have?
        </h2>
      </div>

      <div className="space-y-3">
        {systemTypes.map((systemType) => (
          <label
            key={systemType.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedSystemType === systemType.id
                ? "border-[#2c74b3] bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="systemType"
              value={systemType.id}
              checked={selectedSystemType === systemType.id}
              onChange={(e) => handleSystemTypeSelect(e.target.value)}
              className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
            />
            <span className="ml-3 text-gray-700 font-medium">
              {systemType.name}
            </span>
          </label>
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

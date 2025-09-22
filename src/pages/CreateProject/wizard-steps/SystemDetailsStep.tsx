import { useState } from "react";

const installationOptions = [
  "Indoor unit in basement",
  "Indoor unit in utility room",

  "Other (please specify)",
];

const SystemDetailsStep = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState("");

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          System Installation Details
        </h2>
        <p className="text-gray-600">
          Tell us about your installation preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Installation Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Installation Requirements (select all that apply)
          </h3>
          <div className="space-y-3">
            {installationOptions.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedOptions.includes(option)
                    ? "border-[#2c74b3] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionToggle(option)}
                  className="w-5 h-5 text-[#2c74b3] border-gray-300 rounded focus:ring-0"
                />
                <span className="ml-3 text-gray-700 font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Requirements */}
        {(selectedOptions.includes("Other (please specify)") ||
          customRequirements) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Additional Requirements or Specifications
            </label>
            <textarea
              placeholder="Please describe any specific requirements, preferences, or details about your installation..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0 resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Providing detailed installation preferences
            helps contractors give you more accurate quotes and plan their work
            efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemDetailsStep;

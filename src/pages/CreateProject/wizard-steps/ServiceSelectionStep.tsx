import { useState } from "react";

interface ServiceSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

const services = [
  { id: "air-conditioning", name: "Air conditioning" },
  { id: "heating", name: "Heating" },
  { id: "thermostat", name: "Thermostat and accessories" },
  { id: "other-hvac", name: "Other HVAC services" },
  { id: "other", name: "Other" },
];

const ServiceSelectionStep = ({}: ServiceSelectionStepProps) => {
  const [selectedService, setSelectedService] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What do you need help with?
        </h2>
      </div>

      <div className="space-y-3">
        {services.map((serviceOption) => (
          <label
            key={serviceOption.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedService === serviceOption.id
                ? "border-[#2c74b3] bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="service"
              value={serviceOption.id}
              checked={selectedService === serviceOption.id}
              onChange={(e) => handleServiceSelect(e.target.value)}
              className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
            />
            <span className="ml-3 text-gray-700 font-medium">
              {serviceOption.name}
            </span>
          </label>
        ))}
      </div>

      {/* Other Service Input */}
      {selectedService === "other" && (
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Please specify your service needs
          </label>
          <textarea
            placeholder="Describe what service you need..."
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

export default ServiceSelectionStep;

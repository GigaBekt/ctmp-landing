import { useState } from "react";
import { type Service } from "@/api/services/interface";

import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";

interface ServiceSelectionStepProps {
  services?: Service[];
}

const ServiceSelectionStep = ({
  title,
  subTitle,
  services = [],
}: IWizardStepsProps & ServiceSelectionStepProps) => {
  const [selectedService, setSelectedService] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-3">
        {services.map((serviceOption) => (
          <SelectableInput
            key={serviceOption.id}
            id={serviceOption.id}
            selected={selectedService}
            onChange={handleServiceSelect}
            name={serviceOption.name}
          />
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

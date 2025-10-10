import { CheckCircle } from "phosphor-react";

interface ProgressIndicatorProps {
  currentStep: "documents" | "locations" | "payment";
  isDocumentsStepComplete: boolean;
  isLocationsStepComplete: boolean;
  isPaymentStepComplete: boolean;
}

const ProgressIndicator = ({
  currentStep,
  isDocumentsStepComplete,
  isLocationsStepComplete,
  isPaymentStepComplete,
}: ProgressIndicatorProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center space-x-8">
        {/* Step 1: Documents */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentStep === "documents"
                ? "bg-primary-600 text-white"
                : isDocumentsStepComplete
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {isDocumentsStepComplete ? <CheckCircle size={20} /> : "1"}
          </div>
          <span
            className={`ml-3 font-semibold text-lg ${
              currentStep === "documents"
                ? "text-primary-600"
                : isDocumentsStepComplete
                ? "text-primary-600"
                : "text-gray-400"
            }`}
          >
            Documents
          </span>
        </div>

        {/* Connector 1 */}
        <div
          className={`w-16 h-1 rounded-full transition-all duration-300 ${
            isDocumentsStepComplete ? "bg-primary-600" : "bg-gray-200"
          }`}
        ></div>

        {/* Step 2: Locations */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentStep === "locations"
                ? "bg-primary-600 text-white"
                : isLocationsStepComplete
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {isLocationsStepComplete ? <CheckCircle size={20} /> : "2"}
          </div>
          <span
            className={`ml-3 font-semibold text-lg ${
              currentStep === "locations"
                ? "text-primary-600"
                : isLocationsStepComplete
                ? "text-primary-600"
                : "text-gray-400"
            }`}
          >
            Service Areas
          </span>
        </div>

        {/* Connector 2 */}
        <div
          className={`w-16 h-1 rounded-full transition-all duration-300 ${
            isLocationsStepComplete ? "bg-primary-600" : "bg-gray-200"
          }`}
        ></div>

        {/* Step 3: Payment */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentStep === "payment"
                ? "bg-primary-600 text-white"
                : isPaymentStepComplete
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {isPaymentStepComplete ? <CheckCircle size={20} /> : "3"}
          </div>
          <span
            className={`ml-3 font-semibold text-lg ${
              currentStep === "payment"
                ? "text-primary-600"
                : isPaymentStepComplete
                ? "text-primary-600"
                : "text-gray-400"
            }`}
          >
            Payment
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;

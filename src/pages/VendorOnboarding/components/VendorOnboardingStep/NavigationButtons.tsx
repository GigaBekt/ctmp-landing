import { MapPin, CheckCircle, CreditCard } from "phosphor-react";
import { Button } from "@/components";

interface NavigationButtonsProps {
  currentStep: "documents" | "locations" | "payment";
  isDocumentsStepComplete: boolean;
  isLocationsStepComplete: boolean;
  isPaymentStepComplete: boolean;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onSkip?: () => void;
}

const NavigationButtons = ({
  currentStep,
  isDocumentsStepComplete,
  isLocationsStepComplete,
  isPaymentStepComplete,
  onPreviousStep,
  onNextStep,
  onSkip,
}: NavigationButtonsProps) => {
  const getBackButtonText = () => {
    if (currentStep === "locations") return "← Back to Documents";
    if (currentStep === "payment") return "← Back to Service Areas";
    return "";
  };

  const getNextButtonText = () => {
    if (currentStep === "documents") return "Continue to Service Areas →";
    if (currentStep === "locations") return "Continue to Payment →";
    return "Complete Setup";
  };

  const getNextButtonIcon = () => {
    if (currentStep === "documents") return <MapPin size={20} />;
    if (currentStep === "locations") return <CreditCard size={20} />;
    return <CheckCircle size={20} />;
  };

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
      <div>
        {currentStep !== "documents" && (
          <Button
            onClick={onPreviousStep}
            variant="outline"
            size="lg"
            className="px-6 py-3"
          >
            {getBackButtonText()}
          </Button>
        )}
      </div>

      <div className="flex space-x-4">
        {onSkip && currentStep === "payment" && (
          <Button
            onClick={onSkip}
            variant="ghost"
            size="lg"
            className="px-6 py-3 text-gray-600 hover:text-gray-800"
          >
            Skip for Now
          </Button>
        )}

        <Button
          onClick={onNextStep}
          disabled={
            (currentStep === "documents" && !isDocumentsStepComplete) ||
            (currentStep === "locations" && !isLocationsStepComplete) ||
            (currentStep === "payment" && !isPaymentStepComplete)
          }
          size="lg"
          className="px-8 py-3 text-lg font-semibold"
          leftIcon={getNextButtonIcon()}
        >
          {getNextButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;

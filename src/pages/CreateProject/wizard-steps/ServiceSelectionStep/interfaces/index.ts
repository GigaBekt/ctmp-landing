export interface ServiceSelectionStepProps {
  title: string;
  onNext: () => void;
  onBack: () => void;
}

export interface ServiceOption {
  id: string;
  name: string;
}

export interface ServiceData {
  selectedService: string;
  otherText?: string;
}

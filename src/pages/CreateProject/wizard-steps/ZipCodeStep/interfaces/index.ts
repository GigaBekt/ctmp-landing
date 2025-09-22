export interface ZipCodeStepProps {
  onNext: () => void;
  onBack: () => void;
}

export interface ZipCodeData {
  zipCode: string;
  isValid: boolean;
  city?: string;
  state?: string;
}

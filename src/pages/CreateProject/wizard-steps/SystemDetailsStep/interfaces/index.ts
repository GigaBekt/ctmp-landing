export interface SystemDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export interface InstallationOption {
  id: string;
  name: string;
  category: 'indoor' | 'outdoor' | 'additional';
}

export interface TimelineStepProps {
  onNext: () => void;
  onBack: () => void;
}

export interface TimelineOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
}

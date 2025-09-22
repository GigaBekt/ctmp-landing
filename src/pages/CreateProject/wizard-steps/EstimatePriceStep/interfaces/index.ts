export interface EstimatePriceStepProps {
  onNext: () => void;
  onBack: () => void;
}

export interface PriceEstimate {
  low: number;
  high: number;
  average: number;
}

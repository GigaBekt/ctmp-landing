export interface IWizardStepRef {
  validate: () => boolean | Promise<boolean>;
  getData: () => any | Promise<any>;
}

export interface IWizardStepsProps {
  title?: string;
  subTitle?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onNext?: () => void | Promise<void>;
}

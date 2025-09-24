import { type IWizardStepsProps } from "../../wizard-steps/Wizard-steps-interface";

const Header = ({ title, subTitle }: IWizardStepsProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {subTitle && <p className="text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default Header;

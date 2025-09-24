import { useState } from "react";
import { Check } from "phosphor-react";
import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header } from "../../components";

const ZipCodeStep = ({ title, subTitle }: IWizardStepsProps) => {
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateZipCode = (zip: string): boolean => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d-]/g, "");
    setZipCode(value);
    setError("");

    if (value.length >= 5) {
      const valid = validateZipCode(value);
      setIsValid(valid);
      if (!valid) {
        setError("Please enter a valid ZIP code");
      }
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          ZIP code
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="12345"
            value={zipCode}
            onChange={handleZipChange}
            className={`w-full px-4 py-3 text-lg rounded-lg border-2 transition-all duration-200 ${
              error
                ? "border-red-500 focus:border-red-500"
                : isValid
                ? "border-green-500 focus:border-green-500"
                : "border-gray-300 focus:border-[#2c74b3]"
            } focus:outline-none focus:ring-0`}
            maxLength={10}
            autoFocus
          />

          {isValid && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Check className="w-5 h-5 text-green-500" weight="fill" />
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {isValid && <p className="text-sm text-green-600">Schenectady, NY</p>}
      </div>
    </div>
  );
};

export default ZipCodeStep;

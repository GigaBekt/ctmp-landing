import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Check } from "phosphor-react";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header } from "../../components";
import { useWizardStore } from "@/stores";
import { createProject } from "@/api/create-project/create.project";
import type { ProjectResponse } from "@/api/create-project/interfaces/create-interface";
// import { createProject } from "@/api/create-project/create.project";

const ZipCodeStep = forwardRef<IWizardStepRef, IWizardStepsProps>(
  ({ title, subTitle }, ref) => {
    const [zipCode, setZipCode] = useState("");
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);

    // Wizard store
    const { data, setZipCodeData, setProjectId, setGuestToken } =
      useWizardStore();

    // Load existing data from store
    useEffect(() => {
      if (data.zipCode) {
        setZipCode(data.zipCode.zipCode);
        setIsValid(true);
      }
    }, [data.zipCode]);

    const validateZipCode = (zip: string): boolean => {
      const zipRegex = /^\d{5}(-\d{4})?$/;
      return zipRegex.test(zip);
    };

    // Function to validate step data before proceeding
    const validateStep = (): boolean => {
      if (!zipCode.trim()) {
        setError("Please enter a ZIP code");
        return false;
      }

      if (!validateZipCode(zipCode)) {
        setError("Please enter a valid ZIP code");
        return false;
      }

      return true;
    };

    // Function to get step data
    const getStepData = async () => {
      const stepData = {
        zipCode: zipCode.trim(),
      };
      // Save to store
      setZipCodeData(stepData);

      // Call createProject when moving to next step
      const projectCreated = await handleCreateProject();

      // Return both data and success status
      return { data: stepData, success: projectCreated };
    };

    // Expose validation and data functions to parent component
    useImperativeHandle(ref, () => ({
      validate: validateStep,
      getData: getStepData,
    }));

    const handleCreateProject = async (): Promise<boolean> => {
      try {
        console.log("Creating project with ZIP code:", zipCode);
        const response: ProjectResponse = await createProject({
          zip: zipCode,
        });
        console.log("Project created successfully:", response);

        // Save project ID and guest token to store
        setProjectId(response.data.id);

        if (response.data.guest_token) {
          setGuestToken(response.data.guest_token);
          console.log("Guest token saved:", response.data.guest_token);
        }

        console.log("Project ID saved:", response.data.id);

        return true; // Success
      } catch (error) {
        console.error("Error creating project:", error);
        setError("Failed to create project. Please try again.");
        return false; // Failed
      }
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
  }
);

ZipCodeStep.displayName = "ZipCodeStep";

export default ZipCodeStep;

import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import AddressMapInput from "./AddressMapInput";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header } from "../../components";
import { useWizardStore } from "@/stores";
import { updateProject } from "@/api/create-project/create.project";

const AddressStep = forwardRef<IWizardStepRef, IWizardStepsProps>(
  ({ title, subTitle }, ref) => {
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [coordinates, setCoordinates] = useState<
      { lat: number; lng: number } | undefined
    >();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    // Wizard store
    const { data, setAddressData } = useWizardStore();

    // Load existing data from store
    useEffect(() => {
      if (data.address) {
        setAddress(data.address.address);
        setCity(data.address.city);
        setState(data.address.state);
        setCoordinates(data.address.coordinates);
      }
    }, [data.address]);

    const handleAddressChange = (
      newAddress: string,
      newCoordinates?: { lat: number; lng: number },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locationData?: any
    ) => {
      setAddress(newAddress);
      setAddressError("");
      setCoordinates(newCoordinates);

      // Extract city and state from locationData if available
      if (locationData) {
        setCity(locationData.city || "");
        setState(locationData.state || "");
      }

      console.log("Address changed:", {
        address: newAddress,
        coordinates: newCoordinates,
        locationData,
      });
    };

    // Function to update address
    const handleUpdateAddress = async (): Promise<boolean> => {
      try {
        if (data.projectId && address.trim()) {
          await updateProject(data.projectId, {
            address: address.trim(),
          });
          console.log("Address updated successfully:", address);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating address:", error);
        return false;
      }
    };

    // Function to validate step data before proceeding
    const validateStep = (): boolean => {
      if (!address.trim()) {
        setAddressError("Please enter a valid address");
        return false;
      }
      return true;
    };

    // Function to get step data
    const getStepData = async () => {
      const stepData = {
        address: address.trim(),
        city,
        state,
        coordinates,
      };
      // Save to store
      setAddressData(stepData);

      // Update address and check if successful
      const addressUpdated = await handleUpdateAddress();

      // Return both data and success status
      return { data: stepData, success: addressUpdated };
    };

    // Expose validation and data functions to parent component
    useImperativeHandle(ref, () => ({
      validate: validateStep,
      getData: getStepData,
    }));

    return (
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        <div className="max-w-lg mx-auto">
          <Header title={title} subTitle={subTitle} />

          <div className="space-y-4">
            <AddressMapInput
              value={address}
              onChange={handleAddressChange}
              placeholder="123 Main Street, City, State"
              error={addressError}
            />

            <p className="text-sm text-gray-500 text-center">
              This helps contractors provide accurate quotes and plan their
              visit.
            </p>
          </div>
        </div>
      </APIProvider>
    );
  }
);

AddressStep.displayName = "AddressStep";

export default AddressStep;

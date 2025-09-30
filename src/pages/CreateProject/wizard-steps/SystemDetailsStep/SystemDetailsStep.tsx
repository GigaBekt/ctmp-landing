import {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header, SelectableInput } from "../../components";
import { useWizardStore } from "@/stores";
import { updateHvacDetails } from "@/api/create-project/hvac/hvac.update";
import type {
  InstallSpot,
  InstallLocation,
} from "@/api/services/interface/hvac-interfaces";

const SystemDetailsStep = forwardRef<
  IWizardStepRef,
  IWizardStepsProps & {
    installSpots: InstallSpot[];
    installLocations: InstallLocation[];
  }
>(({ title, subTitle, installSpots, installLocations }, ref) => {
  const [selectedLocation, setSelectedLocation] =
    useState<InstallLocation | null>(null);
  const [selectedSpots, setSelectedSpots] = useState<InstallSpot | null>(null);
  const [customRequirements, setCustomRequirements] = useState("");

  // Wizard store
  const { data, setSystemDetailsData } = useWizardStore();

  // Load existing data from store
  useEffect(() => {
    if (data.systemDetails) {
      setSelectedLocation(data.systemDetails.selectedLocation);
      setSelectedSpots(data.systemDetails.selectedSpots);
      setCustomRequirements(data.systemDetails.customRequirements);
    }
  }, [data.systemDetails]);

  // Filter install spots based on selected location
  const filteredInstallSpots = useMemo(() => {
    if (!selectedLocation) return [];
    return installSpots.filter(
      (spot) => spot.hvac_install_location_id === selectedLocation.id
    );
  }, [selectedLocation, installSpots]);

  const handleLocationSelect = (location: InstallLocation) => {
    setSelectedLocation(location);
    setSelectedSpots(null); // Reset selected spots when location changes
  };

  const handleSpotToggle = (spot: InstallSpot) => {
    setSelectedSpots(spot);
  };

  // Function to update system details
  const handleUpdateSystemDetails = async (): Promise<boolean> => {
    try {
      if (data.projectId && selectedLocation && selectedSpots) {
        await updateHvacDetails(data.projectId, {
          hvac_install_location_id: selectedLocation.id,
          hvac_install_spot_id: selectedSpots.id,
          custom_install_location: customRequirements.trim() || undefined,
        });
        console.log("System details updated successfully:", {
          location: selectedLocation.id,
          spot: selectedSpots.id,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating system details:", error);
      return false;
    }
  };

  // Function to validate step data before proceeding
  const validateStep = (): boolean => {
    if (!selectedLocation) {
      return false;
    }

    // If location is selected but no spots are available, that's still valid
    // If spots are available, at least one should be selected
    if (filteredInstallSpots.length > 0 && !selectedSpots) {
      return false;
    }

    return true;
  };

  // Function to get step data
  const getStepData = async () => {
    const stepData = {
      selectedLocation,
      selectedSpots,
      customRequirements: customRequirements.trim(),
    };
    // Save to store
    setSystemDetailsData(stepData);

    // Update system details and check if successful
    const systemDetailsUpdated = await handleUpdateSystemDetails();

    // Return both data and success status
    return { data: stepData, success: systemDetailsUpdated };
  };

  // Expose validation and data functions to parent component
  useImperativeHandle(ref, () => ({
    validate: validateStep,
    getData: getStepData,
  }));

  return (
    <div className="max-w-2xl mx-auto">
      <Header title={title} subTitle={subTitle} />
      <div className="space-y-6">
        {/* Installation Options */}
        <div>
          <div className="space-y-6">
            {/* Install Locations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Installation Location
              </h3>
              <div className="space-y-3">
                {installLocations?.map((location) => (
                  <SelectableInput
                    key={location.id}
                    id={location.id}
                    selected={selectedLocation?.id || ""}
                    onChange={handleLocationSelect}
                    name={location.name}
                    value={location}
                  />
                ))}
              </div>
            </div>

            {/* Install Spots - Only show when location is selected */}
            {selectedLocation && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Choose Installation Spots
                </h3>
                <div className="space-y-3">
                  {filteredInstallSpots.length ? (
                    filteredInstallSpots?.map((spot) => (
                      <SelectableInput
                        key={spot.id}
                        id={spot.id}
                        selected={selectedSpots?.id === spot.id || ""}
                        onChange={handleSpotToggle}
                        name={spot.name}
                        isMultiple={true}
                        value={spot}
                      />
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm py-4">
                      No installation spots available for the selected location.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Requirements */}
        {(selectedSpots?.id === "other" || customRequirements) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Additional Requirements or Specifications
            </label>
            <textarea
              placeholder="Please describe any specific requirements, preferences, or details about your installation..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0 resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Providing detailed installation preferences
            helps contractors give you more accurate quotes and plan their work
            efficiently.
          </p>
        </div>
      </div>
    </div>
  );
});

SystemDetailsStep.displayName = "SystemDetailsStep";

export default SystemDetailsStep;

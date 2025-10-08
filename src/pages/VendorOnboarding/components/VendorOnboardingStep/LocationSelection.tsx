import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "phosphor-react";
import type { Location, VendorLocation } from "@/api/vendor/interfaces";

interface LocationSelectionProps {
  availableLocations: Location[];
  selectedLocations: VendorLocation[];
  selectedLocationIds: Set<string>;
  onLocationToggle: (locationId: string) => void;
}

const LocationSelection = ({
  availableLocations,
  selectedLocations,
  selectedLocationIds,
  onLocationToggle,
}: LocationSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Select Your Service Areas
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the cities where you provide HVAC services to receive relevant
          project opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableLocations.map((location) => {
          const isSelected = selectedLocationIds.has(location.id);
          const vendorLocation = selectedLocations.find(
            (loc) => loc.location_id === location.id
          );

          return (
            <div
              key={location.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-primary-300 hover:bg-primary-25"
              }`}
              onClick={() => onLocationToggle(location.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg mr-3 bg-gray-100">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {location.name}
                    </span>
                    {location.abbreviation && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({location.abbreviation})
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <div className="flex items-center">
                    {vendorLocation?.is_primary && (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full mr-2 font-medium">
                        Primary
                      </span>
                    )}
                    <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedLocations.length > 0 && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <h3 className="font-medium text-primary-900 mb-2">
            Selected Service Areas
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedLocations.map((location) => (
              <span
                key={location.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {location.location_name}
                {location.is_primary && (
                  <span className="ml-1 text-xs bg-primary-600 text-white px-1 rounded">
                    Primary
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LocationSelection;

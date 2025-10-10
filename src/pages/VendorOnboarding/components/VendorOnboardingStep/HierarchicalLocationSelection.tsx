import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Plus } from "phosphor-react";
import CitySelector from "./CitySelector";
import type { Location } from "@/api/vendor/interfaces";

interface HierarchicalLocationSelectionProps {
  availableLocations: Location[];
  selectedCities: Set<string>;
  setSelectedCities: (cities: Set<string>) => void;
}

const HierarchicalLocationSelection = ({
  availableLocations,
  selectedCities,
  setSelectedCities,
}: HierarchicalLocationSelectionProps) => {
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const handleParentSelection = (locationId: string) => {
    setSelectedParent(locationId);
    setSelectedCities(new Set()); // Reset cities when parent changes
  };

  const handleCitySelection = (cityIds: string[]) => {
    setSelectedCities(new Set(cityIds));
  };

  const getSelectedParent = () => {
    return availableLocations.find((loc) => loc.id === selectedParent);
  };

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
          Choose the counties and cities where you provide HVAC services
        </p>
      </div>

      {/* Parent Locations Selection */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {availableLocations.map((location) => {
            const isSelected = selectedParent === location.id;
            const hasChildren =
              location.children && location.children.length > 0;

            return (
              <div
                key={location.id}
                onClick={() => handleParentSelection(location.id)}
                className={`group cursor-pointer p-5 border rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  isSelected
                    ? "border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg ring-2 ring-primary-200"
                    : "border-gray-200 hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-25 hover:to-primary-50 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2.5 rounded-xl transition-colors duration-300 ${
                        isSelected
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600"
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 text-lg">
                          {location.name}
                        </span>
                        {location.abbreviation && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                            {location.abbreviation}
                          </span>
                        )}
                      </div>

                      {hasChildren && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></div>
                            {location.children?.length} cities available
                          </div>
                        </div>
                      )}

                      {location.full_name && (
                        <div className="mt-1 text-xs text-gray-400 truncate">
                          {location.full_name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    {isSelected ? (
                      <div className="flex items-center text-primary-700 bg-primary-200 px-3 py-1.5 rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                        <span className="text-xs font-semibold">Selected</span>
                      </div>
                    ) : hasChildren ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary-100 transition-colors duration-300">
                        <Plus className="w-4 h-4 text-gray-500 group-hover:text-primary-600" />
                      </div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cities Selection */}
      {selectedParent && getSelectedParent()?.children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="">
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Select Cities in {getSelectedParent()?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Choose specific cities where you provide HVAC services
                </p>
              </div>
            </div>

            <div className="">
              <CitySelector
                placeholder="Search and select cities..."
                options={
                  getSelectedParent()?.children?.map((city) => ({
                    value: city.id,
                    label: city.name,
                    description:
                      city.full_name ||
                      (city.abbreviation
                        ? `(${city.abbreviation})`
                        : undefined),
                  })) || []
                }
                selectedValues={Array.from(selectedCities)}
                onSelectionChange={handleCitySelection}
                multiple={true}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HierarchicalLocationSelection;

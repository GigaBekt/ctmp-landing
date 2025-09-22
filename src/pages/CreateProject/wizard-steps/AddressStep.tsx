import { useState } from "react";
import { MapPin, MagnifyingGlass, CheckCircle, Warning } from "phosphor-react";

const AddressStep = () => {
  const [searchValue, setSearchValue] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isLoadingLocation] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    // Simulate address validation
    if (newValue.length > 5) {
      setShowMap(true);
      setCoordinates({ lat: 33.749, lng: -84.388 }); // Mock coordinates
      setError("");
    } else {
      setShowMap(false);
      setCoordinates(null);
    }
  };

  const handleAddressSelect = (address: string) => {
    setSearchValue(address);
    setCoordinates({ lat: 33.749, lng: -84.388 });
    setShowMap(true);
    setError("");
  };

  // Mock address suggestions
  const mockSuggestions = [
    "123 Main Street, Schenectady, NY 12345",
    "456 Oak Avenue, Schenectady, NY 12308",
    "789 Pine Road, Albany, NY 12203",
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Property Address
        </h2>
      </div>

      <div className="space-y-4">
        {/* Address Input */}
        <div className="relative">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#2c74b3]"
              } focus:ring-0 outline-none`}
              placeholder="123 Main Street, City, State"
            />

            {/* Loading indicator */}
            {isLoadingLocation && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2c74b3]"></div>
              </div>
            )}

            {/* Valid address indicator */}
            {coordinates && !isLoadingLocation && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
              </div>
            )}
          </div>

          {/* Autocomplete Suggestions */}
          {searchValue.length > 2 && !coordinates && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {mockSuggestions
                .filter((suggestion) =>
                  suggestion.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddressSelect(suggestion)}
                    className="w-full px-4 py-3 text-left transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center justify-between group hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-900">{suggestion}</span>
                    </div>
                  </button>
                ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
              <Warning className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Mock Map Display */}
        {showMap && coordinates && (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Click on the map to adjust the location</span>
              </div>
            </div>

            {/* Mock Map Container */}
            <div className="h-64 sm:h-80 bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-[#2c74b3] rounded-full border-4 border-white shadow-lg flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-4 h-4 text-white" weight="fill" />
                </div>
                <p className="text-gray-600 text-sm">Interactive Map</p>
                <p className="text-gray-500 text-xs">
                  Click to set exact location
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Address Confirmation */}
        {coordinates && searchValue && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-800 text-sm">
                  Address Confirmed
                </h4>
                <p className="text-green-700 text-sm mt-1">{searchValue}</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 text-center">
          This helps contractors provide accurate quotes and plan their visit.
        </p>
      </div>
    </div>
  );
};

export default AddressStep;

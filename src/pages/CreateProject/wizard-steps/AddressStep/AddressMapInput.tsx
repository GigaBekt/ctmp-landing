/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MagnifyingGlass, CheckCircle, Warning } from "phosphor-react";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useClickOutside } from "@/hooks/useClickOutside";
import { type LocationData, type AddressMapInputProps } from "./interfaces";

// Allowed cities and regions
const ALLOWED_CITIES = [
  "Los Angeles",
  "San Diego",
  "Orange",
  "Schenectady",
  "Albany",
  "Troy",
  "Saratoga Springs",
];

// California bounds to help with initial filtering
const CALIFORNIA_BOUNDS = {
  north: 42.009518,
  south: 32.528832,
  east: -114.131211,
  west: -124.482003,
};

// Helper function to check if location is in Orange County
const isInOrangeCounty = (
  addressComponents: google.maps.GeocoderAddressComponent[]
) => {
  return addressComponents.some(
    (component) =>
      (component.long_name.toLowerCase() === "orange county" ||
        component.long_name.toLowerCase() === "orange") &&
      (component.types.includes("administrative_area_level_2") ||
        component.types.includes("locality"))
  );
};

// Helper function to check if suggestion is in allowed area
const isAllowedLocation = (description: string) => {
  const lowerDesc = description.toLowerCase();

  // Check for cities - more flexible matching
  const isAllowedCity = ALLOWED_CITIES.some(
    (city) =>
      lowerDesc.includes(city.toLowerCase()) &&
      (lowerDesc.includes("ca") || lowerDesc.includes("ny"))
  );

  // Check for Orange County
  const isOrangeCounty =
    lowerDesc.includes("orange county") && lowerDesc.includes("ca");

  return isAllowedCity || isOrangeCounty;
};

// Helper function to extract place_id, state_id, and county_id
const extractLocationIds = (geocodeResult: google.maps.GeocoderResult) => {
  const placeId = geocodeResult.place_id;

  let stateId = "";
  let countyId = "";

  geocodeResult.address_components.forEach((component) => {
    // State ID
    if (component.types.includes("administrative_area_level_1")) {
      stateId = component.short_name; // 'CA' for California
    }
    // County ID
    if (component.types.includes("administrative_area_level_2")) {
      countyId = component.long_name; // 'Orange County'
    }
  });

  return { placeId, stateId, countyId };
};

const defaultCenter = {
  lat: 33.749, // Atlanta, GA
  lng: -84.388,
};

const AddressMapInput = ({
  value,
  onChange,
  placeholder = "123 Main Street, City, State",
  error,
}: AddressMapInputProps) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const searchRef = useRef<HTMLDivElement | any>(null);

  const {
    value: searchValue,
    suggestions: { data },
    setValue: setSearchValue,
    clearSuggestions,
    ready,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
      bounds: CALIFORNIA_BOUNDS,
    },
    debounce: 300,
    defaultValue: value,
  });

  useClickOutside(searchRef, () => {
    clearSuggestions();
  });

  // Check if API is ready
  useEffect(() => {
    if (
      typeof window.google !== "undefined" &&
      window.google.maps?.places &&
      ready
    ) {
      setIsApiReady(true);
      console.log("Google Maps API detected as ready");
    }
  }, [ready]);

  const handleSelect = async (selectedAddress: string) => {
    setIsLoadingLocation(true);
    setSearchValue(selectedAddress, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: selectedAddress });
      const geocodeResult = results[0];

      // Find city component
      const cityComponent = geocodeResult.address_components.find((component) =>
        component.types.includes("locality")
      );

      // Verify the address is in allowed states
      const isInAllowedState = geocodeResult.address_components.some(
        (component) =>
          (component.short_name === "CA" || component.short_name === "NY") &&
          component.types.includes("administrative_area_level_1")
      );

      // Check if location is either in allowed city or Orange County
      const isAllowedCity =
        cityComponent &&
        ALLOWED_CITIES.some(
          (city) => city.toLowerCase() === cityComponent.long_name.toLowerCase()
        );

      const isAllowedRegion = isInOrangeCounty(
        geocodeResult.address_components
      );

      if (!isInAllowedState || (!isAllowedCity && !isAllowedRegion)) {
        console.error("Location validation failed:", selectedAddress);
        onChange(selectedAddress, undefined); // Pass address but no coordinates
        return;
      }

      const { lat, lng } = await getLatLng(geocodeResult);
      const { placeId, stateId, countyId } = extractLocationIds(geocodeResult);

      const newCoordinates = { lat, lng };
      setCoordinates(newCoordinates);
      setShowMap(true);

      // Pass complete location data
      const locationData: LocationData = {
        address: selectedAddress,
        coordinates: newCoordinates,
        placeId,
        stateId,
        countyId,
      };

      onChange(selectedAddress, newCoordinates, locationData);
    } catch (error) {
      console.error("Error geocoding address:", error);
      onChange(selectedAddress, undefined); // Pass address but no coordinates
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleMapClick = useCallback(
    async (event: any) => {
      if (event.detail?.latLng) {
        const { lat, lng } = event.detail.latLng;
        const newCoordinates = { lat, lng };

        try {
          setIsLoadingLocation(true);
          const results = await getGeocode({ location: newCoordinates });

          if (results[0]) {
            const geocodeResult = results[0];

            // Find city component
            const cityComponent = geocodeResult.address_components.find(
              (component) => component.types.includes("locality")
            );

            // Verify the location is in allowed states
            const isInAllowedState = geocodeResult.address_components.some(
              (component) =>
                (component.short_name === "CA" ||
                  component.short_name === "NY") &&
                component.types.includes("administrative_area_level_1")
            );

            // Check if location is either in allowed city or Orange County
            const isAllowedCity =
              cityComponent &&
              ALLOWED_CITIES.some(
                (city) =>
                  city.toLowerCase() === cityComponent.long_name.toLowerCase()
              );

            const isAllowedRegion = isInOrangeCounty(
              geocodeResult.address_components
            );

            if (!isInAllowedState || (!isAllowedCity && !isAllowedRegion)) {
              console.error(
                "Map click location validation failed:",
                newCoordinates
              );
              return;
            }

            const newAddress = geocodeResult.formatted_address;
            const { placeId, stateId, countyId } =
              extractLocationIds(geocodeResult);

            setCoordinates(newCoordinates);
            setSearchValue(newAddress, false);

            // Pass complete location data
            const locationData: LocationData = {
              address: newAddress,
              coordinates: newCoordinates,
              placeId,
              stateId,
              countyId,
            };

            onChange(newAddress, newCoordinates, locationData);
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        } finally {
          setIsLoadingLocation(false);
        }
      }
    },
    [onChange, setSearchValue]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    // If user clears the input, hide the map
    if (!newValue.trim()) {
      setShowMap(false);
      setCoordinates(null);
      onChange("");
    } else if (newValue.length > 5) {
      // Show map for manual address entry (fallback)
      setShowMap(true);
      setCoordinates(defaultCenter); // Use default center for manual entry
    }
  };

  return (
    <div className="space-y-4">
      {/* Address Input */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            disabled={!isApiReady}
            className={`
              w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200
              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#2c74b3]"
              }
              ${!isApiReady ? "bg-gray-50 cursor-wait" : ""}
              focus:ring-0 outline-none
            `}
            placeholder={
              isApiReady ? placeholder : "Loading address services..."
            }
          />

          {/* API Loading indicator */}
          {!isApiReady && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
            </div>
          )}

          {/* Geocoding Loading indicator */}
          {isLoadingLocation && isApiReady && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2c74b3]"></div>
            </div>
          )}

          {/* Valid address indicator */}
          {coordinates && !isLoadingLocation && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3 top-[30%] -translate-y-1/2 flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
            </motion.div>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        <AnimatePresence>
          {data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
            >
              {data.map((suggestion, index) => {
                const isAllowed = isAllowedLocation(suggestion.description);
                return (
                  <motion.button
                    key={suggestion.place_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      if (isAllowed) {
                        handleSelect(suggestion.description);
                      }
                    }}
                    className={`w-full px-4 py-3 text-left transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center justify-between group
                      ${
                        isAllowed
                          ? "hover:bg-gray-50 cursor-pointer"
                          : "cursor-not-allowed opacity-50 bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900">
                          {suggestion.description}
                        </span>
                        {!isAllowed && (
                          <p className="text-xs text-red-500 mt-0.5">
                            Not available in this area
                          </p>
                        )}
                      </div>
                    </div>
                    {!isAllowed && <Warning className="w-4 h-4 text-red-400" />}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-red-600 text-sm"
          >
            <Warning className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </div>

      {/* Map */}
      <AnimatePresence>
        {showMap && coordinates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Click on the map to adjust the location</span>
              </div>
            </div>

            <div className="h-64 sm:h-80">
              <Map
                defaultCenter={coordinates}
                defaultZoom={15}
                onClick={handleMapClick}
                style={{ width: "100%", height: "100%" }}
                gestureHandling="greedy"
                zoomControl={true}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                mapId={import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID"}
              >
                <AdvancedMarker position={coordinates}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-[#2c74b3] rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                  >
                    <MapPin className="w-4 h-4 text-white" weight="fill" />
                  </motion.div>
                </AdvancedMarker>
              </Map>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address Confirmation */}
      {coordinates && searchValue && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-800 text-sm">
                Address Confirmed
              </h4>
              <p className="text-green-700 text-sm mt-1">{searchValue}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddressMapInput;

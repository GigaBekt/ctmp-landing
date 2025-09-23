import { useState } from "react";
import { Check } from "phosphor-react";
import { type ZipCodeStepProps } from "./interfaces";

const ZipCodeStep = ({}: ZipCodeStepProps) => {
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

  // const fetchCounty = async () => {
  //   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your actual API key
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     console.log(data, "this is data");

  //     if (data.status === "OK" && data.results.length > 0) {
  //       const addressComponents = data.results[0].address_components;
  //       const countyComponent = addressComponents.find((component) =>
  //         component.types.includes("administrative_area_level_2")
  //       );
  //       const stateComponent = addressComponents.find((component) =>
  //         component.types.includes("administrative_area_level_1")
  //       );

  //       console.log(
  //         { countyComponent, stateComponent },
  //         "this is countyComponent"
  //       );
  //     } else {
  //       console.log("err");
  //     }
  //   } catch (err) {
  //     setError("Failed to fetch county data.");
  //     console.error(err);
  //   }
  // };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enter the location of your project
        </h2>
      </div>

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

import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import AddressMapInput from "./AddressMapInput";

const AddressStep = () => {
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleAddressChange = (
    newAddress: string,
    coordinates?: { lat: number; lng: number },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locationData?: any
  ) => {
    setAddress(newAddress);
    setAddressError("");

    console.log("Address changed:", {
      address: newAddress,
      coordinates,
      locationData,
    });
  };

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
      libraries={["places"]}
    >
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Property Address
          </h2>
        </div>

        <div className="space-y-4">
          <AddressMapInput
            value={address}
            onChange={handleAddressChange}
            placeholder="123 Main Street, City, State"
            error={addressError}
          />

          <p className="text-sm text-gray-500 text-center">
            This helps contractors provide accurate quotes and plan their visit.
          </p>
        </div>
      </div>
    </APIProvider>
  );
};

export default AddressStep;

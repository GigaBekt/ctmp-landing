export interface AddressStepProps {
  onNext: () => void;
  onBack: () => void;
}

export interface LocationData {
  address: string;
  coordinates: { lat: number; lng: number };
  placeId: string;
  stateId: string;
  countyId: string;
  city: string;
  state: string;
}

export interface AddressMapInputProps {
  value: string;
  onChange: (
    address: string,
    coordinates?: { lat: number; lng: number },
    locationData?: LocationData
  ) => void;
  placeholder?: string;
  error?: string;
}

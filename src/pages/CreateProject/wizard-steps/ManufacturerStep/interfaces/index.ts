export interface ManufacturerStepData {
  selectedManufacturer: Manufacturer | null;
  otherText: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  key: string;
}

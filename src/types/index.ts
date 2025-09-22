// Address and location types
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// House information
export interface HouseInfo {
  floors: number;
  totalSqft: number;
  floorSqft: number[];
  existingAcLocation?: string;
  existingAcAge?: number;
  existingAcBrand?: string;
  existingAcModel?: string;
}

// Job and project types
export type JobType = "install" | "replace";
export type ProjectStatus =
  | "pending_review"
  | "active"
  | "completed"
  | "cancelled";

export interface Project {
  id: string;
  customerId: string;
  customerName: string;
  address: Address;
  houseInfo: HouseInfo;
  jobType: JobType;
  preferredBrands?: string[];
  images: string[];
  existingSystemImages?: string[];
  description?: string;
  startingPrice?: number;
  status: ProjectStatus;
  createdAt: Date;
  bids: Bid[];
}

// Bidding system
export interface Bid {
  id: string;
  projectId: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  description: string;
  timeline: string;
  createdAt: Date;
}

// Organization and vendor types
export interface Organization {
  id: string;
  name: string;
  address: Address;
  serviceRadius: number; // in kilometers
  certifications: string[];
  documents: string[];
  isVerified: boolean;
  createdAt: Date;
}

export interface ServiceArea {
  centerLat: number;
  centerLng: number;
  radius: number; // in kilometers
}

// Constants
export const AC_BRANDS = [
  "Carrier",
  "Trane",
  "Lennox",
  "Rheem",
  "Goodman",
  "American Standard",
  "York",
  "Daikin",
  "Mitsubishi",
  "Bryant",
  "Payne",
  "Amana",
  "Other",
] as const;

export const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const;

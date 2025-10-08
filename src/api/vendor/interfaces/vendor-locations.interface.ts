export interface VendorLocation {
  id: string;
  vendor_organization_id: string;
  location_id: string;
  location_name: string;
  location_type: string;
  is_primary: boolean;
  service_radius: number; // in miles
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  parent_id: string | null;
  abbreviation: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  parent?: Location;
}

export interface VendorLocationsResponse {
  data: VendorLocation[];
  message: string | null;
}

export interface AvailableLocationsResponse {
  data: Location[];
  message: string | null;
}

export interface CreateVendorLocationRequest {
  location_id: string;
  is_primary?: boolean;
  service_radius?: number;
}

export interface CreateVendorLocationResponse {
  data: VendorLocation;
  message: string | null;
}

export interface UpdateVendorLocationRequest {
  is_primary?: boolean;
  service_radius?: number;
}

export interface UpdateVendorLocationResponse {
  data: VendorLocation;
  message: string | null;
}

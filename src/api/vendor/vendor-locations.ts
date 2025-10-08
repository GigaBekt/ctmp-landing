import { api } from "../api";
import type {
  VendorLocationsResponse,
  AvailableLocationsResponse,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  UpdateVendorLocationRequest,
  UpdateVendorLocationResponse,
} from "./interfaces";

export const getVendorLocations = async (
  vendorOrganizationId: string
): Promise<VendorLocationsResponse> => {
  const response = await api.get(
    `vendor-organizations/${vendorOrganizationId}/locations`
  );
  return response.data;
};

export const getAvailableLocations =
  async (): Promise<AvailableLocationsResponse> => {
    const response = await api.get("/locations");
    return response.data;
  };

export const createVendorLocation = async (
  vendorOrganizationId: string,
  data: CreateVendorLocationRequest
): Promise<CreateVendorLocationResponse> => {
  const response = await api.post(
    `vendor-organizations/${vendorOrganizationId}/locations`,
    data
  );
  return response.data;
};

export const updateVendorLocation = async (
  vendorOrganizationId: string,
  locationId: string,
  data: UpdateVendorLocationRequest
): Promise<UpdateVendorLocationResponse> => {
  const response = await api.put(
    `vendor-organizations/${vendorOrganizationId}/locations/${locationId}`,
    data
  );
  return response.data;
};

export const deleteVendorLocation = async (
  vendorOrganizationId: string,
  locationId: string
): Promise<{ message: string }> => {
  const response = await api.delete(
    `vendor-organizations/${vendorOrganizationId}/locations/${locationId}`
  );
  return response.data;
};

export const setPrimaryLocation = async (
  vendorOrganizationId: string,
  locationId: string
): Promise<UpdateVendorLocationResponse> => {
  const response = await api.patch(
    `vendor-organizations/${vendorOrganizationId}/locations/${locationId}/set-primary`
  );
  return response.data;
};

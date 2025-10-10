import { api } from "../api";
import type {
  VendorLocationsResponse,
  AvailableLocationsResponse,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
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

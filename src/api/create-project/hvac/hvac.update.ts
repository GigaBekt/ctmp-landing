import { api } from "../../api";
import type {
  HvacUpdateRequest,
  HvacUpdateResponse,
  EstimatePriceResponse,
} from "./interface/hvac-update-interface";

export const updateHvacDetails = async (
  id: string,
  hvac: HvacUpdateRequest
): Promise<HvacUpdateResponse> => {
  const response = await api.post(`/projects/${id}/hvac-details`, hvac);
  return response.data;
};

export const getEstimatePrice = async (
  id: string
): Promise<EstimatePriceResponse> => {
  const response = await api.post(`/projects/${id}/estimate`);
  return response.data;
};

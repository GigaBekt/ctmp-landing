import { api } from "../api";
import {
  type ServiceResponse,
  type ServiceCategoryResponse,
} from "./interface";

export const serviceApi = {
  getServices: async (): Promise<ServiceResponse[]> => {
    const response = await api.get<ServiceResponse[]>("/services");
    return response.data;
  },

  getServiceCategories: async (
    serviceId: string
  ): Promise<ServiceCategoryResponse[]> => {
    const response = await api.get<ServiceCategoryResponse[]>(
      `/services/${serviceId}/categories`
    );
    return response.data;
  },
};

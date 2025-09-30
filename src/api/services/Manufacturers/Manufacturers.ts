import { api } from "@/api";
import type { ManufacturersResponse } from "../interface";

export const manufacturersApi = {
  getManufacturers: async (): Promise<ManufacturersResponse> => {
    const response = await api.get<ManufacturersResponse>(
      "/services/manufacturers"
    );
    return response.data;
  },
};

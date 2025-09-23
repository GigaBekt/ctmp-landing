import { api } from "../api";
import type {
  InstallLocationResponse,
  InstallSpotsResponse,
  SeerOptionsResponse,
  StageOptionsResponse,
  HeatSourceResponse,
  UnitVolumesResponse,
} from "./interface/hvac-interfaces";

export const hvacServiceApi = {
  installLocations: async (): Promise<InstallLocationResponse[]> => {
    const response = await api.get<InstallLocationResponse[]>(
      "/hvac/install-locations"
    );
    return response.data;
  },

  installSpots: async (): Promise<InstallSpotsResponse[]> => {
    const response = await api.get<InstallSpotsResponse[]>(
      `/hvac/install-spots`
    );
    return response.data;
  },

  seerOptions: async (): Promise<SeerOptionsResponse[]> => {
    const response = await api.get<SeerOptionsResponse[]>(`/hvac/seer-options`);
    return response.data;
  },

  stageOptions: async (): Promise<StageOptionsResponse[]> => {
    const response = await api.get<StageOptionsResponse[]>(
      `/hvac/stage-options`
    );
    return response.data;
  },

  heatSources: async (): Promise<HeatSourceResponse[]> => {
    const response = await api.get<HeatSourceResponse[]>(`/hvac/heat-sources`);
    return response.data;
  },

  unitVolumes: async (): Promise<UnitVolumesResponse[]> => {
    const response = await api.get<UnitVolumesResponse[]>(`/hvac/unit-volumes`);
    return response.data;
  },
};

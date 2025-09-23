export interface InstallLocationResponse {
  message: string;
  data: InstallLocation[];
}

export interface InstallLocation {
  id: string;
  key: string;
  name: string;
  install_spots_count: number;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface InstallSpotsResponse {
  message: string;
  data: InstallSpot[];
}

export interface InstallSpot {
  id: string;
  key: string;
  name: string;
  hvac_install_location_id: string;
  install_location: InstallLocation;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface HeatSourceResponse {
  message: string;
  data: HeatSource[];
}

export interface HeatSource {
  id: string;
  key: string;
  name: string;
  parent_id: string | null;
  parent: HeatSource | null;
  children: HeatSourceChild[];
  children_count: number;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface HeatSourceChild {
  id: string;
  key: string;
  name: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
}

export interface SeerOptionsResponse {
  message: string;
  data: SeerOption[];
}

export interface SeerOption {
  id: string;
  key: string;
  description: string;
  projects_count: number;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface StageOptionsResponse {
  message: string;
  data: SeerOption[];
}

export interface UnitVolumesResponse {
  message: string;
  data: UnitVolume[];
}

export interface UnitVolume {
  id: string;
  text: string;
  tonnage: number;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

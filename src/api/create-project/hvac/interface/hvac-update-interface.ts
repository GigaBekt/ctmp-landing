import type { Service } from "@/api/services/interface";
import type {
  HeatSource,
  InstallLocation,
  InstallSpot,
  SeerOption,
  UnitVolume,
} from "@/api/services/interface/hvac-interfaces";

export interface HvacUpdateRequest {
  heat_source_id?: string;
  hvac_install_location_id?: string;
  custom_install_location?: string;
  hvac_install_spot_id?: string;
  custom_install_spot?: string;
  hvac_unit_volume_id?: string;
  custom_unit_volume?: string;
  manufacturer_id?: string;
  hvac_stage_option_id?: string;
  custom_stage_option?: string;
  hvac_seer_option_id?: string;
  custom_seer_option?: string;
}

// HVAC Project Details interface
export interface HvacProjectDetails {
  id: string;
  manufacturer: string;
  heat_source: HeatSource;
  hvac_install_location: InstallLocation;
  hvac_install_spot: InstallSpot;
  hvac_unit_volume: UnitVolume;
  hvac_seer_option: SeerOption | null;
  hvac_stage_option: SeerOption;
  created_at: string;
  updated_at: string;
}

// Project interface (reused from existing)
export interface Project {
  id: string;
  account_id: string | null;
  created_by_user_id: string | null;
  service: Service;
  zip: string;
  county: string;
  address: string;
  estimate_low_cents: number | null;
  estimate_high_cents: number | null;
  estimate_low: number | null;
  estimate_high: number | null;
  schedule_pref: string;
  notes: string;
  status: string;
  hvac_project_details: HvacProjectDetails;
  created_at: string;
  updated_at: string;
}

// HVAC Update Response interface
export interface HvacUpdateResponse {
  message: string;
  data: Project;
}

export interface Price {
  price: number;
}
export interface EstimatePriceResponse {
  message: string;
  data: Price;
}

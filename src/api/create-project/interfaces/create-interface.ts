export interface CreateProjectRequest {
  zip: string;
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

export interface CustomFields {
  custom_service_category: string | null;
  custom_home_type: string | null;
}

export interface Project {
  id: string;
  account_id: string | null;
  created_by_user_id: string | null;
  service: unknown | null;
  service_category: unknown | null;
  custom_service_category: string | null;
  zip: string;
  location: Location;
  address: string | null;
  home_type: unknown | null;
  custom_home_type: string | null;
  estimate_low_cents: number | null;
  estimate_high_cents: number | null;
  estimate_low: number | null;
  estimate_high: number | null;
  schedule_pref: string | null;
  notes: string | null;
  guest_token?: string | null;
  status: string;
  account: unknown | null;
  created_by_user: unknown | null;
  custom_fields: CustomFields;
  images: unknown[];
  created_at: string;
  updated_at: string;
}

export interface ProjectResponse {
  message: string;
  data: Project;
}

export interface UpdateProjectRequest {
  service_id?: string;
  address?: string;
  home_type_id?: string;
  schedule_pref?: string;
  notes?: string;
}

export interface Project {
  id: string;
  account_id: string;
  created_by_user_id: string;
  service: {
    id: string;
    key: string;
    name: string;
    created_at: string;
    updated_at: string;
  } | null;
  service_category: any | null;
  custom_service_category: string | null;
  zip: string;
  location: {
    id: string;
    name: string;
    type: string;
    parent_id: string | null;
    abbreviation: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    parent?: {
      id: string;
      name: string;
      type: string;
      parent_id: string | null;
      abbreviation: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
  } | null;
  address: string | null;
  home_type: {
    id: string;
    key: string;
    name: string;
    created_at: string;
    updated_at: string;
  } | null;
  custom_home_type: string | null;
  estimate_low_cents: number | null;
  estimate_high_cents: number | null;
  estimate_low: number | null;
  estimate_high: number | null;
  schedule_pref: string | null;
  notes: string | null;
  status: string;
  account: {
    id: string;
    type: string;
    display_name: string;
    default_email: string | null;
    default_phone: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    vendor_organization: any | null;
    customer_organization: {
      id: string;
      account_id: string;
      legal_name: string;
      registration_code: string;
      billing_email: string;
      billing_phone: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    } | null;
  } | null;
  created_by_user: {
    id: string;
    name: string;
    middle_name: string | null;
    surname: string;
    email: string;
    phone: string;
    email_verified_at: string | null;
    phone_verified_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  } | null;
  hvac_project_details: {
    id: string;
    manufacturer: any | null;
    custom_heat_source: string | null;
    heat_source: {
      id: string;
      key: string;
      name: string;
      parent_id: string | null;
      created_at: string;
      updated_at: string;
    } | null;
    hvac_install_location: {
      id: string;
      key: string;
      name: string;
      created_at: string;
      updated_at: string;
    } | null;
    custom_install_location: string | null;
    hvac_install_spot: {
      id: string;
      key: string;
      name: string;
      hvac_install_location_id: string;
      created_at: string;
      updated_at: string;
    } | null;
    custom_install_spot: string | null;
    hvac_unit_volume: {
      id: string;
      text: string;
      tonnage: number;
      created_at: string;
      updated_at: string;
    } | null;
    custom_unit_volume: string | null;
    hvac_seer_option: {
      id: string;
      key: string;
      name: string;
      description: string | null;
      created_at: string;
      updated_at: string;
    } | null;
    custom_seer_option: string | null;
    hvac_stage_option: {
      id: string;
      key: string;
      name: string;
      description: string | null;
      created_at: string;
      updated_at: string;
    } | null;
    custom_stage_option: string | null;
    created_at: string;
    updated_at: string;
  } | null;
  custom_fields: {
    custom_service_category: string | null;
    custom_home_type: string | null;
  };
  images: Array<{
    id: number;
    url: string;
    thumb_url: string;
    description: string | null;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ProjectResponse {
  message: string;
  data: Project[];
}

export interface ProjectFilters {
  status: string;
  searchQuery: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface StatusOption {
  value: string;
  label: string;
}

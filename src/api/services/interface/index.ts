export interface ServiceResponse {
  message: string;
  data: Service[];
}
export interface Service {
  id: string;
  key: string;
  name: string;
  categories_count?: number;
  projects_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategoryResponse {
  message: string;
  data: ServiceCategory[];
}
export interface ServiceCategory {
  id: string;
  key: string;
  name: string;
  service_id: string;
  parent_id: string | null;
  service: Service;
  children: ServiceCategory[];
  children_count: number;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

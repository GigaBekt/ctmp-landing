export interface UpdateUserProfileRequest {
  name: string;
  middle_name: string | null;
  surname: string;
  full_name: string | null;
  email: string;
  phone: string;
}

export interface UpdateCustomerOrganizationRequest {
  legal_name: string;
  registration_code: string;
  billing_email: string;
  billing_phone: string;
}

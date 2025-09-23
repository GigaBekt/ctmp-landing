declare enum UserType {
  CUSTOMER = "customer",
  VENDOR = "vendor",
}

declare enum AccountType {
  INDIVIDUAL = "individual",
  ORGANIZATION = "organization",
}
// User types
export interface User {
  id: string;
  name: string;
  middle_name: string | null;
  surname: string;
  full_name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  accounts: Account[];
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: string;
  type: AccountType;
  type_label: string;
  display_name: string;
  default_email: string | null;
  default_phone: string | null;
  vendor_organization: VendorOrganization | null;
  customer_organization: CustomerOrganization | null;
  created_at: string;
  updated_at: string;
}

export interface VendorOrganization {
  id: string;
  legal_name: string;
  registration_code: string;
}

export interface CustomerOrganization {
  id: string;
  legal_name: string;
  registration_code: string;
}

// Auth request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequestCustomerIndividual {
  first_name: string;
  last_name: string;
  user_type: UserType;
  account_type: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterRequestCustomerOrganization {
  first_name: string;
  last_name: string;
  user_type: UserType;
  account_type: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  organization_name: string;
  organization_code: string;
}

export interface RegisterRequestVendorOrganization {
  first_name: string;
  last_name: string;
  user_type: UserType;
  account_type: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  organization_name: string;
  organization_code: string;
}

// Auth response types
export interface AuthResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export type LoginResponse = AuthResponse;

export type RegisterResponse = AuthResponse;

export interface CurrentUserResponse {
  message: string;
  data: User;
}

// Error types
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

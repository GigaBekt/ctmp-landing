// Export API instance
export { api, isAxiosError, getErrorMessage } from "./api";

// Export auth API
export { authApi } from "./auth/auth.api";

// Export types
export type {
  User,
  Account,
  VendorOrganization,
  CustomerOrganization,
  LoginRequest,
  LoginResponse,
  RegisterRequestCustomerIndividual,
  RegisterRequestCustomerOrganization,
  RegisterRequestVendorOrganization,
  RegisterResponse,
  CurrentUserResponse,
  ApiError,
} from "./auth/interface";

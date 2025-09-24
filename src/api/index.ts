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
  UserType,
  AccountType,
} from "./auth/interface";

// Export services
export { hvacServiceApi } from "./services/hvac-service.api";
export { serviceApi } from "./services/service.api";

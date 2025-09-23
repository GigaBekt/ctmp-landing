import { api } from "../api";
import type {
  LoginRequest,
  RegisterRequestCustomerIndividual,
  LoginResponse,
  RegisterResponse,
  RegisterRequestCustomerOrganization,
  RegisterRequestVendorOrganization,
  CurrentUserResponse,
} from "./interface";

// Auth API endpoints
export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  // Register customer individual
  registerCustomerIndividual: async (
    userData: RegisterRequestCustomerIndividual
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  },

  // Register customer organization
  registerCustomerOrganization: async (
    userData: RegisterRequestCustomerOrganization
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  },

  // Register vendor organization
  registerVendorOrganization: async (
    userData: RegisterRequestVendorOrganization
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    const response = await api.get<CurrentUserResponse>("/auth/me");
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};

export default authApi;

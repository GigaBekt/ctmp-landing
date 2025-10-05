import { api } from "../api";
import type {
  UpdateCustomerOrganizationRequest,
  UpdateUserProfileRequest,
} from "./interfaces/user-interface";

export const updateUserProfile = async (data: UpdateUserProfileRequest) => {
  const response = await api.patch("/user/me", data);
  return response.data;
};

export const updateCustomerOrganization = async (
  data: UpdateCustomerOrganizationRequest
) => {
  const response = await api.patch("/user/me/customer-organization", data);
  return response.data;
};

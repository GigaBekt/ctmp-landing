import { api } from "../api";
import type {
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectResponse,
} from "./interfaces/create-interface";

export const createProject = async (
  project: CreateProjectRequest
): Promise<ProjectResponse> => {
  const response = await api.post("/projects", project);
  return response.data;
};

export const updateProject = async (
  id: string,
  project: UpdateProjectRequest
): Promise<ProjectResponse> => {
  const response = await api.patch(`/projects/${id}`, project);
  return response.data;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
//! need to change the return type to the correct type after the api is updated
export const getEstimate = async (id: string): Promise<any> => {
  const response = await api.get(`/projects/${id}/estimate`);
  return response.data;
};

import { api } from "@/api";
import type { ProjectResponse, Project } from "@/pages/Projects/types";

export const projectsApi = {
  getProjects: async (): Promise<ProjectResponse> => {
    const response = await api.get<ProjectResponse>("/projects");
    return response.data;
  },

  getProjectById: async (id: string): Promise<Project> => {
    const response = await api.get<{ data: Project }>(`/projects/${id}`);
    console.log("Raw API Response:", response);
    return response.data.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // updateProject: async (id: string, data: any): Promise<ProjectResponse> => {
  //   const response = await api.patch<ProjectResponse>(`/projects/${id}`, data);
  //   return response.data;
  // },
};

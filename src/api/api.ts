/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.status, error.config?.url);

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden");
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

// Helper function to check if error is from axios
export const isAxiosError = (
  error: unknown
): error is import("axios").AxiosError => {
  return error instanceof AxiosError;
};

// Helper function to get error message
export const getErrorMessage = (error: any): string => {
  if (isAxiosError(error)) {
    return (
      JSON.stringify(error.response?.data) ||
      error.message ||
      "An error occurred"
    );
  }
  return error.message || "An error occurred";
};

export default api;

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("accountId");
    const guestToken = localStorage.getItem("guestToken");

    if (token && accountId) {
      // Authenticated user - use Bearer token + Account ID
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-Account-Id"] = accountId;
    } else if (guestToken) {
      // Guest user - use Guest Token
      config.headers["X-Guest-Token"] = guestToken;
    }

    // Always add Accept header
    config.headers.Accept = "application/json";

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
      localStorage.removeItem("accountId");
      localStorage.removeItem("guestToken");
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

// Helper function to set guest token
export const setGuestToken = (token: string) => {
  localStorage.setItem("guestToken", token);
};

// Helper function to clear guest token
export const clearGuestToken = () => {
  localStorage.removeItem("guestToken");
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");
  return !!(token && accountId);
};

export default api;

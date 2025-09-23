import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type User,
  type AuthResponse,
  AccountType,
} from "@/api/auth/interface";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions
  setUser: (authResponse: AuthResponse) => void;
  clearAuth: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  // Helper methods
  isVendor: () => boolean;
  isCustomer: () => boolean;
  getUserRole: () => "vendor" | "customer" | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Set user and token from API response
      setUser: (authResponse: AuthResponse) => {
        const { token, user } = authResponse.data;
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        // Also store in localStorage for persistence
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      },

      // Clear all auth data
      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },

      // Update user data
      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Check if user is vendor
      isVendor: () => {
        const user = get().user;
        if (!user || !user.accounts) return false;
        return user.accounts.some(
          (account) => account.vendor_organization !== null
        );
      },

      // Check if user is customer
      isCustomer: () => {
        const user = get().user;
        if (!user || !user.accounts) return false;
        return (
          user.accounts.some(
            (account) => account.customer_organization !== null
          ) ||
          user.accounts.some(
            (account) => account.type === AccountType.INDIVIDUAL
          )
        );
      },

      // Get user role
      getUserRole: () => {
        const state = get();
        if (state.isVendor()) return "vendor";
        if (state.isCustomer()) return "customer";
        return null;
      },
    }),
    {
      name: "ctmp-auth",
      // Only persist essential data
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

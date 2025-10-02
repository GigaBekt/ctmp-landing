import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  website?: string;
  bio?: string;
  avatar?: string;
  userTypeId?: string;
  createdAt?: string;
}

export interface OrganizationData {
  organizationName: string;
  legalStructure: string;
  einNumber: string;
  directorFirstName: string;
  directorLastName: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessPhone: string;
  businessEmail: string;
  licenseNumber: string;
  insuranceProvider: string;
  yearsInBusiness: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  projectUpdates: boolean;
  bidNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
}

interface UserState {
  user: User | null;
  organization: OrganizationData | null;
  notifications: NotificationSettings;
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  setOrganization: (org: OrganizationData) => void;
  updateNotificationSetting: (
    key: keyof NotificationSettings,
    value: boolean
  ) => void;
  setAvatar: (avatar: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        projectUpdates: true,
        bidNotifications: true,
        marketingEmails: false,
        securityAlerts: true,
      },
      setUser: (user) => set({ user }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      setOrganization: (org) => set({ organization: org }),
      updateNotificationSetting: (key, value) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [key]: value,
          },
        })),
      setAvatar: (avatar) =>
        set((state) => ({
          user: state.user ? { ...state.user, avatar } : null,
        })),
      clearUser: () => set({ user: null, organization: null }),
    }),
    {
      name: "ctmp-user",
    }
  )
);

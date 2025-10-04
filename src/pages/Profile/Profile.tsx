import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/useUserStore";
import type {
  OrganizationData,
  NotificationSettings,
} from "@/stores/useUserStore";
import { CheckCircle } from "phosphor-react";
import {
  ProfileHeader,
  ProfileForm,
  SecuritySettings,
  NotificationsSettings,
  OrganizationForm,
  ProfileTabs,
} from "./components";

// Mock data for development
const mockUser = {
  id: "1",
  name: "John",
  middle_name: null,
  surname: "Doe",
  full_name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  email_verified_at: "2024-01-15T10:30:00Z",
  phone_verified_at: "2024-01-15T10:30:00Z",
  accounts: [
    {
      id: "acc-1",
      type: "individual" as const,
      type_label: "Individual",
      display_name: "John Doe",
      default_email: "john.doe@example.com",
      default_phone: "+1234567890",
      vendor_organization: null,
      customer_organization: null,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
    },
  ],
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z",
};

const mockOrganization: OrganizationData = {
  organizationName: "ABC HVAC Services",
  legalStructure: "LLC",
  einNumber: "12-3456789",
  directorFirstName: "John",
  directorLastName: "Doe",
  businessAddress: "123 Business St",
  businessCity: "New York",
  businessState: "NY",
  businessZip: "10001",
  businessPhone: "+1234567890",
  businessEmail: "info@abchvac.com",
  licenseNumber: "HVAC-12345",
  insuranceProvider: "State Farm",
  yearsInBusiness: "10",
};

const Profile = () => {
  // Auth store for user data and role checking
  const {
    user: authUser,
    isVendor,
    isCustomer,
    updateUser: updateAuthUser,
  } = useAuthStore();

  // User store for additional profile data
  const {
    organization,
    notifications,
    setOrganization,
    updateNotificationSetting,
    setAvatar,
  } = useUserStore();

  // Use mock data if no user in store (for development)
  const displayUser = authUser || mockUser;
  const displayOrganization = organization || mockOrganization;

  // Local state for UI
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "organization" | "notifications"
  >("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [orgSuccess, setOrgSuccess] = useState(false);

  // Check if user is vendor using auth store logic
  const userIsVendor = isVendor();
  const userIsCustomer = isCustomer();

  // Check if user has vendor organization (for organization tab visibility)
  const hasVendorOrganization =
    displayUser?.accounts?.some(
      (account) => account.vendor_organization !== null
    ) || false;

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (data: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    if (displayUser) {
      updateAuthUser(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsEditing(false);
  };

  const handleSecuritySubmit = (data: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    // Handle security form submission
    console.log("Security data:", data);
  };

  const handleOrganizationSubmit = (data: OrganizationData) => {
    setOrganization(data);
    setOrgSuccess(true);
    setTimeout(() => setOrgSuccess(false), 3000);
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    updateNotificationSetting(key, !notifications[key]);
  };

  const getUserType = () => {
    if (userIsVendor) return "Vendor";
    if (userIsCustomer) return "Customer";
    return "User";
  };

  if (!displayUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2c74b3] mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full py-8 px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Account Settings
        </h1>
        <p className="text-gray-600">
          Manage your profile and account preferences
        </p>
      </div>

      {/* Success Messages */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">
            Profile updated successfully!
          </span>
        </div>
      )}

      {/* Profile Header */}
      <ProfileHeader
        user={displayUser}
        userType={getUserType()}
        isEditing={isEditing}
        onEdit={handleEdit}
        onAvatarUpload={handleAvatarUpload}
      />

      {/* Tabs */}
      <ProfileTabs
        activeTab={activeTab}
        hasVendorOrganization={hasVendorOrganization}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === "profile" && (
        <ProfileForm
          user={displayUser}
          userType={getUserType()}
          isEditing={isEditing}
          onSubmit={handleProfileSubmit}
          onCancel={handleCancel}
        />
      )}

      {activeTab === "settings" && (
        <SecuritySettings onSubmit={handleSecuritySubmit} />
      )}

      {activeTab === "notifications" && (
        <NotificationsSettings
          notifications={notifications}
          onNotificationChange={handleNotificationChange}
        />
      )}

      {activeTab === "organization" && hasVendorOrganization && (
        <OrganizationForm
          organization={displayOrganization}
          onSubmit={handleOrganizationSubmit}
          orgSuccess={orgSuccess}
        />
      )}
    </div>
  );
};

export default Profile;

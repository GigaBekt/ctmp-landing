import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui";
import { useUserStore } from "@/stores/useUserStore";
import type {
  User,
  OrganizationData,
  NotificationSettings,
} from "@/stores/useUserStore";
import {
  PencilSimple as Edit,
  FloppyDisk as Save,
  X,
  User as UserIcon,
  EnvelopeSimple as Mail,
  Phone,
  ShieldCheck as Shield,
  Buildings as Building,
  Calendar,
  Briefcase,
  Camera,
  Bell,
  Globe,
  CheckCircle,
  WarningCircle as AlertCircle,
} from "phosphor-react";

interface ProfileFormData extends Omit<User, "id" | "userTypeId"> {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const legalStructures = [
  "Corporation",
  "LLC",
  "Partnership",
  "Sole Proprietor",
  "Non-Profit",
];

// Mock data for development
const mockUser: User = {
  id: "1",
  email: "john.doe@example.com",
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  website: "https://johndoe.com",
  bio: "Experienced professional with a passion for quality work and customer satisfaction.",
  avatar: "",
  userTypeId: import.meta.env.VITE_VENDOR_USER_TYPE_ID, // Change to customer ID for testing customer view
  createdAt: "2024-01-15T10:30:00Z",
};

const mockOrganization: OrganizationData = {
  organizationName: "ABC HVAC Services",
  legalStructure: "LLC",
  einNumber: "12-3456789",
  directorFirstName: "John",
  directorLastName: "Doe",
  businessAddress: "456 Business Ave",
  businessCity: "New York",
  businessState: "NY",
  businessZip: "10002",
  businessPhone: "+1234567890",
  businessEmail: "contact@abchvac.com",
  licenseNumber: "HVAC-12345",
  insuranceProvider: "State Farm",
  yearsInBusiness: "10",
};

const Profile = () => {
  // Zustand store hooks
  const {
    user: storeUser,
    organization: storeOrganization,
    notifications,
    updateUser,
    setOrganization,
    updateNotificationSetting,
    setAvatar,
  } = useUserStore();

  // Use mock data if no user in store (for development)
  const user = storeUser || mockUser;
  const organization = storeOrganization || mockOrganization;

  // Local state for UI
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "organization" | "notifications"
  >("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [orgSuccess, setOrgSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      website: user?.website || "",
      bio: user?.bio || "",
    },
  });

  const {
    register: registerOrg,
    handleSubmit: handleSubmitOrg,
    formState: { errors: orgErrors },
    reset: resetOrg,
  } = useForm<OrganizationData>({
    defaultValues: organization || {
      organizationName: "",
      legalStructure: legalStructures[0],
      einNumber: "",
      directorFirstName: "",
      directorLastName: "",
      businessAddress: "",
      businessCity: "",
      businessState: "",
      businessZip: "",
      businessPhone: "",
      businessEmail: "",
      licenseNumber: "",
      insuranceProvider: "",
      yearsInBusiness: "",
    },
  });

  // Reset forms when user/organization data changes
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        website: user.website || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (organization) {
      resetOrg(organization);
    }
  }, [organization, resetOrg]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

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

  const onSubmit = (data: ProfileFormData) => {
    if (user) {
      updateUser(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsEditing(false);
  };

  const onSubmitOrg = (data: OrganizationData) => {
    setOrganization(data);
    setOrgSuccess(true);
    setTimeout(() => setOrgSuccess(false), 3000);
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    updateNotificationSetting(key, !notifications[key]);
  };

  // Check if user is vendor
  const isVendor =
    user?.userTypeId === import.meta.env.VITE_VENDOR_USER_TYPE_ID;

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <UserIcon className="w-4 h-4" />,
      disabled: false,
    },
    {
      id: "settings",
      label: "Security",
      icon: <Shield className="w-4 h-4" />,
      disabled: false,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      disabled: false,
    },
  ];

  // Add organization tab for vendors only
  if (isVendor) {
    tabs.splice(1, 0, {
      id: "organization",
      label: "Organization",
      icon: <Briefcase className="w-4 h-4" />,
      disabled: false,
    });
  }

  const InfoItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const NotificationToggle = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-[#2c74b3]" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  if (!user) {
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
          <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
          <span className="text-green-800 font-medium">
            Profile updated successfully!
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                !tab.disabled &&
                setActiveTab(
                  tab.id as
                    | "profile"
                    | "settings"
                    | "organization"
                    | "notifications"
                )
              }
              disabled={tab.disabled}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab.disabled
                  ? "border-transparent text-gray-400 cursor-not-allowed opacity-50"
                  : activeTab === tab.id
                  ? "border-[#2c74b3] text-[#2c74b3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Profile Header Card */}
          <Card className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2c74b3] to-[#1e5a8f] rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-white text-2xl font-bold uppercase">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </p>
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 mb-3 capitalize">
                  {isVendor ? "Vendor" : "Customer"}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined{" "}
                      {new Date(
                        user.createdAt || new Date()
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-[#2c74b3] text-white rounded-lg hover:bg-[#1e5a8f] transition-colors font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </Card>

          {/* Profile Form */}
          <Card className="p-8">
            {!isEditing ? (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem
                    icon={<UserIcon className="w-5 h-5 text-gray-600" />}
                    label="Full Name"
                    value={`${user.firstName} ${user.lastName}`}
                  />
                  <InfoItem
                    icon={<Mail className="w-5 h-5 text-gray-600" />}
                    label="Email Address"
                    value={user.email || ""}
                  />
                  <InfoItem
                    icon={<Phone className="w-5 h-5 text-gray-600" />}
                    label="Phone Number"
                    value={user.phone || "Not provided"}
                  />
                  <InfoItem
                    icon={<Building className="w-5 h-5 text-gray-600" />}
                    label="Account Type"
                    value={isVendor ? "Vendor" : "Customer"}
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Edit Profile Information
                </h3>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\+?[1-9]\d{1,14}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h4 className="text-md font-semibold text-gray-900">
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        {...register("address")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        {...register("city")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        {...register("state")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        {...register("zipCode")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="ZIP Code"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          {...register("website")}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                          placeholder="https://your-website.com"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        {...register("bio")}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-[#2c74b3] rounded-lg hover:bg-[#1e5a8f] transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* Security/Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Password & Security
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      {...register("currentPassword")}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      {...register("newPassword", {
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="Enter new password"
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        validate: (value: string | undefined) =>
                          value === watch("newPassword") ||
                          "Passwords do not match",
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="Confirm new password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-[#2c74b3] rounded-lg hover:bg-[#1e5a8f] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </form>
          </Card>

          {/* Security Settings */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Security Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="px-4 py-2 bg-[#2c74b3] text-white rounded-lg hover:bg-[#1e5a8f] transition-colors text-sm font-medium">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Login Notifications
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Get notified when someone logs into your account
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-[#2c74b3]">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Session Management
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    View and manage your active sessions
                  </p>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Manage
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <NotificationToggle
                label="Email Notifications"
                description="Receive notifications via email"
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange("emailNotifications")}
              />
              <NotificationToggle
                label="SMS Notifications"
                description="Receive notifications via text message"
                checked={notifications.smsNotifications}
                onChange={() => handleNotificationChange("smsNotifications")}
              />
              <NotificationToggle
                label="Project Updates"
                description="Get notified about project status changes"
                checked={notifications.projectUpdates}
                onChange={() => handleNotificationChange("projectUpdates")}
              />
              <NotificationToggle
                label="Bid Notifications"
                description="Receive alerts about new bids and bid updates"
                checked={notifications.bidNotifications}
                onChange={() => handleNotificationChange("bidNotifications")}
              />
              <NotificationToggle
                label="Marketing Emails"
                description="Receive promotional and marketing communications"
                checked={notifications.marketingEmails}
                onChange={() => handleNotificationChange("marketingEmails")}
              />
              <NotificationToggle
                label="Security Alerts"
                description="Get notified about security-related activities"
                checked={notifications.securityAlerts}
                onChange={() => handleNotificationChange("securityAlerts")}
              />
            </div>
          </Card>

          {/* Communication Preferences */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Communication Preferences
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <Bell
                    className="w-5 h-5 text-blue-600 mt-0.5"
                    weight="fill"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">
                      Instant Notifications
                    </h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Get real-time alerts for urgent project updates and
                      customer messages
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Preferred Contact Method
                  </h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-1 focus:ring-[#2c74b3] text-sm">
                    <option>Email</option>
                    <option>Phone</option>
                    <option>SMS</option>
                    <option>In-app only</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Notification Frequency
                  </h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-1 focus:ring-[#2c74b3] text-sm">
                    <option>Immediate</option>
                    <option>Daily digest</option>
                    <option>Weekly summary</option>
                    <option>Monthly summary</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Organization Tab (Vendor only) */}
      {activeTab === "organization" && isVendor && (
        <Card className="p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Organization Information
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Complete your business profile to increase customer confidence
            </p>
          </div>

          <form onSubmit={handleSubmitOrg(onSubmitOrg)} className="space-y-8">
            {/* Basic Organization Info */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Business Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...registerOrg("organizationName", {
                      required: "Organization name is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="Your business name"
                  />
                  {orgErrors.organizationName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {orgErrors.organizationName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Structure <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...registerOrg("legalStructure", {
                      required: "Legal structure is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                  >
                    {legalStructures.map((structure) => (
                      <option key={structure} value={structure}>
                        {structure}
                      </option>
                    ))}
                  </select>
                  {orgErrors.legalStructure && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {orgErrors.legalStructure.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EIN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...registerOrg("einNumber", {
                      required: "EIN number is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="XX-XXXXXXX"
                  />
                  {orgErrors.einNumber && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {orgErrors.einNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years in Business
                  </label>
                  <input
                    type="number"
                    {...registerOrg("yearsInBusiness")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="5"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Director Information */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Director Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...registerOrg("directorFirstName", {
                      required: "Director first name is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="First name"
                  />
                  {orgErrors.directorFirstName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {orgErrors.directorFirstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...registerOrg("directorLastName", {
                      required: "Director last name is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="Last name"
                  />
                  {orgErrors.directorLastName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {orgErrors.directorLastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Contact Information */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Business Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    {...registerOrg("businessAddress")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    {...registerOrg("businessCity")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    {...registerOrg("businessState")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    {...registerOrg("businessZip")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="ZIP Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Phone
                  </label>
                  <input
                    type="tel"
                    {...registerOrg("businessPhone")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    {...registerOrg("businessEmail")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="business@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Professional Credentials
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    {...registerOrg("licenseNumber")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="Professional license number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    {...registerOrg("insuranceProvider")}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-2 focus:ring-blue-100 bg-white transition-colors"
                    placeholder="Insurance company name"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 text-sm font-medium text-white bg-[#2c74b3] rounded-lg hover:bg-[#1e5a8f] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Organization Info
              </button>
            </div>

            {orgSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
                <span className="text-green-800 font-medium">
                  Organization information saved successfully!
                </span>
              </div>
            )}
          </form>
        </Card>
      )}
    </div>
  );
};

export default Profile;

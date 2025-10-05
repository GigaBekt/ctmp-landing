import { useForm } from "react-hook-form";
import { Card } from "@/components/ui";
import {
  User as UserIcon,
  EnvelopeSimple as Mail,
  Phone,
  Buildings as Building,
  Globe,
  WarningCircle as AlertCircle,
  FloppyDisk as Save,
  X,
} from "phosphor-react";

interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  website?: string;
  bio?: string;
}

interface ProfileFormProps {
  user: {
    full_name: string;
    email: string;
    phone: string;
    name: string;
    surname: string;
  };
  userType: "Vendor" | "Customer" | "User";
  isEditing: boolean;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
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
  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const ProfileForm = ({
  user,
  userType,
  isEditing,
  onSubmit,
  onCancel,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user.name || "",
      lastName: user.surname || "",
      email: user.email || "",
      phone: user.phone || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      bio: "",
    },
  });

  const handleFormSubmit = (data: ProfileFormData) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
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
              value={user.full_name}
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
              value={userType}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c74b3] transition-colors"
            >
              <X className="w-4 h-4 inline-block mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium text-white bg-[#2c74b3] rounded-lg hover:bg-[#1e5a8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c74b3] transition-colors"
            >
              <Save className="w-4 h-4 inline-block mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ProfileForm;

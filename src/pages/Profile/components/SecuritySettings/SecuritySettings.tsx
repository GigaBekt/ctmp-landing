import { useForm } from "react-hook-form";
import { Card } from "@/components/ui";
import {
  ShieldCheck as Shield,
  WarningCircle as AlertCircle,
  FloppyDisk as Save,
} from "phosphor-react";

interface SecurityFormData {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface SecuritySettingsProps {
  onSubmit: (data: SecurityFormData) => void;
}

const SecuritySettings = ({ onSubmit }: SecuritySettingsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SecurityFormData>();

  const handleFormSubmit = (data: SecurityFormData) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Password & Security
        </h3>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
              className="px-6 py-3 text-sm font-medium text-white bg-[#2c74b3] rounded-lg hover:bg-[#1e5a8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c74b3] transition-colors"
            >
              <Save className="w-4 h-4 inline-block mr-2" />
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
              <p className="text-xs text-gray-500 mt-1">
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
              <p className="text-xs text-gray-500 mt-1">
                Get notified when someone logs into your account
              </p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-[#2c74b3]`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Session Management
              </h4>
              <p className="text-xs text-gray-500 mt-1">
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
  );
};

export default SecuritySettings;

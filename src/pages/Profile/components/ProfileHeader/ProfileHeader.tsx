import { Card } from "@/components/ui";
import {
  PencilSimple as Edit,
  Calendar,
  EnvelopeSimple as Mail,
  Camera,
} from "phosphor-react";

interface ProfileHeaderProps {
  user: {
    full_name: string;
    email: string;
    created_at: string;
    name: string;
    surname: string;
  };
  userType: "Vendor" | "Customer" | "User";
  isEditing: boolean;
  onEdit: () => void;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader = ({
  user,
  userType,
  isEditing,
  onEdit,
  onAvatarUpload,
}: ProfileHeaderProps) => {
  return (
    <Card className="p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-[#2c74b3] to-[#1e5a8f] rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            <p className="text-white text-2xl font-bold uppercase">
              {user.name?.[0]}
              {user.surname?.[0]}
            </p>
          </div>
          <label className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
            <Camera className="w-4 h-4 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user.full_name}
          </h2>
          <p className="text-gray-600 mb-3 capitalize">{userType}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                Joined{" "}
                {new Date(user.created_at || new Date()).toLocaleDateString()}
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
            onClick={onEdit}
            className="flex items-center gap-2 px-6 py-3 bg-[#2c74b3] text-white rounded-lg hover:bg-[#1e5a8f] transition-colors font-medium"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>
    </Card>
  );
};

export default ProfileHeader;

import { User } from "phosphor-react";
import { type User as IUser } from "@/api/auth/interface";

const UserProfile = ({ user }: { user: IUser }) => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
        <User className="text-gray-500" size={24} />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900 capitalize">
          {user.name}
        </p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

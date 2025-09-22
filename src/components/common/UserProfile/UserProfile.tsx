import { User } from "phosphor-react";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="text-gray-500" size={24} />
        )}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

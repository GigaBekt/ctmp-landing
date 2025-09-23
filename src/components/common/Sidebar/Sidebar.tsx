import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  FolderPlus,
  User,
  Bell,
  SignOut,
  Briefcase,
  CaretRight,
} from "phosphor-react";
import { UserProfile } from "@/components/common";
import { useAuthStore } from "@/stores/auth";
import { type User as IUser } from "@/api/auth/interface";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  // Mock unread notifications count
  const unreadCount = 3;
  console.log(user, "this is user for useAuthStore");
  // Define menu items with proper path matching
  const menuItems = useMemo(
    () => [
      { icon: House, label: "Home", path: "/dashboard" },
      { icon: Briefcase, label: "My Projects", path: "/projects" },
      {
        icon: FolderPlus,
        label: "Create Project",
        path: "/create-project",
      },
      { icon: User, label: "My Profile", path: "/profile" },
      {
        icon: Bell,
        label: "Notifications",
        path: "/notifications",
        count: unreadCount,
      },
    ],
    [unreadCount]
  );

  const handleLogout = () => {
    clearAuth();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <NavLink
          to="/"
          className="text-2xl font-bold text-[#2c74b3] font-heading"
        >
          CTMP
        </NavLink>
      </div>

      <div className="px-4 py-6 border-b border-gray-100">
        <UserProfile user={user as IUser} />
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="mb-4 px-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </h2>
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            return (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-[#2c74b3]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          p-2 rounded-lg transition-colors
                          ${
                            isActive
                              ? "bg-white text-[#2c74b3]"
                              : "text-gray-400"
                          }
                        `}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {item.count && item.count > 0 && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-[#2c74b3] rounded-full w-5 h-5 flex items-center justify-center">
                            {item.count}
                          </span>
                        )}
                        {isActive && (
                          <CaretRight className="w-4 h-4 text-[#2c74b3] ml-2" />
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
        >
          <div className="p-2 text-gray-400">
            <SignOut className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

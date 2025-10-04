import {
  User as UserIcon,
  ShieldCheck as Shield,
  Briefcase,
  Bell,
} from "phosphor-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

interface ProfileTabsProps {
  activeTab: "profile" | "settings" | "organization" | "notifications";
  hasVendorOrganization: boolean;
  onTabChange: (
    tab: "profile" | "settings" | "organization" | "notifications"
  ) => void;
}

const ProfileTabs = ({
  activeTab,
  hasVendorOrganization,
  onTabChange,
}: ProfileTabsProps) => {
  // Base tabs available for all users
  const tabs: Tab[] = [
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

  // Add organization tab ONLY for users with vendor organization
  if (hasVendorOrganization) {
    tabs.splice(1, 0, {
      id: "organization",
      label: "Organization",
      icon: <Briefcase className="w-4 h-4" />,
      disabled: false,
    });
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            disabled={tab.disabled}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#2c74b3] text-[#2c74b3]"
                : tab.disabled
                ? "border-transparent text-gray-400 cursor-not-allowed"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;

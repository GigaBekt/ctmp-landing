import { CaretRight } from "phosphor-react";

interface NavigationItemProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  isActive?: boolean;
  showArrow?: boolean;
  badge?: number;
  onClick?: () => void;
}

const NavigationItem = ({
  icon: Icon,
  label,
  isActive = false,
  showArrow = false,
  badge,
  onClick,
}: NavigationItemProps) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "bg-primary-50 text-primary-700"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      <Icon
        className={`mr-3 ${isActive ? "text-primary-500" : "text-gray-400"}`}
        size={20}
      />
      {label}

      {badge && (
        <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 ml-auto">
          {badge}
        </span>
      )}

      {showArrow && !badge && (
        <div className="ml-auto">
          <CaretRight className="w-4 h-4" />
        </div>
      )}
    </a>
  );
};

export default NavigationItem;

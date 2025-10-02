import { type ReactNode } from "react";

interface TimelineItemProps {
  title: string;
  date?: string;
  description?: string;
  icon?: ReactNode;
  iconBackground?: string;
  isActive?: boolean;
  isFuture?: boolean;
  isLast?: boolean;
  children?: ReactNode;
  className?: string;
}

const TimelineItem = ({
  title,
  date,
  description,
  icon,
  iconBackground = "bg-gray-100",
  isActive = false,
  isFuture = false,
  isLast = false,
  children,
  className = "",
}: TimelineItemProps) => {
  const getIconColor = () => {
    if (isActive) return "text-blue-600";
    if (isFuture) return "text-gray-400";
    return "text-gray-600";
  };

  const getBackgroundColor = () => {
    if (isActive) return "bg-blue-100";
    if (isFuture) return "bg-gray-100";
    return iconBackground;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full ${getBackgroundColor()} flex items-center justify-center ${getIconColor()}`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0 pb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            {date && <p className="text-xs text-gray-500">{date}</p>}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
      {!isLast && (
        <div className="absolute top-12 left-6 w-0.5 h-6 bg-gray-200"></div>
      )}
    </div>
  );
};

export default TimelineItem;

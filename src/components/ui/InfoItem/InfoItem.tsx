import { ReactNode } from "react";

interface InfoItemProps {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const InfoItem = ({ label, icon, children, className = "" }: InfoItemProps) => {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {icon && (
        <div className="flex-shrink-0 mt-0.5 text-gray-400">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {label}
        </p>
        <div className="text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoItem;

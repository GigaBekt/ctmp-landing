import { type ReactNode } from "react";

interface CardProps {
  title?: string;
  titleSize?: "sm" | "md" | "lg";
  titleRight?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({
  title,
  titleSize = "md",
  titleRight,
  children,
  className = "",
  onClick,
}: CardProps) => {
  const titleSizeClasses = {
    sm: "text-sm font-semibold",
    md: "text-base font-semibold",
    lg: "text-lg font-semibold",
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className={`${titleSizeClasses[titleSize]} text-gray-900`}>
            {title}
          </h3>
          {titleRight && <div className="flex items-center">{titleRight}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

import { Card } from "@/components/core";
import { StatCardProps } from "@/pages/Dashboard/interfaces";

const StatCard = ({
  icon: Icon,
  title,
  value,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  return (
    <Card>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          <Icon className={iconColor} size={24} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;

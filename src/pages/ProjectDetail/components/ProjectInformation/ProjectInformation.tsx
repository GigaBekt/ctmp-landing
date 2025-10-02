import { MapPin, Wind, House, Clock } from "phosphor-react";
import { Card, InfoItem } from "@/components/ui";
import { StatusBadge, getStatusDescription } from "../StatusBadge";
import { SERVICE_ICONS } from "../../data";
import type { Project } from "../../types";

interface ProjectInformationProps {
  project: Project;
  formatDateTime: (date: string) => string;
}

export function ProjectInformation({
  project,
  formatDateTime,
}: ProjectInformationProps) {
  const ServiceIcon =
    SERVICE_ICONS[
      project.service?.name?.toLowerCase() as keyof typeof SERVICE_ICONS
    ] || Wind;

  return (
    <Card
      title="Project Information"
      className="shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InfoItem label="Address" icon={<MapPin className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900">
              {project.address || "No address provided"}
            </p>
          </InfoItem>

          <InfoItem label="Service" icon={<ServiceIcon className="h-5 w-5" />}>
            <div>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {project.service?.name || "N/A"}
              </p>
              {project.hvac_project_details?.heat_source?.name && (
                <p className="text-xs text-gray-600 capitalize mt-1">
                  {project.hvac_project_details.heat_source.name.replace(
                    "_",
                    " "
                  )}
                </p>
              )}
            </div>
          </InfoItem>

          <InfoItem label="Status">
            <div className="space-y-2">
              <StatusBadge status={project.status} size="md" />
              <p className="text-sm text-gray-700">
                {getStatusDescription(project.status)}
              </p>
            </div>
          </InfoItem>
        </div>

        <div className="space-y-6">
          <InfoItem label="House Type" icon={<House className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {project.home_type?.name || project.custom_home_type || "N/A"}
            </p>
          </InfoItem>

          <InfoItem label="Created At" icon={<Clock className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900">
              {formatDateTime(project.created_at)}
            </p>
          </InfoItem>

          <InfoItem label="ZIP Code" icon={<MapPin className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900">{project.zip}</p>
          </InfoItem>
        </div>
      </div>
    </Card>
  );
}

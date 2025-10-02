import { MapPin, Calendar, ChatCircle } from "phosphor-react";
import { Card, InfoItem } from "@/components/ui";
import type { Project } from "../../types";

interface PropertyDetailsProps {
  project: Project;
}

export function PropertyDetails({ project }: PropertyDetailsProps) {
  return (
    <Card
      title="Property Details"
      titleSize="sm"
      className="shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="space-y-4">
        <InfoItem label="Location" icon={<MapPin className="h-5 w-5" />}>
          <p className="text-sm font-semibold text-gray-900">
            {project.location?.name || "N/A"}
          </p>
          {project.location?.parent && (
            <p className="text-xs text-gray-600 mt-1">
              {project.location.parent.name}
            </p>
          )}
        </InfoItem>

        <InfoItem
          label="Schedule Preference"
          icon={<Calendar className="h-5 w-5" />}
        >
          <p className="text-sm font-semibold text-gray-900 capitalize">
            {project.schedule_pref || "Not specified"}
          </p>
        </InfoItem>

        {project.notes && (
          <InfoItem label="Notes" icon={<ChatCircle className="h-5 w-5" />}>
            <p className="text-sm text-gray-800 leading-relaxed">
              {project.notes}
            </p>
          </InfoItem>
        )}
      </div>
    </Card>
  );
}

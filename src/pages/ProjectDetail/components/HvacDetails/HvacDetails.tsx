import { Wind, Ruler, Tag } from "phosphor-react";
import { Card, InfoItem } from "@/components/ui";
import type { Project } from "../../types";

interface HvacDetailsProps {
  project: Project;
}

export function HvacDetails({ project }: HvacDetailsProps) {
  if (!project.hvac_project_details) {
    return null;
  }

  const { heat_source, hvac_unit_volume, hvac_seer_option } =
    project.hvac_project_details;

  return (
    <Card
      title="HVAC Details"
      className="shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="space-y-4">
        {heat_source && (
          <InfoItem label="Heat Source" icon={<Wind className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {heat_source.name.replace("_", " ")}
            </p>
          </InfoItem>
        )}

        {hvac_unit_volume && (
          <InfoItem label="Unit Volume" icon={<Ruler className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900">
              {hvac_unit_volume.text}
            </p>
          </InfoItem>
        )}

        {hvac_seer_option && (
          <InfoItem label="SEER Option" icon={<Tag className="h-5 w-5" />}>
            <p className="text-sm font-semibold text-gray-900">
              {hvac_seer_option.name}
            </p>
          </InfoItem>
        )}
      </div>
    </Card>
  );
}

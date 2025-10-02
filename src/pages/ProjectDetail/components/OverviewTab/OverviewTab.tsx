import { ProjectInformation } from "../ProjectInformation";
import { AdditionalDetails } from "../AdditionalDetails";
import { PropertyDetails } from "../PropertyDetails";
import { HvacDetails } from "../HvacDetails";
import type { Project } from "../../types";

interface OverviewTabProps {
  project: Project;
  formatDateTime: (date: string) => string;
}

export function OverviewTab({ project, formatDateTime }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Information */}
        <div className="lg:col-span-2 space-y-6">
          <ProjectInformation
            project={project}
            formatDateTime={formatDateTime}
          />
          <AdditionalDetails project={project} />
        </div>

        {/* Right Column - Property & HVAC Details */}
        <div className="space-y-6">
          <PropertyDetails project={project} />
          <HvacDetails project={project} />
        </div>
      </div>
    </div>
  );
}

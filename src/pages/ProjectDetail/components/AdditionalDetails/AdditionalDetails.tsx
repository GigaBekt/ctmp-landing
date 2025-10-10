import {
  Package,
  MapTrifold,
  Truck,
  CirclesThree,
  Tag,
  Fire,
  Ruler,
  Lightning,
} from "phosphor-react";
import { Card, InfoItem } from "@/components/ui";
import type { Project } from "../../types";

interface AdditionalDetailsProps {
  project: Project;
}

// Mock data for testing (remove when API is ready)
const useMockData = false;
const mockData = {
  manufacturer: "Carrier",
  serviceCategory: "Installation",
  customServiceCategory: null,
  heatSource: "Electric",
  customHeatSource: null,
  installLocation: "Basement",
  customInstallLocation: null,
  installSpot: "Northwest Corner",
  customInstallSpot: null,
  unitVolume: "3.5 tons (42,000 BTU/hr)",
  customUnitVolume: null,
  seerOption: "SEER 16 - High Efficiency",
  customSeerOption: null,
  stageOption: {
    name: "Two-Stage",
    description: "Provides better temperature control and energy efficiency",
  },
  customStageOption: null,
};

export function AdditionalDetails({ project }: AdditionalDetailsProps) {
  const { hvac_project_details } = project;

  // Helper to get manufacturer name (handles different response formats)
  const getManufacturerName = () => {
    if (useMockData) return mockData.manufacturer;
    if (!hvac_project_details?.manufacturer) return null;
    const mfr = hvac_project_details.manufacturer;
    // Direct manufacturer object
    return mfr.name;
  };

  // Section component for better organization
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-5">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
    </div>
  );

  return (
    <Card
      title="System & Installation Details"
      className="shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="space-y-6">
        {/* System Specifications Section */}
        <div>
          <SectionHeader title="System Specifications" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manufacturer */}
            {(useMockData || getManufacturerName()) && (
              <InfoItem
                label="Manufacturer"
                icon={<Package className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {getManufacturerName()}
                </p>
              </InfoItem>
            )}

            {/* Unit Volume */}
            {(useMockData
              ? mockData.unitVolume
              : hvac_project_details?.hvac_unit_volume) && (
              <InfoItem
                label="Unit Volume"
                icon={<Ruler className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.unitVolume
                    : hvac_project_details?.hvac_unit_volume?.text}
                </p>
              </InfoItem>
            )}

            {(useMockData
              ? mockData.customUnitVolume
              : hvac_project_details?.custom_unit_volume) && (
              <InfoItem
                label="Custom Unit Volume"
                icon={<Ruler className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.customUnitVolume
                    : hvac_project_details?.custom_unit_volume}
                </p>
              </InfoItem>
            )}

            {/* SEER Rating */}
            {(useMockData
              ? mockData.seerOption
              : hvac_project_details?.hvac_seer_option) && (
              <InfoItem
                label="SEER Rating"
                icon={<Lightning className="h-5 w-5" />}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {useMockData
                      ? mockData.seerOption
                      : hvac_project_details?.hvac_seer_option?.name}
                  </p>
                </div>
              </InfoItem>
            )}

            {(useMockData
              ? mockData.customSeerOption
              : hvac_project_details?.custom_seer_option) && (
              <InfoItem
                label="Custom SEER"
                icon={<Lightning className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.customSeerOption
                    : hvac_project_details?.custom_seer_option}
                </p>
              </InfoItem>
            )}

            {/* Stage Option */}
            {(useMockData
              ? mockData.stageOption
              : hvac_project_details?.hvac_stage_option) && (
              <InfoItem
                label="Stage Option"
                icon={<CirclesThree className="h-5 w-5" />}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {useMockData
                      ? mockData.stageOption.name
                      : hvac_project_details?.hvac_stage_option?.name}
                  </p>
                  {(useMockData
                    ? mockData.stageOption.description
                    : hvac_project_details?.hvac_stage_option?.description) && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      {useMockData
                        ? mockData.stageOption.description
                        : hvac_project_details?.hvac_stage_option?.description}
                    </p>
                  )}
                </div>
              </InfoItem>
            )}

            {(useMockData
              ? mockData.customStageOption
              : hvac_project_details?.custom_stage_option) && (
              <InfoItem
                label="Custom Stage"
                icon={<CirclesThree className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.customStageOption
                    : hvac_project_details?.custom_stage_option}
                </p>
              </InfoItem>
            )}
          </div>
        </div>

        {/* Installation Details Section */}
        <div>
          <SectionHeader title="Installation Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(useMockData
              ? mockData.customHeatSource
              : hvac_project_details?.custom_heat_source) && (
              <InfoItem
                label="Custom Heat Source"
                icon={<Fire className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.customHeatSource
                    : hvac_project_details?.custom_heat_source}
                </p>
              </InfoItem>
            )}

            {/* Install Location */}
            {(useMockData
              ? mockData.installLocation
              : hvac_project_details?.hvac_install_location) && (
              <InfoItem
                label="Install Location"
                icon={<MapTrifold className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {useMockData
                    ? mockData.installLocation
                    : hvac_project_details?.hvac_install_location?.name}
                </p>
              </InfoItem>
            )}

            {(useMockData
              ? mockData.customInstallLocation
              : hvac_project_details?.custom_install_location) && (
              <InfoItem
                label="Custom Location"
                icon={<MapTrifold className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.customInstallLocation
                    : hvac_project_details?.custom_install_location}
                </p>
              </InfoItem>
            )}

            {/* Install Spot */}
            {(useMockData
              ? mockData.installSpot
              : hvac_project_details?.hvac_install_spot) && (
              <InfoItem
                label="Install Spot"
                icon={<Truck className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {useMockData
                    ? mockData.installSpot
                    : hvac_project_details?.hvac_install_spot?.name}
                </p>
              </InfoItem>
            )}

            {(useMockData
              ? mockData.customInstallSpot
              : hvac_project_details?.custom_install_spot) && (
              <InfoItem
                label="Custom Spot"
                icon={<Truck className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900">
                  {useMockData
                    ? mockData.customInstallSpot
                    : hvac_project_details?.custom_install_spot}
                </p>
              </InfoItem>
            )}
          </div>
        </div>

        {/* Service Information Section */}
        <div>
          <SectionHeader title="Service Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Heat Source */}
            {(useMockData
              ? mockData.heatSource
              : hvac_project_details?.heat_source) && (
              <InfoItem label="Heat Source" icon={<Fire className="h-5 w-5" />}>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {useMockData
                    ? mockData.heatSource
                    : hvac_project_details?.heat_source?.name}
                </p>
              </InfoItem>
            )}
            {/* Service Category */}
            {(useMockData
              ? mockData.serviceCategory
              : project.service_category) && (
              <InfoItem
                label="Service Category"
                icon={<Tag className="h-5 w-5" />}
              >
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {useMockData
                    ? mockData.serviceCategory
                    : project.service_category?.name}
                </p>
              </InfoItem>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

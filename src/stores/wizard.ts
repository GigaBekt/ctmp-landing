import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Service } from "@/api/services/interface";
import type {
  HeatSource,
  InstallLocation,
  InstallSpot,
  SeerOption,
  UnitVolume,
} from "@/api/services/interface/hvac-interfaces";
import type { HomeType } from "@/api/services/interface";

// Wizard step data interfaces
export interface ZipCodeStepData {
  zipCode: string;
}

export interface ServiceSelectionStepData {
  selectedService: Service | null;
  otherText: string;
}

export interface HeatSourceStepData {
  selectedHeatSource: HeatSource | null;
}

export interface SystemDetailsStepData {
  selectedLocation: InstallLocation | null;
  selectedSpots: InstallSpot | null;
  customRequirements: string;
}

export interface SquareFeetStepData {
  selectedUnitVolume: UnitVolume | null;
}

export interface EstimatePriceStepData {
  estimatedPrice: number;
}

export interface HomeDetailsStepData {
  selectedHomeType: HomeType | null;
}

export interface AddressStepData {
  address: string;
  city: string;
  state: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SeerOptionsStepData {
  selectedSeerOption: SeerOption | null;
}

export interface StageOptionsStepData {
  selectedStageOption: SeerOption | null;
}

export interface UploadPhotosStepData {
  photos: File[];
  photoUrls: string[];
}

export interface TimelineStepData {
  selectedTimeline: string;
  preferredDate?: string;
}

// Complete wizard data interface
export interface WizardData {
  zipCode: ZipCodeStepData | null;
  serviceSelection: ServiceSelectionStepData | null;
  heatSource: HeatSourceStepData | null;
  systemDetails: SystemDetailsStepData | null;
  squareFeet: SquareFeetStepData | null;
  estimatePrice: EstimatePriceStepData | null;
  homeDetails: HomeDetailsStepData | null;
  address: AddressStepData | null;
  seerOptions: SeerOptionsStepData | null;
  stageOptions: StageOptionsStepData | null;
  uploadPhotos: UploadPhotosStepData | null;
  timeline: TimelineStepData | null;
  // Project data
  projectId: string | null;
  guestToken: string | null;
}

// Wizard store interface
interface WizardState {
  // Current step
  currentStepIndex: number;

  // Wizard data
  data: WizardData;

  // API data
  services: Service[];
  heatSources: HeatSource[];
  unitVolumes: UnitVolume[];
  installSpots: InstallSpot[];
  installLocations: InstallLocation[];
  stageOptions: SeerOption[];
  seerOptions: SeerOption[];
  homeTypes: HomeType[];

  // Loading states
  isLoadingData: boolean;
  isSubmitting: boolean;

  // Actions
  setCurrentStep: (stepIndex: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Data actions
  setZipCodeData: (data: ZipCodeStepData) => void;
  setServiceSelectionData: (data: ServiceSelectionStepData) => void;
  setHeatSourceData: (data: HeatSourceStepData) => void;
  setSystemDetailsData: (data: SystemDetailsStepData) => void;
  setSquareFeetData: (data: SquareFeetStepData) => void;
  setEstimatePriceData: (data: EstimatePriceStepData) => void;
  setHomeDetailsData: (data: HomeDetailsStepData) => void;
  setAddressData: (data: AddressStepData) => void;
  setSeerOptionsData: (data: SeerOptionsStepData) => void;
  setStageOptionsData: (data: StageOptionsStepData) => void;
  setUploadPhotosData: (data: UploadPhotosStepData) => void;
  setTimelineData: (data: TimelineStepData) => void;

  // Project data actions
  setProjectId: (projectId: string) => void;
  setGuestToken: (guestToken: string) => void;

  // API data actions
  setServices: (services: Service[]) => void;
  setHeatSources: (heatSources: HeatSource[]) => void;
  setUnitVolumes: (unitVolumes: UnitVolume[]) => void;
  setInstallSpots: (installSpots: InstallSpot[]) => void;
  setInstallLocations: (installLocations: InstallLocation[]) => void;
  setStageOptions: (stageOptions: SeerOption[]) => void;
  setSeerOptions: (seerOptions: SeerOption[]) => void;
  setHomeTypes: (homeTypes: HomeType[]) => void;

  // Loading actions
  setLoadingData: (loading: boolean) => void;
  setSubmitting: (submitting: boolean) => void;

  // Utility actions
  clearWizardData: () => void;
  getCompletedSteps: () => string[];
  isStepCompleted: (stepId: string) => boolean;
  getWizardSummary: () => Partial<WizardData>;
}

// Initial wizard data
const initialWizardData: WizardData = {
  zipCode: null,
  serviceSelection: null,
  heatSource: null,
  systemDetails: null,
  squareFeet: null,
  estimatePrice: null,
  homeDetails: null,
  address: null,
  seerOptions: null,
  stageOptions: null,
  uploadPhotos: null,
  timeline: null,
  projectId: null,
  guestToken: null,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStepIndex: 0,
      data: initialWizardData,
      services: [],
      heatSources: [],
      unitVolumes: [],
      installSpots: [],
      installLocations: [],
      stageOptions: [],
      seerOptions: [],
      homeTypes: [],
      isLoadingData: false,
      isSubmitting: false,

      // Step navigation
      setCurrentStep: (stepIndex: number) => {
        set({ currentStepIndex: stepIndex });
      },

      nextStep: () => {
        const { currentStepIndex } = get();
        set({ currentStepIndex: currentStepIndex + 1 });
      },

      previousStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 });
        }
      },

      // Data setters
      setZipCodeData: (data: ZipCodeStepData) => {
        set((state) => ({
          data: { ...state.data, zipCode: data },
        }));
      },

      setServiceSelectionData: (data: ServiceSelectionStepData) => {
        set((state) => ({
          data: { ...state.data, serviceSelection: data },
        }));
      },

      setHeatSourceData: (data: HeatSourceStepData) => {
        set((state) => ({
          data: { ...state.data, heatSource: data },
        }));
      },

      setSystemDetailsData: (data: SystemDetailsStepData) => {
        set((state) => ({
          data: { ...state.data, systemDetails: data },
        }));
      },

      setSquareFeetData: (data: SquareFeetStepData) => {
        set((state) => ({
          data: { ...state.data, squareFeet: data },
        }));
      },

      setEstimatePriceData: (data: EstimatePriceStepData) => {
        set((state) => ({
          data: { ...state.data, estimatePrice: data },
        }));
      },

      setHomeDetailsData: (data: HomeDetailsStepData) => {
        set((state) => ({
          data: { ...state.data, homeDetails: data },
        }));
      },

      setAddressData: (data: AddressStepData) => {
        set((state) => ({
          data: { ...state.data, address: data },
        }));
      },

      setSeerOptionsData: (data: SeerOptionsStepData) => {
        set((state) => ({
          data: { ...state.data, seerOptions: data },
        }));
      },

      setStageOptionsData: (data: StageOptionsStepData) => {
        set((state) => ({
          data: { ...state.data, stageOptions: data },
        }));
      },

      setUploadPhotosData: (data: UploadPhotosStepData) => {
        set((state) => ({
          data: { ...state.data, uploadPhotos: data },
        }));
      },

      setTimelineData: (data: TimelineStepData) => {
        set((state) => ({
          data: { ...state.data, timeline: data },
        }));
      },

      // Project data setters
      setProjectId: (projectId: string) => {
        set((state) => ({
          data: { ...state.data, projectId },
        }));
      },

      setGuestToken: (guestToken: string) => {
        set((state) => ({
          data: { ...state.data, guestToken },
        }));
      },

      // API data setters
      setServices: (services: Service[]) => {
        set({ services });
      },

      setHeatSources: (heatSources: HeatSource[]) => {
        set({ heatSources });
      },

      setUnitVolumes: (unitVolumes: UnitVolume[]) => {
        set({ unitVolumes });
      },

      setInstallSpots: (installSpots: InstallSpot[]) => {
        set({ installSpots });
      },

      setInstallLocations: (installLocations: InstallLocation[]) => {
        set({ installLocations });
      },

      setStageOptions: (stageOptions: SeerOption[]) => {
        set({ stageOptions });
      },

      setSeerOptions: (seerOptions: SeerOption[]) => {
        set({ seerOptions });
      },

      setHomeTypes: (homeTypes: HomeType[]) => {
        set({ homeTypes });
      },

      // Loading setters
      setLoadingData: (loading: boolean) => {
        set({ isLoadingData: loading });
      },

      setSubmitting: (submitting: boolean) => {
        set({ isSubmitting: submitting });
      },

      // Utility functions
      clearWizardData: () => {
        set({
          currentStepIndex: 0,
          data: initialWizardData,
          isSubmitting: false,
        });
      },

      getCompletedSteps: () => {
        const { data } = get();
        const completedSteps: string[] = [];

        if (data.zipCode) completedSteps.push("zip");
        if (data.serviceSelection) completedSteps.push("service");
        if (data.heatSource) completedSteps.push("heat-source");
        if (data.systemDetails) completedSteps.push("system-details");
        if (data.squareFeet) completedSteps.push("square-feet");
        if (data.estimatePrice) completedSteps.push("estimate-price");
        if (data.homeDetails) completedSteps.push("home-details");
        if (data.address) completedSteps.push("address");
        if (data.seerOptions) completedSteps.push("seer-options");
        if (data.stageOptions) completedSteps.push("stage-options");
        if (data.uploadPhotos) completedSteps.push("upload-photos");
        if (data.timeline) completedSteps.push("timeline");

        return completedSteps;
      },

      isStepCompleted: (stepId: string) => {
        const { data } = get();

        switch (stepId) {
          case "zip":
            return !!data.zipCode;
          case "service":
            return !!data.serviceSelection;
          case "heat-source":
            return !!data.heatSource;
          case "system-details":
            return !!data.systemDetails;
          case "square-feet":
            return !!data.squareFeet;
          case "estimate-price":
            return !!data.estimatePrice;
          case "home-details":
            return !!data.homeDetails;
          case "address":
            return !!data.address;
          case "seer-options":
            return !!data.seerOptions;
          case "stage-options":
            return !!data.stageOptions;
          case "upload-photos":
            return !!data.uploadPhotos;
          case "timeline":
            return !!data.timeline;
          default:
            return false;
        }
      },

      getWizardSummary: () => {
        const { data } = get();
        return data;
      },
    }),
    {
      name: "ctmp-wizard",
      // Persist wizard data and current step
      partialize: (state) => ({
        currentStepIndex: state.currentStepIndex,
        data: state.data,
      }),
    }
  )
);

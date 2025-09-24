import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  House,
  Wrench,
  Check,
  ArrowLeft,
  ArrowRight,
  Question,
  Info,
  Fire,
  Lightning,
  Calendar,
  Ruler,
  CurrencyDollar,
} from "phosphor-react";
import { Button } from "@/components";
import {
  ZipCodeStep,
  ServiceSelectionStep,
  HeatSourceStep,
  SystemDetailsStep,
  SquareFeetStep,
  EstimatePriceStep,
  HomeDetailsStep,
  AddressStep,
  TimelineStep,
  HelpModal,
  StageOptionsStep,
  SeerOptionsStep,
} from "./wizard-steps";
import { serviceApi, hvacServiceApi } from "@/api";
import type { Service } from "@/api/services/interface";
import type {
  HeatSource,
  InstallLocation,
  InstallSpot,
  SeerOption,
  UnitVolume,
} from "@/api/services/interface/hvac-interfaces";

// Wizard steps with components
const wizardSteps = [
  {
    id: "zip",
    icon: MapPin,
    title: "What's your ZIP code?",
    subtitle: "We'll find qualified professionals in your area",
    component: ZipCodeStep,
  },
  {
    id: "service",
    icon: Wrench,
    title: "Choose Service",
    subtitle: "What type of service do you need?",
    component: ServiceSelectionStep,
  },
  {
    id: "heat-source",
    icon: Fire,
    title: "Choose Heat Source",
    subtitle: "What type of heating system do you prefer?",
    component: HeatSourceStep,
  },
  {
    // intalattion location
    // get install locations and install spots
    id: "system-details",
    icon: Lightning,
    title: "System Installation",
    subtitle: "Tell us about your installation preferences",
    component: SystemDetailsStep,
  },
  {
    // get unit volumes
    id: "square-feet",
    icon: Ruler,
    title: "Home Size",
    subtitle: "What's your home's square footage?",
    component: SquareFeetStep,
  },
  {
    // get estimate price
    id: "estimate-price",
    icon: CurrencyDollar,
    title: "Estimated Cost",
    subtitle: "See your project price estimate",
    component: EstimatePriceStep,
  },
  {
    //! get home types we dont have this API
    id: "home-details",
    icon: House,
    title: "Home Type",
    subtitle: "What type of property is this?",
    component: HomeDetailsStep,
  },
  {
    id: "address",
    icon: MapPin,
    title: "Property Address",
    subtitle: "Where is your property located?",
    component: AddressStep,
  },

  // add seer options
  // add stage options
  // add photos
  {
    id: "stage-options",
    icon: Calendar,
    title: "Stage Options",
    subtitle: "Choose your preferred stage",
    component: StageOptionsStep,
  },
  {
    id: "seer-options",
    icon: Calendar,
    title: "Seer Options",
    subtitle: "Choose your preferred seer",
    component: SeerOptionsStep,
  },
  {
    //! get timeline we dont have this API
    id: "timeline",
    icon: Calendar,
    title: "When do you need this work done?",
    subtitle: "Choose your preferred timeline",
    component: TimelineStep,
  },
];

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showHelp] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // API Data State
  const [services, setServices] = useState<Service[]>([]);
  const [heatSources, setHeatSources] = useState<HeatSource[]>([]);
  const [unitVolumes, setUnitVolumes] = useState<UnitVolume[]>([]);
  const [installSpots, setInstallSpots] = useState<InstallSpot[]>([]);
  const [installLocations, setInstallLocations] = useState<InstallLocation[]>(
    []
  );
  const [stageOptions, setStageOptions] = useState<SeerOption[]>([]);
  const [seerOptions, setSeerOptions] = useState<SeerOption[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const currentStep = wizardSteps[currentStepIndex];

  // Fetch all required data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoadingData(true);

        // Fetch all API data in parallel
        const [
          servicesResponse,
          heatSourcesResponse,
          unitVolumesResponse,
          installSpotsResponse,
          installLocationsResponse,
          stageOptionsResponse,
          seerOptionsResponse,
        ] = await Promise.all([
          serviceApi.getServices(),
          hvacServiceApi.heatSources(),
          hvacServiceApi.unitVolumes(),
          hvacServiceApi.installSpots(),
          hvacServiceApi.installLocations(),
          hvacServiceApi.stageOptions(),
          hvacServiceApi.seerOptions(),
        ]);

        setServices(servicesResponse.data);
        setHeatSources(heatSourcesResponse.data);
        setUnitVolumes(unitVolumesResponse.data);
        setInstallSpots(installSpotsResponse.data);
        setInstallLocations(installLocationsResponse.data);
        setStageOptions(stageOptionsResponse.data);
        setSeerOptions(seerOptionsResponse.data);
      } catch (error) {
        console.error("Error fetching wizard data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchAllData();
  }, []);

  const handleNext = () => {
    if (currentStepIndex < wizardSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    alert("Request submitted successfully!");
    navigate("/dashboard");
  };

  const renderCurrentStep = () => {
    const currentStep = wizardSteps[currentStepIndex];
    const StepComponent = currentStep.component;

    // Show loading state while fetching data
    if (isLoadingData) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2c74b3]"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      );
    }

    // Pass relevant data to each step
    const stepProps = {
      title: currentStep.title,
      subTitle: currentStep.subtitle,
      icon: currentStep.icon,
      ...(currentStep.id === "service" && { services }),
      ...(currentStep.id === "heat-source" && { heatSources }),
      ...(currentStep.id === "system-details" && {
        installSpots,
        installLocations,
      }),
      ...(currentStep.id === "square-feet" && { unitVolumes }),
      ...(currentStep.id === "stage-options" && { stageOptions }),
      ...(currentStep.id === "seer-options" && { seerOptions }),
    };

    return <StepComponent {...stepProps} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate("/dashboard")}>
              <h1 className="text-2xl font-bold text-[#2c74b3] tracking-wide font-heading">
                CTMP
              </h1>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Help Panel */}
          {showHelp && (
            <div className="bg-blue-50 border-b border-blue-200">
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#2c74b3] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#2c74b3] mb-2">
                      Step Guide
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {getStepHelpText(currentStep.id)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="p-4 sm:p-6 lg:p-8 relative">
            {/* Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="absolute top-4 right-4 flex items-center gap-1 px-3 py-2 bg-[#2c74b3] text-white hover:bg-[#235d8f] rounded-lg transition-colors duration-200 text-sm"
            >
              <Question className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </button>

            {/* Step Content */}
            <div className="min-h-96">{renderCurrentStep()}</div>
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className={currentStepIndex === 0 ? "invisible" : "visible"}
                leftIcon={<ArrowLeft size={16} />}
              >
                <span className="hidden sm:inline">Back</span>
              </Button>

              <div className="flex items-center gap-3">
                {currentStepIndex < wizardSteps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    rightIcon={<ArrowRight size={16} />}
                  >
                    <span className="hidden sm:inline">Next Step</span>
                    <span className="sm:hidden">Next</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                    leftIcon={<Check size={16} />}
                  >
                    <span className="hidden sm:inline">Submit Request</span>
                    <span className="sm:hidden">Submit</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs sm:text-sm text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#2c74b3] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#2c74b3] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Help Modal */}
        <HelpModal
          isOpen={showHelpModal}
          onClose={() => setShowHelpModal(false)}
        />
      </div>
    </div>
  );
};

// Helper function for step help text
const getStepHelpText = (stepId: string): string => {
  const helpTexts = {
    zip: "Enter your ZIP code so we can connect you with local professionals who serve your area.",
    service:
      "Select HVAC for heating and cooling systems, or Electrical for electrical work and installations.",
    "heat-source":
      "Choose between Gas/Electric systems (separate heating and cooling) or Full Electric heat pumps (combined heating and cooling).",
    "system-details":
      "Tell us about your installation preferences - indoor and outdoor unit locations, and any specific requirements.",
    "square-feet":
      "Select your home size range to help us calculate the right system capacity and provide accurate cost estimates.",
    "estimate-price":
      "This preliminary estimate is based on your home size and system preferences. Final quotes from professionals may vary based on site conditions.",
    "home-details":
      "Provide your home type and address so contractors can prepare accurate quotes for your property.",
    address:
      "Enter your property address so contractors can prepare accurate quotes and plan their visit.",
    timeline:
      "Let us know when you need the work completed. This helps us match you with available professionals.",
  };
  return helpTexts[stepId as keyof typeof helpTexts] || "";
};

export default CreateProject;

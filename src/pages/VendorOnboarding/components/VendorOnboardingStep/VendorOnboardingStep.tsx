import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WarningCircle, Spinner } from "phosphor-react";
import {
  uploadVendorDocument,
  deleteVendorDocument,
} from "@/api/vendor/vendor-documents";
import { createVendorLocation } from "@/api/vendor/vendor-locations";
import { validateFileForUpload } from "@/api/vendor/utils/vendor-documents.utils";
import type {
  VendorDocumentType,
  VendorDocument,
  Location,
  VendorLocation,
} from "@/api/vendor/interfaces";
import ProgressIndicator from "./ProgressIndicator";
import DocumentUpload from "./DocumentUpload";
import LocationSelection from "./LocationSelection";
import NavigationButtons from "./NavigationButtons";
import PaymentMethod from "./PaymentMethod";

interface VendorOnboardingStepProps {
  vendorOrganizationId: string;
  onComplete: () => void;
  onSkip?: () => void;
}

const VendorOnboardingStep = ({
  vendorOrganizationId,
  onComplete,
  onSkip,
}: VendorOnboardingStepProps) => {
  const [currentStep, setCurrentStep] = useState<
    "documents" | "locations" | "payment"
  >("documents");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Document state
  const [documentTypes, setDocumentTypes] = useState<VendorDocumentType[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<VendorDocument[]>(
    []
  );
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set()
  );

  // Location state
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<VendorLocation[]>(
    []
  );
  const [selectedLocationIds, setSelectedLocationIds] = useState<Set<string>>(
    new Set()
  );

  // Payment state
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Mock data for development - replace with actual API calls
      const mockDocumentTypes = [
        {
          id: "1",
          name: "Business License",
          description: "Upload your business license or permit",
          is_required: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Insurance Certificate",
          description: "Upload your liability insurance certificate",
          is_required: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Professional Certification",
          description: "Upload any HVAC certifications or licenses",
          is_required: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Tax ID Document",
          description: "Upload your tax identification document",
          is_required: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      const mockLocations = [
        {
          id: "1",
          name: "Atlanta",
          type: "city",
          parent_id: null,
          abbreviation: "ATL",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
        {
          id: "2",
          name: "Marietta",
          type: "city",
          parent_id: null,
          abbreviation: "MAR",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
        {
          id: "3",
          name: "Sandy Springs",
          type: "city",
          parent_id: null,
          abbreviation: "SS",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
        {
          id: "4",
          name: "Roswell",
          type: "city",
          parent_id: null,
          abbreviation: "ROS",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
        {
          id: "5",
          name: "Alpharetta",
          type: "city",
          parent_id: null,
          abbreviation: "ALP",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
        {
          id: "6",
          name: "Johns Creek",
          type: "city",
          parent_id: null,
          abbreviation: "JC",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        },
      ];

      setDocumentTypes(mockDocumentTypes);
      setAvailableLocations(mockLocations);
      setSelectedLocations([]);
      setSelectedLocationIds(new Set());
    } catch {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, documentTypeId: string) => {
    const validation = validateFileForUpload(file);
    if (!validation.isValid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setError(null);

    try {
      const response = await uploadVendorDocument(
        vendorOrganizationId,
        file,
        documentTypeId
      );
      setUploadedDocuments((prev) => [...prev, response.data]);
    } catch {
      setError("Failed to upload document. Please try again.");
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      await deleteVendorDocument(vendorOrganizationId, documentId);
      setUploadedDocuments((prev) =>
        prev.filter((doc) => doc.id !== documentId)
      );
    } catch {
      setError("Failed to delete document. Please try again.");
    }
  };

  const toggleDocumentExpansion = (documentId: string) => {
    setExpandedDocuments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(documentId)) {
        newSet.delete(documentId);
      } else {
        newSet.add(documentId);
      }
      return newSet;
    });
  };

  const handleLocationToggle = async (locationId: string) => {
    const isSelected = selectedLocationIds.has(locationId);

    if (isSelected) {
      // Remove location
      const locationToRemove = selectedLocations.find(
        (loc) => loc.location_id === locationId
      );
      if (locationToRemove) {
        try {
          await createVendorLocation(vendorOrganizationId, {
            location_id: locationId,
            is_primary: false,
            service_radius: 25,
          });
          setSelectedLocationIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(locationId);
            return newSet;
          });
          setSelectedLocations((prev) =>
            prev.filter((loc) => loc.location_id !== locationId)
          );
        } catch {
          setError("Failed to remove location. Please try again.");
        }
      }
    } else {
      // Add location
      try {
        const response = await createVendorLocation(vendorOrganizationId, {
          location_id: locationId,
          is_primary: selectedLocations.length === 0, // First location is primary
          service_radius: 25,
        });
        setSelectedLocationIds((prev) => new Set(prev).add(locationId));
        setSelectedLocations((prev) => [...prev, response.data]);
      } catch {
        setError("Failed to add location. Please try again.");
      }
    }
  };

  const handlePaymentMethodAdded = (paymentId: string) => {
    setPaymentMethodId(paymentId);
  };

  const handleNextStep = () => {
    if (currentStep === "documents") {
      setCurrentStep("locations");
    } else if (currentStep === "locations") {
      setCurrentStep("payment");
    } else {
      onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "locations") {
      setCurrentStep("documents");
    } else if (currentStep === "payment") {
      setCurrentStep("locations");
    }
  };

  const isDocumentsStepComplete = documentTypes
    .filter((type) => type.is_required)
    .every((requiredType) =>
      uploadedDocuments.some((doc) => doc.document_type.id === requiredType.id)
    );

  const isLocationsStepComplete = selectedLocations.length > 0;

  const isPaymentStepComplete = paymentMethodId !== null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Spinner className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading onboarding data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProgressIndicator
        currentStep={currentStep}
        isDocumentsStepComplete={isDocumentsStepComplete}
        isLocationsStepComplete={isLocationsStepComplete}
        isPaymentStepComplete={isPaymentStepComplete}
      />

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center"
        >
          <WarningCircle className="w-5 h-5 mr-2" />
          {error}
        </motion.div>
      )}

      {/* Documents Step */}
      {currentStep === "documents" && (
        <DocumentUpload
          documentTypes={documentTypes}
          uploadedDocuments={uploadedDocuments}
          expandedDocuments={expandedDocuments}
          onToggleDocumentExpansion={toggleDocumentExpansion}
          onFileUpload={handleFileUpload}
          onDeleteDocument={handleDeleteDocument}
        />
      )}

      {/* Locations Step */}
      {currentStep === "locations" && (
        <LocationSelection
          availableLocations={availableLocations}
          selectedLocations={selectedLocations}
          selectedLocationIds={selectedLocationIds}
          onLocationToggle={handleLocationToggle}
        />
      )}

      {/* Payment Step */}
      {currentStep === "payment" && (
        <PaymentMethod onPaymentMethodAdded={handlePaymentMethodAdded} />
      )}

      <NavigationButtons
        currentStep={currentStep}
        isDocumentsStepComplete={isDocumentsStepComplete}
        isLocationsStepComplete={isLocationsStepComplete}
        isPaymentStepComplete={isPaymentStepComplete}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
        onSkip={onSkip}
      />
    </div>
  );
};

export default VendorOnboardingStep;

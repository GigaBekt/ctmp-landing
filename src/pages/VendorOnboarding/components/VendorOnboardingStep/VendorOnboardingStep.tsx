import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WarningCircle, Spinner } from "phosphor-react";
import {
  uploadVendorDocument,
  deleteVendorDocument,
  getDocumentTypes,
} from "@/api/vendor/vendor-documents";
import {
  createVendorLocation,
  getAvailableLocations,
} from "@/api/vendor/vendor-locations";
import { validateFileForUpload } from "@/api/vendor/utils/vendor-documents.utils";
import type {
  VendorDocumentType,
  VendorDocument,
  Location,
} from "@/api/vendor/interfaces";
import ProgressIndicator from "./ProgressIndicator";
import DocumentUpload from "./DocumentUpload";
import HierarchicalLocationSelection from "./HierarchicalLocationSelection";
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

  // Payment state
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // API calls for document types and locations
      const [documentTypes, locations] = await Promise.all([
        getDocumentTypes(),
        getAvailableLocations(),
      ]);
      setDocumentTypes(documentTypes.data);
      setAvailableLocations(locations.data);
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

  const handlePaymentMethodAdded = (paymentId: string) => {
    setPaymentMethodId(paymentId);
  };

  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());

  const handleNextStep = async () => {
    if (currentStep === "documents") {
      setCurrentStep("locations");
    } else if (currentStep === "locations") {
      const response = await createVendorLocation(vendorOrganizationId, {
        location_ids: Array.from(selectedCities),
      });
      console.log(response, "response");
      if (response) {
        setCurrentStep("payment");
      }
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
  const isLocationsStepComplete = selectedCities.size > 0;
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
    <div className="max-w-3xl mx-auto p-6 min-h-lvh">
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
        <HierarchicalLocationSelection
          availableLocations={availableLocations}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
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

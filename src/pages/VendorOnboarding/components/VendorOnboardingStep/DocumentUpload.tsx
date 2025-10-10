import { motion } from "framer-motion";
import DocumentCard from "./DocumentCard";
import type {
  VendorDocumentType,
  VendorDocument,
} from "@/api/vendor/interfaces";

interface DocumentUploadProps {
  documentTypes: VendorDocumentType[];
  uploadedDocuments: VendorDocument[];
  expandedDocuments: Set<string>;
  onToggleDocumentExpansion: (documentId: string) => void;
  onFileUpload: (file: File, documentTypeId: string) => void;
  onDeleteDocument: (documentId: string) => void;
}

const DocumentUpload = ({
  documentTypes,
  uploadedDocuments,
  expandedDocuments,
  onToggleDocumentExpansion,
  onFileUpload,
  onDeleteDocument,
}: DocumentUploadProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Upload Your Documents
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We need a few documents to verify your business and get you started
        </p>
      </div>

      {/* Document Upload Sections */}
      <div className="space-y-4">
        {documentTypes.map((docType) => {
          const uploadedDoc = uploadedDocuments.find(
            (doc) => doc.document_type.id === docType.id
          );
          const isExpanded = expandedDocuments.has(docType.id);

          return (
            <DocumentCard
              key={docType.id}
              docType={docType}
              uploadedDoc={uploadedDoc}
              isExpanded={isExpanded}
              onToggleExpansion={() => onToggleDocumentExpansion(docType.id)}
              onFileUpload={onFileUpload}
              onDeleteDocument={onDeleteDocument}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default DocumentUpload;

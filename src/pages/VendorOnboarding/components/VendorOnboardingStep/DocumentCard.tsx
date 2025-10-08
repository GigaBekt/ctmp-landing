import { Upload, FileText, CheckCircle, X } from "phosphor-react";
import { formatFileSize } from "@/api/vendor/utils/vendor-documents.utils";
import type {
  VendorDocumentType,
  VendorDocument,
} from "@/api/vendor/interfaces";

interface DocumentCardProps {
  docType: VendorDocumentType;
  uploadedDoc?: VendorDocument;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onFileUpload: (file: File, documentTypeId: string) => void;
  onDeleteDocument: (documentId: string) => void;
}

const DocumentCard = ({
  docType,
  uploadedDoc,
  isExpanded,
  onToggleExpansion,
  onFileUpload,
  onDeleteDocument,
}: DocumentCardProps) => {
  const isRequired = docType.is_required;

  return (
    <div
      className={`border rounded-lg transition-all duration-300 ${
        uploadedDoc ? "border-green-200" : "border-gray-200"
      }`}
    >
      {/* Document Header - Always Visible */}
      <div className="p-4 cursor-pointer" onClick={onToggleExpansion}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-lg mr-3 bg-gray-100">
              <FileText className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {docType.name}
              </h3>
              {isRequired && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full ml-2">
                  Required
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {uploadedDoc && (
              <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full mr-3">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span className="text-xs font-medium">Done</span>
              </div>
            )}
            <div
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-gray-600 ml-12 mt-1">{docType.description}</p>
      </div>

      {/* Collapsible Upload Section */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200">
          {uploadedDoc ? (
            <div className="mt-4 flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">
                  {uploadedDoc.original_name}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  ({formatFileSize(uploadedDoc.file_path.length * 1000)})
                </span>
              </div>
              <button
                onClick={() => onDeleteDocument(uploadedDoc.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id={`file-${docType.id}`}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onFileUpload(file, docType.id);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor={`file-${docType.id}`}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG (max 10MB)
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentCard;

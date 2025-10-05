import type { VendorDocument, VendorDocumentType } from "../interfaces";

/**
 * Utility functions for vendor documents
 */

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Get file extension from filename
export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || "";
};

// Check if file type is allowed
export const isAllowedFileType = (
  file: File,
  allowedTypes: string[] = ["pdf", "doc", "docx", "jpg", "jpeg", "png"]
): boolean => {
  const extension = getFileExtension(file.name);
  return allowedTypes.includes(extension);
};

// Group documents by type
export const groupDocumentsByType = (documents: VendorDocument[]) => {
  return documents.reduce((groups, doc) => {
    const typeName = doc.document_type.name;
    if (!groups[typeName]) {
      groups[typeName] = [];
    }
    groups[typeName].push(doc);
    return groups;
  }, {} as Record<string, VendorDocument[]>);
};

// Find required document types that are missing
export const findMissingRequiredDocuments = (
  documents: VendorDocument[],
  documentTypes: VendorDocumentType[]
) => {
  const uploadedTypeIds = new Set(documents.map((doc) => doc.document_type.id));

  return documentTypes.filter(
    (type) =>
      type.name.toLowerCase().includes("required") &&
      !uploadedTypeIds.has(type.id)
  );
};

// Sort documents by creation date (newest first)
export const sortDocumentsByDate = (documents: VendorDocument[]) => {
  return [...documents].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

// Get document preview URL (for images)
export const getDocumentPreviewUrl = (
  document: VendorDocument
): string | null => {
  const extension = getFileExtension(document.original_name);
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

  if (imageExtensions.includes(extension)) {
    return document.file_path;
  }

  return null;
};

// Validate file before upload
export const validateFileForUpload = (
  file: File,
  maxSizeInMB: number = 10
): { isValid: boolean; error?: string } => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeInMB}MB`,
    };
  }

  if (!isAllowedFileType(file)) {
    return {
      isValid: false,
      error:
        "File type not allowed. Please upload PDF, DOC, DOCX, JPG, PNG files only.",
    };
  }

  return { isValid: true };
};

// Create download filename with timestamp
export const createDownloadFilename = (
  originalName: string,
  documentType: string
): string => {
  const timestamp = new Date().toISOString().split("T")[0];
  const extension = getFileExtension(originalName);
  const baseName = originalName.replace(`.${extension}`, "");

  return `${baseName}_${documentType}_${timestamp}.${extension}`;
};

// Format document creation date for display
export const formatDocumentDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

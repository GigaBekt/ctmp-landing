import { api } from "../api";
import type {
  VendorDocumentsResponse,
  VendorDocumentTypesResponse,
  UploadVendorDocumentResponse,
} from "./interfaces";

export const getVendorDocuments = async (
  vendorOrganizationId: string
): Promise<VendorDocumentsResponse> => {
  const response = await api.get(
    `vendor-organizations/${vendorOrganizationId}/documents`
  );
  return response.data;
};

export const getDocumentTypes =
  async (): Promise<VendorDocumentTypesResponse> => {
    const response = await api.get("/vendor-organizations/document-types");
    return response.data;
  };

export const uploadVendorDocument = async (
  vendorOrganizationId: string,
  file: File,
  vendorDocumentTypeId: string
): Promise<UploadVendorDocumentResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("vendor_document_type_id", vendorDocumentTypeId);

  const response = await api.post(
    `vendor-organizations/${vendorOrganizationId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteVendorDocument = async (
  vendorOrganizationId: string,
  documentId: string
): Promise<{ message: string }> => {
  const response = await api.delete(
    `vendor-organizations/${vendorOrganizationId}/documents/${documentId}`
  );
  return response.data;
};

export const downloadVendorDocument = async (
  vendorOrganizationId: string,
  documentId: string
): Promise<Blob> => {
  const response = await api.get(
    `vendor-organizations/${vendorOrganizationId}/documents/${documentId}/download`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

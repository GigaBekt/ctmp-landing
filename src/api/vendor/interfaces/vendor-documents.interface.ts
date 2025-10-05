export interface VendorOrganization {
  id: string;
  legal_name: string;
  registration_code: string;
  billing_email: string;
  billing_phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface VendorDocument {
  id: string;
  vendor_organization: VendorOrganization;
  document_type: DocumentType;
  file_path: string;
  original_name: string;
  created_at: string;
  updated_at: string;
}

export interface VendorDocumentType {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface VendorDocumentsResponse {
  data: VendorDocument[];
  message: string | null;
}

export interface VendorDocumentTypesResponse {
  data: VendorDocumentType[];
  message: string | null;
}

export interface UploadVendorDocumentResponse {
  data: VendorDocument;
  message: string | null;
}

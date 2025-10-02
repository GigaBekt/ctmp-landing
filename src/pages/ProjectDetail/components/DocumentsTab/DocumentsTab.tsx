import {
  FileText,
  Download,
  Upload,
  Warning,
  CheckCircle,
} from "phosphor-react";
import { Card } from "@/components/ui";

const mockDocuments = [
  {
    id: 1,
    name: "Project_Requirements.pdf",
    date: "Nov 10, 2023",
    type: "pdf",
    colorClass: "bg-blue-100 text-blue-600",
    isRequired: false,
  },
  {
    id: 2,
    name: "Site_Photos.zip",
    date: "Nov 10, 2023",
    type: "zip",
    colorClass: "bg-green-100 text-green-600",
    isRequired: false,
  },
];

const requiredDocuments = [
  {
    id: "req-1",
    name: "Property Inspection Report",
    description: "Required for project approval",
    uploaded: false,
  },
  {
    id: "req-2",
    name: "Building Permit",
    description: "Required by local authorities",
    uploaded: false,
  },
  {
    id: "req-3",
    name: "Insurance Certificate",
    description: "Required for project insurance",
    uploaded: true,
    uploadedDate: "Nov 12, 2023",
  },
];

export function DocumentsTab() {
  const pendingRequiredDocs = requiredDocuments.filter((doc) => !doc.uploaded);

  // Combine all uploaded documents (mock + uploaded required docs)
  const uploadedRequiredDocs = requiredDocuments
    .filter((doc) => doc.uploaded)
    .map((doc) => ({
      id: doc.id,
      name: doc.name,
      date: doc.uploadedDate,
      type: "pdf",
      colorClass: "bg-green-100 text-green-600",
      isRequired: true,
    }));

  const allDocuments = [...mockDocuments, ...uploadedRequiredDocs];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Project Documents */}
      <div className="lg:col-span-2">
        <Card
          title="Project Documents"
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          {allDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText
                className="w-12 h-12 text-gray-400 mx-auto mb-3"
                weight="duotone"
              />
              <p className="text-sm text-gray-600">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-2.5 ${doc.colorClass} rounded-lg group-hover:scale-105 transition-transform`}
                    >
                      <FileText className="w-5 h-5" weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {doc.name}
                        </p>
                        {doc.isRequired && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {doc.isRequired
                          ? `Uploaded on ${doc.date}`
                          : `Added on ${doc.date}`}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all"
                    aria-label={`Download ${doc.name}`}
                  >
                    <Download className="w-5 h-5" weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium">
              <Upload className="w-5 h-5" weight="bold" />
              Upload Document
            </button>
          </div>
        </Card>
      </div>

      {/* Right Column - Required Documents */}
      <div className="lg:col-span-1">
        <Card
          title="Required Documents"
          className="shadow-sm hover:shadow-md transition-shadow sticky top-6"
        >
          <div className="space-y-3">
            {pendingRequiredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:border-gray-300 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 flex-shrink-0">
                    {doc.uploaded ? (
                      <CheckCircle
                        className="w-4 h-4 text-green-500"
                        weight="fill"
                      />
                    ) : (
                      <Warning className="w-4 h-4 text-red-500" weight="fill" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

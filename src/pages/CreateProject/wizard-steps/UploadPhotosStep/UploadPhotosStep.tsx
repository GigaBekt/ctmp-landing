import { useState, useRef, useCallback } from "react";
import {
  Upload,
  X,
  Camera,
  CheckCircle,
  Warning,
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  Plus,
} from "phosphor-react";
import { type IWizardStepsProps } from "../Wizard-steps-interface";
import { Header } from "../../components";
import type { UploadedPhoto, PhotoCategory } from "./interfaces";

const UploadPhotosStep = ({ title, subTitle }: IWizardStepsProps) => {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [isExamplesExpanded, setIsExamplesExpanded] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Photo categories with examples
  const photoCategories: PhotoCategory[] = [
    {
      id: "hvac-unit",
      title: "HVAC Unit Location",
      description: "Show where your current HVAC unit is located",
      exampleImage: "https://picsum.photos/400/300?random=1",
      required: true,
    },
    {
      id: "electrical-panel",
      title: "Electrical Panel",
      description: "Clear view of your electrical panel and connections",
      exampleImage: "https://picsum.photos/400/300?random=2",
      required: true,
    },
  ];

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return "Please upload only JPG, PNG, or WebP images";
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    return null;
  };

  const handleFileUpload = useCallback((files: FileList) => {
    setUploadError("");
    const newPhotos: UploadedPhoto[] = [];

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }

      const photo: UploadedPhoto = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      };

      newPhotos.push(photo);
    });

    if (newPhotos.length > 0) {
      setUploadedPhotos((prev) => [...prev, ...newPhotos]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files);
      }
    },
    [handleFileUpload]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removePhoto = (photoId: string) => {
    setUploadedPhotos((prev) => {
      const photo = prev.find((p) => p.id === photoId);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter((p) => p.id !== photoId);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Header title={title} subTitle={subTitle} />

      <div className="space-y-8">
        {/* Example Photos Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setIsExamplesExpanded(!isExamplesExpanded)}
            className="w-full p-6 text-left hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-gray-600" />
                <h3 className="text-md font-medium text-gray-900 ">
                  What Photos Do We Need?
                </h3>
              </div>
              {isExamplesExpanded ? (
                <CaretUp className="w-5 h-5 text-gray-600" />
              ) : (
                <CaretDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExamplesExpanded
                ? "max-h-[800px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-6">
              <p className="text-gray-700 text-sm mb-6">
                Help us provide accurate quotes by uploading photos of your
                current system and installation areas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photoCategories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={category.exampleImage}
                            alt={category.title}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() =>
                              setZoomedImage(category.exampleImage)
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {category.title}
                            </h4>
                            {category.required && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MagnifyingGlass className="w-3 h-3" />
                        <span>Click image to zoom</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        {uploadedPhotos.length === 0 ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              isDragOver
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Your Photos
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your photos here, or{" "}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    browse files
                  </button>
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, WebP • Max 10MB per file • Up to 20 photos
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add More Photos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )}

        {/* Upload Error */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Warning className="w-5 h-5 text-red-600" />
              <p className="text-red-800 text-sm">{uploadError}</p>
            </div>
          </div>
        )}

        {/* Uploaded Photos */}
        {uploadedPhotos.length > 0 && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Uploaded Photos ({uploadedPhotos.length})
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={photo.preview}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Photo Info */}
                  <div className="mt-2">
                    <p
                      className="text-xs text-gray-600 truncate"
                      title={photo.name}
                    >
                      {photo.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(photo.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Tips */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 mb-2">Photo Tips</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Take photos in good lighting for better clarity</li>
                <li>• Include multiple angles of the same area</li>
                <li>
                  • Make sure electrical panels and labels are clearly visible
                </li>
                <li>
                  • Show any existing damage or issues that need attention
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed example"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPhotosStep;

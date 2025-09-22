import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { Upload, X, House, Wrench } from "phosphor-react";
import type { HouseInfo, JobType, Address } from "@/types";
import { AC_BRANDS, US_STATES } from "@/types";

const CreateProject = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form data state
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "CA",
    zipCode: "",
  });

  const [houseInfo, setHouseInfo] = useState<HouseInfo>({
    floors: 1,
    totalSqft: 0,
    floorSqft: [0],
  });

  const [jobType, setJobType] = useState<JobType>("install");
  const [preferredBrands, setPreferredBrands] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [existingSystemImages, setExistingSystemImages] = useState<File[]>([]);

  const handleFloorsChange = (floors: number) => {
    setHouseInfo((prev) => ({
      ...prev,
      floors,
      floorSqft: Array(floors)
        .fill(0)
        .map((_, i) => prev.floorSqft[i] || 0),
    }));
  };

  const handleFloorSqftChange = (index: number, sqft: number) => {
    setHouseInfo((prev) => ({
      ...prev,
      floorSqft: prev.floorSqft.map((val, i) => (i === index ? sqft : val)),
      totalSqft: prev.floorSqft.reduce(
        (sum, val, i) => sum + (i === index ? sqft : val),
        0
      ),
    }));
  };

  const handleBrandToggle = (brand: string) => {
    setPreferredBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleImageUpload = (
    files: FileList | null,
    type: "general" | "existing"
  ) => {
    if (!files) return;

    const fileArray = Array.from(files);
    if (type === "general") {
      setImages((prev) => [...prev, ...fileArray]);
    } else {
      setExistingSystemImages((prev) => [...prev, ...fileArray]);
    }
  };

  const removeImage = (index: number, type: "general" | "existing") => {
    if (type === "general") {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setExistingSystemImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would upload images and create the project
      console.log("Project data:", {
        customerId: user?.id,
        address,
        houseInfo,
        jobType,
        preferredBrands,
        description,
        images: images.map((f) => f.name),
        existingSystemImages: existingSystemImages.map((f) => f.name),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Property Details", icon: House },
    { number: 2, title: "Job Information", icon: Wrench },
    { number: 3, title: "Photos & Submit", icon: Upload },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Project
        </h1>
        <p className="text-gray-600">
          Get quotes from certified HVAC professionals in your area
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-primary-600"
                      : "text-gray-400"
                  }`}
                >
                  Step {step.number}
                </p>
                <p
                  className={`text-xs ${
                    currentStep >= step.number
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? "bg-primary-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Step 1: Property Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Property Details
            </h2>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, street: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, city: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Los Angeles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={address.state}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, state: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, zipCode: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="90210"
                />
              </div>
            </div>

            {/* House Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                House Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Floors
                </label>
                <select
                  value={houseInfo.floors}
                  onChange={(e) => handleFloorsChange(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} Floor{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {houseInfo.floorSqft.map((sqft, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor {index + 1} Square Footage
                  </label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) =>
                      handleFloorSqftChange(
                        index,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="1200"
                  />
                </div>
              ))}

              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">
                  Total Square Footage:{" "}
                  <span className="font-medium">
                    {houseInfo.totalSqft} sqft
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Job Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Information
            </h2>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What type of work do you need?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    name="jobType"
                    value="install"
                    checked={jobType === "install"}
                    onChange={(e) => setJobType(e.target.value as JobType)}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      jobType === "install"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">
                      New Installation
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Install a new HVAC system in a home without existing AC
                    </p>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="jobType"
                    value="replace"
                    checked={jobType === "replace"}
                    onChange={(e) => setJobType(e.target.value as JobType)}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      jobType === "replace"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">Replacement</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Replace an existing HVAC system with a new one
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Existing System Info (only for replacement) */}
            {jobType === "replace" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Existing System Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current System Age (years)
                    </label>
                    <input
                      type="number"
                      value={houseInfo.existingAcAge || ""}
                      onChange={(e) =>
                        setHouseInfo((prev) => ({
                          ...prev,
                          existingAcAge: parseInt(e.target.value) || undefined,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Brand (if known)
                    </label>
                    <input
                      type="text"
                      value={houseInfo.existingAcBrand || ""}
                      onChange={(e) =>
                        setHouseInfo((prev) => ({
                          ...prev,
                          existingAcBrand: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Carrier, Trane, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location of Existing System
                  </label>
                  <input
                    type="text"
                    value={houseInfo.existingAcLocation || ""}
                    onChange={(e) =>
                      setHouseInfo((prev) => ({
                        ...prev,
                        existingAcLocation: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Backyard, side of house, garage, etc."
                  />
                </div>
              </div>
            )}

            {/* Preferred Brands */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Brands (optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {AC_BRANDS.map((brand) => (
                  <label key={brand} className="relative">
                    <input
                      type="checkbox"
                      checked={preferredBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="sr-only"
                    />
                    <div
                      className={`p-2 text-sm border rounded-md cursor-pointer text-center transition-colors ${
                        preferredBrands.includes(brand)
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {brand}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any specific requirements, timeline preferences, or additional information..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Photos & Submit */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Photos & Submit
            </h2>

            {/* General Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Photos
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Upload photos of the area where the HVAC system will be
                installed or the general property
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files, "general")}
                  className="hidden"
                  id="general-images"
                />
                <label
                  htmlFor="general-images"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload images
                  </p>
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        onClick={() => removeImage(index, "general")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Existing System Photos (only for replacement) */}
            {jobType === "replace" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Existing System Photos
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Upload photos of your current HVAC system (both indoor and
                  outdoor units)
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(e.target.files, "existing")
                    }
                    className="hidden"
                    id="existing-images"
                  />
                  <label
                    htmlFor="existing-images"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload existing system photos
                    </p>
                  </label>
                </div>

                {existingSystemImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {existingSystemImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Existing system ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          onClick={() => removeImage(index, "existing")}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Project Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Project Summary
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Address:</span> {address.street}
                  , {address.city}, {address.state} {address.zipCode}
                </p>
                <p>
                  <span className="font-medium">Property:</span>{" "}
                  {houseInfo.floors} floor{houseInfo.floors > 1 ? "s" : ""},{" "}
                  {houseInfo.totalSqft} sqft total
                </p>
                <p>
                  <span className="font-medium">Job Type:</span>{" "}
                  {jobType === "install"
                    ? "New Installation"
                    : "System Replacement"}
                </p>
                {preferredBrands.length > 0 && (
                  <p>
                    <span className="font-medium">Preferred Brands:</span>{" "}
                    {preferredBrands.join(", ")}
                  </p>
                )}
                <p>
                  <span className="font-medium">Photos:</span> {images.length}{" "}
                  property photo{images.length !== 1 ? "s" : ""}
                  {jobType === "replace"
                    ? `, ${existingSystemImages.length} existing system photo${
                        existingSystemImages.length !== 1 ? "s" : ""
                      }`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Project...
                </div>
              ) : (
                "Create Project"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;

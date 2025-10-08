import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { buildPath } from "@/routes/paths";
import { VendorOnboardingStep } from "./components";

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  console.log(user);

  const handleComplete = () => {
    // Navigate to vendor dashboard after onboarding completion
    navigate(buildPath.vendor.dashboard());
  };

  const handleSkip = () => {
    // Navigate to vendor dashboard if user skips onboarding
    navigate(buildPath.vendor.dashboard());
  };

  // Get vendor organization ID from user data
  const vendorOrganizationId = user?.accounts[0].vendor_organization?.id;

  if (!vendorOrganizationId) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You need to be a registered vendor to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="py-12">
        <VendorOnboardingStep
          vendorOrganizationId={vendorOrganizationId}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
};

export default VendorOnboarding;

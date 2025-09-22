import { Outlet } from "react-router-dom";
import { VendorSidebar } from "@/components/common";

const VendorDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorSidebar />
      {/* Main Content Area with left margin for fixed sidebar */}
      <div className="ml-[280px] min-h-screen">
        <div className="max-w-7xl mx-auto px-12 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardLayout;

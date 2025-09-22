import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/common";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main Content Area with left margin for fixed sidebar */}
      <div className="ml-[280px] min-h-screen">
        <div className="max-w-7xl mx-auto px-12 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

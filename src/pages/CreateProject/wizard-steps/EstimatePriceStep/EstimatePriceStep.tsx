import { CheckCircle, Info, TrendUp } from "phosphor-react";

interface EstimatePriceStepProps {
  onNext: () => void;
  onBack: () => void;
}

const EstimatePriceStep = ({}: EstimatePriceStepProps) => {
  // Mock price calculation
  const priceEstimate = {
    low: 3800,
    high: 5200,
    average: 4500,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Estimated Project Cost
        </h2>
        <p className="text-gray-600">
          Based on your home size and system preferences
        </p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
        {/* Main Price Display */}
        <div className="text-center mb-6">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold mb-4">
              <TrendUp className="w-4 h-4" />
              <span>Up to 30% Lower Than Competitors</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {formatPrice(priceEstimate.low)} -{" "}
              {formatPrice(priceEstimate.high)}
            </h3>
            <p className="text-lg text-gray-600 mb-2">Estimated Project Cost</p>
            <p className="text-sm text-gray-500">
              *This is a preliminary estimate. Final pricing may vary.
            </p>
          </div>
        </div>

        {/* Calculation Factors */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#2c74b3]" />
            Estimate based on:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2c74b3]" />
              <span>Home size: 2,000 sq ft</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2c74b3]" />
              <span>System: Central A/C</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2c74b3]" />
              <span>Installation: Standard complexity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2c74b3]" />
              <span>Labor: Professional installation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatePriceStep;

import { useState } from "react";
import { User, Plus } from "phosphor-react";
import { Card } from "@/components/ui";

export function VendorBiddingTab() {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  // Mock bidding data - same as customer sees (anonymous)
  const allBids = [
    {
      id: "bid1",
      vendor: "ABC HVAC Services",
      anonymousName: "Vendor #1",
      amount: 4500,
      rating: "Top rated vendor",
      ratingValue: 4.9,
      reviewCount: 32,
      completedProjects: 87,
      experience: "5+ years",
      daysAgo: 2,
    },
    {
      id: "bid2",
      vendor: "Quality HVAC Co.",
      anonymousName: "Vendor #2",
      amount: 3200,
      rating: "4.8 ★",
      ratingValue: 4.8,
      reviewCount: 24,
      completedProjects: 56,
      experience: "3+ years",
      daysAgo: 3,
    },
    {
      id: "bid3",
      vendor: "Metro HVAC",
      anonymousName: "Vendor #3",
      amount: 3900,
      rating: "4.6 ★",
      ratingValue: 4.6,
      reviewCount: 18,
      completedProjects: 42,
      experience: "2+ years",
      daysAgo: 4,
    },
  ];

  const handleSubmitBid = () => {
    console.log("Submitting bid:", {
      amount: Number(bidAmount),
    });
    // Reset form
    setBidAmount("");
    setShowBidForm(false);
    alert("Bid submitted successfully!");
  };

  const toggleVendorDetails = (bidId: string) => {
    setExpandedVendor(expandedVendor === bidId ? null : bidId);
  };

  const lowestBid = Math.min(...allBids.map((b) => b.amount));
  const highestBid = Math.max(...allBids.map((b) => b.amount));
  const averageBid = Math.round(
    allBids.reduce((acc, b) => acc + b.amount, 0) / allBids.length
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - 70% */}
        <div className="lg:w-[70%] space-y-6">
          {/* Bid Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">
                  Bidding ends in
                </p>
                <p className="text-base font-bold text-gray-900">
                  2 days, 14 hours
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-0.5">Lowest bid</p>
                  <p className="text-base font-bold text-green-600">
                    ${lowestBid.toLocaleString()}
                  </p>
                </div>

                <div className="px-4 py-2 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-0.5">Total bids</p>
                  <p className="text-base font-bold text-gray-900">
                    {allBids.length}
                  </p>
                </div>

                <button
                  onClick={() => setShowBidForm(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Place Bid
                </button>
              </div>
            </div>
          </div>

          {/* Bid Form */}
          {showBidForm && (
            <Card
              title="Place Your Bid"
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Bid Amount */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Bid Amount ($)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowBidForm(false)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitBid}
                    disabled={!bidAmount || Number(bidAmount) === 0}
                    className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Bid
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Current Bids - Always visible */}
          <Card
            title="Current Bids"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {allBids.map((bid) => (
                <div
                  key={bid.id}
                  className="rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-all"
                >
                  <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold text-gray-900">
                            {bid.anonymousName}
                          </p>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= Math.floor(bid.ratingValue)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 ml-1">
                              {bid.ratingValue} ({bid.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Submitted {bid.daysAgo} days ago</span>
                          <button
                            onClick={() => toggleVendorDetails(bid.id)}
                            className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                          >
                            {expandedVendor === bid.id
                              ? "Hide details"
                              : "View details"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-bold text-gray-900">
                        ${bid.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedVendor === bid.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-2 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Completed Projects
                          </p>
                          <p className="text-base font-bold text-gray-900">
                            {bid.completedProjects}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Experience
                          </p>
                          <p className="text-base font-bold text-gray-900">
                            {bid.experience}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">Reviews</p>
                          <p className="text-base font-bold text-gray-900">
                            {bid.reviewCount}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          Recent reviews:
                        </p>
                        <div className="text-xs text-gray-700 p-2 rounded-lg border border-gray-200">
                          "Great service, very professional and completed the
                          job on time."
                        </div>
                        <div className="text-xs text-gray-700 p-2 rounded-lg border border-gray-200">
                          "Excellent work quality and reasonable pricing."
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - 30% */}
        <div className="lg:w-[30%] space-y-6">
          {/* Bid Statistics */}
          <Card
            title="Bid Statistics"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center px-4 py-2 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-700">Average Bid</p>
                <p className="text-sm font-bold text-gray-900">
                  ${averageBid.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center px-4 py-2 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-700">Lowest Bid</p>
                <p className="text-sm font-bold text-green-600">
                  ${lowestBid.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center px-4 py-2 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-700">Highest Bid</p>
                <p className="text-sm font-bold text-red-600">
                  ${highestBid.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

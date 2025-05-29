import { Star } from "lucide-react";

export const ReviewSection = () => (
  <div className="pt-8">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
      Rating & Reviews
    </h3>
    <div className="border rounded-lg p-4 space-y-4 max-w-full sm:max-w-[450px]">
      <div className="flex flex-wrap items-center gap-4">
        <div className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          4.2 <Star className="w-6 h-6 text-yellow-500 ml-1" />
        </div>
        <p className="text-sm text-gray-600">49 Ratings</p>
        <p className="text-sm text-gray-600">3 Reviews</p>
      </div>
      <div className="pt-4 border-t">
        <p className="font-semibold text-gray-800">Most Helpful Review</p>
        <div className="mt-1 text-sm text-gray-600">Anonymous</div>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span>✔ Verified buyer</span>
          <span>•</span>
          <span>Reviewed on: 25/04/2025</span>
        </div>
        <div className="mt-2 text-gray-800">Wow😍😍😍</div>
        <div className="text-gray-600 text-sm">Great Design</div>
        <div className="flex justify-between items-center mt-3">
          <button className="text-sm text-gray-700 hover:underline">
            Helpful
          </button>
          <div className="flex items-center text-sm gap-1">
            <span>5</span>
            <Star className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

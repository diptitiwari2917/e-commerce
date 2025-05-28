import { useState } from "react";
import { Heart, ShoppingBag, Minus, Plus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productDetail } from "../constant";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(productDetail.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const orderData = {
      productId: productDetail.id,
      product: productDetail,
      quantity,
    };
    sessionStorage.setItem("order", JSON.stringify(orderData));
    navigate("/checkout");
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev + 1;
      if (type === "dec" && prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 pt-16 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-8">
        <img
          src={selectedImage}
          alt="T-shirt preview"
          className="w-full max-w-sm rounded-2xl shadow-md object-cover"
        />
        <div className="flex gap-2 flex-wrap justify-center md:justify-start mt-4">
          {productDetail.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Preview ${idx + 1}`}
              className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-xl border-2 ${
                selectedImage === img ? "border-black" : "border-gray-300"
              } cursor-pointer`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 lg:px-0 px-10 ">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {productDetail.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          {productDetail.subTitle}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-green-600 font-medium text-2xl sm:text-[32px]">
            ₹{productDetail.price}
          </span>
          <span className="line-through text-gray-400">
            ₹{productDetail.originalPrice}
          </span>
          <span className="text-orange-500 font-semibold">
            ({productDetail.off}% OFF)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              onClick={() => handleQuantityChange("dec")}
              className="p-2 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("inc")}
              className="p-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={handleBuyNow}
            className="bg-black text-white px-4 py-2 flex items-center gap-2 rounded"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy now
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 flex items-center gap-2 rounded">
            <Heart className="w-4 h-4" />
            Wishlist
          </button>
        </div>

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
      </div>
    </div>
  );
}

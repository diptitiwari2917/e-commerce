import { useState } from "react";
import { Heart, ShoppingBag, Minus, Plus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productDetail } from "../constant";
import { QuantitySelector } from "../../components/quantitySelector";
import { ProductGallery } from "../../components/productGallery";
import { ReviewSection } from "../../components/reviewSection";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(productDetail.images[0]);
  const [wishlisted, setWishlisted] = useState(false);
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

  const toggleWishlist = () => setWishlisted((prev) => !prev);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 pt-16 max-w-7xl mx-auto">
      <ProductGallery
        images={productDetail.images}
        selectedImage={selectedImage}
        onSelect={setSelectedImage}
      />

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

        <QuantitySelector
          quantity={quantity}
          onChange={(type) =>
            setQuantity((prev) => {
              if (type === "inc") return prev + 1;
              if (type === "dec" && prev > 1) return prev - 1;
              return prev;
            })
          }
        />

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={handleBuyNow}
            className="bg-black text-white px-4 py-2 flex items-center gap-2 rounded"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy now
          </button>
          <button
            onClick={toggleWishlist}
            className={`px-4 py-2 flex items-center gap-2 rounded border transition ${
              wishlisted
                ? "bg-pink-100 border-pink-400 text-pink-400"
                : "border-gray-300 text-gray-700"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                wishlisted ? "fill-pink-400 text-pink-400" : "text-gray-500"
              }`}
            />
            Wishlist
          </button>
        </div>

        <ReviewSection />
      </div>
    </div>
  );
}

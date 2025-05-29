import { useNavigate } from "react-router-dom";
import { productDetail } from "../constant";

const HomePage = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {productDetail.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded cursor-pointer hover:shadow-lg"
          onClick={() => handleProductClick(product)}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover rounded"
          />
          <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.subTitle}</p>
          <div className="mt-1 flex gap-2 items-center">
            <span className="text-green-600 font-semibold">
              ₹{product?.price?.toLocaleString()}
            </span>
            <span className="line-through text-gray-400">
              ₹{product?.originalPrice?.toLocaleString()}
            </span>
            <span className="text-orange-500 font-semibold">
              ({product?.off}% OFF)
            </span>
          </div>
          <div className="w-full flex items-center justify-center bg-gray-900 text-white rounded-lg mt-4">
            <button className="p-2 font-semibold">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

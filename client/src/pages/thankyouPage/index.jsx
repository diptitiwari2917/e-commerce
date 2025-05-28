import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../../utils/api";

const ThankYouPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await getOrder(orderId);
        setOrder(res.data);
      } catch {
        alert("Order not found.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!order) return null;

  const {
    fullName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    product,
    quantity,
  } = order;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="bg-green-100 py-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 text-white rounded-full flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Thank you for your purchase
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            We've received your order and will ship it in 5–7 business days.
          </p>
          <p className="text-sm text-gray-600">
            Your order number is <span className="font-mono">#{orderId}</span>
          </p>
        </div>

        <div className="px-6 py-8">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 rounded-lg border p-4 mb-6">
            <div className="font-semibold text-[16px] mb-2">{product.title}</div>
            <div className="flex items-center justify-between mb-2">
              <div className="max-w-[70px]">
                <img src={product.images[0]} alt="product-img" />
              </div>
              <div>
                <span>₹{product.price}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="border-t pt-2 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>₹{(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <strong>Full Name:</strong> {fullName}
            </li>
            <li>
              <strong>Email:</strong> {email}
            </li>
            <li>
              <strong>Phone:</strong> {phone}
            </li>
            <li>
              <strong>Address:</strong> {address}, {city}, {state}, {zip}
            </li>
          </ul>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

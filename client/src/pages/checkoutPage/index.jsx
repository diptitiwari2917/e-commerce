import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../../components/orderSummery";
import Loader from "../../components/loader";
import ErrorModal from "../../components/errorModal";
import { createOrder } from "../../utils/api";
import CheckoutForm from "../../components/checkoutForm";
import { validateForm } from "../../utils/validator";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again."
  );

  useEffect(() => {
    const data = sessionStorage.getItem("order");
    if (!data) return navigate("/");
    setOrderData(JSON.parse(data));
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = { ...form, ...orderData };
      const res = await createOrder(payload);
      sessionStorage.removeItem("order");
      navigate(`/thank-you/${res.data.orderId}`);
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message || "Transaction failed. Please try again."
      );
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (!orderData) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-4 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow"
        >
          <h1 className="text-2xl font-semibold mb-4">CHECKOUT</h1>
          <CheckoutForm
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "PLACE ORDER"}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            By placing your order you agree to our{" "}
            <a href="#" className="underline">
              Terms & Conditions
            </a>
            ,{" "}
            <a href="#" className="underline">
              privacy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              returns policies
            </a>
            .
          </p>
        </form>
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <OrderSummary {...orderData} />
        </div>
      </div>
      {loading && <Loader />}
      {showErrorModal && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
};

export default CheckoutPage;

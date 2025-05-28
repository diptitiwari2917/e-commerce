import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input";
import OrderSummary from "../../components/orderSummery";
import { createOrder } from "../../utils/api";
import Loader from "../../components/loader";
import ErrorModal from "../../components/errorModal";

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

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const cardRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;

    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email";
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Invalid phone number";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.zip) newErrors.zip = "Zip code is required";
    if (!cardRegex.test(form.cardNumber))
      newErrors.cardNumber = "Card must be 16 digits";
    if (!form.expiry || new Date(form.expiry) <= new Date())
      newErrors.expiry = "Must be a future date";
    if (!cvvRegex.test(form.cvv)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = { ...form, ...orderData };
      const res = await createOrder(payload);
      const { orderId } = res.data;
      sessionStorage.removeItem("order");
      navigate(`/thank-you/${orderId}`);
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

          <Input
            name="email"
            label="Email Address"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            name="fullName"
            label="Full Name"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <Input
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="city"
              label="City"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
            />
            <Input
              name="state"
              label="State"
              value={form.state}
              onChange={handleChange}
              error={errors.state}
            />
            <Input
              name="zip"
              label="ZIP Code"
              value={form.zip}
              onChange={handleChange}
              error={errors.zip}
            />
          </div>

          <h2 className="text-xl font-semibold mt-6">Payment</h2>

          <Input
            name="cardNumber"
            label="Card Number"
            value={form.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="expiry"
              label="Expiry Date"
              type="month"
              value={form.expiry}
              onChange={handleChange}
              error={errors.expiry}
            />
            <Input
              name="cvv"
              label="CVV"
              value={form.cvv}
              onChange={handleChange}
              error={errors.cvv}
            />
          </div>

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
          <OrderSummary
            product={orderData.product}
            variant={orderData.variant}
            quantity={orderData.quantity}
          />
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

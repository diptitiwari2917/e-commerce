import { cityOptions, stateOptions } from "../../pages/constant";
import Input from "../input";
import SelectInput from "../selectInput";

const CheckoutForm = ({ form, errors, handleChange }) => (
  <>
    <Input
      name="email"
      label="Email Address"
      value={form.email}
      onChange={handleChange}
      error={errors.email}
      placeholder="Enter email"
    />
    <Input
      name="fullName"
      label="Full Name"
      value={form.fullName}
      onChange={handleChange}
      error={errors.fullName}
      placeholder="Enter your name"
    />
    <Input
      name="phone"
      label="Phone Number"
      value={form.phone}
      onChange={handleChange}
      inputMode="number"
      mask="(999) 999 9999"
      placeholder="(999) 999 9999"
      error={errors.phone}
    />
    <Input
      name="address"
      label="Address"
      value={form.address}
      onChange={handleChange}
      error={errors.address}
      placeholder="Enter your full address"
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectInput
        name="city"
        label="City"
        value={form.city}
        onChange={handleChange}
        error={errors.city}
        options={cityOptions}
      />
      <SelectInput
        name="state"
        label="State"
        value={form.state}
        onChange={handleChange}
        error={errors.state}
        options={stateOptions}
      />
      <Input
        name="zip"
        label="ZIP Code"
        value={form.zip}
        onChange={handleChange}
        error={errors.zip}
        mask="999999"
        placeholder="123456"
      />
    </div>
    <h2 className="text-xl font-semibold mt-6">Payment</h2>
    <Input
      name="cardNumber"
      label="Card Number"
      value={form.cardNumber}
      onChange={handleChange}
      error={errors.cardNumber}
      placeholder="0000 0000 0000 0000"
      mask="9999 9999 9999 9999"
      maskChar={null}
    />
    <div className="grid grid-cols-2 gap-4">
      <Input
        name="expiry"
        label="Expiry Date"
        placeholder="MM/YY"
        value={form.expiry}
        onChange={handleChange}
        error={errors.expiry}
        mask="99/99"
      />
      <Input
        name="cvv"
        label="CVV"
        inputMode="number"
        placeholder="123"
        value={form.cvv}
        onChange={handleChange}
        error={errors.cvv}
        mask="999"
      />
    </div>
  </>
);

export default CheckoutForm;

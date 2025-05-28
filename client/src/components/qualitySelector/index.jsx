import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Quantity
    </label>
    <input
      type="number"
      min="1"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
  </div>
);

export default QuantitySelector;

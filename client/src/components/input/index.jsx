import React from "react";

const Input = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="mb-4">
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Input;

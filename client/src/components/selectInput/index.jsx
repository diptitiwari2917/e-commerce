const SelectInput = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-4">
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled hidden>
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default SelectInput;

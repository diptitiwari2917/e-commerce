import InputMask from "react-input-mask";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  mask,
  placeholder,
  ...rest
}) => {
  const handleMaskedChange = (e) => {
    e.target.name = name;
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
      </label>

      {mask ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={handleMaskedChange}
          maskChar={null}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              {...rest}
              id={name}
              name={name}
              placeholder={placeholder}
              type={type}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </InputMask>
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...rest}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;

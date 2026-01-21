import React from "react";

const TextField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = false,
  type = "text",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-error-600">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full rounded-lg border border-gray-200 bg-transparent py-3 px-5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
      />
    </div>
  );
};

export default TextField;

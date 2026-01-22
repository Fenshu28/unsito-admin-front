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
  error = false,
  success = false,
  hint = "",
}) => {
  // Input con borde visible y sombra
  let inputClasses = `h-11 w-full rounded-lg border bg-white px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 transition-all focus:outline-none focus:ring-4`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 bg-gray-100 cursor-not-allowed`;
  } else if (error) {
    inputClasses += ` text-gray-800 border-error-400 focus:border-error-500 focus:ring-error-500/20`;
  } else if (success) {
    inputClasses += ` text-gray-800 border-success-400 focus:border-success-500 focus:ring-success-500/20`;
  } else {
    inputClasses += ` text-gray-800 border-gray-300 focus:border-brand-500 focus:ring-brand-500/20`;
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />
        {hint && (
          <p
            className={`mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;

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
  // Input estilo Analytics: border-gray-200, rounded-lg, focus-brand (Rojo Vino)
  let inputClasses = `w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 transition-colors disabled:cursor-not-allowed disabled:bg-gray-100`;

  if (error) {
    inputClasses = `w-full rounded-lg border border-red-500 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-red-300 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors`;
  } else if (success) {
    inputClasses = `w-full rounded-lg border border-green-500 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors`;
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
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
            className={`mt-1.5 text-xs ${error ? "text-red-500" : success ? "text-green-500" : "text-gray-500"}`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;

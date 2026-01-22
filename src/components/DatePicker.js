import React from "react";

const DatePicker = ({
  id,
  value,
  onChange,
  disabled = false,
  label,
  required = false,
}) => {
  return (
    <div className="font-sans">
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
          type="date"
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={{
            colorScheme: "light",
          }}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-800 outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
        />
      </div>
    </div>
  );
};

export default DatePicker;

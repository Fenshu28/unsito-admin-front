import React from "react";
import { Icon } from "@iconify/react";

const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seleccione una opción",
  disabled = false,
  required = false,
  valueKey = "_id",
  labelKey = "nombre",
  className = "",
  error = false,
}) => {
  // Select estilo Analytics con focus brand
  let selectClasses = `w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 ${
    value ? "text-gray-800" : "text-gray-500"
  } ${className}`;

  if (error) {
    selectClasses = `w-full appearance-none rounded-lg border border-red-500 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors`;
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
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={selectClasses}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, idx) => (
            <option
              key={option[valueKey] || idx}
              value={option[valueKey]}
              className="text-gray-800"
            >
              {option[labelKey]}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <Icon icon="mdi:chevron-down" width="20" />
        </div>
      </div>
    </div>
  );
};

export default SelectField;

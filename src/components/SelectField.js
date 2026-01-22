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
}) => {
  // Select con bg-white, borde visible y sombra
  const selectClasses = `h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm shadow-theme-xs transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/20 ${
    value ? "text-gray-800" : "text-gray-500"
  } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`;

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
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={selectClasses}
        >
          <option value="" disabled className="text-gray-500">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option[valueKey]}
              value={option[valueKey]}
              className="text-gray-800"
            >
              {option[labelKey]}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 pointer-events-none text-gray-500">
          <Icon icon="mdi:chevron-down" width="20" />
        </span>
      </div>
    </div>
  );
};

export default SelectField;

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
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="relative z-20 w-full appearance-none rounded-lg border border-gray-200 bg-transparent py-3 px-5 pr-12 text-sm text-gray-800 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
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

import React from 'react';
import { Icon } from '@iconify/react';

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
  valueKey = '_id',
  labelKey = 'nombre'
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white font-semibold">
          {label} {required && <span className="text-meta-1">*</span>}
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
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-form-input"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 pointer-events-none">
          <Icon icon="mdi:chevron-down" width="20" />
        </span>
      </div>
    </div>
  );
};

export default SelectField;

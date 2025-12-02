import React from 'react';

const TextAreaField = ({ 
  id,
  name, 
  label, 
  value, 
  onChange, 
  placeholder = "",
  disabled = false,
  required = false,
  rows = 6
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white font-semibold">
          {label} {required && <span className="text-meta-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-form-input"
      ></textarea>
    </div>
  );
};

export default TextAreaField;

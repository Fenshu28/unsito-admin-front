import React from 'react';

const TextField = ({ 
  id,
  name, 
  label, 
  value, 
  onChange, 
  placeholder = "",
  disabled = false,
  required = false,
  type = "text"
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white font-semibold">
          {label} {required && <span className="text-meta-1">*</span>}
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
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-form-input"
      />
    </div>
  );
};

export default TextField;

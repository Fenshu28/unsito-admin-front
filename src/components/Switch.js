import React from 'react';

const Switch = ({ id, checked, onChange, disabled = false, label }) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
          <div
            className={`block h-8 w-14 rounded-full transition ${
              checked ? 'bg-primary' : 'bg-stroke dark:bg-strokedark'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          ></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              checked ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
        {label && (
          <div className="ml-3 text-sm font-semibold text-black dark:text-white">
            {label}
          </div>
        )}
      </label>
    </div>
  );
};

export default Switch;

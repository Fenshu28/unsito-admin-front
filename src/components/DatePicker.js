import React from 'react';
import { Icon } from '@iconify/react';

const DatePicker = ({ id, value, onChange, disabled = false, label, required = false }) => {
  return (
    <div>
      {label && (
        <label className="mb-2.5 block text-black dark:text-white">
          {label} {required && <span className="text-meta-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-form-input"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon icon="mdi:calendar" className="text-gray-400" width="20" />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

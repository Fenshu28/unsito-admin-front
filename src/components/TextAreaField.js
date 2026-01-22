import React from "react";

const TextAreaField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = false,
  rows = 6,
  error = false,
  hint = "",
}) => {
  // TextArea con borde visible y sombra
  let textareaClasses = `w-full rounded-lg border bg-white px-4 py-3 text-sm shadow-theme-xs transition-all focus:outline-none focus:ring-4`;

  if (disabled) {
    textareaClasses += ` text-gray-500 border-gray-300 bg-gray-100 cursor-not-allowed`;
  } else if (error) {
    textareaClasses += ` text-gray-800 border-error-400 focus:border-error-500 focus:ring-error-500/20`;
  } else {
    textareaClasses += ` text-gray-800 border-gray-300 focus:border-brand-500 focus:ring-brand-500/20`;
  }

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
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={textareaClasses}
        ></textarea>
        {hint && (
          <p
            className={`mt-1.5 text-xs ${error ? "text-error-500" : "text-gray-500"}`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextAreaField;

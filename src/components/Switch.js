import React from "react";

const Switch = ({
  id,
  checked,
  onChange,
  disabled = false,
  label,
  color = "blue",
}) => {
  // Colores copiados del tema Switch.tsx
  const switchColors =
    color === "blue"
      ? {
          background: checked ? "bg-brand-500" : "bg-gray-200",
          knob: checked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        }
      : {
          background: checked ? "bg-gray-800" : "bg-gray-200",
          knob: checked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        };

  return (
    // Clases copiadas del tema Switch.tsx
    <label
      htmlFor={id}
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
        disabled ? "text-gray-400" : "text-gray-700"
      }`}
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
          className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${
            disabled
              ? "bg-gray-100 pointer-events-none"
              : switchColors.background
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
        ></div>
      </div>
      {label}
    </label>
  );
};

export default Switch;

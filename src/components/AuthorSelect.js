import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const AuthorSelect = ({
  authors,
  value,
  onChange,
  label,
  placeholder = "Seleccionar autor...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedAuthor = authors.find((a) => a._id === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 transition-all shadow-sm"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {selectedAuthor ? (
            <>
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-brand-600 shrink-0 overflow-hidden">
                {selectedAuthor.foto ? (
                  <img
                    src={selectedAuthor.foto}
                    alt={selectedAuthor.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon="mdi:account" width="18" />
                )}
              </div>
              <span className="font-bold truncate">
                {selectedAuthor.nombre || "Sin nombre"}
              </span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <Icon
          icon="mdi:chevron-down"
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          width="20"
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-64 overflow-y-auto">
          {authors.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 italic">
              No hay autores disponibles
            </div>
          ) : (
            authors.map((author) => (
              <button
                key={author._id}
                type="button"
                onClick={() => {
                  onChange(author._id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 ${
                  value === author._id
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700"
                }`}
              >
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-brand-600 shrink-0 overflow-hidden">
                  {author.foto ? (
                    <img
                      src={author.foto}
                      alt={author.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon icon="mdi:account" width="18" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {author.nombre || "Sin nombre"}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate">
                    {author.email}
                  </span>
                </div>
                {value === author._id && (
                  <Icon
                    icon="mdi:check"
                    className="ml-auto text-brand-600"
                    width="18"
                  />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorSelect;

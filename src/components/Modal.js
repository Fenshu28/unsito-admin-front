import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  showCloseButton = true,
  className = "",
}) => {
  const modalRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto z-99999">
      {/* Backdrop con blur */}
      <div
        className="fixed inset-0 h-full w-full bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content con sombra prominente */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-2xl mx-4 rounded-2xl bg-white shadow-theme-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con fondo sutil */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 rounded-t-2xl px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500 shadow-theme-xs transition-all hover:bg-gray-300 hover:text-gray-700"
            >
              <Icon icon="mdi:close" width="20" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer con fondo sutil */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

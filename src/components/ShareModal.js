import React from "react";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

const ShareModal = ({ isOpen, onClose, publicacionId }) => {
  const frontBaseUrl =
    process.env.REACT_APP_FRONT_CLIENT || "http://localhost:8082";
  const shareUrl = `${frontBaseUrl}/publicacion/${publicacionId}`;

  // Google Charts QR API
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=${encodeURIComponent(shareUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    // Podríamos añadir un mini toast interno aquí si quisiéramos, pero por ahora simplificamos
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compartir Publicación"
      className="max-w-md"
    >
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        {/* QR Container */}
        <div className="p-4 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
          <img
            src={qrUrl}
            alt="Código QR de la publicación"
            className="w-64 h-64 object-contain"
          />
        </div>

        <div className="space-y-2 w-full">
          <p className="text-sm font-medium text-gray-500">
            Escanea el código o usa el enlace directo
          </p>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 w-full group overflow-hidden">
            <Icon
              icon="mdi:link-variant"
              className="text-gray-400 shrink-0"
              width="20"
            />
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs font-bold text-gray-600 outline-none w-full cursor-default truncate"
            />
            <button
              onClick={handleCopy}
              className="p-2 bg-white text-gray-500 rounded-lg shadow-sm border border-gray-100 hover:text-brand-600 transition-colors active:scale-90"
              title="Copiar enlace"
            >
              <Icon icon="mdi:content-copy" width="18" />
            </button>
          </div>
        </div>

        <div className="pt-2 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
          >
            Entendido
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;

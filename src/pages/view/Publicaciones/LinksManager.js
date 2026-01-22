import React, { useState } from "react";
import { Icon } from "@iconify/react";

const LinksManager = ({ links = [], onLinksChange, isDraft = true }) => {
  const [newLink, setNewLink] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    if (!newLink.trim()) {
      setError("La URL es requerida");
      return;
    }
    if (!validateUrl(newLink)) {
      setError("URL inválida. Incluya http:// o https://");
      return;
    }

    onLinksChange([...links, newLink]);
    setNewLink("");
    setError("");
  };

  const handleRemove = (index) => {
    if (window.confirm("¿Eliminar este enlace?")) {
      onLinksChange(links.filter((_, i) => i !== index));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Action Header / Input Area inside Accordion */}
      {isDraft && (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="url"
              placeholder="https://ejemplo.com"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full rounded-lg border border-gray-300 bg-white py-2 px-4 pr-10 text-sm text-gray-800 outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600/20 ${error ? "border-red-500" : ""}`}
            />
            {error && (
              <p className="absolute -bottom-5 left-0 text-[10px] text-red-600 font-medium">
                {error}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 transition-all shadow-sm"
          >
            <Icon icon="mdi:plus" width="18" />
            Agregar
          </button>
        </div>
      )}

      {/* Links List */}
      <div className={isDraft ? "pt-2" : ""}>
        {links.length > 0 ? (
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-200 p-3 hover:bg-gray-50 transition-all group"
              >
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                    <Icon icon="mdi:link-variant" width="18" />
                  </div>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-600 hover:underline truncate"
                  >
                    {link}
                  </a>
                </div>
                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="ml-3 p-1.5 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Icon icon="mdi:delete-outline" width="18" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Icon
              icon="mdi:link-off"
              className="w-12 h-12 mb-3 text-gray-300"
            />
            <p className="text-sm text-gray-500 font-sans">
              No hay enlaces registrados
            </p>
          </div>
        )}

        {!isDraft && links.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-700 text-xs font-sans">
            <Icon icon="mdi:alert-circle" width="16" />
            Los enlaces no pueden editarse en modo "Publicado".
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksManager;

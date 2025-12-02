import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const LinksManager = ({ links = [], onLinksChange, isDraft = true }) => {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

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
      setError('La URL es requerida');
      return;
    }
    if (!validateUrl(newLink)) {
      setError('URL inválida. Debe incluir http:// o https://');
      return;
    }

    onLinksChange([...links, newLink]);
    setNewLink('');
    setError('');
  };

  const handleRemove = (index) => {
    onLinksChange(links.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full">
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          Enlaces Externos
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {links.length} enlace{links.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="p-6">
        {/* Lista de enlaces */}
        {links.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {links.map((link, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-strokedark group hover:bg-gray-50 dark:hover:bg-meta-4"
              >
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <Icon icon="mdi:link-variant" className="text-primary flex-shrink-0" width="18" />
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate"
                  >
                    {link}
                  </a>
                </div>
                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="ml-3 text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon icon="mdi:delete" width="20" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400 py-8">
            No hay enlaces agregados
          </p>
        )}

        {/* Formulario para agregar */}
        {isDraft && (
          <div className="space-y-3">
            <div>
              <input
                type="url"
                placeholder="https://ejemplo.com"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-sm text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            )}
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 w-full justify-center"
            >
              <Icon icon="mdi:plus" width="16" />
              Agregar Enlace
            </button>
          </div>
        )}

        {!isDraft && links.length > 0 && (
          <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
            <Icon icon="mdi:information" width="16" />
            Para editar enlaces, cambia el estado a "Borrador"
          </p>
        )}
      </div>
    </div>
  );
};

export default LinksManager;

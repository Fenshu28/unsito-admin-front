import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const LinksManager = ({ links = [], onLinksChange, isDraft = true }) => {
  const [newLink, setNewLink] = useState({ titulo: '', url: '' });
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
    if (!newLink.titulo.trim()) {
      setError('El título es requerido');
      return;
    }
    if (!newLink.url.trim()) {
      setError('La URL es requerida');
      return;
    }
    if (!validateUrl(newLink.url)) {
      setError('URL inválida. Debe incluir http:// o https://');
      return;
    }

    onLinksChange([...links, { ...newLink, _id: Date.now().toString() }]);
    setNewLink({ titulo: '', url: '' });
    setError('');
  };

  const handleRemove = (id) => {
    onLinksChange(links.filter(link => link._id !== id));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          Enlaces Relacionados
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {links.length} enlace{links.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="p-6">
        {/* Lista de enlaces */}
        {links.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {links.map((link) => (
              <li
                key={link._id}
                className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-strokedark"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white truncate">
                    {link.titulo}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline truncate block"
                  >
                    {link.url}
                  </a>
                </div>
                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(link._id)}
                    className="ml-3 text-red-600 hover:text-red-700"
                  >
                    <Icon icon="mdi:delete" width="20" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No hay enlaces agregados
          </p>
        )}

        {/* Formulario para agregar */}
        {isDraft && (
          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Título del enlace"
                value={newLink.titulo}
                onChange={(e) => setNewLink({ ...newLink, titulo: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-sm text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div>
              <input
                type="url"
                placeholder="https://ejemplo.com"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-sm text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            )}
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
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

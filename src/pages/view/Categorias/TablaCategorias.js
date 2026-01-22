import React from "react";
import { Icon } from "@iconify/react";

const TablaCategorias = ({
  categorias,
  onVer,
  onEliminar,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm font-sans">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50 text-left">
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-900">
                  Nombre
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-900">
                  Descripción
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-900 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse border-b border-gray-100">
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 rounded bg-gray-100"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-64 rounded bg-gray-100"></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="ml-auto h-8 w-20 rounded bg-gray-100"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm font-sans">
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center gap-2">
        <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
          <Icon icon="mdi:tag-multiple" width="20" />
        </div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
          Lista de Categorías
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50 text-left">
              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-900">
                Nombre
              </th>
              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-900">
                Descripción
              </th>
              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-900 text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                    <Icon icon="mdi:tag-off-outline" width="48" />
                    <p className="text-sm font-medium">
                      No se encontraron categorías
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr
                  key={cat._id}
                  className="transition-colors hover:bg-gray-50 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                        <Icon icon="mdi:tag" width="16" />
                      </div>
                      <span
                        className="text-sm font-bold text-gray-900 cursor-pointer hover:text-brand-600 transition-colors"
                        onClick={() => onVer(cat._id)}
                      >
                        {cat.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-1 max-w-md">
                      {cat.descripcion || (
                        <span className="text-gray-300 italic">
                          Sin descripción
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onVer(cat._id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                        title="Editar Categoría"
                      >
                        <Icon icon="mdi:pencil" width="14" />
                        EDITAR
                      </button>
                      <button
                        onClick={() => onEliminar(cat._id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition-all shadow-sm"
                        title="Eliminar Categoría"
                      >
                        <Icon icon="mdi:trash-can-outline" width="14" />
                        ELIMINAR
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCategorias;

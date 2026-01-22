import { Icon } from "@iconify/react";
import React from "react";

const TablaPublicaciones = ({ publicaciones, onVer }) => {
  const getStatusBadge = (status) => {
    const badges = {
      Draft: "bg-warning-50 text-warning-700 border border-warning-200",
      Published: "bg-success-50 text-success-700 border border-success-200",
      Trash: "bg-error-50 text-error-700 border border-error-200",
    };
    const statusText = {
      Draft: "Borrador",
      Published: "Publicado",
      Trash: "Papelera",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${badges[status] || badges.Draft}`}
      >
        {statusText[status] || status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Lista de Publicaciones
        </h4>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="min-w-[220px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Título
              </th>
              <th className="min-w-[150px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Categoría
              </th>
              <th className="min-w-[120px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Tipo
              </th>
              <th className="min-w-[120px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Actualizado
              </th>
              <th className="min-w-[120px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {publicaciones.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">
                  <p className="text-sm text-gray-500">No hay publicaciones</p>
                </td>
              </tr>
            ) : (
              publicaciones.map((pub) => (
                <tr
                  key={pub._id}
                  onClick={() => onVer(pub._id)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-medium text-gray-900">
                        {pub.titulo}
                      </h5>
                      {pub.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-warning-50 border border-warning-200 px-2 py-0.5 text-xs font-medium text-warning-700">
                          <Icon icon="mdi:star" width="12" />
                          Destacado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">
                      {pub.categoria?.nombre || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">
                      {pub.tipo?.nombre || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">
                      {formatDate(pub.updatedAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(pub.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPublicaciones;

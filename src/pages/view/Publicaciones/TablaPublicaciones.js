import { Icon } from "@iconify/react";
import React from "react";

const TablaPublicaciones = ({ publicaciones, onVer }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return { bg: "bg-green-50", text: "text-green-600" };
      case "Draft":
        return { bg: "bg-gray-100", text: "text-gray-600" };
      case "Trash":
        return { bg: "bg-red-50", text: "text-red-600" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-500" };
    }
  };

  const statusText = {
    Draft: "Borrador",
    Published: "Publicado",
    Trash: "Papelera",
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
    // Estilo copiado de TopPublicationsTable (Analitycs)
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full">
          {/* Header simple con borde arriba/abajo, texto gris suave */}
          <thead className="border-gray-100 border-y">
            <tr>
              <th className="py-3 px-2 font-medium text-gray-500 text-left text-xs">
                Título
              </th>
              <th className="py-3 px-2 font-medium text-gray-500 text-left text-xs">
                Categoría
              </th>
              <th className="py-3 px-2 font-medium text-gray-500 text-left text-xs">
                Tipo
              </th>
              <th className="py-3 px-2 font-medium text-gray-500 text-center text-xs">
                Actualizado
              </th>
              <th className="py-3 px-2 font-medium text-gray-500 text-right text-xs">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {publicaciones.length === 0 ? (
              <tr>
                <td
                  className="py-8 text-center text-gray-500 text-sm"
                  colSpan="5"
                >
                  No hay publicaciones
                </td>
              </tr>
            ) : (
              publicaciones.map((pub) => (
                <tr
                  key={pub._id}
                  onClick={() => onVer(pub._id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800 text-sm">
                        {pub.titulo}
                      </p>
                      {pub.isFeatured && (
                        <Icon
                          icon="mdi:star"
                          className="text-yellow-400"
                          width="14"
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    {/* Estilo de categoría como en Analytics */}
                    {pub.categoria ? (
                      <span
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${pub.categoria.color || "#e5e7eb"}20`,
                          color: pub.categoria.color || "#374151",
                        }}
                      >
                        {pub.categoria.nombre}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm">
                    {pub.tipo?.nombre || "-"}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-500 text-sm">
                    {formatDate(pub.updatedAt)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {/* Badge simplificado sin componente complejo */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pub.status).bg} ${getStatusColor(pub.status).text}`}
                    >
                      {statusText[pub.status] || pub.status}
                    </span>
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

export default TablaPublicaciones;

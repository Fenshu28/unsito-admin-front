import { Icon } from "@iconify/react";
import React from "react";
import UserAvatar from "../../../components/UserAvatar";

const TablaPublicaciones = ({
  publicaciones,
  onVer,
  loading,
  initialLoading,
  isAdmin,
}) => {
  if (initialLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
    // Estilo copiado de TopPublicationsTable (Analitycs) y adaptado a border-gray-300
    <div className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px] transition-opacity duration-300">
          <div className="flex flex-col items-center gap-2">
            <Icon
              icon="mdi:loading"
              className="animate-spin text-brand-600"
              width="40"
            />
            <span className="text-sm font-medium text-gray-600 font-sans">
              Cargando...
            </span>
          </div>
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full">
          {/* Header simple con borde arriba/abajo, texto gris suave */}
          <thead className="border-gray-100 border-y">
            <tr>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Título
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Categoría
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Tipo
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                Autor
              </th>
              {isAdmin && (
                <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                  Usuario
                </th>
              )}
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                Actualizado
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {publicaciones.length === 0 ? (
              <tr>
                <td
                  className="py-8 text-center text-gray-500 text-sm font-sans"
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
                      <p className="font-bold text-gray-800 text-sm font-sans">
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
                  <td className="py-3 px-2 text-gray-600 text-sm font-sans">
                    {pub.categoria?.nombre || "-"}
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm font-sans">
                    {pub.tipo?.nombre || "-"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div
                      className="flex justify-center"
                      title={pub.autor?.nombre || "Sin Autor"}
                    >
                      <UserAvatar user={pub.autor} size="8" />
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="py-3 px-2 text-center">
                      <div
                        className="flex justify-center"
                        title={
                          pub.usuario?.nombre ||
                          pub.usuario?.email ||
                          "Usuario Desconocido"
                        }
                      >
                        <UserAvatar user={pub.usuario} size="8" />
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-2 text-center text-gray-500 text-sm font-sans">
                    {formatDate(pub.updatedAt)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {/* Badge simplificado sin componente complejo */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${getStatusColor(pub.status).bg} ${getStatusColor(pub.status).text}`}
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

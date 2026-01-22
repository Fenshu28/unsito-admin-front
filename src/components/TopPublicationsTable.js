import React, { useState } from "react";

const TopPublicationsTable = ({ publications, loading }) => {
  const [sortBy, setSortBy] = useState("views");

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
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

  if (!publications || publications.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white/90 mb-4 font-sans">
          Top Publicaciones
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8 text-sm font-sans">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white/90 font-sans">
            Top Publicaciones
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortBy("views")}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors font-sans ${
              sortBy === "views"
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            }`}
          >
            Vistas
          </button>
          <button
            onClick={() => setSortBy("downloads")}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors font-sans ${
              sortBy === "downloads"
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            }`}
          >
            Descargas
          </button>
          <button
            onClick={() => setSortBy("saves")}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors font-sans ${
              sortBy === "saves"
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            }`}
          >
            Guardados
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full">
          <thead className="border-gray-100 dark:border-gray-800 border-y">
            <tr>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs dark:text-gray-400 font-sans">
                #
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs dark:text-gray-400 font-sans">
                Título
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs dark:text-gray-400 font-sans">
                Categoría
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs dark:text-gray-400 font-sans">
                Tipo
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs dark:text-gray-400 font-sans">
                Vistas
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs dark:text-gray-400 font-sans">
                Descargas
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs dark:text-gray-400 font-sans">
                Guardados
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {publications.map((item, index) => (
              <tr
                key={item.publicacion._id}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
              >
                <td className="py-3 px-2 text-gray-500 text-sm dark:text-gray-400 font-sans">
                  {index + 1}
                </td>
                <td className="py-3 px-2">
                  <p className="font-bold text-gray-800 text-sm dark:text-white/90 font-sans">
                    {item.publicacion.titulo}
                  </p>
                  {item.publicacion.descripcion && (
                    <span className="text-gray-500 text-xs dark:text-gray-400 line-clamp-1 font-sans">
                      {item.publicacion.descripcion}
                    </span>
                  )}
                </td>
                <td className="py-3 px-2">
                  {item.publicacion.categoria && (
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold font-sans"
                      style={{
                        backgroundColor: `${item.publicacion.categoria.color}20`,
                        color: item.publicacion.categoria.color,
                      }}
                    >
                      {item.publicacion.categoria.nombre}
                    </span>
                  )}
                </td>
                <td className="py-3 px-2 text-gray-500 text-sm dark:text-gray-400 font-sans">
                  {item.publicacion.tipo?.nombre || "-"}
                </td>
                <td className="py-3 px-2 text-center text-gray-800 text-sm font-bold dark:text-white/90 font-sans">
                  {item.stats.totalViews?.toLocaleString() || "0"}
                </td>
                <td className="py-3 px-2 text-center text-gray-800 text-sm font-bold dark:text-white/90 font-sans">
                  {item.stats.totalDownloads?.toLocaleString() || "0"}
                </td>
                <td className="py-3 px-2 text-center text-gray-800 text-sm font-bold dark:text-white/90 font-sans">
                  {item.stats.totalSaves?.toLocaleString() || "0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPublicationsTable;

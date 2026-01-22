import React from "react";

const TablaCategorias = ({
  categorias,
  onVer,
  onEliminar,
  loading = false,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { bg: "bg-green-50", text: "text-green-600" };
      case "Trash":
        return { bg: "bg-red-50", text: "text-red-600" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-500" };
    }
  };

  const statusText = {
    Active: "Activa",
    Trash: "Papelera",
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full">
          <thead className="border-gray-100 border-y">
            <tr>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Nombre
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Descripción
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categorias.length === 0 ? (
              <tr>
                <td
                  className="py-8 text-center text-gray-500 text-sm font-sans"
                  colSpan="3"
                >
                  No se encontraron categorías
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr
                  key={cat._id}
                  onClick={() => onVer(cat._id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800 text-sm font-sans leading-tight">
                        {cat.nombre}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm font-sans leading-tight">
                    {cat.descripcion || "-"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${getStatusColor(cat.status).bg} ${getStatusColor(cat.status).text}`}
                    >
                      {statusText[cat.status] || cat.status}
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

export default TablaCategorias;

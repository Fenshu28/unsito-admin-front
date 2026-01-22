import React from "react";

const TablaCategorias = ({ categorias, onVer }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Lista de Categorías
        </h4>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="min-w-[220px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Nombre
              </th>
              <th className="min-w-[150px] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                Descripción
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-8 text-center">
                  <p className="text-sm text-gray-500">No hay categorías</p>
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr
                  key={cat._id}
                  onClick={() => onVer(cat._id)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{cat.nombre}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{cat.descripcion || "-"}</p>
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

import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const ListaAutores = ({ autores, loading, initialLoading }) => {
  const navigate = useNavigate();

  if (initialLoading) {
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

  const handleVer = (id) => {
    navigate(`/App/autores/editar/${id}`);
  };

  return (
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
          <thead className="border-gray-100 border-y">
            <tr>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Foto
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Nombre
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Email
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {autores.length === 0 ? (
              <tr>
                <td
                  className="py-8 text-center text-gray-500 text-sm font-sans"
                  colSpan="4"
                >
                  No se encontraron autores
                </td>
              </tr>
            ) : (
              autores.map((autor) => (
                <tr
                  key={autor._id}
                  onClick={() => handleVer(autor._id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-2">
                    {autor.foto ? (
                      <img
                        src={autor.foto}
                        alt={autor.nombre}
                        className="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center shadow-sm bg-gray-50 text-brand-600">
                        <Icon icon="mdi:account" width="24" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <p className="font-bold text-gray-800 text-sm font-sans">
                      {autor.nombre}
                    </p>
                  </td>
                  <td className="py-3 px-2 text-gray-600 text-sm font-sans">
                    {autor.email || "-"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${
                        autor.status === "Trash"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {autor.status === "Trash" ? "Papelera" : "Activo"}
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

export default ListaAutores;

import React from "react";

const TablaCategorias = ({ categorias, onVer }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Lista de Categorías
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium">Nombre</th>
              <th className="px-4 py-4 font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-4 py-5 text-center">
                  No hay categorías
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr
                  key={cat._id}
                  onClick={() => onVer(cat._id)}
                  className="cursor-pointer border-b hover:bg-gray-2 dark:hover:bg-meta-4"
                >
                  <td className="px-4 py-5 font-medium">{cat.nombre}</td>
                  <td className="px-4 py-5">{cat.descripcion || "-"}</td>
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

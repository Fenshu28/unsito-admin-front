import React, { useEffect, useState } from "react";
import { obtenerCategorias } from "../../../services/categoriaService";

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setMensaje("Error al cargar categorías");
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">

      {/* Header */}
      <div className="px-8 py-6 border-b border-stroke dark:border-strokedark">
        <h4 className="text-2xl font-bold text-black dark:text-white">
          Categorías
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Listado general de categorías del sistema
        </p>
      </div>

      {/* Mensaje error */}
      {mensaje && (
        <div className="px-8 pt-4">
          <p className="text-sm text-red-600">{mensaje}</p>
        </div>
      )}

      {/* Tabla con scroll */}
      <div className="max-h-[520px] overflow-y-auto">
        <table className="w-full border-separate border-spacing-x-6 border-spacing-y-2">
          <thead className="sticky top-0 bg-gray-100 dark:bg-meta-4 z-10">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-left text-black dark:text-white">
                #
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-left text-black dark:text-white">
                Categoría
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-left text-black dark:text-white">
                Descripción
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-left text-black dark:text-white">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-8 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categorias.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-lg h-[96px]"
                >
                  {/* Índice */}
                  <td className="px-6 py-6 text-sm text-gray-600 dark:text-gray-300 align-top">
                    {index + 1}
                  </td>

                  {/* Nombre */}
                  <td className="px-6 py-6 align-top">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-black dark:text-white">
                        {cat.nombre}
                      </p>
                      <p className="text-xs text-gray-500">
                        Categoría del sistema
                      </p>
                    </div>
                  </td>

                  {/* Descripción */}
                  <td className="px-6 py-6 align-top">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {cat.descripcion || "Sin descripción asignada"}
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        Visible en publicaciones
                      </p>
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-6 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex w-fit rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Activa
                      </span>
                      <span className="text-xs text-gray-400">
                        Disponible
                      </span>
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

export default ListaCategorias;

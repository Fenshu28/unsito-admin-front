import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      
      {/* Header */}
      <div className="px-4 py-6 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Lista de Categorías
        </h4>
      </div>

      {/* Mensaje error */}
      {mensaje && (
        <div className="px-6 pt-4">
          <p className="text-sm text-red-600">{mensaje}</p>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nombre
              </th>
              <th className="min-w-[350px] px-4 py-4 font-medium text-black dark:text-white">
                Descripción
              </th>
              <th className="min-w-[160px] px-4 py-4 text-center font-medium text-black dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="border-b border-[#eee] px-4 py-6 text-center dark:border-strokedark"
                >
                  <p className="text-black dark:text-white">
                    No hay categorías registradas
                  </p>
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-b border-[#eee] hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  {/* Nombre */}
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="font-medium text-black dark:text-white">
                      {cat.nombre}
                    </p>
                  </td>

                  {/* Descripción */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {cat.descripcion || "-"}
                    </p>
                  </td>

                  {/* Acciones */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex justify-center gap-3">
                      <button
                        className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90 transition"
                      >
                        <Icon icon="mdi:pencil" width="16" />
                        Editar
                      </button>

                      <button
                        className="inline-flex items-center gap-1 rounded-md bg-danger px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90 transition"
                      >
                        <Icon icon="mdi:delete" width="16" />
                        Eliminar
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

export default ListaCategorias;

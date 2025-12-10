import React, {useEffect,useState} from "react";
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
    <div className="bg-white rounded-xl shadow">
    <div className="px-6 py-4 border-b">
      <h2 className="text-lg font-semibold text-gray-800">
        Categorías del Sistema
      </h2>
    </div>
      <div className="p-6">
      {mensaje && (
        <p className="mb-4 text-sm text-red-600">
          {mensaje}
        </p>
      )}
  
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                Nombre
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Descripción
              </th>
              <th className="px-4 py-3 text-center font-medium w-44">
                Acciones
              </th>
            </tr>
          </thead>
  
          <tbody className="divide-y divide-gray-200">
            {categorias.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {cat.nombre}
                  </td>
  
                  <td className="px-4 py-3 text-gray-600">
                    {cat.descripcion || "—"}
                  </td>
  
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                        Editar
                      </button>
  
                      <button className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition">
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
  </div>
  
  );
};

export default ListaCategorias;

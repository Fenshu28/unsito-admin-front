import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerAutores, eliminarAutor } from "../../../services/autoresService";
import { useToast } from "../../../context/ToastContext";

const ListaAutores = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const cargarAutores = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await obtenerAutores();
      setAutores(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarAutores();
  }, [cargarAutores]);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este autor?")) return;

    try {
      setEliminandoId(id);
      await eliminarAutor(id);
      toast.success("Autor eliminado correctamente");
      setAutores((prev) => prev.filter((autor) => autor._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error al eliminar el autor");
    } finally {
      setEliminandoId(null);
    }
  };

  const handleEditar = (id) => {
    navigate(`/App/autores/editar/${id}`);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Autores
        </h2>
      </div>

      {loading && (
        <p className="text-center text-black dark:text-white">
          Cargando autores...
        </p>
      )}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && autores.length === 0 && (
        <p className="text-center text-gray-600">
          No hay autores registrados
        </p>
      )}

      {!loading && autores.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Foto
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {autores.map((autor) => (
                <tr
                  key={autor._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={autor.foto}
                      alt={autor.nombre}
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {autor.nombre}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {autor.email}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEditar(autor._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(autor._id)}
                      disabled={eliminandoId === autor._id}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
                    >
                      {eliminandoId === autor._id
                        ? "Eliminando..."
                        : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaAutores;

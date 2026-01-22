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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Lista de Autores
        </h4>
      </div>

      {loading && (
        <p className="px-6 py-8 text-center text-sm text-gray-500">
          Cargando autores...
        </p>
      )}

      {error && (
        <p className="px-6 py-4 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && autores.length === 0 && (
        <p className="px-6 py-8 text-center text-sm text-gray-500">
          No hay autores registrados
        </p>
      )}

      {!loading && autores.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Foto
                </th>
                <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Nombre
                </th>
                <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3.5 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {autores.map((autor) => (
                <tr
                  key={autor._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <img
                      src={autor.foto}
                      alt={autor.nombre}
                      className="h-12 w-12 rounded-full object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {autor.nombre}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {autor.email || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {/* Editar */}
                      <button
                        onClick={() => handleEditar(autor._id)}
                        className="
                          rounded-lg border border-brand-500
                          bg-brand-500 px-3 py-1.5
                          text-xs font-medium text-white
                          transition-all
                          hover:bg-brand-600 hover:border-brand-600
                          focus:outline-none focus:ring-4 focus:ring-brand-500/20
                        "
                      >
                        Editar
                      </button>

                      {/* Eliminar */}
                      <button
                        onClick={() => handleEliminar(autor._id)}
                        disabled={eliminandoId === autor._id}
                        className="
                          rounded-lg border border-error-500
                          bg-error-500 px-3 py-1.5
                          text-xs font-medium text-white
                          transition-all
                          hover:bg-error-600 hover:border-error-600
                          focus:outline-none focus:ring-4 focus:ring-error-500/20
                          disabled:cursor-not-allowed disabled:opacity-50
                        "
                      >
                        {eliminandoId === autor._id
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
                    </div>
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

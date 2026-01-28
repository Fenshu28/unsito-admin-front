import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ListaAutores from "./view/Autores/ListaAutores";
import { obtenerAutores, crearAutor } from "../services/autoresService";
import { useToast } from "../context/ToastContext";

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const cargarAutores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerAutores(filtroStatus);
      setAutores(data);
    } catch (err) {
      setError(
        "Error al cargar los autores: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filtroStatus]);

  useEffect(() => {
    cargarAutores();
  }, [cargarAutores]);

  const handleNuevo = async () => {
    setLoading(true);
    setError(null);
    try {
      const nuevoAutor = await crearAutor({
        nombre: "Nuevo Autor",
        email: "",
        biografia: "",
      });
      navigate(`/App/autores/editar/${nuevoAutor._id}`);
    } catch (err) {
      setError(
        "Error al crear el autor: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
      toast.error("Error al crear el autor");
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Autores</h2>
        <button
          onClick={handleNuevo}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon icon="mdi:plus" width="20" height="20" />
          {loading ? "Creando..." : "Nuevo"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {/* Filters Card */}
      <div className="mb-6 rounded-2xl border border-gray-300 bg-white p-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-64">
            <label className="mb-2 block text-xs font-medium text-gray-500 font-sans">
              Filtrar por estado
            </label>
            <div className="relative">
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="all">Todos</option>
                <option value="Active">Activo</option>
                <option value="Trash">Papelera</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <ListaAutores
        autores={autores}
        loading={loading}
        onRecargar={cargarAutores}
      />
    </div>
  );
};

export default Autores;

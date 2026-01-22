import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react"; // Importar Iconify
import TablaPublicaciones from "./view/Publicaciones/TablaPublicaciones";
import {
  obtenerPublicaciones,
  crearPublicacion,
} from "../services/publicacionesService";

const PublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const cargarPublicaciones = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerPublicaciones(filtroStatus || null);
      setPublicaciones(data);
    } catch (err) {
      setError(
        "Error al cargar las publicaciones: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filtroStatus]);

  useEffect(() => {
    cargarPublicaciones();
  }, [cargarPublicaciones]);

  const handleNueva = async () => {
    setLoading(true);
    setError(null);
    try {
      const nuevaPublicacion = await crearPublicacion({
        titulo: "Nueva Publicación",
      });
      navigate(`/App/publicaciones/${nuevaPublicacion._id}`);
    } catch (err) {
      setError(
        "Error al crear la publicación: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
      setLoading(false);
    }
  };

  const handleVer = (id) => {
    navigate(`/App/publicaciones/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Publicaciones</h2>
        <button
          onClick={handleNueva}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Nueva
          <Icon icon="mdi:plus" width="20" height="20" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {/* Filters Card */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-64">
            <label className="mb-2 block text-xs font-medium text-gray-500">
              Filtrar por estado
            </label>
            <div className="relative">
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="Draft">Borrador</option>
                <option value="Published">Publicado</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-500">Cargando...</p>
        </div>
      )}

      {/* Table */}
      <TablaPublicaciones
        publicaciones={publicaciones}
        onVer={handleVer}
        onRecargar={cargarPublicaciones}
      />
    </div>
  );
};

export default PublicacionesList;

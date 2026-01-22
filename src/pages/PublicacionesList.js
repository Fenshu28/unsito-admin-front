import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Publicaciones</h2>
        <button
          onClick={handleNueva}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-sm transition-all hover:bg-brand-600 hover:shadow-theme-md focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4.375C10.3452 4.375 10.625 4.65482 10.625 5V9.375H15C15.3452 9.375 15.625 9.65482 15.625 10C15.625 10.3452 15.3452 10.625 15 10.625H10.625V15C10.625 15.3452 10.3452 15.625 10 15.625C9.65482 15.625 9.375 15.3452 9.375 15V10.625H5C4.65482 10.625 4.375 10.3452 4.375 10C4.375 9.65482 4.65482 9.375 5 9.375H9.375V5C9.375 4.65482 9.65482 4.375 10 4.375Z"
              fill=""
            />
          </svg>
          {loading ? "Creando..." : "Nueva Publicación"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-error-300 bg-error-50 p-4 shadow-theme-xs">
          <p className="text-sm font-medium text-error-700">{error}</p>
        </div>
      )}

      {/* Filters Card - con sombra visible */}
      <div className="mb-6 rounded-xl border border-gray-300 bg-white p-5 shadow-theme-sm lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-64">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Filtrar por estado
            </label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/20"
            >
              <option value="">Todos</option>
              <option value="Draft">Borrador</option>
              <option value="Published">Publicado</option>
            </select>
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

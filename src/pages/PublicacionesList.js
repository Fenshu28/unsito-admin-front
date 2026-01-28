import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react"; // Importar Iconify
import useAuth from "../hooks/useAuth";
import TablaPublicaciones from "./view/Publicaciones/TablaPublicaciones";
import {
  obtenerPublicaciones,
  crearPublicacion,
} from "../services/publicacionesService";
import { useTaxonomy } from "../context/TaxonomyContext";

const PublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { hasRole } = useAuth();
  const isAdmin = hasRole("admin");
  const [filtros, setFiltros] = useState({
    status: "",
    categoria: "",
    tipo: "",
    autor: "",
  });
  const navigate = useNavigate();

  const [initialLoading, setInitialLoading] = useState(true);
  const { categorias, tipos, autores } = useTaxonomy();

  const cargarPublicaciones = useCallback(
    async (isFilter = false) => {
      if (!isFilter) setInitialLoading(true);
      setLoading(true);
      setError(null);
      try {
        const data = await obtenerPublicaciones(filtros);
        setPublicaciones(data);
      } catch (err) {
        setError(
          "Error al cargar las publicaciones: " +
            (err.response?.data?.message || err.message),
        );
        console.error(err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [filtros],
  );

  useEffect(() => {
    cargarPublicaciones(true); // Usamos true para que si ya hay algo no muestre skeleton total, pero al inicio publicaciones está vacío []
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
    <div className="font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Publicaciones</h2>
        <button
          onClick={handleNueva}
          disabled={loading}
          // Cambiado a bg-brand-600 para usar el nuevo rojo vino
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon icon="mdi:plus" width="20" height="20" />
          {loading ? "Creando..." : "Nueva"}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
              Estado
            </label>
            <div className="relative">
              <select
                value={filtros.status}
                onChange={(e) =>
                  setFiltros((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="">Todos</option>
                <option value="Draft">Borrador</option>
                <option value="Published">Publicado</option>
                <option value="Trash">Papelera</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
              Categoría
            </label>
            <div className="relative">
              <select
                value={filtros.categoria}
                onChange={(e) =>
                  setFiltros((prev) => ({ ...prev, categoria: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
              Tipo
            </label>
            <div className="relative">
              <select
                value={filtros.tipo}
                onChange={(e) =>
                  setFiltros((prev) => ({ ...prev, tipo: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="">Todos</option>
                {tipos.map((tipo) => (
                  <option key={tipo._id} value={tipo._id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
              Autor
            </label>
            <div className="relative">
              <select
                value={filtros.autor}
                onChange={(e) =>
                  setFiltros((prev) => ({ ...prev, autor: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="">Todos</option>
                {autores.map((autor) => (
                  <option key={autor._id} value={autor._id}>
                    {autor.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <TablaPublicaciones
        publicaciones={publicaciones}
        onVer={handleVer}
        onRecargar={cargarPublicaciones}
        loading={loading}
        initialLoading={initialLoading && publicaciones.length === 0}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default PublicacionesList;

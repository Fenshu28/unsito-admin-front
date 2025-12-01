import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioPublicacion from "./view/Publicaciones/FormularioPublicacion";
import {
  obtenerPublicacionPorId,
  actualizarPublicacion,
  eliminarPublicacion
} from "../services/publicacionesService";
import { useTaxonomy } from "../context/TaxonomyContext";

const PublicacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categorias, tipos, loading: taxonomyLoading } = useTaxonomy();
  
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pubData = await obtenerPublicacionPorId(id);
      setPublicacion(pubData);
      
      // Si es una publicación recién creada (solo tiene título), activar modo edición
      if (!pubData.descripcion && !pubData.categoria && !pubData.tipo) {
        setModoEdicion(true);
      }
    } catch (err) {
      setError("Error al cargar la publicación: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleActualizar = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await actualizarPublicacion(id, formData);
      setModoEdicion(false);
      await cargarDatos();
    } catch (err) {
      setError("Error al actualizar la publicación: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Está seguro de eliminar esta publicación?")) return;
    
    setLoading(true);
    try {
      await eliminarPublicacion(id);
      navigate("/App/publicaciones");
    } catch (err) {
      setError("Error al eliminar la publicación: " + (err.response?.data?.message || err.message));
      console.error(err);
      setLoading(false);
    }
  };

  const handleVolver = () => {
    navigate("/App/publicaciones");
  };

  if (loading && !publicacion) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center">
          <p className="text-black dark:text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error && !publicacion) {
    return (
      <div className="p-4 md:p-6">
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>{error}</p>
        </div>
        <button
          onClick={handleVolver}
          className="inline-flex items-center justify-center rounded-md border border-stroke px-6 py-3 text-center font-medium hover:shadow-1 dark:border-strokedark"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={handleVolver}
            className="mb-2 inline-flex items-center text-sm text-primary hover:underline"
          >
            <svg
              className="mr-1 fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver a la lista
          </button>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            {modoEdicion ? "Editar Publicación" : "Detalle de Publicación"}
          </h2>
        </div>
        <div className="flex gap-3">
          {!modoEdicion ? (
            <>
              <button
                onClick={() => setModoEdicion(true)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90"
              >
                Editar
              </button>
              <button
                onClick={handleEliminar}
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-center font-medium text-white hover:bg-opacity-90"
              >
                Eliminar
              </button>
            </>
          ) : (
            <button
              onClick={() => setModoEdicion(false)}
              className="inline-flex items-center justify-center rounded-md border border-stroke px-6 py-3 text-center font-medium hover:shadow-1 dark:border-strokedark"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}

      {/* Content */}
      {modoEdicion ? (
        <FormularioPublicacion
          publicacionActual={publicacion}
          categorias={categorias}
          tipos={tipos}
          onSubmit={handleActualizar}
          onCancel={() => setModoEdicion(false)}
        />
      ) : (
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Título</h3>
            <p className="text-lg font-semibold text-black dark:text-white">{publicacion?.titulo}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Descripción</h3>
            <p className="text-black dark:text-white">{publicacion?.descripcion || "Sin descripción"}</p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Categoría</h3>
              <p className="text-black dark:text-white">{publicacion?.categoria?.nombre || "Sin categoría"}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</h3>
              <p className="text-black dark:text-white">{publicacion?.tipo?.nombre || "Sin tipo"}</p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Fecha</h3>
              <p className="text-black dark:text-white">
                {publicacion?.fecha ? new Date(publicacion.fecha).toLocaleDateString('es-MX') : "Sin fecha"}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Estado</h3>
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                publicacion?.status === 'Published' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {publicacion?.status === 'Published' ? 'Publicado' : 'Borrador'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Destacado</h3>
            <p className="text-black dark:text-white">{publicacion?.isFeatured ? "Sí" : "No"}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Autor</h3>
            <p className="text-black dark:text-white">{publicacion?.autor?.nombre || "Desconocido"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicacionDetalle;

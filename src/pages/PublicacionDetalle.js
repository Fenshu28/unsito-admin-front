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
  const { categorias, tipos } = useTaxonomy();
  
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pubData = await obtenerPublicacionPorId(id);
      setPublicacion(pubData);
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
      {/* Header simple con botón volver */}
      <div className="mb-6">
        <button
          onClick={handleVolver}
          className="inline-flex items-center text-sm text-primary hover:underline"
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
          Volver a Publicaciones
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}

      {/* Formulario directo - sin modo vista */}
      <FormularioPublicacion
        publicacionActual={publicacion}
        categorias={categorias}
        tipos={tipos}
        onSubmit={handleActualizar}
        onImageUploaded={cargarDatos}
      />
    </div>
  );
};

export default PublicacionDetalle;

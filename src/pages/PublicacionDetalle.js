import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioPublicacion from "./view/Publicaciones/FormularioPublicacion";
import {
  obtenerPublicacionPorId,
  actualizarPublicacion
} from "../services/publicacionesService";
import { useTaxonomy } from "../context/TaxonomyContext";
import { useToast } from "../context/ToastContext";
import { Icon } from "@iconify/react";
import ConfirmModal from "../components/ConfirmModal";

const PublicacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categorias, tipos } = useTaxonomy();
  const toast = useToast();
  
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    try {
      await actualizarPublicacion(id, formData);
      await cargarDatos();
      // Success toast se muestra en FormularioPublicacion
    } catch (err) {
      console.error(err);
      // Error toast se muestra en FormularioPublicacion
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (statusData) => {
    setLoading(true);
    try {
      await actualizarPublicacion(id, statusData);
      await cargarDatos();
      // Success toast se muestra en FormularioPublicacion
    } catch (err) {
      console.error(err);
      // Error toast se muestra en FormularioPublicacion
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await actualizarPublicacion(id, { status: "Trash" });
      toast.success('Publicación movida a la papelera');
      navigate("/App/publicaciones");
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar la publicación';
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
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
      {/* Header con botón volver y eliminar */}
      <div className="mb-6 flex items-center justify-between">
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

        {publicacion && publicacion.status !== "Trash" && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            <Icon icon="mdi:delete" width="18" />
            Eliminar
          </button>
        )}
      </div>

      {/* Error Message - Solo para errores críticos (404, etc) */}
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
        onStatusChanged={handleStatusChange}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Publicación"
        message="¿Está seguro de que desea eliminar esta publicación? Se moverá a la papelera."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default PublicacionDetalle;

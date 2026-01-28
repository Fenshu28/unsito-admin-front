import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioPublicacion from "./view/Publicaciones/FormularioPublicacion";
import {
  obtenerPublicacionPorId,
  actualizarPublicacion,
} from "../services/publicacionesService";
import { useTaxonomy } from "../context/TaxonomyContext";
import { useToast } from "../context/ToastContext";
import { Icon } from "@iconify/react";
import ConfirmModal from "../components/ConfirmModal";

const PublicacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categorias, tipos, autores, reload } = useTaxonomy();
  const toast = useToast();

  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Recargar taxonomía para asegurar datos frescos
      await reload();
      const pubData = await obtenerPublicacionPorId(id);
      setPublicacion(pubData);
    } catch (err) {
      setError(
        "Error al cargar la publicación: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, reload]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleActualizar = async (formData) => {
    try {
      await actualizarPublicacion(id, formData);
      await cargarDatos();
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await actualizarPublicacion(id, { status: "Trash" });
      toast.success("Publicación movida a la papelera");
      navigate("/App/publicaciones");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al eliminar la publicación";
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
      <div className="p-4 md:p-6 font-sans">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
        </div>
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm animate-pulse space-y-6">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-10 bg-gray-100 rounded-lg"></div>
            <div className="h-10 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-32 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 font-sans">
      {/* Header con botón volver y eliminar */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleVolver}
          className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="mr-2" width="20" />
          Volver a Publicaciones
        </button>

        {publicacion?.status === "Trash" ? (
          <button
            onClick={async () => {
              try {
                await actualizarPublicacion(id, { status: "Draft" });
                toast.success("Publicación restaurada");
                await cargarDatos();
              } catch (error) {
                toast.error("Error al restaurar la publicación");
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
          >
            <Icon icon="mdi:restore" width="18" />
            Restaurar
          </button>
        ) : (
          publicacion && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm"
            >
              <Icon icon="mdi:delete" width="18" />
              Eliminar
            </button>
          )
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Formulario directo */}
      {publicacion && (
        <FormularioPublicacion
          publicacionActual={publicacion}
          categorias={categorias}
          tipos={tipos}
          autores={autores}
          onSubmit={handleActualizar}
          onImageUploaded={cargarDatos}
          onStatusChanged={handleStatusChange}
        />
      )}

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

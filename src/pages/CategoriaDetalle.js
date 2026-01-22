import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCategoria from "./view/Categorias/FormularioCategoria";
import {
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/categoriaService";
import { useToast } from "../context/ToastContext";
import { Icon } from "@iconify/react";
import ConfirmModal from "../components/ConfirmModal";

const CategoriaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [categoria, setCategoria] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const cargarDatos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await obtenerCategoriaPorId(id);
      setCategoria(data);
    } catch (err) {
      setError("Error al cargar los datos de la categoría");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleActualizar = async (data) => {
    try {
      await actualizarCategoria(id, data);
      await cargarDatos();
    } catch (error) {
      const msg =
        error.response?.data?.message || "Error al actualizar la categoría";
      toast.error(typeof msg === "string" ? msg : "Error al actualizar");
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await eliminarCategoria(id);
      toast.success("Categoría eliminada con éxito");
      navigate("/App/categorias");
    } catch (err) {
      toast.error("No se pudo eliminar la categoría");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading && !categoria) {
    return (
      <div className="p-4 md:p-6 font-sans">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
        </div>
        <div className="max-w-xl mx-auto rounded-2xl border border-gray-300 bg-white p-6 shadow-sm animate-pulse space-y-6">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-100 rounded-lg"></div>
            <div className="h-32 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/App/categorias")}
          className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="mr-2" width="20" />
          Volver a Categorías
        </button>

        {categoria?.status === "Trash" ? (
          <button
            onClick={async () => {
              try {
                await actualizarCategoria(id, { status: "Active" });
                toast.success("Categoría restaurada");
                await cargarDatos();
              } catch (error) {
                toast.error("Error al restaurar categoría");
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
          >
            <Icon icon="mdi:restore" width="18" />
            Restaurar
          </button>
        ) : (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            <Icon icon="mdi:trash-can-outline" width="18" />
            Eliminar
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {categoria && (
        <FormularioCategoria
          categoriaActual={categoria}
          onSubmit={handleActualizar}
        />
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Categoría"
        message="¿Está seguro de que desea eliminar esta categoría? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default CategoriaDetalle;

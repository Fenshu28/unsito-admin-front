import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCategoria from "./view/Categorias/FormularioCategoria";
import {
  obtenerCategoriaPorId,
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
} from "../services/categoriaService";
import { useToast } from "../context/ToastContext";
import { Icon } from "@iconify/react";
import ConfirmModal from "../components/ConfirmModal";

const CategoriaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const esCreacion = id === "nuevo"; // Si es "nuevo", estamos creando
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const cargarDatos = useCallback(async () => {
    if (esCreacion) {
      // No cargar nada en creación
      setCategoria(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await obtenerCategoriaPorId(id);
      setCategoria(data);
    } catch (err) {
      setError("Error al cargar los datos de la categoría");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, esCreacion]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleGuardar = async (data) => {
    setLoading(true);
    try {
      if (esCreacion) {
        // Crear nueva categoría
        const nueva = await crearCategoria(data);
        toast.success("Categoría creada correctamente");
        navigate(`/App/categorias/${nueva._id}`);
      } else {
        // Actualizar categoría existente
        await actualizarCategoria(id, data);
        await cargarDatos();
        toast.success("Categoría actualizada correctamente");
      }
    } catch (err) {
      toast.error("Error al guardar la categoría");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await eliminarCategoria(id);
      toast.success("Categoría eliminada con éxito");
      navigate("/App/categorias");
    } catch (err) {
      toast.error("No se pudo eliminar la categoría");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

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

        {!esCreacion && (
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

      <FormularioCategoria
        categoriaActual={categoria}
        onSubmit={handleGuardar}
      />

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

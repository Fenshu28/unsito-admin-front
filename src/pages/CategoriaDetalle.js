import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCategoria from "./view/Categorias/FormularioCategoria";
import {
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
} from "../services/categoriaService";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../context/ToastContext";

const CategoriaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [categoria, setCategoria] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const cargarDatos = useCallback(async () => {
    const data = await obtenerCategoriaPorId(id);
    setCategoria(data);
  }, [id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleActualizar = async (data) => {
    await actualizarCategoria(id, data);
    await cargarDatos();
    toast.success("Categoría actualizada");
  };

  const handleEliminar = async () => {
    await eliminarCategoria(id);
    toast.success("Categoría eliminada");
    navigate("/App/categorias");
  };

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => navigate("/App/categorias")}
        className="mb-4 text-primary hover:underline"
      >
        ← Volver a Categorías
      </button>

      <FormularioCategoria
        categoriaActual={categoria}
        onSubmit={handleActualizar}
      />

      <div className="mt-6">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Eliminar Categoría
        </button>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleEliminar}
        title="Eliminar Categoría"
        message="¿Está seguro de eliminar esta categoría?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default CategoriaDetalle;

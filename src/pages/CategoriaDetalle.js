import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCategoria from "./view/Categorias/FormularioCategoria";
import { obtenerCategoriaPorId, actualizarCategoria } from "../services/categoriaService";
import { useToast } from "../context/ToastContext";

const CategoriaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [categoria, setCategoria] = useState(null);

  const cargarDatos = useCallback(async () => {
    const data = await obtenerCategoriaPorId(id);
    setCategoria(data);
  }, [id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleActualizar = async (data) => {
    try {
      await actualizarCategoria(id, data);
      await cargarDatos();
      toast.success("Categoría actualizada");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error("Error al actualizar categoría");
    }
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
    </div>
  );
};

export default CategoriaDetalle;

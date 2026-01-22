import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TablaCategorias from "./view/Categorias/TablaCategorias";
import {
  obtenerCategorias,
  eliminarCategoria,
} from "../services/categoriaService";
import { useToast } from "../context/ToastContext";
import { Icon } from "@iconify/react";

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const cargarCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const data = await obtenerCategorias();
      setCategorias(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  const handleNueva = () => {
    // Solo navegamos al formulario de creación
    navigate("/App/categorias/nuevo");
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarCategoria(id);
      toast.success("Categoría eliminada");
      await cargarCategorias();
    } catch (error) {
      toast.error("Error al eliminar categoría");
    }
  };

  return (
    <div className="font-sans">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
        <button
          onClick={handleNueva}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          <Icon icon="mdi:plus" width="20" height="20" />
          Nueva
        </button>
      </div>

      <TablaCategorias
        categorias={categorias}
        loading={loading}
        onVer={(id) => navigate(`/App/categorias/${id}`)}
        onEliminar={handleEliminar}
      />
    </div>
  );
};

export default CategoriasList;

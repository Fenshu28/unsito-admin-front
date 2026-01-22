import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TablaCategorias from "./view/Categorias/TablaCategorias";
import {
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
} from "../services/categoriaService";
import { useToast } from "../context/ToastContext";
import { Icon } from "@iconify/react";

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const cargarCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const data = await obtenerCategorias(filtroStatus || null);
      setCategorias(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  }, [toast, filtroStatus]);

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  const handleNueva = async () => {
    setLoading(true);
    try {
      // Generar nombre único basado en un timestamp corto para evitar duplicados en Live Create
      const shortId = Math.floor(Date.now() / 1000) % 10000;
      const response = await crearCategoria({
        nombre: `Nueva Categoría #${shortId}`,
        descripcion: "",
      });
      // Manejar respuesta si viene envuelta en data
      const nueva = response.data || response;
      if (nueva && nueva._id) {
        navigate(`/App/categorias/${nueva._id}`);
      } else {
        toast.error("Error: Respuesta del servidor inesperada");
        console.error("Respuesta sin _id:", response);
      }
    } catch (error) {
      console.error("Error en handleNueva:", error);
      const errorData = error.response?.data;
      let msg = "Error al crear categoría";

      if (typeof errorData === "string") {
        msg = errorData;
      } else if (errorData?.message && typeof errorData.message === "string") {
        msg = errorData.message;
      } else if (error?.message && typeof error.message === "string") {
        msg = error.message;
      }

      toast.error(msg);
    } finally {
      setLoading(false);
    }
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
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon icon="mdi:plus" width="20" height="20" />
          Nueva
        </button>
      </div>

      {/* Filters Card */}
      <div className="mb-6 rounded-2xl border border-gray-300 bg-white p-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-64">
            <label className="mb-2 block text-xs font-medium text-gray-500 font-sans">
              Filtrar por estado
            </label>
            <div className="relative">
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="">Todos</option>
                <option value="Active">Activa</option>
                <option value="Trash">Papelera</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>
        </div>
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

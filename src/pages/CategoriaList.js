import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaCategorias from "./view/Categorias/TablaCategorias.";
import {
  obtenerCategorias,
  crearCategoria
} from "../services/categoriaService";

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const cargarCategorias = async () => {
    const data = await obtenerCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleNueva = async () => {
    try {
      const nueva = await crearCategoria({
        nombre: `Nueva Categoría ${Date.now()}`, // 👈 único
        descripcion: "",
        color: "#000000" // 👈 válido #rrggbb
      });

      navigate(`/App/categorias/${nueva._id}`);
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <button
          onClick={handleNueva}
          className="rounded bg-primary px-6 py-2 text-white"
        >
          Nueva Categoría
        </button>
      </div>

      <TablaCategorias
        categorias={categorias}
        onVer={(id) => navigate(`/App/categorias/${id}`)}
      />
    </div>
  );
};

export default CategoriasList;

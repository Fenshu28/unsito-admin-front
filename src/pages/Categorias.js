import React from "react";
import CategoriaForm from "./view/Categorias/FormularioCategoria";
import ListaCategorias from "./view/Categorias/TablaCategorias.";
const Categorias = () => {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Administrar categorías</h2>

      <CategoriaForm />
    <ListaCategorias />
    </div>
  );
};

export default Categorias;

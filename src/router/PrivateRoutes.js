import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import PublicacionesList from "../pages/PublicacionesList";
import PublicacionDetalle from "../pages/PublicacionDetalle";
import Usuarios from "../pages/Usuarios";
import Autores from "../pages/Autores";
import Analytics from "../pages/Analytics";
import CategoriasList from "../pages/CategoriaList";
import CategoriaDetalle from "../pages/CategoriaDetalle";
import EditarAutor from "../pages/view/Autores/EditarAutor";
const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) return <Navigate to="/" />;

  return (
    <Routes>
      {/* Inicio */}
      <Route path="inicio" element={<Inicio />} />

      {/* Analytics */}
      <Route path="analytics" element={<Analytics />} />

      {/* Publicaciones */}
      <Route path="publicaciones" element={<PublicacionesList />} />
      <Route path="publicaciones/:id" element={<PublicacionDetalle />} />

      {/* Categorías */}
      <Route path="categorias" element={<CategoriasList />} />
      <Route path="categorias/:id" element={<CategoriaDetalle />} />

      {/* Usuarios */}
      <Route path="usuarios" element={<Usuarios />} />

      {/* Autores */}
      <Route path="autores" element={<Autores />} />
      <Route path="autores/editar/:id" element={<EditarAutor />} />
    </Routes>
  );
};

export default PrivateRoutes;

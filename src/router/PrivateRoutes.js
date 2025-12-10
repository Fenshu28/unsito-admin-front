import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import PublicacionesList from "../pages/PublicacionesList";
import PublicacionDetalle from "../pages/PublicacionDetalle";
import Usuarios from "../pages/Usuarios";
import Categorias from "../pages/Categorias";
import Analytics from "../pages/Analytics";

const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="inicio" element={<Inicio />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="publicaciones" element={<PublicacionesList />} />
      <Route path="publicaciones/:id" element={<PublicacionDetalle />} />
      <Route path="usuarios" element={<Usuarios />} />
      <Route path="categorias" element={<Categorias />} />
    </Routes>
  );
};

export default PrivateRoutes;




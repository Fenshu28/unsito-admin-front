import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import PublicacionesList from "../pages/PublicacionesList";
import PublicacionDetalle from "../pages/PublicacionDetalle";
import Usuarios from "../pages/Usuarios";
import Categorias from "../pages/Categorias";
<<<<<<< HEAD
import Autores from "../pages/Autores";
=======
import Analytics from "../pages/Analytics";
>>>>>>> 2c50685e78454cf0eb7d77e0f27d6ace53ef096c

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
      <Route path="Autores" element={<Autores/>}/>
    </Routes>
  );
};

export default PrivateRoutes;




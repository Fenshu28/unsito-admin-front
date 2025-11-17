// PrivateRoutes.jsx
import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Noticias from "../pages/Noticias";

const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="inicio" element={<Inicio />} />
      <Route path="noticias" element={<Noticias />} />
    </Routes>
  );
};

export default PrivateRoutes;

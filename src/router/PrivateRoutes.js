// PrivateRoutes.jsx
import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Noticias from "../pages/Noticias";
import Avisos from "../pages/Avisos";
const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="inicio" element={<Inicio />} />
      <Route path="noticias" element={<Noticias />} />
      
      <Route path="avisos" element={<Avisos />} />
     

    </Routes>
  );
};

export default PrivateRoutes;

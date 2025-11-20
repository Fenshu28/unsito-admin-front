import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Noticias from "../pages/Noticias";
import Avisos from "../pages/Avisos";
import Convocatorias from "../pages/Convocatorias";
import Eventos from "../pages/Eventos";
const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="inicio" element={<Inicio />} />
      <Route path="noticias" element={<Noticias />} />
      
      <Route path="avisos" element={<Avisos />} />
      <Route path="convocatorias" element={<Convocatorias />} />
      <Route path="Eventos" element={<Eventos />} />


    </Routes>
  );
};

export default PrivateRoutes;

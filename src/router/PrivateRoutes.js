// PrivateRoutes.jsx
import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from "../pages/view/Inicio";

const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="inicio" element={<Inicio />} />
    </Routes>
  );
};

export default PrivateRoutes;

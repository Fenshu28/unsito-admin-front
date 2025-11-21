import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import useAuth from "../hooks/useAuth";

const PublicRouter = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; // TODO: Implementar un spinner/skeletor
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/App/inicio" /> : <Login />}
      />
    </Routes>
  );
};

export default PublicRouter;

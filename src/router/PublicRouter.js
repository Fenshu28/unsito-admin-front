import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import VerifyAccount from "../pages/auth/VerifyAccount";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
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
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default PublicRouter;

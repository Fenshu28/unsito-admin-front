import React from "react";
import LoginBanner from "../../components/LoginBanner";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Lado Izquierdo: Formulario */}
      <LoginForm />

      {/* Lado Derecho: Banner */}
      <LoginBanner />
    </div>
  );
};

export default Login;

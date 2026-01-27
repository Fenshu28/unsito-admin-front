import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/App/inicio");
      } else {
        alert("Error: No se recibió un token válido.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Error al iniciar sesión";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
      <div className="w-full max-w-sm">
        {" "}
        {/* max-w-sm para evitar que sea gigante */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 font-sans">
            {" "}
            {/* Texto más moderado */}
            Iniciar Sesión
          </h1>
          <p className="text-sm text-gray-500 font-sans">
            Ingresa tu correo y contraseña para acceder
          </p>
        </div>
        <form onSubmit={handleSubmit} className="font-sans">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // Standarizado: h-11, text-sm, py-2.5 (mismo que TextField component)
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  // Standarizado
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all placeholder:text-gray-400"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <Icon
                    icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                    width="20"
                  />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <span>Recordarme</span>
              </label>

              <button
                type="button"
                className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              // Botón h-11 para coincidir con inputs, text-sm
              className="flex w-full items-center justify-center rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-700 shadow-sm hover:shadow-md focus:ring-4 focus:ring-brand-500/20"
            >
              Iniciar Sesión
            </button>

            <div className="text-center mt-6">
              <p className="text-sm font-medium text-gray-500">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  className="text-brand-600 hover:underline bg-transparent border-none p-0 cursor-pointer text-sm font-medium"
                >
                  Contacta al administrador
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

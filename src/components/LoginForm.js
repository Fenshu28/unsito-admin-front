import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/App/inicio");
    } catch (error) {
      console.error("Login error:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-8 lg:w-1/2 lg:p-12 xl:p-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h1>
          <p className="text-gray-500">
            Ingresa tu correo y contraseña para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="mb-2.5 block font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white py-4 pl-6 pr-10 text-gray-800 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="mb-2.5 block font-medium text-gray-800">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white py-4 pl-6 pr-10 text-gray-800 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all placeholder:text-gray-400"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <Icon
                    icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                    width="24"
                  />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer select-none items-center gap-2 font-medium text-gray-600">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <span>Recordarme</span>
              </label>

              <a
                href="#"
                className="font-medium text-brand-600 hover:text-brand-700 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 py-4 font-bold text-white transition-all hover:bg-brand-700 shadow-md"
            >
              Iniciar Sesión
            </button>

            <div className="text-center mt-6">
              <p className="font-medium text-gray-500">
                ¿No tienes cuenta?{" "}
                <a href="#" className="text-brand-600 hover:underline">
                  Contacta al administrador
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

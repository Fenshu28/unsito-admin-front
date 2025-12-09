import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/App/inicio");
    } catch (error) {
      console.error("Error during email/password login:", error.code);
      let message = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "Usuario no encontrado. Por favor, verifica tu correo electrónico.";
          break;
        case "auth/wrong-password":
          message = "Contraseña incorrecta. Por favor, inténtalo de nuevo.";
          break;
        case "auth/invalid-email":
          message = "El formato del correo electrónico no es válido.";
          break;
        case "auth/invalid-credential":
          message = "Credenciales inválidas. Verifica tu correo y contraseña.";
          break;
        default:
          break;
      }
      alert(message);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-gray-500">
              Ingresa tu correo y contraseña para acceder
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email <span className="text-error-500">*</span>{" "}
                  </label>
                  <input
                    type="email"
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      <Icon 
                        icon={showPassword ? "mdi:eye" : "mdi:eye-off"} 
                        className="fill-gray-500 size-5"
                      />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    />
                    <span className="block font-normal text-gray-700 text-theme-sm">
                      Recordarme
                    </span>
                  </div>
                  <a 
                    href="#!" 
                    className="text-sm text-brand-500 hover:text-brand-600"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg transition w-full px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 sm:text-start">
                ¿No tienes una cuenta?{" "}
                <a 
                  href="#!" 
                  className="text-brand-500 hover:text-brand-600"
                >
                  Contacta al administrador
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
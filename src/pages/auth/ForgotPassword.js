import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import apiClient from "../../services/api";
import { useToast } from "../../context/ToastContext";
import TextField from "../../components/TextField";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post("/auth/forgot-password", { email });
      setIsSent(true);
      toast.success("Correo de recuperación enviado.");
    } catch (err) {
      console.error("Error en forgot-password:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm border border-brand-100">
            <Icon icon="mdi:lock-reset" width="32" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            No te preocupes. Ingresa tu correo y te enviaremos un enlace para
            restablecerla.
          </p>
        </div>

        {isSent ? (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-sm font-medium text-center">
              Hemos enviado las instrucciones a <br />
              <span className="font-bold">{email}</span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              ¿No recibiste nada? Revisa tu carpeta de spam o intenta de nuevo.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 border border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
            >
              Volver al inicio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              id="email"
              type="email"
              label="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all active:scale-95 shadow-lg shadow-brand-100 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Icon
                    icon="mdi:loading"
                    className="animate-spin"
                    width="20"
                  />
                  Enviando...
                </>
              ) : (
                "Enviar Enlace"
              )}
            </button>

            <div className="text-center">
              <Link
                to="/"
                className="text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors"
              >
                Regresar al Inicio de Sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

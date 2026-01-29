import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import apiClient from "../../services/api";
import { useToast } from "../../context/ToastContext";
import TextField from "../../components/TextField";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token de activación no válido o ausente.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post("/auth/verify-account", {
        token,
        password,
      });
      setIsSuccess(true);
      toast.success("¡Cuenta activada con éxito!");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Error al verificar cuenta:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6 shadow-sm border border-green-100">
            <Icon icon="mdi:check-decagram" width="40" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Todo listo!
          </h2>
          <p className="text-gray-500 mb-8">
            Tu cuenta ha sido activada correctamente. Serás redirigido al inicio
            de sesión en unos segundos.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all active:scale-95 shadow-lg shadow-brand-100"
          >
            Ir al Inicio de Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm border border-brand-100">
            <Icon icon="mdi:shield-check" width="32" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Activa tu cuenta</h2>
          <p className="text-sm text-gray-500 mt-2">
            Para finalizar, por favor elige una contraseña segura.
          </p>
        </div>

        {!token ? (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium text-center">
            <Icon icon="mdi:alert-circle" width="24" className="mx-auto mb-2" />
            El enlace de activación parece no ser válido. Por favor, solicita
            una nueva invitación al administrador.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              id="password"
              type="password"
              label="Nueva Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
            <TextField
              id="confirmPassword"
              type="password"
              label="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
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
                  Activando...
                </>
              ) : (
                "Activar Cuenta"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;

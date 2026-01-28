import { useState, useEffect } from "react";
import apiClient from "../../../services/api";
import { Icon } from "@iconify/react";
import TextField from "../../../components/TextField";

const FormularioUsuario = ({ onClose, onUserCreated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [roles, setRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiClient
      .get("/roles")
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudieron cargar los roles.");
      });
  }, []);

  const handleRolesChange = (role) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    apiClient
      .post("/usuarios", { email, password, displayName, roles })
      .then((response) => {
        if (onUserCreated) {
          onUserCreated();
        }
        onClose();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-gray-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Icon
              icon="mdi:account-plus"
              className="text-brand-600"
              width="22"
            />
            Nuevo Usuario
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"
          >
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                id="displayName"
                label="Nombre Completo"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ej: Ana García"
                required
              />
              <TextField
                id="email"
                type="email"
                label="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana@ejemplo.com"
                required
              />
              <TextField
                id="password"
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
              />

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Asignar Roles
                </label>
                <div className="flex flex-wrap gap-2 py-2">
                  {availableRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRolesChange(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        roles.includes(role)
                          ? "bg-brand-600 border-brand-600 text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="pt-4 flex gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-brand-600 text-sm font-bold text-white hover:bg-brand-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Creando..." : "Crear Usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuario;

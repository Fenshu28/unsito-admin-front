import React, { useState, useEffect } from "react";
import apiClient from "../../../services/api";
import { Icon } from "@iconify/react";

const ManageRolesModal = ({ user, onClose, onRolesUpdated }) => {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState(user ? user.roles : []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/roles")
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((err) => {
        setError("No se pudieron cargar los roles.");
        console.error(err);
      });
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    apiClient
      .put(`/usuarios/${user.uid}/roles`, { roles: selectedRoles })
      .then(() => {
        onRolesUpdated();
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Icon
              icon="mdi:shield-account"
              className="text-brand-600"
              width="22"
            />
            Gestionar Roles
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
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Usuario seleccionado:
            </p>
            <p className="text-base font-bold text-gray-900">
              {user.displayName || user.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
              Roles Disponibles
            </label>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {availableRoles.length === 0 && !error && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-600"></div>
                </div>
              )}
              {availableRoles.map((role) => (
                <label
                  key={role}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedRoles.includes(role)
                      ? "border-brand-600 bg-brand-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-600 transition-all"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold ${selectedRoles.includes(role) ? "text-brand-700" : "text-gray-700"}`}
                    >
                      {role}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || availableRoles.length === 0}
                className="flex-1 px-4 py-2.5 rounded-xl bg-brand-600 text-sm font-bold text-white hover:bg-brand-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageRolesModal;

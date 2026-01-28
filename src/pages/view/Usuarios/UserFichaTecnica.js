import React from "react";
import { Icon } from "@iconify/react";

const UserFichaTecnica = ({ user, onClose }) => {
  if (!user) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-100";
      case "Inactive":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "Banned":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  const statusText = {
    Active: "Activo",
    Inactive: "Inactivo",
    Banned: "Baneado",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        {/* Header con Banner */}
        <div className="h-24 bg-brand-600 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-10"
          >
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>

        {/* Perfil Header */}
        <div className="px-8 pb-8 -mt-12 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-white relative">
              <img
                src={user.photoURL || "/images/user/default.png"}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {user.displayName || "Usuario Sin Nombre"}
              </h3>
              <p className="text-gray-500 font-medium">{user.email}</p>
            </div>
            <div
              className={`px-4 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusBadge(user.status || "Active")}`}
            >
              {statusText[user.status || "Active"]}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info Básica */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  Identificador Único (UID)
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <span className="truncate">{user.uid}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(user.uid)}
                    className="text-brand-600 hover:text-brand-700"
                  >
                    <Icon icon="mdi:content-copy" width="14" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                  Roles Asignados
                </label>
                <div className="flex flex-wrap gap-2">
                  {user.roles && user.roles.length > 0 ? (
                    user.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold border border-brand-100 flex items-center gap-1.5"
                      >
                        <Icon icon="mdi:shield-check" width="14" />
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      Sin roles asignados
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Datos Técnicos */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  Última Conexión
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon
                    icon="mdi:clock-outline"
                    className="text-gray-400"
                    width="18"
                  />
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString("es-MX")
                    : "No registrada"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  Fecha de Registro
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon
                    icon="mdi:calendar-check"
                    className="text-gray-400"
                    width="18"
                  />
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("es-MX")
                    : "No registrada"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  Proveedor de Autenticación
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon
                    icon="mdi:firebase"
                    className="text-orange-500"
                    width="18"
                  />
                  Firebase Auth
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all shadow-sm active:scale-95"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFichaTecnica;

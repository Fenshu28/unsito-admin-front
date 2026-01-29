import React from "react";
import { Icon } from "@iconify/react";

const ListaUsuarios = ({
  users,
  isLoading,
  initialLoading,
  onManageRoles,
  onViewDetails,
  onResendInvitation,
}) => {
  if (initialLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { bg: "bg-green-50", text: "text-green-600" };
      case "Inactive":
        return { bg: "bg-orange-50", text: "text-orange-600" };
      case "Banned":
        return { bg: "bg-red-50", text: "text-red-600" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-500" };
    }
  };

  const statusText = {
    Active: "Activo",
    Inactive: "Inactivo",
    Banned: "Baneado",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px] transition-opacity duration-300">
          <div className="flex flex-col items-center gap-2">
            <Icon
              icon="mdi:loading"
              className="animate-spin text-brand-600"
              width="40"
            />
            <span className="text-sm font-medium text-gray-600 font-sans">
              Cargando...
            </span>
          </div>
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full">
          <thead className="border-gray-100 border-y">
            <tr>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Usuario
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Email
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-left text-xs font-sans">
                Roles
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-center text-xs font-sans">
                Estado
              </th>
              <th className="py-3 px-2 font-bold text-gray-500 text-right text-xs font-sans">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-gray-500 text-sm font-sans"
                >
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.uid}
                  onClick={() => onViewDetails(user)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center shadow-sm bg-gray-50 text-brand-600">
                        <Icon icon="mdi:account" width="24" />
                      </div>
                      <p className="font-bold text-gray-800 text-sm font-sans leading-tight">
                        {user.displayName || "Usuario Sin Nombre"}
                      </p>
                    </div>
                  </td>

                  <td className="py-3 px-2 text-gray-600 text-sm font-sans leading-tight">
                    {user.email}
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex flex-wrap gap-1.5">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <span
                            key={role}
                            className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 border border-brand-100"
                          >
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-gray-400 font-medium italic">
                          Sin roles
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${getStatusColor(user.status || "Active").bg} ${getStatusColor(user.status || "Active").text}`}
                    >
                      {statusText[user.status || "Active"]}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-right">
                    <div className="flex justify-end gap-2">
                      {user.status === "Inactive" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onResendInvitation(user);
                          }}
                          className="inline-flex items-center gap-1 xl:gap-2 rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 hover:bg-orange-100 transition-all shadow-sm border border-orange-200 active:scale-95"
                          title="Reenviar invitación de activación"
                        >
                          <Icon icon="mdi:email-send" width="14" />
                          <span className="hidden xl:inline">Invitar</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onManageRoles(user);
                        }}
                        className="inline-flex items-center gap-1 xl:gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-700 transition-all shadow-sm active:scale-95"
                      >
                        <Icon icon="mdi:shield-edit" width="14" />
                        <span className="hidden xl:inline">Roles</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaUsuarios;

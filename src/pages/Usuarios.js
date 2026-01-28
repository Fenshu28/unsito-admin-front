import React, { useState, useEffect, useCallback } from "react";
import ListaUsuarios from "./view/Usuarios/ListaUsuarios";
import FormularioUsuario from "./view/Usuarios/FormularioUsuario";
import ManageRolesModal from "./view/Usuarios/ManageRolesModal";
import UserFichaTecnica from "./view/Usuarios/UserFichaTecnica";
import apiClient from "../services/api";
import { Icon } from "@iconify/react";
import { useToast } from "../context/ToastContext";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filtros
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [filtroRole, setFiltroRole] = useState("all");
  const [availableRoles, setAvailableRoles] = useState([]);

  const toast = useToast();

  const fetchRoles = useCallback(async () => {
    try {
      const response = await apiClient.get("/roles");
      setAvailableRoles(response.data);
    } catch (err) {
      console.error("Error al cargar roles:", err);
    }
  }, []);

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    setError(null);

    let query = "/usuarios?";
    if (filtroStatus !== "all") query += `status=${filtroStatus}&`;
    if (filtroRole !== "all") query += `role=${filtroRole}&`;

    apiClient
      .get(query)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
        toast.error("Error al cargar usuarios");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filtroStatus, filtroRole, toast]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRolesUpdated = () => {
    fetchUsers();
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Gestión de Usuarios
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30"
        >
          <Icon icon="mdi:plus" width="20" height="20" />
          Nuevo Usuario
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {/* Filters Card */}
      <div className="mb-6 rounded-2xl border border-gray-300 bg-white p-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-64">
            <label className="mb-2 block text-xs font-medium text-gray-500 font-sans">
              Filtrar por estatus
            </label>
            <div className="relative">
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="all">Todos los estados</option>
                <option value="Active">Activo</option>
                <option value="Inactive">Inactivo</option>
                <option value="Banned">Baneado</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-64">
            <label className="mb-2 block text-xs font-medium text-gray-500 font-sans">
              Filtrar por rol
            </label>
            <div className="relative">
              <select
                value={filtroRole}
                onChange={(e) => setFiltroRole(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
              >
                <option value="all">Todos los roles</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <Icon icon="mdi:chevron-down" width="20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <ListaUsuarios
        users={users}
        isLoading={isLoading}
        onManageRoles={setEditingUser}
        onViewDetails={setViewingUser}
      />

      {/* Modals */}
      {editingUser && (
        <ManageRolesModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onRolesUpdated={handleRolesUpdated}
        />
      )}

      {viewingUser && (
        <UserFichaTecnica
          user={viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}

      {showCreateModal && (
        <FormularioUsuario
          onClose={() => setShowCreateModal(false)}
          onUserCreated={handleRolesUpdated}
        />
      )}
    </div>
  );
};

export default Usuarios;

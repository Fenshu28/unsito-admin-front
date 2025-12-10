import React from 'react';

const ListaUsuarios = ({ users, isLoading, error, onManageRoles }) => {
    if (isLoading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p className="text-danger">Error al cargar usuarios: {error}</p>;
    }

    return (
        <div className="w-full px-6 pb-8">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-title-sm font-semibold text-gray-800">
          Usuarios del Sistema
        </h2>
        <span className="text-sm text-gray-500">
          Total: {users.length}
        </span>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg border border-stroke bg-white shadow-theme-xs">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-2 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Nombre</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Roles</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.uid}
                  className="hover:bg-gray-3 transition"
                >
                  <td className="px-4 py-3 text-gray-800">
                    {user.displayName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <span
                            key={role}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${
                                role === 'admin'
                                  ? 'bg-success-50 text-success-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                          Sin roles
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onManageRoles(user)}
                      className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-white
                        hover:bg-brand-600 transition"
                    >
                      Gestionar
                    </button>
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

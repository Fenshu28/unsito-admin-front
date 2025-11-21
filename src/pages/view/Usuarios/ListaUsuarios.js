import React from 'react';

const ListaUsuarios = ({ users, isLoading, error, onManageRoles }) => {
    if (isLoading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p className="text-danger">Error al cargar usuarios: {error}</p>;
    }

    return (
        <div className="card">
            <div className="card-header">
                Usuarios del Sistema
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No hay usuarios registrados.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.uid}>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.roles && user.roles.length > 0 ? (
                                                user.roles.map(role => (
                                                    <span key={role} className={`badge me-1 ${role === 'admin' ? 'bg-success' : 'bg-secondary'}`}>
                                                        {role}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="badge bg-light text-dark">Sin roles</span>
                                            )}
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-primary" 
                                                onClick={() => onManageRoles(user)}
                                            >
                                                Gestionar Roles
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListaUsuarios;

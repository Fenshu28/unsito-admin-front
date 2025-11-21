import React, { useState, useEffect, useCallback } from "react";
import ListaUsuarios from "./view/Usuarios/ListaUsuarios";
import FormularioUsuario from "./view/Usuarios/FormularioUsuario";
import ManageRolesModal from "./view/Usuarios/ManageRolesModal";
import apiClient from "../services/api"; // Import the new api client

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null); // State for the modal

    const fetchUsers = useCallback(() => {
        setIsLoading(true);
        setError(null);
        
        apiClient.get('/usuarios')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || error.message;
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUserCreated = () => {
        fetchUsers();
    };

    const handleRolesUpdated = () => {
        fetchUsers();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Usuarios</h2>
            <div className="row">
                <div className="col-md-8">
                    <ListaUsuarios 
                        users={users} 
                        isLoading={isLoading} 
                        error={error}
                        onManageRoles={setEditingUser} // Pass handler to open modal
                    />
                </div>
                <div className="col-md-4">
                    <FormularioUsuario onUserCreated={handleUserCreated} />
                </div>
            </div>

            {/* Conditionally render the modal */}
            {editingUser && (
                <ManageRolesModal 
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onRolesUpdated={handleRolesUpdated}
                />
            )}
        </div>
    );
};

export default Usuarios;

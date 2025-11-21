import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api';

const ManageRolesModal = ({ user, onClose, onRolesUpdated }) => {
    const [availableRoles, setAvailableRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState(user ? user.roles : []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get('/roles')
            .then(response => {
                setAvailableRoles(response.data);
            })
            .catch(err => {
                setError('No se pudieron cargar los roles para seleccionar.');
                console.error(err);
            });
    }, []);

    const handleRoleChange = (role) => {
        setSelectedRoles(prevRoles =>
            prevRoles.includes(role)
                ? prevRoles.filter(r => r !== role)
                : [...prevRoles, role]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        apiClient.put(`/usuarios/${user.uid}/roles`, { roles: selectedRoles })
            .then(() => {
                onRolesUpdated(); // Notify parent to refetch users
                onClose(); // Close the modal
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || error.message;
                setError(errorMessage);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    // Basic modal styling using bootstrap classes
    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Gestionar Roles para {user.displayName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <p>Selecciona los roles para este usuario:</p>
                            {availableRoles.length === 0 && !error && <p>Cargando roles...</p>}
                            {availableRoles.map(role => (
                                <div className="form-check" key={role}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={role}
                                        id={`role-modal-${role}`}
                                        checked={selectedRoles.includes(role)}
                                        onChange={() => handleRoleChange(role)}
                                    />
                                    <label className="form-check-label" htmlFor={`role-modal-${role}`}>
                                        {role}
                                    </label>
                                </div>
                            ))}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            <div className="modal-footer mt-3">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting || availableRoles.length === 0}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageRolesModal;

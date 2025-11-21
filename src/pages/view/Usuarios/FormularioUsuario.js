import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api';

const FormularioUsuario = ({ onUserCreated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [roles, setRoles] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch available roles from the backend
        apiClient.get('/roles')
            .then(response => {
                setAvailableRoles(response.data);
            })
            .catch(error => {
                console.error(error);
                setError('No se pudieron cargar los roles para seleccionar.');
            });
    }, []);

    const handleRolesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setRoles(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        apiClient.post('/usuarios', { email, password, displayName, roles })
            .then(response => {
                setSuccess(`Usuario "${response.data.displayName}" creado exitosamente.`);
                // Clear form
                setEmail('');
                setPassword('');
                setDisplayName('');
                setRoles([]);
                // Notify parent component
                if (onUserCreated) {
                    onUserCreated();
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || error.message;
                setError(errorMessage);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="card">
            <div className="card-header">
                Crear Nuevo Usuario
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="displayNameInput" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="displayNameInput"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rolesSelect" className="form-label">Roles</label>
                        <select 
                            multiple 
                            className="form-select" 
                            id="rolesSelect"
                            value={roles}
                            onChange={handleRolesChange}
                            disabled={availableRoles.length === 0}
                        >
                            {availableRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <div className="form-text">
                            Mantén presionada la tecla Ctrl (o Cmd en Mac) para seleccionar múltiples roles.
                        </div>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Creando...' : 'Crear Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioUsuario;

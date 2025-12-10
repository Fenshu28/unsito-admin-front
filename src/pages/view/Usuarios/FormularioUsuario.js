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
        <div className="w-full px-6 py-6">

        <div className="mb-6 border-b border-stroke pb-4">
          <h1 className="text-title-md font-semibold text-gray-800">
            Usuarios
          </h1>
          <p className="text-sm text-gray-500">
            Crear y administrar usuarios del sistema
          </p>
        </div>
  
        <div className="max-w-7xl">
  
          <form onSubmit={handleSubmit} className="space-y-6">
  
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="h-11 w-full rounded-md border border-stroke px-4 text-sm
                    focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
  
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-md border border-stroke px-4 text-sm
                    focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
  
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-md border border-stroke px-4 text-sm
                    focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
  
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Roles
                </label>
                <select
                  multiple
                  value={roles}
                  onChange={handleRolesChange}
                  className="h-32 w-full rounded-md border border-stroke px-4 py-2 text-sm
                    focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                >
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
  
            </div>
  
            {error && (
              <div className="rounded-md border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">
                {error}
              </div>
            )}
  
            {success && (
              <div className="rounded-md border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700">
                {success}
              </div>
            )}
  
            <div className="flex justify-end gap-3 border-t border-stroke pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-brand-500 px-6 py-2.5 text-sm font-medium text-white
                  hover:bg-brand-600 disabled:opacity-60"
              >
                {isSubmitting ? 'Creando...' : 'Crear Usuario'}
              </button>
            </div>
  
          </form>
        </div>
      </div>
    );
};

export default FormularioUsuario;

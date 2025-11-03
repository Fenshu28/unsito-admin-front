import React from 'react';
import { Icon } from '@iconify/react';

const Login = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 bg-primary d-flex align-items-center justify-content-center text-white">
          {/* Banner Section */}
          <div>
            <h1>Bienvenido a Unsito</h1>
            <p>Tu plataforma para gestionar todo.</p>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          {/* Login Form Section */}
          <div className="w-75">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="emailInput" className="form-label">
                  <Icon icon="mdi:email-outline" className="me-2" />
                  Correo Electrónico
                </label>
                <input type="email" className="form-control" id="emailInput" placeholder="tu@email.com" />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="passwordInput" className="form-label">
                  <Icon icon="mdi:lock-outline" className="me-2" />
                  Contraseña
                </label>
                <input type="password" className="form-control" id="passwordInput" placeholder="Tu contraseña" />
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                </div>
                <a href="#!" className="text-decoration-none">¿Olvidé mi contraseña?</a>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  <Icon icon="mdi:login" className="me-2" />
                  Ingresar
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid">
                <button type="button" className="btn btn-danger">
                  <Icon icon="mdi:google" className="me-2" />
                  Iniciar sesión con Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Datos ficticios
  const fakeUser = {
    email: 'jose@gmail.com',
    password: '123456',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Comprobación simple con datos ficticios
    if (email === fakeUser.email && password === fakeUser.password) {
      // Guardar token en localStorage
      localStorage.setItem("token", "faketoken123");
  
      // Redirigir a la ruta privada
      navigate("/App/inicio"); 
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };
  


  return (
    <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div className="w-75">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="emailInput" className="form-label">
              <Icon icon="mdi:email-outline" className="me-2" />
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="passwordInput" className="form-label">
              <Icon icon="mdi:lock-outline" className="me-2" />
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Recordarme
              </label>
            </div>
            <a href="#!">¿Olvidé mi contraseña?</a>
          </div>
          <div className="d-grid">
            <button type="submit" className={`btn btn-primary`}>
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
  );
};

export default LoginForm;

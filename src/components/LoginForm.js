import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, signOut, signInWithEmailAndPassword } from 'firebase/auth';


const LoginForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const methods = await fetchSignInMethodsForEmail(auth, result.user.email);

      if (methods.length === 0) {
        await signOut(auth);
        alert("Tu cuenta de Google no está registrada. Por favor, contacta al administrador.");
      } else {
        const token = await result.user.getIdToken();
        localStorage.setItem("token", token);
        navigate("/App/inicio");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/App/inicio");
    } catch (error) {
      console.error("Error during email/password login:", error.code);
      let message = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "Usuario no encontrado. Por favor, verifica tu correo electrónico.";
          break;
        case "auth/wrong-password":
          message = "Contraseña incorrecta. Por favor, inténtalo de nuevo.";
          break;
        case "auth/invalid-email":
          message = "El formato del correo electrónico no es válido.";
          break;
        default:
          break;
      }
      alert(message);
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
            <button type="button" className="btn btn-danger" onClick={handleGoogleLogin}>
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
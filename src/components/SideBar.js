import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-dark text-white p-3 shadow vh-100 border-end border-secondary">
      <h4 className="text-info fw-bold text-center mb-4">Menú</h4>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link to="/app/inicio" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path></svg>
            Inicio
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/App/noticias" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M4 7v12h15v2H4c-2 0-2-2-2-2V7zm17-2v10H8V5zm.3-2H7.7C6.76 3 6 3.7 6 4.55v10.9c0 .86.76 1.55 1.7 1.55h13.6c.94 0 1.7-.69 1.7-1.55V4.55C23 3.7 22.24 3 21.3 3M9 6h3v5H9zm11 8H9v-2h11zm0-6h-6V6h6zm0 3h-6V9h6z"></path></svg>
             Noticias
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/avisos" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h3l5 4V4zm9.5 4c0 1.71-.96 3.26-2.5 4V8c1.53.75 2.5 2.3 2.5 4"></path></svg>
            Avisos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/eventos" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"></path></svg>
            Eventos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/convocatorias" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"></path></svg>
            Convocatorias
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/categorias" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 5h14v2H7zm0 8v-2h14v2zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2zm-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5"></path></svg>
            Categorías
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

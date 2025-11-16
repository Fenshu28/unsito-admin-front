import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-dark text-white p-3 shadow vh-100 border-end border-secondary">
      <h4 className="text-info fw-bold text-center mb-4">Menú</h4>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link to="/App/inicio" className="nav-link text-white fw-semibold">
            Inicio
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/noticias" className="nav-link text-white fw-semibold">
            Noticias
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/avisos" className="nav-link text-white fw-semibold">
            Avisos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/eventos" className="nav-link text-white fw-semibold">
            Eventos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/convocatorias" className="nav-link text-white fw-semibold">
            Convocatorias
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/app/categorias" className="nav-link text-white fw-semibold">
            Categorías
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import BtnCerrar from "./BtnCerrar";
import { Icon } from "@iconify/react";
import Can from "./Can"; // Import the Can component
import Categorias from "../pages/Categorias";
const Sidebar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="d-flex flex-column bg-dark text-white p-3 shadow vh-100 border-end border-secondary">
      <h4 className="text-info fw-bold text-center mb-4">Menú</h4>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link to="/App/inicio" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <Icon icon="mdi:home-variant" width="24" height="24" />


            Inicio
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/App/noticias" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <Icon icon="mdi:newspaper-variant-multiple-outline" width="24" height="24" />
            Noticias
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/App/avisos" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <Icon icon="mdi:loudspeaker" width="24" height="24" />
            Avisos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/App/eventos" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <Icon icon="mdi:calendar-multiple" width="24" height="24" />
            Eventos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/App/convocatorias" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
          <Icon icon="mdi:people-group" width="24" height="24" />
            Convocatorias
          </Link>
        </li>
        {/* Admin-only sections */}
        <Can hasRole="admin">
            <li className="nav-item mb-2">
              <Link to="/App/categorias" className="nav-link text-white fw-semibold d-flex align-items-center gap-2" element={<Categorias />}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 5h14v2H7zm0 8v-2h14v2zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2zm-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5"></path></svg>
                Categorías
              </Link>
            </li>
            <li className="nav-item mb-2">
                <Link to="/App/usuarios" className="nav-link text-white fw-semibold d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
                    Usuarios
                </Link>
            </li>
        </Can>
      </ul>
    <BtnCerrar onClick={handleLogout} />
    </div>
  );
};

export default Sidebar;


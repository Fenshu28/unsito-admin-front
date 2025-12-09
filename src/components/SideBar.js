import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import BtnCerrar from "./BtnCerrar";
import Can from "./Can";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col p-6 shadow-xl min-h-screen border-r border-blue-900">
      
      {/* TÍTULO */}
      <h2 className="text-2xl font-bold text-center mb-8 tracking-wide text-blue-100">
        Panel Admin
      </h2>

      {/* NAV */}
      <nav className="flex flex-col gap-2">

        <Link
          to="/App/inicio"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          <Icon icon="mdi:home-variant" width="24" />
          Inicio
        </Link>

        <Link
          to="/App/publicaciones"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          <Icon icon="mdi:newspaper-variant-multiple-outline" width="24" />
          Publicaciones
        </Link>

        {/* SOLO ADMIN */}
        <Can hasRole="admin">
          <Link
            to="/App/categorias"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            <Icon icon="mdi:format-list-bulleted" width="24" />
            Categorías
          </Link>

          <Link
            to="/App/usuarios"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            <Icon icon="mdi:account-group-outline" width="24" />
            Usuarios
          </Link>
        </Can>
      </nav>

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="mt-auto">
        <BtnCerrar
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-semibold transition text-center"
        />
      </div>
    </div>
  );
};

export default Sidebar;

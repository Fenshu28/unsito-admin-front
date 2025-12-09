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
    <aside className="h-screen w-64 bg-white dark:bg-boxdark border-r border-stroke dark:border-strokedark flex flex-col shadow-2">
      
      {/* TÍTULO */}
      <div className="px-6 py-5.5 border-b border-stroke dark:border-strokedark">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          Panel Admin
        </h2>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1.5 px-4 py-4 flex-1 overflow-y-auto">

        <Link
          to="/App/inicio"
          className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
        >
          <Icon icon="mdi:home-variant" width="18" />
          Inicio
        </Link>

        <Link
          to="/App/publicaciones"
          className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
        >
          <Icon icon="mdi:newspaper-variant-multiple-outline" width="18" />
          Publicaciones
        </Link>

        {/* SOLO ADMIN */}
        <Can hasRole="admin">
          <Link
            to="/App/categorias"
            className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
          >
            <Icon icon="mdi:format-list-bulleted" width="18" />
            Categorías
          </Link>

          <Link
            to="/App/usuarios"
            className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
          >
            <Icon icon="mdi:account-group-outline" width="18" />
            Usuarios
          </Link>
        </Can>
      </nav>

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="px-4 py-4 border-t border-stroke dark:border-strokedark">
        <BtnCerrar
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-meta-1 hover:bg-opacity-90 text-white py-2.5 px-4 rounded-sm font-medium transition duration-300"
        />
      </div>
    </aside>
  );
};

export default Sidebar;

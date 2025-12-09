import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import BtnCerrar from "./BtnCerrar";
import Can from "./Can";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  // Menú items
  const menuItems = [
    {
      name: "Inicio",
      icon: "mdi:home-variant",
      path: "/App/inicio",
    },
    {
      name: "Publicaciones",
      icon: "mdi:newspaper-variant-multiple-outline",
      path: "/App/publicaciones",
    },
  ];

  const adminMenuItems = [
    {
      name: "Categorías",
      icon: "mdi:format-list-bulleted",
      path: "/App/categorias",
    },
    {
      name: "Usuarios",
      icon: "mdi:account-group-outline",
      path: "/App/usuarios",
    },
  ];

  const renderMenuItem = (item, index) => (
    <li key={item.name}>
      <Link
        to={item.path}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
          isActive(item.path)
            ? "bg-graydark dark:bg-meta-4 text-white"
            : "text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4"
        } ${!isExpanded && !isHovered ? "lg:justify-center" : ""}`}
      >
        <Icon
          icon={item.icon}
          width="18"
          className={`${
            isActive(item.path) ? "text-white" : "text-bodydark1"
          }`}
        />
        {(isExpanded || isHovered || isMobileOpen) && (
          <span className="text-sm">{item.name}</span>
        )}
      </Link>
    </li>
  );

  return (
    <>
      {/* Backdrop para móvil */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsHovered(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-boxdark border-r border-stroke dark:border-strokedark flex flex-col shadow-2 transition-all duration-300 ease-in-out
          ${
            isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
              ? "w-[290px]"
              : "w-[90px]"
          }
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo / Título */}
        <div
          className={`py-5.5 px-6 border-b border-stroke dark:border-strokedark flex ${
            !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
        >
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-2">
              <img
                src="https://assets-unsito.flaisgrafics.com/logo.png"
                alt="Logo"
                className="h-10"
              />
              <h2 className="text-title-md font-bold text-black dark:text-white">
                Unsito
              </h2>
            </div>
          ) : (
            <img
              src="https://assets-unsito.flaisgrafics.com/logo.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
          )}
        </div>

        {/* Navegación */}
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          <nav className="px-4 py-4">
            {/* Sección MENU */}
            <div className="mb-6">
              <h3
                className={`mb-4 text-xs uppercase text-bodydark2 flex ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "MENU"
                ) : (
                  <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
                )}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </ul>
            </div>

            {/* Sección ADMIN (solo para admin) */}
            <Can hasRole="admin">
              <div>
                <h3
                  className={`mb-4 text-xs uppercase text-bodydark2 flex ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "ADMIN"
                  ) : (
                    <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
                  )}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {adminMenuItems.map((item, index) =>
                    renderMenuItem(item, `admin-${index}`)
                  )}
                </ul>
              </div>
            </Can>
          </nav>
        </div>

        {/* Botón Cerrar Sesión */}
        <div className="px-4 py-4 border-t border-stroke dark:border-strokedark">
          <BtnCerrar
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 bg-meta-1 hover:bg-opacity-90 text-white py-2.5 px-4 rounded-sm font-medium transition duration-300 ${
              !isExpanded && !isHovered ? "lg:px-2" : ""
            }`}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

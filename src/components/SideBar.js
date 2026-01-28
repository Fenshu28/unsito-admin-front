import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
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
      name: "Estadísticas",
      icon: "mdi:chart-box-outline",
      path: "/App/analytics",
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
      name: "Autores",
      icon: "mdi:account-multiple-outline",
      path: "/App/autores",
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
        className={`menu-item group ${
          isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
        } ${!isExpanded && !isHovered ? "lg:justify-center" : ""}`}
      >
        <Icon
          icon={item.icon}
          width="24"
          className={`${
            isActive(item.path)
              ? "menu-item-icon-active"
              : "menu-item-icon-inactive"
          }`}
        />
        {(isExpanded || isHovered || isMobileOpen) && (
          <span className="text-sm font-medium">{item.name}</span>
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
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-300 flex flex-col shadow-theme-lg transition-all duration-300 ease-in-out
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
          className={`py-6 px-6 flex ${
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
              <h2 className="text-xl font-bold text-gray-900">Unsito</h2>
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
                className={`mb-4 text-xs font-semibold uppercase text-gray-400 flex ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "General"
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
                  className={`mb-4 text-xs font-semibold uppercase text-gray-400 flex ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Administración"
                  ) : (
                    <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
                  )}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {adminMenuItems.map((item, index) =>
                    renderMenuItem(item, `admin-${index}`),
                  )}
                </ul>
              </div>
            </Can>
          </nav>
        </div>

        {/* Botón Cerrar Sesión */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium transition duration-300 ${
              !isExpanded && !isHovered ? "lg:px-2" : ""
            }`}
          >
            <Icon icon="mdi:logout" width="20" />
            {(isExpanded || isHovered || isMobileOpen) && (
              <span>Cerrar Sesión</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

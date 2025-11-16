import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar sticky-top bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Espacio para la imagen */}
        <img
          src="/logo.png" // aquí pones la ruta de tu imagen
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />

        {/* Texto junto a la imagen */}
        <span className="navbar-brand mb-0 h1">Mi Aplicación</span>
      </div>
    </nav>
  );
};

export default NavBar;

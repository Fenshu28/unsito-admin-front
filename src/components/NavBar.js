import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar sticky-top bg-light">
      <div className="container-fluid d-flex align-items-center">
        {/* Espacio para la imagen */}
        <img
          src="https://assets-unsito.flaisgrafics.com/logo.png" 
          alt="Logo"
          style={{ height: "80px", marginRight: "10px" }}
        />

        {/* Texto junto a la imagen */}
        <span className="navbar-brand mb-0 h1" >Unsito Digital</span>
        
      </div>
    </nav>
  );
};

export default NavBar;

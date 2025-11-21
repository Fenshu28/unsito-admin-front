import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-light bg-light border-bottom">
      <div className="container-fluid">

        {/* Logo + Texto */}
        <div className="d-flex align-items-center">
          <img
            src="https://assets-unsito.flaisgrafics.com/logo.png"
            alt="Logo"
            className="me-2"
            style={{ height: "70px" }} 
          />
          <span className="navbar-brand mb-0 h1 fw-bold">Unsito Digital</span>
        </div>

        {/* Ícono alineado a la derecha */}
        <div className="ms-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            className="me-2"
          >
            <path
              fill="currentColor"
              d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
            ></path>
          </svg>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;

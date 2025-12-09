import React from "react";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-999 flex w-full bg-white dark:bg-boxdark border-b border-stroke dark:border-strokedark shadow-2">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">

        {/* Logo + Texto */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src="https://assets-unsito.flaisgrafics.com/logo.png"
            alt="Logo"
            className="h-12 sm:h-16 md:h-18"
          />
          <span className="text-title-md font-bold text-black dark:text-white hidden sm:block">
            Unsito Digital
          </span>
        </div>

        {/* Ícono de usuario alineado a la derecha */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            className="text-bodydark1 dark:text-bodydark hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
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

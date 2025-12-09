import React from "react";

const LoginBanner = () => {
  return (
    <div
      className="hidden md:flex w-1/2 relative items-center justify-center text-white bg-cover bg-center bg-no-repeat"
      style={{backgroundImage:"url('https://assets-unsito.flaisgrafics.com/unsis.png')",
      }}
    >
      {/* Overlay con blur */}
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>

      {/* Texto */}
      <div className="relative text-center px-6">
        <h1 className="text-4xl font-extrabold drop-shadow-lg">
          Bienvenido a Unsito
        </h1>
        <p className="mt-3 text-lg text-blue-100">
          Tu plataforma para gestionar todo.
        </p>
      </div>
    </div>
  );
};

export default LoginBanner;

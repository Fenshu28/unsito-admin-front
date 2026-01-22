import React from "react";

const LoginBanner = () => {
  return (
    <div className="hidden h-screen w-1/2 lg:block relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://assets-unsito.flaisgrafics.com/unsis.png')",
        }}
      ></div>

      {/* Overlay Oscuro Completo con Blur Visible */}
      <div className="absolute inset-0 h-full w-full bg-black/40 backdrop-blur-md"></div>

      {/* Contenido Centrado */}
      <div className="relative z-10 flex h-full items-center justify-center px-10 text-center">
        <div className="max-w-[400px]">
          <div className="mb-8 flex justify-center">
            {/* Logo Circular con más presencia y fondo claro */}
            <div className="rounded-full bg-white/95 p-6 shadow-2xl backdrop-blur-sm">
              <img
                src="https://assets-unsito.flaisgrafics.com/logo.png"
                alt="Logo"
                className="h-28 w-auto drop-shadow-md"
              />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white drop-shadow-md">
            Bienvenido a Unsito
          </h2>
          <p className="text-lg text-white/90 drop-shadow-sm font-medium">
            Tu plataforma digital universitaria para gestionar todo en un solo
            lugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;

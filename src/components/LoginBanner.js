import React from "react";

const LoginBanner = () => {
  return (
    <div 
      className="items-center hidden w-full h-full lg:w-1/2 lg:grid bg-cover bg-center"
      style={{
        backgroundImage: "url('https://assets-unsito.flaisgrafics.com/unsis.png')"
      }}
    >
      <div className="relative flex items-center justify-center z-1">
        {/* Overlay con blur */}
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
        
        {/* Contenido */}
        <div className="relative flex flex-col items-center max-w-xs text-center text-white px-6">
          <div className="mb-4">
            <img
              src="https://assets-unsito.flaisgrafics.com/logo.png"
              alt="Logo"
              className="h-16 w-auto drop-shadow-2xl"
            />
          </div>
          <p className="text-lg">
            Bienvenido a Unsito - Tu plataforma para gestionar todo
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;

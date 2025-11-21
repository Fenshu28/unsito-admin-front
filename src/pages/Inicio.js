import React from "react";
import AccesoTarjeta from "./view/Inicio/AccesoTarjeta";

const accesos = [
  { titulo: "Noticias", descripcion: "Gestión de noticias", ruta: "/app/noticias" },
  { titulo: "Avisos", descripcion: "Administración de avisos", ruta: "/app/avisos" },
  { titulo: "Eventos", descripcion: "Control de eventos", ruta: "/app/eventos" },
  { titulo: "Convocatorias", descripcion: "Gestión de convocatorias", ruta: "/app/convocatorias" },
  { titulo: "Categorías", descripcion: "Administrar categorías", ruta: "/app/categorias" },
];

const Inicio = () => {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Accesos Rápidos</h2>

      <div className="row g-4">
        {accesos.map((item, index) => (
          <AccesoTarjeta
            key={index}
            titulo={item.titulo}
            descripcion={item.descripcion}
            ruta={item.ruta}
          />
        ))}
      </div>

    </div>
  );
};

export default Inicio;

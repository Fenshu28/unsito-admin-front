import React, { useState } from "react";
import Filtros from "./view/Inicio/Filtros";
import TarjetaPanel from "./view/Inicio/TarjetaPanel";

const paneles = [
  { tipo: "Noticias", titulo: "Noticia 1", descripcion: "Lorem ipsum dolor sit amet.", imagen: "/images/noticias.jpg" },
  { tipo: "Avisos", titulo: "Aviso 1", descripcion: "Cambio de horario.", imagen: "/images/anuncios.jpg" },
  { tipo: "Eventos", titulo: "Evento 1", descripcion: "Taller de capacitación.", imagen: "/images/eventos.jpg" },
  { tipo: "Eventos", titulo: "Evento 2", descripcion: "Reunión de equipo.", imagen: "/images/eventos.jpg" },
  { tipo: "Avisos", titulo: "Aviso 2", descripcion: "Mantenimiento programado.", imagen: "/images/anuncios.jpg" },
];

const Inicio = () => {
  const [filter, setFilter] = useState("Todos");

  const filteredPanels = filter === "Todos" ? paneles : paneles.filter(panel => panel.tipo === filter);

  const handleFilter = (tipo) => setFilter(tipo);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Resumen del Sistema</h2>

      {/* Filtros */}
      <Filtros filter={filter} handleFilter={handleFilter} />

      {/* Tarjetas */}
      <div className="d-flex flex-column gap-3">
        {filteredPanels.map((panel, index) => (
          <TarjetaPanel key={index} panel={panel} />
        ))}
      </div>
    </div>
  );
};

export default Inicio;

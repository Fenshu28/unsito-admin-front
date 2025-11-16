import React from "react";

const Filtros = ({ filter, handleFilter }) => {
  const tipos = ["Todos", "Noticias", "Eventos", "Avisos"];

  return (
    <div className="mb-3">
      {tipos.map(tipo => (
        <button
          key={tipo}
          className={`btn btn-outline-primary me-2 ${filter === tipo ? "active" : ""}`}
          onClick={() => handleFilter(tipo)}
        >
          {tipo}
        </button>
      ))}
    </div>
  );
};

export default Filtros;

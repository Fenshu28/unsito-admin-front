import React from "react";

const TarjetaPanel = ({ panel }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-9">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">{panel.tipo}</h6>
            <h5 className="card-title">{panel.titulo}</h5>
            <p className="card-text">{panel.descripcion}</p>
          </div>
        </div>
        <div className="col-md-3">
          <img
            src={panel.imagen}
            className="img-fluid rounded-end"
            alt={panel.titulo}
          />
        </div>
      </div>
    </div>
  );
};

export default TarjetaPanel;

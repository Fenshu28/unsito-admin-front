import React from "react";
import { Link } from "react-router-dom";

const AccesoTarjeta = ({ titulo, descripcion, ruta }) => {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm h-100">
        <div className="card-body text-center">

          <h5 className="card-title fw-bold">{titulo}</h5>

          <p className="card-text">{descripcion}</p>

          <Link to={ruta} className="btn btn-primary w-100">
            Ir a {titulo}
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AccesoTarjeta;

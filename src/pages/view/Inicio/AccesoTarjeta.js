import React from "react";
import { Link } from "react-router-dom";

const AccesoTarjeta = ({ titulo, descripcion, ruta }) => {
  return (
    <div className="col-md-4">
      <div className="card h-100 border shadow-sm">

        <div className="card-header bg-primary text-white text-center fs-4 py-4">
          {titulo}
        </div>

        <div className="card-body text-center d-flex flex-column p-4">

          <p className="text-muted mb-4 fs-5">
            {descripcion}
          </p>

          <div className="mt-auto">
            <Link to={ruta} className="btn btn-outline-primary btn-lg w-100">
              Abrir {titulo}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccesoTarjeta;

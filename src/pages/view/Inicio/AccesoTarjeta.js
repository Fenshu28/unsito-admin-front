import React from "react";
import { Link } from "react-router-dom";

const AccesoTarjeta = ({ titulo, descripcion, ruta }) => {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 border-0 shadow"
        style={{ minHeight: "260px" }}   // <-- Aumento del tamaño
      >

        {/* Línea decorativa arriba */}
        <div className="card-header bg-primary text-white py-3 text-center fw-semibold fs-5">
          {titulo}
        </div>

        <div className="card-body d-flex flex-column text-center px-4">

          <p className="text-muted mb-4 fs-6">
            {descripcion}
          </p>

          <div className="mt-auto">
            <Link to={ruta} className="btn btn-outline-primary w-100 py-2 fs-6 fw-semibold">
              Abrir {titulo}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccesoTarjeta;

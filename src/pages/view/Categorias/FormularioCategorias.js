import React from "react";

const FormularioCategorias = () => {
  return (
    <div className="p-3 border rounded shadow-sm mb-4">
      <h5 className="fw-semibold mb-3">Formulario de categoría</h5>

      <label className="form-label">Nombre de categoría</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="p. ej., Beca de investigación"
      />

      <label className="form-label">Descripción (Opcional)</label>
      <textarea
        className="form-control mb-3"
        rows="3"
      ></textarea>

      <button className="btn btn-danger fw-semibold">
        Agregar categoría
      </button>
    </div>
  );
};

export default FormularioCategorias;

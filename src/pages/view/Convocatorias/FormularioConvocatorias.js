import React from "react";

const FormularioConvocatorias = ({ formData, handleChange, agregarConvocatoria }) => {
  return (
    <div className="card p-4 mt-3 shadow-sm">
      <h5 className="mb-3">Formulario de Convocatoria</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-bold">Título de la Convocatoria</label>
          <input
            className="form-control"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej. Beca de Investigación fw-bold"
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">Descripción / Detalles</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Fecha Inicio</label>
          <input
            className="form-control"
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Fecha Fin</label>
          <input
            className="form-control"
            type="date"
            name="fechaFin"
            value={formData.fechaFin}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">Categoría</label>
          <input
            className="form-control"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Ej. Becas"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Enlace Externo (Opcional)</label>
          <input
            className="form-control"
            name="enlace"
            value={formData.enlace}
            onChange={handleChange}
            placeholder="Enlace a la convocatoria"
          />
        </div>

        <div className="col-12">
          <div
            className="border p-4 text-center rounded"
            style={{ borderStyle: "dashed" }}
          >
            <h6 className="fw-bold">Subir Archivo</h6>
            <p className="small">Arrastra un archivo PDF o imagen aquí, o:</p>
            <input
              type="file"
              className="form-control"
              onChange={handleChange}
              name="archivo"
            />
          </div>
        </div>

        <div className="col-12 d-flex align-items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="destacado"
            checked={formData.destacado}
            onChange={handleChange}
          />
          <label>Convocatoria Destacada</label>
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-danger" onClick={agregarConvocatoria}>
            Agregar Convocatoria
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioConvocatorias;

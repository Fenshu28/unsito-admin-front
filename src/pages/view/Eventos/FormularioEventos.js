import React from "react";

const EventoForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Título*</label>
        <input
          type="text"
          className="form-control"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Organizador</label>
        <input
          type="text"
          className="form-control"
          name="organizador"
          value={formData.organizador}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha*</label>
        <input
          type="date"
          className="form-control"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <input
          type="text"
          className="form-control"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen</label>
        <input
          type="file"
          className="form-control"
          name="imagen"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Agregar Evento
      </button>
    </form>
  );
};

export default EventoForm;

import React, { useState } from "react";

const FormularioAviso = ({ agregarAviso, categorias }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoria: "",
    fecha: "",
    archivo: null,
    destacado: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarAviso(formData);
    setFormData({
      titulo: "",
      autor: "",
      descripcion: "",
      categoria: "",
      fecha: "",
      archivo: null,
      destacado: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label fw-bold">Título del Aviso</label>
        <input
          type="text"
          className="form-control"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ingrese el título del aviso"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Autor</label>
        <input
          type="text"
          className="form-control"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          placeholder="Nombre del autor"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="3"
          placeholder="Ingrese la descripción"
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Fecha de Publicación</label>
        <input
          type="date"
          className="form-control"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Subir Archivo</label>
        <input
          type="file"
          className="form-control"
          name="archivo"
          onChange={handleChange}
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          name="destacado"
          checked={formData.destacado}
          onChange={handleChange}
        />
        <label className="form-check-label fw-bold">Aviso prioritario</label>
      </div>

      <button type="submit" className="btn btn-primary fw-bold">Agregar aviso</button>
    </form>
  );
};

export default FormularioAviso;

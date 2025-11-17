import React, { useState } from "react";

const FormularioNoticia = ({ agregarNoticia }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    fecha: "",
    categoria: "",
    descripcion: "",
    imagenPrincipal: null,
    imagenesCarrusel: [],
    archivoPDF: null,
    destacado: false
  });

  const categorias = ["Ciencia", "Internacional", "Tecnología", "Humanidades", "Arte"];

  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    let nuevoValor;
  
    if (type === "checkbox") {
      nuevoValor = checked;
    } else if (type === "file") {
      nuevoValor = name === "imagenesCarrusel" ? Array.from(files) : files[0];
    } else {
      nuevoValor = value;
    }
  
    setFormData(prev => Object.assign({}, prev, { [name]: nuevoValor }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarNoticia(formData);
    setFormData({
      titulo: "",
      autor: "",
      fecha: "",
      categoria: "",
      descripcion: "",
      imagenPrincipal: null,
      imagenesCarrusel: [],
      archivoPDF: null,
      destacado: false
    });
    alert("¡Noticia agregada!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Título de la noticia</label>
        <input
          type="text"
          className="form-control"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ingrese el título de la noticia"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Autor</label>
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
        <label className="form-label">Fecha de publicación</label>
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
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción / Contenido</label>
        <textarea
          className="form-control"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          placeholder="Ingrese el contenido de la noticia"
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Subir imagen principal</label>
        <input
          type="file"
          className="form-control"
          name="imagenPrincipal"
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Subir imágenes adicionales (para carrusel)</label>
        <input
          type="file"
          className="form-control"
          name="imagenesCarrusel"
          onChange={handleChange}
          accept="image/*"
          multiple
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Adjuntar archivo PDF (opcional)</label>
        <input
          type="file"
          className="form-control"
          name="archivoPDF"
          onChange={handleChange}
          accept="application/pdf"
        />
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="destacado"
          checked={formData.destacado}
          onChange={handleChange}
        />
        <label className="form-check-label">Destacar noticia</label>
      </div>

      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default FormularioNoticia;

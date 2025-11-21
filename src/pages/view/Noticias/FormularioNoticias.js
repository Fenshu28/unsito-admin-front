import React from "react";

const FormularioNoticia = () => {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Título de la noticia</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el título de la noticia"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Autor</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del autor"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de publicación</label>
        <input
          type="date"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select className="form-select">
          <option value="">Seleccione una categoría</option>
          <option>Ciencia</option>
          <option>Internacional</option>
          <option>Tecnología</option>
          <option>Humanidades</option>
          <option>Arte</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción / Contenido</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Ingrese el contenido de la noticia"
        ></textarea>
      </div>

      {/* TARJETAS DE SUBIDA DE ARCHIVOS */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Imagen Principal</h5>
              <p className="card-text">Sube la imagen principal para la noticia.</p>
              <input
                type="file"
                className="form-control"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Imágenes del Carrusel</h5>
              <p className="card-text">Puedes seleccionar varias imágenes.</p>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Archivo PDF (opcional)</h5>
              <p className="card-text">Adjunta un documento en formato PDF.</p>
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-check my-3">
        <input className="form-check-input" type="checkbox" />
        <label className="form-check-label">Destacar noticia</label>
      </div>

      <button type="button" className="btn btn-primary w-100 mt-3">
        Guardar
      </button>
    </form>
  );
};

export default FormularioNoticia;

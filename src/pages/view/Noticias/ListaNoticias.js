import React, { useState } from "react";

const ListaNoticias = ({ listaNoticias, categorias = [] }) => {
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  // Filtrar noticias según categoría y fecha
  const noticiasFiltradas = listaNoticias.filter(noticia => {
    const coincideCategoria = filtroCategoria ? noticia.categoria === filtroCategoria : true;
    const coincideFecha = filtroFecha ? noticia.fecha === filtroFecha : true;
    return coincideCategoria && coincideFecha;
  });

  return (
    <div>
      <h3 className="mt-5">Noticias existentes</h3>

      {/* Filtros */}
      <div className="mb-3">
        <select
          className="form-select mb-2"
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          className="form-control"
          value={filtroFecha}
          onChange={e => setFiltroFecha(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Destacada</th>
          </tr>
        </thead>
        <tbody>
          {noticiasFiltradas.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No se han agregado noticias</td>
            </tr>
          ) : (
            noticiasFiltradas.map((noticia, index) => (
              <tr key={index}>
                <td>{noticia.titulo}</td>
                <td>{noticia.autor}</td>
                <td>{noticia.fecha}</td>
                <td>{noticia.categoria}</td>
                <td>{noticia.destacado ? "Sí" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaNoticias;

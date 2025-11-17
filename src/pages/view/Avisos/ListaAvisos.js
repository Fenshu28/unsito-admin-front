import React, { useState } from "react";

const ListaAvisos = ({ avisos, eliminarAviso }) => {
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const avisosFiltrados = avisos.filter(aviso => {
    const coincideCategoria = filtroCategoria ? aviso.categoria === filtroCategoria : true;
    const coincideFecha = filtroFecha ? aviso.fecha === filtroFecha : true;
    return coincideCategoria && coincideFecha;
  });

  return (
    <div>
      <h3>Avisos Existentes</h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Filtrar por categoría"
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          placeholder="Filtrar por fecha"
          value={filtroFecha}
          onChange={e => setFiltroFecha(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Prioritario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {avisosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No hay avisos</td>
            </tr>
          ) : (
            avisosFiltrados.map((aviso, index) => (
              <tr key={index}>
                <td>{aviso.titulo}</td>
                <td>{aviso.autor}</td>
                <td>{aviso.fecha}</td>
                <td>{aviso.categoria}</td>
                <td>{aviso.destacado ? "Sí" : "No"}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminarAviso(index)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAvisos;

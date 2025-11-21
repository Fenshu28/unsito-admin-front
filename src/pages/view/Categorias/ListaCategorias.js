import React from "react";

const ListaCategorias = () => {
  return (
    <div>
      <h5 className="fw-semibold mb-3">Categorías existentes</h5>

      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-primary btn-sm me-2">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-primary btn-sm me-2">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-primary btn-sm me-2">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListaCategorias;

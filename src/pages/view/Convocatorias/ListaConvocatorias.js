import React from "react";

const ListaConvocatorias = ({ lista }) => {
  return (
    <table className="table table-striped mt-4 shadow-sm">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Categoría</th>
          <th>Prioritaria</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {lista.map((item, index) => (
          <tr key={index}>
            <td>{item.titulo}</td>
            <td>{item.descripcion}</td>
            <td>{item.fechaInicio}</td>
            <td>{item.fechaFin}</td>
            <td>{item.categoria}</td>

            <td>
              <input type="checkbox" checked={item.destacado} readOnly />
            </td>

            <td className="text-primary">Editar | Eliminar</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaConvocatorias;

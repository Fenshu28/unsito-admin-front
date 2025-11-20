import React from "react";

const ListaEventos = ({ eventos }) => {
  return (
    <div>
      <h3 className="mt-5">Eventos Registrados</h3>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Título</th>
            <th>Organizador</th>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Imagen</th>
          </tr>
        </thead>

        <tbody>
          {eventos.map((evento, index) => (
            <tr key={index}>
              <td>{evento.titulo}</td>
              <td>{evento.organizador}</td>
              <td>{evento.fecha}</td>
              <td>{evento.categoria}</td>
              <td>{evento.descripcion}</td>

              <td>
                {evento.imagen ? (
                  <img
                    src={URL.createObjectURL(evento.imagen)}
                    alt="evento"
                    width="50"
                  />
                ) : (
                  "No hay"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEventos;

import React from "react";

const ListaNoticias = ({ listaNoticias }) => {
  return (
    <div>
      <h3 className="mt-5">Noticias existentes</h3>
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
          {listaNoticias.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No se han agregado noticias</td>
            </tr>
          ) : (
            listaNoticias.map((noticia, index) => (
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

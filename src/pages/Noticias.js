import React, { useState } from "react";
import FormularioNoticia from "./view/Noticias/FormularioNoticias";
import ListaNoticias from "./view/Noticias/ListaNoticias";

const Noticias = () => {
  const [listaNoticias, setListaNoticias] = useState([]);

  const agregarNoticia = (noticia) => {
    setListaNoticias([...listaNoticias, noticia]);
  };

  return (
    <div className="container mt-4">
      <ListaNoticias listaNoticias={listaNoticias} />
      <h2>Administrar Noticias</h2>

      <FormularioNoticia agregarNoticia={agregarNoticia} />
    </div>
  );
};

export default Noticias;

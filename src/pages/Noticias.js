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
      <h2>Administrar Noticias</h2>
      <FormularioNoticia agregarNoticia={agregarNoticia} />
      <ListaNoticias listaNoticias={listaNoticias} />
    </div>
  );
};

export default Noticias;

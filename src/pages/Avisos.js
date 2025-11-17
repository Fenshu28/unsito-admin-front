import React, { useState } from "react";
import FormularioAviso from "./view/Avisos/FormularioAviso";
import ListaAvisos from "./view/Avisos/ListaAvisos";

const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const categorias = ["Académico", "Estudiantil", "Desarrollo", "Bienestar", "General"];

  const agregarAviso = (aviso) => {
    setAvisos([...avisos, aviso]);
  };

  const eliminarAviso = (index) => {
    setAvisos(avisos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h2>Administrar Avisos</h2>
      <FormularioAviso agregarAviso={agregarAviso} categorias={categorias} />
      <ListaAvisos avisos={avisos} eliminarAviso={eliminarAviso} />
    </div>
  );
};

export default Avisos;

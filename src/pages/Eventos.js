import React, { useState } from "react";
import EventoForm from "../pages/view/Eventos/FormularioEventos";
import EventoTabla from "../pages/view/Eventos/ListaEventos";
const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    organizador: "",
    fecha: "",
    categoria: "",
    descripcion: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.fecha) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    setEventos([...eventos, formData]);

    setFormData({
      titulo: "",
      organizador: "",
      fecha: "",
      categoria: "",
      descripcion: "",
      imagen: null,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Evento</h2>

      <EventoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <EventoTabla eventos={eventos} />
    </div>
  );
};

export default Eventos;

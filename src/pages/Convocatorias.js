import React, { useState } from "react";
import ConvocatoriaForm from "../pages/view/Convocatorias/FormularioConvocatorias";
import ConvocatoriaTabla from "../pages/view/Convocatorias/ListaConvocatorias";

const Convocatorias = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    categoria: "",
    enlace: "",
    destacado: false,
    archivo: null,
  });

  const [lista, setLista] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, archivo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const agregarConvocatoria = () => {
    setLista([...lista, formData]);

    setFormData({
      titulo: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      categoria: "",
      enlace: "",
      destacado: false,
      archivo: null,
    });
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Gestionar Convocatorias</h2>

      <ConvocatoriaForm
        formData={formData}
        handleChange={handleChange}
        agregarConvocatoria={agregarConvocatoria}
      />

      <ConvocatoriaTabla lista={lista} />
    </div>
  );
};

export default Convocatorias;

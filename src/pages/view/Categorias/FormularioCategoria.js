import React, { useEffect, useState } from "react";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { Icon } from "@iconify/react";
import { useToast } from "../../../context/ToastContext";

const FormularioCategoria = ({ categoriaActual, onSubmit }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: ""
  });

  useEffect(() => {
    if (categoriaActual) {
      setFormData({
        nombre: categoriaActual.nombre || "",
        descripcion: categoriaActual.descripcion || ""
      });
    }
  }, [categoriaActual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData); // 👈 ya NO manda color
      toast.success("Categoría guardada correctamente");
    } catch {
      toast.error("Error al guardar la categoría");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6">
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <div className="mt-4">
            <TextAreaField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end border-t p-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded bg-primary px-6 py-2 text-white"
          >
            <Icon icon="mdi:content-save" width="18" />
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioCategoria;

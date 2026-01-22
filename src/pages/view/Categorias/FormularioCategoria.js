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
      await onSubmit(formData);
      toast.success("Categoría guardada correctamente");
    } catch {
      toast.error("Error al guardar la categoría");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-xl mx-auto rounded-xl border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {categoriaActual ? "Editar Categoría" : "Nueva Categoría"}
          </h3>
        </div>

        {/* Form Fields */}
        <div className="px-6 py-6 space-y-5">
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <TextAreaField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end px-6 py-4 border-t border-stroke dark:border-strokedark">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-white font-medium shadow-md hover:scale-105 hover:opacity-90 transition-transform"
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

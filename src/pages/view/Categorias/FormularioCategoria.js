import React, { useEffect, useState } from "react";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { Icon } from "@iconify/react";
import { useToast } from "../../../context/ToastContext";

const FormularioCategoria = ({ categoriaActual, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (categoriaActual) {
      const data = {
        nombre: categoriaActual.nombre || "",
        descripcion: categoriaActual.descripcion || "",
      };

      const hasChanged =
        originalData &&
        (originalData.nombre !== data.nombre ||
          originalData.descripcion !== data.descripcion);

      if (!isDirty || hasChanged) {
        setFormData(data);
        setOriginalData(data);
        if (hasChanged) setIsDirty(false);
      }
    }
  }, [categoriaActual, isDirty, originalData]);

  // Advertencia de cambios sin guardar al cerrar pestaña
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleReset = () => {
    if (originalData) setFormData(originalData);
    setIsDirty(false);
    toast.info("Cambios descartados");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await onSubmit(formData);
      setIsDirty(false);
      setOriginalData(formData);
      toast.success("Categoría guardada correctamente");
    } catch {
      toast.error("Error al guardar la categoría");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32 font-sans">
      <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        {/* Post Style Header Simplificado */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <h3 className="font-bold text-gray-900 leading-tight text-lg">
            {formData.nombre || "Nueva Categoría"}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
              Configuración de Categoría
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <TextField
            id="nombre"
            name="nombre"
            label="Nombre de la Categoría"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Noticias, Eventos, Proyectos..."
            required
          />

          <TextAreaField
            id="descripcion"
            name="descripcion"
            label="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción sobre el propósito de esta categoría..."
            rows={5}
          />
        </form>
      </div>

      {/* Floating Action Buttons */}
      {isDirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 font-bold text-white hover:bg-brand-700 transition-all shadow-xl active:scale-95"
          >
            <Icon icon="mdi:content-save" width="20" />
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-xl active:scale-95"
          >
            <Icon icon="mdi:close" width="20" />
            Descartar
          </button>
        </div>
      )}
    </div>
  );
};

export default FormularioCategoria;

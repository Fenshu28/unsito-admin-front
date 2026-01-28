import { useState } from "react";
import { crearAutor } from "../../../services/autoresService";
import { useToast } from "../../../context/ToastContext";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { Icon } from "@iconify/react";

const FormAutor = ({ onSuccess, onCancel }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    biografia: "",
    foto: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "foto") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      setLoading(false);
      return;
    }

    try {
      await crearAutor(formData);
      toast.success("Autor creado correctamente");
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el autor");
      toast.error("Error al crear el autor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-lg">
              <Icon
                icon="mdi:account-plus"
                className="text-brand-600"
                width="24"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">
                Nuevo Autor
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Completa los datos del nuevo autor
              </p>
            </div>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon icon="mdi:close" width="24" />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Preview */}
            <div className="flex flex-col items-center gap-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center block w-full">
                Vista Previa
              </label>
              <div className="w-32 h-32 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center shadow-sm relative overflow-hidden text-brand-600">
                {formData.foto && !imageError ? (
                  <img
                    src={formData.foto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <Icon icon="mdi:account" width="80" />
                )}
              </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  id="nombre"
                  name="nombre"
                  label="Nombre Completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Gabriel García Márquez"
                  required
                />
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="autor@ejemplo.com"
                />
              </div>

              <TextField
                id="foto"
                name="foto"
                label="URL de Foto de Perfil"
                value={formData.foto}
                onChange={handleChange}
                placeholder="https://images.com/perfil.jpg"
              />
            </div>
          </div>

          <TextAreaField
            id="biografia"
            name="biografia"
            label="Biografía / Perfil Profesional"
            value={formData.biografia}
            onChange={handleChange}
            placeholder="Describe brevemente la trayectoria del autor..."
            rows={5}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 rounded-xl bg-brand-600 text-sm font-bold text-white hover:bg-brand-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear Autor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAutor;

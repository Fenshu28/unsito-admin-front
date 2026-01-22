import { useState } from "react";
import { crearAutor } from "../../../services/autoresService";
import { useToast } from "../../../context/ToastContext";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";

const FormAutor = ({ onSuccess }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    biografia: "",
    foto: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      await crearAutor(formData);
      setFormData({
        nombre: "",
        email: "",
        biografia: "",
        foto: "",
      });
      toast.success("Autor creado correctamente");
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el autor");
      toast.error("Error al crear el autor");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Crear Autor
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Error */}
          {error && (
            <div className="mb-4 rounded bg-danger/10 p-3 text-sm text-danger">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div className="mb-4.5">
            <TextField
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del autor"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4.5">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Foto + Preview */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 items-center">
            {/* Input */}
            <div className="md:col-span-2">
              <TextField
                id="foto"
                name="foto"
                label="Foto (URL)"
                value={formData.foto}
                onChange={handleChange}
                placeholder="https://ejemplo.com/foto.jpg"
              />
            </div>

            {/* Preview */}
            <div className="flex justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-stroke bg-gray-50 dark:bg-meta-4">
                {formData.foto ? (
                  <img
                    src={formData.foto}
                    alt="Preview autor"
                    className="h-24 w-24 rounded-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <span className="text-xs text-gray-400 text-center">
                    Sin foto
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Biografía */}
          <div className="mb-6">
            <TextAreaField
              id="biografia"
              name="biografia"
              label="Biografía"
              value={formData.biografia}
              onChange={handleChange}
              placeholder="Biografía del autor"
              rows={5}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded bg-primary px-6 py-2.5 font-medium text-white transition-all hover:bg-opacity-90"
          >
            Crear autor
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAutor;

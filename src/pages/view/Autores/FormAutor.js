import { useState } from "react";
import { Icon } from "@iconify/react";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { crearAutor } from "../../../services/autoresService";
import { useToast } from "../../../context/ToastContext";

const FormAutor = ({ onSuccess }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    biografia: "",
    foto: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      toast.error("El nombre del autor es obligatorio");
      return;
    }

    try {
      setIsSubmitting(true);

      await crearAutor(formData);

      toast.success("Autor creado correctamente");

      setFormData({
        nombre: "",
        email: "",
        biografia: "",
        foto: "",
      });

      onSuccess && onSuccess();
    } catch (error) {
      const msg =
        error.response?.data?.message || "Error al crear el autor";
      toast.error(msg);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center gap-3">
        <Icon
          icon="mdi:account-edit"
          width="26"
          className="text-primary"
        />
        <div>
          <h2 className="text-title-sm font-semibold text-black dark:text-white">
            Autor
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Crear y administrar autores del sistema
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Nombre y Email */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TextField
              id="nombre"
              name="nombre"
              label="Nombre del autor"
              placeholder="Ingrese el nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <TextField
              id="email"
              name="email"
              type="email"
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Biografía */}
          <div className="mb-6">
            <TextAreaField
              id="biografia"
              name="biografia"
              label="Biografía"
              placeholder="Escriba una breve biografía del autor"
              rows={5}
              value={formData.biografia}
              onChange={handleChange}
            />
          </div>

          {/* Foto */}
          <div className="mb-6">
            <TextField
              id="foto"
              name="foto"
              label="Foto (URL)"
              placeholder="https://imagen-del-autor.jpg"
              value={formData.foto}
              onChange={handleChange}
            />
          </div>

          {/* Preview */}
          {formData.foto && (
            <div className="mb-6 flex items-center gap-4">
              <img
                src={formData.foto}
                alt="Preview autor"
                className="h-24 w-24 rounded-full object-cover border border-stroke dark:border-strokedark"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Vista previa de la foto
              </span>
            </div>
          )}

          {/* Botón */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90 transition disabled:opacity-50"
            >
              <Icon icon="mdi:account-plus" width="20" />
              {isSubmitting ? "Guardando..." : "Crear Autor"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAutor;

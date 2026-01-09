import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { crearAutor } from "../../../services/autoresService";

const FormAutor = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    biografia: "",
    foto: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setFormData((prev) => ({
        ...prev,
        foto: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      const data = new FormData();
      data.append("nombre", formData.nombre);
      data.append("email", formData.email);
      data.append("biografia", formData.biografia);
      if (formData.foto) data.append("foto", formData.foto);

      await crearAutor(data);

      setFormData({
        nombre: "",
        email: "",
        biografia: "",
        foto: null,
      });

      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el autor");
    }
  };

  // Limpia el objectURL para evitar memory leaks
  useEffect(() => {
    return () => {
      if (formData.foto) {
        URL.revokeObjectURL(formData.foto);
      }
    };
  }, [formData.foto]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h2 className="text-title-sm font-semibold text-black dark:text-white">
          Autores
        </h2>
        <p className="text-sm text-gray-500">
          Crear y administrar autores del sistema
        </p>
      </div>
  
      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="p-6.5 space-y-6">
          {error && (
            <p className="text-red-600 font-medium">{error}</p>
          )}
  
          {/* Nombre */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
              Nombre del autor
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="h-11 w-full rounded-md border border-stroke px-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-boxdark"
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-11 w-full rounded-md border border-stroke px-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-boxdark"
            />
          </div>
  
          {/* Biografía */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
              Biografía
            </label>
            <textarea
              rows="4"
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-boxdark"
            />
          </div>
  
          {/* Foto del autor */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Foto del autor
            </label>
  
            <div className="flex items-center gap-6">
              {/* Preview */}
              <div className="h-24 w-24 overflow-hidden rounded-full border border-stroke dark:border-strokedark flex items-center justify-center bg-gray-100 dark:bg-meta-4">
                {formData.foto ? (
                  <img
                    src={URL.createObjectURL(formData.foto)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Icon
                    icon="mdi:account"
                    width="40"
                    className="text-gray-400"
                  />
                )}
              </div>
  
              {/* Botón subir */}
              <div>
                <label
                  htmlFor="foto"
                  className="inline-flex cursor-pointer items-center gap-2 rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition"
                >
                  <Icon icon="mdi:camera" width="18" />
                  {formData.foto ? "Cambiar foto" : "Subir foto"}
                </label>
  
                <input
                  id="foto"
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
  
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG o WEBP
                </p>
              </div>
            </div>
          </div>
  
          {/* Botón */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90 transition"
            >
              Crear Autor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  
};

export default FormAutor;

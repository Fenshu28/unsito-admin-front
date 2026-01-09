import { useState } from "react";
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
      setError(
        err.response?.data?.message || "Error al crear el autor"
      );
    }
  };

  return (
    <div className="w-full px-6 py-6">
      {/* Header sección */}
      <div className="mb-6 border-b border-stroke pb-4">
        <h2 className="text-title-sm font-semibold text-gray-800">
          Autores
        </h2>
        <p className="text-sm text-gray-500">
          Crear y administrar autores del sistema
        </p>
      </div>

      {/* Formulario */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-600 font-semibold">{error}</p>
          )}

          {/* Nombre */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Nombre del autor
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="h-11 w-full rounded-md border border-stroke px-4 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-11 w-full rounded-md border border-stroke px-4 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Biografía */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Biografía
            </label>
            <textarea
              rows="4"
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke px-4 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Foto */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Foto del autor
            </label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger fw-semibold"
          >
            Crear Autor
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAutor;

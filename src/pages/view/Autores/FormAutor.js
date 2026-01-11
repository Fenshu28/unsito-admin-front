import { useState } from "react";
import { Icon } from "@iconify/react";
import { crearAutor } from "../../../services/autoresService";

const FormAutor = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    biografia: "",
    foto: "", // 👈 STRING (URL)
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
      await crearAutor({
        nombre: formData.nombre,
        email: formData.email,
        biografia: formData.biografia,
        foto: formData.foto, // 👈 string
      });

      setFormData({
        nombre: "",
        email: "",
        biografia: "",
        foto: "",
      });

      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el autor");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      {/* Header */}
      <div className="border-b py-4 px-6">
        <h2 className="text-title-sm font-semibold">Autores</h2>
        <p className="text-sm text-gray-500">
          Crear y administrar autores del sistema
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {error && <p className="text-red-600">{error}</p>}

          {/* Nombre */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del autor"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          {/* Biografía */}
          <textarea
            name="biografia"
            placeholder="Biografía"
            value={formData.biografia}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          {/* Foto (URL) */}
          <input
            type="text"
            name="foto"
            placeholder="URL de la foto"
            value={formData.foto}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          {/* Preview */}
          {formData.foto && (
            <img
              src={formData.foto}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded"
          >
            Crear Autor
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAutor;

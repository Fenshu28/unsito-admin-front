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

      if (formData.foto) {
        data.append("foto", formData.foto);
      }

      await crearAutor(data);

      setFormData({
        nombre: "",
        email: "",
        biografia: "",
        foto: null,
      });

      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error al crear el autor"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto space-y-4"
    >
      {error && (
        <p className="text-red-600 font-semibold text-center">{error}</p>
      )}

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Nombre del autor"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Biografía</label>
        <textarea
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
          placeholder="Biografía del autor"
        ></textarea>
      </div>

      {/* INPUT DE FOTO FORZADO */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">
          Foto del autor
        </label>
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md transition-colors duration-150"
      >
        Crear Autor
      </button>
    </form>
  );
};

export default FormAutor;

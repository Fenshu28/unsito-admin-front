import { useState } from "react";
import { crearAutor } from "../../../services/autoresService";

const FormularioAutor = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        biografia: "",
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
            console.log("Enviando autor:", formData);
            await crearAutor(formData);
            setFormData({ nombre: "", email: "", biografia: "" });
            onSuccess && onSuccess();
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Error al crear el autor"
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
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Biografía</label>
        <textarea
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
          placeholder="Biografía del autor"
        ></textarea>
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

export default FormularioAutor;

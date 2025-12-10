import { useState } from "react";
import { crearAutor, actualizarAutor } from "../../services/autorService";

const FormularioAutor = ({ autorSeleccionado, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: autorSeleccionado?.nombre || "",
    email: autorSeleccionado?.email || "",
    biografia: autorSeleccionado?.biografia || "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      setLoading(true);

      if (autorSeleccionado) {
        // Editar
        await actualizarAutor(autorSeleccionado.id, formData);
      } else {
        // Crear
        await crearAutor(formData);
      }

      setFormData({ nombre: "", email: "", biografia: "" });
      onSuccess && onSuccess();
    } catch (err) {
      setError("Ocurrió un error al guardar el autor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        {autorSeleccionado ? "Editar autor" : "Nuevo autor"}
      </h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            placeholder="Nombre del autor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Biografía</label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            placeholder="Breve biografía"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : autorSeleccionado
            ? "Actualizar autor"
            : "Crear autor"}
        </button>
      </form>
    </div>
  );
};

export default FormularioAutor;

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
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}

      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Biografía</label>
        <textarea
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Crear autor</button>
    </form>
  );
};

export default FormularioAutor;

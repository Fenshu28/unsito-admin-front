import React, { useState } from "react";
import { crearCategoria } from "../../../services/categoriaService";

const FormularioCategorias = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCrear = async () => {
    if (!nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      return;
    }
    
    try {
      const nuevaCategoria = await crearCategoria({
        nombre,
        descripcion,
      });

      setMensaje("Categoría creada correctamente");

      setNombre("");
      setDescripcion("");

      console.log("Categoría creada:", nuevaCategoria);
    } catch (error) {
      setMensaje("Error al crear la categoría");
    }
  };

  return (
    <div className="p-3 border rounded shadow-sm mb-4">
      <h5 className="fw-semibold mb-3">Formulario de categoría</h5>

      <label className="form-label fw-bold">Nombre de categoría</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="p. ej., Beca de investigación"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label className="form-label fw-bold">Descripción (Opcional)</label>
      <textarea
        className="form-control mb-3"
        rows="3"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>

      <button
        className="btn btn-danger fw-semibold"
        onClick={handleCrear}
      >
        Agregar categoría
      </button>

      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
};

export default FormularioCategorias;

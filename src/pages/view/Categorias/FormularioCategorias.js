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
    <div className="w-full px-6 py-6">

      {/* Header sección */}
      <div className="mb-6 border-b border-stroke pb-4">
        <h2 className="text-title-sm font-semibold text-gray-800">
          Categorías
        </h2>
        <p className="text-sm text-gray-500">
          Crear y administrar categorías del sistema
        </p>
      </div>

      {/* Formulario */}
      <div className="max-w-4xl">
        <div className="space-y-6">

          {/* Nombre */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Nombre de la categoría
            </label>
            <input
              type="text"
              placeholder="Ej. Beca de investigación"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="h-11 w-full rounded-md border border-stroke px-4 text-sm
                focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Descripción (opcional)
            </label>
            <textarea
              rows="4"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-md border border-stroke px-4 py-2 text-sm
                focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <button
            className="btn btn-danger fw-semibold"
            onClick={handleCrear}
          >
            Agregar categoría
          </button>

          {mensaje && <p className="mt-2">{mensaje}</p>}
        </div>
      </div>
    </div>

  );
};

export default FormularioCategorias;

import React, { useState } from "react";
import { Icon } from "@iconify/react";
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
      await crearCategoria({ nombre, descripcion });
      setMensaje("Categoría creada correctamente");
      setNombre("");
      setDescripcion("");
    } catch (error) {
      setMensaje("Error al crear la categoría");
    }
  };

  return (
    <div className="w-full px-6 py-6">
      {/* Card principal */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        {/* Header */}
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h2 className="text-title-sm font-semibold text-black dark:text-white">
            Categorías
          </h2>
          <p className="text-sm text-gray-500">
            Crear y administrar categorías del sistema
          </p>
        </div>

        {/* Formulario */}
        <div className="p-6.5 max-w-4xl">
          <div className="space-y-6">

            {/* Mensaje */}
            {mensaje && (
              <p className={`text-sm font-medium ${
                mensaje.includes("correctamente")
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {mensaje}
              </p>
            )}

            {/* Nombre */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                Nombre de la categoría
              </label>
              <input
                type="text"
                placeholder="Ej. Beca de investigación"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="h-11 w-full rounded-md border border-stroke px-4 text-sm
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  dark:border-strokedark dark:bg-boxdark"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                Descripción
              </label>
              <textarea
                rows="4"
                placeholder="Descripción opcional de la categoría"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full rounded-md border border-stroke px-4 py-2 text-sm
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  dark:border-strokedark dark:bg-boxdark"
              />
            </div>

            {/* Botón */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleCrear}
                className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90 transition"
              >
                <Icon icon="mdi:folder-plus" width="20" />
                Crear categoría
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCategorias;

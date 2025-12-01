import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CarouselImageManager from "./CarouselImageManager";
import { subirArchivo, eliminarArchivo } from "../../../services/publicacionesService";

const FormularioPublicacion = ({ 
  publicacionActual, 
  categorias, 
  tipos, 
  onSubmit,
  onImageUploaded // Callback para recargar datos después de subir imagen
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    fecha: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    isFeatured: false,
    status: "Draft"
  });

  const [originalData, setOriginalData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (publicacionActual) {
      const data = {
        titulo: publicacionActual.titulo || "",
        descripcion: publicacionActual.descripcion || "",
        categoria: publicacionActual.categoria?._id || "",
        tipo: publicacionActual.tipo?._id || "",
        fecha: publicacionActual.fecha ? publicacionActual.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
        isFeatured: publicacionActual.isFeatured || false,
        status: publicacionActual.status || "Draft"
      };
      setFormData(data);
      setOriginalData(data);
      setIsDirty(false);
    } else {
      const data = {
        titulo: "",
        descripcion: "",
        categoria: "",
        tipo: "",
        fecha: new Date().toISOString().split('T')[0],
        isFeatured: false,
        status: "Draft"
      };
      setFormData(data);
      setOriginalData(data);
      setIsDirty(false);
    }
  }, [publicacionActual]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsDirty(false);
    setOriginalData(formData);
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setIsDirty(false);
  };

  // Handlers para imágenes del carrusel (LiveEdit - no activa isDirty)
  const handleImageAdded = async (file) => {
    if (!publicacionActual?._id) {
      throw new Error("Debe guardar la publicación antes de agregar imágenes");
    }

    await subirArchivo(publicacionActual._id, file, "carousel");
    
    // Recargar datos de la publicación
    if (onImageUploaded) {
      await onImageUploaded();
    }
  };

  const handleImageRemoved = async (imageId) => {
    if (!publicacionActual?._id) return;

    await eliminarArchivo(publicacionActual._id, imageId, "carousel");
    
    // Recargar datos de la publicación
    if (onImageUploaded) {
      await onImageUploaded();
    }
  };

  const getStatusColor = (status) => {
    return status === "Published" 
      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800"
      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
  };

  const getStatusIcon = (status) => {
    return status === "Published" 
      ? "mdi:check-circle"
      : "mdi:pencil-circle";
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-end">
        {/* Status selector in header */}
        <div className="relative">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`appearance-none rounded-full px-4 py-2 pr-10 text-sm font-medium border cursor-pointer transition-colors ${getStatusColor(formData.status)}`}
          >
            <option value="Draft">Borrador</option>
            <option value="Published">Publicado</option>
          </select>
          <Icon 
            icon={getStatusIcon(formData.status)} 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="18"
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Título y Tipo en la misma fila */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-2/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Título <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ingrese el título de la publicación"
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Tipo
              </label>
              <div className="relative">
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Seleccione un tipo</option>
                  {tipos.map((tipo) => (
                    <option key={tipo._id} value={tipo._id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <Icon icon="mdi:chevron-down" width="20" />
                </span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={6}
              placeholder="Ingrese la descripción de la publicación"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          {/* Categoría */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Categoría
            </label>
            <div className="relative">
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <Icon icon="mdi:chevron-down" width="20" />
              </span>
            </div>
          </div>

          {/* Destacado */}
          <div className="mb-6">
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border ${formData.isFeatured ? 'border-primary bg-gray dark:bg-transparent' : 'border-body'}`}>
                  <span className={`text-primary ${formData.isFeatured ? 'opacity-100' : 'opacity-0'}`}>
                    <Icon icon="mdi:check" width="14" />
                  </span>
                </div>
              </div>
              <p className="text-black dark:text-white">Publicación destacada</p>
            </label>
          </div>

          {/* Carrusel de Imágenes */}
          {publicacionActual && (
            <div className="mb-6">
              <CarouselImageManager
                publicacionId={publicacionActual._id}
                images={publicacionActual.carousel || []}
                onImageAdded={handleImageAdded}
                onImageRemoved={handleImageRemoved}
                isDraft={formData.status === "Draft"}
                maxImages={5}
              />
            </div>
          )}

          {/* Botones - Solo aparecen cuando hay cambios */}
          {isDirty && (
            <div className="flex gap-4 border-t border-stroke pt-6 dark:border-strokedark">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90 transition-all"
              >
                <Icon icon="mdi:content-save" width="20" />
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded border border-stroke px-6 py-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition-all"
              >
                <Icon icon="mdi:close" width="20" />
                Cancelar
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioPublicacion;

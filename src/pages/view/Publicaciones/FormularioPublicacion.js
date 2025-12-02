import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CarouselImageManager from "./CarouselImageManager";
import ConfirmModal from "../../../components/ConfirmModal";
import { subirArchivo, eliminarArchivo } from "../../../services/publicacionesService";
import { useToast } from "../../../context/ToastContext";

const FormularioPublicacion = ({ 
  publicacionActual, 
  categorias, 
  tipos, 
  onSubmit,
  onImageUploaded,
  onStatusChanged // Nuevo callback para cambio de status LiveEdit
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    fecha: new Date().toISOString().split('T')[0],
    isFeatured: false,
    status: "Draft"
  });

  const [originalData, setOriginalData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  
  const toast = useToast();

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
    
    // Solo marcar como dirty si NO es el status (status es LiveEdit)
    if (name !== 'status') {
      setIsDirty(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Filtrar campos vacíos para evitar errores de ObjectId
      const cleanData = { ...formData };
      
      // Remover categoria y tipo si están vacíos
      if (!cleanData.categoria || cleanData.categoria === "") {
        delete cleanData.categoria;
      }
      if (!cleanData.tipo || cleanData.tipo === "") {
        delete cleanData.tipo;
      }
      
      await onSubmit(cleanData);
      // Solo resetear isDirty si fue exitoso
      setIsDirty(false);
      setOriginalData(cleanData);
      toast.success('Publicación guardada correctamente');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al guardar la publicación';
      toast.error(errorMessage);
      console.error(error);
      // NO resetear isDirty - mantener botón guardar visible
    }
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setIsDirty(false);
    toast.info('Cambios descartados');
  };

  // Handler para cambio de status (LiveEdit con confirmación)
  const handleStatusClick = (newStatus) => {
    if (newStatus === formData.status) {
      setShowStatusDropdown(false);
      return;
    }
    
    setPendingStatus(newStatus);
    setShowConfirmModal(true);
    setShowStatusDropdown(false);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus || !publicacionActual?._id) return;

    try {
      // Actualizar status inmediatamente (LiveEdit)
      await onStatusChanged({ status: pendingStatus });
      
      // Actualizar estado local
      setFormData(prev => ({ ...prev, status: pendingStatus }));
      setOriginalData(prev => ({ ...prev, status: pendingStatus }));
      
      toast.success(`Estado cambiado a ${pendingStatus === "Published" ? "Publicado" : "Borrador"}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al cambiar el estado';
      toast.error(errorMessage);
      console.error('Error changing status:', error);
    }
  };

  // Handlers para imágenes del carrusel (LiveEdit - no activa isDirty)
  const handleImageAdded = async (file) => {
    if (!publicacionActual?._id) {
      toast.error("Debe guardar la publicación antes de agregar imágenes");
      throw new Error("Debe guardar la publicación antes de agregar imágenes");
    }

    try {
      await subirArchivo(publicacionActual._id, file, "carousel");
      
      if (onImageUploaded) {
        await onImageUploaded();
      }
      
      toast.success('Imagen agregada al carrusel');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al subir la imagen';
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleImageRemoved = async (imageId) => {
    if (!publicacionActual?._id) return;

    try {
      await eliminarArchivo(publicacionActual._id, imageId, "carousel");
      
      if (onImageUploaded) {
        await onImageUploaded();
      }
      
      toast.success('Imagen eliminada del carrusel');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al eliminar la imagen';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getStatusConfig = (status) => {
    return status === "Published" 
      ? {
          label: "Publicado",
          icon: "svg-spinners:pulse-2",
          color: "text-green-800 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/20"
        }
      : {
          label: "Borrador",
          icon: "mdi:pencil-circle",
          color: "text-yellow-800 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
        };
  };

  const currentStatusConfig = getStatusConfig(formData.status);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-end">
          {/* Status dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${currentStatusConfig.color} ${currentStatusConfig.bgColor} hover:opacity-80`}
            >
              <Icon icon={currentStatusConfig.icon} width="18" />
              {currentStatusConfig.label}
              <Icon icon="mdi:chevron-down" width="16" />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark z-10">
                <button
                  type="button"
                  onClick={() => handleStatusClick("Draft")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-meta-4 first:rounded-t-lg ${
                    formData.status === "Draft" ? "bg-gray-50 dark:bg-meta-4" : ""
                  }`}
                >
                  <Icon icon="mdi:pencil-circle" width="20" className="text-yellow-600" />
                  <span className="text-yellow-800 dark:text-yellow-400">Borrador</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusClick("Published")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-meta-4 last:rounded-b-lg ${
                    formData.status === "Published" ? "bg-gray-50 dark:bg-meta-4" : ""
                  }`}
                >
                  <Icon icon="mdi:check-circle" width="20" className="text-green-600" />
                  <span className="text-green-800 dark:text-green-400">Publicado</span>
                </button>
              </div>
            )}
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

            {/* Categoría y Destacado en la misma fila */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row xl:items-end">
              <div className="w-full xl:w-2/3">
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
              <div className="w-full xl:w-1/3">
                <label className="flex cursor-pointer select-none items-center justify-center rounded border border-stroke bg-gray-2 py-3 px-5 dark:border-strokedark dark:bg-meta-4 hover:bg-opacity-80 transition-colors">
                  <div className="relative mr-3">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`box flex h-5 w-5 items-center justify-center rounded border ${formData.isFeatured ? 'border-primary bg-primary' : 'border-body'}`}>
                      <span className={`text-white ${formData.isFeatured ? 'opacity-100' : 'opacity-0'}`}>
                        <Icon icon="mdi:check" width="14" />
                      </span>
                    </div>
                  </div>
                  <p className="text-black dark:text-white font-medium">Destacada</p>
                </label>
              </div>
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

      {/* Confirmation Modal for Status Change */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setPendingStatus(null);
        }}
        onConfirm={confirmStatusChange}
        title="Cambiar Estado"
        message={`¿Está seguro de cambiar el estado a "${pendingStatus === "Published" ? "Publicado" : "Borrador"}"?`}
        confirmText="Cambiar"
        cancelText="Cancelar"
        type={pendingStatus === "Published" ? "success" : "warning"}
      />
    </>
  );
};

export default FormularioPublicacion;

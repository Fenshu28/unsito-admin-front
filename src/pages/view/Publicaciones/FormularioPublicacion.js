import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CarouselImageManager from "./CarouselImageManager";
import LinksManager from "./LinksManager";
import AttachmentsManager from "./AttachmentsManager";
import ConfirmModal from "../../../components/ConfirmModal";
import Switch from "../../../components/Switch";
import DatePicker from "../../../components/DatePicker";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import SelectField from "../../../components/SelectField";
import { subirArchivo, eliminarArchivo } from "../../../services/publicacionesService";
import { useToast } from "../../../context/ToastContext";

const FormularioPublicacion = ({ 
  publicacionActual, 
  categorias, 
  tipos, 
  onSubmit,
  onImageUploaded,
  onStatusChanged
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    fecha: new Date().toISOString().split('T')[0],
    isFeatured: false,
    status: "Draft",
    linksExternos: [],
    autor: ""
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
        status: publicacionActual.status || "Draft",
        linksExternos: publicacionActual.linksExternos || [],
        autor: publicacionActual.autor?._id || ""
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
        status: "Draft",
        linksExternos: [],
        autor: ""
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
      if (!cleanData.autor || cleanData.autor === "") {
        delete cleanData.autor;
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

  // Handlers para archivos adjuntos (LiveEdit)
  const handleAttachmentAdded = async (file) => {
    if (!publicacionActual?._id) {
      toast.error("Debe guardar la publicación antes de agregar archivos");
      throw new Error("Debe guardar la publicación antes de agregar archivos");
    }

    try {
      await subirArchivo(publicacionActual._id, file, "adjuntos");
      
      if (onImageUploaded) {
        await onImageUploaded();
      }
      
      toast.success('Archivo agregado correctamente');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al subir el archivo';
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleAttachmentRemoved = async (attachmentId) => {
    if (!publicacionActual?._id) return;

    try {
      await eliminarArchivo(publicacionActual._id, attachmentId, "adjuntos");
      
      if (onImageUploaded) {
        await onImageUploaded();
      }
      
      toast.success('Archivo eliminado correctamente');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al eliminar el archivo';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Handler para linksExternos (se guardan con el formulario, no LiveEdit)
  const handleLinksChange = (newLinks) => {
    setFormData(prev => ({ ...prev, linksExternos: newLinks }));
    setIsDirty(true);
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
  const isPublished = formData.status === "Published";

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Header with Featured Switch and Status */}
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
          {/* Featured Switch */}
          <Switch
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => handleChange({ target: { name: 'isFeatured', type: 'checkbox', checked: e.target.checked } })}
            disabled={isPublished}
            label="Destacada"
          />

          {/* Separator */}
          <div className="h-8 w-px bg-stroke dark:bg-strokedark mx-4"></div>

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
                  onClick={() => handleStatusClick("Published")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-meta-4 first:rounded-t-lg ${
                    formData.status === "Published" ? "bg-gray-50 dark:bg-meta-4" : ""
                  }`}
                >
                  <Icon icon="svg-spinners:pulse-2" width="20" className="text-green-600" />
                  <span className="text-green-800 dark:text-green-400">Publicado</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusClick("Draft")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-meta-4 last:rounded-b-lg ${
                    formData.status === "Draft" ? "bg-gray-50 dark:bg-meta-4" : ""
                  }`}
                >
                  <Icon icon="mdi:pencil-circle" width="20" className="text-yellow-600" />
                  <span className="text-yellow-800 dark:text-yellow-400">Borrador</span>
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
                <TextField
                  id="titulo"
                  name="titulo"
                  label="Título"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ingrese el título de la publicación"
                  required
                  disabled={isPublished}
                />
              </div>

              <div className="w-full xl:w-1/3">
                <SelectField
                  id="tipo"
                  name="tipo"
                  label="Tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  options={tipos}
                  placeholder="Seleccione un tipo"
                  disabled={isPublished}
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-4.5">
              <TextAreaField
                id="descripcion"
                name="descripcion"
                label="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingrese la descripción de la publicación"
                disabled={isPublished}
                rows={6}
              />
            </div>

            {/* Categoría, Autor y Fecha en la misma fila - 3 columnas */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div>
                <SelectField
                  id="categoria"
                  name="categoria"
                  label="Categoría"
                  value={formData.categoria}
                  onChange={handleChange}
                  options={categorias}
                  placeholder="Seleccione una categoría"
                  disabled={isPublished}
                />
              </div>

              {/* Autor - Placeholder, no integrado con API */}
              <div>
                <SelectField
                  id="autor"
                  name="autor"
                  label="Autor"
                  value={formData.autor}
                  onChange={handleChange}
                  options={[]} // TODO: Integrar con API de autores
                  placeholder="Seleccione un autor"
                  disabled={isPublished}
                />
              </div>

              {/* Fecha de Publicación */}
              <div>
                <DatePicker
                  id="fecha"
                  label="Fecha de Publicación"
                  value={formData.fecha}
                  onChange={(e) => handleChange({ target: { name: 'fecha', value: e.target.value } })}
                  disabled={isPublished}
                  required
                />
              </div>
            </div>

            {/* Carrusel, Enlaces y Archivos en la misma fila - 3 columnas */}
            {publicacionActual && (
              <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Carrusel de Imágenes */}
                <div>
                  <CarouselImageManager
                    publicacionId={publicacionActual._id}
                    images={publicacionActual.carousel || []}
                    onImageAdded={handleImageAdded}
                    onImageRemoved={handleImageRemoved}
                    isDraft={!isPublished}
                    maxImages={5}
                  />
                </div>

                {/* Enlaces */}
                <div>
                  <LinksManager
                    links={formData.linksExternos}
                    onLinksChange={handleLinksChange}
                    isDraft={!isPublished}
                  />
                </div>

                <div>
                  <AttachmentsManager
                    publicacionId={publicacionActual._id}
                    attachments={publicacionActual.adjuntos || []}
                    onAttachmentAdded={handleAttachmentAdded}
                    onAttachmentRemoved={handleAttachmentRemoved}
                    isDraft={!isPublished}
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Botones flotantes centrados en el bottom */}
        {isDirty && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4 bg-white/80 dark:bg-boxdark/80 backdrop-blur-sm border-t border-stroke dark:border-strokedark">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 rounded bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90 transition-all shadow-lg"
              >
                <Icon icon="mdi:content-save" width="20" />
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded border border-stroke px-8 py-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition-all bg-white dark:bg-boxdark"
              >
                <Icon icon="mdi:close" width="20" />
                Cancelar
              </button>
            </div>
          </div>
        )}
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

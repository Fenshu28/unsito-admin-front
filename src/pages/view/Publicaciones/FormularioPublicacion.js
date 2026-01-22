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
import {
  subirArchivo,
  eliminarArchivo,
} from "../../../services/publicacionesService";
import { useToast } from "../../../context/ToastContext";

const FormularioPublicacion = ({
  publicacionActual,
  categorias,
  tipos,
  onSubmit,
  onImageUploaded,
  onStatusChanged,
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    fecha: new Date().toISOString().split("T")[0],
    isFeatured: false,
    status: "Draft",
    linksExternos: [],
    autor: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toast = useToast();

  useEffect(() => {
    if (publicacionActual) {
      const data = {
        titulo: publicacionActual.titulo || "",
        descripcion: publicacionActual.descripcion || "",
        categoria: publicacionActual.categoria?._id || "",
        tipo: publicacionActual.tipo?._id || "",
        fecha: publicacionActual.fecha
          ? publicacionActual.fecha.split("T")[0]
          : new Date().toISOString().split("T")[0],
        isFeatured: publicacionActual.isFeatured || false,
        status: publicacionActual.status || "Draft",
        linksExternos: publicacionActual.linksExternos || [],
        autor: publicacionActual.autor?._id || "",
      };
      setFormData(data);
      setOriginalData(data);
      setIsDirty(false);
    }
  }, [publicacionActual]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name !== "status") {
      setIsDirty(true);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const cleanData = { ...formData };
      if (!cleanData.categoria || cleanData.categoria === "")
        delete cleanData.categoria;
      if (!cleanData.tipo || cleanData.tipo === "") delete cleanData.tipo;
      if (!cleanData.autor || cleanData.autor === "") delete cleanData.autor;

      await onSubmit(cleanData);
      setIsDirty(false);
      setOriginalData(cleanData);
      toast.success("Publicación guardada correctamente");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al guardar la publicación";
      toast.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (originalData) setFormData(originalData);
    setIsDirty(false);
    toast.info("Cambios descartados");
  };

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
      await onStatusChanged({ status: pendingStatus });
      setFormData((prev) => ({ ...prev, status: pendingStatus }));
      setOriginalData((prev) => ({ ...prev, status: pendingStatus }));
      toast.success(
        `Estado cambiado a ${pendingStatus === "Published" ? "Publicado" : "Borrador"}`,
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al cambiar el estado";
      toast.error(errorMessage);
    }
  };

  // Handlers para managers (LiveEdit)
  const handleImageAdded = async (file) => {
    await subirArchivo(publicacionActual._id, file, "carousel");
    if (onImageUploaded) await onImageUploaded();
  };

  const handleImageRemoved = async (imageId) => {
    await eliminarArchivo(publicacionActual._id, imageId, "carousel");
    if (onImageUploaded) await onImageUploaded();
  };

  const handleAttachmentAdded = async (file) => {
    await subirArchivo(publicacionActual._id, file, "adjuntos");
    if (onImageUploaded) await onImageUploaded();
  };

  const handleAttachmentRemoved = async (attachmentId) => {
    await eliminarArchivo(publicacionActual._id, attachmentId, "adjuntos");
    if (onImageUploaded) await onImageUploaded();
  };

  const handleLinksChange = (newLinks) => {
    setFormData((prev) => ({ ...prev, linksExternos: newLinks }));
    setIsDirty(true);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const isPublished = formData.status === "Published";

  return (
    <div className="space-y-6 font-sans pb-24">
      {/* Card Principal: Configuración y Datos Generales */}
      <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        {/* Header: Featured & Status */}
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "isFeatured",
                    type: "checkbox",
                    checked: e.target.checked,
                  },
                })
              }
              disabled={isPublished}
              label="Destacada"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-sm ${
                isPublished
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-orange-100 text-orange-700 border border-orange-200"
              }`}
            >
              <Icon
                icon={isPublished ? "mdi:check-circle" : "mdi:pencil-circle"}
                width="16"
              />
              {isPublished ? "PUBLICADO" : "BORRADOR"}
              <Icon icon="mdi:chevron-down" width="16" />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg z-20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleStatusClick("Published")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors"
                >
                  <Icon
                    icon="mdi:check-circle"
                    className="text-green-600"
                    width="18"
                  />
                  <span className="font-medium text-gray-700">Publicado</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusClick("Draft")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <Icon
                    icon="mdi:pencil-circle"
                    className="text-orange-600"
                    width="18"
                  />
                  <span className="font-medium text-gray-700">Borrador</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <TextField
                  id="titulo"
                  name="titulo"
                  label="Título"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ingrese el título"
                  required
                  disabled={isPublished}
                />
              </div>

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

              <DatePicker
                id="fecha"
                label="Fecha de Publicación"
                value={formData.fecha}
                onChange={(e) =>
                  handleChange({
                    target: { name: "fecha", value: e.target.value },
                  })
                }
                disabled={isPublished}
                required
              />

              <SelectField
                id="autor"
                name="autor"
                label="Autor"
                value={formData.autor}
                onChange={handleChange}
                options={[]}
                placeholder="Seleccione un autor"
                disabled={isPublished}
              />
            </div>

            <TextAreaField
              id="descripcion"
              name="descripcion"
              label="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ingrese la descripción"
              disabled={isPublished}
              rows={5}
            />
          </form>
        </div>
      </div>

      {/* Accordion: Carrusel, Enlaces, Archivos */}
      {publicacionActual && (
        <div className="space-y-3">
          {/* Carrusel */}
          <AccordionItem
            title="Carrusel de Imágenes"
            icon="mdi:image-multiple"
            isOpen={activeAccordion === 0}
            onToggle={() => toggleAccordion(0)}
            count={publicacionActual.carousel?.length}
          >
            <CarouselImageManager
              publicacionId={publicacionActual._id}
              images={publicacionActual.carousel || []}
              onImageAdded={handleImageAdded}
              onImageRemoved={handleImageRemoved}
              isDraft={!isPublished}
              maxImages={5}
            />
          </AccordionItem>

          {/* Enlaces */}
          <AccordionItem
            title="Enlaces Externos"
            icon="mdi:link-variant"
            isOpen={activeAccordion === 1}
            onToggle={() => toggleAccordion(1)}
            count={formData.linksExternos?.length}
          >
            <LinksManager
              links={formData.linksExternos}
              onLinksChange={handleLinksChange}
              isDraft={!isPublished}
            />
          </AccordionItem>

          {/* Archivos */}
          <AccordionItem
            title="Archivos Adjuntos"
            icon="mdi:file-document-multiple"
            isOpen={activeAccordion === 2}
            onToggle={() => toggleAccordion(2)}
            count={publicacionActual.adjuntos?.length}
          >
            <AttachmentsManager
              publicacionId={publicacionActual._id}
              attachments={publicacionActual.adjuntos || []}
              onAttachmentAdded={handleAttachmentAdded}
              onAttachmentRemoved={handleAttachmentRemoved}
              isDraft={!isPublished}
            />
          </AccordionItem>
        </div>
      )}

      {/* Floating Action Buttons */}
      {isDirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 font-bold text-white hover:bg-brand-700 transition-all shadow-xl"
          >
            <Icon icon="mdi:content-save" width="20" />
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-xl"
          >
            <Icon icon="mdi:close" width="20" />
            Descartar
          </button>
        </div>
      )}

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
    </div>
  );
};

const AccordionItem = ({ title, icon, isOpen, onToggle, count, children }) => {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden transition-all">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600">
            <Icon icon={icon} width="20" />
          </div>
          <span className="font-bold text-gray-800">{title}</span>
          {count > 0 && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold">
              {count}
            </span>
          )}
        </div>
        <Icon
          icon="mdi:chevron-down"
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          width="24"
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] border-t border-gray-100" : "max-h-0 overflow-hidden"}`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default FormularioPublicacion;

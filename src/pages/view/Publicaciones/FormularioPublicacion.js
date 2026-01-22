import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CarouselImageManager from "./CarouselImageManager";
import LinksManager from "./LinksManager";
import AttachmentsManager from "./AttachmentsManager";
import ConfirmModal from "../../../components/ConfirmModal";
import Switch from "../../../components/Switch";
import DatePicker from "../../../components/DatePicker";
import TextField from "../../../components/TextField";
import SelectField from "../../../components/SelectField";
import MarkdownEditor from "../../../components/MarkdownEditor";
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

      const hasChanged =
        originalData &&
        (originalData.titulo !== data.titulo ||
          originalData.descripcion !== data.descripcion ||
          originalData.categoria !== data.categoria ||
          originalData.tipo !== data.tipo ||
          originalData.fecha !== data.fecha ||
          originalData.isFeatured !== data.isFeatured ||
          originalData.status !== data.status ||
          JSON.stringify(originalData.linksExternos) !==
            JSON.stringify(data.linksExternos) ||
          originalData.autor !== data.autor);

      if (!isDirty || hasChanged) {
        setFormData(data);
        setOriginalData(data);
        if (hasChanged) setIsDirty(false);
      }
    }
  }, [publicacionActual, isDirty, originalData]);

  // Advertencia de cambios sin guardar al cerrar pestaña
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const cleanData = { ...formData };
      if (!cleanData.categoria) delete cleanData.categoria;
      if (!cleanData.tipo) delete cleanData.tipo;
      if (!cleanData.autor) delete cleanData.autor;

      await onSubmit(cleanData);
      setIsDirty(false);
      setOriginalData(cleanData);
      toast.success("Publicación guardada correctamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar");
    }
  };

  const handleReset = () => {
    if (originalData) setFormData(originalData);
    setIsDirty(false);
    toast.info("Cambios descartados");
  };

  // LiveEdit handlers
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

  const isPublished = formData.status === "Published";

  return (
    <div className="flex flex-col lg:flex-row gap-6 font-sans pb-32">
      {/* Columna Principal: El "Post" */}
      <div className="flex-1 space-y-6">
        <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
          {/* Facebook Style Header */}
          <div className="p-6 flex items-center gap-4 border-b border-gray-100 bg-gray-50/30">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shadow-sm border border-brand-100">
              <Icon icon="mdi:pencil-box-multiple" width="28" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight text-lg">
                {formData.titulo || "Nueva Publicación"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                  {publicacionActual?.autor?.nombre || "Autor Desconocido"}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                  <Icon icon="mdi:calendar" width="12" />
                  {formData.fecha}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-[10px] font-bold text-brand-600 flex items-center gap-1">
                  <Icon icon="mdi:earth" width="12" />
                  {isPublished ? "PÚBLICO" : "PRIVADO (BORRADOR)"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <TextField
                id="titulo"
                name="titulo"
                label="Título de la Publicación"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="¿Sobre qué quieres escribir hoy?"
                required
                disabled={isPublished}
              />

              <MarkdownEditor
                label="Contenido"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Escribe el cuerpo de tu publicación aquí..."
                disabled={isPublished}
                required
              />
            </div>

            {/* Carousel integrado como "Media" del post */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Icon icon="mdi:image-multiple" width="20" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      Galería de Imágenes
                    </h4>
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                      Carrusel de la publicación
                    </p>
                  </div>
                </div>
              </div>

              <CarouselImageManager
                publicacionId={publicacionActual._id}
                images={publicacionActual.carousel || []}
                onImageAdded={handleImageAdded}
                onImageRemoved={handleImageRemoved}
                isDraft={!isPublished}
                maxImages={5}
              />
            </div>
          </div>
        </div>

        {/* Accordions para Enlaces y Archivos al final del contenido */}
        <div className="space-y-3">
          <AccordionItem
            title="Enlaces Externos"
            icon="mdi:link-variant"
            isOpen={activeAccordion === 1}
            onToggle={() =>
              setActiveAccordion(activeAccordion === 1 ? null : 1)
            }
            count={formData.linksExternos?.length}
          >
            <LinksManager
              links={formData.linksExternos}
              onLinksChange={handleLinksChange}
              isDraft={!isPublished}
            />
          </AccordionItem>

          <AccordionItem
            title="Archivos Adjuntos"
            icon="mdi:file-document-multiple"
            isOpen={activeAccordion === 2}
            onToggle={() =>
              setActiveAccordion(activeAccordion === 2 ? null : 2)
            }
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
      </div>

      {/* Columna Lateral: Configuración */}
      <div className="lg:w-80 space-y-6">
        <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden sticky top-24">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Configuración
            </h4>
          </div>
          <div className="p-4 space-y-5">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
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
                label="Destacar Publicación"
              />
              <p className="text-[10px] text-gray-500 leading-tight italic">
                Aparecerá en las secciones más visibles de la plataforma.
              </p>
            </div>

            <div className="relative">
              <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider">
                Estado
              </label>
              <button
                type="button"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-2 text-sm font-bold transition-all shadow-sm ${
                  isPublished
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-orange-100 text-orange-700 border border-orange-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    icon={
                      isPublished ? "mdi:check-circle" : "mdi:pencil-circle"
                    }
                    width="18"
                  />
                  {isPublished ? "PUBLICADO" : "BORRADOR"}
                </div>
                <Icon icon="mdi:chevron-down" width="16" />
              </button>

              {showStatusDropdown && (
                <div className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-xl z-20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleStatusClick("Published")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    <Icon
                      icon="mdi:check-circle"
                      className="text-green-600"
                      width="18"
                    />
                    <span className="font-bold text-gray-700">Publicar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusClick("Draft")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-50 border-t border-gray-100"
                  >
                    <Icon
                      icon="mdi:pencil-circle"
                      className="text-orange-600"
                      width="18"
                    />
                    <span className="font-bold text-gray-700">Borrador</span>
                  </button>
                </div>
              )}
            </div>

            <SelectField
              id="categoria"
              name="categoria"
              label="Categoría"
              value={formData.categoria}
              onChange={handleChange}
              options={categorias}
              placeholder="Seleccione"
              disabled={isPublished}
            />

            <SelectField
              id="tipo"
              name="tipo"
              label="Tipo"
              value={formData.tipo}
              onChange={handleChange}
              options={tipos}
              placeholder="Seleccione"
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
              placeholder="Seleccione"
              disabled={isPublished}
            />
          </div>
        </div>
      </div>

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
        confirmText="Confirmar"
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

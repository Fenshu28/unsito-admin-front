import React, { useEffect, useState } from "react";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { Icon } from "@iconify/react";
import { useToast } from "../../../context/ToastContext";
import ConfirmModal from "../../../components/ConfirmModal";

const FormularioCategoria = ({ categoriaActual, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    status: "Active",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Sincronizar solo si cambia el ID o si no tenemos datos originales aún
    if (categoriaActual) {
      const data = {
        nombre: categoriaActual.nombre || "",
        descripcion: categoriaActual.descripcion || "",
        status: categoriaActual.status || "Active",
      };

      // Si el ID cambió o no hay datos cargados, reseteamos todo
      if (!originalData || categoriaActual._id !== originalData._id) {
        setFormData(data);
        setOriginalData({ ...data, _id: categoriaActual._id });
        setIsDirty(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaActual]); // Dependencia simplificada para evitar loops

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
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
    if (!pendingStatus || !categoriaActual?._id) return;
    try {
      await onSubmit({ ...formData, status: pendingStatus });
      setFormData((prev) => ({ ...prev, status: pendingStatus }));
      setOriginalData((prev) => ({ ...prev, status: pendingStatus }));
      toast.success(
        `Estado cambiado a ${pendingStatus === "Active" ? "Activo" : "Borrador"}`,
      );
    } catch (error) {
      toast.error("Error al cambiar el estado");
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await onSubmit(formData);
      setIsDirty(false);
      setOriginalData({ ...formData, _id: categoriaActual?._id });
      toast.success("Categoría guardada correctamente");
    } catch {
      toast.error("Error al guardar la categoría");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32 font-sans">
      <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        {/* Post Style Header Simplificado */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <h3 className="font-bold text-gray-900 leading-tight text-lg">
            {formData.nombre || "Nueva Categoría"}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
              Configuración de Categoría
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Switcher - Dropdown Style */}
          <div className="relative">
            <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider">
              Estado de la Categoría
            </label>
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className={`w-full max-w-xs flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all shadow-sm ${
                formData.status === "Active"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-orange-100 text-orange-700 border border-orange-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon={
                    formData.status === "Active"
                      ? "mdi:check-circle"
                      : "mdi:pencil-circle"
                  }
                  width="18"
                />
                {formData.status === "Active" ? "ACTIVO" : "BORRADOR"}
              </div>
              <Icon icon="mdi:chevron-down" width="16" />
            </button>

            {showStatusDropdown && (
              <div className="absolute left-0 mt-2 w-full max-w-xs rounded-xl border border-gray-200 bg-white shadow-xl z-20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleStatusClick("Active")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                >
                  <Icon
                    icon="mdi:check-circle"
                    className="text-green-600"
                    width="18"
                  />
                  <span className="font-bold text-gray-700">Activo</span>
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

          <TextField
            id="nombre"
            name="nombre"
            label="Nombre de la Categoría"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Noticias, Eventos, Proyectos..."
            required
          />

          <TextAreaField
            id="descripcion"
            name="descripcion"
            label="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción sobre el propósito de esta categoría..."
            rows={5}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setPendingStatus(null);
        }}
        onConfirm={confirmStatusChange}
        title="Cambiar Estado"
        message={`¿Está seguro de cambiar el estado a "${pendingStatus === "Active" ? "Activo" : "Borrador"}"?`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        type={pendingStatus === "Active" ? "success" : "warning"}
      />

      {/* Floating Action Buttons */}
      {isDirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 font-bold text-white hover:bg-brand-700 transition-all shadow-xl active:scale-95"
          >
            <Icon icon="mdi:content-save" width="20" />
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-xl active:scale-95"
          >
            <Icon icon="mdi:close" width="20" />
            Descartar
          </button>
        </div>
      )}
    </div>
  );
};

export default FormularioCategoria;

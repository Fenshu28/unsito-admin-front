import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  obtenerAutorPorId,
  actualizarAutor,
} from "../../../services/autoresService";
import { useToast } from "../../../context/ToastContext";
import { Icon } from "@iconify/react";
import ConfirmModal from "../../../components/ConfirmModal";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";

const EditarAutor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    biografia: "",
    foto: "",
    status: "Active",
  });

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerAutorPorId(id);
      setAutor(data);
      setFormData({
        nombre: data.nombre || "",
        email: data.email || "",
        biografia: data.biografia || "",
        foto: data.foto || "",
        status: data.status || "Active",
      });
      setIsDirty(false);
    } catch (err) {
      setError(
        "Error al cargar el autor: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleActualizar = async () => {
    setLoading(true);
    try {
      await actualizarAutor(id, formData);
      toast.success("Autor actualizado correctamente");
      setIsDirty(false);
      await cargarDatos();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await actualizarAutor(id, { ...formData, status: newStatus });
      toast.success(
        `Estado cambiado a ${newStatus === "Active" ? "Activo" : "Papelera"}`,
      );
      await cargarDatos();
    } catch (err) {
      toast.error("Error al cambiar el estado");
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
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

  const handleDelete = async () => {
    setLoading(true);
    try {
      await actualizarAutor(id, { status: "Trash" });
      toast.success("Autor movido a la papelera");
      navigate("/App/autores");
    } catch (err) {
      toast.error("Error al eliminar el autor");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading && !autor) {
    return (
      <div className="p-4 md:p-6 font-sans">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto rounded-2xl border border-gray-300 bg-white p-6 shadow-sm animate-pulse space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gray-100"></div>
            <div className="h-6 bg-gray-100 rounded w-48"></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-10 bg-gray-100 rounded-lg"></div>
            <div className="h-10 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-32 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 font-sans pb-32">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/App/autores")}
          className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="mr-2" width="20" />
          Volver a Autores
        </button>

        {formData.status === "Trash" ? (
          <button
            onClick={() => handleStatusChange("Active")}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
          >
            <Icon icon="mdi:restore" width="18" />
            Restaurar
          </button>
        ) : (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            <Icon icon="mdi:delete" width="18" />
            Eliminar
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/30">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full border border-gray-200 overflow-hidden shadow-sm bg-white relative group">
                  <img
                    src={formData.foto || "/images/user/default.png"}
                    alt={formData.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-xl">
                    {formData.nombre || "Nuevo Autor"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.email || "Sin correo electrónico"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  id="nombre"
                  name="nombre"
                  label="Nombre Completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  required
                />
                <TextField
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <TextField
                id="foto"
                name="foto"
                label="URL de Foto de Perfil"
                value={formData.foto}
                onChange={handleChange}
                placeholder="https://images.com/perfil.jpg"
              />

              <TextAreaField
                id="biografia"
                name="biografia"
                label="Biografía / Perfil Profesional"
                value={formData.biografia}
                onChange={handleChange}
                placeholder="Escribe una breve descripción del autor..."
                rows={6}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Config */}
        <div className="lg:w-80 space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50/50 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Configuración
              </h4>
            </div>
            <div className="p-4 space-y-5">
              {/* Live Dropdown for Status */}
              <div className="relative">
                <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Estado
                </label>
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all shadow-sm ${
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
                  <div className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-xl z-20 overflow-hidden">
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
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      {isDirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          <button
            type="button"
            onClick={handleActualizar}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 font-bold text-white hover:bg-brand-700 transition-all shadow-xl"
          >
            <Icon icon="mdi:content-save" width="20" />
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => {
              cargarDatos();
              setIsDirty(false);
              toast.info("Cambios descartados");
            }}
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
        onConfirm={() => handleStatusChange(pendingStatus)}
        title="Cambiar Estado"
        message={`¿Está seguro de cambiar el estado a "${pendingStatus === "Active" ? "Activo" : "Borrador"}"?`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        type={pendingStatus === "Active" ? "success" : "warning"}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Autor"
        message="¿Está seguro de que desea eliminar este autor? Se moverá a la papelera."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default EditarAutor;

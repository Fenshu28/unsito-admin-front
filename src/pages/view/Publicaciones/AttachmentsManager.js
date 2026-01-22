import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../../../components/Modal";
import DropZone from "../../../components/DropZone";

const AttachmentsManager = ({
  publicacionId,
  attachments = [],
  onAttachmentAdded,
  onAttachmentRemoved,
  isDraft = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      await onAttachmentAdded(selectedFile);
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading attachment:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (attachmentId) => {
    if (!window.confirm("¿Eliminar este archivo adjunto?")) return;
    try {
      await onAttachmentRemoved(attachmentId);
    } catch (error) {
      console.error("Error removing attachment:", error);
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename?.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return "mdi:file-pdf-box";
      case "doc":
      case "docx":
        return "mdi:file-word-box";
      case "xls":
      case "xlsx":
        return "mdi:file-excel-box";
      case "zip":
      case "rar":
        return "mdi:folder-zip";
      default:
        return "mdi:file-document";
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Action Header inside Accordion */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-sans">
          Archivos permitidos: PDF, Word, Excel, ZIP.
        </p>

        {isDraft && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 transition-all shadow-sm"
          >
            <Icon icon="mdi:plus" width="20" />
            Agregar Archivo
          </button>
        )}
      </div>

      {/* Attachments List */}
      <div>
        {attachments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Icon
              icon="mdi:file-document-outline"
              className="w-12 h-12 mb-3 text-gray-300"
            />
            <p className="text-sm text-gray-500 font-sans">
              No hay archivos adjuntos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attachments.map((file) => (
              <div
                key={file._id}
                className="relative group rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                    <Icon icon={getFileIcon(file.nombreOriginal)} width="24" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {file.nombreOriginal || "Sin nombre"}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {formatFileSize(file.tamaño)}
                    </p>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
                    >
                      <Icon icon="mdi:download" width="14" />
                      DESCARGAR
                    </a>
                  </div>
                </div>

                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(file._id)}
                    className="absolute top-2 right-2 p-1.5 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Icon icon="mdi:delete-outline" width="18" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!isDraft && attachments.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-700 text-xs font-sans">
            <Icon icon="mdi:alert-circle" width="16" />
            Los archivos no pueden editarse en modo "Publicado".
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
        }}
        title="Agregar Archivo"
        footer={
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
              }}
              className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all font-sans"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-50 transition-all shadow-sm font-sans"
            >
              {uploading ? (
                <Icon icon="mdi:loading" className="animate-spin" width="18" />
              ) : (
                <Icon icon="mdi:upload" width="18" />
              )}
              {uploading ? "Subiendo..." : "Agregar"}
            </button>
          </div>
        }
      >
        <DropZone
          onFileSelect={handleFileSelect}
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,application/x-rar-compressed"
          fileType="file"
          maxSize={10}
        />
      </Modal>
    </div>
  );
};

export default AttachmentsManager;

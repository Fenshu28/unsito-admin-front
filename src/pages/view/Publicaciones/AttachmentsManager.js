import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../../../components/Modal";
import DropZone from "../../../components/DropZone";

const AttachmentsManager = ({ 
  publicacionId,
  attachments = [], 
  onAttachmentAdded, 
  onAttachmentRemoved,
  isDraft = true 
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
      console.error('Error uploading attachment:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (attachmentId) => {
    if (!window.confirm('¿Eliminar este archivo adjunto?')) return;
    
    try {
      await onAttachmentRemoved(attachmentId);
    } catch (error) {
      console.error('Error removing attachment:', error);
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'mdi:file-pdf-box';
      case 'doc':
      case 'docx':
        return 'mdi:file-word-box';
      case 'xls':
      case 'xlsx':
        return 'mdi:file-excel-box';
      case 'zip':
      case 'rar':
        return 'mdi:folder-zip';
      default:
        return 'mdi:file-document';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-black dark:text-white">
            Archivos Adjuntos
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {attachments.length} archivo{attachments.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {isDraft && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
          >
            <Icon icon="mdi:plus" width="20" />
            Agregar Archivo
          </button>
        )}
      </div>

      {/* Attachments List */}
      <div className="p-6">
        {attachments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon icon="mdi:file-document-outline" className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              No hay archivos adjuntos
            </p>
            {isDraft && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Haz clic en "Agregar Archivo" para comenzar
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {attachments.map((file) => (
              <div
                key={file._id}
                className="relative group rounded-lg border border-stroke p-4 dark:border-strokedark hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    icon={getFileIcon(file.nombreOriginal)} 
                    className="text-primary flex-shrink-0"
                    width="32"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white truncate">
                      {file.nombreOriginal || 'Sin nombre'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.tamaño)}
                    </p>
                  </div>
                </div>

                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(file._id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-lg"
                  >
                    <Icon icon="mdi:close" width="16" />
                  </button>
                )}

                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Icon icon="mdi:download" width="14" />
                  Descargar
                </a>
              </div>
            ))}
          </div>
        )}

        {!isDraft && attachments.length > 0 && (
          <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
            <Icon icon="mdi:information" width="16" />
            Para editar archivos, cambia el estado a "Borrador"
          </p>
        )}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
        }}
        title="Agregar Archivo Adjunto"
        footer={
          <>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
              }}
              className="rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="inline-flex items-center gap-2 rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Icon icon="mdi:loading" className="animate-spin" width="20" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Icon icon="mdi:upload" width="20" />
                  Agregar
                </>
              )}
            </button>
          </>
        }
      >
        <DropZone 
          onFileSelect={handleFileSelect}
          accept="application/pdf"
          fileType="pdf"
          maxSize={10}
        />
      </Modal>
    </div>
  );
};

export default AttachmentsManager;

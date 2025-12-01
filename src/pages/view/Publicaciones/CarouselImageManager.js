import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../../../components/Modal";
import DropZone from "../../../components/DropZone";

const CarouselImageManager = ({ 
  publicacionId,
  images = [], 
  onImageAdded, 
  onImageRemoved,
  isDraft = true,
  maxImages = 5 
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
      await onImageAdded(selectedFile);
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (imageId) => {
    if (!window.confirm('¿Eliminar esta imagen del carrusel?')) return;
    
    try {
      await onImageRemoved(imageId);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const canAddMore = images.length < maxImages && isDraft;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-black dark:text-white">
            Carrusel de Imágenes
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {images.length} de {maxImages} imágenes
          </p>
        </div>
        
        {canAddMore && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
          >
            <Icon icon="mdi:plus" width="20" />
            Agregar Imagen
          </button>
        )}
      </div>

      {/* Images Grid */}
      <div className="p-6">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon icon="mdi:image-off" className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              No hay imágenes en el carrusel
            </p>
            {isDraft && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Haz clic en "Agregar Imagen" para comenzar
              </p>
            )}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((image) => (
              <div
                key={image._id}
                className="relative flex-shrink-0 group"
              >
                <img
                  src={image.url}
                  alt={image.nombre || 'Carousel image'}
                  className="w-40 h-40 object-cover rounded-lg border border-stroke dark:border-strokedark"
                />
                
                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(image._id)}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <Icon icon="mdi:close" width="16" />
                  </button>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="truncate">{image.nombre || 'Sin nombre'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isDraft && images.length > 0 && (
          <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
            <Icon icon="mdi:information" width="16" />
            Para editar imágenes, cambia el estado a "Borrador"
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
        title="Agregar Imagen al Carrusel"
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
        <DropZone onFileSelect={handleFileSelect} />
      </Modal>
    </div>
  );
};

export default CarouselImageManager;

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
  maxImages = 5,
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
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (imageId) => {
    if (!window.confirm("¿Eliminar esta imagen del carrusel?")) return;
    try {
      await onImageRemoved(imageId);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const canAddMore = images.length < maxImages && isDraft;

  return (
    <div className="space-y-4">
      {/* Action Header inside Accordion */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-sans">
          Máximo {maxImages} imágenes permitidas.
        </p>

        {canAddMore && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700 transition-all shadow-sm"
          >
            <Icon icon="mdi:plus" width="20" />
            Agregar Imagen
          </button>
        )}
      </div>

      {/* Images Grid */}
      <div className="mt-2">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Icon
              icon="mdi:image-off"
              className="w-12 h-12 mb-3 text-gray-300"
            />
            <p className="text-sm text-gray-500 font-sans">
              No hay imágenes en el carrusel
            </p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {images.map((image) => (
              <div key={image._id} className="relative flex-shrink-0 group">
                <img
                  src={image.url}
                  alt={image.nombreOriginal || "Carousel image"}
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm transition-all group-hover:ring-2 group-hover:ring-brand-500/20"
                />

                {isDraft && (
                  <button
                    type="button"
                    onClick={() => handleRemove(image._id)}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 shadow-lg scale-90 group-hover:scale-100"
                  >
                    <Icon icon="mdi:close" width="14" />
                  </button>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-[2px] text-white text-[10px] p-1.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="truncate font-sans">
                    {image.nombreOriginal || "Sin nombre"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isDraft && images.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-700 text-xs font-sans">
            <Icon icon="mdi:alert-circle" width="16" />
            Las imágenes no pueden editarse en modo "Publicado".
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
        title="Agregar Imagen"
        footer={
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
              }}
              className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-50 transition-all shadow-sm"
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
          accept="image/*"
          fileType="image"
          maxSize={5}
        />
      </Modal>
    </div>
  );
};

export default CarouselImageManager;

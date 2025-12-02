import { useState, useCallback } from "react";
import { Icon } from "@iconify/react";

const DropZone = ({ onFileSelect, accept = "image/*", maxSize = 5, fileType = "image" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const getAcceptedFormats = () => {
    if (fileType === "pdf") {
      return "PDF";
    } else if (fileType === "image") {
      return "PNG, JPG, GIF, WEBP";
    } else if (accept.includes("image")) {
      return "Imágenes";
    } else if (accept.includes("pdf")) {
      return "PDF";
    }
    return "Archivos";
  };

  const validateFile = (file) => {
    // Validar tipo según fileType
    if (fileType === "image" && !file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return false;
    }
    
    if (fileType === "pdf" && file.type !== 'application/pdf') {
      setError('Solo se permiten archivos PDF');
      return false;
    }

    // Validar tamaño (en MB)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`El archivo debe ser menor a ${maxSize}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const processFile = useCallback((file) => {
    if (!validateFile(file)) return;

    setFileName(file.name);

    // Crear preview según tipo
    if (fileType === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (fileType === "pdf") {
      // Para PDF, mostrar icono y nombre
      setPreview("pdf");
    }

    // Notificar al padre
    onFileSelect(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFileSelect, fileType]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary bg-primary bg-opacity-5'
              : 'border-stroke dark:border-strokedark hover:border-primary'
          }`}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Icon 
              icon={fileType === "pdf" ? "mdi:file-pdf-box" : "mdi:cloud-upload"} 
              className="w-12 h-12 mb-4 text-gray-400"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click para subir</span> o arrastra y suelta
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getAcceptedFormats()} hasta {maxSize}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {fileType === "image" ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-lg bg-gray-50 dark:bg-boxdark-2"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 rounded-lg bg-gray-50 dark:bg-boxdark-2 border border-stroke dark:border-strokedark">
              <Icon 
                icon="mdi:file-pdf-box" 
                className="w-20 h-20 mb-4 text-red-600"
              />
              <p className="text-sm font-medium text-black dark:text-white px-4 text-center break-all">
                {fileName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PDF seleccionado
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"
          >
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default DropZone;

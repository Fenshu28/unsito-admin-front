import { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";

const DropZone = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 5,
  fileType = "image",
}) => {
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
    if (fileType === "pdf") return "PDF";
    if (fileType === "image") return "PNG, JPG, GIF, WEBP";
    if (accept.includes("image")) return "Imágenes";
    if (accept.includes("pdf")) return "PDF";
    return "Archivos";
  };

  const validateFile = useCallback(
    (file) => {
      if (fileType === "image" && !file.type.startsWith("image/")) {
        setError("Solo se permiten archivos de imagen");
        return false;
      }
      if (fileType === "pdf" && file.type !== "application/pdf") {
        setError("Solo se permiten archivos PDF");
        return false;
      }
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        setError(`El archivo debe ser menor a ${maxSize}MB`);
        return false;
      }
      setError(null);
      return true;
    },
    [fileType, maxSize],
  );

  const processFile = useCallback(
    (file) => {
      if (!validateFile(file)) return;
      setFileName(file.name);
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        // Para PDF o archivos genéricos, mostramos el estado de previsualización
        setPreview(fileType);
      }
      onFileSelect(file);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [onFileSelect, fileType, validateFile],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) processFile(files[0]);
    },
    [processFile],
  );

  const handlePaste = useCallback(
    (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (
          items[i].type.indexOf("image") !== -1 ||
          items[i].type.indexOf("pdf") !== -1
        ) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break; // Solo procesamos el primero
          }
        }
      }
    },
    [processFile],
  );

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) processFile(files[0]);
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full font-sans">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            isDragging
              ? "border-brand-600 bg-brand-50/50 scale-[1.01]"
              : "border-gray-300 hover:border-brand-600 hover:bg-gray-50"
          }`}
        >
          <div className="flex flex-col items-center justify-center p-6 bg-white/50 backdrop-blur-sm rounded-xl pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4 transition-transform group-hover:scale-110">
              <Icon
                icon={
                  fileType === "pdf"
                    ? "mdi:file-pdf-box"
                    : "mdi:cloud-upload-outline"
                }
                width="28"
              />
            </div>
            <p className="mb-1 text-sm text-gray-700">
              <span className="font-bold text-brand-600">Click para subir</span>{" "}
              o arrastra y suelta
            </p>
            <p className="text-xs text-gray-500">
              {getAcceptedFormats()} hasta {maxSize}MB
            </p>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
      ) : (
        <div className="relative group overflow-hidden rounded-2xl border border-gray-200">
          {fileType === "image" ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover bg-gray-50 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-50">
              <Icon
                icon={
                  fileName?.endsWith(".pdf")
                    ? "mdi:file-pdf-box"
                    : fileName?.match(/\.(doc|docx)$/)
                      ? "mdi:file-word-box"
                      : fileName?.match(/\.(xls|xlsx)$/)
                        ? "mdi:file-excel-box"
                        : "mdi:file-document"
                }
                className={`w-20 h-20 mb-4 ${fileName?.endsWith(".pdf") ? "text-red-600" : "text-brand-600"}`}
              />
              <p className="text-sm font-bold text-gray-800 px-4 text-center break-all">
                {fileName}
              </p>
              <p className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wide">
                Archivo Seleccionado
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-xl transition-transform transform scale-75 group-hover:scale-100"
            >
              <Icon icon="mdi:trash-can-outline" width="24" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
          <Icon icon="mdi:alert-circle" width="16" />
          {error}
        </div>
      )}
    </div>
  );
};

export default DropZone;

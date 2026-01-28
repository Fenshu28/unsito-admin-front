import apiClient from "./api";

// Listar todas las publicaciones con filtros opcionales
export const obtenerPublicaciones = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.categoria) params.append("categoria", filters.categoria);
    if (filters.tipo) params.append("tipo", filters.tipo);
    if (filters.autor) params.append("autor", filters.autor);

    const queryString = params.toString();
    const url = queryString
      ? `/publicaciones?${queryString}`
      : "/publicaciones";
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las publicaciones",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Obtener una publicación por ID
export const obtenerPublicacionPorId = async (id) => {
  try {
    const response = await apiClient.get(`/publicaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la publicación",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Crear nueva publicación (solo requiere título)
export const crearPublicacion = async (data) => {
  try {
    const response = await apiClient.post("/publicaciones", {
      titulo: data.titulo,
      descripcion: data.descripcion || "",
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la publicación",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Actualizar publicación existente
export const actualizarPublicacion = async (id, data) => {
  try {
    const response = await apiClient.patch(`/publicaciones/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la publicación",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Eliminar publicación (mover a papelera)
export const eliminarPublicacion = async (id) => {
  try {
    const response = await apiClient.delete(`/publicaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar la publicación",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Subir archivo a publicación
export const subirArchivo = async (id, file, addTo) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("addTo", addTo);

    const response = await apiClient.post(
      `/publicaciones/${id}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al subir el archivo",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Eliminar archivo de publicación
export const eliminarArchivo = async (id, archivoId, removeFrom) => {
  try {
    const response = await apiClient.delete(`/publicaciones/${id}/file`, {
      data: {
        archivoId,
        removeFrom,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el archivo",
      error.response?.data || error.message,
    );
    throw error;
  }
};

import apiClient from "./api";

/**
 * Obtener todos los autores
 * GET /autores
 * Devuelve un arreglo de autores
 */
export const obtenerAutores = async (status = "all") => {
  try {
    const url =
      status && status !== "all" ? `/autores?status=${status}` : "/autores";
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los autores:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * Crear un nuevo autor
 * POST /autores
 * Content-Type: application/json
 */
export const crearAutor = async (autorData) => {
  try {
    const response = await apiClient.post("/autores", {
      nombre: autorData.nombre,
      biografia: autorData.biografia,
      email: autorData.email,
      foto: autorData.foto, // string (URL)
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error al crear el autor:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * Obtener un autor por ID
 * GET /autores/:id
 */
export const obtenerAutorPorId = async (id) => {
  try {
    const response = await apiClient.get(`/autores/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el autor:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * Actualizar un autor existente
 * PATCH /autores/:id
 */
export const actualizarAutor = async (id, autorData) => {
  try {
    const response = await apiClient.patch(`/autores/${id}`, {
      nombre: autorData.nombre,
      biografia: autorData.biografia,
      email: autorData.email,
      foto: autorData.foto, // string
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el autor:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * Eliminar un autor
 * DELETE /autores/:id
 */
export const eliminarAutor = async (id) => {
  try {
    const response = await apiClient.delete(`/autores/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el autor:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

import apiClient from "./api";


export const obtenerCategorias = async () => {
  try {
    const response = await apiClient.get("/categorias");
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las categorías:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const obtenerCategoriaPorId = async (id) => {
  try {
    const response = await apiClient.get(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la categoría:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const crearCategoria = async (categoriaData) => {
  try {
    const response = await apiClient.post("/categorias", categoriaData);
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la categoría:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const actualizarCategoria = async (id, categoriaData) => {
  try {
    const response = await apiClient.put(
      `/categorias/${id}`,
      categoriaData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la categoría:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const eliminarCategoria = async (id) => {
  try {
    const response = await apiClient.delete(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar la categoría:",
      error.response?.data || error.message
    );
    throw error;
  }
};

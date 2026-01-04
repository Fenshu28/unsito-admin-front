import apiClient from './api'; 

export const obtenerAutores = async () => {
  try {
    const response = await apiClient.get('/autores');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener los autores:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const crearAutor = async (autorData) => {
  try {
    const response = await apiClient.post('/autores', autorData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error al crear el autor:',
      error.response?.data || error.message
    );
    throw error;
  }
};


export const obtenerAutorPorId = async (id) => {
  try {
    const response = await apiClient.get(`/autores/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener el autor:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const actualizarAutor = async (id, autorData) => {
  try {
    const response = await apiClient.patch(`/autores/${id}`, autorData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error al actualizar el autor:',
      error.response?.data || error.message
    );
    throw error;
  }
};


export const eliminarAutor = async (id) => {
  try {
    const response = await apiClient.delete(`/autores/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error al eliminar el autor:',
      error.response?.data || error.message
    );
    throw error;
  }
};

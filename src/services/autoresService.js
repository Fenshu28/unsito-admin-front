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
    const response = await apiClient.post('/autores', autorData);
    return response.data;
  } catch (error) {
    console.error(
      'Error al crear el autor:',
      error.response?.data || error.message
    );
    throw error;
  }
};



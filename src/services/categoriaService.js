import apiClient from './api'; 

export const obtenerCategorias = async () =>{

  try {
    const response = await apiClient.get('/categorias');
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las categorías:', error.response?.data || error.message);
    throw error;
  }
}




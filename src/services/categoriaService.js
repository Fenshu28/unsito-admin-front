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


export const crearCategoria = async (categoriaData) => {
  try {
    const response = await apiClient.post('/categorias', categoriaData);
    return response.data; 
  } catch (error) {
    console.error('Error al crear la categoría:', error.response?.data || error.message);
    throw error;
  }
};

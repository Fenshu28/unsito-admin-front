import apiClient from './api';

// Obtener todos los tipos
export const obtenerTipos = async () => {
  try {
    const response = await apiClient.get('/tipos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los tipos:', error.response?.data || error.message);
    throw error;
  }
};

// Obtener taxonomía completa (categorías y tipos) - endpoint público
export const obtenerTaxonomia = async () => {
  try {
    const response = await apiClient.get('/public/taxonomia');
    return response.data;
  } catch (error) {
    console.error('Error al obtener la taxonomía:', error.response?.data || error.message);
    throw error;
  }
};
